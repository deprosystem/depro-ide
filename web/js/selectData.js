


function createSelectTagFromString(list, num, on) {
    ll = list.split(",");
    return createSelectTag(ll, num, on);
}

function createSelectTag(ll, num, on) {
    let ik = ll.length;
    let st = '<select id="select' + on + '" onchange="set' + on + '(this)">';
    for (let i = 0; i < ik; i++) {
        let sel = "";
        if (num == i) {
            sel = "selected";
        }
        st += '<option ' + sel + '>' + ll[i] + '</option>'
    }
    st += '</select>';
    return st;
}

function createSelectTagValue(ll, value, on) {
    let ik = ll.length;
    let st = '<select id="select' + on + '" onchange="set' + on + '(this)">';
    for (let i = 0; i < ik; i++) {
        let sel = "";
        if (value == ll[i]) {
            sel = "selected";
        }
        st += '<option ' + sel + '>' + ll[i] + '</option>'
    }
    st += '</select>';
    return st;
}

function createSelect(ll, num, on) {
    var container = document.createElement('div')
    container.innerHTML = createSelectTag(ll, num, on);
    return container.firstChild;
}

function createSelectValue(ll, value, on) {
    var container = document.createElement('div')
    container.innerHTML = createSelectTagValue(ll, value, on);
    return container.firstChild;
}


//  Для below, abowe, ToRightOf, ToLeftOf
function formListViewId(el, name) {     //  Для below, abowe, ToRightOf, ToLeftOf
    let listEl = currentElement.parentElement.children;
    if (listEl != null && listEl.length > 0) {
        let ik = listEl.length;
        let arrViewId = [];
        arrViewId.push("");
        let myId = currentElement.android.viewId;
        if (myId == null) {
            myId = "";
        }
        for (let i = 0; i < ik; i++) {
            let p = listEl[i].android;
            if (p != null && p.viewId != null && p.viewId.length > 0) {
                if (p.viewId != myId) {
                    arrViewId.push(p.viewId);
                }
            }
        }
        el.innerHTML = "";
        if (arrViewId.length > 1) {
            let nn = name[0].toLowerCase() + name.slice(1);
            let vv = currentElement.android[nn];
            if (vv == null) {
                vv = "";
            }
            let sel = createSelectValue(arrViewId, vv, name);
            sel.style.width = "100px";
            el.appendChild(sel);
        }
    }
}

function formSelectTagType(type, on) {
    let listEl = currentElement.parentElement.children;
    if (listEl != null && listEl.length > 0) {
        let ik = listEl.length;
        let arrViewId = [];
        arrViewId.push("");
        for (let i = 0; i < ik; i++) {
            let p = listEl[i].android;
            if (p != null && p.type == type) {
                arrViewId.push(p.viewId);
            }
        }
        ik = arrViewId.length;
        if (ik > 1) {
            let p = currentElement.android;
            let oldValue = null;
            if (p.componParam == null) {
                p.componParam = {};
            } else {
                oldValue = p.componParam.bindEl;
            }
            
            let st = '<select style="width:100px;" onchange="' + on + '(this)">';
            for (let i = 0; i < ik; i++) {
                let sel = "";
                if (oldValue == arrViewId[i]) {
                    sel = "selected";
                }
                st += '<option ' + sel + '>' + arrViewId[i] + '</option>'
            }
            st += '</select>';
            return st;
        }
    }
    return "";
}

function formSelectForElem(type, onchange, initValue) {
    if (currentChildren != null) {
        let ik = currentChildren.length;
        let arr = [""];
        let initNum = -1;
        for (let i = 0; i < ik; i++) {
            let item = currentChildren[i];
            if (item.type == type) {
                arr.push(item.viewId);
                if (item.viewId == initValue) {
                    initNum = i;
                }
            }
        }
        return formSelectTagForType(arr, initNum, onchange);
    }
    return "";
}

function formSelectTagForType(ll, num, onchange) {
    let ik = ll.length;
    let st = '<select class="select_'+ browser + '" onchange="' + onchange + '(this)">';
    for (let i = 0; i < ik; i++) {
        let sel = "";
        if (num == i) {
            sel = "selected";
        }
        st += '<option ' + sel + '>' + ll[i] + '</option>'
    }
    st += '</select>';
    return st;
}

function formSelectForEditData(stOption, valueSel) {
    let container = document.createElement('div');
    let ll = stOption.split(",");
    let ik = ll.length;
    let st = '<select>';
    for (let i = 0; i < ik; i++) {
        let sel = "";
        if (valueSel == ll[i]) {
            sel = "selected";
        }
        st += '<option ' + sel + '>' + ll[i] + '</option>'
    }
    st += '</select>';
    container.innerHTML = st;
    return container.firstChild;
}

function formSelectStrValue(stOption, valueSel) {
    
}

