const hamburgerIcon = document.getElementById("nav-icon1")
hamburgerIcon.addEventListener('click', () => document.querySelector('nav').classList.toggle('open'))

window.onload = () => document.querySelector('.loader-mask').classList.add("hide");