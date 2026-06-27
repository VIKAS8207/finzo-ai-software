import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../features/auth/LoginPage';
import LoadingScreen from '../components/ui/LoadingScreen';
import DashboardLayout from '../components/layout/DashboardLayout';
import DashboardPage from '../features/dashboard/DashboardPage';

import UploadDocumentPage from '../features/portfolio/UploadDocumentPage';

import AiAssistantPage from '../features/ai/AiAssistantPage';
import AiChatPage from '../features/ai/AiChatPage';

import WorkflowPage from '../features/workflow/WorkflowPage';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/loading" element={<LoadingScreen />} />
        
        {/* Nested Dashboard Routing */}
        {/* The Layout wraps the content. Any route inside here automatically gets the navbars */}
        <Route element={<DashboardLayout />}>
          {/* Default dashboard view */}
          <Route path="/dashboard" element={<DashboardPage />} />

          <Route path="/portfolio/upload" element={<UploadDocumentPage />} />

          <Route path="/ai" element={<AiAssistantPage />} />
          <Route path="/ai/chat" element={<AiChatPage />} />

          <Route path="/workflow" element={<WorkflowPage />} />
          
          {/* Future pages will go here, e.g., <Route path="/dashboard/settings" element={<SettingsPage />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}