import './index.css';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { AboutSection } from './components/about/AboutSection';
import { ExperienceSection } from './components/experience/ExperienceSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { ResumeSection } from './components/resume/ResumeSection';

// Placeholder sections — will be built next
function PlaceholderSection({ id, label }: { id: string; label: string }) {
  return (
    <section
      id={id}
      className="min-h-screen flex items-center justify-center"
      style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
    >
      <p style={{ color: '#3F3F46', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
        {label} — coming soon
      </p>
    </section>
  );
}

function App() {
  return (
    <div className="dark" style={{ background: '#09090B', minHeight: '100vh' }}>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <PlaceholderSection id="blogs"      label="Blogs" />
        <ResumeSection />
        <PlaceholderSection id="contact"    label="Contact" />
      </main>
    </div>
  );
}

export default App;
