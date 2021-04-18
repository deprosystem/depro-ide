function uxPlusMinus() {
    this.param = {name: "PlusMinus", viewBaseId: "plus_minus", onlyOne: false};
    
    this.getParamComp = function () {
        return this.param;
    }
    
    this.getSpecialView = function () {
        return docNavigator;
    }
    
    this.getEditParam = function () {
        return "";
    }
    
    this.addComponent = function (componId, viewId) {
        let tt = this.param.name;
        currentComponent = {type: tt, componId: componId, viewId:viewId, typeUxUi: "ux", componParam:{type:18},
                typeFull: {name: tt, typeBlock: 0}, textSize:14, gravLayout: {h: 3, v: 3}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}}, 
            width:32,height:20,itemNav:{},viewElement: null,children:[]};
        currentComponentDescr = {type:tt, componId: componId, model:{method:15,data:[[]]},view:{viewId: viewId},navigator:[]};
    }
    
    this.setValue = function(componParam) {
        let view_param = newDOMelement('<div class="comp_view_param" style="height:45px;"></div>');
        componParam.appendChild(view_param);
        let sss = selectListID("Minus id", 80, currentChildren, currentComponentDescr.view.minusId, changeUX_PL_minus);
        sss.style.clear = "both";
        sss.style.marginTop = "5px";
        sss.style.marginLeft = "0px";
        view_param.appendChild(sss);
        
        sss = selectListID("Plus id", 80, currentChildren, currentComponentDescr.view.plusId, changeUX_PL_plus);
        sss.style.marginTop = "5px";
        sss.style.marginLeft = "10px";
        view_param.appendChild(sss);
    }
    
    this.getCreateListener = function () {
        return {vert:"", horiz:""};
    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#heading=h.7x3vvj6zvdpo";
    }
    
    this.isValid = function(compD) {
        let err = {text:"",error:0};
        
        return err;
    }
}

function changeUX_PL_minus(el) {
    currentComponentDescr.view.minusId = el.options[el.selectedIndex].value;
}

function changeUX_PL_plus(el) {
    currentComponentDescr.view.plusId = el.options[el.selectedIndex].value;
}