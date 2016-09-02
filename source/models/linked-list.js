class DoublyLinkedList
{
    constructor(firstNode)
    {
        this._firstNode = firstNode;
        this._lastNode = firstNode;
        this._length = 1;
    }

    get firstNode()
    {
        return this._firstNode;
    }

    set firstNode(value)
    {
        this._firstNode = value;
    }

    get lastNode()
    {
        return this._lastNode;
    }

    set lastNode(value)
    {
        this._lastNode = value;
    }

    addToRight(segment)
    {
        this.lastNode.rightNeighbour = segment;
        segment.leftNeighbour = this.lastNode;
        segment.rightNeighbour = null;

        this.lastNode = segment;

        ++this.length;
    }

    addToLeft(segment)
    {
        this.firstNode.leftNeighbour = segment;
        segment.rightNeighbour = this.firstNode;
        segment.leftNeighbour = null;

        this.firstNode = segment;

        ++this.length;
    }

    forEach(callback)
    {
        let currentSegment = this.firstNode;
        while (currentSegment)
        {
            callback(currentSegment);
            currentSegment = currentSegment.rightNeighbour;
        }
    }

    // Where do I use this again?
    // TODO: Delete
    asArray(callback)
    {
        let currentSegment = this.firstNode;
        const result = [];
        while (currentSegment)
        {
            const currentResult = callback(currentSegment);
            currentSegment = currentSegment.rightNeighbour;

            result.push(currentResult);
        }

        return result;
    }
}