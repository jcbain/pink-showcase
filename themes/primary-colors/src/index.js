import AOS from 'aos';
import Floaty from './floaty.js';

const random = require('random');

const banner = document.querySelector(".banner-main");
const floaties = document.querySelectorAll(".floaty-item");

const centerX = banner.offsetWidth/2;
const centerY = banner.offsetHeight/2;


let floaty_nodes = [];
for(let i = 0; i < floaties.length; i++){
    let sensitivity = random.float(0.01, 0.05);
    let xDirection = random.boolean() ? 1 : -1;
    let yDirection = random.boolean() ? 1 : -1;
    floaty_nodes.push(new Floaty(sensitivity, xDirection, yDirection, floaties[i]));
}


banner.addEventListener('mousemove', event => {
    let mouseX = event.pageX;
    let mouseY = event.pageY;
    floaty_nodes.map(c => c.float(mouseX, mouseY, centerX, centerY));
})

AOS.init();