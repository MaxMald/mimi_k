export class MxUI {

    /****************************************************/
    /* Protected                                        */
    /****************************************************/
    
    protected _m_size : Phaser.Geom.Point;
    
    /****************************************************/
    /* Public                                           */
    /****************************************************/
    
    public constructor(){
        this._m_size = new Phaser.Geom.Point(0,0);
        return;
    }

    public update(_dt : number)
    : void {
        return;
    }

    public setPosition(_x : number, _y : number)
    : void {
        return;
    }

    public move(_x : number, _y : number)
    : void {
        return;
    }

    /**
    * Safely destroys the object.
    */
    public destroy()
    : void {
        this._m_size = null;
        return;
    }

    /****************************************************/
    /* Protected                                        */
    /****************************************************/
    
    protected _getSprite_box(_scene : Phaser.Scene)
    : Phaser.GameObjects.Sprite {
        let sprite : Phaser.GameObjects.Sprite;

        if(!_scene.textures.exists('_mx_ui_box')) {            
            let texture : Phaser.GameObjects.Graphics;
            texture = _scene.add.graphics();

            texture.fillStyle(0xffffff);
            texture.fillRect(0, 0, 16, 16);

            texture.generateTexture('_mx_ui_box', 16, 16);
            texture.destroy();
        }
        
        sprite = _scene.add.sprite(0,0,'_mx_ui_box');
        return sprite;
    }

    protected _getSprite_circle16(_scene : Phaser.Scene)
    : Phaser.GameObjects.Sprite {
        let sprite : Phaser.GameObjects.Sprite;

        if(!_scene.textures.exists('_mx_ui_circle_16')) {            
            let texture : Phaser.GameObjects.Graphics;
            texture = _scene.add.graphics();

            texture.fillStyle(0xffffff);
            texture.fillCircle(0, 0, 16);

            texture.generateTexture('_mx_ui_circle_16');
            texture.destroy();
        }
        
        sprite = _scene.add.sprite(0,0,'_mx_ui_circle_16');
        return sprite;
    }

    protected _get_text(_scene : Phaser.Scene)
    : Phaser.GameObjects.Text {
        let text : Phaser.GameObjects.Text;

        text = _scene.add.text
        (
            0,
            0, 
            "text", 
            { fontFamily: '"Roboto Condensed"' }
        );
        
        text.setFontSize(24);
        text.setColor('white');

        return text;
    }
}