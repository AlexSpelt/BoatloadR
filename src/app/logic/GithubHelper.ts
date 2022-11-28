class GithubHelper {
    
    /**
     * This function returns the version of the package
     */
    public getVersion(): GithubVersion {
        throw new Error("Method not implemented.");
    }

    /**
     * This function downloads the version by commmit
     * @param commit commit hash
     */
    public downloadCommit(commit: string): File {
        throw new Error("Method not implemented.");
    }
}