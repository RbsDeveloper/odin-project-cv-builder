import { Sparkles, Download, FileText } from "lucide-react"

function NavBar({ onAutoFill, printAction}) {
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
                    <button className="downloadPdf_Btn nav_btn" onClick={printAction}>
                        <Download />
                        <span className="action_word">download</span>
                        PDF
                    </button>
                </li>
            </ul>
        </nav>
    )
};

export default NavBar