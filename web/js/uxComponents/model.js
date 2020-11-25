let uxModel1 = '<div class="model_view" style="position:relative">'
        +'<div style="display:inline-block"><div style="color:#2228;font-size: 10px;margin-left:4px">Method</div>'
        +'<select class="model_method type_screen select_';

let dataDescr = '<div onclick="editDataModel()" style="display:inline-block;margin-left:20px;cursor:pointer;">'
        +'<div style="color: #2228;font-size: 10px;margin-left:4px">Data Description</div>'
        +'<img width="20" height="20" src="img/edit_meta.png">'
    +'</div>';

let uxModel2 = '" onchange="changeMethod(this)" style="width:100px;"><option>GET</option><option>POST</option><option>TEST</option><option>JASON</option><option>ARGUMENT</option></select>'
        +'</div>'
        +'<div class="param_method" style="display:inline-block;margin-left:10px;"></div>'
        + uxSeparatorVertical
        + dataDescr
+'</div>';

let pmGetPost = '<div style="display:inline-block;"><div style="color:#2228;font-size:10px;margin-left:4px">URL</div>'
            +'<input class="url input_style" onkeyup="return clickUpURL(event)" onkeydown="return checkNameKeyD(event)" style="color:#000a" type="text" size="20" value=""/>'
            +'</div>'
            +'<div style="display:inline-block;margin-left:10px"><div style="color: #2228;font-size: 10px;margin-left:4px">URL Parameters</div>'
            +'<input class="param input_style" onchange="changeUrlParam(this.value)" style="color:#000a" type="text" size="15" value=""/>'
            +'</div>';
    
let pmTest = '<img onclick="formTestData(this)" width="18" height="18" style="margin-left:10px;cursor:pointer;margin-right:5px;" src="img/edit.png">';

function uxModelView() {
    return uxModel1 + browser + uxModel2;
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
/*
function dataDescription() {
    return dataDescr;
}
*/
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