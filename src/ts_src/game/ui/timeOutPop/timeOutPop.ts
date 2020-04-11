import { DataManager } from "../../managers/dataManager/dataManager";

export class TimeOutPop
{
    /****************************************************/
    /* Private                                          */
    /****************************************************/

    private m_group : Phaser.GameObjects.Group;
    
    private m_texture : Phaser.GameObjects.RenderTexture;

    private m_title : Phaser.GameObjects.Text;

    private m_msg : Phaser.GameObjects.Text;

    private m_data_mng : DataManager;

    private m_isOpen : boolean;

    /****************************************************/
    /* Public                                           */
    /****************************************************/
    
    public constructor
    (
        _scene : Phaser.Scene,
        _x : number,
        _y : number,
        _data_mng : DataManager
    )
    {
        this.m_data_mng = _data_mng;

        this.m_group = _scene.add.group();

        // Base texture
        this.m_texture = _scene.add.nineslice
        (
            _x,
           _y,            
            145,
            145,
            {key : 'main_menu', frame: 'button_bg.png'},
            [70, 70, 70, 70]
        );
        this.m_texture.resize(750,750);
        this.m_texture.setOrigin(0.5,0.5);

        this.m_texture.setInteractive();
        this.m_texture.on('pointerdown', this.close, this);        

        // Title
        this.m_title = _scene.add.text
        (
            _x,
            _y - 200,
            this.m_data_mng.getString('time_out_0'), 
            { fontFamily: '"Roboto Condensed"' }
        );

        this.m_title.setFontSize(100);
        this.m_title.setColor('black');
        this.m_title.setOrigin(0.5,0.5);

        this.m_msg = _scene.add.text
        (
            _x,
            _y,
            '', 
            { fontFamily: '"Roboto Condensed"' }
        );

        this.m_msg.setFontSize(50);
        this.m_msg.setColor('black');
        this.m_msg.setOrigin(0.5,0.5);
        this.m_msg.setWordWrapWidth(this.m_texture.width * 0.85);

        // Message

        this.m_group.add(this.m_texture);
        this.m_group.add(this.m_title);
        this.m_group.add(this.m_msg);

        this.m_isOpen = true;
        close();
        return;
    }

    public open()
    : void {
        if(!this.m_isOpen) {
            this.m_group.setVisible(true);

            let rnd = 1 + (Math.floor(Math.random() * 5));
            if(rnd > 4){
                rnd = 4;
            } 

            this.m_msg.text = this.m_data_mng.getString('time_out_' + rnd);
            this.m_isOpen = !this.m_isOpen;
        }        
        return;
    }

    public close()
    : void {
        if(this.m_isOpen) {
            this.m_group.setVisible(false);
            this.m_isOpen = !this.m_isOpen;
        }   
        return;
    }

    public isOpen()
    : boolean {
        return this.m_isOpen;
    }

    /**
    * Safely destroys the object.
    */
    public destroy()
    : void {
        return;
    }
}