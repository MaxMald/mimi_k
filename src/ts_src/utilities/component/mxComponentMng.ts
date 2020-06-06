import { MxComponent } from "./mxComponent";
import { MxActor } from "./mxActor";
import { AssertNumber } from "../asserts";
import { OPRESULT } from "../enum_commons";

export class MxComponentMng
{
    /****************************************************/
    /* Private                                          */
    /****************************************************/
    
    private _m_actor : MxActor;

    private m_component_map : Map<number, MxComponent>;

    /****************************************************/
    /* Public                                           */
    /****************************************************/
    
    /**
     * Creates a MxComponentMng with no MxComponent and a Null Object of MxActor.
     */
    public constructor()
    {
        this.m_component_map = new Map<number,MxComponent>();
        this._m_actor = null;
        return;
    }

    /**
     * Sets the MxActor who this MxComponentMng belongs.
     * 
     * @param _actor {MxActor} MxActor who this MxComponent belongs. 
     */
    public setActor(_actor : MxActor)
    : void 
    {
        this._m_actor = _actor;
        return;
    }

    /**
     * Initialize each MxComponent that this MxComponent has.
     */
    public init()
    : void 
    {
        this.m_component_map.forEach
        (
            function(_component : MxComponent) {
                _component.init(this._m_actor);
                return;
            },
            this
        );
        return;
    }

    /**
     * Update each MxComponent that this MxComponentMng has.
     */
    public update()
    : void 
    {
        this.m_component_map.forEach
        (
            function(_component : MxComponent)
            {
                _component.update(this._m_actor);
                return;
            },
            this
        );
        return;
    }

    public sendMessage(_id : number , _data : unknown)
    : void 
    {
        this.m_component_map.forEach
        (
            function(_component : MxComponent)
            {
                _component.receive(_id, _data);
                return;
            },
            this
        );
        return;
    }

    /**
     * Adds a MxComponent to this MxComponentMng.
     * 
     * @param _component 
     */
    public addComponent(_component : MxComponent)
    : OPRESULT 
    {
        if(this.m_component_map.has(_component.get_id())) {
            return OPRESULT.kObject_already_exists;
        }

        this.m_component_map.set(_component.get_id(), _component);
        return OPRESULT.kOk;
    }

    /**
     * Remove a MxComponent from this MxComponentMng by its identifier.
     * 
     * @param _id 
     */
    public removeComponent(_id : number)
    : void 
    {
        this.m_component_map.delete(_id);
        return;
    }

    public getComponentsWithTag(_tag : number)
    : MxComponent[]
    {
        AssertNumber(_tag);

        let a_cmp : MxComponent[] 
            = new Array<MxComponent>();

        this.m_component_map.forEach
        (
            function(_component : MxComponent){
                if(_component.m_tag == null || _component.m_tag === undefined) {
                    return;
                }

                if(_component.m_tag == _tag) {
                    a_cmp.push(_component);
                }
                return;
            },
            this
        );

        return a_cmp
    }

    public removeComponentsWithTag(_tag : number)
    : void
    {
        let a_toRemove : MxComponent[] 
            = this.getComponentsWithTag(_tag);

        while(a_toRemove.length) {
            this.removeComponent(a_toRemove.pop().get_id());
        }
        return;
    }

    /**
     * Check if this MxComponentMng has a MxComponent by its identifier.
     * 
     * @param _id 
     */
    public hasComponent(_id : number)
    : boolean 
    {
        return this.m_component_map.has(_id);
    }

    /**
     * Gets a MxComponent from this manager. The template feature allows to 
     * get the component to a specific MxComponent subclass.
     * 
     * @param _id MxComponent's identifier. 
     */
    public getComponent<T extends MxComponent>(_id : number)
    : T 
    {
        if(this.m_component_map.has(_id)) {
            return (this.m_component_map.get(_id) as unknown) as T;
        }
        else {
            return MxComponent.GetNull() as T;
        }
    }

    /**
     * Removes all the components from this MxComponentManager.
     */
    public clear()
    : void
    {
        this.m_component_map.clear();
        return;
    }

    /**
     * Safely destroys this object.
     */
    public destroy()
    {
        this.m_component_map.forEach
        (
            function(_component : MxComponent){
                _component.destroy();
            }
        );
        this.m_component_map.clear();
        this.m_component_map = null;
        return;
    }

    /****************************************************/
    /* Private                                          */
    /****************************************************/   
}