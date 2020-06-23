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
$(".gstRow").hide();
$(".vatRow").hide();
$(document).ready(function () {

    var SessionToken = getCookie("Session_Token");
    var TransferID = getUrlParameter("TransferId");      
    $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "Bearer " + SessionToken);
        }, 
        url: apiUrl + '/api/transfer/transferVoucher',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({
            ItineraryId: TransferID,
            AgentInfo: {
                "AgentId": AgentId,
                "LoginUserId": UserId,
                "OnBelahfAgentLoc": BehalfLocation
            }  
        }),
        success: function (data) {            
            let passenggerInfo = data.Result.Itinerary.PassengerInfo.split("|");
            let ChildSeats = data.Result.Itinerary.ChildType.split("|");
            $("#vehicleName").text(data.Result.Itinerary.ItemName);
            $("#PaxName").text(passenggerInfo[0] + " " + passenggerInfo[1]);
            $("#LuggageCount").text(data.Result.Itinerary.Luggage);
            $("#ChiledSeat").text(parseInt(parseInt(ChildSeats[0]) + parseInt(ChildSeats[1])));
            $("#ReferenceID").text(data.Result.Itinerary.ConfirmationNo);
            $("#ReferenceID2").text(data.Result.Itinerary.ConfirmationNo);
            $("#AgentName").text(data.Result.AgentName);
            $("#AgentMobile").text(data.Result.AgentMobile);
            $("#Fare").text(parseFloat(parseFloat(data.Result.Itinerary.TransferDetails[0].ItemPrice.NetFare) + parseFloat(data.Result.Itinerary.TransferDetails[0].ItemPrice.Markup)).toFixed(data.Result.Itinerary.TransferDetails[0].ItemPrice.DecimalPoint) + " ");
            //$("#TaxandFee").text(parseFloat(data.Result.Itinerary.TransferDetails[0].ItemPrice.Markup).toFixed(data.Result.Itinerary.TransferDetails[0].ItemPrice.DecimalPoint) + " ");
            if (parseFloat(data.Result.Itinerary.TransferDetails[0].ItemPrice.Discount) > 0) {
                $("#Discount").text(parseFloat(data.Result.Itinerary.TransferDetails[0].ItemPrice.Discount).toFixed(data.Result.Itinerary.TransferDetails[0].ItemPrice.DecimalPoint) + " ");
            }
            else {
                $(".discountRow").css('display', 'none');
            }
            
            if (data.Result.Itinerary.TransferDetails[0].ItemPrice.GSTDetailList != null && data.Result.Itinerary.TransferDetails[0].ItemPrice.GSTDetailList.length > 0) {
                let totlGst = 0;
                $.each(data.Result.Itinerary.TransferDetails[0].ItemPrice.GSTDetailList, function (indx, itm) {
                    totlGst = parseFloat(parseFloat(totlGst) + parseFloat(itm.TaxAmount)).toFixed(data.Result.Itinerary.TransferDetails[0].ItemPrice.DecimalPoint);
                });
                $("#cgstAmt").text(parseFloat(totlGst).toFixed(data.Result.Itinerary.TransferDetails[0].ItemPrice.DecimalPoint));               
                $(".gstRow").show();
            }
            else {
                $(".vatRow").show();
                var TotalVat = parseFloat(parseFloat(data.Result.Itinerary.TransferDetails[0].ItemPrice.InputVATAmount) + parseFloat(data.Result.Itinerary.TransferDetails[0].ItemPrice.OutputVATAmount))
                $("#Vat").text(TotalVat.toFixed(data.Result.Itinerary.TransferDetails[0].ItemPrice.DecimalPoint) + " ");
            }            

            $("#GrandTotal").text(parseFloat(Math.ceil(parseFloat(parseFloat(data.Result.Itinerary.TransferDetails[0].ItemPrice.PublishedFare) + parseFloat(data.Result.Itinerary.TransferDetails[0].ItemPrice.Tax)).toFixed(data.Result.Itinerary.TransferDetails[0].ItemPrice.DecimalPoint))).toFixed(data.Result.Itinerary.TransferDetails[0].ItemPrice.DecimalPoint) + " ");
            $(".currency").text(data.Result.Itinerary.TransferDetails[0].Currency);
            $(".transferDate").text(new Date(data.Result.Itinerary.TransferDate).toDateString());
            $("#PickupTime").text(data.Result.Itinerary.PickUpTime);
            $("#Distance").text(parseFloat(data.Result.Itinerary.TransferDetails[0].Distance).toFixed(2) + " Km");
            $("#Traveltime").text(parseFloat(parseInt(data.Result.Itinerary.TransferDetails[0].TravelTime) / 60).toFixed(2) + " Hr");
            $("#FromLocation").text(data.Result.Itinerary.PickUpDescription);
            $("#ToLocation").text(data.Result.Itinerary.DropOffDescription);
            $("#BookedDate").text(new Date(data.Result.Itinerary.CreatedOn).toDateString());
            $("#terms").text(data.Result.termsAndCondition);
            $("#address").text(data.Result.address);
        },

        error: function (xhr, textStatus, errorThrown) {
            alert('Error in Operation');
        }
    });
    function showButtons() {
        document.getElementById('printPage').style.display = "inline";
    }
    function printPage() {
        document.getElementById('printPage').style.display = "none";
        window.print();
        //alert('2');
        setTimeout(showButtons(), 1000);
        // alert('3');
        return false;
    }
   
    $("#printPage").on('click', function () {
        printPage();
    });

    $("#ConfirmSend").on('click', function () {
        document.getElementById('printPage').style.display = "none";
        document.getElementById('sendEmailVoucher').style.display = "none";
        var templateContent = $("#voucherBody")[0].outerHTML;
        console.log(templateContent)
        $.ajax({           
            url:'TransferVoucher.aspx/SendVoucherMail',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({
                Content: templateContent,
                MailId: $("#emailIdTxt").val()
            }),
            success: function (data) {
                let jsonData = JSON.parse(data.d);                
                alert(jsonData.message);                
                $("#SendEmailModal").modal('hide');
                document.getElementById('printPage').style.display = "inline";
                document.getElementById('sendEmailVoucher').style.display = "inline";
            },

            error: function (xhr, textStatus, errorThrown) {
                alert('Error in Operation');
                $("#SendEmailModal").modal('hide');
                document.getElementById('printPage').style.display = "inline";
                document.getElementById('sendEmailVoucher').style.display = "inline";
            }
        });
    })

    $("#sendEmailVoucher").on('click', function () {
    
        $("#SendEmailModal").modal('show');
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
