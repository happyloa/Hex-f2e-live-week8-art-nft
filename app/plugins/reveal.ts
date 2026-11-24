export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | undefined;
  nuxtApp.vueApp.directive<HTMLElement>("reveal", {
    mounted(element) {
      if (
        !("IntersectionObserver" in window) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        element.getBoundingClientRect().top < window.innerHeight
      )
        return;

      observer ??= new IntersectionObserver((entries) => {
        for (const { target, isIntersecting } of entries) {
          if (!isIntersecting) continue;
          target.setAttribute("data-reveal", "visible");
          observer?.unobserve(target);
        }
      });
      element.dataset.reveal = "pending";
      observer.observe(element);
    },
    unmounted(element) {
      observer?.unobserve(element);
    },
  });
});
