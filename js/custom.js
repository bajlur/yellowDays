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

//   jQuery( document ).ready(function() {
//       jQuery(".custom-submit-btn").click(function(){
//		   jQuery(this).css("background-color","#f2f2f2");
//		   jQuery(this).css("cursor","no-drop");
////    	jQuery("#form-step-2").css("display","flex");
//		   jQuery("#form-step-2").css("opacity","1");
//		   jQuery("#form-step-2").css("transform","scale(1)");
//		   jQuery("#form-step-2").css("transition","all 0.3s ease-in-out");
//		   
//  });
//    });

jQuery(".custom-submit-btn").click(function(){
  	jQuery("#form-step-2").toggleClass("extraFormActive");
  });


jQuery('#inputDate').datepicker({
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