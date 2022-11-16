var screenEmulator;
function setComponentsScr() {
    if (emalator_inf.innerHTML == "Preview") {
        emalator_inf.innerHTML = "Editor";
        screenEmulator = new emalator();
        screenEmulator.setEmulator();
    } else {
        emalator_inf.innerHTML = "Preview";
        screenEmulator.noEmulatorComponents();
        screenEmulator = null;
    }
}

function offEmulator() {
    if (emalator_inf.innerHTML == "Editor") {
        screenEmulator.noEmulatorComponents();
        screenEmulator = null;
        emalator_inf.innerHTML = "Preview";
    }
}

function onEmulator() {
    if (emalator_inf.innerHTML == "Preview") {
        emalator_inf.innerHTML = "Editor";
        screenEmulator = new emalator();
        screenEmulator.setEmulator();
    }
}


