import { MxUI } from "./mxUI";

export class MxSlider extends MxUI {

    /****************************************************/
    /* Private                                          */
    /****************************************************/
    
    private _m_bck : Phaser.GameObjects.Sprite;

    private _m_fill : Phaser.GameObjects.Sprite;

    private _m_button : Phaser.GameObjects.Sprite;

    private _m_norm_value : number;

    private _m_value : number;

    private _m_min_value : number;

    private _m_max_value : number;

    private _m_delta_value : number;

    private _m_dragging : boolean;

    private _m_text : Phaser.GameObjects.Text;

    private _m_title : Phaser.GameObjects.Text;

    private _m_pointer : Phaser.Input.Pointer;

    private _m_group : Phaser.GameObjects.Group;

    /****************************************************/
    /* Public                                           */
    /****************************************************/
    
    public constructor
    (
        _scene : Phaser.Scene,
        _x : number,
        _y : number,
        _title : string = "Slider"
    ) {
        
        super();

        this._m_group = _scene.add.group();

        // Slider Background
        
        this._m_bck = this._getSprite_box(_scene);
        this._m_bck.setScale(20, 2);
        this._m_bck.setTint(0x000000);
        this._m_bck.setAlpha(0.5);

        this._m_bck.setInteractive();
        this._m_bck.on
        (
            'pointerdown', 
            this._onDown_slider, 
            this
        );
        
        this._m_bck.setOrigin(0,0);

        // Slider Size
        this._m_size.x = this._m_bck.width * this._m_bck.scaleX;
        this._m_size.y = this._m_bck.height * this._m_bck.scaleY;
        
        // Slider Fill

        this._m_fill = this._getSprite_box(_scene);
        this._m_fill.setScale(0, 2);
        this._m_fill.setTint(0xffa100);
        this._m_fill.setOrigin(0,0);

        // Slider Text
        this._m_text = this._get_text(_scene);
        this._m_text.text = "100";
        this._m_text.setOrigin(0.5,0.5);

        this._m_text.setPosition
        (
            this._m_bck.x + this._m_size.x * 0.5,
            this._m_bck.y + this._m_size.y * 0.5
        );

        // Slider Title
        this._m_title = this._get_text(_scene);
        this._m_title.text = _title;
        this._m_title.setOrigin(0,1);
        this._m_title.setPosition
        (
            this._m_bck.x, 
            this._m_bck.y - 10
        );

        // Add group members
        this._m_group.add(this._m_title);
        this._m_group.add(this._m_text);
        this._m_group.add(this._m_bck);
        this._m_group.add(this._m_fill);
        
        this.setValues(-1,1);

        this._resize_fill(0.5);
        this.setPosition(_x, _y);

        this._m_dragging = false;
        return;
    }

    public setValues(_min : number, _max : number)
    : void {
        if(_max > _min){
            this._m_min_value = _min;
            this._m_max_value = _max;
            this._m_delta_value = _max - _min;
        }
        return;
    }

    public update(_dt : number)
    : void {
        if(this._m_dragging){
            if(!this._m_pointer.isDown){
                this._m_dragging = !this._m_dragging;
            }
            this._onDrag(this._m_pointer);
        }
        return;
    }

    public setPosition(_x : number, _y : number)
    : void {      
        this.move(_x - this._m_bck.x,_y - this._m_bck.y);
        return;
    }

    public move(_x : number, _y : number)
    : void {
        this._m_group.incXY(_x, _y);
        return;
    }
    
    public getValue()
    : number {
        return this._m_value;
    }

    public getFracValue()
    : number {
        return this._m_norm_value;
    }

    public setValue(_value : number)
    : number {
        if(this._m_min_value <= _value && _value <= this._m_max_value){
            let dt_value = (_value - this._m_min_value) / this._m_delta_value;
            this._resize_fill(dt_value);
        }           
        return;
    }

    public setFracValue(_value: number)
    : void {
        if(0 <= _value && _value <= 1){
            this._resize_fill(_value);
        }        
        return;
    }

    public destroy()
    : void {
        super.destroy();
        this._m_bck = null;
        this._m_fill = null;
        return;
    }

    /****************************************************/
    /* Private                                          */
    /****************************************************/ 
    
    private _resize_fill(_value : number)
    : void {
        this._m_fill.scaleX = _value * this._m_bck.scaleX;
        this._m_norm_value = _value;

        this._m_value 
            = this._m_min_value + (this._m_norm_value * this._m_delta_value);

        this._m_text.text = this._m_value.toString();
        return;
    }
   
    private _onDown_slider(_pointer : Phaser.Input.Pointer)
    : void {        
        this._m_pointer = _pointer;
        this._m_dragging = true;
        this._onDrag(_pointer);
        return;
    }

    private _onDrag(_pointer : Phaser.Input.Pointer)
    : void {
        let x : number 
            = this._truncate
            (
                _pointer.x, 
                this._m_bck.x, 
                this._m_bck.x + this._m_size.x
            );
        
        x -= this._m_bck.x;
        x /= this._m_size.x;
        
        this._resize_fill(x);
        return;
    }

    private _truncate(_value : number, _min : number, _max : number)
    : number {
        if(_value > _max) {
            _value = _max;
        }
        else if(_value < _min) {
            _value = _min;
        }
        return _value;
    }
}