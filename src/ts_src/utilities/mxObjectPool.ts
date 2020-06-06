import { AssertFunction, AssertNumber } from "./asserts";

export enum OBJECT_POOL_TYPE
{
    kStatic,
    kDynamic
}

export interface IObjectPool
{
    m_mx_active : boolean;
    
    update() : void;
    mxActive() : void;
    mxDesactive() : void;
    destroy():void;
}

export class ObjectPool<T extends IObjectPool>
{
    /****************************************************/
    /* Private                                          */
    /****************************************************/

    /**
     * ID that identify the type of ObjectPool.
     */
    private m_type : OBJECT_POOL_TYPE;

    /**
     * Number of elements that this container has.
     */
    private m_size : number;

    /**
     * Maximum of elements thah this container can store.
     */
    private m_max_size : number;

    /**
     * List of active elements.
     */
    private m_a_active : Array<T>;

    /**
     * List of desactive elements.
     */
    private m_a_desactive : Array<T>;

    /**
     * Fuction used to create a new element. It need to return an
     * element.
     */
    private m_create_fn : (_obj_pool : ObjectPool<T>)=>T;

    /**
     * Function called when an element is active by the object pool.
     */
    private m_on_active : (_element: T)=>void;

    /**
     * On Active functions context.
     */
    private m_on_active_context : any;

    /**
     * Function called when an element is desactive by the object pool.
     */
    private m_on_desactive : (_element : T)=>void;

    /**
     * On Desactive context.
     */
    private m_on_desactive_context : any;

    /**
     * Function context.
     */
    private m_fn_create_context : any;

    /**
     * Private constructor. Object Pool must be created with its Create static
     * methods.
     */
    private constructor()
    { return; }

    /****************************************************/
    /* Public                                           */
    /****************************************************/
    
    /**
     * Creates an ObjectPool wich creates elements if it doesn't has
     * any active element available. The user can specify the maximum
     * of elements that this pool can store, the pool will not create
     * an element if the maximum number of elements is reached.
     * 
     * @param _max Maximum of elements that this container can store.
     * @param _create_fn Fuction used to create a new element, this should return an element.
     */
    public static CreateDynamic<U extends IObjectPool>
    (
        _max : number, 
        _create_fn : (_obj_pool : ObjectPool<U>)=>U, 
        _context? : any
    )
    : ObjectPool<U>
    {
        AssertFunction(_create_fn);
        AssertNumber(_max);

        let pool = new ObjectPool<U>();

        pool.m_a_active = new Array<U>();
        pool.m_a_desactive= new Array<U>();

        pool.m_type = OBJECT_POOL_TYPE.kDynamic;

        pool.m_max_size = _max;
        pool.m_size = 0;
        pool.m_create_fn = _create_fn;

        if(_context){
            pool.m_fn_create_context = _context;
        }        

        pool.m_on_active_context = undefined;
        pool.m_on_active = undefined;
        pool.m_on_desactive = undefined;
        pool.m_on_desactive_context = undefined;

        return pool;
    }
    
    /**
     * Creates an ObjectPool that already has the elements needed and will
     * recycle them. The user need to give an array of elements.
     * 
     * @param _a_elements Array of elements that belong to thes ObjectPool.
     */
    public static CreateStatic<U extends IObjectPool>
    (
        _a_elements : Array<U>,
        _init_fn : (_obj : U, _obj_pool : ObjectPool<U>)=>void, 
        _context? : any
    )
    : ObjectPool<U>
    {
        let pool = new ObjectPool<U>();

        pool.m_a_active = new Array<U>();
        pool.m_a_desactive = new Array<U>();

        pool.m_type = OBJECT_POOL_TYPE.kStatic;
        
        pool.m_max_size = _a_elements.length;
        pool.m_size = _a_elements.length;

        for(let index = 0; index < pool.m_size; ++index)
        {
            pool.desactive(_a_elements[index]);
            _init_fn(_a_elements[index], pool);
        }

        pool.m_create_fn = undefined;
        pool.m_fn_create_context = undefined;
        pool.m_on_active_context = undefined;
        pool.m_on_active = undefined;
        pool.m_on_desactive = undefined;
        pool.m_on_desactive_context = undefined;

        return pool;
    }

    public update()
    : void {
        for(let index : number = 0; index < this.m_a_active.length; ++index){
            this.m_a_active[index].update();
        }
        return;
    }
    
    public setOnActiveFn(_fn : (_element : T)=>void, _context?:any)
    : void
    {
        AssertFunction(_fn);

        this.m_on_active = _fn;
        if(_context != undefined) {
            this.m_on_active_context = _context;
        }
        return;
    }

    public setOnDesactiveFn(_fn : (_element : T)=>void, _context?:any)
    : void
    {
        AssertFunction(_fn);

        this.m_on_desactive = _fn;
        if(_context != undefined) {
            this.m_on_desactive_context = _context;
        }
        return;
    }

    public get()
    : T
    {
        let element : T = null;

        if(this.hasDesactive()) {
            element = this.m_a_desactive[0];
            this._active(element); 
            return element;
        }

        if(this.isFull()) {
            return element;
        }

        switch(this.m_type)
        {
            case OBJECT_POOL_TYPE.kDynamic:
                element = this._create_element();
                this._active(element);
                return element;
            default:
                return element;
        }
    }

    public desactive(_element : T)
    {
        let active_size : number = this.m_a_active.length;
        for(let index = 0; index < active_size; ++index)
        {
            if(this.m_a_active[index] == _element)
            {
                this.m_a_active.splice(index, 1);
                break;
            }
        }        

        this.m_a_desactive.push(_element);
        _element.m_mx_active = false;
        _element.mxDesactive();

        if(this.m_on_desactive != undefined)
        {
            this.m_on_desactive.call(this.m_on_desactive_context, _element);
        }
        return;        
    }

    public fill()
    : void {
        let element : T;
        while(!this.isFull()){
            element = this._create_element();
            this.desactive(element);
        }
        return;
    }

    public hasDesactive()
    : boolean {
        return this.m_a_desactive.length > 0;
    }

    public isFull()
    : boolean {
        return this.m_size >= this.m_max_size;
    }

    public getSize()
    : number {
        return this.m_size;
    }

    public getMaxSize()
    : number {
        return this.m_max_size;
    }

    public getType()
    : OBJECT_POOL_TYPE {
        return this.m_type;
    }

    /**
    * Safely destroys the object.
    */
    public destroy()
    : void {
        let obj : T;
        
        while(this.m_a_active.length)
        {
            obj = this.m_a_active.pop();
            obj.destroy();
        }
        this.m_a_active = null;

        while(this.m_a_desactive.length)
        {
            obj = this.m_a_desactive.pop();
            obj.destroy();
        }
        this.m_a_desactive = null;

        this.m_create_fn = null;
        this.m_fn_create_context = null;
        this.m_on_active = null;
        this.m_on_active_context = null;
        this.m_on_desactive = null;
        this.m_on_desactive_context = null;        
        return;
    }

    /****************************************************/
    /* Private                                          */
    /****************************************************/
    
    private _active(_element : T)
    : void {
        let desactive_size : number = this.m_a_desactive.length;
        for(let index = 0; index < desactive_size; ++index)
        {
            if(this.m_a_desactive[index] == _element)
            {
                this.m_a_desactive.splice(index, 1);
                break;
            }
        }

        this.m_a_active.push(_element);
        _element.m_mx_active = true;
        _element.mxActive();
        
        if(this.m_on_active != undefined)
        {
            this.m_on_active.call(this.m_on_active_context, _element);
        }
        return;        
    }

    private _create_element()
    : T {
        AssertFunction(this.m_create_fn);

        let element : T
            = this.m_create_fn.call(this.m_fn_create_context, this);
        
        this.m_size++;
        return element;
    }
}