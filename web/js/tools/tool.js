// біля елемента target показується повідомлення message на 2 секунди в рамці
function tooltipMessage(target, message) {
    let maxW = 250;
    let xy = getCoordsEl(target);
    let x = xy.left;
    let y = xy.top;
    let dv = document.createElement('div');
    if (y > 30) {
        y -= 30;
    } else {
        y += 20;
    }
    let wD = document.documentElement.clientWidth;
    if ((wD - x) < maxW) {
        x = wD - maxW - 20;
    }
    dv.style.cssText = "position:absolute;max-width:" + maxW + "px;padding:5px;background:var(--c_yelow_lite);border:1px solid #ffc700;border-radius:8px;left:" + x + "px;top:" + y + "px;z-index:100";
    dv.innerHTML = message;
    document.body.append(dv);
    setTimeout(function(){ document.body.removeChild(dv);},2000);
}

function tooltipHelpOver(target, message) {
    let maxW = 250;
    let xy = getCoordsEl(target);
    let x = xy.left;
    let y = xy.top;
    let dv = document.createElement('div');
    if (y > 30) {
        y -= 30;
    } else {
        y += 20;
    }
    let wD = document.documentElement.clientWidth;
    if ((wD - x) < maxW) {
        x = wD - maxW - 20;
    }
    dv.style.cssText = "position:absolute;max-width:" + maxW + "px;padding:5px;background:#d5f0ff;border:1px solid #1dace9;border-radius:8px;left:" + x + "px;top:" + y + "px;z-index:100";
    dv.innerHTML = message;
    document.body.append(dv);
    setTimeout(function(){ document.body.removeChild(dv);},2000);
}

function getCoordsEl(elem) { 
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
      height: box.height,
      width: box.width
    };
}
// формує перелік безпосередніх дітей елемента el з className = name
function getChildrenByClassName(el, name) {
    let c = el.children;
    let res = [];
    if (c != null && c.length > 0) {
        let ik = c.length;
        for (i = 0; i < ik; i++) {
            let cp = c[i];
            if (cp.className == name) {
                res.push(cp);
            }
        }
        if (res.length > 0) {
            return res;
        } else {
            return null;
        }
    } else {
        return null;
    }
}

function newDOMelement(st) {
    var container = document.createElement('div')
    container.innerHTML = st;
    return container.firstChild
}

function colorStrToRGB(st) {
    let res = {};
    let r1 = charToInt(st.charCodeAt(1));
    let r2 = charToInt(st.charCodeAt(2));
    res.r = r1 * 16 + r2;
    
    let g1 = charToInt(st.charCodeAt(3));
    let g2 = charToInt(st.charCodeAt(4));
    res.g = g1 * 16 + g2;
    
    let b1 = charToInt(st.charCodeAt(5));
    let b2 = charToInt(st.charCodeAt(6));
    res.b = b1 * 16 + b2;
    return res;
}

function charToInt(c) {
    if (c < 58) {
        return c - 48;
    }
    if (c < 71) {
        return c - 55;
    }
    if (c < 103) {
        return c - 87;
    }
    return 0;
}

function checkElement(el) {
    let check = el.src.indexOf("check-sel") == -1;
    if (check) {
        el.src = "img/check-sel_1.png";
    } else {
        el.src = "img/check-act.png";
    }
    return check;
}

function closeWind(el) {
    el.parentElement.parentElement.style.display = "none";
}

function createContour() {
    var container = document.createElement('div');
    container.innerHTML = '<div id="contour" class="contourEl" onmousedown="moveElement(event)"><div class="contourRT" onmousedown="resizeContour(event)"></div>\n\
        <div class="contourLT" onmousedown="resizeContour(event)"></div><div class="contourLB" onmousedown="resizeContour(event)"></div>\n\
        <div class="contourRB" onmousedown="resizeContour(event)"></div></div>';
    return container.firstChild;
}
