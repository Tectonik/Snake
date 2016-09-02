class SnakeSegment extends GameObject
{
    constructor(startX, startY, height, width)
    {
        super(startX, startY, height, width);

        this._leftNeighbour = null;
        this._rightNeighbour = null;
    }

    get leftNeighbour()
    {
        return this._leftNeighbour;
    }

    set leftNeighbour(value)
    {
        this._leftNeighbour = value;
    }

    get rightNeighbour()
    {
        return this._rightNeighbour;
    }

    set rightNeighbour(value)
    {
        this._rightNeighbour = value;
    }
}