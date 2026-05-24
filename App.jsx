import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Heart, Music, MapPin, Calendar, Quote, Sparkles, ArrowDown } from 'lucide-react';

// --- Components ---

// 1. Custom Cursor
const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <>
      <motion.div
        className="cursor-dot"
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "tween", ease: "backOut", duration: 0 }}
      />
      <motion.div
        className="cursor-outline"
        animate={{ 
          x: position.x, 
          y: position.y, 
          scale: hovered ? 1.5 : 1,
          backgroundColor: hovered ? "rgba(255, 107, 157, 0.1)" : "transparent"
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
      />
    </>
  );
};

// 2. Floating Hearts/Particles
const FloatingHearts = () => {
  const hearts = Array.from({ length: 15 });
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-400 opacity-30"
          initial={{ x: Math.random() * 100 + "vw", y: "110vh", scale: 0 }}
          animate={{ 
            y: "-10vh", 
            x: Math.random() * 100 + "vw",
            rotate: Math.random() * 360,
            opacity: 0 
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 10
          }}
        >
          <Heart fill="currentColor" size={Math.random() * 20 + 10} />
        </motion.div>
      ))}
    </div>
  );
};

// 3. Loading / Welcome Screen
const LoadingScreen = ({ onEnter }) => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2 }}
      className="fixed inset-0 z-50 bg-pink-50 flex flex-col items-center justify-center"
    >
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="text-6xl"
      >
        💖
      </motion.div>
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="font-handwriting text-4xl text-pink-600 mt-4"
      >
        Opening Sreelela's Diary...
      </motion.h1>
    </motion.div>
  );
};

// --- Main Sections ---

const WelcomeSection = () => (
  <section className="min-h-screen flex flex-col items-center justify-center relative px-6">
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 1 }}
      className="text-center z-10"
    >
      <div className="inline-block p-4 rounded-full border-2 border-pink-300 bg-white/40 backdrop-blur-md shadow-[0_0_30px_rgba(255,182,193,0.5)] mb-6">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Heart size={48} className="text-pink-500 fill-pink-500" />
        </motion.div>
      </div>
      
      <h1 className="font-serif-luxury text-5xl md:text-7xl text-pink-800 mb-4">
        Welcome to <br /> <span className="italic">Sreelela's</span> Diary
      </h1>
      <p className="font-handwriting text-3xl text-pink-600 mb-12">
        A collection of our moments 💗
      </p>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-pink-400 to-rose-400 text-white px-8 py-3 rounded-full shadow-lg text-lg font-semibold flex items-center gap-2 mx-auto"
        onClick={() => document.getElementById('memories').scrollIntoView({ behavior: 'smooth' })}
      >
        Open Diary <ArrowDown size={18} />
      </motion.button>
    </motion.div>
  </section>
);

const MemoriesSection = () => {
  const memories = [
    { id: 1, title: "Page 1", date: "The Start", img: "https://images.unsplash.com/photo-1516589178581-6cd783d09357?auto=format&fit=crop&w=600&q=80", caption: "When we first met and my heart skipped a beat." },
    { id: 2, title: "Page 2", date: "First Date", img: "https://images.unsplash.com/photo-1518199266791-5375f48966de?auto=format&fit=crop&w=600&q=80", caption: "The coffee that tasted like forever." },
    { id: 3, title: "Page 3", date: "Our Spot", img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=600&q=80", caption: "Just you and me against the world." },
    { id: 4, title: "Page 4", date: "Crazy Us", img: "https://images.unsplash.com/photo-1529619768328-e37af76c6fe5?auto=format&fit=crop&w=600&q=80", caption: "Smiling till our cheeks hurt." },
  ];

  return (
    <section id="memories" className="min-h-screen py-20 px-4 md:px-20 bg-white/30 backdrop-blur-sm">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="font-handwriting text-5xl text-center text-pink-700 mb-16"
      >
        Our Memories
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {memories.map((mem, i) => (
          <motion.div
            key={mem.id}
            initial={{ opacity: 0, rotate: Math.random() * 10 - 5 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
            className="bg-white p-4 rounded-sm shadow-xl transform rotate-1 border border-pink-100"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-pink-200 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
              <img src={mem.img} alt={mem.title} className="w-full h-80 object-cover rounded-sm shadow-inner sepia-[.2]" />
            </div>
            <div className="mt-4 border-t border-pink-200 pt-4">
              <h3 className="font-serif-luxury text-2xl text-pink-800">{mem.title}</h3>
              <p className="text-pink-500 italic text-sm mb-2 flex items-center gap-1"><Calendar size={12} /> {mem.date}</p>
              <p className="font-handwriting text-xl text-gray-600">"{mem.caption}"</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const LoveNotes = () => {
  const text = "My dear Sreelela, Every moment with you is like a page out of a fairytale. I love you more than words can describe. You are my today and all my tomorrows. ❤️";

  return (
    <section className="min-h-[80vh] flex items-center justify-center py-20 relative overflow-hidden">
       <div className="absolute inset-0 bg-gradient-to-b from-pink-100 to-white opacity-50 -z-10"></div>
       
       <div className="max-w-4xl mx-6 bg-[url('https://www