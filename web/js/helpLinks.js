let strHelp = "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit";
function helpDoc() {
    let adr;
    if (ux_ui.innerHTML == "UI") {        // UX
        if (uxFunction != null) {
            adr = uxFunction.getHelpLink();
            if (adr == null || adr.length == 0) {
                adr = strHelp;
            }
            window.open(adr);
        } else {
            window.open(strHelp);
        }
    } else {
        window.open(strHelp);
    }
}