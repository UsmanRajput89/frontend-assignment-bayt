// Slider function takes a slider container element as input
function slider(sliderContainer) {

    // Get the slider element and add 'slider' class
    let slider = sliderContainer.children[0];
    slider.classList.add('slider');

    // Get all slide elements and store them in an array 'slides'
    let slides_html_collection = slider.children;
    let slides = [];
    for (let i = 0; i < slides_html_collection.length; i++) {
        slides.push(slides_html_collection[i]);
    }
    Object.setPrototypeOf(slides, NodeList.prototype);

    // Add 'slide' class to each slide element
    slides.forEach(element => {
        element.classList.add('slide');
    });

    // Set the first slide as active initially
    slides[0].classList.add('active');

    // Move the last slide before the first one to enable infinite loop effect
    let last = slider.lastElementChild,
        first = slider.firstElementChild;
    slider.insertBefore(last, first);

    // Create arrows for navigation
    const arrowsContainer = document.createElement("div");
    arrowsContainer.classList.add("arrows");
    arrowsContainer.innerHTML = `
        <div class="btn"><img id="prev" src="images/chevron.png" alt="Prev button icon"></div>
        <div class="btn"><img id="next" src="images/chevron.png" alt="Next button icon"></div>
    `;
    sliderContainer.appendChild(arrowsContainer);

    // Create dots navigation for each slide
    const dotsNavWrapper = document.createElement("div");
    dotsNavWrapper.classList.add("dots-nav-wrapper");
    const dotsNavigation = document.createElement("div");
    dotsNavigation.classList.add("dots-navigation");
    dotsNavWrapper.appendChild(dotsNavigation);
    sliderContainer.appendChild(dotsNavWrapper);

    // Generate dots navigation for each slide
    const dots = [];
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dots.push(dot);
        dotsNavigation.appendChild(dot);
    }

    // Add click event listener to each dot to navigate to the corresponding slide
    const dots_btn = sliderContainer.querySelectorAll(".dot");
    dots_btn.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            setActiveSlide(index);
        });
    });

    // Function to move to a specific slide
    function moveToSlide(slideIndex) {
        const activeSlide = sliderContainer.querySelector(".active");
        const activeSlideIndex = slides.indexOf(activeSlide);
        let stepsToMove = (slideIndex - activeSlideIndex + slides.length) % slides.length;

        if (stepsToMove !== 0) {
            let newActiveSlide;
            if (stepsToMove > 0) {
                for (let i = 0; i < stepsToMove; i++) {
                    slider.appendChild(slider.firstElementChild);
                }
                newActiveSlide = sliderContainer.querySelector(".active");
            } else {
                for (let i = 0; i < Math.abs(stepsToMove); i++) {
                    slider.insertBefore(slider.lastElementChild, slider.firstElementChild);
                }
                newActiveSlide = sliderContainer.querySelector(".active");
            }

            setActiveSlide(slides.indexOf(newActiveSlide));
        }
    }

    // Add click event listeners to the navigation arrows
    const btn = sliderContainer.querySelectorAll(".btn");
    btn.forEach(btn => {
        btn.addEventListener("click", movement);
    });

    // Function to set the slider height dynamically based on the tallest slide
    function setSliderHeight() {
        let tallestSlideHeight = 0;
        slides.forEach(slide => {
            slide.style.height = 'auto'; // Reset the height to calculate actual height
            const slideHeight = slide.offsetHeight;
            if (slideHeight > tallestSlideHeight) {
                tallestSlideHeight = slideHeight + 20; // Add some buffer for better appearance
            }
        });
        slider.style.height = tallestSlideHeight + 'px';
    }

    // Call setSliderHeight on page load and on window resize
    setSliderHeight();
    window.addEventListener('resize', setSliderHeight);

    // Function to set the active slide and corresponding dot
    function setActiveSlide(index) {
        console.log('index:', index);
        slides.forEach((slide, slideIndex) => {
            slide.classList.toggle("active", slideIndex === index);
        });
        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle("active", dotIndex === index);
        });
    }

    // Function to handle arrow button clicks and navigate slides accordingly
    function movement(e) {
        slider = sliderContainer.children[0];
        last = slider.lastElementChild;
        first = slider.firstElementChild;

        const activeSlide = sliderContainer.querySelector(".active");
        const activeSlideIndex = Array.from(slides).indexOf(activeSlide);

        if (e.target.id === "next") {
            slider.insertBefore(first, last.nextSibling);
            setActiveSlide((activeSlideIndex + 1) % slides.length);
        } else {
            slider.insertBefore(last, first);
            setActiveSlide((activeSlideIndex - 1 + slides.length) % slides.length);
        }
    }

    // Autoplay Function

    function autoPlay() {
        const autoplayValue = sliderContainer.getAttribute("data-autoplay");

        // set duration by getting from attribute 
        const duration = sliderContainer.getAttribute("data-duration") ?? "4000";

        console.log(duration);

        if (autoplayValue == 'true') {
            slider = sliderContainer.children[0];
            last = slider.lastElementChild;
            first = slider.firstElementChild;

            const activeSlide = sliderContainer.querySelector(".active");
            const activeSlideIndex = Array.from(slides).indexOf(activeSlide);

            setTimeout(() => {
                slider.insertBefore(first, last.nextSibling);
                setActiveSlide((activeSlideIndex + 1) % slides.length);
            }), 500;

            setTimeout(autoPlay, duration);
        }
    }

    // Start the loop
    autoPlay();
}

// Get all slider containers and apply the slider function to each
const sliderContainers = document.querySelectorAll(".slider_wrapper");
sliderContainers.forEach((sliderContainer) => {
    slider(sliderContainer);
});
