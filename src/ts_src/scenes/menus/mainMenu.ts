import { BaseScene } from "../BaseScene";
import { CloudPopup } from "../../game/ui/cloud_popup";
import { DataManager } from "../../game/managers/dataManager/dataManager";
import { GameManager } from "../../game/managers/gameManager/gameManager";
import { MANAGER_ID } from "../../game/gameCommons";

export class MainMenu extends BaseScene
{
    private m_game_manager : GameManager;
    private m_data_mng : DataManager;
    private m_cloud_popup : CloudPopup;
    private m_tip_num : number;

    public create ()
    : void
    {
        super.create();

        // gets the Game Manager.
        this.m_game_manager 
            = this.m_master.getManager<GameManager>(MANAGER_ID.kGameManager);
        
        // gets the DataManager from GameManager.
        this.m_data_mng = this.m_game_manager.getDataManager();

        // Create the cloud poupup.
        this.m_cloud_popup = new  CloudPopup(this);
        this.m_cloud_popup.setMaxWidth(800);
        this.m_cloud_popup.setPosition
        (
            this.game.canvas.width * 0.5,
            this.game.canvas.height * 0.5
        );

        // display first tip.
        this.m_tip_num = 0;
        this.nextTip();
        
        // Tip Testing button.
        this.createButton
        (
            this.game.canvas.width * 0.5,
            this.game.canvas.height * 0.2,
            "Next Tip",
            this.nextTip,
            this
        );
        return;
    }

    public nextTip()
    : void {
        this.m_cloud_popup.setText(this.m_data_mng.getString('menu_tip_0'+this.m_tip_num));
        
        this.m_cloud_popup.close();
        this.m_cloud_popup.open();

        // iterate over tips.
        this.m_tip_num++;
        if(this.m_tip_num > 5) {
            this.m_tip_num = 0;
        }
    }

    public createButton
    (
        _x : number,
        _y : number,
        _label : string, 
        _fn : ()=>void, 
        _context : any
    )
    : void {        

        let button = this.add.nineslice
        (
           _x,
           _y,            
            145,
            145,
            {key : 'main_menu', frame: 'button_bg.png'},
            [70, 70, 70, 70]
        );
        button.resize(500, 145);
        button.setOrigin(0.5, 0.5);

        button.setInteractive();
        button.on('pointerdown', _fn, _context);
        
        let label : Phaser.GameObjects.Text = this.add.text
        (
            _x,
            _y, 
            _label, 
            { fontFamily: '"Roboto Condensed"' }
        );
        
        label.setFontSize(50);
        label.setColor('black');
        label.setOrigin(0.5,0.5);
        return;
    }
}