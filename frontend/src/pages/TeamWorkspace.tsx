import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

type TaskStatus = "todo" | "doing" | "done";

type Task = {
  id: number;
  status: TaskStatus;
  title: string;
  assigneeName: string;
  assigneeInitial: string;
  assigneeBg: string; // tailwind bg class
};

type MeetingLog = {
  id: number;
  datetime: string; // "2026-01-28 14:00"
  title: string;
  participants: string;
  hasVoice?: boolean;
  hasText?: boolean;
};

type SharedFile = {
  id: number;
  name: string;
  size: string;
  updated: string;
  iconType: "zip" | "pdf" | "docx" | "fig";
};

const mockProjects: Record<
  string,
  {
    projectTitle: string;
    affiliation: string;
    projectId: number;
    deadline: string; // YYYY-MM-DD
  }
> = {
  "1": {
    projectTitle: "AI 가상 피팅룸",
    affiliation: "한신대학교 · AI소프트웨어학과",
    projectId: 1,
    deadline: "2026-02-15",
  },
  "2": {
    projectTitle: "UniFit 개발 프로젝트",
    affiliation: "한신대학교 · 소프트웨어공학",
    projectId: 2,
    deadline: "2026-03-15",
  },
};

const mockTasks: Task[] = [
  {
    id: 1,
    status: "todo",
    title: "Unity 3D 환경 설정",
    assigneeName: "이서준",
    assigneeInitial: "이",
    assigneeBg: "bg-cyan-500",
  },
  {
    id: 2,
    status: "todo",
    title: "사용자 인터페이스 디자인 - 랜딩 페이지",
    assigneeName: "박지원",
    assigneeInitial: "박",
    assigneeBg: "bg-emerald-500",
  },
  {
    id: 3,
    status: "doing",
    title: "AI 모델 학습 - 신체 인식",
    assigneeName: "허준영",
    assigneeInitial: "허",
    assigneeBg: "bg-cyan-500",
  },
  {
    id: 4,
    status: "doing",
    title: "데이터베이스 스키마 설계",
    assigneeName: "이유나",
    assigneeInitial: "이",
    assigneeBg: "bg-cyan-500",
  },
  {
    id: 5,
    status: "doing",
    title: "백엔드 API 개발",
    assigneeName: "정하은",
    assigneeInitial: "정",
    assigneeBg: "bg-cyan-500",
  },
  {
    id: 6,
    status: "done",
    title: "프로젝트 환경 설정",
    assigneeName: "최승훈",
    assigneeInitial: "최",
    assigneeBg: "bg-cyan-500",
  },
  {
    id: 7,
    status: "done",
    title: "초기 프로토타입 데모",
    assigneeName: "팀",
    assigneeInitial: "T",
    assigneeBg: "bg-sky-500",
  },
];

const mockMeetings: MeetingLog[] = [
  {
    id: 1,
    datetime: "2026-01-28 14:00",
    title: "스프린트 기획 · 3주차",
    participants: "4명 참여: 허준영, 정하은, 이서준, 이유나",
    hasVoice: true,
    hasText: true,
  },
  {
    id: 2,
    datetime: "2026-01-25 16:30",
    title: "AI 모델 리뷰 세션",
    participants: "4명 참여: 허준영, 정하은, 박지원, 최승훈",
    hasVoice: true,
    hasText: true,
  },
  {
    id: 3,
    datetime: "2026-01-22 10:00",
    title: "데이터베이스 아키텍처 논의",
    participants: "4명 참여: 이유나, 이서준, 허준영, 박지원",
    hasText: true,
  },
];

const mockFiles: SharedFile[] = [
  { id: 1, name: "AI_모델_v2.3.zip", size: "24.5 MB", updated: "2시간 전", iconType: "zip" },
  { id: 2, name: "요구사항_문서.pdf", size: "1.2 MB", updated: "5시간 전", iconType: "pdf" },
  { id: 3, name: "Unity_에셋_팩.zip", size: "156 MB", updated: "1일 전", iconType: "zip" },
  { id: 4, name: "UI_목업_최종.pdf", size: "8.3 MB", updated: "3일 전", iconType: "pdf" },
  { id: 5, name: "데모_스크린샷.zip", size: "12.1 MB", updated: "4일 전", iconType: "zip" },
];

function daysUntil(dateStr: string) {
  const today = new Date();
  const target = new Date(dateStr + "T00:00:00");
  const diff = target.getTime() - today.getTime();
  const d = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return d;
}

function FileIcon({ type }: { type: SharedFile["iconType"] }) {
  const base = "grid h-10 w-10 place-items-center rounded-lg bg-indigo-100 text-indigo-700";
  const label =
    type === "zip" ? "ZIP" : type === "pdf" ? "PDF" : type === "docx" ? "DOC" : "FIG";
  return <div className={base}>{label}</div>;
}

function KanbanCard({ task }: { task: Task }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-slate-900">{task.title}</p>
        <div className="mt-2 flex items-center gap-2">
          <span
            className={`grid h-8 w-8 place-items-center rounded-full text-sm font-bold text-white ${task.assigneeBg}`}
            aria-hidden="true"
          >
            {task.assigneeInitial}
          </span>
          <span className="text-sm text-slate-600">{task.assigneeName}</span>
        </div>
      </div>

      <button
        type="button"
        className="ml-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
        title="댓글"
      >
        {/* comment icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

function Column({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
        <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-xs font-bold text-slate-600 shadow-sm">
          {count}
        </span>
      </div>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}

function ActivityPanel() {
  // simple bars (placeholder)
  const bars = [24, 20, 16, 17, 12, 15];
  const names = ["허준영", "정하은", "이서준", "이유나", "박지원", "최승훈"];
  const max = Math.max(...bars);

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900">
          활동 분석 <span className="ml-1 text-xs font-semibold text-slate-400">(시스템 자동 기록)</span>
        </h3>
        <span className="inline-flex h-2 w-2 rounded-full bg-cyan-400" aria-hidden="true" />
      </div>

      <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 p-4">
        <div className="flex items-end gap-2">
          {bars.map((v, i) => (
            <div key={i} className="flex w-full flex-col items-center gap-2">
              <div className="h-28 w-full rounded-md bg-slate-200">
                <div
                  className="w-full rounded-md bg-cyan-400"
                  style={{ height: `${(v / max) * 100}%` }}
                  title={`${names[i]}: ${v}`}
                />
              </div>
              <span className="text-[11px] text-slate-500">{names[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-indigo-50 p-4 text-sm text-slate-700">
        <p className="font-semibold text-indigo-700">외식팀정책</p>
        <p className="mt-1">
          파일 업로드, 회의 참여, 작업 완료를 기반으로 자동 기록되며 공정한 최종 확정 산정에 활용됩니다.
        </p>
      </div>
    </aside>
  );
}

function SharedFilesPanel() {
  const used = 202.1;
  const total = 500;
  const pct = Math.min(100, Math.round((used / total) * 100));

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-base font-bold text-slate-900">공유 파일 저장소</h3>

      <div className="mt-4 space-y-3">
        {mockFiles.map((f) => (
          <div key={f.id} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
            <FileIcon type={f.iconType} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">{f.name}</p>
              <p className="mt-0.5 text-xs text-slate-500">
                {f.size} · {f.updated}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>총 사용 용량</span>
          <span className="font-semibold text-emerald-600">
            {used.toFixed(1)} MB / {total} MB
          </span>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
          <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </aside>
  );
}

function SchedulePanel() {
  const items = [
    { id: 1, date: "2월 02", title: "스프린트 리뷰 미팅", time: "15:00", tag: "Zoom 참여", color: "bg-slate-50", bar: "bg-cyan-500" },
    { id: 2, date: "2월 05", title: "마일스톤: AI 모델 완성", time: "23:59", tag: "", color: "bg-slate-50", bar: "bg-cyan-500" },
    { id: 3, date: "2월 08", title: "최종 발표 리허설", time: "14:00", tag: "Zoom 참여", color: "bg-slate-50", bar: "bg-cyan-500" },
    { id: 4, date: "2월 10", title: "프로젝트 제출 마감", time: "23:59", tag: "", color: "bg-amber-50", bar: "bg-amber-500" },
  ];

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900">팀 일정</h3>
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
          title="캘린더"
        >
          {/* calendar icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M8 3v2M16 3v2M4 7h16M6 11h4M6 15h4M14 11h4M14 15h4M6 19h12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M5 5h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {items.map((it) => (
          <div key={it.id} className={`relative overflow-hidden rounded-xl border border-slate-200 ${it.color} p-4`}>
            <div className={`absolute left-0 top-0 h-full w-1 ${it.bar}`} aria-hidden="true" />
            <div className="flex items-start gap-4">
              <div className="w-14 shrink-0 text-center">
                <p className="text-xs font-semibold text-slate-500">월</p>
                <p className="mt-0.5 text-sm font-bold text-slate-900">{it.date}</p>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900">{it.title}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {it.time}
                  {it.tag ? <span className="ml-2 text-cyan-600">· {it.tag}</span> : null}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="mt-4 w-full rounded-xl bg-indigo-700 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-800"
      >
        전체 캘린더 보기
      </button>
    </aside>
  );
}

function MeetingRow({ m }: { m: MeetingLog }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 md:flex-row md:items-center md:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          {/* calendar */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-slate-400">
            <path
              d="M8 3v2M16 3v2M4 7h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M5 5h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          <span>{m.datetime}</span>
        </div>
        <p className="mt-1 text-sm font-bold text-indigo-700">{m.title}</p>
        <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
          {/* users */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-slate-400">
            <path
              d="M16 11a4 4 0 1 0-8 0"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M4 21a8 8 0 0 1 16 0"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span>{m.participants}</span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {m.hasVoice ? (
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-600"
          >
            {/* play */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18V6l12 6-12 6Z"
                fill="currentColor"
              />
            </svg>
            음성
          </button>
        ) : null}

        {m.hasText ? (
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-200"
          >
            {/* doc */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 3h7l3 3v15a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M14 3v4a2 2 0 0 0 2 2h4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            텍스트
          </button>
        ) : (
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-500"
            disabled
          >
            텍스트
          </button>
        )}
      </div>
    </div>
  );
}

export default function TeamWorkspace() {
  const { id } = useParams<{ id: string }>();

  const info = mockProjects[id ?? "1"] ?? mockProjects["1"];

  const d = daysUntil(info.deadline);
  const dLabel = d >= 0 ? `D-${d}` : `D+${Math.abs(d)}`;

  const todo = useMemo(() => mockTasks.filter((t) => t.status === "todo"), []);
  const doing = useMemo(() => mockTasks.filter((t) => t.status === "doing"), []);
  const done = useMemo(() => mockTasks.filter((t) => t.status === "done"), []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Top project header card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">
                {info.projectTitle}
              </h1>
              <p className="mt-2 text-sm text-slate-500">소속: {info.affiliation}</p>
              <p className="mt-1 text-sm text-slate-500">프로젝트 ID: {info.projectId}</p>
            </div>

            <div className="flex items-start justify-end">
              <div className="rounded-2xl bg-amber-400 px-4 py-3 text-center shadow-sm">
                <p className="text-sm font-extrabold text-slate-900">{dLabel}</p>
                <p className="mt-0.5 text-xs font-semibold text-slate-900/80">마감일</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left */}
          <section className="lg:col-span-9">
            {/* Kanban */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Column title="할 일" count={todo.length}>
                {todo.map((t) => (
                  <KanbanCard key={t.id} task={t} />
                ))}
              </Column>

              <Column title="진행 중" count={doing.length}>
                {doing.map((t) => (
                  <KanbanCard key={t.id} task={t} />
                ))}
              </Column>

              <Column title="완료" count={done.length}>
                {done.map((t) => (
                  <KanbanCard key={t.id} task={t} />
                ))}
              </Column>
            </div>

            {/* Meeting logs */}
            <div className="mt-8">
              <h2 className="text-2xl font-extrabold text-slate-900">회의록</h2>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="space-y-4">
                  {mockMeetings.map((m) => (
                    <MeetingRow key={m.id} m={m} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Right */}
          <section className="lg:col-span-3 space-y-6">
            <ActivityPanel />
            <SharedFilesPanel />
            <SchedulePanel />
          </section>
        </div>
      </main>
    </div>
  );
}
