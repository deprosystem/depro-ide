function uxList() {
    this.param = {name: "List", viewBaseId: "list", onlyOne: false};

    this.getParamComp = function () {
        return this.param;
    }
    
    this.getSpecialView = function () {
        return docNavigator;
    }
    
    this.getEditParam = function () {
        return uxModelView("createViewForListV", "createViewForListH");
    }
    
    this.addComponent = function (viewId) {
        let tt = this.param.name;
        currentComponent = {type: tt, componentId: idComponentNum, viewId: viewId, typeUxUi: "ux", componParam:{type:2},
                typeFull: {name: tt, typeBlock: 10}, gravLayout: {h: 3, v: 3}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}}, 
            width:-1,height:-1,itemNav:{},viewElement: null,children:[]};
        currentComponentDescr = {type:tt,componentId: idComponentNum,model:{method:0,data:[]},view:{viewId: viewId},navigator:[]};
    }
    
    this.setValue = function(componParam) {
        setValueListPanel(componParam);
    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#heading=h.wr0jqzoad5ky";
    }
}

function setValueListPanel(componParam) {
    setValueModel(componParam);
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