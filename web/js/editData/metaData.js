var TYPE_TEXT = 0, TYPE_INT = 1, TYPE_FLOAT = 3, TYPE_BOOLEAN = 4, TYPE_SELECT = 5, TYPE_IMG = 6, ID_SELECT = 7, ID_SELECT_HANDL = 8;

var handlers = "start,back,backOk,actual,assignValue,setValueParam,setVar,restoreVar,hide,show,addRecord,delRecord"
var typeSource = "PARAM,SIZE,LOCALE,SYSTEM_TIME,GROUPP_PARAM,GLOBAL_VAR";

var metaPager = {titleForm:"Данные для TabLayout", description:
    [{name: "title", title:"Text tab",len:15},
    {name: "screen", title:"Screen",len:15,valid:{latin:true}}]
    }

var metaNavigator = {titleForm:"Navigator", description:
    [{name: "viewId", title:"Элемент",len:100,type:ID_SELECT_HANDL},
    {name: "handler", title:"Обработчик",len:100,type:TYPE_SELECT,select:handlers},
    {name: "param", title:"Парам",len:15,valid:{latin:true}},
    {name: "param_1", title:"Additions",len:17,valid:{latin:true}},
    {name: "id", title:"id",len:100,type:ID_SELECT},
    {name: "after", title:"After",type:TYPE_BOOLEAN,marg:20}]
    }
    
var metaInitData = {titleForm:"Navigator", description:
    [{name: "typeSource", title:"Data source",len:80,type:TYPE_SELECT,select:typeSource},
    {name: "viewId", title:"Элемент",len:100,type:ID_SELECT},
    {name: "param", title:"Парам",len:15},
    {name: "idComp", title:"Component id",len:100,type:ID_SELECT}]
    }
    
var metaNavigatorMenuB = {titleForm:"Navigator", description:
    [{name: "viewId", title:"Элемент",len:4,type:TYPE_INT},
    {name: "handler", title:"Обработчик",len:100,type:TYPE_SELECT,select:handlers},
    {name: "param", title:"Парам",len:15,valid:{latin:true}},
    {name: "id", title:"id",len:100,type:ID_SELECT},
    {name: "after", title:"After",type:TYPE_BOOLEAN,marg:20}]
    }
    
var metaMenu = {titleForm:"Menu", description:
    [{name: "icon", title:"Icon",len:20,type:TYPE_IMG,marg:5},
    {name: "title", title:"Title",len:20},
    {name: "screen", title:"Screen",len:8,valid:{latin:true}},
    {name: "start", title:"Start",type:TYPE_BOOLEAN,marg:15},
    {name: "divider", title:"Divider",type:TYPE_BOOLEAN,marg:20},
    {name: "badge", title:"Badge",len:12,valid:{latin:true}}]
    }
    
var metaModel = {titleForm:"Data formation", description:
    [{name: "name", title:"Name",len:20,valid:{latin:true}},
    {name: "type", title:"Type",len:70,type:TYPE_SELECT,select:"Text,Img,Int,Float,Time,Gallery,Boolean"},
    {name: "length", title:"Length",len:5,type:TYPE_INT},
    {name: "format", title:"Format",len:12},
    {name: "visibility", title:"Visibility",len:12},
    {name: "notShow", title:"not show",type:TYPE_BOOLEAN,marg:25}]
    }
    
function editDataWind(meta, data, obrSave, dopEl) {
    let windMenu = formWind(400, 300, 40, 550, meta.titleForm);
    let editDat = new EditData(meta.description, data, windMenu, obrSave, dopEl);
    windMenu.parentElement.style.width = (editDat.getWidthW() + 10) + "px";
    if (dopEl != null) {
        windMenu.parentElement.style.height = (dopEl.clientHeight + 300) + "px";
    }
}

function formMetaDataModel(dat) {
    let ik = dat.length;
    let res = [];
    for (let i = 0; i < ik; i++) {
        let item = dat[i];
        let tr;
        let lenF;
        if (item.length != null && item.length !=0) {
            lenF = item.length;
        } else {
            lenF = item.name.length;
        }
        let lenT = 0;
        switch (item.type) {
            case "Int":
                tr = TYPE_INT;
                lenT = 5;
                break;
            case "Float":
                tr = TYPE_FLOAT;
                lenT = 7;
                break;
            case "Boolean":
                tr = TYPE_BOOLEAN;
                break;
            case "Text":
                tr = TYPE_TEXT;
                lenT = 25;
                break;
            case "Img":
                tr = TYPE_TEXT;
                lenT = 40;
                break;
            default:
                tr = TYPE_TEXT;
                lenT = 15;
        }
        if (lenF < lenT) {
            lenF = lenT;
        }
        let itemRes = {name:item.name,title:item.name,type:tr,len:lenF};
        res.push(itemRes);
    }
    return res;
}