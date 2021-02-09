function uxList() {
    this.param = {name: "List", viewBaseId: "list", onlyOne: false};
    this.editParam = '<div style="height:1px;background-color:#1dace9;margin-top:5px"></div>\n\
        <div style="height:42px;">\n\
            <div class="span_count" style="float: left;">\n\
                <div class="text_style_ui">Span count</div>\n\
            </div>\n\
            <div style="float:left;margin-left:10px;"><div style="color:#2228;font-size: 10px;margin-left:4px">Orientation</div>\n\
                <select class="orient type_screen select_' + browser + '" onchange="changeOrientList(this)" style="width:88px;font-size:12px;color:#110000;"><option>vertical</option><option>horizontal</option></select>\n\
            </div>\n\
            <div class="no_data" style="float: left;margin-left:10px;">\n\
                <div class="text_style_ui">View if no data</div>\n\
            </div>\n\
        </div>';

    this.getParamComp = function () {
        return this.param;
    }
    
    this.getSpecialView = function () {
        return docNavigator;
    }
    
    this.getEditParam = function () {
        return uxModelView("createViewForListV", "createViewForListH") + this.editParam;
    }
    
    this.getCreateListener = function () {
        return {vert:"createViewForListV", horiz:"createViewForListH"};
    }
    
    this.addComponent = function (componId, viewId) {
        let tt = this.param.name;
        currentComponent = {type: tt, componId: componId, viewId:viewId, typeUxUi: "ux", componParam:{type:2},
                typeFull: {name: tt, typeBlock: 10}, gravLayout: {h: 3, v: 3}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}}, 
            width:-1,height:-1,itemNav:{},viewElement: null,children:[]};
        currentComponentDescr = {type:tt, componId: componId, model:{method:0,data:[],progr:"standard"},view:{viewId: viewId,spanC:1,orient:"vertical",no_data:""},navigator:[]};
    }
    
    this.setValue = function(componParam) {
        setValueListPanel(componParam);
    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#heading=h.wr0jqzoad5ky";
    }
    
    this.isValid = function(compD, layout) {
        let err = {text:"",error:0};
        let mod = compD.model;
        if (mod.method < 2) {
            let pr = mod.progr;
            if (pr != null && pr.length > 0) {
                if (pr != "standard" && pr != "no") {
                    let p = getCompByViewId(layout.children, pr);
                    if (p == null) {
                        err.text += "component " + compD.type + " error in progress " + pr;
                        err.error = 2;
                    }
                }
            }
        }
        let no_d = compD.view.no_data;
        if (no_d != null && no_d.length > 0) {
            let p = getCompByViewId(layout.children, no_d);
            if (p == null) {
                err.text += "component " + compD.type + " error view no data " + pr;
                err.error = 2;
            }
        }
        return err;
    }
}

function setValueListPanel(componParam) {
    setValueModel(componParam);
    setValueView(componParam);
}

function setValueView(componParam) {
    let span = componParam.getElementsByClassName("span_count")[0];
    let view = currentComponentDescr.view;
    if (view.spanC == null) {
        view.spanC = 1;
    }
    let nn = createNumber(40, 24, 1, 3, "changeSpan");
    setNumberInputId(nn, "spanCount");
    span.appendChild(nn);
    spanCount.value = view.spanC;
    
    let orient = componParam.getElementsByClassName("orient")[0];
    if (view.orient == null) {
        view.orient = "vertical";
    }
    orient.value = view.orient;
    let no_data = componParam.getElementsByClassName("no_data")[0];
    if (view.no_data == null) {
        view.no_data = "";
    }
    let st = formListIdElem(currentChildren);
    let sel = formSelectForEditData(" " + st, view.no_data);
    currentComponentDescr.view.no_data = sel.options[sel.selectedIndex].value;
    sel.className = "select_" + browser;
    sel.style.cssText = "width:80px;font-size:12px;color:#110000;";
    sel.addEventListener("change", function(){changeNoData(sel)}, true);
    no_data.appendChild(sel);
}

function changeNoData(el) {
    currentComponentDescr.view.no_data = el.options[el.selectedIndex].value;
}

function changeSpan(el) {
    currentComponentDescr.view.spanC = el.value;
}

function changeOrientList(el) {
    currentComponentDescr.view.orients = el.options[el.selectedIndex].value;
}

function createViewForListH() {
    let listV = currentComponent.viewElement;
    if (listV != null) {
        let ik = currentComponentDescr.model.data.length;
        if (ik > 0) {
            let p;
            let height = 120;
            let toRightOf = "";
            n_selectElement = listV;
            setActive(n_selectElement);
            let listView = createListView();
            n_selectElement.innerHTML = "";
            cleanNavigatorEl(n_selectElement);
            ACTIVE.android.children.length = 0;
            addNewElement(ACTIVE, listView);
            addNavigatorEl(listView);
            ACTIVE.android.children.push(listView.android);
            viewCompon();
            setActive(listView);
            let imgId = formImgFirst(120, 120);
            if (imgId > -1) {
                toRightOf = currentComponentDescr.model.data[imgId].name;
            }
            let topM = 16;
            let estimatedHeight = topM;
            let namePrev = "";
            for (let i = 0; i < ik; i++) {
                let item = currentComponentDescr.model.data[i];
                if (item.notShow) continue;
                if (imgId != i) {
                    formElement(item, toRightOf, namePrev, topM);
                    namePrev = item.name;
                    topM = 10;
                    estimatedHeight += 22;
                }
            }
            let Divider = formDivider();
            viewCompon();
            if (height < estimatedHeight) {
                height = estimatedHeight;
            }
            listView.android.height = height;
            currentElement = listView;
            viewCompon();
        } else {
            tooltipMessage(el, "You need to describe the data");
        }
    }
}

function createViewForListV() {
    let listV = currentComponent.viewElement;
    if (listV != null) {
        let ik = currentComponentDescr.model.data.length;
        if (ik > 0) {
            let imgHeight = 240;
            n_selectElement = listV;
            setActive(n_selectElement);
            let listView = createListView();
            listView.android.height = WRAP;
            let namePrev = "";
            n_selectElement.innerHTML = "";
            cleanNavigatorEl(n_selectElement);
            ACTIVE.android.children.length = 0;
            addNewElement(ACTIVE, listView);
            addNavigatorEl(listView);
            ACTIVE.android.children.push(listView.android);
            viewCompon();
            setActive(listView);
            let imgId = formImgFirst(MATCH, imgHeight);
            if (imgId > -1) {
                namePrev = currentComponentDescr.model.data[imgId].name;
            }
            let topM = 10;
            let estimatedHeight = imgHeight + 12;
            
            for (let i = 0; i < ik; i++) {
                let item = currentComponentDescr.model.data[i];
                if (item.notShow) continue;
                if (imgId != i) {
                    formElement(item, "", namePrev, topM);
                    namePrev = item.name;
                    estimatedHeight += 22;
                }
            }
            let Divider = formDivider();
            let pp = Divider.android;
            if (namePrev != "") {
                pp.below = namePrev;
            }
            pp.gravLayout.v = NONE;
            pp.topMarg = 12;
            currentElement = listView;
            viewCompon();
        } else {
            tooltipMessage(el, "You need to describe the data");
        }
    }
}

function createListView() {
    currentElement = createNewEl();
    p = {typeUxUi: "ui"};
    p.type = 'RelativeLayout';
    p.typeFull = {name: 'RelativeLayout', typeBlock: 2};
    p.gravLayout = {h:4,v:4};
    p.gravity = {h:4,v:4};
    p.width = -1;
    p.height = 300;
    p.rightPad = 12;
    p.children = [];
    currentElement.android = p;
    return currentElement;
}