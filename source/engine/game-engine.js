class GameEngine
{
    constructor(context, renderers)
    {
        this._context = context;
        this._renderers = renderers;
        this._frameCount = 0;
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

    get frameCount()
    {
        return this._frameCount;
    }

    set frameCount(value)
    {
        this._frameCount = value;
    }
}