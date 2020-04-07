export class MxNodeMap
{
    protected m_width;
    protected m_height;

    public constructor
    (
        _width : number, 
        _height : number
    )
    {
        this.m_width = _width;
        this.m_height = _height;
        return;
    }

    public init()
    : void
    {
        return;
    }

    public getWidth()
    : number
    {
        return this.m_width;
    }

    public getHeight()
    : number
    {
        return this.m_height;
    }
}