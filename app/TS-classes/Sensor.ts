import { SerialPort } from "electron";
import { ComNode } from "./ComNode";
import { Package } from "./Package";

class Sensor extends Package {
    private sourceConfig: SerialPort

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

        this.sourceConfig = null;
    }

    /**
     * Exports the script
     */
    public exportScript() {
        throw new Error("Method not implemented.");
    }

    /**
     * Getter $sourceConfig
     * @return {SerialPort}
     */
	public get $sourceConfig(): SerialPort {
		return this.sourceConfig;
	}

    /**
     * Setter $sourceConfig
     * @param {Source} value
     */
    public set $sourceConfig(value: SerialPort) {
        this.sourceConfig = value;
    }
}