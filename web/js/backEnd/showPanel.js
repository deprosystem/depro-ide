function showData() {
    let hh = document.documentElement.clientHeight;
    if (show_data_inf.innerHTML == "Data") {
        show_data_inf.innerHTML = "UX-UI";
        plus_screen.style.display = "none";
        corners.style.display = "none";
        ux_ui_w.style.display = "none";
        
        document.documentElement.style.setProperty('--h_backEnd', (hh - 35) + "px");
    } else {
        show_data_inf.innerHTML = "Data";
        plus_screen.style.display = "block";
        corners.style.display = "block";
        ux_ui_w.style.display = "block";
        document.documentElement.style.setProperty('--h_backEnd', '0');
    }
}