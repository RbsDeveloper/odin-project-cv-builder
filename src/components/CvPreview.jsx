import { Mail, Phone, Globe, MapPin, Link  } from "lucide-react";


function CvPreview({cvInfo, isPreviewOpen}) {
    return (
        <div className = {`cv_preview_modal ${isPreviewOpen? "active": ""}`}>
            <article className="a4-page">
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
    )
};

export default CvPreview;