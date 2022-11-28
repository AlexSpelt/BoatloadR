import { Package } from "./Package";

class InstallList {
    private serverURL: string;
    private listInstall: Array<Package>
    private listActive: Array<Package>
    private relations: Array<Relation>

    /**
     * Constructs the install list
     * @param serverURL URL to get the files
     */
    public constructor(
        serverURL: string
    ){
        this.serverURL = serverURL;
        this.listInstall = this.getAllInstalled(serverURL);
        this.listActive = [];
        this.relations = [];
    }

    /**
     * Gets all installed packages to initialize the installed list array
     * @param serverURL The URL of the server to get the packages from
     * @returns list of all installed packages
     */
    private getAllInstalled(serverURL: string): Array<Package>{
        throw new Error("Method not implemented.");
    }

    /**
     * Adder for the install list
     * @param p Package to add to the installed list
     */
    public addInstalledPackage(p: Package) {
        this.listInstall.push(p);
    }

    /**
     * Remover for the install list
     * @param p Package to remove from the installed list
     */
    public removeInstalledPackage(p: Package) {
        this.listInstall.splice(this.listInstall.indexOf(p), 1)
    }

    /**
     * Adder for the active list
     * @param p Package to add to the active list
     */
    public addActivePackage(p: Package) {
        this.listActive.push(p);
    }

    /**
     * Remover for the active list
     * @param p Package to remove from the active list
     */
    public removeActivePackage(p: Package) {
        this.listActive.splice(this.listActive.indexOf(p), 1)
    }

    /**
     * Adder for the relations
     * @param relation Relation to be added to the list
     */
    public addRelation (relation: Relation) {
        this.relations.push(relation);
    }

    /**
     * Remover for the relations
     * @param relation Relation to be removed from the list
     */
    public removeRelation (relation: Relation) {
        this.relations.splice(this.relations.indexOf(relation), 1)
    }

    /**
     * Getter $serverURL
     * @return {string}
     */
	public get $serverURL(): string {
		return this.serverURL;
	}

    /**
     * Getter $listInstall
     * @return {Array<Package>}
     */
	public get $listInstall(): Array<Package> {
		return this.listInstall;
	}

    /**
     * Getter $listActive
     * @return {Array<Package>}
     */
	public get $listActive(): Array<Package> {
		return this.listActive;
	}

    /**
     * Getter $relations
     * @return {Array<Relation>}
     */
	public get $relations(): Array<Relation> {
		return this.relations;
	}

    /**
     * Setter $listInstall
     * @param {Array<Package>} value
     */
	private set $listInstall(value: Array<Package>) {
		this.listInstall = value;
	}

    /**
     * Setter $listActive
     * @param {Array<Package>} value
     */
	private set $listActive(value: Array<Package>) {
		this.listActive = value;
	}    

    /**
     * Setter $relations
     * @param {Array<Relation>} value
     */
	private set $relations(value: Array<Relation>) {
		this.relations = value;
	} 
}