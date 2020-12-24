function uxMenuBottom() {
    this.param = {name: "MenuBottom", viewBaseId: "menu_b",  onlyOne: true};
    this.specialView = '<div onclick="editMenu_b()" style="display: inline-block; vertical-align: top; cursor:pointer;margin-left: 20px">Formation of menu</div>';
            
    this.getParamComp = function () {
        return this.param;
    }
    
    this.getSpecialView = function () {
        return this.specialView;
    }
    
    this.getEditParam = function () {
        return "";
    }
    
    this.addComponent = function (viewId) {
        let tt = this.param.name;
        currentComponent = {type: tt, componentId: idComponentNum, viewId: viewId, typeUxUi: "ux", componParam:{type:1},
                typeFull: {name: tt, typeBlock: 0}, gravLayout: {h: 3, v: 2}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}},
                colorSet: {indColor:3, textColor:3,textSelect:4,badgeColor:2,enabledColor:6,toAnimate:true},
            width:-1,height:56,topMarg:"",leftMarg:"",itemNav:{},background:0, viewElement: null,children:[]};
        currentComponentDescr = {type:tt,componentId: idComponentNum,model:{menuList:{colorNormId:3,colorSelId:4,list:[]}},view:{viewId: viewId}};
    }
    
    this.setValue = function(componParam) {
    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#heading=h.sh9l77syqm0d";
    }
}

function editMenu_b() {
    editDataWind(metaMenu, currentComponentDescr.model.menuList.list, cbSaveMenuB);
}