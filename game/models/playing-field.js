class PlayingField extends GameObject
{
    constructor(canvas, height, width)
    {
        super(0, 0, height, width);

        canvas.height = height;
        canvas.width = width;
        canvas.display = 'inline-block';

        this._gameContext = canvas.getContext('2d');
    }

    get gameContext()
    {
        return this._gameContext;
    }

    objectIsWithinBounds(object)
    {
        let objectIsWithinFieldBounds =
            object.y >= this.y &&
            object.x >= this.x &&
            object.y + object.height <= this.height &&
            object.x + object.width <= this.width;

        // Example of feature I forgot about long ago
        // console.log(`${object.constructor.name} x:${object.x} : y:${object.y}`);

        return objectIsWithinFieldBounds;
    }
}