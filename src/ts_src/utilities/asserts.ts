export function AssertString(_input : any)
: void
{
    if(typeof _input === 'string') return;
    else throw new  Error('Input must be a string.');
}

export function AssertFunction(_input : any)
: void
{
    if(typeof _input === 'function') return;
    else throw new  Error('Input must be a function.');
}

export function AssertNumber(_input : any)
: void
{
    if(typeof _input === 'number') return;
    else throw new  Error('Input must be a number.');
}