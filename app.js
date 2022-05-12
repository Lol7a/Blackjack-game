const btnStart = document.querySelector(".btn-start");
const btnDraw = document.querySelector(".btn-draw");
const msgElement = document.querySelector("#msg-el");
const cards = document.querySelector("#cards");
const sum = document.querySelector("#sum");
const playerElement = document.querySelector(".player");

let firstCard;
let secondCard;
let allCards = [];

let currentSum = 0;
let hasBlackJack = false;
let isalive = false;
let msg = "";

let player = {
	name: "Lily",
	chips: 200,
};

function randomCard() {
	let num = Math.floor(Math.random() * 13) + 1;
	if (num > 10) {
		return (num = 10);
	} else if (num === 1) {
		return (num = 11);
	} else {
		return num;
	}
}

function startGame() {
	isalive = true;
	firstCard = randomCard();
	secondCard = randomCard();
	currentSum = firstCard + secondCard;
	allCards.push(firstCard, secondCard);
	playerElement.textContent = `${player.name}: $${player.chips}`;
	renderGame();
}

function renderGame() {
	cards.textContent = "Cards: ";

	for (let i = 0; i < allCards.length; i++) {
		cards.textContent += allCards[i] + " ";
	}

	sum.textContent = `Sum: ${currentSum}`;

	if (currentSum <= 20) {
		msg = "Do you want to draw a new card?";
	} else if (currentSum === 21) {
		msg = "You won!!!! You've got Blackjack";
		hasBlackJack = true;
	} else {
		msg = "You're out of the game!";
		player.chips = 0;
		playerElement.textContent = `${player.name}: $${player.chips}`;
		isalive = false;
		btnStart.disabled = true;
	}
	msgElement.textContent = msg;
}

function drawCard() {
	if (isalive && !hasBlackJack) {
		let newCard = randomCard();
		cards.textContent += newCard;
		currentSum += newCard;
		allCards.push(newCard);
		renderGame();
	}
}

btnStart.addEventListener("click", startGame);
btnDraw.addEventListener("click", drawCard);
