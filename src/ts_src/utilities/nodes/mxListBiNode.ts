import { MxBiNode } from "./mxBiNode";

export class MxListBiNode<T>
{
    public readonly m_begin : MxBiNode<T>;
    public readonly m_end : MxBiNode<T>;

    protected m_length : number;

    constructor()
    {
        this.m_begin = new MxBiNode<T>();
        this.m_end = new MxBiNode<T>();

        this.m_begin.attachNext(this.m_end);
        this.m_length = 0;
        return;
    }

    public addEnd(_bi_node : MxBiNode<T>)
    : void
    {
        if(this._internalNode)
        {
            console.warn("Can't add an internal node.");
            return;
        }

        let last_element = this.m_end.getPrevious();
        this.m_end.dettachPrevious();

        this.m_end.attachPrevious(_bi_node);
        last_element.attachNext(_bi_node);
        
        this.m_length++;
        return;
    }

    public addBeginning(_bi_node : MxBiNode<T>)
    : void
    {
        if(this._internalNode)
        {
            console.warn("Can't add an internal node.");
            return;
        }

        let first_element = this.m_begin.getNext();
        this.m_begin.dettachNext();

        this.m_begin.attachNext(_bi_node);
        first_element.attachPrevious(_bi_node);    
        
        this.m_length++;
        return;
    }

    public getNode(_idx : number)
    : MxBiNode<T>
    {
        return 
    }

    public getFirst()
    : MxBiNode<T>
    {
        return this.m_begin.getNext();
    }

    public getLast()
    : MxBiNode<T>
    {
        return this.m_end.getPrevious();
    }

    public getLength()
    : number
    {
        return this.m_length;
    }

    protected _internalNode(_bi_node : MxBiNode<T>)
    : boolean
    {
        return (this.m_begin == _bi_node || this.m_end == _bi_node);
    }
}