import { useState } from "react";
import { Languages, ChevronDown, Plus} from "lucide-react";

function LanguagesForm({ cvInfo , changeCv}) {
    const [isOpen, setOpen] = useState(false);

    function handleClick() {
        const languageId = crypto.randomUUID();

        changeCv((prevInfo) => ({
            ...prevInfo,
            langauges: [
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

export default LanguagesForm;