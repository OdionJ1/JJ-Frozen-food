$(document).ready(function(){

    $('#category_form_area').hide();

	$('#add_Category').click(function(){
		$('#category_form_area').slideToggle(100);
	})

	$('.btn-create').click(function(event){
		event.preventDefault()
	})

});
