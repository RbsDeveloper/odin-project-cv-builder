import { useState } from "react";
import { Plus, Folder, ChevronDown, Save, Pencil, Trash  } from "lucide-react";

function ProjectsForm({cvInfo, changeCv}) {

    const [isOpen, setOpen] = useState(false);
    

    function handleClick() {
        
            let projectId = crypto.randomUUID()

            changeCv((prevInfo) => ({
                ...prevInfo,
                projects: [
                    ...prevInfo.projects,
                    {
                        id: projectId,
                        projectName:"",
                        description:"",
                        tech:"",
                        projectUrl:"",
                        isEditing: true,
                    }
                ]
            }));
        console.log(cvInfo)
    }

    function toggleAccordion() {
        setOpen(!isOpen);
    }

    const isCurrentlyEditingSomething = cvInfo.projects.some(project => project.isEditing);

    return (
        <div className="accordion">
            <div className="accordion_header" onClick={toggleAccordion}>
                <h2><Folder /> Projects</h2>
                <ChevronDown></ChevronDown>
            </div>
            {isOpen && (
                <div className="accordion_panel">
                <div className="formContainer">
                    {cvInfo.projects.map((project)=> <CreateForm key={project.id} projectInfo={project} changeCv={changeCv}></CreateForm>)}
                </div>
                <button 
                    onClick={handleClick}
                    type="button"
                    disabled={isCurrentlyEditingSomething}
                    className={isCurrentlyEditingSomething ? "btn_disabled btn-add" : "btn_enabled btn-add"}
                >
                    <Plus></Plus> Add Project
                </button>
            </div>
            )}
        </div>
    )
}

function CreateForm({projectInfo, changeCv}) {

    const [isOpen, setOpen] = useState(true);

    function handleChange(e) {
        const {name, value} = e.target;

        changeCv((prevInfo) => ({
            ...prevInfo,
            projects: prevInfo.projects.map((item) => 
                item.id === projectInfo.id ? {...item, [name]:value} : item
            )
        }))
    }
    
    function toggleEditSave() {
        changeCv((prevInfo)=>({
            ...prevInfo,
            projects: prevInfo.projects.map((item) =>
            item.id === projectInfo.id ? {...item, isEditing: !item.isEditing}:item)
        }))
    }

    function toggleAccordionSections(e) {
        e.stopPropagation()
        setOpen(!isOpen);
    } 

    function handleDeletion(e) {
        e.stopPropagation()
        changeCv((prevInfo)=> ({
            ...prevInfo,
            projects: prevInfo.projects.filter((projectObj) => projectObj.id !== projectInfo.id)
        }))
    }

    

    return (

        <div className="project_accordion" id={`edu-${projectInfo.id}`}>
            <div className="project_header" onClick={toggleAccordionSections}>
                <div className="header_left_side">
                    <ChevronDown></ChevronDown>
                    <h2 className="project_title">{projectInfo.projectName !== "" ? projectInfo.projectName : "New project"}</h2>
                </div>
                <div className="header_right_side">
                    
                    {projectInfo.isEditing ? (
                        <button className="edit_save_btn" onClick={toggleEditSave}><Save /></button>
                    ):(
                        <button className="edit_save_btn" onClick={toggleEditSave}><Pencil /></button>
                    )}
                    <button className="delete_btn" onClick={handleDeletion}><Trash /></button>
                </div>
            </div>
            {isOpen && (
                <div className="accordion_body">
                    <form 
                        onSubmit={(e) => e.preventDefault()} 
                        style={{
                            pointerEvents: projectInfo.isEditing ? "auto" : "none",
                            opacity: projectInfo.isEditing ? 1 : 0.75
                        }}
                    >
                        <label htmlFor={`name-${projectInfo.id}`}>Name</label>
                        <input 
                            type="text" 
                            id={`name-${projectInfo.id}`} 
                            name="projectName" 
                            onChange={handleChange}
                            value={projectInfo.projectName} />

                        <label htmlFor={`description-${projectInfo.id}`}>description</label>
                        <textarea 
                            name="description"
                            id={`description-${projectInfo.id}`}
                            onChange={handleChange} 
                            value={projectInfo.description}></textarea>

                        <label htmlFor={`tech-${projectInfo.id}`}>Tech</label>
                        <input 
                            type="text" 
                            id={`tech-${projectInfo.id}`} 
                            name="tech" 
                            onChange={handleChange} 
                            value={projectInfo.tech}/>

                        <label htmlFor={`projectUrl-${projectInfo.id}`}>Project link</label>
                        <input 
                            type="url" 
                            id={`projectUrl-${projectInfo.id}`} 
                            name="projectUrl" 
                            onChange={handleChange} 
                            value={projectInfo.projectUrl}/>
                    </form>
            </div>
            )}
            
        </div>

    )
}

export default ProjectsForm