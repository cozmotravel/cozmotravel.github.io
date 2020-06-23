$(document).ready(function () {
    var TransferID = getUrlParameter("TransferId");
    var data = {
        ItineraryId: TransferID,
        AgentId: AgentId,
        UserId: UserId,
        BehalfLocation: BehalfLocation
    };   
    $.ajax({
        url: apiUrl + '/api/Transfer/VoucherGeneration',
        type: 'POST',
        ContentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: data,
        success: function (data) {
            
            let passenggerInfo = data.Itinerary.PassengerInfo.split("|");
            let ChildSeats = data.Itinerary.ChildType.split("|");
            $("#vehicleName").text(data.Itinerary.ItemName);
            $("#PaxName").text(passenggerInfo[0] + " " + passenggerInfo[1]);
            $("#LuggageCount").text(data.Itinerary.Luggage);
            $("#ChiledSeat").text(parseInt(parseInt(ChildSeats[0]) + parseInt(ChildSeats[1])));
            $("#ReferenceID").text(data.Itinerary.ConfirmationNo);
            $("#ReferenceID2").text(data.Itinerary.ConfirmationNo);
            $("#AgentName").text(data.AgentName);
            $("#AgentMobile").text(data.AgentMobile);
            $("#Fare").text(data.Itinerary.TransferDetails[0].ItemPrice.NetFare+" ");
            $("#TaxandFee").text(data.Itinerary.TransferDetails[0].ItemPrice.MarkupValue + " ");
            $("#Vat").text(data.Itinerary.TransferDetails[0].ItemPrice.K3Tax + " ");
            $("#GrandTotal").text(data.Itinerary.TransferDetails[0].ItemPrice.PublishedFare + " ");
            $(".currency").text(data.Itinerary.TransferDetails[0].Currency);
            $(".transferDate").text(new Date(data.Itinerary.TransferDate).toDateString());
            $("#PickupTime").text(data.Itinerary.PickUpTime);
            $("#Distance").text(parseFloat(data.Itinerary.TransferDetails[0].Distance).toFixed(2) + " Km");
            $("#Traveltime").text(parseFloat(parseInt(data.Itinerary.TransferDetails[0].TravelTime) / 60).toFixed(2) + " Hr");
            $("#FromLocation").text(data.Itinerary.PickUpDescription);
            $("#ToLocation").text(data.Itinerary.DropOffDescription);
            $("#BookedDate").text(new Date(data.Itinerary.CreatedOn).toDateString());
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
    })
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