const body = document.querySelector("body");
const button = document.querySelector("button");
const copyButton = document.querySelector(".copy-button");
const pwString = document.querySelector("#pw");
const pwField = document.querySelector(".pw-field");
const copyAlert = document.querySelector(".copy-alert");
let generated = true;
// newPW();
// updateEvalUI(checkPW(pwString.value));

button.addEventListener("click", (e) => {
	generated = true;
	newPW();
	updateEvalUI(checkPW(pwString.value));
});
copyButton.addEventListener("click", (e) => {
	copy();
});
pwString.addEventListener("input", (e) => {
	generated = false;

	updateEvalUI(checkPW(pwString.value));
});

function newPW() {
	let r = Math.floor(Math.random() * pws.length);
	pwString.value = pws[r];
}

function checkPW(input) {
	let data = {};
	data.strength = zxcvbn(input).score;
	data.guesses = zxcvbn(input).guesses;
	data.warning = zxcvbn(input).feedback.warning;
	return data;
}

function updateEvalUI(input) {
	let evals = [
		"Very weak!",
		"Rather simple",
		"Okay",
		"Hard to memorize",
		"Too complicated!",
	];
	let evalsTexts = [
		". Classic!",
		". Nice touch!",
		". I like your style!",
		"... smooth.",
		".",
		".",
		".",
	];
	let colors = ["#00c500", "#86da00", "#yellow", "orange", "red"];
	let blocks = document.querySelectorAll(".balken");
	let evalField = document.querySelector(".eval-text");
	let warningField = document.querySelector(".warning-text");

	evalField.style.color = colors[input.strength];
	evalField.textContent = evals[input.strength];
	warningField.classList.remove("visible");

	blocks.forEach((e) => {
		e.style.opacity = "1";
		e.style.backgroundColor = colors[input.strength];
	});
	for (let i = 0; i < input.strength; i++) {
		blocks[blocks.length - i - 1].style.opacity = "0";
	}
	if (generated) return;

	setTimeout(() => {
		if (input.warning != "") {
			warningField.textContent =
				"Bonus: " +
				input.warning +
				evalsTexts[Math.floor(Math.random() * evalsTexts.length)];
			warningField.classList.add("visible");
		}
	}, 200);
}

function copy() {
	const pwString = document.querySelector("#pw");
	// pwString.select();
	// pwString.setSelectionRange(0, 99999); /* For mobile devices */

	navigator.clipboard
		.writeText(pwString.value)
		.then(() => alertCopy())
		.catch((error) => console.error(error));

	// alert("Copied the text: " + pwString.value);
}

function alertCopy() {
	copyAlert.classList.add("active");
	setTimeout(() => {
		copyAlert.classList.remove("active");
	}, 3000);
}
