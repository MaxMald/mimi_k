import { MxComponent } from "../../../../utilities/component/mxComponent"
import { COMPONENT_ID } from "../../../gameCommons"
import { MxActor } from "../../../../utilities/component/mxActor";
import { NineSliceComponent } from "../../../components/nineSliceComponent";
import { BitmapTextComponent } from "../../../components/bitmapTextComponent";

export class PopupController extends MxComponent
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  constructor()
  {
    super(COMPONENT_ID.kPopupController);
    return;
  }

  init(_actor : MxActor)
  : void
  {
    // get components.
    this._m_nineSliceComponent = _actor.getComponent<NineSliceComponent>(COMPONENT_ID.kNineSlice);
    this._m_textComponent = _actor.getComponent<BitmapTextComponent>(COMPONENT_ID.kBitmapText);   
    return;
  }

  prepare(_scene : Phaser.Scene)
  : void
  {
    this._m_scene = _scene;

    // define nineslice min size.
    let min_size : Phaser.Geom.Point = this._m_nineSliceComponent.getMinSize();
    this._m_min_width = min_size.x;
    this._m_min_height = min_size.y;

    // define padding
    this._m_top_padding = this._m_min_height * 0.25;
    this._m_bottom_padding = this._m_min_height * 0.25;
    this._m_left_padding = this._m_min_width * 0.25;
    this._m_right_padding = this._m_min_height * 0.25;

    // sets maximum size from the orinal texture
    this.setMaxWidth(1080);

    this._m_nineSliceComponent.resize(1080, 530);
    this._m_isOpen = false;
    return;
  }

  open()
  : void 
  {
    if(!this._m_isOpen) { 
      
      let text : Phaser.GameObjects.BitmapText 
        = this._m_textComponent.getBitmapTextObject();
      
      text.setAlpha(0.0);
      this._m_text_tween = this._m_scene.tweens.add({
        targets: text,
        alpha: 1.0,
        duration: 400,
        ease: 'Linear'
      });

      this._m_isOpen = !this._m_isOpen;
    }
    return;
  }

  close()
  : void 
  {
    if(this._m_isOpen) {    

      if(this._m_text_tween.isPlaying()) {
        this._m_text_tween.stop();
      }

      this._m_isOpen = !this._m_isOpen;
    }
    return;
  }

  setMaxWidth(_width : number)
  : void 
  {        
    this._m_max_width = this._check_minimum_value(_width, this._m_min_width);
    this._m_textComponent.setMaxWidth
    (
      this._m_max_width - this._m_left_padding - this._m_right_padding
    );
    return;
  }

  setText(_text : string)
  : void 
  {
    this._m_textComponent.setText(_text);
    return;
  }    

  setSize(_width: number, _height : number)
  : void 
  {
    this._m_width = this._check_minimum_value(_width, this._m_min_width);
    this._m_width = this._check_maximum_value(_width, this._m_max_width);

    this._m_height = this._check_minimum_value(_height, this._m_min_height);
    this._m_height = _height
      
    this._m_nineSliceComponent.resize(this._m_width, this._m_height);
    return;
  }

  destroy()
  : void
  {
    this._m_nineSliceComponent = null;
    this._m_textComponent = null;   

    super.destroy();
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  _check_minimum_value(_value : number, _min : number)
  : number 
  {
    if(_value < _min) {
      return _min;
    }
    return _value;
  }

  _check_maximum_value(_value : number, _max : number)
  : number 
  {
    if(_value > _max) {
      return _max;
    }
    return _value;
  }

  /**
   * 
   */
  _m_scene : Phaser.Scene;

  /**
   * Reference to component.
   */
  _m_textComponent : BitmapTextComponent;

  /**
   * Reference to component.
   */
  _m_nineSliceComponent : NineSliceComponent;  

  /**
   * 
   */
  _m_text_tween : Phaser.Tweens.Tween;

  /**
   * Flag if the popup is open or not.
   */
  _m_isOpen : boolean;

  /**
   * Popup's height.
   */
  _m_height : number;
  
  /**
   * Popup's width.
   */
  _m_width : number;
  
  /**
   * Max width that this popup can has.
   */
  _m_max_width : number;    
  
  /**
   * Min Width that this popup can has.
   */
  _m_min_width : number;
  
  /**
   * Min Height that this popup can has.
   */
  _m_min_height : number;
  
  /**
   * Top padding.
   */
  _m_top_padding : number;
  
  /**
   * Bottom padding.
   */
  _m_bottom_padding : number;
  
  /**
   * Left padding.
   */
  _m_left_padding : number;
  
  /**
   * Right padding.
   */
  _m_right_padding : number;
}