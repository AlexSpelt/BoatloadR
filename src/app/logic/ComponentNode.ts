import { Type } from "./Type";

export class ComponenentNode {

    private topicNumber: number = 0;

    /**
     * Constructs a Communication Node
     * @param isOut Whether the node is a output
     * @param type the type of the node
     */
    constructor(
        private isOut: boolean,
        private type: Type
    ) { }
    

    /**
     * Getter $isOut
     * @return {boolean}
     */
	public get $isOut(): boolean {
		return this.isOut;
	}

    /**
     * Getter $type
     * @return {Type}
     */
	public get $type(): Type {
		return this.type;
	}

    /**
     *  Getter $topicNumber
     *  @return {number}
     */
    public get $topicNumber(): number {
        return this.topicNumber;
    }

    /**
     * Setter $topicNumber
     * @param {number} value
     */
    public set $topicNumber(value: number) {
        this.topicNumber = value;
    }
}