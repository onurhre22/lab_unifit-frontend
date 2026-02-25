import React, { useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

/** ---------- Header (Professor) ---------- */
function ProfNavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "text-sm font-medium transition",
          isActive ? "text-indigo-600" : "text-slate-600 hover:text-slate-900",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}

function IconBtn({
  label,
  children,
  dot,
}: {
  label: string;
  children: React.ReactNode;
  dot?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="relative grid h-9 w-9 place-items-center rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
    >
      {children}
      {dot ? (
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-amber-400 ring-2 ring-white" />
      ) : null}
    </button>
  );
}

function ProfessorHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <Link to="/professor" className="text-lg font-bold text-slate-900">
            UniFit
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <ProfNavItem to="/professor">대시보드</ProfNavItem>
            <ProfNavItem to="/team-project">교과목/팀</ProfNavItem>
            <ProfNavItem to="/autonomous-recruitment">팀 모집</ProfNavItem>
            <ProfNavItem to="/notifications">알림</ProfNavItem>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/notifications">
            <IconBtn label="알림" dot>
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
                <path d="M13.73 21a2 2 0 01-3.46 0" />
              </svg>
            </IconBtn>
          </Link>

          <button
            type="button"
            aria-label="마이페이지"
            className="ml-1 flex h-9 items-center gap-2 rounded-xl pl-2 pr-2.5 text-slate-700 hover:bg-slate-100 transition"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-slate-700 ring-1 ring-slate-200">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 21a8 8 0 10-16 0" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            <span className="hidden text-sm font-medium md:block">교수 [이름]</span>
          </button>
        </div>
      </div>
    </header>
  );
}

/** ---------- Small UI ---------- */
function CardSection({
  title,
  right,
  children,
}: {
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
        <h3 className="text-sm font-semibold text-indigo-700">{title}</h3>
        {right}
      </div>
      <div className="px-6 py-5">{children}</div>
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-xs font-medium text-slate-500">{children}</div>;
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={[
        "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none",
        "placeholder:text-slate-300 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100",
        props.className ?? "",
      ].join(" ")}
    />
  );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={[
        "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none",
        "placeholder:text-slate-300 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100",
        "min-h-[120px] resize-none",
        props.className ?? "",
      ].join(" ")}
    />
  );
}

function SmallBtn({
  children,
  variant = "outline",
  onClick,
  type = "button",
}: {
  children: React.ReactNode;
  variant?: "outline" | "solid" | "ghost";
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const cls =
    variant === "solid"
      ? "bg-cyan-500 text-white hover:bg-cyan-600"
      : variant === "ghost"
      ? "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
      : "bg-white text-indigo-600 hover:bg-indigo-50 border border-indigo-200";
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${cls}`}
    >
      {children}
    </button>
  );
}

function Stepper({ step }: { step: 1 | 2 | 3 | 4 }) {
  const steps = [
    { n: 1, label: "기본 정보" },
    { n: 2, label: "과제 설정" },
    { n: 3, label: "평가 기준" },
    { n: 4, label: "검토" },
  ] as const;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-4 gap-3 md:gap-6">
        {steps.map((s, idx) => {
          const active = s.n === step;
          const done = s.n < step;
          return (
            <div key={s.n} className="flex items-center gap-3">
              <div
                className={[
                  "grid h-9 w-9 place-items-center rounded-full text-sm font-bold",
                  active
                    ? "bg-cyan-500 text-white"
                    : done
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-500",
                ].join(" ")}
              >
                {s.n}
              </div>

              <div className="min-w-0">
                <div
                  className={[
                    "text-xs font-semibold",
                    active ? "text-cyan-600" : "text-slate-500",
                  ].join(" ")}
                >
                  {s.label}
                </div>
                <div className="mt-2 h-[3px] w-full rounded-full bg-slate-100">
                  <div
                    className={[
                      "h-[3px] rounded-full transition",
                      s.n <= step ? "bg-cyan-400" : "bg-transparent",
                    ].join(" ")}
                    style={{ width: s.n <= step ? "100%" : "0%" }}
                  />
                </div>
              </div>

              {/* spacing for last */}
              {idx === steps.length - 1 ? null : <div className="hidden md:block w-2" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** ---------- Page ---------- */
type RubricRow = { id: string; name: string; percent: number };

export default function ProfessorCreateProject() {
  const navigate = useNavigate();
  const [step] = useState<1 | 2 | 3 | 4>(1);

  // 기본 강의 정보
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [semester, setSemester] = useState("");
  const [classCode] = useState("UNIFIT-M1DFM3L0C"); // 자동 생성 예시

  // 과제 상세 정보
  const [projectTitle, setProjectTitle] = useState("");
  const [projectGoal, setProjectGoal] = useState("");
  const [finalDue, setFinalDue] = useState("");
  const [midMilestone, setMidMilestone] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);

  // 채점 기준
  const [rubric, setRubric] = useState<RubricRow[]>([
    { id: "r1", name: "기술적 구현", percent: 40 },
    { id: "r2", name: "팀워크/동료 평가", percent: 20 },
    { id: "r3", name: "발표", percent: 20 },
    { id: "r4", name: "최종 보고서", percent: 20 },
  ]);
  const [peerEnabled, setPeerEnabled] = useState(false);

  const totalPercent = useMemo(
    () => rubric.reduce((acc, r) => acc + (Number.isFinite(r.percent) ? r.percent : 0), 0),
    [rubric]
  );

  const onPickFiles = (files: FileList | null) => {
    if (!files) return;
    setAttachments((prev) => [...prev, ...Array.from(files)]);
  };

  const addRubricRow = () => {
    setRubric((prev) => [
      ...prev,
      { id: `r${Date.now()}`, name: "평가 항목", percent: 0 },
    ]);
  };

  const removeRubricRow = (id: string) => {
    setRubric((prev) => prev.filter((r) => r.id !== id));
  };

  const updateRubric = (id: string, patch: Partial<RubricRow>) => {
    setRubric((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  // const goNext = () => setStep((s) => (s < 4 ? ((s + 1) as any) : s));
  // const goPrev = () => setStep((s) => (s > 1 ? ((s - 1) as any) : s));

  return (
    <div className="min-h-screen bg-slate-50">
      <ProfessorHeader />

      <main className="mx-auto max-w-7xl px-6 py-8 pb-28">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">새 프로젝트 강의실 만들기</h1>
          <p className="mt-1 text-sm text-slate-500">한신대학교 | AI소프트웨어학과</p>
        </div>

        {/* Stepper */}
        <div className="mt-6">
          <Stepper step={step} />
        </div>

        {/* Sections */}
        <div className="mt-6 space-y-5">
          {/* 1) 기본 강의 정보 */}
          <CardSection title="기본 강의 정보">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <Label>강의명</Label>
                <TextInput
                  placeholder="예: AI 시스템 설계"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </div>

              <div>
                <Label>과목 코드</Label>
                <TextInput
                  placeholder="예: AISW401"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                />
              </div>

              <div>
                <Label>학기</Label>
                <TextInput
                  placeholder="예: 2026년 1학기"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                />
              </div>

              <div>
                <Label>수강 코드 (자동 생성)</Label>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    readOnly
                    value={classCode}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                  />
                  <button
                    type="button"
                    className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition"
                    aria-label="copy"
                    onClick={() => navigator.clipboard?.writeText(classCode)}
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" />
                      <rect x="2" y="2" width="13" height="13" rx="2" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <SmallBtn variant="ghost">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
                엑셀에서 학생 명단 불러오기
              </SmallBtn>
            </div>
          </CardSection>

          {/* 2) 과제 상세 정보 */}
          <CardSection
            title="과제 상세 정보"
            right={
              <SmallBtn variant="solid">
                <span className="grid h-6 w-6 place-items-center rounded-lg bg-white/20">✨</span>
                과제 템플릿 제안받기
              </SmallBtn>
            }
          >
            <div className="grid grid-cols-1 gap-5">
              <div>
                <Label>프로젝트 제목</Label>
                <TextInput
                  placeholder="예: AI 기반 추천 시스템 구축"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                />
              </div>

              <div>
                <Label>프로젝트 목표</Label>
                <TextArea
                  placeholder="이 프로젝트의 학습 목표와 기대 성과를 설명해주세요..."
                  value={projectGoal}
                  onChange={(e) => setProjectGoal(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <Label>최종 마감일</Label>
                  <div className="relative">
                    <TextInput
                      type="date"
                      value={finalDue}
                      onChange={(e) => setFinalDue(e.target.value)}
                      className="pr-10"
                    />
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                      📅
                    </span>
                  </div>
                </div>

                <div>
                  <Label>중간 마일스톤 (선택)</Label>
                  <div className="relative">
                    <TextInput
                      type="date"
                      value={midMilestone}
                      onChange={(e) => setMidMilestone(e.target.value)}
                      className="pr-10"
                    />
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                      📅
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <Label>자료 업로드</Label>
                <div className="mt-2 rounded-2xl border border-slate-200 bg-white p-6">
                  <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center">
                    <div className="text-3xl text-slate-400">⬆️</div>
                    <p className="mt-3 text-sm font-semibold text-slate-700">
                      파일을 드래그하거나 클릭하여 업로드
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      가이드라인, 예시파일, 참고 자료 (PDF, ZIP, DOCX)
                    </p>

                    <label className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-xl bg-indigo-50 px-5 py-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-100 transition">
                      파일 찾기
                      <input
                        type="file"
                        className="hidden"
                        multiple
                        onChange={(e) => onPickFiles(e.target.files)}
                      />
                    </label>
                  </div>

                  {attachments.length > 0 ? (
                    <div className="mt-4 space-y-2">
                      {attachments.map((f, idx) => (
                        <div
                          key={`${f.name}-${idx}`}
                          className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
                        >
                          <div className="min-w-0 truncate text-slate-700">{f.name}</div>
                          <button
                            type="button"
                            className="rounded-lg px-3 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                            onClick={() =>
                              setAttachments((prev) => prev.filter((_, i) => i !== idx))
                            }
                          >
                            삭제
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </CardSection>

          {/* 3) 채점 및 평가 기준 */}
          <CardSection title="채점 및 평가 기준">
            <div className="space-y-3">
              {rubric.map((r) => (
                <div key={r.id} className="grid grid-cols-12 items-center gap-3">
                  <div className="col-span-8">
                    <TextInput
                      value={r.name}
                      onChange={(e) => updateRubric(r.id, { name: e.target.value })}
                      className="mt-0"
                    />
                  </div>

                  <div className="col-span-3">
                    <div className="relative">
                      <TextInput
                        type="number"
                        value={r.percent}
                        onChange={(e) =>
                          updateRubric(r.id, { percent: Number(e.target.value) })
                        }
                        className="mt-0 pr-10"
                        min={0}
                        max={100}
                      />
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                        %
                      </span>
                    </div>
                  </div>

                  <div className="col-span-1 flex justify-end">
                    <button
                      type="button"
                      aria-label="remove"
                      onClick={() => removeRubricRow(r.id)}
                      className="grid h-10 w-10 place-items-center rounded-xl text-rose-500 hover:bg-rose-50 transition"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <SmallBtn onClick={addRubricRow}>
                <span className="text-lg leading-none">＋</span> 평가 항목 추가
              </SmallBtn>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-700">총 배점</div>
              <div className={`text-sm font-extrabold ${totalPercent === 100 ? "text-emerald-600" : "text-rose-600"}`}>
                {totalPercent}%
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
              <div>
                <div className="text-sm font-semibold text-slate-800">동료 평가 활성화</div>
                <div className="mt-1 text-xs text-slate-500">
                  학생들이 서로를 익명으로 평가할 수 있습니다
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPeerEnabled((v) => !v)}
                className={[
                  "relative inline-flex h-7 w-12 items-center rounded-full transition",
                  peerEnabled ? "bg-emerald-500" : "bg-slate-300",
                ].join(" ")}
                aria-label="toggle"
              >
                <span
                  className={[
                    "inline-block h-6 w-6 rounded-full bg-white shadow-sm transition",
                    peerEnabled ? "translate-x-5" : "translate-x-1",
                  ].join(" ")}
                />
              </button>
            </div>
          </CardSection>
        </div>
      </main>

      {/* Bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-2">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                ✓
              </span>
              임시 저장 완료
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              취소
            </button>

            <button
              type="button"
              className="rounded-xl bg-indigo-700 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-800 transition"
              onClick={() => {
                // 실제 저장 API 붙이기 전이라면 여기서 콘솔로만 확인
                console.log({
                  courseName,
                  courseCode,
                  semester,
                  classCode,
                  projectTitle,
                  projectGoal,
                  finalDue,
                  midMilestone,
                  attachments: attachments.map((f) => f.name),
                  rubric,
                  peerEnabled,
                });
                alert("강의실 및 프로젝트 게시 (프론트 시안)!");
              }}
            >
              강의실 및 프로젝트 게시
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}