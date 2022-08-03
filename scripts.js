function generate() {
    var correct = amountChecker();
    var amount = document.getElementById("amount").value;

    if (correct == true) {
        let params = {
            amount: amount,
            numbers: true,
            
            toString() {
                return `{amount: "${this.amount}", numbers: ${this.numbers}}`;
            }
        };

        alert(params);
    }
}

function amountChecker() {
    var amount = document.getElementById("amount").value;

    if (amount == '') {
        alert("Field can`t be empty!");
        return false;
    }

    else if (amount > 10000) {
        alert("Value can`t be more than 10000!");
        return false;
    }

    return true;
}