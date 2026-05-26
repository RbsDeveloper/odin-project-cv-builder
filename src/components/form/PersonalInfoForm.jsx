import { User, ChevronDown, Upload, Mail, Globe, Phone, MapPinHouse, Link } from "lucide-react"
import { useState, useRef } from "react"

function PersonalInfoForm({cvInfo, changeCv}) {

    const [status, setStatus] = useState(false);

    function handleClick() {
        setStatus(!status);
    }

    return (
        <div className="accordion">
            <div className="accordion_header" onClick={handleClick}>
                <h2><User></User> Personl Information</h2>
                <ChevronDown></ChevronDown>
            </div>
            <div className="accordion_panel">
               {status && <CreateForm cvInfo={cvInfo} changeCv={changeCv}></CreateForm>}
            </div>
        </div>
    )
}

function CreateForm({cvInfo, changeCv}) {

    const fileInputRef = useRef(null)

    function handleChange(e) {
        const objectProperty=e.target.name;
        changeCv((prevInfo) => ({
            ...prevInfo,
            personalInfo: {
                ...prevInfo.personalInfo,
                [objectProperty]:e.target.value
            }
        }))
    }

    function handleLocalUpload(e) {
        const file = e.target.files[0];

        if(!file) return;

        const temporaryUrl = URL.createObjectURL(file);

        changeCv((prevInfo) => ({
            ...prevInfo,
            personalInfo: {
                ...prevInfo.personalInfo,
                profileImgUrl: temporaryUrl
            }
        }))
    }

    function triggerFileInput() {
        fileInputRef.current.click();
    }

    return (
        
         <form action="" onChange={handleChange}>
                    <div className="image_selector">
                        <div className="image_preview">
                            <User></User>
                        </div>
                        <fieldset>
                            <label htmlFor="upload_btn">Profile Photo</label>
                            <button id="upload_btn" type="button" onClick={triggerFileInput}><Upload></Upload> Upload</button>
                            <input type="file" ref={fileInputRef} onChange={handleLocalUpload} accept="image/*" style={{display: "none"}}/>
                            <input type="url" id="profile_url" name="profileImgUrl" onChange={handleChange} value={cvInfo.personalInfo.profileImgUrl}/>
                        </fieldset>
                    </div>

                    <label htmlFor="full_name"><User></User>Full Name</label>
                    <input type="text" id="full_name" placeholder="john Doe" name="fullName" onChange={handleChange} value={cvInfo.personalInfo.fullName || ""}/>
                    <fieldset>
                        <label htmlFor="email"><Mail></Mail>Email</label>
                        <input type="email" id="email" placeholder="john@email.com" name="email" onChange={handleChange} value={cvInfo.personalInfo.email || ""}/>

                        <label htmlFor="phone"><Phone></Phone>Phone</label>
                        <input type="tel" id="phone" name="phone" onChange={handleChange} value={cvInfo.personalInfo.phone || ""}/>

                        <label htmlFor="location"><MapPinHouse></MapPinHouse>Location</label>
                        <input type="text" id="location" placeholder="New York" name="location" onChange={handleChange} value={cvInfo.personalInfo.location || ""}/>

                        <label htmlFor="linkedIn_Profile"><Link></Link> LinkedIn</label>
                        <input type="url" id="linkedIn_Profile" name="linkedInUrl" onChange={handleChange} value={cvInfo.personalInfo.linkedInUrl || ""}/>

                    </fieldset>

                    <label htmlFor="website"><Globe></Globe>Website</label>
                    <input type="url" id="website" name="websiteUrl" onChange={handleChange} value={cvInfo.personalInfo.websiteUrl || ""}/>

                    <label htmlFor="summary">Professional Summary</label>
                    <textarea name="summary" id="summary" onChange={handleChange} value={cvInfo.personalInfo.summary || ""}></textarea>
                </form>
    )
}

export default PersonalInfoForm