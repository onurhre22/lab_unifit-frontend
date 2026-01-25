import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#283593] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Site Title */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-bold">UniFit</h3>
            <p className="mt-2 text-sm text-slate-300">
              AI 기반 학업 계획 및 진로 개발로 학생들의 성공을 지원합니다.
            </p>
          </div>

          {/* University Materials */}
          <div>
            <h4 className="font-semibold">대학자료</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-slate-300 hover:text-white">학사 일정</a></li>
              <li><a href="#" className="text-sm text-slate-300 hover:text-white">강좌 목록</a></li>
              <li><a href="#" className="text-sm text-slate-300 hover:text-white">학생 서비스</a></li>
              <li><a href="#" className="text-sm text-slate-300 hover:text-white">진로 센터</a></li>
            </ul>
          </div>

          {/* Shortcuts */}
          <div>
            <h4 className="font-semibold">바로가기</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-slate-300 hover:text-white">개인정보 처리방침</a></li>
              <li><a href="#" className="text-sm text-slate-300 hover:text-white">이용 약관</a></li>
              <li><a href="#" className="text-sm text-slate-300 hover:text-white">자주 묻는 질문</a></li>
              <li><a href="#" className="text-sm text-slate-300 hover:text-white">고객 지원</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold">연락처</h4>
            <ul className="mt-4 space-y-2">
              <li className="text-sm text-slate-300">문의: email@unifit.com</li>
              <li className="text-sm text-slate-300">전화: 02-1234-5678</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-700 pt-8 text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} UniFit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
