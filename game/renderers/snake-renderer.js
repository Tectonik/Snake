class SnakeRenderer extends Renderer
{
    constructor(objectToRender, context, fillStyle)
    {
        super(objectToRender, context, fillStyle);

        this._renderers[segmentTypes.sphere] = function (objectToRender, context)
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

        this._renderers[segmentTypes.rectangle] = function (snake, context)
        {
            // Better implementation required
            let snakeBody = snake.body;
            context.rect(
                snakeBody.head.x,
                snakeBody.head.y,
                snakeBody.head.width,
                snakeBody.head.height
            );
        };
    }

    // TODO: Refactor
    render()
    {
        this.context.save();

        // Heavy coupling
        this.context.fillStyle = 'rgb(0, 128, 0)';

        this.context.beginPath();
        this.renderers[this.objectToRender.body.type](this.objectToRender, this.context);
        super.render();

        this.context.restore();
    }

    unrender()
    {
        let snakeBody = this.objectToRender.body;
        this.context.clearRect(
            snakeBody.tail.x,
            snakeBody.tail.y,
            snakeBody.tail.width,
            snakeBody.tail.height
        );
    }
}