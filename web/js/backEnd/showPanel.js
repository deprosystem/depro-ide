/*
function showData() {
    if (listTables == null) {
        doServer("GET", 'tables/list', cbGetTables);
    } else {
        viewData()
    }
}

function cbGetTables(res) {
    formListTables(res);
    viewData();
}
*/

function viewData() {
    let right_d = 100;
    if (ux_ui.innerHTML == "U I") {
        right_d = 150;
    } else {
        right_d = 450;
    }
    setHostPanel();
    let hh = document.documentElement.clientHeight;
    if (show_data_inf.innerHTML == "Data") {
        show_data_inf.innerHTML = "UX-UI";
        hideControlHeader();
        document.documentElement.style.setProperty('--r_data', 100 + "px");
        document.documentElement.style.setProperty('--h_backEnd', (hh - 35) + "px");
    } else {
        show_data_inf.innerHTML = "Data";
        document.documentElement.style.setProperty('--r_data', right_d + "px");
        document.documentElement.style.setProperty('--h_backEnd', '0');
        setTimeout(showControlHeader, 400);
    }
}

function hideControlHeader() {
    if (ux_ui.innerHTML == "U I") {
        plus_screen.style.display = "none";
        corners.style.display = "none";
    } else {
        type_insert.style.display = "none";
        active.style.display = "none";
    }
    ux_ui_w.style.display = "none";
}

function showControlHeader() {
    if (ux_ui.innerHTML == "U I") {
        plus_screen.style.display = "block";
        corners.style.display = "block";
    } else {
        type_insert.style.display = "block";
        active.style.display = "block";
    }
    ux_ui_w.style.display = "block";
}

