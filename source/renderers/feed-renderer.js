class FeedRenderer extends Renderer
{
    constructor(objectToRender, context, style)
    {
        super(objectToRender, context, style);

        this._renderers[feedTypes.rectangle] = function (objectToRender, context)
        {
            // Implementation required
            context.rect(
                objectToRender.x,
                objectToRender.y,
                objectToRender.width,
                objectToRender.height
            );
        };

        this._renderers[feedTypes.sphere] = function (objectToRender, context)
        {
            context.arc(
                objectToRender.x + objectToRender.width,
                objectToRender.y + objectToRender.height,
                // Coupling
                (objectToRender.width + objectToRender.height) / 2,
                0,
                2 * Math.PI
            );
        };
    }

    // TODO: Refactor
    render()
    {
        // this.context.fillStyle = 'rgb(230, 182, 44)';

        // this.context.fillRect(
        //     this.objectToRender.x,
        //     this.objectToRender.y,
        //     this.objectToRender.width,
        //     this.objectToRender.height
        // );

        this.context.save();

        // Heavy coupling
        this.context.beginPath();
        this.renderers[this.objectToRender.type](this.objectToRender, this.context);
        super.render();

        this.context.restore();
    }

    unrender()
    {
        // this.context.clearRect(
        //     this.objectToRender.x,
        //     this.objectToRender.y,
        //     this.objectToRender.width,
        //     this.objectToRender.height
        // );
    }
}