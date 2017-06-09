function numberWithSpaces(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function dealWithInput(targetInput) {
	let current = $(targetInput).val();
	let signs = current.length;

	if (signs === 0) {
		$('.rouble').addClass('rouble--grey');
		return;
	} else {
		$('.rouble').removeClass('rouble--grey');
	}

	if (signs === 4) {
		signs++;
	}

	let currentNumber = parseInt(current.replace(/\s+/g, ''));
	let sendBack = numberWithSpaces(currentNumber);

	console.log(currentNumber);

	if (currentNumber >= 500) {
		$('.button-exchange, .button-apply').show();
	} else if (currentNumber >= 100) {
		$('.button-apply').show();
	} else {
		$('.button-exchange, .button-apply').hide();
	}

	$(targetInput).css('width', signs * 23);
	$(targetInput).val(sendBack);
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

$('.button-exchange').click(function (e) {
	e.preventDefault();
	let current = $('.input-sum').val();
	let sum = parseInt(current.replace(/\s+/g, ''));
	data.currentSum = sum;
	updateStorage();
	window.location.href = 'exchange.html';
});

$('.input-sum').on('keydown keyup', function () {
	dealWithInput(this);
});
