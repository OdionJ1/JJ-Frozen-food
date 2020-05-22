$(document).ready(function(){

	$('.btn-createModal').click(function(event){
		event.preventDefault();

		$('#quoteModal').modal('show');
	});


	$('.btn-delete-category').click(function(event){
		event.preventDefault();

		let $this = $(this);

		let categoryId = $(this).data('id');

		$('#deleteCategoryModal').modal('show');

		$('#btn-categorymodal-yes').click(function(event){
			event.preventDefault();

			remove = true;

			if(remove){
				$.ajax({
					'url' : '/category/' + categoryId,
					'type' : 'DELETE'
				}).done(function(result){
					if(result){
						setTimeout(function(){
							location.href = '/';
						},3000);
					}
				})
			}
		})
	});




	$('.btn-delete-stock').click(function(event){
		event.preventDefault();

		let $this = $(this);

		let stockId = $(this).data('id');

		$('#deleteStockModal').modal('show');

		$('#btn-stockmodal-yes').click(function(event){
			event.preventDefault();

			remove = true;

			if(remove){
				$.ajax({
					'url' : '/stock/' + stockId,
					'type' : 'DELETE'
				}).done(function(result){
					if(result){
						$this.removeClass('btn-danger').addClass('btn-success');
						$this.text('Deleted ');
						$this.append('<i class="fa fa-check"></i>');
						setTimeout(function(){
							location.href = '/';
						},3000);
					}
				})
			}
		})
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


	if(document.URL.indexOf('http://localhost:9090/stockpage/Chicken') >= 0){
		document.querySelector('.catname').textContent = "Chicken"
		document.getElementsByClassName('deleteIcon')[0].style.display = "block"
	}

	if(document.URL.indexOf('http://localhost:9090/stockpage/Turkey') >= 0){
		let catname = document.querySelector('.catname').textContent = "Turkey"
		document.getElementsByClassName('deleteIcon')[1].style.display = "block"
	}

	if(document.URL.indexOf('http://localhost:9090/stockpage/Fish') >= 0){
		let catname = document.querySelector('.catname').textContent = "Fish"
		document.getElementsByClassName('deleteIcon')[2].style.display = "block"
	}

	if(document.URL.indexOf('http://localhost:9090/stockpage/Food%20Items') >= 0){
		let catname = document.querySelector('.catname').textContent = "Food Items"
		document.getElementsByClassName('deleteIcon')[3].style.display = "block"
	}

	if(document.URL.indexOf('http://localhost:9090/stockpage/Test%20Category') >= 0){
		let catname = document.querySelector('.catname').textContent = "Test Category"
		document.getElementsByClassName('deleteIcon')[4].style.display = "block"
	}

});
