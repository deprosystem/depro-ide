function AdminProjects() {
    this.list;
    
    this.init = function() {
        this.wind = formWind(290, 400, 40, 500, "Projects");
        this.wind.className = "w_scroll wind";
        this.wind.style.overflowY = "auto";
        this.wind.style.overflowX = "hidden";
    }
    
    this.setProject = function(userId, userName) {
        setTitleWind(this.wind, "Projects by user " + userName);
        doServer("GET", 'users/listProjects?id=' + userId, this, null, null, document.body);
    }
    
    this.cbDoServer = function(res) {
        this.list = JSON.parse(res);
        let ik = this.list.length;
        this.wind.innerHTML = "";
        for (let i = 0; i < ik; i++) {
            let item = this.list[i];
            this.wind.append(this.viewOne(item));
        }
    }
    
    this.viewOne = function(item) {
        let dat = "";
        if (item.date_create != null && item.date_create != 0) {
            dat = dateServer(item.date_create, "dd.MM.yy");
        }
        let oneDiv = '<div style="width: 100%;height: 20px;margin-left:5px">'
                +'<div style="width:100px;margin-top:3px;float:left">' + item.project_name + '</div>'
                +'<div style="width:40px;margin-top:3px;float:left">' + dat + '</div>'
                +'</div>';
        let cont = newDOMelement(oneDiv);
        let del = newDOMelement('<img style="float:right;cursor:pointer;margin-right:15px;margin-top:2px" width="14" height="14" src="img/close-o.png">');
        cont.append(del);
//        cont.addEventListener("click", () => {this.selectProject(item);});
        del.addEventListener("click", () => {this.delProject(item);});
        return cont;
    }
    
    this.selectProject = function(item) {
        console.log(item.project_name+"<<");
    }
    
    this.delProject = function(item) {
        event.stopPropagation();
        myAlert("Project " + item.project_name + " will be deleted.<br />Proceed?", "Proceed", this, item);
    }
    
    this.cbForAlert = function(item) {
        console.log("IIIII="+item.project_id+"<< NNN="+item.project_name+"<<");
    }
    
    this.init();
}
