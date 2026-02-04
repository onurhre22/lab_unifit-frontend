import { useNavigate } from "react-router-dom";

const LS_ONBOARDED = "unifit_onboarded"; // "true"면 온보딩 완료로 간주

export default function Login() {
  const navigate = useNavigate();

  const goAfterLogin = () => {
    const onboarded = localStorage.getItem(LS_ONBOARDED) === "true";
    navigate(onboarded ? "/main" : "/welcome");
  };

  const goToSignupRole = () => {
    // ✅ “처음 회원가입한 사람” 상태로 만들기
    localStorage.setItem(LS_ONBOARDED, "false");

    // ✅ 회원가입 역할 선택 화면으로 이동
    navigate("/signup-role");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 상단 로고 */}
      <header className="absolute left-0 right-0 top-0 z-10">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
          <div className="text-lg font-bold text-white">UniFit</div>
        </div>
      </header>

      {/* 와이드 레이아웃 */}
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
        {/* 좌측 비주얼 */}
        <div className="relative hidden items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-500 to-indigo-400 md:flex">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-[-120px] right-[-120px] h-96 w-96 rounded-full bg-cyan-200/20 blur-3xl" />

          <div className="relative z-10 max-w-md text-left text-white">
            <h1 className="text-4xl font-bold leading-tight">
              AI로
              <br />
              미래를 설계하세요
            </h1>
            <p className="mt-4 text-white/90">
              진로·역량·시간표를 분석해
              <br />
              당신만의 학업 성장 로드맵을 만들어줘요.
            </p>

            <div className="mt-8 rounded-2xl bg-white/10 p-4 text-sm backdrop-blur">
              ✔ AI 학업 로드맵
              <br />
              ✔ 팀 프로젝트 매칭
              <br />
              ✔ 멘토링 & 포트폴리오
            </div>
          </div>
        </div>

        {/* 우측 로그인 폼 */}
        <div className="flex items-center justify-center px-6">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900">로그인</h2>
            <p className="mt-2 text-sm text-slate-500">
              UniFit에서 나만의 AI 로드맵을 시작하세요
            </p>

            <div className="mt-8 space-y-4">
              <input
                type="email"
                placeholder="이메일"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
              />
              <input
                type="password"
                placeholder="비밀번호"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
              />
            </div>

            <button
              onClick={goAfterLogin}
              className="mt-6 w-full rounded-xl bg-black py-3 text-sm font-semibold text-white hover:bg-slate-900 transition"
            >
              로그인
            </button>

            <div className="mt-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs text-slate-400">또는</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <button
              type="button"
              className="mt-4 w-full rounded-xl border border-slate-200 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              onClick={goAfterLogin}
            >
              Google로 로그인
            </button>

            <button
              type="button"
              onClick={goToSignupRole}
              className="mt-3 w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition"
            >
              회원가입(신규) 시작하기
            </button>

            <p className="mt-5 text-center text-xs text-slate-400">
              * 데모 환경: 회원가입 버튼 클릭 시 역할 선택 화면으로 이동합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
