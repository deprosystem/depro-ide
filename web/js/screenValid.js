var colorsEroor = ["#0000","#fd0","#f00"];
var heightScreen = 70;

function screenValid() {
    
}

function oneScreenValid(scrD, scrV) {
    let newErrors = "";
    let newLevelErrors = 0;
    if (scrD.screenName == "") {
        newErrors += "No screen name\n";
        newLevelErrors = 2;
    }
    if (scrD.levelErrors != newLevelErrors) {
        let divErr = currentScreenView.getElementsByClassName("error_screen")[0];
        divErr.style.backgroundColor = colorsEroor[newLevelErrors];
        scrD.levelErrors = newLevelErrors;
        scrD.textErrors = newErrors;
        setBoxError();
    }
}

function setBoxError() {
    box_error.innerHTML = "";
    let rectBox = box_error.getBoundingClientRect();
    let h_box = rectBox.bottom - rectBox.top;
    let ik = listScreen.length;
    let h_screen = h_box / ik;
    if (h_screen > heightScreen) {
        h_screen = heightScreen;
    }
    maxError = 0;
    for (let i = 0; i < ik; i++) {
        let scr = listScreen[i];
        if (scr.levelErrors > 0) {
            if (scr.levelErrors > maxError) {
                maxError = scr.levelErrors;
            }
            let marker = newMarker(scr.screenId, scr.levelErrors, i * h_screen);
            box_error.appendChild(marker);
        }
    }
    if (maxError > 0) {
        inf_error.style.backgroundColor = colorsEroor[maxError];
    } else {
        inf_error.style.backgroundColor = "#0f0";
    }
}

function newMarker(id, err, top_mark) {
    let container = document.createElement('div')
    container.innerHTML = '<div onclick="clickMarker(' + "'" + id + "'" + ')" style="position: absolute; width:100%;height:4px;top:' + top_mark + 'px;cursor:pointer;background-Color:' + colorsEroor[err] + '"></div>';
    return container.firstChild
}

function clickMarker(id) {
    let list = list_screens.children;
    let ik = list.length;
    for (let i = 0; i < ik; i++) {
        let scrV = list[i];
        if (scrV.idScreen == id) {
            selScreenView(scrV, i * heightScreen);
        }
    }
}
