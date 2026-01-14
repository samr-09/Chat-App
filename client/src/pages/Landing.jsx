import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Landing = () => {
  return (
    <div className="relative min-h-screen overflow-hidden text-white">

      {/* ===== BACKGROUND LAYERS ===== */}
      <div className="absolute inset-0 bg-[#05060f]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(168,85,247,0.18),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(236,72,153,0.18),_transparent_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05060f]/40 to-[#05060f]" />

      {/* ===== CONTENT ===== */}
      <div className="relative z-10">

        {/* ================= NAVBAR ================= */}
        <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
  <img
    src="/src/assets/favicon.svg"
    alt="QuickChat logo"
    className="w-8 h-8"
  />
  <span className="text-2xl font-bold tracking-tight">
    QuickChat
  </span>
</div>


            <div className="hidden md:flex gap-10 text-sm text-gray-300">
              <a href="#features" className="hover:text-white transition">Features</a>
              <a href="#how" className="hover:text-white transition">How it works</a>
              <a href="#contact" className="hover:text-white transition">Contact</a>
            </div>

            <div className="flex gap-4">
              <Link
                to="/login"
                className="px-5 py-2 text-sm rounded-lg border border-white/20 hover:bg-white/10 transition"
              >
                Login
              </Link>
              <Link
                to="/login"
                className="px-6 py-2 text-sm rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30 hover:opacity-90 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </nav>

        {/* ================= HERO ================= */}
        <section className="pt-44 pb-36 px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight"
          >
            Conversations,
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              engineered for speed.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 max-w-2xl mx-auto text-gray-300 text-lg leading-relaxed"
          >
            QuickChat is a next-generation real-time messaging platform built
            for people who expect instant delivery, uncompromised privacy,
            and a premium digital experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex justify-center gap-6"
          >
            <Link
              to="/login"
              className="px-12 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-lg font-semibold shadow-xl shadow-purple-500/40 hover:scale-[1.04] transition"
            >
              Create Free Account
            </Link>

            <a
              href="#features"
              className="px-12 py-4 rounded-xl border border-white/20 text-lg hover:bg-white/10 transition"
            >
              Explore Features
            </a>
          </motion.div>
        </section>

        {/* ================= FEATURES ================= */}
        <section id="features" className="py-36 px-6 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">
            Built for modern communication
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 hover:border-purple-400/40 hover:shadow-xl hover:shadow-purple-500/10 transition"
              >
                <h3 className="text-xl font-semibold mb-4">{f.title}</h3>
                <p className="text-gray-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section id="how" className="py-36 bg-black/40 px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">
            Simple by design. Powerful by nature.
          </h2>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 text-center">
            <Step number="01" title="Create your account" />
            <Step number="02" title="Connect instantly" />
            <Step number="03" title="Chat without limits" />
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section id="contact" className="py-40 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-2xl p-16 rounded-[2.5rem] border border-white/20 shadow-2xl shadow-purple-500/20"
          >
            <h2 className="text-4xl font-bold mb-6">
              Experience communication at its best
            </h2>
            <p className="text-gray-300 mb-10 text-lg">
              Join QuickChat today and discover what premium messaging truly feels like.
            </p>

            <Link
              to="/login"
              className="px-14 py-5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-lg font-semibold shadow-xl shadow-purple-500/40 hover:scale-[1.05] transition"
            >
              Get Started Free
            </Link>
          </motion.div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="border-t border-white/10 py-12 text-center text-gray-400 text-sm">
          <p>© 2026 QuickChat. All rights reserved.</p>
          <p className="mt-2">Designed for speed. Built for people.</p>
        </footer>
      </div>
    </div>
  );
};

export default Landing;

/* ===== DATA ===== */

const features = [
  {
    title: "⚡ Instant real-time messaging",
    desc: "Messages delivered in milliseconds using a modern real-time architecture."
  },
  {
    title: "🔐 Privacy-first security",
    desc: "End-to-end secure authentication designed to protect user data."
  },
  {
    title: "🎨 Premium experience",
    desc: "A refined, distraction-free interface crafted with attention to detail."
  }
];

const Step = ({ number, title }) => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10">
    <span className="text-purple-400 text-sm font-semibold tracking-widest">
      {number}
    </span>
    <h3 className="text-xl font-semibold mt-4">{title}</h3>
  </div>
);
