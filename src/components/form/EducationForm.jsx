import { GraduationCap, ChevronDown, Plus, Trash2, Save, Pencil } from "lucide-react";
import { useState } from "react";

function EducationForm({cvInfo, changeCv}) {

    const [isOpen, setOpen] = useState(false);
    

    function handleClick() {
        
            let educationId = crypto.randomUUID()

            changeCv((prevInfo) => ({
                ...prevInfo,
                education: [
                    ...prevInfo.education,
                    {
                        id: educationId,
                        institution:"",
                        degree:"",
                        location:"",
                        startDate:"",
                        endDate:"",
                        description:"",
                        isEditing: true,
                    }
                ]
            }));
        console.log(cvInfo)
    }

    function toggleAccordion() {
        setOpen(!isOpen);
    }

    const isCurrentlyEditingSomething = cvInfo.education.some(edu => edu.isEditing === true);

    return (
        <div className="accordion">
            <div className="accordion_header" onClick={toggleAccordion}>
                <h2><GraduationCap /> Education</h2>
                <ChevronDown></ChevronDown>
            </div>
            {isOpen && (
                <div className="accordion_panel">
                    <div className="formContainer">
                        {cvInfo.education.map((edu)=> <CreateForm key={edu.id} eduInfo={edu} changeCv={changeCv}></CreateForm>)}
                    </div>
                    <button 
                        onClick={handleClick}
                        type="button"
                        disabled={isCurrentlyEditingSomething}
                        className={isCurrentlyEditingSomething ? "btn-disable" : "btn-add"}
                    >
                        <Plus></Plus> Add Education
                    </button>
            </div>
            )}
        </div>
    )
}

function CreateForm({eduInfo, changeCv}) {

    const [isOpen, setOpen] = useState(true);

    function handleChange(e) {
        const {name, value} = e.target;

        changeCv((prevInfo) => ({
            ...prevInfo,
            education: prevInfo.education.map((item) => 
                item.id === eduInfo.id ? {...item, [name]:value} : item
            )
        }))
    }
    
    function toggleEditSave() {
        changeCv((prevInfo)=>({
            ...prevInfo,
            education: prevInfo.education.map((item) =>
            item.id === eduInfo.id ? {...item, isEditing: !item.isEditing}:item)
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
            education: prevInfo.education.filter((eduObj) => eduObj.id !== eduInfo.id)
        }))
    }

    

    return (

        <div className="education_accordion" id={`edu-${eduInfo.id}`}>
            <div className="education_header" onClick={toggleAccordionSections}>
                <div className="header_left_side">
                    <ChevronDown></ChevronDown>
                    <h2 className="education_title">{eduInfo.institution !== "" ? eduInfo.institution : "New education"}</h2>
                </div>
                <div className="header_right_side">
                    
                    {eduInfo.isEditing ? (
                        <button className="edit_save_btn" onClick={toggleEditSave}><Save /></button>
                    ):(
                        <button className="edit_save_btn" onClick={toggleEditSave}><Pencil /></button>
                    )}
                    <button className="delete_btn" onClick={handleDeletion}><Trash2 /></button>
                </div>
            </div>
            {isOpen && (
                <div className="accordion_body">
                <form 
                    onSubmit={(e) => e.preventDefault()} 
                    style={{
                        pointerEvents: eduInfo.isEditing ? "auto" : "none",
                        opacity: eduInfo.isEditing ? 1 : 0.75
                    }}
                >
            <label htmlFor={`institution-${eduInfo.id}`}>Institution</label>
            <input 
                type="text" 
                id={`institution-${eduInfo.id}`} 
                name="institution" 
                onChange={handleChange}
                value={eduInfo.institution} />

            <label htmlFor={`degree-${eduInfo.id}`}>Degree</label>
            <input 
                type="text" 
                id={`degree-${eduInfo.id}`} 
                name="degree" 
                onChange={handleChange} 
                value={eduInfo.degree}/>

            <label htmlFor={`location-${eduInfo.id}`}>Location</label>
            <input 
                type="text" 
                id={`location-${eduInfo.id}`} 
                name="location" 
                onChange={handleChange} 
                value={eduInfo.location}/>

            <div className="date_group">
                <div className="form_group">
                    <label htmlFor={`startDate-${eduInfo.id}`}>Start Date</label>
                    <input 
                        type="month" 
                        id={`startDate-${eduInfo.id}`}
                        name="startDate" 
                        onChange={handleChange} 
                        value={eduInfo.startDate}/>
                </div>

                <div className="form_group">
                    <label htmlFor={`endDate-${eduInfo.id}`}>End Date</label>
                    <input 
                        type="month" 
                        id={`endDate-${eduInfo.id}`}
                        name="endDate" 
                        onChange={handleChange} 
                        value={eduInfo.endDate}/>
                </div>
            </div >

            <label htmlFor={`description-${eduInfo.id}`}>description</label>
            <textarea 
                name="description"
                id={`description-${eduInfo.id}`}
                onChange={handleChange} 
                value={eduInfo.description}></textarea>
        </form>
            </div>
            )}
            
        </div>

        
    )
}

export default EducationForm;

