class GameObject
{
    constructor(startX, startY, height, width)
    {
        this._x = startX;
        this._y = startY;
        this._height = height;
        this._width = width;
    }

    get height()
    {
        return this._height;
    }

    set height(value)
    {
        this._height = height;
    }

    get width()
    {
        return this._width;
    }

    set width(value)
    {
        this._width = value;
    }

    get x()
    {
        return this._x;
    }

    set x(value)
    {
        this._x = value;
    }

    get y()
    {
        return this._y;
    }

    set y(value)
    {
        this._y = value;
    }

    moveToCoordinates({x, y})
    {
        this.body.head.x = x;
        this.body.head.y = y;
    }
}