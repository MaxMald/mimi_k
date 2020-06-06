export function AssertString(_input : any)
: void
{
    if(typeof _input === 'string') return;
    else throw new Error('Input must be a string.');
}

export function AssertFunction(_input : any)
: void
{
    if(typeof _input === 'function') return;
    else throw new Error('Input must be a function.');
}

export function AssertNumber(_input : any)
: void
{
    if(typeof _input === 'number') return;
    else throw new Error('Input must be a number.');
}

export function AssertObject(_input : any)
: void
{
    if(typeof _input === 'object') return;
    else throw new Error('Input must be an object.');
}

export function AssertBoolean(_input : any)
: void
{
    if(typeof _input === 'boolean') return;
    else throw new Error('Input must be a boolean.');
}

export function AssertPositiveNoNZeroNumber(_number : number)
: void
{
    if(_number <= 0) {
        throw new Error('Number cant has a negative or zero value');
    }
    return;
}