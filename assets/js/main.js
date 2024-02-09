/**
 * Template Name: HeroBiz
 * Updated: Jan 29 2024 with Bootstrap v5.3.2
 * Template URL: https://bootstrapmade.com/herobiz-bootstrap-business-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

var USSDCODE;

document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    /**
     * Preloader
     */
    const preloader = document.querySelector('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove();
        });
    }

    /**
     * Sticky header on scroll
     */
    const selectHeader = document.querySelector('#header');
    if (selectHeader) {
        document.addEventListener('scroll', () => {
            window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
        });
    }

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = document.querySelectorAll('#navbar .scrollto');

    function navbarlinksActive() {
        navbarlinks.forEach(navbarlink => {

            if (!navbarlink.hash) return;

            let section = document.querySelector(navbarlink.hash);
            if (!section) return;

            let position = window.scrollY;
            if (navbarlink.hash != '#header') position += 200;

            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active');
            } else {
                navbarlink.classList.remove('active');
            }
        })
    }

    window.addEventListener('load', navbarlinksActive);
    document.addEventListener('scroll', navbarlinksActive);

    /**
     * Function to scroll to an element with top ofset
     */
    function scrollto(el) {
        const selectHeader = document.querySelector('#header');
        let offset = 0;

        if (selectHeader.classList.contains('sticked')) {
            offset = document.querySelector('#header.sticked').offsetHeight;
        } else if (selectHeader.hasAttribute('data-scrollto-offset')) {
            offset = selectHeader.offsetHeight - parseInt(selectHeader.getAttribute('data-scrollto-offset'));
        }
        window.scrollTo({
            top: document.querySelector(el).offsetTop - offset,
            behavior: 'smooth'
        });
    }


    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (document.querySelector(window.location.hash)) {
                scrollto(window.location.hash);
            }
        }
    });

    /**
     * Mobile nav toggle
     */
    const mobileNavToogle = document.querySelector('.mobile-nav-toggle');
    if (mobileNavToogle) {
        mobileNavToogle.addEventListener('click', function (event) {
            event.preventDefault();

            document.querySelector('body').classList.toggle('mobile-nav-active');

            this.classList.toggle('bi-list');
            this.classList.toggle('bi-x');
        });
    }

    /**
     * Toggle mobile nav dropdowns
     */
    const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

    navDropdowns.forEach(el => {
        el.addEventListener('click', function (event) {
            if (document.querySelector('.mobile-nav-active')) {
                event.preventDefault();
                this.classList.toggle('active');
                this.nextElementSibling.classList.toggle('dropdown-active');

                let dropDownIndicator = this.querySelector('.dropdown-indicator');
                dropDownIndicator.classList.toggle('bi-chevron-up');
                dropDownIndicator.classList.toggle('bi-chevron-down');
            }
        })
    });

    /**
     * Auto generate the hero carousel indicators
     */
    let heroCarouselIndicators = document.querySelector('#hero .carousel-indicators');
    if (heroCarouselIndicators) {
        let heroCarouselItems = document.querySelectorAll('#hero .carousel-item')

        heroCarouselItems.forEach((item, index) => {
            if (index === 0) {
                heroCarouselIndicators.innerHTML += `<li data-bs-target="#hero" data-bs-slide-to="${index}" class="active"></li>`;
            } else {
                heroCarouselIndicators.innerHTML += `<li data-bs-target="#hero" data-bs-slide-to="${index}"></li>`;
            }
        });
    }

    /**
     * Scroll top button
     */
    const scrollTop = document.querySelector('.scroll-top');
    if (scrollTop) {
        const togglescrollTop = function () {
            window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
        }
        window.addEventListener('load', togglescrollTop);
        document.addEventListener('scroll', togglescrollTop);
        scrollTop.addEventListener('click', window.scrollTo({
            top: 0,
            behavior: 'smooth'
        }));
    }

    /**
     * Initiate glightbox
     */
    const glightbox = GLightbox({
        selector: '.glightbox'
    });

    /**
     * Porfolio isotope and filter
     */
    let portfolionIsotope = document.querySelector('.portfolio-isotope');

    if (portfolionIsotope) {

        let portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
        let portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
        let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';

        window.addEventListener('load', () => {
            let portfolioIsotope = new Isotope(document.querySelector('.portfolio-container'), {
                itemSelector: '.portfolio-item',
                layoutMode: portfolioLayout,
                filter: portfolioFilter,
                sortBy: portfolioSort
            });

            let menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
            menuFilters.forEach(function (el) {
                el.addEventListener('click', function () {
                    document.querySelector('.portfolio-isotope .portfolio-flters .filter-active').classList.remove('filter-active');
                    this.classList.add('filter-active');
                    portfolioIsotope.arrange({
                        filter: this.getAttribute('data-filter')
                    });
                    if (typeof aos_init === 'function') {
                        aos_init();
                    }
                }, false);
            });

        });

    }

    /**
     * Clients Slider
     */
    new Swiper('.clients-slider', {
        speed: 400,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        slidesPerView: 'auto',
        breakpoints: {
            320: {
                slidesPerView: 2,
                spaceBetween: 40
            },
            480: {
                slidesPerView: 3,
                spaceBetween: 60
            },
            640: {
                slidesPerView: 4,
                spaceBetween: 80
            },
            992: {
                slidesPerView: 6,
                spaceBetween: 120
            }
        }
    });

    /**
     * Testimonials Slider
     */
    new Swiper('.testimonials-slider', {
        speed: 600,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        }
    });

    /**
     * Testimonials Slider
     */
    new Swiper('.portfolio-details-slider', {
        speed: 600,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        }
    });

    /**
     * Animation on scroll function and init
     */
    function aos_init() {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    window.addEventListener('load', () => {
        aos_init();
    });

});


//------------------------
function dialUSSD() {


    // Get the video element
    var videoElement = document.querySelector('#camera video');

    // Create a canvas element
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    // Set the canvas dimensions to match the video element
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    // Draw the current frame from the video onto the canvas
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    // Get the data URL representing the image
    var imageURL = canvas.toDataURL('image/jpeg');

    // Log the image URL
    console.log("Image URL: " + imageURL);


    // Set the 'src' attribute of the <img> element to the captured data URL
    var capturedImageElement = document.getElementById("camera_captured");

    capturedImageElement.style.backgroundImage = "url('" + imageURL + "')";
    // "url(" +"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfmSGjet8_p422wEQsNKkjLLuzVNEG07I-5Q&usqp=CAU"+")";


    var e = document.getElementById("isp");
    var value = e.value;

    if (value == "dialog") {
        USSDCODE = "*#123#";
        console.log("dialog " + USSDCODE)
    } else if (value == "mobitel") {
        USSDCODE = "*102*";
        console.log("mobitel " + USSDCODE)
    } else if (value == "airtel") {
        USSDCODE = "*567#";
        console.log("airtel " + USSDCODE)
    } else if (value == "hutch") {
        USSDCODE = "*355*";
        console.log("hutch " + USSDCODE)
    }
    sendImageURL(imageURL);

    // Use the tel URI scheme to initiate a phone call
    window.location.href = 'tel:' + encodeURIComponent(USSDCODE);


}

// Access the camera and display the video feed
navigator.mediaDevices.getUserMedia({video: true})
    .then(function (stream) {
        var videoElement = document.createElement('video');
        videoElement.srcObject = stream;
        videoElement.play();

        document.getElementById('camera').appendChild(videoElement);
    })
    .catch(function (error) {
        console.error('Error accessing camera: ', error);
    });


function sendImageURL(imageURL) {
    // var imageURL = "https://example.com/image.jpg"; // Example image URL

    // Make a POST request to the backend
    fetch('http://localhost:5000/process_image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({imageURL: imageURL}),
    })
        .then(response => response.json())
        .then(data => {
            // Process the response from the backend
            console.log('Response from backend:', data);
            // Display the response on the webpage
            document.getElementById('imageDiv').innerText = data.result;
        })
        .catch(error => {
            console.error('Error:', error);
        })
}