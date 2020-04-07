import { Manager } from "../../../utilities/managers/manager";
import { MANAGER_ID, LOCALIZATION } from "../../gameCommons";

export class GameManager extends Manager
{
    /**
     * Game's localization identifier.
     */
    private m_localization : LOCALIZATION;

    public constructor(){
        super(MANAGER_ID.kGameManager);

        this.m_localization = LOCALIZATION.kSpanish;
        return;
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
        return;
    }
}