var loadState
var prefix='ctl00_'
var enableDrag=false
var ie5=document.all&&document.getElementById
var ns6=document.getElementById&&!document.all

var PREFIX_MASTER='ctl00_cphTransaction_'

$$=function(obj){return document.getElementById(obj)}
$={
    toggle:function(showId,hideId) {
       $$(PREFIX_MASTER+showId).style.display='block';
       $$(PREFIX_MASTER+hideId).style.display='none';
    },

    clear:function(arr){        
        for(i=0;i<arr.length;i++){       
            clearElement(arr[i],true);
//            eval("$$('"+PREFIX_MASTER+arr[i][0]+"')."+arr[i][1]+"="+arr[i][2]);
        }
        
    },
    update:function(obj,val){
    $$(PREFIX_MASTER+obj).value=val;
    },
    hide:function(obj)
    {    
    $$(PREFIX_MASTER+obj).style.display='none';
    },
    show:function(obj){   
    $$(PREFIX_MASTER+obj).style.display='';
    }
}
function showhide(tabid){
    a=document.getElementById(PREFIX_MASTER+tabid).style.display;
    b=document.getElementById(PREFIX_MASTER+'span'+tabid);
    if(a=='block'||a==''){
         setElementData('hdf'+tabid,0);
        b.style.fontWeight='normal';
        b.className='expand';
        document.getElementById(PREFIX_MASTER+tabid).style.display='none';
    }
    else{
        setElementData('hdf'+tabid,1);
        b.style.fontWeight='bold';
        b.className='collapse';
        document.getElementById(PREFIX_MASTER+tabid).style.display='block';
    }            
}
function initializeDrag(e,divWindow){
try{
offsetx=ie5? event.clientX : e.clientX
offsety=ie5? event.clientY : e.clientY
tempx=parseInt($$(divWindow).style.left)
tempy=parseInt($$(divWindow).style.top)
enableDrag=true
$$(divWindow).onmousemove=Function("startDrag('"+divWindow+"');")}
catch(err){showError(err,'Transaction','initializeDrag');}}
function unloadSubform(divMain,div,fname){
if(confirm('Do you want to Close ?'))
{window.close();}}
function RefreshSetting(){
try{
//loadWindowSetting('hdfSearch','divSearchbar','divContentSearch','imgMinSearch','','imgExitSearch')
//showProcess();
ApplyProperyCss()
}
catch(err){
showError(err,'Transaction','RefreshSetting')}}
function showFormalert(fieldId,messageTitle,messages,e){
try{
showAlert(fieldId,messageTitle,messages,1,e)}
catch(err){
showError(err,'Transaction','showFormAlert')}}
function showException(title,messages){
$$('ctl00_lblTitleStatus').innerText=title
$$('ctl00_lblStatusDetail').innerText=messages
showSnapById(0);makeMessageNormal('false')
showElement('','divStatusbar')

}
function loadWindowSetting(hdfId,divWindow,divContent,imgIdMin,imgIdRestore,imgIdClose){
try{
hdfId=prefix+hdfId
if(!$$(hdfId))return
var value=$$(hdfId).value
var values=value.split('|')
var obj
if(values.length==13){
obj=$$(divWindow)
obj.style.left=values[0];obj.style.top=values[1];obj.style.width=values[2];obj.style.height=values[3];obj.style.display=values[4]
obj=$$(divContent)
obj.style.left=values[5];obj.style.top=values[6];obj.style.width=values[7];obj.style.height=values[8];obj.style.display=values[9]}}
catch(err)
{showError(err,'Transaction','loadWindowSetting');}}
function updateUI(items){
try{
var obj
for(var i=0;i<items.length;i++){
obj=$$(items[i])
if(obj.cssDisabled&&obj.cssEnabled){
if(obj.disabled)
obj.className=obj.cssDisabled
else
obj.className=obj.cssEnabled}
}}
catch(err){
showError(err,'Transaction','updateUI')}}
function ApplyProperyCss(){
try{
var obj
for(var i=0;i<document.forms[0].elements.length;i++){
obj=document.forms[0].elements[i]
if(obj.className!=null && obj.className!='')
{
if(obj.disabled)
obj.className=obj.className.replace('Enabled','Disabled');
else
obj.className=obj.className.replace('Disabled','Enabled')
}
}
var divs=document.getElementsByTagName('div')
for(var i=0;i<divs.length;i++){
if(divs[i].firstChild&&divs[i].cssDisabled&&divs[i].cssDisabled){
divs[i].className=divs[i].firstChild.disabled? divs[i].cssDisabled:divs[i].cssEnabled}}}
catch(err){
showError(err,'Transaction','ApplyProperyCss')}}
function ApplyProperyCss2(){
try{
for(var i=0;i<document.forms[0].elements.length;i++){
var objectType=document.forms[0].elements[i].type
if(objectType=='text' || objectType=='password'||objectType=='textarea'||objectType=='select-one' ||objectType=='list'||objectType=='checkbox'){
var className=document.forms[0].elements[i].className
if(document.forms[0].elements[i].disabled)
document.forms[0].elements[i].className=className.replace('Disabled','')+'Disabled'
else
document.forms[0].elements[i].className=className.replace('Disabled','')}}
var divs=document.getElementsByTagName('div')
for(var i=0;i<divs.length;i++){
var className=divs[i].className
if(className=='divScroll' ||className=='divScrollDisabled'){
if(divs[i].firstChild){
if(divs[i].firstChild.disabled)
divs[i].className='divScrollDisabled'
else
divs[i].className='divScroll'}
else
divs[i].className='divScrollDisabled'}}}
catch(err){
showError(err,'Transaction','ApplyProperyCss')}}
function startDrag(divWindow){
try{
if(ie5&&enableDrag&&event.button==1){
$$(divWindow).style.top=tempy+event.clientY-offsety+'px'}
else if(ns6&&enableDrag){
$$(divWindow).style.top=tempy+e.clientY-offsety+'px'}}
catch(err){showError(err,'Transaction','startDrag');}}
function stopDrag(divWindow){
try{
enableDrag=false
$$(divWindow).onmousemove=null}
catch(err){showError(err,'Transaction','stopDrag');}}
function saveWindowSetting(hdfId,divWindow,divContent,imgIdMin,imgIdRestore,imgIdClose){
try{
var winLeft,winTop,winWidth,winHeight,winDisplay
var cntLeft,cntTop,cntWidth,cntHeight,cntDisplay
var img_min,img_restore,img_close
var obj
hdfId=prefix+hdfId
obj=$$(divWindow)
winLeft=obj.style.left;winTop=obj.style.top;winWidth=obj.style.width;winHeight=obj.style.height;winDisplay=obj.style.display
obj=$$(divContent)
cntLeft=obj.style.left;cntTop=obj.style.top;cntWidth=obj.style.width;cntHeight=obj.style.height;cntDisplay=obj.style.display
obj=$$(imgIdMin);img_min=obj.src
obj=$$(imgIdClose);img_close=obj.src
$$(hdfId).value=winLeft+'|'+winTop+'|'+winWidth+'|'+winHeight+'|'+winDisplay+'|'+cntLeft+'|'+cntTop+'|'+cntWidth+'|'+cntHeight+'|'+cntDisplay+'|'+img_min+'|'+img_restore+'|'+img_close}
catch(err){showError(err,'Transaction','saveWindowSetting');}}
function toggleMinimize(imgObj,divContent,divWindow){
try{
var obj=$$(divContent)
var isVisible=(obj.style.display!='none')
obj.style.display=(isVisible?'none':'')}
catch(err){showError(err,'Transaction','toggleMinimize');}}
function showSnapById(snapId,flag){
try{
if(snapId==0){
showSnap('divStatusbar','divContentStatus',2,flag)}
else if(snapId==1){
showSnap('divSearchbar','divContentSearch',2,flag)
saveWindowSetting('hdfSearch','divSearchbar','divContentSearch','imgMinSearch','','imgExitSearch')}}
catch(err){showError(err,'Transaction','showSnapById');}}
function showStatusHelp(flag){
try{
var obj=$$('divStatusHelp')
if(obj)obj.style.display=(flag=='false'?'none':'block')}
catch(err){
showError(err,'Transaction','showStatusHelp')}}
function makeMessageNormal(flag){
try{
var obj=$$('divContentStatus')
if(obj)obj.style.display=(flag=='false'?'block':'none')
var obj=$$('tabStatus')
if(obj)obj.className=(flag=='false'?'titlebarStatus':'titlebarStatusDeactive')}
catch(err){showError(err,'Transaction','makeMessageNormal');}}
function showSnap(divWindow,divContent,position,flag){
try{
var obj=$$(divWindow)
var height='130px';
//alert($$(divContent).style.height)
var topPosition
if(position==0)
topPosition=50
else if(position==1)
topPosition=(parseInt(getContentDocument().clientHeight)/2)-(parseInt(height)/2)
else if(position==2)
topPosition=parseInt(getContentDocument().clientHeight)-parseInt(height)-88+'px'
obj.style.top=topPosition
obj.style.display=(flag=='false'?'none':'block')
obj=$$(divContent)
obj.style.display=(flag=='false'?'none':'block')}
catch(err){showError(err,'Transaction','showSnap');}}
function prepareEmail(){
var mailto='vijesh@infodynamic.net; subu@infodynamic.net; shahul@infodynamic.net'
var mailcc='rajakumar@infodynamic.net';
var subject="Support Required(eDrive)"
var bodyText=$$('ctl00_lblStatusDetail').outerText
window.location='mailto:'+mailto+'?CC='+mailcc+'&Subject='+subject+'&Body='+bodyText
return(false)}
function OpenHelpDesk(){
window.open("http://www.idservices.ae/helpdesk","_blank")
return(false)}
function copyLabel(lblId,hdfId){
try{
lblId=prefix+lblId
$$(hdfId).value=$$(lblId).innerText
var range=$$(hdfId).createTextRange()

range.select()
range.execCommand('Copy')}
catch(err){
showError(err,'Transaction','copyLabel')}}
function toggleMinimize(imgObj,divContent,divWindow){
try{
var obj=$$(divContent)
var isVisible=(obj.style.display!='none')
obj.style.display=(isVisible?'none':'')}
catch(err){showError(err,'Transaction','toggleMinimize');}}
function toggleMaximize(imgObj,divWindow,divContent){
try{
var obj=$$(divContent)
var isVisible=(obj.style.display!='none')
obj.style.width=ns6? window.innerWidth-20+'px' : getContentDocument().clientWidth+'px'
obj.style.height=ns6? window.innerHeight-20+'px' : getContentDocument().clientHeight+'px'}
catch(err)
{showError(err,'Transaction','toggleMaximize');}}
function getContentDocument(){
return((!window.opera&&document.compatMode&&document.compatMode!="BackCompat")? document.documentElement : document.body)}
function blinkMessageWindow(tabId,divWindow){
try{
var obj=$$(tabId)
if(obj)obj.className=(obj.className=='SnapHeaderExpandedErrorBright'?'SnapHeaderExpandedError':'SnapHeaderExpandedErrorBright')
obj=$$(divWindow)
var isVisible=(obj&&obj.style.display!='none'?'true':'false')
if(isVisible=='true')blinkId=window.setTimeout("blinkMessageWindow('"+tabId+"','"+divWindow+"')",1000)}
catch(err){showError(err,'Transaction','blinkMessageWindow');}}
function GetSelectedRow(){
try{
var grid=ISGetObject("ctl00_grdEdit")
var isExpand=($$('divContentSearch').style.display!='none')
if(!isExpand){
return false}
else if(grid.GetSelectedObject()==null){
alert("Please select a row.")
return false}
var row=grid.GetSelectedObject().GetRowObject()
if(row.Type=="Record"){
$$('ctl00_hidRow').value=row.KeyValue
return(row.KeyValue!=null)}}
catch(err)
{showError(err,'Transaction','GetSelectedRow');}}
function Refresh(grdId){
try{
var grid=ISGetObject(grdId)
grid.ClearSelectedObject()
grid.Refresh()
return(false)}
catch(err){
showError(err,'Transaction','Refresh')
return(false)}}
function Save(){
try{
if(isValid())return(true);else return(false)}
catch(err){
showError(err,'Transaction','Save')
return(false)}}
function Delete(){
if(confirm('Do you want to Delete ?'))
return(true)
else
return(false)}
function Add(){
return(true)}
function Search(){}
function Clear(){
return(true)}
function Report(){
return(true)}
function Help(){
return(false)}
function isValid(){
return(true)}
function showFormAlert(fieldId,messageTitle,messages,e){
try{
if(messages!=''&& e!='blur')alert(messages)}
catch(err){
showError(err,'Transaction','showFormAlert')}}
function showAlert(fieldId,title,msgs,msgType,e){
try{
//if(e==null) e='click';
var obj=$$('divMsg')
if(obj==null)return
if(msgs=='' || title==''){obj.style.display='none';return;}else obj.style.display='block'
obj.style.position='absolute'
//obj.style.width=(event&&event.type=='click' ?'100%':'300px')
obj.style.width=(e!='blur' ?'300px':'100%')
$$(prefix+'lblMsgTitle').innerText=title
$$(prefix+'lblMsg').innerHTML=msgs
var titleClass,contentClass
//if(event&&event.type=='blur')msgType=2
if(e=='blur')msgType=2
switch(msgType){
case 1:$$('imgMsg').className='msgInfo';titleClass='titleMsgInfo';contentClass='contentMsgInfo';break
case 2:$$('imgMsg').className='msgWar';titleClass='titleMsgWar';contentClass='contentMsgWar';break
case 3:$$('imgMsg').className='msgErr';titleClass='titleMsgErr';contentClass='contentMsgErr';break}
$$('tdTitle1').className=titleClass
$$('tdTitle2').className=titleClass
$$('tdTitle3').className=titleClass
$$('tdContent').className=contentClass
$$('tdFooter').className=contentClass
//$$('divMsgText').style.height=(event&&event.type=='click'?'150px':'35px')

$$('divMsgText').style.height=(e!='blur'?'35px':'150px')
showElement(fieldId,'divMsg')}
catch(err){
showError(err,'Transaction','showAlert')}}
function closeAlert(){
$$('divMsg').style.display='none'}
//function toggleSnapStateChild(divbar,divContent){
//try{
//obj=$$(divContent)
//var isVisible=(obj.style.display!='none')
//obj.style.display=(isVisible?'none':'')
//obj=$$(divbar)
//if(isVisible)
//obj.className='titlebarSnapChild1Deactive'
//else
//obj.className='titlebarSnapChild1'}
//catch(err){
//showError(err,'Transaction','toggleSnapStateChild')}}
//function ShowElement(fieldId,idmsg){
//$$(idmsg).style.display='block'
//$$(fieldId).style.display='block'}
//function toggleSnapState(divbar,divContent){
//try{
//obj=$$(divContent)
//var isVisible=(obj.style.display!='none')
//obj.style.display=(isVisible?'none':'')
//obj=$$(divbar)
//if(isVisible)
//obj.className='titlebarSnapRootDeactive'
//else
//obj.className='titlebarSnapRoot'}
//catch(err){
//showError(err,'Transaction','toggleSnapState')}}
//function loadForm(fname,link){
//try{
//var href=frames[fname].location.href
//if(href=='about:blank')
//{
//if(typeof(showProg)=='function') showProg();
//frames[fname].location.href=link}
//}
//catch(err){
//showError(err,'Transaction','loadFrm')}}
function loadForm(fname,link){
try{ if(typeof(document.frames)=="undefined"){ 
 var href=$$(fname).src;
 if(href=='about:blank'||href==''){if(typeof(showProg)=='function') showProg();
 $$(fname).src=link;
 }}
 else{var href=frames[fname].location.href;
 if(href=='about:blank'){if(typeof(showProg)=='function') showProg();
 frames[fname].location.href=link
 }}
}
catch(err){showError(err,'Transaction','loadFrm')}}

function loadFrm(div,fname,link){
try{
if($$(div).style.display!='none'){
var href=frames[fname].location.href
if(href=='about:blank')frames[fname].location.href=link}}
catch(err){
showError(err,'Transaction','loadFrm')}}
function unloadSubForm(divMain,div,fname){
try{
if(confirm('Do you want to Close ?')){
var objDiv=window.parent.$$(div)
objDiv.style.display='none'
var objDiv=window.parent.$$(divMain)
objDiv.style.display='block'
window.parent.document.frames[fname].location.href='about:blank'}}
catch(err){
showError(err,'Transaction','unloadSubForm')}}
function getElement(id){
return($$(PREFIX_MASTER+id))}
function setElementData(id,value,setText){
try{
var obj=getElement(id)
if(value==null)value=''
if(obj==null)return(false)
if(obj.type=='text'||obj.type=='password'||obj.type=='textarea'||obj.type=='hidden')
obj.value=trim(value)
else if(obj.type=='checkbox' || obj.type=='radio'){
obj.checked=((value==true|| value.toString().toLowerCase()=='true'|| value=='1' || value=='Y')?true:false)}
else if(obj.type=='select-one'){
obj.value=value}
else{
var index=0;var list=getElement(id+'_'+index)
while(list!=null){
if(list.type=='radio'&&list.value==value){list.checked=true;break;}
index++
list=getElement(id+'_'+index)}}
if(obj.disabled&&(obj.type=='text' ||obj.type=='textarea'))obj.title=value
return(true)}
catch(err){
showError(err,'Transaction','setElementData('+id+','+value+')')
return(false)}}
function getElementData(id,returnText){
try{
var obj=getElement(id)
if(obj==null)return('')
var val
if(obj.type=='text' ||obj.type=='password'||obj.type=='textarea' || obj.type=='hidden')
val=obj.value
else if(obj.type=='select' || obj.type=='select-one'||obj.type=='select-multiple'){
if(returnText){
if(obj.selectedIndex>0)val=obj.options[obj.selectedIndex].text}
else
val=obj.value}
else if(obj.type=='checkbox'){
val=obj.checked?'Y':'N'}
else{
var index=0;var list=getElement(id+'_'+index)
while(list!=null){
if(list.type=='radio'&&list.checked)
{val=list.value;break;}
else if(list.type=='checkbox'&&list.checked)
{val=val+','+list.value;}
index++
list=getElement(id+'_'+index)}}
if(val==null)val=''
return(val)}
catch(err){
showError(err,'Transaction','getElementData('+id+')')
return('ERR')}}
function clearElement(id,enable){
try{
var obj=getElement(id)
//alert("id="+id+",type="+obj.type);
if(obj==null)return
if(obj.type=='text' ||obj.type=='password' || obj.type=='textarea' || obj.type=='hidden')
obj.value=''
else if(obj.type=='select' ||obj.type=='select-one' || obj.type=='select-multiple')
obj.selectedIndex=0
else if(obj.type=='checkbox'){
obj.checked=false
obj.disabled='true'}
else{
var index=0
var list=getElement(id+'_'+index)
while(list!=null){
if(list.type=='checkbox' || list.type=='radio'){
list.checked=false
list.disabled=(enable?false:true)}
index++
var list=getElement(id+'_'+index)}}
obj.disabled=(enable?false:true)}
catch(err){
showError(err,'Transaction','clearElement('+id+')')}}

function getElementPropValue(id,defaultValue)
{
 try
 {
 var val=getElementData(id);
 if(val==null || val=='') {if(defaultValue==null) defaultValue='';val=defaultValue;}
 return(val);
 
 }
 catch(err){
 showError(err,'Transaction','getElementPropValue');}}
 
 closeMe
 function setElementFocus(id)
 {
 
 try { $$(PREFIX_MASTER+id).focus();}
 catch(err){}
 }
 function closeMe()
 {
 if(window.parent.closeWindow) 
   window.parent.closeWindow(true); 
 else 
  {if(confirm('Do you want to close ?')) window.close();}

 }
 function showStatus(index){
 try
 {
 switch(index)
 {
 case 0: window.status='';break;
 case 1:window.status='Saves or Updates current transaction !';break;
 case 2:window.status='Shows all the list of trasactions that have been saved !';break;
 case 3:window.status='Clears current transaction so that new transaction can be started !';break;
 case 4:window.status='Permanently deletes current transaction which is being opened for Edit !';break;
 case 5:window.status='Sends the current transaction to the Portal !';break;
 }
 }
 catch(err)
 {
 showError(err,'Transaction','showStatus');
 }
 }
function showWarn(messageTitle,messages){
try{
showAlert('',messageTitle,messages,2,'')}
catch(err){
showError(err,'Transaction','showWarn')}}
function DoRowSelect(gridId, tblName, rowIdx, rowElm)
{
	GetSelectedRow();
}
             