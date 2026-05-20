function CvPreview({cvInfo}) {
    return (
        <div className="preview-wrapper">
            <article className="a4-page">
                <header>
                    <h1>{cvInfo.personalInfo.fullName}</h1>
                    {cvInfo.personalInfo.profileImgUrl && <div className="profileWrapper"><img src={cvInfo.personalInfo.profileImgUrl} alt="" /></div>}
                    <address>
                        <ul>
                            <li><a href="mailto:...">{cvInfo.personalInfo.email}</a></li>
                            <li><a href="tel:...">{cvInfo.personalInfo.phone}</a></li>
                            <li>{cvInfo.personalInfo.location}</li>
                            <li><a href={cvInfo.personalInfo.linkedInUrl}>{cvInfo.personalInfo.linkedInUrl}</a></li>
                            <li><a href={cvInfo.personalInfo.websiteUrl}>{cvInfo.personalInfo.websiteUrl}</a></li>
                        </ul>
                    </address>
                </header>
                <section id="summary">
                    <p>{cvInfo.personalInfo.summary}</p>
                </section>
                <section id="experience">
                    <h2>Work experience</h2>
                    <ul>
                        {cvInfo.jobs.map(job=>{
                            return (
                                <li key={job.id}>
                                    <div className="jobHeader">
                                        <div>
                                            <h3>{job.position}</h3>
                                            <strong>{job.company}</strong>
                                        </div>
                                        <div>
                                            <time>{job.startDate}</time> - <time>{job.workHere ? 'Present' : job.endDate}</time>
                                            <span>{job.location}</span>
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
                    <ul>
                        {
                            cvInfo.education.map(institute=>{
                                return (
                                    <li key={institute.id}>
                                        <div className="studyHeader">
                                            <div>
                                                <h3>{institute.degree}</h3>
                                                <strong>{institute.institution}</strong>
                                            </div>
                                            <div>
                                                <time>{institute.startDate}</time> - <time>{institute.endDate ? institute.endDate : "Present"}</time>
                                                <span>{institute.location}</span>
                                            </div>
                                            <div>
                                                <p>{institute.description}</p>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </section>
                <section id="skills">
                    <h2>Skills</h2>
                    <ul>
                        {
                            cvInfo.skills.map(skill=>{
                                return (
                                    <li key={skill.id}>
                                       <span className="skillCategory">{skill.category}</span> 
                                       {skill.skillsList} 
                                    </li>
                                )
                            })
                        }
                    </ul>
                </section>
                <section id="projects">
                        <h2>Projects</h2>
                        <ul>
                            {
                                cvInfo.projects.map(project=>{
                                    return (
                                        <li key={project.id}>
                                            <h3>{project.projectName}</h3>
                                            <p className="projectDescription">{project.description}</p>
                                            <p><span>Technologies: </span>{project.tech.join(", ")}</p>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                </section>
                <section>
                    <h2>Languages</h2>
                    <ul>
                        {cvInfo.languages.map(language=> {
                            return (
                                <li key={language.id}>
                                    <p><span>{language.name}</span>-{language.proficiency}</p>
                                </li>
                            )
                        })}
                    </ul>
                </section>
            </article>
        </div>
    )
};

export default CvPreview;