var slideIndex = 1;



function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  
  showSlides(slideIndex = n);
}

function showSlides(n) {
  
  var i;
  let slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (let slide of slides) {
       slide.style.display = "none";  
  }
  slides[slideIndex-1].style.display = "block";
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  } 
  dots[slideIndex-1].className += " active";
  
    
}

showSlides(slideIndex);
