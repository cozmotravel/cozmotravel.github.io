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
function allowNumerics(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
        return false;

    return true;
}
function allowAlphabets(evt) {  
    var regex = new RegExp("^[a-zA-Z ]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {        
        return false;
    }
    return true
}
var ExistingSearchData = JSON.parse(localStorage.getItem("transferSearch"));
$(document).ready(function () {
    if (ExistingSearchData.beHalfAgent != 0) {
        GetBehalfAgent(ExistingSearchData.beHalfAgent);
    }
    else {
        var agentCurrency = $("#ctl00_lblCurrency").text();
        var accountBalanace = $("#ctl00_lblAgentBalance").text();
        $("#accBalance").text(accountBalanace);
        $("#agentCurrencyText").text(agentCurrency);
    }  
    var TransactionType = "";
    $("#conformBooking").on('click', function () {  
        var SessionToken = getCookie("Session_Token");
        if (Validate()) {
            $('#ctl00_upProgress').show();
            var reqdata;           
            if (ExistingSearchData.beHalfAgent != 0) {
                reqdata = {
                    TransferItineraryReq: CreateItinerary(),
                    AgentInfo: {
                        "AgentId": ExistingSearchData.beHalfAgent,
                        "LoginUserId": UserId,
                        "OnBelahfAgentLoc": ExistingSearchData.AgentLocation
                    },
                    SessionId: localStorage.getItem("SessionId")
                };
            }
            else {
                reqdata = {
                    TransferItineraryReq: CreateItinerary(),
                    AgentInfo: {
                        "AgentId": AgentId,
                        "LoginUserId": UserId,
                        "OnBelahfAgentLoc": BehalfLocation
                    },
                    SessionId: localStorage.getItem("SessionId")
                };
            }
            
            $.ajax({
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', "Bearer " + SessionToken);
                },  
                url: apiUrl + '/api/transfer/bookTransfer',
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                data: JSON.stringify(reqdata),
                success: function (data) {
                    try {
                        localStorage.removeItem('transferSearch');
                        if (data.Result.hasOwnProperty("BookingData")) {
                            if (data.Result.BookingData.BookingId != "") {
                                window.location.href = "TransferConfirmation.aspx?TransId=" + data.Result.TransferId + "";
                            }
                            else {
                                window.location.href = "ErrorPage.aspx?Transfer booking failed.";
                            }
                        }
                        else {
                            window.location.href = "ErrorPage.aspx?Transfer booking failed.";
                        }
                    }
                    catch (error) {
                        window.location.href = "ErrorPage.aspx?Transfer booking failed.";
                    }
                    $('#ctl00_upProgress').hide();
                    
                },

                error: function (xhr, textStatus, errorThrown) {
                    $('#ctl00_upProgress').hide();
                    alert('Error in Operation');
                    window.location.href = "ErrorPage.aspx?Transfer booking failed.";
                }
            });
        }
    });
    if (MainAgentId != AgentId) {
        TransactionType = "B2B2B"
    }
    else {
        TransactionType="B2B"
    }
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
    var VehicleID = getUrlParameter("TransferId");
    function CreateItinerary() {
        if (ExistingSearchData.beHalfAgent != 0) {
            AgentId = ExistingSearchData.beHalfAgent;
        }
        let TransferRequest = JSON.parse(localStorage.getItem("transferSearch"));
        if (TransferRequest["beHalfAgent"] != 0) {
            AgentId = TransferRequest["beHalfAgent"];
        }
        let PassengerInfo = {
            PassengerFirstName: $("#PassFirstName").val(),
            PassengerLastName: $("#PassLastName").val(),
            PassengerMobile: $("#PassMobile").val(),
            PasengerEmail:"",
        }
        var TransferVehicle = [];
        
        TransferVehicle.push({
            Vehicle: TransferRequest.ItemName,
            VehicleCode: VehicleID,
            VehicleMaximumPassengers: TransferRequest.MaxSeats,
            VehicleMaximumLuggage: TransferRequest.MaxLuggage,
            ItemPrice: TransferRequest.PriceInfo,
            Currency: TransferRequest.PriceInfo.Currency,
            OccupiedPax: TransferRequest.NumberOfPassengers,
            CabinClass: TransferRequest.CabinClass,
            AnimalLuggage: TransferRequest.AnimalLuggage,
            SportLuggage: TransferRequest.SportsLuggage,
            ChildType: TransferRequest.ChildSeat1 + "|" + TransferRequest.ChildSeat2,
            Distance: TransferRequest.Distance,
            TravelTime: TransferRequest.TravelTime
        })
        var ItineraryObject={
            PickUpLatitude: TransferRequest.PickUpPoint.PickUpLatitude,
            PickUpLongitude: TransferRequest.PickUpPoint.PickUpLongitude,
            DropOffLatitude: TransferRequest.DropOffPoint.DropOffLatitude,
            DropOffLongitude: TransferRequest.DropOffPoint.DropOffLongitude,
            PassengerDetails: PassengerInfo,
            PickUpBuffer: TransferRequest.airport_pickup_buffer,
            ItemCode: VehicleID,
            AgentId: AgentId,
            Price: TransferRequest.PriceInfo,
            NumOfPax: TransferRequest.NumberOfPassengers,
            TransferTime: TransferRequest.PickUpTime,
            TransferDate: TransferRequest.TrasnferDate,
            SportLuggage: TransferRequest.SportsLuggage,
            AnimalLuggage: TransferRequest.AnimalLuggage,
            Luggage: TransferRequest.Luggage,
            Source: 2,
            ProductType: 9,
            PickUpTime: TransferRequest.PickUpTime,
            PassengerInfo: $("#PassFirstName").val() + "|" + $("#PassLastName").val() + "|" + $("#PassMobile").val(),
            PickUpType: 4,
            DropOffType: 4,
            IsDomestic: true,
            CityCode: "NA",
            ItemName: TransferRequest.ItemName,
            CancelId: "NA",
            CreatedBy: MainAgentId,
            LastModifiedBy: MainAgentId,
            PickUpCode: "NA",
            PickUpDescription: TransferRequest.PickUpPoint.PicUPPlace,
            PickUpRemarks: $("#MessageToDriver").val(),
            DropOffCode: "NA",
            DropOffCode: "NA",
            DropOffTime: "NA",
            DropOffDescription: TransferRequest.DropOffPoint.DropOffPlace,
            DropOffRemarks: $("#MessageToDriver").val(),
            CancellationPolicy: "NA",
            VoucherStatus: true,
            Language: "NA",
            ChildType: TransferRequest.ChildSeat1 + "|" + TransferRequest.ChildSeat2,
            TransferDetails: TransferVehicle,
            PaymentMode: 4,
            TransactionType: TransactionType
        }
       
        return ItineraryObject;

    }

    function Validate() {
        var isValid = true;
        if ($("#PassFirstName").val() == "") {           
            validateMessage($("#PassFirstName"), true, "Please enter first name");
            isValid = false;
        }
        if ($("#PassLastName").val() == "") {           
            validateMessage($("#PassLastName"), true, "Please enter last name");
            isValid = false;
        }
        if ($('#PassMobile').val() == "") {
            validateMessage($('#PassMobile'), true, "Please enter contact number");
            isValid = false;
        }
        if ($("#ChkConfirm").prop("checked") == false) {
            alert("Please accept conditions of transport, & Terms & Conditions")
            isValid = false;
        }
       
        return isValid;
    }
    function validateMessage(control, isError,message) {
        if ($(control).parent().find('label.error').length > 0) {
            if (isError) {
                $(control).parent().find('label.error').remove();
                $(control).addClass("error");
                $(control).parent().append('<label class="error" style="display:block;">' + message+'</label>');
            }
            else {
                $(control).parent().find('label.error').remove();
                $(control).removeClass("error");
            }
        }
        else {
            $(control).parent().append('<label class="error" style="display:block;">' + message +'</label>');
            $(control).addClass("error");
        }
    }

    function OnloadPage() {
        let TransferRequest = JSON.parse(localStorage.getItem("transferSearch"));
        var cabClass = TransferRequest.CabinClass.toLowerCase().replace(/\b[a-z]/g, function (letter) {
            return letter.toUpperCase();
        });
        $("#BookedClass").text(cabClass);
        $("#Type").text("Limosine");
        $("#VehicleName").text(TransferRequest.ItemName);
        $("#FromLocation").text(TransferRequest.PickUpPoint.PicUPPlace);
        $("#ToLocation").text(TransferRequest.DropOffPoint.DropOffPlace);
        $("#TransferDate").text(TransferRequest.TrasnferDate);
        $("#TransferTime").text(TransferRequest.TravelTime);
        $("#TotaDistance").text(TransferRequest.Distance+" Km");        
        $("#TotalPassenger").text(TransferRequest.NumberOfPassengers);
        $("#TotalLuggage").text(TransferRequest.Luggage);
        $("#AgentCurrenct").text(TransferRequest.PriceInfo.CurrencyCode);
        //$(".SellingPrice1").text(parseFloat(TransferRequest.SellingFare).toFixed(TransferRequest.PriceInfo.DecimalPoint));
        $(".SellingPrice2").text(parseFloat(parseFloat(TransferRequest.SellingFare) + parseFloat(TransferRequest.PriceInfo.Markup)).toFixed(TransferRequest.PriceInfo.DecimalPoint));
        //$('.Markup').text(parseFloat(TransferRequest.PriceInfo.Markup).toFixed(TransferRequest.PriceInfo.DecimalPoint));
        if (parseFloat(TransferRequest.PriceInfo.Discount) > 0) {
            $('.Discount').text(parseFloat(TransferRequest.PriceInfo.Discount).toFixed(TransferRequest.PriceInfo.DecimalPoint));
        }
        else {
            $(".disCountRow").hide();
        }
        
        $(".TotalIncludeMarkup").text(parseFloat(TransferRequest.TotalPrice).toFixed(TransferRequest.PriceInfo.DecimalPoint));
        
        if (TransferRequest.PriceInfo.GSTDetailList != null && TransferRequest.PriceInfo.GSTDetailList.length > 0) {
            let totlGst = 0;
            $.each(TransferRequest.PriceInfo.GSTDetailList, function (indx, itm) {                
                totlGst = parseFloat(parseFloat(totlGst) + parseFloat(itm.TaxAmount)).toFixed(TransferRequest.PriceInfo.DecimalPoint);
            })
            $(".cgstAmount").text(totlGst);
           // $(".sgstAmount").text(TransferRequest.PriceInfo.GSTDetailList[1].TaxAmount);
            $(".vatRow").hide();
        }
        else {
            $(".gstRow").hide();
            $(".TaxAmount").text(parseFloat(parseFloat(TransferRequest.PriceInfo.InputVATAmount) + parseFloat(TransferRequest.PriceInfo.OutputVATAmount)).toFixed(TransferRequest.PriceInfo.DecimalPoint))
        }

        $("#GrandTotal").text(parseFloat(TransferRequest.TotalPrice).toFixed(TransferRequest.PriceInfo.DecimalPoint));
        var cancelDate = new Date(TransferRequest.TrasnferDate);
        cancelDate.setDate(cancelDate.getDate() - 2);
        $("#lastCancelDate").text(cancelDate.toLocaleDateString())
    }
    OnloadPage();

    function GetBehalfAgent(agentId) {
        $.ajax({
            url: "TransferResults.aspx/OnBehalfAgentDetails",
            type: "POST",
            data: JSON.stringify({ agentId: agentId }),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (agentResponse) {
                $("#agentCurrencyText").text(agentResponse.d.AgentCurrency);
                $("#accBalance").text(agentResponse.d.CurrentBalance);                           
            }
        });
    } 
    
});
