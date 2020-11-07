var TYPE_String = 0, TYPE_StringAr = 1, TYPE_Image = 2, TYPE_Int = 3;
var validEmpty = 1, validNumber = 2, validName = 3; // validName - a-z,_,0-9   перша - літера
var listEdit;
var listDimens;
var listSaveElements;
var currentProject;
var currentScreen;
var onkeyupJump;
var processingSelectedIMG;
var indListEdit;
var funcSendCreateData;
var extraOptions;

var isColorChange = false;
var isProjectChange = false;
var isSystemChange = false;
var isStringsChange = false;
var isStylesChange = false;
var isDrawableChange = false;
var isDimensChange = false;
var isUX = true;
var isScreenChange = false;
var isLayoutChange = false;
var listNameScreen = [];
var listAppParam, listValueAppParam;

function createProject() {
    windEditForm.style.display = "block";
    listEdit = [];
    listEdit[0] = {name : "nameProject", label : "Project name", type : TYPE_String, valid: validEmpty};
    listEdit[1] = {name : "namePackage", label : "Package name", type : TYPE_String, valid: validEmpty, value: "com.example.ide"};
    listEdit[2] = {name : "nameAPP", label : "APP name", type : TYPE_String, valid: validEmpty};
    listEdit[3] = {name : "comment", label : "Comment", type : TYPE_StringAr};
    funcSendCreateData = sendCreateProject;
    setCreateData(listEdit, "Create project");
}

function openProject() {
    doServer("POST", "project/list", cbListProject);
}

function saveProject() {
    var st = formJsonProject();
    doServer("POST", "project/save", cbSaveProject, st);
}

function formJsonProject() {
    var par = {};
    par.projectId = currentProject.projectId;
    if (isColorChange) {
        par.colors = JSON.stringify(listColor);
    }
    if (isStylesChange) {
        par.style = JSON.stringify(listStyle);
    }
    if (isDrawableChange) {
        par.drawable = JSON.stringify(listDrawable);
    }
    if (listAppParam != null) {
        par.appParam = JSON.stringify(formAppParam());
    };
    par.screens = JSON.stringify(listScreen, function(key, value) {
            if (key == "viewElement") {
                return undefined;
            }
            if (key == "parent") {
                return undefined;
            }
            return value;
        });
    return JSON.stringify(par);
}

function formAppParam() {
    let ik = listAppParam.length;
    let res = [];
    for (i = 0; i < ik; i++) {
        let item = listAppParam[i];
        if (item.value != "" && item.value != item.value_def) {
            res.push({id:item.id,name:item.name,value:item.value,type:item.type});
        }
    }
    return res;
}

function setCreateData(p, title) {
    var str = "";
    var ik = p.length;
    for (var i = 0; i < ik; i++) {
        pp = p[i];
        switch (pp.type) {
            case TYPE_String:
                let vv = "";
                if (pp.value != null) {
                    vv = ' value="' + pp.value + '"';
                }
                str += '<div style="float: left; margin-top: 10px"> <div style="float: left; width: 100px;">'+ p[i].label 
                + '</div><input style="float: left; margin-left:5px" type="text"' + vv + ' size="25"/></div>\n';
                break;
            case TYPE_StringAr:
                str += '<div style="float: left; margin-top: 10px"> <div style="float: left; width: 100px;">'+ p[i].label 
                + '</div><textarea style="margin-left:5px" rows="5" size="35"></textarea></div>\n';
                break;
        }
        
    }
    str += '<div class="button" >Send</div>';
    var nn = windEditForm.getElementsByClassName("titleWindName")[0];
    nn.innerHTML = title;
    var el = document.getElementById("windEditBody");
    el.innerHTML = str;
    el.getElementsByClassName("button")[0].onclick = funcSendCreateData;
    el.getElementsByTagName('input')[0].focus();
    el.onkeyup = keyUpCreateData;
}

function keyUpCreateData(e) {
    if (e.which == 13) {
        document.getElementById("windEditBody").onkeyup = null;
        funcSendCreateData();
    }
}

function sendCreateProject() {
    windEditForm.style.display = "none";
    extraOptions = [];
    doServer("POST", "project/create", cbCreateProject, dataFromForm());
}

function dataFromForm() {
    var elDiv = windEditBody.children;
    var ik = listEdit.length;
    var strJson = "{";
    var sep = "";
    for (var i = 0; i < ik; i++) {
        pp = listEdit[i];
        switch (pp.type) {
            case TYPE_String:
                strJson += sep + '"' + pp.name + '":"' + elDiv[i].getElementsByTagName("input")[0].value + '"'
                break;
            case TYPE_StringAr:
                strJson += sep + '"' + pp.name + '":"' + elDiv[i].getElementsByTagName("textarea")[0].value + '"'
                break;
            case TYPE_Image:
                strJson += sep + '"' + pp.name + '":"' + elDiv[i].getElementsByTagName("img")[0].src + '"'
                break;
        }
        sep = ',';
    }
    ik = extraOptions.length;
    for (var i = 0; i < ik; i++) {
        var pp = extraOptions[i];
        switch (pp.type) {
            case TYPE_String:
                strJson += sep + '"' + pp.name + '":"' + pp.value + '"';
                break;
            case TYPE_Int:
                strJson += sep + '"' + pp.name + '":' + pp.value;
                break;
        }
    }
    strJson += '}';
    return strJson;
}

function cbCreateProject(res) {
    plus_screen.style.display = "block";
    openMenu();
    currentProject = JSON.parse(res);
    info_project.innerHTML = currentProject.nameProject;
    listScreen = JSON.parse(currentProject.screens);
    listColor = JSON.parse(currentProject.colors);
    listDimens = JSON.parse(currentProject.dimens);
    listValueAppParam = JSON.parse(currentProject.appParam);
    if (currentProject.style != null) {
        listStyle = JSON.parse(currentProject.style);
    }
    setListColor();
    listDrawable = JSON.parse(currentProject.drawable);
    setMaxIndexDrawable();
    setLayout();
    list_screens.innerHTML = "";
    setListScreen();
}

function clearRoot() {
    var contour = root.getElementsByClassName('contourEl')[0];
    var cont_1 = contour.cloneNode(true);
    root.innerHTML = "";
    root.android = currentScreen.layout;
    root.appendChild(cont_1);
}

function setScreenLayout() {
    var rr = document.getElementById('root');
    var itemNav = rr.android.itemNav;
    rr.android = listSaveElements;
    rr.android.itemNav = itemNav;
    rr.android.parent = document.getElementById('root_g');
    setRoot();
    ACTIVE = null;
    setActive(root);
    setNavigatorRoot();
    setScreenElements(rr, listSaveElements.children);
    hideContourEl();
}

function modelClick(el) {
    hideContourEl();
    currentElement = el;
    setParamCompon();
    setPickElement(el);
    selectNavigatorEl(el);
}

function setScreenElements(el, children) {
    if (children == null) return;
    var ik = children.length;
    let myCompon;
    for (var i = 0; i < ik; i++) {
        var newNode = children[i];
        var newEl = createNewEl();
        var typeEl;
        newEl.android = newNode;
        newNode.viewElement = newEl;
        addNewElement(el, newEl);
        var p = newEl.android;
        let below, above;
        switch (p.type) {
            case 'TextView' :
                typeEl = createDivText();
                newEl.appendChild(typeEl);
                break;
            case 'EditText' :
                typeEl = createDivEditText(newEl);
                newEl.appendChild(typeEl);
                break;
            case 'ImageView' :
                typeEl = createDivImg();
                newEl.appendChild(typeEl);
                break;
            case 'ToolBar' :
                typeEl = createForToolBar();
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
                    if (newNode.imgBack != null && newNode.imgBack != "") {
                        img.src = newNode.imgBack;
                    }
                }
                break;
            case 'MenuBottom' :
                typeEl = createDivMenuB();
                newEl.appendChild(typeEl);
                myCompon = myComponent(p.viewId);
                if (myCompon != null) {
                    let menuList = myCompon.model.menuList;
//                        getMenuList(p.viewId);
                    if (menuList != null) {
                        showMenuB(menuList, typeEl);
                    }
                }
                break;
            case 'List' :
                formBelow(p, el, "ToolBar");
                formAbove(p, el, "MenuBottom");
                break;
            case 'Menu' :
                myCompon = myComponent(p.viewId);
                showMenu(newEl, myCompon.model.menuList);
                break;
            case 'Panel' :
                formBelow(p, el, "ToolBar");
                formAbove(p, el, "MenuBottom");
                break;
            case 'Map' :
                formBelow(p, el, "ToolBar");
                formAbove(p, el, "MenuBottom");
                typeEl = createDivImg();
                newEl.appendChild(typeEl);
                p.src = "img/map.png";
                myCompon = myComponent(p.viewId);
                newEl.appendChild(createMarker(myCompon.param.marker));
                break;
            case 'Pager' :
                formBelow(p, el, "ToolBar,TabLayout");
                formAbove(p, el, "MenuBottom");
                break;
            case 'TabLayout' :
                typeEl = createDivTab();
                newEl.appendChild(typeEl);
//                viewComponElem(newEl);
                myCompon = myComponent(p.viewId);
                if (myCompon != null) {
                    let dat = myCompon.model.menuList.list;
                    if (dat != null) {
                        showTabLayout(dat, typeEl, p.tabLayout);
                    }
                }
                formBelow(p, el, "ToolBar");
                break;
        }
        viewComponElem(newEl);
        addNavigatorEl(newEl);
        if (p.typeUxUi == "ux") {
            
        }
        modelClick(newEl);
        setScreenElements(newEl, newNode.children);
    }
}

function formAbove(pp, el, st) { // Пошук в el елементів тип яких вказано в st через кому. Результат тип самого високого (по top) елемента
    let child = el.children;
    let ik = child.length;
    let minValue = 5000;
    let minViewId = null;
    for (let i = 0; i < ik; i++) {
        let elC = child[i];
        let p = elC.android;
        if (p != null) {
            if (st.indexOf(p.type) > -1) {
                let rect = elC.getBoundingClientRect();
                if (rect.top < minValue) {
                    minValue = rect.top;
                    minViewId = p.viewId;
                }
            }
        }
    }
    if (minViewId != null) {
        pp.above = minViewId;
    }
}

function formBelow(pp, el, st) { // Пошук в el елементів тип яких вказано в st через кому. Результат тип самого низького (по bottom) елемента
    let child = el.children;
    let ik = child.length;
    let maxValue = 0;
    let maxViewId = null;
    for (let i = 0; i < ik; i++) {
        let elC = child[i];
        let p = elC.android;
        if (p != null) {
            if (st.indexOf(p.type) > -1) {
                let rect = elC.getBoundingClientRect();
                if (rect.bottom > maxValue) {
                    maxValue = rect.bottom;
                    maxViewId = p.viewId;
                }
            }
        }
    }
    if (maxViewId != null) {
        pp.below = maxViewId;
    }
}

function myComponent(id) {
    let ik = currentScreen.components.length;
    if (ik > 0) {
        for (let i = 0; i < ik; i++) {
            let it = currentScreen.components[i];
            if (it.view.viewId == id) {
                return it;
            }
        }
        return null;
    } else {
        return null;
    }
}

function getComponent(id) {
    let ik = currentScreen.components.length;
    if (ik > 0) {
        for (let i = 0; i < ik; i++) {
            let it = currentScreen.components[i];
            if (it.view.viewId == id) {
                return it;
            }
        }
        return null;
    } else {
        return null;
    }
}

function openMenuScreen() {
    listMenu_UX[1].children[2].domElement.className = 'subMainMenuNo';
    listMenu_UX[1].children[3].domElement.className = 'subMainMenu';
}

function openMenu() {
    listMenu_UX[0].children[2].domElement.className = 'subMainMenu';
    listMenu_UX[0].children[3].domElement.className = 'subMainMenu';
    listMenu_UX[0].children[4].domElement.className = 'subMainMenu';
    listMenu_UX[0].children[5].domElement.className = 'subMainMenu';
    listMenu_UX[1].children[0].domElement.className = 'subMainMenu';
    listMenu_UX[1].children[1].domElement.className = 'subMainMenu';
    listMenu_UX[1].children[2].domElement.className = 'subMainMenu';
}

function cbSaveProject(res) {
    isColorChange = false;
    isStringsChange = false;
    isDrawableChange = false;
    isDimensChange = false;
    alert("Project changes saved");
}

function cbListProject(res) {
    var list = JSON.parse(res);
    var ik = list.length;
    var strList = "";;
    for (var i = 0; i < ik; i++) {
        var p = list[i];
        strList += '<div style="clear: both; margin-top: 5px; height: 30px; cursor: pointer" onClick="selectProject(' + p.projectId + ')">' 
                + '<img width="30" height="30" style="float: left; margin-right: 5px" src="'
                + p.logo + '"><div>' + p.nameProject + '</div></div>'
    }
    listBody.innerHTML = strList;
    windList.style.display = "block";
}

function selectProject(id) {
    windList.style.display = "none";
    doServer("get", "project/getproject?id=" + id, cbCreateProject);
}

function setSignChanges() {
    isProjectChange = true;
    listMenu_UX[0].children[3].domElement.className = 'subMainMenu';
}

function setSignChangesNo() {
    isProjectChange = false;
    listMenu_UX[0].children[3].domElement.className = 'subMainMenuNo';
}

function closeProject() {
    
}

function deleteProject() {
    
}

function uploadImage() {
    uploadPanel.style.display = "flex";
    if (uploadFrame.src != "upload.html") {
        uploadFrame.src = "upload.html";
    }
}

function changeProject() {
    windEditForm.style.display = "block";
    listEdit = [];
    listEdit[0] = {name : "nameProject", label : "nameProject", type : TYPE_String, valid: validEmpty, value: currentProject.nameProject};
    listEdit[1] = {name : "namePackage", label : "Package name", type : TYPE_String, valid: validEmpty, value: currentProject.namePackage};
    listEdit[2] = {name : "nameAPP", label : "nameAPP", type : TYPE_String, valid: validEmpty, value: currentProject.nameAPP};
    listEdit[3] = {name : "comment", label : "comment", type : TYPE_StringAr, value: currentProject.comment};
    listEdit[4] = {name : "logo", label : "logo", type : TYPE_Image, value: currentProject.logo};
    setInputForm(listEdit, sendChange, "Change Project");
}

function setInputForm(p, clickRun, title) {
    var str = "";
    var ik = p.length;
    for (var i = 0; i < ik; i++) {
        pp = p[i];
        switch (pp.type) {
            case TYPE_String:
                str += '<div style="float: left; margin-top: 10px"> <div style="float: left; width: 100px;">'+ p[i].label + '</div>'
                + '<input style="float: left; margin-left:5px" type="text" size="25" value="' + p[i].value + '"/></div>\n';
                break;
            case TYPE_StringAr:
                str += '<div style="float: left; margin-top: 10px"> <div style="float: left; width: 100px;">'+ p[i].label 
                + '</div><textarea style="margin-left:5px" rows="5" size="35">' + p[i].value + '</textarea></div>\n';
                break;
            case TYPE_Image:
                str += '<div style="float: left; margin-top: 10px"> <div style="float: left; width: 100px;">'+ p[i].label + '</div>'
                + '<img class="imgLogo" src="' + p[i].value + '" width="30" height="30" style="float: left; margin-left:5px">'
                + '<div onclick="chooseImg(' + i + ')" style="float: left; margin-left: 15px; cursor: pointer; border: 2px threedhighlight outset; ' 
                + 'padding-left: 15px; padding-right: 15px; padding-bottom: 4px; padding-top: 4px; background-color: #ddd">Choose</div></div>\n';
                break;
        }
        
    }
    str += '<div class="button" style="clear: both;">Send</div><div class="button" onclick="closeWindEditForm();">Cancel</div>';
    var nn = windEditForm.getElementsByClassName("titleWindName")[0];
    nn.innerHTML = title;
    var el = document.getElementById("windEditBody");
    el.innerHTML = str;
    el.getElementsByTagName('input')[0].focus();
    el.getElementsByClassName('button')[0].onclick = clickRun;
    onkeyupJump = clickRun;
    el.onkeyup = keyupHand;
}

function chooseImg(i) {
    indListEdit = i;
    processingSelectedIMG = procSelectImg;
    selectLoadImg();
}

function procSelectImg(adrImg) {
    listEdit[indListEdit].value = adrImg;
    document.getElementById("windEditBody").getElementsByClassName("imgLogo")[0].src = adrImg;
}

function keyupHand(e) {
    if (e.which == 13) {
        onkeyupJump();
    }
}

function closeWindEditForm() {
    windEditForm.style.display = 'none';
}

function sendChange() {
    windEditForm.style.display = "none";
    extraOptions = [];
    extraOptions[0] = {name: "projectId", value: currentProject.projectId, type: TYPE_Int};
    doServer("POST", "project/change", cbChangeProject, dataFromForm());
}

function cbChangeProject(res) {
    
}

function selectLoadImg() {
    doServer("GET", 'images/list', cbSelectImg);
}

cbSelectImg = function(res) {
    windImg.style.display = 'block';
    if (res == "") return;
    listImg = JSON.parse(res);
    var str = '';
    for (var i = 0; i < listImg.length; i++) {
        var path = listImg[i];
        var ii = path.lastIndexOf("\\");
        var nam = path.substring(ii + 1);
        str += '<div style="clear: both; margin-top: 5px; height: 30px; cursor: pointer" onClick="isSelectImg(' + i + ')">' 
                + '<img width="30" height="30" style="float: left; margin-right: 5px" src="' + path + '"><div>' 
                + nam.substring(0, nam.indexOf('.')) + '</div></div>'
    }
    selImg.innerHTML = str;
}

function isSelectImg(i) {
    windImg.style.display = 'none';
    processingSelectedIMG(listImg[i]);
}

function setLayoutChange() {
    isScreenChange = true;
    isLayoutChange = true;
}

function cancelUploadImg() {
    uploadPanel.style.display = "none";
    alert("Files successfully transferred to server");
}

function generateProject() {
    if (validDeclare()) {
        doServer("GET", "export/android?projectId=" + currentProject.projectId, cbGenerateProject);
    }
}

function validDeclare() {
    let strError = "";
    let ik = listScreen.length;
    listNameScreen.length = 0;
    if (ik == 0) {
        strError += "Нет описаных экранов<br>";
    } else {
        for (let i = 0; i < ik; i++) {
            let nn = listScreen[i].screenName;
            if (nn == "") {
                strError += "Экран с номером " + i + " не имеет названия<br>";
            } else {
                listNameScreen.push(nn.toUpperCase())
            }
        }
        for (let i = 0; i < ik; i++) {
            let scr = listScreen[i];
            let sk = scr.components.length;
            for (let s = 0; s < sk; s++) {
                let comp = scr.components[s];
                switch (comp.type) {
                    case "Menu":
                    case "MenuBottom":
                    case "TabLayout":
                        let men = comp.model.menuList.list;
                        let mk = men.length;
                        if (mk == 0) {
                            strError += "Экран " + scr.screenName + " компонент типа " + comp.type + " не имеет описания меню<br>";
                        } else {
                            for (let m = 0; m < mk; m++) {
                                let scrItem = men[m].screen;
                                if (scrItem == null || scrItem.length == 0) {
                                    strError += "Экран " + scr.screenName + " компонент типа " + comp.type + " пункт меню " + m + " не имеет ссылки на экран<br>";
                                } else {
                                    scrN = scrItem.toUpperCase();
                                    if (isScreenDeclare(scrN) == -1) {
                                        strError += "Экран " + scr.screenName + " компонент типа " + comp.type + " пункт меню " + m + " ссылается на неописанный экран " + scrN + "<br>";
                                    }
                                }
                            }
                        }
                        break;
                    case "Drawer":
                        scrN = comp.view.drawer_fragm.toUpperCase();
                        if (isScreenDeclare(scrN) == -1) {
                            strError += "Экран " + scr.screenName + " компонент типа " + comp.type + " ссылается на неописанный экран " + scrN + "<br>";
                        }
                        break;
                }
                if (comp.navigator != null && comp.navigator.length > 0) {
                    let nk = comp.navigator.length;
                    for (n = 0; n < nk; n++) {
                        let nav = comp.navigator[n];
                        switch (nav.handler) {
                            case "start":
                                scrN = nav.param.toUpperCase();
                                if (isScreenDeclare(scrN) == -1) {
                                    strError += "Экран " + scr.screenName + " компонент типа " + comp.type + " в навигаторе ссылается на неописанный экран " + scrN + "<br>";
                                }
                                break;
                        }
                    }
                }
            }
        }
    }
    ik = listValueAppParam.length;
    if (ik == 0) {
        strError += "baseUrl is not filled<br>";
        if (isMap()) {
            strError += "not filled geoApiKey for maps<br>";
        }
    } else {
        let noUrl = true;
        let noKey = true;
        for (let i = 0; i < ik; i++) {
            let item = listValueAppParam[i];
            let vv = item.value;
            switch (item.name) {
                case "baseUrl":
                    noUrl = false;
                    if (vv != null || vv.length > 0) {
                        if ( ! isUrlValid(vv)) {
                            strError += "baseUrl is error";
                        }
                    } else {
                        strError += "baseUrl is not filled";
                    }
                    break;
                case "geoApiKey":
                    noKey = false;
                    if (vv == null || vv == "") {
                        if (isMap()) {
                            strError += "not filled geoApiKeu for maps";
                        }
                    }
                    break;
            }
        }
        if (noUrl) {
            strError += "baseUrl is not filled<br>";
        }
        if (noKey) {
            if (isMap()) {
                strError += "not filled geoApiKey for maps<br>";
            }
        }
    }
    if (strError != "") {
        var wind = commonWindow(450, 350, 35, 270, "Error in project");
        wind.innerHTML = strError;
        return false;
    } else {
        return true;
    }
}

function isMap() {
    let isM = false;
    let jk = listScreen.length;
    for (j = 0; j < jk; j++) {
        let components = listScreen[j].components;
        let zk = components.length;
        for (let z = 0; z < zk; z++) {
            if (components[z].type == "Map") {
                isM = true;
                break;
            }
        }
        if (isM) {
            break;
        }
    }
    return isM;
}

function isScreenDeclare(name) {
    let res = -1;
    let ik = listNameScreen.length;
    for (let i = 0; i < ik; i++) {
        if (name == listNameScreen[i]) {
            res = listScreen[i].typeScreen;
            break;
        }
    }
    return res;
}

function cbGenerateProject(res) {
    var wind = commonWindow(250, 350, 35, 270, "Download project");
    wind.innerHTML = res;
}

function setAppParameters() {
    if (listAppParam == null) {
        doServer("GET", "project/getparam", cbAppParameters);
    } else {
        windAppParameters();
    }
}

function cbAppParameters(res) {
    listAppParam = JSON.parse(res);
    let ik = listValueAppParam.length;
    let jk = listAppParam.length;
    let j = 0;
    if (ik > 0) {
        for (let i = 0; i < ik; i++) {
            let itemV = listValueAppParam[i];
            for (; j < jk; j++) {
                let itemB = listAppParam[j];
                if (itemV.id > itemB.id) {
                    continue;
                } else {
                    if (itemV.id == itemB.id) {
                        itemB.value = itemV.value;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }
    windAppParameters();
}

function windAppParameters() {
    windMenu = commonWindow(550, 400, 35, 270, "Set application parameters");
    let tit = '<div style="float:left;clear: both;width: 100%;white-space: pre;background-color:#ddd">        Parameter name                              Default value          Value</div>';
    windMenu.innerHTML = tit;
    windMenu.style.overflow = "hidden";
    let container = containerList();
    windMenu.append(container);
    let ik = listAppParam.length;
    for (i = 0; i < ik; i++) {
        let item = listAppParam[i];
        container.append(newAppParam(item, i));
    }
    windMenu.append(createContr());
}

function createContr() {
    let container = document.createElement('div')
    let str = '<div style="position:absolute;left:3px;right:0px;bottom:0px;height:25px;overflow-y:scroll">'
        +'<div onclick="saveAppParameters()" class="button_1">Save</div></div';
    container.innerHTML = str;
    return container.firstChild;
}

function saveAppParameters() {
    listValueAppParam = formAppParam();
    closeCommonWindow();
}

function containerList() {
    let container = document.createElement('div')
    let str = '<div style="position:absolute;left:3px;right:0px;bottom:27px;top:25px;overflow-y:auto;"></div';
    container.innerHTML = str;
    return container.firstChild;
}

function newAppParam(item, i) {
    var container = document.createElement('div')
    let def = '&nbsp;';
    if (item.value_def.length > 0) {
        def = item.value_def;
    }
    let str = '<div class="app_param_item">'
            +'<div style="float:left;width:230px;">' + item.name + '</div>' 
            +'<div style="float:left;width:120px;margin-left:5px;">' + def + '</div>'
            +'<input style="float:left;margin-left:5px;" type="text" onkeyup="return changeValueParam(event,' + i + ')" onkeyup="return clickUpValueParam(event,' + i + ')" size="20" value=' + item.value + '>'
            +'</div>';
    container.innerHTML = str;
    return container.firstChild;
}

function clickUpValueParam(e, i) {
    let a = e.currentTarget;
    listAppParam[i].value = a.value;
}

function changeValueParam(e, i) {
    let a = e.currentTarget;
    listAppParam[i].value = a.value;
}

function editUI() {
    var st = formJsonProject();
    doServer("POST", "project/save", cbSaveAndEditUI, st);
}

function cbSaveAndEditUI(res) {
    isColorChange = false;
    isStringsChange = false;
    isDrawableChange = false;
    isDimensChange = false;
    localStorage.setItem('resultUI', "");
    window.open("editorUI.html?projectId=" + currentProject.projectId + "&screenId=" + currentScreen.screenId);
}

function exportRes() {
    doServer("GET", 'export/android?projectId=' + currentProject.projectId, cbExport);
}

cbExport = function(res) {
    var wind = commonWindow(250, 350, 35, 270, "Export project");
    wind.innerHTML = res;
};

function saveAll() {
    var par = {};
    par.projectId = currentProject.projectId;
    if (isColorChange) {
        par.colors = JSON.stringify(listColor);
    }
    if (isDrawableChange) {
        par.drawable = JSON.stringify(listDrawable);
    }
    par.screen = JSON.stringify(currentScreen, function(key, value) {
            if (key == "viewElement") {
                return undefined;
            }
            return value;
        });
    localStorage.setItem('resultUI', JSON.stringify(par));
}