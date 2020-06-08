import { MxComponent } from "../../../../utilities/component/mxComponent"
import { COMPONENT_ID } from "../../../gameCommons"
import { MxActor } from "../../../../utilities/component/mxActor";
import { TextComponent } from "../../../components/textComponent";
import { NineSliceComponent } from "../../../components/nineSliceComponent";

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
    this._m_textComponent = _actor.getComponent<TextComponent>(COMPONENT_ID.kText);   
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
    this.setMaxWidth(this._m_min_width);

    this._m_isOpen = false;
    return;
  }

  open()
  : void 
  {
    if(!this._m_isOpen) { 
      
      let nineTexture : Phaser.GameObjects.RenderTexture 
        = this._m_nineSliceComponent.getTexture();
      
      nineTexture.setScale(0,0);
      this._m_texture_tween = this._m_scene.tweens.add({
        targets: nineTexture,
        scale: 1,
        duration: 400,
        ease: 'Bounce'
      });

      let text : Phaser.GameObjects.Text = this._m_textComponent.getTextObject();
      
      text.setScale(0,0);
      this._m_text_tween = this._m_scene.tweens.add({
        targets: text,
        scale: 1,
        duration: 400,
        ease: 'Bounce'
      });

      this._m_isOpen = !this._m_isOpen;
    }
    return;
  }

  close()
  : void 
  {
    if(this._m_isOpen) {
      
      if(this._m_texture_tween.isPlaying()) {
        this._m_texture_tween.stop();
      }

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
    this._m_textComponent.setWordWrapWidth
    (
      this._m_max_width - this._m_left_padding - this._m_right_padding
    );
    return;
  }

  setText(_text : string)
  : void 
  {
    this._m_textComponent.setText(_text);
    let textSize : Phaser.Geom.Point = this._m_textComponent.getSize();

    this.setSize
    (
      textSize.x + this._m_left_padding + this._m_right_padding, 
      textSize.y + this._m_top_padding + this._m_bottom_padding
    );
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
    
    if(this._m_text_tween != null) {
      this._m_text_tween.destroy();
      this._m_text_tween = null;
    }

    if(this._m_texture_tween != null) {
      this._m_texture_tween.destroy();
      this._m_texture_tween = null;
    }
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
  _m_textComponent : TextComponent;

  /**
   * Reference to component.
   */
  _m_nineSliceComponent : NineSliceComponent;

  /**
   * Texture tween.
   */
  _m_texture_tween : Phaser.Tweens.Tween;

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