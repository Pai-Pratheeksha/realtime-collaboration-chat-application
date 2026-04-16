const socket = io("http://localhost:3000");

let currentRoom = "";

function joinRoom() {

  const room = document.getElementById("roomInput").value;

  currentRoom = room;

  socket.emit("join_room", room);

  document.getElementById("messages").innerHTML = ""; // clear UI

  console.log("Joined room:", room);

}

function sendMessage() {

  const input = document.getElementById("messageInput");

  const message = input.value;

  socket.emit("chat_message", {
    room: currentRoom,
    message: message
  });

  input.value = "";
}

socket.on("chat_message", (msg) => {

  const li = document.createElement("li");

  li.textContent = msg;

  document.getElementById("messages").appendChild(li);

});

socket.on("load_messages", (messages) => {

  const messageList = document.getElementById("messages");

  messageList.innerHTML = ""; // clear old messages

  messages.forEach((msg) => {

    const li = document.createElement("li");
    li.textContent = msg.message;

    messageList.appendChild(li);

  });

});