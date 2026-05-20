import NavBar from './components/nav'
import CvEditor from './components/CvEditor'
import CvPreview from './components/CvPreview'
import { useState } from 'react'
//import './App.css'

const sampleCv = {
    personalInfo: {
      profileImgUrl: "https://pixabay.com/photos/canoe-lake-adventure-kayak-2179196/",
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
      startDate: "2021",
      endDate: "2025",
      description: "Graduated with honors. Focused on web architecture.",
    }
  ],
  jobs: [
    {
      id: "job-1",
      company: "WebCraft Studio",
      position: "Frontend Developer",
      location: "Austin, TX",
      startDate: "2025",
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
    fontFamily: "Inter, sans-serif",
    layout: "modern"
  }
  }

function App() {

  const [cv, setCv] = useState(sampleCv);

  return (
    <>
      <NavBar></NavBar>
      <main>
        <CvEditor></CvEditor>
        <CvPreview cvInfo={cv}></CvPreview>
      </main>
    </>
  )
}

export default App
