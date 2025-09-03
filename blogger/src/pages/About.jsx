export default function AboutPage() {
    return (
        <div className="overflow-x-hidden font-sans">
            {/* Intro Section */}
            <section className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-white py-20 px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-10">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Our Blog</h1>
                        <p className="text-lg opacity-90 leading-relaxed">
                            Welcome to our blogging platform where ideas meet creativity.
                            We’re dedicated to providing insightful, inspiring, and authentic
                            stories from around the world.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                            alt="Blog intro"
                            className="rounded-2xl shadow-lg max-h-80 object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="max-w-6xl mx-auto py-20 px-6">
                <h2 className="text-3xl font-bold text-center mb-12">Our Mission & Vision</h2>
                <div className="grid md:grid-cols-2 gap-10">
                    <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition">
                        <h3 className="text-2xl font-semibold mb-4 text-purple-700">Our Mission</h3>
                        <p className="text-gray-600 leading-relaxed">
                            To create a global space where bloggers and readers connect through
                            meaningful content. We aim to empower individuals to share their
                            voices, inspire communities, and make knowledge accessible to all.
                        </p>
                    </div>
                    <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition">
                        <h3 className="text-2xl font-semibold mb-4 text-blue-700">Our Vision</h3>
                        <p className="text-gray-600 leading-relaxed">
                            To become the most trusted blogging platform that sparks innovation,
                            nurtures creativity, and drives positive change in the digital world.
                        </p>
                    </div>
                </div>
            </section>

            {/* Meet Blogger Team */}
            <section className="bg-gray-50 py-20 px-6">
                <h2 className="text-3xl font-bold text-center mb-12">Meet Blogger Team</h2>
                <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {[
                        { name: "John Doe", role: "Founder & CEO", img: "https://i.pravatar.cc/150?img=1" },
                        { name: "Jane Smith", role: "Content Strategist", img: "https://i.pravatar.cc/150?img=2" },
                        { name: "Alex Brown", role: "Lead Developer", img: "https://i.pravatar.cc/150?img=3" },
                    ].map((member, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-lg p-6 text-center hover:scale-105 hover:shadow-2xl transition duration-300"
                        >
                            <img
                                src={member.img}
                                alt={member.name}
                                className="w-28 h-28 mx-auto rounded-full mb-4 object-cover border-4 border-purple-200"
                            />
                            <h3 className="text-lg font-semibold">{member.name}</h3>
                            <p className="text-gray-500">{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
