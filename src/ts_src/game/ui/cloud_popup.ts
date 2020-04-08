export class CloudPopup
{
    /**
     * Reference to the Phaser.Scene.
     */
    private m_scene : Phaser.Scene;

    /**
     * Cloud nineslice texture
     */
    private m_cloud : Phaser.GameObjects.RenderTexture;

    /**
     * Text displayed in the cloud popup.
     */
    private m_text : Phaser.GameObjects.Text;

    /**
     * Popup's height.
     */
    private m_height : number;

    /**
     * Popup's width.
     */
    private m_width : number;

    /**
     * Max width that this popup can has.
     */
    private m_max_width : number;    

    /**
     * Min Width that this popup can has.
     */
    private m_min_width : number;

    /**
     * Min Height that this popup can has.
     */
    private m_min_height : number;

    private m_top_padding : number;
    private m_bottom_padding : number;
    private m_left_padding : number;
    private m_right_padding : number;

    /**
     * Flag that indicate if the popup is open.
     */
    private m_isOpen : boolean;

    /**
     * Reference to the cloud tween object.
     */
    private m_cloud_tween : Phaser.Tweens.Tween;

    /**
     * Reference to the text tween object.
     */
    private m_text_tween : Phaser.Tweens.Tween;

    /****************************************************/
    /* Public                                           */
    /****************************************************/
    
    public constructor(_scene : Phaser.Scene) {

        this.m_scene = _scene;

        // Get the cloud popup texture from TextureManager
        let texture : Phaser.Textures.Texture = _scene.game.textures.get('main_menu');
        let cloud_frame : Phaser.Textures.Frame = texture.get('msg_cloud.png');
        
        // sets the minimum size from the original texture
        this.m_min_width = cloud_frame.width;
        this.m_min_height = cloud_frame.height;                

        // Create nineslice cloud texture
        this.m_cloud = _scene.add.nineslice
        (
            0,
            0,
            cloud_frame.width,
            cloud_frame.height,
            {key : 'main_menu', frame: 'msg_cloud.png'},
            [61, 72, 69, 59]
        );
        this.m_cloud.setOrigin(0.5,0.5);

        // Create Text
        this.m_text = _scene.add.text
        (
            this.m_cloud.x,
            this.m_cloud.y, 
            "", 
            { fontFamily: '"Roboto Condensed"' }
        );
        
        this.m_text.setFontSize(50);
        this.m_text.setColor('black');
        this.m_text.setOrigin(0.5,0.5);

        // Text Padding
        this.m_top_padding = this.m_min_height * 0.25;
        this.m_bottom_padding = this.m_min_height * 0.25;
        this.m_left_padding = this.m_min_width * 0.25;
        this.m_right_padding = this.m_min_height * 0.25;

        // sets maximum size from the orinal texture
        this.setMaxWidth(this.m_min_width);

        this.m_isOpen = false;
        return;
    }

    public open()
    : void {
        if(!this.m_isOpen) {
            // TODO
            this.m_cloud.setScale(0,0);
            this.m_cloud_tween = this.m_scene.tweens.add({
                targets: this.m_cloud,
                scale: 1,
                duration: 400,
                ease: 'Bounce'
            });

            this.m_text.setScale(0,0);
            this.m_text_tween = this.m_scene.tweens.add({
                targets: this.m_text,
                scale: 1,
                duration: 400,
                ease: 'Bounce'
            });

            this.m_isOpen = !this.m_isOpen;
        }
        return;
    }

    public close()
    : void {
        if(this.m_isOpen) {
            // TODO
            if(this.m_cloud_tween.isPlaying()) {
                this.m_cloud_tween.stop();
            }

            if(this.m_text_tween.isPlaying()) {
                this.m_text_tween.stop();
            }
            this.m_isOpen = !this.m_isOpen;
        }
        return;
    }

    public setPosition(_x : number, _y : number)
    : void {
        this.m_text.setPosition
        (
            this.m_text.x + (_x - this.m_cloud.x), 
            this.m_text.y + (_y - this.m_cloud.y)
        );
        this.m_cloud.setPosition(_x, _y);
        return;
    }

    public setText(_text : string)
    : void {        
        this.m_text.text = _text;
        this.setSize
        (
            this.m_text.width + this.m_left_padding + this.m_right_padding, 
            this.m_text.height + this.m_top_padding + this.m_bottom_padding
        );
        return;
    }

    public setMaxWidth(_width : number)
    : void {        
        this.m_max_width = this._check_minimum_value(_width, this.m_min_width);
        this.m_text.setWordWrapWidth(this.m_max_width - this.m_left_padding - this.m_right_padding);
        return;
    }

    public setSize(_width: number, _height : number)
    : void {
        this.m_width = this._check_minimum_value(_width, this.m_min_width);
        this.m_width = this._check_maximum_value(_width, this.m_max_width);

        this.m_height = this._check_minimum_value(_height, this.m_min_height);
        this.m_height = _height

        this.m_cloud.resize(this.m_width, this.m_height);
        return;
    }

    public getTextObject()
    : Phaser.GameObjects.Text {
        return this.m_text;
    }

    public destroy()
    : void {
        return;
    }

    /****************************************************/
    /* Private                                          */
    /****************************************************/
    
    private _check_minimum_value(_value : number, _min : number)
    : number {
        if(_value < _min) {
            return _min;
        }
        return _value;
    }

    private _check_maximum_value(_value : number, _max : number)
    : number {
        if(_value > _max) {
            return _max;
        }
        return _value;
    }

}