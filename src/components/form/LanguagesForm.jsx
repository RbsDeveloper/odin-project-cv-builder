import { useState } from "react";
import { Languages, ChevronDown, Plus, Save, Pencil, Trash} from "lucide-react";

function LanguagesForm({ cvInfo , changeCv}) {
    const [isOpen, setOpen] = useState(false);

    function handleClick() {
        const languageId = crypto.randomUUID();

        changeCv((prevInfo) => ({
            ...prevInfo,
            languages: [
                ...prevInfo.languages, 
                {
                    id: languageId,
                    name: "",
                    proficiency: "",
                    isEditing: true,
                }
            ]
        }))
    }

    function toggleAccordion() {
        setOpen(!isOpen)
    }

    const isCurrentlyEditingSomething = cvInfo.languages.some(lang => lang.isEditing);

    return (

        <div className="accordion">
            <div className="accordion_header" onClick={toggleAccordion}>
                <h2><Languages></Languages> Languages</h2>
                <ChevronDown></ChevronDown>
            </div>
            {isOpen && (
                 <div className="accordion_panel">
                    <div className="formContainer">
                        {cvInfo.languages.map((lang) => <CreateLanguageForm key={lang.id} langInfo={lang} changeCv={changeCv}></CreateLanguageForm>)}
                    </div>
                    <button
                        onClick={handleClick}
                        type="button"
                        disabled={isCurrentlyEditingSomething}
                        className={isCurrentlyEditingSomething ? "btn-disable" : "btn-add"}
                    >
                        <Plus></Plus> Add Language
                    </button>
                </div>
            )}
        </div>

    )
}

function CreateLanguageForm({langInfo, changeCv}) {
    const [isOpen, setOpen] = useState(true)

    function handleChange(e) {
        const {name, value} = e.target;

        changeCv((prevInfo)=> ({
            ...prevInfo,
            languages: prevInfo.languages.map((lang) => lang.id===langInfo.id ? {...lang, [name]: value} : lang)
        }))
    }

    function toggleEditSave() {
        changeCv((prevInfo) => ({
            ...prevInfo,
            languages: prevInfo.languages.map((lang)=> lang.id === langInfo.id ? {...lang, isEditing: !lang.isEditing} : lang)
        }))
    }

    function toggleAccordionSections(e) {
        e.stopPropagation()
        setOpen(!isOpen);
    }

    function handleDeletion(e) {
        e.stopPropagation()

        changeCv((prevInfo) => ({
            ...prevInfo,
            languages: prevInfo.languages.filter((lang) => lang.id !== langInfo.id)
        }))
    }

    return (
        <div className="language_accordion">
            <div className="language_header" onClick={toggleAccordionSections}>
                <div className="header_left-Side">
                    <ChevronDown></ChevronDown>
                    <h2 className="language_title">{langInfo.name === "" ? "New Language" : langInfo.name}</h2>
                </div>
                <div className="header_right_side">
                    {langInfo.isEditing ? (
                        <button 
                            className="save_btn"
                            onClick={toggleEditSave}
                        >
                            <Save></Save>
                        </button>
                    ) : (
                        <button 
                            className="edit_btn"
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
                <form action=""
                    onSubmit={(e)=> e.preventDefault()}
                    style={{
                        pointerEvents: langInfo.isEditing ? "auto" : "none",
                        opacity: langInfo.isEditing ? 1 : 0.75
                    }}
                >
                    <input 
                        type="text" 
                        value={langInfo.name}
                        name="name"
                        id={`language-${langInfo.id}`}
                        onChange={handleChange}
                        placeholder="Language"
                    />
                    <select 
                        name="proficiency" 
                        id={`proficiency-${langInfo.id}`}
                        onChange={handleChange}
                    >
                        <option value="">Proficiency</option>
                        <option value="native">Native</option>
                        <option value="fluent">Fluent</option>
                        <option value="professional">Professional</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="basic">Basic</option>
                    </select>
                </form>
            </div>
            )}
        </div>
    )
}

export default LanguagesForm;