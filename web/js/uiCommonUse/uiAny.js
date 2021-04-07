//    var uiCurrentComponent;

function myComponentDescr(id) {      //      currentComponentDescr
    let ik = currentScreen.components.length;
    if (ik > 0) {
        for (let i = 0; i < ik; i++) {
            let it = currentScreen.components[i];
            if (it.componId == id) {
                return it;
            }
        }
        return null;
    } else {
        return null;
    }
}

function getComponentById(id) {     //      currentComponent
    return getCompById(currentChildren, id);
}

function getCompById(ch, id) {
    let ik = ch.length;
    for (let i = 0; i < ik; i++) {
        let chi = ch[i];
        if (chi.componId == id) {
            return chi;
        } else {
            if (chi.children != null && chi.children.length > 0) {
                let res = getCompById(chi.children, id);
                if (res != null) {
                    return res;
                }
            }
        }
    }
    return null;
}

function tryFindByViewId(vId) {
    return getCompByViewId(currentChildren, vId);
}

function getCompByViewId(ch, id) {
    let ik = ch.length;
    for (let i = 0; i < ik; i++) {
        let chi = ch[i];
        if (chi.viewId == id) {
            return chi;
        } else {
            if (chi.children != null && chi.children.length > 0) {
                let res = getCompByViewId(chi.children, id);
                if (res != null) {
                    return res;
                }
            }
        }
    }
    return null;
}

function checkValidityLinks(ch, tab) {
    let ik = ch.length;
    let res = "";
    for (let i = 0; i < ik; i++) {
        let chi = ch[i];
        let vId = chi.viewId;
        if (vId == null) {
            vId = "";
        } else {
            vId += ":";
        }
        if (chi.below != null && chi.below != "") {
            if ( ! isValidLink(ch, chi.below)) {
                chi.below = "";
                res += tab + vId + chi.type + " below." + chi.below + " no resource<br>";
            }
        }
        if (chi.above != null && chi.above != "") {
            if ( ! isValidLink(ch, chi.above)) {
                chi.above = "";
                res += tab + vId + chi.type + " above." + chi.above + " no resource<br>";
            }
        }
        if (chi.toRightOf != null && chi.toRightOf != "") {
            if ( ! isValidLink(ch, chi.toRightOf)) {
                chi.toRightOf = "";
                res += tab + vId + chi.type + " toRightOf." + chi.toRightOf + " no resource<br>";
            }
        }
        if (chi.toLeftOf != null && chi.toLeftOf != "") {
            if ( ! isValidLink(ch, chi.toLeftOf)) {
                chi.toLeftOf = "";
                res += tab + vId + chi.type + " toLeftOf." + chi.toLeftOf + " no resource<br>";
            }
        }
        chN = chi.children;
        if (chN != null && chN.length > 0) {
            let tt = tab;
            if (chN.length > 1) {
                tt += "&ensp;";
            }
            res += checkValidityLinks(chN, tt);
        }
    }
    return res;
}

function isValidLink(ch, id) {
    let ik = ch.length;
    for (let i = 0; i < ik; i++) {
        if (ch[i].viewId == id) {
            return true;
        }
    }
    return false;
}

function getCompByType(ch, id) {
    let ik = ch.length;
    for (let i = 0; i < ik; i++) {
        let chi = ch[i];
        if (chi.type == id) {
            return chi;
        } else {
            if (chi.children != null && chi.children.length > 0) {
                let res = getCompByViewId(chi.children, id);
                if (res != null) {
                    return res;
                }
            }
        }
    }
    return null;
}

