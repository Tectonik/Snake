class SnakeBody
{
    constructor(head, segmentType = constants.SNAKE_DEFAULT_SEGMENT_TYPE)
    {
        this._SegmentsLinkedList = new DoublyLinkedList(head);
        this._segmentType = segmentType;
        this._length = 1;
    }

    get head()
    {
        return this._SegmentsLinkedList.leftmostNode;
    }

    set head(value)
    {
        this._SegmentsLinkedList.leftmostNode = value;
    }

    get tail()
    {
        return this._SegmentsLinkedList.rightmostNode;
    }

    set tail(value)
    {
        this._SegmentsLinkedList.rightmostNode = value;
    }

    get type()
    {
        return this._segmentType;
    }

    get length()
    {
        return this._length;
    }

    addToTail(segment)
    {
        this._SegmentsLinkedList.addToRight(segment);

        ++this.length;
    }

    addToHead(segment)
    {
        this._SegmentsLinkedList.addToLeft(segment);

        ++this.length;
    }

    popRightmostElement()
    {
        const rightmostElement = this.tail;
        const leftToRightmostElement = this.tail.leftNeighbour;

        this.tail = leftToRightmostElement;
        this.tail.rightNeighbour = null;

        --this.length;

        return rightmostElement;
    }

    popLeftmostElement()
    {
        const leftmostElement = this.head;
        const rightToLeftmostElement = this.head.rightNeighbour;

        this.head = rightToLeftmostElement;
        this.head.leftNeighbour = null;

        --this.length;

        return leftmostElement;
    }

    forEachAndHeadAndTail({headCallback, bodyCallback, tailCallback})
    {
        headCallback(this.head);

        let currentSegment = this.head.rightNeighbour;
        while (currentSegment.rightNeighbour)
        {
            bodyCallback(currentSegment);
            currentSegment = currentSegment.rightNeighbour;
        }

        tailCallback(this.tail);
    }
}