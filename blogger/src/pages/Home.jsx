import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import images properly
import Blog1 from "../assets/Hero/BlogSlider-1.jpg";
import Blog2 from "../assets/Hero/BlogSlider-2.jpg";
import Blog3 from "../assets/Hero/BlogSlider-3.jpg";
import Testimonials from "./Testimonials";

const images = [Blog1, Blog2, Blog3];

const Home = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };

    const logos = [
        "https://1000logos.net/wp-content/uploads/2020/08/Blogger-Logo.png",
        "https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo.png",
        "https://1000logos.net/wp-content/uploads/2017/05/Youtube-Logo.png",
        "https://1000logos.net/wp-content/uploads/2020/08/Blogger-Logo-1999.png",
        "https://1000logos.net/wp-content/uploads/2021/05/Google-logo.png",
    ];
    const REPEAT_COUNT = 50;
    const repeatedLogos = Array(REPEAT_COUNT).fill(logos).flat();

    const Counter = ({ target, duration = 2000, title, suffix = "+" }) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
            let start = 0;
            const increment = target / (duration / 10);

            const counter = setInterval(() => {
                start += increment;
                if (start >= target) {
                    start = target;
                    clearInterval(counter);
                }
                setCount(Math.floor(start));
            }, 10);

            return () => clearInterval(counter);
        }, [target, duration]);

        return (
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-4xl font-bold text-[#6438C0] flex items-start">
                    <span className="inline-flex items-center">
                        <span>{count}</span>
                        {count === target && (
                            <span className="text-2xl ml-1">{suffix}</span>
                        )}
                    </span>
                </h2>
                {title && <p className="mt-2 text-gray-600 text-lg">{title}</p>}
            </div>
        );
    };

    return (
        <div className="w-full">
            {/* Slider Section */}
            <div className="w-full">
                <Slider {...settings}>
                    {images.map((img, index) => (
                        <div key={index}>
                            <img
                                src={img}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-[500px] object-cover"
                            />
                        </div>
                    ))}
                </Slider>
            </div>
            <div className="py-16 bg-gray-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-10">Our Achievements</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <Counter target={1000} title="Users" suffix="+" />
                        <Counter target={250} title="Blogs Published" />
                        <Counter target={50} title="Awards Won" />
                        <Counter target={120} title="Contributors" />
                    </div>
                </div>
            </div>
            <div className="w-full bg-gray-100 py-10 overflow-hidden">
                <h2 className="text-3xl font-bold text-center mb-8">Our Partners</h2>

                {/* Scrolling wrapper */}
                <div className="overflow-hidden relative">
                    {/* Moving track */}
                    <div className="scrolling-track flex gap-12">
                        {repeatedLogos.map((logo, index) => (
                            <img
                                key={index}
                                src={logo}
                                alt={`Partner ${index + 1}`}
                                className="h-16 w-auto object-contain"
                            />
                        ))}
                    </div>
                </div>

                {/* Inline animation CSS */}
                <style>{`
                .scrolling-track {
                    display: flex;
                    width: calc(200%); /* important for seamless looping */
                    animation: scrollLeft 25s linear infinite;
                }

                @keyframes scrollLeft {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>
            </div>
            <Testimonials />
        </div>
    );
};

export default Home;
