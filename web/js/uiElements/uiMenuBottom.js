function uiMenuBottom() {
    
    let uiParamView = 
    '<div style="float: left;clear: both;margin-top: 16px;width:100%;padding-bottom:5px;border-top: 1px solid #1DACEf;border-bottom: 1px solid #1DACEf;">'
        +'<div style="float: left;color: #8199A;margin-top: 8px;5">Colors</div> '
        +'<div style="margin-top: 5px;float: left;clear:both">'
            +'<div class="text_style_ui">Normal</div>'
            +'<div class="text_norm" onclick="changeNormColorTab(this)" style="cursor: pointer;width: 30px; height: 30px; float: left; border: 1px solid #bbd4ef;border-radius:5px;"></div>'
        +'</div>'
        +'<div style="margin-top: 5px;float: left;margin-left:10px">'
            +'<div class="text_style_ui">Selected</div>'
            +'<div class="text_sel" onclick="changeSelColorTab(this)" style="cursor: pointer;width: 30px; height: 30px; float: left; border: 1px solid #bbd4ef;border-radius:5px;"></div>'
        +'</div>'
        +'<div style="margin-top: 5px;float: left;margin-left:10px">'
            +'<div class="text_style_ui">Indicator</div>'
            +'<div class="text_ind" onclick="changeIndColorTab(this)" style="cursor: pointer;width: 30px; height: 30px; float: left; border: 1px solid #bbd4ef;border-radius:5px;"></div>'
        +'</div>'
        +'<div style="margin-top: 5px;float: left;margin-left:30px">'
            +'<div class="text_style_ui">Indicator height</div>'
            +'<input class="ind_h" style="border: 1px solid #bbd4ef;border-radius:5px;" onchange="changeIndHTab(this)" type="number" size="2" min="1" max="10">'
        +'</div>'
    +'</div>';
            
    this.setElementUI = function(p, newEl, parent) {
        let typeEl = createDivMenuB();
        newEl.appendChild(typeEl);
        let myCompon = myComponent(p.viewId);
        if (myCompon != null) {
            let menuList = myCompon.model.menuList;
            if (menuList != null) {
                showMenuB(menuList, typeEl);
            }
        };
    }
    
    this.newElementUI = function(p) {
    }
    
    this.setContent = function(p) {
        contenttAttributes.innerHTML = uiParamView;
        setMenuBAttr(p);
    }
}

function setMenuBAttr(p) {
    let compon = getComponentById(p.viewId);
    uiCurrentComponent = compon;
    if (compon != null) {
        let item = compon.tabLayout;
        let colorTxt = contenttAttributes.getElementsByClassName("text_norm")[0];
        colorTxt.style.backgroundColor = findColorByIndex(item.textColor);
        colorTxt = contenttAttributes.getElementsByClassName("text_sel")[0];
        colorTxt.style.backgroundColor = findColorByIndex(item.textSelect);
        colorTxt = contenttAttributes.getElementsByClassName("text_ind")[0];
        colorTxt.style.backgroundColor = findColorByIndex(item.indColor);
        let indH = contenttAttributes.getElementsByClassName("ind_h")[0];
        indH.value = item.indHeight;
    }
}