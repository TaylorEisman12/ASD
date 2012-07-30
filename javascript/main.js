// Taylor Eisman
// MIU 06/12
// Project 3
// Gold App

window.addEventListener("DOMContentLoaded", function(){

var parseBillForm = function(data){
	function BPupdate(e){
	document.getElementById('BPValue').innerHTML = e;	
}

	function ge(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	function makeCats(){
		var formTag = document.getElementsByTagName("form"),
			selectLi = ge('select'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "categories");         
			
		for(var i=0, j=billCategories.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = billCategories[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	
	function getSelectedRadio(){
		var radios = document.forms[0].payBy;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
			payByValue = radios[i].value;
			}
		}
	}
	
	function getCheckboxValue(){
		if(ge('pastDue').checked){
			pastDueValue = ge('pastDue').value;
		}else{
			pastDueValue = "No"
		}
	}
	
	function toggleControls(n){
		switch(n){
			case "on":
				ge('billDetails').style.display = "none";
				ge('clear').style.display = "inline";
				ge('displayLink').style.display = "none";
				ge('addNew').style.display = "inline";
				break;
			case "off":
				ge('billDetails').style.display = "block";
				ge('clear').style.display = "inline";
				ge('displayLink').style.display = "inline";
				ge('addNew').style.display = "none";
				ge('items').style.display = "none";
				break;
			default:
				return false;
		}
	}

	function storeData(key){
		if(!key){
			var id			= Math.floor(Math.random()*100000001);
		}else{
			id = key;
		}
		getSelectedRadio();
		getCheckboxValue();
		
		var item					= {};
			item.category			= ["Category: ", ge('categories').value];
			item.compName			= ["Company Name: ", ge('compName').value];
			item.compEmail			= ["Company Email: ", ge('compEmail').value];
			item.compWeb			= ["Company Website: ", ge('compWeb').value];
			item.payBy				= ["Pay By: ", payByValue];
			item.pastDue			= ["Past Due: ", pastDueValue];
			item.budgetPercent		= ["Percent of Budget: ", ge('budgetPercent').value];
			item.date				= ["Date Added: ", ge('date').value];
			item.notes				= ["Notes: ", ge('notes').value];
		
		localStorage.setItem(id, JSON.stringify(item));
		alert("Bill Saved!");
	
	}

	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("There is no Local Storage so default data was added.");
			autoFillData();
		}
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		ge('items').style.display = "display";
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeli = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			getImage(obj.category[1], makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi);
		}
	}
	
	/*function getImage(catName, makeSubList){
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImage = document.createElement('img');
		var setSrc = newImage.setAttribute("src", "images/"+ catName + ".png");
		imageLi.appendChild(newImage);
	}
	*/
	function autoFillData(){
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
	function makeItemLinks(key, linksLi){
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Bill";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Bill";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}

	function editItem(){
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		toggleControls("off");
		
		ge('categories').value = item.category[1];
		ge('compName').value = item.compName[1];
		ge('compEmail').value = item.compEmail[1];
		ge('compWeb').value = item.compWeb[1];
		var radios = document.forms[0].payBy;
		for(var i=0; i<radios.length; i++){
			if(radios[i].value == "Internet" && item.payBy[1] == "Internet"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Mail" && item.payBy[1] == "Mail"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		if(item.pastDue[1] == "Yes"){
			ge('pastDue').setAttribute("checked", "checked");
		}
		ge('budgetPercent').value = item.budgetPercent[1];
		ge('date').value = item.date[1];
		ge('notes').value = item.notes[1];
		
		save.removeEventListener("click", storeData);
		ge('submit').value = "Edit Bill";
		var editSubmit = ge('submit');
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
		
	}

	function deleteItem(){
		var ask = confirm("Are you sure you want to delete this bill?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Bill was deleted.");
			window.location.reload();
		}else{
			alert("Bill was not deleted.");
		}
	}
	
	function clearLocal(){
		if(localStorage.length === 0){
			alert("No data to clear.");
		}else{
			localStorage.clear();
			alert("All Bills are deleted");
			window.location.reload();
			return false;
		}
	}
	

	function validate(e){
		var getCategory = ge('categories');
		var getCompName = ge('compName');
		var getCompEmail = ge('compEmail');
		
		errMsg.innerHTML = "";
		getCategory.style.border = "1px solid black";
		getCompName.style.border = "1px solid black";
		getCompEmail.style.border = "1px solid black";
		
		var messageAry = [];
		
		if(getCategory.value === "-- Category --"){
			var categoryError = "Please choose a category.";
			getCategory.style.border = "1px solid red";
			messageAry.push(categoryError);
		}
		
		if(getCompName.value === ""){
			var compNameError = "Please enter a Company Name.";
			getCompName.style.border = "1px solid red";
			messageAry.push(compNameError);
		}
		
		var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(!(re.exec(getCompEmail.value))){
			var compEmailError = "Please enter a valid email address.";
			getCompEmail.style.border = "1px solid red";
			messageAry.push(compEmailError);
		}
		
		if(messageAry.length >= 1){
			for(var i=0, j=messageAry.length; i < j; i++){
				var txt = document.createElement('li');
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		}else{
			storeData(this.key);
		}
	}
	
	var billCategories = ["-- Category --", "Cell", "Car", "Rent", "Cable"],
		payByValue,
		pastDueValue = "No",
		errMsg = ge('errors');
	
	makeCats();
	
	var displayLink = ge('displayLink');	
	displayLink.addEventListener("click", getData);
	var clearLink = ge('clear');
	clearLink.addEventListener("click", clearLocal);
	var save = ge('submit');
	save.addEventListener("click", validate);

});
};

$(document).bind('pageinit', function(){
	var billForm = $('#addBillForm'),
	billFormErrors = $('billFormErrors')
	;
	billForm.validate({
		invalidHandler: function(form, validator){
		billFormErrors.click();
		var html = '';
		for(var key in validator.submitted){
			var label = $('label[for^="'+ key +'"]').not('[generated]');
			var legend = label.closest('fieldset').find('.ui-controlgroup-label');
			var fieldName = legend.length ? legend.text() : label.text();
			html += '<li>'+ fieldName +'</li>';
		};
		$("recordBillErrors ul").html(html);
		},
		submitHandler: function(){
			var data = billForm.serializeArray();
			parseBillForm(data);
		}
	});
});

/*function BPupdate(e){
	document.getElementById('BPValue').innerHTML = e;	
}

window.addEventListener("DOMContentLoaded", function(){

	function ge(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	function makeCats(){
		var formTag = document.getElementsByTagName("form"),
			selectLi = ge('select'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "categories");         
			
		for(var i=0, j=billCategories.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = billCategories[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	
	function getSelectedRadio(){
		var radios = document.forms[0].payBy;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
			payByValue = radios[i].value;
			}
		}
	}
	
	function getCheckboxValue(){
		if(ge('pastDue').checked){
			pastDueValue = ge('pastDue').value;
		}else{
			pastDueValue = "No"
		}
	}
	
	function toggleControls(n){
		switch(n){
			case "on":
				ge('billDetails').style.display = "none";
				ge('clear').style.display = "inline";
				ge('displayLink').style.display = "none";
				ge('addNew').style.display = "inline";
				break;
			case "off":
				ge('billDetails').style.display = "block";
				ge('clear').style.display = "inline";
				ge('displayLink').style.display = "inline";
				ge('addNew').style.display = "none";
				ge('items').style.display = "none";
				break;
			default:
				return false;
		}
	}

	function storeData(key){
		if(!key){
			var id			= Math.floor(Math.random()*100000001);
		}else{
			id = key;
		}
		getSelectedRadio();
		getCheckboxValue();
		
		var item					= {};
			item.category			= ["Category: ", ge('categories').value];
			item.compName			= ["Company Name: ", ge('compName').value];
			item.compEmail			= ["Company Email: ", ge('compEmail').value];
			item.compWeb			= ["Company Website: ", ge('compWeb').value];
			item.payBy				= ["Pay By: ", payByValue];
			item.pastDue			= ["Past Due: ", pastDueValue];
			item.budgetPercent		= ["Percent of Budget: ", ge('budgetPercent').value];
			item.date				= ["Date Added: ", ge('date').value];
			item.notes				= ["Notes: ", ge('notes').value];
		
		localStorage.setItem(id, JSON.stringify(item));
		alert("Bill Saved!");
	
	}

	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("There is no Local Storage so default data was added.");
			autoFillData();
		}
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		ge('items').style.display = "display";
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeli = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			getImage(obj.category[1], makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi);
		}
	}
	
	function getImage(catName, makeSubList){
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImage = document.createElement('img');
		var setSrc = newImage.setAttribute("src", "images/"+ catName + ".png");
		imageLi.appendChild(newImage);
	}
	
	function autoFillData(){
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
	function makeItemLinks(key, linksLi){
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Bill";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Bill";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}

	function editItem(){
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		toggleControls("off");
		
		ge('categories').value = item.category[1];
		ge('compName').value = item.compName[1];
		ge('compEmail').value = item.compEmail[1];
		ge('compWeb').value = item.compWeb[1];
		var radios = document.forms[0].payBy;
		for(var i=0; i<radios.length; i++){
			if(radios[i].value == "Internet" && item.payBy[1] == "Internet"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Mail" && item.payBy[1] == "Mail"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		if(item.pastDue[1] == "Yes"){
			ge('pastDue').setAttribute("checked", "checked");
		}
		ge('budgetPercent').value = item.budgetPercent[1];
		ge('date').value = item.date[1];
		ge('notes').value = item.notes[1];
		
		save.removeEventListener("click", storeData);
		ge('submit').value = "Edit Bill";
		var editSubmit = ge('submit');
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
		
	}

	function deleteItem(){
		var ask = confirm("Are you sure you want to delete this bill?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Bill was deleted.");
			window.location.reload();
		}else{
			alert("Bill was not deleted.");
		}
	}
	
	function clearLocal(){
		if(localStorage.length === 0){
			alert("No data to clear.");
		}else{
			localStorage.clear();
			alert("All Bills are deleted");
			window.location.reload();
			return false;
		}
	}
	

	function validate(e){
		var getCategory = ge('categories');
		var getCompName = ge('compName');
		var getCompEmail = ge('compEmail');
		
		errMsg.innerHTML = "";
		getCategory.style.border = "1px solid black";
		getCompName.style.border = "1px solid black";
		getCompEmail.style.border = "1px solid black";
		
		var messageAry = [];
		
		if(getCategory.value === "-- Category --"){
			var categoryError = "Please choose a category.";
			getCategory.style.border = "1px solid red";
			messageAry.push(categoryError);
		}
		
		if(getCompName.value === ""){
			var compNameError = "Please enter a Company Name.";
			getCompName.style.border = "1px solid red";
			messageAry.push(compNameError);
		}
		
		var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(!(re.exec(getCompEmail.value))){
			var compEmailError = "Please enter a valid email address.";
			getCompEmail.style.border = "1px solid red";
			messageAry.push(compEmailError);
		}
		
		if(messageAry.length >= 1){
			for(var i=0, j=messageAry.length; i < j; i++){
				var txt = document.createElement('li');
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		}else{
			storeData(this.key);
		}
	}
	
	var billCategories = ["-- Category --", "Cell", "Car", "Rent", "Cable"],
		payByValue,
		pastDueValue = "No",
		errMsg = ge('errors');
	
	makeCats();
	
	var displayLink = ge('displayLink');	
	displayLink.addEventListener("click", getData);
	var clearLink = ge('clear');
	clearLink.addEventListener("click", clearLocal);
	var save = ge('submit');
	save.addEventListener("click", validate);

});
*/
