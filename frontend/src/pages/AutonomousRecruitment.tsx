import Header from "../components/Header";
import { Link } from "react-router-dom";


const recruitmentPosts = [
    {
        id: 1,
        title: "모바일 피트니스 트래커 앱",
        tags: ["#ReactNative", "#UI/UX", "#백엔드"],
        description: "피트니스 목표와 영양을 추적하고 캠퍼스 내 운동 파트너와 연결하는 모바일 앱을 개발합니다.",
        members: 5,
        capacity: 6,
        deadline: 2,
        views: 421,
        comments: 24,
        isAiRecommended: true,
        status: "마감임박",
        statusColor: "bg-yellow-100 text-yellow-800",
    },
    {
        id: 2,
        title: "AI 레시피 앱 개발팀",
        tags: ["#프론트엔드", "#UI/UX"],
        description: "학생들이 저렴한 가격으로 건강한 식사를 할 수 있도록 돕는 AI 기반 레시피 추천 앱을 개발합니다.",
        members: 2,
        capacity: 4,
        deadline: 5,
        views: 234,
        comments: 12,
        isAiRecommended: true,
        status: "모집중",
        statusColor: "bg-green-100 text-green-800",
    },
    {
        id: 3,
        title: "캠퍼스 행사 관리 플랫폼",
        tags: ["#백엔드", "#프론트엔드", "#디자인"],
        description: "캠퍼스 행사, 동아리 및 학생 활동을 조직하고 관리하는 종합 플랫폼을 만듭니다.",
        members: 3,
        capacity: 6,
        deadline: 12,
        views: 189,
        comments: 8,
        isAiRecommended: true,
        status: "모집중",
        statusColor: "bg-green-100 text-green-800",
    },
    {
        id: 4,
        title: "UX 디자인 공모전 준비팀",
        tags: ["#Figma", "#UI/UX", "#리서치"],
        description: "전국 UX 디자인 공모전 준비 중입니다. 열정적인 디자이너와 사용자 리서처를 찾습니다.",
        members: 3,
        capacity: 4,
        deadline: 7,
        views: 278,
        comments: 18,
        isAiRecommended: true,
        status: "모집중",
        statusColor: "bg-green-100 text-green-800",
    },
];

function RecruitmentCard({ post }: { post: (typeof recruitmentPosts)[0] }) {
    return (
        <Link to={`/recruitment/${post.id}`} className="relative rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md block">
            {post.isAiRecommended && (
                <span className="absolute top-4 right-4 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">AI 추천</span>
            )}
            <div className="flex items-center gap-4">
                <h3 className="text-lg font-bold text-slate-900">{post.title}</h3>
                <span className={`rounded-md px-2 py-1 text-xs font-semibold ${post.statusColor}`}>{post.status}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
                {post.tags.map(tag => (
                    <span key={tag} className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">{tag}</span>
                ))}
            </div>
            <p className="mt-3 text-sm text-slate-600">{post.description}</p>
            <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-700">팀 구성</span>
                    <span>{post.members}/{post.capacity}명</span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
                    <div className="h-2 rounded-full bg-indigo-500" style={{ width: `${(post.members / post.capacity) * 100}%` }} />
                </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                <div className="flex gap-4">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inline h-4 w-4 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        D-{post.deadline}
                    </span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inline h-4 w-4 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        </svg>
                        {post.views}
                    </span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inline h-4 w-4 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.49.03.984.064 1.48.096.5.032 1.001.064 1.502.095 1.002.065 2.005.129 3.008.193.939.059 1.869.102 2.78.132 1.48.049 2.868-.236 4.015-1.04.118-.08.236-.164.35-.252M12 15.75A3.75 3.75 0 0 0 15.75 12H12m0 0H8.25A3.75 3.75 0 0 0 12 15.75Z" />
                        </svg>
                        {post.comments}
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default function AutonomousRecruitment() {
    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            <main className="mx-auto max-w-7xl px-6 py-12">
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">팀 모집 게시판</h1>
                        <p className="mt-2 text-base text-slate-600">나에게 맞는 팀을 찾거나 팀원을 모집해보세요.</p>
                    </div>
                    <div className="flex gap-2">
                         <button className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
                            초대코드 입력
                        </button>
                        <button className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700">
                            + 모집글 작성
                        </button>
                    </div>
                </div>

                <div className="mt-8 rounded-lg border border-slate-200 bg-white p-4">
                    {/* Search and filter bar implementation here */}
                    <p className="text-center text-slate-400 text-sm py-8">[검색 및 필터 영역]</p>
                </div>
                
                <div className="mt-6 text-sm font-medium text-slate-700">
                    {recruitmentPosts.length}개의 모집 공고가 있습니다.
                </div>

                <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {recruitmentPosts.map(post => (
                        <RecruitmentCard key={post.id} post={post} />
                    ))}
                </div>
            </main>
        </div>
    );
}
