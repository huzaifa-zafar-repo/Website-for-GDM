import { useEffect, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { Link } from "react-router-dom";
import { VIDEO_LINKS } from "@/constants";
import { Button } from "./button";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Creative Logo Design",
    description: "Unique and memorable logo designs that capture your brand's essence with modern creative flair.",
    image: "/img/pr1.jpg"
  },
  {
    id: 2,
    name: "Brand Identity Kit",
    description: "Complete branding solutions including logo, colors, typography, and visual guidelines for impact.",
    image: "/img/pr2.jpg"
  },
  {
    id: 3,
    name: "3D Poster Design",
    description: "Eye-catching three-dimensional poster designs that make your message stand out with visual depth.",
    image: "/img/pr3.jpg"
  },
  {
    id: 4,
    name: "Web Design Portfolio",
    description: "Modern, responsive website designs that showcase creativity and deliver exceptional user experiences.",
    image: "/img/pr10.webp"
  },
  {
    id: 5,
    name: "Social Media Graphics",
    description: "Engaging visual content for social platforms designed to boost engagement and brand recognition.",
    image: "/img/pr5.jpg"
  },
  {
    id: 6,
    name: "Print Design Solutions",
    description: "Professional print materials including brochures, flyers, and business cards with creative impact.",
    image: "/img/pr6.jpg"
  },
  {
    id: 7,
    name: "Digital Art Creation",
    description: "Custom digital artwork and illustrations that bring creative visions to life with artistic precision.",
    image: "/img/pr7.jpg"
  },
  {
    id: 8,
    name: "Motion Graphics Design",
    description: "Dynamic animated graphics and video content that captivate audiences with modern visual storytelling.",
    image: "/img/pr8.jpg"
  }
];

export const Products = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(products.length).fill(false));

  const VIDEO_KEYS = ["hero1", "hero2", "hero3", "hero4"] as const;
  const getVideoSrc = (i: number) => {
    const key = VIDEO_KEYS[i - 1];
    return VIDEO_LINKS[key];
  };

  useEffect(() => {
    // Stagger the animation of cards
    const timeouts = products.map((_, index) => 
      setTimeout(() => {
        setVisibleCards(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, index * 150)
    );

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen w-screen bg-black">
      {/* Hero Section with Video Background */}
      <section className="relative h-dvh w-screen overflow-hidden">
        <div className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
          <video
            src={getVideoSrc(1)}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
          />

          {/* Hero Content Overlay */}
          <div className="absolute left-0 top-0 z-40 size-full flex items-center justify-center">
            <div className="text-center px-5 sm:px-10">
              <h1 className="special-font hero-heading text-blue-100 mb-6">
                OUR PRODUCTS
              </h1>

              <p className="mb-8 max-w-80 font-robert-regular text-blue-100 text-lg mx-auto">
                Explore our premium graphic design solutions <br />
                crafted to make your brand stand out.
              </p>

              <Link to="/#contact">
                <Button
                  id="explore-designs"
                  leftIcon={TiLocationArrow}
                  containerClass="bg-yellow-300 flex-center gap-1"
                >
                  View Our Work
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 text-white">
          DESIGN MART
        </h1>
      </section>

      {/* Products Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="special-font text-4xl md:text-6xl font-black text-center text-white uppercase mb-16">
          Design Services
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-800 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:border-violet-300/50 ${
                visibleCards[index] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Product Image */}
              <div className="w-full h-48 bg-gradient-to-br from-blue-300 to-violet-300 rounded-xl mb-6 overflow-hidden transition-transform duration-300 hover:scale-105">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to gradient background if image doesn't load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.style.background = 'linear-gradient(135deg, #4fb7dd, #5724ff)';
                    e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-white text-2xl font-bold">Design</div>';
                  }}
                />
              </div>

              {/* Product Info */}
              <h3 className="font-robert-medium text-xl font-semibold text-white mb-3">
                {product.name}
              </h3>
              
              <p className="font-circular-web text-sm text-gray-300 mb-6 leading-relaxed">
                {product.description}
              </p>
              
              <Link to="/#contact">
                <button className="w-full bg-violet-300 text-white py-3 px-6 rounded-xl font-general font-semibold text-sm uppercase transition-all duration-300 hover:bg-blue-300 hover:transform hover:translateY(-1px) hover:shadow-lg relative overflow-hidden group">
                  <span className="relative z-10">Contact Us</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
