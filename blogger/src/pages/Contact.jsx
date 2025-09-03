export default function Contact() {
    return (
        <section className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">Contact Us</h2>
            <form className="space-y-4 max-w-md mx-auto">
                <input type="text" placeholder="Your Name" className="w-full p-2 border rounded" />
                <input type="email" placeholder="Your Email" className="w-full p-2 border rounded" />
                <textarea placeholder="Message" rows="4" className="w-full p-2 border rounded"></textarea>
                <button type="submit" className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800">
                    Send Message
                </button>
            </form>
        </section>
    );
}
