function File(file) {
    const imageLink = `./src/assets/${file.type}.png`
    
    return(
    <div className="File">
    <img className="FileImage" src={imageLink} alt={file.type} />
    <div className="FileName">{file.name}</div>
    </div>);
}

export default File;