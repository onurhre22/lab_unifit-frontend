import React, { useState } from 'react';

interface GaugeProps {
  label: string;
  current: number;
  total: number;
  colorClass: string;
}

const Gauge: React.FC<GaugeProps> = ({ label, current, total, colorClass }) => {
  const percentage = total === 0 ? 0 : (current / total) * 100;
  const displayPercentage = percentage.toFixed(0);

  return (
    <div>
      <p className="text-sm font-medium text-gray-600">{label}:</p>
      <div className="flex items-center gap-2 mt-1">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className={`${colorClass} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
        </div>
        <span className="text-sm font-semibold text-gray-900 min-w-[70px] text-right">
          {current} / {total} ({displayPercentage}%)
        </span>
      </div>
    </div>
  );
};

const GraduationChecklistCard: React.FC = () => {
  const [showEarned, setShowEarned] = useState(true);

  const credits = {
    earned: {
      graduation: 100,
      major: 60,
      elective: 30,
      other: 10,
    },
    roadmap: {
      graduation: 130,
      major: 75,
      elective: 40,
      other: 15,
    },
    totalRequired: {
      graduation: 140,
      major: 80,
      elective: 45,
      other: 15,
    },
  };

  const currentCredits = showEarned ? credits.earned : credits.roadmap;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
      <h3 className="text-lg font-bold text-gray-800 mb-4">졸업 요건 체크리스트</h3>

      <div className="space-y-4">
        <Gauge
          label="총 취득 학점"
          current={currentCredits.graduation}
          total={credits.totalRequired.graduation}
          colorClass="bg-blue-500"
        />
        <Gauge
          label="전공 필수"
          current={currentCredits.major}
          total={credits.totalRequired.major}
          colorClass="bg-blue-500"
        />
        <Gauge
          label="교양 필수"
          current={currentCredits.elective}
          total={credits.totalRequired.elective}
          colorClass="bg-green-500"
        />
        <Gauge
          label="기타"
          current={currentCredits.other}
          total={credits.totalRequired.other}
          colorClass="bg-orange-500"
        />
      </div>

      <button
        onClick={() => setShowEarned(!showEarned)}
        className="mt-6 w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {showEarned ? '로드맵 기준으로 보기' : '취득한 학점 기준으로 보기'}
      </button>

      <div className="mt-6 pt-6 border-t border-slate-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">AI 추천</h3>
        <p className="text-sm text-gray-600">
          AI가 사용자의 수강 이력과 로드맵을 분석하여 다음 학기 수강할 과목을 추천합니다.
          예) '데이터과학' 과목을 수강하셨으므로 '딥러닝 응용' 과목을 추천합니다.
          또한 '인공지능개론' 과목을 추천합니다.
        </p>
      </div>
    </div>
  );
};

export default GraduationChecklistCard;
