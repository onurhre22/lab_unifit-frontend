import Header from "../components/Header";

export default function MyPage() {
  const user = {
    name: "김유니",
    email: "uni@university.ac.kr",
    major: "컴퓨터공학과",
    role: "학생",
    verification_status: "인증 완료",
    university: "한국대학교",
    profile_image: null,
    career_goal: "풀스택 개발자 및 AI 서비스 기획자",
    competency_text: "React, Next.js, Node.js 기반의 웹 서비스 개발 능력을 보유하고 있으며, 기본적인 머신러닝 모델 활용 및 데이터 전처리 기술을 갖추고 있습니다.",
    collaboration_style_text: "철저한 계획형보다는 유연한 실행형을 선호하며, 대면 모임을 통한 빠른 피드백과 소통을 중요시합니다. 기술적 성장과 결과물의 완성도 사이의 균형을 유지하려고 노력합니다.",
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto max-w-5xl px-6 py-10">
        {/* 상단 프로필 카드 (인적 사항) */}
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            {/* 프로필 사진 */}
            <div className="relative">
              <div className="h-32 w-32 overflow-hidden rounded-3xl bg-indigo-100 flex items-center justify-center text-indigo-600 ring-4 ring-indigo-50 shadow-inner">
                {user.profile_image ? (
                  <img src={user.profile_image} alt={user.name} className="h-full w-full object-cover" />
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-16 w-16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21a8 8 0 10-16 0" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                )}
              </div>
              <button className="absolute -bottom-2 -right-2 rounded-xl bg-white p-2 shadow-md border border-slate-100 text-slate-500 hover:text-indigo-600 transition">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>

            {/* 기본 인적 사항 */}
            <div className="flex-grow text-center md:text-left">
              <div className="flex flex-col items-center gap-3 md:flex-row md:items-end">
                <h1 className="text-3xl font-extrabold text-slate-900">{user.name}</h1>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200">
                  {user.verification_status}
                </span>
              </div>
              
              <div className="mt-4 grid grid-cols-1 gap-y-2 text-slate-600 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-center justify-center gap-2 md:justify-start">
                  <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="text-sm font-medium">{user.university}</span>
                </div>
                <div className="flex items-center justify-center gap-2 md:justify-start">
                  <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                  <span className="text-sm font-medium">{user.major}</span>
                </div>
                <div className="flex items-center justify-center gap-2 md:justify-start">
                  <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium">{user.email}</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2">
                  <span className="text-xs text-slate-400 block mb-0.5 font-bold uppercase tracking-wider">사용자 역할</span>
                  <span className="text-sm font-bold text-slate-700">{user.role}</span>
                </div>
                <button className="rounded-xl border border-indigo-200 bg-indigo-50 px-6 py-2 text-sm font-bold text-indigo-700 hover:bg-indigo-100 transition">
                  프로필 수정하기
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* 커리어 목표 및 역량 */}
          <section className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-indigo-100 text-indigo-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">커리어 목표 및 역량</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">커리어 목표 (Career Goal)</h4>
                  <p className="text-slate-700 font-bold text-lg leading-relaxed">
                    {user.career_goal}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">보유 역량 (My Skills & Tech)</h4>
                  <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    {user.competency_text}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 협업 성향 */}
          <section className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-sky-100 text-sky-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">협업 성향</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">협업 스타일 (Collaboration Style)</h4>
                  <div className="rounded-2xl border border-sky-100 bg-sky-50/50 p-5 ring-1 ring-sky-100">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {user.collaboration_style_text}
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-xs text-slate-400 leading-relaxed italic">
                    * 위 데이터는 AI 팀 매칭 시 가장 적합한 팀원을 찾는 핵심 기준으로 사용됩니다. 성향이 변경되었다면 프로필 수정을 통해 업데이트해 주세요.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
