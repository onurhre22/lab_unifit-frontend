import { useParams } from "react-router-dom";
import Header from "../components/Header";

export default function TeamWorkspace() {
  const { id } = useParams<{ id: string }>();

  // id가 없으면(라우팅 설정/직접 접근 오류 등) 방어
  if (!id) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            워크스페이스를 찾을 수 없습니다.
          </h1>
          <p className="mt-2 text-slate-600">잘못된 접근이거나 URL에 id가 없습니다.</p>
        </main>
      </div>
    );
  }

  // Mock data for project details
  const projectTitle = "AI 가상 피팅룸";
  const projectAffiliation = "소프트웨어 공학"; // Example affiliation
  const deadlineDate = new Date("2026-03-15"); // Example deadline

  // Calculate D-Day
  const today = new Date();
  const diffTime = Math.abs(deadlineDate.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const dDayBadge = `D-${diffDays}`;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* Main Content (3/4 width on desktop) */}
          <div className="lg:w-3/4">
            {/* Project Header */}
            <div className="mb-8 flex items-center justify-between rounded-lg bg-white p-6 shadow-sm">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  {projectTitle}
                </h1>
                <p className="mt-1 text-base text-slate-600">소속: {projectAffiliation}</p>

                {/* ✅ id 실제 사용 */}
                <p className="mt-1 text-sm text-slate-500">프로젝트 ID: {id}</p>
              </div>

              <span className="rounded-full bg-yellow-200 px-3 py-1 text-sm font-semibold text-yellow-800">
                {dDayBadge}
              </span>
            </div>

            {/* Kanban Board Section */}
            <div className="mt-8">
              <h2 className="sr-only">칸반 보드</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {/* To Do Column */}
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="mb-4 text-lg font-semibold text-slate-700">할 일</h3>

                  {/* Task Card */}
                  <div className="mb-3 rounded-lg border border-slate-200 bg-white p-4 shadow-md">
                    <div className="mb-2 flex items-center">
                      <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-200 text-sm font-bold text-blue-800">
                        JH
                      </div>
                      <span className="font-medium text-slate-800">와이어프레임 설계</span>
                    </div>
                    <p className="text-sm text-slate-600">
                      초기 UI/UX 와이어프레임 초안 작성
                    </p>
                  </div>

                  <div className="mb-3 rounded-lg border border-slate-200 bg-white p-4 shadow-md">
                    <div className="mb-2 flex items-center">
                      <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-green-200 text-sm font-bold text-green-800">
                        SY
                      </div>
                      <span className="font-medium text-slate-800">사용자 요구사항 분석</span>
                    </div>
                    <p className="text-sm text-slate-600">
                      사용자 인터뷰 및 설문조사 계획 수립
                    </p>
                  </div>
                </div>

                {/* In Progress Column */}
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="mb-4 text-lg font-semibold text-slate-700">진행 중</h3>

                  <div className="mb-3 rounded-lg border border-slate-200 bg-white p-4 shadow-md">
                    <div className="mb-2 flex items-center">
                      <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-purple-200 text-sm font-bold text-purple-800">
                        MS
                      </div>
                      <span className="font-medium text-slate-800">백엔드 API 설계</span>
                    </div>
                    <p className="text-sm text-slate-600">
                      데이터베이스 스키마 및 RESTful API 정의
                    </p>
                  </div>
                </div>

                {/* Done Column */}
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="mb-4 text-lg font-semibold text-slate-700">완료</h3>

                  <div className="mb-3 rounded-lg border border-slate-200 bg-white p-4 shadow-md">
                    <div className="mb-2 flex items-center">
                      <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-200 text-sm font-bold text-red-800">
                        EW
                      </div>
                      <span className="font-medium text-slate-800">프로젝트 환경 설정</span>
                    </div>
                    <p className="text-sm text-slate-600">
                      개발 환경 및 CI/CD 파이프라인 구축
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Meeting Minutes Section */}
            <div className="mt-8">
              <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">회의록</h2>

              <div className="rounded-lg bg-white p-4 shadow-sm">
                {/* Meeting Minute Item */}
                <div className="flex items-center justify-between border-b border-slate-200 py-3 last:border-b-0">
                  <div>
                    <p className="text-sm text-slate-500">2026-02-01</p>
                    <h4 className="font-semibold text-slate-800">주간 진행 상황 회의</h4>
                    <p className="text-sm text-slate-600">참여자: 김서연, 박준호, 이지은</p>
                  </div>

                  <div className="flex gap-2">
                    <button className="rounded-md bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 hover:bg-indigo-200">
                      음성
                    </button>
                    <button className="rounded-md bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 hover:bg-indigo-200">
                      텍스트
                    </button>
                  </div>
                </div>

                {/* Meeting Minute Item */}
                <div className="flex items-center justify-between border-b border-slate-200 py-3 last:border-b-0">
                  <div>
                    <p className="text-sm text-slate-500">2026-01-25</p>
                    <h4 className="font-semibold text-slate-800">초기 아이디어 브레인스토밍</h4>
                    <p className="text-sm text-slate-600">참여자: 김서연, 박준호</p>
                  </div>

                  <div className="flex gap-2">
                    <button className="rounded-md bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 hover:bg-indigo-200">
                      음성
                    </button>
                    <button className="rounded-md bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 hover:bg-indigo-200">
                      텍스트
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar (1/4 width on desktop) */}
          <div className="mt-8 lg:mt-0 lg:w-1/4">
            {/* Shared File Storage Section */}
            <div className="mb-4 rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-bold text-slate-900">공유 파일 저장소</h3>

              {/* File List */}
              <ul className="space-y-3">
                <li className="flex items-center justify-between text-sm text-slate-700">
                  <span>기획서_최종.pdf</span>
                  <span>1.2MB | 2시간 전</span>
                </li>
                <li className="flex items-center justify-between text-sm text-slate-700">
                  <span>UI_디자인_시안.fig</span>
                  <span>5.8MB | 1일 전</span>
                </li>
                <li className="flex items-center justify-between text-sm text-slate-700">
                  <span>백엔드_API_명세.docx</span>
                  <span>0.5MB | 3일 전</span>
                </li>
              </ul>

              {/* Storage Progress Bar */}
              <div className="mt-6">
                <div className="mb-1 flex justify-between text-sm text-slate-600">
                  <span>사용 공간: 7.5GB / 10GB</span>
                  <span>75%</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-200">
                  <div
                    className="h-2.5 rounded-full bg-indigo-600"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Team Schedule Section */}
            <div className="mb-4 rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-bold text-slate-900">팀 일정</h3>

              <div className="space-y-4">
                {/* Schedule Item */}
                <div className="border-l-4 border-indigo-500 pl-3 py-1">
                  <p className="text-sm font-semibold text-slate-700">2월 10일</p>
                  <p className="text-base text-slate-900">기획서 1차 검토</p>
                </div>

                {/* Schedule Item */}
                <div className="border-l-4 border-indigo-500 pl-3 py-1">
                  <p className="text-sm font-semibold text-slate-700">2월 15일</p>
                  <p className="text-base text-slate-900">UI/UX 디자인 확정</p>
                </div>

                {/* Deadline Item */}
                <div className="rounded-r-md border-l-4 border-yellow-500 bg-yellow-50 pl-3 py-1">
                  <p className="text-sm font-semibold text-yellow-800">2월 20일 (마감)</p>
                  <p className="text-base text-yellow-900">백엔드 API 개발 완료</p>
                </div>

                {/* Schedule Item */}
                <div className="border-l-4 border-indigo-500 pl-3 py-1">
                  <p className="text-sm font-semibold text-slate-700">2월 28일</p>
                  <p className="text-base text-slate-900">프론트엔드 개발 시작</p>
                </div>
              </div>

              {/* View Full Calendar Button */}
              <button className="mt-6 w-full rounded-lg bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm hover:bg-indigo-200">
                전체 캘린더보기
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
