window.onresize=fitContent;

function fitContent(content)
{    
	var content='divContent';
    var obj=document.getElementById(content);
    if(obj) 
    {
    
        if(document.documentElement.clientHeight>0)
        {        
        obj.style.width=document.documentElement.clientWidth-16+'px';    
        obj.style.height=document.documentElement.clientHeight-40+'px';
        }
        else
        {
        obj.style.width=document.body.clientWidth-16+'px';    
        obj.style.height=document.body.clientHeight-40+'px';
        }
    }
}
function setScroll(val, posId) 
{
    posId.value = val.scrollTop;
}

