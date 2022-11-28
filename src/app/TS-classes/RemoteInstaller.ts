import { Installer } from "./Installer";
import { Package } from "./Package";

class RemoteInstaller implements Installer {

    /**
     * This function installs the package
     * @param p package to install
     */
    install(p: Package) {
        throw new Error("Method not implemented.");
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