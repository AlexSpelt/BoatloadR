class Relation {
    /**
     * Constructs a Relation
     * @param publisherNode 
     * @param subscriberNode 
     */
    constructor (
        private publisherNode: Node,
        private subscriberNode: Node
    ) {}

    /**
     * This function returns the publisher node
     * @returns publisherNode
     */
    public getPublisherNode (): Node {
        return this.publisherNode;
    }

    /**
     * This function returns the subscriber node
     * @returns subscriberNode
     */
    public getSubscriberNode (): Node {
        return this.subscriberNode;
    }
}