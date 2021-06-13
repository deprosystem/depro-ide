var ideListUsers;
var ideProjectInUser;
var ideUserSelected;
function formListUsers() {
    currentProject = null;
    doServer("get", "users_adm/list", cbGetListUsers);
}

function cbGetListUsers(res) {
    let view = '<div style="height:24px;width:100%;border-bottom:1px solid #555;"><div id="user_name" class="field" style="float:left;margin-top:5px;margin-left:5px;"></div>'
        +'<img id="user_del" class="field" style="float:right;cursor:pointer;margin-top:3px;margin-right:10px" width="14" height="14" src="img/close-o.png">'
        +'<img id="profile" class="field" style="float:right;cursor:pointer;margin-top:3px;margin-right:10px" width="14" height="14" src="img/user.png">'
        +'</div>';
    let wind = formWind(200, 300, 45, 50, "Users", true);
    let listener = [{id:"",func:formListProjectInUser},{id:"user_del",func:ideUserDel},{id:"profile",func:ideUserProfile}];
    ideListUsers = JSON.parse(res);
    showList(ideListUsers, view, wind, listener);
    let scr = wind.closest('.viewport');
    scr.scroll_y.resize();
}
/*
function ideGetUserView(i) {
    let view = '<div onclick="formListProjectInUser(' + i + ')" style="height:24px;width:100%;border-bottom:1px solid #555;"><div id="user_name" class="field" style="float:left;margin-top:5px;margin-left:5px;"></div>'
            +'<img onclick="ideUserDel(' + i + ')" id="user_del" class="field" style="float:right;cursor:pointer;margin-top:3px;margin-right:10px" width="14" height="14" src="img/close-o.png">'
            +'</div>';
    return newDOMelement(view);
}
*/
function formListProjectInUser(i) {
    console.log("formListProjectInUser III="+i);
    ideUserSelected = ideListUsers[i];
    doServer("GET", "users_adm/projects?userId=" + ideUserSelected.user_id, cbListProjectInUser);
}

function cbListProjectInUser(res) {
    let view = '<div style="height:24px;width:100%;border-bottom:1px solid #555;"><div id="project_name" class="field" style="float:left;margin-top:5px;margin-left:5px;"></div>'
        +'<img id="project_del" class="field" style="float:right;cursor:pointer;margin-top:3px;margin-right:10px" width="14" height="14" src="img/close-o.png">'
        +'</div>';
    let wind = formWind(300, 350, 45, 270, "Projects by user " + ideUserSelected.user_name, true);
    let listener = [{id:"",func:ideInfProject},{id:"project_del",func:ideProjectDel}];
    ideProjectInUser = JSON.parse(res);
    showList(ideProjectInUser, view, wind, null);
    let scr = wind.closest('.viewport');
    scr.scroll_y.resize();
}

function ideInfProject(i) {
    
}

function ideProjectDel(i) {
    
}

function ideUserDel(i) {
    console.log("ideUserDel III="+i);
    event.stopPropagation();
}

function ideUserProfile(i) {
    console.log("ideUserProfile III="+i);
    event.stopPropagation();
}


