import React, { useMemo, useState } from "react";
import Header from "../components/Header";

type ItemType = "file" | "link";

type PortfolioItem = {
  id: number;
  title: string;
  tag: string; // #수업프로젝트, #팀프로젝트, #개인학습 등
  period: string; // "2025년 9월 - 2025년 12월"
  items: { id: number; type: ItemType; label: string }[];
};

type FilterKey =
  | "all"
  | "date"
  | "classProject"
  | "personal"
  | "teamProject";

type TabKey = "all" | "files" | "links";

const mockData: PortfolioItem[] = [
  {
    id: 1,
    title: "C 언어 기반 알고리즘\n솔버",
    tag: "#수업프로젝트",
    period: "2025년 9월 - 2025년 12월",
    items: [
      { id: 1, type: "file", label: "논리구조도.pdf" },
      { id: 2, type: "file", label: "소스코드.zip" },
      { id: 3, type: "link", label: "GitHub 저장소" },
    ],
  },
  {
    id: 2,
    title: "웹 기반 학생 포털 시스템",
    tag: "#팀프로젝트",
    period: "2025년 3월 - 2025년 6월",
    items: [
      { id: 1, type: "file", label: "UI_목업.pdf" },
      { id: 2, type: "file", label: "프로젝트_문서.pdf" },
      { id: 3, type: "link", label: "라이브 데모" },
      { id: 4, type: "link", label: "GitHub 저장소" },
    ],
  },
  {
    id: 3,
    title: "머신러닝 모델 학습 프로\n젝트",
    tag: "#개인학습",
    period: "2026년 1월 - 2026년 2월",
    items: [
      { id: 1, type: "file", label: "연구논문.pdf" },
      { id: 2, type: "file", label: "데이터셋.csv" },
      { id: 3, type: "link", label: "Kaggle 노트북" },
    ],
  },
  {
    id: 4,
    title: "데이터베이스 관리 시스템",
    tag: "#수업프로젝트",
    period: "2025년 9월 - 2025년 11월",
    items: [
      { id: 1, type: "file", label: "ERD_다이어그램.pdf" },
      { id: 2, type: "file", label: "SQL_스크립트.sql" },
      { id: 3, type: "link", label: "GitHub 저장소" },
    ],
  },
];

function IconFile() {
  return (
    <span className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-50 text-indigo-700">
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
      </svg>
    </span>
  );
}

function IconLink() {
  return (
    <span className="grid h-8 w-8 place-items-center rounded-lg bg-cyan-50 text-cyan-700">
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1" />
        <path d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7-7l1-1" />
      </svg>
    </span>
  );
}

function SmallTopStat({
  label,
  value,
  active,
  onClick,
  icon,
}: {
  label: string;
  value: number;
  active?: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition",
        active
          ? "bg-indigo-50 text-indigo-700"
          : "text-slate-600 hover:bg-slate-100",
      ].join(" ")}
    >
      <span className="text-slate-500">{icon}</span>
      <span>{label}</span>
      <span className="font-bold text-indigo-700">({value})</span>
    </button>
  );
}

function ListRow({
  type,
  label,
  onRemove,
}: {
  type: ItemType;
  label: string;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-100">
      <div className="flex items-center gap-3 min-w-0">
        {type === "file" ? <IconFile /> : <IconLink />}
        <span className="truncate text-sm font-medium text-slate-700">
          {label}
        </span>
      </div>

      <button
        type="button"
        onClick={onRemove}
        aria-label="remove"
        className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 6 6 18" />
          <path d="M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

function PortfolioCard({
  item,
  onRemoveItem,
}: {
  item: PortfolioItem;
  onRemoveItem: (portfolioId: number, subId: number) => void;
}) {
  const fileCount = item.items.filter((x) => x.type === "file").length;
  const linkCount = item.items.filter((x) => x.type === "link").length;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* title row */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="whitespace-pre-line text-lg font-extrabold text-indigo-700">
            {item.title}
          </h3>

          <div className="mt-2 inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            {item.tag}
          </div>

          <p className="mt-3 text-sm text-slate-500">{item.period}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-xl text-slate-500 hover:bg-slate-100 transition"
            aria-label="edit"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
          </button>

          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-xl text-slate-500 hover:bg-slate-100 transition"
            aria-label="delete"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 6h18" />
              <path d="M8 6V4h8v2" />
              <path d="M19 6l-1 14H6L5 6" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
            </svg>
          </button>
        </div>
      </div>

      {/* list box */}
      <div className="mt-5 rounded-2xl bg-slate-50 p-4">
        <div className="space-y-3">
          {item.items.map((x) => (
            <ListRow
              key={x.id}
              type={x.type}
              label={x.label}
              onRemove={() => onRemoveItem(item.id, x.id)}
            />
          ))}
        </div>
      </div>

      {/* add button */}
      <button
        type="button"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-50 transition"
      >
        <span className="text-lg leading-none">＋</span>
        파일/링크 추가하기
      </button>

      <div className="mt-4 text-xs text-slate-400">
        파일: {fileCount}개 &nbsp;&nbsp; 링크: {linkCount}개
      </div>
      <div className="mt-2 text-xs text-slate-300">학업 기록에 데이터 저장됨</div>
    </div>
  );
}

function RightFilter({
  active,
  onChange,
}: {
  active: FilterKey;
  onChange: (k: FilterKey) => void;
}) {
  const Item = ({
    k,
    label,
    icon,
  }: {
    k: FilterKey;
    label: string;
    icon: React.ReactNode;
  }) => {
    const isActive = active === k;
    return (
      <button
        type="button"
        onClick={() => onChange(k)}
        className={[
          "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
          isActive
            ? "bg-indigo-50 text-indigo-700"
            : "text-slate-600 hover:bg-slate-100",
        ].join(" ")}
      >
        <span className="text-slate-500">{icon}</span>
        <span>{label}</span>
      </button>
    );
  };

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-base font-extrabold text-indigo-700">빠른 필터</h3>

      <div className="mt-4 space-y-2">
        <Item
          k="all"
          label="전체 프로젝트"
          icon={
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="2" />
              <rect x="14" y="3" width="7" height="7" rx="2" />
              <rect x="3" y="14" width="7" height="7" rx="2" />
              <rect x="14" y="14" width="7" height="7" rx="2" />
            </svg>
          }
        />
        <Item
          k="date"
          label="날짜순"
          icon={
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 7V3" />
              <path d="M16 7V3" />
              <path d="M4 11h16" />
              <rect x="4" y="5" width="16" height="16" rx="2" />
            </svg>
          }
        />
        <Item
          k="classProject"
          label="수업 프로젝트"
          icon={
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 7l9-4 9 4-9 4-9-4Z" />
              <path d="M21 10v6" />
              <path d="M3 10v6c0 1 4 3 9 3s9-2 9-3v-6" />
            </svg>
          }
        />
        <Item
          k="personal"
          label="개인 학습"
          icon={
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
          }
        />
        <Item
          k="teamProject"
          label="팀 프로젝트"
          icon={
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
        />
      </div>

      <button
        type="button"
        className="mt-6 w-full rounded-2xl bg-indigo-700 px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-800 transition"
      >
        <span className="inline-flex items-center justify-center gap-2">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <path d="M7 10l5 5 5-5" />
            <path d="M12 15V3" />
          </svg>
          PDF/링크로 내보내기
        </span>
      </button>
    </aside>
  );
}

export default function Portfolio() {
  const [tab, setTab] = useState<TabKey>("all");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [data, setData] = useState<PortfolioItem[]>(mockData);

  const counts = useMemo(() => {
    const allProjects = data.length;
    const fileCount = data.reduce(
      (acc, p) => acc + p.items.filter((x) => x.type === "file").length,
      0
    );
    const linkCount = data.reduce(
      (acc, p) => acc + p.items.filter((x) => x.type === "link").length,
      0
    );
    return { allProjects, fileCount, linkCount };
  }, [data]);

  const filteredData = useMemo(() => {
    let list = [...data];

    // Right filter
    if (filter === "classProject") list = list.filter((p) => p.tag.includes("수업"));
    if (filter === "teamProject") list = list.filter((p) => p.tag.includes("팀"));
    if (filter === "personal") list = list.filter((p) => p.tag.includes("개인"));
    if (filter === "date") list = list; // 실제 날짜정렬은 추후 API/필드 추가 후 적용

    // Top tab
    if (tab === "files") {
      list = list
        .map((p) => ({
          ...p,
          items: p.items.filter((x) => x.type === "file"),
        }))
        .filter((p) => p.items.length > 0);
    }
    if (tab === "links") {
      list = list
        .map((p) => ({
          ...p,
          items: p.items.filter((x) => x.type === "link"),
        }))
        .filter((p) => p.items.length > 0);
    }

    return list;
  }, [data, tab, filter]);

  const removeItem = (portfolioId: number, subId: number) => {
    setData((prev) =>
      prev.map((p) =>
        p.id === portfolioId
          ? { ...p, items: p.items.filter((x) => x.id !== subId) }
          : p
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Title */}
        <div>
          <h1 className="text-3xl font-extrabold text-indigo-700">
            나의 포트폴리오 보관함
          </h1>

          {/* Top tabs row */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <SmallTopStat
              label="전체 프로젝트"
              value={counts.allProjects}
              active={tab === "all"}
              onClick={() => setTab("all")}
              icon={
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19V5a2 2 0 0 1 2-2h4" />
                  <path d="M4 7h16" />
                  <path d="M20 19V7" />
                  <path d="M10 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
                </svg>
              }
            />

            <SmallTopStat
              label="연결된 파일"
              value={counts.fileCount}
              active={tab === "files"}
              onClick={() => setTab("files")}
              icon={
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                </svg>
              }
            />

            <SmallTopStat
              label="활성 링크"
              value={counts.linkCount}
              active={tab === "links"}
              onClick={() => setTab("links")}
              icon={
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1" />
                  <path d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7-7l1-1" />
                </svg>
              }
            />
          </div>
        </div>

        {/* Layout */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Cards */}
          <section className="lg:col-span-9">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {filteredData.map((p) => (
                <PortfolioCard key={p.id} item={p} onRemoveItem={removeItem} />
              ))}
            </div>
          </section>

          {/* Right */}
          <section className="lg:col-span-3">
            <RightFilter active={filter} onChange={setFilter} />
          </section>
        </div>
      </main>
    </div>
  );
}