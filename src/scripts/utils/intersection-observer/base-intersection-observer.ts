import type {IntersectionOptions} from '../../types/intersections';

export abstract class BaseIntersectionObserver {
  protected observers: Map<string, IntersectionObserver>;
  protected defaultOptions: IntersectionOptions;

  constructor(defaultOptions: IntersectionOptions) {
    this.observers = new Map();
    this.defaultOptions = defaultOptions;
  }

  protected abstract handleIntersection(element: Element): void;

  protected observeElements(selector: string):void {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      const options = this.parseOptions(element.getAttribute('data-intersect'));
      if (options) {
        const observer = this.getObserver(options);
        observer.observe(element);
      }
    })
  }

  private parseOptions(optionString: string | null):IntersectionOptions | null {
    if (!optionString) {
      return this.defaultOptions;
    }

    try {
      return JSON.parse(optionString.replace(/'/g, '"'));
    } catch (error) {
      console.error('Error parsing intersection observer options', error);
      return null
    }
  }

  private getObserver(options: IntersectionOptions): IntersectionObserver {
    const key = JSON.stringify(options);
    if (!this.observers.has(key)) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.handleIntersection(entry.target);
          }
        });
      }, options);
      this.observers.set(key, observer);
    }
    return this.observers.get(key)!
  }
  protected unobserveElement(element: Element): void {
    this.observers.forEach(observers => {
      observers.unobserve(element)
    })
  }

  public disconnect(): void {
    this.observers.forEach((observer) => {
      observer.disconnect();
    });
    this.observers.clear();
  }
}