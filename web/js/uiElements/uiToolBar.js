function uiToolBar() {
    this.elementUI = '<div style="display:flex;flex-direction:row;align-items:center;position:absolute;width:100%;height:100%;">'
            +'<img class="img_back" width="'+dp_24+'" height="'+dp_24+'" style="margin-left:'+dp_16+'px;margin-right:'+dp_16+'px;">'
            +'<div class="title" style="display: inline-block; margin-left: 12px; white-space: pre-wrap;"></div>'
        + '</div>';
            
    this.setElementUI = function(p, newEl, parent) {
        typeEl = newDOMelement(this.elementUI);
        newEl.appendChild(typeEl);
        let tit = typeEl.getElementsByClassName("title")[0];
        if (tit != null) {
            if (currentScreen.title != null && currentScreen.title != "") {
                tit.innerHTML = currentScreen.title;
            }
            tit.style.color = findColorByIndex(p.textColor);
            tit.style.fontSize = (p.textSize * MEASURE) + px;
        }
        let img = typeEl.getElementsByClassName("img_back")[0];
        if (img != null) {
            if (p.imgBack != null && p.imgBack != "") {
                img.src = p.imgBack;
            }
        }
    }
}