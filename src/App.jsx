import NavBar from './components/Nav'
import CvEditor from './components/CvEditor'
import CvPreview from './components/CvPreview'
import { useState } from 'react'
import './styles/App.css'
import './styles/layout.css'
import './styles/forms.css'

const sampleCv = {
    personalInfo: {
      profileImgUrl: "https://images.pexels.com/photos/15395870/pexels-photo-15395870.jpeg?_gl=1*114wdao*_ga*MTY3ODM2MTkxMy4xNzY5ODkyNjA4*_ga_8JE65Q40S6*czE3Nzk1Njk3NTgkbzIkZzEkdDE3Nzk1Njk4MzQkajU5JGwwJGgw",
      fullName: "Alex Morgan",
      email: "alex.morgan@email.com",
      phone: "+1 (555) 019-2834",
      location: "San Francisco, CA",
      linkedInUrl: "linkedin.com/in/alexmorgan",
      websiteUrl: "alexmorgan.dev",
      summary: "Passionate Frontend Developer with 2+ years of experience building responsive web applications.",
  },
  education: [
    {
      id: "edu-1",
      institution: "Odin Tech University",
      degree: "B.S. in Computer Science",
      location: "Remote",
      startDate: "2021-09",
      endDate: "2025-06",
      description: "Graduated with honors. Focused on web architecture.",
    }
  ],
  jobs: [
    {
      id: "job-1",
      company: "WebCraft Studio",
      position: "Frontend Developer",
      location: "Austin, TX",
      startDate: "2025-08",
      endDate: "",
      workHere: true,
      description: "Developing custom React components and optimization strategies.",
    }
  ],
  languages: [
    { id: "lang-1", name: "English", proficiency: "Native" },
    { id: "lang-2", name: "Spanish", proficiency: "Conversational" }
  ],
  skills: [
    { id: "skill-1", category: "Languages & Frameworks", skillsList: "JavaScript, React, Vite, CSS Modules" },
    { id: "skill-2", category: "Tools & Methods", skillsList: "Git, GitHub, Agile, Figma" }
  ],
  projects: [
    {
      id: "proj-1",
      projectName: "E-Commerce Dashboard",
      description: "A secure analytical metrics dashboard for tracking storefront sales data.",
      tech: ["React", "CSS Modules", "Chart.js"], 
      projectUrl: "github.com/alex/dashboard"
    }
  ],
  customization: {
    colorTheme: "modern",
    primaryColor: "#4f46e5",
    secondaryColor: "#1e293b",
    fontFamily: "Inter",
    layout: "modern"
  }
  }

  const emptyCv = {
      personalInfo: {
      profileImgUrl: "",
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedInUrl: "",
      websiteUrl: "",
      summary: "",
  },
  education: [
  ],
  jobs: [
  ],
  languages: [
  ],
  skills: [
  ],
  projects: [
  ],
  customization: {
    primaryColor: "#6366f1",
    secondaryColor: "#8b5cf6",
    fontFamily:"Inter",
    layout:"modern"
  }
  }



function App() {

  const [cv, setCv] = useState(emptyCv);
  const [isPreviewOpen, setPreview] = useState(false);

  function handleAutoFill() {
  setCv({...sampleCv});
};

  return (
    <>
      <NavBar isPreviewOpen={isPreviewOpen} setPreview={setPreview} onAutoFill={handleAutoFill}></NavBar>
      <main>
        <CvEditor cvInfo={cv} changeCv={setCv}></CvEditor>
        <CvPreview 
          cvInfo={cv}
          isPreviewOpen={isPreviewOpen}
          ></CvPreview>
      </main>
    </>
  )
}

export default App
