"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="bg-black w-full min-h-screen pt-32 pb-40 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }} 
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} 
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} 
          className="text-center mb-48 w-full"
        >
          <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter mb-8 leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-[#444]">
            Vision.
          </h1>
          <p className="text-3xl md:text-5xl text-gray-500 font-bold tracking-tight">
            본질을 꿰뚫는 <span className="text-white">설계자.</span>
          </p>
        </motion.div>

        {/* Massive Philosophy Statement */}
        <motion.section 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto text-center mb-48 px-4"
        >
          <h2 className="text-2xl md:text-[2rem] lg:text-5xl font-black tracking-tighter leading-tight text-white mb-10 break-keep">
            <span className="block">"단순히 예쁜 디자인이 아닙니다.</span>
            <span className="block">비즈니스 목표를 향한 <span className="whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">가장 빠른 직행선</span>입니다."</span>
          </h2>
        </motion.section>

        {/* Specs Style Timeline */}
        <section className="w-full max-w-5xl space-y-32">
          <div className="grid md:grid-cols-12 gap-12 items-start border-t border-white/10 pt-20">
            <h3 className="md:col-span-4 text-4xl font-extrabold tracking-tighter text-white mb-4">Mastery.</h3>
            <div className="md:col-span-8 flex flex-wrap gap-4">
              {['Pitch Deck', 'Typography', 'Visual Hierarchy', 'Brand Identity', 'Information Architecture', 'Figma', 'Keynote'].map((skill, index) => (
                <motion.span 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  key={skill} 
                  className="px-6 py-3 rounded-full bg-[#111111] border border-white/5 text-lg md:text-xl font-bold text-gray-300"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-12 items-start border-t border-white/10 pt-20">
            <h3 className="md:col-span-4 text-4xl font-extrabold tracking-tighter text-white mb-6">Timeline.</h3>
            <div className="md:col-span-8 space-y-20">
              {[
                { year: "2022 - Present", title: "Freelance Consultant & PM", desc: "150+ 기업 외주 작업 완료. 복잡한 데이터 시각화 및 프리미엄 비즈니스 문서 총괄 기획." },
                { year: "2019 - 2022", title: "Marketing Agency Lead", desc: "주요 클라이언트 커뮤니케이션, 제안서 및 PR 브랜드 에셋 총괄 디렉팅." },
                { year: "2018 - 2019", title: "Global Marketing", desc: "K-Startup 서비스 글로벌 런칭 프로모션 기획 및 마케팅 지표 분석." },
              ].map((item, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8 }}
                  key={i} 
                  className="group relative"
                >
                  <div className="absolute -left-8 top-2 w-3 h-3 rounded-full bg-white/20 group-hover:bg-white transition-colors duration-500"></div>
                  <div className="text-gray-500 font-bold tracking-widest uppercase text-sm mb-4">{item.year}</div>
                  <h4 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tighter">{item.title}</h4>
                  <p className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed max-w-2xl">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
