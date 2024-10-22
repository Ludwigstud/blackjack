let playerCounter = 0;
let dealerCounter = 0;
let cardType = ["hearts", "clubs", "spades", "diamonds"];
let cardNumb = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
let deck = [];
const cardTest = document.getElementById("card");
let count = 0;
const hit = document.getElementById("hit");
const playercnt = document.getElementById("player-cnt");
const dealercnt = document.getElementById("dealer-cnt");
const stay = document.getElementById("stay");
const dealerNum = document.getElementById("dealer-num");
const playerNum = document.getElementById("player-num");
const restart = document.getElementById("restart");
//
//
// Function to make the deck
function deckMaker() {
	for (card of cardType) {
		for (numb of cardNumb) {
			let obj = {};
			obj = { color: card, number: numb };
			deck.push(obj);
		}
	}
}
deckMaker();

// Function to shuffle the deck
function shuffleDeck(deck) {
	for (let i = deck.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));

		[deck[i], deck[j]] = [deck[j], deck[i]];
	}
}
shuffleDeck(deck);

// Hit button functionality
hit.addEventListener("click", () => {
	document.getElementById("player-card").src =
		"./assets/cards/" + deck[count].color + "_" + deck[count].number + ".png";

	if (
		deck[count].number == "J" ||
		deck[count].number == "Q" ||
		deck[count].number == "K" ||
		deck[count].number == "A"
	) {
		playerCounter += 10;
	} else {
		playerCounter += deck[count].number;
	}

	count = count + 1;
	playercnt.innerText = playerCounter;
	if (playerCounter > 21) {
		playercnt.innerText = "Busted";
		hit.disabled = true;
		stay.disabled = true;
		dealercnt.innerText = "WON!";
		playercnt.innerText = "Lost!";
		restart.style.display = "inline";
		console.log(dealerCounter + "dealer");
		console.log(playerCounter + "player");
	}
});
// Stay button functionality
stay.addEventListener("click", () => {
	hit.disabled = true;

	while (dealerCounter <= 16) {
		document.getElementById("dealer-card").src =
			"./assets/cards/" + deck[count].color + "_" + deck[count].number + ".png";

		if (["J", "Q", "K"].includes(deck[count].number)) {
			dealerCounter += 10;
		} else if (deck[count].number == "A") {
			dealerCounter += dealerCounter + 11 <= 21 ? 11 : 1;
		} else {
			dealerCounter += deck[count].number;
		}
		count++;
		dealercnt.innerText = dealerCounter;
	}

	if (dealerCounter > 21) {
		dealercnt.innerText = "Busted!";
		playercnt.innerText = "You Won!";
	} else if (playerCounter > dealerCounter) {
		playercnt.innerText = "You Won!";
		dealercnt.innerText = "Lost!";
	} else if (dealerCounter > playerCounter) {
		dealercnt.innerText = "Dealer Won!";
		playercnt.innerText = "Lost!";
	} else {
		playercnt.innerText = "Tie!";
		dealercnt.innerText = "Tie!";
	}

	stay.disabled = true;
	console.log(dealerCounter + "dealer");
	console.log(playerCounter + "player");
	restart.style.display = "inline";
});

restart.addEventListener("click", () => {
	hit.disabled = false;
	stay.disabled = false;
	playerCounter = 0;
	dealerCounter = 0;
	deck = [];
	count = 0;
	deckMaker();
	shuffleDeck(deck);
	playercnt.innerText = "0";
	dealercnt.innerText = "0";
	restart.style.display = "none";
	document.getElementById("dealer-card").src = "./assets/cards/back_dark.png";
	document.getElementById("player-card").src = "./assets/cards/back_light.png";
});
