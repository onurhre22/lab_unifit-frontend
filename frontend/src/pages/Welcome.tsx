import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const LS_ONBOARDED = "unifit_onboarded"; // "true"면 온보딩 완료

type Step = 1 | 2 | 3;

export default function Welcome() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);

  // step1
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // step2
  const [code, setCode] = useState(Array.from({ length: 6 }, () => ""));
  const codeValue = useMemo(() => code.join(""), [code]);

  // step3
  const goals = [
    { id: "job", label: "취업 준비", sub: "대기업/스타트업 취업" },
    { id: "grad", label: "대학원 진학", sub: "석사/박사 과정" },
    { id: "contest", label: "공모전/대외활동", sub: "수상/포트폴리오" },
    { id: "basic", label: "기초 다지기", sub: "CS/전공 기초" },
  ] as const;

  const interests = [
    "AI/머신러닝",
    "웹 개발",
    "모바일 앱",
    "데이터 분석",
    "클라우드/DevOps",
    "보안",
    "게임 개발",
    "블록체인",
  ];

  const styles = [
    { id: "visual", label: "시각적 학습", sub: "다이어그램, 영상" },
    { id: "hands", label: "실습 중심", sub: "프로젝트, 코딩 실습" },
    { id: "theory", label: "이론 중심", sub: "개념/원리 이해" },
    { id: "collab", label: "협업 학습", sub: "팀 프로젝트, 스터디" },
  ] as const;

  const [goal, setGoal] = useState<(typeof goals)[number]["id"] | "">("");
  const [pickedInterests, setPickedInterests] = useState<string[]>([]);
  const [style, setStyle] = useState<(typeof styles)[number]["id"] | "">("");
  const [gradTerm, setGradTerm] = useState("");

  const toggleInterest = (v: string) => {
    setPickedInterests((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );
  };

  const canGoNext =
    step === 1
      ? name.trim().length >= 1 && email.trim().length >= 3
      : step === 2
      ? codeValue.length === 6
      : goal !== "" && style !== "" && gradTerm.trim().length >= 1;

  const onSkip = () => {
    // 스킵해도 일단 완료 처리 후 메인으로
    localStorage.setItem(LS_ONBOARDED, "true");
    navigate("/main");
  };

  const onFinish = () => {
    // ✅ 여기서 서버 저장 대신 완료 처리 + 메인 이동
    localStorage.setItem(LS_ONBOARDED, "true");
    navigate("/main");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 상단 바 */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="text-lg font-bold text-slate-900">UniFit</div>
          <button
            type="button"
            onClick={onSkip}
            className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-slate-900 transition"
          >
            건너뛰고 시작
          </button>
        </div>
      </header>

      {/* ✅ 잘림 방지 핵심: 화면 높이 - header(64px) 만큼, 내부 스크롤 */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-8 md:grid-cols-[280px_1fr]">
        {/* 왼쪽 스텝퍼 */}
        <aside className="rounded-3xl bg-gradient-to-b from-indigo-600 via-indigo-500 to-indigo-400 p-6 text-white shadow-sm md:sticky md:top-24 md:h-[calc(100vh-64px-64px)]">
          <div className="text-sm text-white/80">Welcome · 첫 설정</div>
          <div className="mt-3 text-2xl font-bold leading-snug">
            반가워요! <br />
            UniFit을 시작해볼까요?
          </div>
          <div className="mt-3 text-sm text-white/85">
            30초만 설정하면, 나에게 맞는 로드맵과 협업 기능을 더 정확히 추천할 수
            있어요.
          </div>

          <div className="mt-8 space-y-5">
            <StepItem
              idx={1}
              title="기본 정보"
              active={step === 1}
              done={step > 1}
            />
            <StepItem
              idx={2}
              title="대학 인증"
              active={step === 2}
              done={step > 2}
            />
            <StepItem
              idx={3}
              title="AI 프로필 설정"
              active={step === 3}
              done={false}
            />
          </div>

          <div className="mt-10 rounded-2xl bg-white/10 p-4 text-xs text-white/85 backdrop-blur">
            5,000명+ 학생들이 함께 미래를 만들어가고 있어요.
          </div>
        </aside>

        {/* 오른쪽 컨텐츠 */}
        <section className="rounded-3xl bg-white p-6 shadow-sm">
          {/* 타이틀 */}
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-indigo-600">
                STEP {step} / 3
              </div>
              <h1 className="mt-1 text-2xl font-bold text-slate-900">
                {step === 1
                  ? "시작하기"
                  : step === 2
                  ? "대학 인증"
                  : "AI 프로필 설정"}
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                {step === 1
                  ? "AI 기반 학업 로드맵을 위한 계정을 만들어보세요."
                  : step === 2
                  ? "학생 신분을 인증하면 UniFit의 모든 기능을 이용할 수 있어요."
                  : "맞춤형 추천을 위한 정보를 입력해주세요."}
              </p>
            </div>

            {/* 상단 작은 탭(이미지 느낌) */}
            {step === 3 ? (
              <div className="flex flex-wrap gap-2">
                <SmallPill active>AI 로드맵</SmallPill>
                <SmallPill>팀 프로젝트</SmallPill>
                <SmallPill>멘토링</SmallPill>
                <SmallPill>포트폴리오</SmallPill>
              </div>
            ) : null}
          </div>

          {/* ✅ 내부 스크롤 영역 (잘림 방지) */}
          <div className="mt-6 max-h-[calc(100vh-64px-64px-120px)] overflow-auto pr-1">
            {step === 1 && (
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="이름">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                    placeholder="이름을 입력하세요"
                  />
                </Field>

                <Field label="이메일">
                  <div className="flex gap-2">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                      placeholder="your.email@university.ac.kr"
                    />
                    <button
                      type="button"
                      className="shrink-0 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition"
                      onClick={() => {
                        // 데모: 인증 메일 전송
                        alert("데모: 인증 이메일을 전송했다고 가정합니다.");
                      }}
                    >
                      인증 메일 전송
                    </button>
                  </div>
                </Field>

                <Field label="비밀번호" className="md:col-span-2">
                  <input
                    type="password"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                    placeholder="안전한 비밀번호를 입력하세요"
                  />
                </Field>

                <Field label="비밀번호 확인" className="md:col-span-2">
                  <input
                    type="password"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                    placeholder="비밀번호를 다시 입력하세요"
                  />
                </Field>

                <div className="md:col-span-2 text-xs text-slate-500">
                  계속 진행하면{" "}
                  <span className="font-medium text-slate-700">
                    이용약관 및 개인정보처리방침
                  </span>
                  에 동의하는 것으로 간주합니다.
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">
                    이메일 인증 코드
                  </div>
                  <div className="mt-2 text-sm text-slate-600">
                    {email ? (
                      <>
                        <span className="font-semibold">{email}</span> 로 인증
                        코드가 전송되었다고 가정했어요. (데모)
                      </>
                    ) : (
                      "이메일로 인증 코드가 전송되었다고 가정했어요. (데모)"
                    )}
                  </div>

                  <div className="mt-4">
                    <div className="text-xs text-slate-500">
                      6자리 인증 코드를 입력해주세요
                    </div>
                    <div className="mt-2 grid grid-cols-6 gap-2">
                      {code.map((v, i) => (
                        <input
                          key={i}
                          value={v}
                          onChange={(e) => {
                            const next = e.target.value.replace(/\D/g, "");
                            setCode((prev) => {
                              const copy = [...prev];
                              copy[i] = next.slice(-1);
                              return copy;
                            });
                          }}
                          maxLength={1}
                          className="h-12 w-full rounded-xl border border-slate-200 bg-white text-center text-lg font-semibold outline-none focus:border-indigo-500"
                        />
                      ))}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition"
                        onClick={() => alert("데모: 인증 확인!")}
                      >
                        인증 확인
                      </button>
                      <button
                        type="button"
                        className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                        onClick={() => alert("데모: 재전송!")}
                      >
                        재전송
                      </button>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-sm font-semibold text-slate-900">
                    학생증 업로드 (선택)
                  </div>
                  <div className="mt-2 text-sm text-slate-600">
                    학생증 사진을 업로드하여 학생 신분을 확인할 수 있어요.
                  </div>

                  <div className="mt-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                    <div className="mx-auto grid h-10 w-10 place-items-center rounded-2xl bg-white ring-1 ring-slate-200">
                      ↑
                    </div>
                    <div className="mt-2 text-sm font-medium text-slate-700">
                      학생증 사진 업로드
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      클릭하거나 파일을 드래그하여 업로드하세요
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl bg-indigo-50 p-4 text-xs text-indigo-700 ring-1 ring-indigo-100">
                    업로드된 정보는 안전하게 보호되며, 학생 신분 확인 목적으로만
                    사용됩니다. (데모)
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold text-slate-900">
                      학업 목표
                    </div>
                    <span className="rounded-full bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-600 ring-1 ring-rose-100">
                      필수
                    </span>
                  </div>
                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    {goals.map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setGoal(g.id)}
                        className={`rounded-2xl border p-4 text-left transition ${
                          goal === g.id
                            ? "border-indigo-300 bg-indigo-50 ring-2 ring-indigo-100"
                            : "border-slate-200 bg-white hover:bg-slate-50"
                        }`}
                      >
                        <div className="text-sm font-semibold text-slate-900">
                          {g.label}
                        </div>
                        <div className="mt-1 text-xs text-slate-500">
                          {g.sub}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold text-slate-900">
                      관심 분야
                    </div>
                    <span className="rounded-full bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-600 ring-1 ring-rose-100">
                      필수
                    </span>
                    <span className="text-xs text-slate-400">(복수 선택)</span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {interests.map((it) => {
                      const active = pickedInterests.includes(it);
                      return (
                        <button
                          key={it}
                          type="button"
                          onClick={() => toggleInterest(it)}
                          className={`rounded-full px-4 py-2 text-sm transition ring-1 ${
                            active
                              ? "bg-indigo-600 text-white ring-indigo-600"
                              : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          {it}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold text-slate-900">
                      학습 스타일
                    </div>
                    <span className="rounded-full bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-600 ring-1 ring-rose-100">
                      필수
                    </span>
                  </div>

                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    {styles.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setStyle(s.id)}
                        className={`rounded-2xl border p-4 text-left transition ${
                          style === s.id
                            ? "border-indigo-300 bg-indigo-50 ring-2 ring-indigo-100"
                            : "border-slate-200 bg-white hover:bg-slate-50"
                        }`}
                      >
                        <div className="text-sm font-semibold text-slate-900">
                          {s.label}
                        </div>
                        <div className="mt-1 text-xs text-slate-500">{s.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold text-slate-900">
                      목표 졸업 시기
                    </div>
                    <span className="rounded-full bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-600 ring-1 ring-rose-100">
                      필수
                    </span>
                  </div>
                  <input
                    value={gradTerm}
                    onChange={(e) => setGradTerm(e.target.value)}
                    className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                    placeholder="예: 2027년 2월"
                  />
                </div>

                <div className="rounded-2xl bg-indigo-50 p-4 text-xs text-indigo-700 ring-1 ring-indigo-100">
                  입력한 정보를 바탕으로 개인 맞춤 학업 로드맵, 추천 강의,
                  프로젝트 아이디어를 생성합니다. (데모)
                </div>
              </div>
            )}
          </div>

          {/* 하단 버튼 */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5">
            <button
              type="button"
              onClick={() => {
                if (step === 1) navigate("/login");
                else setStep((s) => (s - 1) as Step);
              }}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              {step === 1 ? "로그인으로 돌아가기" : "이전"}
            </button>

            <div className="flex gap-2">
              {step < 3 ? (
                <button
                  type="button"
                  disabled={!canGoNext}
                  onClick={() => setStep((s) => (s + 1) as Step)}
                  className={`rounded-xl px-5 py-3 text-sm font-semibold text-white transition ${
                    canGoNext
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : "bg-slate-300 cursor-not-allowed"
                  }`}
                >
                  다음
                </button>
              ) : (
                <button
                  type="button"
                  disabled={!canGoNext}
                  onClick={onFinish}
                  className={`rounded-xl px-5 py-3 text-sm font-semibold text-white transition ${
                    canGoNext
                      ? "bg-black hover:bg-slate-900"
                      : "bg-slate-300 cursor-not-allowed"
                  }`}
                >
                  설정 완료하고 시작하기
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function StepItem({
  idx,
  title,
  active,
  done,
}: {
  idx: number;
  title: string;
  active: boolean;
  done: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`grid h-10 w-10 place-items-center rounded-full text-sm font-bold ring-2 transition ${
          done
            ? "bg-emerald-500 text-white ring-emerald-300"
            : active
            ? "bg-white text-indigo-700 ring-white/60"
            : "bg-white/10 text-white ring-white/25"
        }`}
      >
        {done ? "✓" : idx}
      </div>
      <div>
        <div className={`text-sm font-semibold ${active ? "text-white" : "text-white/85"}`}>
          {title}
        </div>
        <div className="text-xs text-white/70">{active ? "진행 중" : done ? "완료" : ""}</div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="text-xs font-semibold text-slate-700">{label}</div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function SmallPill({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 transition ${
        active
          ? "bg-indigo-600 text-white ring-indigo-600"
          : "bg-white text-slate-700 ring-slate-200"
      }`}
    >
      {children}
    </span>
  );
}
