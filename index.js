let express = require(`express`);
let app = express();
let port = 3000;

let joinNode = document.querySelector(`.join`);
let chatNode = document.querySelector(`.chat`);
let messsagesNode = document.querySelector(`.messages`);
let textareaNode = document.querySelector(`textarea`);
let messageForm = document.querySelector(`.messageForm`);
let openLoginBtn = document.querySelector(`#openLogin`);

function openChat() {
	let errorNode = document.querySelector(`.error`);
	let passwordInput = document.querySelector(`#password`);

	// get password
	let password = passwordInput.value;

	// check password
	if (password === `meow`) {
		// clear password field
		passwordInput.value = ``;
		// open chat
		window.location = '/chat';
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
	text = text.replaceAll(`:nice`, `(„• •„)੭`);
	text = text.replaceAll(`:heart`, `₊˚⊹♡`);
	text = text.replaceAll(`:love`, `₊˚⊹♡`);
	text = text.replaceAll(`:)`, `•ᴗ•`);
	text = text.replaceAll(`:smile`, `•ᴗ•`);
	text = text.replaceAll(`:D`, `(ˊᗜˋ*)`);
	text = text.replaceAll(`:lol`, `(ˊᗜˋ*)`);
	text = text.replaceAll(`:lmao`, `(ˊᗜˋ*)`);
	text = text.replaceAll(`:P`, `(๑>؂•̀๑)`);
	text = text.replaceAll(`:he`, `(๑>؂•̀๑)`);
	text = text.replaceAll(`:heh`, `(๑>؂•̀๑)`);
	text = text.replaceAll(`:hehe`, `(๑>؂•̀๑)`);
	text = text.replaceAll(`:(`, `˙◠˙`);
	text = text.replaceAll(`:sad`, `˙◠˙`);
	text = text.replaceAll(`:_(`, `(╥﹏╥)`);
	text = text.replaceAll(`:cry`, `(╥﹏╥)`);
	text = text.replaceAll(`:crying`, `(╥﹏╥)`);
	text = text.replaceAll(`^^`, `(๑ > ᴗ < ๑)`);
	text = text.replaceAll(`:cute`, `(๑ > ᴗ < ๑)`);

	// prevent empty text or username
	if (name === `` && text === ``) {
		document.querySelector(`#name`).style.outlineColor = `crimson`;
		document.querySelector(`#text`).style.outlineColor = `crimson`;
	} else if (name === ``) {
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
			behavior: 'smooth',
		});

		// clear message and username field
		document.querySelector(`#text`).value = ``;
		document.querySelector(`#name`).value = ``;
	}
}

function openLogin() {
	// hide chat and show login page
	window.location = '/';
}

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

let login = () => {
	let joinChat = document.querySelector(`#joinChat`);
	joinChat.addEventListener(`click`, () => {
		openChat();
	});

	html = `
    <section class="join">
      <h1>join the chat</h1>
      <!-- password form -->
      <form class="form">
        <div class="password">
          <label for="password">password</label>
          <input type="password" id="password" />
        </div>
        <button id="joinChat">join chat</button>
      </form>
      <div class="error"></div>
    </section>
  `;
};

let chat = () => {
	html = `
    <section class="chat hidden">
      <section class="messages">
        <div class="message">
          <div class="username">
            <p>admin</p>
            <small>♾️</small>
          </div>
          <p class="message-text">enjoy the chat, fellas ⊹ ࣪ ˖</p>
        </div>
        <div class="message">
          <div class="username">
            <p>fella</p>
            <small>♾️</small>
          </div>
          <p class="message-text">I love that! („• •„)੭</p>
        </div>
      </section>
      <!-- message form -->
      <form class="messageForm">
        <input
          type="text"
          name="name"
          id="name"
          autocomplete="cc-name"
          placeholder="username" />
        <textarea
          name="text"
          id="text"
          rows="1"
          placeholder="write a message"></textarea>
        <button type="submit" class="btn">⬆</button>
      </form>

      <div class="menu">
        <!-- go back to the login page -->
        <button id="openLogin" class="btn">↩</button>
        <!-- open emoji board -->
        <button id="emoji" class="btn" title="feature is in progress">☺</button>
      </div>
    </section>
  `;
};

app.get(`/`, function (req, res) {
	res.send(login());
});

app.get(`/chat`, function (req, res) {
	res.send(chat());
});

app.listen(port, function () {
	console.log(`сервер: http://localhost:${port}`);
});
