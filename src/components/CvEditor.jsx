import PersonalInfoForm from "./form/PersonalInfoForm.jsx";
import EducationForm from "./form/EducationForm.jsx";
import WorkForm from "./form/WorkForm.jsx";
import LanguagesForm from "./form/LanguagesForm.jsx";
import SkillsForm from "./form/SkillsForm.jsx";
import ProjectsForm from "./form/ProjectsForm.jsx";
import CustomizationForm from "./form/CustomizationForm.jsx";

function CvEditor({cvInfo, changeCv}) {
    return (
        <div className="editor-wrapper">
            <PersonalInfoForm cvInfo={cvInfo} changeCv={changeCv}></PersonalInfoForm>
            <EducationForm cvInfo={cvInfo} changeCv={changeCv}></EducationForm>
            <WorkForm cvInfo={cvInfo} changeCv={changeCv}></WorkForm>
            <LanguagesForm cvInfo={cvInfo} changeCv={changeCv}></LanguagesForm>
            <SkillsForm cvInfo={cvInfo} changeCv={changeCv}></SkillsForm>
            <ProjectsForm cvInfo={cvInfo} changeCv={changeCv}></ProjectsForm>
            <CustomizationForm cvInfo={cvInfo} changeCv={changeCv}></CustomizationForm>
        </div>
    )
}

export default CvEditor;