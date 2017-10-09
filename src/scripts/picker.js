let pickSum = 0;
let pickedObj = {};
pickedObj.b100 = 0;
pickedObj.b500 = 0;
pickedObj.b1000 = 0;
pickedObj.b5000 = 0;

function numberWithSpaces(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u2009');
}

function addBanknote(value) {
	let banknote = document.createElement('div');
	banknote.classList.add('banknote', 'banknote--new', 'banknote-' + value);
	let banknoteLeft = document.createElement('div');
	banknoteLeft.classList.add('banknote__left');
	let banknoteRight = document.createElement('div');
	banknoteRight.classList.add('banknote__right');
	let banknoteValue = document.createElement('div');
	banknoteValue.classList.add('banknote__value');
	banknoteValue.innerHTML = numberWithSpaces(value);

	banknote.append(banknoteLeft);
	banknote.append(banknoteValue);
	banknote.append(banknoteRight);

	let pickContainer = $('.picked-' + value);

	pickContainer.append(banknote);
	pickContainer.addClass('picked__pack--active');

	switch (value) {
		case 100:
			pickedObj.b100++;
			break;
		case 500:
			pickedObj.b500++;
			break;
		case 1000:
			pickedObj.b1000++;
			break;
		case 5000:
			pickedObj.b5000++;
			break;
	}

	let initialLeft = $('.banknote-main.banknote-' + value)[0].offsetLeft;
	let finalLeft = pickContainer[0].offsetLeft;
	let banknotesArray = [100, 500, 1000, 5000];

	pickContainer.find('.banknote--new').css('left', finalLeft);

	banknotesArray.map(function(number, index) {
		let pickedLeft =
			$('.picked-' + banknotesArray[index])[0].offsetLeft +
			pickedObj['b' + number];

		let pickedTop =
			$('.picked-' + banknotesArray[index])[0].offsetLeft +
			pickedObj['b' + number];

		$('.picked-' + banknotesArray[index] + ' .banknote--new').css(
			'left',
			pickedLeft
		);

		$('.picked-' + banknotesArray[index] + ' .banknote--new').css(
			'bottom',
			pickedTop
		);
	});

	TweenMax.fromTo(
		banknote,
		0.2,
		{ css: { left: initialLeft } },
		{ css: { left: finalLeft } }
	);

	pickSum += value;
	$('.picker-sum__value').text(numberWithSpaces(pickSum));
}

function resetPick() {
	pickSum = 0;
	inactivePick();
	$('.picked__pack').removeClass('picked__pack--active');
	$('.banknote--new').remove();
}

function activePick() {
	$('.picker-clear').addClass('picker-clear--active');
	$('.picker-sum').addClass('picker-sum--active');
	$('.button--success').removeClass('button--disabled');
}

function inactivePick() {
	$('.picker-clear').removeClass('picker-clear--active');
	$('.picker-sum').removeClass('picker-sum--active');
	$('.button--success').addClass('button--disabled');
}

$('.banknote').click(function() {
	let number = $(this).data('number');
	addBanknote(number);
	activePick();
});

$('.picker-clear').click(resetPick);

$('.pick .button').click(function() {
	window.location.href = 'success.html';
});
