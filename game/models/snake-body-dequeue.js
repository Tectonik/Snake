class SnakeBodyDequeue
{
    constructor(head, segmentType = CONSTANTS.SNAKE_DEFAULT_SEGMENT_TYPE)
    {
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
        segment.leftNeighbour = this.tail;
        segment.rightNeighbour = null;

        this.tail = segment;

        ++this.length;
    }

    addToHead(segment)
    {
        this.head.leftNeighbour = segment;
        segment.rightNeighbour = this.head;
        segment.leftNeighbour = null;

        this.head = segment;

        ++this.length;
    }

    popRightmostElement()
    {
        let rightmostElement = this.tail;
        let leftToRightmostElement = this.tail.leftNeighbour;

        this.tail = leftToRightmostElement;
        this.tail.rightNeighbour = null;

        --this.length;

        return rightmostElement;
    }

    popLeftmostElement()
    {
        let leftmostElement = this.head;
        let rightToLeftmostElement = this.head.rightNeighbour;

        this.head = rightToLeftmostElement
        this.head.leftNeighbour = null;

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

    mapToArray(callback)
    {
        let currentSegment = this.head;
        let result = [];
        while (currentSegment)
        {
            let currentResult = callback(currentSegment);
            currentSegment = currentSegment.rightNeighbour;

            result.push(currentResult);
        }

        return result;
    }
}