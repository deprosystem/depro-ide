function uiMenu() {

    this.setElementUI = function(p, newEl, parent) {
        p.componParam = {type:20, colorNorm:0, colorSel:1, colorEnab:7, colorBadge:3, colorDivider:7};
        let myCompon = myComponentDescr(p.componId);
        showMenu(newEl, myCompon.model.menuList, p.componParam);
    }
    
    this.newElementUI = function(p) {
        p.componParam = {type:20, colorNorm:0, colorSel:1, colorEnab:7, colorBadge:3, colorDivider:7};
        return null;
    }
    
    this.setContent = function(p) {
        contentAttributes.innerHTML = "";
        showTitle("Colors");
        editColor("Norm", "colorNorm", true);
        editColor("Selected", "colorSel", true);
        editColor("Enabled", "colorEnab", true);
        editColor("Badge", "colorBadge", true);
        editColor("Divider", "colorDivider", true);
    }
    
    this.viewElementUI = function(p, el) {
        let myCompon = myComponentDescr(p.componId);
        showMenu(p.viewElement, myCompon.model.menuList, p);
    }
}