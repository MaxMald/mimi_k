import { AssertFunction } from "../asserts";

export class MxListener
{
    private m_listener : ()=>void;
    private m_context : any;

    public constructor(_listener : ()=>void, _context?:any)
    {
        AssertFunction(_listener);
        this.m_listener = _listener;
        
        if(_context) {
            this.m_context = _context;
        }

        return
    }

    public call()
    : void
    {
        if(this.m_context){
            this.m_listener.call(this.m_context);        
        } else {
            this.m_listener();
        }        
        return;
    }

    public destroy()
    : void
    {
        this.m_listener = null;
        this.m_context = null;
        return;
    }
}

