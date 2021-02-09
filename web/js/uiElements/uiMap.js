function uiMap() {
            
    this.setElementUI = function(p, newEl, parent) {
        formBelow(p, parent, "ToolBar");
        formAbove(p, parent, "MenuBottom");
        let typeEl = createDivImg();
        newEl.appendChild(typeEl);
        p.src = "img/map.png";
        myCompon = myComponentDescr(p.componId);
        if (myCompon.param.marker != null) {
            newEl.appendChild(createMarker(myCompon.param.marker));
        }
    }

    this.newElementUI = function(p) {
        p.componParam = {type:11};
        p.src = "img/map.png";
        return createDivImg();
    }
    
    this.setContent = function(p) {
        contentAttributes.innerHTML = "";
    }
    
    this.viewElementUI = function(p, el) {

    }
}


