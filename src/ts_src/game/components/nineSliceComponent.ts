import { MxComponent } from "../../utilities/component/mxComponent";
import { COMPONENT_ID, MESSAGE_ID } from "../gameCommons";
import { MxActor } from "../../utilities/component/mxActor";

export class NineSliceComponent extends MxComponent
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  constructor()
  {
    super(COMPONENT_ID.kNineSlice);
    return;
  }

  init(_actor : MxActor)
  : void 
  {
    this._m_min_width = 0;
    this._m_min_height = 0;

    this._m_local_position = new Phaser.Geom.Point
    (
      _actor.m_position.x,
      _actor.m_position.y
    );
    return;
  }

  prepare
  (
    _scene : Phaser.Scene,
    _texture : string,
    _frame : string,
    _offsets : number[]
  )
  : void
  {
    let texture : Phaser.Textures.Texture = _scene.game.textures.get(_texture);
    let frame : Phaser.Textures.Frame = texture.get(_frame);
    
    // sets the minimum size from the original texture
    this._m_min_width = frame.width;
    this._m_min_height = frame.height;      
              
    // Create nineslice texture
    this._m_texture = _scene.add.nineslice
    (
        this._m_local_position.x,
        this._m_local_position.y,
        this._m_min_width,
        this._m_min_height,
        {key : _texture, frame: _frame},
        _offsets
    );
    this._m_texture.setOrigin(0.5,0.5);   
    return;
  }

  update(_actor : MxActor)
  : void 
  {
    this._m_texture.x = _actor.m_position.x + this._m_local_position.x;
    this._m_texture.y = _actor.m_position.y + this._m_local_position.y;
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

  resize(_width : number, _height : number)
  : void
  {
    this._m_texture.resize(_width, _height);
    return;
  }

  getMinSize()
  : Phaser.Geom.Point
  {
    return new Phaser.Geom.Point(this._m_min_width, this._m_min_height);
  }

  setTexture(_texture_key : string)
  : void 
  {
    return;
  }

  setFrame(_frame : number | string)
  : void 
  {
    return;
  }

  getTexture()
  : Phaser.GameObjects.RenderTexture 
  {
    return this._m_texture;
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
    this._m_texture.setAngle(_degrees);
  }

  setOrigin(_x : number, _y : number)
  : void 
  {
    this._m_texture.setOrigin(_x, _y);
    return;
  }

  setVisible(_visible : boolean)
  : void 
  {
    this._m_texture.setVisible(_visible);
    return;
  }

  setActive(_active : boolean)
  : void 
  {
    this._m_texture.setActive(_active);
    return;
  }

  destroy()
  : void 
  {
    this._m_texture.destroy();
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
  _m_texture : Phaser.GameObjects.RenderTexture;

  /**
   * 
   */
  _m_min_width : number;

  /**
   * 
   */
  _m_min_height : number;
}