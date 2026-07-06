import OnboardingLeftPanel from './OnboardingLeftPanel';
import OnboardingRightPanel from './OnboardingRightPanel';

export default function OnboardingPage() {
  return (
    // CHANGE: 'min-h-screen' changed to 'h-screen' to lock the viewport
    <div className="h-screen w-full bg-[#050505] flex font-spline-sans overflow-hidden">
      <OnboardingLeftPanel />
      <OnboardingRightPanel />
    </div>
  );
}