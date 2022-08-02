function generate() {
    var amount = document.getElementById("amount").value;

    if (amount == '') {
        alert("Поле не может быть пустым!")
    }

    if (document.getElementById("largeLetters").checked) {
        var ll = true;
    }

    if (document.getElementById("smallLetters").checked) {
        var sl = true;
    }

    if (document.getElementById("numbers").checked) {
        var num = true;
    }

    if (document.getElementById("symbols").checked) {
        var symb = true;
    }

    alert(amount, ll, sl, num, symb);
}
