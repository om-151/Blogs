import Slider from "react-slick";
import CountUp from "react-countup";
import { FaQuoteLeft } from "react-icons/fa";

// Carousel Images
const carouselImages = [
    "https://picsum.photos/id/1011/1200/500",
    "https://picsum.photos/id/1015/1200/500",
    "https://picsum.photos/id/1016/1200/500",
];

// Partners Logos
const partners = [
    "https://dummyimage.com/120x60/000/fff&text=Google",
    "https://dummyimage.com/120x60/000/fff&text=Microsoft",
    "https://dummyimage.com/120x60/000/fff&text=Amazon",
    "https://dummyimage.com/120x60/000/fff&text=Netflix",
    "https://dummyimage.com/120x60/000/fff&text=Meta",
    "https://dummyimage.com/120x60/000/fff&text=Adobe",
    "https://dummyimage.com/120x60/000/fff&text=Intel",
];

// Testimonials
const testimonials = [
    {
        name: "John Doe",
        role: "Reader",
        feedback:
            "This blog has changed the way I think about technology. The articles are well-written and insightful.",
        img: "https://i.pravatar.cc/100?img=1",
    },
    {
        name: "Sarah Lee",
        role: "Subscriber",
        feedback:
            "I love the design and readability. The content keeps me engaged every week!",
        img: "https://i.pravatar.cc/100?img=2",
    },
    {
        name: "Michael Smith",
        role: "Writer",
        feedback:
            "As a contributor, I found the platform smooth and user-friendly. The community is awesome.",
        img: "https://i.pravatar.cc/100?img=3",
    },
];

const Home = () => {
    // Settings for Image Carousel
    const heroSettings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 800,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    // Settings for Partners Carousel
    const partnerSettings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 0,
        slidesToShow: 4,
        slidesToScroll: 1,
        cssEase: "linear",
        arrows: false,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 640, settings: { slidesToShow: 2 } },
        ],
    };

    return (
        <div className="mt-16">
            {/* ---------- Image Carousel ---------- */}
            <Slider {...heroSettings}>
                {carouselImages.map((img, idx) => (
                    <div key={idx}>
                        <img
                            src={img}
                            alt={`slide-${idx}`}
                            className="w-full h-[400px] md:h-[500px] object-cover"
                        />
                    </div>
                ))}
            </Slider>

            {/* ---------- Our Achievements ---------- */}
            <section className="py-16 bg-gray-50 text-center">
                <h2 className="text-3xl font-bold mb-10">Our Achievements</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    <div>
                        <h3 className="text-4xl font-bold text-purple-600">
                            <CountUp end={500} duration={3} />+
                        </h3>
                        <p className="text-gray-600">Blogs Published</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-purple-600">
                            <CountUp end={20000} duration={3} />+
                        </h3>
                        <p className="text-gray-600">Active Readers</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-purple-600">
                            <CountUp end={100} duration={3} />+
                        </h3>
                        <p className="text-gray-600">Contributors</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-purple-600">
                            <CountUp end={50} duration={3} />+
                        </h3>
                        <p className="text-gray-600">Countries Reached</p>
                    </div>
                </div>
            </section>

            {/* ---------- Our Partners ---------- */}
            <section className="py-16 text-center bg-white">
                <h2 className="text-3xl font-bold mb-10">Our Partners</h2>
                <div className="max-w-6xl mx-auto">
                    <Slider {...partnerSettings}>
                        {partners.map((logo, idx) => (
                            <div key={idx} className="flex justify-center">
                                <img
                                    src={logo}
                                    alt="partner"
                                    className="h-16 object-contain grayscale hover:grayscale-0 transition"
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </section>

            {/* ---------- Testimonials ---------- */}
            <section className="py-16 bg-gray-50 text-center">
                <h2 className="text-3xl font-bold mb-10">Testimonials</h2>
                <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
                    {testimonials.map((t, idx) => (
                        <div
                            key={idx}
                            className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition text-left"
                        >
                            <FaQuoteLeft className="text-purple-600 text-2xl mb-4" />
                            <p className="italic text-gray-600 mb-4">"{t.feedback}"</p>
                            <div className="flex items-center gap-4">
                                <img
                                    src={t.img}
                                    alt={t.name}
                                    className="w-14 h-14 rounded-full"
                                />
                                <div>
                                    <h4 className="font-semibold text-gray-800">{t.name}</h4>
                                    <span className="text-sm text-gray-500">{t.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
