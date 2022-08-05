function CRUD(dat, name, type_crud) {
    this.param;
    this.choose;
    this.fieldsTable;
    this.selectFields;
    this.tabbleObj;
    this.where;
    this.viewPortF;
    this.hostDomainQ;
    this.idTable;
    this.query;
    this.data;
    this.selectOperQuery;
    this.blockErrorTxt;
    
    this.type_crud = type_crud;
    
    let self = this;
    let isSend;
    let wFields = 320;
    let wTab = 200;
    let hRow = 24;
    let hWhere = 150;
    let hViewFT = 240;
    let meta_send = [
        {name: "err_1", title:"Text error",len:300,type:"Text"}
    ]
    let meta_EditProf = [
        {name: "err_1", title:"Text error",len:300,type:"Text"},
        {name: "err_2", title:"Not logged in",len:300,type:"Text"}
    ]
    
    this.init = function() {
        isSend = false;
        let titForm;
        this.data = dat;
        this.hostDomainQ = currentProject.host;
        hostDescr = currentProject.whereServer;
        if (this.hostDomainQ == null || this.hostDomainQ.length == 0  || hostDescr == "Third party API") {
            myAlert("Domain not set");
            return;
        }
        let wind = formWind(wFields + wTab + 1, 400, 40, 650, "Model parameters", false, null, "Save", this, "");
        wind.style.display = "flex";
        wind.style.flexDirection = "column";
        this.blockErrorTxt = newDOMelement('<div style="width:100%;height:48px;border-bottom:1px solid #1dace9"></div>');
        
        wind.append(this.blockErrorTxt);
        let par = this.data[name];
        if (par != null) {
            this.param = JSON.parse(par);
        }
        switch (this.type_crud) {
            case "Send":
                if (par == null) {
                    this.param = {method:"POST", url:"",oper:"INSERT",err_1:"There is already an entry with such keys"};
                }
                let foot = wind.parentElement.querySelector(".footer_wind");
                let buttonChooseT = createButtonBlue("Choose a table");
                buttonChooseT.addEventListener("click", () => {this.cooseTableCrud()}, false);
                foot.prepend(buttonChooseT);
                if (this.param.err_1 == null) {
                    this.param.err_1 = "There is already an entry with such keys";
                }
                isSend = true;
                break;
            case "SignUp":
                if (par == null) {
                    this.param = {method:"POST", url:"autch/" + currentProject.resurseInd + "/2",oper:"INSERT",err_1:"A user with this login already exists",
                    queryFilds:{fields:"login,password",valid:"login,password",indF:[1,2],indV:[1,2]}};
                }
                break;
            case "SignIn":
                if (par == null) {
                    this.param = {method:"POST", url:"autch/" + currentProject.resurseInd + "/1",oper:"INSERT",err_1:"Incorrect login or password",
                    queryFilds:{fields:"login,password",valid:"login,password",indF:[1,2],indV:[1,2]}};
                }
                break;
            case "EditProfile":
                if (par == null) {
                    this.param = {method:"POST", url:"autch/" + currentProject.resurseInd + "/3",oper:"INSERT",err_1:"A user with this login already exists",
                    err_2:"You need to log in",queryFilds:{fields:"login,password",valid:"login,password",indF:[1,2],indV:[1,2]}};
                }
                this.blockErrorTxt.style.height = "96px";
                break;
        }
        let viewFT = newDOMelement('<div style="position:relative;width:100%;flex-grow:1;"></div>');
        wind.append(viewFT);
        this.where = newDOMelement('<div style="width:100%;height:' + hWhere + 'px;display:none;border-top:1px solid #1dace9;"></div>');
        wind.append(this.where);
        let selF = newDOMelement('<div style="float:left;position:relative;height:100%;width:' + wFields + 'px;border-right:1px solid #1dace9;"></div>');
        let stSend = "";
        if (isSend) {
            stSend = '<div style="margin-top:3px;float:right;margin-right:35px;margin-left:30px;">Source</div>';
        }
        let titleF = newDOMelement('<div class="tab_title" style="height:' + hRow + 'px;border-bottom:1px solid #1dace9;position:absolute;left:0;top:0;right:0;background:#f3f8ff;">' 
                +'<div style="margin-top:3px;float:left;margin-left:5px;">Fields name</div>'
                +stSend
                +'<div style="margin-top:3px;float:right;margin-right:5px;">Validate</div>'
                +'</div>');
        selF.appendChild(titleF);
        let wraperScrollF = newDOMelement('<div style="position:absolute;left:0;top:' + hRow + 'px;right:0;bottom:0"></div');
        selF.appendChild(wraperScrollF);
        this.viewPortF = formViewScrolY(wraperScrollF, true);
        this.selectFields = this.viewPortF.querySelector(".viewData");
        this.fieldsTable = newDOMelement('<div style="float:left;height:100%;width:' + wTab + 'px;position:relative;"></div>');
        viewFT.append(selF);
        viewFT.append(this.fieldsTable);
        if (this.type_crud == "SignIn") {
            let shutScreen = newDOMelement('<div style="position:absolute;left:0;top:0;right:0;bottom:0"></div>');
            shutScreen.addEventListener('click', () => {event.stopPropagation();});
            viewFT.append(shutScreen);
        }

        hostDomain = currentProject.host;
        if (hostDomain != null && hostDomain.length > 0  && hostDescr != "Third party API") {
            if (listTables == null) {
                doServerAlien("GET", hostDomain + 'tables/list', self.init_0, null, null, this.fieldsTable);
            } else {
                self.init_1();
            }
        } else {
            myAlert("Inappropriate data source");
        }
    }
    
    self.init_0 = function(res) {
        listTables = JSON.parse(res);
        self.init_1();
    }
    
    self.init_1 = function() {
        self.tabbleObj = new TableObj(self.selectFields, self.fieldsTable, isSend);
        self.getQuery();
    }
    
    this.getQuery = function() {
        let qu = this.getIdQuery();
        if (qu > -1) {
            doServerAlien("GET", this.hostDomainQ + "query/get?id=" + qu , this, null, "getQuery", this.fieldsTable);
        } else {
            this.query = {type_query:"INSERT"};
        }
    }

    this.cbDoServer = function (res, paramDo) {
        switch (paramDo) {
            case "getQuery": 
                this.cbGetQuery(res);
                break;
            case "saveCrud": 
                this.cbQueryCreate(res);
                break;
        }
    }
    
    this.cbGetQuery = function(res) {
        this.query = JSON.parse(res);
        if (this.type_crud == "EditProfile") {
            new EditForm(meta_EditProf, this.query, this.blockErrorTxt);
        } else {
            new EditForm(meta_send, this.query, this.blockErrorTxt);
        }
        let originQuery = JSON.parse(this.query.origin_query);
        if (originQuery.fieldTable != null) {
            let origin = originQuery.fieldTable;
            let item = origin[0];
            let tab = getTabInQuery(item.id_table);
            if (tab != -1) {
                this.idTable = item.id_table;
                this.tabbleObj.formFieldsInTable(tab);
                this.tabbleObj.addSelectFields(item.listFields);
                this.tabbleObj.setViewImg();
                if (this.param != null && this.param.queryFilds != null && this.param.queryFilds.indV != null) {
                    let pp = this.param.queryFilds.indP;
                    this.markingValidFields(this.param.queryFilds.indV, pp);
                }
            }
        }
     }
    
    this.getIdQuery = function() {
        let qu = -1;
        let url = this.param.url;
        if (url != null && url != "") {
            url = "" + url;
            let ar = url.split("/")
            if (ar.length > 1) {
                qu = parseInt(ar[2]);
            } else {
                qu = parseInt(url);
            }
        }
        return qu;
    }
/*
    this.changeOper = function(el) {
        let op = el.options[el.selectedIndex].value;
        this.query.type_query = op;
        this.param.oper = op;
        if (op == "UPDATE" || op == "DELETE") {
            this.where.style.display = "block";
        } else {
            this.where.style.display = "none";
        }
        this.viewPortF.scroll_y.resize();
        this.tabbleObj.scrollTable();
    }
*/
    this.cooseTableCrud = function() {
        this.tabbleObj.cooseTable();
    }

// Save CRUD
    this.cbWind = function() {
        let qu = this.getIdQuery();
        if (qu > 3) {
            switch (this.type_crud) {
                case "SignIn":
                    qu = 1;
                    break;
                case "SignUp":
                    qu = 2;
                    break;
                case "EditProfile":
                    qu = 3;
                    break;
            }
            this.param.url = "autch/" + currentProject.resurseInd + "/" + qu;
        }
        let fv = this.formFieldsValid();
        if (fv.fields == ""){
            myAlert("No fields selected for data transfer");
            return;
        }
        this.param.queryFilds = fv;
        let res = [this.tabbleObj.getTableInformation()];
        let origin_query = {fieldTable:res,where:null,order:null};
        let original = JSON.stringify(origin_query);
        let nam = currentScreen.screenName + "_" + this.data.viewId + "_send";
        let SQL = "";
        switch (this.param.oper) {
            case "INSERT":
                SQL = "INSERT INTO " + currentProject.resurseInd + "." + res[0].name_table;
                break;
        }
        let param_query = "";
        let strParam = res[0].name_table;
        let dat;
        if (qu < 4) {
            dat = {id_query:qu,type_query:this.query.type_query,origin_query:original,sql_query:SQL,param_query:strParam,
                err_1:this.query.err_1,err_2:this.query.err_2};
        } else {
            dat = {id_query:qu,name_query:nam,type_query:this.query.type_query,origin_query:original,sql_query:SQL,param_query:strParam,
                err_1:this.query.err_1,err_2:this.query.err_2};
        }
        doServerAlien("POST", hostDomain + "query/create", this, JSON.stringify(dat), "saveCrud", this.fieldsTable);
    }
    
    this.cbQueryCreate = function (res) {
        let dat = JSON.parse(res);
        if (dat.id_query != null) {
            this.param.url = "query/" + currentProject.resurseInd + "/" + dat.id_query;
        }
        this.data[name] = JSON.stringify(this.param);
    }
    
    this.formFieldsValid = function() {
        let ff = "";
        let vv = "";
        let pp = "";
        let indF = [];
        let indV = [];
        let indP = [];
        let imgP;
        let sepF = "", sepV = "", sepP = "";
        let fieldsView = this.selectFields.children;
        let ik = fieldsView.length;
        for (let i = 0; i < ik; i++) {
            let item = fieldsView[i];
            ff += sepF + item.name_field;
            sepF = ",";
            indF.push(item.idField);
            if (isSend) {
//                sepF = ",";
                imgP = item.querySelector('.selProf');
            }
            if (isSend && imgP.value != "Field") {
                pp += sepP + item.name_field;
                let valS = imgP.value;
                ff += "=" + valS;
                indP.push({id:item.idField,source:valS});
//                indP.push(item.idField + "=" + imgP.value);
                sepP = ",";
            } else {
                let img = item.querySelector('.selField');
                if (img.src.indexOf("act") == -1) {
                    vv += sepV + item.name_field;
                    indV.push(item.idField);
                    sepV = ",";
                }
            }
/*
            if (isSend && imgP.src.indexOf("act") == -1) {
                pp += sepP + item.name_field;
                indP.push(item.idField);
                sepP = ",";
            } else {
                let img = item.querySelector('.selField');
                if (img.src.indexOf("act") == -1) {
                    vv += sepV + item.name_field;
                    indV.push(item.idField);
                    sepV = ",";
                }
            }
*/
        }
        return {fields:ff,valid:vv,indF:indF,indV:indV,prof:pp,indP:indP};
    }
    
    this.markingValidFields = function (arr, arrP) {
        let fieldsView = this.selectFields.children;
        let ik = fieldsView.length;
        let img;
        for (let i = 0; i < ik; i++) {
            let item = fieldsView[i];
            let noProf = true;
            if (isSend && arrP != null) {
                let valSource = isFieldInListCrud(item.idField, arrP);
                if (valSource != null) {
                    img = item.querySelector('.selProf');
                    img.value = valSource;
                    noProf = false;
                }
            }
            if (noProf && isFieldInList(item.idField, arr)) {
                img = item.querySelector('.selField');
                img.src = "img/check-sel_1.png";
            }
        }
    }
    
    this.init();
}

function isFieldInListCrud(id, fields) {
    let ik = fields.length;
    for (let i = 0; i < ik; i++) {
        if (fields[i].id == id) {
            return fields[i].source;
        }
    }
    return null;
}

