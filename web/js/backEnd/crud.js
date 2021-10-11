function CRUD(dat, name) {
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
    
    let self = this;
    
    let wFields = 200;
    let wTab = 200;
    let hRow = 24;
    let hWhere = 150;
    let hViewFT = 240;
    
    this.init = function() {
        this.data = dat;
        this.hostDomainQ = currentProject.host;
        let hostDescr = currentProject.whereServer;
        if (this.hostDomainQ == null || this.hostDomainQ.length == 0  || hostDescr == "Third party API") {
            myAlert("Domain not set");
            return;
        }
        let wind = formWind(wFields + wTab + 1, 400, 40, 650, "Model parameters", false, null, "Save", this, "");
        let par = this.data[name];
        if (par == null) {
            this.param = {method:"POST", url:"",oper:"INSERT"};
        } else {
            this.param = JSON.parse(par);
        }
        wind.style.display = "flex";
        wind.style.flexDirection = "column";
        let titForm = newDOMelement('<div style="width:100%;height:' + hRow + 'px;border-bottom:1px solid #1dace9"></div>');
        wind.append(titForm);
        let oper = newDOMelement('<div style="float:left;height:100%;width:' + wFields 
                + 'px;border-right:1px solid #1dace9;"><div style="float:left;margin-top:3px;margin-left:7px;">Operation</div></div>');
        titForm.append(oper);
        
        let vv = this.param.oper;
        this.selectOperQuery = formSelectForEditData("INSERT,UPDATE,DELETE,LOGIN,REGISTRATION", vv);
        this.selectOperQuery.style.cssText = "width:120px;font-size:12px;color:#110000;float:left;margin-left:7px;height:22px;";
        this.selectOperQuery.className = 'select_' + browser;
        this.selectOperQuery.addEventListener("change", () => {this.changeOper(this.selectOperQuery)}, false);
        oper.append(this.selectOperQuery);
        
        this.choose = newDOMelement('<div style="float:left;height:100%;width:' + wTab + 'px;"></div>');
        let clickChoose = newDOMelement('<div style="float:left;margin-top:3px;margin-left:25px;cursor:pointer">Choose a table</div>');
        clickChoose.addEventListener("click", () => {this.cooseTableCrud()}, false);
        this.choose.append(clickChoose);
        
//        let viewFT = newDOMelement('<div style="position:absolute;top:' + (hRow + 1) + 'px;left:0;right:0;height:' + (hViewFT + 1) + 'px;border-bottom:1px solid #1dace9"></div>');
        let viewFT = newDOMelement('<div style="position:relative;width:100%;flex-grow:1;"></div>');
        wind.append(viewFT);
        this.where = newDOMelement('<div style="width:100%;height:' + hWhere + 'px;display:none;border-top:1px solid #1dace9;"></div>');
        wind.append(this.where);
        let selF = newDOMelement('<div style="float:left;position:relative;height:100%;width:' + wFields + 'px;border-right:1px solid #1dace9;"></div>');
        let titleF = newDOMelement('<div class="tab_title" style="height:' + hRow + 'px;border-bottom:1px solid #1dace9;position:absolute;left:0;top:0;right:0;background:#f3f8ff;">' 
                +'<div style="margin-top:3px;float:left;margin-left:5px;">Fields name</div>'
                +'<div style="margin-top:3px;float:right;margin-right:5px;">Validate</div>'
                +'</div>');
        selF.appendChild(titleF);
        let wraperScrollF = newDOMelement('<div style="position:absolute;left:0;top:' + hRow + 'px;right:0;bottom:0"></div');
        selF.appendChild(wraperScrollF);
        this.viewPortF = formViewScrolY(wraperScrollF);
        this.selectFields = this.viewPortF.querySelector(".viewData");
        this.fieldsTable = newDOMelement('<div style="float:left;height:100%;width:' + wTab + 'px;position:relative;"></div>');
        viewFT.append(selF);
        viewFT.append(this.fieldsTable);
        
        titForm.append(this.choose);
        
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
        self.tabbleObj = new TableObj(self.selectFields, self.fieldsTable);
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
        let originQuery = JSON.parse(this.query.origin_query);
        this.selectOperQuery.value = this.query.type_query;
        if (originQuery.fieldTable != null) {
            let origin = originQuery.fieldTable;
            let item = origin[0];
            let tab = getTabInQuery(item.id_table);
            if (tab != -1) {
                this.idTable = item.id_table;
                this.tabbleObj.formFieldsInTable(tab);
                this.tabbleObj.addSelectFields(item.listFields);
                if (this.param != null && this.param.queryFilds != null && this.param.queryFilds.indV != null) {
                    this.markingValidFields(this.param.queryFilds.indV);
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
    
    this.cooseTableCrud = function() {
        this.tabbleObj.cooseTable();
    }
    
// Save CRUD
    this.cbWind = function() {
        let qu = this.getIdQuery();
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
                SQL = "INSERT INTO " + currentProject.resurseInd + "." + res[0].name_tble;
                break;
        }
        let param_query = "";
        let strParam = res[0].name_tble;
        let dat = {id_query:qu,name_query:nam,type_query:this.query.type_query,origin_query:original,sql_query:SQL,param_query:strParam};
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
        let indF = [];
        let indV = [];
        let sepF = "", sepV = "";
        let fieldsView = this.selectFields.children;
        let ik = fieldsView.length;
        for (let i = 0; i < ik; i++) {
            let item = fieldsView[i];
            ff += sepF + item.name_field;
            indF.push(item.idField);
            sepF = ",";
            let img = item.querySelector('IMG');
            if (img.src.indexOf("act") == -1) {
                vv += sepV + item.name_field;
                indV.push(item.idField);
                sepV = ",";
            }
        }
        return {fields:ff,valid:vv,indF:indF,indV:indV};
    }
    
    this.markingValidFields = function (arr) {
        let fieldsView = this.selectFields.children;
        let ik = fieldsView.length;
        for (let i = 0; i < ik; i++) {
            let item = fieldsView[i];
            if (isFieldInList(item.idField, arr)) {
                let img = item.querySelector('IMG');
                img.src = "img/check-sel_1.png";
            }
        }
    }
    
    this.init();
}

