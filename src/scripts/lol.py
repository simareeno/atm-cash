cents = 200
denominations = [100, 10, 5, 1]
names = {25: "quarter(s)", 10: "dime(s)", 5 : "nickel(s)", 1 : "pennies"}

def count_combs(left, i, comb, add):
    if add: comb.append(add)
    if left == 0 or (i+1) == len(denominations):
        if (i+1) == len(denominations) and left > 0:
            comb.append( (left, denominations[i]) )
            i += 1
        while i < len(denominations):
            comb.append( (0, denominations[i]) )
            i += 1
        return 1
    cur = denominations[i]
    return sum(count_combs(left-x*cur, i+1, comb[:], (x,cur)) for x in range(0, int(left/cur)+1))
