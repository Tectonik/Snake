class SnakeRenderer extends Renderer
{
    constructor(objectToRender, context, style)
    {
        super(objectToRender, context, style);

        this._renderers[segmentTypes.sphere] = function (objectToRender, context)
        {
            // Better implementation required
            const snakeSegments = objectToRender.segments;
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
            const snakeSegments = snake.body;
            snakeSegments.forEach(
                (segment) =>
                {
                    context.rect(
                        segment.x,
                        segment.y,
                        segment.width,
                        segment.height
                    );
                }
            );
        };
    }

    // TODO: Refactor
    render()
    {
        // let snakeBody = this.objectToRender.body;
        // this.context.fillRect(
        //     snakeBody.head.x,
        //     snakeBody.head.y,
        //     snakeBody.head.width,
        //     snakeBody.head.height
        // );

        this.context.save();

        // Heavy coupling
        this.context.beginPath();
        this.renderers[this.objectToRender.body.type](this.objectToRender, this.context);
        super.render();

        this.context.restore();
    }

    unrender()
    {
        // let snakeBody = this.objectToRender.body;
        // this.context.clearRect(
        //     snakeBody.tail.x,
        //     snakeBody.tail.y,
        //     snakeBody.tail.width,
        //     snakeBody.tail.height
        // );
    }
}