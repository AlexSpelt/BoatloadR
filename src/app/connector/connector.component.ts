import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CommunicationNode } from '../logic/CommunicationNode';
import { Package } from '../logic/Package';
import { Type } from '../logic/Type';

import { NodesRelation } from '../logic/NodesRelation';
import { DatabaseHelperService } from '../database-helper.service';
import { PackageListService } from '../package-list.service';

@Component({
    selector: 'app-connector',
    templateUrl: './connector.component.html',
    styleUrls: ['./connector.component.scss']
})

export class ConnectorComponent implements OnInit {

    @ViewChild('dragmenu') drawMenu: ElementRef;
    
    // this variable will hold all possible packages
    packageList: Package[] = [];

    packages: Package[] = [];
    relations: NodesRelation[] = [];


    constructor(private dbService: DatabaseHelperService, private localDbService: PackageListService) { }
    
    ngOnInit(): void {
        this.dbService.getAllPackages()
            .then(remotePackageList => this.packageList = [...this.packageList,  ...remotePackageList])      

            // @ts-ignore
            if(this.localDbService.$listInstall.length == 0)
                // @ts-ignore
                this.localDbService.getAllInstalled()
                    .then(localPackageList => this.packageList = [...this.packageList,  ...localPackageList]);
            else
                this.packageList = [...this.packageList,  ...this.localDbService.$listInstall]
    }

    public addPackage(insertPackage: Package) {
        const newInstancesOfNodes = insertPackage.$nodes.map((node) => new CommunicationNode(node.$isOut, node.$type));

        const newInstanceOfPackage = new Package(
            insertPackage.$name,
            insertPackage.$repoURL,
            insertPackage.$author,
            insertPackage.$organisation,
            insertPackage.$isInstalled,
            insertPackage.$version,
            insertPackage.$versions,
            newInstancesOfNodes
        )

        this.packages.push(newInstanceOfPackage);
    }

    public isNodeOut(node: CommunicationNode) {
        return node.$isOut;
    }

    public isNodeIn(node: CommunicationNode) {
        return !node.$isOut;
    }

    public firstSelectedNode: CommunicationNode;
    public firstSelectedNodeElement: HTMLElement;

    public addRelation(node: CommunicationNode, event: MouseEvent) {
        if (this.firstSelectedNode) {

            // Check if the selection is to the same package
            // @ts-ignore
            if(this.firstSelectedNodeElement.parentElement.parentElement.isEqualNode(event.target.parentElement.parentElement)) {
                this.firstSelectedNode = null;
                this.firstSelectedNodeElement = null;
                alert('A Package can not be connected to itself');
                return;
            }
            

            // Check if the output type is the same
            if(this.firstSelectedNode.$isOut == node.$isOut) {
                this.firstSelectedNode = null;
                this.firstSelectedNodeElement = null;
                alert('A Package output can not be connected to another output or input to input');
                return;
            }

            // Check if the type is the same
            if(this.firstSelectedNode.$type != node.$type) {
                this.firstSelectedNode = null;
                this.firstSelectedNodeElement = null;
                alert('A Package type needs to be the same. If a type is different, then the connections nodes are not compatible.');
                return;
            }

            this.relations.push(
                new NodesRelation(
                    this.firstSelectedNode, 
                    node,
                    this.firstSelectedNodeElement,
                    event.target as HTMLElement
                )
            );

            console.log(this.relations)
            
            this.firstSelectedNode = null;
            this.firstSelectedNodeElement = null;
        } else {
            this.firstSelectedNode = node;
            this.firstSelectedNodeElement = event.target as HTMLElement;
        }

        console.table(this.relations)
    }

    public getXposFromElement(element : HTMLElement): number {
        
        const parentOverflowX = this.drawMenu.nativeElement.scrollLeft;

        return element.getBoundingClientRect().x - 20 + parentOverflowX;
    }

    public getYposFromElement(element : HTMLElement): number {
        
        const parentOverflowY = this.drawMenu.nativeElement.scrollTop;

        return element.getBoundingClientRect().y - 77 + parentOverflowY;
    }

    public resolveLineTypeColor(type: Type): string {
        switch (type) {
            case Type.audio:
                return 'red';
            case Type.coordinate:
                return 'green';
            case Type.stream:
                return 'blue';
            case Type.velocity:
                return 'yellow';
            case Type.image:
                return 'purple';
            case Type.directions:
                return 'orange';
            case Type.distance:
                return 'pink';
            case Type.isEnabled:
                return 'brown';
            default:
                return 'white';
        }
    }

    public reload() {
        location.reload()
    }

}
