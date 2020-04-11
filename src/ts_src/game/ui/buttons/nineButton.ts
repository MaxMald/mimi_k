import { Button } from "./button";

export class NineButton extends Button {

    /****************************************************/
    /* Protected                                        */
    /****************************************************/
    
    /**
     * Nineslice obj
     */
    protected m_texture : Phaser.GameObjects.RenderTexture;

    /**
     * Phaser Text obj
     */
    protected m_text : Phaser.GameObjects.Text;

    /****************************************************/
    /* Public                                           */
    /****************************************************/
    
    public static CreateDefault
    (
        _scene : Phaser.Scene,
        _x : number,
        _y : number,
        _label : string, 
        _fn : ()=>void, 
        _context : any
    )
    : NineButton {
        let button = new NineButton();

        button.m_texture = _scene.add.nineslice
        (
           _x,
           _y,            
            145,
            145,
            {key : 'main_menu', frame: 'button_bg.png'},
            [70, 70, 70, 70]
        );

        button.m_texture.resize(500, 145);
        button.m_texture.setOrigin(0.5, 0.5);

        button.m_texture.setInteractive();
        button.m_texture.on('pointerdown', _fn, _context);
        
        button.m_text = _scene.add.text
        (
            _x,
            _y, 
            _label, 
            { fontFamily: '"Roboto Condensed"' }
        );
        
        button.m_text.setFontSize(50);
        button.m_text.setColor('black');
        button.m_text.setOrigin(0.5,0.5);

        return button
    }

    /**
     * 
     */
    protected constructor(){
        super();
        return;
    }

    /**
     * 
     */
    public open()
    : void {
        this.m_texture.setActive(true);
        this.m_texture.setVisible(true);
        this.m_text.setActive(true);
        this.m_text.setVisible(true);
        return;
    }

    /**
     * 
     */
    public close()
    : void {
        this.m_texture.setActive(false);
        this.m_texture.setVisible(false);
        this.m_text.setActive(false);
        this.m_text.setVisible(false);
        return;
    }

    public getWidth()
    : number {
        return this.m_texture.width;
    }

    public getHeight()
    : number {
        return this.m_texture.height;
    }

    /**
    * Safely destroys the object.
    */
    public destroy()
    : void {
        super.destroy();
        this.m_text = null;
        this.m_texture = null;
        return;
    }

    /**
     * 
     * @param _text 
     */
    public setText(_text : string)
    : void {
        this.m_text.text = _text;
        return;
    }

    /**
     * 
     */
    public getTextObject()
    : Phaser.GameObjects.Text {
        return this.m_text;
    }
   
}