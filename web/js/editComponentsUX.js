//var listImg;
var imgMenuItem;
var windMenu;
var windListData;
var elementChangeColor;

var typeData = ["Text","Img","Int","Float","Time"];
/*
function setImgBack() {
    doServer("GET", 'images/list', cbSRC, null, "selectImgBack");
}

function setImgHamburg() {
    doServer("GET", 'images/list', cbSRC, null, "selectImgHamburg");
}
*/

/*
function setMyMarker() {
    doServer("GET", 'images/list', cbSRC, null, "selectMyMarker");
}

function setMarker() {
    doServer("GET", 'images/list', cbSRC, null, "selectMarker");
}

cbSRC = function(res, param) {
    let windMenu = formWind(250, 300, 40, 250, "Select image");
    let viewport = document.createElement('div');
    viewport.className = "viewport";
    let content = document.createElement('div');
    content.className = "content";
    viewport.appendChild(content);
    windMenu.appendChild(viewport);
    if (res == "") return;
    listImg = JSON.parse(res);
    var str = '';
    for (var i = 0; i < listImg.length; i++) {
        var path = listImg[i];
        var ii = path.lastIndexOf("/");
        var nam = path.substring(ii + 1);
        nam = nam.substring(0, nam.indexOf('.'))
        str += '<div style="clear: both;height:50px;cursor: pointer;position:relative" onClick="' + param + '(' + i + ',this)">' 
                +'<img width="40" height="40" style="position:absolute;margin-left:5px;margin-top:5px" src="img/chess_2.png">'
                +'<img width="40" height="40" style="position:absolute;margin-left:5px;margin-top:5px" src="' + path + '">'
                +'<div style="position:absolute;margin-left:50px;margin-top:12px;font-size:16px">' + nam + '</div></div>'
    }
    content.innerHTML = str;
    let scrollVert = new scrollX(viewport, "scroll");
    scrollVert.init();
}

function selectMyMarker(i, el) {
    closeDataWindow(el);
    var nn = listImg[i];
    let img = currentComponentView.getElementsByClassName("my_marker");
    if (img == null) {
        return;
    }
    let imgBl = img[0];
    imgBl.src = nn;
    currentComponentDescr.param.myMarker = nn;
}

function selectMarker(i, el) {
    closeDataWindow(el);
    var nn = listImg[i];
    let img = currentComponentView.getElementsByClassName("marker");
    if (img == null) {
        return;
    }
    let imgBl = img[0];
    imgBl.src = nn;
    currentComponentDescr.param.marker = nn;
    if (currentComponent.viewElement != null) {
        currentComponent.viewElement.appendChild(createMarker(nn));
    }
}

function createMarker(nn) {
    var container = document.createElement('div')
    container.innerHTML = '<img src="' + nn + '" style="top:150px;left:50px;position:absolute" width="30" height="30"></div>'
    return container.firstChild
}
*/
/*
function selectImgBack(i, el) {
    closeDataWindow(el);
    var nn = listImg[i];
    let img = currentComponentView.getElementsByClassName("img_back");
    if (img == null) {
        return;
    }
    let imgBl = img[0];
    imgBl.src = nn;
    currentComponent.imgBack = nn;
    if (currentComponent.viewElement != null) {
        var tt = currentComponent.viewElement.getElementsByClassName("img_back")[0];
        tt.src = nn;
    }
}



function selectImgHamburg(i, el) {
    closeDataWindow(el);
    var nn = listImg[i];
    let img = currentComponentView.getElementsByClassName("img_hamburger");
    if (img == null) {
        return;
    }
    let imgBl = img[0];
    imgBl.src = nn;
    currentComponent.imgHamburg = nn;
}
*/

/*
function editMenu_b() {
    el = newDopElMenu();
    editDataWind(metaMenu, currentComponentDescr.model.menuList.list, cbSaveMenuB, el);
}

function newDopElMenu() {
    let item = currentComponentDescr.model.menuList;
    var container = document.createElement('div')
    let str = '<div style="padding:2px">'
            +'<div style="display: inline-block;margin-left:5px;vertical-align:top;margin-right:5px;">color Norm:</div>'
            +'<div class="text_color" onclick="changeNormColorMenu(this)" style="display:inline-block;width:30px; height: 20px;'
                +'background-color:' + findColorByIndex(item.colorNormId) + ';cursor:pointer;border: 1px solid #ccc"></div>'
            +'<div style="display: inline-block;margin-left:5px;vertical-align:top;margin-right:5px;">color Select:</div>'
            +'<div class="text_color" onclick="changeSelColorMenu(this)" style="display:inline-block;width:30px; height: 20px;'
                +'background-color:' + findColorByIndex(item.colorSelId) + ';cursor:pointer;border: 1px solid #ccc"></div>'
        +'</div>';
    container.innerHTML = str;
    return container.firstChild
    
}

function changeNormColorMenu(el) {
    elementChangeColor = el;
    openPickerColor(el.style.backgroundColor, setNormColorMenu);
}

function setNormColorMenu(id, color) {
    currentComponentDescr.model.menuList.colorNormId = id;
    elementChangeColor.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
}

function changeSelColorMenu(el) {
    elementChangeColor = el;
    openPickerColor(el.style.backgroundColor, setSelColorMenu);
}

function setSelColorMenu(id, color) {
    currentComponentDescr.model.menuList.colorSelId = id;
    elementChangeColor.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
}
*/

function editMenu() {
    el = newDopElMenu();
    editDataWind(metaMenu, currentComponentDescr.model.menuList.list, cbSaveMenu, el);
}

function cbSaveMenu() {
    if (currentComponent.viewElement != null) {
        showMenu(currentComponent.viewElement, currentComponentDescr.model.menuList);
    }
}

function cbSaveMenuB() {
    if (currentComponent.viewElement != null) {
        let mB = currentComponent.viewElement.getElementsByClassName("menu_b")[0];
        showMenuB(currentComponentDescr.model.menuList, mB);
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

function showMenuB(menu, mB) {
    mB.innerHTML = "";
    let ik = menu.list.length;
    for (let i = 0; i < ik; i++) {
        mB.append(newItemAndr(menu.list[i], findColorByIndex(menu.colorNormId)));
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
/*
function del_menu_item(el) {
    
}
*/
/*
function callbackSaveDataTab() {
    if (currentComponent.viewElement != null) {
        let mB = currentComponent.viewElement.getElementsByClassName("tab_layout")[0];
        showTabLayout(currentComponentDescr.model.menuList.list, mB, currentComponent.tabLayout);
    }
}
*/
/*
function showTabLayout(dat, mB, tab) {
    mB.innerHTML = "";
    let ik = dat.length;
    if (ik == 0) return;
    let widthItem = 100 / ik;
    mB.append(newItemTab(dat[0], tab, widthItem));
    for (let i = 1; i < ik; i++) {
        mB.append(newItemTabNext(dat[i], tab, widthItem));
    }
}
*/
/*
function newItemTab(item, tabLayout, ww) {
    let container = document.createElement('div')
    let str = '<div class="item_buttons" style="position:relative;width:'+ ww + '%;display:inline-block;height:100%">'
            +'<div style="margin-top:5px;text-align: center;font-size:' + dp_20 + 'px;color:' + findColorByIndex(tabLayout.textSelect) + '">' + item.title + '</div>'
            +'<div style="height:' + tabLayout.indHeight * MEASURE + 'px;position:absolute;background-color:' + findColorByIndex(tabLayout.indColor) + ';bottom:0px;width:100%"></div>'
        +'</div>';
    container.innerHTML = str;
    return container.firstChild;
}

function newItemTabNext(item, tab, ww) {
    let container = document.createElement('div')
    let str = '<div class="item_buttons" style="position:relative;width:' + ww + '%;display:inline-block;height:100%">'
            +'<div style="margin-top:5px;text-align: center;font-size:' + dp_20 + 'px;color:' + findColorByIndex(tab.textColor) + '">' + item.title + '</div>'
        +'</div>';
    container.innerHTML = str;
    return container.firstChild;
}
*/
function newItemAndr(item, colorId) {
    let container = document.createElement('div')
    let str = '<div class="item_buttons" style="text-align:center;">'
            +'<img class="img_item" width="' + dp_24 + '" height="' + dp_24 + '" src="' + item.icon + '">'
            +'<div style="font-size:' + dp_12 + 'px;color:' + colorId + '">' + item.title + '</div>'
        +'</div>';
    container.innerHTML = str;
    return container.firstChild;
}
/*
function clickUpURL(e) {
    let a = e.currentTarget;
    currentComponentDescr.model.url = a.value;
}
*/
/*
function clickUpDrawer(e) {
    let a = e.currentTarget;
    currentComponentDescr.view.drawer_fragm = a.value;
}
*/
/*
function changeUrlParam(v) {
    currentComponentDescr.model.param = v;
}

function changeMethod(el) {
    currentComponentDescr.model.method = el.selectedIndex;
    if (el.options[el.selectedIndex].value == "TEST") {
        let test = el.parentElement.getElementsByClassName("test");
        if (test != null) {
            test[0].style.display = "inline-block";
        }
    } else {
/*
        let test = el.parentElement.getElementsByClassName("test");
        if (test != null) {
            test[0].style.display = "none";
        }
*/
/*
    }
}
*/
/*
function formTestData(el) {
    let dat = currentComponentDescr.model.data;
    if (dat == null || dat.length == 0) {
        tooltipMessage(el, "Нужно описать данные");
    } else {
        if (currentComponentDescr.model.test == null) {
            currentComponentDescr.model.test = [];
        }
        let md = {titleForm:"Entering test data", description:formMetaDataModel(dat)};
        editDataWind(md, currentComponentDescr.model.test, cbSaveTestDat);
    }
}

function cbSaveTestDat() {
    currentComponentDescr.model.testData = JSON.stringify(currentComponentDescr.model.test);
}
*/
/*
function createViewForListH() {
    let listV = currentComponent.viewElement;
    if (listV != null) {
        let ik = currentComponentDescr.model.data.length;
        if (ik > 0) {
            let p;
            let height = 120;
            let toRightOf = "";
            n_selectElement = listV;
            setActive(n_selectElement);
            let listView = createListView();
            n_selectElement.innerHTML = "";
            cleanNavigatorEl(n_selectElement);
            ACTIVE.android.children.length = 0;
            addNewElement(ACTIVE, listView);
            addNavigatorEl(listView);
            ACTIVE.android.children.push(listView.android);
            viewCompon();
            setActive(listView);
            let imgId = formImgFirst(120, 120);
            if (imgId > -1) {
                toRightOf = currentComponentDescr.model.data[imgId].name;
            }
            let topM = 16;
            let estimatedHeight = topM;
            let namePrev = "";
            for (let i = 0; i < ik; i++) {
                let item = currentComponentDescr.model.data[i];
                if (item.notShow) continue;
                if (imgId != i) {
                    formElement(item, toRightOf, namePrev, topM);
                    namePrev = item.name;
                    topM = 10;
                    estimatedHeight += 22;
                }
            }
            let Divider = formDivider();
            viewCompon();
            if (height < estimatedHeight) {
                height = estimatedHeight;
            }
            listView.android.height = height;
            currentElement = listView;
            viewCompon();
        }
    }
}

function createViewForListV() {
    let listV = currentComponent.viewElement;
    if (listV != null) {
        let ik = currentComponentDescr.model.data.length;
        if (ik > 0) {
            let imgHeight = 240;
            n_selectElement = listV;
            setActive(n_selectElement);
            let listView = createListView();
            listView.android.height = WRAP;
            let namePrev = "";
            n_selectElement.innerHTML = "";
            cleanNavigatorEl(n_selectElement);
            ACTIVE.android.children.length = 0;
            addNewElement(ACTIVE, listView);
            addNavigatorEl(listView);
            ACTIVE.android.children.push(listView.android);
            viewCompon();
            setActive(listView);
            let imgId = formImgFirst(MATCH, imgHeight);
            if (imgId > -1) {
                namePrev = currentComponentDescr.model.data[imgId].name;
            }
            let topM = 10;
            let estimatedHeight = imgHeight + 12;
            
            for (let i = 0; i < ik; i++) {
                let item = currentComponentDescr.model.data[i];
                if (item.notShow) continue;
                if (imgId != i) {
                    formElement(item, "", namePrev, topM);
                    namePrev = item.name;
                    estimatedHeight += 22;
                }
            }
            let Divider = formDivider();
            let pp = Divider.android;
            if (namePrev != "") {
                pp.below = namePrev;
            }
            pp.gravLayout.v = NONE;
            pp.topMarg = 12;
            viewCompon();
//            listView.android.height = estimatedHeight + 10;
            currentElement = listView;
            viewCompon();
        }
    }
}
*/
/*
function createViewForPanel() {
    let listV = currentComponent.viewElement;
    if (listV != null) {
        let ik = currentComponentDescr.model.data.length;
        if (ik > 0) {
            let imgHeight = 240;
            n_selectElement = listV;
            setActive(n_selectElement);
            let namePrev = "";
            n_selectElement.innerHTML = "";
            cleanNavigatorEl(n_selectElement);
            ACTIVE.android.children.length = 0;
            let imgId = formImgFirst(MATCH, imgHeight);
            if (imgId > -1) {
                namePrev = currentComponentDescr.model.data[imgId].name;
            }
            let topM = 10;
            let estimatedHeight = imgHeight + 12;
            for (let i = 0; i < ik; i++) {
                let item = currentComponentDescr.model.data[i];
                if (item.notShow) continue;
                if (imgId != i) {
                    formElement(item, "", namePrev, topM);
                    namePrev = item.name;
                    if (item.type == "Gallery") {
                        estimatedHeight += 242;
                    } else {
                        estimatedHeight += 22;
                    }
                }
            }

            listV.android.height = estimatedHeight + 10;
            currentElement = listV;
            viewCompon();
        }
    }
}
*/
/*
function createSheetBottomH() {

}

function createSheetBottomV() {
    let ik = currentComponentDescr.model.data.length;
    if (ik > 0) {
        let child = currentScreen.layout.children;
        let sk = child.length;
        let sheet = null;
        let vId = "mark_" + currentComponent.viewId;
        for (let i = 0; i < sk; i++) {
            let vv = child[i];
            if (vv.viewId == vId) {
                sheet = vv.viewElement;
                break;
            }
        }
        if (sheet == null) {
            setActive(root);
            sheet = formSheetBottom(vId);
        } 
        n_selectElement = sheet;
        setActive(n_selectElement);
        currentElement = sheet;
        viewCompon();
        let imgHeight = 220;
        let sheetPan = createSheetPanel();
        let namePrev = "";
        n_selectElement.innerHTML = "";
        cleanNavigatorEl(n_selectElement);
        ACTIVE.android.children.length = 0;
        addNewElement(ACTIVE, sheetPan);
        addNavigatorEl(sheetPan);
        ACTIVE.android.children.push(sheetPan.android);
        setActive(sheetPan);
        viewCompon();


        let imgId = formImgFirst(MATCH, imgHeight);
        if (imgId > -1) {
            namePrev = currentComponentDescr.model.data[imgId].name;
        }
        let topM = 10;

        for (let i = 0; i < ik; i++) {
            let item = currentComponentDescr.model.data[i];
            if (item.notShow) continue;
            if (imgId != i) {
                formElement(item, "", namePrev, topM);
                namePrev = item.name;
            }
        }
        currentElement.android.bottomMarg = 10;
        viewCompon();
        sheetPan.android.height = WRAP;
        currentElement = sheetPan;
        viewCompon();
    }
}
*/
/*
function formElement(item, toRightOf, namePrev, topM) {
    let txtView;
    let p;
    switch (item.type) {    // Text,Img,Int,Float,Time
        case "Text":
            txtView = formTxt(item);
            p = txtView.android;
            p.width = WRAP;
            p.height = WRAP;
            break;
        case "Img":
            txtView = formImg(item);
            p = txtView.android;
            p.width = 30;
            p.height = 30;
            p.src = "img/picture.png";
            break;
        case "Int":
            txtView = formTxt(item);
            p = txtView.android;
            p.width = WRAP;
            p.height = WRAP;
            if (item.format != null && item.format.length > 0) {
                p.componParam = {type:3, formatNum:item.format};
            }
            break;
        case "Float":
            txtView = formTxt(item);
            p = txtView.android;
            p.width = WRAP;
            p.height = WRAP;
            if (item.format != null && item.format.length > 0) {
                p.componParam = {type:3, formatNum:item.format};
            }
            break;
        case "Time":
            txtView = formTxt(item);
            p = txtView.android;
            p.width = WRAP;
            p.height = WRAP;
            if (item.format != null && item.format.length > 0) {
                p.componParam = {type:3, formatTime:item.format};
            }
            break;
        case "Gallery":
            txtView = formGallery(item);
            p = txtView.android;
            p.width = MATCH;
            p.height = 230;
            p.rightMarg = 12;
            p.src = "img/picture.png";
            p.componParam = {type:8};
            break;
    }
    if (namePrev != "") {
        p.below = namePrev;
    }
    p.topMarg = topM;
    p.leftMarg = 12;
    if (toRightOf != "") {
        p.toRightOf = toRightOf;
    }
    viewCompon();
}
*/
/*
function formImgFirst(ww, imgHeight) {
    let item;
    let imgId = -1;
    let ik = currentComponentDescr.model.data.length;
    for (let i = 0; i < ik; i++) {
        item = currentComponentDescr.model.data[i];
        if (item.type == "Img") {
            imgId = i;
            break;
        }
    }
    if (imgId > -1) {
        let imgView = formImg(item);
        p = imgView.android;
        p.viewId = item.name;
        p.width = ww;
        namePrev = item.name;
        p.height = imgHeight;
        p.src = "img/picture.png";
        viewCompon();
    }
    return imgId;
}

function formImg(item) {
    currentElement = createNewEl();
    p = {typeUxUi: "ui"};
    p.type = "ImageView";
    p.typeFull = {name: 'ImageView', typeBlock: 0};
    p.gravLayout = {h:4,v:4};
    p.gravity = {h:4,v:4};
    currentElement.android = p;
    let typeEl = createDivImg();
    p.scaleType = 0;
    p.viewId = item.name;
    currentElement.appendChild(typeEl);
    addNewElement(ACTIVE, currentElement);
    addNavigatorEl(currentElement);
    ACTIVE.android.children.push(currentElement.android);
    return currentElement;
}

function formGallery(item) {
    currentElement = createNewEl();
    p = {typeUxUi: "ui"};
    p.type = "Gallery";
    p.typeFull = {name: 'Gallery', typeBlock: 0};
    p.gravLayout = {h:4,v:4};
    p.gravity = {h:4,v:4};
    currentElement.android = p;
    let typeEl = createDivImg();
    p.viewId = item.name;
    currentElement.appendChild(typeEl);
    addNewElement(ACTIVE, currentElement);
    addNavigatorEl(currentElement);
    ACTIVE.android.children.push(currentElement.android);
    return currentElement;
}
*/
function formSheetBottom(id) {
    currentElement = createNewEl();
    p = {typeUxUi: "ui"};
    p.type = "SheetBottom";
    p.typeFull = {name: 'SheetBottom', typeBlock: 0};
    p.gravLayout = {h:4,v:4};
    p.gravity = {h:4,v:4};
    p.canHide = true;
    p.width = -1;
    p.height = -1;
    p.background = 17;      // black_30
    currentElement.android = p;
    p.viewId = id;
    p.children = [];
    p.componParam = {type:12};
    addNewElement(ACTIVE, currentElement);
    addNavigatorEl(currentElement);
    ACTIVE.android.children.push(currentElement.android);
    return currentElement;
}
/*
function formTxt(item) {
    currentElement = createNewEl();
    p = {typeUxUi: "ui"};
    p.type = "TextView";
    p.typeFull = {name: 'TextView', typeBlock: 0};
    p.gravLayout = {h:4,v:4};
    p.gravity = {h:4,v:4};
    currentElement.android = p;
    typeEl = createDivText();
    p.text = item.name;
    p.viewId = item.name;
    p.textSize = 14;
    currentElement.appendChild(typeEl);
    addNewElement(ACTIVE, currentElement);
    addNavigatorEl(currentElement);
    ACTIVE.android.children.push(currentElement.android);
    return currentElement;
}
*
function createListView() {
    currentElement = createNewEl();
    p = {typeUxUi: "ui"};
    p.type = 'RelativeLayout';
    p.typeFull = {name: 'RelativeLayout', typeBlock: 2};
    p.gravLayout = {h:4,v:4};
    p.gravity = {h:4,v:4};
    p.width = -1;
    p.height = 300;
    p.rightPad = 12;
    p.children = [];
    currentElement.android = p;
    return currentElement;
}
*/
function createSheetPanel() {
    currentElement = createNewEl();
    p = {typeUxUi: "ui"};
    p.type = 'RelativeLayout';
    p.typeFull = {name: 'RelativeLayout', typeBlock: 2};
    p.gravLayout = {h:4,v:BOTTOM};
    p.gravity = {h:4,v:4};
    p.width = -1;
    p.height = 300;
    p.background = 101;
    p.children = [];
    currentElement.android = p;
    return currentElement;
}
/*
function createDataTab() {
    el = newDopElTab();
    editDataWind(metaPager, currentComponentDescr.model.menuList.list, callbackSaveDataTab, el);
}
*/
/*
function newDopElTab() {
    let item = currentComponent.tabLayout;
    var container = document.createElement('div')
    let str = '<div style="padding:2px">'
        +'<div>'
            +'<div style="display: inline-block;margin-left:5px;vertical-align:top;margin-right:5px;">color Norm:</div>'
            +'<div class="text_color" onclick="changeNormColorTab(this)" style="display:inline-block;width:30px; height: 20px;'
                +'background-color:' + findColorByIndex(item.textColor) + ';cursor:pointer;border: 1px solid #ccc"></div>'
            +'<div style="display: inline-block;margin-left:5px;vertical-align:top;margin-right:5px;">color Select:</div>'
            +'<div class="text_color" onclick="changeSelColorTab(this)" style="display:inline-block;width:30px; height: 20px;'
                +'background-color:' + findColorByIndex(item.textSelect) + ';cursor:pointer;border: 1px solid #ccc"></div>'
        +'</div>'
        +'<div>'
            +'<div style="display:inline-block;margin-left:5px;vertical-align:top;margin-right:5px;">color Indicator:</div>'
            +'<div class="text_color" onclick="changeIndColorTab(this)" style="display:inline-block;width:30px; height: 20px;'
                +'background-color:' + findColorByIndex(item.indColor) + ';cursor:pointer;border: 1px solid #ccc"></div>'
            +'<div style="display:inline-block;margin-left:5px;vertical-align:top;margin-right:5px;">height Indicator:</div>'
            +'<input onchange="changeIndHTab(this)" type="number" size="2" min="1" max="10" value="2">'
        +'</div>'
    +'</div>';
    container.innerHTML = str;
    return container.firstChild
}
*/
// tabLayout:{indColor:3, textColor:3,textSelect:4,indHeight:2}
/*
function changeIndHTab(el) {
    currentComponent.tabLayout.indHeight = el.value;
}

function changeNormColorTab(el) {
    elementChangeColor = el;
    openPickerColor(el.style.backgroundColor, setNormColorTab);
}

function setNormColorTab(id, color) {
    currentComponent.tabLayout.textColor = id;
    elementChangeColor.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
}

function changeSelColorTab(el) {
    elementChangeColor = el;
    openPickerColor(el.style.backgroundColor, setSelColorTab);
}

function setSelColorTab(id, color) {
    currentComponent.tabLayout.textSelect = id;
    elementChangeColor.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
}

function changeIndColorTab(el) {
    elementChangeColor = el;
    openPickerColor(el.style.backgroundColor, setIndColorTab);
}

function setIndColorTab(id, color) {
    currentComponent.tabLayout.indColor = id;
    elementChangeColor.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
}
*/
function newItemFromString(str) {
    var container = document.createElement('div')
    container.innerHTML = str;
    return container.firstChild
}
/*
function editDataModel() {
    editDataWind(metaModel, currentComponentDescr.model.data, cbSaveDataModel);
}

function cbSaveDataModel() {
    
}
*/
/*
function createTabLayoutCont() {
    currentElement = createNewEl();
    p = {typeUxUi: "ui"};
    p.type = 'RelativeLayout';
    p.typeFull = {name: 'RelativeLayout', typeBlock: 2};
    p.gravLayout = {h:4,v:4};
    p.gravity = {h:4,v:4};
    p.width = -1;
    p.height = 56;
    p.children = [];
    currentElement.android = p;
    return currentElement;
}
*/
/*
function changeTab(el) {
    let st = el.options[el.selectedIndex].value;
    currentComponentDescr.view.tabLayout = st;
}
*/
/*
function navigatorCompon() {
    editDataWind(metaNavigator, currentComponentDescr.navigator);
}
*/
/*
function checkToolBarDrawer(el) {
    currentComponentDescr.view.toolInDrawer = el.checked;
}

function checkMenuBottomDrawer(el) {
    currentComponentDescr.view.menubInDrawer = el.checked;
}

function checkTargetBut(el) {
    currentComponentDescr.view.targetButton = el.checked;
    let elem = currentComponent.viewElement;
    if (el.checked) {
        if (elem != null) {
            elem.appendChild(createMapTarget());
        }
    } else {
        let mt = elem.getElementsByClassName("map_target");
        if (mt != null) {
            mt[0].remove();
        }
    }
}

function checkZoomBut(el) {
    currentComponentDescr.view.zoomButtons = el.checked;
    let elem = currentComponent.viewElement;
    if (el.checked) {
        if (elem != null) {
            elem.appendChild(createMapZoom());
        }
    } else {
        let mt = elem.getElementsByClassName("map_zoom");
        if (mt != null) {
            mt[0].remove();
        }
    }
}

function createMapTarget() {
    var container = document.createElement('div')
    container.innerHTML = '<img class="map_target" src="img/target.png" style="top:10px;right:10px;position:absolute" width="30" height="30"></div>'
    return container.firstChild
}

function createMapZoom() {
    var container = document.createElement('div')
    container.innerHTML = '<img class="map_zoom" src="img/zoom.png" style="bottom:10px;right:10px;position:absolute" width="30" height="60"></div>'
    return container.firstChild
}
*/
/*
function checkZoomBut(el) {
    currentComponentDescr.view.zoomButtons = el.checked;
}
*/
/*
function help_compon(type) {
    windHelp.style.display = "block";
    blockAllHelp.style.display = "block";
    var ins = new insertHtml();
    let url = 'help/' + type + '.html';
    ins.get('helpBody', url);
}

function hiddenWindHelp() {
    windHelp.style.display = "none";
    blockAllHelp.style.display = "none";
}
*/
function changeTextColorTab(el) {
    elementChangeColor = el;
    openPickerColor(el.style.backgroundColor, setTextColorTab);
}

function setTextColorTab(id, color) {
    currentComponent.tabLayout.textColor = id;
    elementChangeColor.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
    if (currentComponent.viewElement != null) {
        let mB = currentComponent.viewElement.getElementsByClassName("tab_layout")[0];
        showTabLayout(currentComponentDescr.model.menuList.list, mB, currentComponent.tabLayout);
    }
}
/*
function editFloat(event) {
    let k = event.keyCode;
    let z = event.key;
    if (k < 47) {
        return true;
    }
    if ((k > 47 && k < 58) || k == 173 || z == ".") {
        if (k == 173) {
            if (event.target.selectionStart > 0) {
                event.preventDefault();
                tooltipMessage(event.target, "Минус не в начале");
                return false;
            }
        } else if (z == ".") {
            let vv = event.target.value;
            if (vv.indexOf(".") > -1) {
                event.preventDefault();
                tooltipMessage(event.target, "Точка уже есть");
                return false;
            }
        }
        return true;
    } else {
        event.preventDefault();
        tooltipMessage(event.target, "Только цифры");
        return false;
    }
}
*/
/*
function changeLongitude(el) {
    currentComponentDescr.param.longitude = el.value;
}

function changeLatitude(el) {
    currentComponentDescr.param.latitude = el.value;
}

function changeLevelZoom(el) {
    currentComponentDescr.param.levelZoom = el.value;
}
*/
