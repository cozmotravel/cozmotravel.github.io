// JScript File for Search page
// For set Way type -- Start
var searchStamp=1;
function loadWayType()
{
    type = $('waytype').value;         
    if (type == 'oneway')
    {
        setWayType('oneway', 'returnway');
    }
    else if (type == 'returnway')
    {
        setWayType('returnway', 'oneway');
    }
    else if (type == 'gccO')
    {
        setWayType('gccO', 'gccR');
    }
    else if (type == 'gccR')
    {
        setWayType('gccR', 'gccO');
    }
    else
    {
	    setWayType('returnway', 'oneway');
    } 
}
// For set Way type -- End

function setWayType(showid, hideid)
{     
    if (showid == 'gccO' || showid == 'gccR')
    {       
        if(showid == 'gccO')
        { 
            $('ReturnDate').value = $('UTCTime').value;
            $('returnwaydate').style.display = 'none';    
            $('gccOneWay').style.display = 'none';
            $('gccReturn').style.display = 'block';            
            $('WayTypeId').value = "oneway";
            $('waytype').value = "gccO";            
        }
        else
        {
            if ($('ReturnDate').value == $('UTCTime').value)
            {
                $('ReturnDate').value = "DD/MM/YYYY";
            }
            $('gccOneWay').style.display = 'block';
            $('gccReturn').style.display = 'none';
            $('returnwaydate').style.display = 'block';    
            $('WayTypeId').value = "returnway";
            $('waytype').value = "gccR";            
        }
        var sel = 0;
        if ($('SamaRole') && $('SamaRole').value == "true")
        {               
            $('SamaId').style.display = 'block';                 
            sel++;
        }
        if ($('HermesRole') && $('HermesRole').value == "true")
        {               
            if($('IXId'))
                $('IXId').style.display = 'block';
            if($('G9Id'))
                $('G9Id').style.display = 'block';
            if($('IXId')||$('G9Id'))sel++;
        }
        if ($('FlyDubaiRole') && $('FlyDubaiRole').value == "true")
        {             
            if(showid == 'gccO')
            {
                $('FlyDubaiId').style.display = 'block'; 
                $('FlyDubai').checked = '';                       
                sel++;
            }
            else
            {
                $('FlyDubaiId').style.display = 'none';  
                $('FlyDubai').checked = 's';                
                sel++;
            }            
        }
        if ($('AirArabiaRole') && $('AirArabiaRole').value == "true")
        {               
            $('AirArabiaId').style.display = 'block';                 
            sel++;
        }
        if (eval(sel)>0)
        {
            $('resSearchBlock').style.display = "block"; 
        }       
    }
    else if (showid == 'oneway')
    {        
        document.getElementById('ReturnDate').value = $('UTCTime').value;
        document.getElementById('returnwaydate').style.display = 'none';    
        document.getElementById('WayTypeId').value = "oneway";
        $('waytype').value = "oneway";
        var sel = 0;
        if ($('IndigoRole') && $('IndigoRole').value == "true")
        {
            $('indigoId').style.display = 'block'; 
            sel++;
        }
        if ($('SpiceJetRole') && $('SpiceJetRole').value == "true")
        {               
            $('SpiceJetId').style.display = 'block';  
            sel++;
        }
        if ($('ParamountRole') && $('ParamountRole').value == "true")
        {               
            $('ParamountId').style.display = 'block'; 
            sel++;
        }
        if ($('AirDeccanRole') && $('AirDeccanRole').value == "true")
        {               
            $('AirDeccanId').style.display = 'block';                 
            sel++;
        }            
        if ($('MdlrRole') && $('MdlrRole').value == "true")
        {               
            $('MdlrId').style.display = 'block'; 
            sel++;
        }
        if ($('GoAirRole') && $('GoAirRole').value == "true")
        {               
            $('GoAirId').style.display = 'block';                 
            sel++;
        } 
        if ($('AirArabiaRole') && $('AirArabiaRole').value == "true")
        {               
            $('AirArabiaRole').style.display = 'block';                 
            sel++;
        }       
        if ($('HermesRole') && $('HermesRole').value == "true")
        {               
            if($('IXId'))
                $('IXId').style.display = 'block';
            sel++;
        }
         if ($('FlyDubaiRole') && $('FlyDubaiRole').value == "true")
        {             
            
            $('FlyDubaiId').style.display = 'block';                 
            sel++;
        }
        if (eval(sel)>0)
        {
            document.getElementById('resSearchBlock').style.display = "block"; 
        } 
		if($(showid))
		{
		    $(showid).style.display = 'none';
		}
    	if($(hideid))
		{
		    $(hideid).style.display = 'block';
		}
                
    }
    else if (showid == 'returnway')
    {
        if (document.getElementById('ReturnDate').value == $('UTCTime').value)
        {
            document.getElementById('ReturnDate').value = "DD/MM/YYYY";
        }
        document.getElementById('returnwaydate').style.display = 'block';
        document.getElementById('WayTypeId').value = "returnway";
        $('waytype').value = "returnway";
        var sel=0;
        if ($('IndigoRole') && $('IndigoRole').value == "true")
        {                
            $('indigoId').style.display = 'none';  
            sel++;
        }
        if ($('SpiceJetRole') && $('SpiceJetRole').value == "true")
        {               
            if ($('SpiceJetMode').value == "SpiceJet")
            {
                $('SpiceJetId').style.display = 'block';
                sel++;
            }
            else if ($('SpiceJetMode').value == "Navitaire")
            {
                $('SpiceJetId').style.display = 'none';
                sel++;
            }                
        }
        if ($('AirDeccanRole') && $('AirDeccanRole').value == "true")
        {               
            $('AirDeccanId').style.display = 'none';                 
            sel++;
        }  
        if ($('MdlrRole') && $('MdlrRole').value == "true")
        {               
            $('MdlrId').style.display = 'none';
            sel++;
        }  
         if ($('GoAirRole') && $('GoAirRole').value == "true")
        {               
            $('GoAirId').style.display = 'none';                 
            sel++;
        } 
         if ($('AirArabiaRole') && $('AirArabiaRole').value == "true")
        {               
            $('AirArabiaRole').style.display = 'none';                 
            sel++;
        }          
        if ($('HermesRole') && $('HermesRole').value == "true")
        {               
            if($('IXId'))
                $('IXId').style.display = 'block';
            sel++;
        }
        if ($('FlyDubaiRole') && $('FlyDubaiRole').value == "true")
        {             
            
            $('FlyDubaiId').style.display = 'none';    
            $('FlyDubai').checked = '';             
            sel++;
        }
        //Do not show restrict search 
        if (eval(sel)>0)
        {
            document.getElementById('resSearchBlock').style.display = "block"; 
        } 
		if($(showid))
		{
		    $(showid).style.display = 'none';
		}
    	if($(hideid))
		{
		    $(hideid).style.display = 'block';
		}              
    }
}

var tempPrefAirline = "";
function restrictSearchCheck(gds)
{     
    if ($('GDS'))
    {
        if(!$('GDS').checked)
        {
            if(document.getElementById('prefAirlineBlock'))
            {
                document.getElementById('prefAirlineBlock').style.display = "none"; 
            }
            if(gds)
            {
                if($('PreferredAirline'))
                {
                    if($('PreferredAirline').value)
                    {
                        tempPrefAirline = $('PreferredAirline').value;
                    }
                    $('PreferredAirline').value = "";
                }
            }
        }
        else
        {     
            document.getElementById('prefAirlineBlock').style.display = "block";
            if(gds)
            {
                $('PreferredAirline').value = tempPrefAirline;
            }
        } 
    }
}
 
function setvalue(type, divId, divValue)
{  
    if (type == 'from')
    {            
        document.getElementById('Origin').value = divValue;
        document.getElementById('fromdiv').style.display='none'; 
        document.getElementById('alert-city-parent').style.display='none';
        document.getElementById('alert-city-from').style.display='none';
    }
    else if (type == 'to')
    {
        document.getElementById('Destination').value = divValue;
        document.getElementById('todiv').style.display='none'; 
        document.getElementById('alert-city-parent').style.display='none';
        document.getElementById('alert-city-to').style.display='none';
    }
}    

// Custom validation START 
// date digfference alert common method
function dateDiffAlert(FirstDate, SecondDate, DepDate)
{	   
    var difference = (SecondDate.getTime() - FirstDate.getTime());  
    if (difference < 0)
    {
        document.getElementById('errorMessage').style.display = "block";
		document.getElementById('errorMessage').innerHTML = "Return date should be greater or equal to departure date (" + DepDate + ")";
        return false;
    }
    return true;
}

// check if From and To field are not same
function validateSourceDestination()
{  
    // checking if destination n source fields are not blank
    if (document.getElementById('Origin').value == "" || (document.getElementById('Origin').value).length == 0)
    {
        document.getElementById('errorMessage').style.display = "block";
		document.getElementById('errorMessage').innerHTML = "From field cannot be left blank";
        return false;
    }
    if (document.getElementById('Destination').value == "" || (document.getElementById('Destination').value).length == 0)
    {
        document.getElementById('errorMessage').style.display = "block";
		document.getElementById('errorMessage').innerHTML = "To field cannot be left blank";
        return false;
    }       
    if (document.getElementById('Origin').value == document.getElementById('Destination').value)
    {
        document.getElementById('errorMessage').style.display = "block";
		document.getElementById('errorMessage').innerHTML = "Source and Destination could not be same";
        return false;
    }
    document.getElementById('errorMessage').style.display = "none";
    document.getElementById('errorMessage').innerHTML = "";
    return true;
}

function CallDatefun()
{
    if ($('waytype').value == "returnway" || $('waytype').value == "gccR")
    {
        var dateR = document.getElementById('ReturnDate').value;    
        document.getElementById('WayTypeId').value = "returnway";                      
    }
    else if ($('waytype').value == "oneway" || $('waytype').value == "gccO")
    {
        document.getElementById('WayTypeId').value = "oneway";
    }
    var dateD = document.getElementById('DepDate').value;
    // cecking for Dep Date
    // checking if any field is not blank           
    if (dateD.length <=0 || (dateD == "DD/MM/YYYY"))
    {                
        document.getElementById('CustomValDep').innerHTML = "Please fill date";                
        return false;                
    }     
    else
    {
        document.getElementById('CustomValDep').innerHTML = "";                
    }      
    if ($('waytype').value == "returnway" || $('waytype').value == "gccR")
    {
        // checking if any field is not blank
        if (dateR.length <=0 || (dateR == "DD/MM/YYYY"))
        {                
            document.getElementById('CustomValRet').innerHTML = "Please fill date";                
            return false;                    
        }     
        else
        {
            document.getElementById('CustomValRet').innerHTML = "";                    
        }      
    }
    // Note: Date()	for javascript take months from 0 to 11
    var dateGoArray = (document.getElementById('DepDate').value).split('/');
    var dateGo = new Date(dateGoArray[2], dateGoArray[1]-1, dateGoArray[0]);           
    // Checking for dep date    
    if (!CheckValidDate(dateGoArray[0], dateGoArray[1], dateGoArray[2]))
    {                             
        document.getElementById('CustomValDep').innerHTML = "Invalid date";
        return false;              
    }    
    // check for past date
    if (!CheckDateDiff(dateGoArray[0], dateGoArray[1], dateGoArray[2]))
    {             
        document.getElementById('CustomValDep').innerHTML = "Invalid date";
        return false;               
    } 
    if ($('waytype').value == "returnway" || $('waytype').value == "gccR")
    {                
        // checking if return date is less than departure date      
        // Note: Date()	for javascript take months from 0 to 11         
        var dateReturnArray = (document.getElementById('ReturnDate').value).split('/');               
        var dateReturn = new Date(dateReturnArray[2], dateReturnArray[1]-1, dateReturnArray[0]);    
        // Checking for return date    
        if (!CheckValidDate(dateReturnArray[0], dateReturnArray[1], dateReturnArray[2]))
        {
            document.getElementById('CustomValRet').innerHTML = "Invalid date";
            return false;                  
        }   
        // check if past date is not filled
        if (!CheckDateDiff(dateReturnArray[0], dateReturnArray[1], dateReturnArray[2]))
        {
            document.getElementById('CustomValRet').innerHTML = "Invalid date";
            return false;                   
        }                  
    }
    // check only if return way is selected
    if (document.getElementById('WayTypeId').value == "returnway")
    {
        if (!dateDiffAlert(dateGo, dateReturn, dateD))
        {
                return false;                   
        }
    }
    // check source and destination
    if (!validateSourceDestination())
    {
        return false;                
    }
       
    // checking if any passenger is selected or not
    var adult = document.getElementById('Adult').options[document.getElementById('Adult').selectedIndex].value;
    var senior = document.getElementById('Senior').options[document.getElementById('Senior').selectedIndex].value;
    var child = document.getElementById('Child').options[document.getElementById('Child').selectedIndex].value;
    var infant = document.getElementById('Infant').options[document.getElementById('Infant').selectedIndex].value;
    var totalPassengers = eval(adult) + eval(senior) + eval(child) + eval(infant);         
    totalPassengers = eval(totalPassengers);
    
    if ((adult == 0) && (senior == 0) && (child == 0))
    {            
        document.getElementById('errorMessage').style.display = "block";
		document.getElementById('errorMessage').innerHTML = "Select any passenger";
        return false;            
    }          
    if ((eval(adult) + eval(senior)) < eval(infant))
    {
        document.getElementById('errorMessage').style.display = "block";
		document.getElementById('errorMessage').innerHTML = "Number of infants should not exceed the number of adult and senior";
        return false;            
    }
    if (totalPassengers > 9)
    {            
        document.getElementById('errorMessage').style.display = "block";
		document.getElementById('errorMessage').innerHTML = "Total number of passengers should not exceed 9";
        return false;
    }
    if (document.getElementById('SelfRadio') != null && document.getElementById('AgentRadio') != null)
    {
        if (document.getElementById('AgentRadio').checked == true && ($('AgentId').value == ""))
        {
            document.getElementById('errorMessage').style.display = "block";
	        document.getElementById('errorMessage').innerHTML = "Please Search An Agency"; 
	        return false;                
        }       
        if (document.getElementById('SelfRadio').checked == false && document.getElementById('AgentRadio').checked == false)
        {
            document.getElementById('errorMessage').style.display = "block";
		    document.getElementById('errorMessage').innerHTML = "Please select the agency"; 
		    return false;                    
        }  
        if (document.getElementById('SelfRadio').checked == true)
        {
            $('BookingAgencyID').value= $('AdminId').value;  
            $('AgentId').value = "";         
        }                    
    }
    else if (document.getElementById('AgentId') != null && document.getElementById('SelfRadio') == null && document.getElementById('AgentRadio') == null)
    {
        if (($('AgentId').value == ""))
        {
            document.getElementById('errorMessage').style.display = "block";
		    document.getElementById('errorMessage').innerHTML = "Please Select the agency"; 
		    return false;                    
        }        
    }   
    // Check if Restrict Airline is checked but PreferredAirline value is not set
    if($('waytype').value == "gccO" || $('waytype').value == "gccR")
    {
        if ($('HermesRole').value == "true" || $('SamaRole').value == "true" || ($('FlyDubaiRole') && $('FlyDubaiRole').value == "true")|| ($('AirArabiaRole') && $('AirArabiaRole').value == "true"))
        {
            var sel = 0;
            if ($('Sama') && $('Sama').checked)
            {
                sel++;
            }            
            else if($('IXTab') && $('IXTab').checked)
            {
                sel++;
            }
            else if($('G9Tab') && $('G9Tab').checked)
            {
                sel++;
            }
            else if ($('FlyDubai') && $('FlyDubai').checked)
            {
                sel++;
            }
            else if ($('AirArabia') && $('AirArabia').checked)
            {
                sel++;
            }
            if(eval(sel)==0)
            { 
                document.getElementById('errorMessage').style.display = "block";
	            document.getElementById('errorMessage').innerHTML = "Please Select One Source Atleast"; 
	            return false;   
            }
        }
    }
    else
    {
        if($('SpiceJetRole').value == "true" || $('IndigoRole').value == "true" || $('ParamountRole').value == "true" || $('MdlrRole').value == "true"|| $('GoAirRole').value == "true"||$('AirArabiaRole').value=="true")
        {         
            if ($('GDS').checked)
            {
                if (document.getElementById('RestrictAirline').checked && (document.getElementById('PreferredAirline').value == "" || document.getElementById('PreferredAirline').value == null))
                {
                    document.getElementById('errorMessage').style.display = "block";
	                document.getElementById('errorMessage').innerHTML = "Please Fill Preferred Carrier To Make Restrict Airline Working."; 
	                return false; 
                }            
            }
        }
        var selected = 0;
        if ($('SpiceJetRole').value == "true" || $('IndigoRole').value == "true"|| $('ParamountRole').value == "true" || $('MdlrRole').value == "true" || $('GoAirRole').value == "true" || $('HermesRole').value == "true"||$('AirArabiaRole').value == "true")
        {
            if ($('SpiceJetRole').value == "true" && ($('SpiceJet').checked))
            {
                selected++;
            }
            if ($('IndigoRole').value == "true" && ($('Indigo').checked))
            {
                selected++;
            }
            if (($('AirDeccanRole').value == "true") && $('AirDeccan').checked)
            {
                selected++;
            }
            if ($('GDS').checked)
            {
                selected++;
            }
            if ($('ParamountRole').value == "true" && ($('Paramount').checked))
            {
                selected++;
            }
            if ($('MdlrRole').value == "true" && ($('Mdlr').checked))
            {
                selected++;
            }
            
            if ($('GoAirRole').value == "true" && ($('GoAir').checked))
            {
                selected++;
            }
            if ($('AirArabiaRole').value == "true" && ($('AirArabia').checked))
            {
                selected++;
            }
            if ($('IXTab') && ($('IXTab').checked))
            {
                selected++;
            }
            if ($('FlyDubai') && ($('FlyDubai').checked))
            {
                selected++;
            }
            if (selected == 0)
            { 
                 document.getElementById('errorMessage').style.display = "block";
	             document.getElementById('errorMessage').innerHTML = "Please Select One Source Atleast"; 
	             return false;   
            }
        }       
    }        

    return true;
}

// on checking sefl from Booking for section
function SelectBookingFor()
{
    if (document.getElementById('SelfRadio').checked == true)
    {
        $('BookingAgencyID').value= $('AdminId').value;  
        $('AgentId').value = "";
    }
}
//  Custom validation END -->

//var cal1;
//var cal2;
//function init()
//{
//	var today = new Date($('ISTTime').value);
//    // Rendering Cal1
//	cal1 = new YAHOO.widget.CalendarGroup("cal1","container1");		
//    cal1.cfg.setProperty("minDate", (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear());
//	cal1.cfg.setProperty("title","Select your desired departure date:");
//	cal1.cfg.setProperty("close",true);
//	cal1.selectEvent.subscribe(setDate1);
//	cal1.render();		
//    // Rendering Cal2
//	cal2 = new YAHOO.widget.CalendarGroup("cal2","container2");
//	cal2.cfg.setProperty("title","Select your desired return date:");
//	cal2.selectEvent.subscribe(setDate2);
//	cal2.cfg.setProperty("close",true);
//	cal2.render();
//}
//		        
//function showCalendar1()
//{
//	cal2.hide();
//    document.getElementById('container1').style.display = "block";
//}

//function showCalendar2()
//{
//	cal1.hide();
//	// setting Calender2 min date acoording to calendar1 selected date
//	var date1 = document.getElementById('DepDate').value;
//    if (date1.length != 0 && date1 != "DD/MM/YYYY")
//    {		      
//        var depDateArray = date1.split('/');
//        cal2.cfg.setProperty("minDate", depDateArray[1] + "/" + depDateArray[0] + "/" + depDateArray[2]);
//        cal2.cfg.setProperty("pageDate", depDateArray[1] + "/" + depDateArray[2]);
//        cal2.render();
//    }
//	document.getElementById('container2').style.display = "block";
//}

//function setDate1()
//{
//	var date1 = cal1.getSelectedDates()[0];		
//	this.today = new Date();
//	var thisMonth = this.today.getMonth();
//	var thisDay = this.today.getDate();
//	var thisYear = this.today.getFullYear();
//	var todaydate = new Date(thisYear, thisMonth, thisDay);  
//	var depdate = new Date(date1.getFullYear(),date1.getMonth(),date1.getDate());  
//    var difference = (depdate.getTime() - todaydate.getTime());
//	if (difference < 0)
//	{			  
//	    document.getElementById('errorMessage').style.display = "block";
//	    document.getElementById('errorMessage').innerHTML = "Date selected should be greater than or equal to today's date ";
//	    return false;
//	}
//	document.getElementById('errorMessage').style.display = "none";
//	document.getElementById('errorMessage').innerHTML = "";			
//	var month = date1.getMonth()+1;
//	var day = date1.getDate();
//	if (month.toString().length == 1)
//	{
//	    month = "0"+month;
//	}
//	if (day.toString().length == 1)
//	{
//	    day = "0"+day;
//	}
//	document.getElementById('DepDate').value = day + "/" + (month) + "/" + date1.getFullYear();						
//	cal1.hide();
//}

//function setDate2()
//{
//    var date1 = document.getElementById('DepDate').value;
//    if (date1.length == 0 || date1 == "DD/MM/YYYY")
//    {		      
//        document.getElementById('errorMessage').style.display = "block";
//	    document.getElementById('errorMessage').innerHTML = "First select departure date.";
//	    return false;
//    }
//	var date2 = cal2.getSelectedDates()[0];
//	var depDateArray = date1.split('/');	
//	// checking if date1 is valid		    
//    if (!CheckValidDate(depDateArray[0], depDateArray[1], depDateArray[2]))
//    {            
//        document.getElementById('errorMessage').style.display = "block";
//	    document.getElementById('errorMessage').innerHTML = " Invalid Departure Date";              
//        return false;
//    }   
//    document.getElementById('errorMessage').style.display = "none";
//	document.getElementById('errorMessage').innerHTML = ""; 
//    // Note: Date()	for javascript take months from 0 to 11
//	var depdate = new Date(depDateArray[2], depDateArray[1]-1, depDateArray[0]); 
//    var returndate = new Date(date2.getFullYear(),date2.getMonth(),date2.getDate());  
//    var difference = returndate.getTime() - depdate.getTime();
//	if (difference < 0)
//	{			  
//	    document.getElementById('errorMessage').style.display = "block";
//	    document.getElementById('errorMessage').innerHTML = "Date of return should be greater than or equal to date of departure (" + date1 + ")";
//	    return false;
//	}
//	document.getElementById('errorMessage').style.display = "none";
//	document.getElementById('errorMessage').innerHTML = "";
//	var month = date2.getMonth()+1;
//	var day = date2.getDate();
//	if (month.toString().length == 1)
//	{
//	    month = "0"+month;
//	}	
//	if (day.toString().length == 1)
//	{
//	    day = "0"+day;
//	}
//	document.getElementById('ReturnDate').value = day + "/" + month + "/" + date2.getFullYear();            
//	cal2.hide();
//}

//YAHOO.util.Event.addListener(window, "load", init);		

         
// function for ajax call for search agent
function SearchAgent()
{
    var boxvalue = document.getElementById('SearchBox').value;
    var url = "AgencyListAjax.aspx?boxtext=" + boxvalue + "&activeOnly=true";                
    var id = "AgencyList";
    var myAjax = new Ajax.Updater(id, url, {method: 'post'});
    $(id).innerHTML = '<div class="orange-font">Loading data...</div>';
    return false;
}
         
//Function adds agency in Exception List
function AddinList(val, id)
{
    $('AgentId').value = val;
    $('BookingAgencyID').value= id;
    $('AgencyList').innerHTML = "";
    if($('AgentRadio'))
    {
        setRadioButton('AgentRadio');
    }
    IShimPop('SearchPop','IShimFrame');             
}
    
    
function setRadioButton(radiobutton)
{
    document.getElementById(radiobutton).checked = true;
    return;
}		
// for search agent pop up  END
    
//  Search result javascript START -->
function calculateFilteredResult()
{
    var number=eval("0");
    var resultCount=eval($("ResultCount").value);
    for(var i=0;i<resultCount;i++)
    {
        if($("Result-"+i).style.display=="block")
        {
            number++;
        }
    }
    $("FilteredResultCount").innerHTML= "( "+ number.toString() + " of " + resultCount + " )";
}
  
        
// Ajax script for search result block - Middle and right block
function AjaxSearchResultBlock()
{   
    // validating fields                 
    if (!CallDatefun())
    {
        return false;
    }
    $('SearchResultLoad').style.display = "block";                
    $('searchpage').style.display = "none";   
    document.getElementById("Search").style.display="none";
    document.getElementById("Stop").style.display="block";
    $('to').value= $('Destination').value;
    $('from').value = $('Origin').value;    
    $('childCount').value = $('Child').value;    
    $('adultCount').value = $('Adult').value;
    $('seniorCount').value = $('Senior').value;
    $('infantCount').value = $('Infant').value;
    $('depdateNew').value = $('DepDate').value;
    $('deptimeNew').value = $('DepTime').value;
    $('waytypeidNew').value = $('WayTypeId').value;
    $('returndateNew').value = $('ReturnDate').value;
    $('returntimeNew').value = $('ReturnTime').value;
    $('cabinclassNew').value = $('BookingClass').value;
    $('bookingclassNew').value = $('BookingClass').value;
    var waytype = $('waytype').value;
    $('waytypeNew').value = $('waytype').value;
    var preferredairline = waytype=="gccO"||waytype=="gccR"?"":$('PreferredAirline').value;
    $('preferredairlineNew').value = preferredairline; 
    var carrierrestriction = waytype=="gccO"||waytype=="gccR"?"":$('CarrierRestriction').value;
    $('carrierrestrictionNew').value = carrierrestriction;
    $('wayTypeNotNullNew').value = $('wayTypeNotNull').value;
    $('bookingagencyidNew').value = $('BookingAgencyID').value;
    $('adminidNew').value = $('AdminId').value;   
    var agentId='';
    if($('AgentId'))
    {
        agentId=$('AgentId').value;  
    }
    $('agentidNew').value = agentId;           
    if($('RestrictAirline') && $('RestrictAirline').checked)
    {
        $('restrictairlineNew').value="true";
    }        
//  Source filter START --
    if ($('GDS') && $('GDS').checked)
    {
        $('gdsNew').value="true";
    } 
    else
    {
        $('gdsNew').value="false";        
    }
        
    if($('SpiceJet') && $('SpiceJet').checked)
    {
        $('spicejetNew').value="true";
    }      
    else
    {
        $('spicejetNew').value="false";
    }     
    
    if($('Indigo') && $('Indigo').checked)
    {
        $('indigoNew').value="true";
    }      
    else
    {
        $('indigoNew').value="false";
    }  
    
    if($('AirDeccan') && $('AirDeccan').checked)
    {
        $('airdeccanNew').value="true";
    }      
    else
    {
        $('airdeccanNew').value="false";
    }  
    if($('Paramount') && $('Paramount').checked)
    {
        $('paramountNew').value="true";
    }      
    else
    {
        $('paramountNew').value="false";
    }
      
    if($('Mdlr') && $('Mdlr').checked)
    {
        $('mdlrNew').value="true";
    }
    else
    {
        $('mdlrNew').value="false";
    }
    if($('GoAir') && $('GoAir').checked)
    {
        $('goAirNew').value="true";
    }
    else
    {
        $('goAirNew').value="false";
    } 
    if($('AirArabia') && $('AirArabia').checked)
    {
        $('airArabiaNew').value="true";
    }
    else
    {
        $('airArabiaNew').value="false";
    } 
    if($('Sama') && $('Sama').checked)
    {
        $('samaNew').value="true";
    }
    else
    {
        $('samaNew').value="false";
    }    
    if($('FlyDubai') && $('FlyDubai').checked)
    {
        $('flyDubaiNew').value="true";
    }
    else
    {
        $('flyDubaiNew').value="false";
    }    
    var airIX = $('IXTab') && $('IXTab').checked;
    var airG9 = $('G9Tab') && $('G9Tab').checked;
    if(airIX || airG9)
    {
        $('hermesNew').value="true";
        var hermesPref ="";
        if(airIX)
        {
            hermesPref = "IX";
        }
        if(airG9)
        {
            if(hermesPref.length>0)hermesPref += ",G9";
            else hermesPref += "G9";
        }
        $('hermesPref').value=hermesPref;
    }
    else
    {
        $('hermesNew').value="false";
    }
    $('stamp').value=searchStamp;
    //Source filter END --
    $('searchReq').submit();                
}
function SearchResultFail()
{
    document.getElementById('errorMessage').style.display = "block";
    document.getElementById('errorMessage').innerHTML = "Your session has been expired. Please click <a href=\"returnsearch.aspx\">here</a> to continue.";
    document.getElementById("Search").style.display="block";
    document.getElementById("Stop").style.display="none";
    document.getElementById("SearchResultLoad").style.display="none";
}
function StopSearch()
{
  $('SearchResultLoad').style.display = "none";     
  searchStamp++;
  document.getElementById("Search").style.display="block";
  document.getElementById("Stop").style.display="none";
  //Code to hide stop button
  //code to show search button
}
function AjaxSearchResultForCalendar()
{
    var pars = "calSource=" + $('CalendarSource').value;
    var url = "SearchResultAjax.aspx";           
    new Ajax.Request(url, {method: 'post', parameters: pars, onComplete: DisplaySearchResult});
    if ($("SearchResultBlock") != null) 
    {
        $('SearchResultLoad').style.display = "block";                
    }    
}
function AjaxSearchResultForChangedDate()
{
    var url = "SearchResultAjax.aspx";
    var pars = "dayChanged=true";//just to check for changed date search
    new Ajax.Request(url, {method: 'post', parameters: pars, onComplete: DisplaySearchResult});
    if ($("SearchResultBlock") != null) 
    {
        $('SearchResultLoad').style.display = "block";                
    }    
}        
function AjaxSearchResultBlockWhenBack()
{
    var pars = "sessionvalue=yes&sessionId=" + $('SessionId').value;
    var url = "SearchResultAjax.aspx";           
    new Ajax.Request(url, {method: 'post', parameters: pars, onComplete: DisplaySearchResult});
    if ($("SearchResultBlock") != null) 
    {
        $('SearchResultLoad').style.display = "block";                
    }    
}

function DisplaySearchResult(resultValue)
{   
    var resValue = resultValue.responseText;  
    var arraySplitted = resValue.split("@");
    if (arraySplitted[3] == searchStamp)
    {
        $('SearchResultBlock').style.display = "block";
        $('SearchResultLoad').style.display = "none";
        $('searchpage').style.display = "none";
        if (resValue.length != 0)
        {
            if (arraySplitted.length != 4)
            {                        
                $('SearchResultBlock').innerHTML = "Error on Page";
                return true;
            }
            else
            {
                if (arraySplitted[0] != "undefined")
                {  
                    $('multipleCity1').innerHTML = arraySplitted[0];
                }
                else
                {
                    $('multipleCity1').innerHTML = "";
                }
                if (arraySplitted[1] != "undefined")
                {
                    $('multipleCity2').innerHTML = arraySplitted[1];
                }
                else
                {
                    $('multipleCity2').innerHTML = "";
                }  
                if (arraySplitted[2] != "undefined")
                {
                   if ($("SearchResultBlock") != null) 
                   { 
                       $('SearchResultBlock').innerHTML = arraySplitted[2];
                   }                    
                }
            }
        }            
        if ($("IntemediateAnim") != null) 
        {
            $("IntemediateAnim").style.display = "none";
        }
        if ($("changedetails") != null)
        {
            $("changedetails").style.display = "block";  
        }
        if ($("sortOn") != null) 
        {                
            $("sortOn").style.display = "block";
        }
        if ((document.getElementById('errormess').value).length != 0)
        {                 
            $('searchpage').style.display = "block"; 
            document.getElementById('SearchResultLoad').style.display = "none";
            document.getElementById('errorMessage').style.display = "block";
            document.getElementById('errorMessage').innerHTML = document.getElementById('errormess').value;
            return false;    
        }
        if ($("ShowHotelDeal") != null) 
        {
            SearchHotelDeal($('dealSessionId').value,$('noOfDeal').value,$('cityCode').value,$('DepDate').value);
        }
        if($('ResultCountMin') !=null)
        {
            
            if($('OfferedFareHidden').value=="")
            {
                var k = eval($('ResultCountMin').value);
                $('OfferedFareHidden').value = $('OfferedFare-'+k).style.display; 
            }
            else 
            {
                for(i=eval($('ResultCountMin').value) ; i<eval($('ResultCountMax').value) ; i++)
                {                    
                    $('OfferedFare-'+i).style.display = $('OfferedFareHidden').value;                   
                }
            }      
        }      
            
    }
    // else nothing to do. Just ignore the response that came.
}

function changeDetails()
{
    $('searchpage').style.display = "block";
    document.getElementById("Search").style.display="block";
    document.getElementById("Stop").style.display="none";
    $('OfferedFareHidden').value="";
    if ($("SearchResultBlock") != null) 
    {
        $('SearchResultBlock').style.display = "none";
    }
}
// To load AIrport list in Flight and Insurance
function getCityList(sQuery) {
    try {
        var paramList = 'searchKey=' + sQuery + '&isDomestic=false';
        var url = "CityAjax.aspx";
        var arrayStates = "";
        var response = invokePage(url, paramList);

        arrayStates = response.split('/');
        if (arrayStates[0] != "") {
            for (var i = 0; i < arrayStates.length; i++) {
                arrayStates[i] = ["i", arrayStates[i]];
            }
            return arrayStates;
        }
        else return (false);
    }
    catch (ex) { alert(ex.message); }
}


function autoCompInitFlightSearch() {
   
    if(!$('statescontainer'))
    {
        return;
    }
    // Instantiate first data source
    oACDSOrigin = new YAHOO.widget.DS_JSFunction(getStates);//temporarily autosearch deactivated
    // Instantiate first auto complete
    oAutoCompOrigin = new YAHOO.widget.AutoComplete('ctl00_cphTransaction_Origin', 'statescontainer', oACDSOrigin);
    oAutoCompOrigin.prehighlightClassName = "yui-ac-prehighlight";
    oAutoCompOrigin.useShadow = true;
    oAutoCompOrigin.minQueryLength = 3;         
    oAutoCompOrigin.queryDelay = 0;
    oAutoCompOrigin.useIFrame = true;
    oAutoCompOrigin.formatResult = function(oResultItem, sQuery)
    {
        document.getElementById('statescontainer').style.display="block";
        var sMarkup = oResultItem[1];
        var aMarkup = [sMarkup];
        return ( aMarkup.join(""));
    };
    if (oAutoCompOrigin.itemSelectEvent != null)
        oAutoCompOrigin.itemSelectEvent.subscribe(itemSelectHandlerOrigin); 
    // Instantiate second data source        
    oACDSReturn = new YAHOO.widget.DS_JSFunction(getStates); // temporarily autosearch deactivated
    // Instantiate second auto complete
    oAutoCompReturn = new YAHOO.widget.AutoComplete('ctl00_cphTransaction_Destination', 'statescontainer2', oACDSReturn);
    oAutoCompReturn.prehighlightClassName = "yui-ac-prehighlight";
    oAutoCompReturn.useShadow = true;
    oAutoCompReturn.minQueryLength=3;
    oAutoCompReturn.queryDelay = 0;
    oAutoCompReturn.useIFrame = true
    oAutoCompReturn.formatResult = function(oResultItem, sQuery)
    {
        var sMarkup = oResultItem[1];
        var aMarkup = [sMarkup];
        return ( aMarkup.join(""));
    };  
    if (oAutoCompReturn.itemSelectEvent != null)
        oAutoCompReturn.itemSelectEvent.subscribe(itemSelectHandlerReturn);
}

var itemSelectHandlerOrigin = function(sType, aArgs)
{ 
    YAHOO.log(sType); //this is a string representing the event; e.g. "itemSelectEvent" 
    var oMyAcInstance = aArgs[2]; // your AutoComplete instance 
    var destinationArray=oMyAcInstance[1].split(',');
    document.getElementById('ctl00_cphTransaction_Origin').value = oMyAcInstance[1];
    document.getElementById('statescontainer').style.display="none";
    var elListItem = aArgs[1]; //the <li> element selected in the suggestion container 
    var aData = aArgs[2]; //array of the data for the item as returned by the DataSource 
}; 

var itemSelectHandlerReturn = function(sType, aArgs)
{ 
    YAHOO.log(sType); //this is a string representing the event; e.g. "itemSelectEvent" 
    var oMyAcInstance = aArgs[2]; // your AutoComplete instance 
    var destinationArray=oMyAcInstance[1].split(',');
    document.getElementById('ctl00_cphTransaction_Destination').value = oMyAcInstance[1];
    document.getElementById('statescontainer').style.display="none";
    var elListItem = aArgs[1]; //the <li> element selected in the suggestion container 
    var aData = aArgs[2]; //array of the data for the item as returned by the DataSource 
}; 

function getFile(url, passData)
{
    if (window.XMLHttpRequest)
    {
        AJAX=new XMLHttpRequest();              
    }
    else
    {                                  
        AJAX=new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (AJAX)
    {
        AJAX.open("POST", url, false);
        AJAX.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        AJAX.send(passData);
        return AJAX.responseText;                                         
    }
    else
    {
        return false;
    }
}

function getStates(sQuery) {
    var paramList = 'searchKey=' + sQuery;
    paramList +='&requestFrom='+"ReturnSearch";
    var url = "StatesAjax.aspx";
    var arrayStates="";
    var faltoo=getFile(url, paramList);
    arrayStates = faltoo.split('/');
    if(arrayStates[0]!="")
    {
        for (var i=0; i<arrayStates.length;i++)
        {
          arrayStates[i]=["i",arrayStates[i]];
        }
        return arrayStates;
    }
    else return (false);
}
YAHOO.util.Event.addListener(this, 'load', autoCompInitFlightSearch);

function SetPriviousValues()
{
    document.getElementById('ctl00_cphTransaction_Origin').value = $('fromChange').value;
    document.getElementById('ctl00_cphTransaction_Destination').value = $('toChange').value;
    document.getElementById('ctl00_cphTransaction_ReturnDate').value = $('retDateChange').value;
    document.getElementById('ctl00_cphTransaction_DepDate').value = $('depDateChange').value;
     
    // making select box selected 
    for (var n=0; n<document.getElementById('Adult').options.length; n++)
    {
        if (document.getElementById('Adult').options[n].value == $('adult').value)
        {
            document.getElementById('Adult').options[n].selected = true;
        }
        else
        {
            document.getElementById('Adult').options[n].selected = false;            
        }
    }
    
    // making select box selected 
    for (var n=0; n<document.getElementById('Child').options.length; n++)
    {
        if (document.getElementById('Child').options[n].value == $('child').value)
        {
            document.getElementById('Child').options[n].selected = true;
        }
        else
        {
            document.getElementById('Child').options[n].selected = false;            
        }
    }
    
    // making select box selected 
    for (var n=0; n<document.getElementById('Senior').options.length; n++)
    {
        if (document.getElementById('Senior').options[n].value == $('senior').value)
        {
            document.getElementById('Senior').options[n].selected = true;
        }
        else
        {
            document.getElementById('Senior').options[n].selected = false;            
        }
    }
    
    // making select box selected 
    for (var n=0; n<document.getElementById('Infant').options.length; n++)
    {
        if (document.getElementById('Infant').options[n].value == $('infant').value)
        {
            document.getElementById('Infant').options[n].selected = true;
        }
        else
        {
            document.getElementById('Infant').options[n].selected = false;            
        }
    }
    
    // for making select box selected for dep time
    for (var n=0; n<document.getElementById('DepTime').options.length; n++)
    {
        if (document.getElementById('DepTime').options[n].value == $('depTimeChange').value)
        {
            document.getElementById('DepTime').options[n].selected = true;
        }
        else
        {
            document.getElementById('DepTime').options[n].selected = false;            
        }
    }        
    
    // for making select box selected for ret time
    for (var n=0; n<document.getElementById('ReturnTime').options.length; n++)
    {
        if (document.getElementById('ReturnTime').options[n].value == $('retTimeChange').value)
        {
            document.getElementById('ReturnTime').options[n].selected = true;
        }
        else
        {
            document.getElementById('ReturnTime').options[n].selected = false;            
        }
    }      
    
    // making booking drop dwon box selected
    if (document.getElementById('SelfRadio') != null && document.getElementById('AgentRadio') != null)
    {            
        if ($('BookingID').value != $('AdminId').value)
        {
            document.getElementById('AgentRadio').checked = true;
        }
        else if ($('BookingID').value == $('AdminId').value)
        {
            document.getElementById('SelfRadio').checked = true;
        }
        $('AgentId').value = $('AgentName').value;
    }    
    else if (document.getElementById('AgentId') != null && document.getElementById('SelfRadio') == null && document.getElementById('AgentRadio') == null)
    {            
        if ($('BookingID').value != $('AdminId').value)
        {
           $('AgentId').value = $('AgentName').value;
        }        
    }
    // career Restriction        
    for (var n=0; n<document.getElementById('CarrierRestriction').options.length; n++)
    {
        if (document.getElementById('CarrierRestriction').options[n].value == $('CarrierRes').value)
        {
            document.getElementById('CarrierRestriction').options[n].selected = true;
        }
        else
        {
            document.getElementById('CarrierRestriction').options[n].selected = false;            
        }
    }              
    
    // Making world span selected/unselected
    if (document.getElementById('worldSpanReq').value == "True")
    {
        document.getElementById('GDS').checked = true; 
    }
    else
    {
        document.getElementById('GDS').checked = false; 
    }
    
    // Making spice jet selected/unselected
    if (document.getElementById('spiceJetReq').value == "True")
    {
        document.getElementById('SpiceJet').checked = true; 
    }
    else
    {
        document.getElementById('SpiceJet').checked = false; 
    }
}

function SearchHotelDeal(sessionId,no,cityCode,depDate)
{
    var url = "ViewPromotionAjax.aspx";          
    var paramList ='isShowHotelDeal=true';
    paramList+= '&cityCode=' + cityCode;
    paramList+= '&noOfDeal=' + no;       
    paramList+= '&depDate=' + depDate;
    paramList+= '&sessionId=' + sessionId;    
    new Ajax.Request(url, {method: 'post', parameters: paramList, onComplete: DisplayHotelDeal});
}
function DisplayHotelDeal(response)
{ 
  $("ShowHotelDeal").innerHTML = response.responseText;        
}


function SelectAllAirlines()
{
        if ($('GDS'))
        {
           $('GDS').checked = 'checked';
        }   
        if($('SpiceJet') )
        {
            $('SpiceJet').checked = 'checked';
        } 
        if($('Indigo'))
        {
           $('Indigo').checked = 'checked';
        }
        if($('AirDeccan'))
        {
            $('AirDeccan').checked = 'checked';
        }      
        if($('Paramount'))
        {
            $('Paramount').checked = 'checked';
        }    
        if($('Mdlr') )
        {
            $('Mdlr').checked = 'checked';
        }      
        if($('GoAir') )
        {
           $('GoAir').checked ='checked';
        }  
        if($('AirArabia') )
        {
           $('AirArabia').checked ='checked';
        }     
        if($('Sama') )
        {
            $('Sama').checked ='checked'; 
        }  
        if($('IXTab') )
        {
            $('IXTab').checked ='checked'; 
        }   
         if($('FlyDubai') )
        {
            $('FlyDubai').checked ='checked'; 
        }       
        if($('G9Tab') )
        {
            $('G9Tab').checked = 'checked';
        }    
        restrictSearchCheck()
}

function RestoreDefault()
{
        if ($('GDS'))
        {
           $('GDS').checked = '';
        }   
        if($('SpiceJet') )
        {
            $('SpiceJet').checked = '';
        } 
        if($('Indigo'))
        {
           $('Indigo').checked = '';
        }
        if($('AirDeccan'))
        {
            $('AirDeccan').checked = '';
        }      
        if($('Paramount'))
        {
            $('Paramount').checked = '';
        }    
        if($('Mdlr') )
        {
            $('Mdlr').checked = '';
        }      
        if($('GoAir') )
        {
           $('GoAir').checked ='';
        } 
        if($('AirArabia') )
        {
           $('AirArabia').checked ='';
        }      
        if($('Sama') )
        {
            $('Sama').checked =''; 
        }  
        if($('IXTab') )
        {
            $('IXTab').checked =''; 
        } 
         if($('FlyDubai') )
        {
            $('FlyDubai').checked =''; 
        } 
        if($('G9Tab') )
        {
            $('G9Tab').checked = '';
        } 
        restrictSearchCheck()
}

var toFill ="";
var countryName ="";
function LoadCountryList(id)
{
    var el = $(id);
    var top = el.offsetTop;
    var left = el.offsetLeft;
    while(el.offsetParent)
    {             
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }  
    if(id == 'Origin')
    {
        $('CitySearchPop').style.left = left+75+"px";
	    $('CitySearchPop').style.top = top+15+"px";
	}
	else
	{
	    $('CitySearchPop').style.left = left-120+"px";
	    $('CitySearchPop').style.top = top+15+"px";
	}
    
    IShimPop('CitySearchPop','IShimFrame');
    if(!$('CountryList'))
    {
        $('AirportList').style.height = "15px";
        $('LoadingCountryList').style.display = 'block';
        var url = "CountryListAjax.aspx"; 
        var paramList ='';               
        new Ajax.Request(url, {method: 'post', parameters: paramList, onComplete:ShowCountryList });
	}
	
	toFill = id; 
}

function ShowCountryList(response)
{
    $('SelectCountryDropDown').innerHTML = response.responseText;
    $('LoadingCountryList').style.display = 'none';
    $('SelectCountryDropDown').style.display = 'block';        
}

function SearchAirports()
{
    $('CountryList').options[$('CountryList').selectedIndex].innerHTML
    var country =document.getElementById('CountryList').options[document.getElementById('CountryList').selectedIndex].value;
    var url = "AirportListAjax.aspx?country=" +country;                
    var id = "AirportList";
    var paramList ='';
    currentTab = 'A';
    countryName = Trim($('CountryList').options[$('CountryList').selectedIndex].innerHTML);
    $(id).innerHTML = "<span style=\"padding-left:105px;font-weight:bold;\">"+ $('LoadingCountryList').innerHTML+" </span>";    
    new Ajax.Request(url, {method: 'post', parameters: paramList, onComplete: ShowAirportList });
    $(id).style.display = 'block';  
}
var currentTab = 'A';
function ShowAirportList(response)
{
    $('AirportList').innerHTML = response.responseText;
    var def='';
    for(i ='A' ;i<='Z';)
    {
        if($('NoOfCitiesWith-'+i) && $('NoOfCitiesWith-'+i).value =="0")
        {
            $('Header-'+i).onclick = 'func';
            $('CitiesWith-'+i).innerHTML = "There are no Airports with character '"+i+"'";
            $('Header-'+i).style.backgroundColor = '';
            $('Header-'+i).style.cursor = '';
            $('Header-'+i).style.color = "#b8bbbc";
        }
        else if($('NoOfCitiesWith-'+i) && def == '')
        {
            def = i;
        }
        i= itoa(atoi(i)+1);
    }
    if(def != "")
    {
        document.getElementById('Header-'+currentTab).style.backgroundColor = '#fafafa';    
        document.getElementById('CitiesWith-'+currentTab).style.display = 'none';   
        document.getElementById('Header-'+currentTab).style.color =  '#b8bbbc';
        document.getElementById('Header-'+def).style.backgroundColor = '#396aa6';
        document.getElementById('Header-'+def).style.color = 'White';  
        document.getElementById('CitiesWith-'+def).style.display = 'block';
        currentTab = def;
    }
    
    $('AirportList').style.height = "210px";
}
function func(){}
function FillInputBox(cityCode , cityName)
{
    var str = "("+cityCode+")" + cityName + "," +countryName;
    $(toFill).value=str;
    IShimPop('CitySearchPop','IShimFrame'); 
}


function TabOnAlphabets(ch)
{
    if(currentTab != ch)
    {
        document.getElementById('Header-'+ch).style.backgroundColor = '#396aa6';
        document.getElementById('Header-'+currentTab).style.backgroundColor = '#fafafa';
        document.getElementById('CitiesWith-'+currentTab).style.display = 'none';   
        document.getElementById('Header-'+ch).style.color = 'White';  
        document.getElementById('Header-'+currentTab).style.color =  '#353636';
        document.getElementById('CitiesWith-'+ch).style.display = 'block';
        currentTab = ch;
    }    
}

// Converts an integer (unicode value) to a char
function itoa(i)
{
   return String.fromCharCode(i);
}


// Converts a char into to an integer (unicode value)
function atoi(a)
{
   return a.charCodeAt();
}

function HighlightAirportName(airportCode)
{
    $(airportCode).style.color = '#016DB1';
    $(airportCode).style.fontSize = "1.12em";
    $(airportCode).style.fontWeight = 'bold';
}

function UnhighlightAirportName(airportCode)
{
    $(airportCode).style.color = '';
    $(airportCode).style.fontSize = "";
    $(airportCode).style.fontWeight = '';
}

/*To display tolltip for total commision on publlish price*/

function showmessage(i)
{   var toolTip;
    toolTip = new YAHOO.widget.Tooltip("Tooltip", {context:"showtooltip"+i, text:"Total Commission Earned : "+document.getElementById('agentcommission'+i).value, showDelay:500 } );
}
function IntDom(showDivId, id) {

    document.getElementById(showDivId).style.display = "block";
    var el = document.getElementById(id);
    document.getElementById(id).focus();
}
function markout(textBox, txt) {
    if (textBox.value == "") {
        textBox.value = txt;
    }
}
function markin(textBox, txt) {
    if (textBox.value == txt) {
        textBox.value = "";
    }
}

/* To auto fill airports list in origin and destination text boxes */
var cntnrid, cntrlid;

function autoCompAirportInit(cntnr, cntrl) {

    if (!$(cntnr) || !$(cntrl) || cntnr == null || cntrl == null || cntnr == 'undefined' || cntrl == 'undefined')
        return;

    cntnrid = cntnr.id;
    cntrlid = cntrl.id;

    oACDSOrigin = new YAHOO.widget.DS_JSFunction(getStates);
    oAutoCompOrigin = new YAHOO.widget.AutoComplete(cntrlid, cntnrid, oACDSOrigin);
    oAutoCompOrigin.prehighlightClassName = "yui-ac-prehighlight";
    oAutoCompOrigin.useIFrame = oAutoCompOrigin.useShadow = true;
    oAutoCompOrigin.minQueryLength = 3;
    oAutoCompOrigin.queryDelay = 0;
    oAutoCompOrigin.formatResult = function (oResultItem) {
        document.getElementById(cntnrid).style.display = "block";
        var sMarkup = oResultItem[1];
        var aMarkup = [sMarkup];
        return (aMarkup.join(""));
    };

    oAutoCompOrigin.itemSelectEvent.subscribe(itemSelectAirportHandler);
}

var itemSelectAirportHandler = function (sType, aArgs) {
    YAHOO.log(sType);
    var oMyAcInstance = aArgs[2];
    document.getElementById(cntrlid).value = oMyAcInstance[1];
    document.getElementById(cntnrid).style.display = "none";
};
YAHOO.util.Event.addListener(this, 'load', autoCompAirportInit);

/* To auto fill airlines list in preferred airline text box */
var alcntnrid, alcntrlid;

function autoCompAirlinesInit(cntnr, cntrl) {

    if (!$(cntnr) || !$(cntrl) || cntnr == null || cntrl == null || cntnr == 'undefined' || cntrl == 'undefined')
        return;

    alcntnrid = cntnr.id;
    alcntrlid = cntrl.id;

    oACDSAirline = new YAHOO.widget.DS_JSFunction(getAirlines);
    oAutoCompAirline = new YAHOO.widget.AutoComplete(alcntrlid, alcntnrid, oACDSAirline);
    oAutoCompAirline.prehighlightClassName = "yui-ac-prehighlight";
    oAutoCompAirline.useIFrame = oAutoCompAirline.useShadow = true;
    oAutoCompAirline.minQueryLength = 2;
    oAutoCompAirline.queryDelay = 0;
    oAutoCompAirline.formatResult = function (oResultItem) {
        document.getElementById(alcntnrid).style.display = "block";
        var sMarkup = oResultItem[1];
        var aMarkup = [sMarkup];
        return (aMarkup.join(""));
    };

    oAutoCompAirline.itemSelectEvent.subscribe(itemSelectAirlinesHandler);
}

var itemSelectAirlinesHandler = function (sType, aArgs) {
    YAHOO.log(sType);
    var oMyAcInstance = aArgs[2];
    document.getElementById(alcntrlid).value = oMyAcInstance[1];
    document.getElementById(alcntnrid).style.display = "none";
};
YAHOO.util.Event.addListener(this, 'load', autoCompAirlinesInit);

/* Get all airlines list to auto fill preferred airline text box */
function getAirlines(sQuery) {

    var paramList = 'searchKey=' + sQuery;
    paramList += '&requestSource=' + "PreferredAirline";
    var url = "CityAjax.aspx";
    var faltoo = getFile(url, paramList);
    var arrAirlines = faltoo.split('/');
    if (arrAirlines[0] != "") {
        for (var i = 0; i < arrAirlines.length; i++) {
            arrAirlines[i] = [arrAirlines[i].split(',')[1], arrAirlines[i]];
        }

        return arrAirlines;
    }
    else return (false);
}

/* To auto fill city list for hotel city text box */
var ctycntnrid, ctycntrlid, cntycntrlid;
function autoCompHotelCity(cntnr, cntrl, cntryid) {

    if (!$(cntnr) || !$(cntrl) || cntnr == null || cntrl == null || cntnr == 'undefined' || cntrl == 'undefined')
        return;

    ctycntnrid = cntnr.id;
    ctycntrlid = cntrl.id;
    cntycntrlid = cntryid;

    oACDSHC = new YAHOO.widget.DS_JSFunction(getHotel_Cities);
    oAutoCompHC = new YAHOO.widget.AutoComplete(ctycntrlid, ctycntnrid, oACDSHC);
    oAutoCompHC.prehighlightClassName = "yui-ac-prehighlight";
    oAutoCompHC.useIFrame = oAutoCompHC.useShadow = true;
    oAutoCompHC.minQueryLength = 3;
    oAutoCompHC.queryDelay = 0;
    oAutoCompHC.formatResult = function (oResultItem) {
        document.getElementById(ctycntnrid).style.display = "block";
        var toShow = oResultItem[1].split(',');
        var sMarkup = toShow[2].length > 0 ? toShow[1] + ',' + toShow[2] + ',' + toShow[3] : toShow[1] + ',' + toShow[3];
        var aMarkup = [sMarkup];
        return (aMarkup.join(""));
    };
    oAutoCompHC.itemSelectEvent.subscribe(itemSelectHandlerHC);
}
var itemSelectHandlerHC = function (sType2, aArgs2) {

    YAHOO.log(sType2); 
    var oMyAcInstance2 = aArgs2[2]; 
    var city = oMyAcInstance2[1].split(',');
    document.getElementById(ctycntrlid).value = city[1] + ',' + city[3];
    document.getElementById(ctycntnrid).style.display = "none";

    if (cntycntrlid != null && cntycntrlid != 'undefined' && cntycntrlid != '' && document.getElementById(cntycntrlid) != null)
        $("#s2id_" + cntycntrlid).select2('val', $("#" + cntycntrlid + " option").filter(function () { return this.text.toUpperCase() == city[3].trim().toUpperCase(); }).val());
};
YAHOO.util.Event.addListener(this, 'load', autoCompHotelCity); 

function getHotel_Cities(sQuery) {

    var paramList = 'searchKey=' + sQuery;
    paramList += '&requestSource=' + "HotelSearchDomestic";    
    var url = "CityAjax.aspx";
    var arrayCities = "";
    var faltoo = getFile(url, paramList);
    arrayCities = faltoo.split('/');
    if (arrayCities[0] != "") {
        for (var i = 0; i < arrayCities.length; i++) {
            if (arrayCities[i].split(',')[2].length > 0) {
                arrayCities[i] = [arrayCities[i].split(',')[1] + ', ' + arrayCities[i].split(',')[2] + ', ' + arrayCities[i].split(',')[3], arrayCities[i]];
            }
            else {
                arrayCities[i] = [arrayCities[i].split(',')[1] + ', ' + arrayCities[i].split(',')[3], arrayCities[i]];
            }
        }

        return arrayCities;
    }
    else return (false);
}

/* To display yahoo calender */
var calcntnrid, calcntrlid, call1;
function ShowYahooCalender(cntnr, cntrl) {

    if (!$(cntnr) || !$(cntrl) || cntnr == null || cntrl == null || cntnr == 'undefined' || cntrl == 'undefined')
        return;
    calcntnrid = cntnr.id;
    calcntrlid = cntrl.id;

    var today = new Date();
    // Rendering Cal1
    call1 = new YAHOO.widget.CalendarGroup(calcntrlid, calcntnrid);
    call1.cfg.setProperty("minDate", (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear());
    call1.cfg.setProperty("close", true);
    call1.selectEvent.subscribe(setDate);
    call1.render();
}

function setDate() {

    var date1 = call1.getSelectedDates()[0];

    var month = date1.getMonth() + 1;
    var day = date1.getDate();

    if (month.toString().length == 1) {
        month = "0" + month;
    }
    if (day.toString().length == 1) {
        day = "0" + day;
    }
    document.getElementById(calcntrlid).value = day + "/" + (month) + "/" + date1.getFullYear();
}

/* To call ajax web methods */
function AjaxCall(Ajaxurl, Inputdata) {

    var obj = '';

    $.ajax({
        type: "POST",
        url: Ajaxurl,
        contentType: "application/json; charset=utf-8",
        data: Inputdata,// "{'sOrigin':'" + origin + "','sDestination':'" + destination + "','sPaxnames':'" + PaxNames.toString() + "'}",
        dataType: "json",
        async: false,
        success: function (data) {
            obj = (data == null || data.d == null || data.d == 'undefined' || data.d == '') ? '' : data.d;
        },
        error: function (error) {
            console.log(JSON.stringify(error));
        }
    });

    return obj;
}

/* To display custom alert message */
function Showalert(id, title, message, closefn) {

    closefn = (closefn == '' || closefn == null || closefn == 'undefined') ? 'Closepopup(' + id + ');' : closefn;

    $('#' + id).children().remove();
    $('#' + id).append('<div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"> ' +
        '<button type="button" class="close" data-dismiss="modal">&times;</button> <h4 class="modal-title">' + title + '</h4> </div> ' +
        '<div class="modal-body"> <div class="form-group"> </div><div class="row custom-gutter"> <strong>' + message + '</strong></div></div>' +
        '<div class="modal-footer"> <button type="button" class="button" onclick="' + closefn + '">OK</button> </div>' +
        '</div></div>');
    $('#' + id).modal('show');
}

function Closepopup(popup) {
    $('#' + popup.id).modal('hide');
}
