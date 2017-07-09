def countChange(amount):
    return cc(amount, 5)

def cc(amount, kindsOfCoins):
    if amount==0:
        return 1
    if amount<0 or kindsOfCoins==0:
        return 0
    else:
        return cc(amount, kindsOfCoins-1)+cc(amount-firstDenomination(kindsOfCoins), kindsOfCoins)

def firstDenomination(kindsOfCoins):
    if kindsOfCoins==1:
        return 1
    elif kindsOfCoins==2:
        return 5
    elif kindsOfCoins==3:
        return 10
    elif kindsOfCoins==4:
        return 25
    else:
        return 50

countChange(100)
