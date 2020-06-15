import { MxActor } from "../../../utilities/component/mxActor";
import { ClockController } from "./components/clockController";
import { SpriteComponent } from "../../components/spriteComponent";
import { BitmapTextComponent } from "../../components/bitmapTextComponent";
import { DigitalController } from "./components/digitalController";
import { GraphicsComponent } from "../../components/graphicsComponent";
import { AnalogClockController } from "./components/analogClockController";
import { SAND_CLOCK_PART_ID } from "../../gameCommons";
import { SandClockController } from "./components/sandClockController";

/**
 * Clock factories.
 */
export class Clock
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Creates a sand clock.
   * 
   * @param _scene 
   * @param _id 
   */
  static CreateSand(_scene : Phaser.Scene, _id : number)
  : MxActor
  {
    let clock : MxActor = MxActor.Create(_id);

    ///////////////////////////////////
    // Clock Texture

    let clockTexture : MxActor = MxActor.Create
    (
      SAND_CLOCK_PART_ID.kClockTexture,
      clock
    );

    let clockTextureSprite : SpriteComponent = new SpriteComponent();
    clockTextureSprite.setSprite
    (
      _scene.add.sprite
      (
        0,0,
        'landpage_2',
        'sand_clock_background.png'
      )
    );

    clockTexture.addComponent(clockTextureSprite);

    ///////////////////////////////////
    // Upper Sand
    
    let upperMask : MxActor = MxActor.Create
    (
      SAND_CLOCK_PART_ID.kUpperMask,
      clock
    );
    upperMask.setRelativePosition(0, -175);

    let upperMaskSprite : SpriteComponent = new SpriteComponent();
    upperMaskSprite.setSprite
    (
      _scene.add.sprite
      (
        0, 0,
        'sand_clock_mask'
      )
    );
    upperMaskSprite.setVisible(false);
    upperMask.addComponent(upperMaskSprite);

    let upperTexture : MxActor = MxActor.Create
    (
      SAND_CLOCK_PART_ID.kUpperTexture,
      clock
    );
    upperTexture.setRelativePosition(0, -175);
    
    let upperTextureSprite : SpriteComponent = new SpriteComponent();
    upperTextureSprite.setSprite
    (
      _scene.add.sprite
      (
        0,0,
        'landpage_2',
        'sand_clock_fill.png'
      )
    )
    upperTexture.addComponent(upperTextureSprite);

    let upperBitmapMask : Phaser.Display.Masks.BitmapMask = upperMaskSprite.createMask();
    upperTextureSprite.setMask(upperBitmapMask);

    ///////////////////////////////////
    // Lower Sand

    let lowerMask : MxActor = MxActor.Create
    (
      SAND_CLOCK_PART_ID.kLowerMask,
      clock
    );
    lowerMask.setRelativePosition(0, 175);

    let lowerMaskSprite : SpriteComponent = new SpriteComponent();
    lowerMaskSprite.setSprite
    (
      _scene.add.sprite
      (
        0,0,
        'sand_clock_mask'
      )
    );
    lowerMaskSprite.setAngle(180);
    lowerMaskSprite.setVisible(false);
    lowerMask.addComponent(lowerMaskSprite);

    let lowerTexture : MxActor = MxActor.Create
    (
      SAND_CLOCK_PART_ID.kLowerTexture,
      clock
    );
    lowerTexture.setRelativePosition(0,175);
    
    let lowerTextureSprite : SpriteComponent = new SpriteComponent();
    lowerTextureSprite.setSprite
    (
      _scene.add.sprite
      (
        0,0,
        'landpage_2',
        'sand_clock_fill.png'
      )
    )
    lowerTextureSprite.setAngle(180);
    lowerTexture.addComponent(lowerTextureSprite);

    let lowerBitmapMask : Phaser.Display.Masks.BitmapMask = lowerMaskSprite.createMask();
    lowerTextureSprite.setMask(lowerBitmapMask);
    
    clock.addComponent(new ClockController());
    clock.addComponent(new SandClockController());
    
    clock.init();
    return clock;
  }

  /**
   * Creates a digital clock.
   * 
   * @param _scene 
   * @param _id 
   */
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

  /**
   * Create an analog clock.
   * 
   * @param _scene 
   * @param _id 
   */
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