import PersonalInfoForm from "./PersonalInfoForm.jsx";
import EducationForm from "./EducationForm.jsx";
import WorkForm from "./WorkForm.jsx";
import LanguagesForm from "./LanguagesForm.jsx";
import SkillsForm from "./SkillsForm.jsx";

function CvEditor({cvInfo, changeCv}) {
    return (
        <div className="editor-wrapper">
            <PersonalInfoForm cvInfo={cvInfo} changeCv={changeCv}></PersonalInfoForm>
            <EducationForm cvInfo={cvInfo} changeCv={changeCv}></EducationForm>
            <WorkForm cvInfo={cvInfo} changeCv={changeCv}></WorkForm>
            <LanguagesForm cvInfo={cvInfo} changeCv={changeCv}></LanguagesForm>
            <SkillsForm cvInfo={cvInfo} changeCv={changeCv}></SkillsForm>
        </div>
    )
}

export default CvEditor;