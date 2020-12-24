function uiImageView() {
    
    let uiParamView = 
        '<div style="float:left;margin-top:12px">'
            +'<div onclick="setImgViewSRC(event)" style="float:left;cursor:pointer;">'
                +'<div style="font-size:10px;color:#2228">Image</div>'
                +'<img class="imageV" style="border:2px solid #bdf;border-radius:4px;background:#fff" width="24" height="24">'
            +'</div>'
            +'<div style="float:left;margin-left:10px">'
                +'<div style="font-size:10px;color:#2228">Name</div>'
                +'<div class="imgName" style="border:2px solid #bdf;border-radius:4px;margin-top:4px;padding:2px 5px 2px 5px;"></div>'
            +'</div>'
            +'<div style="float:left;margin-left:10px">'
                +'<div style="font-size:10px;color:#2228">ScaleType</div>'
                +'<select class="scale_type select_';
    let uiParamView_2 = '" onchange="changeScaleType(this)"><option>centerCrop</option><option>center</option></select>'
            +'</div>'
            +'<div style="float:left;clear:both;margin-top:12px;">'
                +'<div style="font-size:10px;color:#2228">Show image in APP</div>'
                +'<img id="check_form_img" onclick="checkFormResourseImg(this);" style="cursor:pointer;margin-top:5px;margin-left:14px" width="16" height="16" src="img/check-act.png">'
            +'</div>'
        +'</div>';

    this.setElementUI = function(p, newEl, parent) {
        newEl.appendChild(createDivImg());
    }
    
    this.newElementUI = function(p) {
        p.src = "";
        p.scaleType = 0;
        return createDivImg();
    }
    
    this.setContent = function(p) {
        contenttAttributes.innerHTML = uiParamView + browser + uiParamView_2;
        setImgAttr(p);
        if (p.formResourse != null) {
            check_form_img.checked = p.formResourse;
        }
    }
}

function setImgViewSRC(e) {
    selectListImage(e, cbImgViewSRC);
}

function cbImgViewSRC(i) {
    let nn = listImage[i];
    currentElement.android.src = nn;
    setImgAttr(currentElement.android);
    viewCompon();
}

function setImgAttr(p) {
    let ssrc = p.src;
    let img = contenttAttributes.getElementsByClassName("imageV");
    if (img != null) {
        img = img[0];
        img.src = p.src;
    }
    let imgName = contenttAttributes.getElementsByClassName("imgName")[0];
    if (ssrc != undefined) {
        let ii = ssrc.lastIndexOf("/");
        let nam = ssrc.substring(ii + 1);
        imgName.innerHTML = nam.substring(0, nam.indexOf('.'));
    }
}

function checkFormResourseImg(el) {
    let check = el.src.indexOf("check-sel") == -1;
    currentElement.android.formResourse = check;
    if (check) {
        el.src = "img/check-sel_1.png";
    } else {
        el.src = "img/check-act.png";
    }
}
