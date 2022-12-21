import { CommunicationNode } from "./CommunicationNode";

export class NodesRelation {
    /**
     * Constructs a Relation
     * @param publisherNode 
     * @param subscriberNode 
     */
    constructor (
        private publisherNode: CommunicationNode,
        private subscriberNode: CommunicationNode,
        private publischerElement?: HTMLElement,
        private subscriberElement?: HTMLElement
    ) {}

    /**
     * This function returns the publisher node
     * @returns publisherNode
     */
    public getPublisherNode (): CommunicationNode {
        return this.publisherNode;
    }

    /**
     * This function returns the subscriber node
     * @returns subscriberNode
     */
    public getSubscriberNode (): CommunicationNode {
        return this.subscriberNode;
    }

    /**
     * This function returns the publisher node element
     * @returns publisherNode
     */
    public getPublisherElement (): HTMLElement {
        return this.publischerElement;
    }

    /**
     * This function returns the subscriber node Element
     * @returns subscriberNode
     */
    public getSubscriberElement (): HTMLElement {
        return this.subscriberElement;
    }
}