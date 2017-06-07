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

$('.input-sum').on('keydown keyup', function () {
	dealWithInput(this);
});
