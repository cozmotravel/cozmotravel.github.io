

function autoCompInitPrefAirline1() {
    if (!$('statescontainer5')) {
        return;
    }
    oACDSPA1 = new YAHOO.widget.DS_JSFunction(getAirlines);
    // Instantiate first auto complete
    oAutoCompPA1 = new YAHOO.widget.AutoComplete('txtPreferredAirline0', 'statescontainer5', oACDSPA1);
    oAutoCompPA1.prehighlightClassName = "yui-ac-prehighlight";
    oAutoCompPA1.queryDelay = 0;
    oAutoCompPA1.minQueryLength = 2;
    oAutoCompPA1.useIFrame = true;
    oAutoCompPA1.useShadow = true;

    oAutoCompPA1.formatResult = function(oResultItem, sQuery) {
        document.getElementById('statescontainer5').style.display = "block";
        var toShow = oResultItem[1].split(',');
        var sMarkup = toShow[0] + ',' + toShow[1]; ;
        //var aMarkup = ["<li>", sMarkup, "</li>"]; 
        var aMarkup = [sMarkup];
        return (aMarkup.join(""));
    };
    oAutoCompPA1.itemSelectEvent.subscribe(itemSelectHandlerPA1);

    oACDSPA2 = new YAHOO.widget.DS_JSFunction(getAirlines);
    // Instantiate second auto complete
    oAutoCompPA2 = new YAHOO.widget.AutoComplete('txtPreferredAirline1', 'statescontainer6', oACDSPA2);
    oAutoCompPA2.prehighlightClassName = "yui-ac-prehighlight";
    oAutoCompPA2.queryDelay = 0;
    oAutoCompPA2.minQueryLength = 2;
    oAutoCompPA2.useIFrame = true;
    oAutoCompPA2.useShadow = true;

    oAutoCompPA2.formatResult = function(oResultItem, sQuery) {
        document.getElementById('statescontainer6').style.display = "block";
        var toShow = oResultItem[1].split(',');
        var sMarkup = toShow[0] + ',' + toShow[1]; ;
        //var aMarkup = ["<li>", sMarkup, "</li>"]; 
        var aMarkup = [sMarkup];
        return (aMarkup.join(""));
    };
    oAutoCompPA2.itemSelectEvent.subscribe(itemSelectHandlerPA2);

    oACDSPA3 = new YAHOO.widget.DS_JSFunction(getAirlines);
    // Instantiate third auto complete
    oAutoCompPA3 = new YAHOO.widget.AutoComplete('txtPreferredAirline2', 'statescontainer7', oACDSPA3);
    oAutoCompPA3.prehighlightClassName = "yui-ac-prehighlight";
    oAutoCompPA3.queryDelay = 0;
    oAutoCompPA3.minQueryLength = 2;
    oAutoCompPA3.useIFrame = true;
    oAutoCompPA3.useShadow = true;

    oAutoCompPA3.formatResult = function(oResultItem, sQuery) {
        document.getElementById('statescontainer7').style.display = "block";
        var toShow = oResultItem[1].split(',');
        var sMarkup = toShow[0] + ',' + toShow[1]; ;
        //var aMarkup = ["<li>", sMarkup, "</li>"]; 
        var aMarkup = [sMarkup];
        return (aMarkup.join(""));
    };
    oAutoCompPA3.itemSelectEvent.subscribe(itemSelectHandlerPA3);
}
var itemSelectHandlerPA1 = function(sType2, aArgs2) {

    YAHOO.log(sType2); //this is a string representing the event; e.g., "itemSelectEvent"         
    var oMyAcInstance2 = aArgs2[2]; // your AutoComplete instance 
    var city = oMyAcInstance2[1].split(',');
    document.getElementById('ctl00_cphTransaction_airlineCode').value += "," + city[0];
    document.getElementById('ctl00_cphTransaction_airlineName').value += "," + city[1];
    document.getElementById('statescontainer5').style.display = "none";
    var elListItem2 = aArgs2[1]; //the <li> element selected in the suggestion container 
    var aData2 = aArgs2[2]; //array of the data for the item as returned by the DataSource 
};

var itemSelectHandlerPA2 = function(sType2, aArgs2) {
    YAHOO.log(sType2); //this is a string representing the event; e.g., "itemSelectEvent"         
    var oMyAcInstance2 = aArgs2[2]; // your AutoComplete instance 
    var city = oMyAcInstance2[1].split(',');
    document.getElementById('ctl00_cphTransaction_airlineCode').value += "," + city[0];
    document.getElementById('ctl00_cphTransaction_airlineName').value += "," + city[1];
    document.getElementById('statescontainer6').style.display = "none";
    var elListItem2 = aArgs2[1]; //the <li> element selected in the suggestion container 
    var aData2 = aArgs2[2]; //array of the data for the item as returned by the DataSource 
};
var itemSelectHandlerPA3 = function(sType2, aArgs2) {
    YAHOO.log(sType2); //this is a string representing the event; e.g., "itemSelectEvent"         
    var oMyAcInstance2 = aArgs2[2]; // your AutoComplete instance 
    var city = oMyAcInstance2[1].split(',');
    document.getElementById('ctl00_cphTransaction_airlineCode').value += "," + city[0];
    document.getElementById('ctl00_cphTransaction_airlineName').value += "," + city[1];
    document.getElementById('statescontainer7').style.display = "none";
    var elListItem2 = aArgs2[1]; //the <li> element selected in the suggestion container 
    var aData2 = aArgs2[2]; //array of the data for the item as returned by the DataSource
};
YAHOO.util.Event.addListener(this, 'load', autoCompInitPrefAirline1); //temporarily commented

var arrayStates = new Array();
function invokePage(url, passData) {
    if (window.XMLHttpRequest) {
        AJAX = new XMLHttpRequest();
    }
    else {
        AJAX = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (AJAX) {
        AJAX.open("POST", url, false);
        AJAX.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        AJAX.send(passData);
        return AJAX.responseText;
    }
    else {
        return false;
    }
}

function getAirlines(sQuery) {

    var paramList = 'searchKey=' + sQuery;
    paramList += '&requestSource=' + "PreferredAirline";
    var url = "CityAjax.aspx";
    var arrayStates = "";
    var faltoo = invokePage(url, paramList);
    arrayStates = faltoo.split('/');
    if (arrayStates[0] != "") {
        for (var i = 0; i < arrayStates.length; i++) {
            arrayStates[i] = [arrayStates[i].split(',')[1], arrayStates[i]];
        }

        return arrayStates;
    }
    else return (false);
}

