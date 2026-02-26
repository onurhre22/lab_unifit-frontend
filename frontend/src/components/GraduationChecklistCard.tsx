import React from 'react';

interface GaugeProps {
  label: string;
  current: number;
  total: number;
  colorClass: string;
  simulatedValue?: number;
}

const Gauge: React.FC<GaugeProps> = ({ label, current, total, colorClass, simulatedValue }) => {
  const percentage = total === 0 ? 0 : (current / total) * 100;
  const simPercentage = simulatedValue !== undefined ? (simulatedValue / total) * 100 : undefined;

  return (
    <div>
      <p className="text-sm font-medium text-gray-600">{label}:</p>
      <div className="flex items-center gap-2 mt-1">
        <div className="w-full bg-gray-200 rounded-full h-2.5 relative overflow-hidden">
          <div className={`${colorClass} h-2.5 rounded-full transition-all duration-500`} style={{ width: `${percentage}%` }}></div>
          {simPercentage !== undefined && (
            <div 
              className="absolute top-0 left-0 h-2.5 bg-indigo-400 opacity-50 animate-pulse transition-all duration-500" 
              style={{ width: `${simPercentage}%` }}
            ></div>
          )}
        </div>
        <span className="text-[11px] font-bold text-gray-900 min-w-[85px] text-right">
          {simulatedValue !== undefined ? `${current} → ${simulatedValue}` : current} / {total}
        </span>
      </div>
    </div>
  );
};

interface GraduationChecklistCardProps {
  semesters?: any[];
  isSimulationMode?: boolean;
}

const GraduationChecklistCard: React.FC<GraduationChecklistCardProps> = ({ semesters = [], isSimulationMode = false }) => {
  // 실제 데이터 기반 학점 계산 (간단하게 모든 과목을 3학점으로 가정)
  const calculateCredits = (data: any[]) => {
    let major = 0;
    let elective = 0;
    data.forEach(sem => {
      sem.courses.forEach((c: any) => {
        // 실제로는 과목 타입에 따라 나눠야 함
        if (c.name.includes('프로그래밍') || c.name.includes('알고리즘') || c.name.includes('데이터베이스')) {
          major += 3;
        } else {
          elective += 3;
        }
      });
    });
    return { major, elective, total: major + elective };
  };

  const current = calculateCredits(semesters);
  
  // 시뮬레이션용 기준 값 (snapshot이 없으므로 고정값 대비 변화로 표시)
  const totalRequired = {
    total: 140,
    major: 80,
    elective: 45,
    other: 15,
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 border-2 transition-all ${isSimulationMode ? 'border-amber-300 ring-4 ring-amber-50' : 'border-slate-200'}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">결과 영역</h3>
        {isSimulationMode && <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded">시뮬레이션 중</span>}
      </div>

      <div className="space-y-4">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">졸업 요건 충족 현황</p>
        <Gauge
          label="총 취득 학점"
          current={current.total - (isSimulationMode ? 3 : 0)} // 가상의 '전' 값
          simulatedValue={isSimulationMode ? current.total : undefined}
          total={totalRequired.total}
          colorClass="bg-blue-500"
        />
        <Gauge
          label="전공 필수"
          current={current.major - (isSimulationMode ? 3 : 0)}
          simulatedValue={isSimulationMode ? current.major : undefined}
          total={totalRequired.major}
          colorClass="bg-indigo-500"
        />
        <Gauge
          label="교양 필수"
          current={current.elective}
          simulatedValue={isSimulationMode ? current.elective : undefined}
          total={totalRequired.elective}
          colorClass="bg-emerald-500"
        />
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">역량 변화 지표</p>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">기술 전문성</span>
            <span className={`font-bold ${isSimulationMode ? 'text-indigo-600' : 'text-slate-900'}`}>
              72% {isSimulationMode && '(+5%)'}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">창의적 사고</span>
            <span className="font-bold text-slate-900">45%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">윤리적 책임</span>
            <span className={`font-bold ${isSimulationMode ? 'text-emerald-600' : 'text-slate-900'}`}>
              30% {isSimulationMode && '(+12%)'}
            </span>
          </div>
        </div>
      </div>

      {isSimulationMode && (
        <div className="mt-6 rounded-xl bg-indigo-50 p-4 border border-indigo-100">
          <p className="text-[11px] text-indigo-700 leading-relaxed">
            ✨ <strong>AI 분석:</strong> 이 구성으로 이수할 경우 <strong>윤리적 책임</strong> 역량이 크게 향상되어 차세대 AI 전문가 요건에 한 걸음 더 다가가게 됩니다.
          </p>
        </div>
      )}
    </div>
  );
};

export default GraduationChecklistCard;
