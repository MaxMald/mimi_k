import { MxComponent } from "../../utilities/component/mxComponent";
import { COMPONENT_ID, MESSAGE_ID } from "../gameCommons";
import { MxActor } from "../../utilities/component/mxActor";

export class BitmapTextComponent extends MxComponent
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  constructor()
  {
    super(COMPONENT_ID.kBitmapText);
    this._m_local_position = new Phaser.Geom.Point(0.0,0.0);
    return;
  }

  init(_actor : MxActor)
  : void 
  {
    return;
  }

  prepare
  (
    _scene : Phaser.Scene,
    _fontkey : string,
    _text : string,
    _size : number
  )
  : void
  {
    this._m_bitmap_text = _scene.add.bitmapText
    (
      this._m_local_position.x,
      this._m_local_position.y,
      _fontkey,
      _text,
      _size
    );    
    return;
  }

  update(_actor : MxActor)
  : void 
  {
      this._m_bitmap_text.x = _actor._m_position.x + this._m_local_position.x;
      this._m_bitmap_text.y = _actor._m_position.y + this._m_local_position.y;
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

  /**
   * 
   * @param _size 
   */
  setFontSize(_size : number)
  : void
  {
    this._m_bitmap_text.setFontSize(_size);
    return;
  }

  /**
   * 
   * @param _color 
   */
  setTint(_color : number)
  : void
  {
    this._m_bitmap_text.setTint(_color);
    return;
  }

  setAlpha(_alpha : number)
  : void
  {
    this._m_bitmap_text.setAlpha(_alpha);
    return;
  }

  setLeftAlign()
  : void
  {
    this._m_bitmap_text.setLeftAlign();
    return;
  }

  setRightAlign()
  : void
  {
    this._m_bitmap_text.setRightAlign();
    return;
  }

  setCenterAlign()
  : void
  {
    this._m_bitmap_text.setCenterAlign();
    return;
  }

  /**
   * 
   * @param _text 
   */
  setText(_text : string)
  : void
  {
    this._m_bitmap_text.text = _text;
    return;
  }

  setBitmapTextObject(_text : Phaser.GameObjects.BitmapText)
  : void 
  {
    this._m_bitmap_text = _text;
    return;
  }

  getSize()
  : Phaser.Geom.Point
  {
    return new Phaser.Geom.Point(this._m_bitmap_text.width, this._m_bitmap_text.height);
  }

  getBitmapTextObject()
  : Phaser.GameObjects.BitmapText 
  {
    return this._m_bitmap_text;
  }

  /**
  * Sets the maximum display width of this BitmapText in pixels.
  * 
  * If BitmapText.text is longer than maxWidth then the lines will be automatically wrapped based on the previous whitespace character found in the line.
  * 
  * If no whitespace was found then no wrapping will take place and consequently the maxWidth value will not be honored.
  * 
  * Disable maxWidth by setting the value to 0.
  */
  setMaxWidth(_width : number)
  : void
  {
    this._m_bitmap_text.setMaxWidth(_width)
    return;
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
    this._m_bitmap_text.setAngle(_degrees);
  }

  setOrigin(_x : number, _y : number)
  : void 
  {
    this._m_bitmap_text.setOrigin(_x, _y);
    return;
  }

  setVisible(_visible : boolean)
  : void 
  {
    this._m_bitmap_text.setVisible(_visible);
    return;
  }

  setActive(_active : boolean)
  : void 
  {
    this._m_bitmap_text.setActive(_active);
    return;
  }

  destroy()
  : void 
  {
    this._m_bitmap_text.destroy();
    this._m_local_position = null;
    super.destroy();
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Sprite's position relative to the MxActor's position.
   */
  _m_local_position : Phaser.Geom.Point;
  
  /**
   * Reference to Phaser Gameobject.
   */
  _m_bitmap_text : Phaser.GameObjects.BitmapText;
}