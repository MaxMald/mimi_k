import { LOCALIZATION, CLOCK_STYLE } from "../../gameCommons";

/**
 * 
 */
export class UserPreferences
{
    /****************************************************/
    /* Public                                           */
    /****************************************************/
    
    /**
     * Value of Chrono
     */
    public chrono_value : number;

    /****************************************************/
    /* Private                                          */
    /****************************************************/
    
     /**
     * Game's localization identifier.
     */
    private m_localization : LOCALIZATION;

    /**
     * Clock's style
     */
    private m_clock_style : CLOCK_STYLE;

    /****************************************************/
    /* Public                                           */
    /****************************************************/
    
    constructor() {
         
        // sets default values
        this.m_localization = LOCALIZATION.kSpanish;
        this.chrono_value = 1;
        this.m_clock_style = CLOCK_STYLE.kSand;
         return;
    }

    public setLocalization(_localization : LOCALIZATION)
    : void {
        this.m_localization = _localization;
        return;
    }

    public getLocalization()
    : LOCALIZATION {
        return this.m_localization;
    }

    public setClockStyle(_style : CLOCK_STYLE)
    : void {
        this.m_clock_style = _style;
        return;
    }

    public getClockStyle()
    : CLOCK_STYLE {
        return this.m_clock_style;
    }

    public destroy() 
    : void {
        return;
    }
}