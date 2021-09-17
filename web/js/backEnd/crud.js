function CRUD(dat, name) {
    this.param;
    this.choose;
    this.fieldsTable;
    this.selectFields;
    this.tabbleObj;
    this.where;
    
    let wFields = 180;
    let wTab = 200;
    let hRow = 24;
    let hViewFT = 240;
    
    this.init = function() {
        let wind = formWind(wFields + wTab + 1, 400, 40, 650, "Send parameters", false, null, "Save", this, "");
        let par = dat[name];
        this.param;
        if (par == null) {
            this.param = {oper:"INSERT"};
        } else {
            this.param = JSON.parse(par);
        }
        wind.style.display = "flex";
        wind.style.flexDirection = "column";
        let titForm = newDOMelement('<div style="width:100%;height:' + hRow + 'px;border-bottom:1px solid #1dace9"></div>');
        wind.append(titForm);
        let oper = newDOMelement('<div style="float:left;height:100%;width:' + wFields 
                + 'px;border-right:1px solid #1dace9;"><div style="float:left;margin-top:3px;margin-left:10px;">Operations</div></div>');
        titForm.append(oper);
        
        let vv = this.param.oper;
        let inp = formSelectForEditData("INSERT,UPDATE,DELETE,LOGIN,REGISTER", vv);
        inp.style.cssText = "width:90px;font-size:12px;color:#110000;float:left;margin-left:7px;height:22px;";
        inp.className = 'select_' + browser;
        inp.addEventListener("change", () => {this.changeOper(inp)}, false);
        oper.append(inp);
        
        this.choose = newDOMelement('<div style="float:left;height:100%;width:' + wTab + 'px;"></div>');
        let clickChoose = newDOMelement('<div style="float:right;margin-top:3px;margin-right:5px;cursor:pointer">Choose a table</div>');
        clickChoose.addEventListener("click", () => {this.cooseTable()}, false);
        this.choose.append(clickChoose);
        
//        let viewFT = newDOMelement('<div style="position:absolute;top:' + (hRow + 1) + 'px;left:0;right:0;height:' + (hViewFT + 1) + 'px;border-bottom:1px solid #1dace9"></div>');
        let viewFT = newDOMelement('<div style="position:relative;width:100%;flex-grow:1;"></div>');
        wind.append(viewFT);
        this.where = newDOMelement('<div style="width:100%;height:40px;display:none;border-top:1px solid #1dace9;"></div>');
        wind.append(this.where);
        let selF = newDOMelement('<div style="float:left;height:100%;width:' + wFields + 'px;border-right:1px solid #1dace9;"></div>');
        let viewPort = formViewScrolY(selF);
        this.selectFields = viewPort.querySelector(".viewData");
        this.fieldsTable = newDOMelement('<div style="float:left;height:100%;width:' + wTab + 'px;position:relative;"></div>');
        viewFT.append(selF);
        viewFT.append(this.fieldsTable);
        
        titForm.append(this.choose);
        this.tabbleObj = new TableObj(this.selectFields, this.fieldsTable);
    }
    
    this.changeOper = function(el) {
        let op = el.options[el.selectedIndex].value;
        this.param.oper = op;
        if (op == "UPDATE") {
            this.where.style.display = "block";
        } else {
            this.where.style.display = "none";
        }
    }
    
    this.cooseTable = function() {
        this.tabbleObj.cooseTable();
    }
    
    this.cbWind = function() {
        dat[name] = JSON.stringify(this.param);
    }
    
    this.init();
}

