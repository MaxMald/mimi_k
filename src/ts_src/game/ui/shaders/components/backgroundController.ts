import { MxComponent } from "../../../../utilities/component/mxComponent";
import { MxActor } from "../../../../utilities/component/mxActor";
import { ShaderComponent } from "../../../components/shaderComponent";
import { COMPONENT_ID } from "../../../gameCommons";
import { MasterController } from "../../../managers/masteManager/components/MasterController";
import { MasterManager } from "../../../managers/masteManager/masterManager";

export class BackgroundController extends MxComponent
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  constructor()
  {
    super(COMPONENT_ID.kBackgroundShaderComponent);
    return;
  }

  init(_actor : MxActor)
  : void
  {
    let master : MxActor = MasterManager.GetInstance();
    this._m_masterController = master.getComponent<MasterController>
    (
      COMPONENT_ID.kMasterController
    );

    this._m_shaderComponent = _actor.getComponent<ShaderComponent>
    (
      COMPONENT_ID.kShaderComponent
    );

    ///////////////////////////////////
    // Color11 A

    this._m_color11_a = new Float32Array(4);
    this._m_color11_a[0] = 0.13;
    this._m_color11_a[1] = 0.41;
    this._m_color11_a[2] = 0.44;
    this._m_color11_a[3] = 1.0;

    ///////////////////////////////////
    // Color11 B

    this._m_color11_b = new Float32Array(4);
    this._m_color11_b[0] = 0.03;
    this._m_color11_b[1] = 0.0;
    this._m_color11_b[2] = 0.21;
    this._m_color11_b[3] = 1.0;

    ///////////////////////////////////
    // Color11 T

    this._m_color11_t = new Float32Array(4);

    ///////////////////////////////////
    // Color 21

    this._m_color21 = new Float32Array(4);
    this._m_color21[0] = 0.03;
    this._m_color21[1] = 0.0;
    this._m_color21[2] = 0.21;
    this._m_color21[3] = 1.0;

    ///////////////////////////////////
    // Color 12

    this._m_color12 = new Float32Array(4);
    this._m_color12[0] = 0.03;
    this._m_color12[1] = 0.0;
    this._m_color12[2] = 0.21;
    this._m_color12[3] = 1.0;

    ///////////////////////////////////
    // Color 22 A

    this._m_color22_a = new Float32Array(4);
    this._m_color22_a[0] = 0.32;
    this._m_color22_a[1] = 0.06;
    this._m_color22_a[2] = 0.38;
    this._m_color22_a[3] = 1.0;

    ///////////////////////////////////
    // Color 22 B

    this._m_color22_b = new Float32Array(4);
    this._m_color22_b[0] = 0.47;
    this._m_color22_b[1] = 0.10;
    this._m_color22_b[2] = 0.56;
    this._m_color22_b[3] = 1.0;

    ///////////////////////////////////
    // Color 22 T

    this._m_color22_t = new Float32Array(4);

    ///////////////////////////////////
    // Init Shader

    this._m_shaderComponent.setUniform('color11.value.x', this._m_color11_a[0]);
    this._m_shaderComponent.setUniform('color11.value.y', this._m_color11_a[1]);
    this._m_shaderComponent.setUniform('color11.value.z', this._m_color11_a[2]);
    this._m_shaderComponent.setUniform('color11.value.w', this._m_color11_a[3]);

    this._m_shaderComponent.setUniform('color21.value.x', this._m_color21[0]);
    this._m_shaderComponent.setUniform('color21.value.y', this._m_color21[1]);
    this._m_shaderComponent.setUniform('color21.value.z', this._m_color21[2]);
    this._m_shaderComponent.setUniform('color21.value.w', this._m_color21[3]);

    this._m_shaderComponent.setUniform('color12.value.x', this._m_color12[0]);
    this._m_shaderComponent.setUniform('color12.value.y', this._m_color12[1]);
    this._m_shaderComponent.setUniform('color12.value.z', this._m_color12[2]);
    this._m_shaderComponent.setUniform('color12.value.w', this._m_color12[3]);

    this._m_shaderComponent.setUniform('color22.value.x', this._m_color22_a[0]);
    this._m_shaderComponent.setUniform('color22.value.y', this._m_color22_a[1]);
    this._m_shaderComponent.setUniform('color22.value.z', this._m_color22_a[2]);
    this._m_shaderComponent.setUniform('color22.value.w', this._m_color22_a[3]);

    this._m_time = 0.0;
    return;
  }

  update(_actor : MxActor)
  : void
  {
    this._m_time += this._m_masterController.m_dt;
    let t : number = Math.sin(this._m_time);

    this._interpolateColor
    (
      t, 
      this._m_color22_a, 
      this._m_color22_b, 
      this._m_color22_t
    );

    this._m_shaderComponent.setUniform('color22.value.x', this._m_color22_t[0]);
    this._m_shaderComponent.setUniform('color22.value.y', this._m_color22_t[1]);
    this._m_shaderComponent.setUniform('color22.value.z', this._m_color22_t[2]);

    this._interpolateColor
    (
      t, 
      this._m_color11_a, 
      this._m_color11_b, 
      this._m_color11_t
    );

    this._m_shaderComponent.setUniform('color11.value.x', this._m_color11_t[0]);
    this._m_shaderComponent.setUniform('color11.value.y', this._m_color11_t[1]);
    this._m_shaderComponent.setUniform('color11.value.z', this._m_color11_t[2]);

    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  _interpolateColor
  (
    _x : number,
    _color1 : Float32Array, 
    _color2 : Float32Array, 
    _output : Float32Array
  )
  : void 
  {
    _output[0] =  _color1[0] + ((_color2[0] - _color1[0]) * _x);
    _output[1] =  _color1[1] + ((_color2[1] - _color1[1]) * _x);
    _output[2] =  _color1[2] + ((_color2[2] - _color1[2]) * _x);
    _output[3] =  _color1[3] + ((_color2[3] - _color1[3]) * _x);
    return;
  }

  /**
   * 
   */
  _m_masterController : MasterController;

  /**
   * 
   */
  _m_time : number;

  /**
   * 
   */
  _m_shaderComponent : ShaderComponent;

  /**
   * 
   */
  _m_color11_a : Float32Array;

  /**
   * 
   */
  _m_color11_b : Float32Array;

  /**
   * 
   */
  _m_color11_t : Float32Array;

  /**
   * 
   */
  _m_color12 : Float32Array;

  /**
   * 
   */
  _m_color21 : Float32Array;

  /**
   * 
   */
  _m_color22_a : Float32Array;

  /**
   * 
   */
  _m_color22_b : Float32Array;

  /**
   * 
   */
  _m_color22_t : Float32Array;
}