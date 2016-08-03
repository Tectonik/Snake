class PlayingField extends GameObject
{
    constructor(targetDiv, height, width)
    {
        super(0, 0, height, width);

        const canvas = document.createElement('canvas');
        canvas.height = height;
        canvas.width = width;
        // FIXME: Coupling?
        canvas.display = 'inline-block';
        targetDiv.appendElement(canvas);

        this._context = canvas.getContext('2d');
    }

    get context()
    {
        return this._context;
    }

    objectIsWithinBounds(object)
    {
        const objectIsWithinFieldBounds =
            object.y >= this.y &&
            object.x >= this.x &&
            object.y + object.height <= this.height &&
            object.x + object.width <= this.width;

        // Example of feature I forgot about long ago
        // console.log(`${object.constructor.name} x:${object.x} : y:${object.y}`);

        return objectIsWithinFieldBounds;
    }
}