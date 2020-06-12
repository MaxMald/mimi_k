import { MxComponentMng } from "./mxComponentMng";
import { MxComponent } from "./mxComponent";
import { MxUObject } from "../gameObjects/mxUObject";
import { MxChildrenManager } from "../data/mxChildrenManager";
import { MxUUID } from "../mxUUID";
import { ObjectPool } from "../mxObjectPool";
import { OPRESULT } from "../enum_commons";
import { MESSAGE_ID } from "../../game/gameCommons";

export class MxActor extends MxUObject
{
    /****************************************************/
    /* Public                                           */
    /****************************************************/
    
    /**
     * 
     */
    m_mx_active : boolean;

    /**
     * Object's direction.
     */
    m_direction : Phaser.Math.Vector2;    

    /**
     * Reference to the ObjecPool of this MxActor. This can be null.
     */
    m_obj_pool : ObjectPool<MxActor>;

    /****************************************************/
    /* Protected                                        */
    /****************************************************/
    
    readonly _m_component_mg : MxComponentMng;

    /**
     * MxChildrenManager object.
     */
    _m_children_manager : MxChildrenManager<MxActor>;

    /**
     * MxManager Tag.
     */
    _m_tag : number;

    /**
     * Reference to the parent.
     */
    _m_parent : MxActor

    /**
     * MxManager Identifier.
     */
    _m_id : number;

    /**
     * Object's position in the world.
     */
    _m_position : Phaser.Geom.Point;

    /**
     * Object's relative position. f you want to modified the actor's position, use
     * the method setPosition instead, so the relative position can be modified too.
     */
    _m_relative_position : Phaser.Geom.Point;

    /****************************************************/
    /* Private                                          */
    /****************************************************/
    
    static _NULL_OBJECT : MxActor;

    /****************************************************/
    /* Public                                           */
    /****************************************************/

    /**
     * Prepare the Master Manager and NullObject.
     */
    static Prepare()
    : void 
    {
        if( MxActor._NULL_OBJECT === undefined 
            || MxActor._NULL_OBJECT == null )
        {
            ///////////////////////////////////
            // Null Object
            
            MxActor._NULL_OBJECT = new MxActor();
            MxActor._NULL_OBJECT._m_id = -1;  
            MxActor._NULL_OBJECT._m_tag = -1;

            MxActor._NULL_OBJECT._m_parent = MxActor._NULL_OBJECT;     
        }
        return;
    }

    /**
     * Shutdown Null Object.
     */
    static Shutdown()
    : void 
    {
        if (typeof MxActor._NULL_OBJECT == 'object')
        {
            this._NULL_OBJECT.destroy();
            this._NULL_OBJECT = null;
        }
        return;
    }

     /**
     * Check if the given object is the Null Object.
     */
    static IsNull(_obj : MxActor)
    : boolean 
    {
        let _obj_uuid : MxUUID = _obj.getUUID();
        return this._NULL_OBJECT.getUUID().compare(_obj_uuid);
    }

    /**
     * Get Object Null.
     */
    static GetNull()
    : MxActor 
    {
        return this._NULL_OBJECT;
    }

    /**
     * Creates a new MxActors.
     * 
     * @param _id MxActor identifier.      
     * @param _m_parent MxActor's parent.
     */
    static Create
    (
        _id : number,        
        _m_parent ?: MxActor 
    )
    : MxActor 
    {
        let actor : MxActor = new MxActor();

        actor._m_children_manager = new MxChildrenManager<MxActor>();
        actor._m_id = _id;
        actor._m_tag = -1;       
      
        if(typeof _m_parent == 'object') {
          if(_m_parent.addChild(actor) != OPRESULT.kOk) {
            actor._m_parent = MxActor.GetNull();
          }
        }
        else {
          actor._m_parent = MxActor.GetNull();
        }
        
        actor.setRelativePosition(0,0);
        return actor;
    }

    /**
     * Creates a child of this MxActor. This method will returns
     * a Null Object if the parent already has a MxActor with the same
     * identifier.
     * 
     * @param _id {number} MxManager identifier.
     */
    create(_id : number)
    : MxActor 
    {
        let actor : MxActor = MxActor.Create(_id, this);
        
        if(this._m_children_manager.add(actor) != OPRESULT.kOk) {
            actor.destroy();
            return MxActor.GetNull();
        }

        actor._m_parent = this;
        return actor;
    }

    addChild(_child : MxActor)
    : OPRESULT 
    {
        if(this._m_children_manager.exists(_child.get_id())) {
            return OPRESULT.kObject_already_exists;
        }

        let result : OPRESULT = this._m_children_manager.add(_child);
        if(result == OPRESULT.kOk) {
            _child._m_parent = this;
        }
        return result; 
    }

    init()
    : void 
    {
        this._m_component_mg.init();
        this._m_children_manager.forEach
        (
            function(_actor : MxActor) {
                _actor.init();
            }
        );
        return;
    }

    /**
     * Update MxActor's components.
     */
    update()
    : void  
    {
        this.updatePosition();
        this._m_component_mg.update();
        this._m_children_manager.forEach (
            this._update_child
        );
        return;
    }

    /**
     * Get this MxActor's MxComponentManager.
     */
    getComponentMng()
    : MxComponentMng 
    {
        return this._m_component_mg;
    }

    addComponent(_component : MxComponent)
    : OPRESULT 
    {
        return this._m_component_mg.addComponent(_component);
    }

    /**
     * Get this MxActor's MxComponent.
     * @param _id 
     */
    getComponent<T extends MxComponent>(_id : number)
    : T 
    {
        return this._m_component_mg.getComponent<T>(_id);
    }

    /**
     * Clears de MxComponentManager.
     */
    clearComponentManager()
    : void 
    {
        this._m_component_mg.clear();
        return;
    }

    setRelativePosition(_x : number, _y : number)
    : void
    {
      this._m_relative_position.x = _x;
      this._m_relative_position.y = _y;
      
      this.updatePosition();
      return;
    }

    updatePosition()
    : void
    {
      if(!MxActor.IsNull(this._m_parent))
      {
        this._m_position.x = this._m_parent._m_position.x + this._m_relative_position.x;
        this._m_position.y = this._m_parent._m_position.y + this._m_relative_position.y;
      }
      else
      {
        this._m_position.x = this._m_relative_position.x;
        this._m_position.y = this._m_relative_position.y;
      }
      return;
    }

    /**
     * Sends a message to this MxActor's component.
     * 
     * @param _id Message identifier. 
     * @param _data Message data.
     * @param _recursive Send the message to the the MxActor's childrens.
     */
    sendMessage
    (
        _id : number, 
        _data : unknown, 
        _recursive: boolean = false
    )
    : void 
    {
        this._m_component_mg.sendMessage(_id, _data);

        if(_recursive) {
            this.sendMessage_to_children(_id, _data);
        }
        return;
    }

    /**
     * Sends a message to this MxActor's children.
     * 
     * @param _id Message identifier. 
     * @param _data Message data.
     */
    sendMessage_to_children(_id : number, _data : unknown)
    : void 
    {
        this._m_children_manager.forEach
        (
            function(_child : MxActor) {
                _child.sendMessage(_id, _data, true);
            }
        );
        return;
    }

    /**
     * Safely destroys this MxActor, children will be destroyed too.
     */
    destroy()
    : void 
    {
        this._m_children_manager.destroy();
        this._m_component_mg.destroy();
        super.destroy();
        return;
    }

    /**
     * Removes a child by its identifier.
     * 
     * @param _id MxManager identifier. 
     */
    remove_child_by_id(_id : number)
    : MxActor 
    {
        let to_remove : MxActor =  
            this._m_children_manager.remove_by_id(_id);
        
        if(to_remove == null) {
            to_remove = MxActor.GetNull();
        }
        return to_remove;
    }

    /**
     * Removes a child from this MxManager.
     * 
     * @param _manager 
     */
    remove_child(_manager : MxActor)
    : void 
    {
        this._m_children_manager.remove(_manager);
        return;
    }

    /**
     * Gets a child by its identifier.
     * 
     * @param _id MxManager identifier. 
     */
    get_child(_id : number)
    : MxActor 
    {
        if(typeof this._m_children_manager == 'object') {
            if(this._m_children_manager.exists(_id)) {
                return this._m_children_manager.getChild(_id);
            }
        }
        return MxActor.GetNull();
    }

    /**
     * Gets this actor's identifier.
     */
    get_id()
    : number 
    {
        return this._m_id;
    }

    mxActive()
    : void 
    {
        this.sendMessage
        (
            MESSAGE_ID.kOnAgentActive,
            null,
            true
        );
        return;
    }

    mxDesactive()
    : void 
    {
        this.sendMessage
        (
            MESSAGE_ID.kOnAgentDesactive,
            null,
            true
        );
        return;
    }

    /****************************************************/
    /* Protected                                        */
    /****************************************************/
    
    protected constructor() 
    {
        super();

        this._m_position = new Phaser.Geom.Point(0.0, 0.0);
        this._m_relative_position = new Phaser.Geom.Point(0.0, 0.0);
        this.m_direction = new Phaser.Math.Vector2(1.0,0.0);

        this._m_component_mg = new MxComponentMng();
        this._m_component_mg.setActor(this);
        return;
    }

    /****************************************************/
    /* Private                                          */
    /****************************************************/
    
    _update_child(_actor : MxActor)
    : void 
    {
        _actor.update();
        return;
    }
}