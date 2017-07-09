cents = 200;
denominations = [100, 10, 5, 1];
names = {25: 'quarter(s)', 10: 'dime(s)', 5 : 'nickel(s)', 1 : 'pennies'};

function count_combs(left, i, comb, add) {
    if (add: comb.push(add);
    if (left == 0 || (i+1) == len(denominations)) {
        if ((i+1) == len(denominations) && left > 0) {
            comb.push( (left, denominations[i]) );
            i += 1;
        while (i < len(denominations)) {
            comb.push( (0, denominations[i]) );
            i += 1;
        console.log ' '.join('%d %s' % (n,names[c]) for (n,c) in comb;        })
        return 1;
    cur = denominations[i];
    return sum(count_combs(left-x*cur, i+1, comb[:], (x,cur)) for (x in range(0, Number(left/cur)+1));
        }
console.log count_combs(cents, 0, [], null);

    }
}
