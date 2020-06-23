
/* Global variables */
var FlexInfo, FlexConfigs, divFlexFields, divFlex = '', Moreflexexp = '', divHDRFlex = '';
var PaxFlexHTML = []; var FlexTextBox = [];
var FPaxcount = 0; var leadpax = '0'; var CorpTravelReason = '';
var focusoncntrl = true; var MoreFlexKey = 0;

/* Global static data variables */
var sNumFn = "restrictNumeric(this.id,'1');"; var sAlphaNumFn = 'IsAlphaNum(event)'; var sDateValFn = 'ValidateDate(this)';
var servertagname = 'ctl00_cphTransaction_'; var errorclass = 'form-text-error';
var bsServertag = 's2id_'; var Flex = 'Flex'; var ddl = 'ddl'; var txt = 'txt'; var div = 'div';
var block = 'block'; var none = 'none'; var T = 'T'; var L = 'L'; var D = 'D'; var empty = ''; var pipe = '|';
var shash = '#'; var sdot = '.'; var Y = 'Y'; var N = 'N'; var disabled = 'disabled'; var carat = '^'
var defseloption = '<option selected="selected" value="">--Select--</option>'; var Flexexp = 'ancAPI';

/* To get new ddl option */
function GetNewddloption(selval, stext, Issel) {

    return '<option ' + (Issel ? 'selected="selected" ' : empty) + 'value="' + selval + '">' + stext + '</option>'; 
}

/* To check the empty/blank values of a field */
function IsEmpty(val) {

    return (val == null || val == 'undefined' || val == empty);
}

/* To add mandatory aestrick span */
function AddMandatory(isreq) {
    return isreq ? '<span class="red_span">*</span>' : empty;
}

/* To add dynamic text box field */
function AddTextbox(lable, id, val, Isreq, onkeypress, maxlen, onchange, IsDate, IsDisable) {

    return AddMandatory(Isreq) + '<label><strong>' + lable + ': </strong></label> <input id="' + txt + id +
        '" type="text" onkeypress="' + onkeypress + '" ' + (IsDisable ? 'disabled' : 'placeholder= "Enter ' + lable + '" ') + 
        ' class="form-control ' + (Isreq ? 'FlexReq ' : empty) + (IsDate ? 'EnableCal' : empty) + '" maxlength="' + maxlen + '" ' +
        (!IsEmpty(onchange) ? 'onchange="' + onchange + '" ' : empty) + (!IsEmpty(val) ? 'value="' + val + '" ' : empty) + '>';
}

/* To Bind Flex field drop down list based on flex query */
function AddFlexddl(lable, id, val, Isreq, ddlquery, paxid, IsDisable) {

    return AddMandatory(Isreq) + '<label><strong>' + lable + ': </strong></label> <select id="' + ddl + id + '" ' +
        (IsDisable ? disabled : empty) + ' class="form-control">' +
        (IsEmpty(ddlquery) ? defseloption : (paxid == leadpax ? GetFlexddlData(ddlquery, ddl)
            : document.getElementById(ddl + leadpax + id.substring(leadpax.length, id.length)).innerHTML)) + '</select>';
}

/* To bind flex field drop down list dynamically based on dependent flex field selected value */
function BindFlexdynamicddl(selval, ddlid, ddlquery, cntrl) {

    try {

        ddlquery = IsEmpty(ddlquery) ? empty : ddlquery.replace(/@value/g, selval);
        if (cntrl == ddl && ddlquery != empty)
            document.getElementById(ddlid).innerHTML = GetFlexddlData(ddlquery, cntrl);
        else
            document.getElementById(ddlid).value = ddlquery != empty ? GetFlexddlData(ddlquery, cntrl) : selval;
        document.getElementById(ddlid.replace(cntrl, div)).style.display = (!IsEmpty(selval) && selval != empty) ? block : none;
        Setddlval(ddlid, '-1', empty);
    }
    catch (exception) {
        var exp = exception;
    }
}

/* To get data for flex field drop down list based on flex query */
function GetFlexddlData(ddlquery, cntrl) {

    try {

        ddlquery = ddlquery.replace(/'/g, '^');
        var ddldata = IsEmpty(ddlquery) ? empty : JSON.parse(AjaxCall('BookOffline.aspx/GetFlexddlData', "{'sddlQuery':'" + ddlquery + "'}"));

        if (ddldata != empty) {

            var col = [];

            for (var key in ddldata[0]) {
                col.push(key);
            }

            var ddlhtml = empty;

            if (cntrl == ddl) {

                for (var d = 0; d < ddldata.length; d++) {

                    ddlhtml += GetNewddloption(ddldata[d][col[0]], ddldata[d][col[1]], false);
                }
            }
            return cntrl == txt ? ddldata[0][col[0]] : defseloption + ddlhtml;
        }
        else
            return cntrl == txt ? empty : defseloption;
    }
    catch (exception) {
        return cntrl == txt ? empty : defseloption;
    }
}

/* To Bind Flex fields for all pax */
function BindFlexFields(data, configdata, flexdiv, flexfldsdiv, paxcnt, corptrvlreson) {

    try {

        if (IsEmpty(data) || IsEmpty(flexfldsdiv) || IsEmpty(paxcnt) || Math.ceil(paxcnt) <= 0)
            return;

        var Flexdivs = flexfldsdiv.split('|'); /* if we have header and footer flex fields, we will have two div id's to bind the flex fields */
        divFlexFields = Flexdivs[0]; divFlex = flexdiv; divHDRFlex = Flexdivs.length > 1 ? Flexdivs[1] : empty;
        FlexInfo = JSON.parse(data); FPaxcount = paxcnt; CorpTravelReason = corptrvlreson;
        Flexconfigs = IsEmpty(configdata) ? empty : configdata.split(pipe);

        for (var p = 0; p < FPaxcount; p++) {

            GetFlexHTML(divFlexFields + p, p);
            if (document.getElementById(divFlex + p) != null)
                document.getElementById(divFlex + p).style.display = block;
            if (document.getElementById(divFlexFields + p) != null)
                document.getElementById(divFlexFields + p).style.display = block;
        }

        $('select').select2();

        /* To enable date picker calender icon for flex fields */
        $(".EnableCal").datepicker({ dateFormat: 'dd/mm/yy' });
    }
    catch (exception) {
        var exp = exception;
    }
}

/* To append Flex fields html for each pax */
function GetFlexHTML(divid, paxid) {


    if (FlexInfo != null) {

        var flexids = []; var FieldCnt = 0; Moreflexexp = 'anc' + divid;

        $.each(FlexInfo, function (key, col) {

            try {

                flexids.push(pipe + col.flexId + col.flexControl + pipe);

                var IsBind = IsEmpty(col.flexTravelReason) || CorpTravelReason == '0' || CorpTravelReason == col.flexTravelReason;

                if (IsEmpty(col.flexTravelReason) && CorpTravelReason != '0' && !IsEmpty(Flexconfigs)) {

                    var sFlexBind = ValFlexConfigs(Flexconfigs, col.flexLabel, CorpTravelReason);
                    if (!IsEmpty(sFlexBind) && sFlexBind.split('|')[0] == 'true')
                        IsBind = sFlexBind.split('|')[1] == 'true';
                }

                if (!IsBind) { return; }

                var dataevnt = col.flexDataType == T ? empty : col.flexDataType == N ? 'return ' + sNumFn : 'return ' + sAlphaNumFn;
                var cntrlhtml = empty;

                if (col.flexControl == T || col.flexControl == D)
                    cntrlhtml = AddTextbox(col.flexLabel, paxid + Flex + key, (paxid == leadpax ? col.Detail_FlexData : empty), (col.flexMandatoryStatus == Y),
                        dataevnt, '50', (col.flexControl == D ? sDateValFn : empty), col.flexControl == D, col.flexDisable);
                if (col.flexControl == L)
                    cntrlhtml = AddFlexddl(col.flexLabel, paxid + Flex + key, empty, (col.flexMandatoryStatus == Y),
                        (col.flexSqlQuery.indexOf('@value') != -1 ? empty : col.flexSqlQuery), paxid, col.flexDisable);

                var isDependent = false; var dcntid = empty;

                if (col.FLEXVALID != '' && (flexids.indexOf(pipe + col.FLEXVALID + T + pipe) != -1 || flexids.indexOf(pipe + col.FLEXVALID + L + pipe) != -1)) {

                    dcntid = flexids.indexOf(pipe + col.FLEXVALID + T + pipe) != -1 ? txt + paxid + Flex + flexids.indexOf(pipe + col.FLEXVALID + T + pipe) :
                        ddl + paxid + Flex + flexids.indexOf(pipe + col.FLEXVALID + L + pipe);

                    if (document.getElementById(dcntid) == null)
                        return;

                    var curflex = col.flexControl == L ? ddl : txt;
                    var ocflex = flexids.indexOf(pipe + col.FLEXVALID + T + pipe) != -1 ? txt : ddl;

                    isDependent = IsEmpty(document.getElementById(dcntid).value);

                    $(shash + dcntid).on('change', function (e) { BindFlexdynamicddl((ocflex == txt ? e.target.value : e.val), curflex + paxid + Flex + key, col.flexSqlQuery, curflex); });
                }

                isDependent = paxid == leadpax ? (isDependent && IsEmpty(col.Detail_FlexData)) : isDependent;

                cntrlhtml = '<div ' + (isDependent ? 'style="display:none"' : empty) + ' class="col-md-4 mb-4 ' + (col.flexDisable ? disabled : empty) + '" '
                    + 'id="div' + paxid + Flex + key + '">' + cntrlhtml + '</div>';

                if (FieldCnt == 10) {

                    MoreFlexKey = key;
                    $(shash + divid).append('<div class="collapse" id="' + divid + 'MoreFlex"><div id="' + divid + 'More" >' +
                        cntrlhtml + '</div>');
                    $(shash + divid).append(
                        '<a style="color: rgb(0, 0, 0); margin-left: 0px; padding: 0px;" id="' + Moreflexexp + '" ' +
                        'aria-expanded="false" aria-controls="collapseExample" class="advPax-collapse-btn-new float-left"' +
                        'role="button" data-toggle="collapse" href="#' + divid + 'MoreFlex"></a>');
                }
                else if (FieldCnt > 10)
                    $(shash + divid + 'More').append(cntrlhtml);
                else if (!IsEmpty(divHDRFlex) && !IsEmpty(col.flexplacehold) && col.flexplacehold.toUpperCase() == 'HDR')
                    $(shash + divHDRFlex).append(cntrlhtml);
                else
                    $(shash + divid).append(cntrlhtml);

                if (paxid == leadpax && col.flexControl == L && (!IsEmpty(col.Detail_FlexData) || !IsEmpty(dcntid))) {

                    if (document.getElementById(dcntid) != null && !IsEmpty(document.getElementById(dcntid).value))
                        BindFlexdynamicddl(document.getElementById(dcntid).value, ddl + paxid + Flex + key, col.flexSqlQuery, ddl);

                    if (document.getElementById(ddl + paxid + Flex + key) != null)
                        Setdropval(ddl + paxid + Flex + key, col.Detail_FlexData, empty);
                }

                if (IsEmpty(divHDRFlex) || IsEmpty(col.flexplacehold) || col.flexplacehold.toUpperCase() != 'HDR')
                    FieldCnt++;
            }
            catch (exception) {
                var exp = exception;
            }
        });
    }
}

/* To set profile flex fields data */
function SetPaxFlexData(paxindx, PaxProfilesFlexData, PrfId) {
        
    if (FlexInfo != null && FlexInfo != 'undefined' && FlexInfo != '' && FlexInfo.length > 0) {

        DelErrorClass();
        var flexids = [];

        $.each(FlexInfo, function (key, col) {

            flexids.push(pipe + col.flexId + col.flexControl + pipe);

            if (!IsEmpty(col.FLEXVALID) && (flexids.indexOf(pipe + col.FLEXVALID + T + pipe) != -1 || flexids.indexOf(pipe + col.FLEXVALID + L + pipe) != -1)) {

                var dcntid = flexids.indexOf(pipe + col.FLEXVALID + T + pipe) != -1 ? txt + paxindx + Flex + flexids.indexOf(pipe + col.FLEXVALID + T + pipe) :
                    ddl + paxindx + Flex + flexids.indexOf(pipe + col.FLEXVALID + L + pipe);
                var curflex = col.flexControl == L ? ddl : txt;

                BindFlexdynamicddl(document.getElementById(dcntid).value, curflex + paxindx + Flex + key, col.flexSqlQuery, curflex);
                dcntid = dcntid.replace(txt, div).replace(ddl, div);
                if (document.getElementById(dcntid) != null && document.getElementById(dcntid).style.display == none)
                    document.getElementById(div + paxindx + Flex + key).style.display = none;
            }

            AssignFlexData(col.flexControl, key, paxindx, PaxProfilesFlexData, PrfId, col.flexId);
            EnableDisableField(div + paxindx + Flex + key, (col.flexControl == L ? ddl : txt) + paxindx + Flex + key, (col.flexDisable == 0 || PrfId == '-1' || PrfId == '-2'));
        });
    } 
}

/* To assign flex field control data */
function AssignFlexData(cntrltype, cntrlid, paxid, PaxProfilesFlexData, sPrfId, sflexId) {

    try {
        
        var flxdata = empty;

        if (!IsEmpty(PaxProfilesFlexData) && sPrfId > 0) {

            $.each(PaxProfilesFlexData, function (sno, prfflxdata) {
                if (prfflxdata.ProfileId == sPrfId && sflexId == prfflxdata.flexId && !IsEmpty(prfflxdata.Detail_FlexData))
                    flxdata = prfflxdata.Detail_FlexData;
            });
        }

        if ((cntrltype == T || cntrltype == D) && document.getElementById(txt + paxid + Flex + cntrlid) != null)
            document.getElementById(txt + paxid + Flex + cntrlid).value = flxdata;
        else if (cntrltype == L && document.getElementById(ddl + paxid + Flex + cntrlid) != null)
            Setddlval(ddl + paxid + Flex + cntrlid, flxdata, empty);
    }
    catch (exception) {
        var exp = exception;
    }
}

/* To validate flex information for all pax */
function ValidateFlex(PaxFlexCntrlid, IsRetainFlex) {

    focusoncntrl = true;

    DelErrorClass();

    try {

        for (var p = 0; p < FPaxcount; p++) {

            var isValid = ValPaxFlex(p);

            var pid = p == 0 ? empty : Math.ceil(p) - 1;
            if (!isValid) { ExpandAddAPI(pid, Flexexp); }
        }

        if (focusoncntrl && !IsEmpty(PaxFlexCntrlid))
            SaveFlexInfo(PaxFlexCntrlid, IsRetainFlex);
        return focusoncntrl;
    }
    catch (exception) {
        return true;
    }
}

/* To validate pax wise flex */
function ValPaxFlex(p) {

    var isValid = true;
    $.each(FlexInfo, function (key, col) {

        var isCheck = true;
        if (col.flexMandatoryStatus == Y && document.getElementById(div + p + Flex + key) != null &&
            document.getElementById(div + p + Flex + key).style.display != none) {

            if (col.flexControl == T || col.flexControl == D)
                isCheck = validmandatory(txt + p + Flex + key, txt, empty, empty, false);
            else if (col.flexControl == L && $(shash + ddl + p + Flex + key).children('option').length > 1)
                isCheck = validmandatory(ddl + p + Flex + key, ddl, '--Select--', empty, false);
        }

        isValid = isValid ? isCheck : isValid;
        if (!isCheck && key >= MoreFlexKey && document.getElementById('anc' + div + Flex + p) != null) { ExpandAddAPI(p, 'anc' + div + Flex); }
    });
    return isValid;
}

/* To delete error class for all controls */
function DelErrorClass() {

    var errmsgs = $(sdot + errorclass);
    if (errmsgs != null && errmsgs.length > 0) {

        $.each(errmsgs, function (key, cntrl) {

            $(shash + cntrl.id).removeClass(errorclass);
        });
    }
}

/* Common function to validate text box and ddl controls */
function validmandatory(cntrlid, cntrltype, defaultval, errmsg, issrvrcntrl) {

    var valid = true;

    cntrlid = (issrvrcntrl && cntrlid.indexOf(servertagname) < 0) ? servertagname + cntrlid : cntrlid;

    if (document.getElementById(cntrlid) == null)
        return true;

    if (cntrltype == ddl && document.getElementById(bsServertag + cntrlid).style.display != none) {

        var ddlvalue = document.getElementById(bsServertag + cntrlid).innerText.trim();

        if (ddlvalue == defaultval || ddlvalue == empty) {

            $(shash + bsServertag + cntrlid).parent().addClass(errorclass);
            if (focusoncntrl)
                document.getElementById(bsServertag + cntrlid).focus();
            valid = false;
            if (!IsEmpty(errmsg))
                ShowError(errmsg);
        }
        else 
            $(shash + bsServertag + cntrlid).parent().removeClass(errorclass);
    }

    if (cntrltype == txt && document.getElementById(cntrlid).style.display != none) {
        var txtvalue = document.getElementById(cntrlid).value.trim();
        if (txtvalue == empty || txtvalue == defaultval || txtvalue == errmsg) {
            $(shash + cntrlid).addClass(errorclass); $(shash + cntrlid).val(empty);
            if (focusoncntrl)
                document.getElementById(cntrlid).focus();
            valid = false;
            if (!IsEmpty(errmsg))
                ShowError(errmsg);
        }
        else 
            $(shash + cntrlid).removeClass(errorclass);
    }
    focusoncntrl = focusoncntrl ? valid : focusoncntrl;

    return valid;
}

/* To display error message in JS */
function ShowError(errmsg) {

    var errmsgs = $('div.toast-message'); var display = true;
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

/* To save flex data */
function SaveFlexInfo(PaxFlexCntrlid, IsRetainFlex) {

    try {              

        var PaxFlexInfo = [];

        for (var p = 0; p < FPaxcount; p++) {

            var PaxFlexData = GetPaxFlexInfo(p, IsRetainFlex, '1');
            $.merge(PaxFlexInfo, PaxFlexData)
        }

        document.getElementById(PaxFlexCntrlid).value = JSON.stringify(PaxFlexInfo);
        GetPaxFlexhtml('G');
    }
    catch (exception) {
        return [];
    }
}

/* To get pax wise flex data */
function GetPaxFlexInfo(p, IsRetainFlex, prdct) {

    try {

        if (IsEmpty(FlexInfo))
            return [];

        var flexcnt = [];

        $.each(FlexInfo, function (key, col) {

            var flexdat = empty;

            if ((col.flexControl == T || col.flexControl == D) && document.getElementById(txt + p + Flex + key) != null)
                flexdat = document.getElementById(txt + p + Flex + key).value;
            else if (col.flexControl == L && document.getElementById(ddl + p + Flex + key) != null &&
                document.getElementById(ddl + p + Flex + key).value != empty &&
                document.getElementById(ddl + p + Flex + key).value != empty) {
                flexdat = document.getElementById(ddl + p + Flex + key).value;
            }

            if (document.getElementById(div + p + Flex + key) != null && document.getElementById(div + p + Flex + key).style.display != 'none') {

                flexcnt.push({
                    FlexId: col.flexId, FlexLabel: col.flexLabel, FlexGDSprefix: col.flexGDSprefix,
                    FlexData: IsEmpty(flexdat) ? empty : flexdat, ProductID: prdct, PaxId: (p.length > 1 ? 0 : p)
                });
            }

            if (IsRetainFlex)
                HoldFlexval((col.flexControl == L ? ddl : txt) + p + Flex + key, col.flexControl);
        });

        return flexcnt;
    }
    catch (exception) {
        return [];
    }
}

/* To set the drop downs selected values and remove other options for post back display */
function HoldFlexval(cntrlid, cntrl) {

    try {
        
        if (document.getElementById(cntrlid) == null)
            return;

        var selval = document.getElementById(cntrlid).value;

        if (cntrl == L) {

            var stext = document.getElementById(cntrlid).selectedOptions[0].text;
            document.getElementById(cntrlid).innerHTML = empty;
            document.getElementById(cntrlid).innerHTML = GetNewddloption(selval, stext, true);
            document.getElementById(cntrlid).disabled = true;
            if ($(shash + bsServertag + cntrlid) != null)
                $(shash + bsServertag + cntrlid).remove();
        }

        FlexTextBox.push(cntrlid + carat + selval + carat + cntrl);
        $(shash + cntrlid).addClass(disabled);
    }
    catch (exception) {
        var exp = exception;
    }
}

/* To get and set the Flex HTML on post back */
function GetPaxFlexhtml(Action) {

    if (Action != 'S') {

        for (var p = 0; p < FPaxcount; p++) {

            if (Action == 'G')
                PaxFlexHTML.push(document.getElementById(divFlexFields + p).innerHTML);
            else
                document.getElementById(divFlexFields + p).innerHTML = PaxFlexHTML[p];
            document.getElementById(divFlex + p).style.display = block;
        }
    }

    if (Action == 'S') {

        for (var p = 0; p < FlexTextBox.length; p++) {

            if (FlexTextBox[p].split(carat)[2] == T)
                document.getElementById(FlexTextBox[p].split(carat)[0]).value = FlexTextBox[p].split(carat)[1];
            else if (document.getElementById(bsServertag + FlexTextBox[p].split(carat)[0]) != null)
                document.getElementById(bsServertag + FlexTextBox[p].split(carat)[0]).style.display = block;
        }
    }
}

/* To validate date of date time picker text box */
function ValidateDate(event) {

    if (event.value == '')
        return;

    var date = event.value.split('/');

    if (!(date.length == 3 && date[0] < 32 && date[1] < 13 && date[2] < 2100 && date[2] > 1947)) {

        ShowError('Please enter valid date');
        document.getElementById(event.id).focus();
        event.value = '';
    }
}

/* To expand additional flex fields */
function ExpandAddAPI(paxindx, btnid) {

    try {

        var ancAPI = document.getElementById(btnid + paxindx);
        if (ancAPI.attributes["aria-expanded"].value == 'false')
            ancAPI.click();
    }
    catch (exception) {
    }
}

/* To Bind Flex fields for hotel room wise pax */
function BindRoomPaxFlex(data, configdata, flexdiv, Result, corptrvlreson, IsCorp) {

    try {

        divFlex = flexdiv; leadpax = 'A01';
        FlexInfo = JSON.parse(data); CorpTravelReason = corptrvlreson;
        Flexconfigs = IsEmpty(configdata) ? empty : configdata.split(pipe);

        for (var i = 0; i < (IsCorp ? 1 : Result.RoomGuest.length); i++) {

            var NoofAdult = IsCorp ? 1 : Result.RoomGuest[i].noOfAdults;
            var noofChlid = IsCorp ? 0 : Result.RoomGuest[i].noOfChild;

            for (var j = 1; j <= NoofAdult; j++) {

                GetFlexHTML(flexdiv + 'A' + i + j, 'A' + i + j);
                document.getElementById(flexdiv + 'A' + i + j).style.display = 'block';
            }

            for (var k = 1; k <= noofChlid; k++) {

                GetFlexHTML(flexdiv + 'C' + i + k, 'C' + i + k);
                document.getElementById(flexdiv + 'C' + i + k).style.display = 'block';
            }
        }

        $('select').select2();

        /* To enable date picker calender icon for flex fields */
        $(".EnableCal").datepicker({ dateFormat: 'dd/mm/yy' });
    }
    catch (exception) {
        var exp = exception;
    }
}

/* To validate flex information by room and pax type */
function ValRoomPaxFlex(Result, IsCorp) {

    focusoncntrl = true;

    DelErrorClass();

    try {

        for (var i = 0; i < (IsCorp ? 1 : Result.RoomGuest.length); i++) {

            var NoofAdult = IsCorp ? 1 : Result.RoomGuest[i].noOfAdults;
            var noofChlid = IsCorp ? 0 : Result.RoomGuest[i].noOfChild;

            for (var j = 1; j <= NoofAdult; j++) {

                ValPaxFlex('A' + i + j);
            }

            for (var k = 1; k <= noofChlid; k++) {

                ValPaxFlex('C' + i + k);
            }
        }

        return focusoncntrl;
    }
    catch (exception) {
        return true;
    }
}

/* To enable all flex fields irrespective of flexmaster enable flag */
function EnableFlexFields(p) {

    try {

        if (IsEmpty(FlexInfo))
            return;

        $.each(FlexInfo, function (key, col) {
                        
            EnableDisableField(div + p + Flex + key, (col.flexControl == L ? ddl : txt) + p + Flex + key, true);
        });
    }
    catch (exception) {
        
    }
}

/* To enable/disable flex input control and div */
function EnableDisableField(cntrldivid, inputcntrlid, Isenable) {

    try {

        if (document.getElementById(inputcntrlid) == null)
            return;

        if (Isenable) {
                        
            $(shash + inputcntrlid).removeAttr(disabled);
            if (document.getElementById(cntrldivid) != null)
                $(shash + cntrldivid).removeClass(disabled);
        }
        else {

            $(shash + inputcntrlid).attr(disabled, disabled);
            if (document.getElementById(cntrldivid) != null)
                $(shash + cntrldivid).addClass(disabled);
        }
    }
    catch (exception) {

    }    
}

/* To show/hide travel reason related flex fields */
function EnableTravelTrip(selval, p) {

    try {        

        if (IsEmpty(FlexInfo)) { return; }

        if (IsEmpty(selval) || selval == '--Select Reason--' || selval == '-1')
            selval = '0';

        CorpTravelReason = selval.split('~')[0];
        $.each(FlexInfo, function (key, col) {

            if (document.getElementById(div + p + Flex + key) == null)
                return;

            if (!IsEmpty(col.flexTravelReason)) 
                document.getElementById(div + p + Flex + key).style.display = CorpTravelReason == col.flexTravelReason ? 'block' : 'none';

            var IsBind = '';
            if (IsEmpty(col.flexTravelReason) && CorpTravelReason != '0' && !IsEmpty(Flexconfigs)) 
                IsBind = ValFlexConfigs(Flexconfigs, col.flexLabel, CorpTravelReason);                

            if (!IsEmpty(IsBind) && IsBind.split('|')[0] == 'true')
                document.getElementById(div + p + Flex + key).style.display = IsBind.split('|')[1] == 'true' ? 'block' : 'none';
        });
    }
    catch (exception) {

    }     
}

/* To validate travel reason with flex key value pair config */
function ValFlexConfigs(FlexConfigs, currflex, reason) {

    var IsFlexBind = 'true|true';

    try {

        if (IsEmpty(FlexConfigs))
            return IsFlexBind;

        var lables = '|'; var iBind = false;
        for (var r = 0; r < FlexConfigs.length; r++) {

            lables += FlexConfigs[r].split(',')[1].toUpperCase() + '|';
            if (reason == FlexConfigs[r].split(',')[0] && currflex.toUpperCase() == FlexConfigs[r].split(',')[1].toUpperCase())
                iBind = true;
        }

        IsFlexBind = lables.indexOf('|' + currflex.toUpperCase() + '|') == -1 ? 'false' : 'true';
        IsFlexBind += '|' + (iBind ? 'true' : 'false');
    }
    catch (exception) {
        
    }   
    return IsFlexBind;
}