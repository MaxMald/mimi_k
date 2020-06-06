import { Interpolation } from "../interpolation/interpolation";

export class PerlinNoise
{
    /****************************************************/
    /* Private                                          */
    /****************************************************/
    
    private static MAX_LENGHT : number = 256;
    
    /****************************************************/
    /* Public                                           */
    /****************************************************/

    /**
     * 
     * @param _length 
     * @param _n_octaves 
     */
    public static Noise1D
    (
        _length : number,
        _frecuency_power : number = 2,
        _amplitude_power : number = 2,
        _n_octaves : number = 6,
        _normalized : boolean = false
    ) : Float32Array
    {
        /**
         * Wave values.
         */
        let wave : Float32Array = new Float32Array(_length);

        let frecuency : number = 0;
        let amplitude : number = 0;

        for(let oct_idx : number = 1; oct_idx <= _n_octaves; ++oct_idx) {
            
            /**
             * Octave Frecuency
             */
            frecuency = Math.pow(_frecuency_power, oct_idx);

            /**
             * Octave Amplitude
             */
            amplitude = _length / Math.pow(_amplitude_power, oct_idx);

            if(frecuency > _length){
                break;
            }

            /**
             * Apply Octave
             */
            PerlinNoise.Octave(frecuency, amplitude, wave, _length);
        }
        
        if(_normalized) {
            /**
            * Normalize values
            */
            for(let index = 0; index < _length; ++index) {
                wave[index] /= _length;
            }
        }

        return wave;
    }

    public static Noise2D
    (
        _length : number,
        _frecuency_power : number = 2,
        _amplitude_power : number = 2,
        _n_octaves : number = 6,
        _normalized : boolean = false
    )
    : Float32Array[] {

        let grid : Float32Array[] 
            = new Array<Float32Array>(_length);

        for(let index : number = 0; index < _length; ++index) {
            grid[index] = new Float32Array(_length);
        }

        let frecuency : number = 0;
        let amplitude : number = 0;
        let high_value : number = 0;

        for(let oct_idx : number = 1; oct_idx <= _n_octaves; ++oct_idx) {
            
            /**
             * Octave Frecuency
             */
            //frecuency = Math.pow(_frecuency_power, oct_idx);
            frecuency = _frecuency_power * oct_idx;
            /**
             * Octave Amplitude
             */
            //amplitude = _length / Math.pow(_amplitude_power, oct_idx);
            amplitude = _amplitude_power / oct_idx;
            high_value += amplitude;

            if(frecuency > _length) {
                break;
            }

            /**
             * Applay Octave
             */
            PerlinNoise.Octave2D
            (
                frecuency, 
                amplitude, 
                grid, 
                _length
            );
        }
        
        /**
        * Normalize values
        */
        if(_normalized) {            
            for(let row = 0; row < _length; ++row) {
                for(let col = 0; col < _length; ++col) {
                    grid[row][col] /= high_value;
                }                
            }
        }

        return grid;
    }
    
    /**
     * 
     * @param _frecuency 
     * @param _amplitude 
     * @param _length 
     */
    public static Octave
    (
        _frecuency : number,
        _amplitude : number,
        _wave : Float32Array,
        _length : number
    ) : void
    {   
        /**
         * Calculate the steps.
         */
        let step : number = Math.floor(_length / _frecuency);

        /**
         * 
         */
        let y1 : number = undefined;
        let y2 : number = undefined;

        let x1 : number = undefined;
        let x2 : number = undefined;

        for(let index = 0; index <= _length; index += step)
        {
            /**
             * Generate a value randomly between [0 - amplitud].
             */
            y2 = _amplitude - (Math.random() * _amplitude);
            
            /**
             * adds this value to the wave
             */
            _wave[index] += y2;

            /**
             * Interpolate the inbetweens values form this node to the last node.
             * Te substraction of the current index with the backstep determinate
             * the first begining of the segment.
             */
            if(y1 != undefined) {
                
                x1 = index - (step - 1);
                x2 = index;

                for(let node : number = index - (step - 1); node < index; ++node)
                {
                    /**
                     * Get the linear interpolation at "node" position.
                     */
                    _wave[node] += Interpolation.Linear
                    (
                        x1, 
                        y1, 
                        x2, 
                        y2, 
                        node
                    );
                }
            }

            /**
             * X1 es igual a x2
             */
            y1 = y2;
        }
        return;
    }
    
    public static Octave2D
    (
        _frecuency : number,
        _amplitude : number,
        _wave : Float32Array[],
        _length : number
    ) : void
    {   
        let grid : Float32Array[] = new Array<Float32Array>(_frecuency);
        for(let index : number = 0; index <= _frecuency; ++index) {
            grid[index] = new Float32Array(_frecuency + 1);
        }

        let x1 : number;
        let y1 : number;
        let x2 : number;
        let y2 : number;

        let local_x1 : number;
        let local_y1 : number;
        let local_x2 : number;
        let local_y2 : number;

        let temp : number;
        // Interator over the grid.
        for(let row : number = 0; row <= _frecuency; ++row) {
            for(let col : number = 0; col <= _frecuency; ++col) {
                grid[row][col] = _amplitude - (Math.random() * _amplitude);                

                // Check if node is not in first row or first column.
                if(row > 0 && col > 0) {

                    x2 = col;
                    y2 = row;
                    x1 = x2 -1;
                    y1 = y2 -1;

                    local_x1 = (Math.floor((x1 / _frecuency) * _length));
                    local_x2 = (Math.floor((x2 / _frecuency) * _length));
                    local_y1 = (Math.floor((y1 / _frecuency) * _length));
                    local_y2 = (Math.floor((y2 / _frecuency) * _length));

                    for(let y: number = local_y1; y < local_y2; ++y) {
                        for(let x: number = local_x1; x < local_x2; ++x) {
                            temp = 
                            Interpolation.Bilinear
                            (
                                local_x1,
                                local_y1,
                                local_x2,
                                local_y2,
                                grid[y1][x1],
                                grid[y1][x2],
                                grid[y2][x1],
                                grid[y2][x2],
                                x,
                                y
                            );
                            _wave[y][x] += temp;
                        }
                    }
                }
            }
        }
        return;
    }
}