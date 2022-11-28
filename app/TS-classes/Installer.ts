import { Package } from "./Package";

export interface Installer {

    /**
     * This function installs the package
     * @param p package to install
     */
    install(p: Package)

    /**
     * This function uninstalls the package
     * @param p package to uninstall
     */
    uninstall(p: Package)

    /**
     * This function sets a script to run mode
     * @param p packe to be set to run
     */
    setRunScript(p: Package)
}