import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import GraduationChecklistCard from '../components/GraduationChecklistCard';
import SemesterCard from '../components/SemesterCard';

type Course = {
  id: string;
  name: string;
  professor: string;
  courseCode: string;
  completionType: string;
  credits: number;
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
  const [dragPayload, setDragPayload] = useState<DragPayload | null>(null);
  
  // 조회/편집 모드 및 시뮬레이션 관련 상태
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSimulationMode, setIsSimulationMode] = useState(false);
  const [snapshot, setSnapshot] = useState<{ semesters: Semester[]; storedCourses: Course[] } | null>(null);

  const [semesters, setSemesters] = useState<Semester[]>([
    {
      id: 's1',
      title: '1학년 1학기',
      status: 'taken',
      semesterCredits: 9,
      gpa: '4.0',
      courses: [
        { id: 's1c1', name: '프로그래밍기초', professor: '김철수', courseCode: 'CS101', completionType: '전공필수', credits: 3 },
        { id: 's1c2', name: '미적분학', professor: '이영희', courseCode: 'MATH101', completionType: '교양필수', credits: 3 },
        { id: 's1c3', name: '선형대수', professor: '박지성', courseCode: 'MATH102', completionType: '교양필수', credits: 3 },
      ],
    },
    {
      id: 's2',
      title: '1학년 2학기',
      status: 'taken',
      semesterCredits: 12,
      gpa: '3.8',
      courses: [
        { id: 's2c1', name: '자료구조', professor: '정우성', courseCode: 'CS201', completionType: '전공필수', credits: 3 },
        { id: 's2c2', name: '이산수학', professor: '김태희', courseCode: 'CS202', completionType: '전공필수', credits: 3 },
        { id: 's2c3', name: '객체지향', professor: '한지민', courseCode: 'CS203', completionType: '전공필수', credits: 3, aiRecommended: true },
        { id: 's2c4', name: '영어회화', professor: 'James', courseCode: 'ENG101', completionType: '교양필수', credits: 3 },
      ],
    },
    {
      id: 's3',
      title: '2학년 1학기',
      status: 'current',
      semesterCredits: 12,
      gpa: '4.1',
      courses: [
        { id: 's3c1', name: '알고리즘', professor: '송중기', courseCode: 'CS301', completionType: '전공필수', credits: 3 },
        { id: 's3c2', name: '운영체제', professor: '공유', courseCode: 'CS302', completionType: '전공선택', credits: 3, aiRecommended: true },
        { id: 's3c3', name: '확률과통계', professor: '김혜수', courseCode: 'STAT201', completionType: '전공선택', credits: 3 },
        { id: 's3c4', name: '데이터베이스', professor: '조인성', courseCode: 'CS303', completionType: '전공필수', credits: 3 },
      ],
    },
    {
      id: 's4',
      title: '2학년 2학기',
      status: 'future',
      semesterCredits: 9,
      courses: [
        { id: 's4c1', name: '컴퓨터네트워크', professor: '유해진', courseCode: 'CS304', completionType: '전공선택', credits: 3 },
        { id: 's4c2', name: '인공지능개론', professor: '이병헌', courseCode: 'CS305', completionType: '전공선택', credits: 3 },
        { id: 's4c3', name: '웹프로그래밍', professor: '전지현', courseCode: 'CS306', completionType: '전공선택', credits: 3 },
      ],
    },
    {
      id: 's5',
      title: '3학년 1학기',
      status: 'future',
      semesterCredits: 9,
      courses: [
        { id: 's5c1', name: '시스템프로그래밍', professor: '마동석', courseCode: 'CS401', completionType: '전공선택', credits: 3 },
        { id: 's5c2', name: '오토마타', professor: '손석구', courseCode: 'CS402', completionType: '전공선택', credits: 3 },
        { id: 's5c3', name: '소프트웨어공학', professor: '김고은', courseCode: 'CS403', completionType: '전공필수', credits: 3 },
      ],
    },
    {
      id: 's6',
      title: '3학년 2학기',
      status: 'future',
      semesterCredits: 9,
      courses: [
        { id: 's6c1', name: '컴파일러', professor: '이정재', courseCode: 'CS404', completionType: '전공선택', credits: 3 },
        { id: 's6c2', name: '학습 시스템', professor: '정호연', courseCode: 'CS405', completionType: '전공선택', credits: 3, aiRecommended: true },
        { id: 's6c3', name: '캡스톤디자인1', professor: '박보검', courseCode: 'CS406', completionType: '전공필수', credits: 3 },
      ],
    },
    {
      id: 's7',
      title: '4학년 1학기',
      status: 'future',
      semesterCredits: 9,
      courses: [
        { id: 's7c1', name: '클라우드 컴퓨팅', professor: '아이유', courseCode: 'CS407', completionType: '전공선택', credits: 3 },
        { id: 's7c2', name: '빅데이터 분석', professor: '수지', courseCode: 'CS408', completionType: '전공선택', credits: 3 },
        { id: 's7c3', name: '캡스톤디자인2', professor: '박보검', courseCode: 'CS409', completionType: '전공필수', credits: 3 },
      ],
    },
    {
      id: 's8',
      title: '4학년 2학기',
      status: 'future',
      semesterCredits: 6,
      courses: [
        { id: 's8c1', name: '창업과 법률', professor: '임시완', courseCode: 'LAW101', completionType: '교양선택', credits: 3 },
        { id: 's8c3', name: '졸업 프로젝트', professor: '박서준', courseCode: 'CS410', completionType: '전공선택', credits: 3, aiRecommended: true },
      ],
    },
  ]);

  const [storedCourses, setStoredCourses] = useState<Course[]>([]);

  useEffect(() => {
    const newCourses = sessionStorage.getItem('newCourses');
    if (newCourses) {
      setStoredCourses((prev) => [...prev, ...JSON.parse(newCourses)]);
      sessionStorage.removeItem('newCourses');
      setIsEditMode(true); // 새 과목 추가 시 편집 모드로 전환
    }
  }, []);

  // 시뮬레이션 제어 함수
  const startSimulation = () => {
    setSnapshot({ 
      semesters: JSON.parse(JSON.stringify(semesters)), 
      storedCourses: [...storedCourses] 
    });
    setIsSimulationMode(true);
    setIsEditMode(true); // 시뮬레이션 시 편집 가능하게 설정
  };

  const applySimulation = () => {
    setIsSimulationMode(false);
    setSnapshot(null);
    alert('시뮬레이션 결과가 로드맵에 반영되었습니다.');
  };

  const cancelSimulation = () => {
    if (snapshot) {
      setSemesters(snapshot.semesters);
      setStoredCourses(snapshot.storedCourses);
    }
    setIsSimulationMode(false);
    setSnapshot(null);
  };

  const handleDragOver = (event: React.DragEvent) => {
    if (!isEditMode) return;
    event.preventDefault();
  };

  const handleDragStartFromSemester = (semesterId: string, courseId: string) => {
    if (!isEditMode) return;
    setDragPayload({ source: 'semester', semesterId, courseId });
  };

  const handleDragStartFromStored = (courseId: string) => {
    if (!isEditMode) return;
    setDragPayload({ source: 'stored', courseId });
  };

  const handleDropToSemester = (targetSemesterId: string) => {
    if (!isEditMode || !dragPayload) return;

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
    if (!isEditMode || !dragPayload) return;

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
    if (!isEditMode) return;
    setSemesters((prev) =>
      prev.map((sem) =>
        sem.id === semesterId
          ? { ...sem, courses: sem.courses.filter((c) => c.id !== courseId) }
          : sem
      )
    );
  };

  const handleDeleteFromStored = (courseId: string) => {
    if (!isEditMode) return;
    setStoredCourses((prev) => prev.filter((c) => c.id !== courseId));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-800">AI 로드맵</h2>
            {isSimulationMode && (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700 animate-pulse">
                시뮬레이션 모드 활성화 중
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* 조회/편집 전환 버튼 */}
            {!isSimulationMode && (
              <div className="flex bg-slate-200 p-1 rounded-xl">
                <button
                  onClick={() => setIsEditMode(false)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition ${!isEditMode ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  조회
                </button>
                <button
                  onClick={() => setIsEditMode(true)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition ${isEditMode ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  편집
                </button>
              </div>
            )}

            <div className="flex items-center gap-3">
              {!isSimulationMode ? (
                <button
                  onClick={startSimulation}
                  className="flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700 hover:bg-indigo-100 transition ring-1 ring-indigo-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  로드맵 시뮬레이터 시작
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={cancelSimulation}
                    className="rounded-xl bg-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-300 transition"
                  >
                    취소(원복)
                  </button>
                  <button
                    onClick={applySimulation}
                    className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-700 shadow-md transition"
                  >
                    로드맵에 적용하기
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {isSimulationMode && (
          <div className="mb-6 rounded-2xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
            <strong>시뮬레이션 안내:</strong> 과목을 추가/제외하거나 이동하여 졸업 요건의 변화를 미리 확인해 보세요. [적용하기]를 누르면 실제 로드맵으로 저장됩니다.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <div className="md:col-span-2">
            {(isEditMode || isSimulationMode) && (
              <div
                className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 mb-6"
                onDrop={handleDropToStored}
                onDragOver={handleDragOver}
              >
                <h3 className="text-lg font-bold text-gray-800 mb-4">{isSimulationMode ? '시뮬레이션 입력 영역' : '미분류 과목'}</h3>
                <div className="flex gap-2 mb-4">
                  <Link to="/add-course" className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 text-center">
                    과목 추가 (탐색)
                  </Link>
                </div>
                <ul className="space-y-3">
                  {storedCourses.length > 0 ? (
                    storedCourses.map((course) => (
                      <li
                        key={course.id}
                        className="bg-white p-3 rounded-xl border border-gray-200 text-gray-800 shadow-sm transition hover:shadow-md"
                        draggable={isEditMode}
                        onDragStart={() => handleDragStartFromStored(course.id)}
                      >
                        <div className="flex items-start justify-between">
                          <Link 
                            to={`/course/${course.id}`}
                            className="flex-grow min-w-0 hover:text-indigo-600 transition"
                          >
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <span className="text-[9px] px-1.5 py-0.5 rounded-md border border-slate-200 bg-slate-50 font-bold text-slate-600">
                                {course.completionType || '미분류'}
                              </span>
                              <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md">
                                {course.credits || 0}학점
                              </span>
                            </div>

                            <div className="flex items-center text-[14px] font-extrabold leading-tight text-slate-900 truncate mb-1">
                              <span className="truncate">{course.name}</span>
                              {course.aiRecommended && (
                                <span className="ml-1 rounded bg-yellow-100 px-1 text-[10px] font-semibold text-yellow-700">AI</span>
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold text-indigo-600">{course.professor || '미지정'} 교수님</span>
                              <span className="text-[10px] text-slate-400 font-medium">{course.courseCode || 'CODE'}</span>
                            </div>
                          </Link>
                          <button
                            type="button"
                            className="ml-2 text-slate-300 hover:text-red-500 transition shrink-0"
                            onClick={() => handleDeleteFromStored(course.id)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500 italic text-sm">추가/제외할 과목이 없습니다.</li>
                  )}
                </ul>
              </div>
            )}
            
            <GraduationChecklistCard 
              semesters={semesters} 
              isSimulationMode={isSimulationMode}
            />
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
