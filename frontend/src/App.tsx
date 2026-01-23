import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 첫 진입 시 로그인 화면 */}
        <Route path="/login" element={<Login />} />

        {/* 로그인 이후 메인 화면 */}
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}
