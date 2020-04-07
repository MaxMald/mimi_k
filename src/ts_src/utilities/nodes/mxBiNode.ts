import { MxNode } from "./mxNode";

export class MxBiNode<T> extends MxNode
{
    protected m_next : MxBiNode<T>;
    protected m_previous : MxBiNode<T>;
    protected m_object : T;

    public constructor()
    {
        super();
        return;
    }
    
    public static SetObject<U>(_bi_node : MxBiNode<U>, _object : U)
    : void
    {
        _bi_node.m_object = _object;
        return;
    }

    public static IsNull<U>(_bi_node : MxBiNode<U>)
    : boolean
    {
        return _bi_node.m_object == null;
    }

    public getObject()
    : T
    {
        return this.m_object;
    }

    public attachNext(_bi_node : MxBiNode<T>)
    : void
    {
        this.m_next = _bi_node;
        _bi_node.m_previous = this;
        return;
    }

    public attachPrevious(_bi_node : MxBiNode<T>)
    : void
    {
        this.m_previous = _bi_node;
        _bi_node.m_next = this;
        return;
    }

    public dettachNext()
    : void
    {
        if(this.m_next != null)
        {
            this.m_next.m_previous = null;
        }
        this.m_next = null;
        return;
    }

    public dettachPrevious()
    : void
    {
        if(this.m_previous != null)
        {
            this.m_previous.m_next = null;
        }
        this.m_previous = null;
        return;
    }

    public getNext()
    : MxBiNode<T>
    {
        return this.m_next;
    }

    public getPrevious()
    : MxBiNode<T>
    {
        return this.m_previous;
    }
}