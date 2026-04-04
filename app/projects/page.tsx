"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["전체", "PPT", "포스터", "상세페이지"];

const projectsData = [
  { id: 1, title: "스타트업 IR 전문 피칭덱", category: "PPT", image: "https://placehold.co/600x400/111111/FFFFFF?text=IR+Deck" },
  { id: 2, title: "뷰티 브랜드 런칭 기획전", category: "포스터", image: "https://placehold.co/400x600/1C1C1E/FFFFFF?text=Beauty+Poster" },
  { id: 3, title: "건강기능식품 상세페이지", category: "상세페이지", image: "https://placehold.co/600x800/0A0A0A/FFFFFF?text=Health+Landing" },
  { id: 4, title: "SaaS B2B 서비스 제안서", category: "PPT", image: "https://placehold.co/600x400/2C2C2E/FFFFFF?text=SaaS+Proposal" },
  { id: 5, title: "사내 임직원 온보딩 자료", category: "PPT", image: "https://placehold.co/600x400/111111/FFFFFF?text=Onboarding" },
  { id: 6, title: "연말결산 데이터 인포그래픽", category: "포스터", image: "https://placehold.co/400x600/1C1C1E/FFFFFF?text=Infographic" },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("전체");

  const filteredProjects = projectsData.filter(
    (p) => activeCategory === "전체" || p.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-black w-full pt-32 pb-40 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }} 
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} 
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-black tracking-tighter mb-6">Works.</h1>
          <p className="text-xl md:text-3xl text-gray-500 font-medium tracking-tight">결과로 증명하는 완벽한 디테일.</p>
        </motion.div>

        {/* Categories Apple Style Pill */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-2 mb-24 bg-[#111111] p-2 rounded-full border border-white/5 shadow-2xl"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#333333] text-white shadow-lg md:scale-105"
                  : "bg-transparent text-gray-500 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Gallery */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group relative cursor-pointer overflow-hidden rounded-[2rem] bg-[#0a0a0a] border border-white/5 hover:border-white/20 transition-colors"
              >
                <div className="aspect-[4/3] w-full overflow-hidden flex items-center justify-center bg-[#111111]">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out opacity-80 group-hover:opacity-100 mix-blend-luminosity hover:mix-blend-normal"
                  />
                </div>
                <div className="p-8">
                  <div className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-3">{project.category}</div>
                  <h3 className="text-2xl font-bold tracking-tight text-[#F5F5F7] group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
