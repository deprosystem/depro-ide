var uiCurrentComponent;

function myComponent(id) {      //      currentComponentDescr
    let ik = currentScreen.components.length;
    if (ik > 0) {
        for (let i = 0; i < ik; i++) {
            let it = currentScreen.components[i];
            if (it.view.viewId == id) {
                return it;
            }
        }
        return null;
    } else {
        return null;
    }
}

function getComponentById(id) {     //      currentComponent
    let ik = currentChildren.length;
    for (let i = 0; i < ik; i++) {
        let ls = currentChildren[i];
        if (ls.typeUxUi == "ux") {
            if (ls.viewId == id) {
                return ls;
            }
        }
    }
    return null;
}
