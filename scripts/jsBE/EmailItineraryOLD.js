function ShowEmailDiv()
{
    var resultCountMin=eval(document.getElementById('ResultCountMin').value);
    var resultCountMax = eval(document.getElementById('ResultCountMax').value);
    var count=0;
    for(var i=resultCountMin;i<resultCountMax;i++)
    {
        if (document.getElementById('checkboxEmail-' + (i + 1)).checked)
        {
            count++;
        }
    }
    if(count == 0)
    {
        alert('Select the itinerary to email');
        return;
    }
    document.getElementById('itineraryCount').innerHTML="Mailing "+ count+ " Itineraries";
    document.getElementById('emailBlock').style.display='block';
}


function SendMail() {
    var ValidEmail = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z][a-zA-Z]+)$/;
    var csv='';
    var isPublishPrice=document.getElementById('offerPrice').checked;
    var addressList=document.getElementById('addressBox').value;
   if (!ValidEmail.test(addressList))
    {           
        document.getElementById('errortext').innerHTML = "Enter valid email address";            
        return false;
    }
    var resultCountMin=eval(document.getElementById('ResultCountMin').value);
    var resultCountMax=eval(document.getElementById('ResultCountMax').value);
    for(var i=resultCountMin;i<resultCountMax;i++)
    {
        if(document.getElementById('checkboxEmail-'+(i+1)).checked)
        {
            if(csv=='')
            {
                csv = document.getElementById('resultId-'+(i+1)).value;
            }
            else
            {
                csv = csv + "," + document.getElementById('resultId-'+(i+1)).value;
            }
        }
    }
    var paramList ='csvId=' + csv;
    paramList = paramList+ "&isPublishPrice=" + isPublishPrice;
    paramList = paramList+ "&addressList=" + addressList ;
   
    var url = "EmailItineraryPage.aspx";
    new Ajax.Request(url, {method: 'post', parameters: paramList, onComplete: DisplayMessage});
}

function DisplayMessage(response)
{
    if(response.responseText!='')
    {
        document.getElementById('error').innerHTML=response.responseText;
        document.getElementById('error').style.display = 'block';
        document.getElementById('emailBlock').style.display='none';
    }
    else
    {
        document.getElementById('error').innerHTML = 'Your message has been sent';
        document.getElementById('error').style.display = 'block';
        document.getElementById('emailBlock').style.display='none';
    }   
}
function HideEmailDiv()
{
    document.getElementById('emailBlock').style.display='none';
}

var fareRuleResultId = -1;
function FareRule(resultId, sessionId) {
    if (fareRuleResultId != resultId) {
        var pars = "resultId=" + resultId + "&sessionId=" + sessionId;
        // this page will return fare rules only when the result array is stored in session.
        var url = "FareRule.aspx";
        new Ajax.Request(url, { method: 'post', parameters: pars, onComplete: DisplayFareRule });
        if (browser.isIE) {
            $('FareRuleBlock').style.top = 100 + document.documentElement.scrollTop + "px";
        }
        else if (browser.isNS) {
            $('FareRuleBlock').style.top = 100 + window.scrollY + "px";
        }
        else {
            $('FareRuleBlock').style.top = 100;
        }
        $('FareRuleBody').innerHTML = "Loading ...";
        fareRuleResultId = resultId;
    }
    $('FareRuleBlock').style.display = "block";
    //TODO: we need to highlight the result block here $('Result-' + resultId)
}

function DisplayFareRule(rule) {
    $('FareRuleHeadTitle').innerHTML = "Fare Rules";
    $('FareRuleBody').innerHTML = rule.responseText;
}

function FareRuleHide() {
    //TODO: need to remove highlight from result block
    DisplayNone('FareRuleBlock');
}