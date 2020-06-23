var mcall1;
var mcall2;
var mcall3;
var mcall4;
var mcall5;
var mcall6;
//-Flight Calender control
function init2() {
    var today = new Date();
    // Rendering Cal1
    mcall1 = new YAHOO.widget.CalendarGroup("call1", "mcontainer1");
    mcall1.cfg.setProperty("minDate", (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear());
    //mcall1.cfg.setProperty("title", "Select your desired departure date:");
    mcall1.cfg.setProperty("close", true);
    mcall1.selectEvent.subscribe(setMCFlightDate1);
    mcall1.render();
    // Rendering Cal2
    
    mcall2 = new YAHOO.widget.CalendarGroup("call2", "mcontainer2");
    mcall2.cfg.setProperty("minDate", (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear());
    //mcall2.cfg.setProperty("title", "Select your desired departure date:");
    mcall2.selectEvent.subscribe(setMCFlightDate2);
    mcall2.cfg.setProperty("close", true);
    mcall2.render();
    // Rendering Cal3
    
    mcall3 = new YAHOO.widget.CalendarGroup("call3", "mcontainer3");
    mcall3.cfg.setProperty("minDate", (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear());
    //mcall3.cfg.setProperty("title", "Select your desired departure date:");
    mcall3.cfg.setProperty("close", true);
    mcall3.selectEvent.subscribe(setMCFlightDate3);
    mcall3.render();
    // Rendering Cal4
    
    mcall4 = new YAHOO.widget.CalendarGroup("call4", "mcontainer4");
    mcall4.cfg.setProperty("minDate", (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear());
    //mcall4.cfg.setProperty("title", "Select your desired departure date:");
    mcall4.selectEvent.subscribe(setMCFlightDate4);
    mcall4.cfg.setProperty("close", true);
    mcall4.render();
    // Rendering Cal5
    
    mcall5 = new YAHOO.widget.CalendarGroup("call5", "mcontainer5");
    mcall5.cfg.setProperty("minDate", (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear());
    //mcall5.cfg.setProperty("title", "Select your desired departure date:");
    mcall5.cfg.setProperty("close", true);
    mcall5.selectEvent.subscribe(setMCFlightDate5);
    mcall5.render();
    // Rendering Cal6
    
    mcall6 = new YAHOO.widget.CalendarGroup("call6", "mcontainer6");
    mcall6.cfg.setProperty("minDate", (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear());
    //mcall6.cfg.setProperty("title", "Select your desired departure date:");
    mcall6.selectEvent.subscribe(setMCFlightDate6);
    mcall6.cfg.setProperty("close", true);
    mcall6.render();
}

function showMultiCityCal1() {
    document.getElementById('mcontainer1').style.display = "block";
    document.getElementById('mcontainer2').style.display = "none";
    document.getElementById('mcontainer3').style.display = "none";
    document.getElementById('mcontainer4').style.display = "none";
    document.getElementById('mcontainer5').style.display = "none";
    document.getElementById('mcontainer6').style.display = "none";
}

function showMultiCityCal2() {
    document.getElementById('mcontainer1').style.display = "none";
    document.getElementById('mcontainer2').style.display = "block";
    document.getElementById('mcontainer3').style.display = "none";
    document.getElementById('mcontainer4').style.display = "none";
    document.getElementById('mcontainer5').style.display = "none";
    document.getElementById('mcontainer6').style.display = "none";
}

function showMultiCityCal3() {
    document.getElementById('mcontainer1').style.display = "none";
    document.getElementById('mcontainer2').style.display = "none";
    document.getElementById('mcontainer3').style.display = "block";
    document.getElementById('mcontainer4').style.display = "none";
    document.getElementById('mcontainer5').style.display = "none";
    document.getElementById('mcontainer6').style.display = "none";
}

function showMultiCityCal4() {
    document.getElementById('mcontainer1').style.display = "none";
    document.getElementById('mcontainer2').style.display = "none";
    document.getElementById('mcontainer3').style.display = "none";
    document.getElementById('mcontainer4').style.display = "block";
    document.getElementById('mcontainer5').style.display = "none";
    document.getElementById('mcontainer6').style.display = "none";
}

function showMultiCityCal5() {
    document.getElementById('mcontainer1').style.display = "none";
    document.getElementById('mcontainer2').style.display = "none";
    document.getElementById('mcontainer3').style.display = "none";
    document.getElementById('mcontainer4').style.display = "none";
    document.getElementById('mcontainer5').style.display = "block";
    document.getElementById('mcontainer6').style.display = "none";
}

function showMultiCityCal6() {
    document.getElementById('mcontainer1').style.display = "none";
    document.getElementById('mcontainer2').style.display = "none";
    document.getElementById('mcontainer3').style.display = "none";
    document.getElementById('mcontainer4').style.display = "none";
    document.getElementById('mcontainer5').style.display = "none";
    document.getElementById('mcontainer6').style.display = "block";
}



function setMCFlightDate1() {
    var date1 = mcall1.getSelectedDates()[0];
    this.today = new Date();
    var thisMonth = this.today.getMonth();
    var thisDay = this.today.getDate();
    var thisYear = this.today.getFullYear();
    var todaydate = new Date(thisYear, thisMonth, thisDay);
    var depdate = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    var difference = (depdate.getTime() - todaydate.getTime());
    if (difference < 0) {
        document.getElementById('errMess').style.display = "block";
        document.getElementById('errorMessage').innerHTML = "Date selected should be greater than or equal to today's date ";
        return false;
    }
    document.getElementById('errMess').style.display = "none";
    document.getElementById('errorMessage').innerHTML = "";

    var month = date1.getMonth() + 1;
    var day = date1.getDate();

    if (month.toString().length == 1) {
        month = "0" + month;
    }
    if (day.toString().length == 1) {
        day = "0" + day;
    }
    document.getElementById('ctl00_cphTransaction_Time1').value = day + "/" + (month) + "/" + date1.getFullYear();
    mcall1.hide();
}

function setMCFlightDate2() {
    var date1 = mcall2.getSelectedDates()[0];
    var date2 = mcall1.getSelectedDates()[0];
    this.today = new Date();
    var thisMonth = this.today.getMonth();
    var thisDay = this.today.getDate();
    var thisYear = this.today.getFullYear();
    var todaydate = new Date(thisYear, thisMonth, thisDay);
    var depdate = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    var prevdate = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    var difference = (depdate.getTime() - todaydate.getTime());
    if (difference < 0) {
        document.getElementById('errMess').style.display = "block";
        document.getElementById('errorMessage').innerHTML = "Date selected should be greater than or equal to today's date ";
        return false;
    } else {
    document.getElementById('errMess').style.display = "none";
        document.getElementById('errorMessage').innerHTML = "";
    }

    var datediff = (depdate.getTime() - prevdate.getTime());

    if (datediff < 0) {
        document.getElementById('errMess').style.display = "block";
        document.getElementById('errorMessage').innerHTML = "Date selected should be greater than or equal to previous date ";
        return false;
    }
    else {
        document.getElementById('errMess').style.display = "none";
        document.getElementById('errorMessage').innerHTML = "";
    }

    var month = date1.getMonth() + 1;
    var day = date1.getDate();

    if (month.toString().length == 1) {
        month = "0" + month;
    }
    if (day.toString().length == 1) {
        day = "0" + day;
    }
    document.getElementById('ctl00_cphTransaction_Time2').value = day + "/" + (month) + "/" + date1.getFullYear();
    mcall2.hide();
}

function setMCFlightDate3() {
    var date1 = mcall3.getSelectedDates()[0];
    var date2 = mcall2.getSelectedDates()[0];
    this.today = new Date();
    var thisMonth = this.today.getMonth();
    var thisDay = this.today.getDate();
    var thisYear = this.today.getFullYear();
    var todaydate = new Date(thisYear, thisMonth, thisDay);
    var depdate = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    var prevdate = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    var difference = (depdate.getTime() - todaydate.getTime());
    if (difference < 0) {
        document.getElementById('errorMessage').style.display = "block";
        document.getElementById('errorMessage').innerHTML = "Date selected should be greater than or equal to today's date ";
        return false;
    } else {
        document.getElementById('errorMessage').style.display = "none";
        document.getElementById('errorMessage').innerHTML = "";
    }

    var datediff = (depdate.getTime() - prevdate.getTime());

    if (datediff < 0) {
        document.getElementById('errMess').style.display = "block";
        document.getElementById('errorMessage').innerHTML = "Date selected should be greater than or equal to previous date ";
        return false;
    }
    else {
        document.getElementById('errMess').style.display = "none";
        document.getElementById('errorMessage').innerHTML = "";
    }

    var month = date1.getMonth() + 1;
    var day = date1.getDate();

    if (month.toString().length == 1) {
        month = "0" + month;
    }
    if (day.toString().length == 1) {
        day = "0" + day;
    }
    document.getElementById('ctl00_cphTransaction_Time3').value = day + "/" + (month) + "/" + date1.getFullYear();
    mcall3.hide();
}

function setMCFlightDate4() {
    var date1 = mcall4.getSelectedDates()[0];
    var date2 = mcall3.getSelectedDates()[0];
    this.today = new Date();
    var thisMonth = this.today.getMonth();
    var thisDay = this.today.getDate();
    var thisYear = this.today.getFullYear();
    var todaydate = new Date(thisYear, thisMonth, thisDay);
    var depdate = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    var prevdate = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    var difference = (depdate.getTime() - todaydate.getTime());
    if (difference < 0) {
        document.getElementById('errorMessage').style.display = "block";
        document.getElementById('errorMessage').innerHTML = "Date selected should be greater than or equal to today's date ";
        return false;
    } else {
        document.getElementById('errorMessage').style.display = "none";
        document.getElementById('errorMessage').innerHTML = "";
    }

    var datediff = (depdate.getTime() - prevdate.getTime());

    if (datediff < 0) {
        document.getElementById('errMess').style.display = "block";
        document.getElementById('errorMessage').innerHTML = "Date selected should be greater than or equal to previous date ";
        return false;
    }
    else {
        document.getElementById('errMess').style.display = "none";
        document.getElementById('errorMessage').innerHTML = "";
    }
    var month = date1.getMonth() + 1;
    var day = date1.getDate();

    if (month.toString().length == 1) {
        month = "0" + month;
    }
    if (day.toString().length == 1) {
        day = "0" + day;
    }
    document.getElementById('ctl00_cphTransaction_Time4').value = day + "/" + (month) + "/" + date1.getFullYear();
    mcall4.hide();
}

function setMCFlightDate5() {
    var date1 = mcall5.getSelectedDates()[0];
    var date2 = mcall4.getSelectedDates()[0];
    this.today = new Date();
    var thisMonth = this.today.getMonth();
    var thisDay = this.today.getDate();
    var thisYear = this.today.getFullYear();
    var todaydate = new Date(thisYear, thisMonth, thisDay);
    var depdate = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    var prevdate = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    var difference = (depdate.getTime() - todaydate.getTime());
    if (difference < 0) {
        document.getElementById('errorMessage').style.display = "block";
        document.getElementById('errorMessage').innerHTML = "Date selected should be greater than or equal to today's date ";
        return false;
    } else {
        document.getElementById('errorMessage').style.display = "none";
        document.getElementById('errorMessage').innerHTML = "";
    }

    var datediff = (depdate.getTime() - prevdate.getTime());

    if (datediff < 0) {
        document.getElementById('errMess').style.display = "block";
        document.getElementById('errorMessage').innerHTML = "Date selected should be greater than or equal to previous date ";
        return false;
    }
    else {
        document.getElementById('errMess').style.display = "none";
        document.getElementById('errorMessage').innerHTML = "";
    }

    var month = date1.getMonth() + 1;
    var day = date1.getDate();

    if (month.toString().length == 1) {
        month = "0" + month;
    }
    if (day.toString().length == 1) {
        day = "0" + day;
    }
    document.getElementById('ctl00_cphTransaction_Time5').value = day + "/" + (month) + "/" + date1.getFullYear();
    mcall5.hide();
}

function setMCFlightDate6() {
    var date1 = mcall6.getSelectedDates()[0];
    var date2 = mcall5.getSelectedDates()[0];
    this.today = new Date();
    var thisMonth = this.today.getMonth();
    var thisDay = this.today.getDate();
    var thisYear = this.today.getFullYear();
    var todaydate = new Date(thisYear, thisMonth, thisDay);
    var depdate = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    var prevdate = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    var difference = (depdate.getTime() - todaydate.getTime());
    if (difference < 0) {
        document.getElementById('errorMessage').style.display = "block";
        document.getElementById('errorMessage').innerHTML = "Date selected should be greater than or equal to today's date ";
        return false;
    } else {
        document.getElementById('errorMessage').style.display = "none";
        document.getElementById('errorMessage').innerHTML = "";
    }

    var datediff = (depdate.getTime() - prevdate.getTime());

    if (datediff < 0) {
        document.getElementById('errMess').style.display = "block";
        document.getElementById('errorMessage').innerHTML = "Date selected should be greater than or equal to previous date ";
        return false;
    }
    else {
        document.getElementById('errMess').style.display = "none";
        document.getElementById('errorMessage').innerHTML = "";
    }
    var month = date1.getMonth() + 1;
    var day = date1.getDate();

    if (month.toString().length == 1) {
        month = "0" + month;
    }
    if (day.toString().length == 1) {
        day = "0" + day;
    }
    document.getElementById('ctl00_cphTransaction_Time6').value = day + "/" + (month) + "/" + date1.getFullYear();
    mcall6.hide();
}

YAHOO.util.Event.addListener(window, "load", init2);


function autoCompInit1() {
    if (!$('citycontainer1')) {
        return;
    }
    // Instantiate first data source
    oACDS = new YAHOO.widget.DS_JSFunction(getStates); //temporarily autosearch deactivated
    // Instantiate first auto complete
    oAutoComp = new YAHOO.widget.AutoComplete('ctl00_cphTransaction_City1', 'citycontainer1', oACDS);
    oAutoComp.prehighlightClassName = "yui-ac-prehighlight";
    oAutoComp.useShadow = true;
    oAutoComp.minQueryLength = 3;
    oAutoComp.queryDelay = 0;
    oAutoComp.useIFrame = true;
    oAutoComp.formatResult = function(oResultItem, sQuery) {
        document.getElementById('citycontainer1').style.display = "block";
        var sMarkup = oResultItem[1];
        var aMarkup = [sMarkup];
        return (aMarkup.join(""));
    };

    oAutoComp.itemSelectEvent.subscribe(itemSelectHandler);
    // Instantiate second data source        
    oACDS2 = new YAHOO.widget.DS_JSFunction(getStates); // temporarily autosearch deactivated
    // Instantiate second auto complete
    oAutoComp2 = new YAHOO.widget.AutoComplete('ctl00_cphTransaction_City2', 'citycontainer2', oACDS2);
    oAutoComp2.prehighlightClassName = "yui-ac-prehighlight";
    oAutoComp2.useShadow = true;
    oAutoComp2.minQueryLength = 3;
    oAutoComp2.queryDelay = 0;
    oAutoComp2.useIFrame = true
    oAutoComp2.formatResult = function(oResultItem, sQuery) {
    document.getElementById('citycontainer2').style.display = "block";
        var sMarkup = oResultItem[1];
        var aMarkup = [sMarkup];
        return (aMarkup.join(""));
    };
    oAutoComp2.itemSelectEvent.subscribe(itemSelectHandler1);

    // Instantiate first data source
    oACDS3 = new YAHOO.widget.DS_JSFunction(getStates); //temporarily autosearch deactivated
    // Instantiate first auto complete
    oAutoComp3 = new YAHOO.widget.AutoComplete('ctl00_cphTransaction_City3', 'citycontainer3', oACDS3);
    oAutoComp3.prehighlightClassName = "yui-ac-prehighlight";
    oAutoComp3.useShadow = true;
    oAutoComp3.minQueryLength = 3;
    oAutoComp3.queryDelay = 0;
    oAutoComp3.useIFrame = true;
    oAutoComp3.formatResult = function(oResultItem, sQuery) {
        document.getElementById('citycontainer3').style.display = "block";
        var sMarkup = oResultItem[1];
        var aMarkup = [sMarkup];
        return (aMarkup.join(""));
    };
    oAutoComp3.itemSelectEvent.subscribe(itemSelectHandler2);
    
    // Instantiate second data source        
    oACDS4 = new YAHOO.widget.DS_JSFunction(getStates); // temporarily autosearch deactivated
    // Instantiate second auto complete
    oAutoComp4 = new YAHOO.widget.AutoComplete('ctl00_cphTransaction_City4', 'citycontainer4', oACDS4);
    oAutoComp4.prehighlightClassName = "yui-ac-prehighlight";
    oAutoComp4.useShadow = true;
    oAutoComp4.minQueryLength = 3;
    oAutoComp4.queryDelay = 0;
    oAutoComp4.useIFrame = true
    oAutoComp4.formatResult = function(oResultItem, sQuery) {
        document.getElementById('citycontainer4').style.display = "block";
        var sMarkup = oResultItem[1];
        var aMarkup = [sMarkup];
        return (aMarkup.join(""));
    };
    oAutoComp4.itemSelectEvent.subscribe(itemSelectHandler3);

    
        // Instantiate first data source
        oACDS5 = new YAHOO.widget.DS_JSFunction(getStates); //temporarily autosearch deactivated
        // Instantiate first auto complete
        oAutoComp5 = new YAHOO.widget.AutoComplete('ctl00_cphTransaction_City5', 'citycontainer5', oACDS5);
        oAutoComp5.prehighlightClassName = "yui-ac-prehighlight";
        oAutoComp5.useShadow = true;
        oAutoComp5.minQueryLength = 3;
        oAutoComp5.queryDelay = 0;
        oAutoComp5.useIFrame = true;
        oAutoComp5.formatResult = function(oResultItem, sQuery) {
            document.getElementById('citycontainer5').style.display = "block";
            var sMarkup = oResultItem[1];
            var aMarkup = [sMarkup];
            return (aMarkup.join(""));
        };
        oAutoComp5.itemSelectEvent.subscribe(itemSelectHandler4);
    

    
        // Instantiate second data source        
        oACDS6 = new YAHOO.widget.DS_JSFunction(getStates); // temporarily autosearch deactivated
        // Instantiate second auto complete
        oAutoComp6 = new YAHOO.widget.AutoComplete('ctl00_cphTransaction_City6', 'citycontainer6', oACDS6);
        oAutoComp6.prehighlightClassName = "yui-ac-prehighlight";
        oAutoComp6.useShadow = true;
        oAutoComp6.minQueryLength = 3;
        oAutoComp6.queryDelay = 0;
        oAutoComp6.useIFrame = true
        oAutoComp6.formatResult = function(oResultItem, sQuery) {
            document.getElementById('citycontainer6').style.display = "block";
            var sMarkup = oResultItem[1];
            var aMarkup = [sMarkup];
            return (aMarkup.join(""));
        };
        oAutoComp6.itemSelectEvent.subscribe(itemSelectHandler5);
    

        // Instantiate first data source
        oACDS7 = new YAHOO.widget.DS_JSFunction(getStates); //temporarily autosearch deactivated
        // Instantiate first auto complete
        oAutoComp7 = new YAHOO.widget.AutoComplete('ctl00_cphTransaction_City7', 'citycontainer7', oACDS7);
        oAutoComp7.prehighlightClassName = "yui-ac-prehighlight";
        oAutoComp7.useShadow = true;
        oAutoComp7.minQueryLength = 3;
        oAutoComp7.queryDelay = 0;
        oAutoComp7.useIFrame = true;
        oAutoComp7.formatResult = function(oResultItem, sQuery) {
            document.getElementById('citycontainer7').style.display = "block";
            var sMarkup = oResultItem[1];
            var aMarkup = [sMarkup];
            return (aMarkup.join(""));
        };
        oAutoComp7.itemSelectEvent.subscribe(itemSelectHandler6);
    
        // Instantiate second data source        
        oACDS8 = new YAHOO.widget.DS_JSFunction(getStates); // temporarily autosearch deactivated
        // Instantiate second auto complete
        oAutoComp8 = new YAHOO.widget.AutoComplete('ctl00_cphTransaction_City8', 'citycontainer8', oACDS8);
        oAutoComp8.prehighlightClassName = "yui-ac-prehighlight";
        oAutoComp8.useShadow = true;
        oAutoComp8.minQueryLength = 3;
        oAutoComp8.queryDelay = 0;
        oAutoComp8.useIFrame = true
        oAutoComp8.formatResult = function(oResultItem, sQuery) {
            document.getElementById('citycontainer8').style.display = "block";
            var sMarkup = oResultItem[1];
            var aMarkup = [sMarkup];
            return (aMarkup.join(""));
        };
        oAutoComp8.itemSelectEvent.subscribe(itemSelectHandler7);
    
        // Instantiate first data source
        oACDS9 = new YAHOO.widget.DS_JSFunction(getStates); //temporarily autosearch deactivated
        // Instantiate first auto complete
        oAutoComp9 = new YAHOO.widget.AutoComplete('ctl00_cphTransaction_City9', 'citycontainer9', oACDS9);
        oAutoComp9.prehighlightClassName = "yui-ac-prehighlight";
        oAutoComp9.useShadow = true;
        oAutoComp9.minQueryLength = 3;
        oAutoComp9.queryDelay = 0;
        oAutoComp9.useIFrame = true;
        oAutoComp9.formatResult = function(oResultItem, sQuery) {
            document.getElementById('citycontainer9').style.display = "block";
            var sMarkup = oResultItem[1];
            var aMarkup = [sMarkup];
            return (aMarkup.join(""));
        };
        oAutoComp9.itemSelectEvent.subscribe(itemSelectHandler8);
   
        // Instantiate second data source        
        oACDS10 = new YAHOO.widget.DS_JSFunction(getStates); // temporarily autosearch deactivated
        // Instantiate second auto complete
        oAutoComp10 = new YAHOO.widget.AutoComplete('ctl00_cphTransaction_City10', 'citycontainer10', oACDS10);
        oAutoComp10.prehighlightClassName = "yui-ac-prehighlight";
        oAutoComp10.useShadow = true;
        oAutoComp10.minQueryLength = 3;
        oAutoComp10.queryDelay = 0;
        oAutoComp10.useIFrame = true
        oAutoComp10.formatResult = function(oResultItem, sQuery) {
            document.getElementById('citycontainer10').style.display = "block";
            var sMarkup = oResultItem[1];
            var aMarkup = [sMarkup];
            return (aMarkup.join(""));
        };
        oAutoComp10.itemSelectEvent.subscribe(itemSelectHandler9);
   
        // Instantiate first data source
        oACDS11 = new YAHOO.widget.DS_JSFunction(getStates); //temporarily autosearch deactivated
        // Instantiate first auto complete
        oAutoComp11 = new YAHOO.widget.AutoComplete('ctl00_cphTransaction_City11', 'citycontainer11', oACDS11);
        oAutoComp11.prehighlightClassName = "yui-ac-prehighlight";
        oAutoComp11.useShadow = true;
        oAutoComp11.minQueryLength = 3;
        oAutoComp11.queryDelay = 0;
        oAutoComp11.useIFrame = true;
        oAutoComp11.formatResult = function(oResultItem, sQuery) {
            document.getElementById('citycontainer11').style.display = "block";
            var sMarkup = oResultItem[1];
            var aMarkup = [sMarkup];
            return (aMarkup.join(""));
        };
        oAutoComp11.itemSelectEvent.subscribe(itemSelectHandler10);
   
        // Instantiate second data source        
        oACDS12 = new YAHOO.widget.DS_JSFunction(getStates); // temporarily autosearch deactivated
        // Instantiate second auto complete
        oAutoComp12 = new YAHOO.widget.AutoComplete('ctl00_cphTransaction_City12', 'citycontainer12', oACDS12);
        oAutoComp12.prehighlightClassName = "yui-ac-prehighlight";
        oAutoComp12.useShadow = true;
        oAutoComp12.minQueryLength = 3;
        oAutoComp12.queryDelay = 0;
        oAutoComp12.useIFrame = true
        oAutoComp12.formatResult = function(oResultItem, sQuery) {
            document.getElementById('citycontainer12').style.display = "block";
            var sMarkup = oResultItem[1];
            var aMarkup = [sMarkup];
            return (aMarkup.join(""));
        };
        oAutoComp12.itemSelectEvent.subscribe(itemSelectHandler11);
    
}

var itemSelectHandler = function(sType, aArgs) {
    YAHOO.log(sType); //this is a string representing the event; e.g. "itemSelectEvent" 
    var oMyAcInstance = aArgs[2]; // your AutoComplete instance 
    var destinationArray = oMyAcInstance[1].split(',');
    document.getElementById('ctl00_cphTransaction_City1').value = oMyAcInstance[1];
    document.getElementById('citycontainer1').style.display = "none";
    var elListItem = aArgs[1]; //the <li> element selected in the suggestion container 
    var aData = aArgs[2]; //array of the data for the item as returned by the DataSource 
};

var itemSelectHandler1 = function(sType, aArgs) {
    YAHOO.log(sType); //this is a string representing the event; e.g. "itemSelectEvent" 
    var oMyAcInstance = aArgs[2]; // your AutoComplete instance 
    var destinationArray = oMyAcInstance[1].split(',');
    document.getElementById('ctl00_cphTransaction_City2').value = oMyAcInstance[1];
    document.getElementById('citycontainer2').style.display = "none";
    var elListItem = aArgs[1]; //the <li> element selected in the suggestion container 
    var aData = aArgs[2]; //array of the data for the item as returned by the DataSource
};

var itemSelectHandler2 = function(sType, aArgs) {
    YAHOO.log(sType); //this is a string representing the event; e.g. "itemSelectEvent" 
    var oMyAcInstance = aArgs[2]; // your AutoComplete instance 
    var destinationArray = oMyAcInstance[1].split(',');
    document.getElementById('ctl00_cphTransaction_City3').value = oMyAcInstance[1];
    document.getElementById('citycontainer3').style.display = "none";
    var elListItem = aArgs[1]; //the <li> element selected in the suggestion container 
    var aData = aArgs[2]; //array of the data for the item as returned by the DataSource 
};

var itemSelectHandler3 = function(sType, aArgs) {
    YAHOO.log(sType); //this is a string representing the event; e.g. "itemSelectEvent" 
    var oMyAcInstance = aArgs[2]; // your AutoComplete instance 
    var destinationArray = oMyAcInstance[1].split(',');
    document.getElementById('ctl00_cphTransaction_City4').value = oMyAcInstance[1];
    document.getElementById('citycontainer4').style.display = "none";
    var elListItem = aArgs[1]; //the <li> element selected in the suggestion container 
    var aData = aArgs[2]; //array of the data for the item as returned by the DataSource 
};
var itemSelectHandler4 = function(sType, aArgs) {
    YAHOO.log(sType); //this is a string representing the event; e.g. "itemSelectEvent" 
    var oMyAcInstance = aArgs[2]; // your AutoComplete instance 
    var destinationArray = oMyAcInstance[1].split(',');
    document.getElementById('ctl00_cphTransaction_City5').value = oMyAcInstance[1];
    document.getElementById('citycontainer5').style.display = "none";
    var elListItem = aArgs[1]; //the <li> element selected in the suggestion container 
    var aData = aArgs[2]; //array of the data for the item as returned by the DataSource 
};

var itemSelectHandler5 = function(sType, aArgs) {
    YAHOO.log(sType); //this is a string representing the event; e.g. "itemSelectEvent" 
    var oMyAcInstance = aArgs[2]; // your AutoComplete instance 
    var destinationArray = oMyAcInstance[1].split(',');
    document.getElementById('ctl00_cphTransaction_City6').value = oMyAcInstance[1];
    document.getElementById('citycontainer6').style.display = "none";
    var elListItem = aArgs[1]; //the <li> element selected in the suggestion container 
    var aData = aArgs[2]; //array of the data for the item as returned by the DataSource 
};
var itemSelectHandler6 = function(sType, aArgs) {
    YAHOO.log(sType); //this is a string representing the event; e.g. "itemSelectEvent" 
    var oMyAcInstance = aArgs[2]; // your AutoComplete instance 
    var destinationArray = oMyAcInstance[1].split(',');
    document.getElementById('ctl00_cphTransaction_City7').value = oMyAcInstance[1];
    document.getElementById('citycontainer7').style.display = "none";
    var elListItem = aArgs[1]; //the <li> element selected in the suggestion container 
    var aData = aArgs[2]; //array of the data for the item as returned by the DataSource 
};

var itemSelectHandler7 = function(sType, aArgs) {
    YAHOO.log(sType); //this is a string representing the event; e.g. "itemSelectEvent" 
    var oMyAcInstance = aArgs[2]; // your AutoComplete instance 
    var destinationArray = oMyAcInstance[1].split(',');
    document.getElementById('ctl00_cphTransaction_City8').value = oMyAcInstance[1];
    document.getElementById('citycontainer8').style.display = "none";
    var elListItem = aArgs[1]; //the <li> element selected in the suggestion container 
    var aData = aArgs[2]; //array of the data for the item as returned by the DataSource 
};
var itemSelectHandler8 = function(sType, aArgs) {
    YAHOO.log(sType); //this is a string representing the event; e.g. "itemSelectEvent" 
    var oMyAcInstance = aArgs[2]; // your AutoComplete instance 
    var destinationArray = oMyAcInstance[1].split(',');
    document.getElementById('ctl00_cphTransaction_City9').value = oMyAcInstance[1];
    document.getElementById('citycontainer9').style.display = "none";
    var elListItem = aArgs[1]; //the <li> element selected in the suggestion container 
    var aData = aArgs[2]; //array of the data for the item as returned by the DataSource 
};

var itemSelectHandler9 = function(sType, aArgs) {
    YAHOO.log(sType); //this is a string representing the event; e.g. "itemSelectEvent" 
    var oMyAcInstance = aArgs[2]; // your AutoComplete instance 
    var destinationArray = oMyAcInstance[1].split(',');
    document.getElementById('ctl00_cphTransaction_City10').value = oMyAcInstance[1];
    document.getElementById('citycontainer10').style.display = "none";
    var elListItem = aArgs[1]; //the <li> element selected in the suggestion container 
    var aData = aArgs[2]; //array of the data for the item as returned by the DataSource 
};

var itemSelectHandler10 = function(sType, aArgs) {
    YAHOO.log(sType); //this is a string representing the event; e.g. "itemSelectEvent" 
    var oMyAcInstance = aArgs[2]; // your AutoComplete instance 
    var destinationArray = oMyAcInstance[1].split(',');
    document.getElementById('ctl00_cphTransaction_City11').value = oMyAcInstance[1];
    document.getElementById('citycontainer11').style.display = "none";
    var elListItem = aArgs[1]; //the <li> element selected in the suggestion container 
    var aData = aArgs[2]; //array of the data for the item as returned by the DataSource
};

var itemSelectHandler11 = function(sType, aArgs) {
    YAHOO.log(sType); //this is a string representing the event; e.g. "itemSelectEvent" 
    var oMyAcInstance = aArgs[2]; // your AutoComplete instance 
    var destinationArray = oMyAcInstance[1].split(',');
    document.getElementById('ctl00_cphTransaction_City12').value = oMyAcInstance[1];
    document.getElementById('citycontainer12').style.display = "none";
    var elListItem = aArgs[1]; //the <li> element selected in the suggestion container 
    var aData = aArgs[2]; //array of the data for the item as returned by the DataSource
};

function getFile(url, passData) {
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

function getStates(sQuery) {
    var paramList = 'searchKey=' + sQuery;
    paramList += '&requestFrom=' + "ReturnSearch";
    var url = "StatesAjax.aspx";
    var arrayStates = "";
    var faltoo = getFile(url, paramList);
    arrayStates = faltoo.split('/');
    if (arrayStates[0] != "") {
        for (var i = 0; i < arrayStates.length; i++) {
            arrayStates[i] = ["i", arrayStates[i]];
        }
        return arrayStates;
    }
    else return (false);
}
YAHOO.util.Event.addListener(this, 'load', autoCompInit1);
