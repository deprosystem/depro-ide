function resizeScrollItem(el) {
    if (el.scroll_y != null) {
        el.scroll_y.resize();
    } else {
        let scrollY = new ScrollItem(el);
    }
}

function hideScroll(el) {
console.log("hideScroll");
    let vp = el.closest(".viewportItem");
    if (vp != null) {
        let cont = vp.querySelector("div");
        let scroll = cont.querySelector("div");
        if (scroll.scroll_y != null) {
            scroll.scroll_y.hideScroll();
        }
    }
}

function showScroll(el) {
console.log("showScroll");
    let vp = el.closest(".viewportItem");
    if (vp != null) {
        let cont = vp.querySelector("div");
        let scroll = cont.querySelector("div");
        if (scroll.scroll_y != null) {
            scroll.scroll_y.showScroll();
        }
    }
}


