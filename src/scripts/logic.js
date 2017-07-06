function numberWithSpaces(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// function dealWithInput(targetInput) {
// 	let current = $(targetInput).val();
// 	let signs = current.length;
//     let sendBack = 0;
//     let currentNumber;
//
//     console.log(current);
//
//     if (signs > 0) {
//         $('.rouble').removeClass('rouble--grey');
//     } else {
//         $('.rouble').addClass('rouble--grey');
//     }
//
//     if (current === '') {
//         console.log('true');
//         currentNumber = parseInt(current.replace(/\s+/g, ''));
//     } else {
//         currentNumber = parseInt(current.replace(/\s+/g, ''));
//     	sendBack = numberWithSpaces(currentNumber);
//     }
//
//     if (sendBack === 0) {
//         sendBack = ''
//     }
//
//     $('.input-span').text(sendBack);
//     let spanWidth = $('.input-span').width() * 1.1;
//     $(targetInput).width(spanWidth);
// 	$(targetInput).val(sendBack);
// }

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
		$('.rouble').addClass('rouble--grey');
	} else if (x < 1) {
		$('.input-cash').text('');
		$('.rouble').addClass('rouble--grey');
	} else {
		x = numberWithSpaces(x);
		$('.input-cash').text(x);
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
