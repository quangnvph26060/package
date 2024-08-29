var slides = document.querySelectorAll('.slides_prodcuts');
var currentSlide = 0;
// var slideInterval = setInterval(nextSlide, 2000);

var prevBtn = document.querySelector('.prev-btn');
var nextBtn = document.querySelector('.next-btn');

prevBtn.addEventListener('click', function () {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSliderPosition();
});

nextBtn.addEventListener('click', function () {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSliderPosition();
});

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSliderPosition();
}

function updateSliderPosition() {
    var slideWidth = slides[0].clientWidth;
    var newPosition = -slideWidth * currentSlide;
    console.log(newPosition);
    // màn hình ip 12 pro mà màn hình laptop 
   if(newPosition !== -780 && newPosition !== -2698){
    document.querySelector('.slider_products').style.transform = 'translateX(' + newPosition + 'px)';
   }else{
    document.querySelector('.slider_products').style.transform = 'translateX(' + '0' + 'px)';
   }

}

/////////////////////////////////////////////

