import { Preloader } from "./scenes/preloader";
import { Boot } from "./scenes/boot";
import { MainMenu } from "./scenes/menus/mainMenu";
import { Plugin } from "phaser3-nineslice";
import { LocalizationScene } from "./scenes/localization";

class GameInit
{
    private m_game : Phaser.Game;

    public constructor()
    { }

    public start()
    : void
    {
        var config = 
        {
            type: Phaser.WEBGL,
            scale: 
            {
                parent: 'phaser-game',
                autoCenter: Phaser.Scale.CENTER_BOTH,
                mode: Phaser.Scale.FIT
            },
            width : 1080,
            height : 1920,
            input:
            {
                gamepad:true
            },
            plugins: {
                global: [ Plugin.DefaultCfg ],
              },   
            backgroundColor: 0x008aff        
        }

        ///////////////////////////////////
        // Init Game

        this.m_game = new Phaser.Game(config);
        
        ///////////////////////////////////
        // Create Scenes
        
        this.m_game.scene.add('boot',Boot);
        this.m_game.scene.add('preloader',Preloader);
        this.m_game.scene.add('mainMenu', MainMenu);
        this.m_game.scene.add('localization', LocalizationScene);

        ///////////////////////////////////
        // Start BOOT        
        
        this.m_game.scene.start('boot');

        ////////////////////////////////////
        // 
        return;
    }  
}
export = GameInit;