function TableObj(selF, tabF) {
    this.selectFields = selF;
    this.fieldsTable = tabF;
    this.selectTable;
    
    let hItem = 24;
    let self = this;
    
    this.cooseTable = function() {
        hostDomain = currentProject.host;
        if (hostDomain != null && hostDomain.length > 0  && hostDescr != "Third party API") {
            if (listTables == null) {
                doServerAlien("GET", hostDomain + 'tables/list', this.cbGetTab, tabF);
            } else {
                self.cooseTable_1();
            }
        } else {
            myAlert("Inappropriate data source");
        }
    }
    
    self.cooseTable_1 = function() {
        if (listTables == null) {
            myAlert("No tables described");
        } else {
            let wind = formWind(250, 450, 40, 350, "Choose a table", true, null, null, null, "");
            let cont = newDOMelement('<div style="position:absolute;left:5px;right:10px"></div>');
            wind.appendChild(cont);
            let ik = listTables.length;
            if (ik > 0) {
                for (let i = 0; i < ik; i++) {
                    this.oneTable(i, cont);
                }
            }
            resizeScrol(wind);
        }
    }
    
    this.cbGetTab = function(res) {
        listTables = JSON.parse(res);
        self.cooseTable_1();
    }
    
    this.oneTable = function(i, el) {
        let item = listTables[i];
        let cont = newDOMelement('<div style="float:left;width:100%;height:30px;overflow: hidden;cursor:pointer;border-bottom:1px solid #aaf;clear:both"></div>');
        let name = newDOMelement('<div style="font-size:16px;color:#000;margin-top:5px;float:left;margin-left:5px">' + item.name_table + '</div>');
        cont.appendChild(name);
        cont.addEventListener("click", () => {closeDataWindow(el); this.formFieldsInTable(i);}, false);
        el.appendChild(cont);
        let rect = cont.getBoundingClientRect();
        let rect_1 = name.getBoundingClientRect();
        let descr = newDOMelement('<div style="font-size:12px;color:#555;margin-top:9px;height:12px;width:' + (rect.width - rect_1.width - 20) 
                + 'px;float:left;margin-left:10px;overflow:hidden">' + item.title_table + '</div>');
        cont.appendChild(descr);
    }
    
    this.formFieldsInTable = function(i) {
        let item = listTables[i];
        this.selectTable = {id_table:item.id_table,name_table: item.name_table,title_table:item.title_table,fields_table:JSON.parse(item.fields_table)};
        this.selectTable.fields_table.unshift({id_field:0, name:"id_" + item.name_table, type:"Bigserial", title:""});
        this.fieldsTable.innerHTML = "";
        let block = newDOMelement('<div class="table_view" style="width:' + wTableInQuery + 'px;height:100%;float:left;position:relative;border-right:1px solid #1dace9;"></div>');
        let title = newDOMelement('<div class="tab_title" style="height:24px;border-bottom:1px solid #1dace9;position:absolute;left:0;top:0;right:0;background:#f3f8ff;">' 
                +'<div style="margin-top:3px;width:100%;text-align:center;font-size:14px;">' + item.name_table + '</div>'
                +'</div>');
        block.appendChild(title);
        let selField = newDOMelement('<img style="width:18px;height:18px;position:absolute;right:10px;top:3px;cursor:pointer" src="img/check-act.png">');
        selField.addEventListener("click", () => {this.selAllFields(selField);}, false);
        title.appendChild(selField);

        this.fieldsTable.appendChild(block);
        let wraperScroll = newDOMelement('<div style="position:absolute;left:0;top:' + hItem + 'px;right:0;bottom:0"></div');
        block.appendChild(wraperScroll);
        let viewScroll = formViewScrolY(wraperScroll);
        viewScroll.style.right = "9px";
        let viewDataT = viewScroll.getElementsByClassName("viewData")[0];

        let fields = JSON.parse(item.fields_table);
        fields.unshift({id_field:0, name:"id_" + item.name_table, type:"Bigserial", title:""});
        let ik = fields.length;
        for (let i = 0; i < ik; i++) {
            this.oneFieldTables(item.id_table, fields[i], viewDataT);
        }
    }
    
    this.oneFieldTables = function (idTable, item, el) {
        let cont = newDOMelement('<div class="cont_f" style="float:left;width:100%;position:relative;height:' 
                + hItem + 'px;overflow: hidden;border-bottom:1px solid #aaf;clear:both"></div>');
//        cont.idTable = idTable;
        cont.idField = item.id_field;
        cont.name_field = item.name;
        cont.type_field = item.type;

        let name = newDOMelement('<div onclick="setFieldInQuery(this)" style="font-size:14px;color:#000;margin-top:2px;cursor:pointer;float:left;margin-left:3px">' 
                + item.name + '</div>');
        cont.appendChild(name);
        el.appendChild(cont);
        let rect = cont.getBoundingClientRect();
        let rect_1 = name.getBoundingClientRect();
        let descr = newDOMelement('<div style="font-size:10px;color:#555;margin-top:6px;height:11px;width:' + (rect.width - rect_1.width - 20) 
                + 'px;float:left;margin-left:5px;overflow:hidden">' + item.title);
        let selField = newDOMelement('<img style="width:18px;cursor:pointer;height:18px;position:absolute;right:2px;top:3px;" src="img/check-act.png">');
        selField.addEventListener("click", () => {this.selectField(selField);}, false);
        cont.appendChild(descr);
        cont.appendChild(selField);
    }
    
    this.selAllFields = function (el) {
        if (checkElement(el)) {
            this.addAllFields(el);
        } else {
            this.delAllFields(el);
        }
    }
    
    this.addAllFields = function (el) {
        let tabBlock = el.closest(".table_view");
        let viewData = tabBlock.getElementsByClassName("viewData")[0];
        let child = viewData.children;
        let ik = child.length;
        for (let i = 0; i < ik; i++) {
            let itemEl = child[i];
            let sel = itemEl.getElementsByTagName("img")[0];
             if (sel.src.indexOf("check-sel") == -1) {
                this.addFieldOne(sel);
                sel.src = "img/check-sel_1.png";
            }
        }
    }
    
    this.delAllFields = function (el) {
        let tabBlock = el.closest(".table_view");
        let viewData = tabBlock.getElementsByClassName("viewData")[0];
        let child = viewData.children;
        let ik = child.length;
        for (let i = 0; i < ik; i++) {
            let itemEl = child[i];
            let sel = itemEl.getElementsByTagName("img")[0];
            if (sel.src.indexOf("check-sel") > -1) {
                this.delFieldOne(sel);
                sel.src = "img/check-act.png";
            }
        }
    }
    
    this.selectField = function (el) {
        if (checkElement(el)) {
            this.addFieldOne(el);
        } else {
            this.delFieldOne(el);
        }
        setViewAllImg(el);
    }
    
    this.addFieldOne = function (el) {
        let cont = el.closest('.cont_f');
        let idF = cont.idField;
        let fields = this.selectTable.fields_table;
        let jk = fields.length;
        for (let j = 0; j < jk; j++) {
            let itemField = fields[j];
            if (itemField.id_field == idF) {
                this.oneFieldView(itemField, this.selectFields);
                let ss = this.selectFields.closest(".viewport");
                ss.scroll_y.resize();
                break;
            }
        }
    }
    
    this.delFieldOne = function (el) {
        let cont = el.closest('.cont_f');
        let idF = cont.idField;
        let fieldsView = this.selectFields.children;
        let ik = fieldsView.length;
        for (let i = 0; i < ik; i++) {
            let vv = fieldsView[i];
            if (idF == vv.idField) {
                vv.remove();
                let ss = this.selectFields.closest(".viewport");
                ss.scroll_y.resize();
                break;
            }
        }
    }
    
    this.oneFieldView = function (item, el) {
        let cont = newDOMelement('<div class="field" style="float:left;width:100%;position:relative;height:' 
                + hItem + 'px;overflow: hidden;border-bottom:1px solid #aaf;clear:both"></div>');
        cont.idField = item.id_field;
        let name = newDOMelement('<div class="name" style="font-size:14px;color:#000;margin-top:2px;float:left;margin-left:3px">' + item.name + '</div>');
        cont.appendChild(name);
        el.appendChild(cont);
        let rect = cont.getBoundingClientRect();
        let rect_1 = name.getBoundingClientRect();
        let descr = newDOMelement('<div style="font-size:10px;color:#555;margin-top:6px;height:11px;width:' + (rect.width - rect_1.width - 20) 
                + 'px;float:left;margin-left:5px;overflow:hidden">' + item.title);
        cont.appendChild(descr);
    }
}