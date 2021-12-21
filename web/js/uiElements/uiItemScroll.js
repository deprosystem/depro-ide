function uiItemScroll() {
    let meta= [
        {name: "st_1", title:"Height item scroll",type:"Text",len:40,valid:"number"}
    ]
    
    this.setElementUI = function(p, newEl, parent) {
//console.log("uiItemScroll setElementUI");
    }
    
    this.newElementUI = function(p) {
//console.log("uiItemScroll newElementUI");
        return null;
    }
    
    this.setContent = function(p) {
//console.log("uiItemScroll setContent");
        contentAttributes.innerHTML = "";
        new EditForm(meta, p.componParam, contentAttributes, null, this, true);
    }
    
    this.viewElementUI = function(p, el) {
//console.log("uiItemScroll viewElementUI");
        new ScrollItem(el);
    }
    
    this.cbEdit = function(name) {
        let h = currentElement.android.componParam.st_1;
        currentElement.style.bottom = "";
        currentElement.style.height = h + "px";
        resizeScrollItem(currentElement);
    }
}


