function validName(e) {
    var k = e.key;
    var kUp = k.toUpperCase();
    if ((kUp >= "A" && kUp <= "Z") || kUp == "_" || (kUp >= "0" && kUp <= "9") || 
            k == 'ArrowLeft' || k == 'ArrowRight' || k == 'Delete' || k == 'Backspace' || k == 'Shift' || k == 'Alt')  {
        return true;
    } else {
        tooltipMessage(e.currentTarget, "Только английские буквы, _ и цифры");
        return false;
    }
}

function validNameLower(e) {
    let k = e.key;
    if ((k >= "a" && k <= "z") || k == "_" || (k >= "0" && k <= "9") || 
            k == 'ArrowLeft' || k == 'ArrowRight' || k == 'Delete' || k == 'Backspace' 
            || k == "Tab" || k == 'ArrowDown' || k == 'ArrowUp' || k == 'Shift' || k == 'Alt')  {
        let el = e.target;
        if (el.value.length == 0 && k >= "0" && k <= "9") {
            tooltipMessage(e.currentTarget, "The first character cannot be a digit");
            return false;
        } else {
            return true;
        }
    } else {
        tooltipMessage(e.currentTarget, "Только английские буквы в нижнем регистре, _ и цифры");
        return false;
    }
}

function validNumber(event) {
    let k = event.keyCode;
    if (k < 47) {
        return true;
    } else {
        if (k < 48 || k > 57) {
            event.preventDefault();
            tooltipMessage(event.target, "Только цифры");
        }
    }
//    return false;
}