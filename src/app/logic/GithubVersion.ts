export class GithubVersion {

    constructor (
        private commit: string, 
        private version: string
    ) { }

    /**
     * Getter $commit
     * @return {string}
     */
	public get $commit(): string {
		return this.commit;
	}

    /**
     * Getter $version
     * @return {string}
     */
	public get $version(): string {
		return this.version;
	}

    /**
     * Setter $commit
     * @param {string} value
     */
	public set $commit(value: string) {
		this.commit = value;
	}

    /**
     * Setter $version
     * @param {string} value
     */
	public set $version(value: string) {
		this.version = value;
	}
}