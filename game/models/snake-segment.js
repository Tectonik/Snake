class SnakeSegment extends GameObject
{
    constructor(startX, startY, height, width, segmentType = CONSTANTS.SNAKE_DEFAULT_SEGMENT_TYPE)
    {
        super(startX, startY, height, width);

        this._segmentType = segmentType;
    }

    get type()
    {
        return this._segmentType;
    }
}