	$employees = $('tbody tr');
	$dataHeader = $('thead tr');
    $tableBody = $('tbody');
    $resourcesModal = $('#exampleModal');
	//$filteredEmployees = $( "ul").not(':first').filter(function(){ return $(this).css('display','block'); });


	var orderResults = function(attirbuteNum, order){
		var aKeys = new Array();
		    first = $('thead tr').each(function(){ aKeys.push($(this).text()) })
		    aEmployees = [];
		    aAttributes = [];

		$filteredEmployees = $employees; //$employees.filter(function(){ return $(this).is(':visible'); });

		//console.log($filteredEmployees);
	
		$filteredEmployees.each(function(ind){
			$(this).children().each(function(inde){
				aAttributes.push($(this).text()); 
			});

			aEmployees[ind] = aAttributes; 
			aEmployees[ind]['visible'] = $(this).is(':visible'); 
			aAttributes = [];	
		});

		console.log(aEmployees);

		aEmployees.sort(function (a,b) {

			if (order == 'desc'){
			    if (a[attirbuteNum] < b[attirbuteNum]) return  1;
			    if (a[attirbuteNum] > b[attirbuteNum]) return -1;
			}
			else {
			    if (a[attirbuteNum] > b[attirbuteNum]) return  1;
			    if (a[attirbuteNum] < b[attirbuteNum]) return -1;
			}

		    return 0;
		});

		return aEmployees;
	}


	var showResults = function(aOrderedResults){
		$employees.remove();
		var html = "";

		$.each(aOrderedResults, function(arrind){
			var classVisible = (aOrderedResults[arrind]['visible'])? '' : 'hide';
			console.log(classVisible);

			html += "<tr class='"+ classVisible +"' >";
			$.each($(this),function(ind){
				html += "<td >"+aOrderedResults[arrind][ind]+"</li>";
			});
			html += "</tr>";
		});

		$($tableBody).html(html);
		$employees = $('tbody tr');
	}

	var searchResults = function(searchText){
	 		$employees.removeClass().addClass('hide');
	 		$employees.each(function(){
	 			$currEmployee = $(this);
	 			$(this).children().each(function(){
	 				if ( $(this).text().toLowerCase().indexOf(searchText) != -1)
	 				{
	 					$currEmployee.removeClass('hide');
	 					return false;
	 				}
	 			});
	 		});
	}

	var getOrder = function(thObject){
	 	var lastSort = thObject.parent().data('sort');
	 		aArrows = { 'asc': '&#8593', 'desc': '&#8595' };

	 	if (lastSort == thObject.index())
            thObject.parent().toggleClass('desc asc');
	 	else
            thObject.parent().removeClass().addClass('desc');

        thObject.parent().data('sort',thObject.index());

		return thObject.parent().attr('class');

	}



	 $(document).on('keyup', '#search',function(e){
	 		var searchText = $(this).val().toLowerCase();
            console.log(searchText);
	 		searchResults(searchText);
	 	});

     $(document).on('click','tbody tr',function(e){
         // Initializes the bootstrap modal
         $resourcesModal.modal('show');
         $resourcesModal.find('.modal-body').html(aReasons[$(this).data('id')]);
     });

	 $(document).on('click','thead tr th', function(){
	 	var aOrderedResults = "";
	 		order = getOrder($(this));
		    console.log(order);

	 	var aOrderedResults = orderResults($(this).index(),order);

	 	if ($.isArray(aOrderedResults)){
	 		showResults(aOrderedResults);
	 		$(this).siblings().addBack().find("span").remove();
			$(this).html($(this).text() + '<span>' + aArrows[order] + '</span>');	
	 	}
	 });

	 $(document).on('click','div[calendar]', function(){

	 	$('#datepicker').show();	 	
	 	$('#datepicker').datepicker({
	 		dateFormat : "yy-mm-dd",
	 		onSelect: function(dateText,inst) {
	 			searchResults(dateText);
	 			$('#search').val(dateText);
	 			$('#datepicker').hide();
	 		},
	 		prevText: "",
	 		nextText: "",
	 		});
	 });


	$(document).mouseup(function (e)
	{
	    var container = $("#datepicker");

	    if (!container.is(e.target) // if the target of the click isn't the container...
	        && container.has(e.target).length === 0) // ... nor a descendant of the container
	    {
	        container.hide();
	    }
	});