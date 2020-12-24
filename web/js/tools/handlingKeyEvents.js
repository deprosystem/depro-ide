function checkNameField(e) {
    var k = e.key;
    var kUp = k.toUpperCase();
    if ((kUp >= "A" && kUp <= "Z") || kUp == "_" || (kUp >= "0" && kUp <= "9") || 
            k == 'ArrowLeft' || k == 'ArrowRight' || k == 'Delete' || k == 'Backspace')  {
        return true;
    } else {
        tooltipMessage(e.currentTarget, "Только английские буквы, _ и цифры");
        return false;
    }
}