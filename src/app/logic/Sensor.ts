import { SerialPort } from "electron";
import { ComponenentNode } from "./ComponentNode";
import { Package } from "./Package";

class Sensor extends Package {
    private sourceConfig: SerialPort = null;

    constructor (
        name: string,
        repoURL: string,
        author: string,
        organisation: string,
        isINstalled: boolean,
        version: string,
        versions: Array<string>,
        nodes: Array<ComponenentNode>
    ) {
        super(name,
            repoURL,
            author,
            organisation,
            isINstalled,
            version,
            versions,
            nodes);
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