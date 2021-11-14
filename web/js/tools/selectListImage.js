var listImage;
function selectListImage(e, func, param) {
    let el = e.target;
    let par = {"el":el,"func":func,"param":param};
//console.log("CCC="+par.el.className+"<< NNNN="+par.param+"<<");
    if (listImage == null) {
        doServer("GET", 'images/list', cbGetListImg, null, par);
    } else {
        selectImage(par)
    }
}

function cbGetListImg(res, par) {
    if (res == "") return;
    listImage = JSON.parse(res);
    selectImage(par)
}

function selectImage(par) {
    let windMenu = formWind(250, 450, 40, 350, "Select image");
    let viewport = document.createElement('div');
    viewport.className = "viewport";
    let content = document.createElement('div');
    content.className = "content";
    viewport.appendChild(content);
    windMenu.appendChild(viewport);
    var str = '';
    for (let i = 0; i < listImage.length; i++) {
        let path = listImage[i];
        let ii = path.lastIndexOf("/");
        let nam = path.substring(ii + 1);
        nam = nam.substring(0, nam.indexOf('.'));
        let item = createItemListImg(path, nam);
        item.addEventListener("click", function(event){setSelectImage(event, i, par)}, true);
        content.appendChild(item);
    }
    let scrollVert = new scrollX(viewport, "scroll");
    scrollVert.init();
}

function createItemListImg(path, nam) {
    var container = document.createElement('div');
    container.innerHTML = '<div style="clear: both;height:50px;cursor: pointer;position:relative">' 
                +'<img width="40" height="40" style="position:absolute;margin-left:5px;margin-top:5px" src="img/chess_2.png">'
                +'<img width="40" height="40" style="position:absolute;margin-left:5px;margin-top:5px" src="' + path + '">'
                +'<div style="position:absolute;margin-left:50px;margin-top:12px;font-size:16px">' + nam + '</div></div>';
    return container.firstChild;
}

function setSelectImage(e, i, par) {
    let el = e.target;
    closeWindow(el);
    if (par.func.callBackEditF == null) {
        par.func(i, par.param);
    } else {
        par.func.callBackEditF(i, par);
    }
}

function selectListImageEl(el, cb) {
    let par = {"el":el,"func":cb};
    if (listImage == null) {
        doServer("GET", 'images/list', cbGetListImgEl, null, par);
    } else {
        selectImageEl(par)
    }
}

function cbGetListImgEl(res, par) {
    if (res == "") return;
    listImage = JSON.parse(res);
    selectImageEl(par);
}

function selectImageEl(par) {
    let windMenu = formWind(250, 450, 40, 350, "Select image");
    let viewport = document.createElement('div');
    viewport.className = "viewport";
    let content = document.createElement('div');
    content.className = "content";
    viewport.appendChild(content);
    windMenu.appendChild(viewport);
    var str = '';
    for (let i = 0; i < listImage.length; i++) {
        let path = listImage[i];
        let ii = path.lastIndexOf("/");
        let nam = path.substring(ii + 1);
        nam = nam.substring(0, nam.indexOf('.'))
        let item = createItemListImg(path, nam);
        item.addEventListener("click", function(event){setSelectImageEl(event, i, par, path)}, true);
        content.appendChild(item);
    }
    let scrollVert = new scrollX(viewport, "scroll");
    scrollVert.init();
}

function setSelectImageEl(e, i, par, path) {
    let el = e.target;
    closeWindow(el);
    par.func(i, path);
    par.el.src = path;
}
