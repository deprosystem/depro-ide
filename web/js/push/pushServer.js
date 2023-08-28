function pushServer() {
    
    
    this.init = function() {
        heightTitle = 24;
        dataDescript.innerHTML='<div class="titleBlock" style="position:absolute;left:0;height:' + (heightTitle) + 'px;right:0;top:0;border-bottom: 1px solid #1DACE9;">'
                +'<div style="text-align:center;margin-top:4px">Push notifications</div>'
                +'</div>';
                let notif = pushNotif.pushData.notif;
        ik = notif.length;
        for (let i = 0; i < ik; i++) {
            let itemC = notif[i];
            let push = notif[i]["notices"];
            if (push != null) {
                let jk = push.length;
                for (let j = 0; j < jk; j++) {

                }
            }
        }
    }
    
    this.init();
}
