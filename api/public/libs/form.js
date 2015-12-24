$(document).ready(function() {
	
	$('#modal-find-existing').on('hidden.bs.modal', function(){
    	//$(this).find('modal-find-existing')[0].reset();
    	//alert('hi');
    	//$('#modal-find-existing').formValidation('resetForm', true);
    	$('#modal-find-existing option[value=""]').attr('selected','true');
    	$('select[multiple]').empty();
    	//$("#url").val('');
    	$(':text').val('');
    	$("#url").val('');
    	$("#data_url").val('');
		
		
		//$(':url').val('');
		$('select[multiple]').attr('disabled',true);
		$(':text').attr('disabled',true);
		$("#url_ex").attr('disabled',true);
		$("#data_url_ex").attr('disabled',true);
		$("#last_ex").attr('disabled',true);
		$("#definition_ex").attr('disabled',true);
    	//$('#modal-find-existing').find('input:text, input:password, select, textarea').reset();
	});


	var populateCombo = function() {
	  var $indicators = $('#indicators_ex');
	  
	 
	    //request the JSON data and parse into the select element
	    $.getJSON('http://localhost:3000/setup/indicator', function(data){
	 
	      //clear the current content of the select
	      //$indicators.html('');
	      //data.sort(sort_by('Indicator_Name', true, function(a){return a.toUpperCase()}));
	 
	      //iterate over the data and append a select option
	      $.each(data, function(key, val){ 
	        $indicators.append('<option id="' + val.Indicator_ID + '">' + val.Indicator_Name + '</option>');
	        //console.log(val.Indicator_ID)
	      })
	    //console.log(data);
	    });
	};

	populateCombo();

	$( "#indicators_ex" ).change(function() {
	  
	  $('select[multiple]').attr('disabled',false);
	  $('select[multiple]').empty();
	  $(':text').attr('disabled',false);
	  $("#url_ex").attr('disabled',false);
	  $("#data_url_ex").attr('disabled',false);
	  //$("#last_ex").attr('disabled',false);
	  $("#definition_ex").attr('disabled',false);
	  $("#data_file_ex").attr('disabled',false);

	  var categories=[];
	  var subcategories=[];

	  $.getJSON('http://localhost:3000/setup/category', function(data){
	  		$.each(data, function(key, val){ 

	  			if(val.Category_Name.length>0){
	  				categories.push(val.Category_Name);
		        	$("#category_ex").append('<option id="' + val.Category_Name + '">' + val.Category_Name + '</option>');
		        }
		        if(val.Sub_Category_Name.length>0){
	  				subcategories.push(val.Sub_Category_Name);
		        	$("#subcategory_ex").append('<option id="' + val.Sub_Category_Name + '">' + val.Sub_Category_Name + '</option>');
		        }
	  		});
	  });

	  $.getJSON('http://localhost:3000/setup/indicatorbycategory', function(data){

	  	//var catoptions = $("#category_ex option");
	  	//var suboptions = $("#subcategory_ex option");

	  	//debugger;

	  	/*for(var i =0;i<data.length;i++)
	  	{
	  		if($( "#indicators_ex" ).val()==data[i].Indicator_Name){
	  			if(data[i].Category_Name.length>0)
	  			{

	  			}
	  		}
	  	}*/

	  	$.each(data, function(key, val){ 

	  		if($( "#indicators_ex" ).val()==val.Indicator_Name){
	  			if(val.Category_Name.length>0){
	  				var index = categories.indexOf(val.Category_Name);
	  				$("#category_ex option")[index].selected = true;
	  			}
		        	//$("#category_ex").append('<option  selected id="' + val.Category_Name + '">' + val.Category_Name + '</option>');
		        	//$("#category_ex option[value='" + val.Category_Name + "']").attr("selected", true);
		        //if(val.Sub_Category_Name.length>0)
		        	//$("#subcategory_ex").append('<option selected id="' + val.Sub_Category_Name + '">' + val.Sub_Category_Name + '</option>');
		        	//$("#subcategory_ex option[value='" + val.Sub_Category_Name + "']").prop("selected", true);
	    	
	    	if(val.Sub_Category_Name.length>0){
	  				var index = subcategories.indexOf(val.Sub_Category_Name);
	  				$("#subcategory_ex option")[index].selected = true;
	  			}
	  		}
	    	/*else{
	    		if(val.Category_Name.length>0 && catoptions.indexOf(val.Category_Name)==-1)
		        	$("#category_ex").append('<option id="' + val.Category_Name + '">' + val.Category_Name + '</option>');
		        if(val.Sub_Category_Name.length>0 && suboptions.indexOf(val.Sub_Category_Name)==-1)
		        	$("#subcategory_ex").append('<option id="' + val.Sub_Category_Name + '">' + val.Sub_Category_Name + '</option>');
	    	}*/
	    	
	     });
		//$("#category_ex").({'refresh': true});
		//$("#subcategory_ex").({'refresh': true});
	  	//debugger;

	  });

	  var formatDate = function(oldDate){
	  	oldDate = oldDate.split('T');
	  	var newDate = oldDate[0];
	  	return newDate;

	  }

	  $.getJSON('http://localhost:3000/setup/indicator', function(data){

	  	$('select[multiple]').attr('disabled',false);
		$(':text').attr('disabled',false);
		$("#url_ex").attr('disabled',false);
		$("#data_url_ex").attr('disabled',false);
		//$("#last_ex").attr('disabled',false);
		$("#definition_ex").attr('disabled',false);

	  	$.each(data, function(key, val){ 
	  		if($( "#indicators_ex" ).val()==val.Indicator_Name){
		        $("#url_ex").val(val.Indicator_URL);
		    	$("#data_url_ex").val(val.Indicator_Data_URL);
		    	$("#dsource_ex").val(val.Direct_Indicator_Source);
		    	$("#osource_ex").val(val.Original_Indicator_Source);
		    	$("#units_ex").val(val.Units);
		    	$("#frequency_ex").val(val.Update_Cycle);

		    	var formattedDate = formatDate(val.updatedAt);
		    	$("#last_ex").val(formattedDate);
		    	$("#definition_ex").val(val.Indicator_Definition);
	    	}
	    	//console.log(val.Indicator_Data_URL);
	     })

	  });

	});

	

	/* Utilities */
	/*
	If a string matches a string in an array of 
	strings add that element of the string array to an 
	array of matching strings. Once all the strings have been
	compared, return the array of matching strings
	*/
	var searchStringInArray = function (string, stringArray) {
		console.log(stringArray);
    var matchingStringArrayElements = [];
    for (var j=0; j<stringArray.length; j++) {
        if (stringArray[j].match(string)) {
        	console.log('match')
        	matchingStringArrayElements.push(stringArray[j])
        	console.log(stringArray[j]);
        } else {
        	//do nothing
        }
    }
    return matchingStringArrayElements;
	}

	/* 
	Repopulate an area with a new array of data when
	given a new array
	*/
	var populateWithArray = function (area, array, classOfEachArrayElement) {
		console.log('populate with ' + array.join(' | '));
		$(area).html('');
		for (var j=0; j<array.length; j++) {
			console.log(array[j]);
			$(area).append('<span class="' + classOfEachArrayElement + '">' + array[j] + ' </span>')
    }
	}

	/*
	When the user is typing in the possible indicator input
	text element of the modal triage form compare what they
	are typing with the existing list of indicators. If what
	they are typing does not match an existing indicator, ask
	if this is a new indicator and provide a link
	to show the new indicator form. If it does match
	an existing indicator (lowercase and trimmed) show the upload data
	form and that indicator's metadata.
	*/
	$( "#possible-indicator" ).on( "keyup", function() {
	  var indicatorsMatchingPossibleIndicator = [];
	  var currentPossibleIndicator = $( this ).val();
	  
	  /*
	  While there is text in the possible indicator text box 
	  display the link to add a new indicator
		*/
		if (currentPossibleIndicator != "") {
			$('.btn-new-indicator-form').show();
			// console.log('show link to new form');

		  /*
		  For each of the indicators, if what the user is
		  typing matches some of the characters in an indicator, add
		  that indicator to an array of possible matching indicators to 
		  be displayed as suggestions to the user
		  */
		  indicatorsMatchingPossibleIndicator = searchStringInArray(currentPossibleIndicator, dummyDataIndicators.indicators);
		  populateWithArray('#indicator-suggestions', indicatorsMatchingPossibleIndicator, 'suggested-indicator');
		  $( ".suggested-indicator" ).on( "click", function() {
		  	console.log('clucked');
		  	$( '#possible-indicator' ).val($( this ).text());
		  })
		};





		/*
	  If what a user has typed matches an indicator exactly 
	  hide the link to add a new indicator
	  */



	  // if searchStringInArray(currentPossibleIndicator, dummyDataIndicators.indicators) {

	  // }  
	});	
});











