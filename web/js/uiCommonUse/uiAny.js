var uiCurrentComponent;

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

