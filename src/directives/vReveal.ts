import type { Directive } from 'vue'

interface RevealOptions {
  delay?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  threshold?: number
}

const observerMap = new WeakMap<HTMLElement, IntersectionObserver>()

export const vReveal: Directive<HTMLElement, RevealOptions | undefined> = {
  mounted(el, binding) {
    const opts = binding.value ?? {}
    const direction = opts.direction ?? 'up'

    el.classList.add('reveal', `reveal_${direction}`)
    if (opts.delay) {
      el.style.transitionDelay = opts.delay
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add('reveal_visible')
          observer.unobserve(el)
        }
      },
      { threshold: opts.threshold ?? 0.12 },
    )

    observer.observe(el)
    observerMap.set(el, observer)
  },

  beforeUnmount(el) {
    observerMap.get(el)?.disconnect()
    observerMap.delete(el)
  },
}
