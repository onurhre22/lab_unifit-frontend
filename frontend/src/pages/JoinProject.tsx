import Header from "../components/Header";
import { Link } from "react-router-dom";

// This component contains the UI for choosing a team formation method.
// It was previously a modal, but is now a standalone page.

export default function JoinProject() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900">
              팀 구성 방법을 선택하세요
            </h1>
            <p className="mt-2 text-base text-slate-600">
              프로젝트에 가장 적합한 팀 빌딩 방식을 선택해주세요.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* AI 스마트 매칭 카드 */}
            <div className="relative flex h-full flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 text-center">
              <span className="absolute right-3 top-3 rounded-full bg-cyan-400 px-2 py-0.5 text-xs font-semibold text-white">
                추천
              </span>

              <div>
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-sky-100 text-sky-500">
                  ✨
                </div>
                <h3 className="mt-4 text-lg font-semibold">AI 스마트 매칭</h3>
                <p className="mt-2 text-sm text-slate-500">
                  AI가 여러분의 기술 스택, 협업 스타일, 일정을 분석하여 최고의 시너지를 낼
                  수 있는 완벽한 팀원을 찾아드립니다.
                </p>
              </div>

              {/* 여기만 변경됨: button -> Link */}
              <Link
                to="/ai-team-matching"
                className="mt-6 inline-flex w-full items-center justify-center rounded-lg border border-indigo-500 py-2.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
              >
                AI 매칭 시작하기
              </Link>
            </div>

            {/* 자율 모집 카드 */}
            <div className="flex h-full flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 text-center">
              <div>
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-slate-100 text-slate-500">
                  👥
                </div>
                <h3 className="mt-4 text-lg font-semibold">자율 모집</h3>
                <p className="mt-2 text-sm text-slate-500">
                  공개된 팀 모집 게시글을 둘러보거나, 직접 게시글을 작성하여 특정 관심사와
                  기술 스택을 가진 팀원을 찾아보세요.
                </p>
              </div>
              <Link
                to="/autonomous-recruitment"
                className="mt-6 block w-full rounded-lg border border-indigo-500 py-2.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
              >
                팀원 탐색하기
              </Link>
            </div>

            {/* 공식 그룹 카드 */}
            <div className="flex h-full flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 text-center">
              <div>
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-slate-100 text-slate-500">
                  🎓
                </div>
                <h3 className="mt-4 text-lg font-semibold">공식 그룹</h3>
                <p className="mt-2 text-sm text-slate-500">
                  이 과목에서 교수님이 지정한 특정 팀에 참여하세요. 지정된 팀원 및
                  대시보드를 확인할 수 있습니다.
                </p>
              </div>
              <button className="mt-6 w-full rounded-lg border border-indigo-500 py-2.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-50">
                내 그룹 보기
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
