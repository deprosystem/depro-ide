function FieldsFromSource(model, ind, editC) {
    this.model = model;
    this.ind = ind;
    this.editC = editC;
    this.wind;
    this.idNewQuery = -1;
    
    let hTitle = 24, wFields = 220, hTitle1 = hTitle + 1;
    
    this.init = function() {
        wind = formWind(440, 400, 40, 250, "Specify fields for view from query ", null, null, null, null, "");
        wind.style.bottom = "51px";
        let wd = wind.closest(".dataWindow");
        let titleSt = '<div style="height:' + hTitle + 'px;border-bottom:1px solid #1dace9;font-size:14px;position:relative">'
                +'<div style="width:' + wFields + 'px;text-align:center;margin-top:3px;float:left;">Fields view</div>'
                +'<div style="height:100%;width:1px;background-color:#1dace9;float:left"></div>'
                +'<div style="text-align:center;margin-top:3px;float:left;width:' + (wFields - 1) + 'px">Fields query</div>'
                +'</div>';
        let controll = createFooter(50);
        addFooter(wind, controll);
        let buttonSave = createButtonBlue('Save', 70);
        buttonSave.addEventListener("click", () => {this.saveFieldsSource();closeDataWindow(wind);}, true);
        controll.append(buttonSave);
        if (this.ind == 0) {
            let buttonChang = createButtonBlue('Change query');
            buttonChang.addEventListener("click", () => {this.changeQuery();}, true);
            controll.append(buttonChang);
        }
        let buttonCancel = createButtonWeite('Cancel', 70);
        buttonCancel.addEventListener("click", function(){closeDataWindow(wind);}, true);
        controll.append(buttonCancel);
        wd.append(controll);
        let title = newDOMelement(titleSt);
        wind.append(title);
        this.selFieldAll = newDOMelement('<img style="width:14px;height:14px;position:absolute;right:7px;top:3px;cursor:pointer" src="img/check-act.png">');
        this.selFieldAll.addEventListener("click", () => {this.selAllFieldInQu();}, true);
        title.append(this.selFieldAll);
        this.fView = newDOMelement('<div class="fView" style="position:absolute;top:' + hTitle1 + 'px;left:0;bottom:0;width:' + wFields 
                + 'px;border-right:1px solid #1dace9"></div>');
        this.fQuery = newDOMelement('<div class="fQuery" style="position:absolute;top:' + hTitle1 + 'px;right:0;bottom:0;left:' + (wFields - 1) 
                + 'px;"></div>');
        wind.append(this.fView);
        wind.append(this.fQuery);
        this.fViewPort = formViewScrolY(this.fView);
        this.fieldsView = this.fViewPort.querySelector(".viewData");
        this.fQueryPort = formViewScrolY(this.fQuery);
        this.fieldsQuery = this.fQueryPort.querySelector(".viewData");
        this.wind = wind;
        this.hostDomain = currentProject.host;
        if (listQuerys == null) {
            doServerAlien("GET", this.hostDomain + 'query/list', this, null, null, wind);
        } else {
            this.setFieldsSource();
        }
    }
    
    this.cbDoServer = function(res) {
        listQuerys = JSON.parse(res);
        this.setFieldsSource();
    }
    
    this.setFieldsSource = function() {
        if (this.model.idQuery != null) {
            let item = this.getQueryById();
            if (item != null) {
                this.setFieldsSource_1(item);
            }
        }
    }
    
    this.getQueryById = function() {
        this.idNewQuery = this.model.idQuery;
        let ik = listQuerys.length;
        for (let i = 0; i < ik; i++) {
            let item = listQuerys[i];
            if (item.id_query == this.model.idQuery) {
                return item;
            }
        }
        return null;
    }
    
    this.changeQuery = function() {
        listQuerys.sort(function(a, b){
            let nameA=a.name_query.toLowerCase(), nameB=b.name_query.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });

        let wind = formWind(300, 400, 40, 250, "Choose a request", true, null, null, null, "");
        let ik = listQuerys.length;
        if (ik > 0) {
            for (let i = 0; i < ik; i++) {
                this.oneQueryView(i, wind, i);
            }
            let scr = wind.closest('.viewport');
            scr.scroll_y.resize();
        }
    }
    
    this.oneQueryView = function(i, el) {
        let item = listQuerys[i];
        let img = "";
        switch (item.type_query) {
            case "SELECT":
                img = "select-tab";
                break;
            case "DELETE":
                img = "del-tab";
                break;
            case "INSERT":
                img = "add-tab";
                break;
            case "UPDATE":
                img = "edit-tab";
                break;
        }
        let descr = item.descr_query;
        if (descr == null) {
            descr = "";
        }
        let oneDiv = '<div  style="float:left;width:100%;height:36px;cursor:pointer;border-bottom:1px solid #aaf;clear:both;position:relative">'
                        +'<img src="img/' + img + '.png" style="width:24px;height:24px;position:absolute;top:3px;left:3px;">'
                        +'<div class="name_t" style="font-size:14px;color:#000;position:absolute;top:1px;left:30px">' + item.name_query + '</div>'
                        +'<div class="descr_t" style="font-size:10px;color:#555;position:absolute;top:17px;left:30px;right:0;height:14px;overflow:hidden">' + descr + '</div>'
                    +'</div>';
        let cont = newDOMelement(oneDiv);
        cont.addEventListener("click", () => {this.setFieldsSource_2(i, el);}, true);
        el.appendChild(cont);
    }
    
    this.setFieldsSource_2 = function(i, el) {
        closeDataWindow(el);
        let item = listQuerys[i];
        if (item.id_query == this.idNewQuery) {
            return;
        }
        this.idNewQuery = item.id_query;
        this.setFieldsSource_1(item);
    }
    
    this.setFieldsSource_1 = function(item) {
        this.selFieldAll.src = "img/check-act.png";
        this.fieldsQuery.innerHTML = "";
        this.fieldsView.innerHTML = "";
        setTitleWind(this.wind, "Specify fields for view from query <span style='color:#009fff;font-size:22px'>" + item.name_query + "</span>");

        let fildsQu = JSON.parse(item.fields_result);
        let ik = fildsQu.length;
        for (let i = 0; i < ik; i++) {
            let it = fildsQu[i];
            let cont = newDOMelement('<div class="cont_f" style="float:left;width:100%;position:relative;height:24px;border-bottom:1px solid #aaf;clear:both"></div>');
            let name = newDOMelement('<div style="margin-top:2px;float:left;margin-left:4px;font-size:14px">' + it.name + ' </div>');
            cont.idField = it.id_field;
            cont.name_field = it.name;
            cont.type_field = it.type;
            cont.title_field = it.title;
            cont.append(name);
            this.fieldsQuery.append(cont);
            let rect = cont.getBoundingClientRect();
            let rect_1 = name.getBoundingClientRect();
            let descr = newDOMelement('<div style="font-size:10px;color:#555;margin-top:7px;height:11px;width:' + (rect.width - rect_1.width - 20) 
                    + 'px;float:left;margin-left:5px;overflow:hidden">' + it.title);
            cont.append(descr);
            let selField = newDOMelement('<img style="width:14px;cursor:pointer;height:14px;position:absolute;right:2px;top:4px;" src="img/check-act.png">');
            cont.append(selField);
            selField.addEventListener("click", () => {this.selFieldInQu(selField);}, true);
        }
        this.fQueryPort.scroll_y.resize();
        this.setFieldsView ();
    }
    
    this.setFieldsView = function() {
        let data = this.model.data[this.ind];
        let ik = data.length;
        let child = this.fieldsQuery.children;
        let qk = child.length;
        for (let i = 0; i < ik; i++) {
            let item = data[i];
            let nam = item.name;
            for (q = 0; q < qk; q++) {
                let it = child[q];
                if (nam == it.name_field) {
                    let img = it.querySelector("img");
                    img.src = "img/check-sel_1.png";
                    this.addFieldsInQuery(img, item.edit);
                    break;
                }
            }
        }
        this.setViewAllImg();
    }
    
    this.selFieldInQu = function(el) {
        if (checkElement(el)) {
            this.addFieldsInQuery(el);
        } else {
            this.delFieldsInQuery(el);
        }
        this.setViewAllImg();
    }
    
    this.addFieldsInQuery = function(el, ed) {
        let cont = el.closest('.cont_f');
        this.oneFieldView(cont, ed);
        this.fViewPort.scroll_y.resize();
    }
    
    this.delFieldsInQuery = function(el) {
        let cont = el.closest('.cont_f');
        let idF = cont.name_field;
        let ch = this.fieldsView.children;
        let ik = ch.length;
        for (let i = 0; i < ik; i++) {
            let vv = ch[i];
            if (idF == vv.name_field) {
                vv.remove();
                this.fViewPort.scroll_y.resize();
                break;
            }
        }
    }
    
    this.oneFieldView = function(item, ed) {
        let cont = newDOMelement('<div class="field" style="float:left;width:100%;position:relative;height:24px;overflow: hidden;border-bottom:1px solid #aaf;clear:both"></div>');
        cont.idField = item.idField;
        cont.name_field = item.name_field;
        cont.type_field = item.type_field;
        cont.title_field = item.title_field;
        let name = newDOMelement('<div class="name" style="font-size:14px;color:#000;margin-top:2px;float:left;margin-left:3px">' + item.name_field + '</div>');
        cont.appendChild(name);
        this.fieldsView.append(cont);
        let rect = cont.getBoundingClientRect();
        let rect_1 = name.getBoundingClientRect();
        let descr = newDOMelement('<div style="font-size:10px;color:#555;margin-top:6px;height:11px;width:' + (rect.width - rect_1.width - 20) 
                + 'px;float:left;margin-left:5px;overflow:hidden">' + item.title_field);
        cont.appendChild(descr);
        if (this.editC) {
            let imgSrc = "img/check-act.png";
            if (ed) {
                imgSrc = "img/check-sel_1.png";
            }
            let selField = newDOMelement('<img style="width:14px;cursor:pointer;height:14px;position:absolute;right:3px;top:2px;" src=' + imgSrc + '>');
            selField.addEventListener("click", function(){checkElement(selField)}, false);
            cont.append(selField);
        }
    }
    
    this.setViewAllImg = function() {
        let child = this.fieldsQuery.children;
        let ik = child.length;
        let cPl = 0, cMin = 0;
        for (let i = 0; i < ik; i++) {
            let itemEl = child[i];
            let sel = itemEl.getElementsByTagName("img")[0];
            if (sel.src.indexOf("check-sel") > -1) {
                cPl++;
            } else {
                cMin++;
            }
        }
        if (cMin == 0) {
            this.selFieldAll.src = "img/check-sel_1.png";
        } else {
            if (cPl == 0) {
                this.selFieldAll.src = "img/check-act.png";
            } else {
                this.selFieldAll.src = "img/check-sel-blur.png";
            }
        }
    }
    
    this.selAllFieldInQu = function() {
        if (checkElement(this.selFieldAll)) {
            this.addAllFields();
        } else {
            this.delAllFields();
        }
    }
   
    this.addAllFields = function() {
        let child = this.fieldsQuery.children;
        let ik = child.length;
        for (let i = 0; i < ik; i++) {
            let itemEl = child[i];
            let sel = itemEl.querySelector("img");
            if (sel.src.indexOf("check-sel") == -1) {
                this.addFieldsInQuery(sel);
//                addFieldsInQuery(sel);
                sel.src = "img/check-sel_1.png";
            }
        }
    }
    
    this.delAllFields = function() {
        let child = this.fieldsQuery.children;
        let ik = child.length;
        for (let i = 0; i < ik; i++) {
            let itemEl = child[i];
            let sel = itemEl.querySelector("img");
            if (sel.src.indexOf("check-sel") > -1) {
                this.delFieldsInQuery(sel);
                sel.src = "img/check-act.png";
            }
        }
    }
    
    this.saveFieldsSource = function() {
        if (this.ind ==0 && this.idNewQuery != this.model.idQuery) {
            this.model.idQuery = this.idNewQuery;
            this.model.url = "query/" + currentProject.resurseInd + "/" + this.idNewQuery;
            let ik = model.data.length;
            for (let i = 1; i < ik; i++) {
                model.data[i].length = 0;
            }
        }
        
        
        let fieldsQQ = this.fieldsView.children;
        ik = fieldsQQ.length;
        let data = model.data[this.ind];
        data.length = 0;
        for (let i = 0; i < ik; i++) {
            let item = fieldsQQ[i];
            if (item.type_field.indexOf("erial") == -1) {
                let imgCheck = item.querySelector("IMG");
                let ed = false;
                if (imgCheck != null && imgCheck.src.indexOf("check-sel") > -1) {
                    ed = true;
                }
                let itemData = {name:item.name_field,type:item.type_field,edit:ed};
                data.push(itemData);
            }
        }
    }
    
    this.init();
}


