var components = ["ToolBar", "MenuBottom", "Menu", "List", "Pager", "TabLayout", "Drawer", "Panel", "ScrollPanel", "Map"];
var list_cont;
var uxFunction, uiFunction;

var listScreen = [];
var currentScreenView, currentComponentView;
var currentComponent, currentComponentDescr;
var currentChildren = [];
var idScreenNum, idComponentNum;
var positionScreen = 0;

function plusScreen() {
    hideScreen();
    currentScreen = {screenName: "SCREEN_" + idScreenNum, screenId: idScreenNum, screenComment: "", animate: 0, castom: "", typeScreen: 0, 
        title: "", titleParam: "", components: [], textErrors: "", levelErrors: 0};
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
    screen_container.scrollTop = screen_container.scrollHeight;
    setScreenView();
    container_scr.scroll_y.resize(container_scr);
}

function selScreen(event) {
    if (currentScreenView != null && currentScreenView.idScreen == event.currentTarget.idScreen) {
        return;
    }
    selScreenView(event.currentTarget);
}

function selScreenView(scr, goto) {
    hideScreen();
    currentScreenView = scr;
    setSelectScreen(goto);
}

function hideScreen() {
    if (currentScreenView != null) {
        oneScreenValid(currentScreen, currentScreenView);
        currentScreenView.className = "screen";
        let listC = currentScreenView.getElementsByClassName("list_components");
        if (listC != null && listC.length > 0) {
            listC[0].style.display = "none";
        }
        let tt = currentScreenView.getElementsByClassName("comment");
        if (tt != null) {
            var t = tt[0];
            if (t.style.display == "block") {
                t.style.display = "none";
            }
        }
    }
}

function setSelectScreen(goto) {
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
        let listC = currentScreenView.getElementsByClassName("list_components");
        if (listC != null && listC.length > 0) {
            let listComp = listC[0];
            listComp.style.display = "block";
            let first = listComp.firstElementChild;
            if (first != null) {
                selComponentAll(first);
            }
        }
        setScreenView();
    }
    if (goto != null) {
        screen_container.scrollTop = goto;
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
        let listC = currentScreenView.getElementsByClassName("list_components");
        if (listC != null && listC.length > 0) {
            listC[0].style.display = "none";
        }
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
                if (components[t] == typeComp) {
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
                currentComponent = comp;
                currentComponentView = nc;
                uxFunction = eval("new ux" + components[iT] + "();");
                setValueComponent(nc, comp, currentComponentDescr);
                list_cont.append(nc);
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
            let listC = currentScreenView.getElementsByClassName("list_components");
            if (listC != null && listC.length > 0) {
                listC[0].style.display = "block";
            }
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
//    if (cont == null) return;
    uxFunction.setValue(cont);
}

function setSelected(cl, val) {
    let ss = currentScreenView.getElementsByClassName(cl);
    if (ss != null && ss.length > 0) {
        let el = ss[0];
        el.options[val].selected = true;
    }
}

function newScreen() {
    var container = document.createElement('div')
    container.innerHTML = '<div class="screen_sel">'
        +'<div class="error_screen" style="float:left;width:3px;height:40px;"></div>'
        +'<div style="padding-bottom:15px;height:30px;margin-left:10px">'
            +'<div style="float:left;"><div style="color: #2228;font-size: 10px;margin-left:4px">Name</div>'
            +'<input class="name_screen input_style" onkeyup="return checkNameKey(event)" onkeydown="return checkNameKeyD(event)" style="font-size:12px;color:#110000;font-weight:600" type="text" size="15" value="'+ currentScreen.screenName + '"/>'
            +'</div>'
    
            +'<div style="float:left;margin-left:10px;"><div style="color:#2228;font-size: 10px;margin-left:4px">Type</div>'
            +'<select class="type_screen select_' + browser + '" onchange="changeType(this)" style="width:88px;font-size:12px;color:#110000;"><option>Activity</option><option>Fragment</option></select>'
            +'</div>'
    
            +'<div style="float:left;margin-left:10px"><div style="color:#2228;font-size: 10px;margin-left:4px">Animation</div>'
            +'<select class="anim_screen select_' + browser + '" style="width:50px;font-size:12px;color:#110000;" onchange="changeAnim(this)"><option>No</option><option>L R</option><option>R L</option><option>B T</option><option>T B</option></select>'
            +'</div>'

            +'<div style="float:left;margin-left:10px"><div style="color: #2228;font-size: 10px;margin-left:4px">Title screen</div>'
            +'<input class="name_screen input_style" onkeyup="return clickUpTitle(event)" value="' + currentScreen.title + '" type="text" size="14"/>'
            +'</div>'
    
            +'<div style="float:left;margin-left:10px"><div style="color: #2228;font-size: 10px;margin-left:4px">Title parameters</div>'
            +'<input class="name_screen input_style" onchange="changeTitleParam(this.value)" value="' + currentScreen.titleParam + '" type="text" size="14"/>'
            +'</div>'
    
            +'<div onclick="viewComment(this)" style="float:left;margin-left:10px;cursor:pointer"><div style="color:#2228;font-size:10px;margin-left:4px">Description</div>'
            +'<img width="20" height="20" style="margin-top:3px;" src="img/roll.png">'
            +'</div>'

            +'<img onclick="del_screen(this)" style="float:right;cursor:pointer;margin-top:14.5px;margin-right:10px" width="18" height="18" src="img/close-o.png">'
            +'<img onclick="plusCompon(this)" style="float:right;cursor:pointer;margin-top:15px;margin-right:10px" width="16" height="16" src="img/add_blue.png">'
        +'</div>'

        +'<textarea class="comment" style="display:none;margin-left:10px;border:1px solid #C5DCFA;box-sizing: border-box;border-radius: 8px;" onchange="changeComment(this.value)" rows="3" cols="108" maxlength="2000">' + currentScreen.screenComment + '</textarea>'
        +'<div class="list_components" style="margin-top:5px;margin-right:8px;margin-left:10px"></div>'
    +'</div>';
    return container.firstChild;
}

function viewComment(el) {
    var tt = currentScreenView.getElementsByClassName("comment");
/*
    var ss = currentScreenView.getElementsByClassName("shewron");
    var s = null;
    if (ss != null) {
        s = ss[0];
    }
*/
    if (tt != null) {
        var t = tt[0];
        if (t.style.display == "none") {
            t.style.display = "block";
/*
            if (s != null) {
                s.src = "img/shewron_up_26.png";
            }
*/
        } else {
            t.style.display = "none";
/*
            if (s != null) {
                s.src = "img/shewron_down_26.png";
            }
*/
        }
        container_scr.scroll_y.resize(container_scr);
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
        tooltipMessage(e.currentTarget, "Только английские буквы, _ и цифры");
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
    currentScreen.titleParam = v;
}

function changeType(el) {
    currentScreen.typeScreen = el.selectedIndex;
}

function changeAnim(el) {
    currentScreen.animate = el.selectedIndex;
}

function plusCompon(el) {
    let parentPlus = el.parentElement;
    let parent = parentPlus.parentElement;
    var el_1 = parent.getElementsByClassName("list_components");
    if (el_1 != undefined) {
        list_cont = el_1[0];
        if (list_cont != null) {
            let wind = formWind(250, 450, 40, 350, "Type component", true);
            var ik = components.length;
            for (let i = 0; i < ik; i++) {
                let item = document.createElement("div");
                item.className = "itemList";
                if (i == 0) {
                    item.style.borderTop = "1px solid #" + "fff";
                }
                let txtItem = document.createElement("div");
                txtItem.className = "itemListTxt";
                txtItem.style.cssText = "cursor:pointer;font-size:14px;width:100%;margin-top:7px;float:left;color:#555";
                txtItem.innerHTML = components[i];
//                txtItem.innerHTML = components[i].name;
                item.appendChild(txtItem);
                txtItem.addEventListener("click", function(){
                    closeWindow(wind);
                    selComponType(i);
                }, true);
                wind.appendChild(item);
            }
            resizeScrol(wind);
        }
    }
}

function selComponType(i) {
    var nc = newComponent(i);
    nc.componentId = idComponentNum;
//    nc.uxFunc = components[i].uxFunc;
    nc.addEventListener('click', selComponent, true);
    list_cont.append(nc);
    if (currentComponentView != null) {
        currentComponentView.className = "component";
    }
    currentComponentView = nc;
    currentComponentView.className = "component_sel";
    list_screens.scrollTop = list_screens.scrollHeight;
    addNewComponent(i);
    idComponentNum ++;
    container_scr.scroll_y.resize(container_scr);
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
    uxFunction = null;
    for (var i = 0; i < ik; i++) {
        var ls = currentChildren[i];
        if (id == ls.componentId) {
            currentComponent = ls;
            uxFunction = eval("new ux" + currentComponent.type + "();");
            break;
        }
    }
    if (currentComponent != null) {
        currentComponentDescr = getComponentDescrById(currentComponent.viewId);
    }
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
// ??????????????????????????????????? служебный


function newComponent(i) {
    uxFunction = eval("new ux" + components[i] + "();");
    let parComp = uxFunction.getParamComp();
    var str = '<div class="component_sel">'
            +'<div class="name_compon" style="float:left">' + parComp.name + '</div>'
            +'<div class="special_func" style="float:left;margin-top:3px;margin-left:20px;">' + uxFunction.getSpecialView() + '</div>'
            +'<img onclick="del_compon(this)" style="float:right;cursor:pointer;margin-top:3px;margin-right:10px" width="18" height="18" src="img/close-o.png">'
            +'<div class="component_param" style="padding: 5px;clear:both">' + uxFunction.getEditParam() + '</div>'
            +'</div>';
    var container = document.createElement('div')
    container.innerHTML = str;
    return container.firstChild;
}

function del_screen(el) {
    let parentDel = el.parentElement;
    let parent = parentDel.parentElement;
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
    container_scr.scroll_y.resize(container_scr);
}

function del_compon(el) {
    
}

function addNewComponent(i) {
    let viewId = setViewId(uxFunction.param.viewBaseId);
    uxFunction.addComponent(viewId);
    currentScreen.components.push(currentComponentDescr);
    currentChildren.push(currentComponent);
    setValueComponent(currentComponentView, currentComponent, currentComponentDescr);
    setScreenView();
}
/*
function getComponentById(id) {
    let ik = currentChildren.length;
    for (let i = 0; i < ik; i++) {
        let ls = currentChildren[i];
        if (ls.typeUxUi == "ux") {
            if (ls.viewId == id) {
                return ls;
            }
        }
    }
    return null;
}
*/
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

function undo() {
    
}

function restore() {
    
}
