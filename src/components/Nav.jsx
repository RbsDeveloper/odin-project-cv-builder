import { Sparkles, Printer, Download, Eye, EyeOff, FileText } from "lucide-react"

function NavBar({isPreviewOpen, setPreview}) {
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
                    <button className="autoFillBtn">
                        <Sparkles />
                        Autofill
                    </button>
                </li>
                <li>
                    <button className="printCvBtn">
                        <Printer />
                        Print
                    </button>
                </li>
                <li>
                    <button className="downloadPdf">
                        <Download />
                        PDF
                    </button>
                </li>
                <li>
                <button
                className= {`btn preview_btn ${isPreviewOpen ? "is_active": ""}`}
                id="cvPreviewBtn"
                onClick={()=>setPreview(!isPreviewOpen)}
                >
                {isPreviewOpen ? <EyeOff/> : <Eye/>}
        </button>
                </li>
            </ul>
        </nav>
    )
};

export default NavBar