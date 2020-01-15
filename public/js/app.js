let cloudDiv = document.querySelector("#cloud-banner");
let cloud1 = document.querySelector("#cloud1")
    cloud2 = document.querySelector("#cloud2")
    cloud3 = document.querySelector("#cloud3")
    cloud4 = document.querySelector("#cloud4")
    cloud5 = document.querySelector("#cloud5");

let centerX = cloudDiv.offsetWidth/2;
let centerY = cloudDiv.offsetHeight/2;

function makeCloudFloat(mouseX, mouseY, element, sensitivity=0.03, xDirection=1, yDirection=-1){
    let relX = ((mouseX - centerX) * xDirection) * sensitivity;
    let relY = (( mouseY - centerY ) * yDirection) * sensitivity;
    element.style.transform = 'translateY(' + relX + 'px) translateX(' + relY + 'px)';
};

cloudDiv.addEventListener('mousemove', event => {
    let mouseX = event.pageX;
    let mouseY = event.pageY;
    makeCloudFloat(mouseX, mouseY, cloud1);
    makeCloudFloat(mouseX, mouseY, cloud2, sensitivity=0.01, xDirection=-1);
    makeCloudFloat(mouseX, mouseY, cloud3, sensitivity=0.02, yDirection=1);
    makeCloudFloat(mouseX, mouseY, cloud4, sensitivity=0.05, xDirection=-1);
    makeCloudFloat(mouseX, mouseY, cloud5, sensitivity=0.01);
    makeCloudFloat(mouseX, mouseY, cloud6);
    makeCloudFloat(mouseX, mouseY, cloud7, sensitivity=0.01, xDirection=-1);
    makeCloudFloat(mouseX, mouseY, cloud8, sensitivity=0.02, yDirection=1);
    makeCloudFloat(mouseX, mouseY, cloud9, sensitivity=0.05, xDirection=-1);
})

AOS.init();