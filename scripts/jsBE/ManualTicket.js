// JScript File for ManualTicket.aspx

function AddRow(){
    var destinationRow = document.createElement('div');
    destinationRow.setAttribute("id", "DesRow" + rowNumber);
    destinationRow.setAttribute("class", "fleft width-100 margin-top-5 font-11");
    var rowHtml = "                <div class=\"fleft width-30\" >\n";
    rowHtml += "                    <input id=\"XO" + rowNumber + "\" class=\"text width-25\" name=\"xo" + rowNumber + "\" type=\"text\" />\n";
    rowHtml += "                </div>\n";
    rowHtml += "                <div class=\"fleft margin-left-3 width-45\">\n";
    rowHtml += "                    <input id=\"Org" + rowNumber + "\" class=\"text width-40 readonly\" name=\"des" + rowNumber + "\"\n";
    rowHtml += "                        readonly=\"readonly\" type=\"text\" />\n";
    rowHtml += "                </div>\n";
    rowHtml += "                <div class=\"fleft margin-left-5 width-45\">\n";
    rowHtml += "                    <input id=\"Des" + rowNumber + "\" class=\"text width-40 readonly\" name=\"des" + rowNumber + "\" readonly=\"readonly\"\n";
    rowHtml += "                        type=\"text\" />\n";
    rowHtml += "                </div>\n";
    rowHtml += "                <div class=\"fleft margin-left-5 width-40\" >\n";
    rowHtml += "                    <input id=\"Airline" + rowNumber + "\" class=\"text width-35 readonly\" name=\"airline" + rowNumber + "\" type=\"text\" readonly=\"readonly\" />\n";
    rowHtml += "                </div>\n";
    rowHtml += "                <div class=\"fleft margin-left-3 width-70\" >\n";
    rowHtml += "                    <input id=\"FlightNumber" + rowNumber + "\" class=\"text width-65 readonly\" name=\"flightNumber" + rowNumber + "\" type=\"text\" readonly=\"readonly\" />\n";
    rowHtml += "                </div>\n";
    rowHtml += "                <div class=\"fleft margin-left-3 width-30\" >\n";
    rowHtml += "                    <input id=\"Class" + rowNumber + "\" class=\"text width-25 readonly\" name=\"class" + rowNumber + "\" type=\"text\" readonly=\"readonly\" />\n";
    rowHtml += "                </div>\n";
    rowHtml += "                <div class=\"fleft margin-left-5 width-70\" >\n";
    rowHtml += "                    <input id=\"Date" + rowNumber + "\" class=\"text width-65 readonly\" name=\"date" + rowNumber + "\" type=\"text\" readonly=\"readonly\" />\n";
    rowHtml += "                </div>\n";
    rowHtml += "                <div class=\"fleft margin-left-3 width-60\" >\n";
    rowHtml += "                    <input id=\"Time" + rowNumber + "\" class=\"text width-55 readonly\" name=\"time" + rowNumber + "\" type=\"text\" readonly=\"readonly\" />\n";
    rowHtml += "                </div>\n";
    rowHtml += "                <div class=\"fleft margin-left-3 width-60\" >\n";
    rowHtml += "                    <input id=\"Status" + rowNumber + "\" class=\"text width-50\" name=\"status" + rowNumber + "\" type=\"text\" />\n";
    rowHtml += "                </div>\n";
    rowHtml += "                <div class=\"fleft margin-left-3 width-60\" >\n";
    rowHtml += "                    <input id=\"FareBasis" + rowNumber + "\" class=\"text width-55\" name=\"fareBasis" + rowNumber + "\" type=\"text\" />\n";
    rowHtml += "                </div>\n";
    rowHtml += "                <div class=\"fleft margin-left-3 width-60\" >\n";
    rowHtml += "                    <input id=\"NVB" + rowNumber + "\" class=\"text width-55\" name=\"nvb" + rowNumber + "\" type=\"text\" />\n";
    rowHtml += "                </div>\n";
    rowHtml += "                <div class=\"fleft margin-left-3 width-60\" >\n";
    rowHtml += "                    <input id=\"NVA" + rowNumber + "\" class=\"text width-55\" name=\"nva" + rowNumber + "\" type=\"text\" />\n";
    rowHtml += "                </div>\n";
    rowHtml += "                <div class=\"fleft margin-left-3 width-60\" >\n";
    rowHtml += "                    <input id=\"Allow" + rowNumber + "\" class=\"text width-50\" name=\"allow" + rowNumber + "\" type=\"text\" />\n";
    rowHtml += "                </div>\n";
    destinationRow.innerHTML = rowHtml;
    document.getElementById('DestinationInfo').appendChild(destinationRow);
    rowNumber++;
}

function AddTaxRow()
{
    var taxRow = document.createElement("div");
    taxRow.setAttribute("id", "Tax" + taxRowNumber);
    var rowHtml = "     <span class=\"fleft text-right margin-top-5 form-content-heading-width\">Tax" + (taxRowNumber + 1) + "</span>"
    rowHtml +=  "     <span class=\"fleft margin-left-5 margin-top-5 width-260\"><span>"
    rowHtml +=  "         <input class=\"text width-80\" id=\"TaxValue" + taxRowNumber + "\" name=\"taxValue" + taxRowNumber + "\" type=\"text\" /></span> <span>Type: </span>"
    rowHtml +=  "         <span>"
    rowHtml +=  "             <input class=\"text width-35\" id=\"TaxType" + taxRowNumber + "\" name=\"taxType" + taxRowNumber + "\" type=\"text\" /></span>"
    rowHtml +=  "     </span>"
    taxRow.innerHTML = rowHtml;
    document.getElementById('TaxBlock').appendChild(taxRow);
    taxRowNumber++;
    var tempCount = eval(document.getElementById('TaxRowCount').value);
    document.getElementById('TaxRowCount').value = tempCount + 1;
}

function checkTicketForm()
{
    document.getElementById('ErrorBlock').innerHTML = "";
    var formValid = true;

    // Checking if the Issuedate is empty.
    if(EmptyString.test(document.getElementById('IssueDate').value))
    {
        document.getElementById('ErrorBlock').innerHTML += "Please enter the Issue Date<br />\n";
        document.getElementById('IssueDate').style.border = "solid 1px #FF0000";
        document.getElementById('IssueDate').style.height = "15px";
        formValid = false;
    }
    else

    // Checking if the Issue date is in valid format.
    if(!IsValidDateDDSMMM(document.getElementById('IssueDate').value))
    {
        document.getElementById('ErrorBlock').innerHTML += "Please enter Issue Date in format \"DD MMM\". eg 24 OCT<br />\n";
        document.getElementById('IssueDate').style.border = "solid 1px #FF0000";
        document.getElementById('IssueDate').style.height = "15px";
        formValid = false;
    }
    else
    {
        document.getElementById('IssueDate').style.border = "solid 1px #A4B97F";
        document.getElementById('IssueDate').style.height = "15px";
    }

    // Checking if the ticket number is left empty.
    var regTicketNo = /^[\d]{10}document.getElementById/;
    document.getElementById('TicketNumber').value = Trim(document.getElementById('TicketNumber').value);
    if(EmptyString.test(document.getElementById('TicketNumber').value))
    {
        document.getElementById('ErrorBlock').innerHTML += "Please enter the Ticket Number.<br />\n";
        document.getElementById('TicketNumber').style.border = "solid 1px #FF0000";
        document.getElementById('TicketNumber').style.height = "15px";
        formValid = false;
    }
//    else if(!regTicketNo.test(document.getElementById('TicketNumber').value))
//    {
//        document.getElementById('ErrorBlock').innerHTML += "Invalid ticket number. Please enter 10 digit ticket number.<br />\n";
//        document.getElementById('TicketNumber').style.border = "solid 1px #FF0000";
//        document.getElementById('TicketNumber').style.height = "15px";
//        formValid = false;
//    }
    else
    {
        document.getElementById('TicketNumber').style.border = "solid 1px #A4B97F";
        document.getElementById('TicketNumber').style.height = "15px";
    }

    // Checking if the Validating Airline is empty.
    var regValAirlineCode = /^[\d]{3}document.getElementById/;
    document.getElementById('ValidatingAirlineCode').value = Trim(document.getElementById('ValidatingAirlineCode').value);
    if(EmptyString.test(document.getElementById('ValidatingAirlineCode').value))
    {
        document.getElementById('ErrorBlock').innerHTML += "Please enter the Validating Airline code.<br />\n";
        document.getElementById('ValidatingAirlineCode').style.border = "solid 1px #FF0000";
        document.getElementById('ValidatingAirlineCode').style.height = "15px";
        formValid = false;
    }
//    else if(!regValAirlineCode.test(document.getElementById('ValidatingAirlineCode').value))
//    {
//        document.getElementById('ErrorBlock').innerHTML += "Validating airline should be 3 digit airline code.<br />\n";
//        document.getElementById('ValidatingAirlineCode').style.border = "solid 1px #FF0000";
//        document.getElementById('ValidatingAirlineCode').style.height = "15px";
//        formValid = false;
//    }
    else
    {
        document.getElementById('ValidatingAirlineCode').style.border = "solid 1px #A4B97F";
        document.getElementById('ValidatingAirlineCode').style.height = "15px";
    }
    
    // Checking if the tax values entered are numeric or not.
    for(var i = 0; i < taxRowNumber; i++)
    {
        if(!EmptyString.test(document.getElementById('TaxType' + i).value))
        {
            document.getElementById('TaxType' + i).style.border = "solid 1px #A4B97F";
            document.getElementById('TaxType' + i).style.height = "15px";
            if(EmptyString.test(document.getElementById('TaxValue' + i).value))
            {
                document.getElementById('ErrorBlock').innerHTML += "Please enter Tax " + (i + 1) + "<br />\n";
                document.getElementById('TaxValue' + i).style.border = "solid 1px #FF0000";
                document.getElementById('TaxValue' + i).style.height = "15px";
                formValid = false;
            }
            else if(isNaN(document.getElementById('TaxValue' + i).value))
            {
                document.getElementById('ErrorBlock').innerHTML += "Please enter correct value for Tax " + (i + 1) + "<br />\n";
                document.getElementById('TaxValue' + i).style.border = "solid 1px #FF0000";
                document.getElementById('TaxValue' + i).style.height = "15px";
                formValid = false;
            }
            else
            {
                document.getElementById('TaxValue' + i).style.border = "solid 1px #A4B97F";
                document.getElementById('TaxValue' + i).style.height = "15px";
            }
        }
        else 
        {
            if(i<2)
            {        
                document.getElementById('ErrorBlock').innerHTML += "Please enter Tax Type " + (i + 1) + "<br />\n";
                document.getElementById('TaxType' + i).style.border = "solid 1px #FF0000";
                document.getElementById('TaxType' + i).style.height = "15px";
                formValid = false;
            }
        }
        if(!EmptyString.test(document.getElementById('TaxValue' + i).value))
        {
            if(EmptyString.test(document.getElementById('TaxType' + i).value))
            {
                document.getElementById('ErrorBlock').innerHTML += "Please enter Tax Type " + (i + 1) + "<br />\n";
                document.getElementById('TaxType' + i).style.border = "solid 1px #FF0000";
                document.getElementById('TaxType' + i).style.height = "15px";
                formValid = false;
            }
            else
            {
                document.getElementById('TaxType' + i).style.border = "solid 1px #A4B97F";
                document.getElementById('TaxType' + i).style.height = "15px";
            }
            if(isNaN(document.getElementById('TaxValue' + i).value))
            {
                document.getElementById('ErrorBlock').innerHTML += "Please enter correct value for Tax " + (i + 1) + "<br />\n";
                document.getElementById('TaxValue' + i).style.border = "solid 1px #FF0000";
                document.getElementById('TaxValue' + i).style.height = "15px";
                formValid = false;
            }
            else
            {
                document.getElementById('TaxValue' + i).style.border = "solid 1px #A4B97F";
                document.getElementById('TaxValue' + i).style.height = "15px";
            }
        }
        else
        {
            if(i<2)
            {
                document.getElementById('ErrorBlock').innerHTML += "Please enter Tax " + (i + 1) + "<br />\n";
                document.getElementById('TaxValue' + i).style.border = "solid 1px #FF0000";
                document.getElementById('TaxValue' + i).style.height = "15px";
                formValid = false;
            }
        }
        if(formValid)
        {
            document.getElementById('TaxValue' + i).style.border = "solid 1px #A4B97F";
            document.getElementById('TaxValue' + i).style.height = "15px";
            document.getElementById('TaxType' + i).style.border = "solid 1px #A4B97F";
            document.getElementById('TaxType' + i).style.height = "15px";
        }
    }
    return formValid;
}