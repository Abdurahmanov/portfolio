import type { Directive } from 'vue';

interface RevealOptions {
  delay?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  threshold?: number;
}

const observerMap = new WeakMap<HTMLElement, IntersectionObserver>();

export const vReveal: Directive<HTMLElement, RevealOptions | undefined> = {
  mounted(el, binding) {
    const opts = binding.value ?? {};
    const direction = opts.direction ?? 'up';

    el.classList.add('reveal', `reveal_${direction}`);
    const delay = opts.delay ?? '0.15s';
    const easing = `cubic-bezier(0.22, 1, 0.36, 1)`;
    const cardEasing = `cubic-bezier(0.4, 0, 0.2, 1)`;
    el.style.transition = [
      `opacity 0.65s ${easing} ${delay}`,
      `transform 0.65s ${easing} ${delay}`,
      `border-color 0.3s ${cardEasing}`,
      `box-shadow 0.3s ${cardEasing}`,
    ].join(', ');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add('reveal_visible');
          observer.unobserve(el);
        }
      },
      { threshold: opts.threshold ?? 0.12 },
    );

    observer.observe(el);
    observerMap.set(el, observer);
  },

  beforeUnmount(el) {
    observerMap.get(el)?.disconnect();
    observerMap.delete(el);
  },
};
