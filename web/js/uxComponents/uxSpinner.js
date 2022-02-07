function uxSpinner() {
    this.param = {name: "Spinner", viewBaseId: "spinner", onlyOne: false};

    this.getParamComp = function () {
        return this.param;
    }
    
    this.getSpecialView = function () {
        return docNavigator;
    }
    
    this.getEditParam = function () {
        return uxModelView("", "createViewForSpinner", false);
    }
    
    this.getCreateListener = function () {
        return {vert:"", horiz:"createViewForSpinner"};
    }
    
    this.addComponent = function (componId, viewId) {
//console.log("uxSpinner addComponent viewId="+viewId+"<< componId="+componId+"<<");
        let tt = this.param.name;
        let head = {type:"RelativeLayout",typeFull:{name:"RelativeLayout",typeBlock:2},viewId:"__T_head",typeUxUi: "ui",gravLayout:{h:4,v:4},
            gravity:{h:4,v:4},width: -1,height:10,children:[]};
        let drop = {type:"RelativeLayout",typeFull:{name:"RelativeLayout",typeBlock:2},viewId:"__T_drop",below:"__T_head",typeUxUi: "ui",
            visibility:false,gravLayout:{h:4,v:4},gravity:{h:4,v:4},width: -1,height:10,children:[]};
        currentComponent = {type: tt, componId: componId, viewId:viewId, typeUxUi: "ux", componParam:{type:24},
                typeFull: {name: tt, typeBlock: 10}, gravLayout: {h: 3, v: 3}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}}, 
            width:150,height:-2,itemNav:{},viewElement: null,children:[head,drop]};
        currentComponentDescr = {type:tt, componId: componId,model:{method:0,data:[[]],progr:"standard"},view:{viewId: viewId},navigator:[]};
    }
    
    this.setValue = function(componParam) {
        setValueModel(componParam);
    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#bookmark=id.j1k4zpypk5tm";
    }
    
    this.isValid = function(compD) {
        let tab = "&ensp;";
        let err = {text:"",error:0};



        let nav = compD.navigator;
        if (nav != null && nav.length > 0) {
            let erNav = isValidNavigator(nav);
            if (erNav != "") {
                err.text += txtError(2, tab, "component " + compD.view.viewId + " error in Navigator " + erNav);
                err.error = 2;
            }
        }
        return err;
    }
    
    this.cbEdit = function(fieldName) {

    }
}

function createViewForSpinner(el, ind) {
    data = currentComponentDescr.model.data[0];
    let listV = currentComponent.viewElement;
    if (listV != null) {
        let ik = data.length;
        if (ik > 0) {
            createHeaderSpinner(data, listV.children[0]);
            createDropSpinner(data, listV.children[1]);
        } else {
            tooltipMessage(el, "You need to describe the data");
        }
        showElemChilds(listV);
    }
}

function createHeaderSpinner(data, listView) {
    listView.innerHTML = "";        // Очистить в прототипе экрана
    listView.android.children.length = 0;   // очистить элементы в андроид
    listView.android.height = WRAP;
    let item_n = listView.android.itemNav;
    let item_compon = item_n.getElementsByClassName('item-compon')[0];
    item_compon.innerHTML = "";
    let toRightOf = "";
    setActive(listView);
    let topM = 5;
//    let estimatedHeight = topM;
    let namePrev = "";
    let p;
    let ik = data.length;
    for (let i = 0; i < ik; i++) {
        let item = data[i];
        if (item.notShow || item.type != "Text") continue;
        formElement(item, toRightOf, namePrev, topM, 2);
        p = currentElement.android;
        p.viewElement = currentElement;
        p.bottomMarg = 5;
        p.rightMarg = 24;
        break;
    }
    txtView = formImg({name:""});
    p = txtView.android;
    p.width = 24;
    p.height = 24;
    p.gravLayout.h = 2;
    p.src = "img/android_arrow_down.png";
    currentElement.android.viewElement = currentElement;
}

function createDropSpinner(data, listView) {
    listView.innerHTML = "";        // Очистить в прототипе экрана
    listView.android.children.length = 0;   // очистить элементы в андроид
    listView.android.height = WRAP;
    let item_n = listView.android.itemNav;
    let item_compon = item_n.getElementsByClassName('item-compon')[0];
    item_compon.innerHTML = "";
    let height = 24;
    let toRightOf = "";

    setActive(listView);
    let imgId = formImgFirst(24, 24, data);
    if (imgId > -1) {
        toRightOf = data[imgId].name;
    }
    let topM = 5;
//    let estimatedHeight = topM;
    let namePrev = "";
    let maxFields = 2;
    let countFields = 0;
    let ik = data.length;
    for (let i = 0; i < ik; i++) {
        let item = data[i];
        if (item.notShow || item.type != "Text") continue;
        formElement(item, toRightOf, namePrev, topM, 3);
        currentElement.android.viewElement = currentElement;
        currentElement.android.rightMarg = 0;
        namePrev = item.name;
        countFields ++;
        if (countFields > 1) {
            currentElement.android.textSize = 10;
        }
        if (countFields == maxFields) {
            currentElement.android.bottomMarg = topM;
            break;
        }
    }
/*
    let Divider = formDivider();
    if (height < estimatedHeight) {
        height = estimatedHeight;
    }
    Divider.android.viewElement = Divider;
    listView.android.height = height;
*/
}



