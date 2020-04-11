import { Button } from "./button";

export class ImgButton extends Button
{
    /****************************************************/
    /* Private                                          */
    /****************************************************/
    
    /**
     * Button texture
     */
    private m_texture : Phaser.GameObjects.Sprite;

    /****************************************************/
    /* Public                                           */
    /****************************************************/
    
    public constructor
    (
        _scene : Phaser.Scene,
        _x : number,
        _y : number,
        _laber : string,
        _atlas : string,
        _base_spr : string,
        _hover_spr : string,
        _down_spr : string,
        _fn : ()=>void,
        _context : any
    )
    {
        super();

        // texture
        this.m_texture = _scene.add.sprite
        (
            _x,
            _y,
            _atlas,
            _base_spr
        );

        // interaction
        this.m_texture.setInteractive();
        this.m_texture.on('pointerdown', _fn, _context);
        return;
    }

     /**
     * 
     */
    public open()
    : void {
        this.m_texture.setActive(true);
        this.m_texture.setVisible(true);
        return;
    }

    /**
     * 
     */
    public close()
    : void {
        this.m_texture.setActive(false);
        this.m_texture.setVisible(false);
        return;
    }

    /**
     * 
     */
    public getWidth()
    : number {
        return this.m_texture.width;
    }

    /**
     * 
     */
    public getHeight()
    : number {
        return this.m_texture.height;
    }

    public getTexture()
    : Phaser.GameObjects.Sprite {
        return this.m_texture;
    }

    /**
    * Safely destroys the object.
    */
    public destroy()
    : void {
        this.m_texture = null;
        return;
    }
}