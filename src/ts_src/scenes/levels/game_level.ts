import { ChronoClock } from "../../game/ui/clocks/chronoClock";
import { GameManager } from "../../game/managers/gameManager/gameManager";
import { MANAGER_ID, CLOCK_STYLE } from "../../game/gameCommons";
import { UserPreferences } from "../../game/managers/userPreferences/userPreferences";
import { SandClock } from "../../game/ui/clocks/sandClock";
import { DigitalClock } from "../../game/ui/clocks/digitalClock";
import { AnalogClock } from "../../game/ui/clocks/analogClock";
import { NineButton } from "../../game/ui/buttons/nineButton";
import { TimeOutPop } from "../../game/ui/timeOutPop/timeOutPop";

export class MainGame extends Phaser.Scene
{
  /****************************************************/
  /* Private                                          */
  /****************************************************/

  private m_chrono_clock : ChronoClock;

  private m_game_mng : GameManager;  

  private m_user_pref : UserPreferences;

  private m_pause_resume : NineButton;

  private m_reset : NineButton;

  private m_main_menu : NineButton;

  private m_pop_up : TimeOutPop;

  /****************************************************/
  /* Public                                           */
  /****************************************************/

  public create()
  : void {/*

    let half_width : number = this.game.canvas.width * 0.5;

    // get GameManager. 
    this.m_game_mng 
      = this.m_master.getManager<GameManager>(MANAGER_ID.kGameManager);

    // initalize Gameplay.
    this.m_game_mng.initGamePlay();

    // get DataManager.
    this.m_data_mng = this.m_game_mng.getDataManager();

    // get ChronoManager.
    this.m_chrono_mng = this.m_game_mng.getChronoManager();
    
    // get user preferences
    this.m_user_pref = this.m_game_mng.getUserPreference();
    
    ///////////////////////////////////
    // Chrono Display
    let clock_x : number = this.game.canvas.width * 0.5;
    let clocl_y : number = this.game.canvas.height * 0.5;
    switch(this.m_user_pref.getClockStyle()){
        case CLOCK_STYLE.kSand:
            this.m_chrono_clock = new SandClock(this, clock_x, clocl_y);
            break;
        case CLOCK_STYLE.kDigital:
            this.m_chrono_clock = new DigitalClock(this, clock_x, clocl_y);
            break;
        case CLOCK_STYLE.kAnalog:
            this.m_chrono_clock = new AnalogClock(this, clock_x, clocl_y);
            break;
        default:
            this.m_chrono_clock = new SandClock(this, clock_x, clocl_y);
            break;
    }
    
    // set manager to chrono display
    this.m_chrono_clock.setChronoManager(this.m_chrono_mng);
    
    ///////////////////////////////////
    // Buttons
    
    this.m_pause_resume = NineButton.CreateDefault
    (
        this,
        half_width,
        this.game.canvas.height * 0.8,
        "Start",
        this._on_click_pause_resume,
        this
    );
    
    this.m_reset = NineButton.CreateDefault
    (
        this,
        half_width,
        this.game.canvas.height * 0.9,
        "Reset",
        this._reset_clock,
        this
    );
    this.m_main_menu = NineButton.CreateDefault
    (
        this,
        half_width,
        this.game.canvas.height * 0.1,
        "Main_Menu",
        this._on_click_main_menu,
        this
    );
    ///////////////////////////////////
    // Popup
    this.m_pop_up = new TimeOutPop
    (
        this,
        half_width,
        this.game.canvas.height * 0.5,
        this.m_data_mng
    );
    this.m_chrono_mng.addListener('on_mark', this._on_reach_mark, this);
    this.m_chrono_mng.addListener('on_finish', this._on_chrono_finish, this);
    this._reset_clock();
    return;
    }

    public update(_step : number , _dt : number)
    : void {
        super.update(_step, _dt);
        this.m_chrono_clock.update();
        return;
    }

    public destroy()
    : void {
        this.m_pop_up.destroy();
        this.m_pop_up = null;

        this.m_pause_resume.destroy();
        this.m_pause_resume = null;

        this.m_reset.destroy();
        this.m_reset = null;

        this.m_data_mng = null;        

        this.m_user_pref = null;

        // destroy clock display.
        this.m_chrono_clock.destroy();
        this.m_chrono_clock = null;
        
        // shutdown Gameplay.
        //this.m_game_mng.shutdownGameplay();
        this.m_game_mng = null;
        return;
    }
*/
    /****************************************************/
    /* Private                                          */
    /****************************************************/
  /*  
    private _on_click_main_menu()
    : void {
        this.destroy();
        this.scene.start('mainMenu');
        return;
    }

    private _on_chrono_finish()
    : void {
        this._reset_clock();
        this.m_pop_up.open();        
        return;
    }

    private _on_reach_mark()
    : void {
        this.m_chrono_clock.hotClock();        
        return;
    }

    private _reset_clock()
    : void { /*
        this.m_chrono_mng.reset
        (
            this.m_user_pref.chrono_value,
            //15,
            10
        )

        this._init_button_frame();
        this.m_chrono_clock.reset();
        
        if(this.m_pop_up.isOpen()){
            this.m_pop_up.close();
        }
        return;*/
    }

    private _on_click_pause_resume()
    : void {/*
        if(this.m_chrono_mng.isRunning()){
            this.m_chrono_mng.pause();
            this.m_pause_resume.setText('Resumen');
        } 
        else {
            this.m_chrono_mng.start();
            this.m_pause_resume.setText('Pause');
        }
        
        if(this.m_pop_up.isOpen()){
            this.m_pop_up.close();
        }
        return;*/
    }

    private _init_button_frame()
    : void {
        this.m_pause_resume.setText('Start');
        return;
    }
}