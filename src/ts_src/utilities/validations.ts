export function MinimumValue(_value : number, _min : number)
: number 
{
    if(_value < _min){
        return _min;
    }
    return _value
}

export function MaximumValue(_value : number, _max : number)
: number
{
    if(_value > _max){
        return _max;
    }
    return _value;
}

export function NumberRange(_value: number, _min : number, _max : number)
: number 
{
    if(_value < _min) {
        _value = _min;
    } else if(_value > _max) {
        _value = _max;
    }
    return _value;
}