import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCoffee } from "react-icons/fi";

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>(
    {},
  );

  const categories = ["All", "Grand Opening", "Interior", "Food", "Drinks"];

  const images = [
    // Grand Opening Section
    {
      url: "/opening-2.jpg",
      title: "Traditional Rituals",
      category: "Grand Opening",
    },
    {
      url: "/opening-3.jpg",
      title: "Deelectaa Outlet Sign",
      category: "Grand Opening",
    },
    {
      url: "/opening-4.jpg",
      title: "Ribbon Cutting Moments",
      category: "Grand Opening",
    },
    {
      url: "/opening-55.jpg",
      title: "Ribbon Cutting Moments",
      category: "Grand Opening",
    },
    {
      url: "/Deelecta cafe-72.jpg",
      title: "Ribbon Cutting Moments",
      category: "Grand Opening",
    },
    {
      url: "/Deelecta cafe-71.jpg",
      title: "Ribbon Cutting Moments",
      category: "Grand Opening",
    },
    {
      url: "/Deelecta cafe-70.jpg",
      title: "Ribbon Cutting Moments",
      category: "Grand Opening",
    },
    {
      url: "/Deelecta cafe-58.jpg",
      title: "Ribbon Cutting Moments",
      category: "Grand Opening",
    },
    {
      url: "/Deelecta cafe-54.jpg",
      title: "Ribbon Cutting Moments",
      category: "Grand Opening",
    },
    {
      url: "/Deelecta cafe-53.jpg",
      title: "Ribbon Cutting Moments",
      category: "Grand Opening",
    },
    {
      url: "/opening-10.jpg",
      title: "Ribbon Cutting Moments",
      category: "Grand Opening",
    },
    {
      url: "/opening-12.jpg",
      title: "Ribbon Cutting Moments",
      category: "Grand Opening",
    },
    {
      url: "/opening-14.jpg",
      title: "Ribbon Cutting Moments",
      category: "Grand Opening",
    },
    {
      url: "/opening-11.jpg",
      title: "Ribbon Cutting Moments",
      category: "Grand Opening",
    },
    {
      url: "/opening-8.jpg",
      title: "Ribbon Cutting Moments",
      category: "Grand Opening",
    },

    // Interior Section
    {
      url: "/Deelecta cafe-101.jpg",
      title: "Main Dining Area",
      category: "Interior",
    },
    {
      url: "/Deelecta cafe-100.jpg",
      title: "Main Dining Area",
      category: "Interior",
    },
    {
      url: "/Deelecta cafe-099.jpg",
      title: "Main Dining Area",
      category: "Interior",
    },
    {
      url: "/Deelecta cafe-91.jpg",
      title: "Main Dining Area",
      category: "Interior",
    },
    {
      url: "/Deelecta cafe-122.jpg",
      title: "Main Dining Area",
      category: "Interior",
    },
    {
      url: "/Deelecta cafe-119.jpg",
      title: "Main Dining Area",
      category: "Interior",
    },

    // Food & Drinks Section
    {
      url: "/brand/burger.webp",
      title: "From our menu: savoury kitchen",
      category: "Food",
    },
    {
      url: "/brand/dessert.webp",
      title: "From our menu: desserts",
      category: "Food",
    },
    {
      url: "/brand/coffee.webp",
      title: "From our menu: coffee",
      category: "Drinks",
    },
    {
      url: "/brand/cooler.webp",
      title: "From our menu: coolers",
      category: "Drinks",
    },
  ];

  // Reset visible count when category changes

  const handleImageLoad = (url: string) => {
    setLoadedImages((prev) => ({ ...prev, [url]: true }));
  };

  const filteredImages =
    activeCategory === "All"
      ? images
      : images.filter((img) => img.category === activeCategory);

  const visibleImages = filteredImages.slice(0, visibleCount);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-stone-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">
            Our Moments
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
            Gallery
          </h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Explore the journey of Deelectaa, from our traditional grand opening
            ceremony to our daily artisanal creations.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              aria-pressed={activeCategory === category}
              onClick={() => {
                setActiveCategory(category);
                setVisibleCount(6);
              }}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-white shadow-xl shadow-primary/30 transform scale-105"
                  : "bg-white text-stone-600 hover:bg-stone-100 shadow-sm"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry-style Grid */}
        <motion.div
          layout
          className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
        >
          <AnimatePresence mode="popLayout">
            {visibleImages.map((img) => (
              <motion.div
                key={img.url}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative group overflow-hidden rounded-[2rem] bg-white p-2 shadow-xl shadow-stone-200/50 break-inside-avoid min-h-[300px]"
              >
                {!loadedImages[img.url] && (
                  <div className="absolute inset-0 bg-stone-100 animate-pulse rounded-[1.5rem] m-2 z-10 flex items-center justify-center">
                    <FiCoffee className="text-stone-300 text-4xl animate-bounce" />
                  </div>
                )}
                <img
                  src={img.url}
                  alt={img.title}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => handleImageLoad(img.url)}
                  onError={() => handleImageLoad(img.url)}
                  className={`w-full h-auto rounded-[1.5rem] transition-all duration-700 group-hover:scale-110 ${
                    loadedImages[img.url] ? "opacity-100" : "opacity-0"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-100 transition-opacity duration-500 rounded-[1.5rem] m-2 z-20">
                  <div className="absolute bottom-6 left-6">
                    <span className="text-amber-200 font-bold text-xs uppercase tracking-widest mb-1 block">
                      {img.category}
                    </span>
                    <h3 className="text-white font-bold text-lg">
                      {img.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        {visibleCount < filteredImages.length && (
          <div className="mt-16 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="bg-stone-900 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-primary transition-all duration-300 shadow-xl shadow-stone-900/20 hover:-translate-y-1"
            >
              Load More Moments
            </button>
          </div>
        )}

        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-stone-400 italic">
              No images found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
