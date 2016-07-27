class Feed extends GameObject
{
    constructor(startX, startY, height, width, type = constants.FEED_DEFAULT_TYPE)
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
}