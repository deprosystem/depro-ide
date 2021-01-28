function uiGallery() {

    this.setElementUI = function(p, newEl, parent) {
    }
    
    this.newElementUI = function(p) {
        p.componParam = {type:8};
        p.src = "img/picture.png";
        return createDivImg();;
    }
    
    this.setContent = function(p) {
        contentAttributes.innerHTML = formGalleryContent(paramCompon);
    }
    
    this.viewElementUI = function(p, el) {

    }
}

function formGalleryContent(p) {
    return '<div><div style="float: left; width: 120px; ">Indicator:</div>'
        +formSelectTagType("Indicator", "setIndicator");
}

function setIndicator(el) {
    let p = currentElement.android;
    p.componParam.bindEl = el.options[el.selectedIndex].value;
}