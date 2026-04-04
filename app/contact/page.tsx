"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    
    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData);
      // 1. 브라우저 새 창으로 포워딩하여 확실하게 FormSubmit 활성화 갱신
      const submitForm = document.createElement('form');
      submitForm.method = 'POST';
      submitForm.action = 'https://formsubmit.co/rew0929@gmail.com';
      submitForm.target = '_blank'; // 새 창에서 Captcha 및 새로운 인증 메일 요청

      // 답장 기능(Reply-To)을 확실하게 묶어줌
      const replyToInput = document.createElement('input');
      replyToInput.type = 'hidden';
      replyToInput.name = '_replyto';
      replyToInput.value = data.email as string;
      submitForm.appendChild(replyToInput);

      for (const key in data) {
        const inputField = document.createElement('input');
        inputField.type = 'hidden';
        inputField.name = key;
        inputField.value = data[key] as string;
        submitForm.appendChild(inputField);
      }
      
      document.body.appendChild(submitForm);
      submitForm.submit();
      document.body.removeChild(submitForm);

      // 2. 대시보드(DB)로 데이터 저장 요청
      const dbResponse = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      
      if (dbResponse.ok) {
        setIsSubmitted(true);
      } else {
        setErrorMessage("서버 통신에 문제가 발생했습니다. 다시 시도해 주세요.");
      }
    } catch (err) {
      setErrorMessage("전송 중 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black w-full min-h-screen pt-32 pb-40 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }} 
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} 
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24 w-full"
        >
          <h1 className="text-7xl md:text-[8rem] font-black tracking-tighter mb-8 leading-none bg-clip-text text-transparent bg-gradient-to-br from-white to-[#333]">Contact.</h1>
          <p className="text-2xl md:text-4xl text-gray-500 font-bold tracking-tight">비전의 <span className="text-white">마침표</span>를 찍을 시간입니다.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full bg-[#050505] p-8 md:p-16 rounded-[3rem] border border-white/5 shadow-[0_0_80px_rgba(255,255,255,0.03)] overflow-hidden relative"
        >
          {isSubmitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_80px_rgba(255,255,255,0.3)]">
                <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-white mb-6">전송이 완료되었습니다.</h2>
              <p className="text-xl md:text-2xl text-gray-400 font-medium tracking-tight">대시보드와 이메일로 알림이 발송되었습니다.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-14">
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="[웹사이트 문의] 새로운 프로젝트 의뢰가 도착했습니다!" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-10">
                <div>
                  <label className="block text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">성함 (필수)</label>
                  <input required name="name" type="text" className="w-full px-0 py-4 bg-transparent border-b border-gray-800 text-3xl font-medium text-white focus:outline-none focus:border-white transition-colors placeholder:text-gray-800/50" placeholder="홍길동" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold tracking-[0.2em] uppercase text-gray-600 mb-4">회사명 (선택사항)</label>
                  <input name="company" type="text" className="w-full px-0 py-4 bg-transparent border-b border-gray-800 text-3xl font-medium text-white focus:outline-none focus:border-white transition-colors placeholder:text-gray-800/50" placeholder="Ssoya Corp." />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-10">
                <div>
                  <label className="block text-xs font-bold tracking-[0.2em] uppercase text-blue-400 mb-4">회신받을 이메일 (필수)</label>
                  <input required name="email" type="email" className="w-full px-0 py-4 bg-transparent border-b border-gray-800 text-3xl font-medium text-white focus:outline-none focus:border-white transition-colors placeholder:text-gray-800/50" placeholder="hello@ssoya.com" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold tracking-[0.2em] uppercase text-blue-400 mb-4">전화번호 (필수)</label>
                  <input required name="phone" type="tel" className="w-full px-0 py-4 bg-transparent border-b border-gray-800 text-3xl font-medium text-white focus:outline-none focus:border-white transition-colors placeholder:text-gray-800/50" placeholder="010-0000-0000" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold tracking-[0.2em] uppercase text-gray-600 mb-4">필요한 작업 유형</label>
                <div className="relative">
                  <select name="type" className="w-full px-0 py-4 bg-transparent border-b border-gray-800 text-3xl font-medium text-white focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer">
                    <option className="bg-[#111] text-xl">IR 피칭덱 / 발표자료</option>
                    <option className="bg-[#111] text-xl">포스터 / 배너 디자인</option>
                    <option className="bg-[#111] text-xl">상세페이지 기획 및 디자인</option>
                    <option className="bg-[#111] text-xl">기타 상담</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-500">
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold tracking-[0.2em] uppercase text-gray-600 mb-4">프로젝트 상세 내용</label>
                <textarea required name="message" rows={4} className="w-full px-0 py-4 bg-transparent border-b border-gray-800 text-2xl font-medium text-white focus:outline-none focus:border-white transition-colors resize-none leading-relaxed" placeholder="준비하시는 제품이나 서비스 내용..."></textarea>
              </div>

              {errorMessage && <div className="text-red-500 font-medium text-lg pt-4">{errorMessage}</div>}
              
              <button disabled={isSubmitting} type="submit" className="group relative w-full bg-white text-black font-extrabold text-2xl py-8 rounded-3xl hover:scale-[1.01] transition-transform duration-300 mt-10 flex items-center justify-center gap-4 overflow-hidden disabled:opacity-70 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                <span className={`transition-opacity duration-300 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>무료 상담 제출하기</span>
                {!isSubmitting && <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>}
                {isSubmitting && <div className="absolute inset-0 flex items-center justify-center"><div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin"></div></div>}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
