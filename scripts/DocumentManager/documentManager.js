// JScript File

function showFileUpload(lnkUploadId)
{
    try
    {
        if(document.getElementById(lnkUploadId).disabled) return;
        var arr=lnkUploadId.split('_');
        var parentId='';
        for(var i=0;i<arr.length-1;i++)
        {
         parentId+=arr[i]+"_";
        }
        if(document.getElementById('ifrmFileUpload')!=null)
        {
            //alert(document.getElementById('ifrmFileUpload').parentNode.id);       
            var previousId = document.getElementById('ifrmFileUpload').parentNode.id;
            var prevArr=previousId.split('_');
            var parentPrevId='';
            for(var i=0;i<prevArr.length-1;i++)
            {
             parentPrevId+=prevArr[i]+"_";
            }
            document.getElementById('ifrmFileUpload').parentNode.innerHTML="";
            document.getElementById(parentPrevId+'pnlUploadImage').style.display="none";            
            
        }
                        
        var DOCUMENT_NAME = document.getElementById(parentId+'hdfSessionName').value;        
        var content = "<iframe id='ifrmFileUpload' name='ifrmFileUpload' height='100%' width='310px' runat='server' "+
                    "src='FileUploader.aspx?docName="+DOCUMENT_NAME+"' frameborder='0'></iframe>";
        document.getElementById(parentId+'pnlUploadImage').style.display="block";
        document.getElementById(parentId+'frameDiv').innerHTML=content; 
        
        
        
    }
    catch(e)
    {
        alert(e.description);
    }
}

function hideFileUpload(btnCancelId)
{
    var arr=btnCancelId.split('_');
    var parentId='';
    for(var i=0;i<arr.length-1;i++)
    {
    parentId+=arr[i]+"_";
    }
    document.getElementById(parentId+'pnlUploadImage').style.display="none";
    return true;
}
function isUploaded()
{
    try {
        //alert(document.getElementById('ifrmFileUpload').contentWindow);
        return document.getElementById('ifrmFileUpload').contentWindow.isUploaded();
           // alert(document.frames['ifrmFileUpload'])
        //return(document.frames['ifrmFileUpload'].isUploaded());
        }
        catch (ex)
        {
            alert('Error:' + ex.description);
            return false;
        }
    
}

