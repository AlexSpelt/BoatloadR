import { ComNode } from "./ComNode";
import { Package } from "./Package";

class Component extends Package {
    constructor (
        name: string,
        repoURL: string,
        author: string,
        organisation: string,
        isINstalled: boolean,
        version: string,
        versions: Array<string>,
        nodes: Array<ComNode>
    ) {
        super(name,
            repoURL,
            author,
            organisation,
            isINstalled,
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