import { Manager } from "../../../utilities/managers/manager";
import { MANAGER_ID } from "../../gameCommons";
import { AssertNumber } from "../../../utilities/asserts";
import { MxListener } from "../../../utilities/listeners/mxListener";

export class ChronoManager extends Manager
{
    /****************************************************/
    /* Private                                          */
    /****************************************************/
    
    /**
     * Map of listeners.
     */
    private m_listener_map : Map<string, Array<MxListener>>;

    /**
     * The moment when the manager trigger an event.
     */
    private m_chrono_mark : number;

    /**
     * Flag if the chrono already reach the mark in a previous update.
     */
    private m_reach_mark : boolean;

    /**
     * Chronometer value.
     */
    private m_chrono : number;

    /**
     * Current value of the chronometer value.
     */
    private m_chrono_current : number;

    /**
     * Is the chronometer running? True if it is.
     */
    private m_isRunning : boolean;
    
    /****************************************************/
    /* Public                                           */
    /****************************************************/
    
    public constructor() {
        super(MANAGER_ID.kChronoManager);

        this.m_listener_map = new Map<string, Array<MxListener>>();

        this.m_listener_map.set('on_mark', new Array<MxListener>());
        this.m_listener_map.set('on_finish', new Array<MxListener>());

        // Init values
        this.m_isRunning = false;
        this.reset(5, 1);
        return;
    }

    /**
     * Update method.
     */
    public update()
    : void {
        if(this.m_isRunning) {
            this.m_chrono_current -= this.m_master_mng.m_dt;
            
            // check if the chrono reach the mark
            if(!this.m_reach_mark){
                if(this.m_chrono_current <= this.m_chrono_mark) {
                    
                    // call listeners
                    let a_listeners = this.m_listener_map.get('on_mark');
                    a_listeners.forEach(
                        function(_listener : MxListener) {
                            _listener.call();
                        }
                    );
                    this.m_reach_mark = !this.m_reach_mark;
                }
            }
            
            // check if chrono reach zero.
            if(this.m_chrono_current <= 0) {
                this.m_chrono_current = 0;
                this.pause();

                // call listeners
                let a_listeners = this.m_listener_map.get('on_finish');
                a_listeners.forEach(
                    function(_listener : MxListener) {
                        _listener.call();
                    }
                );
            }
        }
        return;
    }

    public reset(_chrono_value : number, _chrono_mark : number)
    : void {
        AssertNumber(_chrono_value);

        this.m_chrono = _chrono_value;
        this.m_chrono_current = this.m_chrono;
        
        AssertNumber(_chrono_mark);
        this.m_chrono_mark = _chrono_mark;
        this.m_reach_mark = false;

        this.pause();
        return;
    }

    public start()
    : void {
        if(!this.m_isRunning){
            this.m_isRunning = !this.m_isRunning;
        }
        return;
    }

    public  pause()
    : void {
        if(this.m_isRunning){
            this.m_isRunning = !this.m_isRunning;
        }
        return;
    }

    public getCurrentTime()
    : number {
        return this.m_chrono_current;
    }

    public  getCurrentTimeNorm()
    : number {
        return this.m_chrono_current / this.m_chrono;
    }

    public isRunning()
    : boolean {
        return this.m_isRunning;
    }

    /**
     * 
     * I) 'on_mark' : trigger when chrono reach the mark for the first time.
     * II) 'on_finish' : trigger when time reach zero.
     * 
     * @param _listener 
     * @param _fn 
     * @param _context 
     */
    public addListener(_listener: string, _fn : ()=>void, _context?: any)
    : void {
        if(this.m_listener_map.has(_listener)) {
            let a_listeners = this.m_listener_map.get(_listener);
            a_listeners.push(new MxListener(_fn, _context));
        }
        return;
    }

    public clearListeners()
    : void {
        this.m_listener_map.forEach
        (
            function(_a_listener : MxListener[]) {
                let listener : MxListener;
                while(_a_listener.length){
                    listener = _a_listener.pop();
                    listener.destroy();
                }
            }
        );
    }

    /**
     * Safely destroys this Manager.
     */
    public destroy()
    : void {
        super.destroy();
        
        this.clearListeners();
        this.m_listener_map.clear();
        this.m_listener_map = null;
        return;
    }
}