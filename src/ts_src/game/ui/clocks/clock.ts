import { MxActor } from "../../../utilities/component/mxActor";
import { ClockController } from "./components/clockController";
import { SpriteComponent } from "../../components/spriteComponent";
import { BitmapTextComponent } from "../../components/bitmapTextComponent";
import { DigitalController } from "./components/digitalController";

/**
 * Clock factories.
 */
export class Clock
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  static CreateSand(_scene : Phaser.Scene, _id : number)
  : MxActor
  {
    let clock : MxActor = MxActor.Create(_id);

    clock.addComponent(new ClockController());
    clock.init();
    return clock;
  }

  static CreateDigital(_scene : Phaser.Scene, _id : number)
  : MxActor
  {
    let clock : MxActor = MxActor.Create(_id);

    let spriteComponent : SpriteComponent = new SpriteComponent();
    spriteComponent.setSprite
    (
      _scene.add.sprite
      (
        0, 0,
        'landpage',
        'digital_clock.png'
      )
    );

    clock.addComponent(spriteComponent);

    let clockText : BitmapTextComponent = new BitmapTextComponent();
    clockText.prepare
    (
      _scene,
      'digital_dream',
      '3:00',
      160
    )
    clockText.setOrigin(0.5, 0.5);
    clockText.setCenterAlign();
    clockText.setTint(0x31a13b);
    clockText._m_local_position.y = -75;

    clock.addComponent(clockText);

    clock.addComponent(new ClockController());
    clock.addComponent(new DigitalController());
    clock.init();
    return clock;
  }

  static CreateAnalog(_scene : Phaser.Scene, _id : number)
  : MxActor
  {
    let clock : MxActor = MxActor.Create(_id);

    clock.addComponent(new ClockController());
    clock.init();
    return clock;
  }
}