import { useState } from "react";
import { Code, ChevronDown, ChevronUp, Plus, Save, Trash, Pencil } from "lucide-react"

function SkillsForm({cvInfo, changeCv}) {

    const [isOpen, setOpen] = useState(false);

    function handleClick()  {
        const skillCategoryId = crypto.randomUUID();

        changeCv((prevInfo) => ({
            ...prevInfo,
            skills: [
                ...prevInfo.skills,
                {
                    id: skillCategoryId,
                    category: "",
                    skillsList: "",
                    isEditing: true,
                }
            ]
        }))
    }

    function toggleAccordion() {
        setOpen(!isOpen)
    }

    const isCurrentlyEditingSomething = cvInfo.skills.some((skill) => skill.isEditing);

    return (
        <div className="accordion">
            <div className="accordion_header" onClick={toggleAccordion}>
                <h2><Code></Code> Skills</h2>
                <ChevronDown></ChevronDown>
            </div>

            {isOpen && (
                <div className="accordion_panel">
                    <div className="formContainer">
                        {cvInfo.skills.map((skill) => <CreateSkillForm key={skill.id} skillInfo={skill} changeCv={changeCv}></CreateSkillForm>)}
                    </div>

                    <button
                        type="button"
                        onClick={handleClick}
                        disabled = {isCurrentlyEditingSomething}
                        className={isCurrentlyEditingSomething ? "btn-disabled" : "btn-add"}
                    > 
                        <Plus></Plus>
                        Add Skill Category
                    </button>
                </div>
            )}
        </div>
    )
}

function CreateSkillForm({ skillInfo, changeCv}) {
    const [isOpen, setOpen]= useState(true);

    function handleChange(e) {
        const {name, value} = e.target;

        changeCv((prevInfo) => ({
            ...prevInfo,
            skills: prevInfo.skills.map((skill) => skill.id === skillInfo.id ? {...skill, [name]: value}: skill)
        }))
    }

    function toggleEditSave(e) {
        e.stopPropagation()

        changeCv((prevInfo) => ({
            ...prevInfo,
            skills: prevInfo.skills.map((skill) => skill.id === skillInfo.id ? {...skill, isEditing: !skill.isEditing} : skill )
        }))
    }

    function handleDeletion(e) {
        e.stopPropagation()

        changeCv((prevInfo) => ({
            ...prevInfo,
            skills: prevInfo.skills.filter((skill) => skill.id !== skillInfo.id)
        }))
    }

     function toggleAccordionSections(e) {
        e.stopPropagation()
        setOpen(!isOpen);
    }


    return (
        <div className="skill_accordion">
            <div className="skill_header" onClick={toggleAccordionSections}>
                <div className="header_left_side">
                    <ChevronUp></ChevronUp>
                    <h2>{skillInfo.category === "" ? "New Skill Category" : skillInfo.category }</h2>
                </div>
                <div className="header_right_side">

                    {skillInfo.isEditing ? (
                        <button
                            className="save-btn"
                            onClick={toggleEditSave}
                        >
                            <Save></Save>
                        </button>
                    ) : (
                        <button
                            className="edit-btn"
                            onClick={toggleEditSave}
                        >
                            <Pencil></Pencil>
                        </button>
                    )}

                    <button
                        className="delete_btn"
                        onClick={handleDeletion}
                    >
                        <Trash></Trash>
                    </button>
                    
                </div>
            </div>
            {isOpen && (
                <div className="accordion_body">
                    <form 
                        onSubmit={(e)=> e.preventDefault()}
                        style={{
                            pointerEvents: skillInfo.isEditing ? "auto" : "none",
                            opacity: skillInfo.isEditing ? 1 : 0.75
                        }}
                    >
                        <input 
                            type="text"
                            placeholder="Category (e.g., Frontend, Backend, Tools)" 
                            id={`category-${skillInfo.id}`} 
                            value={skillInfo.category}
                            name="category" 
                            onChange={handleChange}   
                        />
                        <input 
                            type="text" 
                            placeholder="Skills (comma-separated)" 
                            id={`skills-${skillInfo.id}`} 
                            value={skillInfo.skillsList}
                            name="skillsList"
                            onChange={handleChange}
                        />
                    </form>
                </div>
            )}
        </div>
    )
}

export default SkillsForm