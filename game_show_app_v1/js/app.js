document.addEventListener('DOMContentLoaded', () => {

	//Declare Global Variables
	const qwerty = document.getElementById('qwerty');
	const phrase = document.getElementById('phrase');
	const phrases = ['another day another dollar', 
		'even my issues have issues', 
		'a little goes a long way', 
		'action speak louder than words',
		'the pen is mightier than the sword'];
	const overlayEl = document.getElementById('overlay');
	let buttons = document.getElementsByTagName('button');
	let triesEl = document.getElementsByClassName('tries');
	let missed = 0;

	//Hide the overlay when press start button
	const resetButton = document.getElementsByClassName('btn__reset')[0];
	resetButton.addEventListener('click', (e) => {
		e.preventDefault();
		document.getElementById("overlay").style.display = "none";
	});

	//Get a random phrase from phrases array
	function getRandomPhraseAsArray(arr) {
		let randomNum = Math.floor(Math.random() * 5);
		let charArray = arr[randomNum].split('');
		return charArray;
	}

	//Take any array of letters and add it to the display
	function addPhraseToDisplay(arr) {
		const phraseEl = document.getElementById('phrase');
		const phraseElUl = phraseEl.getElementsByTagName('ul')[0];
		for (let i=0; i < arr.length; i++) {
			let lst = document.createElement('li');
			lst.textContent = arr[i];
			lst.className = (arr[i] !== ' ') ? 'letter' : 'space';
			phraseElUl.append(lst);
		}
	}

	//Check whether the word from button is correct or wrong. If right show the word, return null otherwise
	function checkLetter(button) {
		let letter = document.getElementsByClassName('letter');
		let buttonChar = button.textContent;
		let matchedChar = null;
		for (let i=0; i < letter.length; i++) {
			let char = letter[i].textContent;
			if (char === buttonChar) {
				letter[i].classList.add('show');
				letter[i].style.transition = "all 3s";
				matchedChar = buttonChar;
			}
		}
		return matchedChar;
	}

	//End game function for Win or Lose
	function checkWinHelper(condition, str) {
		overlayEl.style.display = 'initial'; 
		overlayEl.classList.add(condition);
		overlayEl.children[0].textContent = str;
		resetButton.textContent = 'Reset Game';
		resetButton.addEventListener('click', (e) => {
			e.preventDefault();
			location.reload();
		});
	}

	//Check win or lose
	function checkWin() {
		let show = document.getElementsByClassName('show').length;
		let letter = document.getElementsByClassName('letter').length;
		let condition;
		let str;
		if (show === letter) {
			condition = 'win';
			str = 'You Win!';
			checkWinHelper(condition, str);
		}
		if (missed >= 5) {
			condition = 'lose'
			str = 'You Lose!'
			checkWinHelper(condition, str);
		}
	}

	//Start the game
	const phraseArray = getRandomPhraseAsArray(phrases);
	addPhraseToDisplay(phraseArray); 

	for (let i=0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', (e) => {
			e.preventDefault();
			buttons[i].classList.add('chosen');
			buttons[i].disabled = true;
			let letterFound = checkLetter(buttons[i]);
			if (letterFound === null) {
				triesEl[missed].style.display = 'none';
				missed += 1;			
			}
			checkWin();
		});
	}
});