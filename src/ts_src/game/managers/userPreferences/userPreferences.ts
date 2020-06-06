import { LOCALIZATION, CLOCK_STYLE } from "../../gameCommons";

/**
 * This class is only for 
 */
export class UserPreferences
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Value of Chrono
   */
  chrono_value : number;

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
   /**
   * Game's localization identifier.
   */
  m_localization : LOCALIZATION;
  
  /**
   * Clock's style
   */
  m_clock_style : CLOCK_STYLE;
  
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  constructor() {
      this.m_localization = LOCALIZATION.KSpanish;
      this.m_clock_style = CLOCK_STYLE.kSand;
      this.chrono_value = 1;      
       return;
  }
  
  setLocalization(_localization : LOCALIZATION)
  : void {
      this.m_localization = _localization;
      return;
  }
  
  getLocalization()
  : LOCALIZATION {
      return this.m_localization;
  }
  
  setClockStyle(_style : CLOCK_STYLE)
  : void {
      this.m_clock_style = _style;
      return;
  }
  
  getClockStyle()
  : CLOCK_STYLE {
      return this.m_clock_style;
  }
  
  destroy() 
  : void {
      return;
  }
}