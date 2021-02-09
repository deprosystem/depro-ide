function uiList() {
            
    this.setElementUI = function(p, newEl, parent) {
        formBelow(p, parent, "ToolBar");
        let pp = getCompByType(parent.children, "MenuBottom");
        if (pp.gravLayout.v == BOTTOM) {
            formAbove(p, parent, "MenuBottom");
        }
    }
    
    this.viewElementUI = function(p, el) {
        let myCompon = myComponentDescr(p.componId);
    }
}