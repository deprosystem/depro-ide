var currentWind;

function closeWind(event) {
    event.target.parentNode.parentNode.style.display = 'none';
}

function moveWind(event) {
    var x = event.pageX;
    var y = event.pageY;
    currentWind = event.currentTarget.parentNode;
    var x_block = currentWind.offsetLeft;
    var y_block = currentWind.offsetTop;

    delta_x = x_block - x;
    delta_y = y_block - y;
    document.onmousemove = dragWind;
    document.onmouseup = clearMoveWind;
}

function dragWind(event) {
    var x = event.pageX;
    var y = event.pageY;

    var new_x = delta_x + x;
    var new_y = delta_y + y;
    currentWind.style.top = new_y + "px";
    currentWind.style.left = new_x + "px";
}

function commonWindow(w, h, t, r, tit) {
    var ww = document.getElementById("commonWindow");
    ww.style.width = w + px;
    ww.style.height = h + px;
    ww.style.right = r + px;
    ww.style.top = t + px;
    ww.getElementsByClassName('titleWindName')[0].innerHTML = tit;
    ww.style.display = "block";
    return ww.getElementsByClassName('windContent')[0];
}

function closeCommonWindow() {
    document.getElementById("commonWindow").style.display = "none";
}

function clearMoveWind(e) {
    document.onmousemove = null;
}