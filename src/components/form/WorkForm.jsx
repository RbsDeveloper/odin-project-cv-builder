import { useState } from "react"
import { Briefcase, ChevronDown, Plus } from "lucide-react"

function WorkForm({cvInfo, changeCv}) {

    const [isOpen, setOpen] = useState(false);

    function toggleAccordion() {
        setOpen(!isOpen);
    }

    function handleClickAddBtn() {
        const workId = crypto.randomUUID();

        changeCv((prevInfo) => ({
            ...prevInfo,
            jobs:[
                ...prevInfo.jobs,
                {
                    id:workId,
                    company:"",
                    position:"",
                    location:"",
                    startDate:"",
                    endDate:"",
                    workHere:false,
                    description:"",
                    isEditing: true,
                }
            ]
        }))
    }

    const isCurrentlyEditingSomething = cvInfo.jobs.some(job=> job.isEditing === true);

    return (
        <div className="accordion">
            <div className="accordion_header" onClick={toggleAccordion}>
                <h2><Briefcase></Briefcase> Work Experience</h2>
                <ChevronDown></ChevronDown>
            </div>

            {isOpen && (
                <div className="accordion_panel">
                    <div className="formContainer">

                    </div>
                    <button
                        onClick={handleClickAddBtn}
                        type="button"
                        disabled={isCurrentlyEditingSomething}
                        className={isCurrentlyEditingSomething ? "btn_disabled" : "btn_enabled"}
                    >
                        <Plus></Plus> Add Work Experience
                    </button>
                </div>
            )}
        </div>
    )
}

export default WorkForm;