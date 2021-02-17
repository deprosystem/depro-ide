var listTables = null;
var fieldsTable;
var descrTable;
var tableId;
var tablePosition;

let htmlTable = '<div style="height:40px;margin-left:20px">'
        +'<div style="float:left;margin-left:10px"><div style="color: #2228;font-size: 10px;margin-left:4px">Name table</div>'
        +'<input class="name_t input_style" onkeydown="return validName(event)" value="" type="text" size="14"/>'
        +'</div>'
        +'<div style="float:left;margin-left:10px"><div style="color: #2228;font-size: 10px;margin-left:4px">Description</div>'
        +'<input class="descr_t input_style" value="" type="text" size="14"/>'
        +'</div>'
    +'</div>';

function addTable() {
    fieldsTable = [];
    tableId = -1;
    descrTable = newDOMelement(htmlTable);
    editDataWind(metaTable, fieldsTable, cbAddTable, descrTable);
}

function cbAddTable(dat) {
    let nn = descrTable.getElementsByClassName("name_t")[0].value;
    let dd = descrTable.getElementsByClassName("descr_t")[0].value;
    if (nn != null && nn != "") {
        let ff = JSON.stringify(dat);
        let t = {id_table:tableId,id_project:currentProject.projectId,name_tab:nn,descr:dd,fields:ff};
        if (tableId == -1) {
            doServer("POST", "tables/descr", cbSaveTable, JSON.stringify(t));
        } else {
            doServer("POST", "tables/descr", cbChangeTable, JSON.stringify(t));
        }
    }
}

function cbSaveTable(res) {
    let it = JSON.parse(res);
    listTables.push(it);
    listTablesView.append(oneTableView(listTables.length - 1));
}

function cbChangeTable(res) {
    let it = JSON.parse(res);
    listTables.splice(tablePosition, 1, it);
    let viewEl = listTablesView.children[tablePosition];
    let st;
    if (it.descr == null || it.descr == "") {
        st = it.name_tab;
    } else {
        st = it.descr;
    }
    viewEl.innerHTML = st;
}

function editTable(i) {
    let item = listTables[i];
    fieldsTable = JSON.parse(item.fields);
    tableId = item.id_table;
    tablePosition = i;
    descrTable = newDOMelement(htmlTable);
    descrTable.getElementsByClassName("name_t")[0].value = item.name_tab;
    descrTable.getElementsByClassName("descr_t")[0].value = item.descr;
    editDataWind(metaTable, fieldsTable, cbAddTable, descrTable);
}
