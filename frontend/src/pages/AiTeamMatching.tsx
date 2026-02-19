import React, { useMemo, useState } from "react";
import Header from "../components/Header";

type RoleKey = "PM" | "BACKEND" | "FRONTEND" | "UIUX" | "SYSTEM";
type StyleKey = "LEFT" | "CENTER" | "RIGHT";

type PriorityItemKey =
  | "STACK_SYNERGY"
  | "TIME_COMPAT"
  | "EXPERIENCE_SIMILAR"
  | "GRADE_BALANCE";

const ROLE_OPTIONS: { key: RoleKey; label: string }[] = [
  { key: "PM", label: "개발 총괄/PM" },
  { key: "BACKEND", label: "백엔드 개발" },
  { key: "FRONTEND", label: "프론트엔드 개발" },
  { key: "UIUX", label: "UI/UX 디자인" },
  { key: "SYSTEM", label: "시스템 설계" },
];

const PRIORITY_LABEL: Record<PriorityItemKey, string> = {
  STACK_SYNERGY: "기술 스택의 상호 보완성",
  TIME_COMPAT: "팀원 간 시간표 일치도",
  EXPERIENCE_SIMILAR: "팀 프로젝트 경험 유사도",
  GRADE_BALANCE: "학점 및 성적 균형",
};

function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function Segment({
  value,
  active,
  onClick,
}: {
  value: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        "h-10 w-full rounded-xl border text-sm font-semibold transition",
        active
          ? "border-sky-400 bg-sky-50 text-sky-700 shadow-sm"
          : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
      )}
    >
      {value}
    </button>
  );
}

function DragHandleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="text-slate-400"
    >
      <path
        d="M7 5h2M7 10h2M7 15h2M11 5h2M11 10h2M11 15h2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PriorityBadge({ n }: { n: number }) {
  return (
    <div className="grid h-7 w-7 place-items-center rounded-full bg-sky-500 text-sm font-bold text-white">
      {n}
    </div>
  );
}

export default function AiTeamMatching() {
  // 1) 역할 선택
  const [selectedRole, setSelectedRole] = useState<RoleKey>("PM");

  // 2) 기술 스택 태그
  const [tags, setTags] = useState<string[]>(["C언어", "Unity", "알고리즘"]);
  const [tagInput, setTagInput] = useState("");

  // 3) 협업 스타일 (피그마처럼 3단 세그먼트)
  const [planning, setPlanning] = useState<StyleKey>("CENTER"); // 철저한 계획형 <-> 유연한 실행형
  const [online, setOnline] = useState<StyleKey>("CENTER"); // 온라인 중심 <-> 대면
  const [focus, setFocus] = useState<StyleKey>("CENTER"); // 기술 성장 중심 <-> 결과물 완성도 중심

  // 4) 우선순위(드래그로 순서 변경)
  const [priority, setPriority] = useState<PriorityItemKey[]>([
    "STACK_SYNERGY",
    "TIME_COMPAT",
    "EXPERIENCE_SIMILAR",
    "GRADE_BALANCE",
  ]);

  const [draggingKey, setDraggingKey] = useState<PriorityItemKey | null>(null);

  const canAddTag = useMemo(() => tagInput.trim().length > 0, [tagInput]);

  const addTag = () => {
    const v = tagInput.trim();
    if (!v) return;
    if (tags.includes(v)) {
      setTagInput("");
      return;
    }
    setTags((prev) => [...prev, v]);
    setTagInput("");
  };

  const removeTag = (t: string) => setTags((prev) => prev.filter((x) => x !== t));

  const reorder = (fromKey: PriorityItemKey, toKey: PriorityItemKey) => {
    if (fromKey === toKey) return;
    setPriority((prev) => {
      const fromIndex = prev.indexOf(fromKey);
      const toIndex = prev.indexOf(toKey);
      if (fromIndex < 0 || toIndex < 0) return prev;

      const next = [...prev];
      next.splice(fromIndex, 1);
      next.splice(toIndex, 0, fromKey);
      return next;
    });
  };

  const submit = () => {
    // TODO: API 연동 시 여기서 payload 만들어서 POST
    const payload = {
      role: selectedRole,
      tags,
      styles: { planning, online, focus },
      priority,
    };
    console.log("AI 매칭 조건:", payload);
    alert("조건이 저장되었다고 가정하고, 다음 단계로 이동하면 됩니다!");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto max-w-5xl px-6 py-10 pb-28">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            AI 팀 매칭 조건 설정
          </h1>
          <p className="mt-2 text-slate-500">
            홍길동님의 성향과 역량을 바탕으로 최적의 팀원을 찾아드릴게요.
          </p>
        </div>

        {/* Card 1: 역할 + 스택 */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-bold text-indigo-700">
            이번 프로젝트에서 어떤 역할을 맡고 싶나요?
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ROLE_OPTIONS.map((r) => {
              const active = selectedRole === r.key;
              return (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => setSelectedRole(r.key)}
                  className={classNames(
                    "h-14 rounded-xl border text-sm font-semibold transition",
                    active
                      ? "border-sky-400 bg-sky-50 text-sky-700 shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  )}
                >
                  {r.label}
                </button>
              );
            })}
          </div>

          <div className="mt-6 border-t border-slate-100 pt-6">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-sky-100 text-sky-700">
                ✨
              </span>
              <p>
                홍길동님의 역량이 자동으로 반영되었습니다. 추가할 기술이 있나요?
              </p>
            </div>

            {/* tags */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-700"
                >
                  #{t}
                  <button
                    type="button"
                    onClick={() => removeTag(t)}
                    className="text-sky-700/70 hover:text-sky-700"
                    aria-label={`${t} 삭제`}
                  >
                    ×
                  </button>
                </span>
              ))}

              <div className="flex items-center gap-2">
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addTag();
                  }}
                  placeholder="기술 추가"
                  className="h-9 w-28 rounded-full border border-slate-200 bg-white px-3 text-sm outline-none focus:border-sky-300"
                />
                <button
                  type="button"
                  onClick={addTag}
                  disabled={!canAddTag}
                  className={classNames(
                    "h-9 rounded-full px-3 text-sm font-semibold transition",
                    canAddTag
                      ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      : "bg-slate-100 text-slate-400"
                  )}
                >
                  + 추가하기
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Card 2: 협업 스타일 */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-bold text-indigo-700">
            선호하는 협업 스타일을 알려주세요
          </h2>

          <div className="mt-6 space-y-6">
            {/* row 1 */}
            <div>
              <div className="mb-2 flex items-center justify-between text-sm text-slate-500">
                <span>철저한 계획형</span>
                <span>유연한 실행형</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Segment
                  value="철저한"
                  active={planning === "LEFT"}
                  onClick={() => setPlanning("LEFT")}
                />
                <Segment
                  value="균형"
                  active={planning === "CENTER"}
                  onClick={() => setPlanning("CENTER")}
                />
                <Segment
                  value="유연한"
                  active={planning === "RIGHT"}
                  onClick={() => setPlanning("RIGHT")}
                />
              </div>
            </div>

            {/* row 2 */}
            <div>
              <div className="mb-2 flex items-center justify-between text-sm text-slate-500">
                <span>온라인 중심</span>
                <span>대면 모임 선호</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Segment
                  value="온라인"
                  active={online === "LEFT"}
                  onClick={() => setOnline("LEFT")}
                />
                <Segment
                  value="균형"
                  active={online === "CENTER"}
                  onClick={() => setOnline("CENTER")}
                />
                <Segment
                  value="대면"
                  active={online === "RIGHT"}
                  onClick={() => setOnline("RIGHT")}
                />
              </div>
            </div>

            {/* row 3 */}
            <div>
              <div className="mb-2 flex items-center justify-between text-sm text-slate-500">
                <span>기술 성장 중심</span>
                <span>결과물 완성도 중심</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Segment
                  value="기술"
                  active={focus === "LEFT"}
                  onClick={() => setFocus("LEFT")}
                />
                <Segment
                  value="균형"
                  active={focus === "CENTER"}
                  onClick={() => setFocus("CENTER")}
                />
                <Segment
                  value="결과물"
                  active={focus === "RIGHT"}
                  onClick={() => setFocus("RIGHT")}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Card 3: 우선순위 */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-bold text-indigo-700">
            AI가 무엇을 가장 우선적으로 고려할까요?
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            드래그하여 순서를 변경할 수 있습니다
          </p>

          <div className="mt-6 space-y-3">
            {priority.map((key, idx) => (
              <div
                key={key}
                draggable
                onDragStart={() => setDraggingKey(key)}
                onDragEnd={() => setDraggingKey(null)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (!draggingKey) return;
                  reorder(draggingKey, key);
                }}
                className={classNames(
                  "flex items-center justify-between rounded-2xl border bg-white px-4 py-4 transition",
                  draggingKey === key
                    ? "border-sky-300 shadow-sm"
                    : "border-slate-200"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="cursor-grab active:cursor-grabbing">
                    <DragHandleIcon />
                  </div>
                  <p className="text-sm font-semibold text-slate-700">
                    {PRIORITY_LABEL[key]}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {idx === 0 && (
                    <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700">
                      가장높음
                    </span>
                  )}
                  <PriorityBadge n={idx + 1} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom sticky bar */}
        <div className="fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white/80 backdrop-blur">
          <div className="mx-auto max-w-5xl px-6 py-4">
            <div className="text-center text-sm text-slate-500">
              설정된 조건에 맞는 최적의 팀원을 탐색할 준비가 되었습니다.
            </div>
            <button
              type="button"
              onClick={submit}
              className="mt-3 w-full rounded-xl bg-indigo-700 px-6 py-4 text-sm font-bold text-white shadow-sm hover:bg-indigo-800"
            >
              이 조건으로 AI 팀 매칭 시작하기
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
