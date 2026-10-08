(() => {
    "use strict";

    document.addEventListener("DOMContentLoaded", () => {

        const loader = document.getElementById("pageLoader");
        const header = document.getElementById("siteHeader");
        const toggle = document.getElementById("mobileToggle");
        const nav = document.getElementById("mainNav");
        const backToTop = document.getElementById("backToTop");
        const year = document.getElementById("currentYear");


        /* --------------------------------
           PAGE LOADER
        -------------------------------- */

        if (loader) {

            window.addEventListener("load", () => {

                setTimeout(() => {
                    loader.classList.add("loaded");
                }, 250);

            });

            setTimeout(() => {
                loader.classList.add("loaded");
            }, 2000);
        }


        /* --------------------------------
           MOBILE NAVIGATION
        -------------------------------- */

        const closeMenu = () => {

            if (!toggle || !nav) return;

            toggle.classList.remove("active");
            nav.classList.remove("open");

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove("menu-open");
        };


        if (toggle && nav) {

            toggle.addEventListener("click", () => {

                const isOpen =
                    nav.classList.toggle("open");

                toggle.classList.toggle(
                    "active",
                    isOpen
                );

                toggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

                document.body.classList.toggle(
                    "menu-open",
                    isOpen
                );

            });


            nav.querySelectorAll("a").forEach(link => {

                link.addEventListener(
                    "click",
                    closeMenu
                );

            });


            document.addEventListener("keydown", event => {

                if (event.key === "Escape") {
                    closeMenu();
                }

            });


            document.addEventListener("click", event => {

                if (
                    nav.classList.contains("open") &&
                    !nav.contains(event.target) &&
                    !toggle.contains(event.target)
                ) {
                    closeMenu();
                }

            });

        }


        /* --------------------------------
           HEADER + BACK TO TOP
        -------------------------------- */

        const updateScrollState = () => {

            if (header) {

                header.classList.toggle(
                    "scrolled",
                    window.scrollY > 20
                );

            }


            if (backToTop) {

                backToTop.classList.toggle(
                    "visible",
                    window.scrollY > 500
                );

            }

        };


        updateScrollState();

        window.addEventListener(
            "scroll",
            updateScrollState,
            { passive: true }
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


        /* --------------------------------
           ACTIVE NAVIGATION
        -------------------------------- */

        const currentFile =
            (
                window.location.pathname
                    .split("/")
                    .pop() ||
                "index.html"
            ).toLowerCase();


        document
            .querySelectorAll(".main-nav .nav-link")
            .forEach(link => {

                const href =
                    (
                        link.getAttribute("href") ||
                        ""
                    )
                    .split("#")[0]
                    .toLowerCase();


                if (
                    href &&
                    href === currentFile
                ) {

                    link.classList.add("active");

                }

            });


        /* --------------------------------
           SCROLL REVEAL
        -------------------------------- */

        const revealItems =
            document.querySelectorAll(".reveal");


        if (
            "IntersectionObserver"
            in window
        ) {

            const observer =
                new IntersectionObserver(
                    (entries, obs) => {

                        entries.forEach(entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "revealed"
                                );

                                obs.unobserve(
                                    entry.target
                                );

                            }

                        });

                    },
                    {
                        threshold: 0.12
                    }
                );


            revealItems.forEach(element => {

                observer.observe(element);

            });

        } else {

            revealItems.forEach(element => {

                element.classList.add(
                    "revealed"
                );

            });

        }


        /* --------------------------------
           CURRENT YEAR
        -------------------------------- */

        if (year) {

            year.textContent =
                new Date().getFullYear();

        }


        /* --------------------------------
           SMOOTH INTERNAL LINKS
        -------------------------------- */

        document
            .querySelectorAll('a[href*="#"]')
            .forEach(link => {

                link.addEventListener(
                    "click",
                    event => {

                        const href =
                            link.getAttribute("href");

                        if (!href) return;


                        const parts =
                            href.split("#");

                        const path =
                            parts[0];

                        const hash =
                            parts[1];


                        if (!hash) return;


                        const samePage =
                            !path ||
                            path ===
                                window.location.pathname
                                    .split("/")
                                    .pop() ||
                            (
                                path === "index.html" &&
                                (
                                    currentFile === "" ||
                                    currentFile ===
                                        "index.html"
                                )
                            );


                        if (samePage) {

                            const target =
                                document.getElementById(
                                    hash
                                );


                            if (target) {

                                event.preventDefault();

                                target.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start"
                                });

                                history.replaceState(
                                    null,
                                    "",
                                    `#${hash}`
                                );

                            }

                        }

                    }
                );

            });

    });

})();