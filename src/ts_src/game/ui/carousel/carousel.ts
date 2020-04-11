import { ImgButton } from "../buttons/imgButton";
import { MxListenerManager } from "../../../utilities/listeners/mxListenerManager";
import { MxListener } from "../../../utilities/listeners/mxListener";
import { Button } from "../buttons/button";

export class Carousel
{
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
    private m_back_button : ImgButton;

    /**
     * 
     */
    private m_next_button : ImgButton;   

    /**
     * 
     */
    private m_events : MxListenerManager;

    /****************************************************/
    /* Public                                           */
    /****************************************************/
    
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


    /**
    * Safely destroys the object.
    */
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

    /**
     * 
     * I) 'active_changed' : trigger when the active item has changed in the carousel.
     * 
     * @param _event 
     * @param _fn 
     * @param _context 
     */
    public addListener(_event : string, _fn: ()=>void, _context?: any)
    : void {
        this.m_events.addListener(_event, new MxListener(_fn, _context));
        return
    }

    /**
     * 
     * @param _idx 
     */
    public setActive(_idx : number)
    {
        if(_idx >= 0 && _idx < this.m_a_items.length){
            this._setActiveItem(_idx);
        }
        return;
    }

    /****************************************************/
    /* Private                                          */
    /****************************************************/
    
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
    }
}