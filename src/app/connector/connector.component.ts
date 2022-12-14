import {Component, OnInit} from '@angular/core';
import { CommunicationNode } from '../logic/CommunicationNode';
import { Package } from '../logic/Package';
import { Type } from '../logic/Type';

import { NodesRelation } from '../logic/NodesRelation';

@Component({
    selector: 'app-connector',
    templateUrl: './connector.component.html',
    styleUrls: ['./connector.component.scss']
})

export class ConnectorComponent implements OnInit {
    packages: Package[] = [];
    relations: NodesRelation[] = [];


    constructor() { }
    
    ngOnInit(): void {
        this.addPackage();
    }

    public addPackage() {
        this.packages.push(new Package('new Package', 'repo_url', 'author', 'organisation', false, '1.0.0', ['1.0.0'], [
            new CommunicationNode(true, Type.audio),
            new CommunicationNode(true, Type.audio),
            new CommunicationNode(false, Type.audio),
            new CommunicationNode(false, Type.audio)
        ]));
        console.log(this.packages);
    }

    public isNodeOut(node: CommunicationNode) {
        return node.$isOut;
    }

    public isNodeIn(node: CommunicationNode) {
        return !node.$isOut;
    }

    public firstSelectedNode: Node;
    public position1: { x: number, y: number };
    public position2: { x: number, y: number };

    public addRelation(node: Node, event: PointerEvent) {
        if (this.firstSelectedNode) {
            this.position2 = { x: event.pageX - 10, y: event.pageY - 120 };
            this.relations.push(new NodesRelation(this.firstSelectedNode, node));
            
            this.firstSelectedNode = null;
            // this.position1 = null;
            // this.position2 = null;
        } else {
            this.firstSelectedNode = node;
            this.position1 = { x: event.clientX - 10, y: event.clientY - 120 };
        }
    }

}
