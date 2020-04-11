import { AssertString } from "../asserts";
import { MxListenerManager } from "../listeners/mxListenerManager";
import { MxListener } from "../listeners/mxListener";

export class FileItem
{
  public m_key : string;
  
  public m_path : string;

  constructor(_key : string, _path : string){
    this.m_key = _key;
    this.m_path = _path;
    return;
  }
}

export class FileLoader
{
    /****************************************************/
    /* Private                                          */
    /****************************************************/
    
    /**
     * 
     */
    private static m_singleton : FileLoader;

    /**
     * 
     */
    private m_isLoading : boolean;

    /**
     * 
     */
    private m_data : Map<string, string>;

    /**
     * 
     */
    private m_connection : XMLHttpRequest;

    /**
     * current file loading.
     */
    private m_current_file : FileItem;

    /**
     * 
     */
    private m_events : MxListenerManager;

    /**
     * 
     */
    private m_a_files : Array<FileItem>;

    /****************************************************/
    /* Static                                           */
    /****************************************************/
    
    /** */
    public static Prepare()
    : void {
        if(this.m_singleton == null) {
            this.m_singleton = new FileLoader();            
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
    : FileLoader {
        return this.m_singleton;
    }

    static LoadFile(_key : string, _filePath : string)
    : void 
    {
      if(this.m_singleton == null) {
        console.error("FileLoader is not initialized.");
        return;
      }

      this.m_singleton.loadFile(_key, _filePath);
      return;
    }

    static Load()
    : void {
      if(this.m_singleton == null) {
        console.error("FileLoader is not initialized.");
        return;
      }

      this.m_singleton.load();
      return;
    }

    static IsLoading()
    : boolean {
      if(this.m_singleton == null) {
        console.error("FileLoader is not initialized.");
        return;
      }     
      return this.m_singleton.m_isLoading;
    }

    /****************************************************/
    /* Public                                           */
    /****************************************************/
    
    public clearData()
    : void {
      this.m_data.clear();
      return;
    }

    public loadFile
    (
      _key : string, 
      _filePath : string
    )
    : void {
      AssertString(_key);
      AssertString(_filePath);

      if(this.m_isLoading) {
        // TODO
        return;
      }

      this.m_a_files.push(new FileItem(_key, _filePath));      
      return;
    }

    public load()
    : void {
      if(!this.m_isLoading) {

        // Flag
        this.m_isLoading = !this.m_isLoading;

        // Trigger Event
        this.m_events.call('onLoadStart');

        // Start loading process.
        this._load_next_file();
      }
      return;
    }

    public getFile(_key : string)
    : string {
      if(this.m_data.has(_key)){
        return this.m_data.get(_key);
      }
      return "";
    }

    public isLoading()
    : boolean {
      return this.m_isLoading;
    }

    public getConnection()
    : XMLHttpRequest {
      return this.m_connection;
    }

    /**
     * I) 'onLoadEnd' : trigger when all files in queue are loaded.
     * II) 'onLoadStart' : start the loading process.
     * 
     * @param _event 
     * @param _fn 
     * @param _context 
     */
    public addListener
    (
      _event : string, 
      _fn : ()=>void, 
      _context : any
    ) : void {
      this.m_events.addListener
      (
        _event, 
        new MxListener(_fn, _context)
      );
      return;
    }

    /****************************************************/
    /* Private                                          */
    /****************************************************/
    
    private constructor()
    {}   

    private onPrepare()
    : void {
      this.m_isLoading = false;
      
      this.m_data = new Map<string, string>();
      
      // Events
      this.m_events = new MxListenerManager();
      this.m_events.addEvent('onLoadEnd');
      this.m_events.addEvent('onLoadStart');

      // Array of items
      this.m_a_files = new Array<FileItem>();

      // XMLHTTP Connection
      this.m_connection = new XMLHttpRequest();
      this.m_connection.onload = this._onload;
      return;
    }

    private onShutDown()
    : void {
      this.clearData();
      this.m_data = null;

      // Events
      this.m_events.destroy();
      this.m_events = null;

      // Items
      while(this.m_a_files.length) {
        this.m_a_files.pop();
      }      

      // XMLHTTP Connection
      this.m_connection.abort();
      this.m_connection = null;
      return;
    }

    private _load_next_file()
    : void {
      if(this.m_a_files.length) {

        this.m_current_file 
          = this.m_a_files.pop();

        this.m_connection.open
        (
          "GET", 
          this.m_current_file.m_path, 
          true
        );
        this.m_connection.send(null);
      } 
      else {
        this.m_isLoading = false;
        this.m_events.call('onLoadEnd');
      }
      return;
    }

    private _onload()
    : void {
      let file_loader = FileLoader.GetInstance();
      let connection = file_loader.getConnection();
      
      if (connection.readyState === 4) {
        if (connection.status === 200) {
          file_loader.m_data.set
          (
            file_loader.m_current_file.m_key, 
            connection.responseText
          );
          file_loader.m_current_file = null;
          file_loader._load_next_file();
        } else {
          console.error(connection.statusText);
        }
      }
      return;
    }
}