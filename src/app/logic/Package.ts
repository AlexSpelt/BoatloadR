import { ComNode } from "./ComponentNode";

export class Package {


    /**
     * Constructs the Package class
     * @param name name of the package
     * @param repoURL github repo of the package
     * @param author author of the package
     * @param organisation organisation associated with the author
     * @param isInstalled if the package is installed locally
     * @param version version
     * @param versions array of versions
     * @param nodes attached nodes on current version
     */
    constructor(
        private name: string,
        private repoURL: string,
        private author: string,
        private organisation: string,
        private isInstalled: boolean,
        private version: string,
        private versions: Array<string>,
        private nodes: Array<ComNode>
    ) {
    }

    /**
     * install code
     */
     public install() {
        throw new Error("Method not implemented.");
    }

    /**
     * uninstall
     */
    public uninstall() {
        throw new Error("Method not implemented.");
    }

    /**
     * exportScript
     */
    public exportScript() {
        throw new Error("Method not implemented.");
    }

    /**
     * Getter $name
     * @return {string}
     */
     public get $name(): string {
		return this.name;
	}

    /**
     * Getter $repoURL
     * @return {string}
     */
	public get $repoURL(): string {
		return this.repoURL;
	}

    /**
     * Getter $author
     * @return {string}
     */
	public get $author(): string {
		return this.author;
	}

    /**
     * Getter $organisation
     * @return {string}
     */
	public get $organisation(): string {
		return this.organisation;
	}

    /**
     * Getter $isInstalled
     * @return {boolean}
     */
	public get $isInstalled(): boolean {
		return this.isInstalled;
	}

    /**
     * Getter $version
     * @return {string}
     */
	public get $version(): string {
		return this.version;
	}

    /**
     * Getter $versions
     * @return {Array<string>}
     */
	public get $versions(): Array<string> {
		return this.versions;
	}

    /**
     * Getter $nodes
     * @return {Array<ComNode>}
     */
	public get $nodes(): Array<ComNode> {
		return this.nodes;
	}
}