// header Java
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const logos = document.querySelectorAll('.logo');
  const hero = document.querySelector('.hero-section');
  let lastScrollY = window.scrollY;
  let observer;

  const maxScroll = 650;
  const maxPadding = 45;
  const minPadding = 40;
  const maxLogo = 40;
  const minLogo = 30;

  let isLargeScreen = window.innerWidth > 900;

  function applyDesktopHeaderBehavior() {
    window.addEventListener('scroll', onScrollResizeHeader);
    window.addEventListener('scroll', onScrollHideHeader);
    window.addEventListener('scroll', onScrollToggleHeaderBackground);

    observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        header.classList.add('header--fixed');
      } else {
        header.classList.remove('header--fixed');
      }
    }, { threshold: 0 });

    observer.observe(hero);
  }

  function applyMobileHeaderBehavior() {
    header.style.padding = '1rem 1rem';

    window.addEventListener('scroll', onScrollToggleHeaderBackground);

    observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        header.classList.add('header--fixed');
      } else {
        header.classList.remove('header--fixed');
      }
    }, {
      rootMargin: '0px',
      threshold: 0
    });

    observer.observe(hero);
  }

  function onScrollResizeHeader() {
    const scrollY = Math.min(window.scrollY, maxScroll);
    const scrollRatio = scrollY / maxScroll;
    const currentPadding = maxPadding - (maxPadding - minPadding) * scrollRatio;
    const currentLogo = maxLogo - (maxLogo - minLogo) * scrollRatio;

    header.style.padding = `${currentPadding}px 1rem`;
    logos.forEach(logo => logo.style.height = `${currentLogo}px`);
  }

  function onScrollHideHeader() {
    const currentScroll = window.scrollY;
    if (currentScroll > 650) {
      if (currentScroll > lastScrollY) {
        header.classList.add('header--hide');
      } else {
        header.classList.remove('header--hide');
      }
    } else {
      header.classList.remove('header--hide');
    }
    lastScrollY = currentScroll;
  }

  function onScrollToggleHeaderBackground() {
    if (window.scrollY > 100) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  function cleanup() {
    if (observer) observer.disconnect();
    window.removeEventListener('scroll', onScrollResizeHeader);
    window.removeEventListener('scroll', onScrollHideHeader);
    window.removeEventListener('scroll', onScrollToggleHeaderBackground);
    header.classList.remove('header--fixed', 'header--hide', 'header--scrolled');
    header.style.padding = '';
    logos.forEach(logo => logo.style.height = '');
  }

  function checkWidthAndApplyBehavior() {
    const nowLarge = window.innerWidth > 900;
    if (nowLarge && !isLargeScreen) {
      cleanup();
      isLargeScreen = true;
      applyDesktopHeaderBehavior();
    } else if (!nowLarge && isLargeScreen) {
      cleanup();
      isLargeScreen = false;
      applyMobileHeaderBehavior();
    }
  }
 
  window.addEventListener('load', () => {
    if (isLargeScreen) {
      onScrollResizeHeader(); // ensure logo starts at correct enlargement
    }
  });

  // Initial run
  if (isLargeScreen) {
    applyDesktopHeaderBehavior();
    requestAnimationFrame(() => {
      onScrollResizeHeader();
    });
  } else {
    applyMobileHeaderBehavior();
  }


  window.addEventListener('resize', checkWidthAndApplyBehavior);

  // Hamburger menu logic
  const toggleMenu = document.getElementById('nav-toggle');
  const closeMenu = document.getElementById('nav-close');
  const navMenu = document.getElementById('nav-menu');

  toggleMenu.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });

  closeMenu.addEventListener('click', () => {
    navMenu.classList.remove('show');
  });

  const navLink = document.querySelectorAll('.nav__link');
  navLink.forEach(n =>
    n.addEventListener('click', function () {
      navLink.forEach(n => n.classList.remove('active'));
      this.classList.add('active');
      navMenu.classList.remove('show');
    })
  );

  // ScrollTo Section
  window.scrollToSection = function (sectionClass) {
    const section = document.querySelector(`.${sectionClass}`);
    if (section) {
      const offset = 130;
      const sectionPosition = section.offsetTop - offset;
      const currentPosition = window.scrollY;
      const distance = sectionPosition - currentPosition;
      const duration = 1000;
      const startTime = performance.now();

      function animateScroll(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeInOutQuad =
          progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        window.scrollTo(0, currentPosition + distance * easeInOutQuad);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      }

      requestAnimationFrame(animateScroll);
    }
  };
});












document.addEventListener('DOMContentLoaded', () => {
  // GSAP Timeline for entrance
  const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 1 } });


  // Animate the logo
  tl.from(".logo", { scale: 0.5, opacity: 0 });


  // Stagger in the nav links
  tl.from(".nav__link", { y: -30, opacity: 0, stagger: 0.15 }, "-=0.7");


 //social phone
  tl.from(".fa-phone", { scale: 0.5, opacity: 0 }, "-=0.7");
  //social email
  tl.from(".fa-google", { scale: 0.5, opacity: 0 }, "-=0.7");
  //social instagram
  tl.from(".fa-instagram", { scale: 0.5, opacity: 0 }, "-=0.7");
  //social facebook
  tl.from(".fa-facebook", { scale: 0.5, opacity: 0 }, "-=0.7");


  // Animate the 'Schedule Now' button
  tl.from(".cta-button-anim", { scale: 0.5, opacity: 0 }, "-=0.7");


  //scroll arrow
  tl.from(".scroll-arrow", { scale: 0.5, opacity: 0 }, "-=0.9");
});








// Home-screen animation: Slide logo up from bottom
window.addEventListener("load", () => {
  document.querySelectorAll(".title-animate").forEach((el) => {
    setTimeout(() => {
      el.classList.add("title-active");
    }, 5);
  });
});










/*scrolling animation*/
document.addEventListener("scroll", () => {
  const isMobile = window.innerWidth <= 768; // Adjust breakpoint if needed

  document.querySelectorAll(".scroll-animate").forEach((el) => {
    const elementPosition = el.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.1;

    if (elementPosition < screenPosition) {
      el.classList.add("active");
      el.classList.remove("scroll-out"); // Ensure scroll-out is removed
    } else if (!isMobile) {
      el.classList.remove("active"); // Reset animation only on larger screens
    }
  });

  if (!isMobile) {
    document.querySelectorAll(".scroll-out-100").forEach((el) => {
      const elementPosition = el.getBoundingClientRect().top;
      const scrollOutTrigger = 30;
      if (elementPosition < scrollOutTrigger) {
        el.classList.add("scroll-out");
        el.classList.remove("active");
      }
    });

    document.querySelectorAll(".scroll-out-20").forEach((el) => {
      const elementPosition = el.getBoundingClientRect().top;
      const scrollOutTrigger = -25;
      if (elementPosition < scrollOutTrigger) {
        el.classList.add("scroll-out");
        el.classList.remove("active");
      }
    });
  }
});


/*scrolling animation for the title*/
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll('.animate-section');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('title-active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    observer.observe(section);
  });
});

  document.addEventListener("scroll", () => {
    const isMobile = window.innerWidth <= 768;

    document.querySelectorAll(".scroll-animateY").forEach((el) => {
      const elementPosition = el.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.1;

      if (elementPosition < screenPosition) {
        el.classList.add("active");
      } else if (!isMobile) {
        el.classList.remove("active");
      }
    });




  });








/*scroll down button at the section1*/
function scrollToSection(sectionClass) {
  const section = document.querySelector(`.${sectionClass}`);
  if (section) {
    const offset = 130;
    const sectionPosition = section.offsetTop - offset;
    const currentPosition = window.scrollY;
    const distance = sectionPosition - currentPosition;
    const duration = 1000;
    const startTime = performance.now();

    function animateScroll(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeInOutQuad =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      window.scrollTo(0, currentPosition + distance * easeInOutQuad);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    }

    requestAnimationFrame(animateScroll);
  }
}










/*scroll up button at the footer*/
function scrollToTop() {
  const duration = 1000;
  const start = window.scrollY;
  const startTime = performance.now();

  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeInOutQuad =
      progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    window.scrollTo(0, start * (1 - easeInOutQuad));

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }

  requestAnimationFrame(animateScroll);
}
