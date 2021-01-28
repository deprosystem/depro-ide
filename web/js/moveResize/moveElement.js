var angleResizeX, angleResizeY;
var delta_x, delta_y;
var parentX, parentY, parentWpx, parentHpx;
var status;
var statusNEW = 0, statusOLD = 1;

function moveElement(event) {
console.log("moveElement moveElement moveElement");
    x = event.pageX;
    y = event.pageY;
    var rectParent = currentElement.android.parent.getBoundingClientRect();
    parentX = parseInt(rectParent.left);
    parentY = parseInt(rectParent.top);
    parentWpx = parseInt(rectParent.right - rectParent.left);
    parentHpx = parseInt(rectParent.bottom - rectParent.top);
    var rect = currentElement.getBoundingClientRect();
    var x_block = rect.left - parentX;
    var y_block = rect.top - parentY;
    delta_x = x_block - x;
    delta_y = y_block - y;
    currentElement.style.top = "";
    currentElement.style.marginTop = y_block + px;
    currentElement.style.left = "";
    currentElement.style.width = rect.width + px;
    currentElement.style.right = "";
    currentElement.style.marginLeft = x_block + px;
    document.onmousemove = moveEl;
    document.onmouseup = mouseUpEl;
    event.stopPropagation();
}

function mouseUpEl(e) {
    footer_inf.innerHTML = "";
    if (document.onmousemove == null) {
        return;
    }
    var e = e || window.event;
    document.onmousemove = null;
    var p = currentElement.android;
    let csw = currentElement.style.width;
    var w;
    if (csw != "") {
        w = parseInt(csw);
    } else {
        if (p.width == MATCH) {
            w = parseInt(ACTIVE.style.width);
        }
    }
    var h;
    let csh = currentElement.style.height;
    if (csh != "") {
        h = parseInt(csh);
    } else {
        if (p.height == MATCH) {
            h = parseInt(ACTIVE.style.height);
        }
    }
    if (w > 0 || h > 0) {
        var XX, YY;
        p.gravLayout.h = ABSOLUTE;
        p.gravLayout.v = ABSOLUTE;
        p.width = parseInt(w / MEASURE);
        p.height = parseInt(h / MEASURE);
        YY = parseInt(currentElement.style.marginTop);
//console.log("currentElement.style.marginLeft="+currentElement.style.marginLeft+"<<<");
        XX = parseInt(currentElement.style.marginLeft);
        p.topMarg = parseInt(YY / MEASURE);
        p.leftMarg = parseInt(XX / MEASURE);
        setParamCompon();
        viewCompon();
        currentElement.style.right = "";
        if (p.type == "RecyclerView") {
            setActive(currentElement);
        }
    } else {
        ACTIVE.removeChild(currentElement);
        currentElement = null;
    }
}

function addNewElement(target, el) {
    el.android.parent = target;
    target.appendChild(el);
}

function moveEl(event) {
    var x = event.pageX;
    var y = event.pageY;
    var new_x = delta_x + x;
    var new_y = delta_y + y;
    if (new_x < 0) {
        new_x = 0;
    }
    if (new_y < 0) {
        new_y = 0;
    }
    if (new_x <= parentWpx && new_y <= parentHpx) {
        currentElement.style.marginTop = new_y + px;
        currentElement.style.marginLeft = new_x + px;
        footer_inf.innerHTML = 'Y='+(new_y/ MEASURE).toFixed(1)+"dp X="+(new_x/ MEASURE).toFixed(1)+'dp';
    }
}

function createNewEl() {
    var container = document.createElement('div');
    container.innerHTML = '<div class="element" onclick="clickElement(event, this)" style="position: absolute; outline: 2px solid #aaa; overflow: hidden"></div>'
    return container.firstChild;
}

function mouseUpNewEl(e) {
    document.onmousemove = null;
    document.onmouseup = null;
    var e = e || window.event;
    var w = parseInt(currentElement.style.width);
    var h = parseInt(currentElement.style.height);
    var p;
    if (w > 0 || h > 0) {
        var XX, YY;
        p = currentElement.android;
        p.gravLayout.h = ABSOLUTE;
        p.gravLayout.v = ABSOLUTE;
        p.gravity.h = NONE;
        p.gravity.v = NONE;
        p.width = parseInt(w / MEASURE);
        p.height = parseInt(h / MEASURE);
        YY = parseInt(currentElement.style.marginTop);
        XX = parseInt(currentElement.style.marginLeft);
        p.topMarg = parseInt(YY / MEASURE);
        p.leftMarg = parseInt(XX / MEASURE);
        
        if (status == statusNEW) {
            addNewElement(ACTIVE, currentElement);
            addNavigatorEl(currentElement);
            if (ACTIVE.android.children == null) {
                ACTIVE.android.children = [];
            }
            ACTIVE.android.children.push(currentElement.android);

        }
        
        var typeEl = null;
        try {
            uiFunction = eval("new ui" + p.type + "()");
            typeEl = uiFunction.newElementUI(p);
        } catch(e) {
        }
        if (typeEl != null) {
            currentElement.appendChild(typeEl);
        }
        setParamCompon();
        showElemChilds(currentElement);
    } else {
        ACTIVE.removeChild(currentElement);
        currentElement = null;
        layoutParam.style.display = 'none';
    }
}

function resizeContour(e) {
    var classN = e.target.className;
    if (e.target === ACTIVE) {
        classN = 'active'
    } else {
        if (e.currentTarget === ACTIVE) {
            classN = 'active'
        }
    }
    status = statusOLD;
    if (classN === 'active' || (classN.indexOf('contour') > -1)) {
        switch(classN) {
            case 'active':
                status = statusNEW;
                var x = e.pageX;
                var y = e.pageY;
                hideContourEl();
                currentElement = createNewEl();
                p = {typeUxUi: "ui",children:[]};
                p.type = typeInsert;
                p.typeFull = insertTypeFull;
                p.gravLayout = {};
                p.gravity = {};
                currentElement.android = p;
                addNewElement(ACTIVE, currentElement);
                var rectParent = p.parent.getBoundingClientRect();
                parentX = parseInt(rectParent.left);
                parentY = parseInt(rectParent.top);
                parentWpx = parseInt(rectParent.right - rectParent.left);
                parentHpx = parseInt(rectParent.bottom - rectParent.top);

                angleResizeX = parseInt((x - parentX) / MEASURE) * MEASURE;
                angleResizeY = parseInt((y - parentY) / MEASURE) * MEASURE;
                currentElement.style.marginTop = angleResizeY +'px';
                currentElement.style.marginLeft = angleResizeX +'px';
                currentElement.style.width = '0px';
                currentElement.style.height = '0px';
                appendContour();
                document.onmouseup = mouseUpNewEl;
                break;
            case 'contourRB':
                angleResizeX = currentElement.offsetLeft;
                angleResizeY = currentElement.offsetTop;
                break;
            case 'contourRT':
                angleResizeX = currentElement.offsetLeft;
                angleResizeY = currentElement.offsetTop + currentElement.clientHeight;
                break;
            case 'contourLT':
                angleResizeX = currentElement.offsetLeft + currentElement.clientWidth;
                angleResizeY = currentElement.offsetTop + currentElement.clientHeight;
                break;
            case 'contourLB':
                angleResizeX = currentElement.offsetLeft + currentElement.clientWidth;
                angleResizeY = currentElement.offsetTop;
                break;
        }
        document.onmousemove = resizeNewAngle;
        if (classN == 'active') {
            document.onmouseup = mouseUpNewEl;
        } else {
            document.onmouseup = mouseUpEl;
        }
        e.stopPropagation();
    }
}

function resizeNewAngle(e) {
    var e = e || window.event;
    var x = e.pageX;
    var y = e.pageY;
    var deltY = parseInt((y - angleResizeY - parentY) / MEASURE) * MEASURE;
    var deltX = parseInt((x - angleResizeX - parentX) / MEASURE) * MEASURE;
    if (deltX >= 0) {
        currentElement.style.width = deltX + px;
    } else {
        currentElement.style.width = ( -deltX) + px;
        currentElement.style.marginLeft = (angleResizeX + deltX) +px;
    }
    if (deltY >= 0) {
        currentElement.style.height = deltY + px;
    } else {
        currentElement.style.height = ( -deltY) + px;
        currentElement.style.marginTop = (angleResizeY + deltY) +px;
    }
}