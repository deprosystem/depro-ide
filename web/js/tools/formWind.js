function formWind(w, h, t, l, tit) {
    let ww = document.createElement('div');
    ww.className = "dataWindow";
    ww.style.width = w + 'px';
    ww.style.height = h + 'px';
    ww.style.left = l + 'px';
    ww.style.top = t + 'px';
    let titleW = createTitle(tit);
    ww.appendChild(titleW);
    let contW = document.createElement('div');
    contW.style.cssText = "position:absolute;right:0px;bottom:0px;left:0px;top:56px;";
    ww.appendChild(contW);
    document.body.append(ww);
    return contW;
}

function formWindCenter(w, h, tit) {
    let ww = document.createElement('div');
    ww.className = "dataWindow";
    let w2 = w / 2;
    let h2 = h / 2;
    let st = 'width:' + w + 'px;height:' + h+ 'px;left:50%;top:50%;margin-top:-' + h2 + 'px;margin-left:-' + w2 + 'px;';
    ww.style.cssText = st;
    let titleW = createTitle(tit);
    ww.appendChild(titleW);
    let contW = document.createElement('div');
    contW.style.cssText = "position:absolute;right:0px;bottom:0px;left:0px;top:56px;";
    ww.appendChild(contW);
    document.body.append(ww);
    return contW;
}

function createTitle(tit) {
    var container = document.createElement('div')
    var str = "<div class='titleWind' onmousedown='moveWind(event)'>"
                +"<div class='titleWindName'>" + tit + "</div>"
                +"<IMG SRC='img/x_blue.png' class='titleWindClose' onclick='closeDataWindow(event)'>"
            +"</div>";
    container.innerHTML = str;
    return container.firstChild;
}

function closeDataWindow(e) {
    let el = e.target.parentElement.parentElement;
    el.parentNode.removeChild(el);
}

function closeWindow(el) {
    let el1 = parentWind(el);
    el1.parentNode.removeChild(el1);
}

function parentWind(el) {
    let el1 = el;
    while (el1.className != "dataWindow") {
        el1 = el1.parentElement;
        if (el1 == null) {
            return null;
        }
    }
    return el1;
}

function newElementFromString(st) {
    let container = document.createElement('div')
    container.innerHTML = st;
    return container.firstChild;
}

function createButtonBlue(tit, w) {
    var container = document.createElement('div')
    container.innerHTML = '<div style="cursor:pointer;width:' + w + 'px;height:30px;background:#1DACE9;border-radius:4px;margin-left:15px;margin-top:10px;float:left;">'
            +'<div style="text-align: center;margin-top:7px;color:#fff">'+ tit + '</div></div>';
    return container.firstChild;
}

function createButtonWeite(tit, w) {
    var container = document.createElement('div')
    container.innerHTML = '<div style="cursor:pointer;width:' + w + 'px;border:1px solid #1DACE9;height:28px;border-radius:4px;margin-left:10px;margin-top:10px;float:left;">'
            +'<div style="text-align: center;margin-top:7px;color:#1DACE9">'+ tit + '</div></div>';
    return container.firstChild;
}

function createFooter(h) {
    let container = document.createElement('div');
    container.style.cssText = "height:" + h + "px;bottom:0px;right:0px;left:0px;position:absolute;border-top:1px solid #C5DCFA;";
    return container;
}

