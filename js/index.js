let joinNode = document.querySelector(`.join`);
let chatNode = document.querySelector(`.chat`);
let messsagesNode = document.querySelector(`.messages`);
let textareaNode = document.querySelector(`textarea`);
let formNode = document.querySelector(`.form`);
let messageForm = document.querySelector(`.messageForm`);
let openLoginBtn = document.querySelector(`#openLogin`);

function checkPassword() {
  let errorNode = document.querySelector(`.error`);
  let passwordInput = document.querySelector(`#password`);

  // get password
  let password = passwordInput.value;

  // check password
  if (password === `meow`) {
    // show chat
    joinNode.classList.add(`hidden`);
    chatNode.classList.remove(`hidden`);
    // clear password field
    passwordInput.value = ``;
  }
  // handle incorrect password
  else if (password === ``) {
    errorNode.innerHTML = `<p>Enter password!</p>`;
  } else {
    errorNode.innerHTML = `<p>Incorrect password.</p>`;
  }
}

function sendMessage() {
  let prevMessageNodeList = document.querySelectorAll(`.message`);

  // get last message
  let prevMessageNode = prevMessageNodeList[prevMessageNodeList.length - 1];
  // get time now
  var d = new Date();

  // get username and message 
  let name = document.querySelector(`#name`).value;
  let text = document.querySelector(`#text`).value;

  // replace emoji
  text = text.replaceAll(`:sparkle`, `⊹ ࣪ ˖`);
  text = text.replaceAll(`:thumb`, `(„• •„)੭`);
  text = text.replaceAll(`:heart`, `₊˚⊹♡`);
  text = text.replaceAll(`:smile`, `•ᴗ•`);
  text = text.replaceAll(`:)`, `•ᴗ•`);

  // prevent empty text or username
  if (name === `` && text === ``) {
    document.querySelector(`#name`).style.outlineColor = `crimson`;
    document.querySelector(`#text`).style.outlineColor = `crimson`;
  }
  else if (name === ``) {
    document.querySelector(`#name`).style.outlineColor = `crimson`;
    document.querySelector(`#text`).style.outlineColor = `#ddd`;
  } else if (text === ``) {
    document.querySelector(`#text`).style.outlineColor = `crimson`;
    document.querySelector(`#name`).style.outlineColor = `#ddd`;
  }
  // prevent sending curse words
  else if (
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

    // show curse words warning
    prevMessageNode.insertAdjacentElement(`afterend`, curseWarningNode);
  } else {
    // set fields colors to default
    document.querySelector(`#text`).style.outlineColor = `#ddd`;
    document.querySelector(`#name`).style.outlineColor = `#ddd`;

    // create message
    let messageNode = document.createElement(`div`);
    messageNode.classList.add(`message`);
    messageNode.innerHTML = `
    <div class="username">
      <p>${name}</p>
      <small>${d.getHours()}:${d.getMinutes()}</small>
    </div>
    <p class="message-text">${text}</p>
    `;

    // insert message in document
    prevMessageNode.insertAdjacentElement(`afterend`, messageNode);

    // scroll to the bottom of messages container
    messsagesNode.scroll({
      top: messsagesNode.scrollHeight,
      behavior: "smooth",
    });

    // clear message and username field
    document.querySelector(`#text`).value = ``;
    document.querySelector(`#name`).value = ``;
  }
}

function openLogin() {
  // hide chat and show login page
  chatNode.classList.add(`hidden`);
  joinNode.classList.remove(`hidden`);
}

// check password and open chat if it's correct
formNode.addEventListener(`submit`, function (e) {
  e.preventDefault();
  checkPassword();
});

// send message
messageForm.addEventListener(`submit`, function (e) {
  e.preventDefault();
  sendMessage();
});

// send message on enter
textareaNode.addEventListener(`keyup`, function (e) {
  if (e.key == `Enter`) {
    e.preventDefault();
    sendMessage();
  }
});


// open login page and hide chat
openLoginBtn.addEventListener(`click`, function () {
  openLogin();
});
