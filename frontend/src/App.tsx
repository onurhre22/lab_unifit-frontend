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
import CurriculumRoadmap from "./pages/CurriculumRoadmap";
import AddCourse from "./pages/AddCourse";

import SignupRole from "./pages/SignupRole";
import ProfessorDashboard from "./pages/ProfessorDashboard";
import ProfessorCreateProject from "./pages/ProfessorCreateProject"; // ✅ 추가

import ExpertVerify from "./pages/ExpertVerify";

import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup-role" element={<SignupRole />} />
        <Route path="/expert-verify" element={<ExpertVerify />} />

        <Route path="/welcome" element={<Welcome />} />
        <Route path="/main" element={<Main />} />
        <Route path="/curriculum-roadmap" element={<CurriculumRoadmap />} />
        <Route path="/add-course" element={<AddCourse />} />

        {/* Professor */}
        <Route path="/professor" element={<ProfessorDashboard />} />
        <Route path="/professor/create-project" element={<ProfessorCreateProject />} /> {/* ✅ 추가 */}

        {/* Team Project (Student) */}
        <Route path="/team-project" element={<TeamProject />} />
        <Route path="/join-project" element={<JoinProject />} />
        <Route path="/autonomous-recruitment" element={<AutonomousRecruitment />} />
        <Route path="/team-workspace/:id" element={<TeamWorkspace />} />

        <Route path="/notifications" element={<Notification />} />
        <Route path="/recruitment/:id" element={<RecruitmentDetail />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}