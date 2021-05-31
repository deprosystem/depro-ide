function formElement(item, toRightOf, namePrev, topM, leftM) {
    let txtView;
    let p = {};
    switch (item.type) {    // Text,Img,Int,Float,Time
        case "Date":
        case "Text":
            txtView = formTxt(item);
            p = txtView.android;
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
            if (item.format != null && item.format.length > 0) {
                p.componParam = {type:3, formatNum:item.format};
            }
            break;
        case "Float":
            txtView = formTxt(item);
            p = txtView.android;
            if (item.format != null && item.format.length > 0) {
                p.componParam = {type:3, formatNum:item.format};
            }
            break;
        case "Time":
            txtView = formTxt(item);
            p = txtView.android;
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
            p.componParam.bindEl = "ind_" + item.name;
            let curr = currentElement;
            let ind = formIndicator(item);
            currentElement.android.viewElement = currentElement;
            ind.android.topMarg = 210;
            if (namePrev != "") {
                ind.android.below = namePrev;
            }
            currentElement = curr;
            break;
    }
    currentElement.android.viewElement = currentElement;
    if (namePrev != "") {
        p.below = namePrev;
    }
    if (topM != null && topM != 0) {
        p.topMarg = topM;
    }
    if (leftM != null) {
        p.leftMarg = leftM;
    } else {
        p.leftMarg = 12;
    }
    if (toRightOf != "") {
        p.toRightOf = toRightOf;
    }
}

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

function formImgFirst(ww, imgHeight, data) {
    let item;
    let imgId = -1;
    let ik = data.length;
    for (let i = 0; i < ik; i++) {
        item = data[i];
        if (item.type == "Img") {
            imgId = i;
            break;
        }
    }
    if (imgId > -1) {
        let imgView = formImg(item);
        p = imgView.android;
        p.viewId = item.name;
        p.viewElement = imgView;
        p.width = ww;
        namePrev = item.name;
        p.height = imgHeight;
        p.src = "img/picture.png";
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

function formIndicator(item) {
    currentElement = createNewEl();
    p = {typeUxUi: "ui"};
    p.type = "Indicator";
    p.typeFull = {name: 'Indicator', typeBlock: 0};
    p.width = WRAP;
    p.height = WRAP;
    p.gravLayout = {h:CENTER,v:4};
    currentElement.android = p;
    let typeEl = createDivImg();
    p.viewId = "ind_" + item.name;
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
    p.width = MATCH;
    p.height = WRAP;
    p.typeFull = {name: 'TextView', typeBlock: 0};
    p.gravLayout = {h:4,v:4};
    p.gravity = {h:4,v:4};
    currentElement.android = p;
    typeEl = createDivText();
    p.text = item.name;
    p.viewId = item.name;
    p.textSize = 14;
    p.letterSpac = '0.0';
    p.textColor = 12;
    p.rightMarg = 12;
    p.componParam = {typeValidTV:"no"};
    currentElement.appendChild(typeEl);
    addNewElement(ACTIVE, currentElement);
    addNavigatorEl(currentElement);
    ACTIVE.android.children.push(currentElement.android);
    return currentElement;
}