"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Inquiry {
  id: number;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  type: string;
  message: string;
  date: string;
  status: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetch("/api/inquiries")
        .then(res => res.json())
        .then(data => setInquiries(data))
        .catch(err => console.error("데이터 로드 실패:", err));
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-black w-full min-h-screen pt-40 px-6 flex items-center justify-center">
        <motion.form 
          initial={{ opacity: 0, y: 20, filter: "blur(5px)" }} 
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          onSubmit={handleLogin}
          className="bg-[#050505] p-12 rounded-[2.5rem] border border-white/5 w-full max-w-md text-center shadow-[0_0_80px_rgba(255,255,255,0.02)]"
        >
          <h1 className="text-4xl font-extrabold text-white tracking-tighter mb-4">Admin<span className="text-blue-500">_</span></h1>
          <p className="text-gray-500 mb-10 text-sm font-medium tracking-wide">관리자 암호를 입력하여 대시보드에 접근하세요.</p>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-4 bg-transparent border-b border-gray-800 text-white focus:border-white outline-none mb-10 text-center tracking-[0.5em] font-mono text-2xl transition-colors"
            placeholder="••••••••"
          />
          <button type="submit" className="w-full bg-white text-black font-extrabold py-4 rounded-2xl hover:scale-105 transition-transform">
            Secure Login
          </button>
        </motion.form>
      </div>
    );
  }

  const waitCount = inquiries.filter(i => i.status === '대기중').length;

  return (
    <div className="bg-black w-full min-h-screen pt-32 pb-40 px-6 font-pretendard">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-white/10 pb-8 gap-4">
          <div>
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-4">Dashboard.</h1>
            <p className="text-gray-500 font-medium tracking-tight text-lg">홈페이지에서 들어온 최신 문의 내역이 실시간으로 표기됩니다.</p>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="text-sm font-bold tracking-widest uppercase text-gray-600 hover:text-white transition-colors bg-[#111] px-5 py-2.5 rounded-full border border-white/5">
            Logout
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#050505] p-10 rounded-[2.5rem] border border-white/5">
            <div className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-6">신규 문의 대기</div>
            <div className="text-6xl font-black text-blue-400 tracking-tighter">{waitCount}건</div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#050505] p-10 rounded-[2.5rem] border border-white/5">
            <div className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-6">전체 접수된 문의</div>
            <div className="text-6xl font-black text-white tracking-tighter">{inquiries.length}건</div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 flex gap-4 items-center bg-[#111]">
              <h2 className="text-2xl font-bold tracking-tight text-white">최근 문의 내역</h2>
              <div className="flex bg-blue-500/20 px-3 py-1 rounded-full items-center gap-2">
                 <span className="relative flex h-2 w-2 shadow-[0_0_8px_#3b82f6]">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                 </span>
                 <span className="text-[10px] font-extrabold tracking-widest uppercase text-blue-400">Live DB 실시간 연동중</span>
              </div>
            </div>
            <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto">
              {inquiries.length === 0 ? (
                <div className="p-10 text-center text-gray-500 font-medium">아직 접수된 문의가 없습니다.</div>
              ) : (
                inquiries.map((req) => (
                  <div key={req.id} className="p-8 hover:bg-white-[0.02] transition-colors flex justify-between items-start cursor-pointer group">
                    <div className="flex-1">
                      <div className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {req.name} {req.company && req.company !== "-" && <span className="text-gray-500 font-medium text-base ml-2 bg-gray-800 px-2 py-0.5 rounded-md">🏢 {req.company}</span>}
                      </div>
                      <div className="text-sm text-gray-500 font-medium mb-3 flex flex-wrap gap-2 items-center">
                        <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-300">{req.type}</span>
                        <span>|</span>
                        <span className="text-gray-300">📧 {req.email}</span>
                        {req.phone && req.phone !== "-" && (
                          <>
                            <span>|</span>
                            <span className="text-emerald-400 font-bold tracking-wider">📞 {req.phone}</span>
                          </>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 bg-[#111] p-4 border border-white/5 rounded-xl line-clamp-3 mt-2">"{req.message}"</p>
                    </div>
                    <div className="ml-6 text-right">
                      <div className="text-xs text-gray-600 mb-2">{req.date}</div>
                      <div className={`text-[10px] font-bold px-3 py-1.5 rounded-lg inline-block ${req.status === '대기중' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-gray-800 text-gray-400 border border-gray-700'}`}>
                        {req.status}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>

          {/* Portfolio Placeholder */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col justify-center items-center text-center p-12 shadow-2xl">
            <div className="w-20 h-20 bg-[#111] border border-white/10 rounded-full flex items-center justify-center mb-8">
               <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </div>
            <h3 className="text-3xl font-bold tracking-tight text-white mb-4">포트폴리오 업로드 패널</h3>
            <p className="text-lg text-gray-500 mb-10 max-w-sm leading-relaxed">
              이미지 업로드 기능은 서버 스토리지(파일 저장소)가 필수적이므로 본 배포 후 2단계에서 연동될 예정입니다.
            </p>
            <button disabled className="bg-white/5 border border-white/10 text-gray-500 font-bold px-8 py-4 rounded-full">
              개발 예정
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
