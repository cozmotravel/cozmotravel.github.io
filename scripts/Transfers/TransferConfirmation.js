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
$(document).ready(function () {
    var SessionToken = getCookie("Session_Token");
    $('#ctl00_upProgress').show();
    var TransferID = getUrlParameter("TransId");    
    $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "Bearer " + SessionToken);
        },  
        url: apiUrl + '/api/transfer/transferConfirmation',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({
            TransferId: TransferID,
            AgentInfo: {
                "AgentId": AgentId,
                "LoginUserId": UserId,
                "OnBelahfAgentLoc": BehalfLocation
            }  
        }),
        success: function (data) {  
            if (data.Result.hasOwnProperty('ConfirmationNo')) {
                var passInfo = data.Result.PassengerInfo.split('|');
                var childPass = data.Result.ChildType.split('|');
                $("#ConfirmationNo").text(data.Result.ConfirmationNo)
                $("#TransferVehicle").text(data.Result.ItemName);
                $("#TransferRemark").text(data.Result.PickUpRemarks);
                $("#MobileNo").text(passInfo[2]);
                $("#NoOfPassengers").text(data.Result.NumOfPax);
                $("#bookedOn").text(new Date(data.Result.CreatedOn).toDateString());
                $("#pickUpDate").text(new Date(data.Result.TransferDate).toDateString())
                $("#tblVehicleDetails tbody").append('<tr><td>' + data.Result.ItemName + '</td>\
                                                          <td>Adult ('+ data.Result.NumOfPax + '), Child(' + parseInt(parseInt(childPass[0]) + parseInt(childPass[1])) + ')</td>\
                                                          <td>'+ data.Result.TransferDetails[0].Currency + ' ' + parseFloat(data.Result.TransferDetails[0].ItemPrice.PublishedFare).toFixed(data.Result.TransferDetails[0].ItemPrice.DecimalPoint) + '</td></tr>');
                $(".agentCurrency").text(data.Result.TransferDetails[0].Currency);
                $("#totalAmt").text(parseFloat(parseFloat(data.Result.TransferDetails[0].ItemPrice.NetFare) + parseFloat(data.Result.TransferDetails[0].ItemPrice.Markup)).toFixed(data.Result.TransferDetails[0].ItemPrice.DecimalPoint));
               // $("#actMarkup").text(parseFloat(data.Result.TransferDetails[0].ItemPrice.Markup).toFixed(data.Result.TransferDetails[0].ItemPrice.DecimalPoint));
                if (parseFloat(data.Result.TransferDetails[0].ItemPrice.Discount) > 0){
                    $("#actDiscountAmt").text(parseFloat(data.Result.TransferDetails[0].ItemPrice.Discount).toFixed(data.Result.TransferDetails[0].ItemPrice.DecimalPoint));
                }
                else {
                    $(".discountRow").hide();
                }
                
                //$("#totalMarkUp").text((parseFloat(data.Result.TransferDetails[0].ItemPrice.Markup) -parseFloat(data.Result.TransferDetails[0].ItemPrice.Discount)).toFixed(3));
                if (data.Result.TransferDetails[0].ItemPrice.GSTDetailList != null && data.Result.TransferDetails[0].ItemPrice.GSTDetailList.length > 0) {
                    let totlGst = 0;
                    $.each(data.Result.TransferDetails[0].ItemPrice.GSTDetailList, function (indx, itm) {
                        totlGst = parseFloat(parseFloat(totlGst) + parseFloat(itm.TaxAmount)).toFixed(data.Result.TransferDetails[0].ItemPrice.DecimalPoint);
                    })
                    $("#cgstAmount").text(parseFloat(totlGst).toFixed(data.Result.TransferDetails[0].ItemPrice.DecimalPoint));                   
                    $(".vatRow").hide();
                }
                else {
                    $(".gstRow").hide();
                    $("#vatAmt").text(parseFloat(parseFloat(data.Result.TransferDetails[0].ItemPrice.InputVATAmount) + parseFloat(data.Result.TransferDetails[0].ItemPrice.OutputVATAmount)).toFixed(data.Result.TransferDetails[0].ItemPrice.DecimalPoint));
                }

                $("#grandAmt").text(parseFloat(Math.ceil(parseFloat(parseFloat(data.Result.TransferDetails[0].ItemPrice.PublishedFare) + parseFloat(data.Result.TransferDetails[0].ItemPrice.Tax)).toFixed(data.Result.TransferDetails[0].ItemPrice.DecimalPoint))).toFixed(data.Result.TransferDetails[0].ItemPrice.DecimalPoint));
                $("#CancelDate").text(new Date(data.Result.LastCancellationDate).toDateString())
                $("#divViewVowcher").append('<button class="but but_b pull-right btn-xs-block ViewVoucher" data-id="' + TransferID + '"  type="button">View Voucher</button>')
            }
            else {
                alert("Error in operation")
            }
            $('#ctl00_upProgress').hide();
        },
        error: function () {
            alert("Error in operation")
        }
    });
    $('body').on('click','.ViewVoucher', function () {
        var transId = $(this).attr('data-id');        
        window.open("TransferVoucher.aspx?TransferId=" + transId + "");
    })
});
