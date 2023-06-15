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
                    let form = p.componParam.format;
                    if (form != null && form.length > 0) {
                        let offset = new Date().getTimezoneOffset() * 60000;
//                        Date dd = new Date(value + offset);
                        if (typeof value === "number") {
console.log("111 value="+value+" offset="+offset);
                            p.text = dateFormatV(value + offset, form);
                        } else {
                            p.text = value;
                        }
                    } else {
                        p.text = value;
                    }
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

function dateFormatV(val, format) {
    let dd = new Date(val);
console.log("VAL="+val+" format="+format+"<<");
//    let d = dd.getDate();
    let d = add0("" + dd.getDate())
    let m = add0("" + (dd.getMonth() + 1));
    let y = "" + dd.getFullYear();
    let stDat = format;
    
    
//    return dd.toString(format);
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


