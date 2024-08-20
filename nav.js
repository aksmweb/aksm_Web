
document.addEventListener('DOMContentLoaded', () => {
    // Toggle navigation menu
    document.body.addEventListener('click', (event) => {
        const navToggle = event.target.closest('.nav-toggle_header');
        if (navToggle) {
            const primaryNav = document.querySelector('.primary-navigation_header');
            const visibility = primaryNav.getAttribute('data-visible') === "true";
            primaryNav.setAttribute("data-visible", !visibility);
            navToggle.setAttribute("aria-expanded", !visibility);
        }
    });
});



document.addEventListener('DOMContentLoaded', () => {
    // General Intersection Observer for animations
    const animateObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle('animate', entry.isIntersecting);
        });
    }, { threshold: 0.3 });
  
    const elementsToObserve = document.querySelectorAll('.text-left, .services_text-left, .about_services_title, .animated-line-container, .animated-line-container2, .heading, .project, .text-right, .vertical-separator, .services_vertical-separator, .vertical-separator2, .heropanel__content, .vertical-line-container, .customers');
    elementsToObserve.forEach(element => animateObserver.observe(element));
  
    //// Counter Animation
const counters = [
    { counterId: 'counter1', wrapperId: 'wrapper1', startCount: 0, maxCount: 23, interval: 50 },
    { counterId: 'counter2', wrapperId: 'wrapper2', startCount: 1400, maxCount: 2000, interval: -1000 },
    { counterId: 'counter3', wrapperId: 'wrapper3', startCount: 0, maxCount: 200, interval: 10 }
];

counters.forEach(item => {
    const counter = document.getElementById(item.counterId);
    if (counter) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCountdown(counter, item.startCount, item.maxCount, item.interval);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(counter);
    }
});

function startCountdown(counter, startCount, maxCount, interval) {
    let count = startCount;
    counter.textContent = count; // Set the initial count
    const countdown = setInterval(() => {
        count++;
        counter.textContent = count;
        if (count >= maxCount) clearInterval(countdown);
    }, interval);
}

  
    // Scroller animation
    const scrollers = document.querySelectorAll(".scroller");
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        scrollers.forEach(scroller => {
            scroller.setAttribute("data-animated", true);
            const scrollerInner = scroller.querySelector(".scroller__inner");
            if (scrollerInner) {
                const scrollerContent = Array.from(scrollerInner.children);
                scrollerContent.forEach(item => {
                    const clone = item.cloneNode(true);
                    clone.setAttribute("aria-hidden", true);
                    scrollerInner.appendChild(clone);
                });
            }
        });
    }
  
    // Testimonial Carousel
    const testimonialItems = document.querySelectorAll(".item label");
    let testimonialIndex = 0;
    function cycleTestimonials(index) {
        const evt = new MouseEvent('click', { bubbles: true });
        testimonialItems[index].dispatchEvent(evt);
        testimonialIndex = (index + 1) % testimonialItems.length;
        timer = setTimeout(() => cycleTestimonials(testimonialIndex), 2000);
    }
    cycleTestimonials(0);
  
    // Image Slider
    const initSlider = () => {
        const imageList = document.querySelector(".slider-wrapper .image-list");
        const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
        const sliderScrollbar = document.querySelector(".slider-container .slider-scrollbar");
        const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
        const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
  
        // Handle scrollbar thumb drag
        scrollbarThumb.addEventListener("mousedown", (e) => {
            const startX = e.clientX;
            const thumbPosition = scrollbarThumb.offsetLeft;
            const maxThumbPosition = sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth;
  
            const handleMouseMove = (e) => {
                const deltaX = e.clientX - startX;
                let newThumbPosition = thumbPosition + deltaX;
                newThumbPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
                const scrollPosition = (newThumbPosition / maxThumbPosition) * maxScrollLeft;
  
                scrollbarThumb.style.left = `${newThumbPosition}px`;
                imageList.scrollLeft = scrollPosition;
            };
  
            const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
            };
  
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        });
  
        slideButtons.forEach(button => {
            button.addEventListener("click", () => {
                const direction = button.id === "prev-slide" ? -1 : 1;
                imageList.scrollBy({ left: imageList.clientWidth * direction, behavior: "smooth" });
            });
        });
  
        const updateScrollThumbPosition = () => {
            const scrollPosition = imageList.scrollLeft;
            const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
            scrollbarThumb.style.left = `${thumbPosition}px`;
        };
  
        const handleSlideButtons = () => {
            slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
            slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
        };
  
        imageList.addEventListener("scroll", () => {
            updateScrollThumbPosition();
            handleSlideButtons();
        });
  
        imageList.addEventListener("wheel", (e) => {
            e.preventDefault();
            imageList.scrollLeft += e.deltaY;
        });
  
        // Hover effect and click redirection
        const imageItems = document.querySelectorAll(".slider-wrapper .image-item");
        imageItems.forEach(item => {
            const details = item.querySelector(".image-details");
            item.addEventListener("mouseover", () => {
                details.style.transform = "translateY(0)";
                details.style.opacity = 1;
            });
            item.addEventListener("mouseout", () => {
                details.style.transform = "translateY(100%)";
                details.style.opacity = 0;
            });
            item.addEventListener("click", () => {
                window.location.href = item.parentElement.getAttribute("href");
            });
        });
    };
  
    initSlider();
  
  
  });
  