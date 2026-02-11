import React, { useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const allCourses = [
  {
    id: 'c101',
    code: 'CS101',
    type: '전공선택',
    aiRecommended: true,
    name: 'Introduction to AI',
    professor: '김교수',
    time: '월 14:30~16:00',
    classroom: '공학관 101호',
    credits: 3,
    rating: 4.5,
    reviews: 23,
  },
  {
    id: 'c102',
    code: 'CS102',
    type: '전공필수',
    aiRecommended: false,
    name: 'Machine Learning',
    professor: '이교수',
    time: '화 10:00~11:30',
    classroom: '공학관 102호',
    credits: 3,
    rating: 4.8,
    reviews: 35,
  },
  {
    id: 'c103',
    code: 'CS103',
    type: '전공선택',
    aiRecommended: true,
    name: 'Deep Learning',
    professor: '박교수',
    time: '수 13:00~14:30',
    classroom: '공학관 103호',
    credits: 3,
    rating: 4.7,
    reviews: 28,
  },
    {
    id: 'c104',
    code: 'CS104',
    type: '교양필수',
    aiRecommended: false,
    name: 'Natural Language Processing',
    professor: '최교수',
    time: '목 16:00~17:30',
    classroom: '인문관 201호',
    credits: 3,
    rating: 4.6,
    reviews: 18,
  },
];

const AddCourse: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<typeof allCourses>([]);

  const handleAddCourse = (course: (typeof allCourses)[0]) => {
    setSelectedCourses((prev) => {
      if (prev.some(c => c.id === course.id)) {
        return prev;
      }
      return [...prev, course];
    });
  };

  const handleGoToRoadmap = () => {
    sessionStorage.setItem('newCourses', JSON.stringify(selectedCourses));
    sessionStorage.setItem('enableEditMode', 'true');
    navigate('/curriculum-roadmap');
  };

  const filteredCourses = allCourses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">개설 강좌 목록</h2>
            <p className="mt-2 text-sm text-gray-500">로드맵에 추가할 강좌를 선택하세요.</p>
          </div>
          {selectedCourses.length > 0 && (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-semibold">
                현재 {selectedCourses.length}개의 강의를 선택했습니다
              </span>
              <button
                onClick={handleGoToRoadmap}
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                내 로드맵으로
              </button>
            </div>
          )}
        </div>
        
        <div className="mt-6">
          <input
            type="text"
            placeholder="과목명 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mt-6 space-y-4">
          {filteredCourses.map((course) => {
            const isSelected = selectedCourses.some((c) => c.id === course.id);
            return (
              <div
                key={course.id}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <div className="flex-grow">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span>{course.code}</span>
                    <span>|</span>
                    <span>{course.type}</span>
                    {course.aiRecommended && (
                      <>
                        <span>|</span>
                        <span className="font-bold text-indigo-600">AI 추천</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">{course.name}</h3>
                  <div className="text-sm text-gray-600 mt-1">
                    <span>{course.professor}</span>
                    <span className="mx-2">|</span>
                    <span>{course.time}</span>
                    <span className="mx-2">|</span>
                    <span>{course.classroom}</span>
                    <span className="mx-2">|</span>
                    <span>{course.credits}학점</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    <span>평점: {course.rating.toFixed(1)}</span>
                    <span className="mx-2">|</span>
                    <span>리뷰: {course.reviews}개</span>
                  </div>
                </div>
                <button
                  onClick={() => handleAddCourse(course)}
                  disabled={isSelected}
                  className={`ml-4 rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm transition ${
                    isSelected
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-500'
                  }`}
                >
                  {isSelected ? '추가됨' : '추가'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
