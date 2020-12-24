let uxModel1 = '<div class="model_view" style="height:40px;">'
        +'<div style="float:left;"><div style="color:#2228;font-size: 10px;margin-left:4px">Method</div>'
        +'<select class="model_method type_screen select_';

let uxModel2 = '" onchange="changeMethod(this)" style="width:100px;"><option>GET</option><option>POST</option><option>TEST</option><option>JASON</option><option>ARGUMENT</option></select>'
        +'</div>'
        +'<div class="param_method" style="float:left;margin-left:10px;"></div>';

let pmGetPost = '<div style="display:inline-block;"><div style="color:#2228;font-size:10px;margin-left:4px">URL</div>'
            +'<input class="url input_style" onkeyup="return clickUpURL(event)" onkeydown="return checkNameKeyD(event)" style="color:#000a" type="text" size="20" value=""/>'
            +'</div>'
            +'<div style="display:inline-block;margin-left:10px"><div style="color: #2228;font-size: 10px;margin-left:4px">URL Parameters</div>'
            +'<input class="param input_style" onchange="changeUrlParam(this.value)" style="color:#000a" type="text" size="15" value=""/>'
            +'</div>';
    
let pmTest = '<img onclick="formTestData(this)" width="18" height="18" style="margin-left:10px;margin-top:17px;cursor:pointer;margin-right:5px;" src="img/pen.png">';

function uxModelView(listenerV, listenerH) {
    des = dataDescr(listenerV, listenerH);
    return uxModel1 + browser + uxModel2 + des + '</div>';
}

function dataDescr(v, h) {
    let vv = "", hh = "";
    let styleVV = "clear:both;";
    if (h != null && h.length > 0) {
        hh = '<img onclick="' + h + '(this)" width="16" height="16" src="img/form_protot_hor.png" style="margin-top:6px;float:left;clear:both;cursor:pointer;">';
        styleVV = "";
    }
    if (v != null && v.length > 0) {
        vv = '<img onclick="' + v + '(this)" width="16" height="16" src="img/form_protot_vert.png" style="' + styleVV + 'margin-top:4px;float:left;margin-left:10px;cursor:pointer;">';
    }
    return '<div style="float:left;margin-left:10px;">'
        +'<div style="float:left;width:1px;height:26px;margin-top:13px;background-color:var(--c_separator)"></div>'
        +'<img onclick="editDataModel()" width="20" height="20" src="img/edit_meta.png" style="margin-top:16px;float:left;margin-left:10px;cursor:pointer;" onmouseover="tooltipHelpOver(this,' + "'Data Description'" + ')">'
        +'<div style="float:left;margin-left:10px;">'
            +'<div style="color: #2228;font-size: 10px;float:left;">Create View</div>'
            +hh
            +vv
        +'</div>'
    +'</div>';
}

function setValueModel(componParam) {
    let met = componParam.getElementsByClassName("model_method");
    let cont = currentComponentView.getElementsByClassName("component_param")[0];
    let model = currentComponentDescr.model;
    let descrMet = model.method;
    if (met != null) {
        if (descrMet != null) {
            met = met[0];
            met[descrMet].selected = true;
            changeMethod(met);
        }
    }
    if (model.url != null && model.url.length > 0) {
        let url = cont.getElementsByClassName("url")[0];
        if (url != null) {
            url.value = model.url;
        }
    }
    if (model.param != null && model.param.length > 0) {
        let param = cont.getElementsByClassName("param")[0];
        if (param != null) {
            param.value = model.param;
        }
    }
}

function changeMethod(el) {
    currentComponentDescr.model.method = el.selectedIndex;
    let el_1 = el.parentElement;
    let el_2 = el_1.parentElement.getElementsByClassName("param_method");
    if (el_2 != null) {
        let pm = el_2[0];
        switch (el.options[el.selectedIndex].value) {
            case "POST":
            case "GET":
                pm.innerHTML = pmGetPost;
                setValueGetPost();
                break;
            case "TEST":
                pm.innerHTML = pmTest;
                break;
            default:
                pm.innerHTML = "";
        }
    }
}

function editDataModel() {
    editDataWind(metaModel, currentComponentDescr.model.data, cbSaveDataModel);
}

function cbSaveDataModel() {
    
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
}

function clickUpURL(e) {
    let a = e.currentTarget;
    currentComponentDescr.model.url = a.value;
}

function changeUrlParam(v) {
    currentComponentDescr.model.param = v;
}

function formTestData(el) {
    let dat = currentComponentDescr.model.data;
    if (dat == null || dat.length == 0) {
        tooltipMessage(el, "Нужно описать данные");
    } else {
        if (currentComponentDescr.model.test == null) {
            currentComponentDescr.model.test = [];
        }
        let md = {titleForm:"Entering test data", description:formMetaDataModel(dat)};
        editDataWind(md, currentComponentDescr.model.test, cbSaveTestDat);
    }
}

function cbSaveTestDat() {
    currentComponentDescr.model.testData = JSON.stringify(currentComponentDescr.model.test);
}