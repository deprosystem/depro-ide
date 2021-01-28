function selectBlock(titl, val, cb, min, max, step) {
    let divRes = document.createElement('div');
    divRes.className = "inputBlock";
    let tit = document.createElement('div');
    tit.className = "text_style_ui";
    tit.innerHTML = titl;
    divRes.appendChild(tit);
    let divSelList = document.createElement('div');
    divSelList.cssText = "float: left;margin-top:3px";
    divSelList.className = "divSelList";
    divSelList.innerHTML = newSelList(val, cb);
    divRes.appendChild(divSelList);
    let numb = createNumber(50, 24, min, max, "changeSelectBlockNumb(this);" + cb, step);
    numb.style.float = "left";
    numb.className = "numb";
    numb.style.marginLeft = "8px";
    divSelList.appendChild(numb);
    return divRes;
}

function newSelList(val, cb) {
    let arrVal = val.split(",");
    let ik = arrVal.length;
    let st = "";
    for (let i = 0; i < ik; i++) {
        let vv = arrVal[i];
        st += '<div onclick="clearSelectValue(this);' + cb + '(' + vv + ');" class="el_marg_pad">' + vv + '</div>';
    }
    return st;
}

function clearSelectValue(el) {
    clearSelectList(el);
    let par = el.parentElement;
    let numb = par.getElementsByTagName("input")[0];
    if (numb != null) {
        numb.value = el.innerHTML;
    }
}

function clearSelectList(el) {
    let par = el.parentElement;
    let ch = par.children;
    let ik = ch.length - 1;
    for (let i = 0; i < ik; i++) {
        let item = ch[i];
        if (item == el) {
            item.style.backgroundColor = fonSel;
        } else {
            item.style.backgroundColor = "";
        }
    }
}

function changeSelectBlockNumb(el) {
    clearSelectList(el.parentElement);
}

function setValueSelectBlock(el, val) {
    if (val == null || val == "") return;
    let divSelList = el.getElementsByClassName("divSelList")[0];
    let ch = divSelList.getElementsByClassName("el_marg_pad");
    let ik = ch.length;
    for (let i = 0; i < ik; i++) {
        let item = ch[i];
        if (item.innerHTML == val) {
            item.style.backgroundColor = fonSel;
        } else {
            item.style.backgroundColor = "";
        }
    }
    let numb = divSelList.getElementsByClassName("numb")[0];
    setValueNumber(numb, val);
}

