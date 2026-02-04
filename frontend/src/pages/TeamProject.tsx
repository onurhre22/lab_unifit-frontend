import Header from "../components/Header";
import React, { useState } from "react";
import { Link } from 'react-router-dom';


// --- Mock Data ---

const ongoingProjects = [
  {
    id: 1,
    status: "진행중",
    statusColor: "text-green-600 bg-green-100",
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
  },
  {
    id: 2,
    status: "진행중",
    statusColor: "text-green-600 bg-green-100",
    course: "모바일 앱 디자인",
    title: "캠퍼스 네비게이터 UI",
    myRole: "UI/UX 디자이너",
    members: [
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=60&h=60&fit=crop&q=80",
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&q=80",
    ],
    remaining: 1,
    progress: 90,
    deadline: "1월 26일",
  },
];

const completedProjects = [
    {
        id: 3,
        status: "완료",
        statusColor: "text-slate-600 bg-slate-100",
        course: "자료구조",
        title: "알고리즘 최적화 챌린지",
        myRole: "개발자",
        members: [
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop&q=80",
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&q=80",
        ],
        remaining: 0,
        progress: 100,
        deadline: "지난 학기",
      },
]

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

// --- Sub-components ---

function ProjectCard({ project }: { project: (typeof ongoingProjects)[0] | (typeof completedProjects)[0] }) {
  return (
    <Link to={`/team-workspace/${project.id}`} className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
      <div>
        <div className="flex items-center justify-between">
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${project.statusColor}`}>
            {project.status}
          </span>
          <div className="text-sm text-slate-500">{project.course}</div>
        </div>
        <h3 className="mt-4 text-lg font-bold text-slate-900">{project.title}</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="rounded-md bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-700">
            {project.myRole}
          </span>
        </div>
        <div className="mt-4 flex items-center">
          <div className="flex -space-x-2">
            {project.members.map((member, index) => (
              <img key={index} src={member} alt={`member ${index + 1}`} className="h-8 w-8 rounded-full ring-2 ring-white" />
            ))}
          </div>
          {project.remaining > 0 && (
            <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-medium text-slate-600 ring-2 ring-white">
              +{project.remaining}
            </div>
          )}
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">진행률</span>
          <span className="font-semibold text-slate-700">{project.progress}%</span>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
          <div className="h-2 rounded-full bg-indigo-500" style={{ width: `${project.progress}%` }} />
        </div>
        <div className="mt-4 flex items-center text-sm text-slate-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          다음 마일스톤: {project.deadline}
        </div>
      </div>
    </Link>
  );
}

function InvitationCard({ invitation }: { invitation: (typeof invitations)[0] }) {
    return (
        <div className="flex justify-between items-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
            {/* Left Section: Invitation Details */}
            <div className="flex-grow pr-4">
                <h3 className="text-lg font-bold text-slate-900">{invitation.teamName}</h3>
                <p className="mt-1 text-sm text-slate-700">
                    <span className="font-semibold">{invitation.teamName}</span> 에서 &quot;<span className="font-semibold">{invitation.title}</span>&quot; 프로젝트에 초대했습니다
                </p>
                <div className="mt-3 flex items-center text-sm text-slate-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-1 h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.979-2.204 1.243-.124 2.251.402 2.5 1.487.309 1.096 1.344 1.623 2.5 1.487 1.135-.113 1.979-1.078 1.979-2.204V7.5m-8.25 0H9a2.25 2.25 0 0 0-2.25 2.25v.894m0 0a48.623 48.623 0 0 0 2.255 1.194m-2.255-1.194v.75c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125v-.75M3 16.5h18M7.5 14.25h.008v.008H7.5v-.008Zm2.25 0h.008v.008H9.75v-.008Zm.375 0h.008v.008H10.125v-.008Z" />
                    </svg>
                    {invitation.course}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-4 mr-1 h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    {invitation.totalMembers}명
                </div>
                <p className="mt-2 text-sm text-slate-500">초대자: <span className="font-medium">{invitation.invitedBy}</span></p>
            </div>

            {/* Right Section: Action Buttons */}
            <div className="flex flex-col justify-center gap-2">
                <button className="flex w-24 items-center justify-center gap-1 rounded-lg bg-green-500 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    수락
                </button>
                <button className="flex w-24 items-center justify-center gap-1 rounded-lg bg-slate-400 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75 14.25 14.25M14.25 9.75 9.75 14.25M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    거절
                </button>
                <button className="flex w-24 items-center justify-center gap-1 rounded-lg border border-indigo-500 bg-white py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    팀 보기
                </button>
            </div>
        </div>
    );
}

const FilterButton = React.forwardRef<
  HTMLButtonElement,
  { isActive?: boolean; children: React.ReactNode, onClick: () => void }
>(({ isActive, children, onClick }, ref) => (
  <button
    ref={ref}
    onClick={onClick}
    className={`whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "bg-slate-900 text-white shadow-sm"
        : "bg-white text-slate-600 hover:bg-slate-100"
    }`}
  >
    {children}
  </button>
));

// --- Main Component ---
type FilterType = "ongoing" | "invitations" | "completed";

export default function TeamProject() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("ongoing");

  const renderContent = () => {
    switch (activeFilter) {
      case "ongoing":
        return ongoingProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ));
      case "invitations":
        return invitations.map((invitation) => (
            <InvitationCard key={invitation.id} invitation={invitation} />
        ));
      case "completed":
        return completedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
        ));
      default:
        return null;
    }
  };


  const gridClasses = activeFilter === 'invitations' 
    ? "mt-10 grid grid-cols-1 gap-6" 
    : "mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        {/* Header Section */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              프로젝트 허브
            </h1>
            <p className="mt-2 text-base text-slate-500 md:text-lg">
              협업을 관리하고 학업 성장을 추적하세요.
            </p>
          </div>
          <Link 
            to="/join-project"
            className="rounded-lg bg-indigo-700 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-800"
          >
            + 새 프로젝트 참여하기
          </Link>
        </div>

        {/* Filters and Search Section */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-2 overflow-x-auto border border-slate-200 rounded-lg p-1 bg-white">
            <FilterButton isActive={activeFilter === 'ongoing'} onClick={() => setActiveFilter('ongoing')}>진행 중인 프로젝트</FilterButton>
            <FilterButton isActive={activeFilter === 'invitations'} onClick={() => setActiveFilter('invitations')}>
              <div className="relative">
                초대장
                <div className="absolute -right-3 -top-2 grid h-4 w-4 place-items-center rounded-full bg-amber-400 text-xs text-white">2</div>
              </div>
            </FilterButton>
            <FilterButton isActive={activeFilter === 'completed'} onClick={() => setActiveFilter('completed')}>완료된 프로젝트</FilterButton>
          </div>
          
        </div>

        {/* Projects Grid */}
        <div className={gridClasses}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}