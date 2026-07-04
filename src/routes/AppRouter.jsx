import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Public & Auth Imports
import LoginPage from '../features/auth/LoginPage';
import LoadingScreen from '../components/ui/LoadingScreen';
import OnboardingPage from '../features/onboarding/OnboardingPage';

// Layout & Feature Imports
import DashboardLayout from '../components/layout/DashboardLayout';
import DashboardPage from '../features/dashboard/DashboardPage';
import UploadDocumentPage from '../features/portfolio/UploadDocumentPage';
import AiAssistantPage from '../features/ai/AiAssistantPage';
import AiChatPage from '../features/ai/AiChatPage';
import WorkflowPage from '../features/workflow/WorkflowPage';

// --- IMPORT THE MIDDLEWARE HERE ---
import RouteGuard from '../features/auth/RouteGuard';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* --- UNPROTECTED ROUTES --- */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/loading" element={<LoadingScreen />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        
        {/* --- PROTECTED ROUTES (The Magic Gate) --- */}
        {/* By wrapping DashboardLayout in RouteGuard, every single page inside it is protected! */}
        <Route 
          element={
            <RouteGuard>
              <DashboardLayout />
            </RouteGuard>
          }
        >
          {/* Active Dashboard Pages */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/portfolio/upload" element={<UploadDocumentPage />} />
          <Route path="/ai" element={<AiAssistantPage />} />
          <Route path="/ai/chat" element={<AiChatPage />} />
          <Route path="/workflow" element={<WorkflowPage />} />
        </Route>

        {/* Catch-all to push random URLs to the dashboard (where RouteGuard will check them) */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}