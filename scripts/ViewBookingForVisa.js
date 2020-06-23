/// <reference name="MicrosoftAjax.js"/>


function showsubmitBtn() {
    //if(document.getElementById('ctl00_ContentPlaceHolder1_updateVisaStatus').length !=1 )
    //{
    //document.getElementById('ctl00_ContentPlaceHolder1_btnVisaUpload').style.display='block';
    //}
    //else
    //{
    // document.getElementById('ctl00_ContentPlaceHolder1_btnVisaUpload').style.display='none';
    //}
}


var Ajax;

//if (window.XMLHttpRequest) {
//    Ajax = new window.XMLHttpRequest();
//}
//else {
//    Ajax = new ActiveXObject("Microsoft.XMLHTTP");
//}

if (window.ActiveXObject) {
    Ajax = new ActiveXObject('Microsoft.XMLHTTP')
}
else {
    Ajax = new XMLHttpRequest()
}
 
    var cal1;
    var cal2;
    var selectionType = "";
    function init() {
        cal1 = new YAHOO.widget.Calendar("cal1", "callContainer");
        cal1.selectEvent.subscribe(setDate1);
        cal1.cfg.setProperty("close", true);
        cal1.cfg.setProperty("title", "Select date");
        cal1.render();
        
        cal2 = new YAHOO.widget.Calendar("cal2", "callContainer2");
        cal2.selectEvent.subscribe(setDate2);
        cal2.cfg.setProperty("close", true);
        cal2.cfg.setProperty("title", "To date");
        cal2.render();
    }
    YAHOO.util.Event.addListener(window, "load", init);
   
    function markout(textBox, txt) {
        if (textBox.value == "") {
            textBox.value = txt;
        }
    }
    function ShowCalenderInterface(idForTextBox) {
        markin(document.getElementById(idForTextBox), 'DD/MM/YYYY');
    }

    var txtbox;
    var txtbox1;
    //var departureDate1 = new Date();
    //var departureDate = new Date();
     function ShowCalender(container, imgId, txtBoxId,expiryDate) {
         txtbox = txtBoxId;
         var containerId = container;
         var obj = document.getElementById(imgId);
         var curleft = obj.offsetLeft;
         var curtop = obj.offsetTop;
         var div = document.getElementById(containerId);
         while (obj.offsetParent != document.getElementById('calDiv')) {
             obj = obj.offsetParent;
             curleft += obj.offsetLeft

             curtop += obj.offsetTop

         }
         div.style.left = '' + curleft.toString() + 'px';
         div.style.top = '' + curtop.toString() + 'px';

         $('callContainer2').context.styleSheets[0].display = "none";
         cal2.hide();
         cal1.show();
         init();
         var date1 = new Date();
         var month = date1.getMonth() + 1;
         var day = date1.getDate();

         if (month.toString().length == 1) {
             month = "0" + month;
         }

         if (day.toString().length == 1) {
             day = "0" + day;
         }
         date1 = day + "/" + (month) + "/" + date1.getFullYear();
         if (date1.length != 0 && date1 != "DD/MM/YYYY") {
             var depDateArray = date1.split('/');

             var arrMinDate = new Date(departureDate1.getFullYear(), departureDate1.getMonth(), departureDate1.getDate() + 1);

             cal1.cfg.setProperty("minDate", (arrMinDate.getMonth() + 1) + "/" + arrMinDate.getDate() + "/" + arrMinDate.getFullYear());
             cal1.cfg.setProperty("pageDate", depDateArray[1] + "/" + depDateArray[2]);
             cal1.render();
         }
         document.getElementById('callContainer').style.display = "block";
     }
     function ShowCalender2(container, imgId, txtBoxId, issueDate) {

         txtbox = issueDate;
         txtbox1 = txtBoxId;
         var containerId = container;
         var obj = document.getElementById(imgId);
         var curleft = obj.offsetLeft;
         var curtop = obj.offsetTop;
         var div = document.getElementById(containerId);
         while (obj.offsetParent != document.getElementById('calDiv')) {
             obj = obj.offsetParent;
             curleft += obj.offsetLeft

             curtop += obj.offsetTop

         }
         div.style.left = '' + curleft.toString() + 'px';
         div.style.top = '' + curtop.toString() + 'px';

         $('callContainer').context.styleSheets[0].display = "none";
         cal1.hide();
         init();
         var date1 = document.getElementById(issueDate).value;
        
         if (date1.length != 0 && date1 != "DD/MM/YYYY") {
             var depDateArray = date1.split('/');

             var arrMinDate = new Date(departureDate.getFullYear(), departureDate.getMonth(), departureDate.getDate() + 1);

             cal2.cfg.setProperty("minDate", (arrMinDate.getMonth() + 1) + "/" + arrMinDate.getDate() + "/" + arrMinDate.getFullYear());
             cal2.cfg.setProperty("pageDate", depDateArray[1] + "/" + depDateArray[2]);
             cal2.render();
         }
         document.getElementById('callContainer2').style.display = "block";
     }
    function setDate1() {
        var date1 = cal1.getSelectedDates()[0];
        departureDate = cal1.getSelectedDates()[0];
        var month = date1.getMonth() + 1;
        var day = date1.getDate();

        if (month.toString().length == 1) {
            month = "0" + month;
        }

        if (day.toString().length == 1) {
            day = "0" + day;
        }


        document.getElementById(txtbox).value = day + "/" + (month) + "/" + date1.getFullYear();
        cal1.hide();
    }
    function setDate2() {
        var date2 = cal2.getSelectedDates()[0];
        var date1 = document.getElementById(txtbox).value;
        if (date1.length == 0 || date1 == "DD/MM/YYYY") {
            document.getElementById('errMess').style.display = "block";
            document.getElementById('divErrMess').innerHTML = "First select Visa Expiry Date.";
            return false;
        }
        var depDateArray = date1.split('/');

        // checking if date1 is valid		    
        if (!CheckValidDate(depDateArray[0], depDateArray[1], depDateArray[2])) {
            document.getElementById('errMess').style.display = "block";
            document.getElementById('divErrMess').innerHTML = " Invalid Visa Expiry Date";
            return false;
        }
        document.getElementById('errMess').style.display = "none";
        document.getElementById('divErrMess').innerHTML = "";
        
        var depdate = new Date(depDateArray[2], depDateArray[1] - 1, depDateArray[0]);
        var returndate = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
        var difference = returndate.getTime() - depdate.getTime();

        if (difference < 0) {
            document.getElementById('errMess').style.display = "block";
            document.getElementById('divErrMess').innerHTML = "Purchase To date should be greater than Purchase from date (" + date3 + ")";
            return false;
        }
        document.getElementById('errMess').style.display = "none";
        document.getElementById('divErrMess').innerHTML = "";

        var month = date2.getMonth() + 1;
        var day = date2.getDate();

        if (month.toString().length == 1) {
            month = "0" + month;
        }

        if (day.toString().length == 1) {
            day = "0" + day;
        }

        document.getElementById(txtbox1).value = day + "/" + month + "/" + date2.getFullYear();
        cal2.hide();
    }




    function ShowVisa(DivId1, imagePath) {
        document.getElementById(DivId1).style.display = 'block';
    }

function Show() {
    if (document.getElementById('breakup').style.display == "block") {
        document.getElementById('breakup').style.display = "none";
        document.getElementById('showsplit').style.display = "none";
        document.getElementById('hidesplit').style.display = "block";
        if (document.getElementById('agentTotal') && document.getElementById('customerTotal')) {
            document.getElementById('agentTotal').style.display = "none";
            document.getElementById('customerTotal').style.display = "block";
        }
    }
    else {
        document.getElementById('breakup').style.display = "block";
        document.getElementById('showsplit').style.display = "block";
        document.getElementById('hidesplit').style.display = "none";
        if (document.getElementById('agentTotal') && document.getElementById('customerTotal')) {
            document.getElementById('agentTotal').style.display = "block";
            document.getElementById('customerTotal').style.display = "none";
        }
    }
}

function passengerStatusChange(id) {
    if (document.getElementById('Status' + id).value == "5") {
        document.getElementById('UpdateInfoDiv' + id).style.display = 'block';
    }
    else {
        document.getElementById('UpdateInfoDiv' + id).style.display = 'none';
    }
    if (document.getElementById('Status' + id).value == "8") {
        if (document.getElementById('paxCount') != null) {
            for (var i = 0; i < document.getElementById('paxCount').value; i++) {
                if (document.getElementById('Status' + i) != null) {
                    document.getElementById('Status' + i).value = "8";
                }
            }
        }
    }
}

function onFocus(ddlStatus) {
    if (ddlStatus.value == "2") {

        document.getElementById('divVisaInfo').style.display = "block";
        var TotalPax = document.getElementById('paxCount').value;
        for (i = 0; i < TotalPax; i++) {
            if (document.getElementById('visaNumber' + i) != null) {
                document.getElementById('visaNumber' + i).style.display = 'block';
            }
        }
        var AllElements = document.forms[0].elements;
        var size = document.forms[0].length;
        if (AllElements == null) {
            AllElements = document.forms[0].getElements();
            size = AllElements.size();
        }
        var l = 0;
        for (var k = 0; k < size; k++) {
            var element = AllElements[k];
            var type = element.type;

            if (type == "file") {
                element.style.display = 'block';
            }
        }
    }
    else {
        document.getElementById('divVisaInfo').style.display = "none";
        var TotalPax = document.getElementById('paxCount').value;
        for (i = 0; i < TotalPax; i++) {
            if (document.getElementById('visaNumber' + i) != null) {
                document.getElementById('visaNumber' + i).style.display = 'none';

            }
        }
        var AllElements = document.forms[0].elements;
        var size = document.forms[0].length;
        if (AllElements == null) {
            AllElements = document.forms[0].getElements();
            size = AllElements.size();
        }
        var l = 0;
        for (var k = 0; k < size; k++) {
            var element = AllElements[k];
            var type = element.type;

            if (type == "file") {
                element.style.display = 'none';
                document.getElementById('lbl' + l).style.display = 'none';
                l++;
            }
        }
    }
}


function Update(id) {
    document.getElementById('lblvisaNumber' + id).style.display = 'none';
    document.getElementById('visaNumber' + id).style.display = 'block';
    document.getElementById('lblVisaImg' + id).style.display = 'none';
    document.getElementById('spanVisaImg' + id).style.display = 'block';
    document.getElementById('divVisaInfo').style.display = "block";
    document.getElementById('Cancle' + id).style.display = "block";
    document.getElementById('Edit' + id).style.display = 'none';
    document.getElementById('ctl00_cphTransaction_btnVisaUpload').style.display = "block";
}
function Close(id) {
    document.getElementById(id).style.display = 'none';
}
function Cancel(id) {
    document.getElementById('lblvisaNumber' + id).style.display = 'block';
    document.getElementById('visaNumber' + id).style.display = 'none';
    document.getElementById('lblVisaImg' + id).style.display = 'block';
    document.getElementById('spanVisaImg' + id).style.display = 'none';

    document.getElementById('Cancle' + id).style.display = "none";
    document.getElementById('Edit' + id).style.display = 'block';
    var hide = true;
    var TotalPax = document.getElementById('paxCount').value;
    for (i = 0; i < TotalPax; i++) {
        if (document.getElementById('Cancle' + i).style.display != "none") {
            hide = false;

        }
    }
    if (hide) {
        document.getElementById('divVisaInfo').style.display = "none";
        document.getElementById('ctl00_cphTransaction_btnVisaUpload').style.display = "none";
    }
}


function validate() {

    var isvalid = true;
    var status = true;
    var duplicateCount = 0;
    var selectedStatus = "False";
    var TotalPax = document.getElementById('paxCount').value;
    for (i = 0; i < TotalPax; i++) {
        var Editcont = "True";
        if (document.getElementById('edit' + i) != null && document.getElementById('edit' + i).style.display == 'block') {
            Editcont = "False";
        }
        if (document.getElementById('Status' + i) != null && document.getElementById('Status' + i).length != 1) {
            if (document.getElementById('Status' + i).value == "8") {
                duplicateCount++;
                //                document.getElementById('errMsg' + i).innerHTML = "Please Select Status";
                //                isvalid = false;
            }
            if (document.getElementById('Status' + i).value != 0) {
                selectedStatus = "True";
            }
           // else
            if (document.getElementById('PaxRemarks' + i) != null && document.getElementById('PaxRemarks' + i).value == "" && Editcont == "True") {
                document.getElementById('errMsg' + i).innerHTML = "Please enter remarks";
                isvalid = false;
            }

            else if (document.getElementById('UpdateInfoDiv' + i) != null && document.getElementById('UpdateInfoDiv' + i).style.display == 'block') {

                if (document.getElementById('txtIssueDate' + i) != null && document.getElementById('txtIssueDate' + i).value == "") {
                    document.getElementById('errMsg' + i).innerHTML = "Please Select visa issue Date";
                    isvalid = false;
                }
                else if (document.getElementById('txtExpiryDate' + i) != null && document.getElementById('txtExpiryDate' + i).value == "") {
                    document.getElementById('errMsg' + i).innerHTML = "Please Select visa expiry Date";
                    isvalid = false;
                }
                else if (document.getElementById('txtvisaNumber' + i) != null && document.getElementById('txtvisaNumber' + i).value == "") {
                    document.getElementById('errMsg' + i).innerHTML = "Please enter visa number";
                    isvalid = false;
                }


            }

        }
       
        if (isvalid) {
            document.getElementById('errMsg' + i).innerHTML = "";
        }
        else {
            status = isvalid;
        }
        isvalid = true;
    } // for loop close
    if (duplicateCount != 0) {
        if (duplicateCount != TotalPax) {
            if (document.getElementById('lblErrorMsg') != null) {
                document.getElementById('lblErrorMsg').innerHTML = "Please Select All status as Duplicate";
                status = false;
            }
        }
    }
    if (selectedStatus == "True") {
        for (i = 0; i < TotalPax; i++) {
            if (document.getElementById('Status' + i) != null) {
                if (document.getElementById('Status' + i).value == 0) {
                    if (document.getElementById('errMsg' + i) != null) {
                        document.getElementById('errMsg' + i).innerHTML = "Please Select Status";
                        status = false;
                    }
                }
            }
        }
    }
    var imageValid = Imagevalidate();
    if (status && imageValid) {
        return true;
    }
    else {
        return false;
    }
}


function Imagevalidate() {
    var valid = true;
    var AllElements = document.forms[0].elements;
    var size = document.forms[0].length;
    if (AllElements == null) {
        AllElements = document.forms[0].getElements();
        size = AllElements.size();
    }
    var l = 0;
    for (var k = 0; k < size; k++) {
        var element = AllElements[k];
        var type = element.type;
        if (type == "file" && (element.style.display != 'none' || element.style.display != '')) {
            if (element.value.toLowerCase().lastIndexOf(".jpg") + 4 != element.value.length && element.value.toLowerCase().lastIndexOf(".gif") + 4 != element.value.length && element.value.toLowerCase().lastIndexOf(".jpeg") + 5 != element.value.length && element.value.toLowerCase().lastIndexOf(".pdf") + 4 != element.value.length) {
                if (document.getElementById('UpdateInfoDiv' + l) != null && document.getElementById('UpdateInfoDiv' + l).style.display == 'block') {
                    if (document.getElementById('errMsg' + l).innerHTML == "") {
                        document.getElementById('errMsg' + l).innerHTML = "Image Should be .Jpeg Or .Gif Format Or .pdf";
                    }
                    valid = false;
                }
            }
            else {
                if (document.getElementById('errMsg' + l).innerHTML == "") {
                    document.getElementById('errMsg' + l).style.display = 'none';
                }
            }
            l++;
        }
    } //For loop Close
    return valid;
}

function ShowPaxPopUp(id, parentId, paxId) {
    blockId = id;
    var url = "QueueAjax.aspx";
    var paramList = 'isReadOnlyPaxProfile=true';
    paramList += '&paxId=' + paxId;
    paramList += '&blockId=' + id;
    document.getElementById(blockId).style.display = "block";
    document.getElementById(blockId).innerHTML = "Loading...";
    
    Ajax.onreadystatechange = DisplayPaxProfile;
    Ajax.open('POST', url);
    Ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    Ajax.send(paramList);
}

function DisplayPaxProfile() {
    if (Ajax.readyState == 4) {
        if (Ajax.status == 200) {
            if (Ajax.responseText.length > 0) {
                document.getElementById(blockId).innerHTML = Ajax.responseText;
            }
        }
    }
}

function hideDiv(divId) {
    document.getElementById(divId).style.display = "none";
}



function ShowPaxAddressPopUp(id, parentId, paxId) {
    blockId = id;
    var url = "QueueAjax.aspx";
    var paramList = 'isReadOnlyPaxAddress=true';
    paramList += '&paxId=' + paxId;
    paramList += '&blockId=' + id;
    document.getElementById(blockId).style.display = "block";
    document.getElementById(blockId).innerHTML = "Loading...";

    
    Ajax.onreadystatechange = DisplayPaxProfile;
    Ajax.open('POST', url);
    Ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    Ajax.send(paramList);
}

function showGuarantorDiv(visaId)
{
   
    var url = "QueueAjax.aspx";
    var paramList = 'isVisaGuarantor=true';
    paramList += '&paxId=' + visaId;
    paramList += '&blockId=' + 'GurantorDiv';
    document.getElementById('GurantorDiv').style.display = "block";
    document.getElementById('GurantorDiv').innerHTML = "Loading...";

    
    Ajax.onreadystatechange = DisplayGuarantorInfo;
    Ajax.open('POST', url);
    Ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    Ajax.send(paramList);
}
function DisplayGuarantorInfo() {
    if (Ajax.readyState == 4) {
        if (Ajax.status == 200) {
            if (Ajax.responseText.length > 0) {
                document.getElementById('GurantorDiv').innerHTML = Ajax.responseText;
            }
        }
    }
}
function ShowPaxPassportPopUp(id, parentId, paxId) {
    blockId = id;
    
    var url = "QueueAjax.aspx";
    var paramList = 'isReadOnlyPaxPassport=true';
    paramList += '&paxId=' + paxId;
    paramList += '&blockId=' + id;
    document.getElementById(blockId).style.display = "block";
    document.getElementById(blockId).innerHTML = "Loading...";

   
    Ajax.onreadystatechange = DisplayPaxProfile;
    Ajax.open('POST', url);
    Ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    Ajax.send(paramList);
}


function DisplayBookingHistory(visaId) {
    var el = document.getElementById('BHContainer');
    var top = el.offsetTop;
    var left = el.offsetLeft;
    while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }
    document.getElementById('QueueHistory').style.display = "block";
    document.getElementById('QueueHistory').style.top = top + 5 + "px";
    document.getElementById('QueueHistory').style.left = left + 5 + "px";
    document.getElementById('QueueHistory').innerHTML = "Loading....";

    var url = "BookingAjax.aspx";
    var paramList = 'isVisaQueueHistory=true';
    paramList += '&visaId=' + visaId;
    Ajax.onreadystatechange = ShowBookingHistoryPopUp;
    Ajax.open('POST', url);
    Ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    Ajax.send(paramList);
    
    
}

function ShowBookingHistoryPopUp() {
    if (Ajax.readyState == 4) {
        if (Ajax.status == 200) {
            if (Ajax.responseText.length > 0) {
                document.getElementById('QueueHistory').innerHTML = Ajax.responseText;
                document.getElementById('QueueHistory').style.display = "block";
            }
        }
    }
}

var divId;
function DisplayUploadedDocument(PaxID, id, countryCode) {
    divId = id;
    var el = document.getElementById(divId);
    var top = el.offsetTop;
    var left = el.offsetLeft;
    while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }
    document.getElementById(divId).style.display = "block";
    // document.getElementById(divId).style.top = top + 5 + "px";
    //document.getElementById(divId).style.left = left + 5 + "px";
    document.getElementById(divId).innerHTML = "Loading....";

    var url = "QueueAjax.aspx";
    var paramList = 'isVisaUploadedDocumrnt=true';
    paramList += '&DivId=' + divId;
    paramList += '&paxID=' + PaxID;
    paramList += '&countryCode=' + countryCode;
    

    Ajax.onreadystatechange = ShowUploadedDocumentPopUp;
    Ajax.open('POST', url);
    Ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    Ajax.send(paramList);
}

function ShowUploadedDocumentPopUp() {
    if (Ajax.readyState == 4) {
        if (Ajax.status == 200) {
            if (Ajax.responseText.length > 0) {
                document.getElementById(divId).innerHTML = Ajax.responseText;
                document.getElementById(divId).style.display = "block";
            }
        }
    }
}

function HideUploadDocumentDiv(DivId) {
    document.getElementById(DivId).style.display = 'none';
}
