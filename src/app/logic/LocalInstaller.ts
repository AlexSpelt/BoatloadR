import * as path from "path";
import { ElectronService } from "../core/services";
import { PackageListService } from "../package-list.service";
import { CommunicationNode } from "./CommunicationNode";
import { Installer } from "./Installer";
import { Package } from "./Package";
import { dir } from "console";
import { exec } from "child_process";

export class LocalInstaller implements Installer {

    constructor(private electron: ElectronService) {

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
     * @param repoURL file path on system
     * @param author author
     * @param organisation organisation
     * @param isInstalled if the pacakge is installed
     * @param version version
     * @param versions versions
     * @param nodes nodes 
     * @returns Package
     */
    private createPackage(name: string, repoURL: string, author: string, organisation: string, isInstalled: boolean, version: string, versions: Array<string>, nodes: Array<CommunicationNode>): Package {
        let p = new Package(name, repoURL, author, organisation, false, version, versions, nodes)
        return p
    }

    /**
     * this function is responsible for install a local file including putting the files in the correct folder
     * @param directoryPath path to the directory
     * @param pls package list service running on the fron end, used for adding to on screen list.
     */
    public async installFileFromLocal(files: FileList, pls: PackageListService) {
        let found = false;
        let pkgname: string;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            if (file.name == "boatloadr-package.json" && file.type) {
                found = true;

                let json = JSON.parse(await file.text());

                pkgname = json.name;

                // TODO: local to filepath unless the file is in the ros source? distribution wise mqtt would have been better than ros :/
                this.install(this.createPackage(json.name, 'LOCAL', json.author, json.organisation, true, json.version, json.versions, this.createNodes(json.nodes)), pls);
            }

        }
        if (found == false) {
            throw new Error('no boatloadr-package.json found')
        } else {
            let dirPath = "./src/assets/package-folder/";

            let createDirs = dirPath + pkgname + '/src'

            let dirs = dirPath + pkgname

            if (!this.electron.fs.existsSync(createDirs)) {
                this.electron.fs.mkdirSync(createDirs, { recursive: true });
            }

            // fix this
            //TODO: Hier gaat het mis

            for (let index = 0; index < files.length; index++) {
                const file = files[index];
                console.log('hier log ik de file', index, file)
                this.electron.fs.renameSync(file.path.toString(), createDirs)
            }
            
            exec('source ~/ros2_ws/install/setup.bash')

            exec('colcon build', {
                cwd: dirs
            }, function (error, stdout, stderr) {
                if (error) {
                    console.error('ERROR:', error)
                } else if (stderr) {
                    console.error('STDERROR:', stderr)
                } else {
                    console.log('out:', stdout)
                }
                console.log(stdout)
            });

            exec('source ~/ros2_ws/install/setup.bash')

            exec('ros2 pkg prefix ' + pkgname, {
                cwd: dirs
            }, function (error, stdout, stderr) {
                if (error) {
                    console.error('ERROR:', error)
                } else if (stderr) {
                    console.error('STDERROR:', stderr)
                } else {
                    console.log('out:', stdout)
                }
                console.log(stdout)
            });
        }
    }

    /**
     * this function is responsible for generating nodes based on read json data
     * @param nodes json data ofnodes
     * @returns node instance array
     */
    createNodes(nodes: any): CommunicationNode[] {
        let nodeGroup = []
        nodes.forEach(node => {
            let n = new CommunicationNode(node.isOut, node.type);
            nodeGroup.push(n);
        });
        return nodeGroup;
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
