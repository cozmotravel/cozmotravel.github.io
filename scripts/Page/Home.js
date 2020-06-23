var CONTEXT_GET_PWD='Getting User Password'
var loadingPage='';
var titleLastWindow=''
var counter;
var oCounter;

var MaxTab = 5;
var CurrentTab=0;
var iframeArr=new Array();
TabControl={
Create:function(Element){return document.createElement(Element)},
GetNewTabID:function(){return (Math.random());},
PushIframeArray:function(DataItem){iframeArr.push(DataItem);},
PopIframeArray:function(DataItem){
var index = Array.indexOf(iframeArr,DataItem);
Array.removeAt(iframeArr, index);
return index;
},
GetIFrameLength:function(){return iframeArr.length;},
GetIFrameData:function(index){return iframeArr[index];},
GetTabNumbers:function(){
    if(document.getElementById('divIDTabHeader')!=null) 
        return document.getElementById('divIDTabHeader').childNodes.length;
    else return 1;
},
TrimSentence:function(sentence,length){
    if(sentence.length>length) return (sentence.substring(0,length)+'..');
    else return sentence;
},
ActiveTabClass:function(){return 'tabactivebutton';},
InactiveTabClass:function(){return 'tabbutton';},
IsTabExists:function(id){
var index = Array.indexOf(iframeArr,id);
if(index==-1) return false;
else return true;
},
ClearTabArray:function(){Array.clear(iframeArr);}
}
function loadpage(tabTitle,pageLink,imagelink,functionID){
        document.getElementById('divTab').style.display='block';
        var tabNumbers = TabControl.GetTabNumbers();        
        //var CommonId=TabControl.GetNewTabID();
        var CommonId=functionID;
        if(TabControl.IsTabExists(CommonId)){
        HideTabButThis(CommonId);
        return;
        }
        if(tabNumbers>MaxTab){
        alert('Cannot open more than '+MaxTab+' pages at a time!');
        return false;
        }
        TabControl.PushIframeArray(CommonId);
        var tabDiv=document.getElementById('divIDTabHeader');
        var tblHeader=document.getElementById('tblIDTabHeader');
        var trHeader=document.getElementById('trIDTabHeader');
        var tbodyHeader=document.getElementById('tbodyIDTabHeader');
        if(tabNumbers==1){
            tabDiv=TabControl.Create('div');
            tabDiv.id='divIDTabHeader';
            tabDiv.style.width='100%';
            tabDiv.style.height='100%';
            tblHeader=TabControl.Create('table');
            tblHeader.id='tblIDTabHeader';
            tblHeader.setAttribute('cellpadding',"0px");
            tblHeader.setAttribute('cellspacing',"0px");
            tblHeader.style.marginBottom='-4px';
            tblHeader.style.marginLeft='-4px';
            tblHeader.className='label';
            tbodyHeader=TabControl.Create('tbody');
            tbodyHeader.id='tbodyIDTabHeader'
            trHeader=TabControl.Create('tr');
            trHeader.id='trIDTabHeader';
        }
        var tdTitle=TabControl.Create('td');
        tdTitle.id='tdIDTabTitle_'+CommonId;
        tdTitle.style.cursor='hand';
        tdTitle.onclick=ShowTab(CommonId);
        
        var titleDiv=TabControl.Create('div')
        titleDiv.id='divIDTabTitle_'+CommonId;
                
        var top=tabDiv.offsetTop;
        var left=tabDiv.offsetLeft;
        titleDiv.style.left=left+(tabNumbers*100);
        titleDiv.style.width='100px';
        titleDiv.style.textAlign='center';
        titleDiv.style.fontSize='8pt';
        titleDiv.innerText=TabControl.TrimSentence(tabTitle,14);
        titleDiv.title=tabTitle;
        tdTitle.appendChild(titleDiv);
        trHeader.appendChild(tdTitle);
        tbodyHeader.appendChild(trHeader);
        tblHeader.appendChild(tbodyHeader);
        
        var iframeDiv=TabControl.Create('div');
        iframeDiv.id='divIDTabfra_'+CommonId;
        iframeDiv.style.height='100%';
        
        var iframe=TabControl.Create('iframe');
        iframe.id='iframeTab_'+CommonId;
        iframe.style.width='100%';
        iframe.style.height='100%';
        iframe.setAttribute('runat','server');
        iframe.setAttribute('src',pageLink);
        iframeDiv.appendChild(iframe);
                
        if(tabNumbers==1) 
        {
            tabDiv.appendChild(tblHeader,0);            
            document.getElementById('fraTab2').style.display="none";            
        }        
        tabDiv.appendChild(iframeDiv,1);
        
        document.getElementById('divTab').appendChild(tabDiv);
        HideTabButThis(CommonId);
        CurrentTab=CommonId;
        titleDiv.onmouseover = OnTabMouseOver(CommonId);
        titleDiv.onmouseout = OnTabMouseOut(CommonId);
    }
    function ShowTab(id){
    var Commonid = id;
    return function(){
        if(CurrentTab==Commonid) return false;
        for(var tabseries=0;tabseries<TabControl.GetIFrameLength();tabseries++){
            if(document.getElementById('divIDTabfra_'+TabControl.GetIFrameData(tabseries))!=null){
                document.getElementById('divIDTabfra_'+TabControl.GetIFrameData(tabseries)).style.display='none';
                document.getElementById('iframeTab_'+TabControl.GetIFrameData(tabseries)).style.display='none';
                document.getElementById('divIDTabTitle_'+TabControl.GetIFrameData(tabseries)).className=TabControl.InactiveTabClass();
            }
        }
        if(document.getElementById('divIDTabfra_'+Commonid)!=null){
            document.getElementById('divIDTabfra_'+Commonid).style.display='block';
            document.getElementById('iframeTab_'+Commonid).style.display='block';
            document.getElementById('divIDTabTitle_'+id).className=TabControl.ActiveTabClass();
            CurrentTab=Commonid;
        }
    }
    }
    
    function OnTabMouseOver(commonId){
        var DivId=commonId;
        return function(){
        document.getElementById('divIDTabTitle_'+DivId).className=TabControl.ActiveTabClass();
        }
    }
    
    function OnTabMouseOut(commonId){
        var DivId=commonId;
        return function(){
        if(CurrentTab!=DivId) document.getElementById('divIDTabTitle_'+DivId).className=TabControl.InactiveTabClass();
        }
    }
    
    function HideTabButThis(id){
        for(var tabseries=0;tabseries<TabControl.GetIFrameLength();tabseries++){
            if(document.getElementById('divIDTabfra_'+TabControl.GetIFrameData(tabseries))!=null){
                document.getElementById('divIDTabfra_'+TabControl.GetIFrameData(tabseries)).style.display='none';
                document.getElementById('iframeTab_'+TabControl.GetIFrameData(tabseries)).style.display='none';
                document.getElementById('divIDTabTitle_'+TabControl.GetIFrameData(tabseries)).className=TabControl.InactiveTabClass();
            }
        }
        if(document.getElementById('divIDTabfra_'+id)!=null){
            document.getElementById('divIDTabfra_'+id).style.display='block';
            document.getElementById('iframeTab_'+id).style.display='block';
            document.getElementById('divIDTabTitle_'+id).className=TabControl.ActiveTabClass();
        }
        CurrentTab=id;
        DisplayTabTitle();
    }
    //Tab is displayed only if more than one page is opened, otherwise it is hidden
    function DisplayTabTitle(){
        if(TabControl.GetTabNumbers()>2) document.getElementById('tblIDTabHeader').style.display='block';
        else document.getElementById('tblIDTabHeader').style.display='none';
    }
    function closeWindow(prompt){
        var TabHeaderObj=document.getElementById('divIDTabHeader');
        if(prompt==false){
            CurrentTab = -1;
            TabControl.ClearTabArray();
            if(TabHeaderObj)document.getElementById('divTab').removeChild(TabHeaderObj);
            document.getElementById('divTab').style.display='none';
        }
        else{
              if(confirm('Do you want to Close ?')){
                var commonId=CurrentTab;
                if(document.getElementById('divIDTabfra_'+commonId)!=null){
                    var RemoveFrame=document.getElementById('divIDTabfra_'+commonId);
                    TabHeaderObj.removeChild(RemoveFrame);
                    var TabTitleRow=document.getElementById('trIDTabHeader');
                    var RemoveTitle=document.getElementById('tdIDTabTitle_'+commonId);
                    TabTitleRow.removeChild(RemoveTitle)
                    var RemovedIndex=TabControl.PopIframeArray(commonId);
                    if(TabControl.GetIFrameLength()>0){
                        if(RemovedIndex==TabControl.GetIFrameLength()) 
                            HideTabButThis(TabControl.GetIFrameData((RemovedIndex-1)));
                        else HideTabButThis(TabControl.GetIFrameData(RemovedIndex));
                    }
                    else{
                        document.getElementById('divTab').removeChild(TabHeaderObj);
                        document.getElementById('divTab').style.display='none';
                        //SplitterExpandCollapse();
                    }
                    if(TabControl.GetTabNumbers()==1) document.getElementById('fraTab2').style.display="block";
                    
              }                    
            }
        }            
    }

function loadMe(id,title,url)
{
 if(url.toLowerCase().indexOf('.aspx')==-1) return;
 title=title.replace('%20',' ');
 loadpage(title,url,'',id)
// SplitterExpandCollapse();
}

//function closeWindow(prompt){
//try{
//var src=document.getElementById('fraTab1').getAttribute('src')
////var href=document.frames['fraTab1'].location.href
//var href=document.getElementById('fraTab1').getAttribute('src')
//if(href!='about:blank'){
//if(prompt==true){
//if(confirm('Do you want to Close ?')){
////document.frames['fraTab1'].location.href='about:blank'
//document.getElementById('divTab2').style.display='block';
//document.getElementById('divTab1').style.display='none';
//document.getElementById('fraTab1').src='about:blank'
//loadingPage=''
////document.getElementById('fraTab1').style.display='none';
//return(false)}
//else return(false)}
//else{
////document.frames['fraTab1'].location.href='about:blank'
//document.getElementById('divTab2').style.display='block';
//document.getElementById('divTab1').style.display='none';
//document.getElementById('fraTab1').src='about:blank'
//loadingPage='';
//return(false)}}
//else if(src!='')
//if(prompt==true){
//if(href.toLowerCase()!='about:blank'&&confirm('Do you want to Close ?'))return(true);else return(false)}
//else
//return(true)
//return(false)}
//catch(err){
//showError(err,'Home','closeWindow')}}
function init(){
if(document.getElementById('fraTab1'))document.getElementById('fraTab1').onreadystatechange=onreadystate
showElement('','divPrg')

}

function ToggleSnap(objImg,divId,tableId,aEvent){
var isExpand=(document.getElementById(divId).style.display!='none')
var imgPath='images/common/snap/'
var Event=window.event?window.event.type:aEvent;
var divArr=[['divSnap01','tabSnap01'],['divSnap02','tabSnap02'],['divSnap03','tabSnap03'],['divSnap04','tabSnap04']]
if(Event=='click'){
for(i=0;i<divArr.length;i++){
document.getElementById(divArr[i][0]).style.display='none'
document.getElementById(divArr[i][1]).className='SnapHeaderCollapsed'}
if(isExpand){
if(typeof(objImg)!='string')objImg.src=imgPath+'collapsed_toggleExpand.gif'
document.getElementById(divId).style.display='none'
document.getElementById(tableId).className='SnapHeaderCollapsed'}
else{
document.getElementById(divId).style.display='block'
if(typeof(objImg)!='string')objImg.src=imgPath+'toggle_expand.gif'
document.getElementById(tableId).className='SnapHeaderExpanded'}
document.getElementById('hdf'+divId).value=document.getElementById(divId).style.display
document.getElementById('hdf'+tableId).value=document.getElementById(tableId).className}
else if(Event=='mouseover')
if(typeof(objImg)!='string')objImg.src=imgPath+(isExpand? 'toggle_expandHover.gif':'collapsed_toggleExpandHover.gif')
else if(Event=='mouseout')
if(typeof(objImg)!='string')objImg.src=imgPath+(isExpand?'toggle_expand.gif':'collapsed_toggleExpand.gif')
else if(Event=='mousedown')
if(typeof(objImg)!='string')objImg.src=imgPath+(isExpand?'toggle_expandActive.gif':'collapsed_toggleExpandActive.gif')
else if(Event=='mouseup')
if(typeof(objImg)!='string')objImg.src=imgPath+(isExpand?'toggle_expandHover.gif':'collapsed_toggleExpandHover.gif')}
function onreadystate(id){
if(this.readyState.toLowerCase()=='complete') loadingPage='';
showProg(this.readyState!='complete')}
function showProg(show){
if(show==null){clearTimeout(oCounter);document.getElementById('lblPageLoadedTime').style.display='none';counter=new Date();setTimeout('showCounter();',500) ;document.getElementById('lblCounter').innerHTML='(0)';show=true;}
else 
{
//document.getElementById('lblPageLoadedTime').style.display=(show?'none':'block')
//always hide
document.getElementById('lblPageLoadedTime').style.display='none';
}
if(show==false) clearTimeout(oCounter);
//document.getElementById('lblPrgText').innerText='Loading \'' + titleLastWindow + '\'... ';
var obj=document.getElementById('upProgress')
if(obj==null)return
var isOk=(document.getElementById('fraTab1').src.toLowerCase()=='about:blank');
document.getElementById('tdClose').style.display=(isOk?'none':'block')

//alert('display:'+ document.getElementById('tdClose').style.display + 'show:' + show )
if(show){showElement('','upProgress');showElement('','upProgress')}

obj.style.display=(show?'block':'none')}
function showCounter()
{
 
 document.getElementById('lblCounter').innerHTML=((new Date()-counter)/1000) + ' second(s)' ;
 document.getElementById('lblPageLoadedTime').innerHTML='Last page loaded in: ' + document.getElementById('lblCounter').innerHTML;
 if(oCounter)clearTimeout(oCounter);
 oCounter=setTimeout('showCounter();',500);
 //document.getElementById('lbltest').innerText=new Date();
 
}
function setVisibility(divId,hdfId,state){
try{
state=(state=='true'?'block':'none')
GetObject(divId).style.display=state
GetObject(hdfId).value=state}
catch(err){
showError(err,'Home','setVisibility')}}
function SetHiddenValue(field,value){
try{
document.getElementById(field).value=value}
catch(err){
showError(err,'Home','SetHiddenValue')}}
function RefreshSetting(){
try{
GetObject('divAuthRequired').style.display=GetValue('hdfdivAuthRequired')
GetObject('divLogin').style.display=GetValue('hdfdivLogin')
GetObject('divSnap01').style.display=GetValue('hdfdivSnap01')
GetObject('divSnap02').style.display=GetValue('hdfdivSnap02')
GetObject('divSnap03').style.display=GetValue('hdfdivSnap03')
GetObject('divSnap04').style.display=GetValue('hdfdivSnap04')
GetObject('divUtility').style.display=GetValue('hdfdivUtility')
GetObject('divAbout').style.display=GetValue('hdfdivAbout')
GetObject('tabLogin').className=GetValue('hdftabLogin')
GetObject('tabSnap01').className=GetValue('hdftabSnap01')
GetObject('tabSnap02').className=GetValue('hdftabSnap02')
GetObject('tabSnap03').className=GetValue('hdftabSnap03')
GetObject('tabSnap04').className=GetValue('hdftabSnap04')
GetObject('tabUtility').className=GetValue('hdftabUtility')
GetObject('tabAbout').className=GetValue('hdftabAbout')}
catch(err){
showError(err,'Home','RefreshSetting')}}
function closeOpener(){
try{
if(window.opener !=null){window.opener.opener=null;window.opener.close();}}
catch(err){showError(err,'Home','closeOpener');}}
function LoadPage(pageUrl){
var src=document.getElementById('fraTab1').getAttribute('src')
var href=parent.frames['fraTab1'].location.href
if(href=='about:blank')href=''
if(href!=''){
alert('Please Close the Window and try !')
return(false)}
else
return(true)}
//function loadpage(title,pagelink,imagelink){
//try{
////new

//if(loadingPage!='' && navigator.appName.substring(0,1)!='N')
//{
// if(loadingPage==title)
// {if(!confirm('The Page \'' + loadingPage + '\' is being loaded... !\r\n' + ' Do you want to re-load again ?'))return;}
// else 
// {if(!confirm('The Page \'' + loadingPage + '\' is being loaded... !\r\n' + ' Do you want to open \'' + title + '\' now ?' ))return;}
//}
////var href=document.frames['fraTab1'].location.href.toLowerCase()
//var href=document.getElementById('fraTab1').src.toLowerCase()
//pagelink=pagelink.toLowerCase()
//if(href=='about:blank' || href.indexOf('prelogin.aspx')!=-1 || href.indexOf('postlogin.aspx')!=-1)href=''
//href=href.toLowerCase()
//if(href!=''){
//if(href.indexOf(pagelink)!=-1 &&  loadingPage=='' || titleLastWindow==title){
//alert('\''+title+'\' already open !' )}
//else{
//    if(titleLastWindow!=title && confirm(titleLastWindow+' page is already opened! \n' + 'Do you want to open \''+title+'\' in new window?')){
//    if(typeof(showProg)=='function') showProg();
////document.frames['fraTab1'].location.href=pagelink
////document.getElementById('fraTab1').src=pagelink
//    window.open(pagelink,null,"toolbar=no,left=0,top=0,height=800,width=1000,location=no,scrollbars=yes");
////titleLastWindow=title
//    }
////    else{
////        if(typeof(showProg)=='function') showProg();
////        document.getElementById('fraTab1').src=pagelink;
////        titleLastWindow=title;
////    }
//}
//}
//else{
//if(typeof(showProg)=='function') showProg();
////document.frames['fraTab1'].location.href=pagelink
//document.getElementById('fraTab1').src=pagelink
//titleLastWindow=title
//loadingPage=title;
//}
//document.getElementById('divTab1').style.display='block';document.getElementById('divTab2').style.display='none';
//}
//catch(err){
//showError(err,'Home','loadpage')}}
function CreateMRU(id,title,pagelink,imagelink){
try{
var curLink="<span style=\"margin-left:10px\"><img src='"+imagelink+"' /> <a href=\"javascript:loadpage(\'"+id+"\',\'"+title+"\',\'"+pagelink+"\',\'"+imagelink+"\');\">"+title+"</a><br /></span>"
var preLink=document.getElementById('lblMRU').innerHTML
if(preLink.indexOf(pagelink)==-1)document.getElementById('lblMRU').innerHTML=document.getElementById('lblMRU').innerHTML+curLink}
catch(err){
showError(err,'Home','CreateMRU')}}
function showForgetPwd(flag){
try{
var isShow
if(flag=='undefined')isShow=true;else isShow=(flag!='false')
document.getElementById('divlnkForgetPwd').style.display=(isShow?'none':'block')
document.getElementById('divForgetPwd').style.display=(isShow?'block':'none')
if(isShow)document.getElementById('txtForgetPwd').focus()}
catch(err){
showError(err,'Home','showForgetPwd')}}
function getPwd()
{
try
{
var email=document.getElementById('txtForgetPwd').value;
statusForgetPwd('',false);
if (isEmailAddress('txtForgetPwd'))
{
statusForgetPwd('Please Wait...',false)
PageMethods.OnGetPassword(email,OnSuccess,OnFailure,CONTEXT_GET_PWD)
}
else
statusForgetPwd('Invalid Login ID',true);
}
catch(err){showError(err,'Home','getPwd');}
}
function statusForgetPwd(status,critical)
{
 var obj=document.getElementById('statusPwd');
 obj.innerText=status;
 obj.style.color=(critical?'#FF0000':'#0000FF')
}

function OnSuccess(result,userContext,methodName)
{
  if(userContext==CONTEXT_GET_PWD && result!=null)
  {
   if(result.Status)
   {
    statusForgetPwd(result.Message,false);
    document.getElementById('txtForgetPwd').value='';
   }
   else
    {
    statusForgetPwd(result.Message,true);
    }
   
  }
}
function OnFailure(result,userContext,methodName)
{
 showForgetPwd('Error while ' + userContext,true);
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  