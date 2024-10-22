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
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
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
	}
});

stay.addEventListener("click", () => {
	hit.disabled = true;

	while (dealerCounter <= 17) {
		document.getElementById("dealer-card").src =
			"./assets/cards/" + deck[count].color + "_" + deck[count].number + ".png";
		if (
			deck[count].number == "J" ||
			deck[count].number == "Q" ||
			deck[count].number == "K" ||
			deck[count].number == "A"
		) {
			dealerCounter += 10;
		} else {
			dealerCounter += deck[count].number;
		}
		dealercnt.innerText = dealerCounter;
	}

	if (playerCounter == dealerCounter) {
		console.log("Tie");
		stay.disabled = true;
	} else if (playerCounter > dealerCounter) {
		console.log("U Win");
		stay.disabled = true;
	} else {
		console.log("Dealer Won");
		stay.disabled = true;
	}
});
