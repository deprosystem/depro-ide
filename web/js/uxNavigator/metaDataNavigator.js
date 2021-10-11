
var listMetaHandlers = [
        {handl:"start", meta:[{name: "param", title:"Screen",len:150,type:"Text",valid:{latin:true}},
                    {name: "param_1", title:"Must be valid",len:150,type:"Text",br:true},
                    {name: "check", title:"Change enabled",type:"Check"},
                    {name: "after", title:"After",type:"Navig",after:true}]},
        {handl:"setVar", meta:[{name: "id", title:"The element to which the value is assigned",len:150,type:"SelectId"},
                    {name: "param", title:"Global variable name",len:150,type:"Text",valid:{latin:true},br:true},
                    {name: "param_1", title:"Variable list",len:200,type:"Text",valid:{list_var:true},br:true}]},
        {handl:"backOk", meta:[{name: "param", title:"Return parameter list",len:150,type:"Text",valid:{latin:true},br:true}]},
        {handl:"send", meta:[{name: "param", title:"Model",type:"Send"},
                    {name: "after", title:"After",type:"Navig",after:true}]},
        {handl:"springScale", meta:[{name: "id", title:"Element for animation",len:150,type:"SelectId"}]},
        {handl:"hide", meta:[{name: "id", title:"The element that is hidden",len:150,type:"SelectId"}]},
        {handl:"show", meta:[{name: "id", title:"The element that is shown",len:150,type:"SelectId"}]},
        {handl:"actual", meta:[{name: "id", title:"Component to be updated",len:150,type:"SelectIdUX"}]},
        {handl:"setValueParam", meta:[{name: "id", title:"The element to which the parameter value is assigned",len:150,type:"SelectId"}]},
        {handl:"assignValue", meta:[{name: "id", title:"The element to be assigned values",len:150,type:"SelectId"}]},
        {handl:"restoreVar", meta:[{name: "param", title:"The element that is shown",len:150,type:"Text",valid:{latin:true}}]},
        {handl:"addRecord", meta:[{name: "id", title:"The element to which the record is added",len:150,type:"SelectId",tags:"List"}]},
        {handl:"checked", meta:[{name: "after", title:"On navigator",type:"Navig"},
            {name: "nav_1", title:"Off navigator",type:"Navig"}]}
    ];

