/// <reference path="../../../libs/tsDefinitions/phaser.d.ts">

import { Manager } from "./manager";
import { MxListener } from "../listeners/mxListener";

export class MasterManager 
{
    /****************************************************/
    /* Private                                          */
    /****************************************************/
    
    /**
     * Master Manager singleton.
     */
    private static m_singleton : MasterManager;

    /****************************************************/
    /* Public                                           */
    /****************************************************/
        
    /**
     * Update's delta time value.
     */
    public m_dt : number = 0;

    /****************************************************/
    /* Private                                          */
    /****************************************************/

     /**
     * Map of array of Listeners by "name".
     */
    private m_listeners_map : Map<string, Array<MxListener>>;
    
    /**
     * Map of managers by ID.
     */
    private m_manager_map : Map<number, Manager>;

      /**
     * Reference to the Phaser Game.
     */
    private m_phaser_game : Phaser.Game;

    /****************************************************/
    /* Public                                           */
    /****************************************************/    
    
    /**
     * 
     * @param _phaser_game 
     */
    public static Prepare(_phaser_game : Phaser.Game)
    : void {
        if(this.m_singleton == null) {
            this.m_singleton = new MasterManager();
            this.m_singleton.m_phaser_game = _phaser_game;
            this.m_singleton.onPrepare();
        }
        return;
    }

    /**
     * 
     */
    public static ShutDown()
    : void {
        if(this.m_singleton != null) {
            this.m_singleton.onShutDown();
            this.m_singleton = null;
        }
        return;
    }

    /**
     * 
     */
    public static GetInstance()
    : MasterManager {
        return this.m_singleton;
    }

    /**
     * Get the Phaser Game.
     */
    public getGame()
    : Phaser.Game {
        return this.m_phaser_game;
    }

    /**
     * @brief updates each game manager.
     * 
     * @param _dt delta time value. 
     */
    public update(_dt : number)
    : void {
        this.m_dt = _dt;
        this.m_manager_map.forEach
        (
            function(_mng : Manager) {
                _mng.update();
                return;
            }
        ),
        this
    }

    /**
     * @brief Adds a new Manager to the master manager.
     * 
     * @param _mng Manager. 
     */
    public addManager( _mng : Manager)
    : void {
        _mng.setMasterManager(this);        
        this.m_manager_map.set(_mng.getID(), _mng);
        return;
    }

    /**
     * 
     * @param _id 
     */
    public destroyManager(_id : number)
    : void {
        if(this.m_manager_map.has(_id)){
            let mng : Manager = this.m_manager_map.get(_id);            
            mng.destroy();

            this.m_manager_map.delete(_id);
        }
        return;
    }

    /**
     * @brief Gets a manager from the MasterManager.
     * 
     * @param _id Manager's ID.
     */
    public getManager<T>(_id : number)
    : T {
        
        if(this.m_manager_map.has(_id)) {
            return (this.m_manager_map.get(_id) as unknown) as T;
        }
        else {
            return null;
        }        
    }

    /****************************************************/
    /* Private                                          */
    /****************************************************/
    
    private onPrepare()
    : void {
        ///////////////////////////////////
        // Listeners

        this.m_listeners_map = new Map<string,Array<MxListener>>();        
        this.m_listeners_map.set('pause', new Array<MxListener>());

        ///////////////////////////////////
        // Managers
        this.m_manager_map = new Map<number, Manager>();
       
        return;
    }

    private onShutDown()
    : void {        
        this.m_manager_map.forEach
        (
            function(_mng : Manager)
            {
                _mng.destroy();
            },
            this
        );

        this.m_manager_map.clear();
        this.m_manager_map = null;       

        this.m_listeners_map.clear();
        this.m_listeners_map = null;
        return;
    }
}