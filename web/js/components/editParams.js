
var paramToolBar = '<div style="display: inline-block; vertical-align: top; margin-right: 5px">img back</div>'
            +'<img class="img_back img_style" onclick="setImgBack()" width="24" height="24">'
            +'<div style="margin-left: 5px; display: inline-block; vertical-align: top; margin-right: 5px">hamburger</div>'
            +'<img class="img_hamburger img_style" onclick="setImgHamburg()" width="24" height="24">';

var methodModel = '<div><select class="model_method" onchange="changeMethod(this)"><option>GET</option><option>POST</option><option>TEST</option></select>'
            +'<div class="test" onclick="formTestData(this)" style="display:none;vertical-align:top;cursor:pointer;;margin-left:20px">Formation of test data</div>'
        +'</div>';

var modelList = '<div style="margin-top: 2px">'
            +'<input class="title url" size="25" onkeyup="return clickUpURL(event)" placeholder="URL" type="text" style="margin-left: 20px; vertical-align: top;"/>'
            +'<input class="title param" onchange="changeUrlParam(this.value)" placeholder="URL parameters" type="text" style="margin-left: 5px; vertical-align: top;"/>'
            +'<div onclick="editDataModel()" style="display: inline-block; vertical-align: top; cursor:pointer;margin-left: 20px">Formation of data</div>'
            +'<div style="display: inline-block; vertical-align: top;margin-left: 20px">create view</div>'
            +'<img onclick="createViewForListH()" style="margin-left:10px;cursor:pointer;" width="24" height="24" src="img/horisont.png">'
            +'<img onclick="createViewForListV()" style="margin-left:10px;cursor:pointer;" width="24" height="24" src="img/vert.png">'
            +'<div onclick="navigatorCompon()" style="display: inline-block; vertical-align: top;cursor:pointer;margin-left: 20px">Navigator</div>'
        +'</div>'
var paramPanel = '<div style="margin-top: 2px">'
            +'<input class="title url" size="25" onkeyup="return clickUpURL(event)" placeholder="URL" type="text" style="margin-left: 20px; vertical-align: top;"/>'
            +'<input class="title param" onchange="changeUrlParam(this.value)" placeholder="URL parameters" type="text" style="margin-left: 5px; vertical-align: top;"/>'
            +'<div onclick="editDataModel()" style="display: inline-block; vertical-align: top; cursor:pointer;margin-left: 20px">Formation of data</div>'
            +'<div onclick="createViewForPanel()" style="display: inline-block; vertical-align: top;cursor:pointer;margin-left: 20px">create view</div>'
            +'<div onclick="navigatorCompon()" style="display: inline-block; vertical-align: top; cursor:pointer;margin-left: 20px">Navigator</div>'
        +'</div>'
var paramPager = '<div style="margin-top: 2px">'
            +'<div style="display:inline-block;vertical-align: top;margin-left:20px;">Assign a TabLayout</div>'
            +'<div class="select_tab" style="display: inline-block;margin-left:10px"></div>'
        +'</div>';
var paramTab = '<div style="margin-top: 2px">'
            +'<div onclick="createDataTab()" style="display: inline-block;vertical-align: top;cursor:pointer;margin-left:20px">Formation of data</div>'
        +'</div>';
var paramMap = '<div style="margin-top: 2px">'
            +'<input class="title url" size="25" onkeyup="return clickUpURL(event)" placeholder="URL" type="text" style="margin-left: 20px; vertical-align: top;"/>'
            +'<input class="title param" onchange="changeUrlParam(this.value)" placeholder="URL parameters" type="text" style="margin-left: 5px; vertical-align: top;"/>'
            +'<div onclick="editDataModel()" style="display: inline-block; vertical-align: top; cursor:pointer;margin-left: 20px">Formation of data</div>'
            +'<div style="display: inline-block; vertical-align: top;margin-left: 20px">create view</div>'
            +'<img onclick="createSheetBottomH()" style="margin-left:10px;cursor:pointer;" width="24" height="24" src="img/horisont.png">'
            +'<img onclick="createSheetBottomV()" style="margin-left:10px;cursor:pointer;" width="24" height="24" src="img/vert.png">'
            +'<div onclick="navigatorCompon()" style="display: inline-block; vertical-align: top; cursor:pointer;margin-left: 20px">Navigator</div>'
            
            +'<br><div style="display: inline-block; vertical-align: top;margin-left:20px;margin-right: 5px">my Marker</div>'
            +'<img class="my_marker img_style" onclick="setMyMarker()" width="24" height="24">'
            +'<div style="margin-left: 5px; display: inline-block; vertical-align: top; margin-right: 5px">marker</div>'
            +'<img class="marker img_style" onclick="setMarker()" width="24" height="24">'
    
            +'<br><div style="display:inline-block;vertical-align: top;margin-left:20px">Map center coordinates: longitude</div>'
            +'<input class="long" size="10" onkeydown="return editFloat(event)" onchange="changeLongitude(this)" type="text" style="margin-left:5px;vertical-align:top;"/>'
            +'<div style="display: inline-block;vertical-align: top;margin-left:10px">latitude</div>'
            +'<input class="lat" size="10" onkeydown="return editFloat(event)" onchange="changeLatitude(this)" type="text" style="margin-left:5px;vertical-align:top;"/>'
            +'<div style="display: inline-block;vertical-align: top;margin-left:10px">levelZoom</div>'
            +'<input class="zoom" size="7" onkeydown="return editFloat(event)" onchange="changeLevelZoom(this)" type="text" style="margin-left:5px;vertical-align:top;"/>'
            
            +'<br><label class="target_but" style="margin-left: 20px; vertical-align:center;">Target button:<input onchange = "checkTargetBut(this);" type="checkbox" style="vertical-align:middle;"></label>'
            +'<label class="zoom_but" style="margin-left: 10px; vertical-align:center;">Zoom buttons:<input onchange = "checkZoomBut(this);" type="checkbox" style="vertical-align:middle;"></label>'
        +'</div>';
var paramDrawer = '<div style="margin-top: 2px">'
            +'<input class="title drawer_fragm" onkeyup="return clickUpDrawer(event)" placeholder="Drawer fragment name" type="text" style="margin-left: 20px; vertical-align: top;"/>'
            +'<label class="tool_drawer" style="margin-left: 10px; vertical-align:center;">Tool bar in drawer:<input onchange = "checkToolBarDrawer(this);" type="checkbox" style="vertical-align:middle;"></label>'
            +'<label class="menu_drawer" style="margin-left: 10px; vertical-align:center;">Menu bottom in drawer:<input onchange = "checkMenuBottomDrawer(this);" type="checkbox" style="vertical-align:middle;"></label>'
        +'</div>';

