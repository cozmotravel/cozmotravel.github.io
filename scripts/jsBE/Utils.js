// JScript file contains some commonly used functions
//****************************************************

// Regular expression for valid email id
var ValidEmail = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z][a-zA-Z]+)$/;

// Valid Phone number.
var ValidPhoneCharacter = /^[+0-9-\(\)]+$/;
  
// Regular expression for emptyString
var EmptyString = /^\s*$/;

// Regular expression for Not a number;
var IsNaN = /\D/;

// Trim based on Regular Expression
function Trim(str)
{
  return str.replace(/^\s+|\s+$/g, '');
}

// Swithes the display property of an object
function Display(blk)
{
    if ($(blk).style.display == "block")
    {
        $(blk).style.display = "none";
    }
    else
    {
        $(blk).style.display = "block";
    }
}

// Method to change display property of an object to block
function DisplayBlock(blk) {
    document.getElementById(blk).style.display = "block";
    //$(blk).style.display = "block";
}

function OpenWindow(url, id)
{
    window.open(url, id, 'status=1,scrollbars=1')
}


// Method to change display property of an object to none
function DisplayNone(blk)
{
    document.getElementById(blk).style.display = "none";
}


// Checks for the following valid date formats:
// MM/DD/YY   MM/DD/YYYY   MM-DD-YY   MM-DD-YYYY
// Also separates date into month, day, and year variables

function isDateValid(dateStr) 
{
    var datePat = /^(\d{1,2})(\/|-)(\d{1,2})\2(\d{2}|\d{4})$/;

    // To require a 4 digit year entry, use this line instead:
    // var datePat = /^(\d{1,2})(\/|-)(\d{1,2})\2(\d{4})$/;
    var matchArray = dateStr.match(datePat); // is the format ok?
    if (matchArray == null) 
    {
       // alert("Date is not in a valid format.")
        return false;
    }
    day = matchArray[1]; // parse date into variables
    month = matchArray[3];
    year = matchArray[4];
    if (month < 1 || month > 12) 
    { // check month range
        return false;
    }
    if (day < 1 || day > 31) 
    {
       // alert("Day must be between 1 and 31.");
        return false;
    }
    if ((month==4 || month==6 || month==9 || month==11) && day==31) 
    {
       // alert("Month "+month+" doesn't have 31 days!")
        return false
    }
    if (month == 2) 
    { // check for february 29th
        var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
        if (day>29 || (day==29 && !isleap)) 
        {
         //   alert("February " + year + " doesn't have " + day + " days!");
            return false;
        }
   }
   return true;  // date is valid
}

// Method to check if a given date is valid or not
// da -> Day number as string
// mo -> Month number as string
// yr -> Year as string
// Returns true if date is valid

function IsValidDate(da, mo, yr)
{
    if(yr.length != 4 || da.length > 2 || mo.length > 2 || yr.length == 0 || da.length == 0 || mo.length == 0)
    {
        return false;
    }
    if(IsNaN.test(da) || IsNaN.test(mo) || IsNaN.test(yr))
    {
        return false;
    }
    var year = eval(yr);
    var month = eval(mo);
    var day = eval(da);
    if(day == 0 || month == 0 || year == 0)
    {
        return false;
    }
    var daysInMonth = 31;
    if (month == 4 || month == 6 || month == 9 || month == 11)
    {
        daysInMonth = 30;
    }
    if (month == 2)
    {
        daysInMonth = (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 )
    }
    if(month > 12 || day > daysInMonth) 
    {
        return false;
    }
    return true;
}

// Method to check if a given date is valid or not.
// ddsmmm -> Date as string in format "dd mmm".
// Returns true if date is valid.
function IsValidDateDDSMMM(ddsmmm)
{
    if(ddsmmm.length == 0)
    {
        return false;
    }
    var month = new Array("JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC");
    var dt = ddsmmm.split(" ");
    if(!dt[1])
    {
        return false;
    }
    var mm = month.indexOf(dt[1].toUpperCase());
    var dd = eval(dt[0]);
    if (mm < 0) 
    {
        return false;
    }
    var cDate = new Date();
    var yy = cDate.getFullYear();
    if(mm < cDate.getMonth() || (mm == cDate.getMonth() && dd<cDate.getDate()))
    {
        yy++;
    }
    var tDate = new Date(yy, mm, dd);
    
    if(tDate.getFullYear() != yy || tDate.getMonth() != mm || tDate.getDate() != dd)
    {
        return false;
    }
    return true;
}

// Method to pop a div so that it can cover select boxes
// Method uses Iframe shim technique to hide select boxes.
// divId -> Id of the div to be poped out.
// iframeId -> Id of the shim Iframe.
function IShimPop(divId, iframeId)
{
    var DivRef = document.getElementById(divId);
    var IfrRef = document.getElementById(iframeId);
        
    if(DivRef.style.display == "none")
    {
        DivRef.style.display = "block";
        IfrRef.style.width = DivRef.offsetWidth + "px";
        IfrRef.style.height = DivRef.offsetHeight + "px";
        IfrRef.style.top = DivRef.style.top;
        IfrRef.style.left = DivRef.style.left;
        IfrRef.style.zIndex = DivRef.style.zIndex - 1;
        IfrRef.style.display = "block";
    }
    else
    {
        DivRef.style.display = "none";
        IfrRef.style.display = "none";
    }
}
// Method to pop a div so that it can cover select boxes
// Method uses Iframe shim technique to hide select boxes.
// divId -> Id of the div to be poped out.
// iframeId -> Id of the shim Iframe.
function IShimPopTL(divId, iframeId)
{
    var DivRef = document.getElementById(divId);
    var IfrRef = document.getElementById(iframeId);
        
    if(DivRef.style.display == "none")
    {
        DivRef.style.display = "block";
        IfrRef.style.width = DivRef.offsetWidth + "px";
        IfrRef.style.height = DivRef.offsetHeight + "px";
        IfrRef.style.top = DivRef.offsetTop;
        IfrRef.style.left = DivRef.offsetLeft;
        IfrRef.style.zIndex = DivRef.style.zIndex - 1;
        IfrRef.style.display = "block";
    }
    else
    {
        DivRef.style.display = "none";
        IfrRef.style.display = "none";
    }
}
// method to ger a browser object aware of browser in use
// this.isIE is true when the browser is Internet Explorer
// this.isNS is true if the browser is Netscape or mozilla or other Gecko browser
// var browser = new Browser(); // syntax to use.
function Browser()
{
    var userAgent, browserKey, i;

    this.isIE    = false;
    this.isNS    = false;
    this.version = null;

    userAgent = navigator.userAgent;

    browserKey = "MSIE";
    if ((i = userAgent.indexOf(browserKey)) >= 0)
    {
        this.isIE = true;
        this.version = parseFloat(userAgent.substr(i + browserKey.length));
        return;
    }

    browserKey = "Netscape6/";
    if ((i = userAgent.indexOf(browserKey)) >= 0)
    {
        this.isNS = true;
        this.version = parseFloat(userAgent.substr(i + browserKey.length));
        return;
    }

    // Treat any other "Gecko" browser as NS 6.1.
    browserKey = "Gecko";
    if ((i = userAgent.indexOf(browserKey)) >= 0)
    {
        this.isNS = true;
        this.version = 6.1;
        return;
    }
}

Array.prototype.indexOf = function(key)
{
    var result = -1;
    for(var i = 0; i < this.length; i++)
    {
        if(this[i] == key)
        {
            result = i;
            break;
        }
    }
    return result;
}
function dateDiffAlert(FirstDate, SecondDate)
{	   
    var difference = (SecondDate.getTime() - FirstDate.getTime());  
                         			     
    if (difference < 0)
    {
        return false;
    }
    return true;
}

function GetWindowSize()
{
    var width =
        document.documentElement && document.documentElement.clientWidth ||
        document.body && document.body.clientWidth ||
        document.body && document.body.parentNode && document.body.parentNode.clientWidth ||
        0;
		
    var height =
        document.documentElement && document.documentElement.clientHeight ||
        document.body && document.body.clientHeight ||
        document.body && document.body.parentNode && document.body.parentNode.clientHeight ||
        0;
  		
    return {x: width, y: height};
}

function showDiv1(id)
{
    $(id).style.display='block';
}
function hideDiv1(id)
{
    $(id).style.display='none';
}