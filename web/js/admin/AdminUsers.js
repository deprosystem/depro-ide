function AdminUsers() {
    this.list;
    
    this.init = function() {
        this.wind = formWind(410, 400, 40, 50, "Users");
        this.wind.className = "w_scroll wind";
        this.wind.style.overflowY = "auto";
        this.wind.style.overflowX = "hidden";
        this.admProj = new AdminProjects();
        doServer("GET", 'users/list', this, null, null, document.body);
    }
    
    this.cbDoServer = function(res) {
        this.list = JSON.parse(res);
        let ik = this.list.length;
        for (let i = 0; i < ik; i++) {
            let item = this.list[i];
            this.wind.append(this.viewOne(item));
        }
    }
    
    this.viewOne = function(item) {
        let dat = "";
        if (item.tyme_actual != null && item.tyme_actual != 0) {
            dat = dateServer(item.tyme_actual, "dd.MM.yy");
        }
        let oneDiv = '<div style="width: 100%;height: 22px;margin-left:5px">'
                +'<div style="width:200px;margin-top:3px;cursor:pointer;float:left">' + item.user_name 
                +'</div><div style="width:100px;margin-top:3px;cursor:pointer;float:left">' + item.login + '</div>'
                +'<div style="width:40px;margin-top:3px;cursor:pointer;float:left">' + dat + '</div></div>';
        let cont = newDOMelement(oneDiv);
        let del = newDOMelement('<img style="float:right;cursor:pointer;margin-right:15px;margin-top:2px" width="14" height="14" src="img/close-o.png">');
        cont.append(del);
        cont.addEventListener("click", () => {this.selectUser(item);});
        del.addEventListener("click", () => {this.delUser(item);});
        return cont;
    }
    
    this.selectUser = function(item) {
        this.admProj.setProject(item.user_id, item.user_name);
    }
    
    this.delUser = function(item) {
        event.stopPropagation();
        myAlert("User " + item.user_name + " will be deleted along with all projects.<br />Proceed?", "Proceed", this, item);
    }
    
    this.cbForAlert = function(item) {
        console.log("LLLL="+item.login+"<<");
    }
    
    this.init();
}


