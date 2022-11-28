class Relation {
    private publisherNode: Node;
    private subscriberNode: Node;

    /**
     * Constructs a Relation
     * @param publisherNode 
     * @param subscriberNode 
     */
    constructor (
        publisherNode: Node,
        subscriberNode: Node
    ) {
        this.publisherNode = publisherNode;
        this.subscriberNode = subscriberNode;
    }

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