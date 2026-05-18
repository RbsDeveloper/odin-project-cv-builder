import { Sparkles, Printer, Download } from "lucide-react"

function NavBar() {
    return(
        <nav className="navbar">
            <div className="logoContainer">
                <div className="icon">
                    <Sparkles />
                </div>
                <div className="logoText">
                    <p>Cv Builder Pro</p>
                    <span>Create your professional resume in minutes</span>
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
            </ul>
        </nav>
    )
};

export default NavBar