function EditForm(meta, data, domEl, after, cbEdit) {
    if (meta == null || domEl == null || data == null) {
        return null;
    };
    
    this.edData = data;
    this.edMeta = meta;
    this.edDomEl = domEl;
    this.cb = cbEdit;
    this.windDataStyle;
    let fonSel = "#deeaff";
    
    this.makeEditForm = function() {
        this.edDomEl.innerHTML = "";
        let ik = this.edMeta.length;
        for (let i = 0; i < ik; i++) {
            let ff = this.oneField(i);
            if (ff != null) {
                this.edDomEl.append(ff);
            }
        }
    }
    
    this.oneField = function(i) {
        let met = this.edMeta[i];
        let br = "";
        if (met.br) {
            br = "clear:both;"
        }
        let res = newDOMelement('<div style="float:left;margin-left:7px;margin-top:5px;' + br + '"></div>');
        res.append(newDOMelement('<div style="color: #2228;font-size: 10px;margin-left:4px">' + met.title + '</div>'));
        let inp;
        let vv = this.edData[met.name];
        if (vv == null) {
            vv = "";
        }
        switch (met.type) {
            case "Text":
                inp = newDOMelement('<input class="input_style" style="width:' + met.len + 'px;" value="' + vv + '"/>');
                inp.nameField = met.name;
                inp.addEventListener('keydown', () => {this.clickText(event, met.valid)}, false);
                inp.addEventListener('keyup', () => {this.clickTextUp(event)}, false);
                res.append(inp);
                break;
            case "After":
                if (after) {
                    return null;
                } else {
                    res = newDOMelement('<div style="float:left;margin-left:7px;clear:both;margin-top:15px;width:60px;height:30px;background-color:#1DACE9;' 
                            +'border-radius:4px;cursor:pointer;"><div style="text-align: center;margin-top:7px;color:#fff">After</div></div>');
                    res.addEventListener('click', () => {this.clickAfter(event, met)}, false);
                }
                break;
            case "Label":
                let fs = "";
                if (met.fontS != null) {
                    fs = "font-size=" + met.fontS + "px;";
                }
                res = newDOMelement('<div style="float:left;margin-left:3px;clear:both;color:#000;' + fs + '">' + met.title + '</div>');
                break;
            case "Line":
                res = newDOMelement('<div style="float: left;clear:both;height:1px;border-bottom:1px solid #1DACEf;width:100%;margin-top:3px;margin-bottom:3px"></div>');
                break;
            case "SelectId":
                inp = formSelectIdHandlTags(vv, met.tags);
                inp.style.cssText = "width:100px;font-size:12px;color:#110000;";
                inp.className = 'select_' + browser;
                inp.nameField = met.name;
                inp.addEventListener("change", () => {this.changeSelId(inp, met)}, false);
                res.append(inp);
                break;
            case "SelectIdUX":
                inp = formSelectIdHandlUx(vv);
                inp.style.cssText = "width:100px;font-size:12px;color:#110000;";
                inp.className = 'select_' + browser;
                inp.nameField = met.name;
                inp.addEventListener("change", () => {this.changeSelId(inp, met)}, false);
                res.append(inp);
                break;
            case "Select":
                inp = formSelectForEditData(met.value, vv);
                inp.style.cssText = "width:100px;font-size:12px;color:#110000;";
                inp.className = 'select_' + browser;
                inp.nameField = met.name;
                inp.addEventListener("change", () => {this.changeSelId(inp, met)}, false);
                res.append(inp);
                break;
            case "Color":
                if (vv == "") {
                    vv = "0";
                }
                inp = this.formEditColor(met.name, vv);
                inp.nameField = met.name;
                inp.viewEl = true;
                inp.cb = this;
                inp.addEventListener("click", () => {setPikEditFormColor(inp)}, false);
                res.append(inp);
                break;
            case "Choose":
                switch (met.what) {
                    case "switch":
                        inp = newDOMelement('<div style="width:60px;height:28px;background-color:#1DACE9;float:left;' 
                                +'border-radius:4px;cursor:pointer;"><div style="text-align: center;margin-top:5px;color:#fff">Choose</div></div>');
                        inp.addEventListener('click', () => {this.clickChooseSwitch(inp, met)}, false);
                        inp.nameField = met.name;
                        res.append(inp);
                        break;
                }
                break;
            case "Check":
                if (vv == "") {
                    vv = false;
                }
                let valCh = "check-act";
                if (vv) {
                    valCh = "check-sel_1";
                }
                inp = newDOMelement('<img style="cursor:pointer;margin-top:5px;margin-left:14px" width="16" height="16" src="img/' + valCh + '.png">');
                inp.nameField = met.name;
                inp.addEventListener("click", () => {this.clickCheckbox(this.checkEditCheckbox(inp), inp)}, false);
                res.append(inp);
                break;
            case "Textarea":
                inp = newDOMelement('<textarea style="width:100%;border:1px solid #C5DCFA;box-sizing: border-box;border-radius: 8px;" rows="' 
                        + met.rows + '">' + vv + '</textarea>');
                inp.nameField = met.name;
                inp.addEventListener('keyup', () => {this.clickTextAreaUp(inp)}, false);
                res.style.marginLeft = "";
                res.style.width = "100%";
                res.append(inp);
                break;
            case "SelBlock":
                inp = this.selectBlock(met, "setEditFormSelectBlock");
                setValueSelectBlock(inp, String(vv));
                inp.nameField = met.name;
                inp.cb = this;
//                inp.addEventListener("click", () => {this.clickLitera(inp, met)}, false);
                res.append(inp);
                break;
            case "Litera":
                if (vv == "") {
                    vv = 0;
                }
                let bg = "";
                if (vv == 1) {
                    bg = "background-color:" + fonSel +";";
                }
                let it = "";
                if (met.italic) {
                    it = 'font-style:italic;';
                }
                inp = newDOMelement('<div class="font_sel" style="font-weight:bold;' + bg + it + '">' + met.litera + '</div>');
                inp.nameField = met.name;
                inp.addEventListener("click", () => {this.clickLitera(inp)}, false);
                res.append(inp);
                break;
        }
        return res;
    }
    
    this.selectBlock = function(met, cb) {
        let divSelList = document.createElement('div');
        divSelList.style.float = "left";
        divSelList.className = "divSelList";
        divSelList.innerHTML = newSelListHoriz(met.value, cb);
        let numb = createNumber(50, 24, met.min, met.max, "changeSelectBlockNumb(this);" + cb, met.step);
        numb.style.float = "left";
        numb.className = "numb";
        numb.style.marginLeft = "8px";
        divSelList.appendChild(numb);
        divSelList.appendChild(newDOMelement('<img width="10" height="10" onclick="clearSelectValue(this);' 
                + cb + '(this);" style="margin-left: 7px;margin-top:7px;cursor: pointer;" src="img/del_red.png">'));
        return divSelList;
    }
    
    this.changeSelId = function(el, met) {
        this.edData[el.nameField] = el.options[el.selectedIndex].value;
        if (this.cb != null) {
            this.cb.cbEdit(el.nameField);
        }
    }
    
    this.clickLitera = function (el) {
        if (el.style.backgroundColor != '') {
            this.edData[el.nameField] = 0;
            el.style.backgroundColor = "";
        } else {
            this.edData[el.nameField] = 1;
            el.style.backgroundColor = fonSel;
        }
//console.log("clickLitera this.edData[el.nameField]="+this.edData[el.nameField]);
        if (this.cb != null) {
            this.cb.cbEdit(el.nameField);
        }
    }
    
    this.clickTextUp = function(event) {
        let el = event.target;
        this.edData[el.nameField] = el.value;
        if (this.cb != null) {
            this.cb.cbEdit(el.nameField);
        }
    }
    
    this.clickTextAreaUp = function(el) {
        this.edData[el.nameField] = el.value;
        if (this.cb != null) {
            this.cb.cbEdit(el.nameField);
        }
    }
    
    this.clickText = function(event, valid) {
        let k = event.key;
        if (k == "ArrowRight" || k == "ArrowLeft" || k == "Tab" 
            || k == "Home" || k == "End" || k == "Backspace" || k == "Delete") {
            return true;
        }
        let targ;
        let kUp;
        let firstCh;
        if (valid != null) {
            if (valid.latin != null && valid.latin) {
                kUp = event.key.toUpperCase();
                if ( ! ((kUp >= "A" && kUp <= "Z") || kUp == "_" || (kUp >= "0" && kUp <= "9")))  {
                    event.preventDefault();
                    tooltipMessage(event.target, "Только английские буквы, _ и цифры");
                }
            } else {
                if (valid.name_low != null && valid.name_low) {
                    targ = event.target;
                    if ( ! ((k >= "a" && k <= "z") || k == "_" || (k >= "0" && k <= "9")))  {
                        event.preventDefault();
                        tooltipMessage(targ, "Только английские буквы, _ и цифры");
                    } else {
                        if (targ.value.length == 0 && k >= "0" && k <= "9") {
                            event.preventDefault();
                            tooltipMessage(targ, "The first character cannot be a digit");
                        }
                    }
                } else {
                    if (valid.list_var != null && valid.list_var) {
                        targ = event.target;
                        kUp = event.key.toUpperCase();
                        if ( ! ((kUp >= "A" && kUp <= "Z") || kUp == "_" || kUp == "," || (kUp >= "0" && kUp <= "9")))  {
                            event.preventDefault();
                            tooltipMessage(targ, "Только английские буквы, _ и цифры");
                        } else {
                            if (targ.value.length == 0 ) {
                                if ((k >= "0" && k <= "9") || k == ',') {
                                    event.preventDefault();
                                    tooltipMessage(targ, "The first character cannot be a digit");
                                }
                            } else {
                                if ( targ.selectionStart == 0 && ((k >= "0" && k <= "9") || k == ',')) {
                                    event.preventDefault();
                                    tooltipMessage(targ, "The first character cannot be a digit");
                                }
                            }
                        }
                    }
                }
            }
        } 
//        let el = event.target;
//        edData[el.nameField] = el.value;
    }
    
    this.formEditColor = function(name, vv) {
        let colorHTML3 = '<div style="cursor: pointer; width: 30px; height: 30px; float: left;border: 1px solid #bbd4ef;border-radius:5px;background-color:';
        let colorHTML4 = '"></div>';
        let el = newDOMelement(colorHTML3 + findColorByIndex(vv) + colorHTML4);
        return el;
    }
    
    this.setColor = function(el, id, color) {
        this.edData[el.nameField] = id;
        el.style.backgroundColor = color;
        if (this.cb != null) {
            this.cb.cbEdit(el.nameField);
        }
    }
    
    this.setSelectBlock = function(el, vv) {
        this.edData[el.nameField] = vv;
        if (this.cb != null) {
            this.cb.cbEdit(el.nameField);
        }
    }
    
    this.clickAfter = function(event, met) {
        let nnn = new FormNavigator();
        if (this.edData.after == null || ! this.edData.after) {
            this.edData.after = [];
        }
        nnn.init(this.edData.after, true);
    }
    
    this.clickChooseSwitch = function(el, met) {
        let wind = formWind(250, 500, 40, -400, "Switch styles");
        let windParent = wind.closest(".dataWindow")
        let h_footer = 30;
        let controll = createFooter(h_footer);
        wind.style.bottom = (h_footer + 1) + "px";
        windParent.appendChild(controll);
        let addControl = newDOMelement('<IMG SRC="img/add_blue.png" style="margin-left:20px;float:left;width:20px;margin-top:5px;cursor:pointer">');
        addControl.addEventListener("click", () => {this.addItemStyle()}, false);
        controll.appendChild(addControl);
        
        let edit = newDOMelement('<IMG SRC="img/edit.png" style="margin-left:15px;float:left;width:20px;margin-top:5px;cursor:pointer">');
        edit.addEventListener("click", () => {this.editItemStyle(met)}, false);
        controll.appendChild(edit);
        
        let choose = newDOMelement('<IMG SRC="img/choose.png" style="margin-left:15px;float:left;width:20px;margin-top:5px;cursor:pointer">');
        choose.addEventListener("click", () => {this.chooseItemStyle(el, windParent)}, false);
        controll.appendChild(choose);
        
        let scrollQu = formViewScrolY(wind);
        let windData = scrollQu.getElementsByClassName("viewData")[0];
        windData.style.marginLeft = "5px";
        this.windDataStyle = windData;
        let ik = ListStyleSpec.length;
        for (let i = 0; i < ik; i++) {
            let item = ListStyleSpec[i];
            let itemV = this.oneStyleSwitch(item, i);
            if (activeStyleSpecPos == i) {
                itemV.style.backgroundColor = "#f6faff";
            }
            windData.append(itemV);
        }
        let scr = windData.closest('.viewport');
        scr.scroll_y.resize();
    }
    
    this.oneStyleSwitch = function(item, pos) {
//        let pc = item.param;
        let res = newDOMelement('<div style="width:100%;height:40px;border-bottom:1px solid #1dace9;display:flex;align-items:center;"></div>');
        res.positStyle = pos;
        res.addEventListener("click", () => {this.clickItemStyle(res)}, false);
        this.viewOneContent(res, item);
        return res;
    }
    
    this.viewOneContent = function(res, item) {
        let pc = item.param;
        let bold = "";
        if (pc.int_1 == 1) {
            bold = "font-weight:bold;";
        }
        let it = "";
        if (pc.int_2 == 1) {
            it = "font-style:italic;";
        }
        let fs = "font-size:" + (14 * MEASURE) + "px;";
        if (pc.int_3 != null && pc.int_3 != "") {
            fs = "font-size:" + (pc.int_3 * MEASURE) + "px;";
        }
        let txt = newDOMelement('<div class="text" style="' + bold + it + fs + 'color:' + findColorByIndex(pc.color_1) + '">' + "Switch_" + item.id + '</div>');
        res.append(txt);
        let hTr = pc.int_4 * MEASURE;
        let hThumb = pc.int_5 * MEASURE;
        let marg = 0;
        let margHoriz = 0;
        if (hThumb < hTr) {
            marg = (hTr - hThumb) / 2;
            margHoriz = marg;
        } else {
            marg = (hThumb - hTr) / 2;
        }
        let wTrack = 65 * MEASURE;
        let right = wTrack - hThumb - margHoriz;
//        let grav = "center";
        let trackTopBoot = "", thumbTopBoot = "";
        let grav = pc.st_2;
        let top_bott = "";
        if (grav == "top") {
            grav = "start";
            top_bott = "margin-top:" + marg + "px;";
        } else if (grav == "bottom") {
            grav = "end";
            top_bott = "margin-bottom:" + marg + "px;";
        }
        if (hThumb < hTr) {
            thumbTopBoot = top_bott;
        } else {
            trackTopBoot = top_bott;
        }
        let scOff = newDOMelement('<div style="position:relative;height:100%;margin-left:50px;"></div>');
        res.append(scOff);
        let showTr = findColorByIndex(pc.color_2);
        let showThumb = findColorByIndex(pc.color_5);
        let contTrack = newDOMelement('<div style="position: absolute;right:0;top:0;width:' + wTrack + 'px;bottom:0;display:flex;align-items:' + grav + '"></div>');
        scOff.appendChild(contTrack);
        let track = newDOMelement('<div style="width:' + wTrack + 'px;height:' + hTr + 'px;background-color:' + showTr
                +';border-radius:' + (hTr / 2) + 'px;' + trackTopBoot + '"></div>');
        let contThumb = newDOMelement('<div style="position: absolute;right:' + right + 'px;top:0;width:' + hThumb 
                + 'px;bottom:0;display:flex;align-items:' + grav + '"></div>');
        scOff.appendChild(contThumb);
        let thumb = newDOMelement('<div style="float:left;width:' + hThumb + 'px;height:' + hThumb + 'px;background-color:' + showThumb 
                +';border-radius:' + (hThumb / 2) + 'px;' + thumbTopBoot + '"></div>');
        contThumb.appendChild(thumb);
        contTrack.appendChild(track);
        
        let scOn = newDOMelement('<div style="position:relative;height:100%;margin-left:50px;"></div>');
        res.append(scOn);
        showTr = findColorByIndex(pc.color_3);
        showThumb = findColorByIndex(pc.color_6);
        right = margHoriz;
        contTrack = newDOMelement('<div style="position: absolute;right:0;top:0;width:' + wTrack + 'px;bottom:0;display:flex;align-items:' + grav + '"></div>');
        scOn.appendChild(contTrack);
        track = newDOMelement('<div style="width:' + wTrack + 'px;height:' + hTr + 'px;background-color:' + showTr
                +';border-radius:' + (hTr / 2) + 'px;' + trackTopBoot + '"></div>');
        contThumb = newDOMelement('<div style="position: absolute;right:' + right + 'px;top:0;width:' + hThumb 
                + 'px;bottom:0;display:flex;align-items:' + grav + '"></div>');
        scOn.appendChild(contThumb);
        thumb = newDOMelement('<div style="float:left;width:' + hThumb + 'px;height:' + hThumb + 'px;background-color:' + showThumb 
                +';border-radius:' + (hThumb / 2) + 'px;' + thumbTopBoot + '"></div>');
        contThumb.appendChild(thumb);
        contTrack.appendChild(track);
        
        let scEnabled = newDOMelement('<div style="position:relative;height:100%;margin-left:50px;"></div>');
        res.append(scEnabled);
        showTr = findColorByIndex(pc.color_4);
        showThumb = findColorByIndex(pc.color_7);
        right = wTrack - hThumb - margHoriz;
        contTrack = newDOMelement('<div style="position: absolute;right:0;top:0;width:' + wTrack + 'px;bottom:0;display:flex;align-items:' + grav + '"></div>');
        scEnabled.appendChild(contTrack);
        track = newDOMelement('<div style="width:' + wTrack + 'px;height:' + hTr + 'px;background-color:' + showTr
                +';border-radius:' + (hTr / 2) + 'px;' + trackTopBoot + '"></div>');
        contThumb = newDOMelement('<div style="position: absolute;right:' + right + 'px;top:0;width:' + hThumb 
                + 'px;bottom:0;display:flex;align-items:' + grav + '"></div>');
        scEnabled.appendChild(contThumb);
        thumb = newDOMelement('<div style="float:left;width:' + hThumb + 'px;height:' + hThumb + 'px;background-color:' + showThumb 
                +';border-radius:' + (hThumb / 2) + 'px;' + thumbTopBoot + '"></div>');
        contThumb.appendChild(thumb);
        contTrack.appendChild(track);
    }
    
    this.addItemStyle = function() {
        let item = JSON.parse(JSON.stringify(ListStyleSpec[activeStyleSpecPos]));
        item.id = ListStyleSpec.length;
        ListStyleSpec.push(item);
        let ch = this.windDataStyle.children;
        ch[activeStyleSpecPos].style.backgroundColor = "";
        activeStyleSpecPos = ListStyleSpec.length - 1;
        let itemV = this.oneStyleSwitch(item, activeStyleSpecPos);
        itemV.style.backgroundColor = "#f6faff";
        this.windDataStyle.append(itemV);
        let scr = this.windDataStyle.closest('.viewport');
        scr.scroll_y.resize();
    }
    
    this.editItemStyle = function(met) {
        let wind = formWind(370, 500, 100, -20, "Switch style options", null, null, null, null, "");
        let dd = new EditForm(met.meta, ListStyleSpec[activeStyleSpecPos].param, wind, null, this);
        dd.makeEditForm();
    }
    
    this.chooseItemStyle = function(el, ww) {
        closeDataWindow(ww);
        let item = ListStyleSpec[activeStyleSpecPos]
        this.edData[el.nameField] = item.id;
        if (this.cb != null) {
            this.cb.cbEdit(el.nameField);
        }
    }
    
    this.cbEdit = function() {
        let item = ListStyleSpec[activeStyleSpecPos];
        let ch = this.windDataStyle.children;
        let res = ch[activeStyleSpecPos];
        res.innerHTML = "";
        this.viewOneContent(res, item);
    }
    
    this.clickItemStyle = function(el) {
        let ch = this.windDataStyle.children;
        ch[activeStyleSpecPos].style.backgroundColor = "";
        activeStyleSpecPos = el.positStyle;
        ch[activeStyleSpecPos].style.backgroundColor = "#f6faff";
    }

    this.clickCheckbox = function(check, el) {
        this.edData[el.nameField] = check;
        if (this.cb != null) {
            this.cb.cbEdit(el.nameField);
        }
    }

    this.checkEditCheckbox = function(el) {
        let check = el.src.indexOf("check-sel") == -1;
        if (check) {
            el.src = "img/check-sel_1.png";
        } else {
            el.src = "img/check-act.png";
        }    
        return check;
    }
}

function setPikEditFormColor(el) {
    openPickerColor(el.style.backgroundColor, setEditFormColor, el);
}

function setEditFormColor(id, color) {
    windSelectColor.style.display = 'none';
    clientElement.cb.setColor(clientElement, id, color);
}

function setEditFormSelectBlock(el) {
    let elD = el.closest(".divSelList");
    if (el.tagName == "INPUT") {
        value = parseInt(el.value);
    } else {
        if (el.tagName == "DIV") {
            value = parseInt(el.innerHTML);
        } else {
            value = 0;
        }
    }
    elD.cb.setSelectBlock(elD, value);
}
