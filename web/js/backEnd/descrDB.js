var hostDescr, hostDomain, hostPassword, hostPanel;

function setHostPanel() {
    let host = "Not described";
    let hostButt = "Describe the server";
    let par = button_host.parentElement;
    par.onclick = descrHost;
    if (currentProject.host != null && currentProject.host.length > 0) {
        host = currentProject.host;
        hostButt = "Change server description";
        par.onclick = changeHost;
        doServer("GET", 'tables/list', cbGetTables);
    }
    descr_host.innerHTML = host;
    button_host.innerHTML = hostButt;
}

function cbGetTables(res) {
    listTables = JSON.parse(res);
    let ik = listTables.length;
    if (ik > 0) {
        for (let i = 0; i < ik; i++) {
            listTablesView.append(oneTableView(i));
        }
    }
}

function oneTableView(i) {
    let item = listTables[i];
    let st = item.descr;
    if (st == null || st == "") {
        st = item.name_tab;
    }
    return newDOMelement('<div onclick="editTable(' + i + ')" style="float:left;width:100%;padding-top:5px;cursor:pointer;padding-bottom:5px;border-bottom:1px solid #aaf;clear:both">' + st + '</div>');
}

function descrHost() {
    hostDescr = "Server IDE"; 
    hostDomain = "";
    hostPassword = "";
    hostPanel = null;
    let wind = formWind(350, 300, 40, 350, "Describe the server");
    let footer = createFooter(50);
    addFooter(wind, footer);
    let buttonSend = createButtonBlue('Send', 70);
    buttonSend.addEventListener("click", function(){sendDescrHost();closeWindow(wind);}, true);
    footer.appendChild(buttonSend);
    let buttonCancel = createButtonWeite('Cancel', 70);
    buttonCancel.addEventListener("click", function(event){closeWindow(wind);}, true);
    footer.appendChild(buttonCancel);
    
    let chHost = editSelect("Where is the server", 110, "Server IDE,Own server", "", "changeHostSel");
    chHost.style.marginTop = "5px";
    chHost.style.marginLeft = "5px";
    wind.appendChild(chHost);
    
    hostPanel = document.createElement('div');
    hostPanel.style.cssText = "float:left;clear:both;margin-left:5px;margin-top:5px;display:none";
    wind.appendChild(hostPanel);
    
    let domain = editTextParam("Domain name", 200, "", "changeHostDomain");
    hostPanel.appendChild(domain);
    
    let pass = editTextParam("Password", 120, "", "changeHostPassw");
    pass.style.marginTop = "5px";
    pass.style.clear = "both";
    hostPanel.appendChild(pass);
}

function changeHost() {
    hostDescr = ""; 
    hostDomain = "";
    hostPassword = "";
    hostPanel = null;
    let wind = formWind(350, 300, 40, 350, "Change describe the server");
    let footer = createFooter(50);
    addFooter(wind, footer);

    let buttonCancel = createButtonWeite('Cancel', 70);
    buttonCancel.addEventListener("click", function(event){closeWindow(wind);}, true);
    footer.appendChild(buttonCancel);
    
    wind.innerHTML = '<div style="margin-left:20px;margin-top:40px;font-size:20px">Server migration is not currently implemented</div>'
}

function sendDescrHost() {
    if (hostDescr == "Server IDE") {
        hostDomain = "https://apps.deprosystem.com/";
    }
    let dat = {whereServer:hostDescr,domain:hostDomain,pass:hostPassword,res_ind:currentProject.resurseInd};
console.log("hostDomain="+hostDomain+"<<");
    doServer("POST", "db/create", cbCreateHost, JSON.stringify(dat));
}

function cbCreateHost(res) {
console.log("cbCreateHost RES="+res+"<<");
    descr_host.innerHTML = hostDomain;
    button_host.innerHTML = "Change server description";
    let par = button_host.parentElement;
    par.onclick = changeHost;
//    let dat = {whereServer:hostDescr,domain:hostDomain,pass:hostPassword};
 //   doServer("POST", 'project/sethost', cbSetHost, dat);
    if (hostDomain != null && hostDomain.length > 0) {
//        doServer("GET", hostDomain + 'tables/list', cbGetTables);
    }
}

function cbSetHost(res) {
    
}

function changeHostSel(el) {
    if (hostPanel == null) return;
    let val = el.options[el.selectedIndex].value;
    hostDescr = val;
    if (val == "Own server") {
        hostPanel.style.display = "block";
    } else {
        hostPanel.style.display = "none";
        hostDomain = "https://depro-ide.deprosystem.com/";
    }
}

function changeHostDomain(el) {
    hostDomain = el.value;
}

function changeHostPassw(el) {
    hostPassword = el.value;
}

