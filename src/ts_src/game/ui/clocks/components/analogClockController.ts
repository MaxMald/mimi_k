import { MxComponent } from "../../../../utilities/component/mxComponent";
import { COMPONENT_ID } from "../../../gameCommons";
import { MxActor } from "../../../../utilities/component/mxActor";
import { GraphicsComponent } from "../../../components/graphicsComponent";
import { ClockController } from "./clockController";

export class AnalogClockController extends MxComponent
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  constructor()
  {
    super(COMPONENT_ID.kAnalogClockController);
    return;
  }

  init(_actor : MxActor)
  : void
  {
    this._m_startAngle = -Math.PI * 0.5;
    this._m_maxAngle = Math.PI * 1.5;

    let graphicsComponent : GraphicsComponent
      = _actor.getComponent<GraphicsComponent>(COMPONENT_ID.kGraphicsComponent);

    this._m_graphics = graphicsComponent.getGraphic();

    this._m_clockController = _actor.getComponent<ClockController>
    (
      COMPONENT_ID.kClockController
    );
    return;
  }

  update(_actor : MxActor)
  : void
  {
    let percent : number = this._m_clockController.m_current_time 
                          / this._m_clockController._m_totalSeconds;

    this._m_graphics.clear();
    this._m_graphics.lineStyle(308, 0x31a13b, 1);
    this._m_graphics.beginPath();
    this._m_graphics.arc
    (
      0, 0, 
      173.5, 
      this._m_startAngle, 
      this._m_maxAngle - (Phaser.Math.PI2 * percent)
    );
    this._m_graphics.strokePath();
    this._m_graphics.closePath();    
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Reference to the phaser's graphics gameobject.
   */
  _m_graphics : Phaser.GameObjects.Graphics;

  /**
   * 
   */
  _m_clockController : ClockController;

  /**
   * 
   */
  _m_startAngle : number;

  /**
   * 
   */
  _m_maxAngle : number;
}