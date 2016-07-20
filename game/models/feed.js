class Feed extends GameObject
{
    constructor(startX, startY, height, width, type = CONSTANTS.FEED_DEFAULT_TYPE)
    {
        super(startX, startY, height, width);

        this._type = type;
    }

    get type()
    {
        return this._type;
    }

    move(nextX, nextY)
    {
        this.x = nextX;
        this.y = nextY;
    }

    // TODO: Refactor, use this
    randomizeCoordinates(fieldTop, fieldLeft, fieldHeight, fieldWidth)
    {
        this.x = helpers.getRandomInRange(fieldLeft, fieldWidth - this.width);
        this.y = helpers.getRandomInRange(fieldTop, fieldHeight - this.height);

        return this;
    }
}