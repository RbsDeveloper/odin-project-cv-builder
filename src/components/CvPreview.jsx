import { Mail, Phone, Globe, MapPin, Link, ZoomOut, ZoomIn, Maximize2,  } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const PAGE_WIDTH = 794;
const DESKTOP_GUTTER = 48;
const MOBILE_GUTTER = 12;
const MIN_ZOOM = 0.3;
const MAX_ZOOM = 2;

// Helper to keep a number between min and max
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function CvPreview({cvInfo, isPreviewOpen, cvRef}) {

    const scrollRef = useRef(null);
    const [availableWidth, setAvailableWidth] = useState(PAGE_WIDTH);
    const [zoom, setZoom] = useState(null); // null = automatic Fit-to-Width

    useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      // Ignore width 0 when the mobile modal is closed (display: none)
      if (width > 0) {
        setAvailableWidth(width);
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Calculate the scale needed to fit 794px inside the current container
  const gutter = availableWidth < 600 ? MOBILE_GUTTER : DESKTOP_GUTTER;
  const fitScale = clamp((availableWidth - gutter * 2) / PAGE_WIDTH, 0.1, 1.2);
  const activeScale = zoom ?? fitScale;

  function stepZoom(delta) {
    // Round to 1 decimal place to avoid floating-point quirks like 0.7000000000000001
    const next = Math.round((activeScale + delta) * 10) / 10;
    setZoom(clamp(next, MIN_ZOOM, MAX_ZOOM));
  }
    
    return (
        <div className = {`cv_preview_modal ${isPreviewOpen? "active": ""}`}>
            <div className="preview_scroll" ref={scrollRef}>
                <div className="preview_stage" style={{ zoom: activeScale }}>
                    <article 
                className= {`a4-page ${cvInfo.customization.layout}`}
                style={{
                    "--cv-primary-color": cvInfo.customization.primaryColor,
                    "--cv-secondary-color": cvInfo.customization.secondaryColor,
                    "--cv-font-family":cvInfo.customization.fontFamily
                }}
                ref={cvRef}
            >
                <header>
                    {cvInfo.personalInfo.profileImgUrl && <div className="profileWrapper"><img src={cvInfo.personalInfo.profileImgUrl} alt="" /></div>}
                    <address>
                        <h1>{cvInfo.personalInfo.fullName}</h1>
                        <ul className="contactList">
                            <li><Mail className="contactIcon"></Mail><a href="mailto:...">{cvInfo.personalInfo.email}</a></li>
                            <li><Phone className="contactIcon"></Phone><a href="tel:...">{cvInfo.personalInfo.phone}</a></li>
                            <li><MapPin className="contactIcon"></MapPin>{cvInfo.personalInfo.location}</li>
                            <li><Link className="contactIcon"></Link><a href={cvInfo.personalInfo.linkedInUrl}>{cvInfo.personalInfo.linkedInUrl}</a></li>
                            <li><Globe className="contactIcon"></Globe><a href={cvInfo.personalInfo.websiteUrl}>{cvInfo.personalInfo.websiteUrl}</a></li>
                        </ul>
                    </address>
                </header>
                <div className="cvBody">
                    <section id="summary">
                        <h2>Professional Summary</h2>
                        <p>{cvInfo.personalInfo.summary}</p>
                    </section>
                    <section id="experience">
                        <h2>Work experience</h2>
                        <ul className="jobList">
                            {cvInfo.jobs.map(job=>{
                                return (
                                    <li key={job.id}>
                                        <div className="jobHeader">
                                            <div>
                                                <h3>{job.position}</h3>
                                                <strong>{job.company}</strong>
                                            </div>
                                            <div className="timeline">
                                                <div className="period">
                                                    <time>{job.startDate}</time> - <time>{job.workHere ? 'Present' : job.endDate}</time>
                                                </div>
                                                <span className="location">{job.location}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <p>{job.description}</p>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </section>
                    <section id="education">
                        <h2>Education</h2>
                        <ul className="educationList">
                            {
                                cvInfo.education.map(institute=>{
                                    return (
                                        <li key={institute.id}>
                                            <div className="studyHeader">
                                                <div>
                                                    <h3>{institute.degree}</h3>
                                                    <strong>{institute.institution}</strong>
                                                </div>
                                                <div className="timeline">
                                                    <div className="period">
                                                        <time>{institute.startDate}</time> - <time>{institute.endDate ? institute.endDate : "Present"}</time>
                                                    </div>
                                                    <span className="location">{institute.location}</span>
                                                </div>
                                            </div>
                                            <div>
                                                    <p>{institute.description}</p>
                                                </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </section>
                    <section id="skills">
                        <h2>Skills</h2>
                        <ul className="skillsList">
                            {
                                cvInfo.skills.map(skill=>{
                                    return (
                                        <li key={skill.id}>
                                        <span className="skillCategory">{skill.category}: </span> 
                                        {skill.skillsList} 
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </section>
                    <section id="projects">
                            <h2>Projects</h2>
                            <ul className="projectsList">
                                {
                                    cvInfo.projects.map(project=>{
                                        return (
                                            <li key={project.id}>
                                                <h3>{project.projectName}</h3>
                                                <p className="projectDescription">{project.description}</p>
                                                <p><span>Technologies: </span>{project.tech}</p>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                    </section>
                    <section>
                        <h2>Languages</h2>
                        <ul className="languagesList">
                            {cvInfo.languages.map(language=> {
                                return (
                                    <li key={language.id}>
                                        <p><span className="languageName">{language.name}</span> - {language.proficiency}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    </section>
                </div>
                    </article>
                </div>
            </div>
            

            {/*Floating Zoom Toolbar*/}

            <div className="preview_toolbar">
                <button 
                    className="zoom_btn"
                    title="Zoom Out"
                    disabled={activeScale <= MIN_ZOOM}
                    onClick={() => stepZoom(-0.1)}
                >
                    <ZoomOut></ZoomOut>
                </button>

                <span className="zoom_value">{Math.round(activeScale * 100)}%</span> 

                <button 
                    className="zoom_btn"
                    title="Zoom In"
                    disabled={activeScale >= MAX_ZOOM}
                    onClick={() => stepZoom(0.1)}
                >
                    <ZoomIn></ZoomIn>
                </button>

                <span className="toolbar_divider" />

                <button 
                    className={`zoom_btn ${zoom === null ? "is_active" : ""}`}
                    title="Fit to width"
                    onClick={() => setZoom(null)}
                >
                    <Maximize2></Maximize2>
                </button>
            </div>
        </div>
    )
};

export default CvPreview;