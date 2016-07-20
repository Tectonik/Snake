class GameEngine
{
    constructor(context, renderers)
    {
        this._context = context;
        this._renderers = renderers;
    }

    get context()
    {
        return this._context;
    }

    get renderer()
    {
        return this._snakeRenderer;
    }
}