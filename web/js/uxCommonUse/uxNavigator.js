var docNavigator = '<div onclick="navigatorCompon()" style="float:left;cursor:pointer;margin-left:20px;">'
        +'<div style="float:left;color:#2228;font-size:10px">Navigator</div>'
        +'<img style="float:left;margin-left:5px;" width="14" height="14" src="img/navigator.png">'
    +'</div>';

function navigatorCompon() {
    if (currentComponentDescr.navigator == null) {
        currentComponentDescr.navigator = [];
    }
    if (currentComponentDescr.type == "MenuBottom") {
        editDataWind(metaNavigatorMenuB, currentComponentDescr.navigator, saveNavigator);
    } else {
        let nnn = new formNavigator();
        nnn.init(currentComponentDescr.navigator);
//        editDataWind(metaNavigator, currentComponentDescr.navigator, saveNavigator);
    }
}

function saveNavigator(dat) {
    let ik = dat.length;
    for (let i = 0; i < ik; i++) {
        let item = dat[i];
        if (item.handler == "start") {
            let scr = item.param;
            if (scr != null && scr != "") {
                if (noScreen(scr)) {
                    createScreen(false, scr, "", 0);
                }
            }
        }
    }
}

function isValidNavigator(listNav, myScreen) {
    let strRes = "";
    let sep = "";
    let ik = listNav.length;
    for (let i = 0; i < ik; i++) {
        let item = listNav[i];
        if (item.handler == "start") {
            let scr = item.param;
            if (scr != null && scr != "") {
                if (myScreen != null && scr.toUpperCase() == myScreen) {
                    strRes += sep + "Calls itself " + scr;
                    sep = ", ";
                } else {
                    if (noScreen(scr)) {
                        strRes += sep + "no screen " + scr;
                        sep = ", ";
                    }
                }
            } else {
                strRes += sep + "screen for viewId " + item.viewId + " is not described";
                sep = ", ";
            }
        }
    }
    return strRes;
}
