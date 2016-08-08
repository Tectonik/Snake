class PlayingField extends GameObject
{
    constructor(targetDivString, height, width)
    {
        super(0, 0, height, width);

        const targetDiv = document.getElementsByClassName(targetDivString)[0];
        targetDiv.display = 'inline-block';
        targetDiv.height = height;
        targetDiv.width = width;

        const canvas = document.createElement('canvas');
        canvas.display = 'inline-block';
        canvas.height = height;
        canvas.width = width;

        targetDiv.appendChild(canvas);

        this._context = canvas.getContext('2d');
    }

    get context()
    {
        return this._context;
    }

    clear()
    {
        this
            .context
            .clearRect(this.x, this.y, this.width, this.height);
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