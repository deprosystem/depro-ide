function uxToolBar() {
    this.param = {name: "ToolBar", uxFunc: uxToolBar, viewBaseId: "tool_bar", type: "ToolBar", onlyOne: true};
    this.editParam = '<div style="display:inline-block;position:relative;height:46px;width:65px">'
            +'<div style="top:0px;position:absolute;font-size:10px;color:#2228">img back</div>'
            +'<img style="position:absolute;cursor:pointer;bottom:0px;left:0px;border:2px solid #bdf;border-radius:4px" width="30" height="30" src="img/chess_2.png">'
            +'<img class="img_back" style="position:absolute;cursor:pointer;bottom:6px;left:6px" onclick="setImgBack()" width="20" height="20">'
        +'</div>'
        +'<div style="display:inline-block;position:relative;height:46px;left:10px;">'
            +'<div style="top:0px;position:absolute;font-size:10px;color:#2228">hamburger</div>'
            +'<img style="position:absolute;cursor:pointer;bottom:0px;left:0px;border:2px solid #bdf;border-radius:4px" width="30" height="30" src="img/chess_2.png">'
            +'<img class="img_hamburger" style="position:absolute;cursor:pointer;bottom:6px;left:6px" onclick="setImgHamburg()" width="20" height="20">'
        +'</div>'
            
    this.getParamComp = function () {
        return this.param;
    }
    
    this.getSpecialView = function () {
        return "";
    }
    
    this.getEditParam = function () {
        return this.editParam;
    }
}
