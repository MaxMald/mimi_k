import { MxComponent } from "../../utilities/component/mxComponent";
import { COMPONENT_ID, MESSAGE_ID } from "../gameCommons";
import { MxActor } from "../../utilities/component/mxActor";

export class SpriteComponent extends MxComponent
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
    
  constructor()
  {
    super(COMPONENT_ID.kSprite);
    this._m_local_position = new Phaser.Geom.Point(0.0,0.0);
    return;
  }

  update(_actor : MxActor)
  : void 
  {
      this._m_sprite.x = _actor.m_position.x + this._m_local_position.x;
      this._m_sprite.y = _actor.m_position.y + this._m_local_position.y;
      return;
  }

  receive(_id : number, _data : unknown)
  : void 
  {
    if(_id == MESSAGE_ID.kOnAgentActive) {
      this.setVisible(true);
      this.setActive(true);
      return;
    }
    else if(_id == MESSAGE_ID.kOnAgentDesactive) {
      this.setVisible(false);
      this.setActive(false);
      return;
    }
  }

  setSprite(_sprite : Phaser.GameObjects.Sprite)
  : void 
  {
    this._m_sprite = _sprite;
    return;
  }

  setTexture(_texture_key : string)
  : void 
  {
    this._m_sprite.setTexture(_texture_key);
    return;
  }

  setFrame(_frame : number | string)
  : void 
  {
    this._m_sprite.setFrame(_frame);
    return;
  }

  getSprite()
  : Phaser.GameObjects.Sprite 
  {
    return this._m_sprite;
  }

  /**
   * Move the sprite local position (relative to the MxActor position).
   * 
   * @param _x {number} Steps in the x axis. 
   * @param _y {number} Steps in the y axis.
   */
  move(_x : number, _y : number)
  : void 
  {
    this._m_local_position.x += _x;
    this._m_local_position.y += _y;
    return;
  }

  /**
   * Sets the local position (relative to the MxActor position) of the sprite.
   * 
   * @param _x 
   * @param _y 
   */
  setPosition(_x : number, _y : number)
  : void 
  {
    this._m_local_position.setTo(_x, _y);
    return;
  }

  /**
   * Gets the local position (relative to the MxActor position) of the sprite.
   */
  getPosition()
  : Phaser.Math.Vector2 
  {
    return new Phaser.Math.Vector2
    (
      this._m_local_position.x, 
      this._m_local_position.y
    );
  }

  /**
   * The rotation of this Game Object, in degrees. Default 0.
   * @param _degrees {number} degrees.
   */
  setAngle(_degrees : number)
  : void
  {
    this._m_sprite.setAngle(_degrees);
  }

  setOrigin(_x : number, _y : number)
  : void 
  {
    this._m_sprite.setOrigin(_x, _y);
    return;
  }

  setVisible(_visible : boolean)
  : void 
  {
    this._m_sprite.setVisible(_visible);
    return;
  }

  setActive(_active : boolean)
  : void 
  {
    this._m_sprite.setActive(_active);
    return;
  }

  destroy()
  : void 
  {
    this._m_sprite.destroy();
    this._m_local_position = null;
    super.destroy();
    return;
  }

  /****************************************************/
  /* Protected                                        */
  /****************************************************/
    
  /**
   * Sprite's position relative to the MxActor's position.
   */
  _m_local_position : Phaser.Geom.Point;
    
  /**
   * Phaser Sprite Gameobject.
   */
  _m_sprite : Phaser.GameObjects.Sprite;   
}