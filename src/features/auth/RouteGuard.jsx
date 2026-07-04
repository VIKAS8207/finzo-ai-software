import { Navigate } from 'react-router-dom';

export default function RouteGuard({ children }) {
  // Synchronously check local storage. 
  // If 'finzo_setup_complete' is not 'true', they are a new user.
  const isSetupComplete = localStorage.getItem('finzo_setup_complete') === 'true';

  if (!isSetupComplete) {
    // SCENE A: Kick them to the setup flow
    return <Navigate to="/onboarding" replace />;
  }

  // SCENE B: Allow them into the Dashboard
  return children;
}