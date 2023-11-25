const hamburgerIcon = document.getElementById("nav-icon1");
hamburgerIcon.addEventListener("click", () =>
  document.querySelector("nav").classList.toggle("open")
);

window.onload = () =>
  document.querySelector(".loader-mask").classList.add("hide");

gsap.registerPlugin(ScrollTrigger);


// Sections
const sections = gsap.utils.toArray(".section");

let maxWidth = 0;

const getMaxWidth = () => {
  maxWidth = 0;
  sections.forEach((section) => {
    maxWidth += section.offsetWidth;
  });
};

getMaxWidth();
ScrollTrigger.addEventListener("refreshInit", getMaxWidth);

gsap.to(sections, {
  x: () => `-${maxWidth - window.innerWidth}`,
  ease: "none",
  scrollTrigger: {
    trigger: ".container",
    pin: true,
    scrub: true,
    end: () => `+=${maxWidth}`,
    invalidateOnRefresh: true,
  },
});
