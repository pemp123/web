let slideIndex = 1;
showSlides(slideIndex);

let prev = document.getElementById ('prev');
let next = document.getElementById ('next');



function currentSlide(n) 
{
  showSlides(slideIndex = n);
  makeTimer();
}

  function plusSlides(n) 
{
  showSlides(slideIndex += n);
  makeTimer();
}

function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
 
    for (let slide of slides) {
        slide.style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";    
  }
 var timer = 0;
 makeTimer(); 
 function makeTimer(){
    clearInterval(timer) 
    timer = setInterval(function(){
      slideIndex++;
      showSlides(slideIndex);
    },5000);
  }

  
  
 
 var seconds = 5;
 setInterval(()=>{
    seconds = seconds - 1;
    if(!seconds){seconds = 5;}
        document.getElementById("timeVisual").innerHTML = seconds
 },1000)