socket.on("setRealTimeCell",function(cellInfo){
    let {username,rowid,colid}=cellInfo;
    if(document.querySelector(".realtime-cell")){
        document.querySelector(".realtime-cell").classList.remove("realtime-cell");
        document.querySelector(".username-div").remove();
    }
    let usenameDiv=document.createElement("div");
    usenameDiv.textContent=username;
    usenameDiv.classList.add("username-div");
    let realtimeDiv=document.querySelector(`div[rowid="${rowid}"][colid="${colid}"]`);
    realtimeDiv.classList.add("realtime-cell");
    realtimeDiv.append(usenameDiv);
})

socket.on("setCellValue",function(cellValue){
    let realtimecell=document.querySelector(".realtime-cell");
    let childNode=realtimecell.childNodes;
    if(childNode.length==1){
        let usenamediv=childNode[0];
        realtimecell.innerHTML=cellValue;
        realtimecell.append(usenamediv);
    }else{
        let usenamediv=childNode[1];
        realtimecell.innerHTML=cellValue;
        realtimecell.append(usenamediv);
    }
})