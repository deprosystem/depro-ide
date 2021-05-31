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
    return '<div style="margin-top:10px"><div style="float: left;margin-top:6px;margin-right:10px;">Indicator:</div>'
        +formSelectTagType("Indicator", "setIndicator") + '</div>';
}

function setIndicator(el) {
    let p = currentElement.android;
    p.componParam.bindEl = el.options[el.selectedIndex].value;
}