function uxToolBar() {
    this.param = {name: "ToolBar", viewBaseId: "tool_bar", onlyOne: true};
    this.hiddenHandlers = "";
    this.editParam = '<div style="float:left;position:relative;height:46px;width:65px">'
            +'<div style="top:0px;position:absolute;font-size:10px;color:#2228">img back</div>'
            +'<img style="position:absolute;bottom:0px;left:0px;border:2px solid #bdf;border-radius:4px" width="30" height="30" src="img/chess_2.png">'
            +'<img class="img_back" style="position:absolute;cursor:pointer;bottom:6px;left:6px" onclick="selectImgBackTB(event)" width="20" height="20">'
        +'</div>'
        +'<div style="position:relative;height:46px;float:left;width:65px;">'
            +'<div style="top:0px;position:absolute;font-size:10px;color:#2228">hamburger</div>'
            +'<img style="position:absolute;bottom:0px;left:0px;border:2px solid #bdf;border-radius:4px" width="30" height="30" src="img/chess_2.png">'
            +'<img class="img_hamburger" style="position:absolute;cursor:pointer;bottom:6px;left:6px" onclick="selectImgHamburgTB(event)" width="20" height="20">'
        +'</div>'
        +'<div style="float:left;position:relative;height:46px;width:120px">'
            +'<div style="top:0px;position:absolute;font-size:10px;color:#2228">additional menu image</div>'
            +'<img style="position:absolute;bottom:0px;left:0px;border:2px solid #bdf;border-radius:4px" width="30" height="30" src="img/chess_2.png">'
            +'<img class="img_additional" style="position:absolute;cursor:pointer;bottom:6px;left:6px" onclick="selectImgAdditionalTB(event)" width="20" height="20">'
        +'</div>'
        +'<div class="menu_tool" style="float:left;position:relative;height:46px;width:120px;cursor:pointer;">'
            +'<div style="top:0px;position:absolute;font-size:10px;color:#2228">Formation of menu</div>'
            +'<img style="position:absolute;bottom:3px;left:0px;" width="24" height="24" src="img/menu_hh.png">'
        +'</div>'
        +'<div class="nav_tool" style="float:left;position:relative;height:46px;width:120px;cursor:pointer;">'
            +'<div style="top:0px;position:absolute;font-size:10px;color:#2228">Navigator</div>'
            +'<img style="position:absolute;bottom:3px;left:0px;" width="24" height="24" src="img/navigator.png">'
        +'</div>';

//    this.specialView = '<div onclick="editMenu_Tool()" style="display: inline-block;float:left; vertical-align: top; cursor:pointer;margin-left: 20px">Formation of menu</div>';
            
    this.getParamComp = function () {
        return this.param;
    }
    
    this.getSpecialView = function () {
        return "";
//        return this.specialView;
    }
    
    this.getEditParam = function () {
        return this.editParam;
    }
    
    this.addComponent = function (componId, viewId) {
        let tt = this.param.name;
        currentComponent = {type: tt, componId: componId, viewId:viewId, typeUxUi: "ux", componParam:{type:0}, 
                typeFull: {name: tt, typeBlock: 0}, gravLayout: {h: 3, v: 3}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}}, 
            width:-1,height:56,topMarg:"",leftMarg:"",itemNav:{},textColor:19,textSize:20,background:0, viewElement: null,children:[]};
        currentComponentDescr = {type: tt, componId: componId, model:{menuList:{list:[]}},view:{viewId: viewId, title:"", titleParam: ""},navigator:[]};
    }
    
    this.setValue = function(componParam) {
        let cont = currentComponentView.getElementsByClassName("component_param")[0];
        let cDescr = currentComponentDescr.view;
        cont.style.height = "45px";
        
//        selectedType -- imgBack, selectedField -- imgHamburg, selectedValue -- imgAdditional 
        
        if (cDescr.selectedType != null && cDescr.selectedType != "") {
            let img = cont.getElementsByClassName("img_back")[0];
            if (img != null) {
                img.src = cDescr.selectedType;
            }
        }
        if (cDescr.selectedField != null && cDescr.selectedField != "") {
            let img = cont.getElementsByClassName("img_hamburger")[0];
            if (img != null) {
                img.src = cDescr.selectedField;
            }
        }
        if (cDescr.selectedValue != null && cDescr.selectedValue != "") {
            let img = cont.getElementsByClassName("img_hamburger")[0];
            if (img != null) {
                img.src = cDescr.selectedValue;
            }
        }
        
        let menu = cont.querySelector(".menu_tool");
        menu.addEventListener('click', () => {
            this.editMenu_Tool();
        });
        let nav = cont.querySelector(".nav_tool");
        nav.addEventListener('click', () => {
            this.formNavigatorTool();
        });
    }
    
    this.editMenu_Tool = function() {
        if (currentComponentDescr.model.menuList == null) {
            currentComponentDescr.model.menuList = {list:[]};
        }
        editDataWind(metaTool, currentComponentDescr.model.menuList.list, this, null, null, null, null, null, "", true);
    }
    
    this.obrSaveEdit = function(dat) {
        console.log(JSON.stringify(dat));
    }
    
    this.formNavigatorTool = function() {
        let menuTitle = "";
        let mm = currentComponentDescr.model.menuList.list;
        let ik = mm.length;
        let sep = "";
        for (let i = 0; i < ik; i++) {
            let tt = mm[i].title;
            if (tt == null) {
                tt = "";
            }
            menuTitle += sep + tt;
            sep = ",";
        }
        let nnn = new FormNavigator();
        if (currentComponentDescr.navigator == null) {
            currentComponentDescr.navigator = [];
        }
        nnn.init(currentComponentDescr.navigator, currentComponentDescr, null, null, menuTitle);
    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#heading=h.6xdkumb6f530";
    }
    
    this.isValid = function(compD) {
        let err = {text:"",error:0};
        
        return err;
    }
}

function selectImgBackTB(e) {
    selectListImage(e, setImgBackTB);
}

function setImgBackTB(i) {
    let nn = listImage[i];
    let img = currentComponentView.getElementsByClassName("img_back");
    if (img == null) {
        return;
    }
    let imgBl = img[0];
    imgBl.src = nn;
    currentComponentDescr.view.selectedType = nn;
    if (currentComponent.viewElement != null) {
        var tt = currentComponent.viewElement.getElementsByClassName("img_back")[0];
        tt.src = nn;
    }
}

function selectImgHamburgTB(e) {
    selectListImage(e, setImgHamburgTB);
}

function setImgHamburgTB(i) {
    var nn = listImage[i];
    let img = currentComponentView.getElementsByClassName("img_hamburger");
    if (img == null) {
        return;
    }
    let imgBl = img[0];
    imgBl.src = nn;
    currentComponentDescr.view.selectedField = nn;
}

function selectImgAdditionalTB(e) {
    selectListImage(e, setImgAdditionaTB);
}

function setImgAdditionaTB(i) {
    var nn = listImage[i];
    let img = currentComponentView.getElementsByClassName("img_additional");
    if (img == null) {
        return;
    }
    let imgBl = img[0];
    imgBl.src = nn;
    currentComponentDescr.view.selectedValue = nn;
}

