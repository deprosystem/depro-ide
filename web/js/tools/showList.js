function showList(list, view, container, listener) {
    let ik = list.length;
    for (let i = 0; i < ik; i++) {
        let vv = newDOMelement(view);
//        let vv = view(i);
        let item = list[i];
        let fields = vv.getElementsByClassName("field");
        if (fields != null && fields.length > 0) {
            let jk = fields.length;
            for (let j = 0; j < jk; j++) {
                let el = fields[j];
                let id = el.id;
                el.innerHTML = item[id];
                if (listener != null) {
                    let func = getFuncListener(id, listener);
                    if (func != null) {
                        el.addEventListener("click", function(){func(i);}, false);
//console.log("III="+i+" ffff="+func);
                    }
                }
            }
        }
        if (listener != null) {
            let func_0 = getFuncListener("", listener);
            if (func_0 != null) {
                vv.addEventListener("click", function(){func_0(i);}, false);
            }
        }
        container.appendChild(vv);
    }
}

function getFuncListener(id, listener) {
//console.log("getFuncListener="+id+"<<");
    let ik = listener.length;
    for (let i = 0; i < ik; i++) {
        let item = listener[i];
        if (id == item.id) {
//console.log("   III="+i+" id="+id+" FFFF="+ item.func);            
            return item.func;
        }
    }
    return null;
}
