import { MxComponent } from "../../utilities/component/mxComponent";
import { MxActor } from "../../utilities/component/mxActor";
import { COMPONENT_ID, MESSAGE_ID } from "../gameCommons";

export class TextComponent extends MxComponent
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
    
  constructor()
  {
    super(COMPONENT_ID.kText);
    this._m_local_position = new Phaser.Geom.Point(0.0,0.0);
    return;
  }

  init(_actor : MxActor)
  : void 
  {
    this._m_local_position = new Phaser.Geom.Point
    (
      _actor._m_position.x,
      _actor._m_position.y
    );
    return;
  }

  prepare
  (
    _scene : Phaser.Scene,
    _text : string,
    _style : object
  )
  : void
  {
    this._m_text = _scene.add.text
    (
      this._m_local_position.x,
      this._m_local_position.y,
      _text,
      _style
    );    
    return;
  }

  update(_actor : MxActor)
  : void 
  {
      this._m_text.x = _actor._m_position.x + this._m_local_position.x;
      this._m_text.y = _actor._m_position.y + this._m_local_position.y;
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
    this._m_text.setFontSize(_size);
    return;
  }

  /**
   * 
   * @param _color 
   */
  setFontColor(_color : string)
  : void
  {
    this._m_text.setColor(_color);
    return;
  }

  /**
   * 
   * @param _color 
   */
  setTint(_color : number)
  : void
  {
    this._m_text.setTint(_color);
    return;
  }

  /**
   * Set the alignment of the text in this Text object.
  * The argument can be one of: left, right, center or justify.
  * Alignment only works if the Text object has more than one line of text.
  * 
  * @param align — The text alignment for multi-line text. Default 'left'.
   */
  setAlign(_align : string = "left")
  : void
  {
    this._m_text.setAlign(_align);
    return;
  }

  /**
   * 
   * @param _text 
   */
  setText(_text : string)
  : void
  {
    this._m_text.text = _text;
    return;
  }

  setTextObject(_text : Phaser.GameObjects.Text)
  : void 
  {
    this._m_text = _text;
    return;
  }

  getSize()
  : Phaser.Geom.Point
  {
    return new Phaser.Geom.Point(this._m_text.width, this._m_text.height);
  }

  getTextObject()
  : Phaser.GameObjects.Text 
  {
    return this._m_text;
  }

  /**
  * Set the width (in pixels) to use for wrapping lines. Pass in null to remove wrapping by width.
  *
  * @param _width — The maximum width of a line in pixels. Set to null to remove wrapping.
  *
  * @param _useAdvancedWrap — Whether or not to use the advanced wrapping algorithm. If true, spaces are collapsed and whitespace is trimmed from lines. If false, 
  * spaces and whitespace are left as is. Default false. 
  */
  setWordWrapWidth(_width : number, _useAdvanceWrap : boolean = false)
  : void
  {
    this._m_text.setWordWrapWidth(_width, _useAdvanceWrap);
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
    this._m_text.setAngle(_degrees);
  }

  setOrigin(_x : number, _y : number)
  : void 
  {
    this._m_text.setOrigin(_x, _y);
    return;
  }

  setVisible(_visible : boolean)
  : void 
  {
    this._m_text.setVisible(_visible);
    return;
  }

  setActive(_active : boolean)
  : void 
  {
    this._m_text.setActive(_active);
    return;
  }

  destroy()
  : void 
  {
    this._m_text.destroy();
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
  _m_text : Phaser.GameObjects.Text; 
}