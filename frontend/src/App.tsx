import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Welcome from "./pages/Welcome.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 첫 방문은 로그인으로 */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/main" element={<Main />} />

        {/* 그 외는 로그인으로 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
