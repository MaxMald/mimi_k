import { BaseScene } from "../BaseScene";
import { CloudPopup } from "../../game/ui/cloud_popup";
import { DataManager } from "../../game/managers/dataManager/dataManager";
import { GameManager } from "../../game/managers/gameManager/gameManager";
import { MANAGER_ID, CLOCK_STYLE } from "../../game/gameCommons";
import { UserPreferences } from "../../game/managers/userPreferences/userPreferences";
import { NineButton } from "../../game/ui/buttons/nineButton";
import { Carousel } from "../../game/ui/carousel/carousel";

/**
 * 
 */
export class MainMenu extends BaseScene
{
    /**
     * Array of time preferences buttons 
     */
    private m_pref_buttons : Array<NineButton>;

    /**
     * Play button
     */
    private m_play_button : NineButton;
    
    /**
     * Reference to the game manager.
     */
    private m_game_manager : GameManager;

    /**
     * Reference to the data manager.
     */
    private m_data_mng : DataManager;

    /**
     * Cloud poppup object.
     */
    private m_cloud_popup : CloudPopup;

    /**
     * tip number.
     */
    private m_tip_num : number;

    /**
     * 
     */
    private m_carousel : Carousel;

    /**
     * 
     */
    private m_carousel_item_name : Phaser.GameObjects.Text;

    public create ()
    : void
    {
        super.create();

        // gameCommons
        let half_width : number = this.game.canvas.width * 0.5;

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
            half_width,
            this.game.canvas.height * 0.9
        );

        // display first tip.
        this.m_tip_num = 0;
        this.nextTip();
        
        ///////////////////////////////////
        // Buttons

        // Time Preferences Buttons
        this.m_pref_buttons = new Array<NineButton>();
        
        let but_pos = new  Phaser.Geom.Point
        (
            half_width,
            this.game.canvas.height * 0.1
        );

        let button : NineButton;
        let a_times = [ 5, 3, 1 ];
        
        for(let index = 0; index < 3; ++index) {
            button = NineButton.CreateDefault
            (
                this,
                but_pos.x,
                but_pos.y,
                '' + a_times[index] + ' minutes',
                function() {
                    this._onClick_minute_button(a_times[index] * 60);
                },
                this
            );

            this.m_pref_buttons.push(button);
            but_pos.y += button.getHeight() + 20;
        }
        this._close_prefs();

        // play
        this.m_play_button = NineButton.CreateDefault
        (
            this,
            half_width,
            this.game.canvas.height * 0.1,
            "Play",
            this._onClick_play,
            this
        );

        // tip
        NineButton.CreateDefault
        (
            this,
            half_width,
            this.game.canvas.height * 0.75,
            "Next Tip",
            this.nextTip,
            this
        );

        ///////////////////////////////////
        // Carousel
        
        this.m_carousel = new Carousel
        (
            this,
            half_width,
            this.game.canvas.height * 0.5,
            450,
            'main_menu',
            'clock_idx_',
            '.png',
            CLOCK_STYLE.kCount
        );
        this.m_carousel.addListener('active_changed', this._onCarouselChanged, this);    
        
        // carousel title
        let carousel_title = this.add.text
        (
            half_width,
            this.game.canvas.height * 0.35, 
            this.m_data_mng.getString('choose_clock'), 
            { fontFamily: '"Roboto Condensed"' }
        );

        carousel_title.setFontSize(50);
        carousel_title.setColor('black');
        carousel_title.setOrigin(0.5,0.5);

        // carousel item name.
        this.m_carousel_item_name = this.add.text
        (
            half_width,
            this.game.canvas.height * 0.65, 
            "", 
            { fontFamily: '"Roboto Condensed"' }
        );

        this.m_carousel_item_name.setFontSize(50);
        this.m_carousel_item_name.setColor('black');
        this.m_carousel_item_name.setOrigin(0.5,0.5);

        // display default element
        this.m_carousel.setActive
        (
            this.m_game_manager.getUserPreference().getClockStyle()
        );

        return;
    }

    /****************************************************/
    /* Public                                           */
    /****************************************************/
    
    /**
    * Safely destroys the object.
    */
    public destroy()
    : void {
        super.destroy();

        this.m_carousel.destroy();
        this.m_carousel = null;

        this.m_cloud_popup.destroy();
        this.m_cloud_popup = null;

        this.m_play_button.destroy();
        
        while(this.m_pref_buttons.length) {
            let button = this.m_pref_buttons.pop()
            button.destroy();
        }
        this.m_pref_buttons = null;

        this.m_game_manager = null;
        this.m_data_mng = null;        
        return;
    }
    
    /****************************************************/
    /* Private                                          */
    /****************************************************/
    
    private _onClick_minute_button(_time : number)
    : void {
        let prefs : UserPreferences
            = this.m_game_manager.getUserPreference();
        prefs.chrono_value = _time;

        // TODO : descomentar,hasta tener el skin de todos los relojes.
        //prefs.setClockStyle(this.m_carousel.getCurrentIdx()); 
        prefs.setClockStyle(0); 

        this.destroy();
        this.scene.start('mainGame');
        return;
    }

    private _onCarouselChanged()
    : void {
        this.m_carousel_item_name.text
            = this.m_data_mng.getString('clock_name_' + this.m_carousel.getCurrentIdx());
        return;
    }

    private _close_prefs()
    : void {
        this.m_pref_buttons.forEach
        (
            function(_button : NineButton) {
                _button.close();
            },
            this
        );
        return;
    }

    private _open_prefs()
    : void {
        this.m_pref_buttons.forEach
        (
            function(_button : NineButton){
                _button.open();
            },
            this
        );
        return;
    }

    private _onClick_play()
    : void {
        this._open_prefs();
        this.m_play_button.close();
        return;
    }

    private nextTip()
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
}