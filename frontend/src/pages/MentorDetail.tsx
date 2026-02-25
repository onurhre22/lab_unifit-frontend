import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

interface Consultation {
  id: number;
  date: string;
  status: 'completed' | 'canceled' | 'pending';
  topic: string;
  feedback?: string;
}

interface Review {
  id: number;
  studentName: string;
  rating: number;
  content: string;
  date: string;
}

const MOCK_HISTORY: Consultation[] = [
  { id: 101, date: '2026.01.15', status: 'completed', topic: '프론트엔드 커리어 로드맵 상담', feedback: '포트폴리오 구성에 대한 구체적인 조언을 받았습니다.' },
  { id: 102, date: '2025.12.10', status: 'completed', topic: 'React 심화 학습 방법', feedback: '상태 관리 라이브러리 선택 기준을 명확히 알게 되었습니다.' },
];

const MOCK_REVIEWS: Review[] = [
  { id: 1, studentName: "이*윤", rating: 5, content: "실무에서 사용하는 기술들에 대해 친절하게 설명해주셔서 큰 도움이 되었습니다!", date: "2026.02.10" },
  { id: 2, studentName: "박*준", rating: 4, content: "이해가 잘 가도록 비유를 들어 설명해주시는 게 인상적이었어요.", date: "2026.01.28" },
];

const MentorDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const mentor = {
    id: Number(id),
    name: "김민수",
    role: "시니어 프론트엔드 개발자",
    company: "테크코리아",
    major: "컴퓨터공학",
    experience: "5년차",
    education: "한국대학교 컴퓨터공학 학사",
    careers: [
      { period: "2022 - 현재", title: "테크코리아 프론트엔드 파트장" },
      { period: "2020 - 2022", title: "에이비씨소프트 선임 연구원" },
      { period: "2019 - 2020", title: "스타트업 인턴십" }
    ],
    techStacks: {
      "Frontend": ["React", "TypeScript", "Next.js", "Tailwind CSS"],
      "State Mgmt": ["Redux", "Zustand", "React Query"],
      "DevOps": ["Git", "Docker", "CI/CD"]
    },
    stats: {
      totalConsults: 48,
      avgRating: 4.9,
      responseRate: "98%",
      revisitRate: "85%"
    },
    description: "5년차 프론트엔드 개발자 김민수입니다. 대규모 이커머스 서비스의 프론트엔드 아키텍처 설계를 담당하고 있습니다. 단순한 코드 작성을 넘어, 성능 최적화와 사용자 경험을 동시에 고려하는 개발자가 되는 길을 안내해 드립니다.",
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* 상단: 멘토 기본 정보 카드 */}
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="h-32 w-32 shrink-0 rounded-3xl bg-indigo-600 flex items-center justify-center text-white font-bold text-4xl shadow-lg">
              {mentor.name[0]}
            </div>
            <div className="flex-grow text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">{mentor.name} 멘토</h2>
                  <p className="text-xl text-indigo-600 font-medium mt-1">{mentor.role} @ {mentor.company}</p>
                </div>
                <button 
                  onClick={() => navigate(`/mentor/${id}/reserve`)}
                  className="rounded-2xl bg-indigo-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition"
                >
                  상담 신청하기
                </button>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
                  {mentor.experience} 경력
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><path d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
                  {mentor.education}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 하단: 2컬럼 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 왼쪽 컬럼 (상세 내용) */}
          <div className="space-y-8">
            {/* 경력 및 학력 섹션 */}
            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="h-6 w-1.5 rounded-full bg-indigo-600"></span>
                경력 및 학력
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Work Experience</p>
                  <div className="space-y-4">
                    {mentor.careers.map((career, idx) => (
                      <div key={idx} className="flex gap-4">
                        <span className="text-sm font-medium text-indigo-600 shrink-0 w-24">{career.period}</span>
                        <span className="text-sm text-slate-700">{career.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Education</p>
                  <div className="flex gap-4">
                    <span className="text-sm font-medium text-indigo-600 shrink-0 w-24">학사</span>
                    <span className="text-sm text-slate-700">{mentor.education}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 기술스택 및 전문분야 섹션 */}
            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="h-6 w-1.5 rounded-full bg-indigo-600"></span>
                기술스택 및 전문분야
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(mentor.techStacks).map(([category, skills]) => (
                  <div key={category} className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-3">{category}</p>
                    <div className="flex flex-wrap gap-2">
                      {skills.map(skill => (
                        <span key={skill} className="bg-white px-3 py-1 rounded-lg text-sm text-slate-600 border border-slate-200 shadow-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 멘토소개 섹션 */}
            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="h-6 w-1.5 rounded-full bg-indigo-600"></span>
                멘토 소개
              </h3>
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                {mentor.description}
              </p>
            </section>
          </div>

          {/* 오른쪽 컬럼 (통계 및 사이드 정보) */}
          <div className="space-y-8">
            {/* 멘토링 통계 섹션 */}
            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6">멘토링 통계</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-50 rounded-2xl p-4 text-center">
                  <p className="text-xs text-indigo-400 font-medium mb-1">상담 횟수</p>
                  <p className="text-2xl font-bold text-indigo-700">{mentor.stats.totalConsults}회</p>
                </div>
                <div className="bg-amber-50 rounded-2xl p-4 text-center">
                  <p className="text-xs text-amber-400 font-medium mb-1">평균 별점</p>
                  <p className="text-2xl font-bold text-amber-700">★ {mentor.stats.avgRating}</p>
                </div>
                <div className="bg-emerald-50 rounded-2xl p-4 text-center">
                  <p className="text-xs text-emerald-400 font-medium mb-1">응답률</p>
                  <p className="text-lg font-bold text-emerald-700">{mentor.stats.responseRate}</p>
                </div>
                <div className="bg-sky-50 rounded-2xl p-4 text-center">
                  <p className="text-xs text-sky-400 font-medium mb-1">재방문율</p>
                  <p className="text-lg font-bold text-sky-700">{mentor.stats.revisitRate}</p>
                </div>
              </div>
            </section>

            {/* 나의 상담 이력 섹션 */}
            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6">나의 상담 이력</h3>
              <div className="space-y-4">
                {MOCK_HISTORY.length > 0 ? (
                  MOCK_HISTORY.map((item) => (
                    <div key={item.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{item.date}</span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">완료</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-700 truncate">{item.topic}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-6 text-sm text-slate-400 italic">상담 내역이 없습니다.</p>
                )}
              </div>
            </section>

            {/* 학생 후기 섹션 */}
            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6">최근 학생 후기</h3>
              <div className="space-y-6">
                {MOCK_REVIEWS.map((review) => (
                  <div key={review.id} className="border-b border-slate-100 last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-700">{review.studentName}</span>
                      <span className="text-xs text-amber-500">{"★".repeat(review.rating)}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{review.content}</p>
                    <p className="text-[10px] text-slate-300 mt-2">{review.date}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MentorDetail;
