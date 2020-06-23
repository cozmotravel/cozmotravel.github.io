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
$(".isgst").hide();
$(".isvat").hide();
$(document).ready(function () {
    var SessionToken = getCookie("Session_Token");
    document.getElementById('divProcess').style.display = "block";
    var TransferID = getUrlParameter("transId");
    var ReqAgentId = getUrlParameter("agent");
    var ConfirmNo = getUrlParameter("confno");
    $('#ctl00_upProgress').show();
    $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "Bearer " + SessionToken);
        },
        url: apiUrl + '/api/transfer/transferInvoice',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({
            TransferId: TransferID,
            ConfirmNo: ConfirmNo,
            AgentInfo: {
                AgentId: ReqAgentId,
                LoginUserId: UserId,
                OnBelahfAgentLoc: BehalfLocation
            }
        }),
        success: function (data) {            
            if (data.Result.status) {
                if ('InvoiceNumber' in data.Result.InvoiceData) {
                    var paxData = data.Result.Itinerary.PassengerInfo.split('|');
                    $("#invoiceNo").text(data.Result.AgentDetails.Telex);
                    $("#AgencyName").text(data.Result.AgentDetails.Name);
                    $("#AgenctCode").text(data.Result.AgentDetails.Code);
                    $("#AgencyAddress").text(data.Result.AgentDetails.Address);
                    $("#AgencyNo").text(data.Result.AgentDetails.Phone1);
                    $("#AgencyFax").text(data.Result.AgentDetails.Fax);
                    $("#TrnNo").text(data.Result.AgentDetails.Telex);
                    $("#InvoiceNo").text(data.Result.InvoiceData.InvoiceNumber);
                    $("#invoiceDate").text(new Date(data.Result.InvoiceData.CreatedOn).toDateString());
                    $("#ConfirmationNo").text(data.Result.Itinerary.ConfirmationNo);
                    $("#VoucherNo").text(data.Result.Itinerary.ConfirmationNo);
                    $("#AgenctTitle").text(data.Result.AgentDetails.Name);
                    $("#VoucherNo").text(data.Result.bookingID);  
                    $("#BookingDate").text(new Date(data.Result.Itinerary.CreatedOn).toDateString());
                    $("#TransferDate").text(new Date(data.Result.Itinerary.TransferDate).toDateString());
                    $("#NoofPassengers").text(data.Result.Itinerary.NumOfPax);
                    $("#VehicleName").text(data.Result.Itinerary.ItemName);
                    $("#PickUpPlace").text(data.Result.Itinerary.PickUpDescription);
                    $("#DropOffPlace").text(data.Result.Itinerary.DropOffDescription);
                    $("#PaxName").text(paxData[0] + " " + paxData[1]);
                    $(".currency").text(data.Result.Itinerary.TransferDetails[0].Currency);
                    $("#NetAmount").text(parseFloat(parseFloat(data.Result.Itinerary.TransferDetails[0].ItemPrice.NetFare) + parseFloat(data.Result.Itinerary.TransferDetails[0].ItemPrice.Markup)).toFixed(data.Result.Itinerary.TransferDetails[0].ItemPrice.DecimalPoint));
                    //$("#markUp").text(parseFloat(data.Result.Itinerary.TransferDetails[0].ItemPrice.Markup).toFixed(data.Result.Itinerary.TransferDetails[0].ItemPrice.DecimalPoint));
                    if (parseFloat(data.Result.Itinerary.TransferDetails[0].ItemPrice.Discount) > 0) {
                        $("#discount").text(parseFloat(data.Result.Itinerary.TransferDetails[0].ItemPrice.Discount).toFixed(data.Result.Itinerary.TransferDetails[0].ItemPrice.DecimalPoint));
                    }
                    else {
                        $(".discountRow").css('display', 'none');
                    }
                    
                    if (data.Result.Itinerary.TransferDetails[0].ItemPrice.GSTDetailList != null && data.Result.Itinerary.TransferDetails[0].ItemPrice.GSTDetailList.length > 0) {
                        let totlGst = 0;
                        $.each(data.Result.Itinerary.TransferDetails[0].ItemPrice.GSTDetailList, function (indx, itm) {
                            totlGst = parseFloat(parseFloat(totlGst) + parseFloat(itm.TaxAmount)).toFixed(data.Result.Itinerary.TransferDetails[0].ItemPrice.DecimalPoint);
                        });
                       
                        $("#cgstAmount").text(parseFloat(totlGst).toFixed(data.Result.Itinerary.TransferDetails[0].ItemPrice.DecimalPoint));
                        
                        $(".isgst").show();
                    }
                    else {
                        $(".isvat").show();
                        var TotalVat = parseFloat(parseFloat(data.Result.Itinerary.TransferDetails[0].ItemPrice.InputVATAmount) + parseFloat(data.Result.Itinerary.TransferDetails[0].ItemPrice.OutputVATAmount))
                        $("#OutputVatAmount").text(TotalVat.toFixed(data.Result.Itinerary.TransferDetails[0].ItemPrice.DecimalPoint) + " ");
                    }
                    $("#grossAmount").text(parseFloat(Math.ceil(parseFloat(data.Result.Itinerary.TransferDetails[0].ItemPrice.PublishedFare) + parseFloat(data.Result.Itinerary.TransferDetails[0].ItemPrice.Tax))).toFixed(data.Result.Itinerary.TransferDetails[0].ItemPrice.DecimalPoint));
                    $("#TotalAmount").text(parseFloat(Math.ceil(parseFloat(data.Result.Itinerary.TransferDetails[0].ItemPrice.PublishedFare) + parseFloat(data.Result.Itinerary.TransferDetails[0].ItemPrice.Tax))).toFixed(data.Result.Itinerary.TransferDetails[0].ItemPrice.DecimalPoint));
                    $("#InvoiceByAgent").text(data.Result.AgentDetails.Name);
                    $("#CreatedBy").text(data.Result.UserMasterData);
                }
            }
            document.getElementById('divProcess').style.display = "none";
            $('#loading').hide();
        }
    });
});
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};
function printPage() {

    document.getElementById('btnEmail').style.display = document.getElementById('btnPrint').style.display = "none";
    window.print();
    setTimeout('showButtons()', 1000);
}

/* To hide email and print buttons */
function showButtons() {

    document.getElementById('btnEmail').style.display = document.getElementById('btnPrint').style.display = "block";
}
