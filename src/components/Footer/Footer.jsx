import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900  text-white py-10 px-6 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo & Description */}
        <div>
          <h1 className="text-2xl font-bold ">📰  <span className="text-gray-300">NewsStream</span></h1>
          <p className="text-sm mt-4 text-gray-300">
            Stay informed with authentic, timely, and reliable news from trusted publishers around the globe.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4 "><span className="text-gray-400">Quick Links</span></h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/allarticle" className="hover:text-white">All Articles</a></li>
            <li><a href="/premium" className="hover:text-white">Premium Article</a></li>
            <li><a href="/myarticle" className="hover:text-white">My Articles</a></li>
            <li><a href="/profile" className="hover:text-white">My Profile</a></li>
          </ul>
        </div>

        {/* Tags / Categories */}
        <div>
          <h2 className="text-xl font-semibold mb-4"><span className="text-gray-400">Popular Tags</span></h2>
          <div className="flex flex-wrap gap-2">
            {["Technology", "Health", "Politics", "Education", "Science", "Sports"].map((tag) => (
              <span key={tag} className="bg-gray-800 px-3 py-1 rounded-full text-sm  hover:text-black transition">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Social Icons */}
        <div>
          <h2 className="text-xl font-semibold mb-4"><span className="text-gray-400">Follow Us</span></h2>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/tania.tripty.5" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition"><FaFacebookF size={20} /></a>
            <a href="https://x.com/tania_tripty96" target="_blank" rel="noreferrer" className="hover:text-sky-400 transition"><FaTwitter size={20} /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-500 transition"><FaInstagram size={20} /></a>
            <a href="https://www.linkedin.com/in/tania-tripty/" target="_blank" rel="noreferrer" className="hover:text-blue-300 transition"><FaLinkedinIn size={20} /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} NewsStream. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
