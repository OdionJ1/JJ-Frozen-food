$(document).ready(function(){

    $('.btn-createModal').click(function(event){
		event.preventDefault();

		$('#quoteModal').modal('show');
	});

	let day = new Date().getDay();
	let time = new Date().getHours();

	if(day === 0 && time >= 8 && time < 16){
		document.querySelector("p.opening-time").textContent = "Open today until 4pm"
	} else if (day !== 0 && time >= 8 && time < 22){
		document.querySelector("p.opening-time").textContent = "Open today until 10pm"
	} else {document.querySelector("p.opening-time").textContent = "Closed"}


	$('.btn-createReviewModal').click(function(event){
		event.preventDefault();

		$('#reviewModal').modal('show');
	});

	$('.btn-createLoginModal').click(function(event){
		event.preventDefault();

		$('#loginModal').modal('show');
	});

	$('.btn-create').click(function(event){
		event.preventDefault()
	})

});
