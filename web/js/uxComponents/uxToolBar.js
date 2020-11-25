function uxToolBar() {
    this.param = {name: "ToolBar", uxFunc: uxToolBar, viewBaseId: "tool_bar", type: "ToolBar", onlyOne: true};
    this.editParam = '<div style="display: inline-block; vertical-align: top; margin-right: 5px">img back</div>'
            +'<img class="img_back img_style" onclick="setImgBack()" width="24" height="24">'
            +'<div style="margin-left: 5px; display: inline-block; vertical-align: top; margin-right: 5px">hamburger</div>'
            +'<img class="img_hamburger img_style" onclick="setImgHamburg()" width="24" height="24">';
            
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
