import { OPRESULT } from "../enum_commons";

interface IObject
{
    /**
     * This method help us to identify the MxManager by
     * a legible number or enumerator.
     */
    get_id() : number;    

    /**
     * Useful method to destroy children.
     */
    destroy() : void;
}

/**
 * This class manage a group of objects, basically is a 
 * Map with the object's uuid as its key value.
 */
export class MxChildrenManager<T extends IObject> 
{
    /****************************************************/
    /* Protected                                        */
    /****************************************************/
    
    protected _children_map : Map<number, T>;

    /****************************************************/
    /* Public                                           */
    /****************************************************/
    
    /**
     * Creates a new MxChildrenManager with no children.
     */
    public constructor() 
    {
        this._children_map = new Map<number, T>();
        return;
    }

    /**
     * 
     * @param _fn 
     * @param _context 
     */
    public forEach
    (
        _fn : (_child : T) => void, 
        _context ?: any
    ) : void
    {
        this._children_map.forEach(_fn, _context);
        return;
    }

    /**
     * Adds a new child to this MxChildrenManager.
     * 
     * @param _child {T} Child to be added.
     * 
     * @returns {OPRESULT} 
     */
    public add(_child : T)
    : OPRESULT 
    {
        if(this._children_map.has(_child.get_id())) {
            return OPRESULT.kObject_already_exists;
        }

        this._children_map.set(_child.get_id(), _child);
        return OPRESULT.kOk;
    }

    /**
     * Check if an object already exists in this MxChildrenManager.
     */
    public exists(_id : number)
    : boolean
    {
        return this._children_map.has(_id);
    }

    /**
     * Gets a child from this MxChildrenManager.
     * 
     * @param _id 
     */
    public getChild(_id : number)
    : T {
        return this._children_map.get(_id);
    }

    /**
     * Remove a children from this MxChildrenManager. This method
     * doesn't destroy the children.
     * 
     * @param _child 
     */
    public remove(_child : T)
    : void 
    {
        ///////////////////////////////////
        // Remove from the ID's Map

        let id : number = _child.get_id();
        
        if(this._children_map.has(id)) {
            this._children_map.delete(id);
        }
        return;
    }

    /**
     * Removes a child by its id.
     * @param _id 
     */
    public remove_by_id(_id : number)
    : T {
        let to_remove : T = null;
        
        if(this._children_map.has(_id)) {
            to_remove = this._children_map.get(_id);
            this._children_map.delete(_id);
        }
        return to_remove;
    }


    /**
     * Clear this MxChildrenManager. This method doesn't destroy the 
     * children.
     */
    public clear()
    : void 
    {
        this._children_map.clear();
        return;
    }

    /**
     * Destroys the MxChildrenManager's children.
     */
    public destroyChildren()
    : void 
    {
        this._children_map.forEach
        (
            this._destroyChild,
            this
        );
        this.clear();
        return;
    }

    /**
    * Safely destroys the object.
    */
    public destroy()
    : void 
    {
        this.destroyChildren();
        this.clear();
        return;
    }

    /****************************************************/
    /* Private                                          */
    /****************************************************/
    
    private _destroyChild(_child : T)
    : void 
    {
        _child.destroy();
        return;
    }
   
}