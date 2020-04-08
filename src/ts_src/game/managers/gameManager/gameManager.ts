import { Manager } from "../../../utilities/managers/manager";
import { MANAGER_ID, LOCALIZATION } from "../../gameCommons";
import { DataManager } from "../dataManager/dataManager";

export class GameManager extends Manager
{
    /**
     * Game's localization identifier.
     */
    private m_localization : LOCALIZATION;

    /**
     * Reference to the DataManager.
     */
    private readonly m_data_mng : DataManager;

    public constructor(){
        super(MANAGER_ID.kGameManager);

        // sets the default language.
        this.m_localization = LOCALIZATION.kSpanish;

        // create DataManager instance.
        this.m_data_mng = new DataManager();

        return;
    }

    /**
     * Gets a reference to the game's dataManager.
     */
    public getDataManager()
    : DataManager {
        return this.m_data_mng;
    }

    /**
     * Gets this game's localization identifer.
     */
    public getLocalization()
    : LOCALIZATION {
        return this.m_localization;
    }

    /**
     * Sets the game's localization identifier.
     * 
     * @param _localization Localization identifier.
     */
    public setLocalization(_localization : LOCALIZATION)
    : void {
        this.m_localization = _localization;
        return;
    }

    /**
    * Safely destroys the object.
    */
    public destroy()
    : void {
        this.m_data_mng.destroy();
        return;
    }
}