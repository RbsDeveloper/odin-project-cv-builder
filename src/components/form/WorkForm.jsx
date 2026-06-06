import { useState } from "react"
import { Briefcase, ChevronDown, Plus, Trash, Save } from "lucide-react"

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
                        {
                            cvInfo.jobs.map((job) => <CreateWorkForm key={job.id} jobInfo={job} changeCv={changeCv}></CreateWorkForm>)
                        }
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

function CreateWorkForm({ jobInfo, changeCv }) {

    function handleChange(e) {
        const{name, value} = e.target
        console.log(name)
        console.log(value)

        changeCv((prevInfo) => ({
            ...prevInfo,
            jobs:[
                ...prevInfo.jobs.map((item) => item.id === jobInfo.id ? {...item, [name]:value} : item),

            ]
        }))
    }

    return (
        <div className="job_accordion">
            <div className="job_header">
                <div className="header_left_side">
                    <ChevronDown></ChevronDown> 
                    <h2 className="job_title"></h2>
                </div>
                <div className="job_right_side">
                    <button className="edit_save_btn"><Save></Save></button>
                    <button className="delete_btn"><Trash></Trash></button>
                </div>
            </div>
            <div className="accordion_body">
                <form onSubmit={(e)=>e.preventDefault()}>
                    <label htmlFor={`company-${jobInfo.id}`}>Company</label>
                    <input 
                        type="text" 
                        id={`company-${jobInfo.id}`}
                        value={jobInfo.company}
                        name="company"
                        onChange={handleChange} 
                    />
                    
                    <label htmlFor={`position-${jobInfo.id}`}>Position</label>
                    <input 
                        type="text" 
                        id={`position-${jobInfo.id}`} 
                        value={jobInfo.position}
                        name="position"
                        onChange={handleChange}
                    />
                    
                    <label htmlFor={`location-${jobInfo.id}`}>Location</label>
                    <input 
                        type="text" 
                        id={`location-${jobInfo.id}`} 
                        value={jobInfo.location}
                        name="location"
                        onChange={handleChange}
                    />

                    <div className="date-group">
                        <div className="form-group">
                            <label htmlFor={`startDate-${jobInfo.id}`}>Start Date</label>
                            <input 
                                type="month" 
                                id={`startDate-${jobInfo.id}`} 
                                value={jobInfo.startDate}
                                name="startDate"
                                onChange={handleChange}
                            />   
                        </div>
                        <div className="form-group">
                            <label htmlFor={`endDate-${jobInfo.id}`}>End Date</label>
                            <input 
                                type="month"   
                                id={`endDate-${jobInfo.id}`}
                                value={jobInfo.endDate}
                                name="endDate"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <input 
                        type="checkbox" 
                        name="workhere" 
                        id={`workHere-${jobInfo.id}`} 
                        value={jobInfo.workHere}
                        onChange={handleChange}
                    />
                    <label htmlFor={`workHere-${jobInfo.id}`}>I currently work here</label>

                    <label htmlFor={`description-${jobInfo.id}`}>Description</label>
                    <textarea 
                        name="description" 
                        id={`description-${jobInfo.id}`}
                        value={jobInfo.description}
                        onChange={handleChange}    
                    ></textarea>
                </form>
            </div>
        </div>
    )
}

export default WorkForm;