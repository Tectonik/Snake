class SnakeBody
{
    constructor(head, segmentType = CONSTANTS.SNAKE_DEFAULT_SEGMENT_TYPE)
    {
        // super();

        this._head = head;
        this._tail = head;
        this._segmentType = segmentType;
        this._length = 1;
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

    get length()
    {
        return this._length;
    }

    set length(value)
    {
        this._length = value;
    }

    addToTail(segment)
    {
        this.tail.rightNeighbour = segment;
        this.tail = segment;
        ++this.length;
    }

    addToHead(segment)
    {
        this.head.leftNeighbour = segment;
        this.head = segment;
        ++this.length;
    }

    popRightmostElement()
    {
        let rightmostElement = this.tail;
        this.tail = rightmostElement.leftNeighbour;
        --this.length;

        return rightmostElement;
    }

    popLeftmostElement()
    {
        let leftmostElement = this.head;
        this.head = leftmostElement.rightNeighbour;
        --this.length;

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