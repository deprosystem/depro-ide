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
    
    this.isValid = function(compD) {
        let err = {text:"",error:0};
        
        return err;
    }
}
