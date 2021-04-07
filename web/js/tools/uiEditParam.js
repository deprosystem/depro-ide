
//    Разные виджеты для ввода параметров UI елемента Color, number, ...

function editColorParam(title, color, classN, cb) {
    let colorHTML = '<div onclick="setPickerEditColorParam(this)" style="cursor: pointer; margin-top: 5px;float: left;">'
            +'<div class="text_style_ui"></div> '
            +'<div class="colorEditParam" style="width: 30px; height: 30px; float: left; border: 1px solid #bbd4ef;border-radius:5px;"></div>'
        +'</div>';
    let stTit = "Color";
    if (title != null) {
        stTit = title;
    }
    let el = newDOMelement(colorHTML);
    el.getElementsByClassName("text_style_ui")[0].innerHTML = stTit;
    let elColor = el.getElementsByClassName("colorEditParam")[0];
    elColor.className += " " + classN;
    elColor.style.backgroundColor = color;
    el.callBackColor = cb;
    el.colorParam = elColor;
    return el;
}

function setPickerEditColorParam(el) {
    let elColor = el.getElementsByClassName("colorEditParam")[0];
    openPickerColor(elColor.style.backgroundColor, el.callBackColor);
}

function editNumberParam(title, w, h, min, max, cb, stepN) {
    let num = '<div style="float: left;"><div class="text_style_ui"></div></div>';
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
    let stHTML = '<div style="float:left;"><div style="color: #2228;font-size: 10px;margin-left:4px">';
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

function editCheckbox(title, val, cb) {
    valCh = "check-act";
    if (val != null && val) {
        valCh = "check-sel_1";
    }
    let changFirst = '<div style="float:left;">'
                +'<div style="font-size:10px;color:#2228">' + title + '</div>'
                +'<img class="_check" onclick="' + cb + '(checkEditCheckbox(this));" style="cursor:pointer;margin-top:5px;margin-left:14px" width="16" height="16" src="img/' 
                + valCh + '.png">'
            +'</div>';
    return newDOMelement(changFirst);
}

function checkEditCheckbox(el) {
    let check = el.src.indexOf("check-sel") == -1;
    if (check) {
        el.src = "img/check-sel_1.png";
    } else {
        el.src = "img/check-act.png";
    }    
    return check;
}

function editImage(title, value, cb) {
    if (value == null) {
        value = "";
    }
    let stHtml = '<div style="float:left;"><div style="font-size:10px;color:#2228">' 
    let stHtml_1 = '</div><img onclick="setImgListSel(this,';
    let stHtml_2 = ')" class="imageV" style="border:2px solid #bdf;border-radius:4px;cursor:pointer" width="24" height="24" src="';
    let stHtml_3 = '"></div>';
    return newDOMelement(stHtml + title + stHtml_1 + cb + stHtml_2 + value + stHtml_3);
}

function setImgListSel(el, cb) {
    selectListImageEl(el, cb);
}

