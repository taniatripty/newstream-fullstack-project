import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react"; 
import Swal from "sweetalert2"; // ✅ install with: npm install sweetalert2

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    // ✅ SweetAlert2 instead of normal alert
    Swal.fire({
      title: "🎉 Subscribed!",
      text: `You have subscribed with: ${email}`,
      icon: "success",
      confirmButtonColor: "#14b8a6", // teal-500
    });

    setEmail("");
  };

  return (
    <section className="relative py-16 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white overflow-hidden">
      {/* Background subtle texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/subtle-dots.png')] opacity-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative max-w-3xl mx-auto text-center"
      >
        {/* Badge */}
        <div className="inline-flex items-center justify-center bg-teal-500/10 px-4 py-2 rounded-full mb-6">
          <span className="text-teal-400 text-sm font-medium">Stay Updated</span>
        </div>
        
        {/* Title + Subtitle */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Join Our Newsletter
        </h2>
        <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
          Get curated content, exclusive offers, and the latest news delivered straight to your inbox.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col md:flex-row items-center justify-center gap-3"
        >
          <div className="relative w-full md:w-96">
            {/* ✅ Mail Icon with teal color */}
            <Mail 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-400" 
              size={18} 
            />
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-600 bg-slate-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 placeholder-slate-400 text-white transition-all"
            />
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-lg shadow-md hover:shadow-teal-500/20 transition-all whitespace-nowrap"
          >
            Subscribe Now
          </motion.button>
        </form>

        <p className="mt-6 text-sm text-slate-400">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </motion.div>
    </section>
  );
};

export default NewsletterSignup;
