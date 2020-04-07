import { MasterManager } from "../utilities/managers/masterManager";
import { GameManager } from "../game/managers/gameManager/gameManager";

export class Boot extends Phaser.Scene
{   
    public preload ()
    : void
    {   
        /**
         * Loads preloader assets. This file must be light.
         */
        this.load.atlas
        (
            'preloader',
            'src/assets/images/atlas/preloader.png',
            'src/assets/images/atlas/preloader.js'
        );        
        return;
    }

    public create ()
    : void
    {
        /**
         * Fit the game canvas to parent container.
         */
        this.game.scale.scaleMode = Phaser.Scale.ScaleModes.FIT;

        /**
         * Prepare Master Manager.
         */
        MasterManager.Prepare(this.game);
        let master : MasterManager = MasterManager.GetInstance();

        /**
         * Create GameManager.
         */
        master.addManager(new GameManager());

        /**
         * Start Preloader Sccene.
         */
        this.scene.start('localization');
        return;
    }    
}