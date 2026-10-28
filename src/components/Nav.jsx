import { Sparkles, Printer, Download, Eye, EyeOff, FileText } from "lucide-react"

function NavBar({isPreviewOpen, setPreview, onAutoFill}) {
    return(
        <nav className="navbar">
            <div className="logoContainer">
                <div className="icon">
                    <FileText />
                </div>
                <div className="logoText">
                    <p>CVPro</p>
                </div>
            </div>
            <ul className="navButtons">
                <li>
                    <button 
                    className="autoFill_Btn nav_btn"
                    onClick={() =>onAutoFill()}
                    >
                        <Sparkles />
                        Autofill
                    </button>
                </li>
                <li>
                    <button className="printCv_Btn nav_btn">
                        <Printer />
                        Print
                    </button>
                </li>
                <li>
                    <button className="downloadPdf_Btn nav_btn">
                        <Download />
                        PDF
                    </button>
                </li>
                <li>
                    <button
                        className= {`nav_btn preview_btn ${isPreviewOpen ? "is_active": ""}`}
                        id="cvPreviewBtn"
                        onClick={()=>setPreview(!isPreviewOpen)}
                    >
                        {isPreviewOpen ? <EyeOff/> : <Eye/>}
                        preview
                    </button>
                </li>
            </ul>
        </nav>
    )
};

export default NavBar