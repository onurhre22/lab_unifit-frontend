import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Main from "./pages/Main";
import Welcome from "./pages/Welcome";
import TeamProject from "./pages/TeamProject";
import JoinProject from "./pages/JoinProject";
import AutonomousRecruitment from "./pages/AutonomousRecruitment";
import Notification from "./pages/Notification";
import RecruitmentDetail from "./pages/RecruitmentDetail";
import TeamWorkspace from "./pages/TeamWorkspace";

import SignupRole from "./pages/SignupRole";
import ProfessorDashboard from "./pages/ProfessorDashboard";

// ✅ 전문가 신원 인증(교수/강사/멘토)
import ExpertVerify from "./pages/ExpertVerify";

import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* 첫 방문은 로그인으로 */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />

        {/* Signup */}
        <Route path="/signup-role" element={<SignupRole />} />
        <Route path="/expert-verify" element={<ExpertVerify />} />

        {/* Student */}
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/main" element={<Main />} />

        {/* Professor */}
        <Route path="/professor" element={<ProfessorDashboard />} />

        {/* Team Project */}
        <Route path="/team-project" element={<TeamProject />} />
        <Route path="/join-project" element={<JoinProject />} />
        <Route
          path="/autonomous-recruitment"
          element={<AutonomousRecruitment />}
        />
        <Route path="/team-workspace/:id" element={<TeamWorkspace />} />

        {/* Etc */}
        <Route path="/notifications" element={<Notification />} />
        <Route path="/recruitment/:id" element={<RecruitmentDetail />} />

        {/* 그 외는 로그인으로 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
