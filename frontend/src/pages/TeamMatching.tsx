import Header from "../components/Header";

function MatchingCard({ title }: { title: string }) {
  return (
    <div className="flex w-[320px] h-[394px] flex-col items-center justify-between rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md">
      <div className="text-center">
        <div className="mt-1 h-20 w-20 shrink-0 rounded-xl bg-indigo-50 ring-1 ring-indigo-100 mx-auto" />
        <h3 className="mt-6 text-xl font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm text-slate-500">컨텐츠 준비 중</p>
      </div>
      <button className="w-[252px] h-[48px] rounded-lg bg-slate-800 text-base font-semibold text-white shadow-sm hover:bg-slate-900">
        선택
      </button>
    </div>
  );
}

export default function TeamMatching() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            팀 구성 방법을 선택하세요
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            프로젝트에 가장 적합한 팀 빌딩 방식을 선택해주세요.
          </p>
        </div>

        <div className="mt-20 flex flex-wrap justify-center gap-8">
          <MatchingCard title="AI 스마트매칭" />
          <MatchingCard title="자율모집" />
          <MatchingCard title="공식그룹" />
        </div>
      </main>
    </div>
  );
}
