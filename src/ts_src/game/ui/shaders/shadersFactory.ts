import { MxActor } from "../../../utilities/component/mxActor";
import { ShaderComponent } from "../../components/shaderComponent";
import { MxShader } from "../../../utilities/shaders/mxShader";
import { BackgroundController } from "./components/backgroundController";

export class ShaderFactory 
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  static CreateBackground(_scene : Phaser.Scene, _id : number)
  : MxActor
  {
    let shader : MxActor = MxActor.Create(_id);

    let shaderComponent : ShaderComponent = new ShaderComponent();
    
    let phaserShader : Phaser.GameObjects.Shader = _scene.add.shader
    (
      'background',
      0, 0,
      _scene.game.canvas.width,
      _scene.game.canvas.height
    )
    phaserShader.setOrigin(0.0, 0.0);

    phaserShader.uniforms.color11 = 
    {
      type : "4f", value : { x : 0.5, y: 0.5, z: 0.5, w: 1.0 }
    };
    MxShader.InitUniform('color11', phaserShader);

    phaserShader.uniforms.color21 = 
    {
      type : "4f", value : { x : 0.5, y: 0.5, z: 0.5, w: 1.0 }
    };
    MxShader.InitUniform('color21', phaserShader);

    phaserShader.uniforms.color12 = 
    {
      type : "4f", value : { x : 0.5, y: 0.5, z: 0.5, w: 1.0 }
    };
    MxShader.InitUniform('color12', phaserShader);

    phaserShader.uniforms.color22 = 
    {
      type : "4f", value : { x : 0.5, y: 0.5, z: 0.5, w: 1.0 }
    };
    MxShader.InitUniform('color22', phaserShader);

    shaderComponent.prepare(phaserShader);
    shader.addComponent(shaderComponent);
    shader.addComponent(new BackgroundController());
    shader.init();
    return shader;
  }
}