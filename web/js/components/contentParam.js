var indicatorColor;

function formIndicatorContent(p) {
    if (p.componParam == null) {
        p.componParam = {diam:7,colorNorm:3,colorSel:4};
    }
    return '<div><div style="float: left; width: 120px; ">Point diameter:</div>'
        +'<input type="number" min="4" max="14" onchange="changeIndicatorDiam(this)" style="width: 40px;" value="' + p.componParam.diam + '">'
        +'<div><div style="float: left; width: 120px; ">Color norm:</div>'
        +'<div onclick="setPickerIndicatorColorNorm(this)" style="cursor: pointer;width: 30px; height: 20px; float: left; border: 1px solid #ccc;background:' 
        + findColorByIndex(p.componParam.colorNorm) + ';margin-left: 10px"></div></div>'
        +'<div><div style="float: left; width: 120px; ">Color Select:</div>'
        +'<div onclick="setPickerIndicatorColorSel(this)" style="cursor: pointer;width: 30px; height: 20px; float: left; border: 1px solid #ccc;background:' 
        + findColorByIndex(p.componParam.colorSel) + ';margin-left: 10px"></div></div>';
}

function formGalleryContent(p) {
    return '<div><div style="float: left; width: 120px; ">Indicator:</div>'
        +formSelectTagType("Indicator", "setIndicator");
}

function setIndicator(el) {
    let p = currentElement.android;
    p.componParam.bindEl = el.options[el.selectedIndex].value;
}

function changeIndicatorDiam(el) {
    let p = currentElement.android;
    p.componParam.diam = el.value;
    viewCompon();
}

function setPickerIndicatorColorNorm(el) {
    indicatorColor = el;
    openPickerColor(el.style.backgroundColor, setIndColorNorm);
}

var setIndColorNorm = function (id, color) {
    let p = currentElement.android;
    p.componParam.colorNorm = id;
    indicatorColor.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
    viewCompon();
}

function setPickerIndicatorColorSel(el) {
    indicatorColor = el;
    openPickerColor(el.style.backgroundColor, setIndColorSel);
}

var setIndColorSel = function (id, color) {
    let p = currentElement.android;
    p.componParam.colorSel = id;
    indicatorColor.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
    viewCompon();
}