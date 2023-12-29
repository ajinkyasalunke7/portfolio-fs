import React, { useEffect, useState } from "react";
import "./App.css";
import Portfolio from "./Components/Portfolio";
import ScrollToTopButton from "./Components/ScrollToTopButton";

function App() {
    document.addEventListener("keydown", function (event) {
        if (
            (event.ctrlKey && event.key === "u") || // Ctrl + U
            event.key === "F12" || // F12
            (event.ctrlKey && event.shiftKey && event.key === "i") // Ctrl + Shift + I
        ) {
            event.preventDefault();
            return false;
        }
    });
    useEffect(() => {
        const preventContextMenu = (e) => {
            e.preventDefault();
        };

        document.body.addEventListener("contextmenu", preventContextMenu);

        return () => {
            document.body.removeEventListener(
                "contextmenu",
                preventContextMenu
            );
        };
    }, []);

    window.onload = function () {
        console.clear();
    };

    const [fetchedData, setFetchedData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const screenWidth = window.innerWidth;
            document.body.style.backgroundColor = "#080808";

            if (screenWidth < 358) {
                console.log("Screen width is less than 358px.");
            } else {
                try {
                    const response = await fetch(
                        "https://portfolio-service-u5q0.onrender.com"
                    );

                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    const data = await response.json();
                    setFetchedData(data);
                    setIsLoading(false);
                } catch (error) {
                    console.error("Error fetching data:", error);
                    setFetchedData({});
                }
            }
        };

        fetchData();
    }, []);

    // Destructuring nested properties from fetchedData with null checks

    const {
        navbarInformation: { navbarName } = {},
        hero: { profession, fullName, country } = {},
        aboutMe: {
            aboutMeInfo,
            skills: { skillName, skillsContent } = {},
            experience: { experienceYear, experienceContent } = {},
            education: { educationYear, educationContent } = {},
        } = {},
        myServices: { serviceName, serviceContent } = {},
        myWork: { workName, workContent, workLink, workImage } = {},
        contactInformation: {
            email,
            countryCode,
            contactNumber,
            cvLink,
            googleSheetScript,
            socialLinks: {
                linkedin,
                facebook,
                instagram,
                whatsapp,
                twitter,
            } = {},
        } = {},
    } = fetchedData || {};

    return (
        <>
            {isLoading ? ( // Conditional rendering based on isLoading state
                <span className="loader" style={{ display: "block" }}></span>
            ) : (
                <Portfolio
                    navbarName={navbarName}
                    profession={profession}
                    fullName={fullName}
                    country={country}
                    aboutMeInfo={aboutMeInfo}
                    skillName={skillName}
                    skillsContent={skillsContent}
                    experienceYear={experienceYear}
                    experienceContent={experienceContent}
                    educationYear={educationYear}
                    educationContent={educationContent}
                    serviceName={serviceName}
                    serviceContent={serviceContent}
                    workName={workName}
                    workContent={workContent}
                    workLink={workLink}
                    workImage={workImage}
                    email={email}
                    countryCode={countryCode}
                    contactNumber={contactNumber}
                    cvLink={cvLink}
                    googleSheetScript={googleSheetScript}
                    linkedin={linkedin}
                    facebook={facebook}
                    instagram={instagram}
                    whatsapp={whatsapp}
                    twitter={twitter}
                />
            )}
            <ScrollToTopButton />
        </>
    );
}

export default App;
