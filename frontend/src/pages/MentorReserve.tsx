import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

interface TimeSlot {
  time: string;
  isAvailable: boolean;
}

const MentorReserve: React.FC = () => {
  useParams();
  const navigate = useNavigate();
  
  const [selectedDate, setSelectedDate] = useState('2026-03-02');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 목업 데이터: 날짜별 가능 시간
  const dates = [
    { label: '3/2 (월)', value: '2026-03-02' },
    { label: '3/3 (화)', value: '2026-03-03' },
    { label: '3/4 (수)', value: '2026-03-04' },
    { label: '3/5 (목)', value: '2026-03-05' },
    { label: '3/6 (금)', value: '2026-03-06' },
  ];

  const timeSlots: TimeSlot[] = [
    { time: '10:00', isAvailable: true },
    { time: '11:00', isAvailable: false }, // 충돌 시뮬레이션
    { time: '13:00', isAvailable: true },
    { time: '14:00', isAvailable: true },
    { time: '15:00', isAvailable: true },
    { time: '16:00', isAvailable: false },
    { time: '17:00', isAvailable: true },
    { time: '19:00', isAvailable: true },
  ];

  const handleReserve = () => {
    if (!selectedTime) {
      alert('상담 시간을 선택해주세요.');
      return;
    }
    if (!content.trim()) {
      alert('상담 신청 내용을 입력해주세요.');
      return;
    }
    
    // 예약 확정 시뮬레이션
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="mx-auto max-w-2xl px-6 py-20 text-center">
          <div className="mb-8 flex justify-center">
            <div className="h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">예약 신청이 완료되었습니다!</h2>
          <p className="text-slate-600 mb-10">멘토님의 승인 후 확정 알림을 보내드릴게요.</p>
          <div className="bg-white rounded-3xl border border-slate-200 p-6 mb-10 text-left">
            <div className="flex justify-between mb-2">
              <span className="text-slate-500">예약 일시</span>
              <span className="font-semibold text-slate-900">{selectedDate} {selectedTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">멘토</span>
              <span className="font-semibold text-slate-900">김민수 멘토</span>
            </div>
          </div>
          <button 
            onClick={() => navigate('/main')}
            className="w-full rounded-2xl bg-slate-900 py-4 text-sm font-bold text-white hover:bg-black transition"
          >
            홈으로 돌아가기
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8">
          <button onClick={() => navigate(-1)} className="text-sm font-medium text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
            이전으로
          </button>
          <h2 className="text-3xl font-bold text-slate-900 mt-4">멘토링 예약 신청</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽: 일정 선택 */}
          <section className="space-y-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center text-xs text-indigo-600 font-bold">1</span>
                날짜 선택
              </h3>
              <div className="flex flex-wrap gap-3">
                {dates.map((date) => (
                  <button
                    key={date.value}
                    onClick={() => setSelectedDate(date.value)}
                    className={`px-4 py-3 rounded-2xl text-sm font-medium border transition ${
                      selectedDate === date.value 
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'
                    }`}
                  >
                    {date.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center text-xs text-indigo-600 font-bold">2</span>
                시간 선택
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.time}
                    disabled={!slot.isAvailable}
                    onClick={() => setSelectedTime(slot.time)}
                    className={`py-3 rounded-2xl text-sm font-medium border transition ${
                      !slot.isAvailable 
                        ? 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed'
                        : selectedTime === slot.time
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'
                    }`}
                  >
                    {slot.time}
                    {!slot.isAvailable && <span className="block text-[10px] mt-0.5">마감</span>}
                  </button>
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-400">
                * 멘토의 일정과 충돌하는 시간대는 자동으로 비활성화됩니다.
              </p>
            </div>
          </section>

          {/* 오른쪽: 신청 내용 입력 */}
          <section className="space-y-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm h-full flex flex-col">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center text-xs text-indigo-600 font-bold">3</span>
                신청 내용 작성
              </h3>
              <textarea
                placeholder="어떤 고민이나 질문이 있으신가요? 멘토님이 미리 준비하실 수 있도록 구체적으로 적어주세요."
                className="flex-grow w-full min-h-[200px] rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              
              <div className="mt-8 space-y-4">
                <div className="rounded-2xl bg-indigo-50 p-4 border border-indigo-100">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-indigo-400">선택된 일시</span>
                    <span className="font-bold text-indigo-600">{selectedDate} {selectedTime || '미선택'}</span>
                  </div>
                </div>
                <button
                  onClick={handleReserve}
                  className="w-full rounded-2xl bg-indigo-600 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition"
                >
                  예약 신청하기
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default MentorReserve;
