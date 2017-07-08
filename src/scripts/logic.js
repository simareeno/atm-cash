function numberWithSpaces(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u2009');
}

let userData = {
	'currentSum': 0
};

function updateData() {
	if ($('.sum').length !== 0) {
		let sum = numberWithSpaces(data.currentSum);
		$('.sum').text(sum + ' ₽');
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
		$('.buttons-sums').removeClass('buttons-sums--active');
		$('.buttons-actions').addClass('buttons-actions--active');
	} else if (x < 100) {
		$('.buttons-sums').addClass('buttons-sums--active');
		$('.buttons-actions').removeClass('buttons-actions--active');
	}
}

document.onkeyup = function (e) {
	var key = e.key;
	var isNotNumber = isNaN(parseInt(key));

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
