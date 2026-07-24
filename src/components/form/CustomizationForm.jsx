import { useState } from "react"
import { ChevronDown, Palette } from "lucide-react"


const btnThemeColors = [
    {
        combinationName: "Indigo Purple",
        firstColor: "#6366f1",
        secondColor: "#8b5cf6"
    },
    {
        combinationName : "Blue Ocean",
        firstColor: "#3b82f6",
        secondColor: "#06b6d4"
    },
    {
        combinationName: "Emerald Green",
        firstColor: "#10b981",
        secondColor: "#14b8a6"
    },
    {
        combinationName: "Rose Pink",
        firstColor: "#f43f5e",
        secondColor: "#ec4899"
    },
    {
        combinationName: "Orange Sunset",
        firstColor: "#f97316",
        secondColor: "#fb923c"
    },
    {
        combinationName: "Professional Navy",
        firstColor: "#1e3a8a",
        secondColor: "#3730a3"
    }
];

const layoutBtns = [
    {
        name: "Modern",
        description: "Colorful with gradients",
    },
    {
        name: "Classic",
        description: "Traditional layout",
    },
    {
        name:"Minimal",
        description:"Clean and simple",
    }
]


function CustomizationForm({cvInfo, changeCv}) {

    const [isOpen, setOpen] = useState(false)

    function  handleClick() {
        setOpen(!isOpen)
    }

    const { primaryColor, secondaryColor, layout } = cvInfo.customization;

    function updateColors(primary, secondary) {
        changeCv((prevInfo) => ({
            ...prevInfo,
            customization : {
                ...prevInfo.customization,
                primaryColor: primary,
                secondaryColor: secondary,
            }
        }))
    }

    function handleInputChange(e) {
        const {name, value} = e.target;
        if(name === "primaryC"){
            updateColors(value, secondaryColor)
        }else {
            updateColors(primaryColor, value)
        }
    }

    function handleSelectChange(e) {
        const { name, value} = e.target;

        changeCv((prevInfo) => ({
            ...prevInfo,
            customization: {
                ...prevInfo.customization,
                [name] : value,
            }
        }))

        console.log(cvInfo)
    }

    function handleLayoutClick(e) {
        const newLayout = e.currentTarget.dataset.layout;

        changeCv((prevInfo) => ({
            ...prevInfo,
            customization: {
                ...prevInfo.customization,
                layout: newLayout,
            }
        }))
    }

    return (
        <div className="accordion">
            <div className="accordion_header" onClick={handleClick}>
                <h2><Palette/> Customization</h2>
                <ChevronDown/>
            </div>
            {isOpen && (
                <div className="accordion_panel">
                    <div className="form_Container">
                        <div className="theme_btns">
                            <h4>Color Theme</h4>
                            <CreateThemeBtns currentPrimaryColor={primaryColor} currentSecondaryColor={secondaryColor} onSelectTheme={updateColors} ></CreateThemeBtns>
                        </div>
                        <div className="input_color_container">
                                <div className="color_picker">
                                    <label htmlFor="primary-picker">Primary Color</label>
                                    <div className="inputs">
                                        <input 
                                            type="color" 
                                            name="primaryC" 
                                            onChange={handleInputChange} 
                                            value={cvInfo.customization.primaryColor}
                                            id="primary-picker"
                                        />
                                        <input 
                                            type="text"
                                            value={cvInfo.customization.primaryColor}
                                            maxLength={7}
                                            onChange={handleInputChange}
                                            className="hex_text_input"
                                            name="primaryTextC"
                                        />
                                    </div>
                                </div>
                                <div className="color_picker">
                                    <label htmlFor="secondary-color">Secondary Color</label>
                                    <div className="inputs">
                                        <input 
                                            type="color" 
                                            name="secondaryC" 
                                            onChange={handleInputChange} 
                                            value={cvInfo.customization.secondaryColor}
                                            id="secondary-color" 
                                        />
                                        <input 
                                            type="text"
                                            value={cvInfo.customization.secondaryColor}
                                            maxLength={7}
                                            onChange={handleInputChange}
                                            className="hex_text_input"
                                            name="secondaryTextC"
                                        />
                                    </div>
                                </div>
                        </div>
                        <label htmlFor="fontSelector">Font Family</label>
                        <select 
                            name="fontFamily" 
                            id="fontSelector"
                            value={cvInfo.customization.fontFamily}
                            onChange={handleSelectChange}
                        >
                            <option value="Inter">Inter</option>
                            <option value="Roboto">Roboto</option>
                            <option value="Open Sans">Open Sans</option>
                            <option value="Lato">Lato</option>
                            <option value="Montserrat">Montserrat</option>
                            <option value="Poppins">Poppins</option>
                        </select>

                        <div className="layout_btns">
                            <h4>Layout Style</h4>
                            <CreateLayoutBtn currentLayout={layout} clickAction={handleLayoutClick}></CreateLayoutBtn>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

function CreateThemeBtns({currentPrimaryColor, currentSecondaryColor, onSelectTheme}) {


   return btnThemeColors.map((item)=> {

    const isActive = currentPrimaryColor.toLowerCase() === item.firstColor.toLowerCase() && currentSecondaryColor.toLowerCase() === item.secondColor.toLowerCase();

    return (
        <button 
            key={item.combinationName} 
            data-primary={item.firstColor} 
            data-secondary={item.secondColor}
            className={isActive ? "theme_btn active" : "theme_btn"}
            onClick={(e) => {
                const primary = e.currentTarget.dataset.primary;
                const secondary = e.currentTarget.dataset.secondary;
                onSelectTheme(primary, secondary);
            }}
        >
            <div className="colors">
                <div className="color_circle"></div>
                <div className="color_circle"></div>
            </div>
            <span className="theme_name">{item.combinationName}</span>
        </button>
    )
})
}

function CreateLayoutBtn({ currentLayout , clickAction}) {
    return layoutBtns.map((item) => {
        
        const isActive = currentLayout === item.name
        
        return (
            <button 
                data-layout={item.name}
                className={isActive ? "layout_btn active" : "layout_btn"}
                onClick={clickAction}
            >
                {item.name}
                <span>{item.description}</span>
            </button>
        )
    }  
    )
}

export default CustomizationForm;