class Snake extends GameObject
{
    constructor(startX, startY, startingLength, speed, height, width, segmentType = CONSTANTS.SNAKE_DEFAULT_SEGMENT_TYPE)
    {
        super(startX, startY, height, width);

        this._speed = speed;
        // Coupling
        this._body = new SnakeBody(new SnakeSegment(10, 10, height, width, segmentType), segmentType);

        for (let current = 1; current < startingLength; ++current)
        {
            // Segment type
            let newSegment = new SnakeSegment(10, 10, height, width, segmentType);
            this.body.addToTail(newSegment);
        }
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

    moveToCoordinates(x, y)
    {
        this.body.head.x = x;
        this.body.head.y = y;
    }

    move(direction)
    {
        // debugger;
        let nextCoordinates = this._getDeltaForDirection(direction);
        let currentSegment = this.body.popRightmostElement();

        currentSegment.y = (this.body.head.y + nextCoordinates.y);
        currentSegment.x = (this.body.head.x + nextCoordinates.x);

        this.body.addToHead(currentSegment);
    }

    // TODO: Method needs implementation
    hasBittenItsTail()
    {
        // Will never work without better segment spacing
        // let snakeHasBittenTail = false;
        // for (let current = 1, snakeLength = this.segments.length; current < snakeLength; ++current)
        // {
        //     if (helpers.objectsAreColliding(this.head, this.segments[current]))
        //     {
        //         snakeHasBittenTail = true;
        //     }
        // }

        return false;
    }

    caughtFeed(feed)
    {
        let feedHasBeenCaught = helpers.objectsAreColliding(feed, this.body.head);

        if (feedHasBeenCaught)
        {
            let newSegment = new SnakeSegment(this.body.head.x, this.body.head.y, this.height, this.width, this.body.type);
            this.body.addToTail(newSegment);
            console.log('Feed caught, snake extended!');
        }

        return feedHasBeenCaught;
    }

    _getDeltaForDirection(direction)
    {
        this.directionDeltas = {};

        this.directionDeltas[directionsEnum.none] = { x: 0, y: 0 };
        this.directionDeltas[directionsEnum.up] = { x: 0, y: -this.speed };
        this.directionDeltas[directionsEnum.down] = { x: 0, y: this.speed };
        this.directionDeltas[directionsEnum.left] = { x: -this.speed, y: 0 };
        this.directionDeltas[directionsEnum.right] = { x: this.speed, y: 0 };

        return this.directionDeltas[direction];
    }
}