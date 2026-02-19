import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

// -------------------- Mock Data --------------------
type ProjectStatus = "진행중" | "완료";
type Project = {
  id: number;
  status: ProjectStatus;
  course: string;
  title: string;
  myRole: string;
  members: string[];
  remaining: number;
  progress: number; // 0~100
  deadline: string; // 진행중: 다음 마일스톤, 완료: 완료일로 사용
  aiTip: string;
};

const projects: Project[] = [
  {
    id: 1,
    status: "진행중",
    course: "소프트웨어 공학",
    title: "UniFit 개발 프로젝트",
    myRole: "리드 개발자",
    members: [
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&q=80",
    ],
    remaining: 2,
    progress: 65,
    deadline: "1월 30일",
    aiTip: "모듈 2 관련 회의의 일정이 잡아보세요.",
  },
  {
    id: 2,
    status: "진행중",
    course: "모바일 앱 디자인",
    title: "캠퍼스 네비게이터 UI",
    myRole: "UI/UX 디자이너",
    members: [
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=60&h=60&fit=crop&q=80",
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&q=80",
    ],
    remaining: 1,
    progress: 65,
    deadline: "2월 4일",
    aiTip: "네비게이션 흐름을 위한 와이어 프레임을 제작해 공유해보세요.",
  },
  {
    id: 3,
    status: "완료",
    course: "웹 개발",
    title: "이커머스 플랫폼",
    myRole: "풀스택 개발자",
    members: [],
    remaining: 1,
    progress: 100,
    deadline: "2025년 12월 15일",
    aiTip: "",
  },
  {
    id: 4,
    status: "완료",
    course: "데이터베이스 시스템",
    title: "도서관 관리 시스템",
    myRole: "백엔드 개발자",
    members: [],
    remaining: 0,
    progress: 100,
    deadline: "2025년 11월 22일",
    aiTip: "",
  },
];

const invitations = [
  {
    id: 1,
    teamName: "팀 알파",
    course: "인간-컴퓨터 상호작용",
    title: "모바일 앱 UI 디자인",
    invitedBy: "김서연",
    totalMembers: 4,
  },
  {
    id: 2,
    teamName: "이노베이터즈",
    course: "인공지능",
    title: "AI 챗봇 개발",
    invitedBy: "박준호",
    totalMembers: 5,
  },
];

// -------------------- UI Parts --------------------
function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-slate-100">
        {icon}
      </div>
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
        {sub && <p className="mt-1 text-xs text-slate-400">{sub}</p>}
      </div>
    </div>
  );
}

function TabButton({
  active,
  children,
  onClick,
  rightBadge,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
  rightBadge?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative -mb-px px-1 pb-3 text-sm font-semibold transition ${
        active ? "text-indigo-700" : "text-slate-500 hover:text-slate-700"
      }`}
    >
      <span className="inline-flex items-center gap-2">
        {children}
        {rightBadge}
      </span>

      {active && (
        <span className="absolute left-0 right-0 -bottom-[1px] h-0.5 rounded bg-indigo-700" />
      )}
    </button>
  );
}

function AvatarStack({
  members,
  remaining,
}: {
  members: string[];
  remaining: number;
}) {
  return (
    <div className="mt-4 flex items-center">
      <div className="flex -space-x-2">
        {members.map((m, idx) => (
          <img
            key={idx}
            src={m}
            alt={`member ${idx + 1}`}
            className="h-8 w-8 rounded-full ring-2 ring-white"
          />
        ))}
      </div>
      {remaining > 0 && (
        <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-medium text-slate-600 ring-2 ring-white">
          +{remaining}
        </div>
      )}
    </div>
  );
}

/** ✅ 여기만 수정: 완료된 프로젝트 카드가 피그마처럼 보이도록 분기 렌더링 */
function ProjectCard({ project }: { project: Project }) {
  const roleChip = "bg-indigo-100 text-indigo-700";

  // ---- 완료 카드(피그마 스타일) ----
  if (project.status === "완료") {
    return (
      <Link
        to={`/team-workspace/${project.id}`}
        className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
      >
        <p className="text-xs text-slate-500">{project.course}</p>

        <h3 className="mt-2 text-lg font-bold text-indigo-700">{project.title}</h3>

        <div className="mt-3">
          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${roleChip}`}>
            {project.myRole}
          </span>
        </div>

        {/* 구성원/아이콘 라인(피그마처럼 심플) */}
        <div className="mt-4 flex items-center gap-3 text-slate-500">
          <span className="inline-flex items-center gap-2 text-sm">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="text-slate-400"
              aria-hidden="true"
            >
              <path
                d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>

          {project.remaining > 0 && (
            <span className="grid h-6 w-9 place-items-center rounded-full bg-slate-100 text-xs font-semibold text-indigo-700">
              +{project.remaining}
            </span>
          )}
        </div>

        {/* 완료 진행 바(초록) */}
        <div className="mt-5 h-2 w-full rounded-full bg-slate-200">
          <div className="h-2 w-full rounded-full bg-green-500" />
        </div>

        {/* 완료일(초록 텍스트) */}
        <div className="mt-4 flex items-center text-sm font-semibold text-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          완료일: {project.deadline}
        </div>
      </Link>
    );
  }

  // ---- 진행중 카드(기존 스타일 유지) ----
  const statusChip = "bg-green-100 text-green-700";

  return (
    <Link
      to={`/team-workspace/${project.id}`}
      className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusChip}`}>
          {project.status}
        </span>
        <p className="text-sm text-slate-500">{project.course}</p>
      </div>

      <h3 className="mt-4 text-lg font-bold text-slate-900">{project.title}</h3>

      <div className="mt-2">
        <span className={`inline-flex rounded-md px-2 py-1 text-xs font-semibold ${roleChip}`}>
          {project.myRole}
        </span>
      </div>

      <AvatarStack members={project.members} remaining={project.remaining} />

      {/* AI Tip Box (피그마처럼) */}
      <div className="mt-4 rounded-xl border border-sky-200 bg-sky-50 p-4">
        <div className="flex items-start gap-2">
          <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-sky-700">
            💡
          </span>
          <div>
            <p className="text-xs font-semibold text-sky-700">AI 팁</p>
            <p className="mt-1 text-sm text-slate-700">{project.aiTip}</p>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">진행률</span>
          <span className="font-semibold text-slate-700">{project.progress}%</span>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
          <div
            className="h-2 rounded-full bg-indigo-600"
            style={{ width: `${project.progress}%` }}
          />
        </div>

        <div className="mt-4 flex items-center text-sm text-slate-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1.5 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          다음 마일스톤: {project.deadline}
        </div>
      </div>
    </Link>
  );
}

/** 초대장 카드(이전 수정본 유지) */
function InvitationCard({ invitation }: { invitation: (typeof invitations)[0] }) {
  return (
    <div className="flex items-center justify-between gap-6 rounded-2xl border border-slate-200 bg-white px-6 py-5">
      <div className="min-w-0">
        <p className="text-sm font-bold text-indigo-700">{invitation.teamName}</p>

        <p className="mt-1 text-sm text-slate-700">
          <span className="font-semibold">{invitation.teamName}</span> 에서{" "}
          &quot;<span className="font-semibold">{invitation.title}</span>&quot; 프로젝트에
          초대했습니다
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
          <span className="inline-flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-slate-400">
              <path
                d="M4 19a2 2 0 0 0 2 2h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M6 17V5a2 2 0 0 1 2-2h12v18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path d="M10 7h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            {invitation.course}
          </span>

          <span className="inline-flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-slate-400">
              <path
                d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
            </svg>
            {invitation.totalMembers}명
          </span>
        </div>

        <p className="mt-2 text-sm text-slate-500">
          초대자: <span className="font-medium text-slate-700">{invitation.invitedBy}</span>
        </p>
      </div>

      <div className="flex shrink-0 flex-col gap-2">
        <button className="h-9 w-24 rounded-lg bg-green-600 text-sm font-semibold text-white hover:bg-green-700">
          수락
        </button>
        <button className="h-9 w-24 rounded-lg bg-slate-400 text-sm font-semibold text-white hover:bg-slate-500">
          거절
        </button>
        <button className="h-9 w-24 rounded-lg border border-indigo-600 bg-white text-sm font-semibold text-indigo-700 hover:bg-indigo-50">
          팀 보기
        </button>
      </div>
    </div>
  );
}

function InsightPanel() {
  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-sky-100 text-sky-700">
          ✨
        </div>
        <h3 className="text-base font-bold text-slate-900">AI 협업 인사이트</h3>
      </div>

      <div className="mt-6 flex justify-center">
        <svg width="220" height="170" viewBox="0 0 220 170" aria-hidden="true">
          <g transform="translate(110,85)">
            <polygon
              points="0,-70 60,-35 45,40 0,65 -45,40 -60,-35"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="2"
            />
            <polygon
              points="0,-50 42,-24 30,28 0,46 -30,28 -42,-24"
              fill="rgba(56,189,248,0.25)"
              stroke="rgba(56,189,248,0.9)"
              strokeWidth="2"
            />
          </g>
        </svg>
      </div>

      <div className="mt-2 rounded-xl border border-sky-200 bg-sky-50 p-4">
        <p className="text-sm font-semibold text-slate-800">인사이트</p>
        <p className="mt-1 text-sm text-slate-600">
          최근 소통 능력이 높아졌습니다! 다음 프로젝트에서 리더십 역할을 맡아보는 건 어떨까요?
        </p>
      </div>

      <div className="mt-6 space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-slate-500">완료한 프로젝트</span>
          <span className="font-semibold text-slate-800">12개</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500">평균 팀 평가</span>
          <span className="font-semibold text-slate-800">4.8/5.0</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500">이번 달 성장률</span>
          <span className="font-semibold text-green-600">+15%</span>
        </div>
      </div>

      <button className="mt-6 w-full rounded-xl bg-indigo-700 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-800">
        전체 분석 보기
      </button>
    </aside>
  );
}

// -------------------- Main --------------------
type TabKey = "ongoing" | "invitations" | "completed";

export default function TeamProject() {
  const [tab, setTab] = useState<TabKey>("ongoing");

  const invitationCount = invitations.length;

  const ongoing = useMemo(() => projects.filter((p) => p.status === "진행중"), []);
  const completed = useMemo(() => projects.filter((p) => p.status === "완료"), []);

  const stats = useMemo(() => {
    const ongoingCount = ongoing.length;
    const points = 1250;
    return { ongoingCount, invitationCount, points };
  }, [ongoing.length, invitationCount]);

  const list = tab === "ongoing" ? ongoing : tab === "completed" ? completed : null;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">내 프로젝트 워크스페이스</h1>
            <p className="mt-2 text-slate-500">협업을 관리하고 학업 성장을 추적하세요.</p>
          </div>

          <Link
            to="/join-project"
            className="rounded-xl bg-indigo-700 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-800"
          >
            + 새 프로젝트 참여하기
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatCard icon={<span className="text-xl">📁</span>} label="진행 중인 프로젝트" value={stats.ongoingCount} />
          <StatCard icon={<span className="text-xl">✉️</span>} label="대기 중인 초대" value={stats.invitationCount} />
          <StatCard icon={<span className="text-xl">📈</span>} label="총 성장 포인트" value={stats.points.toLocaleString()} />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <section className="lg:col-span-8">
            <div className="flex items-end gap-6 border-b border-slate-200">
              <TabButton active={tab === "ongoing"} onClick={() => setTab("ongoing")}>
                진행 중인 프로젝트
              </TabButton>

              <TabButton
                active={tab === "invitations"}
                onClick={() => setTab("invitations")}
                rightBadge={
                  invitationCount > 0 ? (
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-amber-400 text-xs font-bold text-white">
                      {invitationCount}
                    </span>
                  ) : null
                }
              >
                초대장
              </TabButton>

              <TabButton active={tab === "completed"} onClick={() => setTab("completed")}>
                완료된 프로젝트
              </TabButton>
            </div>

            <div className="mt-6">
              {tab === "invitations" ? (
                <div className="space-y-4">
                  {invitations.length > 0 ? (
                    invitations.map((inv) => <InvitationCard key={inv.id} invitation={inv} />)
                  ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
                      초대장이 없습니다.
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {list && list.length > 0 ? (
                    list.map((p) => <ProjectCard key={p.id} project={p} />)
                  ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500 md:col-span-2">
                      프로젝트가 없습니다.
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>

          <section className="lg:col-span-4">
            <InsightPanel />
          </section>
        </div>
      </main>
    </div>
  );
}
