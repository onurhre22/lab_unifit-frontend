import React from 'react';

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
  courses: { id: string; name: string; aiRecommended?: boolean }[];
  status: 'taken' | 'current' | 'future';
  isEditMode: boolean;
  onCourseDragStart: (courseId: string) => void;
  onCourseDelete: (courseId: string) => void;
  onDropCourse: () => void;
  onDragOverCourse: () => void;
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

  const aspectRatioPadding = '86.96%';

  return (
    <div
      className={`relative rounded-xl border-2 ${borderColorClass} ${bgColorClass} shadow-md overflow-hidden`}
      onDrop={isEditMode ? onDropCourse : undefined}
      onDragOver={isEditMode ? onDragOverCourse : undefined}
    >
      <div style={{ paddingBottom: aspectRatioPadding }}></div>
      <div className="absolute inset-0 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className={`font-bold text-base ${titleColorClass}`}>{title}</h4>
              <p className="text-xs text-gray-500">{semesterCredits} 학점</p>
            </div>
            {gpa && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${badgeColorClass}`}>
                GPA {gpa}
              </span>
            )}
          </div>

          <ul className="text-sm space-y-2">
            {courses.length > 0 ? (
              courses.map((course) => (
                <li
                  key={course.id}
                  className="bg-white px-3 py-2 rounded-lg border border-gray-200 text-gray-800 shadow-sm flex items-center justify-between"
                  draggable={isEditMode}
                  onDragStart={isEditMode ? () => onCourseDragStart(course.id) : undefined}
                >
                  <span className="flex items-center">
                    {status === 'taken' && <CheckIcon />}
                    {course.name}
                    {course.aiRecommended && <SparklingIcon />}
                  </span>
                  {isEditMode && (
                    <button
                      type="button"
                      className="ml-2 text-xs text-red-600 hover:text-red-700"
                      onClick={() => onCourseDelete(course.id)}
                    >
                      삭제
                    </button>
                  )}
                </li>
              ))
            ) : (
              <li className="text-gray-500 italic">수강한 강의 없음</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SemesterCard;
