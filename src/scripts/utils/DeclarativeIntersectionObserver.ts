class DeclarativeIntersectionObserver {
  private observers: Map<string, IntersectionObserver>
  constructor() {
    this.observers = new Map();
    this.init();
  }

  private init(): void {

  }
}