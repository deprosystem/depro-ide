function uxPanel() {
    this.param = {name: "Panel", viewBaseId: "panel", onlyOne: false};
    
    this.getParamComp = function () {
        return this.param;
    }
    
    this.getSpecialView = function () {
        return docNavigator;
    }
    
    this.getEditParam = function () {
        return uxModelView("createViewForPanelV", "");
    }
    
    this.addComponent = function (componId, viewId) {
        let tt = this.param.name;
        currentComponent = {type: tt, componId: componId, viewId:viewId, typeUxUi: "ux", componParam:{type:7},
                typeFull: {name: tt, typeBlock: 10}, gravLayout: {h: 3, v: 3}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}}, 
            width:-1,height:-1,itemNav:{},viewElement: null,children:[]};
        currentComponentDescr = {type:tt, componId: componId, model:{method:0,data:[[]]},view:{viewId: viewId},navigator:[]};
    }
    
    this.getCreateListener = function () {
        return {vert:"createViewForPanelV", horiz:""};
    }
    
    this.setValue = function(componParam) {
        setValueModel(componParam);
    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#heading=h.nvu24dbuzxym";
    }
    
    this.isValid = function(compD) {
        let err = {text:"",error:0};
        
        return err;
    }
}

function createViewForPanelV(el) {
    let listV = currentComponent.viewElement;
    if (listV != null) {
        let ik = currentComponentDescr.model.data[0].length;
        if (ik > 0) {
            let imgHeight = 240;
            n_selectElement = listV;
            setActive(n_selectElement);
            let namePrev = "";
            n_selectElement.innerHTML = "";
            cleanNavigatorEl(n_selectElement);
            ACTIVE.android.children.length = 0;
            let imgId = formImgFirst(MATCH, imgHeight, currentComponentDescr.model.data[0]);
            if (imgId > -1) {
                namePrev = currentComponentDescr.model.data[0][imgId].name;
            }
            let topM = 10;
            let estimatedHeight = imgHeight + 12;
            for (let i = 0; i < ik; i++) {
                let item = currentComponentDescr.model.data[0][i];
                if (item.notShow) continue;
                if (imgId != i) {
                    formElement(item, "", namePrev, topM);
                    namePrev = item.name;
                    if (item.type == "Gallery") {
                        estimatedHeight += 242;
                    } else {
                        estimatedHeight += 22;
                    }
                }
            }

            listV.android.height = estimatedHeight + 10;
            currentElement = listV;
            viewCompon();
        } else {
            tooltipMessage(el, "You need to describe the data");
        }
    } 
}

