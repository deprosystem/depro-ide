var metaTable = {titleForm:"Description Table", description:
    [{name: "name", title:"Name",len:20,valid:{name_low:true}},
    {name: "type", title:"Type",len:70,type:TYPE_SELECT,select:"Text,Img,Int,Float,Time,Gallery,Boolean"},
    {name: "length", title:"Length",len:5,type:TYPE_INT},
    {name: "def", title:"Default value",len:20},
    {name: "format", title:"Format",len:10},
    {name: "not_null", title:"Not NULL",type:TYPE_BOOLEAN,marg:25},
    {name: "index", title:"Index",type:TYPE_BOOLEAN,marg:15},
    {name: "key", title:"Key",type:TYPE_BOOLEAN,marg:10}]
    }