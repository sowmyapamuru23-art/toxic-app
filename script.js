const socket = io();

function sendMessage() {
  const username = document.getElementById("username").value;
  const message = document.getElementById("message").value;

  if (username.trim() === "" || message.trim() === "") {
    return;
  }

  socket.emit("sendMessage", {
    username: username,
    message: message
  });

  document.getElementById("message").value = "";
}

socket.on("receiveMessage", (data) => {
  const chatBox = document.getElementById("chatBox");
  const msg = document.createElement("p");
  msg.innerHTML = `<strong>${data.username}:</strong> ${data.message}`;
  chatBox.appendChild(msg);
});

socket.on("toxicWarning", (data) => {
  const warning = document.getElementById("warning");
  warning.innerText = data.warning;

  setTimeout(() => {
    warning.innerText = "";
  }, 3000);
});
