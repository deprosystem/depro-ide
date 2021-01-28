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
/*
function viewCompon() {
    viewComponElem(currentElement);
}
*/
function formDivider() {
    currentElement = createNewEl();
    p = {typeUxUi: "ui"};
    p.type = 'RelativeLayout';
    p.typeFull = {name: 'RelativeLayout', typeBlock: 2};
    p.gravLayout = {h:4,v:BOTTOM};
    p.gravity = {h:4,v:4};
    p.width = -1;
    p.height = 1;
    p.background = 6;
    p.children = [];
    currentElement.android = p;
    addNewElement(ACTIVE, currentElement);
    addNavigatorEl(currentElement);
    ACTIVE.android.children.push(currentElement.android);
    return currentElement;
}

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