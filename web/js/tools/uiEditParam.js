
//    Разные виджеты для ввода параметров UI елемента Color, number, ...

function editColorParam(cb, title) {
    let color = '<div onclick="setPickerEditColorParam(this)" style="cursor: pointer; margin-top: 5px;float: left;">'
            +'<div class="text_style_ui"></div> '
            +'<div class="colorEditParam" style="width: 30px; height: 30px; float: left; border: 1px solid #bbd4ef;border-radius:5px;"></div>'
        +'</div>';
    let stTit = "Color";
    if (title != null) {
        stTit = title;
    }
    let el = newDOMelement(color);
    el.getElementsByClassName("text_style_ui")[0].innerHTML = stTit;
    let elColor = el.getElementsByClassName("colorEditParam")[0];
    el.callBackColor = cb;
    el.colorParam = elColor;
    return el;
}

function setPickerEditColorParam(el) {
    let elColor = el.getElementsByClassName("colorEditParam")[0];
    openPickerColor(elColor.style.backgroundColor, el.callBackColor);
}

function editNumberParam(title, w, h, min, max, cb, stepN) {
    let num = '<div style="cursor: pointer; margin-top: 5px;float: left;">'
            +'<div class="text_style_ui"></div> '
//            +'<div class="colorEditParam" style="width: 30px; height: 30px; float: left; border: 1px solid #bbd4ef;border-radius:5px;"></div>'
        +'</div>';
        let stTit = "??";
    if (title != null) {
        stTit = title;
    }
    let el = newDOMelement(num);
    el.getElementsByClassName("text_style_ui")[0].innerHTML = stTit;
    
    let nn = createNumber(w, h, min, max, cb, stepN);
    nn.style.float = "left";
    nn.style.clear = "both";
    nn.style.marginTop = "5px";
    el.appendChild(nn);
    return el;
}


