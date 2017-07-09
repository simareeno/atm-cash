// import { numberWithSpaces } from 'numberWithSpaces';

function numberWithSpaces(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u2009');
}

let userData = {
	'currentSum': 0
};

const denominations = [5000, 1000, 500, 100];
let combs = [];
let currentComb;
let combStep = 10;

function updateData() {
	if ($('.sum').length !== 0) {
		let sum = numberWithSpaces(data.currentSum);
		count_combs(data.currentSum, 0, [], null);
		console.log(combs);
		currentComb = combs.length - 1;
		$('.sum').text(sum + ' ₽');
		applyCombs(currentComb);
	}
}

function updateStorage() {
	localStorage.setItem('atm', JSON.stringify(data));
	updateData();
}

// Если данных нет, загружаем
if (!localStorage.atm) {
	localStorage.setItem('atm', JSON.stringify(userData));
}

// Получаем данные
var data = JSON.parse(localStorage.getItem('atm'));

// Вбиваем данные
updateData();

var inputText = '';
let canInput = true;

function showNumber(x) {
	x = parseInt(x.replace(/\s+/g, ''));
	if (isNaN(x)) {
		$('.input-cash').text('');
		$('.input-wrapper .rouble').addClass('rouble--grey');
		$('.input-cursor').addClass('input-cursor--active');
	} else if (x < 1) {
		$('.input-cash').text('');
		$('.input-wrapper .rouble').addClass('rouble--grey');
		$('.input-cursor').addClass('input-cursor--active');
	} else {
		x = numberWithSpaces(x);
		$('.input-cursor').removeClass('input-cursor--active');
		$('.input-cash').text(x);
	}

	if (x >= 100) {
		showSums();
	} else if (x < 100) {
		showActions();
	}
}

function showSums() {
	let sums = $('.buttons-sums');
	let actions = $('.buttons-actions');
	sums.removeClass('buttons-sums--active');
	actions.addClass('buttons-actions--active');
}

function showActions() {
	let sums = $('.buttons-sums');
	let actions = $('.buttons-actions');
	sums.addClass('buttons-sums--active');
	actions.removeClass('buttons-actions--active');
}

document.onkeyup = function (e) {
	var key = e.key;
	var isNotNumber = isNaN(parseInt(key));

	if (!canInput) {
		return;
	}

	if (!isNotNumber) {
		if ((inputText + key) > 200000) {
			$('.subtitle-sum').addClass('subtitle--error');
		} else if ((inputText + key) < 1) {
		} else {
			inputText += key;
			$('.rouble').removeClass('rouble--grey');
			showNumber(inputText, true);
		}
	} else if (key === 'Backspace') {
		inputText = inputText.slice(0, -1);
		$('.subtitle-sum').removeClass('subtitle--error');
		showNumber(inputText);
	}

};

$('.button-sum').click(function () {
	let valueNode = $(this).find('.button-sum__value').text();
	let value = parseInt(valueNode.replace(/\s+/g, ''));
	canInput = false;

	showSums();

	$('.chosen-value__sum').text(numberWithSpaces(value));
	$('.input-wrapper').addClass('input-wrapper--inactive');

	$('.chosen-value').addClass('chosen-value--' + value);
	setTimeout(function () {
		$('.chosen-value').addClass('chosen-value--activated');
		$('.chosen-value').addClass('chosen-value--active');
		$('.chosen-value').addClass('chosen-value--activated-forever');
	}, 10);
});

$('.chosen-value').click(function () {
	canInput = true;
	let values = [500, 1000, 2000, 3000, 5000, 10000, 15000];
	$('.chosen-value').removeClass('chosen-value--active');
	$('.input-wrapper').removeClass('input-wrapper--inactive');

	showActions();

	setTimeout(function () {
		$('.chosen-value').removeClass('chosen-value--activated');
		$('.chosen-value').removeClass('chosen-value--activated-forever');
	}, 10);

	setTimeout(function () {
		for (var i = 0; i < values.length; i++) {
			$('.chosen-value').removeClass('chosen-value--' + values[i]);
		}
	}, 350);
});

$('.withdraw .button-exchange').click(function (e) {
	e.preventDefault();
	let sum;
	if ($('.chosen-value').hasClass('chosen-value--active')) {
		sum = $('.chosen-value__sum').text();
	} else {
		sum = $('.input-cash').text();
	}
	sum = parseInt(sum.replace(/\s+/g, ''));
	data.currentSum = sum;
	updateStorage();
	window.location.href = "exchange.html";
});

function count_combs(left, i, comb, add) {
	if (add) comb.push(add);
	let cur;

	if (left === 0 || (i + 1) === denominations.length) {
		if ((i + 1) === denominations.length && left > 0) {
			if (left % denominations[i]) {
				return 0;
			}
			let x = left / denominations[i];
			cur = denominations[3];
			comb.push( {cur, x} );
			i += 1;
		}

		while (i < denominations.length) {
			comb.push( (0, denominations[i]) );
			i += 1;
		}

		combs.push(comb);
		return 1;
	}

	cur = denominations[i];
	let tempArr = 0;

	for (let x = 0; x < left / cur; x++) {
		tempArr += count_combs(left - x * cur, i + 1, comb.slice(0,5), {cur, x});
	}
	return tempArr;
}

function applyCombs(num) {

	let comb = combs[num];

	for (let i = 0; i < comb.length; i++) {
		let denomination = comb[i].cur;
		let value = comb[i].x;
		if (value > 0) {
			// $('.banknotes__row-' + denomination).css('display', 'flex');
			$('.banknotes__row-' + denomination).addClass('banknotes__row--active');
			$('.banknotes__row-' + denomination).find('.banknotes-number__number').text(value);
		} else {
			$('.banknotes__row-' + denomination).removeClass('banknotes__row--active');
			setTimeout(function () {
				// $('.banknotes__row-' + denomination).css('display', 'none');
			}, 350);
		}
	}
}

$('.exchange-buttons__larger').click(function () {
	if (currentComb + combStep < combs.length) {
		if (combs.length - (currentComb + combStep) < combStep) {
			currentComb = combs.length - 1;
			console.log(currentComb);
		} else {
			currentComb += combStep;
		}
		applyCombs(currentComb);
		$('.exchange-buttons__smaller').removeClass('button--disabled');
	}

	if (currentComb  === combs.length - 1) {
		$(this).addClass('button--disabled');
	}
	console.log(currentComb);
});

$('.exchange-buttons__smaller').click(function () {
	if (currentComb > 0) {
		if (currentComb < combStep) {
			currentComb = combStep - currentComb;
			currentComb = 0;
		} else {
			currentComb -= combStep;
		}
		applyCombs(currentComb);
		$('.exchange-buttons__larger').removeClass('button--disabled');
	}
	if (currentComb === 0) {
		$(this).addClass('button--disabled');
	}
	console.log(currentComb);
});
