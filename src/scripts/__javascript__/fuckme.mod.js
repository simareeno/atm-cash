	(function () {
		var countChange = function (amount) {
			return cc (amount, 5);
		};
		var cc = function (amount, kindsOfCoins) {
			if (amount == 0) {
				return 1;
			}
			if (amount < 0 || kindsOfCoins == 0) {
				return 0;
			}
			else {
				return cc (amount, kindsOfCoins - 1) + cc (amount - firstDenomination (kindsOfCoins), kindsOfCoins);
			}
		};
		var firstDenomination = function (kindsOfCoins) {
			if (kindsOfCoins == 1) {
				return 1;
			}
			else if (kindsOfCoins == 2) {
				return 5;
			}
			else if (kindsOfCoins == 3) {
				return 10;
			}
			else if (kindsOfCoins == 4) {
				return 25;
			}
			else {
				return 50;
			}
		};
		countChange (100);
		__pragma__ ('<all>')
			__all__.cc = cc;
			__all__.countChange = countChange;
			__all__.firstDenomination = firstDenomination;
		__pragma__ ('</all>')
	}) ();
