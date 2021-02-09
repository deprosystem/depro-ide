var docNavigator = '<div onclick="navigatorCompon()" style="float:left;cursor:pointer;margin-left:20px;">'
        +'<div style="float:left;color:#2228;font-size:10px">Navigator</div>'
        +'<img style="float:left;margin-left:5px;" width="14" height="14" src="img/navigator.png">'
    +'</div>';

function navigatorCompon() {
    if (currentComponentDescr.navigator == null) {
        currentComponentDescr.navigator = [];
    }
    editDataWind(metaNavigator, currentComponentDescr.navigator, saveNavigator);
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
