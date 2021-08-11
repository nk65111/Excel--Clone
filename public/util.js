function getrowColIdFromElement(element){
    let rowid=element.getAttribute("rowid");
    let colid=element.getAttribute("colid");
    return {rowid,colid};
}
function solveFormula(formula,selfCellObject){
    let formulaComps=formula.split(" ");
    for(let i=0;i<formulaComps.length;i++){
        let formulaComp=formulaComps[i];
        if(formulaComp[0]>="A"&&formulaComp[0]<="Z"){
            let {rowid,colid}=getRowColidFromAddress(formulaComp);
            let cellObject=db[rowid][colid];
            if(selfCellObject){
            cellObject.children.push(selfCellObject.name);
            selfCellObject.parent.push(cellObject.name);
            }
            let value=cellObject.value;
            formula=formula.replace(formulaComp,value);
        }
    }
    let computedValue = eval(formula);
    return computedValue;
}

function removeFormula(cellObject){
    cellObject.formula="";
    for(let i=0;i<cellObject.parent.length;i++){
        let ParentName=cellObject.parent[i];
        let {rowid,colid}=getRowColidFromAddress(ParentName);
        let ParentObject=db[rowid][colid];
        let updatedList= ParentObject.children.filter(function(child){
            return child !=cellObject.name;
        });
        ParentObject.children=updatedList;

    }
    cellObject.parent=[];
}

function updateChildren(cellObject){
    for(let i=0;i<cellObject.children.length;i++){
        let childrenName=cellObject.children[i];
        let {rowid,colid}= getRowColidFromAddress(childrenName);
        let childrenCellObj=db[rowid][colid];
        let newValue=solveFormula(childrenCellObj.formula);
        childrenCellObj.value=newValue;
        document.querySelector(`div[rowid='${rowid}'][colid='${colid}']`).textContent=newValue;
        updateChildren(childrenCellObj);
    }
}
function getRowColidFromAddress(address){
    let rowid = Number(address.substring(1)) - 1;
    let colid = address.charCodeAt(0) - 65;
    return {rowid, colid};
}

