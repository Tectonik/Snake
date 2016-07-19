class SnakeRenderer extends Renderer
{
    constructor(objectToRender, context, fillStyle)
    {
        super(objectToRender, context, fillStyle);

        this._renderers[segmentTypesEnum.sphere] = function (objectToRender, context)
        {
            // Better implementation required
            let snakeSegments = objectToRender.segments;
            snakeSegments.forEach(
                (segment) =>
                {
                    context.arc(
                        segment.x,
                        segment.y,
                        // FIXME: Coupling
                        (segment.width + segment.height) / 2,
                        0,
                        2 * Math.PI
                    );
                });
        };

        this._renderers[segmentTypesEnum.rectangle] = function (objectToRender, context)
        {
            // Better implementation required
            let snakeSegments = objectToRender.segments;
            snakeSegments.forEach(
                (segment) =>
                {
                    context.rect(
                        segment.x,
                        segment.y,
                        segment.width,
                        segment.height
                    );
                });
        };
    }

    // TODO: Refactor
    render()
    {
        this.context.save();

        // Heavy coupling
        this.context.fillStyle = 'rgb(0, 128, 0)';

        this.context.beginPath();
        this.renderers[this.objectToRender.segments[0].type](this.objectToRender, this.context);
        super.render();

        this.context.restore();
    }
}