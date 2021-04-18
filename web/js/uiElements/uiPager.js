function uiPager() {
    this.setElementUI = function(p, newEl, parent) {
        formBelow(p, parent, "ToolBar,TabLayout");
        formAbove(p, parent, "MenuBottom");
    }
    
    this.newElementUI = function(p) {
    }
    
    this.setContent = function(p) {
        contentAttributes.innerHTML = "";
    }
    
    this.viewElementUI = function(p, el) {

    }
}