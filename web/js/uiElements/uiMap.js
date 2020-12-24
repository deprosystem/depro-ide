function uiMap() {
            
    this.setElementUI = function(p, newEl, parent) {
        formBelow(p, parent, "ToolBar");
        formAbove(p, parent, "MenuBottom");
        let typeEl = createDivImg();
        newEl.appendChild(typeEl);
        p.src = "img/map.png";
        myCompon = myComponent(p.viewId);
        if (myCompon.param.marker != null) {
            newEl.appendChild(createMarker(myCompon.param.marker));
        }
    }
}


