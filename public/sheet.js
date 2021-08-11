

let AddSheet=document.querySelector(".add-sheet");
let SheetListDiv=document.querySelector(".sheet-list");

let sheetId=0;
AddSheet.addEventListener("click",function(){
    sheetId++;
    document.querySelector(".active-sheet").classList.remove("active-sheet");
     let sheetDiv=document.createElement("div");
     sheetDiv.classList.add("sheet");
     sheetDiv.classList.add("active-sheet");
     sheetDiv.setAttribute("sheet-id",sheetId);
     sheetDiv.innerHTML=`Sheet ${sheetId+1}`;
     SheetListDiv.append(sheetDiv);

     initnewUI();
     initDB();
});

SheetListDiv.addEventListener("click",function(e){
   let selectedSheet=e.target;
   if(selectedSheet.classList.contains("active-sheet")){
       return;
   }
   document.querySelector(".active-sheet").classList.remove("active-sheet");
   selectedSheet.classList.add("active-sheet");
   initnewUI();
   let id=selectedSheet.getAttribute("sheet-id");
   db=sheetDB[id].db;
   visitedCells=sheetDB[id].visitedCells;
   setUI();
});

function setUI(){
     for(let i=0;i<visitedCells.length;i++){
         let {rowId,colId}=visitedCells[i];
         let cellObject=db[rowId][colId];
         document.querySelector(`div[rowid='${rowId}'][colid='${colId}']`).innerHTML=cellObject.value;
     }
}

function initnewUI(){
    for(let i=0;i<visitedCells.length;i++){
        let {rowId,colId}=visitedCells[i];
        document.querySelector(`div[rowid='${rowId}'][colid='${colId}']`).innerHTML="";
    }
}

