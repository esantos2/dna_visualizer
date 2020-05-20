const displayCitation = (seqCite) => {
    let box = document.getElementById("cite-details");
    box.innerHTML = "";

    //set title info
    let title = document.createElement("p");
    title.innerHTML = "Description: " + seqCite.title;
    
    //set link info
    let link = document.createElement("a")
    link.setAttribute("href", seqCite.source);
    link.setAttribute("target", "_blank");
    link.innerHTML = seqCite.source;

    let moreInfo = document.createElement("p")
    moreInfo.textContent = `More info: `;
    moreInfo.appendChild(link);
    
    //save to box
    box.appendChild(title);
    box.appendChild(moreInfo);
}

export default displayCitation;