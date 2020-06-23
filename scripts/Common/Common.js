
var Messages = '';
var PREFIX_MASTER = 'ctl00_cphTransaction_';
var PREFIX_MASTER_PAXGRID = 'ctl00_cphTransaction_dlAdditionalPax_ctl0';

function getElement(id){
    return (document.getElementById(PREFIX_MASTER + id));
}

function getAddlElement(id,counter) {
    return (document.getElementById(PREFIX_MASTER_PAXGRID + counter + '_' + id));
}

function getMessage(){
return(Messages)}
function clearMessage(){
Messages=''}
function addMessage(msg,fieldId){
try{
Messages+='* '+msg+'\r\n'}
catch(err){}}

function isNumeric(fieldId,allowNegative){
try{
var object=document.getElementById(fieldId)
if(object==null)return(true)
var type=object.type
if(type=='text' ||type=='textarea'||type=='password')
if(object.value.length==0)return(false)
var RegExp
if(allowNegative=='false')RegExp=/^[+]?(\d*)(\.?)(\d*)$/;else RegExp=/^[-+]?(\d*)(\.?)(\d*)$/
return(object.value.match(RegExp)!=null)}
catch(err){
showError(err,'Validation','isNumeric')}}



function restrictNumeric(fieldId,kind){
try{
return(maskNumeric(fieldId,(kind=='3'||kind=='4'?'false':'true'),(kind=='1'||kind=='3'?'true':'false')))}
catch(err){
showError(err,'Validation','restrictNumeric');return(false)}}
function maskNumeric(fieldId,ignoreNegative,IgnoreDecimal){
var key;var keychar
if(ignoreNegative==null)ignoreNegative='true'
if(IgnoreDecimal==null)IgnoreDecimal='true'
if(window.event){
if(navigator.appName.substring(0,1)=='M') key=window.event.keyCode
else key=window.event.charCode }
else if(event) key=event.which
else return true
keychar=String.fromCharCode(key)
if((key==null)||(key==0)||(key==8)||(key==9)||(key==13)||(key==27))return true
var strSet="0123456789"+(ignoreNegative=='true'?'':'-')+(IgnoreDecimal=='true'?'':'.')
if((strSet.indexOf(keychar)>-1)){
var inputbox=document.getElementById(fieldId)
if(ignoreNegative=='false'&&key==45){
if(inputbox.value.indexOf('-')==-1)inputbox.value='-'+inputbox.value
return(false)}
if(IgnoreDecimal=='false'&&inputbox.value.indexOf('.')>-1&&key==46)return(false)
return true}
return(false)}

//TO Fix Decimal Points
   function setToFixed(id)
   {
   //alert(getElement(id).value)
        var point=4;
       if(!isNaN(getElement(id).value) && getElement(id).value!='')
       {
            var value=parseFloat(getElement(id).value);
            getElement(id).value=value.toFixed(point);
        }
        else
        {
             var defValue=parseFloat('0');
             getElement(id).value= defValue.toFixed(point);
        }
   }
   function setToFixedThis(id)
   {
   //alert(document.getElementById(id).value)
       var point=7;
       if(!isNaN(document.getElementById(id).value) && document.getElementById(id).value!='')
       {
            var value=parseFloat(document.getElementById(id).value);
            document.getElementById(id).value=value.toFixed(point);
        }
        else
        {
             var defValue=parseFloat('0');
             document.getElementById(id).value= defValue.toFixed(point);
        }
   }
   //Checking Valid Email Pattern
   function checkEmail(inputvalue){	
    var pattern=/^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
    if(pattern.test(inputvalue)){         
		return true;
    }else{   
		return false;
    }
}

/* To validate Alpha numeric values of text box */
function IsAlphaNum(e) {

    var keyCode = e.keyCode == 0 ? e.charCode : e.keyCode;
    return ((keyCode >= 46 && keyCode <= 58) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122)
        || (specialKeys.indexOf(e.keyCode) != -1 && e.charCode != e.keyCode) || keyCode == 32);
}

/* To validate Alpha values of text box */
function IsAlpha(e) {
    var keyCode = e.keyCode == 0 ? e.charCode : e.keyCode;
    return ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122)
        || (specialKeys.indexOf(e.keyCode) != -1 && e.charCode != e.keyCode) || keyCode == 32);
}

/* To validate numeric values of text box */
function IsNumeric(e) {
    var keyCode = e.keyCode == 0 ? e.charCode : e.keyCode;
    return ((keyCode >= 46 && keyCode <= 58) || (specialKeys.indexOf(e.keyCode) != -1 && e.charCode != e.keyCode) || keyCode == 32);
}

/* To call ajax web methods */
function AjaxCall(Ajaxurl, Inputdata) {

    var obj = '';

    $.ajax({
        type: "POST",
        url: Ajaxurl,
        contentType: "application/json; charset=utf-8",
        data: Inputdata,// "{'sOrigin':'" + origin + "','sDestination':'" + destination + "','sPaxnames':'" + PaxNames.toString() + "'}",
        dataType: "json",
        async: false,
        success: function (data) {
            obj = (data == null || data.d == null || data.d == 'undefined' || data.d == '') ? '' : data.d;
        },
        error: function (error) {
            console.log(JSON.stringify(error));
        }
    });

    return obj;
}

/* To call asynchronous ajax web methods */
function AsyncAjaxCall(Ajaxurl, Inputdata) {

    var obj = '';

    $.ajax({
        type: "POST",
        url: Ajaxurl,
        contentType: "application/json; charset=utf-8",
        data: Inputdata,
        dataType: "json",
        success: function (data) {
            obj = (data == null || data.d == null || data.d == 'undefined' || data.d == '') ? '' : data.d;
        },
        error: function (error) {
            console.log(JSON.stringify(error));
        }
    });

    return obj;
}

/* To set text box value */
function Settextval(id, val) {

    document.getElementById(id).value = val != null ? val : '';
}

/* To set normal drop down value based on display text/stored value */
function Setdropval(id, val, type) {

    val = IsEmpty(val) ? '' : val.trim();
    if (type == 'text')
        document.getElementById(id).value = $("#" + id + " option").filter(function () { return this.text == val.trim(); }).val();
    else
        document.getElementById(id).value = val.trim();

    if (document.getElementById(id).value == '')
        document.getElementById(id).value = $("#" + id + " option:first").val();
}

/* To set bootstrap drop down value based on display text/stored value */
function Setddlval(id, val, type) {

    val = IsEmpty(val) ? '' : val.trim();
    if (type == 'text')
        $("#s2id_" + id).select2('val', $("#" + id + " option").filter(function () { return this.text == val.trim(); }).val());
    else
        $("#s2id_" + id).select2('val', val.trim());

    if (document.getElementById(id).value == '')
        $("#s2id_" + id).select2('val', $("#" + id + " option:first").val());
}

/* To display error message in JS */
function ShowError(errmsg) {

    var errmsgs = $('.toast-message'); var display = true;
    if (errmsgs != null && errmsgs.length > 0) {

        $.each(errmsgs, function (key, msgs) {

            if (errmsg == msgs.innerText) {
                display = false;
                return false;
            }
        });
    }
    if (display)
        toastr.error(errmsg);
}

/* To check the empty/blank values of a field */
function IsEmpty(val) {

    return (val == null || val == 'undefined' || val == '');
}

/* To call Web API methods */
function WebAPICall(Ajaxurl, Inputdata, Method) {

    var obj = '';

    $.ajax({
        type: Method,
        url: Ajaxurl,
        ContentType: "application/json; charset=utf-8",
        data: Inputdata,
        dataType: "json",
        async: false,
        success: function (data) {
            obj = IsEmpty(data) ? '' : data;
        },
        error: function (error) {
            console.log(JSON.stringify(error));
        }
    });

    return obj;
}

/* To get country code and name from google maps result */
function GetCountry(place) {

    var sCountry = '';
    if (place != null && place.address_components != null && place.address_components.length > 0)
    {
        $.each(place.address_components, function (key, col) {

            if (col.types != null && col.types.length > 0 && col.types.indexOf('country') > -1)
                sCountry = col.long_name + '|' + col.short_name;
        });
    }
    return IsEmpty(sCountry) ? place.formatted_address : sCountry;
}

/* To get country code and name from google maps result */
function GetCityNamePOI(place) {

    var sCityName = '';

    if (place != null && place.address_components != null && place.address_components.length > 0) {

        $.each(place.address_components, function (key, col) {

            if (col.types != null && col.types.length > 1 && col.types.indexOf('locality') > -1 && col.types.indexOf('political') > -1)
                sCityName = col.long_name + '|' + col.short_name;
            if (IsEmpty(sCityName) && col.types != null && col.types.length > 0 && col.types.indexOf('postal_town') > -1)
                sCityName = col.long_name + '|' + col.short_name;
        });
    }

    return IsEmpty(sCityName) ? place.formatted_address : sCityName;
}

/* To enable or disable all input controls of a given selector */
function EnableDisableCntrls(selctor, disable, ignoreelements, ignoreIds) {

    Cntrls = $('.' + selctor + ' :input');

    if (IsEmpty(Cntrls))
        return;

    var ignreelememts = !IsEmpty(ignoreelements) ? ignoreelements.split('|') : [];
    var ignreIds = !IsEmpty(ignoreIds) ? ignoreIds.split('|') : [];

    $.each(Cntrls, function (key, col) {

        if (ignreelememts.length > 0 && ignreelememts.indexOf(col.type) != -1)
            return;

        if (ignreIds.length > 0 && ignreIds.indexOf(col.id) != -1)
            return;

        if (disable)
            $(col).attr('disabled', '');
        else
            $(col).removeAttr('disabled', '');
    });
}

/* To log error into audit and send email */
function LogError(sException, sEvent) {

    try {

        AjaxCall('ApiGuestDetails.aspx/LogError', "{'sException':'" + sException + "', 'sEvent':'" + sEvent + "'}");
    }
    catch (exception) {
        var exp = exception;
    }
}
