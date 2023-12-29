import React, { useState, useEffect } from "react";

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show/hide the button based on scroll position
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        // Clean up the event listener
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    // Function to scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // For smooth scrolling
        });
    };

    return (
        <a
            onClick={scrollToTop}
            style={{
                display: isVisible ? "block" : "none",
                position: "fixed",
                bottom: "20px",
                right: "20px",
                zIndex: "99",
                fontSize: "16px",
                border: "none",
                outline: "none",
                backgroundColor: "#ff004f",
                color: "white",
                cursor: "pointer",
                padding: "5px 10px",
                borderRadius: "5px",
            }}
        >
            <i class="fa-solid fa-square-caret-up"></i>
        </a>
    );
};

export default ScrollToTopButton;
