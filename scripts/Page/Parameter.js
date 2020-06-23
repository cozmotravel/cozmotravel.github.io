// JScript File
function load()
{
 var gridView = document.getElementById('ctl00_cphTransaction_GridView1'); 
 var count=parseInt(document.getElementById('ctl00_cphTransaction_hdfRowCount').value);  
 var c=0;
 clearMessage();  
 for(var i=0;i<count;i++)
 { 
 c=c+1; 
 var ismandatory = gridView.rows[c].cells[0].getElementsByTagName("input")[0].value;
 var control=gridView.rows[c].cells[0].getElementsByTagName("input")[0];
 var idarr=control.id.split('_');
 var baseId=idarr[0]+'_'+idarr[1]+'_'+idarr[2]+'_'+idarr[3]+'_';
 var type=gridView.rows[c].cells[0].getElementsByTagName("input")[1].value;
 var oper=document.getElementById(baseId+'ddlOperators').value;
 var displayName=new String();
 var autoCompleteId= gridView.rows[c].cells[0].getElementsByTagName("input")[5].value; 
 displayName=document.getElementById(baseId+'DisplayName').innerText ; 
 displayName=displayName.replace("*","");  
    if(ismandatory=='Y')
     {     
         if(type=='L' &&  oper=='IN')
         { 
            var chkBoxList = document.getElementById(baseId+"chkList");            
            var chkBoxCount= chkBoxList.getElementsByTagName("input");
            var icount=0;
            for(var k=0;k<chkBoxCount.length;k++){
            if(chkBoxCount[k].checked==true)
            icount=icount+1;
            }
            if(icount<1)
            addMessage("Please select atleast one "+displayName);            
         }
         else if(type=='T' &&  oper=='IN' && document.getElementById(baseId+'txtListDetails').value=='')        
         {
            addMessage(displayName+" should not be blank or empty ");  
         }
         else if(type=='L' &&  oper=='=' && document.getElementById(baseId+autoCompleteId+'_hdf').value=='')
         {  
          addMessage("Select "+displayName+" from list");      
         }
         else if(type=='L' &&  oper=='like' && document.getElementById(baseId+'txtListDetails').value=='')
         {
          addMessage(displayName+" should not be blank or empty ");      
         }
          else if(type=='T' && document.getElementById(baseId+'txtListDetails').value=='')
         {
          addMessage(displayName+" should not be blank or empty ");      
         }
         else if(type=='D' && oper!='between' && document.getElementById(baseId+'dcDate_Date').value=='')
         {
          addMessage(displayName+" date should not be blank or empty ");      
         }
         else if(type=='D' &&  oper=='between')
         {
             if(document.getElementById(baseId+'dcDate_Date').value=='')
             {
              addMessage(displayName+" from date should not be blank or empty ");      
             }
             if(document.getElementById(baseId+'dcToDate_Date').value=='')
             {
              addMessage(displayName+" To date should not be blank or empty ");      
             }
         var fdate = GetDateObject(baseId+'dcDate'); 
         var tdate = GetDateObject(baseId+'dcToDate');
             if(tdate < fdate)
             {
             addMessage("To date should be greater than from date");
             }
        }   
    }
}
 
 if(getMessage()!=''){ 
            alert(getMessage()); return false;}
    else return true;
}


function Reset()
{
 var gridView = document.getElementById('ctl00_cphTransaction_GridView1'); 
 var count=parseInt(document.getElementById('ctl00_cphTransaction_hdfRowCount').value); 
 if(document.getElementById('ctl00_cphTransaction_ddlTemplates')!= null)
    document.getElementById('ctl00_cphTransaction_ddlTemplates').selectedIndex = 0;
 var c=0; 
 for(var i=0;i<count;i++)
 { 
 c=c+1; 
 var ismandatory = gridView.rows[c].cells[0].getElementsByTagName("input")[0].value;
 var control=gridView.rows[c].cells[0].getElementsByTagName("input")[0];
 var idarr=control.id.split('_');
 var baseId=idarr[0]+'_'+idarr[1]+'_'+idarr[2]+'_'+idarr[3]+'_';
 var type=gridView.rows[c].cells[0].getElementsByTagName("input")[1].value;
 var autoCompleteId= gridView.rows[c].cells[0].getElementsByTagName("input")[5].value;
 document.getElementById(baseId+'ddlOperators').value='='; 
     if(type=='L')
     {  
         if(document.getElementById(baseId+'panel1')!=null)
            document.getElementById(baseId+'panel1').style.display='none';
         if(document.getElementById(baseId+'chkList')!=null)
         {
            document.getElementById(baseId+'chkList').style.display='none';            
         }
         if(document.getElementById(baseId+autoCompleteId)!=null)
         {
            document.getElementById(baseId+autoCompleteId+'_hdf').value="";
            document.getElementById(baseId+autoCompleteId+'_ctl00').value="";            
         }
     }
     else if(type=='T')
     {
     document.getElementById(baseId+'txtListDetails').value="";
     }
     else
     {
         if(type=='D')
         {
             document.getElementById(baseId+'dcDate_Date').value=""; 
             if(document.getElementById(baseId+'dcToDate_Date')!= null)
             {
                document.getElementById(baseId+'dcToDate_Date').value="";
             }
         }
     }
 }
}
