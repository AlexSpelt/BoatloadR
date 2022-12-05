export class GithubVersion {

    constructor (
        private commit: String, 
        private version: String
    ) { }

    /**
     * Getter $commit
     * @return {String}
     */
	public get $commit(): String {
		return this.commit;
	}

    /**
     * Getter $version
     * @return {String}
     */
	public get $version(): String {
		return this.version;
	}

    /**
     * Setter $commit
     * @param {String} value
     */
	public set $commit(value: String) {
		this.commit = value;
	}

    /**
     * Setter $version
     * @param {String} value
     */
	public set $version(value: String) {
		this.version = value;
	}
}