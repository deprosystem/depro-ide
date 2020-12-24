function uxTabLayout() {
    this.param = {name: "TabLayout", viewBaseId: "tab_layout", onlyOne: false};

    this.specialView = '<div onclick="createDataTab()" style="display: inline-block; vertical-align: top; cursor:pointer;margin-left: 20px">Formation of data</div>';;
    this.editParam = '';
            
    this.getParamComp = function () {
        return this.param;
    }
    
    this.getSpecialView = function () {
        return this.specialView;
    }
    
    this.getEditParam = function () {
        return this.editParam;
    }
    
    this.addComponent = function (viewId) {
        let tt = this.param.name;
        currentComponent = {type: tt, componentId: idComponentNum, viewId: viewId, typeUxUi: "ux", componParam:{type:5},
                typeFull: {name: tt, typeBlock: 0}, gravLayout: {h: 3, v: 3}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}}, 
                tabLayout:{indColor:3, textColor:3,textSelect:4,indHeight:2},
            width:-1,height:56,background:0,itemNav:{},viewElement: null,children:[]};
        currentComponentDescr = {type:tt,componentId: idComponentNum,model:{menuList:{list:[]}},view:{viewId: viewId}};
    }
    
    this.setValue = function(componParam) {

    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#heading=h.ca2u9o7gq86q";
    }
}

function createDataTab() {
//    el = newDopElTab();
    editDataWind(metaPager, currentComponentDescr.model.menuList.list, callbackSaveDataTab);
}

function callbackSaveDataTab() {
    if (currentComponent.viewElement != null) {
        let mB = currentComponent.viewElement.getElementsByClassName("tab_layout")[0];
        showTabLayout(currentComponentDescr.model.menuList.list, mB, currentComponent.tabLayout);
    }
}