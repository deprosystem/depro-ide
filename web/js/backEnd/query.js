// type_query 0 - SELECT,  1 - INSERT, 

var hTitleQuery = 24;
var wFieldQuery = 180;
var wTableInQuery = 197;
var wOperQuery = 32;
var wraperQuery;
var selectQueryEl;
var footerQuery;
var queryTables, queryFields, queryFieldsData, queryQueryData, queryOrder;
var queryFieldsOrderView;
var errorQuery;
//var qqqQQQ;

function editQueryWind() {
    let hFooter = 150;
//    let hTitleQuery = 24;
    let hTitleQuery_2 = hTitleQuery + 2;
    selectQueryEl = null;
    wFieldQuery = 180;
    listTablesForQuery.length = 0;
    let title = '<div style="height:' + hTitleQuery + 'px;border-bottom:1px solid #1dace9;border-top:1px solid #1dace9">'
            +'<div style="width:' + wFieldQuery + 'px;text-align:center;margin-top:3px;float:left;font-size:14px;">Fields</div>'
            +'<div style="height:100%;width:1px;background-color:#1dace9;float:left"></div>'
            +'<div style="text-align:center;margin-top:3px;float:left;margin-left:30px;font-size:14px;">Tables</div>'
            +'</div>';
    let titleWhere = '<div style="height:' + hTitleQuery + 'px;border-bottom:1px solid #1dace9;">'
            +'<div style="margin-top:3px;float:left;margin-left:' + wFieldQuery + 'px;font-size:14px;">Where</div>'
            +'</div>';
    let footer = '<div style="position:absolute;;border-top:1px solid #1dace9;left:0;bottom:0;right:0;height:' + hFooter +'px"></div>';
//    let fields = '<div style="position:absolute;;border-right:1px solid #1dace9;left:0;top:' + hTitleQuery_2 + 'px;width:' + wFieldQuery + 'px;bottom:' + hFooter +'px"></div>';
    let fields = '<div style="position:absolute;;border-right:1px solid #1dace9;left:0;top:' + hTitleQuery_2 + 'px;width:' + wFieldQuery + 'px;bottom:' + (hFooter + 1) +'px"></div>';
    let tables = '<div style="position:absolute;;top:' + hTitleQuery_2 + 'px;left:' + (wFieldQuery + 1) + 'px;bottom:' + (hFooter + 1) +'px;right:0"></div>';
    
    let wind = formWind(800, 590, 40, 250, "Forming a request");
    
    let controll = createFooter(50);
    addFooter(wind, controll);
    let buttonSave = createButtonBlue('Save', 70);
    buttonSave.addEventListener("click", function(){saveQuery();closeWindow(wind);}, true);
    controll.appendChild(buttonSave);
    let buttonCancel = createButtonWeite('Cancel', 70);
    buttonCancel.addEventListener("click", function(event){closeWindow(wind);}, true);
    controll.appendChild(buttonCancel);
    
    let windMenu = newDOMelement('<div style="position:absolute;top:0;left:0;right:0;bottom:50px"></div>');
    wind.appendChild(windMenu);
    let titleEl = newDOMelement(title);
    let addTab = newDOMelement('<img style="margin-top:4px;margin-left:25px;float:left;cursor:pointer;" width="16" height="16" src="img/add_blue.png">');
    let order = newDOMelement('<img style="margin-top:6px;margin-right:15px;float:right;cursor:pointer;" width="12" height="12" src="img/sort-2.png">');
    titleEl.appendChild(addTab);
    titleEl.appendChild(order);
    windMenu.appendChild(titleEl);
    
    let footerEl = newDOMelement(footer);
    footerQuery = footerEl;
    windMenu.appendChild(footerEl);
    let titleWhereEl = newDOMelement(titleWhere);
    footerEl.appendChild(titleWhereEl);
    let addWhere = newDOMelement('<img class="addWhere" style="margin-top:4px;margin-left:25px;display:none;float:left;cursor:pointer;" width="16" height="16" src="img/add_blue.png">');
    addWhere.addEventListener("click", function(){
        addWhereForQuery();
    }, true);
    titleWhereEl.appendChild(addWhere);
    wraperQuery = newDOMelement('<div class="wraperQuery" style="position:absolute;top:' + (hTitleQuery + 1) + 'px;left:0;right:0;bottom:0"></div>')
    footerEl.appendChild(wraperQuery);
    let scrollQu = formViewScrolY(wraperQuery);
    queryQueryData = scrollQu.getElementsByClassName("viewData")[0];
    
    queryFields = newDOMelement(fields);
    windMenu.appendChild(queryFields);
    queryTables = newDOMelement(tables);
    windMenu.appendChild(queryTables);
    order.addEventListener("click", function(){
        setOrderForQuery();
    }, true);
    addTab.addEventListener("click", function(){
        addTableForQuery();
    }, true);
    
    let fieldsport = document.createElement('div');
    fieldsport.className = "viewport";
    fieldsport.style.left = "3px";
    fieldsport.style.top = "0px";
    queryFields.appendChild(fieldsport);
    
    let fieldsContent = document.createElement('div');
    fieldsContent.className = "content";
    fieldsport.appendChild(fieldsContent);
    
    queryFieldsData = document.createElement('div');
    fieldsContent.appendChild(queryFieldsData);
    
    let scrollFields = new ScrollY(fieldsport, true);
    scrollFields.setScrollHide(true);
    scrollFields.init();
    
    if (queryOrder == null) {
        queryOrder = [];
    } else {
        queryOrder.length = 0;
    }
    
    if (listTables != null) {
        setQueryValue();
    } else {
        hostDomain = currentProject.host;
        hostDescr = currentProject.whereServer;
        if (hostDomain != null && hostDomain.length > 0  && hostDescr != "Third party API") {
           doServerAlien("GET", hostDomain + 'tables/list', cbGetListTablesQuery);
        }
    }
    
//console.log("WWWWW="+wind.innerHTML);
}

function setOrderForQuery() {
    let wFields = 180;
    let contWind = formWind(wFields + wFields + 15, 400, 40, 650, "Sorting", false, null, "Save", saveSorting);
    let tit = newDOMelement('<div style="height:' + hTitleQuery + 'px;border-top:1px solid #1dace9;border-bottom:1px solid #1dace9;position:absolute;left:0;top:0;right:0">'
            +'<div style="float:left;margin-top:4px;margin-left:15px;width:' + wFields + 'px;">Selected query fields</div>'
            +'<div style="float:left;margin-top:4px;">Sort fields</div></div')
    contWind.appendChild(tit);
    let contOrd = newDOMelement('<div style="position:absolute;top:' + (hTitleQuery + 1) + 'px;left:0;bottom:0;right:0;"></div>');
    contWind.appendChild(contOrd);
    let fields = newDOMelement('<div style="position:absolute;top:0;left:5px;bottom:0;width:' + wFields + 'px;border-right:1px solid #1dace9"></div>');
    contOrd.appendChild(fields);
    queryFieldsOrderView = newDOMelement('<div style="position:absolute;top:0;left:' + (10 + wFields) + 'px;bottom:0;width:' + wFields + 'px;"></div>');
    contOrd.appendChild(queryFieldsOrderView);
    let viewPort = formViewScrolY(fields);
    let fieldsData = viewPort.querySelector(".viewData");
    let aaa = queryFieldsData.innerHTML;
    fieldsData.innerHTML = aaa;
    let fieldsC = fieldsData.children;
//    let fieldsC = fields.children;
    let ik = fieldsC.length;
    let listFields = [];
    for (let i = 0; i < ik; i++) {
        let ffI = fieldsC[i];
        ffI.style.cursor = "pointer";
        let nameFfI = ffI.querySelector(".name").innerHTML;
        listFields.push(nameFfI);
        ffI.addEventListener("click", function(event){
            let ffCl = event.target.closest('.field');
            let nn = ffCl.querySelector(".name").innerHTML;
            let ffO = fieldForOrder(nn, 'order_az.png');
            queryFieldsOrderView.appendChild(ffO);
        }, true);
    }
    viewPort.scroll_y.resize();
    ik = queryOrder.length;
    let jk = listFields.length;
    for (let i = 0; i < ik; i++) {
        let it = queryOrder[i];
        let nameF = it.nameF;
        let ordF = it.ordF;
        if (ordF != 0) {
            let noIs = true;
            for (j = 0; j < jk; j++) {
                if (listFields[j] == nameF) {
                    let srcOrd = 'order_az.png';
                    if (ordF == 2) {
                        srcOrd = 'order_za.png';
                    }
                    let ffOrd = fieldForOrder(nameF, srcOrd);
                    queryFieldsOrderView.appendChild(ffOrd);
                    noIs = false;
                    break;
                }
            }
            if (noIs) {
                it.ordF = 0;
            }
        }
    }
}

function fieldForOrder(name, src) {
    let res = newDOMelement('<div class="fieldOrd" style="width:100%;height:' + hTitleQuery + 'px;border-bottom:1px solid #1dace9"></div>');
    let nn = newDOMelement('<div class="name" style="float:left;margin-left:4px;margin-top:4px">' + name + '</div>');
    res.appendChild(nn);
    let del = newDOMelement('<img onclick="delOrd(this)" style="margin-top:6px;float:right;margin-right:7px;cursor:pointer;" width="10" height="10" src="img/del_red.png">')
    res.appendChild(del);
    let arrT = newDOMelement('<img onclick="liftUpOrd(this)" style="margin-top:5px;float:right;margin-right:7px;cursor:pointer;" width="12" height="12" src="img/arrow_top.png">')
    res.appendChild(arrT);
    let ord = newDOMelement('<img class="typeOrd" onclick="typeOrd(this)" style="margin-top:4px;float:right;margin-right:7px;cursor:pointer;" width="14" height="14" src="img/' + src + '">')
    res.appendChild(ord);
    return res;
}

function typeOrd(el) {
    if (el.src.indexOf("order_za") == -1) {
        el.src = "img/order_za.png"
    } else {
        el.src = "img/order_az.png"
    }
}

function liftUpOrd(el) {
    let view = el.closest(".fieldOrd");
    if (view.previousElementSibling != null) {
        view.previousElementSibling.before(view);
    }
}

function delOrd(el) {
    el.parentElement.remove(el);
}

function saveSorting() {
    let childOrd = queryFieldsOrderView.children;
    let ik = childOrd.length;
    if (queryOrder == null) {
        queryOrder = [];
    } else {
        queryOrder.length = 0;
    }
    for (let i = 0; i < ik; i++) {
        let viewF = childOrd[i];
        let nn = viewF.querySelector(".name").innerHTML;
        let src = viewF.querySelector(".typeOrd").src;
        let ord = 1;
        if (src.indexOf("order_za") > -1) {
            ord = 2;
        }
        queryOrder.push({nameF:nn,ordF:ord});
    }
}

function addWhereForQuery(item) {
    let itemParam = "";
    let itemOper = "";
    let itemAndOr = "";
    if (item != null) {
        itemParam = item.param;
        itemOper = item.oper;
        itemAndOr = item.addOr;
    }
    let qu = '<div class="one_query" onclick="selectQuery(this);" style="height:' + hTitleQuery + 'px;border-bottom:1px solid #1dace9;width:100%"></div>';
    let quEl = newDOMelement(qu);
    let and_or = newDOMelement('<div class="and_or" style="float:left;width:' + wOperQuery + 'px;border-right:1px solid #1dace9;height:100%"></div>');
    quEl.appendChild(and_or);
//{addOr:andOrValue,param:paramValue,oper:selOperValue,list:listFieldInTab}
    let quParam = newDOMelement('<div class="div_param" style="float:left;width:' + (wFieldQuery - wOperQuery - wOperQuery - 2) 
            + 'px;border-right:1px solid #1dace9;height:100%"></div>');
    inputValue = newDOMelement('<input class="value_qu" value="' + itemParam + '" type="text" style="width:' + (wFieldQuery - wOperQuery - wOperQuery - 8) 
            + 'px;margin-top:3px;margin-left:2px;border:none;background-color:#0000;"/>');
    quParam.appendChild(inputValue);
    quEl.appendChild(quParam);
    let oper_param = newDOMelement('<div class="oper_param" style="float:left;width:' + wOperQuery + 'px;border-right:1px solid #1dace9;height:100%"></div>');
    quEl.appendChild(oper_param);
    let delQu = newDOMelement('<img class="delQu" onclick="delQuery(this)" style="margin-top:3px;float:right;margin-right:2px;cursor:pointer;" width="16" height="16" src="img/close-o.png">');
    quEl.appendChild(delQu);
    let selectOper = formSelectForEditData("=,<,>,<=,>=,LIKE",itemOper);
    selectOper.className = "operF";
    selectOper.style.cssText = 'border:none;width:100%;background:#0000;text-indent:unset;text-overflow:unset;font-size:11px;text-align:center;margin-top:4px';
    oper_param.appendChild(selectOper);

    if (queryQueryData.children != null && queryQueryData.children.length > 0) {
        if (itemAndOr != "") {
            let selectAndOr = formSelectForEditData("AND,OR,NOT", itemAndOr);
            selectAndOr.className = "operAndOr";
            selectAndOr.style.cssText = 'border:none;width:100%;background:#0000;text-indent:unset;text-overflow:unset;font-size:11px;text-align:center;margin-top:4px';
            and_or.appendChild(selectAndOr);
        } else {

        }
    }
    let ik = listTablesForQuery.length;
    for (let i = 0; i < ik; i++) {
        addViewForTableInQuery(i, quEl);
    }
    
    queryQueryData.appendChild(quEl);
    if (selectQueryEl != null) {
        selectQueryEl.style.backgroundColor = "";
    }
    selectQueryEl = quEl;
    quEl.style.backgroundColor = "#f3f8ff";
    if (item != null) {
        ik = item.list.length;
        let ccc = queryQueryData.children;
        for (let i = 0; i < ik; i++) {
            itTab = item.list[i];
            let tab = getTabForQuery(itTab.id_table);
            if (tab != null) {
                let ff = getFieldInTable(itTab.id_field, tab);
                if (ff != null) {
                    setFieldInQueryParam(itTab.id_table, ff.id_field, ff.name, ff.type);
                } else {
                    errorQuery = true;
                }
            } else {
                errorQuery = true;
            }
        }
    }
    let scr = queryQueryData.closest('.viewport');
    scr.scroll_y.resize();
    if (errorQuery) {
        dialogError("Caution!", "Data change affected this request");
    }
}

function addViewForTableInQuery(i, quEl) {
    let item = listTablesForQuery[i];
    let divWhereForTab = newDOMelement('<div class="table" style="float:left;width:' + wTableInQuery 
            + 'px;display:flex;flex-direction:row;align-items:center;border-right:1px solid #1dace9;height:100%"></div>');
    let field = newDOMelement('<div class="field" style="margin-left:3px"></div>');
    divWhereForTab.appendChild(field);
    divWhereForTab.id_table = item.id_table;
    divWhereForTab.name_table = item.name_table;
    quEl.appendChild(divWhereForTab);
}

function setFieldInQuery(el) {
    let cont = el.closest(".cont_f");
    let idTab = cont.idTable;
    let idField = cont.idField;
    let name = cont.name_field;
    
    setFieldInQueryParam(idTab, idField, name, cont.type_field);
}

function setFieldInQueryParam(idTab, idField, nameField, typeField) {
    let ik = listTablesForQuery.length;
    let iRes = -1;
    for (let i = 0; i < ik; i++) {
        let item = listTablesForQuery[i];
        if (idTab == item.id_table) {
            iRes = i;
            break;
        }
    }
    if (iRes > -1 && selectQueryEl != null) {
        let listTab = selectQueryEl.getElementsByClassName("table");
        if (iRes < listTab.length) {
            let item = listTab[iRes];
            item.id_field = idField;
            item.name = nameField;
            item.type = typeField;
            let elFieldQu = item.getElementsByClassName("field")[0];
            elFieldQu.innerHTML = nameField;
        }
    }
}

function selectQuery(el) {
    if (selectQueryEl != el) {
        if (selectQueryEl != null) {
            selectQueryEl.style.backgroundColor = "";
        }
        selectQueryEl = el;
        selectQueryEl.style.backgroundColor = "#f3f8ff";
    }
}

function cbGetListTablesQuery(res) {
    listTables = JSON.parse(res);
    setQueryValue();
}

function delQuery(el) {
    let qu = el.closest('.one_query');
    qu.remove();
}

function saveQuery() {
    let childTab = queryTables.children;
    let ik = childTab.length;
    let manyTables = false;
    if (ik == 0) return;
    if (ik > 1) {
        manyTables = true;
    }
    let res = [];
    let tables = "";
    let sepT = "";
    let fields = "";
    let sepF = "";
    let data = [];
    let itemData;
    let alias;
    let aliasForF;
    let schema = currentProject.resurseInd;
    for (let i = 0; i < ik; i++) {
        viewTabI = childTab[i];
        let name_table = viewTabI.name_table;
        let id_tab = viewTabI.id_table;
        let tab = gatTableById(id_tab);
        let listField = null;
        if (tab != null) {
            listField = JSON.parse(tab.fields_table);
        }
        alias = "";
        aliasForF = "";
        if (manyTables) {
            alias = " AS _t_" + i;
            aliasForF = "_t_" + i + ".";
        }
        tables += sepT + schema + "." + name_table + alias;
        sepT = ", ";
        let tt = viewTabI.getElementsByClassName("tab_title")[0];
        let selTab = tt.getElementsByTagName("img")[0];
        let cf;
        if (selTab.src.indexOf("act") > -1) {
            cf = 0;
        } else if (selTab.src.indexOf("blur") > -1) {
            cf = 1;
        } else {
            cf = 2;
            fields += sepF + aliasForF + "*";
            sepF = ", ";
            if (listField != null) {
                let zk = listField.length;
                for (z = 0; z < zk; z++) {
                    let itF = listField[z];
                    if (itF.type != "Serial") {
                        itemData = {name:itF.name,type:itF.type};
                        data.push(itemData);
                    }
                }
            }
        }
        let lF = [];
        if (cf == 1) {
            let ff = viewTabI.getElementsByClassName("viewData")[0];
            let childField = ff.children;
            let jk = childField.length;
            for (let j = 0; j < jk; j++) {
                let it = childField[j];
                if (it.getElementsByTagName('img')[0].src.indexOf("act") < 0) {
                    lF.push(it.idField);
                    fields += sepF + it.name_field;
                    if (it.type_field != "Serial") {
                        itemData = {name:it.name_field,type:it.type_field};
                        data.push(itemData);
                    }

                    sepF = ", ";
                }
            }
        }
        resOneTab = {id_table:viewTabI.id_table,fullness:cf,listFields:lF};
        res.push(resOneTab);
    }
    let SQL = "SELECT " + fields + " FROM " + tables;
    let qu;
    currentComponentDescr.model.data[0] = data;
    let url = currentComponentDescr.model.url;
    if (url != null && url != "") {
        url = "" + url;
        let ar = url.split("/")
        if (ar.length > 1) {
            qu = parseInt(ar[2]);
        } else {
            qu = parseInt(url);
        }
    } else {
        qu = -1;
    }
// Query

//console.log("qqqQQQ="+qqqQQQ.innerHTML);

    let queryChild = queryQueryData.children;
    ik = queryChild.length;
    let where_query = "";
    let strParam = "";
    let sepStrPar = "";
    let queryForSave = [];
//console.log("saveQuery ik="+ik);
    for (let i = 0; i < ik; i++) {
        let itemQ = queryChild[i];
//console.log("saveQuery CLAS itemQ="+itemQ.className+"<< INER="+itemQ.innerHTML);
        let childQ = itemQ.children;
        let onlyTab = itemQ.getElementsByClassName("table");
        let jk = onlyTab.length;
        let listFieldInTab = [];
        for (let j = 0; j < jk; j++) {
            let item = onlyTab[j];
            if (item.id_field != null) {
                let ff = {id_table:item.id_table,id_field:item.id_field,name:item.name,type:item.type,position:j};
                listFieldInTab.push(ff);
            }
        }
        let oneQuery;
        jk = listFieldInTab.length;
        
        let selOper = itemQ.getElementsByClassName("operF")[0];
        let selOperValue = selOper.options[selOper.selectedIndex].value;
        let selAndOr = itemQ.getElementsByClassName("operAndOr")[0];
        let sepQ = " WHERE ";
        let andOrValue = "";
        if (selAndOr != null) {
            andOrValue = selAndOr.options[selAndOr.selectedIndex].value;
            sepQ = " " + andOrValue + " ";
        }
        let div_par = itemQ.getElementsByClassName("div_param")[0];
        let inp_val = div_par.getElementsByTagName('input')[0];
        let val = inp_val.value;
        let paramValue = val;
        if (jk > 0) {
            let it_0 = listFieldInTab[0];
            let nameT_0 = "";
            if (manyTables) {
                nameT_0 = "_t_" + it_0.position + ".";
            }
            if (jk == 2) {
                let it_1 = listFieldInTab[1];
                let nameT_1 = "";
                if (manyTables) {
                    nameT_1 = "_t_" + it_1.position + ".";
                }
                oneQuery = nameT_0 + it_0.name + " " + selOperValue + " " + nameT_1 + it_1.name;
                where_query += sepQ + oneQuery;
            } else {
                if (val == null || val.length == 0) {
                    val = "%" + it_0.name + "%";
                    strParam += sepStrPar + it_0.name;
                    sepStrPar = ",";
                }
                let valQu = addQuote(it_0.type, val);
                oneQuery =  valQu + " " + selOperValue + " " + nameT_0 + it_0.name;
                where_query += sepQ + oneQuery;
            }
            queryForSave.push({addOr:andOrValue,param:paramValue,oper:selOperValue,list:listFieldInTab});
        }
    }
    SQL += where_query;
//   ORDER BY

    let fieldsC = queryFieldsData.children;
    ik = fieldsC.length;
    let listFields = [];
    for (let i = 0; i < ik; i++) {
        let ffI = fieldsC[i];
        let nameFfI = ffI.querySelector(".name").innerHTML;
        listFields.push(nameFfI);
    }
    ik = queryOrder.length;
    let jk = listFields.length;
    let order_query = "";
    let sepOrd = "";
    for (let i = 0; i < ik; i++) {
        let it = queryOrder[i];
        let nameF = it.nameF;
        let ordF = it.ordF;
        if (ordF != 0) {
            for (j = 0; j < jk; j++) {
                if (listFields[j] == nameF) {
                    let ordSort = "";
                    if (ordF == 2) {
                        ordSort = ' DESC';
                    }
                    order_query += sepOrd + nameF + ordSort;
                    sepOrd = ", "
                    break;
                }
            }
        }
    }
    if (order_query.length > 0) {
        SQL += " ORDER BY " + order_query;
    }
    let origin_query = {fieldTable:res,where:queryForSave,order:queryOrder};
    currentComponentDescr.model.param = strParam;
    let original = JSON.stringify(origin_query);
    let nam = currentScreen.screenName + "_" + currentComponent.viewId;
    let dat = {id_query:qu,name_query:nam,type_query:0,origin_query:original,sql_query:SQL,param_query:strParam};
    doServerAlien("POST", hostDomain + "query/create", cbQueryCreate, JSON.stringify(dat));
}

function addQuote(type, val) {
    switch (type) {
        case "Serial":
        case "Bigserial":
        case "Long":
        case "Int":
        case "Float":
        case "Boolean":
            return val;
        case "Text":
        case "Select":
            return "'" + val + "'";
        case "Date":
            if (val.toUpperCase() == "CURRENT_DATE") {
                return "CURRENT_DATE";
            } else {
                return "'" + val + "'";
            }
    }
}

function gatTableById(id) {
    let ik = listTables.length;
    for (let i = 0; i < ik; i++) {
        let item = listTables[i];
        if (item.id_table == id) {
            return item;
        }
    }
    return null;
}

function cbQueryCreate(res) {
    let dat = JSON.parse(res);
    if (dat.id_query != null) {
        currentComponentDescr.model.url = "query/" + currentProject.resurseInd + "/" + dat.id_query;
    }
}

function setQueryValue() {
    let url = currentComponentDescr.model.url;
    if (url != null && url != "") {
        let qu;
        url = "" + url;
        let ar = url.split("/")
        if (ar.length > 1) {
            qu = parseInt(ar[2]);
        } else {
            qu = parseInt(url);
        }
        doServerAlien("GET", hostDomain + "query/get?id=" + qu , cbQueryValue);
    }
}

function cbQueryValue(res) {
    errorQuery = false;
    if (queryOrder == null) {
        queryOrder = [];
    } else {
        queryOrder.length = 0;
    }
    let ik;
    let query = JSON.parse(res);
    let originQuery = JSON.parse(query.origin_query);
    if (originQuery.fieldTable != null) {
        let origin = originQuery.fieldTable;
        ik = origin.length;
        let item;
        for (let i = 0; i < ik; i++) {
            item = origin[i];
            let tab = getTabInQuery(item.id_table);
            if (tab != -1) {
                formTableForQuery(tab);
                let bb = queryTables.getElementsByClassName("table_view");
                let bbL = bb.length;
                if (bbL > 0) {
                    let blockTab = bb[bbL - 1];
                    let rr = blockTab.getElementsByClassName('tab_title')[0];
                    let imgAll = rr.getElementsByTagName('img')[0];
                    if (item.fullness == 2) {
                        checkAllFieldsInQuery(blockTab);
                        imgAll.src = "img/check-sel_1.png";
                    } else if (item.fullness == 1) {
                        checkSelFieldsInQuery(blockTab, item.listFields);
                        imgAll.src = "img/check-sel-blur.png";
                    }
                }
            } else {
                errorQuery = true;
            }
        }
    }
    if (originQuery.where != null) {
        let where = originQuery.where;
        ik = where.length;
        for (let i = 0; i < ik; i++) {
            item = where[i];
            addWhereForQuery(item);
        }
    }
    let ord = originQuery.order;
    if (ord != null) {
        ik = ord.length;
        for (let i = 0; i < ik; i++) {
            queryOrder.push(ord[i]);
        }
    }
}

function getTabInQuery(id) {
    let ik = listTables.length;
    for (i = 0; i < ik; i++) {
        let item = listTables[i];
        if (item.id_table == id) {
            return i;
        }
    }
    return -1;
}

function getTabForQuery(id) {
    let ik = listTablesForQuery.length;
    for (i = 0; i < ik; i++) {
        let item = listTablesForQuery[i];
        if (item.id_table == id) {
            return item;
        }
    }
    return null;
}

function getFieldInTable(id, tab) {
    let fields = tab.fields_table;
    let ik = fields.length;
    for (i = 0; i < ik; i++) {
        let item = fields[i];
        if (item.id_field == id) {
            return item;
        }
    }
    return null;
}

function checkAllFieldsInQuery(el) {
    let viewData = el.getElementsByClassName("viewData")[0];
    let child = viewData.children;
    let ik = child.length;
    for (let i = 0; i < ik; i++) {
        let itemEl = child[i];
        let sel = itemEl.getElementsByTagName("img")[0];
        addFieldsInQuery(sel);
        sel.src = "img/check-sel_1.png";
    }
}

function checkSelFieldsInQuery(el, fields) {
    let viewData = el.getElementsByClassName("viewData")[0];
    let child = viewData.children;
    let ik = child.length;
    for (let i = 0; i < ik; i++) {
        let itemEl = child[i];
        if (isFieldInList(itemEl.idField, fields)) {
            let sel = itemEl.getElementsByTagName("img")[0];
            addFieldsInQuery(sel);
            sel.src = "img/check-sel_1.png";
        }
    }
}

function isFieldInList(id, fields) {
    let ik = fields.length;
    for (let i = 0; i < ik; i++) {
        if (fields[i] == id) {
            return true;
        }
    }
    return false;
}