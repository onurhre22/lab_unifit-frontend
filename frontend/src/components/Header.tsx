import React from "react";
import { Link, NavLink as RRNavLink } from "react-router-dom";

/** ---------- small UI atoms ---------- */

// 실제 라우트용 NavItem (active 스타일 적용)
function AppNavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <RRNavLink
      to={to}
      end={to === "/main"} // /main일 때만 홈 active 되게
      className={({ isActive }) =>
        [
          "relative px-1 py-1 text-sm font-medium transition",
          // 기본 색상: 슬레이트
          !isActive && "text-slate-600 hover:text-indigo-600",
          // active 색상: UniFit 컬러(인디고)
          isActive && "text-indigo-600",
        ]
          .filter(Boolean)
          .join(" ")
      }
    >
      {({ isActive }) => (
        <>
          {children}
          {/* active일 때만 밑줄(불 들어온 느낌) */}
          {isActive ? (
            <span className="absolute -bottom-2 left-0 right-0 mx-auto h-[2px] w-full rounded-full bg-indigo-600" />
          ) : null}
        </>
      )}
    </RRNavLink>
  );
}

// 준비중 메뉴는 NavLink 쓰지 말고 버튼/스팬 처리 (active 절대 안 됨)
function DisabledNavItem({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-1 py-1 text-sm font-medium text-slate-400 cursor-not-allowed">
      {children}
    </span>
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

// Default content for the right side of the header
const DefaultRightContent = () => (
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
      <span className="hidden text-sm font-medium md:block">마이페이지</span>
    </button>
  </div>
);

export default function Header({
  showNav = true,
  rightContent = <DefaultRightContent />,
}: {
  showNav?: boolean;
  rightContent?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <Link to="/main" className="text-lg font-bold text-slate-900">
            UniFit
          </Link>

          {showNav ? (
            <nav className="hidden items-center gap-8 md:flex">
              {/* 홈만 active 되도록: 실제 라우트는 AppNavLink */}
              <AppNavLink to="/main">홈</AppNavLink>

              {/* 아직 페이지 없으면 DisabledNavItem로 (active 절대 X) */}
              <DisabledNavItem>AI 로드맵</DisabledNavItem>

              <AppNavLink to="/team-project">팀 프로젝트</AppNavLink>

              <DisabledNavItem>멘토링</DisabledNavItem>
              <DisabledNavItem>포트폴리오</DisabledNavItem>
            </nav>
          ) : null}
        </div>

        {rightContent}
      </div>
    </header>
  );
}
