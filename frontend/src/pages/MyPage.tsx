import Header from "../components/Header";

export default function MyPage() {
  const user = {
    name: "김유니",
    email: "uni@university.ac.kr",
    major: "컴퓨터공학과",
    studentId: "202212345",
    level: 3, // 3학년
    tags: ["Frontend", "React", "TypeScript", "AI"],
  };

  const activityStats = [
    { label: "참여 프로젝트", count: 4 },
    { label: "관심 프로젝트", count: 12 },
    { label: "완료한 멘토링", count: 2 },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-2xl font-bold text-slate-900">마이페이지</h1>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Profile Sidebar */}
          <div className="md:col-span-1">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 ring-4 ring-indigo-50">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-12 w-12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21a8 8 0 10-16 0" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <h2 className="mt-4 text-xl font-bold text-slate-900">{user.name}</h2>
                <p className="text-sm text-slate-500">{user.email}</p>
                
                <div className="mt-4 flex flex-wrap justify-center gap-1">
                  {user.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 w-full space-y-3 border-t border-slate-100 pt-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">전공</span>
                    <span className="font-medium text-slate-900">{user.major}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">학번</span>
                    <span className="font-medium text-slate-900">{user.studentId}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">학년</span>
                    <span className="font-medium text-slate-900">{user.level}학년</span>
                  </div>
                </div>

                <button className="mt-8 w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition">
                  프로필 수정
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {activityStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm"
                >
                  <div className="text-2xl font-bold text-slate-900">{stat.count}</div>
                  <div className="mt-1 text-xs font-medium text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Account Settings Section */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                <h3 className="font-semibold text-slate-900">계정 설정</h3>
              </div>
              <div className="divide-y divide-slate-100">
                <button className="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition">
                  <div>
                    <div className="text-sm font-medium text-slate-900">비밀번호 변경</div>
                    <div className="text-xs text-slate-500">보안을 위해 주기적으로 비밀번호를 변경하세요.</div>
                  </div>
                  <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5l7 7-7 7" />
                  </svg>
                </button>
                <button className="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition">
                  <div>
                    <div className="text-sm font-medium text-slate-900">알림 설정</div>
                    <div className="text-xs text-slate-500">이메일 및 푸시 알림 수신 동의를 관리합니다.</div>
                  </div>
                  <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5l7 7-7 7" />
                  </svg>
                </button>
                <button className="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition">
                  <div>
                    <div className="text-sm font-medium text-slate-900 text-rose-600">회원 탈퇴</div>
                    <div className="text-xs text-slate-500">계정을 삭제하고 UniFit 서비스를 해지합니다.</div>
                  </div>
                  <svg className="h-5 w-5 text-rose-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
              <h3 className="font-semibold text-slate-900">최근 활동</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <div className="h-2 w-2 rounded-full bg-indigo-500" />
                  <div className="flex-grow text-slate-600">'AI 챗봇 개발' 팀 프로젝트에 참여 신청했습니다.</div>
                  <div className="text-xs text-slate-400">2시간 전</div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="h-2 w-2 rounded-full bg-indigo-500" />
                  <div className="flex-grow text-slate-600">'알고리즘' 과목을 AI 로드맵에 추가했습니다.</div>
                  <div className="text-xs text-slate-400">어제</div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="h-2 w-2 rounded-full bg-indigo-500" />
                  <div className="flex-grow text-slate-600">프로필 정보를 업데이트했습니다.</div>
                  <div className="text-xs text-slate-400">3일 전</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
