// JScript File
function setkeydown(){
    a=document.getElementsByTagName("INPUT");
    var keynum;
    for(i=0;i<a.length;i++){
        t= i+1<a.length?a[i+1].getAttribute('type'):false
        if(t!="hidden"&& t!="image" && t!=false){
            k=i+1;
            a[i].onkeydown=focusOnEnter(k);
        }
    }
}

function focusOnEnter(tabid){
    tabid=k;
    return function(event){
        if(window.event)
        keynum=window.event.keyCode;
        else
        keynum=event.which
        if(keynum==13){
            try{            
            document.getElementsByTagName("INPUT")[tabid].focus();
            }catch(input){}
            return false;
        }
    }
}

var html_doc = document.getElementsByTagName('head')[0];
js = document.createElement('script');
js.setAttribute('type', 'text/javascript');
html_doc.appendChild(js);
js.onreadystatechange = function () {
    if (js.readyState == 'complete') {
        setkeydown();
    }
}

js.onload = function () {
    setkeydown();
}

function onEnter(){
if(window.event){
if(window.event.keyCode==13) window.event.keyCode=9;
}
else{
if(event.which==13) event.which=9;
}
}