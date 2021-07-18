function formNavigator() {
'use strict';
    this.wind;
    this.contentD;
    this.controll;
    this.paramView;
    this.viewPort;
    this.dataView;
    
//    this.dataHand;
    
    this.hControl = 40;
    this.wContent = 340;
    this.wWind = 600;
    this.wNum = 24;
    this.wElem = 150;
    this.wType = 135;
    this.hLine = 20;
    
    const fn = formNavigator.prototype;
    
    fn.init = function(dat) {
        if (dat == null) return;
        let dataView;
        this.dataHand = dat;
        this.contentD = formWind(this.wWind, 300, 40, 550, "Navigator");
        this.contentD.style.bottom = (this.hControl - 1) + "px";
        this.contentD.style.width = this.wContent + "px";
        this.wind = this.contentD.closest(".dataWindow");
        this.paramView = newDOMelement('<div style="position:absolute;top:' + 49 + 'px;right:0;bottom:' + (this.hControl - 1) + 'px;left:' + (this.wContent + 1) + 'px;border-left:1px solid #1dace9"></div>');
        this.controll = createFooter(this.hControl);
        
        let buttonAdd = createButtonBlue("Add");
        buttonAdd.style.marginTop = "5px";
//        buttonAdd.addEventListener("click", function(){fn.addHand(fn.dataHand);}, true);
        

        this.controll.appendChild(buttonAdd);
        let buttonOk = createButtonWeite('Ok', 50);
        buttonOk.style.marginTop = "5px";
        buttonOk.addEventListener("click", function(event){closeWindow(contentD);}, true);
        
            buttonOk.addEventListener('click', () => {
                fn.addHand(fn.dataHand);
            });
        
        
        this.controll.appendChild(buttonOk);
        
        
        this.wind.appendChild(this.paramView);
        this.wind.appendChild(this.controll);
        this.viewPort = formViewScrolY(this.contentD);
        dataView = this.viewPort.querySelector(".viewData");
        dataView.appendChild(this.titleHandView());
        buttonAdd.addEventListener('click', () => {
            fn.addHand(dat, dataView);
        });
        let ik = dat.length;
        if (ik > 0) {
            for (let i = 0; i < ik; i++) {
                dataView.appendChild(fn.oneHandView(i, this.dataHand[i]));
            }
        } else {
            dataView.appendChild(fn.oneHandView(0, null));
        }
    };
    
    fn.addHand = function(dat, dataView) {
        let item = {viewId:0,handler:"start"};
        dat.push(item);
        dataView.appendChild(fn.oneHandView(dat.length - 1, item));
    }

    fn.oneHandView = function(i, item) {
        let vv = '<div style="height:' + this.hLine + 'px;width:100%;border-bottom:1px solid #1dace9">' 
                +'<div style="width:' + this.wNum + 'px;height:100%;text-align:right;border-right:1px solid #1dace9;float:left">' 
                    + '<div style="margin-top:2px;margin-right:2px">' + i + '</div>' 
                + '</div>'
                +'<div class="elId" style="width:' + this.wElem + 'px;height:100%;border-right:1px solid #1dace9;float:left"></div>'
                +'<div class="elType" style="width:' + this.wType + 'px;height:100%;border-right:1px solid #1dace9;float:left"></div>'
                +'<img style="margin-top:5px;margin-left:5px;float:left;cursor:pointer" src="img/del_red.png"/>'
            + '</div';
        let hh = newDOMelement(vv);
        let elId = hh.querySelector(".elId");
        elId.appendChild(this.setSelectIdHandl({name:"viewId",len:this.wElem}, item));
        let elType = hh.querySelector(".elType");
        elType.appendChild(this.setSelect({name:"handler",len:this.wType,select:handlers}, item));
        return hh;
    }
    
    fn.titleHandView = function() {
        let vv = '<div style="height:' + this.hLine + 'px;width:100%;border-bottom:1px solid #1dace9">' 
                +'<div style="width:' + this.wNum + 'px;height:100%;text-align:right;border-right:1px solid #1dace9;float:left"></div>'
                +'<div style="width:' + this.wElem + 'px;height:100%;text-align:center;border-right:1px solid #1dace9;float:left">' 
                    + '<div style="margin-top:2px;">Element</div>'
                + '</div>'
                +'<div style="width:' + this.wType + 'px;height:100%;text-align:center;border-right:1px solid #1dace9;float:left">'
                    + '<div style="margin-top:2px;">Handler</div>'
                + '</div>'
            + '</div';
        let hh = newDOMelement(vv);
        return hh;
    }
    
    fn.setSelectIdHandl = function (met, item, addItem) {
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
    
    fn.setSelect = function (met, item) {
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


