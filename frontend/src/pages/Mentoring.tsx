import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

interface Mentor {
  id: number;
  name: string;
  role: string;
  company?: string;
  major: string;
  tags: string[];
  description: string;
  imageUrl?: string;
  isAiRecommended?: boolean;
}

const MENTORS: Mentor[] = [
  {
    id: 1,
    name: "김민수",
    role: "시니어 프론트엔드 개발자",
    company: "테크코리아",
    major: "컴퓨터공학",
    tags: ["React", "TypeScript", "커리어상담"],
    description: "5년차 프론트엔드 개발자입니다. 신입 개발자분들의 기술 스택 선정과 포트폴리오 리뷰를 도와드려요.",
    isAiRecommended: true,
  },
  {
    id: 2,
    name: "이영희",
    role: "데이터 사이언티스트",
    company: "글로벌AI",
    major: "통계학",
    tags: ["Python", "ML", "대학원진학"],
    description: "데이터 분석 실무와 인공지능 대학원 진학에 대해 궁금한 점이 있다면 언제든 물어보세요.",
    isAiRecommended: true,
  },
  {
    id: 3,
    name: "박준영",
    role: "UI/UX 디자이너",
    company: "디자인랩",
    major: "산업디자인",
    tags: ["Figma", "UIUX", "비전공자"],
    description: "비전공자에서 디자이너로 전향한 경험을 바탕으로 실질적인 조언을 해드립니다.",
  },
  {
    id: 4,
    name: "최수지",
    role: "백엔드 개발자",
    company: "핀테크솔루션",
    major: "소프트웨어",
    tags: ["Java", "Spring", "취업준비"],
    description: "백엔드 아키텍처와 코딩 테스트 준비 노하우를 공유합니다.",
  },
];

const Mentoring: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const aiRecommendedMentors = MENTORS.filter(m => m.isAiRecommended);
  const filteredMentors = MENTORS.filter(mentor => 
    (mentor.name.includes(searchTerm) || 
    mentor.role.includes(searchTerm) || 
    mentor.major.includes(searchTerm) ||
    mentor.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* 상단 검색 영역 */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">멘토 찾기</h2>
          <p className="text-slate-600 mb-8">당신의 커리어 성장을 도와줄 선배 멘토를 만나보세요.</p>
          
          <div className="mx-auto max-w-2xl relative">
            <input
              type="text"
              placeholder="이름, 직무, 전공, 태그로 검색해보세요 (예: React, 디자인)"
              className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </section>

        {/* AI 추천 멘토 섹션 (검색어가 없을 때만 강조해서 보여주거나 상단 고정) */}
        {!searchTerm && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.3 1.047a1 1 0 01.897.953v6.222l2.29-2.29a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414l2.29 2.29V2a1 1 0 01.897-.953zM10 18a8 8 0 100-16 8 8 0 000 16z" clipRule="evenodd" />
                </svg>
              </span>
              <h3 className="text-xl font-bold text-slate-900">AI 맞춤 추천 멘토</h3>
              <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-600">
                실시간 분석
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {aiRecommendedMentors.map((mentor) => (
                <div key={`ai-${mentor.id}`} className="relative overflow-hidden rounded-2xl border-2 border-indigo-100 bg-white p-6 shadow-md transition hover:shadow-lg ring-1 ring-indigo-50">
                  <div className="absolute top-0 right-0">
                    <div className="bg-indigo-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      Recommended
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-16 w-16 shrink-0 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-inner">
                      {mentor.name[0]}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{mentor.name}</h3>
                      <p className="text-sm text-indigo-600 font-medium">{mentor.role} @ {mentor.company}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                    {mentor.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex gap-2">
                      {mentor.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-xs text-indigo-500 bg-indigo-50 px-2 py-1 rounded-full border border-indigo-100">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <Link 
                      to={`/mentor/${mentor.id}`}
                      className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition shadow-sm inline-block"
                    >
                      상담 예약
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 전체 멘토 리스트 영역 */}
        <section>
          <h3 className="text-xl font-bold text-slate-900 mb-6">
            {searchTerm ? `'${searchTerm}' 검색 결과` : "모든 멘토"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMentors.length > 0 ? (
              filteredMentors.map((mentor) => (
                <div key={mentor.id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 shrink-0 rounded-2xl bg-indigo-50 ring-1 ring-indigo-100 flex items-center justify-center text-indigo-500 font-bold text-xl">
                    {mentor.name[0]}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{mentor.name}</h3>
                    <p className="text-sm text-slate-500">{mentor.role} @ {mentor.company}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md mb-2 inline-block">
                    {mentor.major} 전공
                  </span>
                  <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {mentor.description}
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {mentor.tags.map(tag => (
                      <span key={tag} className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <Link 
                    to={`/mentor/${mentor.id}`}
                    className="w-full text-center rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition block"
                  >
                    멘토링 신청하기
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-slate-500 text-lg">검색 결과와 일치하는 멘토가 없습니다.</p>
            </div>
          )}
        </div>
        </section>
      </main>
    </div>
  );
};

export default Mentoring;
