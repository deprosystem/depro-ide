var MATCH = -1, WRAP = -2;
var paramCompon;
var selectGravityL;
var marginBlock, paddingBlock;
var listImg;
var fonSel = "#deeaff";
var fonNo = "#0000";

function setParamCompon() {
    layoutParam.style.display = 'block';
    paramCompon = currentElement.android;
    marginBlock = document.getElementById('margin_block');
    paddingBlock = document.getElementById('padding_block');
    el_type.innerHTML = paramCompon.type;
    
    setVisibility(paramCompon.visibility == null || paramCompon.visibility);

    if (paramCompon.viewId != undefined) {
        el_id_input.value = paramCompon.viewId;
    } else {
        el_id_input.value = '';
    }
    el_id_input.onkeydown = keydown_el_id;
    if (paramCompon.gravLayout != null) {
        if (paramCompon.gravLayout.h != null) {
            var child_h = gravLayoutH.children;
            for (var i = 0; i < 3; i++) {
                if (i == paramCompon.gravLayout.h) {
                    child_h[i].style.backgroundColor = fonSel;
                } else {
                    child_h[i].style.backgroundColor = '';
                }
            }
        }
        if (paramCompon.gravLayout.v != null) {
            var child_h = document.getElementById("gravLayoutV").children;
            for (var i = 0; i < 3; i++) {
                if (i == paramCompon.gravLayout.v) {
                    child_h[i].style.backgroundColor = fonSel;
                } else {
                    child_h[i].style.backgroundColor = '';
                }
            }
        }
    }

    if (paramCompon.gravity != null) {
        if (paramCompon.gravity.h != null) {
            var child_h = document.getElementById("gravityH").children;
            for (var i = 0; i < 3; i++) {
                if (i == paramCompon.gravity.h) {
                    child_h[i].style.backgroundColor = fonSel;
                } else {
                    child_h[i].style.backgroundColor = '';
                }
            }
        }
        if (paramCompon.gravity.v != null) {
            var child_h = document.getElementById("gravityV").children;
            for (var i = 0; i < 3; i++) {
                if (i == paramCompon.gravity.v) {
                    child_h[i].style.backgroundColor = fonSel;
                } else {
                    child_h[i].style.backgroundColor = '';
                }
            }
        }
    }
    if (paramCompon.visibility == null || paramCompon.visibility) {
        visibility.checked = true;
    } else {
        visibility.checked = false;
    }
    
    formListViewId(belowParam, 'Below');
    formListViewId(aboveParam, 'Above');
    formListViewId(toRightOfParam, 'ToRightOf');
    formListViewId(toLeftOfParam, 'ToLeftOf');

//    el_w_match = document.getElementById('el_w_match');
    el_w_match.onclick = click_el_w_match;
//    el_w_wrap = document.getElementById('el_w_wrap');
    el_w_wrap.onclick = click_el_w_wrap;
//    el_w_input = document.getElementById('el_w_input');
    el_w_input.onkeydown = keydown_el_w_input;
    el_w_input.value = '';
    el_w_match.style.backgroundColor = '#fff';
    el_w_wrap.style.backgroundColor = '#fff';
    if (paramCompon.width == MATCH) {
        el_w_match.style.backgroundColor = fonSel;
    } else if (paramCompon.width == WRAP) {
        el_w_wrap.style.backgroundColor = fonSel;
    } else {
        el_w_input.value = paramCompon.width;
    }
    
//    el_h_match = document.getElementById('el_h_match');
    el_h_match.onclick = click_el_h_match;
//    el_h_wrap = document.getElementById('el_h_wrap');
    el_h_wrap.onclick = click_el_h_wrap;
//    el_h_input = document.getElementById('el_h_input');
    el_h_input.onkeydown = keydown_el_h_input;
    el_h_input.value = '';
    el_h_match.style.backgroundColor = '#fff';
    el_h_wrap.style.backgroundColor = '#fff';
    if (paramCompon.height == MATCH) {
        el_h_match.style.backgroundColor = fonSel;
    } else if (paramCompon.height == WRAP) {
        el_h_wrap.style.backgroundColor = fonSel;
    } else {
        el_h_input.value = paramCompon.height;
    }
    
    var marg = document.getElementById('margin_block');
    if (root == currentElement) {
        marg.style.display = 'none';
    } else {
        marg.style.display = 'block';
        clearMargPadParam(marg);
        setMargPadParam(marg, valueMarg);
    }

    var pad = document.getElementById('padding_block');
    clearMargPadParam(pad);
    setMargPadParam(pad, valuePad);
    
    if (paramCompon.background == null) {
        bg_color.style.backgroundColor = '#ffffff';
    } else {
        if (paramCompon.background == 100000) {
            bg_img.src = paramCompon.src;
        } else {
            bg_color.style.backgroundColor = findColorByIndex(paramCompon.background);
            bg_img.src = "";
        }
    }
    setContent();
    scrLayoutAttr.scroll_y.resize(scrLayoutAttr);
    hideSize.style.display = "none";
    hideGrav.style.display = "none";
    hideBackgr.style.display = "none";
    hideBALR.style.display = "none";
    hideMarg.style.display = "none";
    hidePad.style.display = "none";
    if (paramCompon.hideParam != null || paramCompon.hideParam > 0) {
        let hid = paramCompon.hideParam;
        if ((hid & 1) > 0) {
            hideSize.style.display = "block";
        }
        if ((hid & 2) > 0) {
            hideGrav.style.display = "block";
        }
        if ((hid & 4) > 0) {
            hideBackgr.style.display = "block";
        }
        if ((hid & 8) > 0) {
            hideBALR.style.display = "block";
        }
        if ((hid & 16) > 0) {
            hideMarg.style.display = "block";
        }
        if ((hid & 32) > 0) {
            hidePad.style.display = "block";
        }
    }
}

function setContent() {
    try {
        uiFunction = eval("new ui" + paramCompon.type + "();");
        uiFunction.setContent(paramCompon)
    } catch(e) { 
        contentAttributes.innerHTML = "";
    }
}

function setMargPadParam(elMP, func) {
    var children = elMP.children;
    var ik = children.length;
    var el;
    for (var i = 0; i < ik; i++) {
        el = children[i];
        var value = func(el.firstElementChild.innerHTML);
        if (value != undefined) {
            var childEl = el.firstElementChild.nextElementSibling;
            var last = el.lastElementChild.previousElementSibling;
            var isVal = false;
            while (childEl != last) {
                if (childEl.innerHTML == value) {
                    childEl.style.backgroundColor = fonSel;
                    isVal = true;
                    break;
                }
                childEl = childEl.nextElementSibling;
            }
            if ( ! isVal) {
                last.value = value;
            }
        }
    }
}

function valuePad(type) {
    var value;
    switch (type) {
        case 'L:':
            value = paramCompon.leftPad;
            break;
        case 'T:':
            value = paramCompon.topPad;
            break;
        case 'R:':
            value = paramCompon.rightPad;
            break;
        case 'B:':
            value = paramCompon.bottomPad;
            break;
        case 'padding:':
            value = paramCompon.padding;
            break;
    }
    return value;
}

function valueMarg(type) {
    var value;
    switch (type) {
        case 'L:':
            value = paramCompon.leftMarg;
            break;
        case 'T:':
            value = paramCompon.topMarg;
            break;
        case 'R:':
            value = paramCompon.rightMarg;
            break;
        case 'B:':
            value = paramCompon.bottomMarg;
            break;
        case 'margin:':
            value = paramCompon.margin;
            break;
    }
    return value;
}

function clearMargPadParam(elMP) {
    var children = elMP.children;
    var ik = children.length;
    var el;
    for (var i = 0; i < ik; i++) {
        el = children[i];
        var childEl = el.firstElementChild.nextElementSibling;
        var last = el.lastElementChild.previousElementSibling;
        while (childEl != last) {
            childEl.style.backgroundColor = '';
            childEl = childEl.nextElementSibling;
        }
        last.value = '';
    }
}

function setSelectValue(el, value) {
    var childEl = el.firstElementChild.nextElementSibling;
    var last = el.lastElementChild;
    while (childEl != last) {
        if (childEl.innerHTML == value) {
            childEl.style.backgroundColor = fonSel;
        } else {
            childEl.style.backgroundColor = '';
        }
        childEl = childEl.nextElementSibling;
    }
    last.value = value;
}

function keydown_el_id(e) {
    if (e.keyCode == 13) {
        paramCompon.viewId = el_id_input.value;
        var item_name = paramCompon.itemNav.getElementsByClassName('item-name')[0];
        if (paramCompon.viewId != null && paramCompon.viewId != '') {
            item_name.innerHTML = paramCompon.viewId + ': ' + paramCompon.type;
        } else {
            item_name.innerHTML = paramCompon.type;
        }
    }
}

function click_el_w_match() {
    el_w_wrap.style.backgroundColor = '';
    el_w_match.style.backgroundColor = fonSel;
    paramCompon.width = MATCH;
    el_w_input.value = '';
    viewCompon();
}

function click_el_w_wrap() {
    el_w_wrap.style.backgroundColor = fonSel;
    el_w_match.style.backgroundColor = '';
    paramCompon.width = WRAP;
    el_w_input.value = '';
    viewCompon();
}

function keydown_el_w_input(e) {
    if (e.keyCode == 13) {
        el_w_wrap.style.backgroundColor = '';
        el_w_match.style.backgroundColor = '';
        paramCompon.width = parseInt(el_w_input.value);
        viewCompon();
    }
}

function click_el_h_match() {
    el_h_wrap.style.backgroundColor = '';
    el_h_match.style.backgroundColor = fonSel;
    el_h_input.value = '';
    paramCompon.height = MATCH;
    viewCompon();
}

function click_el_h_wrap() {
    el_h_wrap.style.backgroundColor = fonSel;
    el_h_match.style.backgroundColor = '';
    el_h_input.value = '';
    paramCompon.height = WRAP;
    viewCompon();
}

function keydown_el_h_input(e) {
    if (e.keyCode == 13) {
        el_h_wrap.style.backgroundColor = '';
        el_h_match.style.backgroundColor = '';
        paramCompon.height = parseInt(el_h_input.value);
        viewCompon();
    }
}

function clickGravityL(el) {
    if (selectGravityL != null) {
        selectGravityL.style.backgroundColor = '#0000';
    }
    selectGravityL = el;
    el.style.backgroundColor = '#f00';
    var cc = el.innerHTML;
    var c = Math.trunc(cc / 3);
    var r = cc % 3;
    var p = currentElement.android;
    p.gravLayout.h = r;
    p.gravLayout.v = c;
    viewCompon();
}

function gravLayoutHorisontal(el, val) {
    var child = el.parentNode.children;
    for (var i = 0; i < 3; i++) {
        child[i].style.backgroundColor = '';
    }
    var p = currentElement.android;
    if (p.gravLayout.h == val) {
        p.gravLayout.h = NONE;
    } else {
        p.gravLayout.h = val;
        el.style.backgroundColor = fonSel;
    }
    p.toRightOf = "";
    p.toLeftOf = "";
    viewCompon();
}

function gravLayoutVertical(el, val) {
    var child = el.parentNode.children;
    for (var i = 0; i < 3; i++) {
        child[i].style.backgroundColor = '';
    }
    var p = currentElement.android;
    if (p.gravLayout.v == val) {
        p.gravLayout.v = NONE;
    } else {
        p.gravLayout.v = val;
        el.style.backgroundColor = fonSel;
    }
    viewCompon();
}

function gravHorisontal(el, val) {
    var child = el.parentNode.children;
    for (var i = 0; i < 3; i++) {
        child[i].style.backgroundColor = '';
    }
    var p = currentElement.android;
    if (p.gravity.h == val) {
        p.gravity.h = NONE;
    } else {
        p.gravity.h = val;
        el.style.backgroundColor = fonSel;
    }
    viewCompon();
}

function gravVertical(el, val) {
    var child = el.parentNode.children;
    for (var i = 0; i < 3; i++) {
        child[i].style.backgroundColor = '';
    }
    var p = currentElement.android;
    if (p.gravity.v == val) {
        p.gravity.v = NONE;
    } else {
        p.gravity.v = val;
        el.style.backgroundColor = fonSel;
    }
    viewCompon();
}

function closepopUp() {
    popUp.style.display = 'none';
}

function setMargin(el) {
    var p = currentElement.android;
    var type = el.parentNode.firstElementChild.innerHTML;
    margPadClear(el);
    el.style.backgroundColor = fonSel;
    var value = el.innerHTML;
    switch (type) {
        case 'L:':
            if (p.leftMarg == value) {
                p.leftMarg = '';
                el.style.backgroundColor = '';
            } else {
                p.leftMarg = value;
            }
            break;
        case 'T:':
            if (p.topMarg == value) {
                p.topMarg = '';
                el.style.backgroundColor = '';
            } else {
                p.topMarg = value;
            }
            break;
        case 'R:':
            if (p.rightMarg == value) {
                p.rightMarg = '';
                el.style.backgroundColor = '';
            } else {
                p.rightMarg = value;
            }
            break;
        case 'B:':
            if (p.bottomMarg == value) {
                p.bottomMarg = '';
                el.style.backgroundColor = '';
            } else {
                p.bottomMarg = value;
            }
            break;
        case ' :':
            if (p.margin == value) {
                p.margin = '';
                el.style.backgroundColor = '';
            } else {
                p.margin = value;
            }
            break;
    }
    viewCompon();
}

function inputMarg(e, el) {
    if (e.keyCode == 13) {
        var value = el.value;
        margPadClear(el);
        el.value = value;
        var type = el.parentNode.firstElementChild.innerHTML;
        switch (type) {
            case 'L:':
                paramCompon.leftMarg = value;
                break;
            case 'T:':
                paramCompon.topMarg = value;
                break;
            case 'R:':
                paramCompon.rightMarg = value;
                break;
            case 'B:':
                paramCompon.bottomMarg = value;
                break;
            case ' :':
                paramCompon.margin = value;
                break;
        }
        viewCompon();
    }
}

function backgroundClear(el) {
    var p = currentElement.android;
    p.background = null;
    p.drawable = null;
    p.src = null;
    bg_color.style.backgroundColor = "";
    bg_img.src = "";
    viewCompon();
}

function margClear(el) {
    margPadClear(el);
    var type = el.parentNode.firstElementChild.innerHTML;
    switch (type) {
        case 'L:':
            paramCompon.leftMarg = '';
            break;
        case 'T:':
            paramCompon.topMarg = '';
            break;
        case 'R:':
            paramCompon.rightMarg = '';
            break;
        case 'B:':
            paramCompon.bottomMarg = '';
            break;
        case ' :':
            paramCompon.margin = '';
            break;
    }
    viewCompon();
}

function padClear(el) {
    margPadClear(el);
    var type = el.parentNode.firstElementChild.innerHTML;
    switch (type) {
        case 'L:':
            paramCompon.leftPad = '';
            break;
        case 'T:':
            paramCompon.topPad = '';
            break;
        case 'R:':
            paramCompon.rightPad = '';
            break;
        case 'B:':
            paramCompon.bottomPad = '';
            break;
        case ' :':
            paramCompon.padding = '';
            break;
    }
    viewCompon();
}

function margPadClear(el) {
    let par = el.parentElement;
    let ch = par.getElementsByTagName('div');
    let ik = ch.length;
    for (let i = 1; i < ik; i++) {
        ch[i].style.backgroundColor = '';
    }
    par.getElementsByTagName('input')[0].value = "";
}

function setPadding(el) {
    var p = currentElement.android;
    var type = el.parentNode.firstElementChild.innerHTML;
    margPadClear(el);
    el.style.backgroundColor = fonSel;
    var value = el.innerHTML;
    switch (type) {
        case 'L:':
            if (p.leftPad == value) {
                p.leftPad = '';
                el.style.backgroundColor = '';
            } else {
                p.leftPad = value;
            }
            break;
        case 'T:':
            if (p.topPad == value) {
                p.topPad = '';
                el.style.backgroundColor = '';
            } else {
                p.topPad = value;
            }
            break;
        case 'R:':
            if (p.rightPad == value) {
                p.rightPad = '';
                el.style.backgroundColor = '';
            } else {
                p.rightPad = value;
            }
            break;
        case 'B:':
            if (p.bottomPad == value) {
                p.bottomPad = '';
                el.style.backgroundColor = '';
            } else {
                p.bottomPad = value;
            }
            break;
        case ' :':
            if (p.padding == value) {
                p.padding = '';
                el.style.backgroundColor = '';
            } else {
                p.padding = value;
            }
            break;
    }
    viewCompon();
}

function inputPad(e, el) {
    if (e.keyCode == 13) {
        var value = el.value;
        margPadClear(el);
        el.value = value;
        var type = el.parentNode.firstElementChild.innerHTML;
        switch (type) {
            case 'L:':
                paramCompon.leftPad = value;
                break;
            case 'T:':
                paramCompon.topPad = value;
                break;
            case 'R:':
                paramCompon.rightPad = value;
                break;
            case 'B:':
                paramCompon.bottomPad = value;
                break;
            case ' :':
                paramCompon.padding = value;
                break;
        }
        viewCompon();
    }
}

function setToolTextSize(el) {
    var p = currentElement.android;
    textSizeClear(el, true);
    el.style.backgroundColor = fonSel;
    var value = el.innerHTML;
    textSize.value = value;
    p.textSize = parseInt(value);
    viewCompon();
}

function setEditTextSize(el) {
    var p = currentElement.android;
    textSizeClear(el, true);
    el.style.backgroundColor = fonSel;
    var value = el.innerHTML;
    editTextSize.value = value;
    p.textSize = parseInt(value);
    viewCompon();
}

function changeToolTextSize(el) {
    var p = currentElement.android;
    textSizeClear(el, false);
    var value = el.value;
    p.textSize = value;
    viewCompon();
}

function textSizeClear(el, lastClear) {
    var childEl = el.parentNode.firstElementChild.nextElementSibling;
    var last = el.parentNode.lastElementChild;
    while (childEl != last) {
        childEl.style.backgroundColor = '';
        childEl = childEl.nextElementSibling;
    }
    if (lastClear) {
        last.value = '';
    }
}

function changeScaleType(el) {
    currentElement.android.scaleType = el.selectedIndex;
    viewCompon();
}

function setAbove() {
    let st = selectAbove.options[selectAbove.selectedIndex].value;
    currentElement.android.above = st;
    viewCompon();
}

function setBelow() {
    let st = selectBelow.options[selectBelow.selectedIndex].value;
    currentElement.android.below = st;
    viewCompon();
}

function setToRightOf(el) {
    let st = el.options[el.selectedIndex].value;
    currentElement.android.toRightOf = st;
    viewCompon();
}

function setToLeftOf(el) {
    let st = el.options[el.selectedIndex].value;
    currentElement.android.toLeftOf = st;
    viewCompon();
}

function checkVisibility(el) {
    let check = visibility.src.indexOf("check-sel") == -1;
    currentElement.android.visibility = check;
    setVisibility(check);
}

function setVisibility(check) {
    if (check) {
        visibility.src = "img/check-sel.png";
        let vv = "block";
        if (currentElement.oldDisplay != null && currentElement.oldDisplay != "none") {
            vv = currentElement.oldDisplay;
        }
        currentElement.style.display = vv;
    } else {
        visibility.src = "img/check-act.png";
        currentElement.oldDisplay = currentElement.style.display;
        currentElement.style.display = "none";
    }
}

function setImgBG(e) {
    selectListImage(e, cbImgBG);
}

function cbImgBG(i) {
    let nn = listImage[i];
    bg_img.src = nn;
    let p = currentElement.android;
    p.background = 100000;
    p.src = nn;
    viewCompon();
}