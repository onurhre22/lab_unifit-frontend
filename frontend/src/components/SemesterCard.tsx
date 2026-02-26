import React from 'react';
import { Link } from 'react-router-dom';

const CheckIcon = () => (
  <svg
    className="w-4 h-4 text-green-500 inline-block mr-1"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
  </svg>
);

const SparklingIcon = () => (
  <span className="ml-1 rounded bg-yellow-100 px-1 text-[10px] font-semibold text-yellow-700">AI</span>
);

interface SemesterCardProps {
  title: string;
  semesterCredits: number;
  gpa?: string;
  courses: { 
    id: string; 
    name: string; 
    professor: string;
    courseCode: string;
    completionType: string; 
    credits: number; 
    aiRecommended?: boolean 
  }[];
  status: 'taken' | 'current' | 'future';
  isEditMode: boolean;
  onCourseDragStart: (courseId: string) => void;
  onCourseDelete: (courseId: string) => void;
  onDropCourse: () => void;
  onDragOverCourse: (event: React.DragEvent) => void;
}

const SemesterCard: React.FC<SemesterCardProps> = ({
  title,
  semesterCredits,
  gpa,
  courses,
  status,
  isEditMode,
  onCourseDragStart,
  onCourseDelete,
  onDropCourse,
  onDragOverCourse,
}) => {
  let borderColorClass = 'border-gray-300';
  let bgColorClass = 'bg-white';
  let titleColorClass = 'text-gray-800';
  let badgeColorClass = 'bg-gray-200 text-gray-700';

  switch (status) {
    case 'taken':
      borderColorClass = 'border-green-400';
      bgColorClass = 'bg-green-50';
      titleColorClass = 'text-green-800';
      badgeColorClass = 'bg-green-200 text-green-800';
      break;
    case 'current':
      borderColorClass = 'border-indigo-400';
      bgColorClass = 'bg-indigo-50';
      titleColorClass = 'text-indigo-800';
      badgeColorClass = 'bg-indigo-200 text-indigo-800';
      break;
    case 'future':
      break;
  }

  const aspectRatioPadding = '100%';

  const getCompletionTypeColor = (type?: string) => {
    if (!type) return 'text-gray-500 bg-gray-50 border-gray-100';
    if (type.includes('필수')) return 'text-indigo-600 bg-indigo-50 border-indigo-100';
    if (type.includes('선택')) return 'text-slate-600 bg-slate-50 border-slate-100';
    return 'text-gray-500 bg-gray-50 border-gray-100';
  };

  return (
    <div
      className={`relative rounded-xl border-2 ${borderColorClass} ${bgColorClass} shadow-md overflow-hidden transition-all`}
      onDrop={isEditMode ? onDropCourse : undefined}
      onDragOver={isEditMode ? onDragOverCourse : undefined}
    >
      <div style={{ paddingBottom: aspectRatioPadding }}></div>
      <div className="absolute inset-0 p-4 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className={`font-bold text-base ${titleColorClass}`}>{title}</h4>
            <p className="text-[11px] font-medium text-gray-500">{semesterCredits} 학점</p>
          </div>
          {gpa && (
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${badgeColorClass}`}>
              GPA {gpa}
            </span>
          )}
        </div>

        <ul className="text-sm space-y-2 overflow-y-auto pr-1">
          {courses.length > 0 ? (
            courses.map((course) => (
              <li
                key={course.id}
                className="bg-white p-3 rounded-xl border border-gray-200 text-gray-800 shadow-sm transition hover:shadow-md"
                draggable={isEditMode}
                onDragStart={isEditMode ? () => onCourseDragStart(course.id) : undefined}
              >
                <div className="flex items-start justify-between">
                  <Link 
                    to={`/course/${course.id}`} 
                    className="flex-grow min-w-0 hover:text-indigo-600 transition"
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-md border font-bold ${getCompletionTypeColor(course.completionType)}`}>
                        {course.completionType || '미분류'}
                      </span>
                      <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md">
                        {course.credits || 0}학점
                      </span>
                      {course.aiRecommended && <SparklingIcon />}
                    </div>

                    <div className="flex items-center text-[14px] font-extrabold leading-tight text-slate-900 truncate mb-1">
                      {status === 'taken' && <CheckIcon />}
                      <span className="truncate">{course.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-indigo-600">{course.professor || '미지정'} 교수님</span>
                      <span className="text-[10px] text-slate-400 font-medium">{course.courseCode || 'CODE'}</span>
                    </div>
                  </Link>
                  {isEditMode && (
                    <button
                      type="button"
                      className="ml-2 text-slate-300 hover:text-red-500 transition shrink-0"
                      onClick={() => onCourseDelete(course.id)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </li>
            ))
          ) : (
            <li className="text-gray-400 italic text-xs text-center py-4">수강한 강의 없음</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SemesterCard;
