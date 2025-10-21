import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import FeaturedProjects from './sections/FeaturedProjects';
import SkillsSection from './sections/SkillsSection';
import ContactCTA from './sections/ContactCTA';

export default function ModernHero() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <FeaturedProjects />
      <SkillsSection />
      <ContactCTA />
    </div>
  );
}
