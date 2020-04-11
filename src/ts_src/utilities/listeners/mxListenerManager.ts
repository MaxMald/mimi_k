import { MxListener } from "./mxListener";

export class MxListenerManager
{
    /****************************************************/
    /* Private                                          */
    /****************************************************/
    
    private m_listener_map : Map<string, MxListener[]>;

    /****************************************************/
    /* Public                                           */
    /****************************************************/
    
    public constructor(){
        this.m_listener_map = new Map<string, MxListener[]>();
        return;
    }

    public call(_event : string)
    : void {
        if(this.m_listener_map.has(_event)) {
            let event : Array<MxListener> 
                = this.m_listener_map.get(_event);
            
            let size : number = event.length;
            for(let index = 0; index < size; ++index) {
                event[index].call();
            }
        }
        return;
    }

    public addEvent(_event : string)
    : void {
        if(!this.m_listener_map.has(_event)) {
            this.m_listener_map.set(_event, new Array<MxListener>());
        }
        return;
    }

    public addListener(_event : string, _listener : MxListener)
    : void {
        if(this.m_listener_map.has(_event)) {
            let event : Array<MxListener> 
                = this.m_listener_map.get(_event);
            event.push(_listener);
        }
        return;
    }

    public clearEvent(_event : string)
    : void {
        if(this.m_listener_map.has(_event)) {
            let event : Array<MxListener> 
                = this.m_listener_map.get(_event);
            
            while(event.length) {
                let listener : MxListener = event.pop();
                listener.destroy();
            }
        }
        return;
    }

    /**
    * Safely destroys the object.
    */
    public destroy()
    : void {
        this.m_listener_map.forEach
        (
            function(_a_listeners : MxListener[], _key : string)
            : void
            {
                this.clearEvent(_key);
                return;
            },
            this
        );
        this.m_listener_map.clear();
        return;
    }
    
}