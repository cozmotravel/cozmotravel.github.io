//MAP HEIGHT 
function setMapHeight() {
    var windowHeight = $(window).innerHeight(),
		marginFromTop = $('#list-group-wrap').offset().top,
	    footerHeight = $('.footer_big').innerHeight();
	$('#map-main,#list-group-wrap.ui-listing-wrapper').css('height',(windowHeight-marginFromTop-footerHeight)-30);
}

//SORTING BUTTON
  $('#sortDropdown .dropdown-item').on('click',function(){
	  var $selectedtext = $(this).text();
	  $('#sortButton').text($selectedtext);
  })

 //HOTEL LISTING
var uiMoreButtonClass = $('.ui-list-btn');	
	
 uiMoreButtonClass.on('click',function(e){
	 $('.ui-collapsible-panel').hide();	
	 $(this).closest('li.item').find('.ui-collapsible-panel').addClass('animated fadeIn').show();
	 uiMoreButtonClass.closest('li.active').removeClass('active');
	 $(this).closest('li').addClass('active');
	 var elemIndex = $(this).attr('href');	 
	 $('.hotel-listing-tab a[href="'+elemIndex+'"]').tab('show'); 	
	 $('.royalSlider').royalSlider('updateSliderSize', true);
 })
 $('.hotel-listing-tab a[data-toggle="pill"]').on('shown.bs.tab', function (e) {	 
	 uiMoreButtonClass.closest('li.active').removeClass('active');
	 var elemID = $(this).attr('href');		 
	 $("a[href='"+elemID+"']").closest('li').addClass('active');
	 $('.royalSlider').royalSlider('updateSliderSize', true);
 })


 //Close Expanded Panel
 $('.ui-close-button').on('click',function(){
	 $(this).closest('.ui-collapsible-panel').hide();
	 $('.ui-list-features').find('li.active').removeClass('active')
 })
//CAROUSEL HOTEL GALLERY	 
$('.royalSlider').each(function() {
    var sliderEl = $(this);
    var sliderOptions = {
//       fullscreen: {
//		  enabled: true,
//		  nativeFS: false
//		},
		controlNavigation: 'thumbnails',
		thumbs: {
		  orientation: 'vertical',
		  paddingBottom: 4,
		  appendSpan: true
		},
		transitionType:'fade',
		autoScaleSlider: true, 
		autoScaleSliderWidth: 960,     
		autoScaleSliderHeight:530,
		loop: true,
		arrowsNav: true,
		keyboardNavEnabled: true,
		imageScaleMode:'fill'
    };
    sliderEl.royalSlider(sliderOptions);
});

$(document).ready(function(){
//	 var sliderMin = 400,
//		 sliderMax = 1177;
//	 $( "#htlPriceRangeSlider" ).slider({
//      range: true,
//      min: sliderMin,
//      max: sliderMax,
//      values: [sliderMin, sliderMax ],
//      slide: function( event, ui ) {
//		var fromRange = ui.values[ 0 ],
//			toRange = ui.values[ 1 ];
//		  $('#price-from-range').text(fromRange);
//		  $('#price-to-range').text(toRange);
//      },
////	 change: function( event, ui ) {		 
////	 }
//    });
//	$('#price-from-range').text(sliderMin);
//	$('#price-to-range').text(sliderMax);
	
	//FIlter
	$('#filterBtnMobile').click(function(){		
		if(!$('#filter-panel').hasClass('modal-style')){
			$('#filter-panel').removeClass('d-none').addClass('modal-style');			
			$('body').addClass('modal-open').addClass('modal-open').append('<div class="modal-backdrop fade show in"></div>')			
		}else{
			$('#filter-panel').addClass('d-none').removeClass('modal-style');	
			$('body').removeClass('modal-open')
			$('.modal-backdrop').remove();
		}	

	})
	$('.filter-done-mobile').click(function(){
		
		$('#filter-panel').addClass('d-none').removeClass('modal-style');	
		$('body').removeClass('modal-open')
		$('.modal-backdrop').remove();
	})	
	//StarRating
	$('.star-rating .star.rating').on('click',function(){
		var selectedRating =  $(this).data('rating');
		$(this).parent().attr('data-stars',selectedRating)
	})
	
	function resetStyles(elm,className) {
		$('.ui-collapsible-panel').hide();
		$('.ui-list-features li').removeClass('active');
		$('.ui-list-control-btn-group li').removeClass('active')
		if(!elm.hasClass('active')){
			elm.addClass('active');
		}
		$('#list-group-wrap.ui-listing-wrapper').css('height','');
		$('body').removeClass('htl-std-list-view')
				.removeClass('htl-enable-list-view')
				.removeClass('htl-enable-map-view')
				.removeClass('htl-enable-grid-view')
		$('body').addClass(className);
	}
	$('#htlstandardView').on('click', function () {
		var className = 'htl-std-list-view'
		resetStyles($(this),className);
	})
	$('#htllistView').on('click', function () {   
		var className = 'htl-enable-list-view'          
		resetStyles($(this),className);
	})
	$('#htlmapView').on('click', function () {
		var className = 'htl-enable-map-view'
		resetStyles($(this),className);
		mainMap();
		
	})
	$('#htlgridView').on('click', function () {
		var className = 'htl-enable-grid-view'
		resetStyles($(this),className);
	})
	

	
	
	
	
//	$('.ui-listing-wrapper').imagesLoaded()
//	  .always( function( instance ) {
//		console.log('all images loaded');
//	  })
//	  .done( function( instance ) {
//		console.log('all images successfully loaded');
//	  })
//	  .fail( function() {
//		console.log('all images loaded, at least one is broken');
//	  })
//	  .progress( function( instance, image ) {
//		var result = image.isLoaded ? 'loaded' : 'broken';
//		console.log( 'image is ' + result + ' for ' + image.img.src );
//	  });
	
	
})









//$('.royalSlider').royalSlider('updateSliderSize', true);