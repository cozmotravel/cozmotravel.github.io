var browser = new Browser();
var Ajax;
    
function SortSearchResultUserPref(searchType)
{
    var sortString = "";
    var isDirect;
    var isOneStop;
    var isMoreThanOneStop;
    var type;
    var sortOrder;
    var sortType;
    var isPaged = false;
    if($("Morning").checked)
    {
        sortString += "1";
    }
    else
    {
        sortString += "0";
    }
    
    if($("Afternoon").checked)
    {
        sortString += "|1";
    }
    else
    {
        sortString += "|0";
    }
    $("Evening").checked
    if($("Evening").checked)
    {
        sortString += "|1";
    }
    else
    {
        sortString += "|0";
    }
    if($("Night").checked)
    {
        sortString += "|1";
    }
    else
    {
        sortString += "|0";
    }
    switch (searchType)
    {
        case "Price":
            sortString += "-P";
            if($('sortTypeHidden').value == "price" && $('sortOrderBy').value == "asc")
            {
                sortOrder = "desc";
            }
            else 
            {
                if($('sortTypeHidden').value == "price" && $('sortOrderBy').value == "desc")
                {
                    sortOrder = "asc";
                }
                else
                {
                    sortOrder = "asc";
                }
            }
            sortType = "price";
            break;
        case "DepTime":
            sortString += "-Dep";
             if($('sortTypeHidden').value == "depTime" && $('sortOrderBy').value == "asc")
            {
                sortOrder = "desc";
            }
            else 
            {
                if($('sortTypeHidden').value == "depTime" && $('sortOrderBy').value == "desc")
                {
                    sortOrder = "asc";
                }
                else
                {
                    sortOrder = "asc";
                }
            }
            sortType = "depTime";
            break;
        case "ArrTime":
            sortString += "-Arr";
             if($('sortTypeHidden').value == "arrTime" && $('sortOrderBy').value == "asc")
            {
                sortOrder = "desc";
            }
            else 
            {
                if($('sortTypeHidden').value == "arrTime" && $('sortOrderBy').value == "desc")
                {
                    sortOrder = "asc";
                }
                else
                {
                    sortOrder = "asc";
                }
            }
            sortType = "arrTime";
            break;
        case "Duration":
            sortString += "-Dur";
             if($('sortTypeHidden').value == "duration" && $('sortOrderBy').value == "asc")
            {
                sortOrder = "desc";
            }
            else 
            {
                if($('sortTypeHidden').value == "duration" && $('sortOrderBy').value == "desc")
                {
                    sortOrder = "asc";
                }
                else
                {
                    sortOrder = "asc";
                }
            }
            sortType = "duration";
            break;
        case "Submit":
            sortOrder = $('sortOrderBy').value;
            switch ($('sortTypeHidden').value)
            {
                case "price":
                    sortString += "-P";
                    sortType = "price";
                    break;
                case "depTime":
                    sortString += "-Dep";
                    sortType = "depTime";
                    break;
                case "arrTime":
                    sortString += "-Arr";
                    sortType = "arrTime";
                    break;
                case "duration":
                    sortString += "-Dur";
                    sortType = "duration";
                    break;
            }
            break;
    }
    if(sortOrder == "asc")
    {
        sortString += "|A";
    }
    if(sortOrder == "desc")
    {
        sortString += "|D";
    }
    if($('keepPageNo').value == "false")
    {
        sortString += "-1";
    }
    if($('keepPageNo').value == "true")
    {
        sortString += "-"+$('pageNo').value;
    }
    
    sortString += "-0";
    if($('direct'))
    {
        if($('direct').checked)
        {
            sortString += "-1";
        }
        else
        {
            sortString += "-0";
        }
        isDirect = "True";
        if($('one'))
        {
            if($('one').checked)
            {
                sortString += "|1";
            }
            else
            {
                sortString += "|0";
            }
            isOneStop = "True";
        }
        else
        {
            sortString += "|0";
            isOneStop = "False";
        }
        if($('twoPlus'))
        {
            if($('twoPlus').checked)
            {
                sortString += "|1";
            }
            else
            {
                sortString += "|0";
            }
            isMoreThanOneStop = "True";
        }
        else
        {
            sortString += "|0";
            isMoreThanOneStop = "False";
        }
    }
    else
    {
            sortString += "-1|0|0";
            isDirect = "True";
            isOneStop = "False";
            isMoreThanOneStop = "False";
    }
    var depdate = $('DepDate').value;
    var airportAdded = false;
    sortString += "-";
    var originCount = eval($('originCount').value);
    for(var i=0; i<originCount; i++)
    {
        if(!$('fromSource'+i).checked)
        {
            airportAdded = true;
            sortString += $('fromSource'+i).value + "|";
        }
    }
    var layoverCount = eval($('layoverCount').value);
    if(layoverCount>0)
    {
        for(var i=0; i<layoverCount; i++)
        {
            if(!$('layoverId'+i).checked)
            {
                airportAdded = true;
                sortString += $('layoverId'+i).value + "|";
            }
        }
    }
    var destCount = eval($('destCount').value);
    for(var i=0; i<destCount; i++)
    {
        if(!$('toDest'+i).checked)
        {
            airportAdded = true;
            sortString += $('toDest'+i).value + "|";
        }
    }
    if(airportAdded)
    {
        sortString = sortString.substr(0,sortString.length-1); 
    }
    else
    {
        sortString += "null";
    }
    var airlineAdded = false;
    sortString += "-";
    var airlineCount = eval($('airlineCount').value);
    for(var i=0; i<airlineCount; i++)
    {
        if(!$('airline'+i).checked)
        {
            airlineAdded = true;
            sortString += $('airline'+i).value + "|";
        }
    }
    if(airlineAdded)
    {
        sortString = sortString.substr(0,sortString.length-1); 
    }
    else
    {
        sortString += "null";
    }
    $('sortStringPaging').value=sortString;
    $('sessionIdPaging').value=$('SessionIdSort').value;
    $('paging').submit();   
    location.href="#positionForValidation";   
}

function ShowPage(pageNo)
{
    fareRuleResultId = -1;
    $('pageNo').value=pageNo;
    $('keepPageNo').value = "true";
    SortSearchResultUserPref('Submit');
}

function showmessage(i)
{   var toolTip;
    toolTip = new YAHOO.widget.Tooltip("Tooltip", {context:"showtooltip"+i, text:"Total Commission Earned :"+document.getElementById('agentcommission'+i).value, showDelay:500 } );  
}


function ShowLayover()
{
    $('layoverLink').innerHTML="<a href=\"javascript:HideLayover()\">Hide</a>";
    $('layoverBlock').style.display="block";
}

function HideLayover()
{
    $('layoverLink').innerHTML="<a href=\"javascript:ShowLayover()\">Show</a>";
    $('layoverBlock').style.display="none";
}

function ShowHideOfferFare()
{
    if($('OfferedFare-'+eval($('ResultCountMin').value)).style.display == "block")
    {
        $('OfferedFareHidden').value = "none";
    }
    else if($('OfferedFare-'+eval($('ResultCountMin').value)).style.display == "none")
    {
        $('OfferedFareHidden').value = "block";
    }
    
    for(i=eval($('ResultCountMin').value) ;i<eval($('ResultCountMax').value);i++)
    {
        if($('OfferedFare-'+i).style.display == "none")
        {        
            $('OfferedFare-'+i).style.display = "block";
        }
        else if($('OfferedFare-'+i).style.display == "block")
        {
            $('OfferedFare-'+i).style.display = "none";
        }
    }
}

function changeDetails()
{
    $('ChangeDet').submit();    
}
function ShowEmailDiv(operation) {
    var count = 0;
    if (document.getElementById('ctl00_cphTransaction_hdnCheckboxEmail').value != '') {
        var hdnEmailBoxId = document.getElementById('ctl00_cphTransaction_hdnCheckboxEmail').value.split(',');
        //@@@@
        if (operation == 'Email')
            document.getElementById('emailStatus').style.display = 'none';

        count = hdnEmailBoxId.length;
    }
    if (count == 0) {
        alert('Select the itinerary to ' + operation);
        return;
    }

    
    if (operation == 'Email') {
        document.getElementById('emailBlock').style.display = 'block';
        document.getElementById('itineraryCount').innerHTML = "Selected " + count + " Itineraries for " + operation;
    }
    else {
        document.getElementById('downloadBlock').style.display = 'block';
        document.getElementById('itineraryCount1').innerHTML = "Selected " + count + " Itineraries for " + operation;
    }
}
    


function disp(elem)
{
    var id = elem.id.split("-");
    var i = eval(id[1]);
    return;
}

function SendMail(index) {


    if (window.XMLHttpRequest) {
        Ajax = new XMLHttpRequest();
    }
    else {
        Ajax = new ActiveXObject('Microsoft.XMLHTTP');
    }
    var csv = '';
    var sourceName = 'Flights';
    // var isPublishPrice=document.getElementById('offerPrice').checked;
    if (document.getElementById('ctl00_cphTransaction_hdnCheckboxEmail').value != '') {

        var hdnEmailBoxId = document.getElementById('ctl00_cphTransaction_hdnCheckboxEmail').value.split(',');

        var addressList = document.getElementById('addressBox').value;
        var totalMarkup = document.getElementById('txtMarkup').value;

        if (!ValidEmail.test(addressList)) {
            document.getElementById('errortext').innerHTML = "Enter valid email address";
            return false;
        }


        for (var i = 0; i < hdnEmailBoxId.length; i++) {

            if (csv != '') {
                csv += ',' + hdnEmailBoxId[i];
            }
            else {
                csv = '' + hdnEmailBoxId[i];
            }
        }

        var paramList = 'EMailResult="true"';
        paramList = paramList + "&csvId=" + csv;
        paramList = paramList + "&addressList=" + addressList;
        //    paramList = paramList + "&isPublished=" + isPublishPrice;
        paramList = paramList + "&totalMarkup=" + totalMarkup;
        paramList = paramList + "&sourceName=" + sourceName;
        Ajax.onreadystatechange = DisplayMessage;
        var url = "EmailItineraryPage.aspx";
        //new Ajax.Request(url, {method: 'post', parameters: paramList, onComplete: DisplayMessage});
        Ajax.open('POST', url);
        Ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        Ajax.send(paramList);

    }
}



function DisplayMessage()
{

    if (Ajax.readyState == 4) {
        if (Ajax.status == 200) {
            if (Ajax.responseText != '') {
                document.getElementById('emailStatus').innerHTML = Ajax.responseText;
                document.getElementById('emailStatus').style.display = 'block';
                if (Ajax.responseText.startsWith('Email Sent')) {
                    document.getElementById('emailBlock').style.display = 'none';
                    document.getElementById('addressBox').value = '';
                    document.getElementById('txtMarkup').value = '';
                }
            }
            else {
                //document.getElementById('error').innerHTML = 'Your message has been sent';
                document.getElementById('emailStatus').innerHTML = 'Your message has been sent';
                document.getElementById('emailStatus').style.display = 'block';
                
            }
        }
    }  
}
function HideEmailDiv(id)
{
    document.getElementById(id).style.display = 'none';
    
}
var fareRuleResultId = -1;

function FareRule(resultId, sessionId)
{
    if(fareRuleResultId != resultId) {

        if (window.XMLHttpRequest) {
            Ajax = new XMLHttpRequest();
        }
        else {
            Ajax = new ActiveXObject('Microsoft.XMLHTTP');
        }
        var pars = "resultId=" + resultId+"&sessionId="+sessionId;
        // this page will return fare rules only when the result array is stored in session.
        var url = "FareRule.aspx";
        //new Ajax.Request(url, {method: 'post', parameters: pars, onComplete: DisplayFareRule});
        Ajax.onreadystatechange = DisplayFareRule;
        Ajax.open('POST', url);
        Ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        Ajax.send(pars);
//        alert(browser.isNS);
//        alert('Y' + window.scrollY);
        //        alert('Top' + document.documentElement.scrollTop);
        
        if(browser.isIE)
        {
            document.getElementById('FareRuleBlock').style.top = 100 + document.documentElement.scrollTop + "px";
        }
        else if(browser.isNS)
        {
            if (window.scrollY != null) {
                document.getElementById('FareRuleBlock').style.top = 100 + window.scrollY + "px";
            }
            else { document.getElementById('FareRuleBlock').style.top = 100 + document.documentElement.scrollTop + "px"; }
        }
        else
        {
            document.getElementById('FareRuleBlock').style.top = 100;
        }
        document.getElementById('FareRuleBody').innerHTML = "Loading ...";
        fareRuleResultId = resultId;
    }
    document.getElementById('FareRuleBlock').style.display = "block";
    //TODO: we need to highlight the result block here $('Result-' + resultId)
}

function DisplayFareRule() {
    try {

        if (Ajax.readyState == 4) {
            if (Ajax.status == 200) {
                document.getElementById('FareRuleHeadTitle').innerHTML = "Fare Rules";
                if (Ajax.responseText != null && Ajax.responseText.split('#PK#').length > 0) {
                    document.getElementById('FareRuleBody').innerHTML = Ajax.responseText.split('#PK#')[0];
                    if (Ajax.responseText.split('#PK#').length > 1 && Ajax.responseText.split('#PK#')[1] != null && Ajax.responseText.split('#PK#')[1].trim().length > 2) {
                        document.getElementById('BaggageDiv' + fareRuleResultId).innerHTML = Ajax.responseText.split('#PK#')[1];
                    }
                }
            }
        }
    }
    catch (e) {
        alert(e);
    }
}

var journeyType;
function GetFareRule(resultId, sessionId, type, index) {


    if (window.XMLHttpRequest) {
        Ajax = new XMLHttpRequest();
    }
    else {
        Ajax = new ActiveXObject('Microsoft.XMLHTTP');
    }
    var pars = "resultId=" + resultId + "&sessionId=" + sessionId;
    // this page will return fare rules only when the result array is stored in session.
    var url = "FareRule.aspx";
    //new Ajax.Request(url, {method: 'post', parameters: pars, onComplete: DisplayFareRule});
    Ajax.onreadystatechange = DisplayGetFareRule;
    Ajax.open('POST', url);
    Ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    Ajax.send(pars);

    fareRuleResultId = index;
    journeyType = type;
}

function DisplayGetFareRule() {
    try {

        if (Ajax.readyState == 4) {
            if (Ajax.status == 200) {

                if (Ajax.responseText != null && Ajax.responseText.split('#PK#').length > 0) {
                    var fareRules = "<div class='padding-10 refine-result-bg-color'>" + Ajax.responseText.split('#PK#')[0] + "</div>";
                    if (journeyType == 'ONWARD') {
                        document.getElementById('onFareRules' + fareRuleResultId).innerHTML = fareRules;
                    }
                    else {
                        document.getElementById('retFareRules' + fareRuleResultId).innerHTML = fareRules;
                    }
                    //Since we are not binding for PKFare in routing comment this condition
                    //if (Ajax.responseText.split('#PK#').length > 1 && Ajax.responseText.split('#PK#')[1] != null) {
                    //    document.getElementById('BaggageDiv' + fareRuleResultId).innerHTML = Ajax.responseText.split('#PK#')[1];
                    //}
                }
                else {
                    var fareRules = "<div class='padding-10 refine-result-bg-color'>Unable to load Fare rules at this moment. Please try again later.</div>";
                    if (journeyType == 'ONWARD') {
                        document.getElementById('onFareRules' + fareRuleResultId).innerHTML = fareRules;
                    }
                    else {
                        document.getElementById('retFareRules' + fareRuleResultId).innerHTML = fareRules;
                    }
                }
            }
        }
    }
    catch (e) {
        alert(e);
    }
}

function FareRuleHide()
{
    
    //TODO: need to remove highlight from result block
    DisplayNone('FareRuleBlock');
    
}

function DayChangeOutBound(dayDiff)
{
    $('dayDiff').value=dayDiff;
    $('outBound').value='true';
    $('ChangeDay').submit();
}
function DayChangeInBound(dayDiff)
{
    $('dayDiff').value=dayDiff;
    $('inBound').value='true';
    $('ChangeDay').submit();
}

function ShowHotelEmailDiv() {
    document.getElementById('emailBlock').style.display = 'block';
  
}

function SendHotelMail(index, y) {
//    document.getElementById('selRoomIndexMail').value = "";
    var rooms = eval(document.getElementById('hRooms').value);
    var selRoomIndexMail = "";
    if (rooms > 0) {
        for (i = 0; i < rooms; i++) {
            for (j = 0; j < y; j++) {
                var radio = document.getElementById('RoomChoice' + i + 'Type' + j);
                if (radio != null && (radio.checked)) {
                    if (selRoomIndexMail != "") {
                        selRoomIndexMail += ',' + j;
                    }
                    else {
                        selRoomIndexMail = ''+j;
                    }
                }
            }
        }
    }


    if (window.XMLHttpRequest) {
        Ajax = new XMLHttpRequest();
    }
    else {
        Ajax = new ActiveXObject('Microsoft.XMLHTTP');
    }
    var sourceName = "Hotel Details";
    //var hotelCode = document.getElementById('hotelCode').value;
    var roomTypeId = selRoomIndexMail;
    var mailAddress = document.getElementById('addressBox').value;
    var totalMarkup = document.getElementById('txtMarkup').value;

    if (!ValidEmail.test(mailAddress)) {
        document.getElementById('errortext').innerHTML = "Enter valid email address";
        return false;
    }
    else {
        document.getElementById('emailBlock').style.display = 'none';
    }

    var paramList = 'EMailResult="true"';
    paramList = paramList + "&sourceName=" + sourceName;
    paramList = paramList + "&addressList=" + mailAddress;
    paramList = paramList + "&totalMarkup=" + totalMarkup;
    paramList = paramList + "&roomTypeNo=" + roomTypeId;
    Ajax.onreadystatechange = DisplayHotelMessage;

    var url = "EmailItineraryPage.aspx";
    //new Ajax.Request(url, {method: 'post', parameters: paramList, onComplete: DisplayMessage});
    Ajax.open('POST', url);
    Ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    Ajax.send(paramList);
    

}
function DisplayHotelMessage() {

    if (Ajax.readyState == 4) {
        if (Ajax.status == 200) {
            if (Ajax.responseText != '') {
                document.getElementById('emailStatus').innerHTML = Ajax.responseText;
                document.getElementById('emailStatus').style.display = 'none';
                if (Ajax.responseText.startsWith('Email Sent')) {
                    document.getElementById('emailBlock').style.display = 'none';
                    document.getElementById('addressBox').value = '';
                    document.getElementById('txtMarkup').value = '';
                    document.getElementById('emailStatus').innerHTML = 'Your mail has been sent';
                    document.getElementById('emailStatus').style.display = 'block';
                }

            }
            else {
                //document.getElementById('error').innerHTML = 'Your message has been sent';
//                document.getElementById('emailStatus').innerHTML = 'Your mail has been sent';
//                document.getElementById('emailStatus').style.display = 'none';

            }
        }
    }
}


