var PicUpCityCountry;

function initAutocomplete() {

    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    var options = {
        // types: ['geocode']
    };
    autocompletePicUp = new google.maps.places.Autocomplete(
        document.getElementById('Picup'),
        options
    );
    autocompleteDropOff = new google.maps.places.Autocomplete(
        document.getElementById('Destination'),
        options
    );

    google.maps.event.addListener(autocompletePicUp, 'place_changed', function () {
        var place = autocompletePicUp.getPlace();
        PicUpCityCountry = GetCountry(place) + '|' + GetCityNamePOI(place).split('|')[0];
        $('#hdnPickUpLongtitude').val(place.geometry.location.lng());
        $('#hdnPickUplatitude').val(place.geometry.location.lat());

    });
    google.maps.event.addListener(autocompleteDropOff, 'place_changed', function () {
        var place = autocompleteDropOff.getPlace();
        var DropOffCityCountry = GetCountry(place) + '|' + GetCityNamePOI(place).split('|')[0];
        $('#hdnDropOffLatitude.ClientID').val(place.geometry.location.lat());
        $('#hdnDropOffLongtitude.ClientID').val(place.geometry.location.lng());
    });
}

function GetCountry(place) {

    var sCountry = '';
    if (place != null && place.address_components != null && place.address_components.length > 0) {
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

var ExistingSearchData = JSON.parse(localStorage.getItem("transferSearch"));
var AgentBalance = 0;

function Datereformat(dtStr) {
    var dtArobj = dtStr.split('-');
    return dtArobj[2] + '/' + dtArobj[1] + '/' + dtArobj[0];
}
$(document).ready(function () {
    if (ExistingSearchData.beHalfAgent != 0) {
        GetBehalfAgent(ExistingSearchData.beHalfAgent);
    }
    else {
        let agntAmt = $("#ctl00_lblAgentBalance").text();
        AgentBalance = parseFloat(agntAmt.replace(/,/g, ''));
        
    }
    $("#PickupDate").datepicker({
        setDate: new Date(ExistingSearchData["TrasnferDate"]),
        format: 'dd/mm/yyyy',
        startDate: '0d',
        autoclose: true
    });
    function InitialModifyControls() {
        $("#Picup").val(ExistingSearchData["PickUpPoint"]["PicUPPlace"]);
        $('#hdnPickUpLongtitude').val(ExistingSearchData["PickUpPoint"]["PickUpLongitude"]);
        $('#hdnPickUplatitude').val(ExistingSearchData["PickUpPoint"]["PickUpLatitude"]);

        $("#Destination").val(ExistingSearchData["DropOffPoint"]["DropOffPlace"]);
        $('#hdnDropOffLongtitude').val(ExistingSearchData["DropOffPoint"]["DropOffLongitude"]);
        $('#hdnDropOffLatitude').val(ExistingSearchData["DropOffPoint"]["DropOffLatitude"]);

        var DtReFormated = Datereformat(ExistingSearchData["TrasnferDate"])
        $("#PickupDate").val(DtReFormated);
        $("#PicUpTime").select2('val', ExistingSearchData["PickUpTime"]);
        $("#passengerCount").select2('val', ExistingSearchData["NumberOfPassengers"]);
        $("#Luggage").select2('val', ExistingSearchData["Luggage"]);
        $("#PetCount").select2('val', ExistingSearchData["AnimalLuggage"]);
        $("#SportsLuggage").select2('val', ExistingSearchData["SportLuggage"]);
        $("#childSeat1").val(ExistingSearchData["ChildSeat1"]);
        $("#childSeat2").val(ExistingSearchData["ChildSeat2"]);
        PicUpCityCountry = ExistingSearchData.NationalityCode;
    }
    InitialModifyControls();
    $(document).on('click', '.bookTransfer', function (e) {
        e.preventDefault();
        let TotalPrice = parseFloat($(this).parent().find('input[name="TotalFare"]').val());
        if (parseFloat(AgentBalance) >= parseFloat(TotalPrice)) {
            let existingSearch = JSON.parse(localStorage.getItem("transferSearch"));
            existingSearch["airport_pickup_buffer"] = $(this).parent().find('input[name="hdnBuffer"]').val();
            existingSearch["PriceInfo"] = JSON.parse($(this).parent().find('input[name="hdnPriceInfo"]').val());
            existingSearch["ItemName"] = $(this).parent().find('input[name="hdnItemName"]').val();
            existingSearch["VoucherStatus"] = $(this).parent().find('input[name="hdnVoucharStatus"]').val();
            existingSearch["MaxSeats"] = $(this).parent().find('input[name="hdnSeats"]').val();
            existingSearch["MaxLuggage"] = $(this).parent().find('input[name="hdnLuggage"]').val();
            existingSearch["CabinClass"] = $(this).parent().find('input[name="hdnCabinClass"]').val();
            existingSearch["TotalPrice"] = $(this).parent().find('input[name="TotalFare"]').val();
            existingSearch["SellingFare"] = $(this).parent().find('input[name="SellingFare"]').val();
            existingSearch["Distance"] = $(this).parent().find('input[name="hdnDistance"]').val();
            existingSearch["TravelTime"] = $(this).parent().find('input[name="hdnTravelTime"]').val();
            existingSearch["SupplierPrice"] = parseFloat(parseFloat(existingSearch["PriceInfo"]["SupplierPrice"]) * parseFloat(existingSearch["PriceInfo"]["RateOfExchange"])).toFixed(existingSearch["PriceInfo"]["DecimalPoint"]);
            localStorage.setItem("transferSearch", JSON.stringify(existingSearch));
            localStorage.setItem("SessionId", $("#ctl00_cphTransaction_hdnSessionId").val());
            window.location.href = "TransferPax.aspx?TransferId=" + $(this).attr("data-value") + "";
        }
        else {
            toastr.error("In sufficient agent balance");
        }


    });
    var SearchresultForSearch = [];
    var sliderMin = 0;
    var sliderMax = 0;
    var Slider = null;
    var maxValSlider = 0;
    var minValSlider = 0;

    function priceSlider() {
        var sliderMin = $('#fromrange').text();
        var sliderMax = $('#torange').text();
        maxValSlider = parseFloat($('#torange').text());
        minValSlider = parseFloat($('#fromrange').text());
        Slider = $("#htlPriceRangeSlider").slider({
            range: true,
            min: Number(sliderMin),
            max: Number(sliderMax),
            values: [sliderMin, sliderMax],
            slide: function (event, ui) {
                var fromRange = ui.values[0],
                    toRange = ui.values[1];
                $('#price-from-range').text(fromRange);
                $('#price-to-range').text(toRange);
            },
            change: function (event, ui) {
                let range = ui.values;
               
                SortDataUsingSlider(range)
                //if (Modify == false) {
                //    //AllSort();
                //}

            }

        });
        $('#price-from-range').text(sliderMin);
        $('#price-to-range').text(sliderMax);

    }

    function SortDataUsingSlider(range) {
        maxValSlider = parseFloat(range[1]);
        minValSlider = parseFloat(range[0]);
        if (SearchresultForSearch["Vehicles"].length > 0) {
            if ($("#txtSearchVehicle").val() != "") {
                let matching = [];
                $.grep(SearchresultForSearch["Vehicles"], function (elm, indx) {
                    var cabClass = elm.Category.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                        return letter.toUpperCase();
                    });
                    let checkedItems = $(".CarTypes:checked");
                    if (checkedItems.length > 0) {
                        $.each(checkedItems, function (ind, chechedItem) {
                            let checkedVal = $(chechedItem).val();
                            if (cabClass == checkedVal && elm.Vehicle.toLowerCase().indexOf($("#txtSearchVehicle").val().toLowerCase()) != -1) {
                                matching.push(elm);
                            }
                        });
                    }
                    else if (elm.Vehicle.toLowerCase().indexOf($("#txtSearchVehicle").val().toLowerCase()) != -1) {
                        matching.push(elm);
                    }
                });
                if (matching.length > 0) {
                    if ($("#sortbyPrice").val() == "1") {
                        matching = sortByKeyAsc(matching, "PublishedFare");
                    }
                    else {
                        matching = sortByKeyDesc(matching, "PublishedFare");
                    }
                    let matchingSorted = $.grep(matching, function (elm, indx) {
                        if (Math.ceil(parseFloat(elm.PriceInfo.PublishedFare)) >= parseFloat(range[0]) && Math.ceil(parseFloat(elm.PriceInfo.PublishedFare)) <= parseFloat(range[1])) {
                            return elm;
                        }
                    });
                    $("#Noresults").hide();
                    $("#list-group").children().remove();
                    $("#noOfResults").text(matching.length);
                    $.each(matchingSorted, function (ind, value) {
                        var cabClass = value.Category.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                            return letter.toUpperCase();
                        });
                        var WithOutDiscount = '';                        
                        if (parseFloat(value.PriceInfo.Discount) > 0) {
                            let withOutDiscAmt = parseFloat(Math.ceil(parseFloat(parseFloat(value.TotalPrice) + parseFloat(value.PriceInfo.Discount) - parseFloat(value.PriceInfo.Tax))));
                            WithOutDiscount = '<span class="price d-inline-block d-sm-block strikeout">\
                            <del style="display: block;"><em class="currency">'+ value.PriceInfo.Currency + ' </em> ' + withOutDiscAmt.toFixed(value.PriceInfo.DecimalPoint) + '</del>\
                                        </span>'
                        }
                        var contentHtml = '<li class="item" data-filter="">\
                        <div class="row no-gutters">\
                            <div class="col-3 col-sm image-wrapper">\
                                <img src="'+ value.ImageUrl + '" alt="Name" class=" h-100" id="" style="width:300px;">\
                                        </div>\
                                <div class="col-10 col-sm-7 col-md-5 pl-4 py-3 d-flex justify-content-between flex-column text-content-wrapper">\
                                    <h4>'+ cabClass + '</h4>\
                                    <div class="booking-class-descriptions small row">\
                                        <div class="col-6">\
                                            <h6 class="mt-3 mb-0 font-weight-bold text-uppercase">Car Deatails</h6>\
                                            <ul class="booking-class-description-vehicles">\
                                                <li class="booking-class-description-vehicle vehicle economy_mpv">'+ value.Vehicle + '</li>\
                                            </ul>\
                                        </div>\
                                        <div class="col-6">\
                                            <h6 class="mt-3 mb-0 font-weight-bold text-uppercase">Features</h6>\
                                            <ul class="booking-class booking-class-info">\
                                                <li>'+ value.BufferTime + ' minutes waiting time </li>\
                                                <li>Accounts for flight delays</li>\
                                                <li>Fixed price - no traffic charges</li>\
                                            </ul>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class="col-12 col-sm-3 d-flex justify-content-center align-items-center dotted-separator price-wrapper">\
                                    <div class="ui-list-price text-center">'+ WithOutDiscount + '\
                                        <span class="price d-inline-block d-sm-block " id=""><em class="currency">'+ value.PriceInfo.Currency + ' </em> ' + parseFloat((Math.ceil(parseFloat(value.PriceInfo.PublishedFare)))).toFixed(value.PriceInfo.DecimalPoint) + '</span>\
                                        <br>\
                                            <button class="btn btn-primary font-weight-bold mb-3 ml-3 mb-md-0 bookTransfer" data-value="'+ value.VehicleCode + '">Book Transfer</button>\
                                            <input type="hidden" value="'+ value.BufferTime + '" name="hdnBuffer"\>\
                                            <input type="hidden" id="priceInfo'+ ind + '" name="hdnPriceInfo"\>\
                                            <input type="hidden" name="hdnItemName" value="'+ value.Vehicle + '" \>\
                                            <input type="hidden" name="hdnVoucharStatus" value="'+ value.VoucherStatus + '"\>\
                                            <input type="hidden" name="hdnSeats" value="'+ value.Seats + '" \>\
                                            <input type="hidden" name="hdnLuggage" value="'+ value.Luggage + '"\>\
                                            <input type="hidden" name="hdnCabinClass" value="'+ value.Category + '"\>\
                                            <input type="hidden" name="hdnCabinClass" value="'+ value.Category + '"\>\
                                            <input type="hidden" name="SellingFare" value="'+ value.SellingFare + '"\>\
                                            <input type="hidden" name="TotalFare" value="'+ value.TotalPrice + '"\>\
                                            <input type="hidden" name="hdnDistance" value="'+ SearchresultForSearch.Distance + '"\>\
                                            <input type="hidden" name="hdnTravelTime" value="'+ SearchresultForSearch.ApproximateTransferTime + '"\>\
                                     </div>\
                                    </div>\
                                </div>\
                             </li>';
                        $("#list-group").append(contentHtml);
                        $("#priceInfo" + ind + "").val(JSON.stringify(value.PriceInfo));
                    });


                }
                else {
                    $("#noOfResults").text(matching.length);
                    $("#list-group").children().remove();
                    $("#Noresults").show();
                }
            }
            else {
                $("#Noresults").hide();
                $("#list-group").children().remove();
                if ($("#sortbyPrice").val() == "1") {
                    SearchresultForSearch["Vehicles"] = sortByKeyAsc(SearchresultForSearch["Vehicles"], "PublishedFare");
                }
                else {
                    SearchresultForSearch["Vehicles"] = sortByKeyDesc(SearchresultForSearch["Vehicles"], "PublishedFare")
                }
                $("#noOfResults").text(SearchresultForSearch["Vehicles"].length);
                let matchingSorted = $.grep(SearchresultForSearch["Vehicles"], function (elm, indx) {
                    if (Math.ceil(parseFloat(elm.PriceInfo.PublishedFare)) >= parseFloat(range[0]) && Math.ceil(parseFloat(elm.PriceInfo.PublishedFare)) <= parseFloat(range[1])) {
                        return elm;
                    }
                });
                $.each(matchingSorted, function (ind, value) {
                    var cabClass = value.Category.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                        return letter.toUpperCase();
                    });
                    var WithOutDiscount = '';
                    if (parseFloat(value.PriceInfo.Discount) > 0) {
                        let withOutDiscAmt = parseFloat(Math.ceil(parseFloat(parseFloat(value.TotalPrice) + parseFloat(value.PriceInfo.Discount) - parseFloat(value.PriceInfo.Tax))));
                        WithOutDiscount = '<span class="price d-inline-block d-sm-block strikeout">\
                            <del style="display: block;"><em class="currency">'+ value.PriceInfo.Currency + ' </em> ' + withOutDiscAmt.toFixed(value.PriceInfo.DecimalPoint) + '</del>\
                                        </span>'
                    }
                    var contentHtml = '<li class="item" data-filter="">\
                        <div class="row no-gutters">\
                            <div class="col-3 col-sm image-wrapper">\
                                <img src="'+ value.ImageUrl + '" alt="Name" class=" h-100" id="" style="width:300px;">\
                                        </div>\
                                <div class="col-10 col-sm-7 col-md-5 pl-4 py-3 d-flex justify-content-between flex-column text-content-wrapper">\
                                    <h4>'+ cabClass + '</h4>\
                                    <div class="booking-class-descriptions small row">\
                                        <div class="col-6">\
                                            <h6 class="mt-3 mb-0 font-weight-bold text-uppercase">Car Deatails</h6>\
                                            <ul class="booking-class-description-vehicles">\
                                                <li class="booking-class-description-vehicle vehicle economy_mpv">'+ value.Vehicle + '</li>\
                                            </ul>\
                                        </div>\
                                        <div class="col-6">\
                                            <h6 class="mt-3 mb-0 font-weight-bold text-uppercase">Features</h6>\
                                            <ul class="booking-class booking-class-info">\
                                                <li>'+ value.BufferTime + ' minutes waiting time </li>\
                                                <li>Accounts for flight delays</li>\
                                                <li>Fixed price - no traffic charges</li>\
                                            </ul>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class="col-12 col-sm-3 d-flex justify-content-center align-items-center dotted-separator price-wrapper">\
                                    <div class="ui-list-price text-center">'+ WithOutDiscount + '\
                                        <span class="price d-inline-block d-sm-block " id=""><em class="currency">'+ value.PriceInfo.Currency + ' </em> ' + parseFloat((Math.ceil(parseFloat(value.PriceInfo.PublishedFare)))).toFixed(value.PriceInfo.DecimalPoint) + '</span>\
                                        <br>\
                                            <button class="btn btn-primary font-weight-bold mb-3 ml-3 mb-md-0 bookTransfer" data-value="'+ value.VehicleCode + '">Book Transfer</button>\
                                            <input type="hidden" value="'+ value.BufferTime + '" name="hdnBuffer"\>\
                                            <input type="hidden" id="priceInfo'+ ind + '" name="hdnPriceInfo"\>\
                                            <input type="hidden" name="hdnItemName" value="'+ value.Vehicle + '" \>\
                                            <input type="hidden" name="hdnVoucharStatus" value="'+ value.VoucherStatus + '"\>\
                                            <input type="hidden" name="hdnSeats" value="'+ value.Seats + '" \>\
                                            <input type="hidden" name="hdnLuggage" value="'+ value.Luggage + '"\>\
                                            <input type="hidden" name="hdnCabinClass" value="'+ value.Category + '"\>\
                                            <input type="hidden" name="hdnCabinClass" value="'+ value.Category + '"\>\
                                            <input type="hidden" name="SellingFare" value="'+ value.SellingFare + '"\>\
                                            <input type="hidden" name="TotalFare" value="'+ value.TotalPrice + '"\>\
                                            <input type="hidden" name="hdnDistance" value="'+ SearchresultForSearch.Distance + '"\>\
                                            <input type="hidden" name="hdnTravelTime" value="'+ SearchresultForSearch.ApproximateTransferTime + '"\>\
                                     </div>\
                                    </div>\
                                </div>\
                             </li>';
                    $("#list-group").append(contentHtml);
                    $("#priceInfo" + ind + "").val(JSON.stringify(value.PriceInfo));
                });
            }

        }
    }

    function SearchTransfer() {
        var SessionToken = getCookie("Session_Token");
        $('#ctl00_upProgress').show();
        var data;
        if (ExistingSearchData.beHalfAgent != 0) {
            data = {
                TransferSearchReq: JSON.parse(localStorage.getItem("transferSearch")),
                AgentInfo: {
                    "AgentId": ExistingSearchData.beHalfAgent,
                    "LoginUserId": UserId,
                    "OnBelahfAgentLoc": ExistingSearchData.AgentLocation
                }
            };
        }
        else {
            data = {
                TransferSearchReq: JSON.parse(localStorage.getItem("transferSearch")),
                AgentInfo: {
                    "AgentId": AgentId,
                    "LoginUserId": UserId,
                    "OnBelahfAgentLoc": BehalfLocation
                }
            };
        }

        NProgress.start();
        $.ajax({
            url: apiUrl + '/api/transfer/searchTransfer',
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + SessionToken);
            },
            success: function (data) {
                if (data["Result"].length > 0) {
                    console.log(data["Result"][0].SessionId)
                    $("#ctl00_cphTransaction_hdnSessionId").val(data["Result"][0].SessionId);
                    if (data["Result"][0]["Vehicles"] != null && data["Result"][0]["Vehicles"].length>0) {
                        SearchresultForSearch = data["Result"][0];
                        $("#Noresults").hide();
                        $("#noOfResults").text(data["Result"][0]["Vehicles"].length);
                        $.each(sortByKeyAsc(data["Result"][0]["Vehicles"], "PublishedFare"), function (ind, value) {
                            var cabClass = value.Category.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                                return letter.toUpperCase();
                            });
                            var WithOutDiscount = '';

                            if (parseFloat(value.PriceInfo.Discount) > 0) {
                                let withOutDiscAmt = parseFloat(Math.ceil(parseFloat(parseFloat(value.TotalPrice) + parseFloat(value.PriceInfo.Discount) - parseFloat(value.PriceInfo.Tax))));
                                WithOutDiscount = '<span class="price d-inline-block d-sm-block strikeout">\
                            <del style="display: block;"><em class="currency">'+ value.PriceInfo.Currency + ' </em> ' + withOutDiscAmt.toFixed(value.PriceInfo.DecimalPoint) + '</del>\
                                        </span>'
                            }
                            var contentHtml = '<li class="item" data-filter="">\
                        <div class="row no-gutters">\
                            <div class="col-3 col-sm image-wrapper">\
                                <img src="'+ value.ImageUrl + '" alt="Name" class=" h-100" id="" style="width:300px;">\
                                        </div>\
                                <div class="col-10 col-sm-7 col-md-5 pl-4 py-3 d-flex justify-content-between flex-column text-content-wrapper">\
                                    <h4>'+ cabClass + '</h4>\
                                    <div class="booking-class-descriptions small row">\
                                        <div class="col-6">\
                                            <h6 class="mt-3 mb-0 font-weight-bold text-uppercase">Car Deatails</h6>\
                                            <ul class="booking-class-description-vehicles">\
                                                <li class="booking-class-description-vehicle vehicle economy_mpv">'+ value.Vehicle + '</li>\
                                            </ul>\
                                        </div>\
                                        <div class="col-6">\
                                            <h6 class="mt-3 mb-0 font-weight-bold text-uppercase">Features</h6>\
                                            <ul class="booking-class booking-class-info">\
                                                <li>'+ value.BufferTime + ' minutes waiting time </li>\
                                                <li>Accounts for flight delays</li>\
                                                <li>Fixed price - no traffic charges</li>\
                                            </ul>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class="col-12 col-sm-3 d-flex justify-content-center align-items-center dotted-separator price-wrapper">\
                                    <div class="ui-list-price text-center">'+ WithOutDiscount + '\
                                        <span class="price d-inline-block d-sm-block " id=""><em class="currency">'+ value.PriceInfo.Currency + ' </em> ' + parseFloat((Math.ceil(parseFloat(value.PriceInfo.PublishedFare)))).toFixed(value.PriceInfo.DecimalPoint) + '</span>\
                                        <br>\
                                            <button class="btn btn-primary font-weight-bold mb-3 ml-3 mb-md-0 bookTransfer" data-value="'+ value.VehicleCode + '">Book Transfer</button>\
                                            <input type="hidden" value="'+ value.BufferTime + '" name="hdnBuffer"\>\
                                            <input type="hidden" id="priceInfo'+ ind + '" name="hdnPriceInfo"\>\
                                            <input type="hidden" name="hdnItemName" value="'+ value.Vehicle + '" \>\
                                            <input type="hidden" name="hdnVoucharStatus" value="'+ value.VoucherStatus + '"\>\
                                            <input type="hidden" name="hdnSeats" value="'+ value.Seats + '" \>\
                                            <input type="hidden" name="hdnLuggage" value="'+ value.Luggage + '"\>\
                                            <input type="hidden" name="hdnCabinClass" value="'+ value.Category + '"\>\
                                            <input type="hidden" name="hdnCabinClass" value="'+ value.Category + '"\>\
                                            <input type="hidden" name="SellingFare" value="'+ value.SellingFare + '"\>\
                                            <input type="hidden" name="TotalFare" value="'+ value.TotalPrice + '"\>\
                                            <input type="hidden" name="hdnDistance" value="'+ data["Result"][0].Distance + '"\>\
                                            <input type="hidden" name="hdnTravelTime" value="'+ data["Result"][0].ApproximateTransferTime + '"\>\
                                     </div>\
                                    </div>\
                                </div>\
                             </li>';
                            $("#list-group").append(contentHtml);
                            $("#priceInfo" + ind + "").val(JSON.stringify(value.PriceInfo));
                        });
                        let sortedResponse = sortByKeyAsc(data["Result"][0]["Vehicles"], "PublishedFare");


                        $('#price-from-range').text(Math.ceil(parseFloat(data["Result"][0]["Vehicles"][0].PriceInfo.PublishedFare)));  //.toFixed(decimalvalue)

                        var last = sortedResponse[sortedResponse.length - 1];
                        $('#price-to-range').text(Math.ceil(last.PublishedFare));
                        $('#fromrange').text(Math.ceil(parseFloat(data["Result"][0]["Vehicles"][0].PriceInfo.PublishedFare)));
                        $('#torange').text(Math.ceil(last.PriceInfo.PublishedFare));

                        $('#fromrangeCurrency').text(data["Result"][0]["Vehicles"][0].PriceInfo.Currency);
                        $('#torangeCurrency').text(data["Result"][0]["Vehicles"][0].PriceInfo.Currency);
                        priceSlider();
                    }
                    else {
                        $("#noOfResults").text("0");
                        $("#Noresults").show();
                        SearchresultForSearch = [];
                    }
                }
                else {
                    $("#noOfResults").text("0");
                    $("#Noresults").show();
                    SearchresultForSearch = [];
                }
                $('#ctl00_upProgress').hide();
                $('#StaticView').children().css('display', 'none');
                NProgress.done();





            },
            error: function (xhr, textStatus, errorThrown) {
                alert('Error in Operation');
                NProgress.done();
                $("#Noresults").show();
                $("#noOfResults").text("0");
                $('#ctl00_upProgress').hide();
                $('#StaticView').children().css('display', 'none');
            },
            complete: function () {
                NProgress.done();
            },
        });


    }

    function sortByKeyDesc(array, key) {
        return array.sort(function (a, b) {
            
            var x = a.PriceInfo[key]; var y = b.PriceInfo[key];
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        });
    }

    function sortByKeyAsc(array, key) {
        return array.sort(function (a, b) {
            
            var x = a.PriceInfo[key]; var y = b.PriceInfo[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    function selectOrUnselectSupplier() {
        var isSelectAll = $("#chkSource0").prop('checked');
        if (isSelectAll) {
            $("#tblSources").find('input[type="checkbox"]').not('#chkSource0').prop('checked', true);
        }
        else {
            $("#tblSources").find('input[type="checkbox"]').not('#chkSource0').prop('checked', false);
        }
    }

    function setCheck(ctrl) {
        let totalCheckBox = $("#tblSources").find('input[type="checkbox"]').not('#chkSource0').length;
        let selectedCheckBox = $("#tblSources").find('input[type="checkbox"]:checked').not('#chkSource0').length;
        if (totalCheckBox == selectedCheckBox) {
            $('#chkSource0').prop('checked', true);
        }
        else {
            $('#chkSource0').prop('checked', false);
        }
    }

    function GetSources() {
        $.ajax({
            url: "TransferResults.aspx/TransferSources",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (agentResponse) {
                var responseObj = JSON.parse(agentResponse.d);
                if (responseObj.length > 0) {
                    $("#tblSources").append('<tr><td><input id="chkSource0" type="checkbox" name="chkSource0" onclick="selectOrUnselectSupplier();">\
                                                      <label for="chkSource0">All</label></td></tr>')
                    $.each(responseObj, function (ind, agentElm) {
                        $("#tblSources").append('<tr><td><input id="source' + parseInt(ind + 1) + '" class="sourceChk" type="checkbox" value="' + agentElm.Name + '" onclick="setCheck("source' + parseInt(ind + 1) + '"); />\
                                                        <label for="source' + parseInt(ind + 1) + '">' + agentElm.Name + '</label></td></tr>');
                    })

                }
                $.each(ExistingSearchData["Sources"], function (indx, selectedSource) {
                    $('input[type="checkbox"][value="' + selectedSource + '"]').prop('checked', true);
                });
                if ($(".sourceChk:checked").length == $(".sourceChk").length) {
                    $("#chkSource0").prop('checked', true);
                }
            }
        });
    }

    function GetBehalfAgent(agentId) {
        $.ajax({
            url: "TransferResults.aspx/OnBehalfAgentDetails",
            type: "POST",
            data: JSON.stringify({ agentId: agentId }),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (agentResponse) {
                $("#header #ctl00_Div1 div.text-right").append('<small>\
                    <span id = "ctl00_lblOBAgentBalance" class= "text-danger" >Cr.Balance: ' + agentResponse.d.AgentCurrency + ' ' + agentResponse.d.CurrentBalance + '</span >\
                    <span id="ctl00_lblOBUserName">Booking on behalf of ' + agentResponse.d.Name + '</span>\
                    <span id="ctl00_lblOBLocation">'+ agentResponse.d.City + '</span>\
                </small >');
                AgentBalance = agentResponse.d.CurrentBalance;
            }
        });
    }

    SearchTransfer();

    GetSources();

    $("#txtSearchVehicle").on('keyup', function () {
        if (SearchresultForSearch["Vehicles"].length > 0) {
            if ($("#txtSearchVehicle").val() != "") {
                let matching = [];
                $.grep(SearchresultForSearch["Vehicles"], function (elm, indx) {
                    var cabClass = elm.Category.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                        return letter.toUpperCase();
                    });
                    let checkedItems = $(".CarTypes:checked");
                    if (checkedItems.length > 0) {
                        $.each(checkedItems, function (ind, chechedItem) {
                            let checkedVal = $(chechedItem).val();
                            if (cabClass == checkedVal && elm.Vehicle.toLowerCase().indexOf($("#txtSearchVehicle").val().toLowerCase()) != -1) {
                                matching.push(elm);
                            }
                        });
                    }
                    else if (elm.Vehicle.toLowerCase().indexOf($("#txtSearchVehicle").val().toLowerCase()) != -1) {
                        matching.push(elm);
                    }
                });
                if (matching.length > 0) {
                    if ($("#sortbyPrice").val() == "1") {
                        matching = sortByKeyAsc(matching, "PublishedFare");
                    }
                    else {
                        matching = sortByKeyDesc(matching, "PublishedFare");
                    }
                    let matchingSorted = $.grep(matching, function (elm, indx) {
                        if (Math.ceil(parseFloat(elm.PriceInfo.PublishedFare)) >= parseFloat(minValSlider) && Math.ceil(parseFloat(elm.PriceInfo.PublishedFare)) <= parseFloat(maxValSlider)) {
                            return elm;
                        }
                    });
                    $("#Noresults").hide();
                    $("#list-group").children().remove();
                    $("#noOfResults").text(matching.length);
                    $.each(matchingSorted, function (ind, value) {
                        var cabClass = value.Category.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                            return letter.toUpperCase();
                        });
                        var WithOutDiscount = '';
                        if (parseFloat(value.PriceInfo.Discount) > 0) {
                            let withOutDiscAmt = parseFloat(Math.ceil(parseFloat(parseFloat(value.TotalPrice) + parseFloat(value.PriceInfo.Discount) - parseFloat(value.PriceInfo.Tax))));
                            WithOutDiscount = '<span class="price d-inline-block d-sm-block strikeout">\
                            <del style="display: block;"><em class="currency">'+ value.PriceInfo.Currency + ' </em> ' + withOutDiscAmt.toFixed(value.PriceInfo.DecimalPoint) + '</del>\
                                        </span>'
                        }
                        var contentHtml = '<li class="item" data-filter="">\
                        <div class="row no-gutters">\
                            <div class="col-3 col-sm image-wrapper">\
                                <img src="'+ value.ImageUrl + '" alt="Name" class=" h-100" id="" style="width:300px;">\
                                        </div>\
                                <div class="col-10 col-sm-7 col-md-5 pl-4 py-3 d-flex justify-content-between flex-column text-content-wrapper">\
                                    <h4>'+ cabClass + '</h4>\
                                    <div class="booking-class-descriptions small row">\
                                        <div class="col-6">\
                                            <h6 class="mt-3 mb-0 font-weight-bold text-uppercase">Car Deatails</h6>\
                                            <ul class="booking-class-description-vehicles">\
                                                <li class="booking-class-description-vehicle vehicle economy_mpv">'+ value.Vehicle + '</li>\
                                            </ul>\
                                        </div>\
                                        <div class="col-6">\
                                            <h6 class="mt-3 mb-0 font-weight-bold text-uppercase">Features</h6>\
                                            <ul class="booking-class booking-class-info">\
                                                <li>'+ value.BufferTime + ' minutes waiting time </li>\
                                                <li>Accounts for flight delays</li>\
                                                <li>Fixed price - no traffic charges</li>\
                                            </ul>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class="col-12 col-sm-3 d-flex justify-content-center align-items-center dotted-separator price-wrapper">\
                                    <div class="ui-list-price text-center">'+ WithOutDiscount + '\
                                        <span class="price d-inline-block d-sm-block " id=""><em class="currency">'+ value.PriceInfo.Currency + ' </em> ' + parseFloat((Math.ceil(parseFloat(value.PriceInfo.PublishedFare)))).toFixed(value.PriceInfo.DecimalPoint) + '</span>\
                                        <br>\
                                            <button class="btn btn-primary font-weight-bold mb-3 ml-3 mb-md-0 bookTransfer" data-value="'+ value.VehicleCode + '">Book Transfer</button>\
                                            <input type="hidden" value="'+ value.BufferTime + '" name="hdnBuffer"\>\
                                            <input type="hidden" id="priceInfo'+ ind + '" name="hdnPriceInfo"\>\
                                            <input type="hidden" name="hdnItemName" value="'+ value.Vehicle + '" \>\
                                            <input type="hidden" name="hdnVoucharStatus" value="'+ value.VoucherStatus + '"\>\
                                            <input type="hidden" name="hdnSeats" value="'+ value.Seats + '" \>\
                                            <input type="hidden" name="hdnLuggage" value="'+ value.Luggage + '"\>\
                                            <input type="hidden" name="hdnCabinClass" value="'+ value.Category + '"\>\
                                            <input type="hidden" name="hdnCabinClass" value="'+ value.Category + '"\>\
                                            <input type="hidden" name="SellingFare" value="'+ value.SellingFare + '"\>\
                                            <input type="hidden" name="TotalFare" value="'+ value.TotalPrice + '"\>\
                                            <input type="hidden" name="hdnDistance" value="'+ SearchresultForSearch.Distance + '"\>\
                                            <input type="hidden" name="hdnTravelTime" value="'+ SearchresultForSearch.ApproximateTransferTime + '"\>\
                                     </div>\
                                    </div>\
                                </div>\
                             </li>';
                        $("#list-group").append(contentHtml);
                        $("#priceInfo" + ind + "").val(JSON.stringify(value.PriceInfo));
                    });

                }
                else {
                    $("#noOfResults").text(matching.length);
                    $("#list-group").children().remove();
                    $("#Noresults").show();
                }
            }
            else {
                $("#Noresults").hide();
                $("#list-group").children().remove();
                if ($("#sortbyPrice").val() == "1") {
                    SearchresultForSearch["Vehicles"] = sortByKeyAsc(SearchresultForSearch["Vehicles"], "PublishedFare");
                }
                else {
                    SearchresultForSearch["Vehicles"] = sortByKeyDesc(SearchresultForSearch["Vehicles"], "PublishedFare")
                }
                $("#noOfResults").text(SearchresultForSearch["Vehicles"].length);
                let matchingSorted = $.grep(SearchresultForSearch["Vehicles"], function (elm, indx) {
                    if (Math.ceil(parseFloat(elm.PriceInfo.PublishedFare)) >= parseFloat(minValSlider) && Math.ceil(parseFloat(elm.PriceInfo.PublishedFare)) <= parseFloat(maxValSlider)) {
                        return elm;
                    }
                });
                $.each(matchingSorted, function (ind, value) {
                    var cabClass = value.Category.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                        return letter.toUpperCase();
                    });
                    var WithOutDiscount = '';
                    if (parseFloat(value.PriceInfo.Discount) > 0) {
                        let withOutDiscAmt = parseFloat(Math.ceil(parseFloat(parseFloat(value.TotalPrice) + parseFloat(value.PriceInfo.Discount) - parseFloat(value.PriceInfo.Tax))));
                        WithOutDiscount = '<span class="price d-inline-block d-sm-block strikeout">\
                            <del style="display: block;"><em class="currency">'+ value.PriceInfo.Currency + ' </em> ' + withOutDiscAmt.toFixed(value.PriceInfo.DecimalPoint) + '</del>\
                                        </span>'
                    }
                    var contentHtml = '<li class="item" data-filter="">\
                        <div class="row no-gutters">\
                            <div class="col-3 col-sm image-wrapper">\
                                <img src="'+ value.ImageUrl + '" alt="Name" class=" h-100" id="" style="width:300px;">\
                                        </div>\
                                <div class="col-10 col-sm-7 col-md-5 pl-4 py-3 d-flex justify-content-between flex-column text-content-wrapper">\
                                    <h4>'+ cabClass + '</h4>\
                                    <div class="booking-class-descriptions small row">\
                                        <div class="col-6">\
                                            <h6 class="mt-3 mb-0 font-weight-bold text-uppercase">Car Deatails</h6>\
                                            <ul class="booking-class-description-vehicles">\
                                                <li class="booking-class-description-vehicle vehicle economy_mpv">'+ value.Vehicle + '</li>\
                                            </ul>\
                                        </div>\
                                        <div class="col-6">\
                                            <h6 class="mt-3 mb-0 font-weight-bold text-uppercase">Features</h6>\
                                            <ul class="booking-class booking-class-info">\
                                                <li>'+ value.BufferTime + ' minutes waiting time </li>\
                                                <li>Accounts for flight delays</li>\
                                                <li>Fixed price - no traffic charges</li>\
                                            </ul>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class="col-12 col-sm-3 d-flex justify-content-center align-items-center dotted-separator price-wrapper">\
                                    <div class="ui-list-price text-center">'+ WithOutDiscount + '\
                                        <span class="price d-inline-block d-sm-block " id=""><em class="currency">'+ value.PriceInfo.Currency + ' </em> ' + parseFloat((Math.ceil(parseFloat(value.PriceInfo.PublishedFare)))).toFixed(value.PriceInfo.DecimalPoint) + '</span>\
                                        <br>\
                                            <button class="btn btn-primary font-weight-bold mb-3 ml-3 mb-md-0 bookTransfer" data-value="'+ value.VehicleCode + '">Book Transfer</button>\
                                            <input type="hidden" value="'+ value.BufferTime + '" name="hdnBuffer"\>\
                                            <input type="hidden" id="priceInfo'+ ind + '" name="hdnPriceInfo"\>\
                                            <input type="hidden" name="hdnItemName" value="'+ value.Vehicle + '" \>\
                                            <input type="hidden" name="hdnVoucharStatus" value="'+ value.VoucherStatus + '"\>\
                                            <input type="hidden" name="hdnSeats" value="'+ value.Seats + '" \>\
                                            <input type="hidden" name="hdnLuggage" value="'+ value.Luggage + '"\>\
                                            <input type="hidden" name="hdnCabinClass" value="'+ value.Category + '"\>\
                                            <input type="hidden" name="hdnCabinClass" value="'+ value.Category + '"\>\
                                            <input type="hidden" name="SellingFare" value="'+ value.SellingFare + '"\>\
                                            <input type="hidden" name="TotalFare" value="'+ value.TotalPrice + '"\>\
                                            <input type="hidden" name="hdnDistance" value="'+ SearchresultForSearch.Distance + '"\>\
                                            <input type="hidden" name="hdnTravelTime" value="'+ SearchresultForSearch.ApproximateTransferTime + '"\>\
                                     </div>\
                                    </div>\
                                </div>\
                             </li>';
                    $("#list-group").append(contentHtml);
                    $("#priceInfo" + ind + "").val(JSON.stringify(value.PriceInfo));
                });

            }

        }
    });

    $(".CarTypes").on('click', function () {
        if ($(this).val() == "All" && $(this).prop('checked')) {
            $(".CarTypes").prop('checked', true);
        }
        else if ($(this).val() == "All" && !$(this).prop('checked')) {
            $(".CarTypes").prop('checked', false);
        }
        else if ($(this).val() != "All") {
            let filterCheck = $(".CarTypes:checked").not(".checkAll");
            let allCheckBox = $(".CarTypes").not(".checkAll");
            if (filterCheck.length == allCheckBox.length) {
                $(".checkAll").prop('checked', true);
            }
            else {
                $(".checkAll").prop('checked', false);
            }
        }
        let checkedItems = $(".CarTypes:checked");
        let matchingClass = [];
        if (checkedItems.length > 0) {
            $.each(checkedItems, function (ind, chechedItem) {
                var checkedVal = $(chechedItem).val();
                $.grep(SearchresultForSearch["Vehicles"], function (elm, inxItem) {
                    var cabClass = elm.Category.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                        return letter.toUpperCase();
                    });
                    if ($("#txtSearchVehicle").val() != "") {
                        if (cabClass == checkedVal && elm.Vehicle.toLowerCase().indexOf($("#txtSearchVehicle").val().toLowerCase()) != -1) {
                            matchingClass.push(elm);
                        }
                    }
                    else {
                        if (cabClass == checkedVal) {
                            matchingClass.push(elm);
                        }
                    }

                });
            });
            if ($("#sortbyPrice").val() == "1") {
                matchingClass = sortByKeyAsc(matchingClass, "PublishedFare");
            }
            else {
                matchingClass = sortByKeyDesc(matchingClass, "PublishedFare")
            }
            if (matchingClass.length > 0) {
                $("#noOfResults").text(matchingClass.length);
                $("#Noresults").hide();
                $("#list-group").children().remove();
                let matchingSorted = $.grep(matchingClass, function (elm, indx) {
                    if (Math.ceil(parseFloat(elm.PriceInfo.PublishedFare)) >= parseFloat(minValSlider) && Math.ceil(parseFloat(elm.PriceInfo.PublishedFare)) <= parseFloat(maxValSlider)) {
                        return elm;
                    }
                });
                $.each(matchingSorted, function (ind, value) {
                    var cabClass = value.Category.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                        return letter.toUpperCase();
                    });
                    var WithOutDiscount = '';
                    if (parseFloat(value.PriceInfo.Discount) > 0) {
                        let withOutDiscAmt = parseFloat(Math.ceil(parseFloat(parseFloat(value.TotalPrice) + parseFloat(value.PriceInfo.Discount) - parseFloat(value.PriceInfo.Tax))));
                        WithOutDiscount = '<span class="price d-inline-block d-sm-block strikeout">\
                            <del style="display: block;"><em class="currency">'+ value.PriceInfo.Currency + ' </em> ' + withOutDiscAmt.toFixed(value.PriceInfo.DecimalPoint) + '</del>\
                                        </span>'
                    }
                    var contentHtml = '<li class="item" data-filter="">\
                        <div class="row no-gutters">\
                            <div class="col-3 col-sm image-wrapper">\
                                <img src="'+ value.ImageUrl + '" alt="Name" class=" h-100" id="" style="width:300px;">\
                                        </div>\
                                <div class="col-10 col-sm-7 col-md-5 pl-4 py-3 d-flex justify-content-between flex-column text-content-wrapper">\
                                    <h4>'+ cabClass + '</h4>\
                                    <div class="booking-class-descriptions small row">\
                                        <div class="col-6">\
                                            <h6 class="mt-3 mb-0 font-weight-bold text-uppercase">Car Deatails</h6>\
                                            <ul class="booking-class-description-vehicles">\
                                                <li class="booking-class-description-vehicle vehicle economy_mpv">'+ value.Vehicle + '</li>\
                                            </ul>\
                                        </div>\
                                        <div class="col-6">\
                                            <h6 class="mt-3 mb-0 font-weight-bold text-uppercase">Features</h6>\
                                            <ul class="booking-class booking-class-info">\
                                                <li>'+ value.BufferTime + ' minutes waiting time </li>\
                                                <li>Accounts for flight delays</li>\
                                                <li>Fixed price - no traffic charges</li>\
                                            </ul>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class="col-12 col-sm-3 d-flex justify-content-center align-items-center dotted-separator price-wrapper">\
                                    <div class="ui-list-price text-center">'+ WithOutDiscount + '\
                                        <span class="price d-inline-block d-sm-block " id=""><em class="currency">'+ value.PriceInfo.Currency + ' </em> ' + parseFloat((Math.ceil(parseFloat(value.PriceInfo.PublishedFare)))).toFixed(value.PriceInfo.DecimalPoint) + '</span>\
                                        <br>\
                                            <button class="btn btn-primary font-weight-bold mb-3 ml-3 mb-md-0 bookTransfer" data-value="'+ value.VehicleCode + '">Book Transfer</button>\
                                            <input type="hidden" value="'+ value.BufferTime + '" name="hdnBuffer"\>\
                                            <input type="hidden" id="priceInfo'+ ind + '" name="hdnPriceInfo"\>\
                                            <input type="hidden" name="hdnItemName" value="'+ value.Vehicle + '" \>\
                                            <input type="hidden" name="hdnVoucharStatus" value="'+ value.VoucherStatus + '"\>\
                                            <input type="hidden" name="hdnSeats" value="'+ value.Seats + '" \>\
                                            <input type="hidden" name="hdnLuggage" value="'+ value.Luggage + '"\>\
                                            <input type="hidden" name="hdnCabinClass" value="'+ value.Category + '"\>\
                                            <input type="hidden" name="hdnCabinClass" value="'+ value.Category + '"\>\
                                            <input type="hidden" name="SellingFare" value="'+ value.SellingFare + '"\>\
                                            <input type="hidden" name="TotalFare" value="'+ value.TotalPrice + '"\>\
                                            <input type="hidden" name="hdnDistance" value="'+ SearchresultForSearch.Distance + '"\>\
                                            <input type="hidden" name="hdnTravelTime" value="'+ SearchresultForSearch.ApproximateTransferTime + '"\>\
                                     </div>\
                                    </div>\
                                </div>\
                             </li>';
                    $("#list-group").append(contentHtml);
                    $("#priceInfo" + ind + "").val(JSON.stringify(value.PriceInfo));
                });


            }
            else {
                $("#noOfResults").text(matchingClass.length);
                $("#list-group").children().remove();
                $("#Noresults").show();
            }
        }
        else {
            $("#noOfResults").text(matchingClass.length);
            $("#list-group").children().remove();
            $("#Noresults").show();
        }
    });

    $("#sortbyPrice").on('change', function () {
        let checkedItems = $(".CarTypes:checked");
        let matchingClass = [];
        if (checkedItems.length > 0) {
            $.each(checkedItems, function (ind, chechedItem) {
                var checkedVal = $(chechedItem).val();
                $.grep(SearchresultForSearch["Vehicles"], function (elm, inxItem) {
                    var cabClass = elm.Category.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                        return letter.toUpperCase();
                    });
                    if ($("#txtSearchVehicle").val() != "") {
                        if (cabClass == checkedVal && elm.Vehicle.toLowerCase().indexOf($("#txtSearchVehicle").val().toLowerCase()) != -1) {
                            matchingClass.push(elm);
                        }
                    }
                    else {
                        if (cabClass == checkedVal) {
                            matchingClass.push(elm);
                        }
                    }

                });
            });
            if ($(this).val() == "1") {
                matchingClass = sortByKeyAsc(matchingClass, "PublishedFare");
            }
            else {
                matchingClass = sortByKeyDesc(matchingClass, "PublishedFare")
            }
            if (matchingClass.length > 0) {
                $("#Noresults").hide();
                $("#list-group").children().remove();
                let matchingSorted = $.grep(matchingClass, function (elm, indx) {
                    if (Math.ceil(parseFloat(elm.PriceInfo.PublishedFare)) >= parseFloat(minValSlider) && Math.ceil(parseFloat(elm.PriceInfo.PublishedFare)) <= parseFloat(maxValSlider)) {
                        return elm;
                    }
                });
                $.each(matchingSorted, function (ind, value) {
                    var cabClass = value.Category.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                        return letter.toUpperCase();
                    });
                    var WithOutDiscount = '';
                    if (parseFloat(value.PriceInfo.Discount) > 0) {
                        let withOutDiscAmt = parseFloat(Math.ceil(parseFloat(parseFloat(value.TotalPrice) + parseFloat(value.PriceInfo.Discount) - parseFloat(value.PriceInfo.Tax))));
                        WithOutDiscount = '<span class="price d-inline-block d-sm-block strikeout">\
                            <del style="display: block;"><em class="currency">'+ value.PriceInfo.Currency + ' </em> ' + withOutDiscAmt.toFixed(value.PriceInfo.DecimalPoint) + '</del>\
                                        </span>'
                    }
                    var contentHtml = '<li class="item" data-filter="">\
                        <div class="row no-gutters">\
                            <div class="col-3 col-sm image-wrapper">\
                                <img src="'+ value.ImageUrl + '" alt="Name" class=" h-100" id="" style="width:300px;">\
                                        </div>\
                                <div class="col-10 col-sm-7 col-md-5 pl-4 py-3 d-flex justify-content-between flex-column text-content-wrapper">\
                                    <h4>'+ cabClass + '</h4>\
                                    <div class="booking-class-descriptions small row">\
                                        <div class="col-6">\
                                            <h6 class="mt-3 mb-0 font-weight-bold text-uppercase">Car Deatails</h6>\
                                            <ul class="booking-class-description-vehicles">\
                                                <li class="booking-class-description-vehicle vehicle economy_mpv">'+ value.Vehicle + '</li>\
                                            </ul>\
                                        </div>\
                                        <div class="col-6">\
                                            <h6 class="mt-3 mb-0 font-weight-bold text-uppercase">Features</h6>\
                                            <ul class="booking-class booking-class-info">\
                                                <li>'+ value.BufferTime + ' minutes waiting time </li>\
                                                <li>Accounts for flight delays</li>\
                                                <li>Fixed price - no traffic charges</li>\
                                            </ul>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class="col-12 col-sm-3 d-flex justify-content-center align-items-center dotted-separator price-wrapper">\
                                    <div class="ui-list-price text-center">'+ WithOutDiscount + '\
                                        <span class="price d-inline-block d-sm-block " id=""><em class="currency">'+ value.PriceInfo.Currency + ' </em> ' + parseFloat((Math.ceil(parseFloat(value.PriceInfo.PublishedFare)))).toFixed(value.PriceInfo.DecimalPoint) + '</span>\
                                        <br>\
                                            <button class="btn btn-primary font-weight-bold mb-3 ml-3 mb-md-0 bookTransfer" data-value="'+ value.VehicleCode + '">Book Transfer</button>\
                                            <input type="hidden" value="'+ value.BufferTime + '" name="hdnBuffer"\>\
                                            <input type="hidden" id="priceInfo'+ ind + '" name="hdnPriceInfo"\>\
                                            <input type="hidden" name="hdnItemName" value="'+ value.Vehicle + '" \>\
                                            <input type="hidden" name="hdnVoucharStatus" value="'+ value.VoucherStatus + '"\>\
                                            <input type="hidden" name="hdnSeats" value="'+ value.Seats + '" \>\
                                            <input type="hidden" name="hdnLuggage" value="'+ value.Luggage + '"\>\
                                            <input type="hidden" name="hdnCabinClass" value="'+ value.Category + '"\>\
                                            <input type="hidden" name="hdnCabinClass" value="'+ value.Category + '"\>\
                                            <input type="hidden" name="SellingFare" value="'+ value.SellingFare + '"\>\
                                            <input type="hidden" name="TotalFare" value="'+ value.TotalPrice + '"\>\
                                            <input type="hidden" name="hdnDistance" value="'+ SearchresultForSearch.Distance + '"\>\
                                            <input type="hidden" name="hdnTravelTime" value="'+ SearchresultForSearch.ApproximateTransferTime + '"\>\
                                     </div>\
                                    </div>\
                                </div>\
                             </li>';
                    $("#list-group").append(contentHtml);
                    $("#priceInfo" + ind + "").val(JSON.stringify(value.PriceInfo));
                });

            }
            else {
                $("#list-group").children().remove();
                $("#Noresults").show();
            }
        }
        else {
            $("#txtSearchVehicle").trigger('keyup');
        }

    });

    function DateFormating(dtString) {
        var dateSplit = dtString.split('/');
        return dateSplit[2] + "-" + dateSplit[1] + "-" + dateSplit[0];

    }

    $("#btnModify").on('click', function (e) {

        e.preventDefault();
        if (Validate()) {  
            var PicUp = {
                PickUpLatitude: $('#hdnPickUplatitude').val(),
                PickUpLongitude: $('#hdnPickUpLongtitude').val(),
                PicUPPlace: $("#Picup").val()
            }
            var DropOff = {
                DropOffLatitude: $('#hdnDropOffLatitude').val(),
                DropOffLongitude: $('#hdnDropOffLongtitude').val(),
                DropOffPlace: $("#Destination").val()
            }

            let selectedSupplier = $("#tblSources").find('input[type="checkbox"]:checked').not('#chkSource0');
            let selectdSupplierValue = [];
            $.each(selectedSupplier, function (ind, value) {
                selectdSupplierValue.push($(value).val());
            });
            var childseat1 = 0;
            var childseat2 = 0;
            if ($("#childSeat1").val() != "" || $("#childSeat1").val() != null) {
                childseat1 = parseInt($("#childSeat1").val())
            }
            if ($("#childSeat2").val() != "" || $("#childSeat2").val() != null) {
                childseat2 = parseInt($("#childSeat2").val())
            }

            var data = {
                TrasnferDate: DateFormating($('#PickupDate').val()),
                PickUpTime: $('#PicUpTime').val(),
                NumberOfPassengers: $('#passengerCount').val(),
                AnimalLuggage: $('#PetCount').val(),
                Luggage: $('#Luggage').val(),
                SportLuggage: $('#SportsLuggage').val(),
                PickUpPoint: PicUp,
                DropOffPoint: DropOff,
                Sources: selectdSupplierValue,
                NationalityCode: PicUpCityCountry,
                ChildSeat1: childseat1,
                ChildSeat2: childseat2,
                VoucherCode: $("#VoucherCode").val()
            }
            if (ExistingSearchData.beHalfAgent != 0) {
                data["beHalfAgent"] = ExistingSearchData.beHalfAgent;
                data["AgentLocation"] = ExistingSearchData.AgentLocation;
            }
            else {
                data["beHalfAgent"] = 0;
                data["AgentLocation"] = 0;
            }
            localStorage.setItem("transferSearch", JSON.stringify(data));
            
            SearchTransfer();
        }

    });

    function Validate() {
        var isValid = true;
        if ($("#Picup").val() != "") {
            if ($('#hdnPickUplatitude').val() == "" || $('#hdnPickUplatitude').val() == "0") {
                validateMessage($("#Picup"), true);
                isValid = false;
            }
            if ($('#hdnPickUpLongtitude').val() == "" || $('#hdnPickUpLongtitude').val() == "0") {
                validateMessage($("#Picup"), true);
                isValid = false;
            }
            else {
                validateMessage($("#Picup"), false);

            }
        }
        else {
            validateMessage($("#Picup"), true);
            isValid = false;
        }
        if ($("#Destination").val() != "") {
            if ($('#hdnDropOffLatitude').val() == "" || $('#hdnDropOffLatitude').val() == "0") {
                validateMessage($("#Destination"), true);
                isValid = false;
            }
            if ($('#hdnDropOffLongtitude').val() == "" || $('#hdnDropOffLongtitude').val() == "0") {
                validateMessage($("#Destination"), true);
                isValid = false;
            }
            else {
                validateMessage($("#Picup"), false);

            }
        }
        else {
            validateMessage($("#Destination"), true);
            isValid = false;
        }

        if ($('#PickupDate').val() == "") {
            validateMessage($('#PickupDate'), true);
            isValid = false;
        }
        if ($('#PicUpTime').val() == "") {
            validateMessage($('#PicUpTime'), true);
            isValid = false;
        }
        if ($('#passengerCount').val() == "") {
            validateMessage($('#passengerCount'), true);
            isValid = false;
        }
        return isValid;
    }

    function validateMessage(control, isError) {
        if ($(control).parent().find('.error').length > 0) {
            if (isError) {
                $(control).parent().find('.error').remove();
                $(control).parent().append('<label class="error" style="display:block;">This field is required</label>');
            }
            else {
                $(control).parent().find('.error').remove();
            }
        }
        else {
            $(control).parent().append('<label class="error" style="display:block;">This field is required</label>');
        }
    }

    $("#ClearFilter").on('click', function () {
        $("#txtSearchVehicle").val("");
        $(".CarTypes").prop('checked', true);
        Slider.slider("destroy");
        let sortedResponse = sortByKeyAsc(SearchresultForSearch["Vehicles"], "PublishedFare");
        $('#price-from-range').text(Math.ceil(parseFloat(SearchresultForSearch["Vehicles"][0].PriceInfo.PublishedFare)));
        var last = sortedResponse[sortedResponse.length - 1];
        
        $('#price-to-range').text(Math.ceil(last.PriceInfo.PublishedFare));
        $('#fromrange').text(Math.ceil(parseFloat(SearchresultForSearch["Vehicles"][0].PriceInfo.PublishedFare)));
        $('#torange').text(Math.ceil(last.PriceInfo.PublishedFare));
        priceSlider();
        $("#sortbyPrice").select2('val', "1");
        $("#txtSearchVehicle").trigger('keyup');
    });

});
