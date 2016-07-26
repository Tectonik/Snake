class Renderer
{
    constructor(objectToRender, context, style)
    {
        this._objectToRender = objectToRender;
        this._context = context;
        this._style = style;
        this._renderers = {};
    }

    get style()
    {
        return this._style;
    }

    set style(value)
    {
        this._style = value;
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

    // TODO: Refactor
    render()
    {
        if (this.style.type === fillStyles.fill || this.style.type === fillStyles.fillAndStroke)
        {
            this.context.fillStyle = this.style.fill;
            this.context.fill();
        }

        if (this.style.type === fillStyles.stroke || this.style.type === fillStyles.fillAndStroke)
        {
            this.context.strokeStyle = this.style.stroke;
            this.context.stroke();
        }
    }

    unrender()
    {

    }
}