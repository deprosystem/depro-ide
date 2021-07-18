var listTables = null;
var fieldsTable;
var descrTable;
var tableId;
var tablePosition;
var hItemListFieldsTable = 24;
var listTablesForQuery = [];

let htmlTable = '<div style="height:40px;margin-left:20px">'
        +'<div style="float:left;margin-left:10px"><div style="color: #2228;font-size: 10px;margin-left:4px">Name table</div>'
        +'<input class="name_t input_style" onkeydown="return validNameLower(event)" value="" type="text" size="30"/>'
        +'</div>'
        +'<div style="float:left;margin-left:10px"><div style="color: #2228;font-size: 10px;margin-left:4px">Description</div>'
        +'<input class="descr_t input_style" value="" type="text" size="60"/>'
        +'</div>'
    +'</div>';

function addTable() {
    fieldsTable = [];
    tableId = -1;
    descrTable = newDOMelement(htmlTable);
    editDataWind(metaTable, fieldsTable, cbAddTable, descrTable, 500, 500, 300);
}

function cbAddTable(dat) {
    let nn = descrTable.getElementsByClassName("name_t")[0].value;
    let dd = descrTable.getElementsByClassName("descr_t")[0].value;
    if (nn != null && nn != "") {
        let hostDomain = currentProject.host;
        if (hostDomain != null && hostDomain.length > 0) {
            let ff = JSON.stringify(dat);
            let t = {id_table:tableId,name_table:nn,title_table:dd,fields_table:ff,schema:currentProject.resurseInd};
            if (tableId == -1) {
                doServerAlien("POST", hostDomain + "tables/descr", cbSaveTable, JSON.stringify(t));
            } else {
                doServerAlien("POST", hostDomain + "tables/descr", cbChangeTable, JSON.stringify(t));
            }
        }
    }
}

function cbSaveTable(res) {
    let it = JSON.parse(res);
    if (listTables == null) {
        listTables = [];
    }
    listTables.push(it);
    oneTableView(listTables.length - 1, listTablesView);
}

function cbChangeTable(res) {
    let it = JSON.parse(res);
    listTables.splice(tablePosition, 1, it);
    let viewEl = listTablesView.children[tablePosition];
    viewEl.getElementsByClassName("name_t")[0].innerHTML = it.name_table;
    viewEl.getElementsByClassName("title_t")[0].innerHTML = it.title_table;
}

function deleteTableAdm(i) {
    event.stopPropagation();
    tablePosition = i;
    let item = listTables[i];
    myAlert("The " + item.name_table + "table and all its data will be deleted permanently.<br />Proceed?", "Proceed", proceedDelTable);
}

function proceedDelTable() {
    let item = listTables[tablePosition];
    let t = {name_table:item.name_table,id_table:item.id_table};
    doServerAlien("POST", hostDomain + "tables/del_tab", cbDelTable, JSON.stringify(t), tablePosition);
}

function cbDelTable(res, i) {
    listTables.splice(i, 1);
    listTablesView.children[i].remove();
}

function editTable(i) {
    let item = listTables[i];
    fieldsTable = JSON.parse(item.fields_table);
    tableId = item.id_table;
    tablePosition = i;
    descrTable = newDOMelement(htmlTable);
    descrTable.getElementsByClassName("name_t")[0].value = item.name_table;
    descrTable.getElementsByClassName("descr_t")[0].value = item.title_table;
    editDataWind(metaTable, fieldsTable, cbAddTable, descrTable);
}

function addTableForQuery() {
    if (listTables == null) return;
    if (listTablesForQuery.length == 3) return;
    let wind = formWind(250, 450, 40, 350, "Choose a table", true);
    let cont = newDOMelement('<div style="position:absolute;left:5px;right:10px"></div>');
    wind.appendChild(cont);
    let ik = listTables.length;
    if (ik > 0) {
        for (let i = 0; i < ik; i++) {
            oneTableForQuery(i, cont);
        }
    }
    resizeScrol(wind);
}

function oneTableForQuery(i, el) {
    let item = listTables[i];
    let cont = newDOMelement('<div style="float:left;width:100%;height:30px;overflow: hidden;cursor:pointer;border-bottom:1px solid #aaf;clear:both"></div>');
    let name = newDOMelement('<div style="font-size:16px;color:#000;margin-top:5px;float:left;margin-left:5px">' + item.name_table + '</div>');
    cont.appendChild(name);
    cont.addEventListener("click", function(){
                closeWindow(el);
                formTableForQuery(i);
            }, true);
    el.appendChild(cont);
    let rect = cont.getBoundingClientRect();
    let rect_1 = name.getBoundingClientRect();
    let descr = newDOMelement('<div style="font-size:12px;color:#555;margin-top:9px;height:12px;width:' + (rect.width - rect_1.width - 20) 
            + 'px;float:left;margin-left:10px;overflow:hidden">' + item.title_table + '</div>');
    cont.appendChild(descr);
}

function formTableForQuery(i) {
    let item = listTables[i];
    let itemForList = {id_table:item.id_table,name_table: item.name_table,title_table:item.title_table,fields_table:JSON.parse(item.fields_table)};
    itemForList.fields_table.unshift({id_field:0, name:"id_" + item.name_table, type:"Bigserial", title:""});
    listTablesForQuery.push(itemForList);
    formBlockTable(item);

    let jk = queryQueryData.children.length;
    let indListT = listTablesForQuery.length - 1;
    for (let j = 0; j < jk; j++) {
        let quEl = queryQueryData.children[j];
        addViewForTableInQuery(indListT, quEl);
    }
}

function formBlockTable(item) {
    let hTitle = 24;
    let block = newDOMelement('<div class="table_view" style="width:' + wTableInQuery + 'px;height:100%;float:left;position:relative;border-right:1px solid #1dace9;"></div>');
    block.id_table = item.id_table;
    block.name_table = item.name_table;
    let title = newDOMelement('<div class="tab_title" style="height:24px;border-bottom:1px solid #1dace9;position:absolute;left:0;top:0;right:0;background:#f3f8ff;">' 
            +'<div style="margin-top:3px;width:100%;text-align:center;font-size:14px;">' + item.name_table + '</div>'
            +'</div>');
    block.appendChild(title);
    let selField = newDOMelement('<img onclick="selAllFieldInTable(this)" style="width:18px;height:18px;position:absolute;right:10px;top:3px;cursor:pointer" src="img/check-act.png">');
    title.appendChild(selField);
    
    queryTables.appendChild(block);
    let wraperScroll = newDOMelement('<div style="position:absolute;left:0;top:' + hTitle + 'px;right:0;bottom:0"></div');
    block.appendChild(wraperScroll);
    let viewScroll = formViewScrolY(wraperScroll);
    viewScroll.style.right = "9px";
    let viewDataT = viewScroll.getElementsByClassName("viewData")[0];

    let fields = JSON.parse(item.fields_table);
    fields.unshift({id_field:0, name:"id_" + item.name_table, type:"Bigserial", title:""});
    let ik = fields.length;
//    oneFieldTables(item.id_table, {id_field:0, name:"id_" + item.name_table, type:"Bigserial", title:""}, viewDataT);
    for (let i = 0; i < ik; i++) {
        oneFieldTables(item.id_table, fields[i], viewDataT);
    }
    let imgAddQuery = footerQuery.getElementsByClassName("addWhere")[0];
    if (imgAddQuery != null) {
        imgAddQuery.style.display = "block";
    }
}

function selAllFieldInTable(el) {
    if (checkElement(el)) {
        addAllFieldsInQuery(el);
    } else {
        delAllFieldsInQuery(el);
    }
}

function addAllFieldsInQuery(el) {
    let tabBlock = el.closest(".table_view");
    let viewData = tabBlock.getElementsByClassName("viewData")[0];
    let child = viewData.children;
    let ik = child.length;
    for (let i = 0; i < ik; i++) {
        let itemEl = child[i];
        let sel = itemEl.getElementsByTagName("img")[0];
        if (sel.src.indexOf("check-sel") == -1) {
            addFieldsInQuery(sel);
            sel.src = "img/check-sel_1.png";
        }
    }
}

function delAllFieldsInQuery(el) {
    let tabBlock = el.closest(".table_view");
    let viewData = tabBlock.getElementsByClassName("viewData")[0];
    let child = viewData.children;
    let ik = child.length;
    for (let i = 0; i < ik; i++) {
        let itemEl = child[i];
        let sel = itemEl.getElementsByTagName("img")[0];
        if (sel.src.indexOf("check-sel") > -1) {
            delFieldsInQuery(sel);
            sel.src = "img/check-act.png";
        }
    }
}

function oneFieldTables(idTable, item, el) {
    let cont = newDOMelement('<div class="cont_f" style="float:left;width:100%;position:relative;height:' 
            + hItemListFieldsTable + 'px;overflow: hidden;border-bottom:1px solid #aaf;clear:both"></div>');
    cont.idTable = idTable;
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
    let selField = newDOMelement('<img onclick="selFieldInTable(this)" style="width:18px;cursor:pointer;height:18px;position:absolute;right:2px;top:3px;" src="img/check-act.png">');
    cont.appendChild(descr);
    cont.appendChild(selField);
}

function selFieldInTable(el) {
    if (checkElement(el)) {
        addFieldsInQuery(el);
    } else {
        delFieldsInQuery(el);
    }
    setViewAllImg(el);
}

function setViewAllImg(el) {
    let cont = el.closest(".viewData");
    let child = cont.children;
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
    let tabBlock = el.closest(".table_view");
    let viewData = tabBlock.getElementsByClassName("tab_title")[0];
    let sel = viewData.getElementsByTagName("img")[0];
    if (cMin == 0) {
        sel.src = "img/check-sel_1.png";
    } else {
        if (cPl == 0) {
            sel.src = "img/check-act.png";
        } else {
            sel.src = "img/check-sel-blur.png";
        }
    }
}

function addFieldsInQuery(el) {
    let cont = el.closest('.cont_f');
    let idTab = cont.idTable;
    let idF = cont.idField;
    let ik = listTablesForQuery.length;
    let itemTab = null;
    for (let i = 0; i < ik; i++) {
        itemTab = listTablesForQuery[i];
        if (itemTab.id_table == idTab) {
            let fields = itemTab.fields_table;
            let jk = fields.length;
            for (let j = 0; j < jk; j++) {
                let itemField = fields[j];
                if (itemField.id_field == idF) {
                    oneFieldView(idTab, itemField, queryFieldsData);
                    let ss = queryFieldsData.closest(".viewport");
                    ss.scroll_y.resize();
                    break;
                }
            }
            break;
        }
    }
}

function delFieldsInQuery(el) {
    let cont = el.closest('.cont_f');
    let idTab = cont.idTable;
    let idF = cont.idField;
    let fieldsView = queryFieldsData.children;
    let ik = fieldsView.length;
    for (let i = 0; i < ik; i++) {
        let vv = fieldsView[i];
        if (idTab == vv.idTable && idF == vv.idField) {
            vv.remove();
            let ss = queryFieldsData.closest(".viewport");
            ss.scroll_y.resize();
            break;
        }
    }
}

function oneFieldView(idTab, item, el) {
    let cont = newDOMelement('<div class="field" style="float:left;width:100%;position:relative;height:' 
            + hItemListFieldsTable + 'px;overflow: hidden;border-bottom:1px solid #aaf;clear:both"></div>');
    cont.idTable = idTab;
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



