var tempDrawable;
var savedIdBackground;
var positionGrad = ["", "to top", "to top right", "to right", "to bottom right"];
var listDrawable;
var maxIndexDrawable;

function editDrawable() {
    var p = currentElement.android;
    savedIdBackground = p.background;
    tempDrawable = null;
    if (savedIdBackground > 999 && savedIdBackground < 1999) {
        tempDrawable = JSON.parse(findDrawableByIndex(savedIdBackground));
    }
    if (tempDrawable == null) {
        tempDrawable = newDrawable();
    }
    p.background = 1999;

    colorBorder.style.backgroundColor = findColorByIndex(tempDrawable.bordedColor);
    radiusLT.value = tempDrawable.corners.lt;
    radiusTR.value = tempDrawable.corners.tr;
    radiusRB.value = tempDrawable.corners.rb;
    radiusBL.value = tempDrawable.corners.bl;
    widthBorder.value = tempDrawable.border;
    if (tempDrawable.borderStyle == "solid") {
        stBordSol.style.backgroundColor = "#0f0";
        stBordDash.style.backgroundColor = "";
    } else {
        stBordSol.style.backgroundColor = "";
        stBordDash.style.backgroundColor = "#0f0";        
    }
    colorDraw_1.style.backgroundColor = findColorByIndex(tempDrawable.color_1);
    colorDraw_2.style.backgroundColor = findColorByIndex(tempDrawable.color_2);
    setGradientView(tempDrawable.gradient);
    drawableWindow.style.display = "block";
}

function newDrawable() {
    var tD = {};
    tD.corners = {"lt" : 0, "tr" : 0, "rb" : 0, "bl" : 0};
    tD.type = "rectangle";
    tD.border = 0;
    tD.borderStyle = "solid";
    tD.bordedColor = 3;
    tD.color_1 = 0;
    tD.color_2 = -1;
    tD.gradient = 0;
    return tD;
}

function setCorners(el) {
    cornersClear(el, true);
    el.style.backgroundColor = '#0f0';
    var value = el.innerHTML;
    radiusLT.value = value;
    radiusTR.value = value;
    radiusRB.value = value;
    radiusBL.value = value;
    tempDrawable.corners = {"lt" : value, "tr" : value, "rb" : value, "bl" : value};
    viewCompon();
}

function changeCornersRadius(el) {
    cornersClear(el, false);
    var value = el.value;
    radiusLT.value = value;
    radiusTR.value = value;
    radiusRB.value = value;
    radiusBL.value = value;
    tempDrawable.corners = {"lt" : value, "tr" : value, "rb" : value, "bl" : value};
    viewCompon();
}

function changeRadius(el) {
    switch (el.id) {
        case "radiusLT":
            tempDrawable.corners.lt = el.value;
            break;
        case "radiusTR":
            tempDrawable.corners.tr = el.value;
            break;
        case "radiusRB":
            tempDrawable.corners.rb = el.value;
            break;
        case "radiusBL":
            tempDrawable.corners.bl = el.value;
            break;
    }
    viewCompon();
}

function changeWidthBorder(el) {
    tempDrawable.border = el.value;
    viewCompon();
}

function cornersClear(el, lastClear) {
    var childEl = el.parentNode.firstElementChild.nextElementSibling;
    var last = el.parentNode.lastElementChild;
    while (childEl != last) {
        childEl.style.backgroundColor = '';
        childEl = childEl.nextElementSibling;
    }
    if (lastClear) {
        last.value = el.innerHTML;
    }
}

function cornersAllClear(el) {
    cornersClear(radiusCorners, false);
    var value = "";
    radiusCorners.value = value;
    radiusLT.value = value;
    radiusTR.value = value;
    radiusRB.value = value;
    radiusBL.value = value;
    tempDrawable.corners = {"lt" : 0, "tr" : 0, "rb" : 0, "bl" : 0};
    viewCompon();
}

function setCornersDom(el, lt, tr, rb, bl) {
    el.style.borderRadius = lt + px + " " + tr + px + " " + rb + px + " " + bl + px;
}

function clearBackgroundDraw(el) {
    let drawEl = getChildrenByClassName(el, 'drawableBackground');
    if (drawEl != null) {
        el.removeChild(drawEl[0]);
    }
}

function setDrawableEl(el, draw) {
    if (draw == null) return;
    var drawEl = el.getElementsByClassName('drawableBackground')[0];
    if (drawEl == null) {
        drawEl = createDrawableEl();
        el.insertBefore(drawEl, el.firstChild);
    }
    setDrawable(drawEl, draw);
}

function setDrawable(drawEl, draw) {
    if (draw.gradient == 0) {
        drawEl.style.backgroundColor = findColorByIndex(draw.color_1);
    } else {
        var gradEnd = "linear-gradient(" + positionGrad[draw.gradient] + "," + findColorByIndex(draw.color_1) + "," +
                findColorByIndex(draw.color_2) + ")";
        drawEl.style.background = "-webkit-" + gradEnd;
        drawEl.style.background = "-moz-" + gradEnd;
        drawEl.style.background = "-o-" + gradEnd;
    }
    if (draw.border > 0) {
        var colorBord = findColorByIndex(draw.bordedColor);
        if (colorBord.length > 7) {
            colorBord = colorBord.substring(0, 7);
        }
        drawEl.style.border = (draw.border * MEASURE) + px + " " + draw.borderStyle + " " + colorBord;
    } else {
        drawEl.style.border = "";
    }
    var corners = draw.corners;
    if (corners != undefined) {
        setCornersDom(drawEl, corners.lt * MEASURE, corners.tr * MEASURE, corners.rb * MEASURE, corners.bl * MEASURE);
    }
}

function createDrawableEl() {
    var container = document.createElement('div')
    container.innerHTML = '<div class="drawableBackground"></div>'
    return container.firstChild
}

function styleBorderSol() {
    stBordSol.style.backgroundColor = "#0f0";
    stBordDash.style.backgroundColor = "";
    tempDrawable.borderStyle = "solid";
    viewCompon();
}

function styleBorderDash() {
    stBordSol.style.backgroundColor = "";
    stBordDash.style.backgroundColor = "#0f0";
    tempDrawable.borderStyle = "dashed";
    viewCompon();
}

function setGradient(num) {
    setGradientView(num);
    tempDrawable.gradient = num;
    if (num > 0) {
        viewCompon();
    }
}

function setGradientView(num) {
    var imgs = document.getElementById("gradientDraw").getElementsByTagName("img");
    var ik = imgs.length;
    for (var i = 0; i < ik; i++) {
        if (i == num) {
            imgs[i].style.backgroundColor = "#0f0";
        } else {
            imgs[i].style.backgroundColor = "";
        }
    }
}

function drawableOk() {
    maxIndexDrawable ++;
    var item = {};
    item.itemId = maxIndexDrawable;
    item.itemName = "shape_"+maxIndexDrawable;
    item.itemValue = JSON.stringify(tempDrawable);
    listDrawable.push(item);
    currentElement.android.background = maxIndexDrawable;
    isDrawableChange = true;
    viewCompon();
    drawableWindow.style.display = "none";
}

function drawableCanc() {
    currentElement.android.background = savedIdBackground;
    viewCompon();
    drawableWindow.style.display = "none";
}

function chooseDrawable() {
    var ik = listDrawable.length;
    var wind = commonWindow(250, 350, 35, 270, "Choose Drawable");
    wind.innerHTML = "";
    for (var i = 0; i < ik; i++) {
        var item = listDrawable[i];
        var itemView = newItemListDraw(item, i);
        var itemDraw = itemView.getElementsByClassName("itemDraw")[0];
        setDrawable(itemDraw, JSON.parse(item.itemValue));
        wind.appendChild(itemView);
    }
}

function selectedDrawable(i) {
    var item = listDrawable[i];
    currentElement.android.background = item.itemId;
    viewCompon();
}

function newItemListDraw(item, i) {
    var container = document.createElement('div')
    container.innerHTML = '<div onclick="selectedDrawable(' + i + ')" class="itemDrawView" style="padding-bottom: 5px;clear: both; float: left;">' 
            + '<div style="float: left;">' + item.itemName 
            + '</div><div class="itemDraw" style="float: left; margin-left: 10px;height: 35px; width: 70px;"></div></div>'
    return container.firstChild;
}

function setListDrawable() {
    
}

function findDrawableByIndex(ind) {
    var ik = listDrawable.length;
    for (var i = 0; i < ik; i ++) {
        var item = listDrawable[i];
        if (item.itemId == ind) {
            return item.itemValue;
        }
    };
    return null;
}

function setMaxIndexDrawable() {
    maxIndexDrawable = 999;
    var ik = listDrawable.length;
    for (var i = 0; i < ik; i ++) {
        var ld = listDrawable[i];
        if (maxIndexDrawable < ld.itemId) {
            maxIndexDrawable = ld.itemId;
        }
    }
}

function gradientClear() {
    
}