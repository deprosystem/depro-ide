var AuthToken = '';

function doServer(metod, url, callBack, data, paramCallBack){
    var req = initRequest();
    req.open(metod, url, true);
    req.setRequestHeader('Auth-token', AuthToken);
    if (currentProject != null) {
        req.setRequestHeader('projectId', currentProject.projectId);
    }
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                if (paramCallBack != undefined) {
                    callBack(req.responseText, paramCallBack);
                } else {
                    callBack(req.responseText);
                }
            } else {
console.log("AJAX="+req.responseText);
                var mes = JSON.parse(req.responseText).message;
                alert("doServer status=" + req.status + " " + mes);
            }
        }
    };
    data=data||null;
    req.send(data);
}

function initRequest() {
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
}

function insertHtml() {
    this.get = function (elId, url, func) {
        this.elId = elId;
        this.url = url;
        this.func = func;
        var a = new XMLHttpRequest();
        a.open("GET", this.url);
        a.onreadystatechange = function(){
            if (a.readyState===4){
                document.getElementById(elId).innerHTML = a.responseText;
                if (func != null) {
                    func();
                }
            }
        }
        a.send(null);
    }
}