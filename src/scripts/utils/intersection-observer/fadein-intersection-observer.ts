import type {IntersectionOptions} from '../../types/intersections';
import {BaseIntersectionObserver} from "./base-intersection-observer.ts";

export class FadeinIntersectionObserver extends BaseIntersectionObserver {
  constructor(defaultOptions: IntersectionOptions = {
    root: null,
    rootMargin: '0px 0px -30% 0px',
    threshold: 0.2
  }) {
    super(defaultOptions);
    this.observeElements('[data-fade-in-intersect]');
  }

  protected handleIntersection(element: Element): void {
    element.classList.add('is-intersecting');
    this.unobserveElement(element);
  }
}

export function getFadeInDataAttribute(fadeIn: boolean | IntersectionOptions): string | undefined {
  if (typeof fadeIn === 'object') {
    return JSON.stringify(fadeIn);
  } else if (fadeIn) {
    return '';
  }
  return undefined;
}