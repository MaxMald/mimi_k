import { Button } from "../buttons/imgButton";
import { MxListenerManager } from "../../../utilities/listeners/mxListenerManager";
import { MxActor } from "../../../utilities/component/mxActor";
import { CAROUSEL_CHILD_ID, COMPONENT_ID } from "../../gameCommons";
import { TextComponent } from "../../components/textComponent";
import { SpriteComponent } from "../../components/spriteComponent";
import { CarouselController } from "./components/carousleController";

export class Carousel
{  
  static Create(_scene : Phaser.Scene , _id : number)
  : MxActor
  {
    // TODO multilanguage

    let carousel : MxActor = MxActor.Create(_id);

    /****************************************************/
    /* Children                                         */
    /****************************************************/

    ///////////////////////////////////
    // Title

    let label : MxActor = MxActor.Create(CAROUSEL_CHILD_ID.kTitle);

    let label_textComponent : TextComponent = new TextComponent(); 
    label.addComponent(label_textComponent);   

    label.init();

    label_textComponent.prepare
    (
      _scene, 
      'Selecciona Reloj',
      { fontFamily: '"Roboto Condensed"' }
    );
    label_textComponent.setFontSize(30);
    label_textComponent.setOrigin(0.5, 0.5);
    label_textComponent.setFontColor('black');
    label_textComponent.setAlign('center');
    
    label.setRelativePosition(0.0, -275.0);
    carousel.addChild(label);

    ///////////////////////////////////
    // Preview

    let preview :  MxActor = MxActor.Create(CAROUSEL_CHILD_ID.kPreview);

    let preview_sprite : SpriteComponent = new SpriteComponent();
    preview_sprite.setSprite
    (
      _scene.add.sprite
      (
        0, 0,
        'main_menu',
        'clock_idx_0.png'
      )
    );
    preview.addComponent(preview_sprite);
    
    preview.init();

    carousel.addChild(preview);   

    ///////////////////////////////////
    // Left Button
    
    let leftButton : MxActor = Button.CreateImageButton
    (
      _scene,
      CAROUSEL_CHILD_ID.kLeftButton,
      -350, 0,
      'main_menu',
      'arrow_button.png',
      function(){},
      this
    );

    let leftButton_sprite : SpriteComponent 
        = leftButton.getComponent<SpriteComponent>(COMPONENT_ID.kSprite);    
    leftButton_sprite.setScale(-1.0, 1.0);

    carousel.addChild(leftButton);

    ///////////////////////////////////
    // Right Button

    carousel.addChild
    (
      Button.CreateImageButton
      (
        _scene,
        CAROUSEL_CHILD_ID.kRightButton,
        350, 0,
        'main_menu',
        'arrow_button.png',
        function(){},
        this
      )
    );

    ///////////////////////////////////
    // Clock Name

    let clock_name : MxActor = MxActor.Create(CAROUSEL_CHILD_ID.kClockName);    
    
    let clock_name_text : TextComponent = new TextComponent(); 
    clock_name.addComponent(clock_name_text);   

    clock_name.init();

    clock_name_text.prepare
    (
      _scene, 
      'Reloj de Arena',
      { fontFamily: '"Roboto Condensed"' }
    );
    clock_name_text.setFontSize(30);
    clock_name_text.setOrigin(0.5, 0.5);
    clock_name_text.setFontColor('black');
    clock_name_text.setAlign('center');
    
    clock_name.setRelativePosition(0.0, 275.0);

    carousel.addChild(clock_name);

    /****************************************************/
    /* Components                                       */
    /****************************************************/
      
    let carouselController : CarouselController = new CarouselController();
    carousel.addComponent(carouselController);
    carouselController.init(carousel);

    return carousel;
  }

    /****************************************************/
    /* Private                                          */
    /****************************************************/
    
    /**
     * Array of sprites in this carousel.
     */
    private m_a_items : Array<Phaser.GameObjects.Sprite>;

    /**
     * Sprite tween.
     */
    private m_item_tween : Phaser.Tweens.Tween;

    /**
     * Current Item's ID.
     */
    private m_current_idx : number;

    /**
     * Current Item.
     */
    private m_current_item : Phaser.GameObjects.Sprite;    
    
    /**
     * 
     */
    private m_events : MxListenerManager;   
    
    /*
    public constructor
    (
        _scene : Phaser.Scene,
        _x : number,
        _y : number,
        _buts_distance : number,
        _atlas : string,
        _name_prefix : string,
        _name_sufix : string,
        _size : number
    )  {
        
        ///////////////////////////////////
        // Items

        this.m_a_items = new Array<Phaser.GameObjects.Sprite>();
        let item : Phaser.GameObjects.Sprite;
        for(let index : number = 0; index < _size; ++index) {
            
            item = _scene.add.sprite
            (
                _x,
                _y,
                _atlas,
                _name_prefix + index + _name_sufix
            );
            this._desactive_item(item);
            this.m_a_items.push(item);
        }       

        ///////////////////////////////////
        // Buttons

        this.m_next_button = new ImgButton
        (
            _scene,
            _x + _buts_distance,
            _y,
            "",
            'main_menu',
            'arrow_button.png',
            'arrow_button.png',
            'arrow_button.png',
            this._next,
            this
        );

        this.m_back_button = new ImgButton
        (
            _scene,
            _x - _buts_distance,
            _y,
            "",
            'main_menu',
            'arrow_button.png',
            'arrow_button.png',
            'arrow_button.png',
            this._prev,
            this
        );
        let spr = this.m_back_button.getTexture();
        spr.setFlipX(true);    

        ///////////////////////////////////
        // Event Manager

        this.m_events = new MxListenerManager();
        this.m_events.addEvent('active_changed');

        // display first element.
        this.m_current_item = null;
        this.m_item_tween = null;
        this._setActiveItem(0);
        return;
    }

    public getCurrentIdx()
    : number {
        return this.m_current_idx;
    }


  
    public destroy()
    : void {
        this.m_current_item = null;

        this.m_events.destroy();
        this.m_events = null;

        this.m_back_button.destroy();
        this.m_events = null;

        this.m_next_button.destroy();
        this.m_events = null;

        let item : Phaser.GameObjects.Sprite;
        while(this.m_a_items.length) {
            item = this.m_a_items.pop();
            item.destroy();
        }
        this.m_a_items = null;

        return;
    }

  
    public addListener(_event : string, _fn: ()=>void, _context?: any)
    : void {
        this.m_events.addListener(_event, new MxListener(_fn, _context));
        return
    }

   
    public setActive(_idx : number)
    {
        if(_idx >= 0 && _idx < this.m_a_items.length){
            this._setActiveItem(_idx);
        }
        return;
    }

   
    private _setActiveItem(_idx : number)
    : void {
        if(this.m_current_item != null) {
            this._desactive_item(this.m_current_item);
        }

        this.m_current_item = this.m_a_items[_idx];
        this.m_current_idx = _idx;

        this._active_item(this.m_current_item);
        this.m_events.call('active_changed');
        return;
    }

    private _next()
    : void {
        this.m_current_idx++;
        if(this.m_current_idx >= this.m_a_items.length) {
            this.m_current_idx = 0;
        }

        this._setActiveItem(this.m_current_idx);
        return;
    }

    private _prev()
    : void {
        this.m_current_idx--;
        if(this.m_current_idx < 0) {
            this.m_current_idx = this.m_a_items.length - 1;
        }

        this._setActiveItem(this.m_current_idx);
        return;
    }

    private _active_item(_item : Phaser.GameObjects.Sprite)
    : void {
        _item.setActive(true);
        _item.setVisible(true);
        return;
    }

    private _desactive_item(_item : Phaser.GameObjects.Sprite)
    : void {
        _item.setActive(false);
        _item.setVisible(false);
        return;
    }*/
}