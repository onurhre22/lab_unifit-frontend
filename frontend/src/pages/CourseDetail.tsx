import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

// 명세서 기반 Mock 데이터
const COURSE_DETAILS: Record<string, any> = {
  'c101': {
    id: 'c101',
    course_code: 'CS101',
    course_name: 'Introduction to AI',
    completion_type: '전공선택',
    credits: 3,
    professor: '김교수',
    grade_levels: '2~3학년 권장',
    syllabus_text: '인공지능의 기본 개념과 역사, 그리고 현대적인 머신러닝 및 딥러닝 기법의 기초를 학습합니다. 파이썬을 이용한 간단한 실습이 포함되어 있습니다.',
    evaluation_method: '중간고사 30%, 기말고사 40%, 실습 과제 20%, 출석 10%',
    difficulty: '보통',
    rating: 4.5,
    reviewCount: 23,
    reviews: [
      { id: 1, user: '컴공21', rating: 5, comment: '수업이 정말 체계적이고 재미있어요. 실습 과제가 많은 도움이 되었습니다.', date: '2025-12-20' },
      { id: 2, user: '소프22', rating: 4, comment: '내용은 좋지만 수학적 배경지식이 조금 필요합니다.', date: '2025-11-15' },
    ]
  },
  'c102': {
    id: 'c102',
    course_code: 'CS102',
    course_name: 'Machine Learning',
    completion_type: '전공필수',
    credits: 3,
    professor: '이교수',
    grade_levels: '3~4학년 권장',
    syllabus_text: '지도학습, 비지도학습, 강화학습 등 머신러닝의 핵심 알고리즘을 심도 있게 다룹니다. 선형대수와 확률론에 대한 이해가 필수적입니다.',
    evaluation_method: '기말 프로젝트 50%, 중간고사 30%, 과제 20%',
    difficulty: '어려움',
    rating: 4.8,
    reviewCount: 35,
    reviews: [
      { id: 1, user: '인공20', rating: 5, comment: '난이도는 높지만 얻어가는 것이 정말 많은 명강의입니다.', date: '2025-06-15' },
    ]
  }
};

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  const course = id ? COURSE_DETAILS[id] : null;

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h2 className="text-2xl font-bold text-slate-800">과목 정보를 찾을 수 없습니다.</h2>
          <button onClick={() => navigate(-1)} className="mt-4 text-indigo-600 font-semibold">뒤로 가기</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="mx-auto max-w-4xl px-6 py-10">
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          목록으로 돌아가기
        </button>

        {/* 1. 교과목 기본 정보 */}
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                  {course.course_code}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                  {course.completion_type}
                </span>
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900">{course.course_name}</h1>
              <p className="mt-2 text-lg text-slate-600">{course.professor} 교수님</p>
            </div>
            
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={`flex h-12 w-12 items-center justify-center rounded-xl border transition ${
                isLiked ? 'bg-rose-50 border-rose-200 text-rose-500' : 'bg-white border-slate-200 text-slate-400 hover:border-rose-200 hover:text-rose-500'
              }`}
            >
              <svg className="w-6 h-6" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-y border-slate-100">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">이수 단위</h3>
              <p className="mt-1 font-semibold text-slate-900">{course.credits}학점</p>
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">이수 구분</h3>
              <p className="mt-1 font-semibold text-slate-900">{course.completion_type}</p>
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">권장 학년</h3>
              <p className="mt-1 font-semibold text-slate-900">{course.grade_levels}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">강의 개요</h3>
            <p className="mt-2 text-slate-700 leading-relaxed">{course.syllabus_text}</p>
          </div>
        </section>

        {/* 2. 선배 리뷰 및 평가 요약 */}
        <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">선배 리뷰 및 평가 요약</h3>
            <div className="text-center py-4">
              <div className="text-4xl font-black text-indigo-600">{course.rating.toFixed(1)}</div>
              <div className="flex justify-center mt-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'fill-current' : 'text-slate-200 fill-current'}`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mt-2 text-xs text-slate-500">{course.reviewCount}개의 리뷰</p>
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">체감 난이도</span>
                <span className="font-semibold text-slate-900">{course.difficulty}</span>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">평가 방식</span>
                <span className="text-sm text-slate-700 leading-snug block">{course.evaluation_method}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h3 className="font-bold text-slate-900">상세 리뷰 리스트</h3>
            {course.reviews.map((review: any) => (
              <div key={review.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{review.user}</span>
                    <div className="flex text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">{review.date}</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default CourseDetail;
