import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type ExpertRole = "faculty" | "mentor";
type Step = 1 | 2;
type Status = "draft" | "pending" | "approved";

const LS_KEY = "unifit_expert_signup"; // 로컬 저장(데모)
const MAX_MB = 10;

function cn(...args: Array<string | boolean | undefined | null>) {
  return args.filter(Boolean).join(" ");
}

function formatBytes(bytes: number) {
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(1)}MB`;
  const kb = bytes / 1024;
  return `${Math.max(1, Math.round(kb))}KB`;
}

export default function ExpertSignup() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [step, setStep] = useState<Step>(1);
  const [role, setRole] = useState<ExpertRole | null>(null);

  const [org, setOrg] = useState("");
  const [field, setField] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [status, setStatus] = useState<Status>("draft");
  const [dragOver, setDragOver] = useState(false);

  // restore
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      const s = JSON.parse(raw);
      if (s?.step) setStep(s.step);
      if (s?.role) setRole(s.role);
      if (s?.org) setOrg(s.org);
      if (s?.field) setField(s.field);
      if (s?.status) setStatus(s.status);
    } catch {}
  }, []);

  // persist (file은 저장 불가)
  useEffect(() => {
    localStorage.setItem(
      LS_KEY,
      JSON.stringify({ step, role, org, field, status })
    );
  }, [step, role, org, field, status]);

  const canNext = useMemo(() => !!role, [role]);
  const canSubmit = useMemo(() => {
    return !!role && org.trim() && field.trim() && !!file && status === "draft";
  }, [role, org, field, file, status]);

  const validateAndSetFile = (f: File) => {
    const extOk =
      f.name.toLowerCase().endsWith(".pdf") ||
      f.name.toLowerCase().endsWith(".jpg") ||
      f.name.toLowerCase().endsWith(".jpeg") ||
      f.name.toLowerCase().endsWith(".png");

    if (!extOk) {
      alert("PDF, JPG, PNG 형식만 업로드할 수 있어요.");
      return;
    }
    if (f.size > MAX_MB * 1024 * 1024) {
      alert(`파일은 최대 ${MAX_MB}MB까지 업로드할 수 있어요.`);
      return;
    }
    setFile(f);
  };

  const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) validateAndSetFile(f);
  };

  const resetAll = () => {
    setStep(1);
    setRole(null);
    setOrg("");
    setField("");
    setFile(null);
    setStatus("draft");
    localStorage.removeItem(LS_KEY);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 상단바: 로고 + 건너뛰고 시작 (Welcome 레이아웃 동일) */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/login" className="text-lg font-bold text-slate-900">
            UniFit
          </Link>

          <button
            type="button"
            onClick={() => navigate("/professor")}
            className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-slate-900"
          >
            건너뛰고 시작
          </button>
        </div>
      </header>

      {/* 본문: Welcome 화면처럼 "중앙 컨테이너 + 좌 패널 + 우 카드" */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[340px_1fr]">
          {/* LEFT PANEL (Welcome 느낌 그대로) */}
          <aside className="rounded-[28px] bg-gradient-to-b from-indigo-600 via-indigo-500 to-indigo-400 p-8 text-white shadow-sm">
            <div className="text-xs font-semibold text-white/80">
              Expert · 신원 인증
            </div>
            <div className="mt-3 text-2xl font-extrabold leading-tight">
              전문가 기능을
              <br />
              시작해볼까요?
            </div>
            <p className="mt-4 text-sm text-white/85 leading-6">
              역할을 선택하고 서류를 제출하면
              <br />
              교수/멘토 기능을 사용할 수 있어요.
            </p>

            <div className="mt-8 space-y-4">
              <StepRow
                idx={1}
                title="역할 선택"
                active={step === 1}
                done={step === 2 || !!role}
              />
              <StepRow
                idx={2}
                title="서류 제출"
                active={step === 2}
                done={status === "pending" || status === "approved"}
              />
            </div>

            <div className="mt-10 rounded-2xl bg-white/15 p-4 text-xs backdrop-blur">
              ✔ 교직원 / 멘토 전용 기능
              <br />
              ✔ 프로젝트/평가/멘토링 관리
            </div>

            <div className="mt-6 text-[11px] text-white/70">
              업로드된 서류는 인증 목적 외 사용하지 않아요.
            </div>
          </aside>

          {/* RIGHT CARD (Welcome 큰 카드 느낌) */}
          <section className="rounded-[28px] bg-white p-10 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-bold tracking-wide text-indigo-600">
                  STEP {step} / 2
                </div>
                <h1 className="mt-2 text-2xl font-extrabold text-slate-900">
                  {step === 1 ? "역할 선택" : "서류 제출"}
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                  {step === 1
                    ? "교직원 또는 멘토 역할을 선택해 주세요."
                    : "소속/전문 분야 입력 후 서류를 업로드해 주세요."}
                </p>
              </div>

              <button
                type="button"
                onClick={resetAll}
                className="text-xs font-semibold text-slate-400 hover:text-slate-600"
              >
                초기화
              </button>
            </div>

            {/* --- STEP 1 --- */}
            {step === 1 ? (
              <>
                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <RoleCard
                    selected={role === "faculty"}
                    title="교직원"
                    desc="대학교 소속 교원 및 강사"
                    icon={<CapIcon />}
                    onClick={() => setRole("faculty")}
                  />
                  <RoleCard
                    selected={role === "mentor"}
                    title="멘토"
                    desc="현직 실무 전문가 및 산업계 종사자"
                    icon={<BriefcaseIcon />}
                    onClick={() => setRole("mentor")}
                  />
                </div>

                <div className="mt-10 flex items-center justify-between border-t border-slate-200 pt-6">
                  <Link
                    to="/login"
                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    로그인으로 돌아가기
                  </Link>

                  <button
                    type="button"
                    disabled={!canNext}
                    onClick={() => canNext && setStep(2)}
                    className={cn(
                      "rounded-xl px-5 py-2.5 text-sm font-semibold transition",
                      canNext
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "bg-slate-200 text-slate-500 cursor-not-allowed"
                    )}
                  >
                    다음
                  </button>
                </div>
              </>
            ) : null}

            {/* --- STEP 2 --- */}
            {step === 2 ? (
              <>
                {/* 상태 뱃지 */}
                {status !== "draft" ? (
                  <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    {status === "pending" ? (
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-700 ring-1 ring-amber-200">
                          ⏳
                        </span>
                        <div>
                          <div className="text-sm font-semibold text-slate-900">
                            승인 대기 중
                          </div>
                          <div className="mt-1 text-xs text-slate-500">
                            제출이 완료되었어요. 운영진 확인 후 승인됩니다.
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200">
                          ✓
                        </span>
                        <div>
                          <div className="text-sm font-semibold text-slate-900">
                            인증 완료
                          </div>
                          <div className="mt-1 text-xs text-slate-500">
                            승인되었습니다. 전문가 기능을 사용할 수 있어요.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}

                <div className="mt-8 space-y-5">
                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      현재 소속 기업/기관 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      value={org}
                      onChange={(e) => setOrg(e.target.value)}
                      disabled={status !== "draft"}
                      placeholder="예: 삼성전자, 카카오, 네이버"
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-400 disabled:cursor-not-allowed disabled:opacity-80"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      전문 분야 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      value={field}
                      onChange={(e) => setField(e.target.value)}
                      disabled={status !== "draft"}
                      placeholder="예: 백엔드 개발, UX디자인, 데이터 사이언스"
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-400 disabled:cursor-not-allowed disabled:opacity-80"
                    />
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-slate-700">
                      인증 서류 업로드 <span className="text-rose-500">*</span>
                    </div>

                    <div
                      onDragEnter={() => status === "draft" && setDragOver(true)}
                      onDragLeave={() => setDragOver(false)}
                      onDragOver={(e) => status === "draft" && e.preventDefault()}
                      onDrop={status === "draft" ? onDrop : undefined}
                      className={cn(
                        "mt-3 rounded-2xl border-2 border-dashed p-8 text-center transition",
                        dragOver
                          ? "border-indigo-400 bg-indigo-50"
                          : "border-slate-200 bg-slate-50",
                        status !== "draft" && "opacity-80"
                      )}
                    >
                      <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white ring-1 ring-slate-200">
                        <DocIcon />
                      </div>

                      <div className="mt-4 text-sm font-semibold text-slate-900">
                        재직증명서/졸업증명서 등을 드래그하여 업로드하세요
                      </div>
                      <div className="mt-2 text-xs text-slate-500">
                        또는{" "}
                        <button
                          type="button"
                          onClick={() => fileRef.current?.click()}
                          disabled={status !== "draft"}
                          className="font-semibold text-indigo-700 hover:text-indigo-800 disabled:cursor-not-allowed"
                        >
                          클릭하여 파일 선택
                        </button>
                      </div>
                      <div className="mt-3 text-[11px] text-slate-400">
                        PDF, JPG, PNG 가능 · 최대 {MAX_MB}MB
                      </div>

                      <input
                        ref={fileRef}
                        type="file"
                        className="hidden"
                        accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) validateAndSetFile(f);
                        }}
                        disabled={status !== "draft"}
                      />

                      {file ? (
                        <div className="mt-5 rounded-xl bg-white px-4 py-3 text-left ring-1 ring-slate-200">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="truncate text-sm font-semibold text-slate-800">
                                {file.name}
                              </div>
                              <div className="mt-1 text-xs text-slate-500">
                                {formatBytes(file.size)}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => setFile(null)}
                              disabled={status !== "draft"}
                              className="rounded-lg px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed"
                            >
                              삭제
                            </button>
                          </div>
                        </div>
                      ) : null}

                      <div className="mt-4 text-[11px] text-slate-500">
                        업로드된 서류는 암호화되어 인증 목적으로만 사용됩니다.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex items-center justify-between border-t border-slate-200 pt-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    이전
                  </button>

                  <button
                    type="button"
                    disabled={!canSubmit}
                    onClick={() => setStatus("pending")}
                    className={cn(
                      "rounded-xl px-5 py-2.5 text-sm font-semibold transition",
                      canSubmit
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "bg-slate-200 text-slate-500 cursor-not-allowed"
                    )}
                  >
                    인증 신청하기
                  </button>
                </div>
              </>
            ) : null}
          </section>
        </div>
      </main>
    </div>
  );
}

/* ---------- components ---------- */

function StepRow({
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
        className={cn(
          "grid h-9 w-9 place-items-center rounded-full text-sm font-bold ring-1",
          done
            ? "bg-emerald-300 text-slate-900 ring-emerald-200"
            : active
            ? "bg-white text-indigo-700 ring-white/60"
            : "bg-white/15 text-white/80 ring-white/20"
        )}
      >
        {done ? "✓" : idx}
      </div>
      <div>
        <div className="text-sm font-semibold text-white">{title}</div>
        <div className="text-xs text-white/75">
          {done ? "완료" : active ? "진행 중" : ""}
        </div>
      </div>
    </div>
  );
}

function RoleCard({
  selected,
  title,
  desc,
  icon,
  onClick,
}: {
  selected: boolean;
  title: string;
  desc: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-2xl border p-6 text-center transition",
        selected
          ? "border-indigo-500 bg-indigo-50 ring-4 ring-indigo-100"
          : "border-slate-200 bg-white hover:border-slate-300"
      )}
    >
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white ring-1 ring-slate-200">
        <div className="text-indigo-700">{icon}</div>
      </div>
      <div className="mt-4 text-base font-bold text-slate-900">{title}</div>
      <div className="mt-2 text-xs text-slate-500">{desc}</div>
    </button>
  );
}

/* ---------- icons ---------- */

function CapIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 10L12 5 2 10l10 5 10-5z" />
      <path d="M6 12v5c0 1 2 3 6 3s6-2 6-3v-5" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="7" width="18" height="14" rx="2" ry="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <path d="M3 13h18" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7 text-indigo-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
      <path d="M10 9H8" />
    </svg>
  );
}
