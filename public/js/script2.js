$(document).ready(function(){

	$('.btn-createModal').click(function(event){
		event.preventDefault();

		$('#quoteModal').modal('show');
	});

    $('#category_form_area').hide();

	$('#add_Category').click(function(){
		$('#category_form_area').slideToggle(200);
	})

	$('#stock_form_area').hide();

	$('#add_stock').click(function(){
		$('#stock_form_area').slideToggle(300);
	})

	$('.btn-create').click(function(event){
		event.preventDefault()
	})

	if(document.URL.indexOf('http://localhost:9090/stockpage/5eb6a7694c297b37882de34c') >= 0){
		document.querySelector('.catname').textContent = "Chicken"
	}

	if(document.URL.indexOf('http://localhost:9090/stockpage/5eb6a8b8696b302574eec034') >= 0){
		let catname = document.querySelector('.catname').textContent = "Turkey"
	}

	if(document.URL.indexOf('http://localhost:9090/stockpage/5eb6a8c5696b302574eec035') >= 0){
		let catname = document.querySelector('.catname').textContent = "Fish"
	}

	if(document.URL.indexOf('http://localhost:9090/stockpage/5eb6a8d1696b302574eec036') >= 0){
		let catname = document.querySelector('.catname').textContent = "Food Items"
	}

});
