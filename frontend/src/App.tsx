import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Welcome from "./pages/Welcome.tsx";
import TeamProject from "./pages/TeamProject.tsx";
import JoinProject from "./pages/JoinProject.tsx";
import AutonomousRecruitment from "./pages/AutonomousRecruitment.tsx";
import Footer from "./components/Footer.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* 
        NOTE: 각 페이지 컴포넌트(Login, Main, Welcome)가 min-h-screen을 가지고 있어
        자체적으로 전체 화면 높이를 차지합니다. 푸터는 각 페이지의 컨텐츠 아래에 자연스럽게 표시됩니다.
        보다 복잡한 레이아웃(예: sticky footer)이 필요하다면, 
        여기서 div로 감싸고 flex-grow와 같은 Tailwind 클래스를 사용해 구조를 잡아야 합니다.
      */}
      <Routes>
        {/* 첫 방문은 로그인으로 */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/main" element={<Main />} />
        <Route path="/team-project" element={<TeamProject />} />
        <Route path="/join-project" element={<JoinProject />} />
        <Route path="/autonomous-recruitment" element={<AutonomousRecruitment />} />

        {/* 그 외는 로그인으로 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
