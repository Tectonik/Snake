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

    get renderers()
    {
        return this._renderers;
    }

    set renderers(value)
    {
        this._renderers = value;
    }
}