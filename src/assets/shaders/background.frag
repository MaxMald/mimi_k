precision mediump float;

uniform float time;
uniform vec2 resolution;
uniform vec4 color11;
uniform vec4 color21;
uniform vec4 color12;
uniform vec4 color22;
uniform sampler2D uMainSampler;

//varying vec2 outTexCoord;

//uniform float u_time;
//uniform vec2 u_resolution;

float bilinearInterpolation
(
  float _x,
  float _y, 
  float _x1,
  float _y1, 
  float _x2,
  float _y2, 
  float _Q11, 
  float _Q21, 
  float _Q12, 
  float _Q22
) {
  float dx = _x2 - _x1;

  float x_y1 = (((_x2 - _x) / dx) * _Q11)
            + (((_x - _x1) / dx) * _Q21);

  float x_y2 = (((_x2 - _x) / dx) * _Q12)
            + (((_x - _x1) / dx) * _Q22);
  
  float dy = _y2 - _y1;
  return (((_y2 - _y) / dy) * x_y1)
          + (((_y - _y1) / dy) * x_y2);
}

vec4 bilinearColorInterpolation
(
  float _x,
  float _y,
  float _x1,
  float _y1,
  float _x2,
  float _y2,
  vec4 _color_11,
  vec4 _color_21,
  vec4 _color_12,
  vec4 _color_22
) {
  return vec4
  (
    bilinearInterpolation(_x, _y, _x1, _y1, _x2, _y2, _color_11.x, _color_21.x, _color_12.x, _color_22.x),
    bilinearInterpolation(_x, _y, _x1, _y1, _x2, _y2, _color_11.y, _color_21.y, _color_12.y, _color_22.y),
    bilinearInterpolation(_x, _y, _x1, _y1, _x2, _y2, _color_11.z, _color_21.z, _color_12.z, _color_22.z),
    bilinearInterpolation(_x, _y, _x1, _y1, _x2, _y2, _color_11.w, _color_21.w, _color_12.w, _color_22.w)
  );
}

vec4 interpolateColor(vec4 _color_a, vec4 _color_b, float _step) {
    vec4 color;

    color.x = ((_color_b.x - _color_a.x) * _step) + _color_a.x;
    color.y = ((_color_b.y - _color_a.y) * _step) + _color_a.y;
    color.z = ((_color_b.z - _color_a.z) * _step) + _color_a.z;
    color.w = ((_color_b.w - _color_a.w) * _step) + _color_a.w;

    return color;
}

void main(void) 
{	
  //vec4 color11 = vec4(0.0, 0.1843, 1.0, 1.0);
  //vec4 color12 = vec4(1.0, 0.0, 0.0, 1.0);
  //vec4 color21 = vec4(0.0, 1.0, 0.0824, 1.0);
  //vec4 color22 = vec4(1.0, 0.0, 0.9176, 1.0);

  gl_FragColor = bilinearColorInterpolation
  (
    gl_FragCoord.x, 
    gl_FragCoord.y,
    0.0,
    0.0,
    resolution.x,
    resolution.y,
    color11,
    color12,
    color21,
    color22
  );
}