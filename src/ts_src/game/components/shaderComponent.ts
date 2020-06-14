import { MxComponent } from "../../utilities/component/mxComponent"
import { COMPONENT_ID, MESSAGE_ID } from "../gameCommons"
import { MxActor } from "../../utilities/component/mxActor";

export class ShaderComponent extends MxComponent
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  constructor()
  {
    super(COMPONENT_ID.kShaderComponent);
    this._m_local_position = new Phaser.Geom.Point(0.0, 0.0);
    return;
  }

  update(_actor : MxActor)
  : void 
  {
    this._m_shader.x = _actor._m_position.x + this._m_local_position.x;
    this._m_shader.y = _actor._m_position.y + this._m_local_position.y;
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

  setUniform(_uniform : string , _value : any)
  : void
  {
    this._m_shader.setUniform(_uniform, _value);
    return;
  }

  prepare(_shader : Phaser.GameObjects.Shader)
  : void 
  {
    this._m_shader = _shader;
    return;
  }

  setMask(_mask : Phaser.Display.Masks.BitmapMask)
  : void
  {
    this._m_shader.setMask(_mask);
    return;
  }

  createMask()
  : Phaser.Display.Masks.BitmapMask
  {
    return this._m_shader.createBitmapMask();
  }

  getShader()
  : Phaser.GameObjects.Shader
  {
    return this._m_shader;
  }

  getWidth()
  : number
  {
    return this._m_shader.width;
  }

  getHeight()
  : number
  {
    return this._m_shader.height;
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
   * 
   */
  setInteractive()
  : void
  {
    this._m_shader.setInteractive();
    return;
  }

  /**
   * 
   * @param _event 
   * @param _fn 
   * @param _context 
   */
  on
  (
    _event : string,
    _fn : Function,
    _context : any
  )
  : void
  {
    this._m_shader.on(_event, _fn, _context);
    return;
  }
  
  /**
   * The rotation of this Game Object, in degrees. Default 0.
   * @param _degrees {number} degrees.
   */
  setAngle(_degrees : number)
  : void
  {
    this._m_shader.setAngle(_degrees);
  }

  setOrigin(_x : number, _y : number)
  : void 
  {
    this._m_shader.setOrigin(_x, _y);
    return;
  }

  setVisible(_visible : boolean)
  : void 
  {
    this._m_shader.setVisible(_visible);
    return;
  }

  setScale(_x : number, _y : number)
  : void
  {
    this._m_shader.setScale(_x, _y);
    return;
  }

  setActive(_active : boolean)
  : void 
  {
    this._m_shader.setActive(_active);
    return;
  }

  destroy()
  : void 
  {
    this._m_shader.destroy();
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
  _m_shader : Phaser.GameObjects.Shader;
}