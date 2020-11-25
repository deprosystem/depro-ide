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

function getCoordsEl(elem) { 
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
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