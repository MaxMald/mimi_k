export class MxShader
{
    public static InitUniform
    (
        _key : string, 
        _shader : Phaser.GameObjects.Shader
    )
    : void {

        if(_key == null || _key === undefined) {
            return;
        }

        if(_shader == null || _shader === undefined) {
            return;
        }

        var gl = _shader.gl;
        var renderer = _shader.renderer as any;
        var map = renderer.glFuncMap;
        var program = _shader.program;

        var uniform = _shader.getUniform(_key);
        if(uniform == null) {
            return;
        }
        
        var type = uniform.type;
        var data = map[type];

        uniform.uniformLocation = gl.getUniformLocation(program, _key);

        if (type !== 'sampler2D')
        {
            uniform.glMatrix = data.matrix;
            uniform.glValueLength = data.length;
            uniform.glFunc = data.func;
        }
        return;
    }
}