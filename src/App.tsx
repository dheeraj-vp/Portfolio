import './index.css';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { AboutSection } from './components/about/AboutSection';
import { ExperienceSection } from './components/experience/ExperienceSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { BlogsSection } from './components/blogs/BlogsSection';
import { ResumeSection } from './components/resume/ResumeSection';
import { ContactSection } from './components/contact/ContactSection';

function App() {
  return (
    <div className="dark" style={{ background: '#09090B', minHeight: '100vh' }}>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <BlogsSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <Analytics />
    </div>
  );
}

export default App;
