$("#SearchResponse").hide();
function allowNumerics(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
        return false;

    return true;
}
$(document).ready(function () {
    $("#agentSelect").on('change', function () {
        GetB2BAgent($("#agentSelect").val());
        GetB2B2bAgent($("#agentSelect").val());
    });
    
    function OnPageLoad() {
        $('#ctl00_upProgress').show();
        GetAgent();
        GetSources();
        GetStatus();
        $("#fromDate").datepicker({
            setDate:new Date(),
            format: 'dd/mm/yyyy',
            endDate: '0d',
            autoclose: true
        }).on('changeDate', function (selected) {            
            var maxDate = new Date(selected.date.valueOf());
            $('#toDate').datepicker('setStartDate', maxDate);
        });
        $("#toDate").datepicker({
            setDate: new Date(),
            format: 'dd/mm/yyyy',
            endDate: '0d',
            autoclose: true
        }).on('changeDate', function (selected) {
            var maxDate = new Date(selected.date.valueOf());
            $('#fromDate').datepicker('setEndDate', maxDate);
        });
        var CurDate = new Date();
        let defaultDate = DateFormater(CurDate);
        $("#fromDate").val(defaultDate);
        $("#toDate").val(defaultDate);
        setTimeout(function () {
            $('#ctl00_upProgress').hide();
        },3000)
        
    }

    OnPageLoad();

    function GetAgent() {
        $.ajax({
            url: "TransferQueue.aspx/LoadAgents",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (agentResponse) {
                let agentData = JSON.parse(agentResponse.d)
                if (agentData.length > 0) {
                    $.each(agentData, function (agentIndex, agentValue) {
                        $("#agentSelect").append('<option value="' + agentValue.AGENT_ID + '">' + agentValue.AGENT_NAME + '</option>');
                    });
                    $("#agentSelect").select2('val', AgentId);
                    $("#agentSelect").trigger('change');
                }
            }
        });
    }

    function GetB2BAgent(agentID) {
        $.ajax({
            url: "TransferQueue.aspx/LoadB2BAgents",
            type: "POST",
            data: JSON.stringify({ agentId: agentID }),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (agentResponse) {
                let agentData = JSON.parse(agentResponse.d);
                $("#b2bAgentSelect").append('<option value="-1" selected>--Select B2B Agent--</option>')
                if (agentData.length > 0) {

                    $.each(agentData, function (agentIndex, agentValue) {
                        $("#b2bAgentSelect").append('<option value="' + agentValue.AGENT_ID + '">' + agentValue.AGENT_NAME + '</option>');
                    });
                }
                $("#b2bAgentSelect").select2('val', "-1");
            }
        });
    }

    function GetB2B2bAgent(agentID) {
        $.ajax({
            url: "TransferQueue.aspx/LoadB2B2BAgents",
            type: "POST",
            data: JSON.stringify({ agentId: agentID }),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (agentResponse) {
                let agentData = JSON.parse(agentResponse.d);
                $("#b2b2bAgentSelect").append('<option value="-1" selected>--Select B2B Agent--</option>')
                if (agentData.length > 0) {

                    $.each(agentData, function (agentIndex, agentValue) {
                        $("#b2b2bAgentSelect").append('<option value="' + agentValue.AGENT_ID + '">' + agentValue.AGENT_NAME + '</option>');
                    });
                }
                $("#b2b2bAgentSelect").select2('val', "-1");
            }
        });
    }

    function GetSources() {
        $.ajax({
            url: "TransferQueue.aspx/TransferSources",
            type: "POST",            
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (agentResponse) {
                var SourceObject = JSON.parse(agentResponse.d);
                $.each(SourceObject, function (sourceIndex, sourceValue) {
                    $("#sourceSelect").append('<option value="' + sourceValue.ItemValue + '">' + sourceValue.ItemName + '</option>');
                });
            }
        });
    }

    function GetStatus() {
        $.ajax({
            url: "TransferQueue.aspx/TransferStatus",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (agentResponse) {
                var SourceObject = JSON.parse(agentResponse.d);
                $.each(SourceObject, function (sourceIndex, sourceValue) {
                    $("#bookingStatus").append('<option value="' + sourceValue.ItemValue + '">' + sourceValue.ItemName + '</option>');
                });
            }
        });
    }

    $("#b2bAgentSelect").on('change', function () {
        if ($(this).val() != "-1") {
            $("#b2b2bAgentSelect").attr('disabled', false);
        }
        else {
            $("#b2b2bAgentSelect").attr('disabled', true);
            $("#b2b2bAgentSelect").select2('val', '-1');
        }
    });
    var defaultOpts = {
        visiblePages: 7        
    }
    var Pagination = $('#pagination').twbsPagination(defaultOpts).on('page', function (evt, page) {
        SearchDataCreation(page);
    });
    var PaginationHead = $('#paginationHead').twbsPagination(defaultOpts).on('page', function (evt, page) {
        SearchDataCreation(page);
    });

    $("#btnSearch").on('click', function () {
       SearchDataCreation(1)
       
    });

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function SearchDataCreation(pageNo) {
        var SessionToken = getCookie("Session_Token");
        var Status = [];
        var Sources = [];
        var AgentType = "B2BB2B2B";
        var isLcc = [];
        var AgentFilter = $("#agentSelect").val();
        if ($("#bookingStatus").val() == "-1") {
            let statusOptions = $("#bookingStatus option");
            $.each(statusOptions, function (ind, optval) {
                if ($(optval).val() != "-1") {
                    Status.push($(optval).val());
                }

            });
        }
        else {
            Status.push($("#bookingStatus").val());
        }
        if ($("#sourceSelect").val() == "-1") {
            let sourcesOptions = $("#sourceSelect option");
            
            $.each(sourcesOptions, function (ind, optval) {
                if ($(optval).val() != "-1") {
                    Sources.push($(optval).val());
                    isLcc.push($(optval).text());
                }
            });
        }
        else {
            Sources.push($("#sourceSelect").val());
            isLcc.push($("#sourceSelect option:selected").text())
        }
        if ($("#b2bAgentSelect").val() != "-1") {
            AgentFilter = $("#b2bAgentSelect").val();
            AgentType = "B2B";
        }
        if ($("#b2b2bAgentSelect").val() != "-1") {
            AgentFilter = $("#b2b2bAgentSelect").val();
            AgentType = "B2B2B";
        }
        var CurDate = new Date();
        var fromDate = DateFormaterSend(CurDate) + " 00:00";
        var toDate = DateFormaterSend(CurDate) + " 23:59";
        if ($("#fromDate").val() != "") {
            fromDate = $("#fromDate").val() + " 00:00";
        }
        if ($("#toDate").val()) {
            toDate = $("#toDate").val() + " 23:59";
        }
        var SearchData = {
            FromDate: fromDate,
            ToDate: toDate,
            BookingStatus: Status,
            TransferFilter: "",
            Source: Sources,
            agentFilter: AgentFilter,
            agentType: AgentType,
            paxFilter: $("#paxName").val().trim(),
            pnrFilter: $("#confirmationNo").val(),
            transType: "B2B",
            bookingModes: [1],
            Voucherd: "",
            transferName: "",
            isLcc: isLcc.join("|"),
            pageNo: pageNo
        }
        $('#ctl00_upProgress').show();
        NProgress.start();
        
        $.ajax({
            beforeSend: function (xhr, settings) {
                xhr.setRequestHeader('Authorization', "Bearer " + SessionToken);
            },
            url: apiUrl + '/api/transfer/transferQueue',
            type: 'POST',
            data: JSON.stringify({
                TransferQueueData: SearchData,
                AgentInfo: {
                    "AgentId": AgentId,
                    "LoginUserId": UserId,
                    "OnBelahfAgentLoc": BehalfLocation
                }
            }),              
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {                  
                if (data.Result.status) {
                    if (data.Result.data.length > 0) {
                        $("#SearchResponse").show();
                        $("#divSearchResult").children().remove();
                        $.each(data.Result.data, function (itemindx, itemvalue) {
                            var transferDate = DateFormater(new Date(itemvalue.TransferDate));                            
                            let paxData = itemvalue.passInfo.split('|');
                            var cancelString = "";
                            if (itemvalue.bookingStatus == 4) {
                                cancelString = '<div class="col-md-12 center"><strong> Request For Cancellation (' + itemvalue.data +') </strong>\
                                                            </div >\
                                                            <div class="clearfix"> </div>';
                            }
                            if (itemvalue.bookingStatus == 3) {
                                cancelString = '<div class="col-md-12 center"><strong> Request Cancelled (' + itemvalue.data +') </strong>\
                                                            </div >\
                                                            <div class="clearfix"> </div>';
                            }
                            else {
                                cancelString = '<div class="col-md-4" ><b>\
                                                                <select class="form-control select2 selectCancel" tabindex="-1" title="">\
                                                                    <option selected="selected" value="-1"> Select Option</option>\
                                                                    <option value="1">Cancel Booking</option>\
                                                                </select>\
                                                            </div >\
                                                            <div class="col-md-4">\
                                                                <textarea name="" rows="1" cols="20" class="form-control cancelRemark" placeholder="Enter Remarks here"></textarea>\
                                                            </div>\
                                                            <div class="col-md-4">\
                                                                <input type="button" data-id="'+ itemvalue.transferId + '" name="" value="Submit" class="button btn btn-sm btn-warning margin-right-5 pull-left cancelBooking">\
                                                            </div >\
                                                            <div class="clearfix"> </div>';
                            }
                            let InnerDivContent = '<div class="row">\
                                                     <div class="transferItem" style=" background: #fff; border: solid 1px #ccc; padding: 10px 0px 10px 0px;">\
                                                        <div class="col-md-12">\
                                                            <div class="col-md-4" > Agent :<strong>\
                                                                    <span >'+ itemvalue.AgentName + '</span></strong>\
                                                            </div >\
                                                            <div class="col-md-4"> Status : <b style="color: #009933">\
                                                                    <span>'+ itemvalue.Status + '</span>\
                                                                    </b>\
                                                            </div>\
                                                            <div class="col-md-4">Confirmation No : <b>\
                                                                '+ itemvalue.confirmationNo + '</b>\
                                                            </div >\
                                                            <div class="clearfix"> </div>\
                                                         </div >\
                                                         <div class="col-md-12 margin-top-10">\
                                                            <div class="col-md-4" >\
                                                                Supplier : <b style="color: #999999">\
                                                                    <span>'+ itemvalue.TransferSource + '</span></b>\
                                                            </div >\
                                                            <div class="col-md-4"> Last Cancellation Date : <b>\
                                                                '+ new Date(itemvalue.lastCancellationDate).toLocaleDateString() + '</b>\
                                                            </div>\
                                                            <div class="col-md-4"> Supplier Ref :<b>\
                                                                '+ itemvalue.TransferSource + '' + itemvalue.bookingRef + '\
                                                                </b>\
                                                            </div>\
                                                            <div class="clearfix"> </div>\
                                                        </div >\
                                                        <div class="col-md-12 margin-top-10">\
                                                            <div class="col-md-4" > Vehicle : <b>\
                                                                '+ itemvalue.VehicleName + '</b>\
                                                            </div >\
                                                            <div class="col-md-4"> No. Of Passengers : <b>\
                                                                '+ itemvalue.NumOfPax + '</b>\
                                                            </div>\
                                                            <div class="col-md-4"> Total Price : <b>\
                                                                  <span><span class="agntCurrency">'+ itemvalue.agent_currency + '</span> <span class="currencyAmt"> ' + itemvalue.TotalPrice + '</spn></span></b>\
                                                            </div>\
                                                            <div class="clearfix"> </div>\
                                                         </div >\
                                                         <div class="col-md-12 margin-top-10">\
                                                                <div class="col-md-4" > Booked On: <b>\
                                                                    '+ DateFormater(new Date(itemvalue.CREATEdOn)) + '</b>\
                                                                </div >\
                                                                <div class="col-md-4"> Passenger Name : <b>\
                                                                    <span>'+ paxData[0] + ' ' + paxData[1] + '</span></b>\
                                                                </div>\
                                                                <div class="col-md-4"> Pax Contact No : <b>\
                                                                    <span\>'+ paxData[2] + '</span></b>\
                                                                </div>\
                                                                <div class="clearfix"></div>\
                                                         </div>\
                                                         <div class="col-md-12 margin-top-10">\
                                                            <div class="col-md-4" >Transfer Date: <b>\
                                                                '+ transferDate + ' ' + itemvalue.TransferTime + '</b>\
                                                            </div >\
                                                            <div class="col-md-4">\
                                                                Boooked By: <span>Central Administrator</span>\
                                                            </div>\
                                                            <div class="col-md-4">\
                                                                <input type="button" name="" data-id="'+ itemvalue.transferId + '" data-confirm="' + itemvalue.confirmationNo + '"\
                                                                    data-agentId="'+ AgentFilter +'" value="View Invoice"  class="button btn btn-sm btn-success margin-right-5 pull-left viewInvoice">\
                                                                <input type="button" data-id="'+ itemvalue.transferId + '" name="" value="View Voucher"  class="button btn btn-sm btn-primary  viewVoucher">\
                                                            </div >\
                                                            <div class="clearfix"> </div>\
                                                        </div >\
                                                        <div class="col-md-12 margin-top-10 cancelDiv">\
                                                          '+ cancelString + '\
                                                        </div >\
                                                    </div >\
                                                </div > ';
                            $("#divSearchResult").append(InnerDivContent)
                        });
                        $('.selectCancel').select2();
                        Pagination.twbsPagination('destroy');
                        Pagination.twbsPagination($.extend({}, defaultOpts, {
                            totalPages: data.Result.noOfPages,
                            startPage: pageNo,
                        })).on('page', function (evt, page) {
                            SearchDataCreation(page);
                        });
                        PaginationHead.twbsPagination('destroy');
                        PaginationHead.twbsPagination($.extend({}, defaultOpts, {
                            totalPages: data.Result.noOfPages,
                            startPage: pageNo,
                        })).on('page', function (evt, page) {
                            SearchDataCreation(page);
                        });
                    }
                    else {
                        $("#SearchResponse").hide();
                    }
                }
                else {
                    $("#SearchResponse").hide();
                }
                NProgress.done();
                $('#ctl00_upProgress').hide();
            },
            error: function (xhr, textStatus, errorThrown) {
                alert('Error in Operation');                
                $('#ctl00_upProgress').hide();
                $("#SearchResponse").hide();
            },
        }); 
    }

    function DateFormater(date) {
        let datestr = new Date(date);
        let month = datestr.getMonth() + 1;
        let day = datestr.getDate();
        if (parseInt(month) < 10) {
            month = "0" + month;
        }
        if (parseInt(day) < 10) {
            day = "0" + day;
        }
        return day + "/" + month + "/" + datestr.getFullYear();
    }
    function DateFormaterSend(date) {
        let datestr = new Date(date);
        let month = datestr.getMonth() + 1;
        let day = datestr.getDate();
        if (parseInt(month) < 10) {
            month = "0" + month;
        }
        if (parseInt(day) < 10) {
            day = "0" + day;
        }
        return datestr.getFullYear() + "-" + month + "-" + day;
    }

    var CancelRequest;
    var CurrentDiv;
    $('body').on('click', '.viewVoucher', function () {
        window.open("TransferVoucher.aspx?TransferId=" + $(this).attr('data-id') + "");
    });
    var selectedAmt = 0;
    $('body').on('click', '.cancelBooking', function () {
        let submitCommand = $(this).parents('.transferItem:eq(0)').find('select.selectCancel').val();
        let transferId = $(this).attr('data-id');
        let remark = $(this).parents('.transferItem:eq(0)').find('textarea.cancelRemark').val();
        selectedAmt = parseFloat($(this).parents('.transferItem:eq(0)').find('span.currencyAmt').text());
        if (submitCommand != "-1") {
            CancelRequest = {
                Command: submitCommand,
                TransferId: parseInt(transferId),
                Remark: remark               
            }

            $("#RefundModal").modal('show');
            var currency = $(this).parents('.transferItem:eq(0)').find('span.agntCurrency').text();            
            $("#fortxtAdminFee").text("Admin Fee (In " + currency + ")");
            $("#fortxtSupplierFee").text("Supplier Fee (In " + currency + ")");
            $("#txtSupplierFee").val(0);
            $("#txtAdminFee").val(0);
            CurrentDiv = $(this).parents(".transferItem").eq(0);
        }
        else {
            alert("Please select option")
        }
                
        
    });
    $('body').on('click', '.viewInvoice', function () {
        var transId = $(this).attr('data-id');
        var agentId = $(this).attr('data-agentId');
        var consfirm = $(this).attr('data-confirm');
        window.open("CreateTransferInvoice.aspx?transId=" + transId + "&agent=" + agentId + "&confno=" + consfirm+"");
    })
    $("#ConfirmRefund").on('click', function () {
        var SessionToken = getCookie("Session_Token");
        CancelRequest["supplierFee"] = $("#txtSupplierFee").val();
        CancelRequest["adminFee"] = $("#txtAdminFee").val();
        $('#ctl00_upProgress').show();
        $.ajax({
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + SessionToken);
            },
            url: apiUrl + '/api/transfer/transferCancel',
            type: 'POST',
            data: JSON.stringify({
                Command: CancelRequest.Command,
                TransferId: CancelRequest.TransferId,
                Remark: CancelRequest.Remark,
                supplierFee: CancelRequest.supplierFee,
                adminFee: CancelRequest.adminFee,
                AgentInfo: {
                    "AgentId": AgentId,
                    "LoginUserId": UserId,
                    "OnBelahfAgentLoc": BehalfLocation
                }
            }),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (data.Result.status) {
                    $("#RefundModal").modal('hide');
                    toastr.options.closeButton = true;
                    toastr.success('("Transfer cancelled successfully');
                    setTimeout(function () {
                        toastr.clear();
                    }, 4000);
                    $(CurrentDiv).find('.cancelDiv').children().remove();
                    $(CurrentDiv).find('.cancelDiv').append("Request Cancelled (" + CancelRequest["Remark"] + ")");
                }
                else {
                    $("#RefundModal").modal('hide');
                    toastr.options.closeButton = true;
                    toastr.error('Transfer cancellation failed');
                    setTimeout(function () {
                        toastr.clear();
                    }, 4000);
                }
                $('#ctl00_upProgress').hide();
            },
            error: function (xhr, textStatus, errorThrown) {
                $("#RefundModal").modal('hide');
                toastr.options.closeButton = true;
                toastr.error('("Transfer cancellation failed');
                setTimeout(function () {
                    toastr.clear();
                }, 4000);
                $('#ctl00_upProgress').hide();
            },
        });
    });
    $("#txtSupplierFee").on('change', function () {
        var totalFee = parseFloat(parseFloat($("#txtSupplierFee").val()) + parseFloat($("#txtAdminFee").val()));
        if (totalFee > selectedAmt) {
            $("#txtSupplierFee").val(0);
        }
    });
    $("#txtAdminFee").on('change', function () {
        var totalFee = parseFloat(parseFloat($("#txtSupplierFee").val()) + parseFloat($("#txtAdminFee").val()));
        if (totalFee > selectedAmt) {
            $("#txtAdminFee").val(0);
        }
    });
   
});