function uiTextView() {
    
    let uiParamView = 
        '<div id="uiParamTextView" style="float:left;margin-top:12px;width:100%;">'
            +'<div class="text_style_ui" style="float: left;">Value</div>'
            +'<textarea id="text_text_value" style="margin-top: 5px; float:left;clear:both;width:100%;border:1px solid #C5DCFA;box-sizing: border-box;border-radius: 8px;"\n\
                onKeyUp="inputTextValue(event, this)" rows="3" cols="27"></textarea>'
            +'<div style="float:left;clear:both;margin-top:12px;">'
                +'<div style="font-size:10px;color:#2228">Show text in APP</div>'
                +'<img class="check_form_res" onclick="checkFormResourseText(this);" style="cursor:pointer;margin-top:5px;margin-left:14px" width="16" height="16" src="img/check-act.png">'
            +'</div>'
            +'<div style="margin-top: 5px;float: left;clear:both">'
                +'<div class="text_style_ui">Color</div>'
                +'<div id="text_color" class="text_sel" onclick="setPickerTextColor(this)" style="cursor: pointer;width: 30px; height: 30px; float: left; border: 1px solid #bbd4ef;border-radius:5px;"></div>'
            +'</div>'
            +'<div style="margin-top: 5px;float: left;margin-left:10px;">'
                +'<div class="text_style_ui">Bold</div>'
                +'<div class="font_sel" onclick="textWeight(this)" style="font-weight:bold;">B</div>'
            +'</div>'
            +'<div style="margin-top: 5px;float: left;margin-left:10px;">'
                +'<div class="text_style_ui">Italic</div>'
                +'<div class="font_sel" onclick="textStyle(this)" style="font-style:italic;font-family:serif;font-weight:bolder;margin-top:2px">I</div>'
            +'</div>'
        +'</div>';


    this.setElementUI = function(p, newEl, parent) {
        if (p.componParam == null) {
            p.componParam = {typeValidTV:"no"};
        }
        newEl.appendChild(createDivText());
    }
    
    this.newElementUI = function(p) {
        p.text = "";
        p.textSize = 14;
        p.letterSpac = '0.0';
        p.componParam = {typeValidTV:"no"};
        return createDivText();
    }
    
    this.setContent = function(p) {
        contentAttributes.innerHTML = uiParamView;
        let txtAr = contentAttributes.getElementsByTagName("textarea")[0];
        if (p.text != null) {
            txtAr.value = p.text;
        }
        if (p.formResourse != null) {
            let cfr = contentAttributes.getElementsByClassName("check_form_res")[0];
            if (p.formResourse) {
                cfr.src = "img/check-sel_1.png";
            } else {
                cfr.src = "img/check-act.png";
            }
        }
        let sizeBl = selectBlock("Size", "8,10,12,14,16,18,20,24,28,32,40", "setSizeTV", 6, 56);
        setValueSelectBlock(sizeBl, p.textSize);
        uiParamTextView.appendChild(sizeBl);
        let spacBl = selectBlock("letterSpacing", "-0.05,-0.02,0.0,0.02,0.05,0.07,0.1", "setLetterTV", -0.05, 0.5, 0.01);
        setValueSelectBlock(spacBl, p.letterSpac);
        uiParamTextView.appendChild(spacBl);
        let lineSpacBl = selectBlock("lineSpacing", "0,1,2,3,4,6,8,10", "setLineSpacTV", 0, 14);
        setValueSelectBlock(lineSpacBl, p.lineSpac);
        uiParamTextView.appendChild(lineSpacBl);
        
        let typeValid = dropDownList("Validation type", "no,filled,email", 65, "changeValidTypeTV", p.componParam.typeValidTV);
        typeValid.style.clear = "both";
        typeValid.style.marginLeft = "";
        uiParamTextView.appendChild(typeValid);

        let errorV = document.createElement('div');
        errorV.className = "errorV";
        errorV.style.cssText = "float:left;height:40px;";

        if (p.componParam.typeValidTV != "no") {
            errorV.style.display = "block";
        } else {
            errorV.style.display = "none";
        }
        let sss = selectListID("error ID", 80, currentChildren, p.componParam.errorId, changeErrorIdTV, "TextView");
        errorV.appendChild(sss);

        errorV.appendChild(editTextParam("Error message text ", 140, p.componParam.errorTxt, "changeErrotTxtTV"));
        uiParamTextView.appendChild(errorV);

        setTextViewAttr(p);
    }
    
    this.viewElementUI = function(p, el) {
        let divText = el.getElementsByClassName('text')[0];
        if (divText == null) {
            divText = createDivText();
            el.appendChild(divText);
        }
        if (p.textSize != null) {
            divText.style.fontSize = (p.textSize * MEASURE) + px;
        }
        if (p.textColor == null) {
            divText.style.color = "#808080";
        } else {
            divText.style.color = findColorByIndex(p.textColor);
        }
        if (p.letterSpac != null || p.letterSpac != "0.0") {
            divText.style.letterSpacing = p.letterSpac + "em";
        } else {
            divText.style.letterSpacing = "";
        }
        if (p.lineSpac != null || p.lineSpac != "0.0") {
            divText.style.lineHeight = (p.lineSpac * MEASURE) + "px";
        } else {
            divText.style.lineHeight = "";
        }
        if (p.text != null) {
            divText.innerHTML = p.text;
        }
        if (p.textStyle != null && p.textStyle == 1) {
            divText.style.fontStyle = "italic";
        } else {
            divText.style.fontStyle = "";
        }
        if (p.fontWeight != null && p.fontWeight == 1) {
            divText.style.fontWeight = "bold";
        } else {
            divText.style.fontWeight = "";
        }
    }
}

function setTextViewAttr(p) {
    if (p.textColor == null || p.textColor == "") {
        text_color.style.backgroundColor = "#808080";
    } else {
        text_color.style.backgroundColor = findColorByIndex(p.textColor);
    }
}

function inputTextValue(e, el) {
    var elText = currentElement.getElementsByClassName('text')[0];
    elText.innerHTML = el.value;
    currentElement.android.text = el.value;
    viewCompon();
}

function setSizeTV(vv) {
    let res = vv;
    if (vv.tagName == "INPUT") {
        res = vv.value;
    }
    currentElement.android.textSize = res;
    viewCompon();
}

function setLineSpacTV(vv) {
    let res = vv;
    if (vv.tagName == "INPUT") {
        res = vv.value;
    }
    currentElement.android.lineSpac = res;
    viewCompon();
}

function setLetterTV(vv) {
    let res = vv;
    if (vv.tagName == "INPUT") {
        res = vv.value;
    }
    currentElement.android.letterSpac = res;
    viewCompon();
}

function setPickerTextColor() {
    openPickerColor(text_color.style.backgroundColor, setTextColor);
}

function setTextColor (id, color) {
    paramCompon.textColor = id;
    text_color.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
    viewCompon();
}

function checkFormResourseText(el) {
    currentElement.android.formResourse = checkElement(el);
}

function textStyle(el) {
    let p = currentElement.android;
    if (el.style.backgroundColor != "") {
        p.textStyle = 0;
        el.style.backgroundColor = "";
    } else {
        p.textStyle = 1;
        el.style.backgroundColor = fonSel;
    }
    viewCompon();
}

function textWeight(el) {
    let p = currentElement.android;
    if (el.style.backgroundColor != '') {
        p.fontWeight = 0;
        el.style.backgroundColor = "";
    } else {
        p.fontWeight = 1;
        el.style.backgroundColor = fonSel;
    }
    viewCompon();
}

function changeValidTypeTV(el) {
    currentElement.android.componParam.typeValidTV = el.options[el.selectedIndex].value;
    let ee = contentAttributes.getElementsByClassName("errorV")[0];
    if (currentElement.android.componParam.typeValidTV == "no") {
        ee.style.display = "none";
    } else {
        ee.style.display = "block";
    }
}

function changeErrorIdTV(el) {
    currentElement.android.componParam.errorId = el.options[el.selectedIndex].value;
    
}

function changeErrotTxtTV(el) {
    currentElement.android.componParam.errorTxt = el.value;
}

