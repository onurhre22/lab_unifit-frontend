import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import GraduationChecklistCard from '../components/GraduationChecklistCard';
import SemesterCard from '../components/SemesterCard';

type Course = {
  id: string;
  name: string;
  aiRecommended?: boolean;
};

type Semester = {
  id: string;
  title: string;
  status: 'taken' | 'current' | 'future';
  semesterCredits: number;
  gpa?: string;
  courses: Course[];
};

type DragPayload = {
  source: 'stored' | 'semester';
  courseId: string;
  semesterId?: string;
};

const CurriculumRoadmap: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [dragPayload, setDragPayload] = useState<DragPayload | null>(null);

  const [semesters, setSemesters] = useState<Semester[]>([
    {
      id: 's1',
      title: '1학년 1학기',
      status: 'taken',
      semesterCredits: 9,
      gpa: '4.0',
      courses: [
        { id: 's1c1', name: '프로그래밍기초' },
        { id: 's1c2', name: '미적분학' },
        { id: 's1c3', name: '선형대수' },
      ],
    },
    {
      id: 's2',
      title: '1학년 2학기',
      status: 'taken',
      semesterCredits: 12,
      gpa: '3.8',
      courses: [
        { id: 's2c1', name: '자료구조' },
        { id: 's2c2', name: '이산수학' },
        { id: 's2c3', name: '객체지향', aiRecommended: true },
      ],
    },
    {
      id: 's3',
      title: '2학년 1학기',
      status: 'current',
      semesterCredits: 9,
      gpa: '4.1',
      courses: [
        { id: 's3c1', name: '알고리즘' },
        { id: 's3c2', name: '운영체제', aiRecommended: true },
        { id: 's3c3', name: '확률과통계' },
      ],
    },
    {
      id: 's4',
      title: '2학년 2학기',
      status: 'future',
      semesterCredits: 12,
      courses: [
        { id: 's4c1', name: '컴퓨터네트워크' },
        { id: 's4c2', name: '데이터베이스' },
        { id: 's4c3', name: '인공지능개론' },
      ],
    },
    {
      id: 's5',
      title: '3학년 1학기',
      status: 'future',
      semesterCredits: 9,
      courses: [
        { id: 's5c1', name: '시스템프로그래밍' },
        { id: 's5c2', name: '오토마타' },
        { id: 's5c3', name: '소프트웨어공학' },
      ],
    },
    {
      id: 's6',
      title: '3학년 2학기',
      status: 'future',
      semesterCredits: 12,
      courses: [
        { id: 's6c1', name: '컴파일러' },
        { id: 's6c2', name: '학습 시스템', aiRecommended: true },
        { id: 's6c3', name: '캡스톤디자인1' },
      ],
    },
    {
      id: 's7',
      title: '4학년 1학기',
      status: 'future',
      semesterCredits: 9,
      courses: [
        { id: 's7c1', name: '클라우드 컴퓨팅' },
        { id: 's7c2', name: '빅데이터 분석' },
        { id: 's7c3', name: '캡스톤디자인2' },
      ],
    },
    {
      id: 's8',
      title: '4학년 2학기',
      status: 'future',
      semesterCredits: 9,
      courses: [
        { id: 's8c1', name: '창업과 법률' },
        { id: 's8c2', name: '이러닝 특론' },
        { id: 's8c3', name: '졸업 프로젝트', aiRecommended: true },
      ],
    },
  ]);

  const [storedCourses, setStoredCourses] = useState<Course[]>([]);

  useEffect(() => {
    const newCourses = sessionStorage.getItem('newCourses');
    if (newCourses) {
      setStoredCourses((prev) => [...prev, ...JSON.parse(newCourses)]);
      sessionStorage.removeItem('newCourses');
    }

    const enableEditMode = sessionStorage.getItem('enableEditMode');
    if (enableEditMode === 'true') {
      setIsEditMode(true);
      sessionStorage.removeItem('enableEditMode');
    }
  }, []);

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDragStartFromSemester = (semesterId: string, courseId: string) => {
    setDragPayload({ source: 'semester', semesterId, courseId });
  };

  const handleDragStartFromStored = (courseId: string) => {
    setDragPayload({ source: 'stored', courseId });
  };

  const handleDropToSemester = (targetSemesterId: string) => {
    if (!dragPayload) return;

    if (dragPayload.source === 'stored') {
      const course = storedCourses.find((c) => c.id === dragPayload.courseId);
      if (!course) return;

      setStoredCourses((prev) => prev.filter((c) => c.id !== dragPayload.courseId));
      setSemesters((prev) =>
        prev.map((sem) =>
          sem.id === targetSemesterId
            ? { ...sem, courses: [...sem.courses, course] }
            : sem
        )
      );
      setDragPayload(null);
      return;
    }

    if (dragPayload.source === 'semester' && dragPayload.semesterId) {
      if (dragPayload.semesterId === targetSemesterId) {
        setDragPayload(null);
        return;
      }

      let movedCourse: Course | null = null;
      setSemesters((prev) => {
        const withoutCourse = prev.map((sem) => {
          if (sem.id !== dragPayload.semesterId) return sem;
          const remaining = sem.courses.filter((c) => {
            if (c.id === dragPayload.courseId) {
              movedCourse = c;
              return false;
            }
            return true;
          });
          return { ...sem, courses: remaining };
        });

        if (!movedCourse) return prev;

        return withoutCourse.map((sem) =>
          sem.id === targetSemesterId
            ? { ...sem, courses: [...sem.courses, movedCourse as Course] }
            : sem
        );
      });

      setDragPayload(null);
    }
  };

  const handleDropToStored = () => {
    if (!dragPayload) return;

    if (dragPayload.source === 'stored') {
      setDragPayload(null);
      return;
    }

    if (dragPayload.source === 'semester' && dragPayload.semesterId) {
      let movedCourse: Course | null = null;
      setSemesters((prev) => {
        const withoutCourse = prev.map((sem) => {
          if (sem.id !== dragPayload.semesterId) return sem;
          const remaining = sem.courses.filter((c) => {
            if (c.id === dragPayload.courseId) {
              movedCourse = c;
              return false;
            }
            return true;
          });
          return { ...sem, courses: remaining };
        });
        return withoutCourse;
      });

      if (movedCourse) {
        setStoredCourses((prev) => [...prev, movedCourse as Course]);
      }
    }

    setDragPayload(null);
  };

  const handleDeleteFromSemester = (semesterId: string, courseId: string) => {
    setSemesters((prev) =>
      prev.map((sem) =>
        sem.id === semesterId
          ? { ...sem, courses: sem.courses.filter((c) => c.id !== courseId) }
          : sem
      )
    );
  };

  const handleDeleteFromStored = (courseId: string) => {
    setStoredCourses((prev) => prev.filter((c) => c.id !== courseId));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">AI 로드맵</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">편집 모드</span>
            <label htmlFor="edit-mode-toggle" className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="edit-mode-toggle"
                className="sr-only peer"
                checked={isEditMode}
                onChange={() => setIsEditMode(!isEditMode)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <div className="md:col-span-2">
            {isEditMode && (
              <div
                className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 mb-6"
                onDrop={handleDropToStored}
                onDragOver={handleDragOver}
              >
                <h3 className="text-lg font-bold text-gray-800 mb-4">미분류 과목</h3>
                <div className="flex gap-2 mb-4">
                  <Link to="/add-course" className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 text-center">
                    과목 추가
                  </Link>
                </div>
                <ul className="space-y-2">
                  {storedCourses.length > 0 ? (
                    storedCourses.map((course) => (
                      <li
                        key={course.id}
                        className="bg-white px-3 py-2 rounded-lg border border-gray-200 text-gray-800 shadow-sm flex items-center justify-between"
                        draggable
                        onDragStart={() => handleDragStartFromStored(course.id)}
                      >
                        <span>{course.name}</span>
                        <button
                          type="button"
                          className="ml-2 text-xs text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteFromStored(course.id)}
                        >
                          삭제
                        </button>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500 italic">미분류된 과목이 없습니다.</li>
                  )}
                </ul>
              </div>
            )}
            <GraduationChecklistCard />
          </div>
          <div className="md:col-span-4">
            <div className="grid grid-cols-2 gap-6">
              {semesters.map((semester) => (
                <SemesterCard
                  key={semester.id}
                  title={semester.title}
                  status={semester.status}
                  courses={semester.courses}
                  semesterCredits={semester.semesterCredits}
                  gpa={semester.gpa}
                  isEditMode={isEditMode}
                  onCourseDragStart={(courseId) => handleDragStartFromSemester(semester.id, courseId)}
                  onCourseDelete={(courseId) => handleDeleteFromSemester(semester.id, courseId)}
                  onDropCourse={() => handleDropToSemester(semester.id)}
                  onDragOverCourse={handleDragOver}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurriculumRoadmap;
