import * as path from "path";
import { ElectronService } from "../core/services";
import { PackageListService } from "../package-list.service";
import { CommunicationNode } from "./CommunicationNode";
import { Installer } from "./Installer";
import { Package } from "./Package";

export class LocalInstaller implements Installer {

    constructor(private electron: ElectronService){

    }
    /**
     * This function installs the package
     * @param p package to install
     * @param pls package list service to install in frontend
     */
    public install(p: Package, pls: PackageListService) {
        pls.addInstalledPackage(p)
    }

    /**
     * Function to create a package instance from json data
     * @param name name
     * @param repoURL 'LOCAL'
     * @param author author
     * @param organisation organisation
     * @param isInstalled if the pacakge is installed
     * @param version version
     * @param versions versions
     * @param nodes nodes 
     * @returns 
     */
    private createPackage(name: string, repoURL: string, author: string, organisation: string, isInstalled: boolean, version: string, versions: Array<string>, nodes: Array<CommunicationNode>): Package{
        let p = new Package(name, repoURL, author, organisation, false, version, versions, nodes)
        return p
    }

    /**
     * this function is responsible for install a local file
     * @param directoryPath path to the directory
     * @param pls package list service running on the fron end, used for adding to on screen list.
     */
    public async installFileFromLocal(files: FileList, pls: PackageListService) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            let found = false

            if(file.name == "boatloadr-package.json") {
                found = true
                
                let json = JSON.parse(await file.text())

                this.install(this.createPackage(json.name, 'LOCAL', json.author, json.organisation, false, json.version, json.versions, this.createNodes(json.nodes)), pls);
            }

            if (found == false) {
                throw new Error('no boatloadr-package.json found')
            }
        }
        // this.electron.fs.readdir(directoryPath, (err, files) => {
        //     files.forEach(file => {
        //         if(path.basename(file) == "package.json"){
        //             fetch('./data.json')
        //                 .then((response) => response.json())
        //                 .then((json) => this.install(this.createPackage(json.name, 'LOCAL', json.author, json.organisation, false, json.version, json.versions, this.createNodes(json.nodes)), pls));                    
        //         }
        //     });
            
        // })
    }

    /**
     * this function is responsible for generating nodes based on read json data
     * @param nodes json data ofnodes
     * @returns node instance array
     */
    createNodes(nodes: any): CommunicationNode[] {
        let nArr = []
        nodes.forEach(node => {
            let n = new CommunicationNode(node.isOut, node.type);
            nArr.push(n);
        });
        return nArr;
    }


    /**
     * This function uninstalls the package
     * @param p package to uninstall
     */
    uninstall(p: Package) {
        throw new Error("Method not implemented.");
    }

    /**
     * This function sets a script to run mode
     * @param p packe to be set to run
     */
    setRunScript(p: Package) {
        throw new Error("Method not implemented.");
    }
    
}