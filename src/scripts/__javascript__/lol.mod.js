	(function () {
		var cents = 200;
		var denominations = list ([100, 10, 5, 1]);
		var names = dict ({25: 'quarter(s)', 10: 'dime(s)', 5: 'nickel(s)', 1: 'pennies'});
		var count_combs = function (left, i, comb, add) {
			if (add) {
				comb.append (add);
			}
			if (left == 0 || i + 1 == len (denominations)) {
				if (i + 1 == len (denominations) && left > 0) {
					comb.append (tuple ([left, denominations [i]]));
					i++;
				}
				while (i < len (denominations)) {
					comb.append (tuple ([0, denominations [i]]));
					i++;
				}
				var stringy;
				console.log(comb);
				// for (var o = 0; o < comb.length; o++) {
				// 	stringy +=" "
				// }
				// " ".join("%d %s" % (n,names[c]) for (n,c) in comb)
				return 1;
			}
			var cur = denominations [i];
			return sum (function () {
				var __accu0__ = [];
				for (var x = 0; x < int (left / cur) + 1; x++) {
					__accu0__.append (count_combs (left - x * cur, i + 1, comb.__getslice__ (0, null, 1), tuple ([x, cur])));
				}
				return py_iter (__accu0__);
			} ());
		};
		__pragma__ ('<all>')
			__all__.cents = cents;
			__all__.count_combs = count_combs;
			__all__.denominations = denominations;
			__all__.names = names;
		__pragma__ ('</all>')
	}) ();
