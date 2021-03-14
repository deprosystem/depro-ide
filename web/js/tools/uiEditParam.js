
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
    let num = '<div style="cursor: pointer;float: left;">'
            +'<div class="text_style_ui"></div> '
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
    el.appendChild(nn);
    return el;
}

function setNumberParamValue(el, v) {
    setValueNumber(el, v);
}

function editTextParam(title, w, val, cb) {
    let stHTML = '<div style="float:left;margin-left:10px"><div style="color: #2228;font-size: 10px;margin-left:4px">';
    let stHTML_1 = '</div><input class="txt_inp input_style" style="width:'; 
    let stHTML_2 = 'px" onkeyup="return ';
    let stHTML_3 = '(this)" value="';
    let stHTML_4 = '" type="text"/></div>';
    let vv = val;
    if (val == null) {
        vv = "";
    }
    return newDOMelement(stHTML + title + stHTML_1 + w + stHTML_2 + cb + stHTML_3 + vv + stHTML_4);
}


