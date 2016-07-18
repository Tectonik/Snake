class Snake extends GameObject
{
    constructor(startX, startY, startingLength, speed, height, width, segmentType = CONSTANTS.SNAKE_DEFAULT_SEGMENT_TYPE)
    {
        super(startX, startY, height, width);

        this._speed = speed;
        this._segments = [];

        for (let current = 0; current < startingLength; ++current)
        {
            // Segment type
            let newSegment = new SnakeSegment(10, 10, height, width, segmentType);
            this._segments.push(newSegment);
        }

        this._head = this.segments[0];
    }

    get head()
    {
        return this._head;
    }

    get x()
    {
        return this.head.x;
    }

    set x(value)
    {
        this.head.x = value;
    }

    get y()
    {
        return this.head.y;
    }

    set y(value)
    {
        this.head.y = value;
    }

    get segments()
    {
        return this._segments;
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
        this.head.x = x;
        this.head.y = y;
    }

    move(direction)
    {
        let nextCoordinates = this._getDeltaForDirection(direction);

        // Allows for smooth movement
        // Extremely slow
        // Get last updated
        // Queue
        // Slow, needs reimplementation
        // Segments need better spacing
        for (let current = this.segments.length - 1; current > 0; --current)
        {
            let lastSegment = this.segments[current - 1];
            let currentSegment = this.segments[current];

            currentSegment.x = lastSegment.x;
            currentSegment.y = lastSegment.y;
        }

        this.segments[0].x += nextCoordinates.x;
        this.segments[0].y += nextCoordinates.y;

        // Faster, also needs reimplementation
        // let currentSegment = this.segments.pop();
        // currentSegment.x += nextCoordinates.x;
        // currentSegment.y += nextCoordinates.y;

        // this.segments.unshift(currentSegment);
    }

    hasBittenItsTail()
    {
        // Will never work without better segment spacing
        let snakeHasBittenTail = false;
        for (let current = 1, snakeLength = this.segments.length; current < snakeLength; ++current)
        {
            if (helpers.objectsAreColliding(this.head, this.segments[current]))
            {
                snakeHasBittenTail = true;
            }
        }

        return false;
    }

    caughtFeed(feed)
    {
        let feedHasBeenCaught = helpers.objectsAreColliding(feed, this.head);

        if (feedHasBeenCaught)
        {
            let newSegment = new SnakeSegment(this.head.x, this.head.y, this.height, this.width, this.head.type);
            this.segments.push(newSegment);
            // console.log('Feed caught, snake extended!');
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