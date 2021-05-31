function uxToolBar() {
    this.param = {name: "ToolBar", viewBaseId: "tool_bar", onlyOne: true};
    this.editParam = '<div style="display:inline-block;position:relative;height:46px;width:65px">'
            +'<div style="top:0px;position:absolute;font-size:10px;color:#2228">img back</div>'
            +'<img style="position:absolute;bottom:0px;left:0px;border:2px solid #bdf;border-radius:4px" width="30" height="30" src="img/chess_2.png">'
            +'<img class="img_back" style="position:absolute;cursor:pointer;bottom:6px;left:6px" onclick="selectImgBackTB(event)" width="20" height="20">'
        +'</div>'
        +'<div style="display:inline-block;position:relative;height:46px;left:10px;">'
            +'<div style="top:0px;position:absolute;font-size:10px;color:#2228">hamburger</div>'
            +'<img style="position:absolute;bottom:0px;left:0px;border:2px solid #bdf;border-radius:4px" width="30" height="30" src="img/chess_2.png">'
            +'<img class="img_hamburger" style="position:absolute;cursor:pointer;bottom:6px;left:6px" onclick="selectImgHamburgTB(event)" width="20" height="20">'
        +'</div>';
            
    this.getParamComp = function () {
        return this.param;
    }
    
    this.getSpecialView = function () {
        return "";
    }
    
    this.getEditParam = function () {
        return this.editParam;
    }
    
    this.addComponent = function (componId, viewId) {
////console.log("uxToolBar componId="+componId+"<<");
        let tt = this.param.name;
        currentComponent = {type: tt, componId: componId, viewId:viewId, typeUxUi: "ux", componParam:{type:0}, 
                typeFull: {name: tt, typeBlock: 0}, gravLayout: {h: 3, v: 3}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}}, 
            width:-1,height:56,topMarg:"",leftMarg:"",itemNav:{},textColor:19,textSize:20,background:0, viewElement: null,children:[]};
        currentComponentDescr = {type: tt, componId: componId, model:{},view:{viewId: viewId, title:"", titleParam: ""}};
    }
    
    this.setValue = function(componParam) {
        let cont = currentComponentView.getElementsByClassName("component_param")[0];
        if (currentComponent.imgBack != null && currentComponent.imgBack != "") {
            let img = cont.getElementsByClassName("img_back")[0];
            if (img != null) {
                img.src = currentComponent.imgBack;
            }
        }
        if (currentComponent.imgHamburg != null && currentComponent.imgHamburg != "") {
            let img = cont.getElementsByClassName("img_hamburger")[0];
            if (img != null) {
                img.src = currentComponent.imgHamburg;
            }
        }
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
    currentComponent.imgBack = nn;
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
    currentComponent.imgHamburg = nn;
}
