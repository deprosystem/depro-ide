var components = new Array(
        {name: "ToolBar", viewBaseId: "tool_bar", type: "ToolBar", onlyOne: true, editParam: '<div style="display: inline-block; vertical-align: top; margin-right: 5px">img back</div>'
            +'<img class="img_back img_style" onclick="setImgBack()" width="24" height="24">'
            +'<div style="margin-left: 5px; display: inline-block; vertical-align: top; margin-right: 5px">hamburger</div>'
            +'<img class="img_hamburger img_style" onclick="setImgHamburg()" width="24" height="24">', 
            specialView: ""},
        {name: "MenuBottom", viewBaseId: "menu_b", type: "MenuBottom", onlyOne: true, editParam: '', 
            specialView: '<div onclick="editMenu_b()" style="display: inline-block; vertical-align: top; cursor:pointer;margin-left: 20px">formation of menu</div>'},
        {name: "Menu", viewBaseId: "menu", type: "Menu", onlyOne: true, editParam: '', 
            specialView: '<div onclick="editMenu()" style="display: inline-block; vertical-align: top; cursor:pointer;margin-left: 20px">formation of menu</div>'},
        {name: "List", viewBaseId: "list", type: "List", onlyOne: false, editParam: modelList, 
            specialView: methodModel},
        {name: "Pager", viewBaseId: "pager", type: "Pager", onlyOne: false, editParam: paramPager, 
            specialView: ''},
        {name: "TabLayout", viewBaseId: "tab_layout", type: "TabLayout", onlyOne: false, editParam: paramTab, 
            specialView: ''},
        {name: "Drawer", viewBaseId: "drawer", type: "Drawer", onlyOne: true, editParam: paramDrawer, 
            specialView: ''},
        {name: "Panel", viewBaseId: "panel", type: "Panel", onlyOne: false, editParam: paramPanel, 
            specialView: methodModel},
        {name: "ScrollPanel", viewBaseId: "scroll_panel", type: "ScrollPanel", onlyOne: true, editParam: paramPanel, 
            specialView: methodModel},
        {name: "Map", viewBaseId: "map", type: "Map", onlyOne: true, editParam: paramMap, 
            specialView: methodModel}
                );
        
var list_cont;

var listScreen = [];
var currentScreenView, currentComponentView;
var currentComponent, currentComponentDescr;
var currentChildren = [];
var idScreenNum, idComponentNum;
var positionScreen = 0;

function plusScreen() {
    currentScreen = {screenName: "SCREEN_" + idScreenNum, screenId: idScreenNum, screenComment: "", animate: 0, castom: "", typeScreen: 0, 
        title: "", titleParam: "", components: []};
    currentScreen.layout = 
            {type:"RelativeLayout",typeFull:{name:"RelativeLayout",typeBlock:2},parent:null,width:-1,height:-1,gravLayout:{h:4,v:4},gravity:{h:4,v:4},itemNav:{}, 
                viewId:"root", parent:null, children:[]};
    var ns = newScreen();
    currentChildren = currentScreen.layout.children;
    listScreen.push(currentScreen);
    ns.idScreen = idScreenNum;
    if (currentScreenView != null) {
        currentScreenView.className = "screen";
    }
    currentScreenView = ns;
    currentScreenView.className = "screen_sel";
    ns.addEventListener('click', selScreen, true);
    idScreenNum ++;
    list_screens.append(ns);
    list_screens.scrollTop = list_screens.scrollHeight;
    setScreenView();
}

function selScreen(event) {
    if (currentScreenView != null && currentScreenView.idScreen == event.currentTarget.idScreen) {
        return;
    }
    if (currentScreenView != null) {
        currentScreenView.className = "screen";
    }
    currentScreenView = event.currentTarget;
    setSelectScreen();
}

function setSelectScreen() {
    currentScreenView.className = "screen_sel";
    var id = currentScreenView.idScreen;
    if (currentScreen != null && id != currentScreen.screenId) {
        var ik = listScreen.length;
        currentScreen = null;
        for (var i = 0; i < ik; i++) {
            var ls = listScreen[i];
            if (id == ls.screenId) {
                currentScreen = ls;
                positionScreen = i;
                break;
            }
        }
    }
    if (currentScreen != null) {
        currentChildren = currentScreen.layout.children;
        setScreenView();
    }
}

function setScreenView() {
    clearRoot();
    listSaveElements = currentScreen.layout;
    setScreenLayout();
}

function setListScreen() {
    jk = listScreen.length;
    var maxIdScreenNum = 0;
    var maxIdComponentNum = 0;
    for (var j = 0; j < jk; j++) {
        currentScreen = listScreen[j];
        idScreenNum = currentScreen.screenId;
        if (maxIdScreenNum < idScreenNum) {
            maxIdScreenNum = idScreenNum;
        }
        var ns = newScreen(idScreenNum);
        currentChildren = currentScreen.layout.children;

        ns.idScreen = idScreenNum;

        currentScreenView = ns;
        currentScreenView.className = "screen";
        ns.addEventListener('click', selScreen, true);
        setSelected("type_screen", currentScreen.typeScreen);
        setSelected("anim_screen", currentScreen.animate);
        list_screens.append(ns);
        let el_1 = currentScreenView.getElementsByClassName("list_components");
        if (el_1 == undefined) {
            break;
        }
        list_cont = el_1[0];
        let ik = currentChildren.length;
        let tk = components.length;
        for (let i = 0; i < ik; i++) {
            let comp = currentChildren[i];
            currentComponentDescr = getComponentDescrById(comp.viewId);
            let typeComp = comp.type;
            let iT = -1;
            for (let t = 0; t < tk; t++) {
                if (components[t].type == typeComp) {
                    iT = t;
                    break;
                }
            }
            if (iT > -1) {
                comp.componentId = maxIdComponentNum;
                let nc = newComponent(iT);
                nc.componentId = maxIdComponentNum;
                nc.addEventListener('click', selComponent, true);
                nc.className = "component";
                setValueComponent(nc, comp, currentComponentDescr);
                list_cont.append(nc);
                currentComponentView = nc;
                maxIdComponentNum ++;
            }
        }
    }
    if (listScreen.length == 0) {
        currentScreen = null;
        currentScreenView = null;
        idScreenNum = 0;
        idComponentNum = 0;
    } else {
        currentScreen = listScreen[0];
        currentChildren = currentScreen.layout.children;
        let vv_0 = list_screens.getElementsByClassName("screen");
        if (vv_0 != null) {
            currentScreenView = vv_0[0];
            currentScreenView.className = "screen_sel";
        }
        if (currentScreenView != null) {
            let el_1 = currentScreenView.getElementsByClassName("list_components");
            if (el_1 != null) {
                list_cont = el_1[0];
                let asdf = list_cont.firstElementChild;
                if (asdf != null) {
                    selComponentAll(asdf);
                }
            }
        }
        idScreenNum = maxIdScreenNum + 1;
        idComponentNum = maxIdComponentNum + 1;
        setScreenView();
    }
}

function getComponentDescrById(id) {
    let compDescr = currentScreen.components;
    let ik = compDescr.length;
    for (let i = 0; i < ik; i++) {
        let des = compDescr[i];
        if (des.view.viewId == id) {
            return des;
        }
    }
    return null;
}

function setValueComponent(nc, compLayout, comp_descr) {
    let cont = nc.getElementsByClassName("component_param")[0];
    if (cont == null) return;
    switch (compLayout.type) {
        case "ScrollPanel":
        case "Panel" :
        case "List" :
            let met = nc.getElementsByClassName("model_method");
            if (met != null) {
                if (comp_descr.model.method != null) {
                    met = met[0];
                    met[comp_descr.model.method].selected = true;
                    changeMethod(met);
                }
            }
            if (comp_descr.model.url != null && comp_descr.model.url.length > 0) {
                let url = cont.getElementsByClassName("url")[0];
                if (url != null) {
                    url.value = comp_descr.model.url;
                }
            }
            if (comp_descr.model.param != null && comp_descr.model.param.length > 0) {
                let param = cont.getElementsByClassName("param")[0];
                if (param != null) {
                    param.value = comp_descr.model.param;
                }
            }
            break;
        case "Pager" :
            let selTab = cont.firstElementChild.getElementsByClassName("select_tab");
            if (selTab != null) {
                selTab[0].innerHTML = formSelectForElem("TabLayout", "changeTab", comp_descr.view.tabLayout);
            }
            break;
        case "TabLayout" :

            break;
        case "Drawer" :
                let fragm = cont.getElementsByClassName("drawer_fragm")[0];
                if (fragm != null && comp_descr.view.drawer_fragm != null) {
                    fragm.value = comp_descr.view.drawer_fragm;
                }
                let tool_dr = cont.getElementsByClassName("tool_drawer")[0];
                if (tool_dr != null) {
                    tool_dr.firstElementChild.checked = comp_descr.view.toolInDrawer;
                }
                let menu_dr = cont.getElementsByClassName("menu_drawer")[0];
                if (menu_dr != null) {
                    menu_dr.firstElementChild.checked = comp_descr.view.menubInDrawer;
                }
            break;
        case "ToolBar" :
            if (compLayout.imgBack != null && compLayout.imgBack != "") {
                let img = cont.getElementsByClassName("img_back")[0];
                if (img != null) {
                    img.src = compLayout.imgBack;
                }
            }
            if (compLayout.imgHamburg != null && compLayout.imgHamburg != "") {
                let img = cont.getElementsByClassName("img_hamburger")[0];
                if (img != null) {
                    img.src = compLayout.imgHamburg;
                }
            }
            break;
        case "Map" :
            if (comp_descr.model.url != null && comp_descr.model.url.length > 0) {
                let url = cont.getElementsByClassName("url")[0];
                if (url != null) {
                    url.value = comp_descr.model.url;
                }
            }
            if (comp_descr.model.param != null && comp_descr.model.param.length > 0) {
                let param = cont.getElementsByClassName("param")[0];
                if (param != null) {
                    param.value = comp_descr.model.param;
                }
            }
            let par = comp_descr.param;
            if (par != null) {
                if (par.longitude != null && par.longitude.length > 0) {
                    let long = cont.getElementsByClassName("long")[0];
                    if (long != null) {
                        long.value = par.longitude;
                    }
                }
                if (par.latitude != null && par.latitude.length > 0) {
                    let lat = cont.getElementsByClassName("lat")[0];
                    if (lat != null) {
                        lat.value = par.latitude;
                    }
                }
                if (par.levelZoom != null && par.levelZoom.length > 0) {
                    let zoom = cont.getElementsByClassName("zoom")[0];
                    if (zoom != null) {
                        zoom.value = par.levelZoom;
                    }
                }
                if (par.myMarker != null && par.myMarker.length > 0) {
                    let myMark = cont.getElementsByClassName("my_marker")[0];
                    if (myMark != null) {
                        myMark.src = par.myMarker;
                    }
                }
                if (par.marker != null && par.marker.length > 0) {
                    let Mark = cont.getElementsByClassName("marker")[0];
                    if (Mark != null) {
                        Mark.src = par.marker;
                    }
                }
                let elem = cont.getElementsByClassName("target_but")[0];
                if (elem != null) {
                    elem.firstElementChild.checked = comp_descr.view.targetButton;
                }
                elem = cont.getElementsByClassName("zoom_but")[0];
                if (elem != null) {
                    elem.firstElementChild.checked = comp_descr.view.zoomButtons;
                }
            }
            break;
    }
            
}

function setSelected(cl, val) {
    var ss = currentScreenView.getElementsByClassName(cl);
    if (ss != null) {
        var el = ss[0];
        el.options[val].selected = true;
    }
}

function newScreen() {
    var container = document.createElement('div')
    container.innerHTML = '<div class="screen_sel">'
            +'<input class="name_screen" onkeyup="return checkNameKey(event)" onkeydown="return checkNameKeyD(event)" placeholder="Name screen" type="text" size="15" value="'+ currentScreen.screenName + '"/>'
            +'<select class="type_screen" onchange="changeType(this)"><option>Activity</option><option>Fragment</option></select>'
            +'<div style="margin-left: 5px; display: inline-block; color: #777">Animation</div>'
            +'<select style="margin-left: 5px;" onchange="changeAnim(this)" class="anim_screen"><option>No</option><option>L R</option><option>R L</option><option>B T</option><option>T B</option></select>'

            +'<div onclick="viewComment(this)" style="cursor: pointer; margin-left: 5px; display: inline-block; color: #777;"><div style="display: inline-block;">Comment </div>'
            +'<img class="shewron" width="16" height="16" src="img/shewron_down_26.png"></div>'

            +'<div class="delete_obj" onclick="del_screen(this)"><img width="18" height="18" src="img/cross.png"></div>'
            +'<div onclick="plusCompon(this)" style="cursor: pointer; float: right; display: inline-block; margin-right: 5px;">'
            +'<img width="16" height="16" style="float: left; margin-top: 2px" src="img/plus_24.png">'
            +'<div style="height: 100%; float: left; margin-left: 2px;">Component</div></div>'
            +'<div style="margin-top: 2px">'
                +'<input class="title " onkeyup="return clickUpTitle(event)" placeholder="Title screen" value="' + currentScreen.title + '" type="text" style="margin-left: 120px; vertical-align: top;"/>'
                +'<input class="title" onchange="changeTitleParam(this.value)" placeholder="Title parameters" value="' + currentScreen.titleParam + '" type="text" style="margin-left: 5px; vertical-align: top;"/>'
            +'</div>'
            +'<div class="comment" style="display: none;"><textarea onchange="changeComment(this.value)" style="margin-left:10px" rows="3" cols="100" maxlength="400">' 
            + currentScreen.screenComment + '</textarea></div>'
            +'<div class="list_components" style="margin-left: 30px; margin-top: 5px;"></div</div>';
    return container.firstChild;
}

function viewComment(el) {
    var tt = currentScreenView.getElementsByClassName("comment");
    var ss = currentScreenView.getElementsByClassName("shewron");
    var s = null;
    if (ss != null) {
        s = ss[0];
    }
    if (tt != null) {
        var t = tt[0];
        if (t.style.display == "none") {
            t.style.display = "block";
            if (s != null) {
                s.src = "img/shewron_up_26.png";
            }
        } else {
            t.style.display = "none";
            if (s != null) {
                s.src = "img/shewron_down_26.png";
            }
        }
    }
}

function changeComment(v) {
    currentScreen.screenComment = v;
}

function checkNameKeyD(e) {
    var k = e.key;
    var kUp = k.toUpperCase();
    if ((kUp >= "A" && kUp <= "Z") || kUp == "_" || (kUp >= "0" && kUp <= "9") || 
            k == 'ArrowLeft' || k == 'ArrowRight' || k == 'Delete' || k == 'Backspace')  {
        return true;
    } else {
        return false;
    }
}

function checkNameKey(e) {
    let a = e.currentTarget;
    currentScreen.screenName = a.value;
}

function clickUpTitle(e) {
    let a = e.currentTarget;
    currentScreen.title = a.value;
    setToolTitle(a.value);
}

function setToolTitle(value) {
    let ik = currentChildren.length;
    let count = -1;
    for (let i = 0; i < ik; i++) {
        let ls = currentChildren[i];
        if (ls.type == "ToolBar") {
            count = i;
            break;
        }
    }
    if (count > -1) {
        var tt = currentChildren[count].viewElement.getElementsByClassName("title")[0];
        tt.innerHTML = value;
    }
}

function changeTitleParam(v) {
//    currentComponentDescr.view.titleParam = v;
    currentScreen.titleParam = v;
}

function changeType(el) {
    currentScreen.typeScreen = el.selectedIndex;
}

function changeAnim(el) {
    currentScreen.animate = el.selectedIndex;
}

function plusCompon(el) {
    var el_1 = el.parentNode.getElementsByClassName("list_components");
    if (el_1 != undefined) {
        list_cont = el_1[0];
        if (list_cont != null) {
            var wind = commonWindow(250, 350, 70, 400, "Type component");
            wind.innerHTML = "";
            var ik = components.length;
            for (var i = 0; i < ik; i++) {
                wind.append(newTypeComponent(i));
            }
        }
    }
}

function newTypeComponent(i) {
    var container = document.createElement('div')
    container.innerHTML = '<div class="type_component" onclick="selComponType('+i+')">' + components[i].name + '</div';
    return container.firstChild;
}

function selComponType(i) {
    closeCommonWindow();
    var nc = newComponent(i);
    nc.componentId = idComponentNum;
    nc.addEventListener('click', selComponent, true);
    list_cont.append(nc);
    if (currentComponentView != null) {
        currentComponentView.className = "component";
    }
    currentComponentView = nc;
    list_screens.scrollTop = list_screens.scrollHeight;
    addNewComponent(i);
    idComponentNum ++;
}

function selComponent(event) {
    let el = event.currentTarget;
    if (currentComponentView != el) {
        selComponentAll(el);
    }
}

function selComponentAll(el) {
    if (currentComponentView != null) {
        currentComponentView.className = "component";
    }
    currentComponentView = el;
    currentComponentView.className = "component_sel";
    var id = currentComponentView.componentId;
    var ik = currentChildren.length;
    currentComponent = null;
    currentComponentDescr = null;
    for (var i = 0; i < ik; i++) {
        var ls = currentChildren[i];
        if (id == ls.componentId) {
            currentComponent = ls;
            break;
        }
    }
    currentComponentDescr = getComponentDescrById(currentComponent.viewId);
}

// ??????????????????????????????????? служебный
function jsonNoView(el) {
    return JSON.stringify(el, function(key, value) {
            if (key == "viewElement") {
                return "";
            }
            return value;
        });
}
function jsonNoViewParent(el) {
    return JSON.stringify(el, function(key, value) {
            if (key == "viewElement") {
                return "";
            }
            if (key == "parent") {
                return undefined;
            }
            return value;
        });
}
// ??????????????????????????????????? служебный в верху


function newComponent(i) {
    var container = document.createElement('div')
    var str = '<div class="component_sel"><div class="name_compon" style="display: inline-block;">' + components[i].name + '</div>'
            +'<div class="special_func" style="display: inline-block;margin-left:20px;">' + components[i].specialView + '</div>'
            +'<div class="delete_obj" style="margin-right:20px;" onclick="del_compon(this)">'
            +'<img width="18" height="18" src="img/cross.png"></div>'
            +'<div class="help" style="margin-right: 5px;" onclick="help_compon(' + "'" + components[i].type + "'" + ')">'
            +'<img width="18" height="18" src="img/help.png"></div>'
            +'<div class="component_param" style="padding: 5px;">' + components[i].editParam + '</div>'
            +'</div>';
    container.innerHTML = str;
    return container.firstChild;
}

function del_screen(el) {
    let parent = el.parentElement;
    let nn = parent.getElementsByClassName("name_screen");
    let ik = listScreen.length;
    let iEl = -1;
    let nameEl = currentScreen.screenName;
    for (let i = 0; i < ik; i++) {
        if (nameEl == listScreen[i].screenName) {
            iEl = i;
            break;
        }
    }
    listScreen.splice(iEl, 1);
    
    let next = parent.nextElementSibling;
    if (next != null) {
        currentScreenView = next;
        setSelectScreen();
    } else {
        let prev = parent.previousElementSibling;
        if (prev != null) {
            currentScreenView = prev;
            setSelectScreen();
        } else {
            clearRoot();
        }
    }
    parent.parentNode.removeChild(parent);
}

function del_compon(el) {
    
}

function addNewComponent(i) {
    let comp = components[i];
    let viewId = setViewId(comp.viewBaseId);
    switch (comp.name) {
        case "ToolBar" :
            currentComponent = {type: comp.type, componentId: idComponentNum, viewId: viewId, typeUxUi: "ux", componParam:{type:0},
                    typeFull: {name: comp.type, typeBlock: 0}, gravLayout: {h: 3, v: 3}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}}, 
                width:-1,height:56,topMarg:"",leftMarg:"",itemNav:{},textColor:101,textSize:20,background:0, viewElement: null,children:[]};
            currentComponentDescr = {type:comp.type,componentId: idComponentNum,model:{},view:{viewId: viewId, title:"", titleParam: ""}};
            break;
        case "MenuBottom" :
            currentComponent = {type: comp.type, componentId: idComponentNum, viewId: viewId, typeUxUi: "ux", componParam:{type:1},
                    typeFull: {name: comp.type, typeBlock: 0}, gravLayout: {h: 3, v: 2}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}}, 
                width:-1,height:56,topMarg:"",leftMarg:"",itemNav:{},background:0, viewElement: null,children:[]};
            currentComponentDescr = {type:comp.type,componentId: idComponentNum,model:{menuList:{colorNormId:3,colorSelId:4,list:[]}},view:{viewId: viewId}};
            break;
        case "Menu" :
            currentComponent = {type: comp.type, componentId: idComponentNum, viewId: viewId, typeUxUi: "ux", componParam:{type:2},
                    typeFull: {name: comp.type, typeBlock: 10}, gravLayout: {h: 3, v: 3}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}}, 
                width:-1,height:-1,itemNav:{},viewElement: null,children:[]};
            currentComponentDescr = {type:comp.type,componentId: idComponentNum,model:{menuList:{colorNormId:0,colorSelId:1,colorEnabl:6,list:[]}},view:{viewId: viewId}};
            break;
        case "List" :
            currentComponent = {type: comp.type, componentId: idComponentNum, viewId: viewId, typeUxUi: "ux", componParam:{type:2},
                    typeFull: {name: comp.type, typeBlock: 10}, gravLayout: {h: 3, v: 3}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}}, 
                width:-1,height:-1,itemNav:{},viewElement: null,children:[]};
            currentComponentDescr = {type:comp.type,componentId: idComponentNum,model:{method:0,data:[]},view:{viewId: viewId},navigator:[]};
            break;
        case "Panel" :
            currentComponent = {type: comp.type, componentId: idComponentNum, viewId: viewId, typeUxUi: "ux", componParam:{type:7},
                    typeFull: {name: comp.type, typeBlock: 10}, gravLayout: {h: 3, v: 3}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}}, 
                width:-1,height:-1,itemNav:{},viewElement: null,children:[]};
            currentComponentDescr = {type:comp.type,componentId: idComponentNum,model:{method:0,data:[]},view:{viewId: viewId},navigator:[]};
            break;
        case "ScrollPanel" :
            currentComponent = {type: comp.type, componentId: idComponentNum, viewId: viewId, typeUxUi: "ux", componParam:{type:9},
                    typeFull: {name: comp.type, typeBlock: 10}, gravLayout: {h: 3, v: 3}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}}, 
                width:-1,height:-1,itemNav:{},viewElement: null,children:[]};
            currentComponentDescr = {type:comp.type,componentId: idComponentNum,model:{method:0,data:[]},view:{viewId: viewId},navigator:[]};
            break;
        case "Pager" :
            currentComponent = {type: comp.type, componentId: idComponentNum, viewId: viewId, typeUxUi: "ux", componParam:{type:4}, // componParam:{type:3 для ComponTextView
                    typeFull: {name: comp.type, typeBlock: 0}, gravLayout: {h: 3, v: 3}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}},
                width:-1,height:-1,itemNav:{},viewElement: null,children:[]};
            currentComponentDescr = {type:comp.type,componentId: idComponentNum,model:{},view:{viewId: viewId}};
            break;
        case "TabLayout" :
            currentComponent = {type: comp.type, componentId: idComponentNum, viewId: viewId, typeUxUi: "ux", componParam:{type:5},
                    typeFull: {name: comp.type, typeBlock: 0}, gravLayout: {h: 3, v: 3}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}}, 
                    tabLayout:{indColor:3, textColor:3,textSelect:4,indHeight:2},
                width:-1,height:56,background:0,itemNav:{},viewElement: null,children:[]};
            currentComponentDescr = {type:comp.type,componentId: idComponentNum,model:{menuList:{list:[]}},view:{viewId: viewId}};
            break;
        case "Drawer" :
            currentComponent = {type: comp.type, componentId: idComponentNum, viewId: viewId, typeUxUi: "ux", componParam:{type:6},
                    typeFull: {name: comp.type, typeBlock: 10}, gravLayout: {h: 3, v: 3}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}}, 
                width:-1,height:-1,itemNav:{},viewElement: null,children:[]};
            currentComponentDescr = {type:comp.type,componentId: idComponentNum,model:{},view:{viewId: viewId}};
            break;
        case "Map" :
            currentComponent = {type: comp.type, componentId: idComponentNum, viewId: viewId, typeUxUi: "ux", componParam:{type:11},
                    typeFull: {name: comp.type, typeBlock:0}, gravLayout: {h: 3, v: 3}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}}, 
                width:-1,height:-1,itemNav:{},viewElement: null,children:[]};
            currentComponentDescr = {type:comp.type,componentId: idComponentNum,model:{method:0,data:[]},view:{viewId: viewId},param:{}};
            break;
    }
    currentScreen.components.push(currentComponentDescr);
    currentChildren.push(currentComponent);
    setValueComponent(currentComponentView, currentComponent, currentComponentDescr);
    setScreenView();
}

function setViewId(id) {
    let ik = currentChildren.length;
    let count = 0;
    for (let i = 0; i < ik; i++) {
        let ls = currentChildren[i];
        if (ls.typeUxUi == "ux") {
            if (ls.viewId.includes(id)) {
                count ++;
            }
        }
    }
    if (count > 0) {
        return id + "_" + count;
    } else {
        return id;
    }
}