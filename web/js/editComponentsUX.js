var imgMenuItem;
var windMenu;
var elementChangeColor;

var typeData = ["Text","Img","Int","Float","Time"];

function editMenu() {
    el = newDopElMenu();
    editDataWind(metaMenu, currentComponentDescr.model.menuList.list, cbSaveMenu, el);
}

function cbSaveMenu() {
    if (currentComponent.viewElement != null) {
        showMenu(currentComponent.viewElement, currentComponentDescr.model.menuList);
    }
}

function showMenu(menuV, ml) {
    if (menuV != null) {
        let list = ml.list;
        let ik = list.length;
        if (ik > 0) {
            let str = "";
            for (let i = 0; i < ik; i++) {
                let item = list[i];
                str += '<div style="float:left;clear: both;height:' + (44 * MEASURE) + 'px;">'
                        +'<img style="margin-left:10px;vertical-align:middle;" width="' + 18 + '" height="' + 18 + '" src="' + item.icon + '">'
                        +'<div style="vertical-align:middle;margin-left:10px;display:inline-block;font-size:' + dp_14 + 'px;color:' 
                        + findColorByIndex(ml.colorNormId) + '">' + item.title + '</div>'
                        +'</div>';
                if (item.divider) {
                    str += '<div style="float:left;clear: both;height:1px;width:100%;background-color:#ccc"></div>';
                }
            }
            menuV.innerHTML = str;
        }
    }
}

function setMenuNormColor() {
    openPickerColor(menu_norm_color.style.backgroundColor, setColorMenuNorm);
}

function setColorMenuNorm(id, color) {
    currentComponentDescr.model.menuList.colorNormId = id;
    menu_norm_color.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
}

function setMenuSelColor() {
    openPickerColor(menu_sel_color.style.backgroundColor, setColorMenuSel);
}

function setColorMenuSel(id, color) {
    currentComponentDescr.model.menuList.colorSelId = id;
    menu_sel_color.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
}

function newItemFromString(str) {
    var container = document.createElement('div')
    container.innerHTML = str;
    return container.firstChild
}

