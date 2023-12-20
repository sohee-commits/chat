let joinNode = document.querySelector(`.join`);
let chatNode = document.querySelector(`.chat`);
let textareaNode = document.querySelector(`textarea`);

function checkPassword() {
  let errorNode = document.querySelector(`.error`);
  let passwordInput = document.querySelector(`#password`);

  let password = passwordInput.value;

  if (password === `meow`) {
    joinNode.classList.add(`hidden`);
    chatNode.classList.remove(`hidden`);
  } else if (password === ``) {
    errorNode.innerHTML = `<p>Enter password!</p>`;
  } else {
    errorNode.innerHTML = `<p>Incorrect password.</p>`;
  }
}

function sendMessage() {
  let prevMessageNodeList = document.querySelectorAll(`.message`);
  let prevMessageNode = prevMessageNodeList[prevMessageNodeList.length - 1];
  var d = new Date();

  let name = document.querySelector(`#name`).value;
  let text = document.querySelector(`#text`).value;

  text = text.replaceAll(`:sparkle`, `⊹ ࣪ ˖`);
  text = text.replaceAll(`:thumb`, `(„• •„)੭`);
  text = text.replaceAll(`:heart`, `₊˚⊹♡`);
  text = text.replaceAll(`:)`, `•ᴗ•`);

  if (
    text.includes(`fuck`) ||
    text.includes(`bitch`) ||
    name.includes(`fuck`) ||
    name.includes(`bitch`)
  ) {
    let curseWarningNode = document.createElement(`div`);
    curseWarningNode.classList.add(`message`);
    curseWarningNode.innerHTML = `
    <div class="username">
      <p>admin</p>
      <small>♾️</small>
    </div>
    <p class="message-text warning">You may not use curse words in this chat.</p>
    `;

    prevMessageNode.insertAdjacentElement(`afterend`, curseWarningNode);
  } else {
    let messageNode = document.createElement(`div`);
    messageNode.classList.add(`message`);
    messageNode.innerHTML = `
    <div class="username">
      <p>${name}</p>
      <small>${d.getHours()}:${d.getMinutes()}</small>
    </div>
    <p class="message-text">${text}</p>
    `;

    prevMessageNode.insertAdjacentElement(`afterend`, messageNode);
    document.querySelector(`#text`).value = ``;
    document.querySelector(`#name`).value = ``;
  }
}

function openLogin() {
  chatNode.classList.add(`hidden`);
  joinNode.classList.remove(`hidden`);
}

let formNode = document.querySelector(`.form`);
let messageForm = document.querySelector(`.messageForm`);
let openLoginBtn = document.querySelector(`#openLogin`);

formNode.addEventListener(`submit`, function (e) {
  e.preventDefault();
  checkPassword();
});

messageForm.addEventListener(`submit`, function (e) {
  e.preventDefault();
  sendMessage();
});

textareaNode.addEventListener(`keyup`, function (e) {
  if (e.key == `Enter`) {
    e.preventDefault();
    sendMessage();
  }
});

openLoginBtn.addEventListener(`click`, function () {
  openLogin();
});


