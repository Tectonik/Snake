class Renderer
{
    constructor(objectToRender, context)
    {
        this._objectToRender = objectToRender;
        this._context = context;
        this._renderers = {};

    }

    get renderers()
    {
        return this._renderers;
    }

    get context()
    {
        return this._context;
    }

    set context(value)
    {
        this._context = value;
    }

    get objectToRender()
    {
        return this._objectToRender;
    }
}