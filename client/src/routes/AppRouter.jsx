import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing/Landing";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import MeetingRoom from "../pages/Meeting/MeetingRoom";
import Profile from "../pages/Profile/Profile";
import NotFound from "../pages/NotFound/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import CreateMeeting from "../pages/Meeting/CreateMeeting";
import JoinMeeting from "../pages/Meeting/JoinMeeting";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
        <Route path="/create-meeting" element={ <ProtectedRoute> <CreateMeeting /> </ProtectedRoute> }/>
        <Route path="/join-meeting" element={ <ProtectedRoute> <JoinMeeting /> </ProtectedRoute>}/> 
        <Route path="/meeting/:meetingId" element={ <ProtectedRoute> <MeetingRoom /> </ProtectedRoute> }/>
      </Routes>
    </BrowserRouter>
  );
}