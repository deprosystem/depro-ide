var TYPE_TEXT = 0, TYPE_INT = 1, TYPE_FLOAT = 3, TYPE_BOOLEAN = 4, TYPE_SELECT = 5, TYPE_IMG = 6;

function editDataWind(meta, data, obrSave, dopEl) {
    let windMenu = formWind(400, 300, 35, 250, meta.titleForm);
    let editDat = new EditData(meta.description, data, windMenu, obrSave, dopEl);
    if (dopEl == null) {
        windMenu.parentElement.style.width = (editDat.getWidthW() + 10) + "px";
    }
}

function formWind(w, h, t, r, tit) {
    let ww = document.createElement('div');
    ww.className = "dataWindow";
    ww.style.width = w + px;
    ww.style.height = h + px;
    ww.style.right = r + px;
    ww.style.top = t + px;
    let titleW = createTitle(tit);
    ww.appendChild(titleW);
    let contW = document.createElement('div');
    contW.style.cssText = "position:absolute;right:0px;bottom:0px;left:2px;top:20px;";
    ww.appendChild(contW);
    document.body.append(ww);
    return contW;
}

function createTitle(tit) {
    var container = document.createElement('div')
    var str = "<div class='titleWind' onmousedown='moveWind(event)'>"
                +"<div class='titleWindName'>" + tit + "</div>"
                +"<IMG SRC='img/x.gif' class='titleWindClose' onclick='closeDataWindow(event)'>"
            +"</div>";
    container.innerHTML = str;
    return container.firstChild;
}

function closeDataWindow(e) {
    let el = e.target.parentElement.parentElement;
    el.parentNode.removeChild(el);
}