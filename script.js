var doorImage1 = document.getElementById("door1"); // ảnh cửa 1
var doorImage2 = document.getElementById("door2"); // ảnh cửa 2
var doorImage3 = document.getElementById("door3"); // ảnh cửa 3 
var pointWinHTML = document.getElementById("box1"); // điểm thắng 
var pointWinBestHTML = document.getElementById("box2"); // điểm cao nhất
var pointWin = 0; // điểm lúc đầu
var pointWinBest = 0; // điểm cao nhất ban đầu
// các ảnh trong game
var botDoorPath = "images/robot.svg";
var beachDoorPath = "images/beach.svg";
var spaceDoorPath = "images/space.svg";
// các cửa trong game
var openDoor1, openDoor2, openDoor3 ;
var numClosedDoors = 3; // số cửa trong game
// ảnh robot xuất hiện ngẫu nhiên ở 3 cửa trong game.
var randomChoreDoorGenerator = function() {
  var choreDoor = Math.floor(Math.random() * numClosedDoors);
// ảnh robot hiện ở cửa 1
  if(choreDoor === 0) {
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
// ảnh robot hiện ở của 2
  } else if(choreDoor === 1) {
    openDoor2 = botDoorPath;
    openDoor1 = spaceDoorPath;
    openDoor3 = beachDoorPath;
// ảnh robot hiện ở cửa 3
  } else if(choreDoor === 2) {
    openDoor3 = botDoorPath;
    openDoor1 = beachDoorPath;
    openDoor2 = spaceDoorPath;
  }
};
var text = document.getElementsByClassName("door-row");
text.innerHTML = "cua 1";
var closedDoorPath = "images/closed_door.svg";// ảnh của đóng.
var startButton = document.getElementById("start"); // nút chơi lại
// khi mở ảnh robot thì thua
var isBot = function(door) {
  var imageBot = botDoorPath.split("/");//  lấy ảnh robot
  //console.log(imageBot);
  var imageOpenDoor = door.src.split("/"); //  lấy ảnh khi click.
  //console.log(imageOpenDoor);
  return imageBot[imageBot.length - 1] == imageOpenDoor[imageOpenDoor.length - 1]; // so sánh 2 ảnh
};
// điều kiện để mỗi cửa chỉ click 1 lần.
var isClicked = function(door) {
  var nameImage = closedDoorPath.split("/");// lấy ra ảnh cửa đóng.
  var nameDoor = door.src.split("/");// lấy ra ảnh hiện tại của cửa.
  return nameImage[nameImage.length - 1] == nameDoor[nameDoor.length - 1]; // so sánh 2 ảnh
};
// khi mở cửa
var playDoor = function() {
  numClosedDoors--;// cửa giảm 1 sau mỗi lần gọi
  if (numClosedDoors === 0) { // điều kiện thắng;
    gameOver("Win");
  }
};
var currentlyPlaying = true;  //điều kiện bắt đầu chơi game.
// kết thúc game
var gameOver = function(start) {
  // hiện thị khi thắng
  if (start === "Win") {
    startButton.innerHTML = "You win! Play again?";
    pointWin++; // nếu thắng cộng 1 điểm.
    pointWinHTML.textContent = pointWin; // in ra html
    // nếu điểm thắng lớn hơn điểm thắng cao nhất
    if (pointWin >= pointWinBest) {
      pointWinBest = pointWin; // thì điểm thắng cao nhất bằng điểm thắng.
      pointWinBestHTML.textContent = pointWinBest; // in ra html.
    }
    startButton.addEventListener("click", startRound); // click vào chơi tiếp
  }
  // hiển thị khi thua
  if(start === "Lose") {
    startButton.innerHTML = "Game Over! Play again?";
    pointWin = 0; // khi thua điểm thắng bằng 0
    pointWinHTML.textContent = pointWin; // in ra html
    currentlyPlaying = false;
    startButton.addEventListener("click", startRound);// click chơi lại.
  }
};
// khi click vào cửa 1
doorImage1.onclick = function() {
  // dk để bắt đầu chơi
  if(currentlyPlaying && isClicked(doorImage1))  {
    playDoor();
    doorImage1.src = openDoor1;
    // đk kiện thua
    if(isBot(doorImage1) && numClosedDoors > 0) {
      gameOver("Lose");
    }
  }
};
// khi click vào cửa 2
doorImage2.onclick = function() {
  if(currentlyPlaying && isClicked(doorImage2)) {
    playDoor();
    doorImage2.src = openDoor2;
    // điều kiện thua 
    if(isBot(doorImage2) && numClosedDoors > 0) {
      gameOver("Lose");
    }
  }
};
// khi click vào cửa 3
doorImage3.onclick = function() {
  if(currentlyPlaying && isClicked(doorImage3)) {
    playDoor();
    doorImage3.src = openDoor3;
    if(isBot(doorImage3) && numClosedDoors > 0) {
      gameOver("Lose");
    }
  }
};
// bắt đầu chơi 
var startRound = function() {
  //các cửa đóng 
  doorImage1.src = closedDoorPath; 
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  currentlyPlaying = true;
  numClosedDoors = 3; // số cửa đóng = 3
  startButton.innerHTML = "Good luck!" // nút hiển thị "good luck"
  randomChoreDoorGenerator(); // gọi lại hàm tạo ảnh sau các cửa ngẫu nhiên.
};
randomChoreDoorGenerator();
