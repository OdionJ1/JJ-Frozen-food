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

});
