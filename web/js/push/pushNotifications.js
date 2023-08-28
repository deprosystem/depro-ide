function PushNotifications() {
    let metaPush = [
        {name:"config",title:"Choose a Firebase config file",type:"FileToStr",len:170},
        {name:"isJson",len:20,type:"ImgLabel",src:"img/check_green.png"},
        {name:"icon",title:"Icon",type:"Img",len:30},
        {name:"color",title:"Color",type:"Color",len:40},
        {name: "add", title:"Add channel",type:"Click",img:"img/add_blue.png",float:"right",margR:7,tLocation:"right",color:"#1DACE9",wh:12},
    ];
    let meta = [
        {name:"name",title:"Id",len:70,type:"Text",valid:"latin"},
        {name:"txt",title:"Name visible to user",len:130,type:"Text"},
        {name:"importance",title:"Importance",len:80,type:"Select",value:"NONE,MIN,LOW,DEFAULT,HIGH"},
        {name:"screen",title:"Start screen",type:"Text",len:100,valid:"latin"},
//        {name:"icon",title:"Img",type:"Img",len:25,widthImg:16},
//        {name:"large",title:"Large",type:"Img",len:28},
//        {name:"color",title:"Color",type:"Color",len:40},
    ];
    let metaNotif = [
        {name:"name",title:"Name",len:70,type:"Text",valid:"latin"},
        {name:"txt",title:"Text",len:100,type:"Text"},
        {name:"icon",title:"Icon",type:"Img",len:30},
        {name:"large",title:"Large",type:"Img",len:35},
        {name:"color",title:"Color",type:"Color",len:40},
    ];
    let hCont = 50;
    this.pushData;
    this.rowChannel = -1;
    this.rowotices = -1;
    
    this.init = function() {
        if (this.pushData == null) {
            if (currentProject != null) {
                if (currentProject.push != null && currentProject.push.length > 0) {
                    this.pushData = JSON.parse(currentProject.push);
                } else {
                    this.pushData = {config:"",notif:[]};
                }
            } else {
                this.pushData = {config:"",notif:[]};
            }
        }
    }
    
    this.edit = function() {
        this.wind = formWind(738, 365, 70, 150, "Push notifications", null, null, null, null, "");
        
        setHelp(this.wind, "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#bookmark=id.qki8f7sfwnoq");
        let chanalView = newDOMelement('<div style="width: 420px;position: absolute;left: 0;top: 0;bottom: 40px;border-right: 1px solid #1dace9"></div>');
        this.wind.append(chanalView);
        let notices = newDOMelement('<div style="left: 422px;position: absolute;right: 0;top: 0;bottom: 40px;"></div>');
        let contNotices = newDOMelement('<div style="top:0;left:2px;height:' + hCont + 'px;position:absolute;right:0;border-bottom:1px solid #1dace9"></div');
        let addNotices = newDOMelement('<div style="margin-right:10px;margin-top:11px;float:right;color:#1dace9;cursor:pointer">Add notice</div>');
        addNotices.addEventListener("click", () => {this.addRowNotice();}, true);
        contNotices.append(addNotices);
        let addNoticesImg = newDOMelement('<img width="12" height="12" style="margin-right:10px;margin-top:12px;float:right;cursor:pointer" src="img/add_blue.png">');
        addNoticesImg.addEventListener("click", () => {this.addRowNotice();}, true);
        contNotices.append(addNoticesImg);
        notices.append(contNotices);
        this.noticesView = newDOMelement('<div style="left: 2px;position: absolute;right: 0;top:' + hCont + 'px;bottom:0;"></div>');
        notices.append(this.noticesView);
        this.wind.append(notices);
        let contInp = newDOMelement('<div style="top:0;left:0;height:' + hCont + 'px;position:absolute;right:0;border-bottom:1px solid #1dace9"></div');
        chanalView.append(contInp);
        this.edPush = new EditForm(metaPush, this.pushData, contInp, null, this, true, null, null, 7);
        if (this.pushData.config.length > 0) {
            this.edPush.setVisibility("isJson", true);
        } else {
            this.edPush.setVisibility("isJson", false);
        }
        
        this.windEdit = newDOMelement('<div style="position: absolute;left: 3px;right:0;top:' + hCont + 'px;bottom: 40px;overflow: auto"></div>');
        chanalView.append(this.windEdit);
        this.listEdit = new ListEdit(meta, this.pushData.notif, this.windEdit, this, "channel");
        let control = newDOMelement('<div style="position: absolute;left: 0;right: 0;height:40px;bottom:0;border-top:1px solid #1dace9""></div>');
        this.wind.append(control);
        let bootonOk = createButtonBlue(" Ok ");
        bootonOk.style.marginTop = "5px";
        bootonOk.style.float = "right";
        bootonOk.style.marginRight = "10px";
        bootonOk.addEventListener("click", () => {closeDataWindow(this.wind);});
        control.append(bootonOk);
    }
    
    this.processPushFiles = function(files) {
        let file = files[0];
        let reader = new FileReader();
        reader.onload = (e) => {
            this.pushData.config = e.target.result;
            this.isJson.style.display = "block";
        };
        reader.readAsText(file);
    }
    
    this.addRowNotice = function() {
        this.listEditNotices.addRow();
    }
    
    this.cbListEdit = function(name, ind, tag) {

    }
    
    this.cbEdit = function(name) {
        console.log("edit NAME="+name+"<<");
        switch (name) {
            case "config":
                this.edPush.setVisibility("isJson", true);
                break;
            case "add":
                this.listEdit.addRow();
                break;
        }
    }
    
    this.cbChangeRow = function(i, tag) {
        if (tag == "channel") {
            this.noticesView.innerHTML = "";
            if (i > -1) {
                let dataNotif = this.pushData.notif[i]["notices"];
                if (dataNotif == null) {
                    dataNotif = [];
                    this.pushData.notif[i]["notices"] = dataNotif;
                }
                this.listEditNotices = new ListEdit(metaNotif, dataNotif, this.noticesView, this, "notices");
            }
        }
    }
    
    this.getJson = function() {
        if (this.pushData != null) {
            return JSON.stringify(this.pushData);
        } else {
            return "";
        }
    }
    
    this.init();
}