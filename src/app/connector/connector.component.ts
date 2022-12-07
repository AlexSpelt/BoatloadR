import {Component} from '@angular/core';

@Component({
    selector: 'app-connector',
    templateUrl: './connector.component.html',
    styleUrls: ['./connector.component.scss']
})

export class ConnectorComponent {
    packages: string[] = [];

    // current position of the mouse
    private x: number = 0;
    private y: number = 0;
    private ele: HTMLElement;

    constructor() {
        this.ele = document.getElementById('draggable-box');

        // Checks if an element is available
        if (this.ele) {
            this.ele.addEventListener('mousedown', this.mouseDownHandler);
        } else {
            console.log('No element available');
        }
    }

    public addPackage() {
        this.packages.push('new package');
        console.log(this.packages);
    }

    public mouseDownHandler(e: any) {
        // Get current mouse position
        this.x = e.clientX;
        this.y = e.clientY;

        // Attach listeners to 'document'
        document.addEventListener('mousemove', this.mouseMoveHandler);
        document.addEventListener('mouseup', this.mouseUpHandler);
    }

    public mouseMoveHandler(e: any) {
        // How far the mouse has been moved
        const dx = e.clientX - this.x;
        const dy = e.clientY - this.y;

        // Set the position of the element
        this.ele.style.top = `${this.ele.offsetTop + dy}px`;
        this.ele.style.left = `${this.ele.offsetLeft + dx}px`;

        // Reassign the position of the mouse
        this.x = e.clientX;
        this.y = e.clientY;

        console.log(`X:${dx}, Y:${dy}`);
    }

    public mouseUpHandler () {
        // Remove the handlers of 'mousemove' and 'mouseup'
        document.removeEventListener('mousemove', this.mouseMoveHandler);
        document.removeEventListener('mouseup', this.mouseUpHandler);
    }


}
