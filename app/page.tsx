"use client";

import { motion, MotionConfig, type TargetAndTransition, type Transition } from "framer-motion";
import Link from "next/link";

// 키워드 성격에 맞춘 글자별 등장 효과
const keywordEffects: Record<string, { from: TargetAndTransition; transition: Transition; stagger: number }> = {
  // 날카롭게: 비스듬히 빠르게 베어 들어오기
  sharp: {
    from: { opacity: 0, x: -40, skewX: -20 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    stagger: 0.06,
  },
  // 압도적으로: 크게 다가왔다가 제자리에 쿵 하고 안착
  bold: {
    from: { opacity: 0, scale: 2.2, filter: "blur(8px)" },
    transition: { type: "spring", stiffness: 260, damping: 14 },
    stagger: 0.08,
  },
  // 자연스럽게: 아래에서 통통 튀어 오르기
  soft: {
    from: { opacity: 0, y: 40 },
    transition: { type: "spring", stiffness: 300, damping: 10 },
    stagger: 0.08,
  },
};

function AnimatedKeyword({ text, effect }: { text: string; effect: keyof typeof keywordEffects }) {
  const { from, transition, stagger } = keywordEffects[effect];
  return (
    <MotionConfig reducedMotion="user">
      <span className="inline-block whitespace-nowrap">
        {[...text].map((char, i) => (
          <motion.span
            key={i}
            className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-white to-[#7DD3FC]"
            initial={from}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, skewX: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ ...transition, delay: 0.5 + i * stagger }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    </MotionConfig>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start w-full min-h-screen bg-black text-[#F5F5F7] font-pretendard pt-0">
      
      {/* Hero Section (Apple Pro Style) */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Subtle Glow behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/20 opacity-40 blur-[150px] rounded-full pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-center text-center px-4 mt-16"
        >
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="text-brand font-bold tracking-[0.2em] uppercase text-sm md:text-md mb-6"
          >
            Professional Consulting
          </motion.h2>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-none mb-6"
          >
            Pro. <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">Beyond Pro.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="text-xl md:text-3xl font-medium tracking-tight text-gray-400 mt-2 mb-12"
          >
            비즈니스의 시각적 한계를 넘다.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex items-center gap-8"
          >
            <Link href="/projects" className="text-lg md:text-xl font-medium hover:text-white text-gray-300 transition-colors flex items-center gap-2 group">
              포트폴리오 보기
              <span className="group-hover:translate-x-1 transition-transform opacity-70">→</span>
            </Link>
            <Link href="/contact" className="text-lg md:text-xl font-medium text-brand hover:text-brand-hover transition-colors flex items-center gap-2 group">
              상담 예약하기
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Stunning Reveal Section */}
      <section className="w-full max-w-5xl mx-auto px-6 py-40 flex flex-col space-y-48">
        {[
          {
            title: "데이터는",
            keyword: "날카롭게",
            effect: "sharp",
            subtitle: "PPT & IR Pitch Deck",
            desc: ["복잡한 텍스트와 숫자를 직관적인 시각 언어로 번역합니다.", "투자자의 마음을 움직이는 완벽한 피칭덱을 경험하세요."]
          },
          {
            title: "시선은",
            keyword: "압도적으로",
            effect: "bold",
            subtitle: "Event Poster & Banner",
            desc: ["0.1초 만에 시선을 사로잡아야 하는 광고 소재.", "군더더기 없는 레이아웃과 강력한 메시지로 트래픽을 극대화합니다."]
          },
          {
            title: "설득은",
            keyword: "자연스럽게",
            effect: "soft",
            subtitle: "Detail Page",
            desc: ["고객이 스크롤을 멈추지 않게 만듭니다.", "구매 전환율을 높이는 치밀한 기획과 세련된 톤앤매너를 제공합니다."]
          }
        ].map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 50, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center space-y-6"
          >
            <h3 className="text-brand font-extrabold tracking-[0.15em] uppercase text-sm">{item.subtitle}</h3>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-[#F5F5F7]">
              {item.title} <AnimatedKeyword text={item.keyword} effect={item.effect} />.
            </h2>
            <p className="max-w-3xl text-xl md:text-2xl text-gray-400 font-medium leading-relaxed tracking-tight break-keep">
              {item.desc.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </p>
          </motion.div>
        ))}
      </section>

      {/* Premium Stats Grid */}
      <section className="w-full bg-[#111111] border-y border-white/5 py-40 mt-10">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center"
          >
             {[
               { label: "프로젝트 완수", value: "150+" },
               { label: "고객 만족도", value: "99.9%" },
               { label: "협업 파트너", value: "20+" },
               { label: "빠른 초기 대응", value: "< 24h" },
             ].map((stat, i) => (
               <div key={i} className="flex flex-col items-center">
                 <div className="text-5xl md:text-6xl font-black tracking-tighter text-white mb-4 drop-shadow-lg">
                   {stat.value}
                 </div>
                 <div className="text-gray-500 font-bold tracking-widest uppercase text-xs">
                   {stat.label}
                 </div>
               </div>
             ))}
          </motion.div>
        </div>
      </section>
      
      {/* Footer CTA */}
      <section className="w-full flex justify-center py-40 px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-10 text-transparent bg-clip-text bg-gradient-to-b from-white to-[#7DD3FC]">
              당신의 비즈니스가<br className="md:hidden" /> 돋보일 차례입니다.
            </h2>
            <Link href="/contact" className="inline-flex items-center gap-3 text-white font-semibold text-lg md:text-xl px-12 py-5 rounded transition-colors duration-300 hover:text-gray-400 active:bg-white active:text-black group">
              지금 바로 의뢰하기
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
      </section>
    </main>
  );
}
