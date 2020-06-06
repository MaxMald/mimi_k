import { ChronoClock } from "./chronoClock";

export class SandClock extends ChronoClock
{
    /****************************************************/
    /* Private                                          */
    /****************************************************/
    
    private m_texture : Phaser.GameObjects.Sprite;

    private m_text : Phaser.GameObjects.Text;

    /****************************************************/
    /* Public                                           */
    /****************************************************/
    
    public constructor
    (
        _scene : Phaser.Scene,
        _x : number,
        _y : number
    ) {
        super();

        this.m_text = _scene.add.text
        (
            _x,
            _y, 
            '', 
            { fontFamily: '"Roboto Condensed"' }
        );

        this.m_text.setFontSize(50);
        this.m_text.setColor('black');
        this.m_text.setOrigin(0.5,0.5);        
        return;
    }

    public update()
    : void {
        //this.m_text.text = this.m_chrono_mng.getCurrentTime().toString();
        return;
    }

    public reset()
    : void {
        this.m_text.setColor('black');
        return;
    }

    public hotClock()
    : void {
        this.m_text.setColor('red');
        return;
    }
}