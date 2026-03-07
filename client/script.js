const socket = io("http://localhost:3000");

function sendMessage() {

  const input = document.getElementById("messageInput");

  const message = input.value;

  socket.emit("chat_message", message);

  input.value = "";
}

socket.on("chat_message", (msg) => {

  const li = document.createElement("li");

  li.textContent = msg;

  document.getElementById("messages").appendChild(li);

});