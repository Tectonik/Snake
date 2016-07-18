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

    static randomizeCoordinates(fieldTop, fieldLeft, fieldHeight, fieldWidth)
    {
        let x = helpers.getRandomInRange(fieldLeft, fieldWidth);
        let y = helpers.getRandomInRange(fieldTop, fieldHeight);

        let nextCoordinates = { x, y };
        return nextCoordinates;
    }
}