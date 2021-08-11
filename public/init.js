let cellContent=document.querySelector(".cells-content");

function initCells(){
    let content=`<div class="top-left-content"></div>`;
    content+=`<div class="top-content">`
    for(let i=0;i<26;i++){
       content+=`<div class="top-cell" trid="${i}">${String.fromCharCode(65+i)}</div>`;
    }
    content+=`</div>`;
    content+=`<div class="left-content">`;
    for(let i=0;i<100;i++){
       content+=`<div class="left-cell" lcid="${i}">${i+1}</div>`;
    }
    content+=`</div>`;
    content+=`<div class="cells">`
   for(let i=0;i<100;i++){
    content+=`<div class="row">`
       for(let j=0;j<26;j++){
          content+=`<div class="col" rowid=${i} colid=${j} contentEditable="true"></div>`;
       }
       content+=`</div>`;
   }
   content+=`</div>`;
   cellContent.innerHTML=content;
}
initCells();
let sheetDB=[];
let db;
let visitedCells;
function initDB(){
   let newSheetDB=[];
   for(let i=0;i<100;i++){
      let rowData=[];
      for(let j=0;j<26;j++){
        let name=String.fromCharCode(65+j)+(i+1)+"";
        let cellObject={
           name:name,
           value:"",
           formula:"",
           children:[],
           parent:[],
           visited:false,
           fontStyle:{bold:false,underline:false,italic:false},
           textAlign:"left"
        }
        rowData.push(cellObject);
      }
      newSheetDB.push(rowData);
      
   }
   db=newSheetDB;
   visitedCells=[];
   sheetDB.push({db:newSheetDB,visitedCells:visitedCells});
}


initDB();