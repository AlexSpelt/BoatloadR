import { Type } from "./Type";

export class ComNode {
    private isOut: boolean;
    private type: Type;
    private topicNumber: number

    /**
     * Constructs a Communication Node
     * @param isOut Whether the node is a output
     * @param type the type of the node
     */
    constructor(
        isOut: boolean,
        type: Type
    ) {
        this.isOut = isOut;
        this.type = type
        this.topicNumber = 0;
    }
    

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