import { ComponenentNode } from "./ComponentNode";
import { Package } from "./Package";

class Component extends Package {
    constructor (
        name: string,
        repoURL: string,
        author: string,
        organisation: string,
        isInstalled: boolean,
        version: string,
        versions: Array<string>,
        nodes: Array<ComponenentNode>
    ) {
        super(name,
            repoURL,
            author,
            organisation,
            isInstalled,
            version,
            versions,
            nodes)
    }

    /**
     * Exports the script
     */
    public exportScript() {
        throw new Error("Method not implemented.");
    }
}