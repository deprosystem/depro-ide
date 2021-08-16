
var listMetaUI = [
        {el:"uiSwitch", meta:[
                {name: "", title:"Track options",len:150,type:"Label"},
                {name: "param_1", title:"Must be valid",len:150,type:"Text",br:true},
                {name: "check", title:"Change enabled",type:"Check"}]},
        {el:"uiCheckbox", meta:[
                {name: "id", title:"The element to which the value is assigned",len:150,type:"SelectId"},
                {name: "param", title:"Global variable name",len:150,type:"Text",valid:{latin:true},br:true},
                {name: "param_1", title:"Variable list",len:200,type:"Text",valid:{list_var:true},br:true}]}
    ];
