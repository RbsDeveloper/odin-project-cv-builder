import { PenLine, Eye } from "lucide-react";

function MobileSwitcher({ isPreviewOpen, setPreview}) {
    return (
        <div className="mobile_switcher">
            <button
                className={!isPreviewOpen? "switcher_btn is_active" : "switcher_btn"}
                onClick={()=>setPreview(false)}
            >
                <PenLine></PenLine>
                Edit
            </button>
            <button
                className={isPreviewOpen ? "switcher_btn is_active" : "switcher_btn"}
                onClick={()=>setPreview(true)}
            >
                <Eye></Eye>
                Preview
            </button>
        </div>
    )
}

export default MobileSwitcher