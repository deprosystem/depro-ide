function uiSwitch() {
    
    let metaSwitch = [
        {name: "", title:"Text",len:150,type:"Label"},
        {name: "color_1", title:"Color",type:"Color"},
        {name: "int_1", title:"Bold",litera:"B",type:"Litera"},
        {name: "int_2", title:"Italic",litera:"I",italic:true,type:"Litera"},
        {name: "int_3", title:"Size",type:"SelBlock",min:6,max:52,step:1,value:"8,10,12,14,18,20,22,24,28,32"},
        {type:"Line"},
        {title:"Track options",len:150,type:"Label"},
        {title:"Colors",len:150,type:"Label",fontS:10},
        {name: "color_2", title:"Off",type:"Color",br:true},
        {name: "color_3", title:"On",type:"Color"},
        {name: "color_4", title:"Unavailable",type:"Color"},
        {name: "int_4", title:"Height",type:"SelBlock",min:1,max:40,step:1,value:"8,10,12,14,18,20,22,24,28,30,36"},
        {name: "st_2", title:"Gravity",type:"Select",value:"top,center,bottom",br:true},
        {type:"Line"},
        {title:"Thumb options",len:150,type:"Label"},
        {title:"Colors",len:150,type:"Label",fontS:10},
        {name: "color_5", title:"Off",type:"Color",br:true},
        {name: "color_6", title:"On",type:"Color"},
        {name: "color_7", title:"Unavailable",type:"Color"},
        {name: "int_5", title:"Diameter",type:"SelBlock",min:1,max:40,step:1,value:"8,10,12,14,18,20,22,24,28,30,36"}
    ]
    
    let meta = [
        {name: "st_1", title:"Value",rows:2,type:"Textarea",br:true},
        {name: "int_1", title:"Style switch",type:"Choose",what:"switch",meta:metaSwitch,br:true},
        {name: "st_3", title:"Show",type:"Select",value:"On,Off,Unavailable"}
    ];
    
    let wTrack = 65 * MEASURE;
    
    this.data;
            
    this.setElementUI = function(p, newEl, parent) {
        newEl.appendChild(this.createDivSwitch(p));
    }
    
    this.newElementUI = function(p) {
        return this.createDivSwitch(p);
    }
    
    this.setContent = function(p) {
        if (this.data == null) {
            this.data = p;
        }
        let dd = new EditForm(meta, p, contentAttributes, null, this);
        dd.makeEditForm();
    }
    
    this.cbEdit = function(fieldName) {
        if (fieldName == "int_1") {
            let vv = this.data[fieldName];
            this.data.componParam.int_1 = vv;
            viewCompon();
        } else {
            viewCompon();
        }
    }
    
    this.viewElementUI = function(p, el) {
        el.innerHTML = "";
        elSw = this.createDivSwitch(p);
        el.appendChild(elSw);
        if (p.height == WRAP) {
//            let pc = p.componParam;
            let pc = this.getParamSwitch(p.componParam.int_1);
            if (pc == null) return;
            let hh = pc.int_4;
            if (hh < pc.int_5) {
                hh = pc.int_5;
            }
            if (hh < pc.int_3) {
                hh = pc.int_3;
            }
            el.style.height = (hh * MEASURE) + "px";
            let txt = elSw.querySelector(".text");
            let hT = txt.getBoundingClientRect().height;
            if (hh < hT) {
                hh = hT;
                el.style.height = hh + "px";
            }
        }
    }
    
    this.createDivSwitch = function(p) {
        if (p.componParam == null) {
            p.componParam = {type:21,int_1:ListStyleSpec[activeStyleSpecPos].id};
        }
        let pc = this.getParamSwitch(p.componParam.int_1);
        if (pc == null) return;
        if (p.st_3 == null || p.st_3 == "") {
            p.st_3 = "Off";
        }
        let switchCont = newDOMelement('<div class="_switch" style="position: absolute;left:0;top:0;right:0;bottom:0"></div>');
        let containerTxt = newDOMelement('<div style="position: absolute;left:0;top:0;right:' + wTrack + 'px;bottom:0;"></div>');
        switchCont.appendChild(containerTxt);
        let vv = "";
        if (p.st_1 != null) {
            vv = p.st_1;
        }
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
        let txt = newDOMelement('<div class="text" style="' + bold + it + fs + 'color:' + findColorByIndex(pc.color_1) + '">' + vv + '</div>');
        containerTxt.appendChild(txt);
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
        let right = wTrack - hThumb - margHoriz;
        let grav = pc.st_2;
        let top_bott = "";
        if (grav == "top") {
            grav = "start";
            top_bott = "margin-top:" + marg + "px;";
        } else if (grav == "bottom") {
            grav = "end";
            top_bott = "margin-bottom:" + marg + "px;";
        }
        let trackTopBoot = "", thumbTopBoot = "";
        if (hThumb < hTr) {
            thumbTopBoot = top_bott;
        } else {
            trackTopBoot = top_bott;
        }
        let showTr = findColorByIndex(pc.color_2);
        let showThumb = findColorByIndex(pc.color_5);
        if (p.st_3 == "On") {
            showTr = findColorByIndex(pc.color_3);
            showThumb = findColorByIndex(pc.color_6);
            right = margHoriz;
        } else if (p.st_3 == "Unavailable") {
            showTr = findColorByIndex(pc.color_4);
            showThumb = findColorByIndex(pc.color_7);
        }
        let contTrack = newDOMelement('<div style="position: absolute;right:0;top:0;width:' + wTrack + 'px;bottom:0;display:flex;align-items:' + grav + '"></div>');
        switchCont.appendChild(contTrack);
        let track = newDOMelement('<div style="width:' + wTrack + 'px;height:' + hTr + 'px;background-color:' + showTr
                +';border-radius:' + (hTr / 2) + 'px;' + trackTopBoot + '"></div>');
        let contThumb = newDOMelement('<div style="position: absolute;right:' + right + 'px;top:0;width:' + hThumb 
                + 'px;bottom:0;display:flex;align-items:' + grav + '"></div>');
        switchCont.appendChild(contThumb);
        let thumb = newDOMelement('<div style="float:left;width:' + hThumb + 'px;height:' + hThumb + 'px;background-color:' + showThumb 
                +';border-radius:' + (hThumb / 2) + 'px;' + thumbTopBoot + '"></div>');
        contThumb.appendChild(thumb);
        contTrack.appendChild(track);
        return switchCont;
    }
    
    this.getParamSwitch = function(id) {
        let ik = ListStyleSpec.length;
        for (let i = 0; i < ik; i++) {
            let item = ListStyleSpec[i];
            if (item.id == id) {
                return item.param;
            }
        }
        return null;
    }
}


