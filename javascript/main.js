
// $(#index).on("orientationchange", function(orientation) {
// show the loading dialog
// $.mobile.pageLoading();
// dynamically load different content depending on orientation
// if (orientation === "landscape"){
// 	$("content").load("index-landscape.html");
// } else if (orientation === "portrait"){
// 	$("content").load("index-portrait.html");
// } else {
//		$("content").load("index-desktop.html");
// }
// })

// Shortcut for $(document).ready(function(){});
// $(function(){
	// Code for site
// });

$(document).ready(function(){
	// Code for site
});

$('#xmlData').on('pageinit', function(){
    var xmlData = function () {
        $.ajax({
            type: "GET",
            url: "data.xml",  // Should be with in XHR folder  xhr/data.xml
            dataType: "xml",
            success: function (xmlData) {
                $(xmlData).find('item').each(function() {
                        var name = $(this).find('compName').text();
                        var category = $(this).find('category').text();
                        var compEmail = $(this).find('compEmail').text();
                        var compWeb = $(this).find('compWeb').text();
                        var payBy = $(this).find('payBy').text();
                        var pastDue = $(this).find('pastDue').text();
                        var budgetPercent = $(this).find('budgetPercent').text();
                        var date = $(this).find('date').text();
                        var notes = $(this).find('notes').text();
                        $(' '+
                            '<div class="contentXML">' +
                                '<ul>' +
                                    '<li> Company Name: ' + compName + '</li>' +
                                    '<li> Category: ' + category + '</li>' +
                                    '<li> Company Email: ' + compEmail + '</li>' +
                                    '<li> Company Website: ' + compWeb + '</li>' +
                                    '<li> PayBy: ' + payBy + '</li>' +
                                    '<li> Past Due: ' + pastDue + '</li>' +
                                    '<li> Budget Percent: ' + budgetPercent + '</li>' +
                                    '<li> Date: ' + date + '</li>' +
                                    '<li> Notes: ' + notes + '</li>' +
                                    '</ul>' +
                            '</div>'
                        ).appendTo("#xmlData");
                    }
                )}
    });

$('#jsonData').on('pageinit', function(){
    var jsonData = function () {
        $.ajax({
            type: "GET",
            url: "data.json",  // should be in xhr folder xhr/data.json
            dataType: "json",
            success: function (result) {

                for ( var i = 0, len = result.bills.length; i < len; i++ ) {
                    var item = result.bills[i];

                    $( ' ' +
                        '<div class="contentJSON">' +
                        '<ul>' +
                        '<li>' + item.compName[0]  + " " + item.compName[1] + '</li>' +
                        '<li>' + item.category[0] + " " + item.category[1] + '</li>' +
                        '<li>' + item.compEmail[0] + " " + item.compEmail[1] + '</li>' +
                        '<li>' + item.compWeb[0] + " " + item.compWeb[1] + '</li>' +
                        '<li>' + item.payBy[0] + " " + item.payBy[1] + '</li>' +
                        '<li>' + item.pastDue[0] + " " + item.pastDue[1] + '</li>' +
                        '<li>' + item.budgetPercent[0] +  " " + item.budgetPercent[1] + '</li>' +
                        '<li>' + item.date[0] + " " + item.date[1] + '</li>' +
                        '<li>' + item.notes[0] + " " + item.notes[1] + '</li>' +
                        '</ul>' +
                        '<hr />' +
                        '</div>'
                    ).appendTo("#jsonData");
                }
            }

        })
    }

$('#csvData').on('pageinit', function(){
    var csvData = function () {
        $.ajax({
            type: "GET",
            url: "data.csv",    // should be in folder xhr     xhr/data.csv
            dataType: "text",
            success: function (result) {
                var lines = result.split("\n");
                var rowCSV = line[0];
                var colCSV = rowCSV.split(",");
                for(var lineNum = 1; lineNum < lines.length; lineNum++){
                    var row = lines[lineNum];
                    var columns = row.split(",");
                    $(' '+
                        '<div class="contentCSV">' +
                        '<ul>' +
                        '<li>' + colCSV[0] + " " + columns[0] + '</li>' +
                        '<li>' + colCSV[1] + " " + columns[1] + '</li>' +
                        '<li>' + colCSV[2] + " " + columns[2] + '</li>' +
                        '<li>' + colCSV[3] + " " + columns[3] + '</li>' +
                        '<li>' + colCSV[4] + " " + columns[4] + '</li>' +
                        '<li>' + colCSV[5] + " " + columns[5] + '</li>' +
                        '<li>' + colCSV[6] + " " + columns[6] + '</li>' +
                        '</ul>' +
                        '</div>'
                    ).appendTo("#dataCSV");

                }

            }

        })
    }

});
		
$('#addBill').on('pageinit', function(){

		var myForm = $('#addBill');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(data);
		}
	});
	
	//any other code needed for addItem page goes here
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	 .each(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
};

var getData = function(){
	$("#addBill").empty();
		toggleControls("on");
		if(localStorage.length === 0){
			alert("There is no Local Storage so default data was added.");
			autoFillData();
		}
		var makeDiv = $('<div>');
		makeDiv.attr("id", "items");
		var makeList = $('<ul>');
		makeDiv.append(makeList);
		document.body.appendChild(makeDiv);
		$('#bills').append(makeDiv);
		$('#items').show();
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeli = $('<li>');
			var linksLi = $('<li>');
			makeList.append(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = $('<ul>');
			makeli.append(makeSubList);
			getImage(obj.category[1], makeSubList);
			for(var n in obj){
				var makeSubli = $('<li>');
				makeSubList.append(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.text(optSubText);
				makeSubList.append(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi);
		}

};


var storeData = function(data){
	if(!key){
			var id			= Math.floor(Math.random()*100000001);
		}else{
			id = key;
		}
		getSelectedRadio();
		getCheckboxValue();
		
		var item					= {};
			item.compName			= ["Company Name: ", $('#compName').val()];
			item.category			= ["Category: ", $('#category').val()];
			item.compEmail		= ["Company Email: ", $('#compEmail').val()];
			item.compWeb		= ["Company Website: ", $('#compWeb').val()];
			item.payBy			= ["PayBy: ", payByValue];
			item.pastDue			= ["Past Due: ", pastDue];
			item.budgetPercent		=["Budget Percent: " , $('#budgetPercent').value];
			item.date			= ["Date Added: ", $('#date').value];
			item.notes		= ["Notes: ", $('#notes').val()];
		
		localStorage.setItem(id, JSON.stringify(item));
		alert("Bill Saved!");
		save.off("click");
		save.on("click", storeData);
		window.location.reload();
	
	};
	
	var getSelectedRadio = function(){
	var radios = function (){
		$('input:radio[name="addToFav"]:checked').val();
		return($('input:radio[name="addToFav"]:checked').val());

};

};

var	deleteItem = function (){
	var ask = confirm("Are you sure you want to delete this bill?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Bill was deleted.");
			window.location.reload();
		}else{
			alert("Bill was not deleted.");
		}		
};



var clearLocal = function(){
	if(localStorage.length === 0){
			alert("No data to clear.");
		}else{
			localStorage.clear();
			alert("All Bills are deleted");
			window.location.reload();
			return false;
		}
	}
	
	var pastDueValue,
		pastDueValue = "No",
		errMsg = ge('errors');
	
	makeCats();

	var clearLink = ge('clear');
	clearLink.addEventListener("click", clearLocal);
	var save = ge('submit');
	save.addEventListener("click", validate);

};


// Taylor Eisman
// ASD 01/13
// Project 2

// $(function(){  <-- Shortcut
//};)
// $(document).ready(function(){
	
//	$('#') // find element in page  *called factory*

// };)

//var parseBillForm = function(data) {
//uses form data here;

//console.log(data);
//};
// used $ factory and changed .bind to .on
//$(document).on('pageinit', function(){
// used factory
//var billForm = $('#addBillForm');
//
//	billForm.validate({
//		invalidHandler: function(form, validator){
//		billFormErrors.click();
//		var html = '';
//		for(var key in validator.submitted){
//			// used factory
//			var label = $('label[for^="'+ key +'"]').not('[generated]');
//			var legend = label.closest('fieldset').find('.ui-controlgroup-label');
//			var fieldName = legend.length ? legend.text() : label.text();
//			html += '<li>'+ fieldName +'</li>';
//		};
//		//used factory
//		$("recordBillErrors ul").html(html);
//		},
//		submitHandler: function(){
//			var data = billForm.serializeArray();
//			parseBillForm(data);
//		}
//	});
//});
//
//	function makeCats(){
//		var formTag = document.getElementsByTagName("form"),
//			// used factory
//			selectLi = $('select'),
//			makeSelect = document.createElement('select');
//			makeSelect.attr("id", "categories");         
//			
//		for(var i=0, j=billCategories.length; i<j; i++){
//			var makeOption = document.createElement('option');
//			var optText = billCategories[i];
//			makeOption.setAttribute("value", optText);
//			makeOption.innerHTML = optText;
//			makeSelect.appendChild(makeOption);
//		}
//		selectLi.append(makeSelect);
//	}
//	
//		function storeData(key){
//		if(!key){
//			var id			= Math.floor(Math.random()*100000001);
//		}else{
//			id = key;
//		}
//		getSelectedRadio();
//		getCheckboxValue();
//		// used factory
//		var item					= {};
//			item.category			= ["Category: ", $('#categories').val()];
//			item.compName			= ["Company Name: ", $('#compName').val()];
//			item.compEmail			= ["Company Email: ", $('#compEmail').val()];
//			item.compWeb			= ["Company Website: ", $('#compWeb').val()];
//			item.payBy				= ["Pay By: ", payByValue];
//			item.pastDue			= ["Past Due: ", pastDueValue];
//			item.budgetPercent		= ["Percent of Budget: ", $('#budgetPercent').value];
//			item.date				= ["Date Added: ", $('#date').value];
//			item.notes				= ["Notes: ", $('#notes').val()];
//		
//		localStorage.setItem(id, JSON.stringify(item));
//		alert("Bill Saved!");
//		save.off("click");
//		save.on("click", storeData);
//		window.location.reload();
//	
//	};
	
//	var getSelectedRadio = function(){
//	var radios = function (){
//		// used factory
//		$('input:radio[name="pastDue"]:checked').val();
//		return($('input:radio[name="pastDue"]:checked').val());
//
//};
//};

// used factory within getData function
//	function getData(){
//		$("#addBill").empty();
//		toggleControls("on");
//		if(localStorage.length === 0){
//			alert("There is no Local Storage so default data was added.");
//			autoFillData();
//		}
//		var makeDiv = $('<div>');
//		makeDiv.attr("id", "items");
//		var makeList = $('<ul>');
//		makeDiv.append(makeList);
//		document.body.appendChild(makeDiv);
//		$('#bills').append(makeDiv);
//		$('#items').show();
//		for(var i=0, len=localStorage.length; i<len;i++){
//			var makeli = $('<li>');
//			var linksLi = $('<li>');
//			makeList.append(makeli);
//			var key = localStorage.key(i);
//			var value = localStorage.getItem(key);
//			var obj = JSON.parse(value);
//			var makeSubList = $('<ul>');
//			makeli.append(makeSubList);
//			getImage(obj.category[1], makeSubList);
//			for(var n in obj){
//				var makeSubli = $('<li>');
//				makeSubList.append(makeSubli);
//				var optSubText = obj[n][0]+" "+obj[n][1];
//				makeSubli.text(optSubText);
//				makeSubList.append(linksLi);
//			}
//			makeItemLinks(localStorage.key(i), linksLi);
//		}
//	}

//	function autoFillData(){
//		for(var n in json){
//			var id = Math.floor(Math.random()*100000001);
//			localStorage.setItem(id, JSON.stringify(json[n]));
//		}
//	}
// used factory in toggleControls function 
// not sure if need this function
//	function toggleControls(n){
//			switch(n){
//				case "on":
//					$('#billDetails').hide();
//					$('#clear').show();
//					$('$displayLink').hide();
//					$('#addNew').show();
//					break;
//				case "off":
//					$('#billDetails').show();
//					$('#clear').show();
//					$('#displayLink').show();
//					$('#addNew').hide();
//					$('#items').hide();
//					break;
//				default:
//					return false;
//		}
//	}
// used factory in makeItemLinks function
//	function makeItemLinks(key, linksLi){
//		var editLink = $('<a>');
//		editLink.attr("href", "#");
//		editLink.attr("key", key);
//		var editText = "Edit Bill";
//		editLink.on("click", editItem);
//		editLink.text(editText);
//		linksLi.append(editLink);
//		
//		var breakTag = $('<br>');
//		linksLi.append(breakTag);
//		
//		var deleteLink = $('<a>');
//		deleteLink.attr("href", "#");
//		deleteLink.attr("key", key);
//		var deleteText = "Delete Bill";
//		deleteLink.on("click", deleteItem);
//		deleteLink.text(deleteText);
//		linksLi.append(deleteLink);
//	}
//
// editItem used factory although needs work!
//function editItem(){
//		var thisKey = $(this).attr("key");
//		var value = localStorage.getItem($(this).attr("key"));
//		var item = JSON.parse(value);
//		
//		toggleControls("off");
//		
//		$('#categories').val(item.category[1]);
//		$('#compName').val(item.compName[1]);
//		$('compEmail').val(item.compEmail[1]);
//		$('#compWeb').val(item.compWeb[1]);
//		var radios = $('input:radio[name="pastDue"]:checked').val();
//
//		/* var radios = document.forms[0].payBy;
//		for(var i=0; i<radios.length; i++){
//			if(radios[i].value == "Internet" && item.payBy[1] == "Internet"){
//				radios[i].setAttribute("checked", "checked");
//			}else if(radios[i].value == "Mail" && item.payBy[1] == "Mail"){
/*				radios[i].setAttribute("checked", "checked");
			}
		}
		if(item.pastDue[1] == "Yes"){
			ge('pastDue').setAttribute("checked", "checked");
		}
		*/
/*		$('budgetPercent').val(item.budgetPercent[1]);
		$('date').val(item.date[1]);
		$('notes').val(item.notes[1]);
		
		save.off("click", storeData);
		$('#submit').attr("value", "Edit Bill");
		var editSubmit = $('#submit');
		
		save.on("click", function(){
			storeData(thisKey);
		});
		editSubmit.attr("click", this.key); 	
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

/*
window.addEventListener("DOMContentLoaded", function(){


	function ge(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	


	function getCheckboxValue(){
		if(ge('pastDue').checked){
			pastDueValue = ge('pastDue').value;
		}else{
			pastDueValue = "No"
		}
	}
	
	
	
	/*function getImage(catName, makeSubList){
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImage = document.createElement('img');
		var setSrc = newImage.setAttribute("src", "images/"+ catName + ".png");
		imageLi.appendChild(newImage);
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
	

*/
/*
// Taylor Eisman
// ASD 01/13
// Project 1

// $(function(){  <-- Shortcut
//};)
// $(document).ready(function(){
	
//	$('#') // find element in page  *called factory* 

// };)

var parseBillForm = function(data) {
//uses form data here;

//console.log(data);
};

$(document).bind('pageinit', function(){

var billForm = $('#AddBillForm');
//$
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
	
		function storeData(key){
		if(!key){
			var id			= Math.floor(Math.random()*100000001);
		}else{
			id = key;
		}
		getSelectedRadio();
		getCheckboxValue();
		// $w
		var item					= {};
			item.category			= ["Category: ", $('#categories').val()];
			item.compName			= ["Company Name: ", $('#compName').val()];
			item.compEmail			= ["Company Email: ", $('#compEmail').val()];
			item.compWeb			= ["Company Website: ", $('#compWeb').val()];
			item.payBy				= ["Pay By: ", payByValue];
			item.pastDue			= ["Past Due: ", pastDueValue];
			item.budgetPercent		= ["Percent of Budget: ", $('#budgetPercent').value];
			item.date				= ["Date Added: ", $('#date').value];
			item.notes				= ["Notes: ", $('#notes').val()];
		
		localStorage.setItem(id, JSON.stringify(item));
		alert("Bill Saved!");
		save.off("click");
		save.on("click", storeData);
		window.location.reload();
	
	};
	
	var getSelectedRadio = function(){
	var radios = function (){
		$('input:radio[name="pastDue"]:checked').val();
		return($('input:radio[name="pastDue"]:checked').val());

};
};
//$

	function getData(){
		$("#addBill").empty();
		toggleControls("on");
		if(localStorage.length === 0){
			alert("There is no Local Storage so default data was added.");
			autoFillData();
		}
		var makeDiv = $('<div>');
		makeDiv.attr("id", "items");
		var makeList = $('<ul>');
		makeDiv.append(makeList);
		document.body.appendChild(makeDiv);
		$('#bills').append(makeDiv);
		$('#items').show();
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeli = $('<li>');
			var linksLi = $('<li>');
			makeList.append(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = $('<ul>');
			makeli.append(makeSubList);
			getImage(obj.category[1], makeSubList);
			for(var n in obj){
				var makeSubli = $('<li>');
				makeSubList.append(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.text(optSubText);
				makeSubList.append(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi);
		}
	}

	function autoFillData(){
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
// $
	function toggleControls(n){
			switch(n){
				case "on":
					$('#billDetails').hide();
					$('#clear').show();
					$('$displayLink').hide();
					$('#addNew').show();
					break;
				case "off":
					$('#billDetails').show();
					$('#clear').show();
					$('#displayLink').show();
					$('#addNew').hide();
					$('#items').hide();
					break;
				default:
					return false;
		}
	}
// $
	function makeItemLinks(key, linksLi){
		var editLink = $('<a>');
		editLink.attr("href", "#");
		editLink.attr("key", key);
		var editText = "Edit Bill";
		editLink.on("click", editItem);
		editLink.text(editText);
		linksLi.append(editLink);
		
		var breakTag = $('<br>');
		linksLi.append(breakTag);
		
		var deleteLink = $('<a>');
		deleteLink.attr("href", "#");
		deleteLink.attr("key", key);
		var deleteText = "Delete Bill";
		deleteLink.on("click", deleteItem);
		deleteLink.text(deleteText);
		linksLi.append(deleteLink);
	}


function editItem(){
		var thisKey = $(this).attr("key");
		var value = localStorage.getItem($(this).attr("key"));
		var item = JSON.parse(value);
		
		toggleControls("off");
//$		
		$('#categories').val(item.category[1]);
		$('#compName').val(item.compName[1]);
		$('compEmail').val(item.compEmail[1]);
		$('#compWeb').val(item.compWeb[1]);
		var radios = $('input:radio[name="pastDue"]:checked').val();

		/* var radios = document.forms[0].payBy;
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
		*/
	/*
		$('budgetPercent').val(item.budgetPercent[1]);
		$('date').val(item.date[1]);
		$('notes').val(item.notes[1]);
//$		
		save.off("click", storeData);
		$('#submit').attr("value", "Edit Bill");
		var editSubmit = $('#submit');
		
		save.on("click", function(){
			storeData(thisKey);
		});
		editSubmit.attr("click", this.key);	
	}





/*
window.addEventListener("DOMContentLoaded", function(){


	function ge(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	


	function getCheckboxValue(){
		if(ge('pastDue').checked){
			pastDueValue = ge('pastDue').value;
		}else{
			pastDueValue = "No"
		}
	}
	
	
	
	/*function getImage(catName, makeSubList){
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImage = document.createElement('img');
		var setSrc = newImage.setAttribute("src", "images/"+ catName + ".png");
		imageLi.appendChild(newImage);
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
