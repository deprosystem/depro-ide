function uiImageView() {
    
    let uiParamView = 
        '<div style="float:left;margin-top:12px">'
            +'<div onclick="setImgViewSRC(event)" style="float:left;cursor:pointer;">'
                +'<div style="font-size:10px;color:#2228">Image</div>'
                +'<img class="imageV" style="border:2px solid #bdf;border-radius:4px;background:#fff" width="24" height="24">'
            +'</div>'
            +'<div style="float:left;margin-left:10px">'
                +'<div style="font-size:10px;color:#2228">Name</div>'
                +'<div class="imgName" style="width:120px;overflow:hidden;border:2px solid #bdf;border-radius:4px;height:20px;background:white;padding:2px 5px 2px 5px;"></div>'
            +'</div>'
            +'<div style="float:left;margin-left:10px">'
                +'<div style="font-size:10px;color:#2228">ScaleType</div>'
                +'<select class="scale_type select_';
    let uiParamView_2 = '" onchange="changeScaleType(this)"><option>centerCrop</option><option>center</option></select>'
            +'</div>'
            +'<div style="float:left;clear:both;margin-top:12px;">'
                +'<div style="font-size:10px;color:#2228">Show image in APP</div>'
                +'<img class="check_form_res" onclick="checkFormResourseImg(this);" style="cursor:pointer;margin-top:5px;margin-left:14px" width="16" height="16" src="img/check-act.png">'
            +'</div>'
        +'</div>';

    let radius1 = '<div style="width: 100%;padding-bottom: 5px;float: left;clear: both;padding-bottom:12px;margin-top: 12px;border-bottom: 1px solid #1DACEf;">\n\
            <div style="width: 100%;float: left;">\n\
                <div class="text_style_ui" style="float: left;">Corners</div>\n\
                <div onclick="cornersAllClearIMG(this)" style="float: right;color: #1DACE9;font-size: 10px;cursor: pointer">Clear</div></div>';
    let radius2 = '<div id="listCorners" style="margin-left:8px;float:left; margin-top:5px">\n\
                <div onclick="setCornersIMG(this)" class="el_marg_pad" >2</div> \n\
                <div onclick="setCornersIMG(this)" class="el_marg_pad">4</div> \n\
                <div onclick="setCornersIMG(this)" class="el_marg_pad">8</div> \n\
                <div onclick="setCornersIMG(this)" class="el_marg_pad">12</div> \n\
                <div onclick="setCornersIMG(this)" class="el_marg_pad">16</div> \n\
                <div onclick="setCornersIMG(this)" class="el_marg_pad">20</div> \n\
                <div onclick="setCornersIMG(this)" class="el_marg_pad">24</div>\n\
                </div>';
    let rectInp = '<div style="width:158px;height:80px;position:relative;margin-top:10px;float: left;clear:both">\n\
        <div style="border:2px solid #1DACEf;position:absolute;left:20px;top:12px;right:20px;bottom:12px;"></div></div>';

    this.setElementUI = function(p, newEl, parent) {
        let im = newEl.getElementsByClassName("image");
        if (p.componParam == null) {
            p.componParam = {borderColor:0,w_bord:0,oval:false};
        }
        if (im == null || im.length == 0) {
            newEl.appendChild(createDivImg());
        }
    }
    
    this.newElementUI = function(p) {
        p.src = "";
        p.scaleType = 0;
        if (p.componParam == null) {
            p.componParam = {borderColor:0,w_bord:0,oval:false};
        }
        return createDivImg();
    }
    
    this.setContent = function(p) {
        contentAttributes.innerHTML = uiParamView + browser + uiParamView_2;

        setImgAttr(p);
        if (p.formResourse != null) {
            let cfr = contentAttributes.getElementsByClassName("check_form_res")[0];
            if (p.formResourse) {
                cfr.src = "img/check-sel_1.png";
            } else {
                cfr.src = "img/check-act.png";
            }
        }
        
        let rr = newDOMelement(radius1);
        contentAttributes.appendChild(rr);
        let nn = createNumber(40, 24, 0, 100, "changeCornersRadius");
        nn.style.float = "left";
        nn.style.clear = "both";
        nn.style.marginTop = "5px";
        setNumberInputId(nn, "radiusCorners");
        rr.appendChild(nn);
        rr.appendChild(newDOMelement(radius2));
        let ri = newDOMelement(rectInp);
        rr.appendChild(ri);
        let nnLT = createNumber(40, 24, 0, 100, "changeRadiusIMG");
        nnLT.style.position = "absolute";
        setNumberInputId(nnLT, "radiusLT");
        ri.appendChild(nnLT);
        let nnRT = createNumber(40, 24, 0, 100, "changeRadiusIMG");
        nnRT.style.position = "absolute";
        nnRT.style.right = "0";
        setNumberInputId(nnRT, "radiusTR");
        ri.appendChild(nnRT);

        let nnLB = createNumber(40, 24, 0, 100, "changeRadiusIMG");
        nnLB.style.position = "absolute";
        nnLB.style.bottom = "0";
        setNumberInputId(nnLB, "radiusBL");
        ri.appendChild(nnLB);
        let nnRB = createNumber(40, 24, 0, 100, "changeRadiusIMG");
        nnRB.style.position = "absolute";
        nnRB.style.right = "0";
        nnRB.style.bottom = "0";
        setNumberInputId(nnRB, "radiusRB");
        ri.appendChild(nnRB);
        if (p.corners != null) {
            radiusLT.value = p.corners.lt;
            radiusTR.value = p.corners.tr;
            radiusRB.value = p.corners.rb;
            radiusBL.value = p.corners.bl;
        }

        if (p.componParam.oval == null) {
            p.componParam.oval = false;
        }
        let oval = editCheckbox("Oval", p.componParam.oval, "changeOvalIMG");
        oval.style.marginTop = "5px";
        oval.style.clear = "both";

        contentAttributes.appendChild(oval);

        let w_bord = editNumberParam("With border", 50, 24, 0, 10, "wBordIMG");
        w_bord.style.marginLeft = "10px";
        w_bord.style.marginTop = "5px";
        if (p.componParam.w_bord == null) {
            p.componParam.w_bord = 0;
        }
        setValueNumber(w_bord, p.componParam.w_bord);
        contentAttributes.appendChild(w_bord);
        
        if (p.componParam.borderColor == null) {
            p.componParam.borderColor = 0;
        }
        let cBord = editColorParam("Border color", findColorByIndex(p.componParam.borderColor), 'col_bord', setColorBordIMG);
        cBord.style.marginLeft = "10px";
        contentAttributes.appendChild(cBord);

    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#bookmark=id.rx9nr2tpyie0";
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
    let img = contentAttributes.getElementsByClassName("imageV");
    if (img != null) {
        img = img[0];
        img.src = p.src;
    }
    let imgName = contentAttributes.getElementsByClassName("imgName")[0];
    if (ssrc != undefined) {
        let ii = ssrc.lastIndexOf("/");
        let nam = ssrc.substring(ii + 1);
        imgName.innerHTML = nam.substring(0, nam.indexOf('.'));
    }
}

function checkFormResourseImg(el) {
    currentElement.android.formResourse = checkElement(el);
}

function setCornersIMG(el) {
    cornersClear(el);
    el.style.backgroundColor = fonSel;
    let vv = el.innerHTML;
    let value;
    if (vv == "") {
        value = 0;
    } else {
        value = parseInt(vv);
    }
    radiusCorners.value = value;
    radiusLT.value = value;
    radiusTR.value = value;
    radiusRB.value = value;
    radiusBL.value = value;
    currentElement.android.corners = {"lt" : value, "tr" : value, "rb" : value, "bl" : value};
    viewCompon();
}

function changeCornersRadius(el) {
    cornersClear(null);
    var value = el.value;
    radiusLT.value = value;
    radiusTR.value = value;
    radiusRB.value = value;
    radiusBL.value = value;
    currentElement.android.corners = {"lt" : value, "tr" : value, "rb" : value, "bl" : value};
    viewCompon();
}

function changeRadiusIMG(el) {
    switch (el.id) {
        case "radiusLT":
            currentElement.android.corners.lt = el.value;
            break;
        case "radiusTR":
            currentElement.android.corners.tr = el.value;
            break;
        case "radiusRB":
            currentElement.android.corners.rb = el.value;
            break;
        case "radiusBL":
            currentElement.android.corners.bl = el.value;
            break;
    }
    viewCompon();
}

function cornersAllClearIMG(el) {
    cornersClear(null);
    let value = "";
    radiusCorners.value = value;
    radiusLT.value = value;
    radiusTR.value = value;
    radiusRB.value = value;
    radiusBL.value = value;
    currentElement.android.corners = {"lt" : 0, "tr" : 0, "rb" : 0, "bl" : 0};
    viewCompon();
}

function changeOvalIMG(vv) {
    currentElement.android.componParam.oval = vv;
    viewCompon();
}

function wBordIMG(el) {
    currentElement.android.componParam.w_bord = el.value;
    viewCompon();
}

function setColorBordIMG(id, color) {
    paramCompon.componParam.borderColor = id;
    let el_txt = contentAttributes.getElementsByClassName("col_bord")[0];
    el_txt.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
    viewCompon();
}
