//var selectMethodInModel = "";
let uxModel1 = '<div class="model_view" style="height:40px;">'
        +'<div style="float:left;"><div style="color:#2228;font-size: 10px;margin-left:4px">Method</div>'
        +'<select class="model_method type_screen select_';

let uxModel2 = '" onchange="changeMethod(this)" style="width:120px;"><option>GET</option><option>POST</option><option>FILTER</option><option>TEST</option>'
            +'<option>JSON</option><option>PARAMETERS</option>'
            +'<option>GLOBAL</option><option>ARGUMENTS</option><option>PROFILE</option><option>FIELD</option><option>GET_DB</option>'
            +'<option>POST_DB</option><option>INSERT_DB</option><option>DEL_DB</option><option>UPDATE_DB</option><option>NULL</option></select>'
        +'</div>'
        +'<div class="param_method" style="float:left;margin-left:10px;"></div>';

let pmUrl = '<div style="display:inline-block;"><div style="color:#2228;font-size:10px;margin-left:4px">URL</div>'
            +'<input class="url input_style" onkeyup="return clickUpURL(event)" style="color:#000a" type="text" size="20" value=""/>'
            +'</div>';
let pmJson = '<div style="display:inline-block;"><div style="color:#2228;font-size:10px;margin-left:4px">Text JSON</div>'
            +'<input class="url input_style" onkeyup="return clickUpURL(event)" style="color:#000a" type="text" size="60" value=""/>'
            +'</div>';
let pmParamUrl = '<div style="display:inline-block;margin-left:10px"><div style="color: #2228;font-size: 10px;margin-left:4px">URL Parameters</div>'
            +'<input class="param input_style" onchange="changeUrlParam(this.value)" style="color:#000a" type="text" size="15" value=""/>'
            +'</div>';
let pmParameters = '<div style="display:inline-block;margin-left:10px"><div style="color: #2228;font-size: 10px;margin-left:4px">Parameters</div>'
            +'<input class="param input_style" onchange="changeUrlParam(this.value)" style="color:#000a" type="text" size="15" value=""/>'
            +'</div>';
let pmProgr = '<div class="progr_mod" style="display:inline-block;margin-left:10px;">\n\
                <div class="text_style_ui">Progress</div>\n\
            </div>';
    
let pmTest = '<img onclick="formTestData(this)" width="18" height="18" style="margin-left:10px;margin-top:17px;cursor:pointer;margin-right:5px;" src="img/pen.png">';

function uxModelView(listenerV, listenerH, addType) {
    des = dataDescr(listenerV, listenerH, addType);
//  currentProject.whereServer
    return uxModel1 + browser + uxModel2 + des + '</div><div class="severalDataTypes" style="height:40px;margin-top:5px;display:none;"></div>';
}

function dataDescr(v, h, addType) {
    let vv = "", hh = "", addT = "";
    let styleVV = "clear:both;";
    if (h != null && h.length > 0) {
        hh = '<img onclick="' + h + '(this, 0)" width="16" height="16" src="img/form_protot_hor.png" style="margin-top:4px;margin-left:10px;float:left;clear:both;cursor:pointer;">';
        styleVV = "";
    }
    if (v != null && v.length > 0) {
        vv = '<img onclick="' + v + '(this, 0)" width="16" height="16" src="img/form_protot_vert.png" style="' + styleVV + 'margin-top:4px;float:left;margin-left:10px;cursor:pointer;">';
    }
    if (addType != null && addType) {
        addT = '<div style="float:left;margin-left:5px">'
            +'<div style="font-size:10px;color:#2228;">Add data type</div>'
            +'<img onclick="addDataType();" style="margin-top:6px;margin-left:5px;float:left;clear:both;cursor:pointer;" width="16" height="16" src="img/add_blue.png">'
        +'</div>'
    }
    return '<div class="data_descr" style="float:left;margin-left:10px;">'
        +'<div style="float:left;width:1px;height:26px;margin-top:13px;background-color:var(--c_separator)"></div>'
        +'<img onclick="editDataModel(this, 0)" width="20" height="20" src="img/edit_meta.png" style="margin-top:16px;float:left;margin-left:10px;cursor:pointer;" onmouseover="tooltipHelpOver(this,' + "'Data Description'" + ')">'
        +'<div style="float:left;">'
            +'<div style="color: #2228;font-size: 10px;float:left;">Create View</div>'
            +hh
            +vv
        +'</div>'
        + addT
    +'</div>';
}

function dataDescrAdd(v, h) {
    let vv = "", hh = "";
    let styleVV = "clear:both;";
    if (h != null && h.length > 0) {
        hh = '<img onclick="' + h + '(this)" width="16" height="16" src="img/form_protot_hor.png" style="margin-top:4px;margin-left:10px;float:left;clear:both;cursor:pointer;">';
        styleVV = "";
    }
    if (v != null && v.length > 0) {
        vv = '<img onclick="' + v + '(this)" width="16" height="16" src="img/form_protot_vert.png" style="' + styleVV + 'margin-top:4px;float:left;margin-left:10px;cursor:pointer;">';
    }
    return '<div style="float:left;margin-left:5px;">'
        +'<div style="float:left;width:1px;height:26px;margin-top:13px;background-color:var(--c_separator)"></div>'
        +'<img onclick="editDataModel(this)" width="20" height="20" src="img/edit_meta.png" style="margin-top:16px;float:left;margin-left:10px;cursor:pointer;" onmouseover="tooltipHelpOver(this,' + "'Data Description'" + ')">'
        +'<div style="float:left;">'
            +'<div style="color: #2228;font-size: 10px;float:left;">Create View</div>'
            +hh
            +vv
        +'</div>'
        +'<div style="float:left;margin-left:5px">'
            +'<div style="font-size:10px;color:#2228;">Delete</div>'
            +'<img onclick="delDataType(this);" style="margin-top:6px;margin-left:5px;float:left;clear:both;cursor:pointer;" width="16" height="16" src="img/close-o.png">'
        +'</div>'
    +'</div>';
}

function setValueModel(componParam) {
    let met = componParam.getElementsByClassName("model_method");
    let model = currentComponentDescr.model;
    let descrMet = model.method;
    hostDescr = currentProject.whereServer;
    if (met != null) {
        if (descrMet != null) {
            met = met[0];
            met[descrMet].selected = true;
            changeMethod(met);
        }
    }
    if (model.url != null && model.url.length > 0) {
        let url = componParam.getElementsByClassName("url")[0];
        if (url != null) {
            url.value = model.url;
        }
    }
    if (model.param != null && model.param.length > 0) {
        let param = componParam.getElementsByClassName("param")[0];
        if (param != null) {
            param.value = model.param;
        }
    }
    let ik = model.data.length;
    if (ik > 1) {
        for (let i = 1; i < ik; i++)  {
            addDataType(false);
        }
    }
}

function changeMethod(el) {
    currentComponentDescr.model.method = el.selectedIndex;
    let el_1 = el.parentElement;
    let el_2 = el_1.parentElement.getElementsByClassName("param_method");
//    selectMethodInModel = "";
    if (el_2 != null) {
        let pm = el_2[0];
//        selectMethodInModel = el.options[el.selectedIndex].value;
        switch (el.options[el.selectedIndex].value) {
            case "POST":
            case "FILTER":
            case "GET":
                if (hostDescr == "Third party API") {
                    pm.innerHTML = pmUrl + pmParamUrl + pmProgr;
                    setValueGetPost();
                } else {
                    pm.innerHTML = pmProgr;
                    setValueQuery();
                }
                break;
            case "TEST":
                pm.innerHTML = pmTest;
//                selectMethodInModel = "TEST";
                break;
            case "PARAMETERS":
                pm.innerHTML = pmParamUrl;
                break;
            case "GLOBAL":
                pm.innerHTML = pmParameters;
                break;
            case "JSON":
                pm.innerHTML = pmJson;
                break;
            default:
                pm.innerHTML = "";
        }
    }
}

function isValidModel(mod, tab, viewId) {
    let err = {text:"",error:0};
    if (mod.method < 2) {
        let pr = mod.progr;
        if (pr != null && pr.length > 0) {
            if (pr != "standard" && pr != "no") {
                let p = getCompByViewId(layout.children, pr);
                if (p == null) {
                    err.text += txtError(2, tab, "component " + viewId + " error in progress " + pr);
                    err.error = 2;
                }
            }
        }
        if (mod.url == null || mod.url == "") {
            if (hostDescr == "Third party API") {
                err.text += txtError(2, tab, "component " + viewId + " URL not specified");
            } else {
                err.text += txtError(2, tab, "component " + viewId + " Request not formed");
            }
            err.error = 2;
        }
    }
    if (mod.method == 6 && (mod.param == null || mod.param == "") ) {
            err.text += txtError(2, tab, "component " + viewId + " parameters not specified");
            err.error = 2;
    }
    return err;
}

function editDataModel(el, ind) {
    let mv = el.closest(".model_view");
    let sel = mv.querySelector(".model_method");
    selectMethodInModel = sel.options[sel.selectedIndex].value;
    if (selectMethodInModel == "TEST") {
        editDataWind(metaModel, currentComponentDescr.model.data[0], cbSaveDataModel);
    } else if (hostDescr == "Third party API") {
            let num;
            let p = el.parentElement;
            if (ind != null) {
                num = 0;
            } else {
                num = getNumDataTYpe(p) + 1;
            }
            editDataWind(metaModel, currentComponentDescr.model.data[num], cbSaveDataModel);
        } else {
            editQueryWind();
        }
}

function getNumDataTYpe(el) {
    let dataT = currentComponentView.getElementsByClassName("severalDataTypes")[0];
    let ch = dataT.children;
    let ik = ch.length;
    let num = 0;
    for (let i = 0; i < ik; i++) {
        if (ch[i] == el) {
            num = i;
            break;
        }
    }
    return num;
}

function cbSaveDataModel() {
    
}

function setValueQuery() {
    let cont = currentComponentView.getElementsByClassName("component_param")[0];
    let mod = currentComponentDescr.model;
    let progr = cont.getElementsByClassName("progr_mod")[0];
    if (mod.progr == null) {
        mod.progr = "standard";
    }
    let st = formListIdElem(currentChildren);
    let sel = formSelectForEditData("standard,no" + st, mod.progr);
    currentComponentDescr.model.progr = sel.options[sel.selectedIndex].value;
    sel.className = "select_" + browser;
    sel.style.cssText = "width:80px;font-size:12px;color:#110000;";
    sel.addEventListener("change", function(){changeProgress(sel);}, true);
    progr.appendChild(sel);
}

function setValueGetPost() {
    let cont = currentComponentView.getElementsByClassName("component_param")[0];
    let mod = currentComponentDescr.model;
    if (mod.url != null && mod.url.length > 0) {
        let url = cont.getElementsByClassName("url")[0];
        if (url != null) {
            url.value = mod.url;
        }
    }
    if (mod.param != null && mod.param.length > 0) {
        let param = cont.getElementsByClassName("param")[0];
        if (param != null) {
            param.value = mod.param;
        }
    }
    let progr = cont.getElementsByClassName("progr_mod")[0];
    if (mod.progr == null) {
        mod.progr = "standard";
    }
    let st = formListIdElem(currentChildren);
    let sel = formSelectForEditData("standard,no" + st, mod.progr);
    currentComponentDescr.model.progr = sel.options[sel.selectedIndex].value;
    sel.className = "select_" + browser;
    sel.style.cssText = "width:80px;font-size:12px;color:#110000;";
    sel.addEventListener("change", function(){changeProgress(sel);}, true);
    progr.appendChild(sel);
}

function changeProgress(el) {
    currentComponentDescr.model.progr = el.options[el.selectedIndex].value;
}

function clickUpURL(e) {
    let a = e.currentTarget;
    currentComponentDescr.model.url = a.value;
}

function changeUrlParam(v) {
    currentComponentDescr.model.param = v;
}

function formTestData(el) {
    let dat = currentComponentDescr.model.data[0];
    if (dat == null || dat.length == 0) {
        tooltipMessage(el, "You need to describe the data");
    } else {
        if (currentComponentDescr.model.test == null) {
            currentComponentDescr.model.test = "[]";
        }
        let md = {titleForm:"Entering test data", description:formMetaDataModel(dat)};
        let test = JSON.parse(currentComponentDescr.model.test);
        editDataWind(md, test, cbSaveTestDat);
//        editDataWind(md, currentComponentDescr.model.test, cbSaveTestDat);
    }
}

function cbSaveTestDat(dat) {
//    currentComponentDescr.model.test = JSON.stringify(currentComponentDescr.model.test);
    currentComponentDescr.model.test = JSON.stringify(dat);
}

function addDataType(addData) {
    let selVar = '<div style="float:left;"><div style="color: #2228;font-size: 10px;margin-left:4px">Field with type</div>'
            +'<select onchange="changeModelFieldT(this)" class="select_';
    let selVar2 = '" onfocus="formListVar(this)" ></select>'
        +'</div>';
    let listeners = null;
    try {
        uxFunction = eval("new ux" + currentComponent.type + "();");
        listeners = uxFunction.getCreateListener();
    } catch(e) { }
    if (listeners != null) {
        let dataT = currentComponentView.getElementsByClassName("severalDataTypes")[0];
        dataT.style.display = "block";
/*
        try {
            uxFunction = eval("new ux" + currentComponent.type + "();");
            uxFunction.showField(true);
        } catch(e) { }
*/
        let el = newDOMelement(dataDescrAdd(listeners.vert, listeners.horiz));
        let ik = dataT.children.length;
        if (ik == 0) {
            let sepVar = newDOMelement(selVar + browser + selVar2);
            dataT.append(sepVar);
        }
        if (ik < 5) {
            dataT.append(el);
            if (addData == null) {
                currentComponentDescr.model.data.push([]);
                addTypeView(currentComponent);
            }
        }
    }
}

function changeModelFieldT(el) {
    currentComponentDescr.model.fieldType = el.options[el.selectedIndex].value;
}

function formListVar(el) {
    let data = currentComponentDescr.model.data[0];
    let ik = data.length;
    if (ik > 0) {
        el.innerHTML = "";
        let opt = document.createElement ('option');
        opt.value = opt.text =  '';
        el.options.add (opt);
        let mSel = currentComponentDescr.model.fieldType;
        if (mSel == null) {
            mSel = "";
        }
        for (let i = 0; i < ik; i++) {
            opt = document.createElement ('option');
            let selN = data[i].name;
            opt.value = opt.text = selN;
            if (selN == mSel) {
                opt.selected = selN;
            }
            el.options.add (opt);
        }
    }
}

function delDataType(el) {
    let bl = el.parentElement.parentElement;
    let ch = bl.parentElement.children;
    let ik = ch.length;
    let num = -1;
    for (let i = 0; i < ik; i++) {
        if (ch[i] == bl) {
            num = i;
            break;
        }
    }
    if (num > -1) {
        num++;
        currentComponentDescr.model.data.splice(num, 1);
        let chP = currentComponent.children
        let selEl = null;
        if (num < chP.length) {
            selEl = chP[num];
            n_selectElement = selEl.viewElement;
            n_clDelete();
        }
        ik = chP.length;
        if (ik > 1) {
            for (let i = 1; i < ik; i++) {
                let item = chP[i];
                item.viewId = "T_" + i;
                if (i > 0) {
                    item.below = "T_" + (i - 1);
                }
            }
            showElemChilds(currentComponent.viewElement);
        }
    }
    bl.remove();
    let dataT = currentComponentView.getElementsByClassName("severalDataTypes")[0];
    if (dataT.children.length == 1) {
        dataT.style.display = "none";
    }
}

function addTypeView(p) {
    let el = p.viewElement;
    setActive(el);
    let listView = createListView();
    let ik = p.children.length;
    listView.android.viewElement = listView;
    listView.android.viewId = "T_" + ik;
    listView.android.below = "T_" + (ik - 1);
    addNewElement(ACTIVE, listView);
    addNavigatorEl(listView);
    ACTIVE.android.children.push(listView.android);
    listView.style.outline = "";
    viewComponElem(listView);
}
