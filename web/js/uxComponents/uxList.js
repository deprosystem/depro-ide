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
            </div>';
    
    this.selVar = '<div style="float:left;"><div style="color: #2228;font-size: 10px;margin-left:4px">Field with type</div>'
            +'<select onchange="changeModelSElected(this)" class="select_';
    this.selVar2 = '" onfocus="formListVarSel(this)" ></select>'
        +'</div>';

    this.getParamComp = function () {
        return this.param;
    }
    
    this.getSpecialView = function () {
        return docNavigator;
    }
    
    this.getEditParam = function () {
        return uxModelView("createViewForListV", "createViewForListH", true) + this.editParam + this.selVar + browser + this.selVar2 + '</div>';
    }
    
    this.getCreateListener = function () {
        return {vert:"createViewForListV", horiz:"createViewForListH"};
    }
    
    this.addComponent = function (componId, viewId) {
        let tt = this.param.name;
        let typeView = {type:"RelativeLayout",typeFull:{name:"RelativeLayout",typeBlock:2},viewId:"T_0",typeUxUi: "ui",gravLayout:{h:4,v:4},gravity:{h:4,v:4},width: -1,height:10,children:[]};
        currentComponent = {type: tt, componId: componId, viewId:viewId, typeUxUi: "ux", componParam:{type:2},
                typeFull: {name: tt, typeBlock: 10}, gravLayout: {h: 3, v: 3}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}}, 
            width:-1,height:-1,itemNav:{},viewElement: null,children:[typeView]};
        currentComponentDescr = {type:tt, componId: componId, model:{method:0,data:[[]],progr:"standard"},view:{viewId: viewId,spanC:1,orient:"vertical",no_data:""},navigator:[]};
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

function createViewForListH(el, ind) {
    let num;
    let p = el.parentElement.parentElement;
    if (ind != null) {
        num = 0;
    } else {
        num = getNumDataTYpe(p) + 1;
    }
    let data = currentComponentDescr.model.data[num];
    if (data.length == 0) {
        data = currentComponentDescr.model.data[0];
    }
    let listV = currentComponent.viewElement;
    if (listV != null) {
        let ik = data.length;
        if (ik > 0) {
            let listView = listV.children[num];
            listView.innerHTML = "";        // Очистить в прототипе экрана
            listView.android.children.length = 0;   // очистить элементы в андроид
            listView.android.height = WRAP;
            let item_n = listView.android.itemNav;
            let item_compon = item_n.getElementsByClassName('item-compon')[0];
            item_compon.innerHTML = "";
            let height = 120;
            let toRightOf = "";

            setActive(listView);
            let imgId = formImgFirst(120, 120, data);
            if (imgId > -1) {
                toRightOf = data[imgId].name;
            }
            let topM = 16;
            let estimatedHeight = topM;
            let namePrev = "";
            for (let i = 0; i < ik; i++) {
                let item = data[i];
                if (item.notShow) continue;
                if (imgId != i) {
                    formElement(item, toRightOf, namePrev, topM);
                    currentElement.android.viewElement = currentElement;
                    namePrev = item.name;
                    topM = 10;
                    estimatedHeight += 22;
                }
            }
            let Divider = formDivider();
            if (height < estimatedHeight) {
                height = estimatedHeight;
            }
            Divider.android.viewElement = Divider;
            listView.android.height = height;
            showElemChilds(listV);
        } else {
            tooltipMessage(el, "You need to describe the data");
        }
    }
}

function createViewForListV(el, ind) {
    let num;
    let p = el.parentElement.parentElement;
    if (ind != null) {
        num = 0;
    } else {
        num = getNumDataTYpe(p) + 1;
    }
    let data = currentComponentDescr.model.data[num];
    if (data.length == 0) {
        data = currentComponentDescr.model.data[0];
    }
    let listV = currentComponent.viewElement;
    if (listV != null) {
        let ik = data.length;
        if (ik > 0) {
            let listView = listV.children[num];
            listView.innerHTML = "";        // Очистить в прототипе экрана
            listView.android.children.length = 0;   // очистить элементы в андроид
            listView.android.height = WRAP;
            let item_n = listView.android.itemNav;
            let item_compon = item_n.getElementsByClassName('item-compon')[0];
            item_compon.innerHTML = "";
            let namePrev = "";
            let imgHeight = 240;
            setActive(listView);
            let imgId = formImgFirst(MATCH, imgHeight, data);
            if (imgId > -1) {
                namePrev = data[imgId].name;
            }
            let topM = 10;
            let estimatedHeight = imgHeight + 12;
            
            for (let i = 0; i < ik; i++) {
                let item = data[i];
                if (item.notShow) continue;
                if (imgId != i) {
                    formElement(item, "", namePrev, topM);
                    currentElement.android.viewElement = currentElement;
                    namePrev = item.name;
                    estimatedHeight += 22;
                }
            }
            let Divider = formDivider();
            let pp = Divider.android;
            pp.viewElement = Divider;
            if (namePrev != "") {
                pp.below = namePrev;
            }
            pp.gravLayout.v = NONE;
            pp.topMarg = 12;
            showElemChilds(listV);
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
    p.height = 10;
    p.children = [];
    currentElement.android = p;
    return currentElement;
}

function changeModelSElected(el) {
    currentComponentDescr.model.selected = el.options[el.selectedIndex].value;
}

function formListVarSel(el) {
    let data = currentComponentDescr.model.data[0];
    let ik = data.length;
    if (ik > 0) {
        el.innerHTML = "";
        let opt = document.createElement ('option');
        opt.value = opt.text =  '';
        el.options.add (opt);
        let mSel = currentComponentDescr.model.selected;
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