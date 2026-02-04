import { Link, useNavigate } from "react-router-dom";

export default function SignupRole() {
  const navigate = useNavigate();

  const studentFeatures = [
    "AI 맞춤형 커리큘럼 추천",
    "성향 분석 기반 팀 프로젝트 매칭",
    "활동 내역 자동 정리 포트폴리오",
    "검증된 멘토와의 1:1 연결",
  ];

  const expertFeatures = [
    "수업 맞춤형 AI 팀 빌딩 및 프로젝트 관리",
    "활동 로그 기반의 객관적 성과 평가 지원",
    "실무 인재 발굴을 위한 우수 포트폴리오 열람",
    "지식 공유 및 커리어 멘토링 프로그램 개설",
  ];

  return (
    <div className="min-h-screen font-[Pretendard]">
      {/* ✅ Top-left Logo (화이트 + 살짝 크게) */}
      <header className="absolute left-0 right-0 top-0 z-20">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
          <Link
            to="/login"
            className="text-2xl font-extrabold tracking-tight text-white"
          >
            UniFit
          </Link>
        </div>
      </header>

      {/* Wide split layout */}
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
        {/* LEFT: Student */}
        <section className="relative flex items-center justify-center overflow-hidden bg-indigo-700">
          {/* background text */}
          <div className="pointer-events-none absolute inset-0 opacity-15">
            <div className="absolute -left-10 top-10 select-none text-[120px] font-extrabold text-white/30">
              Student
            </div>
            <div className="absolute -left-14 top-44 select-none text-[120px] font-extrabold text-white/15">
              Student
            </div>
          </div>

          {/* glow */}
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -right-28 h-72 w-72 rounded-full bg-cyan-200/10 blur-3xl" />

          {/* 카드 */}
          <div className="relative w-full max-w-xl px-6">
            <RoleCard
              title="학생 / 대학원생"
              subtitle="AI와 함께하는 스마트한 캠퍼스 라이프"
              features={studentFeatures}
              buttonLabel="학생 / 대학원생으로 가입하기"
              buttonVariant="primary"
              onClick={() => navigate("/welcome")}
            />
          </div>
        </section>

        {/* RIGHT: Expert */}
        <section className="relative flex items-center justify-center overflow-hidden bg-slate-50">
          {/* background text */}
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <div className="absolute -left-10 top-10 select-none text-[120px] font-extrabold text-indigo-200/35">
              EXPERTS
            </div>
            <div className="absolute -left-14 top-44 select-none text-[120px] font-extrabold text-indigo-200/25">
              EXPERTS
            </div>
          </div>

          {/* 카드 */}
          <div className="relative w-full max-w-xl px-6">
            <RoleCard
              title="교수 / 강사 / 멘토"
              subtitle="수업 관리부터 인재 발굴까지, 교육자를 위한 모든 것"
              features={expertFeatures}
              buttonLabel="교수 / 강사 / 멘토로 가입하기"
              buttonVariant="outline"
              onClick={() => navigate("/expert-verify")}
            />
          </div>
        </section>
      </div>

      {/* 하단 로그인 안내 */}
      <div className="fixed inset-x-0 bottom-6 z-20 flex justify-center px-6">
        <div className="rounded-full bg-white/90 px-4 py-2 text-xs text-slate-600 shadow ring-1 ring-slate-200 backdrop-blur">
          이미 계정이 있나요?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-700 hover:text-indigo-800"
          >
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}

/** ---------- Role Card ---------- */
function RoleCard({
  title,
  subtitle,
  features,
  buttonLabel,
  onClick,
  buttonVariant = "primary",
}: {
  title: string;
  subtitle: string;
  features: string[];
  buttonLabel: string;
  onClick: () => void;
  buttonVariant?: "primary" | "outline";
}) {
  return (
    <div className="w-full rounded-3xl bg-white p-10 shadow-[0_14px_40px_rgba(15,23,42,0.10)] ring-1 ring-slate-200/70">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-indigo-50 ring-1 ring-indigo-100">
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 text-indigo-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 10L12 5 2 10l10 5 10-5z" />
          <path d="M6 12v5c0 1 2 3 6 3s6-2 6-3v-5" />
        </svg>
      </div>

      <h2 className="mt-5 text-center text-lg font-bold text-slate-900">
        {title}
      </h2>
      <p className="mt-2 text-center text-sm text-slate-500">{subtitle}</p>

      <div className="mt-7 text-center text-xs font-semibold text-slate-700">
        주요 제공 기능
      </div>

      <ul className="mt-5 space-y-3">
        {features.map((t, i) => (
          <li key={t} className="flex items-start gap-3 text-sm text-slate-700">
            <span className="mt-0.5 grid h-6 w-6 place-items-center rounded-full bg-emerald-500 text-xs font-bold text-white">
              {i + 1}
            </span>
            <span>{t}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onClick}
        className={[
          "mt-9 w-full rounded-xl py-3 text-sm font-semibold transition",
          buttonVariant === "primary"
            ? "bg-indigo-700 text-white hover:bg-indigo-800"
            : "border border-indigo-300 text-indigo-700 hover:bg-indigo-50",
        ].join(" ")}
      >
        {buttonLabel}
      </button>
    </div>
  );
}
