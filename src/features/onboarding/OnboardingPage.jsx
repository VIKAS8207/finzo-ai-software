import OnboardingLeftPanel from './OnboardingLeftPanel';
import OnboardingRightPanel from './OnboardingRightPanel';

export default function OnboardingPage() {
  return (
    <div className="min-h-screen w-full bg-[#050505] flex font-spline-sans overflow-hidden">
      <OnboardingLeftPanel />
      <OnboardingRightPanel />
    </div>
  );
}