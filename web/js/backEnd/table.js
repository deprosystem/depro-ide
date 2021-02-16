var fieldsTable;

let descTable = '<div style="height:40px;margin-left:20px">'
        +'<div style="float:left;margin-left:10px"><div style="color: #2228;font-size: 10px;margin-left:4px">Name table</div>'
        +'<input class="title_screen input_style" onkeyup="return clickUpTitle(event)" value="" type="text" size="14"/>'
        +'</div>'
        +'<div style="float:left;margin-left:10px"><div style="color: #2228;font-size: 10px;margin-left:4px">Description</div>'
        +'<input class="title_screen input_style" onkeyup="return clickUpTitle(event)" value="" type="text" size="14"/>'
        +'</div>'
    +'</div>';

function addTable() {
    fieldsTable = [];
    let dop = newDOMelement(descTable);
    editDataWind(metaTable, fieldsTable, cbSaveDataModel, dop);
}