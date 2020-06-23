var scwDateNow=new Date(Date.parse(new Date().toDateString()))
var scwBaseYear=scwDateNow.getFullYear()-20
var scwDropDownYears=20
var scwLanguage
scwToday='Today'
scwClear='Clear'
scwDrag='click here to drag'
scwArrMonthNames=['Jan','Feb','Mar','Apr','May','Jun',
'Jul','Aug','Sep','Oct','Nov','Dec']
scwArrWeekInits=['S','M','T','W','T','F','S']
scwInvalidDateMsg='The entered date is invalid.\n'
scwOutOfRangeMsg='The entered date is out of range.'
scwDoesNotExistMsg='The entered date does not exist.'
scwInvalidAlert=['Invalid date (',') ignored.']
scwDateDisablingError=['Error ',' is not a Date object.']
scwRangeDisablingError=['Error ',' should consist of two elements.']
function scwSetDefaultLanguage(businessName)
{try{scwSetLanguage()}
catch(exception){
scwToday='Today'
scwClear='Clear'
scwDrag='click here to drag'
scwArrMonthNames=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
scwArrWeekInits=['S','M','T','W','T','F','S']
scwInvalidDateMsg=businessName+' is invalid.\n'
scwOutOfRangeMsg=businessName+' is out of range.'
scwDoesNotExistMsg=businessName+' date does not exist.'
scwInvalidAlert=['Invalid date (',') ignored.']
scwDateDisablingError=['Error ',' is not a Date object.']
scwRangeDisablingError=['Error ',' should consist of two elements.']}}
var scwWeekStart=1
var scwWeekNumberDisplay=false
var scwWeekNumberBaseDay=4
var scwShowInvalidDateMsg=true,scwShowOutOfRangeMsg=true,scwShowDoesNotExistMsg=true,
scwShowInvalidAlert=true,scwShowDateDisablingError=true,scwShowRangeDisablingError=true
var scwArrDelimiters=['/','-','.',',',' ',':']
var scwDateDisplayFormat='DD-MMM-YYYY'
var scwDateOutputFormat='DD-MMM-YYYY'
var scwDateInputSequence='DMY'
var scwZindex=1
var scwBlnStrict=true
var scwEnabledDay=[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]
var scwDisabledDates=new Array()
var scwActiveToday=true
var scwOutOfMonthDisable=false
var scwOutOfMonthHide=false
var scwOutOfRangeDisable=true
var scwAllowDrag=false
var scwClickToHide=false
var scwTargetEle,scwTriggerEle,scwMonthSum=0,scwBlnFullInputDate=false,scwPassEnabledDay=new Array(),scwSeedDate=new Date(),scwParmActiveToday=true,scwWeekStart=scwWeekStart%7,scwToday,scwDrag,scwArrMonthNames,scwArrWeekInits,scwInvalidDateMsg,scwOutOfRangeMsg,scwDoesNotExistMsg,scwInvalidAlert,scwDateDisablingError,scwRangeDisablingError
Date.prototype.scwFormat=function(scwFormat)
{var charCount=0,codeChar='',result=''
for(var i=0;i<=scwFormat.length;i++)
{if(i<scwFormat.length&&scwFormat.charAt(i)==codeChar){
charCount++}
else{switch(codeChar)
{case 'y': case 'Y':
result+=(this.getFullYear()%Math.
pow(10,charCount)).toString().scwPadLeft(charCount)
break
case 'm': case 'M':
result+=(charCount<3)
?(this.getMonth()+1).toString().scwPadLeft(charCount)
:scwArrMonthNames[this.getMonth()]
break
case 'd': case 'D':
result+=this.getDate().toString().scwPadLeft(charCount)
break
default:
while(charCount-->0){result+=codeChar}}
if(i<scwFormat.length){
codeChar=scwFormat.charAt(i)
charCount=1}}}
return result}
String.prototype.scwPadLeft=function(padToLength)
{var result=''
for(var i=0;i<(padToLength-this.length);i++){result+='0'}
return(result+this)}
function scwID(id){return document.getElementById(id)}
var scwNextActionReturn,scwNextAction
function showCal(scwEle,scwSourceEle){scwShow(scwEle,scwSourceEle)}
function scwShow(scwEle,scwSourceEle,businessName,baseYearLimit,dropDownYears,weekStartDay,weekNumberDisplay,weekNumberBaseDay,allowDrag,outOfMonthDisable,outOfMonthHide,HorizontalAlignment,VerticalAlignment,OffsetLeftAlignment,OffsetTopAlignment){
scwTriggerEle=scwSourceEle
scwBaseYear=scwDateNow.getFullYear()-baseYearLimit
scwDropDownYears=dropDownYears
scwWeekStart=weekStartDay
scwWeekNumberDisplay=weekNumberDisplay
scwWeekNumberBaseDay=weekNumberBaseDay
scwAllowDrag=allowDrag
scwOutOfMonthDisable=outOfMonthDisable
scwOutOfMonthHide=outOfMonthHide
scwID('scwFootError').innerHTML=''
scwParmActiveToday=true
for(var i=0;i<7;i++)
{scwPassEnabledDay[(i+7-scwWeekStart)%7]=true}
scwSeedDate=scwDateNow
if(typeof scwEle.value=='undefined')
{var scwChildNodes=scwEle.childNodes
for(var i=0;i<scwChildNodes.length;i++)
if(scwChildNodes[i].nodeType==3)
{var scwDateValue=scwChildNodes[i].nodeValue.replace(/^\s+/,'').replace(/\s+$/,'')
if(scwDateValue.length>0)
{scwTriggerEle.scwTextNode=scwChildNodes[i]
scwTriggerEle.scwLength=scwChildNodes[i].nodeValue.length
break}}}
else
{var scwDateValue=scwEle.value.replace(/^\s+/,'').replace(/\s+$/,'');}
scwSetDefaultLanguage(businessName)
scwID('scwDragText').innerHTML=scwDrag
scwID('scwMonths').options.length=0
for(var i=0;i<scwArrMonthNames.length;i++)
scwID('scwMonths').options[i]=new Option(scwArrMonthNames[i],scwArrMonthNames[i])
scwID('scwYears').options.length=0
for(var i=0;i<scwDropDownYears;i++)
scwID('scwYears').options[i]=new Option((scwBaseYear+i),(scwBaseYear+i))
for(var i=0;i<scwArrWeekInits.length;i++)
scwID('scwWeekInit'+i).innerHTML=scwArrWeekInits[(i+scwWeekStart)%scwArrWeekInits.length]
if(scwID('scwFoot')){
scwID('scwFoot').innerHTML=scwToday
scwID('scwFoot').title=scwDateNow.scwFormat(scwDateDisplayFormat)}
if(scwID('scwFootClear'))
scwID('scwFootClear').innerHTML=scwClear
if(scwDateValue.length==0){
scwBlnFullInputDate=false
if((new Date(scwBaseYear+scwDropDownYears,0,0))<scwSeedDate ||(new Date(scwBaseYear,0,1))>scwSeedDate)
{scwSeedDate=new Date(scwBaseYear+Math.floor(scwDropDownYears/2),5,1)}}
else
{function scwInputFormat()
{var scwArrSeed=new Array(),scwArrInput=scwDateValue.split(new RegExp('[\\'+scwArrDelimiters.join('\\')+']+','g'))
if(scwArrInput[0]!=null)
{if(scwArrInput[0].length==0)scwArrInput.splice(0,1)
if(scwArrInput[scwArrInput.length-1].length==0)
scwArrInput.splice(scwArrInput.length-1,1)}
scwBlnFullInputDate=false
switch(scwArrInput.length)
{case 1:{
scwArrSeed[0]=parseInt(scwArrInput[0],10)
scwArrSeed[1]='6'
scwArrSeed[2]=1
break}
case 2:{
scwArrSeed[0]=parseInt(scwArrInput[scwDateInputSequence.replace(/D/i,'').search(/Y/i)],10)
scwArrSeed[1]=scwArrInput[scwDateInputSequence.replace(/D/i,'').search(/M/i)]
scwArrSeed[2]=1
break}
case 3:{
scwArrSeed[0]=parseInt(scwArrInput[scwDateInputSequence.search(/Y/i)],10)
scwArrSeed[1]=scwArrInput[scwDateInputSequence.search(/M/i)]
scwArrSeed[2]=parseInt(scwArrInput[scwDateInputSequence.search(/D/i)],10)
scwBlnFullInputDate=true
break}
default:{
scwArrSeed[0]=0
scwArrSeed[1]=0
scwArrSeed[2]=0}}
var scwExpValDay=/^(0?[1-9]|[1-2]\d|3[0-1])$/,scwExpValMonth=new RegExp('^(0?[1-9]|1[0-2]|'+scwArrMonthNames.join('|')+')$','i'),scwExpValYear=/^(\d{1,2}|\d{4})$/
if(scwExpValYear.exec(scwArrSeed[0])==null ||scwExpValMonth.exec(scwArrSeed[1])==null ||scwExpValDay.exec(scwArrSeed[2])==null)
{if(scwShowInvalidDateMsg)
scwID('scwFootError').innerHTML=scwInvalidAlert[0]+scwDateValue+scwInvalidAlert[1]
scwBlnFullInputDate=false
scwArrSeed[0]=scwBaseYear+Math.floor(scwDropDownYears/2)
scwArrSeed[1]='6'
scwArrSeed[2]=1}
return scwArrSeed}
scwArrSeedDate=scwInputFormat()
if(scwArrSeedDate[0]<100)
scwArrSeedDate[0]+=(scwArrSeedDate[0]>50)?1900:2000
if(scwArrSeedDate[1].search(/\d+/)!=0)
{month=scwArrMonthNames.join('|').toUpperCase().search(scwArrSeedDate[1].substr(0,3).toUpperCase())
scwArrSeedDate[1]=Math.floor(month/4)+1}
scwSeedDate=new Date(scwArrSeedDate[0],scwArrSeedDate[1]-1,scwArrSeedDate[2])}
if(isNaN(scwSeedDate))
{if(scwShowInvalidDateMsg)
scwID('scwFootError').innerHTML=scwInvalidAlert[0]+scwDateValue+scwInvalidAlert[1]
scwSeedDate=new Date(scwBaseYear+Math.floor(scwDropDownYears/2),5,1)
scwBlnFullInputDate=false}
else{
if((new Date(scwBaseYear,0,1))>scwSeedDate)
{if(scwBlnStrict&&scwShowOutOfRangeMsg)
scwID('scwFootError').innerHTML=scwOutOfRangeMsg
scwSeedDate=new Date(scwBaseYear,0,1)
scwBlnFullInputDate=false}
else
{if((new Date(scwBaseYear+scwDropDownYears,0,0))<scwSeedDate)
{if(scwBlnStrict&&scwShowOutOfRangeMsg)
scwID('scwFootError').innerHTML=scwOutOfRangeMsg
scwSeedDate=new Date(scwBaseYear+Math.floor(scwDropDownYears)-1,11,1)
scwBlnFullInputDate=false}
else
{if(scwBlnStrict&&scwBlnFullInputDate&&(scwSeedDate.getDate()!=scwArrSeedDate[2] ||(scwSeedDate.getMonth()+1)!=scwArrSeedDate[1] ||
scwSeedDate.getFullYear()!=scwArrSeedDate[0]))
{if(scwShowDoesNotExistMsg)
scwID('scwFootError').innerHTML=scwDoesNotExistMsg
scwSeedDate=new Date(scwSeedDate.getFullYear(),scwSeedDate.getMonth()-1,1)
scwBlnFullInputDate=false}}}}
for(var i=0;i<scwDisabledDates.length;i++)
{if(!((typeof scwDisabledDates[i]=='object')&&(scwDisabledDates[i].constructor==Date)))
{if((typeof scwDisabledDates[i]=='object')&&(scwDisabledDates[i].constructor==Array))
{var scwPass=true
if(scwDisabledDates[i].length !=2)
{if(scwShowRangeDisablingError)
scwID('scwFootError').innerHTML=scwDisabledDates[i][j]+scwRangeDisablingError[1]
scwPass=false}
else
{for(var j=0;j<scwDisabledDates[i].length;j++)
{if(!((typeof scwDisabledDates[i][j]=='object')&&(scwDisabledDates[i][j].constructor==Date)))
{if(scwShowRangeDisablingError)
scwID('scwFootError').innerHTML=scwDisabledDates[i][j]+scwDateDisablingError[1]
scwPass=false}}}
if(scwPass&&(scwDisabledDates[i][0]>scwDisabledDates[i][1]))
{scwDisabledDates[i].reverse()}}
else
{if(scwShowRangeDisablingError)
scwID('scwFootError').innerHTML=scwDisabledDates[i]+scwDateDisablingError[1]}}}
scwMonthSum=12*(scwSeedDate.getFullYear()-scwBaseYear)+scwSeedDate.getMonth()
scwID('scwYears').options.selectedIndex=Math.floor(scwMonthSum/12)
scwID('scwMonths').options.selectedIndex=(scwMonthSum%12)
if(window.opera)
{scwID('scwMonths').style.display='none'
scwID('scwMonths').style.display='block'
scwID('scwYears').style.display='none'
scwID('scwYears').style.display='block'}
scwID('scwDrag').style.display=
(scwAllowDrag)?((scwID('scwIFrame'))?'block':'table-row'):'none'
scwShowMonth(0)
scwTargetEle=scwEle
var offsetTop  = parseInt(scwEle.offsetTop ,10) + OffsetTopAlignment;
var offsetLeft = parseInt(scwEle.offsetLeft,10) + OffsetLeftAlignment;
switch(HorizontalAlignment)
    {
      case 0:
        
        break;
      case 1:
        offsetLeft -= parseInt(scwEle.offsetWidth);
        break;
      case 2:
        offsetLeft -= parseInt(scwEle.offsetWidth/2); 
        break; 
      
      default:
        
        break;
    }
    switch(VerticalAlignment)
    {
      case 0:
        offsetTop -= parseInt(scw.offsetHeight,10);
        break;
      case 1:
        offsetTop += parseInt(scwEle.offsetHeight,10);
        break;
      case 2:
        offsetTop -= parseInt(scw.offsetHeight/2); 
        break; 
      
      default:
        offsetTop += parseInt(scwEle.offsetHeight,10);
        break;
    } 
if(!window.opera)
{while(scwEle.tagName!='BODY'&&scwEle.tagName!='HTML')
{offsetTop-=parseInt(scwEle.scrollTop,10)
offsetLeft-=parseInt(scwEle.scrollLeft,10)
scwEle=scwEle.parentNode}
scwEle=scwTargetEle}
do{scwEle=scwEle.offsetParent
offsetTop+=parseInt(scwEle.offsetTop,10)
offsetLeft+=parseInt(scwEle.offsetLeft,10)}
while(scwEle.tagName!='BODY'&&scwEle.tagName!='HTML')
scwID('scw').style.top=offsetTop+'px'
scwID('scw').style.left=offsetLeft+'px'
if(scwID('scwIframe')){
scwID('scwIframe').style.top=offsetTop+'px'
scwID('scwIframe').style.left=offsetLeft+'px'
scwID('scwIframe').style.width=(scwID('scw').offsetWidth-2)+'px'
scwID('scwIframe').style.height=(scwID('scw').offsetHeight-2)+'px'
scwID('scwIframe').style.visibility='visible'}
scwID('scw').style.visibility='visible'
scwID('scwYears').options.selectedIndex=scwID('scwYears').options.selectedIndex
scwID('scwMonths').options.selectedIndex=scwID('scwMonths').options.selectedIndex
var el=(scwSourceEle.parentNode)?scwSourceEle.parentNode:scwSourceEle
try{el.addEventListener('click',scwStopPropagation,false)}
catch(e3){if(typeof event =='undefined'){el.addEventListener('click',scwStopPropagation,false)}
else{if(el.attachEvent){el.attachEvent('onclick',scwStopPropagation)}
else{event.cancelBubble=true}}}    
}

function scwHide()
{scwID('scw').style.visibility='hidden'
if(scwID('scwIframe')){scwID('scwIframe').style.visibility='hidden'}
if(typeof scwNextAction!='undefined'&&scwNextAction!=null)
{scwNextActionReturn=scwNextAction()
scwNextAction=null}}
function scwCancel(scwEvt)
{if(scwClickToHide)scwHide()
scwStopPropagation(scwEvt)}
function scwStopPropagation(scwEvt)
{if(scwEvt.stopPropagation)
scwEvt.stopPropagation()
else scwEvt.cancelBubble=true}
function scwBeginDrag(event)
{var elementToDrag=scwID('scw')
var deltaX=event.clientX,deltaY=event.clientY,offsetEle=elementToDrag
do{deltaX-=parseInt(offsetEle.offsetLeft,10)
deltaY-=parseInt(offsetEle.offsetTop,10)
offsetEle=offsetEle.offsetParent}
while(offsetEle.tagName!='BODY'&&offsetEle.tagName!='HTML')
if(document.addEventListener)
{document.addEventListener('mousemove',moveHandler,true)
document.addEventListener('mouseup',upHandler,true)}
else{elementToDrag.attachEvent('onmousemove',moveHandler)
elementToDrag.attachEvent('onmouseup',upHandler)
elementToDrag.setCapture()}
scwStopPropagation(event)
function moveHandler(scwEvt)
{if(!scwEvt)scwEvt=window.event
elementToDrag.style.left=(scwEvt.clientX-deltaX)+'px'
elementToDrag.style.top=(scwEvt.clientY-deltaY)+'px'
if(scwID('scwIframe'))
{scwID('scwIframe').style.left=(scwEvt.clientX-deltaX)+'px'
scwID('scwIframe').style.top=(scwEvt.clientY-deltaY)+'px'}
scwStopPropagation(scwEvt)}
function upHandler(scwEvt)
{if(!scwEvt)scwEvt=window.event
if(document.removeEventListener)
{document.removeEventListener('mousemove',moveHandler,true)
document.removeEventListener('mouseup',upHandler,true)}
else{elementToDrag.detachEvent('onmouseup',upHandler)
elementToDrag.detachEvent('onmousemove',moveHandler)
elementToDrag.releaseCapture()}
scwStopPropagation(scwEvt)}}
function scwShowMonth(scwBias){
var scwShowDate=new Date(Date.parse(new Date().toDateString())),scwStartDate=new Date()
scwShowDate.setHours(12)
scwSelYears=scwID('scwYears')
scwSelMonths=scwID('scwMonths')
if(scwSelYears.options.selectedIndex>-1)
{scwMonthSum=12*(scwSelYears.options.selectedIndex)+scwBias
if(scwSelMonths.options.selectedIndex>-1)
{scwMonthSum+=scwSelMonths.options.selectedIndex}}
else
{if(scwSelMonths.options.selectedIndex>-1)
{scwMonthSum+=scwSelMonths.options.selectedIndex}}
scwShowDate.setFullYear(scwBaseYear+Math.floor(scwMonthSum/12),(scwMonthSum%12),1)
scwID('scwWeek_').style.display=(scwWeekNumberDisplay)?((scwID('scwIFrame'))?'block':'table-cell'):'none'
if((12*parseInt((scwShowDate.getFullYear()-scwBaseYear),10))+parseInt(scwShowDate.getMonth(),10)<(12*scwDropDownYears)&&
(12*parseInt((scwShowDate.getFullYear()-scwBaseYear),10))+parseInt(scwShowDate.getMonth(),10)>-1)
{scwSelYears.options.selectedIndex=Math.floor(scwMonthSum/12)
scwSelMonths.options.selectedIndex=(scwMonthSum%12)
scwCurMonth=scwShowDate.getMonth()
scwShowDate.setDate((((scwShowDate.getDay()-scwWeekStart)<0)?-6:1)+scwWeekStart-scwShowDate.getDay())
var scwCompareDateValue=new Date(scwShowDate.getFullYear(),scwShowDate.getMonth(),scwShowDate.getDate()).valueOf()
scwStartDate=new Date(scwShowDate)

function scwChangeClass(scwEvt)
{var scwEle=scwEventTrigger(scwEvt)
if(scwEle.nodeType==3)scwEle=scwEle.parentNode
switch(scwEle.className)
{case 'scwCells':
scwEle.className='scwCellsHover'
break
case 'scwCellsHover':
scwEle.className='scwCells'
break
case 'scwCellsExMonth':
scwEle.className='scwCellsExMonthHover'
break
case 'scwCellsExMonthHover':
scwEle.className='scwCellsExMonth'
break
case 'scwCellsWeekend':
scwEle.className='scwCellsWeekendHover'
break
case 'scwCellsWeekendHover':
scwEle.className='scwCellsWeekend'
break
case 'scwFoot':
scwEle.className='scwFootHover'
break
case 'scwFootHover':
scwEle.className='scwFoot'
break
case 'scwFootClear':
scwEle.className = 'scwFootClearHover';
break;
case 'scwFootClearHover':
scwEle.className = 'scwFootClear';
break;
case 'scwInputDate':
scwEle.className='scwInputDateHover'
break
case 'scwInputDateHover':
scwEle.className='scwInputDate'}
return true}

var scwFoot=scwID('scwFoot')
var scwFootClear=scwID('scwFootClear')
function scwFootClearOutput() {scwSetOutput('');}
scwFootClear.onclick   = scwFootClearOutput; 
scwFootClear.onmouseover = scwChangeClass;
scwFootClear.onmouseout  = scwChangeClass;
function scwFootOutput(){scwSetOutput(scwDateNow);}
if(scwDisabledDates.length==0)
{if(scwActiveToday&&scwParmActiveToday)
{scwFoot.onclick=scwFootOutput
scwFoot.className='scwFoot'
if(scwID('scwIFrame'))
{scwFoot.onmouseover=scwChangeClass
scwFoot.onmouseout=scwChangeClass}}
else
{scwFoot.onclick=null
scwFoot.className='scwFootDisabled'
if(scwID('scwIFrame'))
{scwFoot.onmouseover=null
scwFoot.onmouseout=null}
if(document.addEventListener)
{scwFoot.addEventListener('click',scwStopPropagation,false)}
else{scwFoot.attachEvent('onclick',scwStopPropagation);}}}
else
{for(var k=0;k<scwDisabledDates.length;k++)
{if(!scwActiveToday || !scwParmActiveToday ||((typeof scwDisabledDates[k]=='object')&&
(((scwDisabledDates[k].constructor==Date)&&scwDateNow.valueOf()==scwDisabledDates[k].valueOf())||((scwDisabledDates[k].constructor==Array)&&
scwDateNow.valueOf()>=scwDisabledDates[k][0].valueOf()&&scwDateNow.valueOf()<=scwDisabledDates[k][1].valueOf()))))
{scwFoot.onclick=null
scwFoot.className='scwFootDisabled'
if(scwID('scwIFrame'))
{scwFoot.onmouseover=null
scwFoot.onmouseout=null}
if(document.addEventListener)
{scwFoot.addEventListener('click',scwStopPropagation,false)}
else{scwFoot.attachEvent('onclick',scwStopPropagation)}
break}
else
{function scwFootOutput(){scwSetOutput(scwDateNow)}
scwFoot.onclick=scwFootOutput
scwFoot.className='scwFoot'
if(scwID('scwIFrame'))
{scwFoot.onmouseover=scwChangeClass
scwFoot.onmouseout=scwChangeClass}}}}
function scwSetOutput(scwOutputDate)
{if(scwOutputDate=='')scwTargetEle.value=''
else if(typeof scwTargetEle.value=='undefined')
{scwTriggerEle.scwTextNode.replaceData(0,scwTriggerEle.scwLength,scwOutputDate.scwFormat(scwDateOutputFormat))}
else
{scwTargetEle.value=scwOutputDate.scwFormat(scwDateOutputFormat)}
scwHide()
OnDateExit(scwTargetEle.id);}
function scwCellOutput(scwEvt)
{var scwEle=scwEventTrigger(scwEvt),scwOutputDate=new Date(scwStartDate)
if(scwEle.nodeType==3)scwEle=scwEle.parentNode
scwOutputDate.setDate(scwStartDate.getDate()+parseInt(scwEle.id.substr(8),10))
scwSetOutput(scwOutputDate)}

function scwEventTrigger(scwEvt)
{if(!scwEvt)scwEvt=event
return scwEvt.target||scwEvt.srcElement}
function scwWeekNumber(scwInDate){
var scwInDateWeekBase=new Date(scwInDate)
scwInDateWeekBase.setDate(scwInDateWeekBase.getDate()-scwInDateWeekBase.getDay()+scwWeekNumberBaseDay+((scwInDate.getDay()>scwWeekNumberBaseDay)?7:0))
var scwFirstBaseDay=new Date(scwInDateWeekBase.getFullYear(),0,1)
scwFirstBaseDay.setDate(scwFirstBaseDay.getDate()-scwFirstBaseDay.getDay()+scwWeekNumberBaseDay)
if(scwFirstBaseDay<new Date(scwInDateWeekBase.getFullYear(),0,1))
{scwFirstBaseDay.setDate(scwFirstBaseDay.getDate()+7)}
var scwStartWeekOne=new Date(scwFirstBaseDay-scwWeekNumberBaseDay+scwInDate.getDay())
if(scwStartWeekOne>scwFirstBaseDay)
{scwStartWeekOne.setDate(scwStartWeekOne.getDate()-7)}
var scwWeekNo='0'+(Math.round((scwInDateWeekBase-scwFirstBaseDay)/604800000,0)+1)
return scwWeekNo.substring(scwWeekNo.length-2,scwWeekNo.length)}
var scwCells=scwID('scwCells')
for(i=0;i<scwCells.childNodes.length;i++)
{var scwRows=scwCells.childNodes[i]
if(scwRows.nodeType==1&&scwRows.tagName=='TR')
{if(scwWeekNumberDisplay){
scwRows.childNodes[0].innerHTML=scwWeekNumber(scwShowDate)
scwRows.childNodes[0].style.display=(scwID('scwIFrame'))?'block':'table-cell'}
else
{scwRows.childNodes[0].style.display='none'}
for(j=1;j<scwRows.childNodes.length;j++)
{var scwCols=scwRows.childNodes[j]
if(scwCols.nodeType==1&&scwCols.tagName=='TD')
{scwRows.childNodes[j].innerHTML=scwShowDate.getDate()
var scwCell=scwRows.childNodes[j],scwDisabled=((scwOutOfRangeDisable&&(scwShowDate<(new Date(scwBaseYear,0,1,scwShowDate.getHours()))||
scwShowDate>(new Date(scwBaseYear+scwDropDownYears,0,0,scwShowDate.getHours()))))||(scwOutOfMonthDisable&&(scwShowDate<
(new Date(scwShowDate.getFullYear(),scwCurMonth,1,scwShowDate.getHours()))||scwShowDate>(new Date(scwShowDate.getFullYear(),scwCurMonth+1,0,scwShowDate.getHours())))))?true:false
scwCell.style.visibility=(scwOutOfMonthHide&&(scwShowDate<(new Date(scwShowDate.getFullYear(),scwCurMonth,1,scwShowDate.getHours()))
||scwShowDate>(new Date(scwShowDate.getFullYear(),scwCurMonth+1,0,scwShowDate.getHours()))))?'hidden':''
for(var k=0;k<scwDisabledDates.length;k++)
{if((typeof scwDisabledDates[k]=='object')&&(scwDisabledDates[k].constructor==Date)&&scwCompareDateValue==scwDisabledDates[k].valueOf())
{scwDisabled=true}
else
{if((typeof scwDisabledDates[k]=='object')&&(scwDisabledDates[k].constructor==Array)&&scwCompareDateValue>=scwDisabledDates[k][0].valueOf()&&scwCompareDateValue<=scwDisabledDates[k][1].valueOf())
{scwDisabled=true;}}}
if(scwDisabled ||!scwEnabledDay[j-1+(7*((i*scwCells.childNodes.length)/6))] ||!scwPassEnabledDay[(j-1+(7*(i*scwCells.childNodes.length/6)))%7])
{scwRows.childNodes[j].onclick=null
if(scwID('scwIFrame'))
{scwRows.childNodes[j].onmouseover=null
scwRows.childNodes[j].onmouseout=null}
scwCell.className=(scwShowDate.getMonth()!=scwCurMonth)?'scwCellsExMonthDisabled':(scwBlnFullInputDate&&scwShowDate.toDateString()==
scwSeedDate.toDateString())?'scwInputDateDisabled':(scwShowDate.getDay()%6==0)?'scwCellsWeekendDisabled':'scwCellsDisabled'}
else
{scwRows.childNodes[j].onclick=scwCellOutput
if(scwID('scwIFrame'))
{scwRows.childNodes[j].onmouseover=scwChangeClass
scwRows.childNodes[j].onmouseout=scwChangeClass}
scwCell.className=(scwShowDate.getMonth()!=scwCurMonth)?'scwCellsExMonth':(scwBlnFullInputDate&&
scwShowDate.toDateString()==scwSeedDate.toDateString())?'scwInputDate':(scwShowDate.getDay()%6==0)?'scwCellsWeekend':'scwCells'}
scwShowDate.setDate(scwShowDate.getDate()+1)
scwCompareDateValue=new Date(scwShowDate.getFullYear(),scwShowDate.getMonth(),scwShowDate.getDate()).valueOf()}}}}}
scwID('scw').style.visibility='hidden'
scwID('scw').style.visibility='visible'}
document.write("<!--[if IE]>"+
"<iframe class='scw' src='/scwblank.html' "+
"id='scwIframe' name='scwIframe' "+
"frameborder='0'>"+
"</iframe>"+
"<![endif]-->"+
"<table id='scw' class='scw'>"+
"<tr class='scw'>"+
"<td class='scw'>"+
"<table class='scwHead' id='scwHead' width='100%' "+
"cellspacing='0' cellpadding='0'>"+
"<tr id='scwDrag' style='display:none;'>"+
"<td colspan='4' class='scwDrag' "+
"onmousedown='scwBeginDrag(event);'>"+
"<div id='scwDragText'></div>"+
"</td>"+
"</tr>"+
"<tr class='scwHead' >"+
"<td class='scwHead'>"+
"<input class='scwHead' id='scwHeadLeft' type='button' value='<' "+
"onclick='scwShowMonth(-1);' /></td>"+
"<td class='scwHead'>"+
"<select id='scwMonths' class='scwHead' "+
"onchange='scwShowMonth(0);'>"+
"</select>"+
"</td>"+
"<td class='scwHead'>"+
"<select id='scwYears' class='scwHead' "+
"onchange='scwShowMonth(0);'>"+
"</select>"+
"</td>"+
"<td class='scwHead'>"+
"<input class='scwHead' id='scwHeadRight' type='button' value='>' "+
"onclick='scwShowMonth(1);' /></td>"+
"</tr>"+
"</table>"+
"</td>"+
"</tr>"+
"<tr class='scw'>"+
"<td class='scw'>"+
"<table class='scwCells' align='center'>"+
"<thead>"+
"<tr><td class='scwWeekNumberHead' id='scwWeek_' ></td>")
for(i=0;i<7;i++)
document.write("<td class='scwWeek' id='scwWeekInit"+i+"'></td>")
document.write("</tr>"+
"</thead>"+
"<tbody id='scwCells' "+
"onClick='scwStopPropagation(event);'>")
for(i=0;i<6;i++)
{document.write(
"<tr>"+
"<td class='scwWeekNo' id='scwWeek_"+i+"'></td>")
for(j=0;j<7;j++)
{document.write(
"<td class='scwCells' id='scwCell_"+(j+(i*7))+
"'></td>")}
document.write(
"</tr>")}
document.write(
"</tbody>")
if((new Date(scwBaseYear+scwDropDownYears,11,32))>scwDateNow&&
(new Date(scwBaseYear,0,0))<scwDateNow)
{document.write(
"<tfoot class='scwFoot'>"+
"<tr class='scwFoot'>"+
"<td class='scwFoot' id='scwFoot' colspan='4'>"+
"</td>"+
"<td class='scwFootClear' id='scwFootClear' colspan='4'>"+
"</tr>"+
"<tr class='scwFootError'>"+
"<td class='scwFootError' id='scwFootError' colspan='8'>"+
"</td>"+
"</tr>"+
"</tfoot>")}
document.write("</table></td></tr></table>")
if(document.addEventListener)
{scwID('scw').addEventListener('click',scwCancel,false)
scwID('scwHeadLeft').addEventListener('click',scwStopPropagation,false)
scwID('scwMonths').addEventListener('click',scwStopPropagation,false)
scwID('scwMonths').addEventListener('change',scwStopPropagation,false)
scwID('scwYears').addEventListener('click',scwStopPropagation,false)
scwID('scwYears').addEventListener('change',scwStopPropagation,false)
scwID('scwHeadRight').addEventListener('click',scwStopPropagation,false)}
else{scwID('scw').attachEvent('onclick',scwCancel)
scwID('scwHeadLeft').attachEvent('onclick',scwStopPropagation)
scwID('scwMonths').attachEvent('onclick',scwStopPropagation)
scwID('scwMonths').attachEvent('onchange',scwStopPropagation)
scwID('scwYears').attachEvent('onclick',scwStopPropagation)
scwID('scwYears').attachEvent('onchange',scwStopPropagation)
scwID('scwHeadRight').attachEvent('onclick',scwStopPropagation)}
if(document.addEventListener)
{document.addEventListener('click',scwHide,false);}
else{document.attachEvent('onclick',scwHide);}
function isValidDate(scwDateValue){
if(scwDateValue=="")return true
var scwArrSeed=new Array(),scwArrInput=scwDateValue.split(new RegExp('[\\'+scwArrDelimiters.join('\\')+']+','g'))
if(scwArrInput[0]!=null)
{if(scwArrInput[0].length==0)scwArrInput.splice(0,1)
if(scwArrInput[scwArrInput.length-1].length==0)
scwArrInput.splice(scwArrInput.length-1,1)}
scwBlnFullInputDate=false
switch(scwArrInput.length){
case 1:{
scwArrSeed[0]=parseInt(scwArrInput[0],10)
scwArrSeed[1]='6'
scwArrSeed[2]=1
break}
case 2:{
scwArrSeed[0]=parseInt(scwArrInput[scwDateInputSequence.replace(/D/i,'').search(/Y/i)],10)
scwArrSeed[1]=scwArrInput[scwDateInputSequence.replace(/D/i,'').search(/M/i)]
scwArrSeed[2]=1
break}
case 3:{
scwArrSeed[0]=parseInt(scwArrInput[scwDateInputSequence.search(/Y/i)],10)
scwArrSeed[1]=scwArrInput[scwDateInputSequence.search(/M/i)]
scwArrSeed[2]=parseInt(scwArrInput[scwDateInputSequence.search(/D/i)],10)
scwBlnFullInputDate=true
break}
default:{
scwArrSeed[0]=0
scwArrSeed[1]=0
scwArrSeed[2]=0}}
var scwExpValDay=/^(0?[1-9]|[1-2]\d|3[0-1])$/,scwExpValMonth=new RegExp('^(0?[1-9]|1[0-2]|'+scwArrMonthNames.join('|')+')$','i'),scwExpValYear=/^(\d{1,2}|\d{4})$/
if(scwExpValYear.exec(scwArrSeed[0])==null ||scwExpValMonth.exec(scwArrSeed[1])==null ||scwExpValDay.exec(scwArrSeed[2])==null)
{if(scwShowInvalidDateMsg)
scwBlnFullInputDate=false
scwArrSeed[0]=scwBaseYear+Math.floor(scwDropDownYears/2)
scwArrSeed[1]='6'
scwArrSeed[2]=1}
scwArrSeedDate=scwArrSeed
if(scwArrSeedDate[0]<100)
scwArrSeedDate[0]+=(scwArrSeedDate[0]>50)?1900:2000
if(scwArrSeedDate[1].search(/\d+/)!=0){
month=scwArrMonthNames.join('|').toUpperCase().search(scwArrSeedDate[1].substr(0,3).toUpperCase())
scwArrSeedDate[1]=Math.floor(month/4)+1}
scwSeedDate=new Date(scwArrSeedDate[0],scwArrSeedDate[1]-1,scwArrSeedDate[2])
if(isNaN(scwSeedDate)){
scwSeedDate=new Date(scwBaseYear+Math.floor(scwDropDownYears/2),5,1)
scwBlnFullInputDate=false}
else{
if((new Date(scwBaseYear,0,1))>scwSeedDate){
scwSeedDate=new Date(scwBaseYear,0,1)
scwBlnFullInputDate=false}
else
{if((new Date(scwBaseYear+scwDropDownYears,0,0))<scwSeedDate){
scwSeedDate=new Date(scwBaseYear+Math.floor(scwDropDownYears)-1,11,1)
scwBlnFullInputDate=false}
else
{if(scwBlnStrict&&scwBlnFullInputDate&&(scwSeedDate.getDate()!=scwArrSeedDate[2] ||(scwSeedDate.getMonth()+1)!=scwArrSeedDate[1] ||scwSeedDate.getFullYear()!=scwArrSeedDate[0])){
scwSeedDate=new Date(scwSeedDate.getFullYear(),scwSeedDate.getMonth()-1,1)
scwBlnFullInputDate=false}}}}
for(var i=0;i<scwDisabledDates.length;i++){
if(!((typeof scwDisabledDates[i]=='object')&&(scwDisabledDates[i].constructor==Date)))
{if((typeof scwDisabledDates[i]=='object')&&(scwDisabledDates[i].constructor==Array))
{var scwPass=true
if(scwDisabledDates[i].length !=2){
scwPass=false}
else
{for(var j=0;j<scwDisabledDates[i].length;j++)
{if(!((typeof scwDisabledDates[i][j]=='object')&&(scwDisabledDates[i][j].constructor==Date))){scwPass=false}}}
if(scwPass&&(scwDisabledDates[i][0]>scwDisabledDates[i][1])){scwDisabledDates[i].reverse()}}
else{}}}
return scwBlnFullInputDate}
function keyPressDate(val,dateFormat,delimiterCode){
var delimPos1
var delimPos2
switch(dateFormat){
case 0:
delimPos1=2
delimPos2=5
if(val.length>=1){
if(val.charAt(0)==3 && val.charAt(1)>1){event.returnValue=false;}
if(val.charAt(3)==1 && val.charAt(4)>2){event.returnValue=false;}
}
if(val.length>9)event.returnValue=false;
if(val.length<delimPos1 || val.length>delimPos2 ||(val.length>delimPos1&&val.length<delimPos2)){
    if(event.keyCode<48 || event.keyCode>57)
        event.returnValue=false
    else if(val.length==0&&(event.keyCode<48 || event.keyCode>51 ))
        event.returnValue=false
    else if(val.length==3&&(event.keyCode<48 || event.keyCode>49))
        event.returnValue=false
    else if(val.length==6&&(event.keyCode<49 || event.keyCode>50))
        event.returnValue=false
}
else{
        
}
break
case 1:
delimPos1=2
delimPos2=5
if(val.length<delimPos1 || val.length>delimPos2 ||(val.length>delimPos1&&val.length<delimPos2)){
if(event.keyCode<48 || event.keyCode>57)
event.returnValue=false
else if(val.length==0&&(event.keyCode<48 || event.keyCode>49))
event.returnValue=false
else if(val.length==3&&(event.keyCode<48 || event.keyCode>51))
event.returnValue=false
else if(val.length==6&&(event.keyCode<49 || event.keyCode>50))
event.returnValue=false}
break
case 2:
delimPos1=2
delimPos2=6
if(val.length<delimPos1 || val.length>delimPos2){
if(event.keyCode<48 || event.keyCode>57)
event.returnValue=false
else if(val.length==0&&(event.keyCode<48 || event.keyCode>51))
event.returnValue=false
else if(val.length==7&&(event.keyCode<49 || event.keyCode>50))
event.returnValue=false}
else if(val.length>delimPos1&&val.length<delimPos2){
if(event.keyCode<65 || event.keyCode>122 ||(event.keyCode>90&&event.keyCode<97))
event.returnValue=false}
break
case 3:
delimPos1=3
delimPos2=6
if(val.length<delimPos1){
if(event.keyCode<65 || event.keyCode>122 ||(event.keyCode>90&&event.keyCode<97))
event.returnValue=false}
else if(val.length>delimPos2 ||(val.length>delimPos1&&val.length<delimPos2)){
if(event.keyCode<48 || event.keyCode>57)
event.returnValue=false
else if(val.length==4&&(event.keyCode<48 || event.keyCode>51))
event.returnValue=false
else if(val.length==7&&(event.keyCode<49 || event.keyCode>50))
event.returnValue=false}
break}
if(val.length==delimPos1 || val.length==delimPos2)
event.keyCode=delimiterCode}
function keyUpDate(control,e,dateFormat,delimiterCode){
var delimPos1
var delimPos2
switch(dateFormat){
case 0:
delimPos1=3
delimPos2=6
break
case 1:
delimPos1=3
delimPos2=6
break
case 2:
delimPos1=3
delimPos2=7
break
case 3:
delimPos1=4
delimPos2=7
break}
if(control.value.length==delimPos1-1 || control.value.length==delimPos2-1){
if(e.keyCode !=8){
var keychar=String.fromCharCode(delimiterCode)
control.value=control.value+keychar}}}
function keyPressTime(val,delimiterCode){
if(event.keyCode !=delimiterCode&&(event.keyCode<48 || event.keyCode>57))
event.returnValue=false
else if(val.length==0&&(event.keyCode<48 || event.keyCode>50))
event.returnValue=false
else if(val.length==1&&(event.keyCode<48 || event.keyCode>57))
event.returnValue=false
else if(val.length==1&&val=='2'&&(event.keyCode<48 || event.keyCode>51))
event.returnValue=false
else if(val.length==2)
event.keyCode=delimiterCode
else if(val.length==3&&(event.keyCode<48 || event.keyCode>53))
event.returnValue=false
else if(val.length==4&&(event.keyCode<48 || event.keyCode>57))
event.returnValue=false}
function keyUpTime(control,e,delimiterCode){
if(e.keyCode !=delimiterCode&&!(e.keyCode>=48&&e.keyCode<=57)&&!(e.keyCode>=96&&e.keyCode<=105)){
e.returnValue=false}
else{
if(control.value.length==2){
var keychar=String.fromCharCode(delimiterCode)
control.value=control.value+keychar}}}
function GetDateObject(controlDateTime){
var obj=document.getElementById(controlDateTime+'_Date')
if(obj!=null)scwDateValue=obj.value
if(scwDateValue==""||scwDateValue==null)return null
var scwArrSeed=new Array(),scwArrInput=scwDateValue.split(new RegExp('[\\'+scwArrDelimiters.join('\\')+']+','g'))
if(scwArrInput[0]!=null)
{if(scwArrInput[0].length==0)scwArrInput.splice(0,1)
if(scwArrInput[scwArrInput.length-1].length==0)
scwArrInput.splice(scwArrInput.length-1,1)}
scwBlnFullInputDate=false
switch(scwArrInput.length){
case 1:{
scwArrSeed[0]=parseInt(scwArrInput[0],10)
scwArrSeed[1]='6'
scwArrSeed[2]=1
break}
case 2:{
scwArrSeed[0]=
parseInt(scwArrInput[scwDateInputSequence.replace(/D/i,'').search(/Y/i)],10)
scwArrSeed[1]=scwArrInput[scwDateInputSequence.replace(/D/i,'').search(/M/i)]
scwArrSeed[2]=1
break}
case 3:{
scwArrSeed[0]=
parseInt(scwArrInput[scwDateInputSequence.search(/Y/i)],10)
scwArrSeed[1]=scwArrInput[scwDateInputSequence.search(/M/i)]
scwArrSeed[2]=parseInt(scwArrInput[scwDateInputSequence.search(/D/i)],10)
scwBlnFullInputDate=true
break}
default:{
scwArrSeed[0]=0
scwArrSeed[1]=0
scwArrSeed[2]=0}}
var scwExpValDay=/^(0?[1-9]|[1-2]\d|3[0-1])$/,
scwExpValMonth=new RegExp('^(0?[1-9]|1[0-2]|'+
scwArrMonthNames.join('|')+')$','i'),
scwExpValYear=/^(\d{1,2}|\d{4})$/
if(scwExpValYear.exec(scwArrSeed[0])==null ||
scwExpValMonth.exec(scwArrSeed[1])==null ||
scwExpValDay.exec(scwArrSeed[2])==null)
{if(scwShowInvalidDateMsg)
scwBlnFullInputDate=false
scwArrSeed[0]=scwBaseYear+Math.floor(scwDropDownYears/2)
scwArrSeed[1]='6'
scwArrSeed[2]=1}
scwArrSeedDate=scwArrSeed
if(scwArrSeedDate[0]<100)
scwArrSeedDate[0]+=(scwArrSeedDate[0]>50)?1900:2000
if(scwArrSeedDate[1].search(/\d+/)!=0){
month=scwArrMonthNames.join('|').toUpperCase().search(scwArrSeedDate[1].substr(0,3).toUpperCase())
scwArrSeedDate[1]=Math.floor(month/4)+1}
scwSeedDate=new Date(scwArrSeedDate[0],scwArrSeedDate[1]-1,scwArrSeedDate[2])
return scwSeedDate}
function GetDateTimeObject(controlDateTime){
var obj=document.getElementById(controlDateTime+'_Date')
if(obj!=null)scwDateValue=obj.value
obj=document.getElementById(controlDateTime+'_Time')
if(obj!=null)scwTimeValue=obj.value
if(scwDateValue==""||scwDateValue==null)return null
var scwArrSeed=new Array(),scwArrInput=scwDateValue.split(new RegExp('[\\'+scwArrDelimiters.join('\\')+']+','g'))
if(scwArrInput[0]!=null)
{if(scwArrInput[0].length==0)scwArrInput.splice(0,1)
if(scwArrInput[scwArrInput.length-1].length==0)
scwArrInput.splice(scwArrInput.length-1,1)}
scwBlnFullInputDate=false
switch(scwArrInput.length){
case 1:{
scwArrSeed[0]=parseInt(scwArrInput[0],10)
scwArrSeed[1]='6'
scwArrSeed[2]=1
break}
case 2:{
scwArrSeed[0]=
parseInt(scwArrInput[scwDateInputSequence.replace(/D/i,'').search(/Y/i)],10)
scwArrSeed[1]=scwArrInput[scwDateInputSequence.replace(/D/i,'').search(/M/i)]
scwArrSeed[2]=1
break}
case 3:{
scwArrSeed[0]=parseInt(scwArrInput[scwDateInputSequence.search(/Y/i)],10)
scwArrSeed[1]=scwArrInput[scwDateInputSequence.search(/M/i)]
scwArrSeed[2]=parseInt(scwArrInput[scwDateInputSequence.search(/D/i)],10)
scwBlnFullInputDate=true
break}
default:{
scwArrSeed[0]=0
scwArrSeed[1]=0
scwArrSeed[2]=0}}
var scwExpValDay=/^(0?[1-9]|[1-2]\d|3[0-1])$/,
scwExpValMonth=new RegExp('^(0?[1-9]|1[0-2]|'+
scwArrMonthNames.join('|')+')$','i'),
scwExpValYear=/^(\d{1,2}|\d{4})$/
if(scwExpValYear.exec(scwArrSeed[0])==null ||
scwExpValMonth.exec(scwArrSeed[1])==null ||
scwExpValDay.exec(scwArrSeed[2])==null)
{if(scwShowInvalidDateMsg)
scwBlnFullInputDate=false
scwArrSeed[0]=scwBaseYear+Math.floor(scwDropDownYears/2)
scwArrSeed[1]='6'
scwArrSeed[2]=1}
scwArrSeedDate=scwArrSeed
if(scwArrSeedDate[0]<100)
scwArrSeedDate[0]+=(scwArrSeedDate[0]>50)?1900:2000
if(scwArrSeedDate[1].search(/\d+/)!=0){
month=scwArrMonthNames.join('|').toUpperCase().search(scwArrSeedDate[1].substr(0,3).toUpperCase())
scwArrSeedDate[1]=Math.floor(month/4)+1}
var scwArrTime=new Array()
var scwArrTime=scwTimeValue.split(new RegExp('[\\'+scwArrDelimiters.join('\\')+']+','g'))
if(scwArrTime.length>1){
scwSeedDate=new Date(scwArrSeedDate[0],scwArrSeedDate[1]-1,scwArrSeedDate[2],scwArrTime[0],scwArrTime[1],0)}
else{
scwSeedDate=new Date(scwArrSeedDate[0],scwArrSeedDate[1]-1,scwArrSeedDate[2])}
return scwSeedDate}
function DateCompare(fromDateControl,toDateControl){
var dtFrom=GetDateTimeObject(fromDateControl)
var dtTo=GetDateTimeObject(toDateControl)
if(dtFrom>dtTo){
return false}
return true}
function OnDateExit(id){}
function OnTimeExit(id){}
function isValidTime(dateControlId)
{
    var time=new String();
    var validTime=/^(([0-1]?\d)|(2[0-3])):[0-5]?\d$/;    
    var time=getElement(dateControlId+'_Time').value;
    if(time.match(validTime) && (time!='')) return true;
    else return false;
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    