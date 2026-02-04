import React from "react";
import { Link, NavLink } from "react-router-dom";

/**
 * 교수 대시보드 (Wide Layout 기준)
 * - Header: max-w-7xl / px-6 / h-16 / sticky
 * - Main: max-w-7xl / px-6
 * - 피그마 느낌의 KPI 카드 + 과목별 팀 진행 현황 테이블 구성
 */

/** ---------- Header (Professor) ---------- */
function ProfNavItem({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
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

          {/* 교수용 메뉴 (피그마 느낌) */}
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

/** ---------- UI Blocks ---------- */
function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-xs font-medium text-slate-500">{label}</div>
      <div className="mt-2 flex items-end justify-between">
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        {sub ? <div className="text-xs text-slate-400">{sub}</div> : null}
      </div>
    </div>
  );
}

function ProgressBar({ percent }: { percent: number }) {
  const p = Math.max(0, Math.min(100, percent));
  return (
    <div className="h-2 w-44 rounded-full bg-slate-100">
      <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${p}%` }} />
    </div>
  );
}

type TeamRow = {
  status: "활동중" | "주의" | "완료";
  teamName: string;
  leader: string;
  members: number;
  progress?: number; // 활동중/주의만
};

function StatusDot({ status }: { status: TeamRow["status"] }) {
  const cls =
    status === "완료"
      ? "bg-emerald-500"
      : status === "주의"
        ? "bg-rose-500"
        : "bg-sky-500";
  return <span className={`inline-block h-2 w-2 rounded-full ${cls}`} />;
}

function CourseSection({
  title,
  subtitle,
  rows,
  mode,
}: {
  title: string;
  subtitle: string;
  rows: TeamRow[];
  mode: "progress" | "simple";
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-4">
        <div className="text-sm font-semibold text-slate-900">{title}</div>
        <div className="mt-1 text-xs text-slate-500">{subtitle}</div>
      </div>

      <div className="px-6 py-4">
        <div className="grid grid-cols-12 border-b border-slate-100 pb-3 text-xs font-medium text-slate-500">
          <div className="col-span-1">상태</div>
          <div className="col-span-4">팀 이름</div>
          <div className="col-span-3">팀장</div>
          <div className="col-span-2">인원</div>
          <div className="col-span-2 text-right">
            {mode === "progress" ? "진행률" : ""}
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {rows.map((r) => (
            <div key={r.teamName} className="grid grid-cols-12 items-center py-3 text-sm">
              <div className="col-span-1">
                <StatusDot status={r.status} />
              </div>
              <div className="col-span-4 font-medium text-slate-900">{r.teamName}</div>
              <div className="col-span-3 text-slate-700">{r.leader}</div>
              <div className="col-span-2 text-slate-700">{r.members}</div>
              <div className="col-span-2 flex justify-end">
                {mode === "progress" ? (
                  <div className="flex items-center gap-3">
                    <ProgressBar percent={r.progress ?? 0} />
                    <span className="w-10 text-right text-xs text-slate-500">
                      {(r.progress ?? 0).toFixed(0)}%
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-slate-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** ---------- Page ---------- */
export default function ProfessorDashboard() {
  // 더미 데이터(피그마 느낌)
  const courseA: TeamRow[] = [
    { status: "활동중", teamName: "알파팀", leader: "김민수", members: 5, progress: 75 },
    { status: "활동중", teamName: "베타팀", leader: "박지영", members: 4, progress: 45 },
    { status: "주의", teamName: "감마팀", leader: "이상현", members: 5, progress: 30 },
    { status: "완료", teamName: "델타팀", leader: "최유나", members: 4 },
  ];

  const courseB: TeamRow[] = [
    { status: "활동중", teamName: "뉴컴브네트워크", leader: "정태혁", members: 6, progress: 61 },
    { status: "활동중", teamName: "딥러닝", leader: "강수진", members: 5, progress: 52 },
    { status: "활동중", teamName: "머신비전", leader: "윤지훈", members: 4, progress: 40 },
    { status: "주의", teamName: "NLP 스쿼드", leader: "송민지", members: 5, progress: 28 },
  ];

  const courseC: TeamRow[] = [
    { status: "활동중", teamName: "SQL 마스터즈", leader: "한승준", members: 4, progress: 70 },
    { status: "활동중", teamName: "NoSQL 팀", leader: "임혜진", members: 5, progress: 55 },
    { status: "활동중", teamName: "데이터 아키텍트", leader: "신동혁", members: 4, progress: 48 },
    { status: "주의", teamName: "DB 위저드", leader: "배예린", members: 5, progress: 33 },
  ];

  const courseD: TeamRow[] = [
    { status: "활동중", teamName: "iOS 아보카도", leader: "오채훈", members: 4, progress: 66 },
    { status: "주의", teamName: "안드로이드 에이스", leader: "전문진", members: 5, progress: 29 },
    { status: "활동중", teamName: "플러터 포스", leader: "서민우", members: 4, progress: 50 },
    { status: "활동중", teamName: "리액트 네이티브", leader: "남지원", members: 5, progress: 43 },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <ProfessorHeader />

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* 상단 메타 */}
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs text-slate-500">2026년 1학기 · 한신대학교 ASW</div>
            <div className="mt-1 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2">
                <span className="inline-block h-5 w-5 rounded-full bg-slate-200" />
                교수 [이름]
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/team-project"
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition"
            >
              새 프로젝트 생성
            </Link>
            <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
              공지 작성
            </button>
            <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
              진행 보고서 다운로드
            </button>
          </div>
        </div>

        {/* KPI 카드 */}
        <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          <StatCard label="전체 학생" value="74" />
          <StatCard label="활성 프로젝트" value="16" />
          <StatCard label="평균 팀 진행률" value="61%" sub="최근 7일 기준" />
          <StatCard label="미제출 과제" value="4" sub="마감 임박 포함" />
        </section>

        {/* 과목별 진행 현황 */}
        <section className="mt-8">
          <div className="flex items-end justify-between">
            <h2 className="text-base font-semibold text-slate-900">과목별 진행 현황</h2>
            <div className="text-xs text-slate-400">* 더미 데이터(프론트 시안)</div>
          </div>

          <div className="mt-4 space-y-5">
            <CourseSection
              title="소프트웨어 공학"
              subtitle="4개 팀 활동중 · 제출/회의/진행률 기반 모니터링"
              rows={courseA}
              mode="progress"
            />
            <CourseSection
              title="AI 프로그래밍"
              subtitle="4개 팀 활동중 · 위험 팀 자동 감지(예: 주의)"
              rows={courseB}
              mode="progress"
            />
            <CourseSection
              title="데이터베이스 시스템"
              subtitle="4개 팀 활동중 · 평가/기여도 기록 연동 예정"
              rows={courseC}
              mode="progress"
            />
            <CourseSection
              title="모바일 앱 개발"
              subtitle="4개 팀 활동중 · 리마인더/일정 연동 예정"
              rows={courseD}
              mode="progress"
            />
          </div>
        </section>

        {/* 빠른 작업 */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">빠른 작업</div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              to="/team-project"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition"
            >
              <span className="text-lg leading-none">＋</span> 새 프로젝트 생성
            </Link>
            <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
              위험 팀 즉시 알림 발송
            </button>
            <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
              전체 평가 템플릿 설정
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
