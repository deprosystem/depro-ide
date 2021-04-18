var hostDescr, hostDomain, hostPassword, hostPanel;
function descrHost() {
    hostDescr = ""; 
    hostDomain = "";
    hostPassword = "";
    hostPanel = null;
    let wind = formWind(350, 300, 40, 200, "Describe the server");
    let footer = createFooter(50);
    addFooter(wind, footer);
    let buttonSend = createButtonBlue('Send', 70);
    buttonSend.addEventListener("click", function(){sendDescrHost();closeWindow(wind);}, true);
    footer.appendChild(buttonSend);
    let buttonCancel = createButtonWeite('Cancel', 70);
    buttonCancel.addEventListener("click", function(event){closeWindow(wind);}, true);
    footer.appendChild(buttonCancel);
    let chHost = editSelect("Where is the server", 110, "Server IDE,Own server", "", "changeHost");
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

function sendDescrHost() {
    let dat = {whereServer:hostDescr,domain:hostDomain,pass:hostPassword};
    doServer("POST", "db/create", cbSaveHostCreate, JSON.stringify(dat));
}

function cbSaveHostCreate(res) {
    
}

function changeHost(el) {
    if (hostPanel == null) return;
    let val = el.options[el.selectedIndex].value;
    hostDescr = val;
    if (val == "Own server") {
        hostPanel.style.display = "block";
    } else {
        hostPanel.style.display = "none";
    }
}

function changeHostDomain(el) {
    hostDomain = el.value;
}

function changeHostPassw(el) {
    hostPassword = el.value;
}

