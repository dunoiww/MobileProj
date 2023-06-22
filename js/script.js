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