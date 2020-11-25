function editUX_UI() {
    if (ux_ui.innerHTML == "UI") {
        isUX = false;
        ux_ui.innerHTML = "UX";
        compon_ui.style.display = "block";
        type_insert.style.display = "block";
        active.style.display = "block";
        plus_screen.style.display = "none";
        corners.style.display = "none";
        document.documentElement.style.setProperty('--w_ux_p', '300px');
        document.documentElement.style.setProperty('--w_ux_r', '320px');
        document.documentElement.style.setProperty('--left_compon', '300px');
    } else {
        isUX = true;
        ux_ui.innerHTML = "UI";
        type_insert.style.display = "none";
        active.style.display = "none";
        plus_screen.style.display = "block";
        corners.style.display = "block";
        document.documentElement.style.setProperty('--w_ux_p', '60%');
        document.documentElement.style.setProperty('--w_ux_r', '0px');
        document.documentElement.style.setProperty('--left_compon', '0px');
        setTimeout(endAnimUX, 400);
    }
}

function endAnimUX() {
        compon_ui.style.display = "none";
    }