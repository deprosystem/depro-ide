var currentWind;
var delta_x_wind, delta_y_wind;
var h_footerWind = 50;

function formWind(w, h, t, l, tit, scroll, cbClose, footName, footListener) {
    let ww = document.createElement('div');
    ww.className = "dataWindow";
    ww.style.width = w + 'px';
    ww.style.height = h + 'px';
    ww.style.boxShadow = "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)";
    if (l < 0) {
        ww.style.right = -l + 'px';
    } else {
        ww.style.left = l + 'px';
    }
    ww.style.top = t + 'px';
    let titleW = createTitle(tit, cbClose);
    ww.appendChild(titleW);
    let bott = 0;
    if (footName != null && footListener != null) {
        let controll = createFooter(h_footerWind);
        bott = h_footerWind + 1;
        ww.appendChild(controll);
//        addFooter(ww, controll);
        let buttonOk = createButtonBlue(footName);
        buttonOk.addEventListener("click", function(){footListener();closeWindow(ww);}, true);
        controll.appendChild(buttonOk);
        let buttonCancel = createButtonWeite('Cancel', 70);
        buttonCancel.addEventListener("click", function(event){closeWindow(ww);}, true);
        controll.appendChild(buttonCancel);
    }
    let contW = document.createElement('div');
    contW.style.cssText = "position:absolute;right:0px;bottom:" + bott + "px;left:0px;top:49px;";
    ww.appendChild(contW);
    document.body.append(ww);
    if (scroll != null && scroll) {
        let scrollQu = formViewScrolY(contW);
//        queryQueryData = scrollQu.getElementsByClassName("viewData")[0];
//        return queryQueryData;
        return scrollQu.getElementsByClassName("viewData")[0];
        
/*
        let viewport = document.createElement('div');
        viewport.className = "viewport";
        let content = document.createElement('div');
        content.className = "content";
        viewport.appendChild(content);
        contW.appendChild(viewport);
        let scrollVert = new scrollX(viewport, "scroll");
        scrollVert.init();
        return content;
*/
    } else {
        return contW;
    }
}

function addFooter(wind, footer) {
    if (wind.className == "content") {
        let viewP = wind.parentElement;
        let ww = viewP.parentElement;
        ww.appendChild(footer);
        let h = footer.getBoundingClientRect().height;
        viewP.style.bottom = h + "px";
        viewP.scroll_y.resize(viewP);
    } else {
        wind.appendChild(footer);
    }
}

function resizeScrol(w) {
    let vp = w.parentElement;
    let scr = vp.scroll_y;
    if (scr != null) {
        scr.resize(vp);
    }
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

function createTitle(tit, cbClose) {
    let cb = "";
    if (cbClose != null && cbClose != "") {
        cb = cbClose + '(this);';
    }
    let container = document.createElement('div')
    var str = "<div class='titleWind' onmousedown='moveWind(event)'>"
                +"<div style='float:left;height:100%;display:flex;flex-direction:row;align-items:center'><div class='titleWindName'>" + tit + "</div></div>"
                +"<div style='float:right;height:100%;display:flex;flex-direction:row;align-items:center'><IMG SRC='img/x_blue.png' class='titleWindClose' onclick='" + cb + "closeDataWindow(event)'></div>"
            +"</div>";
    container.innerHTML = str;
    return container.firstChild;
}

function closeDataWindow(e) {
//    let el = e.target.parentElement.parentElement;
    let el = e.target.closest('.dataWindow');
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
    if (w != null) {
        container.innerHTML = '<div style="cursor:pointer;width:' + w + 'px;height:30px;background:#1DACE9;border-radius:4px;margin-left:15px;margin-top:10px;float:left;">'
                +'<div style="text-align: center;margin-top:7px;color:#fff">'+ tit + '</div></div>';
    } else {
        container.innerHTML = '<div style="cursor:pointer;height:30px;background:#1DACE9;border-radius:4px;margin-left:15px;margin-top:10px;float:left;padding-left:7px;padding-right:7px">'
                +'<div style="text-align: center;margin-top:7px;color:#fff">'+ tit + '</div></div>';
    }
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

function moveWind(event) {
    var x = event.pageX;
    var y = event.pageY;
    currentWind = event.currentTarget.parentNode;
    var x_block = currentWind.offsetLeft;
    var y_block = currentWind.offsetTop;

    delta_x_wind = x_block - x;
    delta_y_wind = y_block - y;
    document.onmousemove = dragWind;
    document.onmouseup = clearMoveWind;
}

function dragWind(event) {
    var x = event.pageX;
    var y = event.pageY;

    var new_x = delta_x_wind + x;
    var new_y = delta_y_wind + y;
    currentWind.style.top = new_y + "px";
    currentWind.style.left = new_x + "px";
}

function clearMoveWind(e) {
    document.onmousemove = null;
}

//  ViewScrol заносится в wraperScroll
function formViewScrolY(wraperScroll) {
    let viewport = document.createElement('div');
    viewport.className = "viewport";
//    viewport.style.left = "3px";
    viewport.style.top = "0px";
    wraperScroll.appendChild(viewport);
//    queryFields.appendChild(viewport);
    
    let content = document.createElement('div');
    content.className = "content";
    viewport.appendChild(content);
    
    let viewDataY = document.createElement('div');
    viewDataY.className = "viewData";
    content.appendChild(viewDataY);

    let scrollY = new ScrollY(viewport, true);
    scrollY.setScrollHide(true);
    scrollY.init();
    return viewport;
}

