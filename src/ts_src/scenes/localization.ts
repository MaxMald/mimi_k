import { GameManager } from "../game/managers/gameManager/gameManager";
import { MasterManager } from "../utilities/managers/masterManager";
import { MANAGER_ID, LOCALIZATION } from "../game/gameCommons";

export  class LocalizationScene extends Phaser.Scene
{
    /****************************************************/
    /* Public                                           */
    /****************************************************/
        
    public create()
    : void {

        let width = this.game.canvas.width;
        let height = this.game.canvas.height;

        /**
         * North America map, without Mexico.
         */
        let english_button : Phaser.GameObjects.Sprite = this.add.sprite
        (
            width * 0.5,
            height * 0.25,
            'preloader',
            'english_map.png'
        );

        english_button.setInteractive();
        english_button.on('pointerup', this._onClick_english, this);

        /**
         * Latin America map.
        */
        let latin_button : Phaser.GameObjects.Sprite = this.add.sprite
        (
            width * 0.5,
            height * 0.75,
            'preloader',
            'latino_map.png'
        );

        latin_button.setInteractive();
        latin_button.on('pointerup', this._onClick_spanish, this);
        return;
    }

    /****************************************************/
    /* Private                                          */
    /****************************************************/
    
    private _onClick_english()
    : void {
        let game_mng : GameManager 
            = MasterManager.GetInstance().getManager<GameManager>(MANAGER_ID.kGameManager);        
        game_mng.setLocalization(LOCALIZATION.kEnglish);

        // TODO: start preload scene.
        return;
    }

    private _onClick_spanish()
    : void {
        let game_mng : GameManager 
            = MasterManager.GetInstance().getManager<GameManager>(MANAGER_ID.kGameManager);        
        game_mng.setLocalization(LOCALIZATION.kSpanish);

        // TODO: start preload scene.
        return;
    }
}