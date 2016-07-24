class Snake extends GameObject
{
    constructor(startX, startY, startingLength, speed, height, width, segmentType = CONSTANTS.SNAKE_DEFAULT_SEGMENT_TYPE)
    {
        super(startX, startY, height, width);

        this._speed = speed;
        this._body = new SnakeBodyDequeue(new LinkedSnakeSegment(CONSTANTS.SNAKE_STARTING_X, CONSTANTS.SNAKE_STARTING_Y, height, width, segmentType), segmentType);

        for (let current = 1; current < startingLength; ++current)
        {
            this.extendWithAutoGeneratedSegment();
        }

        this._allSegmentXCoordinates = new Set(this.body.mapToArray((segment) => segment.x));
        this._allSegmentYCoordinates = new Set(this.body.mapToArray((segment) => segment.y));
        // debugger;
    }

    get head()
    {
        return this.body.head;
    }

    get body()
    {
        return this._body;
    }

    set body(value)
    {
        this._body = value;
    }

    get x()
    {
        return this.body.head.x;
    }

    set x(value)
    {
        this.head.body.x = value;
    }

    get y()
    {
        return this.body.head.y;
    }

    set y(value)
    {
        this.head.body.y = value;
    }

    get segments()
    {
        return this._body;
    }

    get speed()
    {
        return this._speed;
    }

    set speed(value)
    {
        this._speed = +value;
    }

    // get _allSegmentXCoordinates()
    // {

    // }

    // set _allSegmentXCoordinates(value)
    // {

    // }

    // get _allSegmentYCoordinates()
    // {

    // }

    // set _allSegmentYCoordinates(value)
    // {

    // }

    moveToCoordinates(x, y)
    {
        this.body.head.x = x;
        this.body.head.y = y;
    }

    move(direction)
    {
        let nextCoordinates = this._getDeltaForDirection(direction);
        let lastMovedSegment = this.body.popRightmostElement();

        lastMovedSegment.y = (this.body.head.y + nextCoordinates.y);
        lastMovedSegment.x = (this.body.head.x + nextCoordinates.x);

        this.body.addToHead(lastMovedSegment);
    }

    // TODO: Method needs implementation
    hasBittenItsTail()
    {
        // Will never work without better segment spacing
        let allSegmentXCoords = this._allSegmentXCoordinates;
        let allSegmentYCoords = this._allSegmentYCoordinates;

        return false;
    }

    extendWithAutoGeneratedSegment()
    {
        let newSegment = new LinkedSnakeSegment(this.body.head.x, this.body.head.y, this.height, this.width, this.body.type);
        this._addSegment(newSegment);
    }

    caughtFeed(feed)
    {
        let feedHasBeenCaught = helpers.objectsAreColliding(feed, this.body.head);

        if (feedHasBeenCaught)
        {
            this.extendWithAutoGeneratedSegment();
        }

        return feedHasBeenCaught;
    }

    _addSegment(segment)
    {
        this.body.addToTail(segment);
        console.log(`Feed caught, snake extended to ${this.body.length}`);
    }

    _getDeltaForDirection(direction)
    {
        this.directionDeltas = {};
        this.directionDeltas[directions.none] = { x: 0, y: 0 };
        this.directionDeltas[directions.up] = { x: 0, y: -this.speed };
        this.directionDeltas[directions.down] = { x: 0, y: this.speed };
        this.directionDeltas[directions.left] = { x: -this.speed, y: 0 };
        this.directionDeltas[directions.right] = { x: this.speed, y: 0 };

        return this.directionDeltas[direction];
    }
}