import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const LS_ONBOARDED = "unifit_onboarded";

export default function Welcome() {
  const navigate = useNavigate();
  const [goal, setGoal] = useState("취업 준비");
  const [focus, setFocus] = useState<string[]>(["AI 로드맵"]);

  const chips = useMemo(
    () => ["AI 로드맵", "팀 프로젝트", "멘토링", "포트폴리오"],
    []
  );

  const toggleFocus = (v: string) => {
    setFocus((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );
  };

  const finish = () => {
    localStorage.setItem(LS_ONBOARDED, "true");
    navigate("/main");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 상단 */}
      <Header
        showNav={false}
        rightContent={
          <button
            onClick={finish}
            className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-slate-900 transition"
          >
            건너뛰고 시작
          </button>
        }
      />

      {/* Hero (잘림 방지: 넉넉한 padding-bottom) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-600 via-indigo-500 to-slate-50">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute right-[-120px] top-16 h-96 w-96 rounded-full bg-cyan-200/15 blur-3xl" />
          <div className="absolute left-[-120px] bottom-[-120px] h-96 w-96 rounded-full bg-fuchsia-200/10 blur-3xl" />
        </div>


        <div className="mx-auto max-w-7xl px-6 pt-14 pb-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-medium text-white ring-1 ring-white/20 backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full bg-white/70" />
              Welcome · 첫 설정
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
              반가워요! UniFit을 시작해볼까요?
            </h1>
            <p className="mt-4 text-white/85 md:text-lg">
              30초만 설정하면, 당신에게 맞춘 로드맵과 협업 기능을 더 정확히 추천할 수 있어요.
            </p>
          </div>
        </div>
      </section>

      {/* 카드 영역 (✅ 음수 마진 제거 + 위로 살짝만 떠보이게: translate 사용) */}
      <main className="pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="-translate-y-10 md:-translate-y-12">
            <div className="grid gap-4 md:grid-cols-3">
              {/* 1) 목표 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-1">
                <div className="text-sm font-semibold text-slate-900">
                  진로 목표
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  목표에 맞춰 로드맵/추천 우선순위를 조정해요.
                </p>

                <div className="mt-4 space-y-2">
                  {["취업 준비", "대학원", "공모전/대외활동", "기초 다지기"].map(
                    (v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setGoal(v)}
                        className={[
                          "w-full rounded-xl border px-4 py-3 text-left text-sm transition",
                          goal === v
                            ? "border-indigo-300 bg-indigo-50 text-slate-900 ring-4 ring-indigo-100"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                        ].join(" ")}
                      >
                        {v}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* 2) 관심 기능 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      관심 기능
                    </div>
                    <p className="mt-2 text-sm text-slate-500">
                      자주 쓰는 기능을 선택하면 홈 화면이 더 알차게 구성돼요.
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-500">
                    선택: {focus.length}개
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {chips.map((v) => {
                    const active = focus.includes(v);
                    return (
                      <button
                        key={v}
                        type="button"
                        onClick={() => toggleFocus(v)}
                        className={[
                          "rounded-full px-4 py-2 text-sm transition ring-1",
                          active
                            ? "bg-indigo-600 text-white ring-indigo-600"
                            : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50",
                        ].join(" ")}
                      >
                        {v}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="text-sm font-semibold text-slate-900">
                      추천 미리보기
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      {goal} 기준으로, 학기별 과목/활동 우선순위를 정리해드려요.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="text-sm font-semibold text-slate-900">
                      대시보드 구성
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      선택한 기능({focus.join(", ") || "없음"}) 위주로 카드가 배치돼요.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                  <button
                    type="button"
                    onClick={finish}
                    className="rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-slate-900 transition"
                  >
                    설정 완료하고 시작하기
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    로그인으로 돌아가기
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center text-sm text-slate-500">
              설정을 끝내면 <span className="font-semibold text-slate-800">메인 대시보드</span>로 이동해요.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
