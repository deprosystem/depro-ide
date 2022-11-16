function setDataToView(rec, p, cDescr) {
    let id = p.viewId;
    let value;
    if (id != null && id != "") {
        value = rec[id];
        if (value != undefined) {
            if (value == null) {
                value = "";
            }
            switch (p.type) {
                case "TextView":
                    p.emId = p.viewId;
                    p.emVal = p.text;
                    p.text = value;
                    return;
                case "Gallery":
                    let ik = value.length;
                    value = value.substring(1, ik - 1);
                    if (value != "") {
                        let arrUrl = value.split(",");
                        value = arrUrl[0];
                        value = value.substring(1, value.length - 1);
                    }
                case "ImageView":
                    p.emId = p.viewId;
                    p.emVal = p.src;
                    if (value != "" && value.indexOf("http") != 0) {
                        value = "https://deb-apps.dp-ide.com/" + value;
                    }
                    p.src = value;
                    return;
            }
        }
    }
    let ch = p.children;
    if (ch != null) {
        let ik = ch.length;
        if (ik > 0) {
            for (let i = 0; i < ik; i++)  {
                setDataToView(rec, ch[i], cDescr);
            }
        }
    }
}

function restoreView(p) {
    let id = p.viewId;
    if (p.emId != null && p.emId != "") {
        p.viewId = p.emId;
        switch (p.type) {
            case "TextView":
                p.text = p.emVal;
                return;
            case "Gallery":
            case "ImageView":
                p.src = p.emVal;
                return;
        }
        p.emId = undefined;
        p.emVal = undefined;
    }
    let ch = p.children;
    if (ch != null) {
        let ik = ch.length;
        if (ik > 0) {
            for (let i = 0; i < ik; i++)  {
                restoreView(ch[i]);
            }
        }
    }
}


