function initialView(AuthResult) {
    eventFocusBlur();
    var ar = JSON.parse(AuthResult);
    AuthToken = ar.token;
    let prof = ar.profile;
    setCookie("auth_token", AuthToken);
    setCookie("user", prof.userName);
    if (prof.userName != undefined && prof.userName.length > 0) {
        info_user.innerHTML = prof.userName.substring(0, 1).toUpperCase();
    }
    window.onbeforeunload = function(e) {
        if (isSystemChange || isLayoutChange) {
            e.returnValue = 'Do you really want to close?';
            return 'Do you really want to close?';
        } else {
            return null;
        }
    };
    loginPanel.style.display = "none";
    formMenuEl_UX();
    var ins = new insertHtml();
    ins.get('layoutAttributes', 'layout/layoutAttr.html', setLayoutDiv);
    var ins = new insertHtml();
    ins.get('m_bmPEbody', 'layout/layoutParam.html', m_bmStart);
    currentProject = ar.project;
    if (currentProject == null) {
        if (ar.listProject != null && ar.listProject.length > 0) {
            listMenu_UX[0].children[1].domElement.className = 'subMainMenu';
            setListProject(ar.listProject);
        } else {
            shutScreen.style.display = "block";
            shutScreen.innerHTML = '<div style="font-size:34px;margin-top:50px;margin-left:50px;">You have no projects</div>';
            listMenu_UX[0].children[1].domElement.className = 'subMainMenuNo';
        }
    }

    
/*
    if (ar.project != null) {
        currentProject = ar.project;
        cbCreateProjectDop();
    }
*/
/*
    if (projectName == "") {
        project_name.innerHTML = 'NOT';
    } else {
        project_name.innerHTML = projectName;
    }
*/
}
    
function eventFocusBlur() {
    localStorage.setItem('resultUI', "");
    window.onfocus = inFocus;
}

function inFocus() {
    let res = localStorage.getItem('resultUI');
    if (res != null && res != "") {
        var scr = JSON.parse(res);
        listScreen[positionScreen] = scr;
        currentScreen = scr;
        if (currentScreen != null) {
            currentChildren = currentScreen.layout.children;
            setScreenView();
        }
    }
}



function m_bmStart(el) {
    var chB=m_bmPEbody.children;
    var chH=m_bmPEhead.children;
    if (!el) el = chH[0];
    for(var i = 0; i < chH.length; i++) {
        if (el === chH[i]) {
            chH[i].style.background = '#c1e1fc';
            chB[i].style.display = 'block';
        } else {
            chH[i].style.background = '#eeeeee';
            chB[i].style.display = 'none';
        }
    }
    if (currentProject != null) {
        listMenu_UX[0].children[1].domElement.className = 'subMainMenu';
        cbCreateProjectDop();
    }
}