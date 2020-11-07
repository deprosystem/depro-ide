function setNavigatorRoot() {
    navigatorEl.innerHTML = '';
    var item = createItemEl(root);
    navigatorEl.appendChild(item);
}

function addNavigatorEl(el) {
    var item = createItemEl(el);
    var parent = el.android.parent;
    var navParent = parent.android.itemNav;
    var pm = navParent.getElementsByClassName('plus-minus')[0];
    if (pm.innerHTML == '&nbsp;') {
        pm.innerHTML = '-';
        pm.style.cursor = 'pointer';
    }
    var ic = navParent.getElementsByClassName('item-compon')[0];
    if (ic.style.display == 'none') {
        ic.style.display = 'block';
    }
    var iName = item.getElementsByClassName('item-name')[0];
    if (selectViewElement != null) {
        selectViewElement.style.backgroundColor = '#fff';
    }
    selectViewElement = iName;
    iName.style.backgroundColor = '#ffe0e0';
    ic.appendChild(item);
}

function cleanNavigatorEl(el) {
    var item = el.android.itemNav;
    var pm = item.getElementsByClassName('plus-minus')[0];
    pm.innerHTML = '&nbsp;';
    var ic = item.getElementsByClassName('item-compon')[0];
    ic.style.display = 'none';
    ic.innerHTML = "";
    var iName = item.getElementsByClassName('item-name')[0];
    if (selectViewElement != null) {
        selectViewElement.style.backgroundColor = '#fff';
    }
    selectViewElement = iName;
    iName.style.backgroundColor = '#ffe0e0';
//    ic.appendChild(item);
}

function setNavigator0() {
    navigatorEl.innerHTML = '';
    setNavigator(root_g, navigatorEl);
}

function setNavigator(el, cont) {
    var res = 0;
    var child = el.childNodes;
    var ik = child.length;
    if (ik > 0) {
        for (var i = 0; i < ik; i++) {
            var childI = child[i];
            if (childI.android !=  undefined) {
                res ++;
                var item = createItem();
                var pm = item.getElementsByClassName('plus-minus')[0];
                var item_name = item.getElementsByClassName('item-name')[0];
                if (childI.android.viewId != null) {
                    item_name.innerHTML = childI.android.viewId + ': ' + childI.android.type;
                } else {
                    item_name.innerHTML = childI.android.type;
                }
                item_name.elementLink = childI;
                item_name.style.cursor = 'pointer';
                item_name.oncontextmenu = n_contMenuStart;
                var cc = setNavigator(childI, item.getElementsByClassName('item-compon')[0]);
                if (cc > 0) {
                    pm.innerHTML = '+';
                    pm.style.cursor = 'pointer';
                } else {
                    pm.innerHTML = '&nbsp;';
                }
                cont.appendChild(item);
            }
        }
    }
    return res;
}

function selectNavigatorEl(el) {
    var item = el.android.itemNav;
    var item_name = item.getElementsByClassName('item-name')[0];
    if (selectViewElement != null) {
        selectViewElement.style.backgroundColor = '#fff';
    }
    selectViewElement = item_name;
    item_name.style.backgroundColor = '#ffe0e0';
}

function createItemEl(el) {
    var item = createItem();
    var pm = item.getElementsByClassName('plus-minus')[0];
    var item_name = item.getElementsByClassName('item-name')[0];
    var p = el.android;
    if (p.viewId != null) {
        item_name.innerHTML = p.viewId + ': ' + p.type;
    } else {
        item_name.innerHTML = p.type;
    }
    item_name.elementLink = el;
    item_name.style.cursor = 'pointer';
    item_name.oncontextmenu = n_contMenuStart;
    pm.innerHTML = '&nbsp;';
    p.itemNav = item;
    return item;
}

function createItem() {
    var container = document.createElement('div');
    container.innerHTML = '<div style="display:block;clear:both;">\n' +
                    '<div class="plus-minus" onclick="openItem(this)" style="float:left; color:#aaa; width: 15px;">' +
                    '</div>\n<div class="item-name" onclick="selectElement(this)"></div>\n' +
                    '<div class="item-compon" style="margin-left: 25px; display: none;">\n</div>\n</div>';
    return container.firstChild;
}

function selectElement(el) {
    if (selectViewElement != null) {
        selectViewElement.style.backgroundColor = '#fff';
    }
    selectViewElement = el;
    el.style.backgroundColor = '#ffe0e0';
    hideContourEl();
    currentElement = el.elementLink;
    setParamCompon();
    setPickElement(currentElement);
}

function openItem(el) {
    var par = el.parentNode;
    var item = par.getElementsByClassName("item-compon")[0];
    if (item.style.display == 'none') {
        el.innerHTML = '-';
        item.style.display = 'block';
    } else {
        el.innerHTML = '+';
        item.style.display = 'none';
    }
}
