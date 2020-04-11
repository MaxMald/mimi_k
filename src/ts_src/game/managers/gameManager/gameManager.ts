import { Manager } from "../../../utilities/managers/manager";
import { MANAGER_ID, LOCALIZATION } from "../../gameCommons";
import { DataManager } from "../dataManager/dataManager";
import { ChronoManager } from "../chronoManager/chronoManager";
import { UserPreferences } from "../userPreferences/userPreferences";

/**
 * 
 */
export class GameManager extends Manager
{
    /**
     * Reference to the UserPreference object.
     */
    private m_user_preferences : UserPreferences;

    /**
     * Reference to the time manager
     */
    private m_chrono_mng :  ChronoManager;   

    /**
     * This flag indicate if we are at the game scene.
     */
    private m_inGameplay : boolean;

    /**
     * Reference to the DataManager.
     */
    private m_data_mng : DataManager;

    /**
     * 
     */
    public constructor(){
        super(MANAGER_ID.kGameManager);       

        // create user preferences.
        this.m_user_preferences = new UserPreferences();

        // create DataManager instance.
        this.m_data_mng = new DataManager();

        // Gameplay always starts at false.
        this.m_inGameplay = false;
        return;
    }

    /**
     * 
     */
    public update()
    : void {
        if(this.m_inGameplay) {
            this.m_chrono_mng.update();
        }
        return;
    }

    /**
     * Get a reference to the game's user Reference.
     */
    public getUserPreference()
    : UserPreferences {
        return this.m_user_preferences;
    }

    /**
     * Gets a reference to the game's dataManager.
     */
    public getDataManager()
    : DataManager {
        return this.m_data_mng;
    }

    /**
     * Get a reference of the ChronoManager.
     */
    public getChronoManager()
    : ChronoManager {
        return this.m_chrono_mng;
    }

    /**
     * Initialize the Gameplay
     */
    public initGamePlay()
    : void {
        if(!this.m_inGameplay) {
            this.m_chrono_mng = new ChronoManager();
            this.m_chrono_mng.setMasterManager(this.m_master_mng);

            this.m_inGameplay = !this.m_inGameplay;
        } 
        return;
    }

    /**
     * Reset the Gameplay
     */
    public resetGameplay()
    : void {
        if(this.m_inGameplay) {
            this.m_chrono_mng.reset
            (
                this.m_user_preferences.chrono_value,
                this.m_user_preferences.chrono_value * 0.1
            );
        }
        return;
    }

    /**
     * Shutdown Gameplay
     */
    public shutdownGameplay()
    : void {
        if(this.m_inGameplay) {

            this.m_chrono_mng.destroy();
            this.m_chrono_mng = null;
            this.m_inGameplay = !this.m_inGameplay;
        }
        return;
    }

    /**
     * Gets this game's localization identifer.
     */
    public getLocalization()
    : LOCALIZATION {
        return this.m_user_preferences.getLocalization();
    }

    /**
     * Sets the game's localization identifier.
     * 
     * @param _localization Localization identifier.
     */
    public setLocalization(_localization : LOCALIZATION)
    : void {
        this.m_user_preferences.setLocalization(_localization);
        return;
    }

    /**
    * Safely destroys the object.
    */
    public destroy()
    : void {
        this.m_data_mng.destroy();
        this.m_data_mng = null;
        
        this.m_user_preferences.destroy();
        this.m_user_preferences = null;
        return;
    }
}