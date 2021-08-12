const express = require("express");
const { Server } = require("socket.io");
// server is created !!!

const app = express();
const http=require("http");
const server = http.createServer(app);
const io = new Server(server);
const port=process.env.PORT || 3000;
let userList=[];

app.use(express.static("public"));

io.on('connection', function(socket){
    // console.log(socket.id+"  connected...");
    socket.on("userConnected",function(username){
        let userObject={id:socket.id, username:username};
        userList.push(userObject);
        // console.log(userList);
   });
   socket.on("cellClicked",function(cellCodinated){
       let username;
       for(let i=0;i<userList.length;i++){
           if(userList[i].id==socket.id){
               username=userList[i].username;
           }
       }
       socket.broadcast.emit("setRealTimeCell",{username,...cellCodinated});
   });
   socket.on("cellValue",function(cellValue){
       socket.broadcast.emit("setCellValue",cellValue);
   })
})

server.listen(port , function () {
        // console.log("port 3000 listening");
})