import Header from "../components/Header";
import { useParams } from "react-router-dom";

// Mock data (similar to AutonomousRecruitment.tsx)
const recruitmentPosts = [
  {
    id: 1,
    title: "모바일 피트니스 트래커 앱",
    tags: ["#ReactNative", "#UI/UX", "#백엔드"],
    description:
      "피트니스 목표와 영양을 추적하고 캠퍼스 내 운동 파트너와 연결하는 모바일 앱을 개발합니다. 이 프로젝트는 사용자 친화적인 인터페이스와 강력한 백엔드 시스템을 구축하는 것을 목표로 합니다. ReactNative, TypeScript를 주로 사용하며, 백엔드는 Node.js와 Express를 활용할 예정입니다. 데이터베이스는 MongoDB를 고려하고 있습니다. 주 2회 온라인 회의를 진행하며, 필요시 오프라인 미팅도 가질 예정입니다.",
    members: 5,
    capacity: 6,
    deadline: 2,
    views: 421,
    comments: 24,
    isAiRecommended: true,
    status: "마감임박",
    statusColor: "bg-yellow-100 text-yellow-800",
    postDate: "2024.01.20",
    author: "김철수",
    recruitmentType: "모바일 앱 개발",
    startDate: "2024.03.01",
    estimatedDuration: "3개월",
    recruitmentFields: ["프론트엔드 (ReactNative)", "백엔드 (Node.js)", "UI/UX 디자인"],
    meetingMethod: "온라인 (주 2회) / 필요시 오프라인",
    techStack: ["ReactNative", "TypeScript", "Node.js", "Express", "MongoDB", "Figma"],
    activityGoal: "캠퍼스 내 건강 증진 및 협업 능력 향상",
    teamMembers: [
      {
        id: 1,
        name: "김철수",
        role: "리드 개발자",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop&q=80",
      },
      {
        id: 2,
        name: "이영희",
        role: "UI/UX 디자이너",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&q=80",
      },
      {
        id: 3,
        name: "박민수",
        role: "프론트엔드",
        avatar:
          "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=60&h=60&fit=crop&q=80",
      },
      {
        id: 4,
        name: "최유리",
        role: "백엔드",
        avatar:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop&q=80",
      },
      {
        id: 5,
        name: "정은지",
        role: "백엔드",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&q=80",
      },
    ],
  },
  {
    id: 2,
    title: "AI 레시피 앱 개발팀",
    tags: ["#프론트엔드", "#UI/UX"],
    description:
      "학생들이 저렴한 가격으로 건강한 식사를 할 수 있도록 돕는 AI 기반 레시피 추천 앱을 개발합니다.",
    members: 2,
    capacity: 4,
    deadline: 5,
    views: 234,
    comments: 12,
    isAiRecommended: true,
    status: "모집중",
    statusColor: "bg-green-100 text-green-800",
    postDate: "2024.01.25",
    author: "박선영",
    recruitmentType: "AI 서비스 개발",
    startDate: "2024.03.15",
    estimatedDuration: "2개월",
    recruitmentFields: ["프론트엔드 (React)", "UI/UX 디자인"],
    meetingMethod: "온라인 (주 1회)",
    techStack: ["React", "TypeScript", "Figma", "Python (AI Model)"],
    activityGoal: "AI 기술 활용 및 건강한 식문화 확산 기여",
    teamMembers: [
      {
        id: 1,
        name: "박선영",
        role: "리드 개발자",
        avatar:
          "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=60&h=60&fit=crop&q=80",
      },
      {
        id: 2,
        name: "김민준",
        role: "UI/UX 디자이너",
        avatar:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop&q=80",
      },
    ],
  },
];

export default function RecruitmentDetail() {
  const { id } = useParams<{ id: string }>();
  const post = recruitmentPosts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            모집글을 찾을 수 없습니다.
          </h1>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Top Section: Title, Date/Author, Buttons */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
          <div className="flex-grow">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {post.title}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              게시일: {post.postDate} | 게시자: {post.author}
            </p>
          </div>
          <div className="mt-4 flex gap-2 md:mt-0">
            <button className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
              문의하기
            </button>
            <button className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700">
              참여하기
            </button>
          </div>
        </div>

        {/* Project Details Section */}
        <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-slate-500">모집구분</p>
              <p className="mt-1 text-base text-slate-900">
                {post.recruitmentType}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">시작일정</p>
              <p className="mt-1 text-base text-slate-900">{post.startDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">모집인원</p>
              <p className="mt-1 text-base text-slate-900">
                {post.members}/{post.capacity}명
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">예상기간</p>
              <p className="mt-1 text-base text-slate-900">
                {post.estimatedDuration}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">모집분야</p>
              <div className="mt-1 flex flex-wrap gap-2">
                {post.recruitmentFields?.map((field, index) => (
                  <span
                    key={index}
                    className="rounded-md bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-700"
                  >
                    {field}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">회의방식</p>
              <p className="mt-1 text-base text-slate-900">
                {post.meetingMethod}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">기술스택</p>
              <div className="mt-1 flex flex-wrap gap-2">
                {post.techStack?.map((stack, index) => (
                  <span
                    key={index}
                    className="rounded-md bg-green-100 px-2 py-1 text-xs font-semibold text-green-700"
                  >
                    {stack}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">활동목표</p>
              <p className="mt-1 text-base text-slate-900">
                {post.activityGoal}
              </p>
            </div>
          </div>
        </div>

        {/* Project Introduction Section */}
        <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">프로젝트 소개글</h2>
          <p className="mt-3 whitespace-pre-wrap text-base text-slate-700">
            {post.description}
          </p>
        </div>

        {/* Team Members Section */}
        <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">현재 팀원</h2>
          <div className="mt-4 flex flex-wrap gap-4">
            {post.teamMembers?.map((member) => (
              <div key={member.id} className="flex flex-col items-center">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="h-12 w-12 rounded-full ring-2 ring-white"
                />
                <p className="mt-2 text-sm font-medium text-slate-900">
                  {member.name}
                </p>
                <p className="text-xs text-slate-500">{member.role}</p>
              </div>
            ))}
            {post.members < post.capacity && (
              <div className="flex h-full w-20 flex-col items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-slate-300 bg-slate-100 text-lg font-semibold text-slate-500">
                  +{post.capacity - post.members}
                </div>
                <p className="mt-2 text-sm font-medium text-slate-900">모집 중</p>
              </div>
            )}
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">댓글</h2>
          <div className="mt-4">
            {/* Mock comment input */}
            <textarea
              className="w-full rounded-md border border-slate-300 p-3 text-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={4}
              placeholder="댓글을 입력하세요..."
            ></textarea>
            <button className="mt-2 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700">
              댓글 등록
            </button>
            {/* No actual comments mocked yet, just the input */}
            <p className="mt-4 text-sm text-slate-500">아직 댓글이 없습니다.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
