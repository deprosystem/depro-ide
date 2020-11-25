function EditData(meta, data, domEl, obrSave, dopEl) {
    let edData, edMeta, edDomEl;
    let edObrSave = obrSave;
    let tableEdit, tableEditRows, tabContainer, tabTool;
    let tabHeader, tabBody;
    let widthTabl;
    let hTitle = 30, hTool = 50, wNum = 24; // ширина колонки с номером строки
    let hDopEl;
    let countRows;
    let imgSetValue;
    let  colorSelect = "#f3f8ff", colorNew = "#f5f9ff", 
            colorDel, colorErrorTr, colorErrorTh;
    if (meta == null) {
        return null;
    };
    edMeta = meta;
    let ikM = edMeta.length;
    if (domEl == null) {
        return null;
    }
    edDomEl = domEl;
    if (data == null) {
        return null;
    }
    edData = data;
    let ikD = edData.length
    
    formEditTab();
    
    function formEditTab() {
        let tr;
        let td;
        let met;
        
        tabContainer = document.createElement('div');
        tabContainer.style.cssText = "position:relative;height:100%;overflow-x:auto";
        edDomEl.appendChild(tabContainer);
        hDopEl = 0;
        if (dopEl != null) {
            tabContainer.appendChild(dopEl);
            hDopEl = dopEl.clientHeight;
        }
        tabHeader = document.createElement('div');
        tabHeader.style.cssText = "white-space:nowrap;height:" + hTitle + "px;color:#110000;font-size:12px;";
        let dv = document.createElement('div');
        dv.innerHTML = "&nbsp;";
        dv.style.cssText = "display:inline-block;height:100%;";
        tabHeader.appendChild(dv);
        for (let i = 0; i < ikM; i++) {
            dv = document.createElement('div');
            dv.innerHTML = edMeta[i].title;
            dv.style.cssText = "display:inline-block;height:100%;margin-top:7px;";
            tabHeader.appendChild(dv);
        }
        dv = document.createElement('div');
        dv.innerHTML = "&nbsp;";
        dv.style.cssText = "display:inline-block;height:100%;";
        tabHeader.appendChild(dv);
        tabContainer.appendChild(tabHeader);
        
        tabTool = document.createElement('div');
        tabTool.style.cssText = "height:" + hTool + "px;bottom:0px;right:0px;left:0px;position:absolute;border-top:1px solid #C5DCFA;";
        let addBl = createAddItem();
        let saveBl = createSaveData();
        addBl.addEventListener("click", function(event){addItem(event)}, true);
        saveBl.addEventListener("click", function(event){saveData(event)}, true);
        tabTool.appendChild(addBl);
        tabTool.appendChild(saveBl);
        tabContainer.appendChild(tabTool);
        
        tabBody = document.createElement('div');
        tabBody.style.cssText = "overflow-y:auto;bottom:" + hTool + "px;position:absolute;top:" + (hTitle + hDopEl) + "px";
        tabContainer.appendChild(tabBody);
        
        tableEdit = document.createElement('table');
        tableEdit.className = "edit_data";
        tableEdit.style.borderCollapse = "collapse";
        tableEdit.style.backgroundColor = "#fff";
        tabBody.appendChild(tableEdit);

        if (ikD > 0) {
            for (let j = 0; j < ikD; j++) {
                let item = edData[j];
                tr = document.createElement('tr');
                tr.addEventListener("mouseover", function(event){mouseoverTr(event)}, true);
                tr.addEventListener("mouseout", function(event){mouseoutTr(event)}, true);
                td = createCellNum(j);
                tr.appendChild(td);
                
                for (let i = 0; i < ikM; i++) {
                    td = createTD(i, item);
                    tr.appendChild(td);
                }
                td = createDel();
                tr.appendChild(td);
                tableEdit.appendChild(tr);
            }
        } else {
            createNewTR();
        }

        tableEditRows = tabBody.getElementsByTagName('tr');
        if (tableEditRows != null && tableEditRows.length > 0) {
            formHeader(tableEditRows);
        }
    }
    
    function formHeader(tableEditRows) {
        tr = tableEditRows[0];
        let cells = tr.getElementsByTagName('td');
        let tit = tabHeader.getElementsByTagName('div');
        let ik = cells.length;
        let ik1 = ik - 1;
        for (let i = 0; i < ik; i ++) {
            let cellW = cells[i].clientWidth;
            if (i == ik1) {
                cellW --;
            }
            tit[i].style.width = cellW + 'px';
        }
        widthTabl = tableEdit.clientWidth + 17;
        tabBody.style.width = widthTabl + 'px';
//        tabTool.style.width = tableEdit.clientWidth + 'px';
        countRows = tableEditRows.length;
    }
    
    this.getWidthW = function() {
        return widthTabl;
    };
    
    function mouseoverTr(event) {
        hoverTr(event, "#f3f7ff");
    }
    
    function mouseoutTr(event) {
        hoverTr(event, "");
    }
    
    function createDel() {
        let td = document.createElement('td');
//        td.style.border = "1px solid black";
        let dv = document.createElement('img');
        dv.style.cssText = "width:16px;height:16px;margin-left:5px;cursor:pointer";
        dv.src = "img/close-o.png";
        dv.addEventListener("click", function(event){delRow(event)}, true);
        td.appendChild(dv);
        return td;
    }
    
    function delRow(e) {
        let tr = e.target.closest('tr');
        let ik = tableEditRows.length;
        let iTr = -1;
        for (let i = 0; i < ik; i++) {
            if (tableEditRows[i] == tr) {
                iTr = i;
                break;
            }
        }
        tr.parentNode.removeChild(tr);
        tableEditRows = tabBody.getElementsByTagName('tr');
        if (iTr > -1) {
            ik = tableEditRows.length;
            for (let i = iTr; i < ik; i++) {
                let row = tableEditRows[i];
                let cells = row.getElementsByTagName('td');
                let first = cells[0].firstElementChild;
                first.innerHTML = i;
            }
        }
    }
    
    function hoverTr(event, color) {
        let tr = event.currentTarget;
        let act = document.activeElement;
//        tr.style.background = color;
        let cells = tr.getElementsByTagName("td");
        let ik = cells.length - 1;
        for (let i = 1; i < ik; i++) {
            cells[i].style.backgroundColor = color;
/*
            let first = cells[i].firstElementChild;
            if (first != act) {
                first.style.background = color;
            }
*/
        }
    }
    
    function createCellNum(j) {
        let td = document.createElement('td');
//        td.style.border = "1px solid black";
        let dv = document.createElement('div');
        dv.style.cssText = "width:" + wNum + "px;text-align:right;margin-right:4px;";
        dv.innerHTML = j;
        td.appendChild(dv);
        return td;
    }
    
    function createTD(i, item) {
        let met = edMeta[i];
        let td = document.createElement('td');
        td.style.border = "1px solid #C5DCFA";
        if (met.type == null) {
            met.type = TYPE_TEXT;
        }
        let inp;
        switch (met.type) {
            case TYPE_BOOLEAN:
                inp = document.createElement('input');
                inp.type = "checkbox";
                inp.name = met.name;
                if (item != null) {
                    let nameV = met.name;
                    let vv = item[nameV];
                    if (vv == null) {
                        vv = false;
                    }
                    inp.checked = vv;
                }
                if (met.marg != null) {
                    inp.style.marginLeft = met.marg + "px";
                    inp.style.marginRight = met.marg + "px";
                }
                inp.style.backgroundColor = "#0000";
                td.appendChild(inp);
                break;
            case TYPE_SELECT:
                if (met.select != null && met.select.length > 0) {
                    td.appendChild(setSelect(met, item));
                }
                break;
            case TYPE_IMG:
                let img = document.createElement('img');
                img.style.width = met.len + "px";
                if (met.h != null) {
                    img.style.height = met.h + "px";
                } else {
                    img.style.height = met.len + "px";
                }
                let vv = "";
                if (item != null) {
                    let nameV = met.name;
                    vv = item[nameV];
/*
                    if (vv == null) {
                        vv = "aa";
                    }
*/
                }
                img.style.backgroundColor = "#0000";
                if (vv != null && vv != "") {
                    img.src = vv;
                    img.srcElem = vv;
                }
                if (met.marg != null) {
                    img.style.marginLeft = met.marg + "px";
                    img.style.marginRight = met.marg + "px";
                }
                img.addEventListener('click', function(event){selecktImg(event)}, false);
                td.appendChild(img);
                break;
            default:
                inp = document.createElement('input');
                inp.type = "text";
                inp.name = met.name;
                inp.size = met.len;
                inp.style.cssText = "margin-left:3px;margin-right:3px;border:none";
                if (item != null) {
                    let nameV = met.name;
                    let vv = item[nameV];
                    if (vv == null) {
                        vv = "";
                    }
                    inp.value = vv;
                }
                switch (met.type) {
                    case TYPE_INT:
                        inp.addEventListener('keydown', function(event){clickNumbet(event)}, false);
                        break;
                    case TYPE_FLOAT:
                        inp.addEventListener('keydown', function(event){editFloat(event)}, false);
                        break;
                    case TYPE_TEXT:
                    default:
                        inp.addEventListener('keydown', function(event){clickText(event, met.valid)}, false);
                }
                inp.addEventListener('focus', function(event){focusInput(event)}, false);
                inp.addEventListener('blur', function(event){blurInput(event)}, false);
                inp.style.backgroundColor = "#0000";
                td.appendChild(inp);
        }
        return td;
    }
    
    function selecktImg(e) {
        imgSetValue = e.currentTarget;
        doServer("GET", 'images/list', callBackSRC);
    }

    callBackSRC = function(res) {
        windImg.style.display = 'block';
        if (res == "") return;
        listImg = JSON.parse(res);
        var str = '';
        selImg.innerHTML = "";
        for (var i = 0; i < listImg.length; i++) {
            var path = listImg[i];
            var ii = path.lastIndexOf("/");
            var nam = path.substring(ii + 1);
            nam = nam.substring(0, nam.indexOf('.'))
            let elList = document.createElement('div');
            elList.style.cssText = "clear: both; margin-top: 5px; height: 30px; cursor: pointer";
            elList.innerHTML = '<img width="30" height="30" style="float: left; margin-right: 5px" src="' + path + '"><div>' + nam + '</div>';
            elList.srcElem = path;
            elList.addEventListener('click', function(event){selectImgEditData(event)}, false);
            selImg.appendChild(elList);
        }
    }
    
    function selectImgEditData(e) {
        windImg.style.display = 'none';
        let el = e.currentTarget;
        imgSetValue.src = el.srcElem;
        imgSetValue.srcElem = el.srcElem;
    }
    
    function setSelect(met, item) {
        let vv;
        if (item != null) {
            let nameV = met.name;
            vv = item[nameV];
            if (vv == null) {
                vv = "";
            }
        }
        let selSel = formSelectForEditData(met.select, vv);
        selSel.style.width = met.len + "px";
        selSel.style.border = "none";
        selSel.style.backgroundColor = "#0000";
        return selSel;
    }
    
    function focusInput(e) {
        e.currentTarget.style.background = "#cdf";
    }
    
    function blurInput(e) {
        e.currentTarget.style.background = "#0000";
    }
    
    function tooltip(target, message) {
        let maxW = 250;
        let xy = getCoords(target);
        let x = xy.left;
        let y = xy.top;
        let dv = document.createElement('div');
        if (y > 40) {
            y -= 40;
        } else {
            y += 20;
        }
        let wD = document.documentElement.clientWidth;
        if ((wD - x) < maxW) {
            x = wD - maxW - 20;
        }
        dv.style.cssText = "position:absolute;max-width:" + maxW + "px;padding:5px;background:#def;border:1px solid black;left:" + x + "px;top:" + y + "px;z-index:100";
        dv.innerHTML = message;
        document.body.append(dv);
        setTimeout(function(){ document.body.removeChild(dv);},2000);
    }
    
    function getCoords(elem) { 
        var box = elem.getBoundingClientRect();
        return {
          top: box.top + pageYOffset,
          left: box.left + pageXOffset
        };
    }
    
    clickUpInput = function(event) {
        let k = event.key;
        if (k == "ArrowDown" || k == "ArrowUp") {
            let cell = event.target.closest('td');
            if (cell != null) {
                let cR = cell.parentNode.rowIndex;
                let cC = cell.cellIndex;
                switch (k) {
                    case "ArrowDown":
                        if (cR < countRows) {
                            upDown(cC, cR + 1);
                            return true;
                        }
                        break;
                    case "ArrowUp":
                        if (cR > 0) {
                            upDown(cC, cR - 1);
                            return true;
                        }
                        break;
                }
            }
        }
        return false;
    }
    
    function clickText(event, valid) {
        let k = event.keyCode;
        if (k < 41) {
            return clickUpInput(event);
        } else {
            if (valid != null) {
                if (valid.latin != null && valid.latin) {
                    let kUp = event.key.toUpperCase();
                    if ( ! ((kUp >= "A" && kUp <= "Z") || kUp == "_" || (kUp >= "0" && kUp <= "9")))  {
                        event.preventDefault();
                        tooltip(event.target, "Только английские буквы, _ и цифры");
                    }
                }
            }
        }
    }
    
    function clickNumbet(event) {
        let k = event.keyCode;
        if (k < 47) {
            return clickUpInput(event);
        } else {
            if ( ! ((k > 47 && k < 58) || k == 173)) {
                event.preventDefault();
                tooltip(event.target, "Только цифры");
            } else {
                if (k == 173) {
                    if (event.target.selectionStart > 0) {
                        event.preventDefault();
                        tooltip(event.target, "Минус не в начале");
                    }
                }
            }
        }
    }
    
function editFloat(event) {
    let k = event.keyCode;
    let z = event.key;
    if (k < 47) {
        return true;
    }
    if ((k > 47 && k < 58) || k == 173 || z == ".") {
        if (k == 173) {
            if (event.target.selectionStart > 0) {
                event.preventDefault();
                tooltipMessage(event.target, "Минус не в начале");
                return false;
            }
        } else if (z == ".") {
            let vv = event.target.value;
            if (vv.indexOf(".") > -1) {
                event.preventDefault();
                tooltipMessage(event.target, "Точка уже есть");
                return false;
            }
        }
        return true;
    } else {
        event.preventDefault();
        tooltipMessage(event.target, "Только цифры");
        return false;
    }
}
    
    function upDown(cC, cR) {
        let row = tableEditRows[cR];
        let cells = row.getElementsByTagName('td');
        let cellSel = cells[cC];
        let newInput = cellSel.getElementsByTagName("input")[0];
        newInput.focus();
    }
    
    function createAddItem() {
        var container = document.createElement('div')
        container.innerHTML = '<div style="cursor: pointer;margin-left:5px;margin-top:3px;float: left;">'
                +'<img width="16" height="16" style="float: left; margin-top: 2px" src="img/plus_24.png">'
                +'<div style="float: left; margin-left: 3px;">Add</div></div>';
        return container.firstChild;
    }
    
    function createSaveData() {
        var container = document.createElement('div')
        container.innerHTML = '<div style="cursor: pointer;margin-left:15px;margin-top:3px;float: left;">Save</div></div>';
        return container.firstChild;
    }
    
    function addItem(e) {
        createNewTR();
        tableEditRows = tabBody.getElementsByTagName('tr');
        countRows = tableEditRows.length;
    }
    
    function createNewTR() {
        let firstElem;
        let num = 0;
        if (tableEditRows != null) {
            num = tableEditRows.length;
        }
        let tr = document.createElement('tr');
        let td = createCellNum(num);
        tr.appendChild(td);

        for (let i = 0; i < ikM; i++) {
            td = createTD(i, null);
            if (i == 0) {
                firstElem = td;
            }
            tr.appendChild(td);
        }
        td = createDel();
        tr.appendChild(td);
        tr.addEventListener("mouseover", function(event){mouseoverTr(event)}, true);
        tr.addEventListener("mouseout", function(event){mouseoutTr(event)}, true);
        tableEdit.appendChild(tr);
        tableEditRows = tabBody.getElementsByTagName('tr');
        countRows = tableEditRows.length;
        if (firstElem != null) {
            let newInput = firstElem.getElementsByTagName("input")[0];
            if (newInput != null) {
                newInput.focus();
            }
        }
    }
    
    function saveData(e) {
        edData.length = 0;
        let jk = tableEditRows.length;
        for (j = 0; j < jk; j++) {
            let item = {};
            let row = tableEditRows[j];
            let cells = row.getElementsByTagName('td');
            let ik = cells.length - 1;
            for (i = 1; i < ik; i++) {
                let elem = cells[i].firstElementChild;
                let i1 = i - 1;
                switch (elem.tagName) {
                    case "INPUT":
                        if (elem.type == "checkbox") {
                            item[edMeta[i1].name] = elem.checked;
                        } else {
                            item[edMeta[i1].name] = parseValue(elem.value, edMeta[i1].type);
                        }
                        break;
                    case "SELECT":
                        item[edMeta[1].name] = elem.options[elem.selectedIndex].value;
                        break;
                    case "IMG":
                        item[edMeta[i1].name] = elem.srcElem;
                        break;
                }
            }
            edData.push(item);
        }
        closeWindEditData();
        if (edObrSave != null) {
            edObrSave();
        }
    }
    
    function parseValue(value, type) {
        let res;
        switch (type) {
            case TYPE_INT:
                res = parseInt(value);
            case TYPE_FLOAT:
                res = parseFloat(value);
            default:
                return value;
        }
        if (isNaN(res)) {
            return value;
        } else {
            return res;
        }
    }
    
    function closeWindEditData() {
        let el = edDomEl.parentElement;
        el.parentNode.removeChild(el);
    }
}
