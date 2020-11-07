function editUX_UI() {
    if (ux_ui.innerHTML == "UI") {
        isUX = false;
        ux_ui.innerHTML = "UX";
        document.documentElement.style.setProperty('--w_ux_p', '300px');
        document.documentElement.style.setProperty('--w_ux_r', '260px');
        list_screens.style.display = "none";
    } else {
        isUX = true;
        ux_ui.innerHTML = "UI";
        document.documentElement.style.setProperty('--w_ux_p', '60%');
        document.documentElement.style.setProperty('--w_ux_r', '0px');
        list_screens.style.display = "block";
    }
}