import PersonalInfoForm from "./PersonalInfoForm.jsx";
import EducationForm from "./EducationForm.jsx";

function CvEditor({cvInfo, changeCv}) {
    return (
        <div className="editor-wrapper">
            <PersonalInfoForm cvInfo={cvInfo} changeCv={changeCv}></PersonalInfoForm>
            <EducationForm cvInfo={cvInfo} changeCv={changeCv}></EducationForm>
        </div>
    )
}

export default CvEditor;