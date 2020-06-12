import { MxComponent } from "../../../../utilities/component/mxComponent";
import { COMPONENT_ID } from "../../../gameCommons";
import { BitmapTextComponent } from "../../../components/bitmapTextComponent";
import { MxActor } from "../../../../utilities/component/mxActor";
import { ClockController } from "./clockController";
import { GetMMSS } from "../../../../utilities/date_time";

export class DigitalController extends MxComponent
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  constructor()
  {
    super(COMPONENT_ID.kDigitalClockController);
    return;
  }

  init(_actor : MxActor)
  : void
  {
    this._m_textComponent = _actor.getComponent<BitmapTextComponent>
    (
      COMPONENT_ID.kBitmapText
    );

    this._m_clockController = _actor.getComponent<ClockController>
    (
      COMPONENT_ID.kClockController
    );

    return;
  }

  update(_actor : MxActor)
  : void
  {
    this._m_textComponent.setText
    (
      GetMMSS(this._m_clockController.m_current_time)
    );
    return;
  }

  destroy()
  : void
  {
    this._m_clockController = null;
    this._m_textComponent = null;
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  _m_textComponent : BitmapTextComponent;

  _m_clockController : ClockController;
}