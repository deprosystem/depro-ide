function editUX_UI() {
    if (ux_ui.innerHTML == "UI") {
        isUX = false;
        ux_ui.innerHTML = "UX";
        compon_ui.style.display = "block";
        document.documentElement.style.setProperty('--w_ux_p', '300px');
        document.documentElement.style.setProperty('--w_ux_r', '320px');
        document.documentElement.style.setProperty('--left_compon', '300px');
//        setTimeout(endAnimUI, 2000);
//        container_scr.style.display = "none";

    } else {
        isUX = true;
        ux_ui.innerHTML = "UI";
        compon.style.display = "block";
        document.documentElement.style.setProperty('--w_ux_p', '60%');
        document.documentElement.style.setProperty('--w_ux_r', '0px');
        document.documentElement.style.setProperty('--left_compon', '0px');
        setTimeout(endAnimUX, 2000);
//        container_scr.style.display = "block";
    }
    
    function endAnimUX() {
        compon_ui.style.display = "none";
    }
    
 //   function endAnimUI() {
//        compon.style.display = "none";
//    }
}