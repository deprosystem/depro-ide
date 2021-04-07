function uxMenu() {
    this.param = {name: "Menu", viewBaseId: "menu",  onlyOne: true};
    this.specialView = '<div onclick="editMenu()" style="display: inline-block; vertical-align: top; cursor:pointer;margin-left: 20px">formation of menu</div>';

    this.getParamComp = function () {
        return this.param;
    }
    
    this.getSpecialView = function () {
        return this.specialView;
    }
    
    this.getEditParam = function () {
        return "";
    }
    
    this.addComponent = function (componId, viewId) {
        let tt = this.param.name;
        currentComponent = {type: tt, componId: componId, viewId:viewId, typeUxUi: "ux", componParam:{type:2},
                typeFull: {name: tt, typeBlock: 10}, gravLayout: {h: 3, v: 3}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}}, 
            width:-1,height:-1,itemNav:{},viewElement: null,children:[]};
        currentComponentDescr = {type:tt, componId: componId, model:{menuList:{colorNormId:0,colorSelId:1,colorEnabl:6,list:[]}},view:{viewId: viewId}};
    }
    
    this.setValue = function(componParam) {
    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#heading=h.rwjpw4atvd33";
    }
    
    this.isValid = function(comp) {
        let tab = "&ensp;";
        let err = {text:"",error:0};
        let men = comp.model.menuList.list;
        let mk = men.length;
        if (mk == 0) {
            err.text += txtError(2, tab, "component " + comp.view.viewId + " has no menu description");
            err.error = 2;
        } else {
            for (let m = 0; m < mk; m++) {
                let scrTit = men[m].title;
                if (scrTit == null || scrTit.length == 0) {
                    err.text += txtError(2, tab, "component " + comp.view.viewId + " menu item " + m + " has no name");
                    err.error = 2;
                }
                let scrItem = men[m].screen;
                if (scrItem == null || scrItem.length == 0) {
                    err.text += txtError(2, tab, "component " + comp.view.viewId + " menu item " + m + " has no screen link");
                    err.error = 2;
                } else {
                    scrN = scrItem.toUpperCase();
                    if (isScreenDeclare(scrN) == -1) {
                        err.text += txtError(2, tab, "component " + comp.view.viewId + " menu item " + m + " refers to an undescribed screen "  + scrN);
                        err.error = 2;
                    }
                }
            }
        }
        return err;
    }
}
