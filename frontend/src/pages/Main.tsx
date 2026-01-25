import Header from "../components/Header";

/** ---------- cards ---------- */
function ServiceCard({
  title,
  desc,
  badge,
}: {
  title: string;
  desc: string;
  badge?: string;
}) {
  return (
    <div className="min-w-[260px] rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start gap-4">
        {/* 아이콘 자리: 정사각형 + 라운드 네모 */}
        <div className="mt-1 h-10 w-10 shrink-0 rounded-xl bg-indigo-50 ring-1 ring-indigo-100" />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="text-base font-semibold text-slate-900">{title}</div>
            {badge ? (
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                {badge}
              </span>
            ) : null}
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-500">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function ProgressCard() {

  return (

    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

      <div className="text-sm font-medium text-slate-900">현재 학기 진행도</div>



      <div className="mt-5 flex items-center gap-5">

        <div className="relative h-28 w-28 rounded-full bg-slate-100">

          <div className="absolute inset-2 rounded-full bg-white" />

          <div className="absolute inset-0 flex items-center justify-center">

            <div className="text-xl font-bold text-slate-900">72%</div>

          </div>

        </div>



        <div className="space-y-2">

          <div className="text-sm text-slate-500">

            이수 학점 <span className="font-semibold text-slate-900">18</span> / 25

          </div>

          <div className="text-xs text-slate-400">

            다음 단계에서 원형 진행률(색상/애니메이션)로 업그레이드할 수 있어요.

          </div>



          <div className="mt-3 w-64 max-w-[60vw]">

            <div className="h-2 w-full rounded-full bg-slate-100">

              <div className="h-2 w-[72%] rounded-full bg-emerald-500" />

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}



function ScheduleCard() {

  const items = [

    { color: "bg-amber-50 border-amber-200", tag: "발표", title: "팀 프로젝트 발표", date: "2026.01.28" },

    { color: "bg-orange-50 border-orange-200", tag: "제출", title: "요구사항 명세서 제출", date: "2026.01.29" },

    { color: "bg-emerald-50 border-emerald-200", tag: "회의", title: "주간 회의", date: "2026.01.30" },

    { color: "bg-sky-50 border-sky-200", tag: "리뷰", title: "중간 점검", date: "2026.02.01" },

  ];



  return (

    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

      <div className="text-sm font-medium text-slate-900">팀 프로젝트 현황</div>



      <div className="mt-4 space-y-3">

        {items.map((it) => (

          <div

            key={it.title}

            className={`flex items-center justify-between rounded-xl border px-4 py-3 ${it.color}`}

          >

            <div className="flex items-center gap-3">

              <span className="rounded-full bg-white/70 px-2 py-1 text-xs text-slate-700 ring-1 ring-slate-200">

                {it.tag}

              </span>

              <span className="text-sm font-semibold text-slate-900">

                {it.title}

              </span>

            </div>

            <span className="text-xs text-slate-600">{it.date}</span>

          </div>

        ))}

      </div>

    </div>

  );

}



/** ---------- Page ---------- */

export default function Main() {

  return (

    <div className="min-h-screen bg-slate-50">

      <Header />



      {/* 메인 화면 */}

      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-500 via-indigo-400 to-slate-50">

        <div className="pointer-events-none absolute inset-0">

          

          

          

        </div>



        <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl items-center px-6">

          <div className="mx-auto w-full max-w-4xl text-center">

            <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-medium text-white ring-1 ring-white/20 backdrop-blur">

              <span className="inline-block h-2 w-2 rounded-full bg-white/70" />

              UniFit · AI 기반 학업/협업/포트폴리오

            </div>



            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">

              AI로 미래를 설계하세요

            </h1>



            <p className="mt-4 text-white/85 md:text-lg">

              진로·역량·시간표를 기반으로, 당신에게 맞는 학업 성장 로드맵을 만들어 드려요.

            </p>



            <div className="mx-auto mt-10 flex w-full flex-col items-stretch gap-3 md:flex-row md:items-center">

              <div className="flex w-full items-center rounded-2xl bg-white px-5 py-4 shadow-sm md:flex-1">

                <input

                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 md:text-base"

                  placeholder="교과목, 프로젝트, 멘토를 검색해보세요"

                />

              </div>



              <button className="rounded-2xl bg-black px-7 py-4 text-sm font-semibold text-white shadow-sm hover:bg-slate-900 md:text-base">

                AI 로드맵 시작

              </button>

            </div>



            <div className="mt-10 flex flex-col items-center gap-3">

              <a

                href="#services"

                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/90 ring-1 ring-white/20 backdrop-blur hover:bg-white/15 transition"

              >

                아래로 스크롤해 더 많은 서비스를 확인해보세요

                <span className="inline-block animate-bounce">↓</span>

              </a>

              <div className="text-xs text-white/70">

                스크롤하면 팀 매칭 · 멘토링 · 포트폴리오 기능을 확인할 수 있어요

              </div>

            </div>

          </div>

        </div>

      </section>



      <main className="-mt-16 rounded-t-[32px] bg-slate-50 pb-24 shadow-[0_-12px_40px_rgba(15,23,42,0.12)]">

        <div className="mx-auto max-w-7xl px-6 pt-10">

          <section id="services">

            <h2 className="text-base font-semibold text-slate-900">핵심 서비스</h2>



            <div className="mt-4">

              <div className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-4 md:overflow-visible md:pb-0">

                <ServiceCard title="AI 강좌 로드맵" desc="진로/역량 기반으로 학기별 추천 로드맵을 제안합니다." badge="추천" />

                <ServiceCard title="팀 프로젝트 매칭" desc="역량/성향/시간표 기반으로 최적 팀 구성을 추천합니다." />

                <ServiceCard title="선배 멘토링" desc="관심 분야에 맞는 선배를 찾아 1:1 상담을 연결합니다." />

                <ServiceCard title="AI 포트폴리오" desc="업로드만 하면 자동 정리·피드백까지 제공해요." />

              </div>

            </div>

          </section>



          <section className="mt-12">

            <h2 className="text-base font-semibold text-slate-900">나의 현황 대시보드</h2>

            <div className="mt-4 grid gap-6 md:grid-cols-3">

              <ProgressCard />

              <div className="md:col-span-2">

                <ScheduleCard />

              </div>

            </div>

          </section>

        </div>

      </main>

    </div>

  );

}
