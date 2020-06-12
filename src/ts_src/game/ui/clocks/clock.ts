import { MxActor } from "../../../utilities/component/mxActor";
import { ClockController } from "./components/clockController";
import { SpriteComponent } from "../../components/spriteComponent";
import { BitmapTextComponent } from "../../components/bitmapTextComponent";
import { DigitalController } from "./components/digitalController";
import { GraphicsComponent } from "../../components/graphicsComponent";
import { AnalogClockController } from "./components/analogClockController";

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
      '03:00',
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

    ///////////////////////////////////
    // Background Object

    let backgroundObject : MxActor = MxActor.Create(1, clock);

    let backgroundSprite : SpriteComponent = new SpriteComponent();
    backgroundSprite.setSprite
    (
      _scene.add.sprite
      (
        0, 0,
        'landpage_2',
        'analog_clock_background.png'
      )
    );

    backgroundObject.addComponent(backgroundSprite);

    ///////////////////////////////////
    // Radial Fill

    let graphicsComponent : GraphicsComponent
      = new GraphicsComponent();

    graphicsComponent.prepare(_scene);

    clock.addComponent(graphicsComponent);
    clock.addComponent(new ClockController());
    clock.addComponent(new AnalogClockController());

    ///////////////////////////////////
    // Foreground Object

    let foregroundObject : MxActor = MxActor.Create(2 , clock);

    let foregroundSprite : SpriteComponent = new SpriteComponent();
    foregroundSprite.setSprite
    (
      _scene.add.sprite
      (
        0, 0,
        'landpage_2',
        'analog_clock_front.png'
      )
    );

    foregroundObject.addComponent(foregroundSprite);

    clock.init();
    return clock;
  }
}