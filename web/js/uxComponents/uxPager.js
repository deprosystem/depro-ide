function uxPager() {
    this.param = {name: "Pager", viewBaseId: "pager", onlyOne: false};

    this.specialView = '';
    this.editParam = '<div>'
            +'<div style="margin-left:2px;font-size:10px;color:#2228">Assign a TabLayout</div>'
            +'<div class="select_tab"></div>'
        +'</div>';
            
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
        currentComponent = {type: tt, componentId: idComponentNum, viewId: viewId, typeUxUi: "ux", componParam:{type:4}, // componParam:{type:3 для ComponTextView
                typeFull: {name: tt, typeBlock: 0}, gravLayout: {h: 3, v: 3}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}},
            width:-1,height:-1,itemNav:{},viewElement: null,children:[]};
        currentComponentDescr = {type:tt,componentId: idComponentNum,model:{},view:{viewId: viewId}};
    }
    
    this.setValue = function(componParam) {
        let selTab = componParam.firstElementChild.getElementsByClassName("select_tab");
        if (selTab != null) {
            selTab[0].innerHTML = formSelectForElem("TabLayout", "changeTab", currentComponentDescr.view.tabLayout);
        }
    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#heading=h.5fqiox8bz8xp";
    }
}

function changeTab(el) {
    let st = el.options[el.selectedIndex].value;
    currentComponentDescr.view.tabLayout = st;
}