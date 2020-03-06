export default class Floaty {
    constructor(sensitivity, xDirection, yDirection, element){
        this.sensitivity = sensitivity;
        this.xDirection = xDirection;
        this.yDirection = yDirection;
        this.element = element;
    }
    float(mouseX, mouseY, centerX, centerY) {
        let relativeX = ((mouseX - centerX) * this.xDirection) * this.sensitivity;
        let relativeY = ((mouseY - centerY) * this.yDirection) * this.sensitivity;
        this.element.style.transform = 'translateY(' + relativeX + 'px) translateX(' + relativeY + 'px)';
    }
}