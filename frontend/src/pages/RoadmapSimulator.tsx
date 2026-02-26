import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

interface Competency {
  name: string;
  before: number;
  after: number;
}

const RoadmapSimulator: React.FC = () => {
  const navigate = useNavigate();
  
  // 시뮬레이션을 위한 가상 상태
  const [simulatedCourses, setSimulatedCourses] = useState([
    { id: 'sim1', name: 'AI 윤리와 법', credits: 3, type: '교양선택' }
  ]);
  
  const [competencies] = useState<Competency[]>([
    { name: '기술 전문성', before: 65, after: 72 },
    { name: '창의적 사고', before: 40, after: 45 },
    { name: '윤리적 책임', before: 30, after: 55 },
    { name: '협업 능력', before: 50, after: 50 },
  ]);

  const graduationProgress = {
    before: 100,
    after: 103,
    total: 140
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">로드맵 시뮬레이터</h1>
            <p className="mt-2 text-slate-500">과목 추가/제외에 따른 졸업 요건 및 역량 변화를 미리 확인해보세요.</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => navigate(-1)}
              className="rounded-xl bg-white border border-slate-200 px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 transition"
            >
              취소
            </button>
            <button 
              onClick={() => {
                alert('시뮬레이션 결과가 실제 로드맵에 반영되었습니다.');
                navigate('/curriculum-roadmap');
              }}
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white hover:bg-indigo-700 shadow-lg transition"
            >
              로드맵에 적용하기
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 입력 영역: 시뮬레이션 과목 관리 */}
          <section className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">시뮬레이션 과목 추가/제외</h3>
              
              <div className="flex gap-2 mb-6">
                <input 
                  type="text" 
                  placeholder="추가할 과목명 검색..."
                  className="flex-grow rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white">추가</button>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">추가된 시뮬레이션 과목</p>
                {simulatedCourses.map(course => (
                  <div key={course.id} className="flex items-center justify-between rounded-xl bg-indigo-50 p-4 border border-indigo-100">
                    <div>
                      <div className="text-xs font-bold text-indigo-600">{course.type}</div>
                      <div className="font-bold text-slate-900">{course.name}</div>
                      <div className="text-xs text-slate-500">{course.credits}학점</div>
                    </div>
                    <button className="text-slate-400 hover:text-rose-500 transition">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-6">
              <h4 className="font-bold text-indigo-900 mb-2">💡 시뮬레이션 팁</h4>
              <p className="text-sm text-indigo-700 leading-relaxed">
                부전공이나 복수전공 과목을 추가하여 졸업 시점에 어떤 역량이 가장 많이 성장하는지 확인해보세요. 
                현재 '윤리적 책임' 역량이 가장 크게 상승할 것으로 예측됩니다.
              </p>
            </div>
          </section>

          {/* 결과 영역: 변화 표시 */}
          <section className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6">시뮬레이션 결과 리포트</h3>
              
              {/* 졸업 요건 변화 */}
              <div className="mb-8">
                <p className="text-sm font-bold text-slate-500 mb-4">졸업 학점 충족 현황</p>
                <div className="relative h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="absolute left-0 top-0 h-full bg-slate-300 transition-all duration-500" 
                    style={{ width: `${(graduationProgress.before / graduationProgress.total) * 100}%` }}
                  ></div>
                  <div 
                    className="absolute left-0 top-0 h-full bg-indigo-500 transition-all duration-700 animate-pulse" 
                    style={{ width: `${(graduationProgress.after / graduationProgress.total) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-slate-500">현재: {graduationProgress.before}학점</span>
                  <span className="font-bold text-indigo-600">변경 후: {graduationProgress.after}학점 (+{graduationProgress.after - graduationProgress.before})</span>
                  <span className="text-slate-400">목표: {graduationProgress.total}학점</span>
                </div>
              </div>

              {/* 역량 변화 */}
              <div>
                <p className="text-sm font-bold text-slate-500 mb-4">역량 성장 예측 (Competency Score)</p>
                <div className="space-y-5">
                  {competencies.map(cp => (
                    <div key={cp.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-slate-700">{cp.name}</span>
                        <div className="flex gap-2">
                          <span className="text-slate-400 line-through">{cp.before}</span>
                          <span className="font-bold text-indigo-600">→ {cp.after}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-100 gap-0 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-200" 
                          style={{ width: `${cp.before}%`, gridColumn: '1 / span 100' }}
                        ></div>
                        <div 
                          className="h-full bg-indigo-600" 
                          style={{ width: `${cp.after}%`, marginTop: '-8px' }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI 코멘트 */}
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-emerald-600 font-bold">✨ AI 분석 결과</span>
              </div>
              <p className="text-sm text-emerald-800 leading-relaxed">
                선택하신 과목들을 추가할 경우, **전체 졸업 요건의 73%**를 달성하게 됩니다. 
                특히 'AI 윤리와 법' 과목은 귀하의 **윤리적 책임 역량을 25%p 향상**시키며, 
                이는 최근 IT 기업에서 요구하는 '책임감 있는 AI 개발자'상에 부합하는 변화입니다.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default RoadmapSimulator;
