import File from "./File";
import "./FileList.css";

function FileList() {


    return (<div>
        <div className="FileAdder">
            <button className="addALink">Add a Link</button>
            <button className="Upload">Upload Document</button>
        </div>
        <h3 className="FileHeader">Recently Viewed</h3>
        <div className="flex-horizontal-files">
            <File name={"UsabilityTestScript.pdf"} type={"doc"} />
            <File name={"Github"} type={"git"} />
            <File name={"UsabilityTestScript.doc"} type={"doc"} />
        </div>
        <h3 className="FileHeader">Files</h3>
        <div className="flex-horizontal-files">
            <File name={"UsabilityTestScript.doc"} type={"doc"} />
            <File name={"UsabilityTestScript.form"} type={"doc"} />
            <File name={"UsabilityTestScript.pdf"} type={"doc"} />
        </div>
        <h3 className="FileHeader">Links</h3>
        <div className="flex-horizontal-files">
            <File name={"Figjam"} type={"figjam"} />
            <File name={"Figma"} type={"figma"} />
            <File name={"Github"} type={"git"} />
        </div>
    </div>);
}

export default FileList;