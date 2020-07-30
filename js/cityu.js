document.querySelector('#menu').classList.remove('display-none');
  
//*--- dublicates the first item of news slider in order to show its preview next to last one -----*/
let news_slider_first_item = document.querySelector('.news-slider-item');
let news_slider_first_item_cloned = news_slider_first_item.cloneNode(true);
news_slider_first_item_cloned.style.display ='none';
let news_slider = document.querySelector('#news-slider');
news_slider.appendChild(news_slider_first_item_cloned);
//*---/ dublicates the first item of news slider in order to show its preview next to last one -----*/


/* ---------------top slider---------------------------------*/
    let $status_current = $('#current-slide-item');
    let $total_slides = $('#total-slide-items')
    let $slickElement = $('#custom-slider');
    $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
        let i = (currentSlide ? currentSlide : 0) + 1;
        $status_current.text(i);
        $total_slides.text( slick.slideCount );
    });
$('#custom-slider').slick({
  cssEase: 'linear',
    fade: true,
    dots: false,
    autoplay: false,
    autoplaySpeed: 4000,
    nextArrow: $('#custom-next'),
    prevArrow: $('#custom-prev'),
    responsive: [
    {
      breakpoint: 767,
      settings: {
        fade: false,
        dots: false
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});
/* ---------------/top slider---------------------------------*/

/* ---------------news slider---------------------------------*/

$('#news-slider').slick({
  cssEase: 'linear',
    fade: false,
    infinite: false,
    dots: false,
    slidesToShow: 5,
    slidesToScroll: 4,
    autoplay: false,
    autoplaySpeed: 4000,
    nextArrow: $('#news-custom-next'),
    prevArrow: $('#news-custom-prev'),
      responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3,
        infinite: false,
        dots: false
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 550,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});
/* ---------------news slider---------------------------------*/


let a_list_item = document.querySelectorAll('.list-item-a');
let b_list_item = document.querySelectorAll('.list-item-b');
let b_list_items = document.querySelectorAll('.list-items-b');
let c_list_item_wrapper = document.querySelectorAll('.list-item-c-wrapper');

$('.list-item-a').on("mouseover", function (e) {
	this.classList.add('active');
	let b_wrapper = document.querySelector('#list-items-b-wrapper');
	let b_to_reveal = '.list-items-b-'+ this.dataset.index + '-wrapper' ;

   		if(document.querySelector(b_to_reveal)){
		   		for (var i = b_wrapper.children.length - 1; i >= 0; i--) {
					if( b_wrapper.children[i].classList.contains('active')  ) {
						b_wrapper.children[i].classList.remove('active');
					}
				}
    		document.querySelector(b_to_reveal).classList.add('active');
    		let name_of_active_bg = 'active-bg-'+this.dataset.index;
    		document.querySelector("#list-items-b-wrapper").setAttribute("class", "");
    		document.querySelector("#list-items-b-wrapper").setAttribute("class", "row side-image");
    		document.querySelector("#list-items-b-wrapper").classList.add(name_of_active_bg);
   		 }
});
$('.list-item-a').on("mouseout", function (e) {
		let parent_b = document.querySelector('#list-items-b-wrapper');
		let targ = event.relatedTarget;
		let is_in_second_col = isInside( parent_b , targ );
		for (let i = a_list_item.length - 1; i >= 0; i--) {
		if  ( (a_list_item[i].classList.contains('active')) && (!is_in_second_col) ){
			a_list_item[i].classList.remove('active');
		}
		else{
			if (!is_in_second_col){
    		document.querySelector("#list-items-b-wrapper").setAttribute("class", "");
    		document.querySelector("#list-items-b-wrapper").setAttribute("class", "row side-image");
    		for (let i = b_list_items.length - 1; i >= 0; i--) {
    			if(b_list_items[i].classList.contains('active')) {
    				b_list_items[i].classList.remove('active');

    			}
    		}
			}
		}
	}
});

$('.list-item-b').on("mouseover", function (e) {
	this.classList.add('active');
	let first_col_active_row;
	for (let i = a_list_item.length - 1; i >= 0; i--) {
		 if (a_list_item[i].classList.contains('active')){
		 	first_col_active_row = a_list_item[i].dataset.index;
		 }
	}
	let c_wrapper = document.querySelector('#list-items-c-wrapper');
	let c_to_reveal = '#list-items-c-'+first_col_active_row+'-'+ this.dataset.index + '-wrapper' ;
   		if(document.querySelector(c_to_reveal)){
		   		for (let i = c_wrapper.children.length - 1; i >= 0; i--) {
					if( c_wrapper.children[i].classList.contains('active')  ) {
						c_wrapper.children[i].classList.remove('active');
					}
				}
    		document.querySelector(c_to_reveal).classList.add('active');
   		 }
});
$('.list-item-b').on("mouseout", function (e) {
		let parent_b = document.querySelector('#list-items-b-wrapper');
		let parent_c = document.querySelector('#list-items-c-wrapper');
		let targ = event.relatedTarget;
		let is_in_second_col = isInside( parent_b , targ );
		let is_in_third_col = isInside( parent_c , targ );

		if (!is_in_third_col){
				for (let i = c_list_item_wrapper.length - 1; i >= 0; i--) {
    			if(c_list_item_wrapper[i].classList.contains('active')) {
    				c_list_item_wrapper[i].classList.remove('active');
    			}
    		}
			}
		for (let i = b_list_item.length - 1; i >= 0; i--) {
		if  ( (b_list_item[i].classList.contains('active')) && (!is_in_third_col) ){
			b_list_item[i].classList.remove('active');
		}
		else {
			if ( (!is_in_third_col) && (!is_in_second_col) ){
    		document.querySelector("#list-items-b-wrapper").setAttribute("class", "");
    		document.querySelector("#list-items-b-wrapper").setAttribute("class", "row side-image");
    		for (let i = b_list_items.length - 1; i >= 0; i--) {
    			if(b_list_items[i].classList.contains('active')) {
    				b_list_items[i].classList.remove('active');
    			}
    		}
			}
		}
	}
});

function isInside( parent_node , child_node) {
  return (child_node === parent_node) ? false : parent_node.contains(child_node);
}


  const burger_open = document.querySelector('#burger-open');
  const burger_close = document.querySelector('#burger-close');

  burger_open.addEventListener('click',function(){
    document.querySelector('#menu').classList.add('active');
    
  });
  burger_close.addEventListener('click',function(){
    document.querySelector('#menu').classList.remove('active');
     
  });

$(window).on('resize scroll', function() {
      let instuctions = document.querySelector('.instuctions');
      let view = window.pageYOffset || document.documentElement.scrollTop;
      let viewHeight = window.innerHeight;
      let viewDownEdge = view + viewHeight - 51;
      let rect = instuctions.getBoundingClientRect();
      let instuctionsUpEdge = rect.top;

if (window.innerWidth > 768) {  //desktop
          if (!document.querySelector('#menu').classList.contains('active')) {
                if (viewDownEdge > instuctionsUpEdge ) {
                  document.querySelector('#fixed-bar').classList.add('active');
                }
                else {
                  document.querySelector('#fixed-bar').classList.remove('active');
                }
          }
}
else {  //mobile
    if (document.querySelector('#fixed-bar').classList.contains('active')) {
      document.querySelector('#fixed-bar').classList.remove('active')
    }

    if (view>0) {
      document.querySelector('main').classList.add('scrolled');
    }
    else {
      document.querySelector('main').classList.remove('scrolled');
    }


}
});

  const burger_small = document.querySelector('#burger-open-small');
  burger_small.addEventListener('click', function(){ 
    document.querySelector('#burger-open').click();
    window.scrollTo(0,0);
  } );
