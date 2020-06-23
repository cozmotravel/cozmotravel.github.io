// JScript File
function setFocus(){
setTimeout("document.getElementById('ctl00_cphTransaction_acImportExport').focus()",1000);
}
function Save()
{
if(!isValid()) return false;
if(getElement('acImportExport_hdf').value == '') addMessage('Select Import/Export from the list!','');
if(getElement('acWareHouse_hdf').value == '') addMessage('Select Warehouse from the list!','');
var date=GetDateObject('ctl00_cphTransaction_dcEffectiveDate');
if(date==null) addMessage('Effective Date should be selected!','');
//if(getElement('acRateType_hdf').value == '') addMessage('Please select Rate Type from the list !','');
//if(getElement('acStartDateBasis_hdf').value == '') addMessage('Please select Start-Date Basis from the list !','');
if(getElement('txtRemarks').value.length > 240) addMessage('Remarks cannot exceed more than 240 characters !','');
if(getElementData('hdfeditslab')>=0)addMessage('Editing Slab Details is not completed!','');
if(getMessage()!=''){
alert(getMessage()); clearMessage(); return false;}
else return true;
}

function getDelConfirm()
{
if(confirm("Are you sure you want to delete the record?"))
{
clearMessage();
if(getElementData('hdfeditslab')>=0)addMessage('Editing Slab Details is not completed!','');
if(getMessage()!=''){ 
alert(getMessage()); clearMessage(); return false;}
else return true;
 }
else return false;
    
}


function CheckStatus(id){
var idarr=id.split('_');
var baseId=idarr[0]+'_'+idarr[1]+'_'+idarr[2]+'_'+idarr[3]+'_';
if(document.getElementById(baseId+'ITlblStatus').innerHTML=='C'){
return confirm('Do you want to activate?');
}
else return true;
}
function ValidateNewTariffDetails()
{
clearMessage();
if(getElement('acActivity_hdf').value == '') addMessage('Select activity from the list','');
if(getElement('acCargoBasis_hdf').value == '') addMessage('Select cargo basis from the list','');
if(getElement('acCargoType_hdf').value == '') addMessage('Select cargo type from the list','');
if(getElement('acContainerType_hdf').value == '') addMessage('Select container type from the list','');
if(getElement('acStorageType_hdf').value == '') addMessage('Select storage type from the list','');
if(getElement('acService_hdf').value == '') addMessage('Select service type from the list','');
if(getElement('acBasis_hdf').value == '') addMessage('Select basis from the list','');
if(getElement('acSlabBasis_hdf').value == '') addMessage('Select slab basis from the list','');
if(getElement('acSlabType_hdf').value == '') addMessage('Select slab type from the list','');
if(getElement('acCurrency_hdf').value == '') addMessage('Select currency from the list','');
if(getElement('txtFreeDay').value == '') addMessage('Free day is mandatory','');
if(getElement('txtamount').value == '') addMessage('Amount is mandatory','');
if(getElementData('hdfeditslab')>=0)addMessage('Editing Slab Details is not completed!','');

if(getMessage()!=''){
alert(getMessage()); clearMessage(); return false;}
else return true;
}
function ValidateCancelClick()
{
clearMessage();
if(getElementData('hdfeditslab')>=0)addMessage('Editing Slab Details is not completed!','');
if(getMessage()!=''){
alert(getMessage()); clearMessage(); return false;}
else return true;
}
function TariffSlabValidate(id,addupd){
var idarr=id.split('_');
var baseId=idarr[0]+'_'+idarr[1]+'_'+idarr[2]+'_'+idarr[3]+'_';
clearMessage();
if(addupd=='I')
{
if(trim(document.getElementById(baseId+'FTtxtRate').value)=='' || document.getElementById(baseId+'FTtxtRate').value<1) addMessage("Rate cannot be blank or zero!",'');
if(trim(document.getElementById(baseId+'FTtxtUnit').value)=='' || document.getElementById(baseId+'FTtxtUnit').value<1) addMessage("Unit cannot be blank or zero!",'');
if(trim(document.getElementById(baseId+'FTtxtSlabBasisUnit').value)=='' || document.getElementById(baseId+'FTtxtUnit').value<1) addMessage("Slab Basis Unit cannot be blank or zero!",'');
}
else
{
if(trim(document.getElementById(baseId+'EITtxtRate').value)=='' || document.getElementById(baseId+'EITtxtRate').value<1) addMessage("Rate cannot be blank or zero!",'');
if(trim(document.getElementById(baseId+'EITtxtUnit').value)=='' || document.getElementById(baseId+'EITtxtUnit').value<1) addMessage("Unit cannot be blank or zero!",'');
if(trim(document.getElementById(baseId+'EITtxtSlabBasisUnit').value)=='' || document.getElementById(baseId+'EITtxtUnit').value<1) addMessage("Slab Basis Unit cannot be blank or zero!",'');
}
if(getMessage()!=''){
alert(getMessage());
return false;
}
else return true
}

function getRateTypeAndStartDateBasis()
{  
//   Utility.setValue(PREFIX_MASTER+'acRateType_hdf',Utility.GetActualData(objJSON.TABLE[0].ROW[ROWINDEX].COL[17].DATA));   
//   Utility.setValue(PREFIX_MASTER+'acRateType_ctl00',Utility.GetActualData(objJSON.TABLE[0].ROW[ROWINDEX].COL[19].DATA));  
//   Utility.setValue(PREFIX_MASTER+'acStartDateBasis_hdf',Utility.GetActualData(objJSON.TABLE[0].ROW[ROWINDEX].COL[18].DATA));   
//   Utility.setValue(PREFIX_MASTER+'acStartDateBasis_ctl00',Utility.GetActualData(objJSON.TABLE[0].ROW[ROWINDEX].COL[20].DATA));    
}

function SetSlabBasisHeader()
{
document.getElementById(PREFIX_MASTER+'gvTariffSlabs_ctl01_HTlblSlabBasisUnit').innerHTML= 'Slab Basis ('+Utility.GetActualData(objJSON.TABLE[0].ROW[ROWINDEX].COL[1].DATA)+')';    
document.getElementById(PREFIX_MASTER+'hdfSlabBasisUnit').value ='Slab Basis ('+Utility.GetActualData(objJSON.TABLE[0].ROW[ROWINDEX].COL[1].DATA)+')';    
}

function clientCall(texboxid,hiddenValue,functionname)
{
    eval(functionname+"()")
}


