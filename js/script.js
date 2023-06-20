let searchForm = document.querySelector('.header-page .search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.header-page .navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
}

window.onscroll = () =>{
    searchForm.classList.remove('active');
    navbar.classList.remove('active');
}



// const imgPosition = document.querySelectorAll('.aspect-ratio-169 img');
// const imgContainer = document.querySelector('.aspect-ratio-169');
// const dotItem = document.querySelectorAll('.dot');
// let slides = document.querySelectorAll('.home .slide');
// let index = 0;

// imgPosition.forEach(function(image, index) {
//     image.style.left = index * 100 +"%"
//     dotItem[index].addEventListener('click', function() {
//         slider(index);
//     })
// })

// function imgSlide () {
//     index++;
//     if (index >= imgPosition.length) {index = 0}
//     slider(index)
// }

// function slider(index) {
//     imgContainer.style.left = "-" +index*100 +"%"
//     const dotActive = document.querySelector('.dotActive')
//     dotActive.classList.remove('dotActive');
//     dotItem[index].classList.add("dotActive");
// }

// setInterval(imgSlide, 4000)

// function next(){
//     slides[index].classList.remove('active');
//     index = (index + 1) % slides.length;
//     slides[index].classList.add('active');
// }

// function prev(){
//     slides[index].classList.remove('active');
//     index = (index - 1 + slides.length) % slides.length;
//     slides[index].classList.add('active');
// }

let btntotop = document.getElementById("btnToTop");

window.onscroll = function() {scrollFunction()}

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btntotop.style.display = "block";
    } else {
        btntotop.style.display = "none";
    }
}

function topFunction() {
    console.log(btntotop);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}