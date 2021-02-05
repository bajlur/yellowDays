// JavaScript Document
jQuery('#custom-owl').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
});

jQuery(document).ready(function($) {
  var bigimage = $("#big");
  var thumbs = $("#thumbs");
  //var totalslides = 10;
  var syncedSecondary = true;

  bigimage
    .owlCarousel({
    items: 1,
    slideSpeed: 2000,
    nav: false,
    autoplay: true,
    dots: false,
    loop: true,
    responsiveRefreshRate: 200,
    navText: [
      '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
      '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
    ]
  })
    .on("changed.owl.carousel", syncPosition);

  thumbs
    .on("initialized.owl.carousel", function() {
    thumbs
      .find(".owl-item")
      .eq(0)
      .addClass("current");
  })
    .owlCarousel({
    items: 4,
    dots: false,
    nav: false,
    navText: [
      '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
      '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
    ],
    smartSpeed: 200,
    slideSpeed: 500,
    slideBy: 4,
    responsiveRefreshRate: 100
  })
    .on("changed.owl.carousel", syncPosition2);

  function syncPosition(el) {
    //if loop is set to false, then you have to uncomment the next line
    //var current = el.item.index;

    //to disable loop, comment this block
    var count = el.item.count - 1;
    var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

    if (current < 0) {
      current = count;
    }
    if (current > count) {
      current = 0;
    }
    //to this
    thumbs
      .find(".owl-item")
      .removeClass("current")
      .eq(current)
      .addClass("current");
    var onscreen = thumbs.find(".owl-item.active").length - 1;
    var start = thumbs
    .find(".owl-item.active")
    .first()
    .index();
    var end = thumbs
    .find(".owl-item.active")
    .last()
    .index();

    if (current > end) {
      thumbs.data("owl.carousel").to(current, 100, true);
    }
    if (current < start) {
      thumbs.data("owl.carousel").to(current - onscreen, 100, true);
    }
  }

  function syncPosition2(el) {
    if (syncedSecondary) {
      var number = el.item.index;
      bigimage.data("owl.carousel").to(number, 100, true);
    }
  }

  thumbs.on("click", ".owl-item", function(e) {
    e.preventDefault();
    var number = $(this).index();
    bigimage.data("owl.carousel").to(number, 300, true);
  });
});

jQuery(".custom-submit-btn").click(function(){
  	jQuery("#form-step-2").toggleClass("extraFormActive");
  });


jQuery('#inputDate').datepicker({
});



jQuery(".custom-select").each(function() {
  var classes = jQuery(this).attr("class"),
      id      = jQuery(this).attr("id"),
      name    = jQuery(this).attr("name");
  var template =  '<div class="' + classes + '">';
      template += '<span class="custom-select-trigger">' + jQuery(this).attr("placeholder") + '</span>';
      template += '<div class="custom-options">';
      jQuery(this).find("option").each(function() {
        template += '<span class="custom-option ' + jQuery(this).attr("class") + '" data-value="' + jQuery(this).attr("value") + '">' + jQuery(this).html() + '</span>';
      });
  template += '</div></div>';
  
  jQuery(this).wrap('<div class="custom-select-wrapper"></div>');
  jQuery(this).hide();
  jQuery(this).after(template);
});
jQuery(".custom-option:first-of-type").hover(function() {
  jQuery(this).parents(".custom-options").addClass("option-hover");
}, function() {
  jQuery(this).parents(".custom-options").removeClass("option-hover");
});
jQuery(".custom-select-trigger").on("click", function() {
  jQuery('html').one('click',function() {
    jQuery(".custom-select").removeClass("opened");
  });
  jQuery(this).parents(".custom-select").toggleClass("opened");
  event.stopPropagation();
});
jQuery(".custom-option").on("click", function() {
  jQuery(this).parents(".custom-select-wrapper").find("select").val(jQuery(this).data("value"));
  jQuery(this).parents(".custom-options").find(".custom-option").removeClass("selection");
  jQuery(this).addClass("selection");
  jQuery(this).parents(".custom-select").removeClass("opened");
  jQuery(this).parents(".custom-select").find(".custom-select-trigger").text(jQuery(this).text());
});


jQuery('.owl-latestNews').owlCarousel({
    loop:true,
    margin:30,
    dots: false,
    nav: true,
    navText: ['<i class="fa fa-chevron-left" aria-hidden="true"></i>','<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:3
        }
    }
});

jQuery('.next-page').click(function(){
jQuery('.pagination-box ul').find('.pagenumber.active').next().addClass('active');
jQuery('.pagination-box ul').find('.pagenumber.active').prev().removeClass('active');
});
jQuery('.prev-page').click(function(){
jQuery('.pagination-box ul').find('.pagenumber.active').prev().addClass('active');
jQuery('.pagination-box ul').find('.pagenumber.active').next().removeClass('active');
});

const guestBtn = document.querySelector("#guests-input-btn"),
	guestOptions = document.querySelector("#guests-input-options"),
	adultsSubsBtn = document.querySelector("#adults-subs-btn"),
	adultsAddBtn = document.querySelector("#adults-add-btn"),
	childrenSubsBtn = document.querySelector("#children-subs-btn"),
	childrenAddBtn = document.querySelector("#children-add-btn"),
	ageSubsBtn = document.querySelector("#age-subs-btn"),
	ageAddBtn = document.querySelector("#age-add-btn"),
	adultsCountEl = document.querySelector("#guests-count-adults"),
	ageCountEl = document.querySelector("#guests-count-age"),
	childrenCountEl = document.querySelector("#guests-count-children");
let maxNumGuests = 15,
	isGuestInputOpen = false,
	adultsCount = 1,
	ageCount = 0,
	childrenCount = 0;
updateValues();
guestBtn.addEventListener('click', function (e) {
	if (isGuestInputOpen) {
		guestBtn.classList.remove("open");
		guestOptions.classList.remove("open");
	} else {
		guestBtn.classList.add("open");
		guestOptions.classList.add("open");
	}
	isGuestInputOpen = isGuestInputOpen ? false : true;
	e.preventDefault();
});
adultsAddBtn.addEventListener('click', function () {
	adultsCount = addValues(adultsCount);
	updateValues();
});
adultsSubsBtn.addEventListener('click', function () {
	adultsCount = substractValues(adultsCount, 1);
	updateValues();
});
childrenAddBtn.addEventListener('click', function () {
	childrenCount = addValues(childrenCount);
	updateValues();
});
childrenSubsBtn.addEventListener('click', function () {
	childrenCount = substractValues(childrenCount, 0);
	updateValues();
});
ageAddBtn.addEventListener('click', function () {
	ageCount = addValues(ageCount);
	updateValues();
});
ageSubsBtn.addEventListener('click', function () {
	ageCount = substractValues(ageCount, 0);
	updateValues();
});
function calcTotalGuests() {
	return adultsCount + childrenCount;
}

function addValues(count) {
	return (calcTotalGuests() < maxNumGuests) ? count + 1 : count;
}

function substractValues(count, min) {
	return (count > min) ? count - 1 : count;
}

function updateValues() {
	let btnText = `${adultsCount} Adults`;
	btnText += (childrenCount > 0) ? `, ${childrenCount} Children` : '';
	guestBtn.innerHTML = btnText;
	adultsCountEl.innerHTML = adultsCount;
	childrenCountEl.innerHTML = childrenCount;
	ageCountEl.innerHTML = ageCount;
	if (adultsCount == 1) {
		adultsSubsBtn.classList.add("disabled");
	} else {
		adultsSubsBtn.classList.remove("disabled");
	} if (childrenCount == 0) {
		childrenSubsBtn.classList.add("disabled");
	} else {
		childrenSubsBtn.classList.remove("disabled");
	}if (ageCount == 0) {
		ageSubsBtn.classList.add("disabled");
	} else {
		ageSubsBtn.classList.remove("disabled");
	} if (calcTotalGuests() == maxNumGuests) {
		adultsAddBtn.classList.add("disabled");
		childrenAddBtn.classList.add("disabled");
		ageAddBtn.classList.add("disabled");
	} else {
		adultsAddBtn.classList.remove("disabled");
		childrenAddBtn.classList.remove("disabled");
		ageAddBtn.classList.remove("disabled");
	}
}