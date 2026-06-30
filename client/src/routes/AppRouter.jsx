import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing/Landing";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import MeetingRoom from "../pages/Meeting/MeetingRoom";
import Profile from "../pages/Profile/Profile";
import NotFound from "../pages/NotFound/NotFound";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
        <Route path="/meeting/:roomId" element={<ProtectedRoute> <MeetingRoom /> </ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}