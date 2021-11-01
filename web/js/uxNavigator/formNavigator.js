function FormNavigator() {
'use strict';

    this.contentD;
    this.controll;
    this.paramView;
    this.viewPort;
    this.dataHand;
    this.wind;
    this.hControl = 40;
    this.wContent = 340;
    this.wWind = 600;
    let wNum = 24;
    let wElem = 150;
    let wType = 135;
    let hLine = 20;
    this.panelFon;
    this.after;
    this.dataView;
    
    this.init = function(dat, aft) {
        if (dat == null) return;
        this.after = aft;
        this.dataHand = dat;
        this.selectRow = -1;
        this.panelFon = newDOMelement('<div style="width:100%;height:100%;background-color:#aaaa;position:absolute;"></div>');
        document.body.append(this.panelFon);
        let ll, tt;
        if (this.after) {
            ll = 600;
            tt = 50;
        } else {
            ll = 550;
            tt = 40;
        }
        this.contentD = formWind(this.wWind, 300, tt, ll, "Navigator");
        this.contentD.style.bottom = (this.hControl - 1) + "px";
        this.contentD.style.width = this.wContent + "px";
        this.wind = this.contentD.closest(".dataWindow");
        this.paramView = newDOMelement('<div style="position:absolute;top:' + 49 + 'px;right:0;bottom:' + (this.hControl - 1) + 'px;left:' + (this.wContent + 1) + 'px;border-left:1px solid #1dace9"></div>');
        this.controll = createFooter(this.hControl);
        
        let buttonAdd = createButtonBlue("Add");
        buttonAdd.style.marginTop = "5px";
        this.controll.appendChild(buttonAdd);
        let buttonOk = createButtonWeite('Ok', 50);
        buttonOk.style.marginTop = "5px";
        this.controll.appendChild(buttonOk);
        buttonOk.addEventListener('click', () => {
            this.closeWindows();
        });        
        let clos = this.wind.querySelector(".titleWindClose");
        clos.addEventListener('click', () => {
            this.removPanel();
        });
        this.wind.appendChild(this.paramView);
        this.wind.appendChild(this.controll);
        this.viewPort = formViewScrolY(this.contentD);
        this.dataView = this.viewPort.querySelector(".viewData");
        this.dataView.appendChild(this.titleHandView());
        buttonAdd.addEventListener('click', () => {
            this.addHand(dat, this.dataView);
        });
        this.panelFon.addEventListener('click', () => {
            this.stopProp();
        });
        let ik = dat.length;
        if (ik > 0) {
            for (let i = 0; i < ik; i++) {
                this.dataView.appendChild(this.oneHandView(i, this.dataHand[i]));
            }
            this.selHand(0, this.dataView);
        } 
        this.viewPort.scroll_y.resize();
    };
    
    this.closeWindows = function() {
        if ( ! this.after) {
            saveNavigator(this.dataHand);
        }
        this.wind.remove(); 
        this.panelFon.remove();
    }
    
    this.stopProp = function() {
        event.stopPropagation();
    }
    
    this.removPanel = function() {
        if ( ! this.after) {
            saveNavigator(this.dataHand);
        }
        this.panelFon.remove();
    }
    
    this.addHand = function(dat, dataView) {
        let item = {viewId:0,handler:"start"};
        dat.push(item);
        dataView.appendChild(this.oneHandView(dat.length - 1, item));
        this.viewPort.scroll_y.resize();
        this.selHand(dat.length - 1, dataView);
    }

    this.oneHandView = function(i, item) {
        let vv = '<div style="height:' + hLine + 'px;width:100%;border-bottom:1px solid #1dace9">' 
                +'<div style="width:' + wNum + 'px;height:100%;text-align:right;border-right:1px solid #1dace9;float:left">' 
                    + '<div style="margin-top:2px;margin-right:2px">' + i + '</div>' 
                + '</div>'
                +'<div class="elId" style="width:' + wElem + 'px;height:100%;border-right:1px solid #1dace9;float:left"></div>'
                +'<div class="elType" style="width:' + wType + 'px;height:100%;border-right:1px solid #1dace9;float:left"></div>'
                +'<img class="delRec" style="margin-top:5px;margin-left:5px;float:left;cursor:pointer" src="img/del_red.png"/>'
            + '</div';
        let hh = newDOMelement(vv);
        let elId = hh.querySelector(".elId");
        let idHand = this.setSelectIdHandl({name:"viewId",len:wElem}, item);
        idHand.className = "sel_id";
        elId.appendChild(idHand);

        let elType = hh.querySelector(".elType");
        let typeHand = this.setSelect({name:"handler",len:wType,select:handlers}, item);
        typeHand.className = "sel_type";
        elType.appendChild(typeHand);
        hh.addEventListener('click', () => {
            this.selHand(i, hh);
        });
        let tagSelIdHand = hh.querySelector(".sel_id");
        tagSelIdHand.addEventListener('change', () => {
            this.changeIdHand(i, tagSelIdHand);
        }, false);
        let del = hh.querySelector(".delRec");
        del.addEventListener('click', () => {
            this.delRecord(i);
        }, false);
        let tagSelTypeHand = hh.querySelector(".sel_type");
        tagSelTypeHand.addEventListener('change', () => {
            this.changeTypeHand(i, tagSelTypeHand);
        }, false);
        return hh;
    }
    
    this.delRecord = function(i) {
        event.stopPropagation();
        this.dataHand.splice(i, 1);
        let ik = this.dataHand.length;
        this.dataView.innerHTML = "";
        this.dataView.appendChild(this.titleHandView());
        if (ik > 0) {
            for (let j = 0; j < ik; j++) {
                this.dataView.appendChild(this.oneHandView(j, this.dataHand[j]));
            }
        } else {
            this.paramView.innerHTML = "";
        }
        this.selectRow = -1;
        if (i < ik) {
            this.selHand(i);
        } else {
            if (ik > 0)  {
                this.selHand(ik - 1);
            }
        }
    }
    
    this.selHand = function(i) {
        if (this.selectRow == i + 1) return;
        this.selHandFull(i);
    }
    
    this.selHandFull = function(i) {
        let ch = this.dataView.children;
        let rowI;
        if (this.selectRow > -1) {
            rowI = ch[this.selectRow];
            rowI.style.backgroundColor = "";
        }
        this.selectRow = i + 1;
        rowI = ch[this.selectRow];
        rowI.style.backgroundColor = "#eef";
        let hand = this.dataHand[i].handler;
        let jk = listMetaHandlers.length;
        let selJ = -1;
        for (let j = 0; j < jk; j++) {
            if (listMetaHandlers[j].handl == hand) {
                selJ = j;
                break;
            }
        }
        if (selJ > -1) {
            this.dataHand[i].innerHTML = "";
            this.paramView.innerHTML = "";
            let dd = new EditForm(listMetaHandlers[selJ].meta, this.dataHand[i], this.paramView, this.after);
//            dd.makeEditForm(dd);
        } else {
            this.paramView.innerHTML = "";
        }
    }
    
    this.changeIdHand = function(i, el) {
        let val = el.options[el.selectedIndex].value;
        this.dataHand[i].viewId = val;
    }
    
    this.changeTypeHand = function(i, el) {
        let val = el.options[el.selectedIndex].value;
        this.dataHand[i].handler = val;
        this.selHandFull(i);
    }
    
    this.titleHandView = function() {
        let vv = '<div style="height:' + hLine + 'px;width:100%;border-bottom:1px solid #1dace9">' 
                +'<div style="width:' + wNum + 'px;height:100%;text-align:right;border-right:1px solid #1dace9;float:left"></div>'
                +'<div style="width:' + wElem + 'px;height:100%;text-align:center;border-right:1px solid #1dace9;float:left">' 
                    + '<div style="margin-top:2px;">Element</div>'
                + '</div>'
                +'<div style="width:' + wType + 'px;height:100%;text-align:center;border-right:1px solid #1dace9;float:left">'
                    + '<div style="margin-top:2px;">Handler</div>'
                + '</div>'
            + '</div';
        let hh = newDOMelement(vv);
        return hh;
    }
    
    this.setSelectIdHandl = function (met, item, addItem) {
        let vv;
        if (item != null) {
            let nameV = met.name;
            vv = item[nameV];
            if (vv == null) {
                vv = "";
            }
        }
        let selSel = formSelectViewIdHandl(vv, addItem);
        selSel.style.width = met.len + "px";
        selSel.style.border = "none";
        selSel.style.backgroundColor = "#0000";
        return selSel;
    }
    
    this.setSelect = function (met, item) {
        let vv;
        if (item != null) {
            let nameV = met.name;
            vv = item[nameV];
            if (vv == null) {
                vv = "";
            }
        }
        let selSel = formSelectForEditData(met.select, vv);
        selSel.style.width = met.len + "px";
        selSel.style.border = "none";
        selSel.style.backgroundColor = "#0000";
        return selSel;
    }
}


