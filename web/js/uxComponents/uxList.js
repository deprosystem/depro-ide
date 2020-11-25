function uxList() {
    this.param = {name: "List", viewBaseId: "list", type: "List", onlyOne: false, editParam: modelList, 
            specialView: methodModel};
//    this.editParam = uxModelComponView + uxSeparatorHorisoltal;
//    this.specParam = '<div onclick="navigatorCompon()" style="float:left;cursor:pointer;margin-left:20px;"><div style="float:left;color:#2228;font-size:10px">Navigator</div><img style="float:left;margin-left:5px;" width="14" height="14" src="img/navigator.png"></div>';
            
    this.getParamComp = function () {
        return this.param;
    }
    
    this.getSpecialView = function () {
        return docNavigator;
    }
    
    this.getEditParam = function () {
        return uxModelView() + uxSeparatorHorisoltal;
    }
}

