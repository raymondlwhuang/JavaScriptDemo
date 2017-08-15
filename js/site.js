var MyDemo = MyDemo || {};
MyDemo.common = function(e) {
    "use strict";
	function getRate(indicator) {
		var base_list = document.getElementById('base_list'+indicator);
		var target_list = document.getElementById('target_list'+indicator);
		var base=base_list.options[base_list.selectedIndex].text;
		var target = target_list.options[target_list.selectedIndex].text;
		if(base!=target) {
			  var xhttp = new XMLHttpRequest();
			  xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
				  var obj = JSON.parse(this.responseText);
					for (var key in obj) {
					  if (obj.hasOwnProperty(key) && key=='rates') {

						  alert('Currency exchange rate is : '+ obj[key][target]);
					  }
					}		  

				}
			  };
			  xhttp.open("GET", "http://api.fixer.io/latest?base="+base+"&symbols="+target, true);
			  xhttp.send();				
		}
	}
	function getResult(indicator) {
		var base_list = document.getElementById('base_list'+indicator),
		target_list = document.getElementById('target_list'+indicator);
	  var base=base_list.options[base_list.selectedIndex].text;
	  var target = target_list.options[target_list.selectedIndex].text;
	  if(base!=target) {
		  var xhttp = new XMLHttpRequest();
		  xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
			  var obj = JSON.parse(this.responseText);
				for (var key in obj) {
				  if (obj.hasOwnProperty(key) && key=='rates') {

					  document.getElementById("pair_targ_input"+indicator).value = (document.getElementById("pair_base_input"+indicator).value * obj[key][target]).toFixed(2);
				  }
				}		  

			}
		  };
		  xhttp.open("GET", "http://api.fixer.io/latest?base="+base+"&symbols="+target, true);
		  xhttp.send();		  
	  }
	  else {
		document.getElementById("pair_targ_input"+indicator).value = document.getElementById("pair_base_input"+indicator).value;
	  }
	}
	function validate(s) {
		var rgx = /^[0-9]*\.?[0-9]*$/;
		return s.match(rgx);
	}	
	var widgets = document.getElementsByClassName("required-widget");
	var myContainer;
	for(var i = 0; i < widgets.length; i++)
	{
		myContainer = widgets.item(i);	
		createWidget(myContainer);
	}
	function createWidget(myContainer) {
		var myContainer;
		var option;
		var array = ["CAD","USD","EUR"];
		var thisElement = document.createElement("h2");
		var t = document.createTextNode("Currency converter");
		
			thisElement.appendChild(t);
			thisElement.className = "mtb-10";
			myContainer.appendChild(thisElement); 
			thisElement = document.createElement("h3");
			t = document.createTextNode("Type in amount and select currency");
			thisElement.appendChild(t);
			thisElement.className = "mb-10";
			myContainer.appendChild(thisElement); 
			thisElement = document.createElement("input");
			thisElement.type="text";
			thisElement.value= "";
			thisElement.id="pair_base_input"+i;
			thisElement.setAttribute("placeholder", "0.00");
			thisElement.className = "pair_input";
			myContainer.appendChild(thisElement);


			//Create and append select list
			thisElement = document.createElement("select");
			thisElement.id ="base_list"+i;
			thisElement.className = "pair_list";

			//Create and append the options
			for (var j = 0; j < array.length; j++) {
				option = document.createElement("option");
				option.value = array[j];
				option.text = array[j];
				thisElement.appendChild(option);
			}
			myContainer.appendChild(thisElement);

			thisElement = document.createElement("input");
			thisElement.type="text";
			thisElement.value= "";
			thisElement.id="pair_targ_input"+i;
			thisElement.setAttribute("placeholder", "0.00");
			thisElement.className = "pair_input";
			myContainer.appendChild(thisElement);


			//Create and append select list
			thisElement = document.createElement("select");
			thisElement.id ="target_list"+i;
			thisElement.className = "pair_list";

			//Create and append the options
			for (var k = 0; k < array.length; k++) {
				option = document.createElement("option");
				option.value = array[k];
				option.text = array[k];
				if(k==1) {
					option.setAttribute("selected", 1)
				}
				thisElement.appendChild(option);
			}
			myContainer.appendChild(thisElement);
			thisElement = document.createElement("a");
			thisElement.className = "Disclaimer";
			thisElement.id = "Disclaimer"+i;
			t = document.createTextNode("Disclaimer");
			thisElement.appendChild(t);
			myContainer.appendChild(thisElement);
			
	}	
	var required = document.querySelectorAll('*[id^="pair_base_input"]');
	for(var i = 0; i < required.length; i++)
	{
		var input = document.getElementById("pair_base_input"+i);
		var base_list = document.getElementById("base_list"+i);
		var target_list = document.getElementById("target_list"+i);
		var Disclaimer = document.getElementById("Disclaimer"+i);
		
	   input.addEventListener('blur', (function(i, input) {
		 return function() {
		   getResult(i);
		 }
	   })(i, input));
	   input.addEventListener('keyup', (function(e) {
			if (!validate(this.value)) {
				this.value = '';
				return false;
			}
	}));	   
	   base_list.addEventListener('change', (function(i, base_list) {
		 return function() {
		   getResult(i);
		 }
	   })(i, base_list)); 
	   Disclaimer.addEventListener('click', (function(i, Disclaimer) {
		 return function() {
		   getRate(i);
		 }
	   })(i, Disclaimer)); 	   
	   target_list.addEventListener('change', (function(i, target_list) {
		 return function() {
		   getResult(i);
		 }
	   })(i, target_list));    

	}

}();



