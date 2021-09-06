
function elUX(title, left) {
    let marg_L = "";
    if (left != null) {
        marg_L = "margin-left:" + left + "px";
    }
    let res = newDOMelement('<div style="float:left;' + marg_L + '"></div>');
    res.append(newDOMelement('<div style="color: #2228;font-size: 10px;margin-left:4px">' + title + '</div>'));
    return res;
}

function newOptionsTypeUX(type, vv) {
    let comp = currentScreen.components;
    let ik = comp.length;
    let st = "<option></option>";
    for (let i = 0; i < ik; i++) {
        let item = comp[i];
        if (item.type == type) {
            let sel = "";
            if (vv == item.view.viewId) {
                sel = " selected";
            }
            st += '<option' + sel + '>' + item.view.viewId + '</option>'
        }
    }
    return st;
}
