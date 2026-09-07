/* =====================================================
   MARUFA AKTER — PERSONAL PORTFOLIO & BLOG
   Main JavaScript
===================================================== */


document.addEventListener("DOMContentLoaded", () => {


    /* =========================
       CURRENT YEAR
    ========================= */

    const currentYear =
        document.getElementById("currentYear");

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }



    /* =========================
       MOBILE MENU
    ========================= */

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.getElementById("navLinks");


    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("open");

            document.body.classList.toggle("menu-open");


            const icon =
                menuToggle.querySelector("i");


            if (navLinks.classList.contains("open")) {

                icon.className =
                    "fa-solid fa-xmark";

            } else {

                icon.className =
                    "fa-solid fa-bars";

            }

        });



        /* Close menu after clicking a link */

        navLinks
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener("click", () => {

                    navLinks.classList.remove("open");

                    document.body.classList.remove("menu-open");


                    const icon =
                        menuToggle.querySelector("i");

                    icon.className =
                        "fa-solid fa-bars";

                });

            });

    }



    /* =========================
       HEADER SCROLL EFFECT
    ========================= */

    const header =
        document.querySelector(".header");


    function updateHeader() {

        if (!header) return;


        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    updateHeader();


    window.addEventListener(
        "scroll",
        updateHeader
    );



    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -30px 0px"
                }

            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }



    /* =========================
       IMAGE FALLBACK
    ========================= */

    const images =
        document.querySelectorAll(
            ".profile-image, .content-image"
        );


    images.forEach(image => {

        image.addEventListener("error", () => {

            image.style.display = "none";

        });

    });



    /* =========================
       ACTIVE NAVIGATION LINK
    ========================= */

    const sections =
        document.querySelectorAll("section[id]");

    const navigationLinks =
        document.querySelectorAll(
            ".nav-links a"
        );


    function updateActiveNav() {

        let currentSection = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 160;

            const sectionHeight =
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navigationLinks.forEach(link => {

            link.classList.remove("active");


            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }


    updateActiveNav();


    window.addEventListener(
        "scroll",
        updateActiveNav
    );



    /* =========================
       BACK TO TOP BUTTON
    ========================= */

    const backToTop =
        document.getElementById("backToTop");


    function updateBackToTop() {

        if (!backToTop) return;


        if (window.scrollY > 550) {

            backToTop.classList.add("visible");

        } else {

            backToTop.classList.remove(
                "visible"
            );

        }

    }


    updateBackToTop();


    window.addEventListener(
        "scroll",
        updateBackToTop
    );


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }



    /* =========================
       CONTACT FORM
    ========================= */

    const contactForm =
        document.getElementById("contactForm");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document
                        .getElementById("name")
                        .value
                        .trim();

                const email =
                    document
                        .getElementById("email")
                        .value
                        .trim();

                const message =
                    document
                        .getElementById("message")
                        .value
                        .trim();


                if (!name || !email || !message) {

                    return;

                }


                const subject =
                    encodeURIComponent(
                        `Website message from ${name}`
                    );


                const body =
                    encodeURIComponent(
                        `Hello Marufa,\n\n` +
                        `${message}\n\n` +
                        `From: ${name}\n` +
                        `Email: ${email}`
                    );


                window.location.href =
                    `mailto:marufa4412@gmail.com?subject=${subject}&body=${body}`;

            }
        );

    }



    /* =========================
       SMOOTH SCROLL
    ========================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                function (event) {

                    const href =
                        this.getAttribute("href");


                    if (
                        !href ||
                        href === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(href);


                    if (target) {

                        event.preventDefault();


                        target.scrollIntoView({

                            behavior: "smooth",

                            block: "start"

                        });

                    }

                }
            );

        });



    /* =========================
       ESC KEY CLOSES MOBILE MENU
    ========================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                navLinks &&
                navLinks.classList.contains("open")
            ) {

                navLinks.classList.remove("open");

                document.body.classList.remove("menu-open");


                if (menuToggle) {

                    const icon =
                        menuToggle.querySelector("i");

                    icon.className =
                        "fa-solid fa-bars";

                }

            }

        }
    );



    /* =========================
       CLOSE MOBILE MENU
       WHEN CLICKING OUTSIDE
    ========================= */

    document.addEventListener(
        "click",
        event => {

            if (
                !navLinks ||
                !menuToggle ||
                !navLinks.classList.contains("open")
            ) {

                return;

            }


            const clickedInsideMenu =
                navLinks.contains(event.target);

            const clickedMenuButton =
                menuToggle.contains(event.target);


            if (
                !clickedInsideMenu &&
                !clickedMenuButton
            ) {

                navLinks.classList.remove("open");

                document.body.classList.remove("menu-open");


                const icon =
                    menuToggle.querySelector("i");

                icon.className =
                    "fa-solid fa-bars";

            }

        }
    );



    /* =========================
       PAGE READY
    ========================= */

    console.log(
        "%cMarufa's Portfolio",
        "font-size:18px; font-weight:bold; color:#53634f;"
    );

    console.log(
        "Data • Research • Stories • Growth"
    );

});