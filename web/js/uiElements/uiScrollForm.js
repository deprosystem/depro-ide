function uiScrollForm() {

    this.setElementUI = function(p, newEl, parent) {
//console.log("uiScrollForm setElementUI");
        formBelow(p, parent, "ToolBar");
        formAbove(p, parent, "MenuBottom");
    }
    
    this.newElementUI = function(p) {
//console.log("uiScrollForm newElementUI");
        return null;
    }
    
    this.setContent = function(p) {
//console.log("uiScrollForm setContent");
        contentAttributes.innerHTML = "";
    }
    
    this.viewElementUI = function(p, el) {
//console.log("uiScrollForm viewElementUI");
    }
}