class SnakeBody
{
    constructor(head, segmentType = CONSTANTS.SNAKE_DEFAULT_SEGMENT_TYPE, tail = head)
    {
        super();

        this._head = head;
        this.tail = tail;
        this._segmentType = segmentType;
    }

    get head()
    {
        return this._head;
    }

    set head(value)
    {
        this._head = value;
    }

    get tail()
    {
        return this._tail;
    }

    set tail(value)
    {
        this._tail = value;
    }

    get type()
    {
        return this._segmentType;
    }

    addToRight(segment)
    {
        this.tail.rightNeighbour = segment;
        this.tail = segment;
    }

    addToLeft(segment)
    {
        this.head.leftNeighbour = segment;
        this.head = segment;
    }

    popRightmostElement()
    {
        let rightmostElement = this.tail;
        this.tail = rightmostElement.leftNeighbour;

        return rightmostElement;
    }

    popLeftmostElement()
    {
        let leftmostElement = this.head;
        this.head = leftmostElement.rightNeighbour;

        return leftmostElement;
    }

    forEach(callback)
    {
        let currentSegment = this.head;
        while (currentSegment)
        {
            callback(currentSegment);
            currentSegment = currentSegment.rightNeighbour;
        }
    }
}