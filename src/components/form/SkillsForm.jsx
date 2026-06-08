import { useState } from "react";
import { Code, ChevronDown, Plus } from "lucide-react"

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
                    skillList: "",
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
                    <div className="formContainer"></div>

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

export default SkillsForm