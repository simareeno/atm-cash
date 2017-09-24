let pickSum = 0;

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

	$('.atm').append(banknote);

	pickSum += value;
	$('.picker-sum__value').text(numberWithSpaces(pickSum));
}

function resetPick() {
	pickSum = 0;
	$('.picker-sum__value').text(numberWithSpaces(pickSum));
	inactivePick();
	$('.banknote--new').hide();
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