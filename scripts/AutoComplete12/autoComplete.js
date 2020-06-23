
var currentrow=0;
var MENU_POSITION=-1;
/*
    json.js
    2006-04-28

    This file adds these methods to JavaScript:

        object.toJSONString()

            This method produces a JSON text from an object. The
            object must not contain any cyclical references.

        array.toJSONString()

            This method produces a JSON text from an array. The
            array must not contain any cyclical references.

        string.parseJSON()

            This method parses a JSON text to produce an object or
            array. It will return false if there is an error.
*/
(function () {
    var m = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        s = {
            array: function (x) {
                var a = ['['], b, f, i, l = x.length, v;
                for (i = 0; i < l; i += 1) {
                    v = x[i];
                    f = s[typeof v];
                    if (f) {
                        v = f(v);
                        if (typeof v == 'string') {
                            if (b) {
                                a[a.length] = ',';
                            }
                            a[a.length] = v;
                            b = true;
                        }
                    }
                }
                a[a.length] = ']';
                return a.join('');
            },
            'boolean': function (x) {
                return String(x);
            },
            'null': function (x) {
                return "null";
            },
            number: function (x) {
                return isFinite(x) ? String(x) : 'null';
            },
            object: function (x) {
                if (x) {
                    if (x instanceof Array) {
                        return s.array(x);
                    }
                    var a = ['{'], b, f, i, v;
                    for (i in x) {
                        v = x[i];
                        f = s[typeof v];
                        if (f) {
                            v = f(v);
                            if (typeof v == 'string') {
                                if (b) {
                                    a[a.length] = ',';
                                }
                                a.push(s.string(i), ':', v);
                                b = true;
                            }
                        }
                    }
                    a[a.length] = '}';
                    return a.join('');
                }
                return 'null';
            },
            string: function (x) {
                if (/["\\\x00-\x1f]/.test(x)) {
                    x = x.replace(/([\x00-\x1f\\"])/g, function(a, b)
{
                        var c = m[b];
                        if (c) {
                            return c;
                        }
                        c = b.charCodeAt();
                        return '\\u00' +
                            Math.floor(c / 16).toString(16) +
                            (c % 16).toString(16);
                    });
                }
                return '"' + x + '"';
            }
        };

    Object.toJSON = function(obj) {
        return s.object(obj);
    };

})();

String.prototype.parseJSON = function () {
    try {
        return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(
                this.replace(/"(\\.|[^"\\])*"/g, ''))) &&
            eval('(' + this + ')');
    } catch (e) {
        return false;
    }

}; 



// JScript File

var TEXTBOXID,HDFID,MANDATORY_CONTROLID='';
var CONTROL_NAME;
var TEXTFIELD;
var VALUEFIELD;
var DISPLAY_AFTER;
var AUTO_COMPLETE_CLASSNAME;
var HEADER_CLASSNAME;
var ROWS_CLASSNAME;
var ALTERNATING_ROWS_CLASSNAME;
var ONMOUSEOVER_CLASSNAME;
var ROWS_TO_DISPLAY=10;
var hiddenColumn=new Array();
var timeOn;
var SHOWALL;
var Filter;
var ADDFIRSTMATCHINGRECORD;
var arrIndex=false;
var FilterKeys=[];
var results=[];
var CLICKED=false;
var MANDATORY_VALUE='';
var CHILD_CONTROL='';
var PARENT_CONTROL_OLD_TEXT='';
var rows;
var PAGING_ENABLED;
var SCROLL_HEIGHT='200px';
var MAXRECORDS;
var ONAUTOCOMPLETE_EDIT='';
var ROWINDEX;
var TABLEID;
Utility={};
Utility={
    getObj:function(obj){return document.getElementById(obj)},
    getValue:function(obj){return this.getObj(obj).value},
    setValue:function(obj,val){this.getObj(obj).value=val},
    container:function(){return this.getObj('autocomplete')},   
    hide:function(obj){return obj.style.display='none'},
    hide:function(){return this.style.display='none'},
    create:function(str){return document.createElement(str)},
    data:function(obj,a,b,c){return obj.TABLE[a].ROW[b].COL[c].DATA},
    noRecords:function(){ADDFIRSTMATCHINGRECORD=false;
    $s="<br><font color='red'><center>No Records ";
    if(Utility.getValue(TEXTBOXID).length==0 && MANDATORY_VALUE==''){
    $s+=". You may Retry";
    }
    else if(Utility.getValue(TEXTBOXID).length>=1)
        $s+="for <b>"+Utility.getValue(TEXTBOXID)+"</b>";
    else if(MANDATORY_VALUE!='')
        $s+= "for <b>"+Utility.getValue(PREFIX_MASTER+MANDATORY_CONTROLID+'_ctl00')+"</b>";
    $s+="</center></font><br>"
    return $s;
    },
    ParseHTML:function(data){
    if(data=='') return ''
    return data.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace("\"", "&quot;").replace("'", "&#39;");
    },
    GetActualData:function(data){
    if(data=='') return ''
    return data.replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">").replace("&quot;", "\"").replace("&#39;", "'");
    }
}

String.prototype.trim=function(){return this.replace("/^\s*/g|\s*Utility/")}
Utility.container.hide=function(){return Utility.container().style.display='none'}
Utility.container.show=function(){return Utility.container().style.display='block'}
d=Utility.container();

function hidediv(){
    Utility.container.hide();    
    if(!CLICKED){        
        if(Utility.getValue(TEXTBOXID+'_hdfAddNew')!="Yes")Utility.getObj(TEXTBOXID).value="";        
        Utility.getObj(HDFID).value="";        
        
    }
    //childClear();
    if(ADDFIRSTMATCHINGRECORD){      
        try{
            Utility.setValue(TEXTBOXID,Utility.GetActualData(Utility.getValue('txtFirstMatching')));
            Utility.setValue(HDFID,Utility.getValue('hdfFirstMatching'));
            if(ONAUTOCOMPLETE_EDIT!='')PageMethods.AutoCompleteEdit(TEXTBOXID,Utility.getValue(HDFID),eval(ONAUTOCOMPLETE_EDIT));            
        }
        catch(ee){}
    }    
    
}

//document.write("<iframe id=\"theframe\"></iframe>");
function menuOver(){clearTimeout(timeOn)}
function menuOut(){timeOn = setTimeout("hidediv()", 500)}
ROWS_LENGTH=0;
currentrow=0;
function showmenu(){
/* arguments
1. ID of the textbox
2. Control Name, (TODO:if null should behave as just a Textbox )
3. Display after nth Character (int),default 0
4. AutoCompleteClassName
5. HeaderClassName 
6. RowsClassName
7. AlternatingRowClassName 
8. OnMouseOverClassName
9. Rows To display
TODO:
1. Textbox class name
2. Loading Image path and add images in js
*/
    
    TEXTBOXID=arguments[0];           
    dis=Utility.getObj(TEXTBOXID).getAttribute('disabled');    
    if(dis || dis=='disabled')return false;
    CONTROL_NAME=arguments[1];
    TEXTFIELD=arguments[2];
    VALUEFIELD=arguments[3];
    DISPLAY_AFTER=arguments[4];
    AUTO_COMPLETE_CLASSNAME=arguments[5];
    HEADER_CLASSNAME=arguments[6];
    ROWS_CLASSNAME=arguments[7];
    ALTERNATING_ROWS_CLASSNAME=arguments[8];
    ONMOUSEOVER_CLASSNAME=arguments[9];
    ROWS_TO_DISPLAY=arguments[10];
    MAXRECORDS=arguments[11];
    CLIENTSEARCH=arguments[12];
    ADDFIRSTMATCHINGRECORD=arguments[13];
    MANDATORY_CONTROLID=arguments[14];
    CHILD_CONTROL=arguments[15];
    PAGING_ENABLED=arguments[16];
    ONAUTOCOMPLETE_EDIT=arguments[17];
    //SHOWALL=arguments[parseInt(arguments.length)-1];
    SHOWALL=arguments[18];
    e=arguments[19]
   //alert(arguments.length)
   if(window.event) // IE
    {
	    KEYNUM = e.keyCode;       
    }
    else if(e.which) // Netscape/Firefox/Opera
    {
	    KEYNUM = e.which;        
    }
   
     var rows2;
    try{   
    if(document.getElementById('rl_'+TEXTBOXID)!=null)ROWS_LENGTH=Utility.getValue('rl_'+TEXTBOXID);    
    }catch(rl){}
    
    
    if(KEYNUM==9){Utility.container.hide();}
    if(KEYNUM==40){
        if(eval("arrIndex_"+TEXTBOXID+".length!='undefined'") 
            && ROWS_LENGTH<eval("arrIndex_"+TEXTBOXID+".length"))
                ROWS_LENGTH=eval("arrIndex_"+TEXTBOXID+".length");
                
        if(eval("arrIndex_"+TEXTBOXID+".length>=1")||ROWS_LENGTH>=1){
            ct=eval("currentrow_"+TEXTBOXID)
            if(ct<0)ct=0;
            f=(ROWS_LENGTH<ROWS_TO_DISPLAY?ROWS_LENGTH:ROWS_TO_DISPLAY);
            arl=eval("arrIndex_"+TEXTBOXID+".length");
            
            if(ct>=arl ||ct>=f)ct=0;            
            try{
                if("undefined"==arl){//then no client data;
                    if(ct==f)
                        cur=f-1;
                    else
                        cur=ct-1;
                }
                else 
                    cur=ct-1;
                    if(cur<0)cur=f-1;                    
                    rows2=document.getElementById('tr'+cur);
                    rows2.className=(cur%2==0?ALTERNATING_ROWS_CLASSNAME:ROWS_CLASSNAME);
             
                    if(ct>0){
                       // alert(currentrow)
                        rows2=document.getElementById('tr'+ct);
                        rows2.className=(currentrow%2==0?ALTERNATING_ROWS_CLASSNAME:ROWS_CLASSNAME);
                    }
                    else if(ct==0 && ROWS_LENGTH>ROWS_TO_DISPLAY){
                     f=ROWS_TO_DISPLAY-1;
                      
                        rows2=document.getElementById('tr'+f);
                        rows2.className=(f%2==0?ALTERNATING_ROWS_CLASSNAME:ROWS_CLASSNAME);
                    }
            }catch(ww){} 
            try{
                rows2=document.getElementById('tr'+ct);
                rows2.className=ONMOUSEOVER_CLASSNAME;
                rows2.style.cursor='pointer';
                t1=rows2.childNodes[0].innerHTML
            }catch(ww){
//                rows2=document.getElementById('tr0');
//                rows2.className=ONMOUSEOVER_CLASSNAME;
//                rows2.style.cursor='pointer';
//                t1=rows2.childNodes[0].innerHTML;
            }
            ct++;
            eval("currentrow_"+TEXTBOXID+"="+ct)
            //m=eval("currentrow_"+TEXTBOXID)
            //if(Utility.container().style.display=='block')return false;        
            MENU_POSITION=t1;
            
        }        
       if(Utility.getValue(TEXTBOXID).length==0)SHOWALL=true;
        if(Utility.container().style.display=='block')return false;
    }
    else if(KEYNUM==38){
        
        if(eval("arrIndex_"+TEXTBOXID+".length>=1")||ROWS_LENGTH>=1){  
            ct=eval("currentrow_"+TEXTBOXID)          
            try{       
                ct--;         
                if(ct<0){                    
                    rows3=document.getElementById('tr0');
                    rows3.className=ALTERNATING_ROWS_CLASSNAME;
                    ct=ROWS_TO_DISPLAY;
                }else{
                    f=(ROWS_LENGTH<ROWS_TO_DISPLAY?ROWS_LENGTH:ROWS_TO_DISPLAY)-1;
                    rows3=document.getElementById('tr'+(ct>f?f:ct));
                    rows3.className=(ct%2==0?ALTERNATING_ROWS_CLASSNAME:ROWS_CLASSNAME);                   
                }
                
                //alert(currentrow)
                if("undefined"!=typeof(eval("arrIndex_"+TEXTBOXID+".length")))
                r=(ROWS_TO_DISPLAY<eval("arrIndex_"+TEXTBOXID+".length")?ROWS_TO_DISPLAY:eval("arrIndex_"+TEXTBOXID+".length"));
                else
                r=ROWS_TO_DISPLAY;
                f=ct<0?((ROWS_LENGTH<r?ROWS_LENGTH:r)-1):ct-1;
                rows2=document.getElementById('tr'+f);
                rows2.className=ONMOUSEOVER_CLASSNAME;
                rows2.style.cursor='pointer';
                MENU_POSITION=rows2.childNodes[0].innerHTML;
            }catch(ww){
                try{
                    if(ct<0){
                        f=(ROWS_LENGTH<ROWS_TO_DISPLAY?ROWS_LENGTH:ROWS_TO_DISPLAY);
                        rows3=document.getElementById('tr'+(f-1));
                        rows3.className=ONMOUSEOVER_CLASSNAME;
                        ct=f-1;
                        MENU_POSITION=rows3.childNodes[0].innerHTML;
                    }
                }catch(ew){}
            }
            eval("currentrow_"+TEXTBOXID+"="+ct);
        }        
       if(Utility.getValue(TEXTBOXID).length==0)SHOWALL=true;
       if(Utility.container().style.display=='block')return false;
    }
    else if(KEYNUM==13){      
        try{
        p=eval("currentrow_"+TEXTBOXID)
        if(p>0){
        objJSON=Utility.getValue("_"+TEXTBOXID)
        objJSON=objJSON.parseJSON();
        oTF=objJSON.TEXTFIELD==""?0:objJSON.TEXTFIELD;
        oVF=objJSON.VALUEFIELD==""?0:objJSON.VALUEFIELD;
        textval=Utility.data(objJSON,0,MENU_POSITION,oTF);
        hdfValue=Utility.data(objJSON,0,MENU_POSITION,oVF);
        Utility.setValue(TEXTBOXID,Utility.GetActualData(textval));
        Utility.setValue(HDFID,hdfValue);
       
        if(ONAUTOCOMPLETE_EDIT!='')clientCall(TEXTBOXID,hdfValue,ONAUTOCOMPLETE_EDIT);
        Utility.container.hide();        
        }
        return false;
        return false;
        }catch(e13){return false;}
     }

     if(KEYNUM!=9){
        showmenu2(TEXTBOXID,CONTROL_NAME,TEXTFIELD,VALUEFIELD,DISPLAY_AFTER,AUTO_COMPLETE_CLASSNAME,
        HEADER_CLASSNAME,ROWS_CLASSNAME,ALTERNATING_ROWS_CLASSNAME,ONMOUSEOVER_CLASSNAME,ROWS_TO_DISPLAY,
        MAXRECORDS,CLIENTSEARCH,ADDFIRSTMATCHINGRECORD,MANDATORY_CONTROLID,CHILD_CONTROL,PAGING_ENABLED,
        ONAUTOCOMPLETE_EDIT,SHOWALL);
    }
}

function showmenu2(){
    try{
    Headers=Utility.getValue(TEXTBOXID+'_hdfHeaders').split("|");
    Sizes=Utility.getValue(TEXTBOXID+'_hdfSizes').split("|");
    }
    catch(e3){
    alert("headers should not be empty!");   
    }    
    
//    if(CHILD_CONTROL!=''){
//        try{
//            
//            if(Utility.getValue('m_'+PREFIX_MASTER+CHILD_CONTROL+'_ctl00')!=Utility.getValue(PREFIX_MASTER+TEXTBOXID+'_hdf')){         
//                Utility.setValue(PREFIX_MASTER+CHILD_CONTROL+'_ctl00','');    
//                Utility.setValue(PREFIX_MASTER+CHILD_CONTROL+'_hdf','');
//                //Utility.setValue('_'+CHILD_CONTROL+'_ctl00','');
//            }
//        }catch(cc){}
//    }
    CLICKED=false;
    if(MANDATORY_CONTROLID!=''){        
        if(Utility.getValue(PREFIX_MASTER+MANDATORY_CONTROLID+'_hdf')==''){
            title=document.getElementById(PREFIX_MASTER+MANDATORY_CONTROLID).getAttribute('title');
            alert(title+" cannot be empty!");
            if(!Utility.getObj(PREFIX_MASTER+MANDATORY_CONTROLID+'_ctl00').disabled)Utility.getObj(PREFIX_MASTER+MANDATORY_CONTROLID+'_ctl00').focus();
            return false;
        }
        //Change here to get the MANDATORY CONTROL Value
        //PARENT VALUE
        MANDATORY_VALUE=Utility.getValue(PREFIX_MASTER+MANDATORY_CONTROLID+"_hdf")
        //PARENT_CONTROL_OLD_TEXT=MANDATORY_VALUE
        //alert(MANDATORY_VALUE)
    }    
    d=Utility.container();
    d.onmouseout=menuOut;
    d.onmouseover=menuOver;
    HDFID=String(TEXTBOXID).substring(0,TEXTBOXID.length-6)+"_hdf";
    
    if(SHOWALL){
        ShowDiv(Utility.getObj(TEXTBOXID));
        Utility.getObj(TEXTBOXID).select();
        //img=Utility.create("img");
        //img.src="./Images/DefaultStyle/General/spinner.gif";
        ////d.innerHTML="";        
        //d.appendChild(img);        
        tCLIENTSEARCH=CLIENTSEARCH;        
        
        try{            
            if(Utility.getValue(TEXTBOXID+"_Showall")!=1) CLIENTSEARCH=tCLIENTSEARCH;
        }
        catch(eee){
            firsttime=Utility.create("input");
            firsttime.type='hidden';
            firsttime.id=TEXTBOXID+"_Showall";             
            document.body.appendChild(firsttime);
            Utility.setValue(TEXTBOXID+"_Showall",1);
            CLIENTSEARCH=false;
        }
        
        pageMethod(TEXTBOXID,CONTROL_NAME,TEXTFIELD,VALUEFIELD,CLIENTSEARCH,MANDATORY_VALUE);
        CLIENTSEARCH=tCLIENTSEARCH;
    }
    else{
        if(Utility.getValue(arguments[0]).trim().length<=DISPLAY_AFTER){                
            Utility.container().style.display='none';
        }
        else{
            ShowDiv(Utility.getObj(TEXTBOXID));
            //img=Utility.create("img");
            //img.src="./Images/DefaultStyle/General/spinner.gif";
            //Utility.container().appendChild(img);
            pageMethod(TEXTBOXID,CONTROL_NAME,TEXTFIELD,VALUEFIELD,CLIENTSEARCH,MANDATORY_VALUE);
        }
    }
   
}

function fn_FirstMatchingRecord(txt,val){

    a=Utility.create("INPUT");
    a.id='txtFirstMatching';
    a.type='hidden';
    a.setAttribute('value',txt);
    d.appendChild(a);
    a=Utility.create("INPUT");
    a.id='hdfFirstMatching';
    a.type='hidden';
    a.setAttribute('value',val);
    d.appendChild(a);
}

function pageMethod(){
    d=Utility.container();
    d.innerHTML='';
    d.className=AUTO_COMPLETE_CLASSNAME;
    Filter=Utility.ParseHTML(Utility.getValue(TEXTBOXID).trim());
    try{
        
       
        
        if(CLIENTSEARCH==true ){
            searchkey=[];j=0;
            eval("arrIndex_"+TEXTBOXID+".length=0");
            objJSON=Utility.getValue("_"+TEXTBOXID)
            objJSON=objJSON.parseJSON();
            
            if(Filter!=""){
                for (var i=0; i<objJSON.TABLE[0].ROW.length; i++){
                    searchkey[j]=Utility.data(objJSON,0,i,objJSON.SEARCHFIELD)
                    j++;
                }
                fn_search(searchkey,Filter)
            }
            
            if(MANDATORY_CONTROLID!=''){
                if(document.getElementById('m_'+TEXTBOXID)==null)
                {
                    m=Utility.create("input");
                    m.type='hidden';
                    m.id='m_'+TEXTBOXID;
                    document.body.appendChild(m);
                }
                
                /*parentvalue=Utility.getValue(PREFIX_MASTER+MANDATORY_CONTROLID+'_hdf')                
               
                if(Utility.getValue('m_'+TEXTBOXID)!=parentvalue)
                    Utility.setValue('m_'+TEXTBOXID,parentvalue);
                  */ 
                // alert("mva="+Utility.getValue('m_'+TEXTBOXID)+"m="+Utility.getValue(PREFIX_MASTER+MANDATORY_CONTROLID+'_hdf'));
                if(Utility.getValue('m_'+TEXTBOXID)!=Utility.getValue(PREFIX_MASTER+MANDATORY_CONTROLID+'_hdf')){
                    PageMethods.autocomplete(Filter,CONTROL_NAME,TEXTFIELD,VALUEFIELD,MAXRECORDS,MANDATORY_VALUE,OnSuccess,OnFailure);
                    Utility.setValue('m_'+TEXTBOXID,Utility.getValue(PREFIX_MASTER+MANDATORY_CONTROLID+'_hdf'));
                }
            
                 //parentvalue=Utility.getValue(String(MANDATORY_CONTROLID).substring(0,MANDATORY_CONTROLID.length-6)+'_hdf')          
                
            
            }
            //tempFilter=Filter;
            //if(tempFilter=='')tempFilter='null'
            //if(FilterKeys.length==0){
            //    FilterKeys.push(tempFilter);         
            //}
            
           // alert("index"+arrIndex.length)
            header(d);
            //alert(CLIENTSEARCH)
            //autocompleteMenu(d,arrIndex.length,if(arguments[2])
            c=Utility.create("div");
            c.id='div_'+Math.random();
            d.appendChild(c);
            c.innerHTML='';
            
            try{
               if(eval("arrIndex_"+TEXTBOXID+".length>=1")){//GETTING DATA FROM CLIENT                    
                    autoCompletePage(c.id,1,arguments[4]);
               }
               else{
               //alert(Filter!="" && SHOWALL!=false)               
                if( SHOWALL!=false ){                    
//                    try{
//                        if(eval("arrIndex_"+TEXTBOXID+"==false")){                                  
//                            tClientSearch=CLIENTSEARCH;
//                            CLIENTSEARCH=false;
//                            pageMethod(TEXTBOXID,CONTROL_NAME,TEXTFIELD,VALUEFIELD,CLIENTSEARCH)
//                            CLIENTSEARCH=tClientSearch
//                            eval("arrIndex_"+TEXTBOXID+"=[]");
//                        }
//                        else{
//                            autoCompletePage(c.id,1,arguments[4]);
//                        }
//                    }
//                    catch(e){                  
                    
                    autoCompletePage(c.id,1,arguments[4]);   
                    
                    //}
                }
                else{
                //alert(FilterKeys.length)
//                  for(i=0;i<FilterKeys.length;i++){                    
//                    if(FilterKeys[i]==tempFilter){
//                        
//                    }                
//                    else{
//                        //alert("not exists");
//                        FilterKeys.push(Filter);
//                    }
//                  }
                  //c.innerHTML=c.innerHTML+Utility.noRecords();
                 // footer1(d);
                 
                    
                 if(Utility.getValue(TEXTBOXID).length==(DISPLAY_AFTER+1)){
                 PageMethods.autocomplete(Filter,CONTROL_NAME,TEXTFIELD,VALUEFIELD,MAXRECORDS,MANDATORY_VALUE,OnSuccess,OnFailure);                   
                 c.innerHTML=c.innerHTML+Utility.noRecords();
                 footer1(d);
                 }
                 else {                
                    autoCompletePage(c.id,1,arguments[4],'local');                      
                }                   
                }
               }
            }catch(e3){               
                c.innerHTML=c.innerHTML+Utility.noRecords();
                footer1(d);
            }
        }
        else{            
            PageMethods.autocomplete(Filter,CONTROL_NAME,TEXTFIELD,VALUEFIELD,MAXRECORDS,MANDATORY_VALUE,OnSuccess,OnFailure);
        }
    }
    catch(e2){
       if(arrIndex==false)   
        PageMethods.autocomplete(Filter,CONTROL_NAME,TEXTFIELD,VALUEFIELD,MAXRECORDS,MANDATORY_VALUE,OnSuccess,OnFailure);
    }   
}

if(typeof(objJSON) == 'undefined') objJSON = {};

function OnSuccess(result){
    objJSON=result;
    objJSON=objJSON.parseJSON();    
    if(document.getElementById('_'+TEXTBOXID)==null){
        _t=Utility.create("input");
        _t.type='hidden';
        _t.id='_'+TEXTBOXID;
        document.body.appendChild(_t);
    }
    Utility.setValue("_"+TEXTBOXID,result);    
    d=Utility.container();
    d.innerHTML="";
    header(d);
    autocompleteMenu(d,objJSON.TABLE[0].ROW.length);
}
function OnFailure(val){alert(val.get_message());}
function header(divObject){    
    //HERE ASSIGN CLASSNAME FROM PARAMETER
    table1=Utility.create('table'); 
    table1.setAttribute('cellpadding',"3px");
    table1.setAttribute('cellspacing',"0px");
    table1.style.fontSize='11px';
   // table1.style.backgroundColor='white';
    tbody1=Utility.create('tbody');
    table1.id="table_"+Math.random();
    tr=Utility.create('tr');
    tr.className=HEADER_CLASSNAME
    //HERE ASSIGN CLASS NAME FROM PARAMETER
    m=0;
    hiddenColumn.length=0;
    tdSize=0;
    td=Utility.create('td');
    td.innerHTML="";
    td.style.display='none';
    tr.appendChild(td);
    for(i=1;i<=Headers.length;i++){    
        td=Utility.create('td');
        td.innerHTML="<b>"+Headers[i-1]+"</b>";
        td.style.width=Sizes[i-1]+'px';        
        if(Sizes[i-1]=="0")td.style.display='none';
        tdSize=parseInt(tdSize)+parseInt(Sizes[i-1]);
        tr.appendChild(td);
    }
    
    tbody1.appendChild(tr);    
    table1.appendChild(tbody1);
    tbody2=Utility.create('tbody');
    tbody2.id='_tbody2'+Math.random();
    
    
    TABLEID=tbody2.id;
    table1.appendChild(tbody2);    
    divObject.appendChild(table1);
    divObject.style.width=tdSize;   
}


function autocompleteMenu(divObject,len){
    /*l is length*/
    /*d=document.getElementById('autocomplete');*/
    c=Utility.create("div");
    c.id='div_'+Math.random();
    d.appendChild(c);  
    if(len>=1){
        autoCompletePage(c.id,1,false);        
    }
    else{
       divObject.innerHTML=divObject.innerHTML+Utility.noRecords();
       footer1(d);
    }    
}

var PREVIOUS_CLASSNAME='';
function autoCompletePage(divid,page,cSearch){
    d1=Utility.getObj(divid);    
    if(!PAGING_ENABLED){
        d1.style.overflow='hidden';
        d1.style.height=SCROLL_HEIGHT;
        /*d1.style.overflowY='scroll'*/
        d1.style.overflowY='auto';
        ROWS_TO_DISPLAY=MAXRECORDS;
    }
    d1.innerHTML="";
   
        tbody1=Utility.getObj(TABLEID);
        /*alert(tbody1.childNodes.length)*/
        try{tbody1.innerHTML=""}catch(e){
        while (tbody1.childNodes.length > 0) {
          tbody1.removeChild(tbody1.firstChild);
        }
    }
    
    ROWS_LENGTH=objJSON.TABLE[0].ROW.length;
    if(document.getElementById('rl_'+TEXTBOXID)==null)
    {
        m=Utility.create("input");
        m.id='rl_'+TEXTBOXID;
        m.type='hidden';
        m.value=ROWS_LENGTH;
        document.body.appendChild(m);
    }
    if(cSearch ){         
        if(Filter!='')ROWS_LENGTH=eval("arrIndex_"+TEXTBOXID+".length");
    }
    upper=ROWS_LENGTH>(page*ROWS_TO_DISPLAY)?(page*ROWS_TO_DISPLAY):ROWS_LENGTH;
    lower=(page*ROWS_TO_DISPLAY)-ROWS_TO_DISPLAY;
    l=ROWS_LENGTH;
    m=(l%ROWS_TO_DISPLAY)==0?0:1;
    totalpage=parseInt(l/ROWS_TO_DISPLAY)+parseInt(m);
    t=0;
    for(i=lower;i<upper;i++){
        rows=Utility.create('tr');
        rows.id='tr'+t;
        t++;
        if(i%2==0)
            rows.className=ALTERNATING_ROWS_CLASSNAME;
        else
            rows.className=ROWS_CLASSNAME;
        
        if(cSearch){            
            if(Filter!='') {
                temp=eval("arrIndex_"+TEXTBOXID+"[i]")
            }
            else temp=i            
        }
        else temp=i   
      // alert(Utility.data(objJSON,0,temp,4))
       try{
        td1=Utility.create('td');
        td1.innerHTML=temp;
        td1.style.display='none';
        rows.appendChild(td1);
        for(k=1;k<=objJSON.TABLE[0].ROW[temp].COL.length;k++){
            //alert(k);
            td1=Utility.create('td');
            try{td1.style.width=objJSON.Header[k-1].Size}catch(size){};
            div1=Utility.create("span");
            
            div1.innerHTML+=Utility.data(objJSON,0,temp,k-1);
            
            td1.style.width=Sizes[k-1]+'px';
            if(Sizes[k-1]=="0")td1.style.display='none';
            td1.appendChild(div1);
            
            rows.appendChild(td1);
            //rows.onkeydown=mOver(rows);
            rows.onmouseover =mOver(rows);
            rows.onmouseout = mOut(rows);
        }
        }catch(e3){}
        oTF=objJSON.TEXTFIELD==""?0:objJSON.TEXTFIELD;
        oVF=objJSON.VALUEFIELD==""?0:objJSON.VALUEFIELD;
        textval=Utility.data(objJSON,0,temp,oTF);
        hdfValue=Utility.data(objJSON,0,temp,oVF);
        tbody1.appendChild(rows);
        ROWINDEX=temp;
        rows.onclick=bindMe(hdfValue,textval,TEXTBOXID,ROWINDEX);
    }

    if(upper==1)fn_FirstMatchingRecord(textval,hdfValue);
    $norecords=false
    if((arguments[3]=='local' && eval("arrIndex_"+TEXTBOXID+".length==0"))){
        if(ROWS_LENGTH==0)
        c.innerHTML=c.innerHTML+Utility.noRecords();
        $norecords=true
    }
    if(!$norecords && ROWS_LENGTH==0) c.innerHTML=c.innerHTML+Utility.noRecords();
        
    //if(objJSON.TABLE[0].ROW.length==0)c.innerHTML=c.innerHTML+Utility.noRecords();
    footer(divid,page,cSearch);
   
    footer1(Utility.getObj(divid));   
   
    

   
}
function loadgif(){

}
function footer(divid,page,cSearch){
    d1=Utility.getObj(divid);
    if(PAGING_ENABLED){
        page=page;
        if(cSearch && Filter!='')            
            ROWS_LENGTH=(eval("arrIndex_"+TEXTBOXID+"!=false"))?eval("arrIndex_"+TEXTBOXID+".length"):0;
        else
            ROWS_LENGTH=objJSON.TABLE[0].ROW.length;
        
        upper=ROWS_LENGTH>(page*ROWS_TO_DISPLAY)?(page*ROWS_TO_DISPLAY):ROWS_LENGTH;
        lower=(page*ROWS_TO_DISPLAY)-ROWS_TO_DISPLAY;
        l=ROWS_LENGTH;
        m=(l%ROWS_TO_DISPLAY)==0?0:1;
        if(l>1 && totalpage>1){
        c=Utility.create('span');
        
        c.innerHTML="page:"+page+"/"+totalpage;
        d1.appendChild(c);
        }
        if(page>1){
            c=Utility.create("span");
            prev=page-1;
            c.innerHTML="<a href=\"javascript:void(0)\" onclick=\"autoCompletePage('"+divid+"',"+prev+","+cSearch+")\">Previous</a>";
            d1.appendChild(c);
        }
        
        nextpage=ROWS_LENGTH>(page*ROWS_TO_DISPLAY)?(parseInt(page)+1):page;
        
        if(nextpage>page && page>1) d1.innerHTML=d1.innerHTML+"&nbsp;|&nbsp;";
        if(nextpage>page){
            c=Utility.create("span");
            c.innerHTML="<a href=\"javascript:void(0)\" onclick=\"autoCompletePage('"+divid+"',"+nextpage+","+cSearch+")\">Next</a>";
            d1.appendChild(c);
        }
    }/*if(PAGING_ENABLED)*/
    c=Utility.create("span");
    c.innerHTML="<BR>Max Records to display:"+MAXRECORDS;
    //d1.style.backgroundColor='white';
    d1.appendChild(c);
}

function footer1(divid){    
    d2=Utility.create("div");
    d2.style.textAlign='center';    
    c=Utility.create('A');
    c.href='javascript:void(0)';
    c.appendChild(document.createTextNode("Close"));
    c.style.cursor='pointer';
    c.style.width='60';
    c.onclick=function(){
        hidediv();
        /*
        Utility.container().innerHTML='';
        if(!CLICKED){        
            if(Utility.getValue(TEXTBOXID+'_hdfAddNew')!="Yes"){
            
                Utility.getObj(TEXTBOXID).value="";        
                Utility.getObj(HDFID).value="";
            }
        }
        
        Utility.container.hide();
        */
    };
    d2.appendChild(c);
    
    d2.appendChild(document.createTextNode(" | "));
    c=Utility.create('A');
    c.href='javascript:void(0)';
    c.accessKey='l';
    c.appendChild(document.createTextNode("Clear"));
    c.style.cursor='pointer';
    c.onclick=function(){
        Utility.setValue(TEXTBOXID,'');
        Utility.setValue(HDFID,'')
        Utility.getObj(TEXTBOXID).focus();
        childClear();
        pageMethod();
        
        if(document.getElementById('txtFirstMatching'))
        {
            document.getElementById('txtFirstMatching').value='';
            document.getElementById('hdfFirstMatching').value='';
        }       
        
        if(ONAUTOCOMPLETE_EDIT!='')
        {
        clientCall(TEXTBOXID,HDFID,ONAUTOCOMPLETE_EDIT);//viji
        }
         
    };
    c.style.width='60';
    d2.appendChild(c);
    d2.appendChild(document.createTextNode(" | "));
    c=Utility.create('A');
    c.href='javascript:void(0)';
    c.appendChild(document.createTextNode("Retry"));
    c.style.cursor='pointer';    
    c.onclick=function(){
          //d2.innerHTML='<img src="Images/spinner.gif">';
         // alert("here");
          tClientSearch=CLIENTSEARCH;
          CLIENTSEARCH=false;
            try{
                if(Utility.getValue(TEXTBOXID+"_Showall")!=1) CLIENTSEARCH=tClientSearch;
            }
            catch(eee){
                 firsttime=Utility.create("input");
                 firsttime.id=TEXTBOXID+"_Showall";
                 firsttime.setAttribute('value',1);
                 d.appendChild(firsttime);
                 CLIENTSEARCH=false;
            }
          pageMethod(TEXTBOXID,CONTROL_NAME,TEXTFIELD,VALUEFIELD,CLIENTSEARCH);
          CLIENTSEARCH=tClientSearch;
    };
    d2.appendChild(c);
    divid.appendChild(d2)
}

function mOver(thing){    
    var thing=rows;
    return function(){        
        PREVIOUS_CLASSNAME=thing.className;
        thing.className=ONMOUSEOVER_CLASSNAME;
        thing.style.cursor='pointer'
    }
}

function mOut(thing){var thing=rows;return function(){thing.className=PREVIOUS_CLASSNAME}}

function rowmouseover(a){Utility.getObj(a).style.backgroundColor='green'}
function curTop(obj){toreturn = 0;while(obj){toreturn += obj.offsetTop;obj = obj.offsetParent}return toreturn}
function curLeft(obj){toreturn = 0;while(obj){toreturn += (obj.offsetLeft-obj.scrollLeft);obj = obj.offsetParent;}return toreturn }

function ShowDiv(a){auto=Utility.container();auto.style.top = eval(curTop(a) + a.offsetHeight) + "px";
    auto.style.left = eval(curLeft(a)) + "px";if(auto.style.display=="none")auto.style.display="block";}
function bindMe(hiddenValue,TextBoxValue,textboxid,rowid){
var hiddenValue=hdfValue;
var TextBoxValue=textval;
var textboxid=TEXTBOXID;

return function(){
d=Utility.container();
CLICKED=true;ROWINDEX=rowid;
if(hiddenValue!=''){    
    
    Utility.setValue(textboxid,Utility.GetActualData(TextBoxValue));
    Utility.setValue(HDFID,hiddenValue);
    /*if(CHILD_CONTROL!=''){
        if(document.getElementById('m_'+PREFIX_MASTER+CHILD_CONTROL+'_ctl00')==null){
                m=Utility.create("input");
                m.type='hidden';
                m.id='m_'+PREFIX_MASTER+CHILD_CONTROL+'_ctl00';
                document.body.appendChild(m);
                alert("here");
        }           
        Utility.setValue('m_'+PREFIX_MASTER+CHILD_CONTROL+'_ctl00',hiddenValue);
        alert(Utility.getValue('m_'+PREFIX_MASTER+CHILD_CONTROL+'_ctl00'))
    }*/
    //parentvalue=Utility.getValue(String(TEXTBOXID).substring(0,textboxid.length-6)+'_hdf')        
    //alert("child value="+Utility.getValue('m_'+PREFIX_MASTER+CHILD_CONTROL+'_ctl00'))
    try{
    if(Utility.getValue('m_'+PREFIX_MASTER+CHILD_CONTROL+'_ctl00')!=hiddenValue){         
    Utility.setValue(PREFIX_MASTER+CHILD_CONTROL+'_ctl00','')
    Utility.setValue(PREFIX_MASTER+CHILD_CONTROL+'_hdf','')
    }
    }catch(e2){}
    childClear();
    
    if(ONAUTOCOMPLETE_EDIT!=''){
        clientCall(textboxid,hiddenValue,ONAUTOCOMPLETE_EDIT);
        //PageMethods.AutoCompleteEdit(textboxid,hiddenValue,eval(ONAUTOCOMPLETE_EDIT));
    }
}
Utility.container().style.display='none';
}
}
function fn_search(arr,key){
    if(key.replace(/^\s*|\s*$/g,"")!=""){
        a="/^"+key+"/i";  
        c=arr.find(eval(a));
    }
}

Array.prototype.find = function(searchStr) {
  for (i=0; i<this.length; i++){   
    if (typeof(searchStr) == 'function'|| typeof(searchStr) == 'object') {
      if (searchStr.test(this[i])) {
        if (!eval("arrIndex_"+TEXTBOXID)) { eval("arrIndex_"+TEXTBOXID+"= []") }
        eval("arrIndex_"+TEXTBOXID+".push(i)");
      }
    } 
    else {
      if (this[i]===searchStr) {
        if (! eval("arrIndex_"+TEXTBOXID)) {  eval("arrIndex_"+TEXTBOXID+"= []") }
        eval("arrIndex_"+TEXTBOXID+".push(i)");        
      }
    }
  }   
  return eval("arrIndex_"+TEXTBOXID);
}

function childClear(){
    if(MANDATORY_CONTROLID!=""){
    
    }
    if(CHILD_CONTROL!=''){    
        
        try{
            parentvalue=Utility.getValue(String(TEXTBOXID).substring(0,TEXTBOXID.length-6)+'_hdf')        
            //alert("child value="+Utility.getValue('m_'+PREFIX_MASTER+CHILD_CONTROL+'_ctl00'))
            if(Utility.getValue('m_'+PREFIX_MASTER+CHILD_CONTROL+'_ctl00')!=parentvalue){         
                Utility.setValue(PREFIX_MASTER+CHILD_CONTROL+'_ctl00','');    
                Utility.setValue(PREFIX_MASTER+CHILD_CONTROL+'_hdf','');
                //Utility.setValue('_'+CHILD_CONTROL+'_ctl00','');
            }
        }catch(cc){}
    }
}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   