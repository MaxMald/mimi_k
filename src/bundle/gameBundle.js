var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("utilities/managers/manager", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Manager = /** @class */ (function () {
        /**
         * Creates a manager and assigns it an identifier number.
         *
         * @param _id {number} Manager's identifier number.
         */
        function Manager(_id) {
            this.m_id = _id;
            return;
        }
        /**
         * Sets the MasterManager of this Manager.
         *
         * @param _master {MasterManager} MasterManager.
         */
        Manager.prototype.setMasterManager = function (_master) {
            this.m_master_mng = _master;
            return;
        };
        /**
         * Update method.
         */
        Manager.prototype.update = function () {
            return;
        };
        /**
         * Safely destroys this Manager.
         */
        Manager.prototype.destroy = function () {
            this.m_master_mng = null;
            return;
        };
        /**
         * Gets this Manager identifier number.
         */
        Manager.prototype.getID = function () {
            return this.m_id;
        };
        return Manager;
    }());
    exports.Manager = Manager;
});
define("utilities/asserts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function AssertString(_input) {
        if (typeof _input === 'string')
            return;
        else
            throw new Error('Input must be a string.');
    }
    exports.AssertString = AssertString;
    function AssertFunction(_input) {
        if (typeof _input === 'function')
            return;
        else
            throw new Error('Input must be a function.');
    }
    exports.AssertFunction = AssertFunction;
    function AssertNumber(_input) {
        if (typeof _input === 'number')
            return;
        else
            throw new Error('Input must be a number.');
    }
    exports.AssertNumber = AssertNumber;
});
define("utilities/listeners/mxListener", ["require", "exports", "utilities/asserts"], function (require, exports, asserts_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxListener = /** @class */ (function () {
        function MxListener(_listener, _context) {
            asserts_1.AssertFunction(_listener);
            this.m_listener = _listener;
            if (_context) {
                this.m_context = _context;
            }
            return;
        }
        MxListener.prototype.call = function () {
            if (this.m_context) {
                this.m_listener.call(this.m_context);
            }
            else {
                this.m_listener();
            }
            return;
        };
        MxListener.prototype.destroy = function () {
            this.m_listener = null;
            this.m_context = null;
            return;
        };
        return MxListener;
    }());
    exports.MxListener = MxListener;
});
/// <reference path="../../../libs/tsDefinitions/phaser.d.ts">
define("utilities/managers/masterManager", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MasterManager = /** @class */ (function () {
        function MasterManager() {
            /****************************************************/
            /* Private                                          */
            /****************************************************/
            /****************************************************/
            /* Public                                           */
            /****************************************************/
            /**
             * Update's delta time value.
             */
            this.m_dt = 0;
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         *
         * @param _phaser_game
         */
        MasterManager.Prepare = function (_phaser_game) {
            if (this.m_singleton == null) {
                this.m_singleton = new MasterManager();
                this.m_singleton.m_phaser_game = _phaser_game;
                this.m_singleton.onPrepare();
            }
            return;
        };
        /**
         *
         */
        MasterManager.ShutDown = function () {
            if (this.m_singleton != null) {
                this.m_singleton.onShutDown();
                this.m_singleton = null;
            }
            return;
        };
        /**
         *
         */
        MasterManager.GetInstance = function () {
            return this.m_singleton;
        };
        /**
         * Get the Phaser Game.
         */
        MasterManager.prototype.getGame = function () {
            return this.m_phaser_game;
        };
        /**
         * @brief updates each game manager.
         *
         * @param _dt delta time value.
         */
        MasterManager.prototype.update = function (_dt) {
            this.m_dt = _dt;
            this.m_manager_map.forEach(function (_mng) {
                _mng.update();
                return;
            }),
                this;
        };
        /**
         * @brief Adds a new Manager to the master manager.
         *
         * @param _mng Manager.
         */
        MasterManager.prototype.addManager = function (_mng) {
            _mng.setMasterManager(this);
            this.m_manager_map.set(_mng.getID(), _mng);
            return;
        };
        /**
         *
         * @param _id
         */
        MasterManager.prototype.destroyManager = function (_id) {
            if (this.m_manager_map.has(_id)) {
                var mng = this.m_manager_map.get(_id);
                mng.destroy();
                this.m_manager_map.delete(_id);
            }
            return;
        };
        /**
         * @brief Gets a manager from the MasterManager.
         *
         * @param _id Manager's ID.
         */
        MasterManager.prototype.getManager = function (_id) {
            if (this.m_manager_map.has(_id)) {
                return this.m_manager_map.get(_id);
            }
            else {
                return null;
            }
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        MasterManager.prototype.onPrepare = function () {
            ///////////////////////////////////
            // Listeners
            this.m_listeners_map = new Map();
            this.m_listeners_map.set('pause', new Array());
            ///////////////////////////////////
            // Managers
            this.m_manager_map = new Map();
            return;
        };
        MasterManager.prototype.onShutDown = function () {
            this.m_manager_map.forEach(function (_mng) {
                _mng.destroy();
            }, this);
            this.m_manager_map.clear();
            this.m_manager_map = null;
            this.m_listeners_map.clear();
            this.m_listeners_map = null;
            return;
        };
        return MasterManager;
    }());
    exports.MasterManager = MasterManager;
});
define("utilities/listeners/mxListenerManager", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxListenerManager = /** @class */ (function () {
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function MxListenerManager() {
            this.m_listener_map = new Map();
            return;
        }
        MxListenerManager.prototype.call = function (_event) {
            if (this.m_listener_map.has(_event)) {
                var event_1 = this.m_listener_map.get(_event);
                var size = event_1.length;
                for (var index = 0; index < size; ++index) {
                    event_1[index].call();
                }
            }
            return;
        };
        MxListenerManager.prototype.addEvent = function (_event) {
            if (!this.m_listener_map.has(_event)) {
                this.m_listener_map.set(_event, new Array());
            }
            return;
        };
        MxListenerManager.prototype.addListener = function (_event, _listener) {
            if (this.m_listener_map.has(_event)) {
                var event_2 = this.m_listener_map.get(_event);
                event_2.push(_listener);
            }
            return;
        };
        MxListenerManager.prototype.clearEvent = function (_event) {
            if (this.m_listener_map.has(_event)) {
                var event_3 = this.m_listener_map.get(_event);
                while (event_3.length) {
                    var listener = event_3.pop();
                    listener.destroy();
                }
            }
            return;
        };
        /**
        * Safely destroys the object.
        */
        MxListenerManager.prototype.destroy = function () {
            this.m_listener_map.forEach(function (_a_listeners, _key) {
                this.clearEvent(_key);
                return;
            }, this);
            this.m_listener_map.clear();
            return;
        };
        return MxListenerManager;
    }());
    exports.MxListenerManager = MxListenerManager;
});
define("utilities/fs/fs", ["require", "exports", "utilities/asserts", "utilities/listeners/mxListenerManager", "utilities/listeners/mxListener"], function (require, exports, asserts_2, mxListenerManager_1, mxListener_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FileItem = /** @class */ (function () {
        function FileItem(_key, _path) {
            this.m_key = _key;
            this.m_path = _path;
            return;
        }
        return FileItem;
    }());
    exports.FileItem = FileItem;
    var FileLoader = /** @class */ (function () {
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        function FileLoader() {
        }
        /****************************************************/
        /* Static                                           */
        /****************************************************/
        /** */
        FileLoader.Prepare = function () {
            if (this.m_singleton == null) {
                this.m_singleton = new FileLoader();
                this.m_singleton.onPrepare();
            }
            return;
        };
        /**
         *
         */
        FileLoader.ShutDown = function () {
            if (this.m_singleton != null) {
                this.m_singleton.onShutDown();
                this.m_singleton = null;
            }
            return;
        };
        /**
         *
         */
        FileLoader.GetInstance = function () {
            return this.m_singleton;
        };
        FileLoader.LoadFile = function (_key, _filePath) {
            if (this.m_singleton == null) {
                console.error("FileLoader is not initialized.");
                return;
            }
            this.m_singleton.loadFile(_key, _filePath);
            return;
        };
        FileLoader.Load = function () {
            if (this.m_singleton == null) {
                console.error("FileLoader is not initialized.");
                return;
            }
            this.m_singleton.load();
            return;
        };
        FileLoader.IsLoading = function () {
            if (this.m_singleton == null) {
                console.error("FileLoader is not initialized.");
                return;
            }
            return this.m_singleton.m_isLoading;
        };
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        FileLoader.prototype.clearData = function () {
            this.m_data.clear();
            return;
        };
        FileLoader.prototype.loadFile = function (_key, _filePath) {
            asserts_2.AssertString(_key);
            asserts_2.AssertString(_filePath);
            if (this.m_isLoading) {
                // TODO
                return;
            }
            this.m_a_files.push(new FileItem(_key, _filePath));
            return;
        };
        FileLoader.prototype.load = function () {
            if (!this.m_isLoading) {
                // Flag
                this.m_isLoading = !this.m_isLoading;
                // Trigger Event
                this.m_events.call('onLoadStart');
                // Start loading process.
                this._load_next_file();
            }
            return;
        };
        FileLoader.prototype.getFile = function (_key) {
            if (this.m_data.has(_key)) {
                return this.m_data.get(_key);
            }
            return "";
        };
        FileLoader.prototype.isLoading = function () {
            return this.m_isLoading;
        };
        FileLoader.prototype.getConnection = function () {
            return this.m_connection;
        };
        /**
         * I) 'onLoadEnd' : trigger when all files in queue are loaded.
         * II) 'onLoadStart' : start the loading process.
         *
         * @param _event
         * @param _fn
         * @param _context
         */
        FileLoader.prototype.addListener = function (_event, _fn, _context) {
            this.m_events.addListener(_event, new mxListener_1.MxListener(_fn, _context));
            return;
        };
        FileLoader.prototype.onPrepare = function () {
            this.m_isLoading = false;
            this.m_data = new Map();
            // Events
            this.m_events = new mxListenerManager_1.MxListenerManager();
            this.m_events.addEvent('onLoadEnd');
            this.m_events.addEvent('onLoadStart');
            // Array of items
            this.m_a_files = new Array();
            // XMLHTTP Connection
            this.m_connection = new XMLHttpRequest();
            this.m_connection.onload = this._onload;
            return;
        };
        FileLoader.prototype.onShutDown = function () {
            this.clearData();
            this.m_data = null;
            // Events
            this.m_events.destroy();
            this.m_events = null;
            // Items
            while (this.m_a_files.length) {
                this.m_a_files.pop();
            }
            // XMLHTTP Connection
            this.m_connection.abort();
            this.m_connection = null;
            return;
        };
        FileLoader.prototype._load_next_file = function () {
            if (this.m_a_files.length) {
                this.m_current_file
                    = this.m_a_files.pop();
                this.m_connection.open("GET", this.m_current_file.m_path, true);
                this.m_connection.send(null);
            }
            else {
                this.m_isLoading = false;
                this.m_events.call('onLoadEnd');
            }
            return;
        };
        FileLoader.prototype._onload = function () {
            var file_loader = FileLoader.GetInstance();
            var connection = file_loader.getConnection();
            if (connection.readyState === 4) {
                if (connection.status === 200) {
                    file_loader.m_data.set(file_loader.m_current_file.m_key, connection.responseText);
                    file_loader.m_current_file = null;
                    file_loader._load_next_file();
                }
                else {
                    console.error(connection.statusText);
                }
            }
            return;
        };
        return FileLoader;
    }());
    exports.FileLoader = FileLoader;
});
define("utilities/fs/csv_row", ["require", "exports"], function (require, exports) {
    "use strict";
    var CSVRow = /** @class */ (function () {
        function CSVRow() {
            this.cells = new Array(0);
            return;
        }
        return CSVRow;
    }());
    return CSVRow;
});
define("utilities/fs/csv_file", ["require", "exports", "utilities/fs/csv_row"], function (require, exports, CSVRow) {
    "use strict";
    var CSVFile = /** @class */ (function () {
        function CSVFile() {
            this.headers = new CSVRow;
            this.rows = new Array(0);
            return;
        }
        CSVFile.prototype.getHeaderIdx = function (_header) {
            var idx = 0;
            var size = this.headers.cells.length;
            for (idx = 0; idx < size; idx++) {
                if (this.headers.cells[idx] === _header) {
                    return idx;
                }
            }
            return null;
        };
        CSVFile.prototype.print = function () {
            console.log("Headers: ");
            var size = this.headers.cells.length;
            for (var idx = 0; idx < size; ++idx) {
                console.log(idx + " : " + this.headers.cells[idx]);
            }
            console.log("Data: ");
            size = this.rows.length;
            for (var idx = 0; idx < size; ++idx) {
                var row_size = this.headers.cells.length;
                console.log(" ----- Row: " + idx + " -----");
                for (var r_idx = 0; r_idx < row_size; ++r_idx) {
                    console.log(r_idx + " : " + this.rows[idx].cells[r_idx]);
                }
            }
            return;
        };
        return CSVFile;
    }());
    return CSVFile;
});
define("utilities/fs/csv_reader", ["require", "exports", "utilities/fs/csv_row", "utilities/fs/csv_file"], function (require, exports, CSVRow, CSVFile) {
    "use strict";
    var CSVReader = /** @class */ (function () {
        function CSVReader() {
        }
        CSVReader.GetCSV = function (data, _tsv) {
            if (_tsv === void 0) { _tsv = false; }
            var split_char = (_tsv ? '\t' : ',');
            var rows_raw_data = data.split('\r\n');
            var csv_file = new CSVFile();
            var r_raw_idx = rows_raw_data.length;
            for (var idx = 0; idx < r_raw_idx; ++idx) {
                var row = new CSVRow();
                row.cells = rows_raw_data[idx].split(split_char);
                if (idx != 0) {
                    csv_file.rows.push(row);
                }
                else {
                    csv_file.headers = row;
                }
            }
            return csv_file;
        };
        return CSVReader;
    }());
    return CSVReader;
});
define("game/gameCommons", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LOCALIZATION;
    (function (LOCALIZATION) {
        LOCALIZATION[LOCALIZATION["kEnglish"] = 0] = "kEnglish";
        LOCALIZATION[LOCALIZATION["kSpanish"] = 1] = "kSpanish";
    })(LOCALIZATION = exports.LOCALIZATION || (exports.LOCALIZATION = {}));
    var CLOCK_STYLE;
    (function (CLOCK_STYLE) {
        CLOCK_STYLE[CLOCK_STYLE["kSand"] = 0] = "kSand";
        CLOCK_STYLE[CLOCK_STYLE["kDigital"] = 1] = "kDigital";
        CLOCK_STYLE[CLOCK_STYLE["kAnalog"] = 2] = "kAnalog";
        CLOCK_STYLE[CLOCK_STYLE["kCount"] = 3] = "kCount";
    })(CLOCK_STYLE = exports.CLOCK_STYLE || (exports.CLOCK_STYLE = {}));
    var MANAGER_ID;
    (function (MANAGER_ID) {
        MANAGER_ID[MANAGER_ID["kGameManager"] = 0] = "kGameManager";
        MANAGER_ID[MANAGER_ID["kDataManager"] = 1] = "kDataManager";
        MANAGER_ID[MANAGER_ID["kChronoManager"] = 2] = "kChronoManager";
    })(MANAGER_ID = exports.MANAGER_ID || (exports.MANAGER_ID = {}));
});
define("game/managers/dataManager/dataManager", ["require", "exports", "utilities/managers/manager", "game/gameCommons"], function (require, exports, manager_1, gameCommons_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DataManager = /** @class */ (function (_super) {
        __extends(DataManager, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function DataManager() {
            var _this = _super.call(this, gameCommons_1.MANAGER_ID.kDataManager) || this;
            _this._string_map = new Map();
            return _this;
        }
        DataManager.prototype.add = function (_key, _value) {
            this._string_map.set(_key, _value);
        };
        DataManager.prototype.getString = function (_key) {
            if (this._string_map.has(_key)) {
                return this._string_map.get(_key);
            }
            return "NOT_FOUND!";
        };
        DataManager.prototype.clear = function () {
            this._string_map.clear();
            return;
        };
        DataManager.prototype.destroy = function () {
            this._string_map.clear();
            this._string_map = null;
            return;
        };
        return DataManager;
    }(manager_1.Manager));
    exports.DataManager = DataManager;
});
define("game/managers/chronoManager/chronoManager", ["require", "exports", "utilities/managers/manager", "game/gameCommons", "utilities/asserts", "utilities/listeners/mxListener"], function (require, exports, manager_2, gameCommons_2, asserts_3, mxListener_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChronoManager = /** @class */ (function (_super) {
        __extends(ChronoManager, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function ChronoManager() {
            var _this = _super.call(this, gameCommons_2.MANAGER_ID.kChronoManager) || this;
            _this.m_listener_map = new Map();
            _this.m_listener_map.set('on_mark', new Array());
            _this.m_listener_map.set('on_finish', new Array());
            // Init values
            _this.m_isRunning = false;
            _this.reset(5, 1);
            return _this;
        }
        /**
         * Update method.
         */
        ChronoManager.prototype.update = function () {
            if (this.m_isRunning) {
                this.m_chrono_current -= this.m_master_mng.m_dt;
                // check if the chrono reach the mark
                if (!this.m_reach_mark) {
                    if (this.m_chrono_current <= this.m_chrono_mark) {
                        // call listeners
                        var a_listeners = this.m_listener_map.get('on_mark');
                        a_listeners.forEach(function (_listener) {
                            _listener.call();
                        });
                        this.m_reach_mark = !this.m_reach_mark;
                    }
                }
                // check if chrono reach zero.
                if (this.m_chrono_current <= 0) {
                    this.m_chrono_current = 0;
                    this.pause();
                    // call listeners
                    var a_listeners = this.m_listener_map.get('on_finish');
                    a_listeners.forEach(function (_listener) {
                        _listener.call();
                    });
                }
            }
            return;
        };
        ChronoManager.prototype.reset = function (_chrono_value, _chrono_mark) {
            asserts_3.AssertNumber(_chrono_value);
            this.m_chrono = _chrono_value;
            this.m_chrono_current = this.m_chrono;
            asserts_3.AssertNumber(_chrono_mark);
            this.m_chrono_mark = _chrono_mark;
            this.m_reach_mark = false;
            this.pause();
            return;
        };
        ChronoManager.prototype.start = function () {
            if (!this.m_isRunning) {
                this.m_isRunning = !this.m_isRunning;
            }
            return;
        };
        ChronoManager.prototype.pause = function () {
            if (this.m_isRunning) {
                this.m_isRunning = !this.m_isRunning;
            }
            return;
        };
        ChronoManager.prototype.getCurrentTime = function () {
            return this.m_chrono_current;
        };
        ChronoManager.prototype.getCurrentTimeNorm = function () {
            return this.m_chrono_current / this.m_chrono;
        };
        ChronoManager.prototype.isRunning = function () {
            return this.m_isRunning;
        };
        /**
         *
         * I) 'on_mark' : trigger when chrono reach the mark for the first time.
         * II) 'on_finish' : trigger when time reach zero.
         *
         * @param _listener
         * @param _fn
         * @param _context
         */
        ChronoManager.prototype.addListener = function (_listener, _fn, _context) {
            if (this.m_listener_map.has(_listener)) {
                var a_listeners = this.m_listener_map.get(_listener);
                a_listeners.push(new mxListener_2.MxListener(_fn, _context));
            }
            return;
        };
        ChronoManager.prototype.clearListeners = function () {
            this.m_listener_map.forEach(function (_a_listener) {
                var listener;
                while (_a_listener.length) {
                    listener = _a_listener.pop();
                    listener.destroy();
                }
            });
        };
        /**
         * Safely destroys this Manager.
         */
        ChronoManager.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.clearListeners();
            this.m_listener_map.clear();
            this.m_listener_map = null;
            return;
        };
        return ChronoManager;
    }(manager_2.Manager));
    exports.ChronoManager = ChronoManager;
});
define("game/managers/userPreferences/userPreferences", ["require", "exports", "game/gameCommons"], function (require, exports, gameCommons_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     *
     */
    var UserPreferences = /** @class */ (function () {
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function UserPreferences() {
            // sets default values
            this.m_localization = gameCommons_3.LOCALIZATION.kSpanish;
            this.chrono_value = 1;
            this.m_clock_style = gameCommons_3.CLOCK_STYLE.kSand;
            return;
        }
        UserPreferences.prototype.setLocalization = function (_localization) {
            this.m_localization = _localization;
            return;
        };
        UserPreferences.prototype.getLocalization = function () {
            return this.m_localization;
        };
        UserPreferences.prototype.setClockStyle = function (_style) {
            this.m_clock_style = _style;
            return;
        };
        UserPreferences.prototype.getClockStyle = function () {
            return this.m_clock_style;
        };
        UserPreferences.prototype.destroy = function () {
            return;
        };
        return UserPreferences;
    }());
    exports.UserPreferences = UserPreferences;
});
define("game/managers/gameManager/gameManager", ["require", "exports", "utilities/managers/manager", "game/gameCommons", "game/managers/dataManager/dataManager", "game/managers/chronoManager/chronoManager", "game/managers/userPreferences/userPreferences"], function (require, exports, manager_3, gameCommons_4, dataManager_1, chronoManager_1, userPreferences_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     *
     */
    var GameManager = /** @class */ (function (_super) {
        __extends(GameManager, _super);
        /**
         *
         */
        function GameManager() {
            var _this = _super.call(this, gameCommons_4.MANAGER_ID.kGameManager) || this;
            // create user preferences.
            _this.m_user_preferences = new userPreferences_1.UserPreferences();
            // create DataManager instance.
            _this.m_data_mng = new dataManager_1.DataManager();
            // Gameplay always starts at false.
            _this.m_inGameplay = false;
            return _this;
        }
        /**
         *
         */
        GameManager.prototype.update = function () {
            if (this.m_inGameplay) {
                this.m_chrono_mng.update();
            }
            return;
        };
        /**
         * Get a reference to the game's user Reference.
         */
        GameManager.prototype.getUserPreference = function () {
            return this.m_user_preferences;
        };
        /**
         * Gets a reference to the game's dataManager.
         */
        GameManager.prototype.getDataManager = function () {
            return this.m_data_mng;
        };
        /**
         * Get a reference of the ChronoManager.
         */
        GameManager.prototype.getChronoManager = function () {
            return this.m_chrono_mng;
        };
        /**
         * Initialize the Gameplay
         */
        GameManager.prototype.initGamePlay = function () {
            if (!this.m_inGameplay) {
                this.m_chrono_mng = new chronoManager_1.ChronoManager();
                this.m_chrono_mng.setMasterManager(this.m_master_mng);
                this.m_inGameplay = !this.m_inGameplay;
            }
            return;
        };
        /**
         * Reset the Gameplay
         */
        GameManager.prototype.resetGameplay = function () {
            if (this.m_inGameplay) {
                this.m_chrono_mng.reset(this.m_user_preferences.chrono_value, this.m_user_preferences.chrono_value * 0.1);
            }
            return;
        };
        /**
         * Shutdown Gameplay
         */
        GameManager.prototype.shutdownGameplay = function () {
            if (this.m_inGameplay) {
                this.m_chrono_mng.destroy();
                this.m_chrono_mng = null;
                this.m_inGameplay = !this.m_inGameplay;
            }
            return;
        };
        /**
         * Gets this game's localization identifer.
         */
        GameManager.prototype.getLocalization = function () {
            return this.m_user_preferences.getLocalization();
        };
        /**
         * Sets the game's localization identifier.
         *
         * @param _localization Localization identifier.
         */
        GameManager.prototype.setLocalization = function (_localization) {
            this.m_user_preferences.setLocalization(_localization);
            return;
        };
        /**
        * Safely destroys the object.
        */
        GameManager.prototype.destroy = function () {
            this.m_data_mng.destroy();
            this.m_data_mng = null;
            this.m_user_preferences.destroy();
            this.m_user_preferences = null;
            return;
        };
        return GameManager;
    }(manager_3.Manager));
    exports.GameManager = GameManager;
});
define("scenes/preloader", ["require", "exports", "utilities/managers/masterManager", "utilities/fs/csv_reader", "game/gameCommons", "utilities/fs/fs"], function (require, exports, masterManager_1, CSVReader, gameCommons_5, fs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Preloader = /** @class */ (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        Preloader.prototype.preload = function () {
            this.m_phaser_loader_ready = false;
            ///////////////////////////////////
            // CSV Data
            var game_mng = masterManager_1.MasterManager.GetInstance().getManager(gameCommons_5.MANAGER_ID.kGameManager);
            this.m_file_loader = fs_1.FileLoader.GetInstance();
            this.m_file_loader.loadFile('game_text', 'src/assets/csv_files/Mimi_k_data - game_texts.tsv');
            this.m_file_loader.addListener('onLoadEnd', this._on_file_load, this);
            ///////////////////////////////////
            // TiledMap
            //this.load.tilemapTiledJSON('level_01', 'src/assets/maps/level_01.json');
            ///////////////////////////////////
            // SpriteSheets
            /*
            this.load.spritesheet
            (
                'dragon',
                'src/assets/images/player/dragon.png',
                {
                    frameWidth: 128,
                    frameHeight: 128,
                }
            );
            */
            ///////////////////////////////////
            // Atlas
            this.load.atlas('main_menu', 'src/assets/images/atlas/main_menu.png', 'src/assets/images/atlas/main_menu.js');
            ///////////////////////////////////
            // Images
            /*
            this.load.image('main_menu_bckg', 'src/assets/images/main_menu/background.png');
            */
            /****************************************************/
            /* Metta Puzzle Loader                              */
            /****************************************************/
            // Background Color
            this.cameras.main.setBackgroundColor(0xff2a2a);
            // TileMap
            var puzzle_map = this.make.tilemap({
                key: "metta_puzzle_loader",
                insertNull: true
            });
            // Get TileSet for Ambience Object
            var img_collection = this._get_image_collection(puzzle_map, 'loader_images');
            var img_names = this._get_images_from_collection(img_collection);
            var first_gid = img_collection.firstgid;
            ///////////////////////////////////
            // Objects
            // Puzzle Labels
            var obj_layer = this._get_object_layer(puzzle_map, 'puzzle_labels');
            this._create_sprites_from(this, obj_layer, 'metta_puzzle_loader', img_names, first_gid);
            // Puzzle Base
            obj_layer = this._get_object_layer(puzzle_map, 'puzzle_base');
            this._create_sprites_from(this, obj_layer, 'metta_puzzle_loader', img_names, first_gid);
            // Puzzle Pieces
            this.m_a_puzzle_pieces = new Array();
            this.m_a_pieces_position = new Array();
            obj_layer = this._get_object_layer(puzzle_map, 'puzzle_pieces');
            this.m_a_puzzle_pieces = this._create_sprites_from(this, obj_layer, 'metta_puzzle_loader', img_names, first_gid);
            obj_layer = this._get_object_layer(puzzle_map, 'puzzle_pieces_start_point');
            var pieces_size = this.m_a_puzzle_pieces.length;
            var object;
            var piece;
            for (var index = 0; index < pieces_size; ++index) {
                object = obj_layer[index];
                piece = this.m_a_puzzle_pieces[index];
                this.m_a_pieces_position.push(new Phaser.Geom.Point(piece.x, piece.y));
                piece.setPosition(object.x, object.y);
            }
            // Index
            this.m_indexes = new Int8Array(pieces_size);
            for (var index = 0; index < pieces_size; ++index) {
                this.m_indexes[index] = index;
            }
            this.m_active_idx = 0;
            this._shuffle(this.m_indexes);
            // Callbacks
            this.load.on('complete', this.onLoadComplete, this);
            this.load.on('progress', this.onProgress, this);
            this.m_file_loader.load();
            return;
        };
        Preloader.prototype.onProgress = function (_value) {
            var target_idx = Math.floor(this.m_indexes.length * _value);
            while (this.m_active_idx < target_idx) {
                var piece = void 0;
                var position = void 0;
                piece = this.m_a_puzzle_pieces[this.m_indexes[this.m_active_idx]];
                position = this.m_a_pieces_position[this.m_indexes[this.m_active_idx]];
                piece.setPosition(position.x, position.y);
                ++this.m_active_idx;
            }
            return;
        };
        Preloader.prototype.onLoadComplete = function () {
            //this.m_phaser_loader_ready = true;
            return;
        };
        Preloader.prototype.update = function () {
            if (this.load.progress >= 1
                && !this.m_file_loader.isLoading()) {
                this.scene.start('mainMenu');
            }
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        Preloader.prototype._on_file_load = function () {
            var game_mng = masterManager_1.MasterManager.GetInstance().getManager(gameCommons_5.MANAGER_ID.kGameManager);
            var data_mng = game_mng.getDataManager();
            var csv_file = CSVReader.GetCSV(this.m_file_loader.getFile('game_text'), true);
            var num_rows = csv_file.rows.length;
            var row;
            // Sets the column that has the text.
            // 1 : Spanish
            // 2 : English
            var text_column_index = (game_mng.getLocalization() == gameCommons_5.LOCALIZATION.kSpanish ? 1 : 2);
            for (var index = 0; index < num_rows; ++index) {
                row = csv_file.rows[index];
                data_mng.add(row.cells[0], row.cells[text_column_index]);
            }
            return;
        };
        Preloader.prototype._get_object_layer = function (_map, _layer) {
            return _map.getObjectLayer(_layer)['objects'];
        };
        Preloader.prototype._get_image_collection = function (_map, _name) {
            var a_img_collections = _map.imageCollections;
            var size = a_img_collections.length;
            for (var index = 0; index < size; ++index) {
                if (a_img_collections[index].name == _name) {
                    return a_img_collections[index];
                }
            }
            console.error('Image Collection not foud.');
            return null;
        };
        Preloader.prototype._get_images_from_collection = function (_img_collection) {
            var images = new Array();
            var images_from_collection = _img_collection.images;
            var tile_data;
            var image_root;
            var image_name;
            for (var index = 0; index < images_from_collection.length; ++index) {
                tile_data = images_from_collection[index];
                image_root = tile_data.image;
                image_name = image_root.split('/').pop();
                images.push(image_name);
            }
            return images;
        };
        Preloader.prototype._create_sprites_from = function (_scene, _objects, _atlas, _images, _first_gid) {
            var a_sprites = new Array();
            var size = _objects.length;
            var object;
            var sprite;
            for (var index = 0; index < size; ++index) {
                object = _objects[index];
                sprite = _scene.add.sprite(object.x, object.y, _atlas, _images[object.gid - _first_gid]);
                sprite.setRotation(object.rotation * Phaser.Math.DEG_TO_RAD);
                sprite.setFlipX(object.flippedHorizontal);
                sprite.setFlipY(object.flippedVertical);
                sprite.setOrigin(0, 1);
                a_sprites.push(sprite);
            }
            return a_sprites;
        };
        Preloader.prototype._shuffle = function (a) {
            var j, x, i;
            for (i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = a[i];
                a[i] = a[j];
                a[j] = x;
            }
            return a;
        };
        return Preloader;
    }(Phaser.Scene));
    exports.Preloader = Preloader;
});
define("scenes/boot", ["require", "exports", "utilities/managers/masterManager", "game/managers/gameManager/gameManager", "utilities/fs/fs"], function (require, exports, masterManager_2, gameManager_1, fs_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Boot = /** @class */ (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Boot.prototype.preload = function () {
            /**
             * Loads preloader assets. This file must be light.
             */
            this.load.atlas('preloader', 'src/assets/images/atlas/preloader.png', 'src/assets/images/atlas/preloader.js');
            ///////////////////////////////////
            // Metta Puzzle Preloader
            // atlas
            this.load.atlas('metta_puzzle_loader', 'src/assets/images/atlas/metta_puzzle_loader.png', 'src/assets/images/atlas/metta_puzzle_loader.js');
            // tiled map
            this.load.tilemapTiledJSON('metta_puzzle_loader', 'src/assets/images/atlas/metta_puzzle_loader.json');
            return;
        };
        Boot.prototype.create = function () {
            /**
             * Fit the game canvas to parent container.
             */
            this.game.scale.scaleMode = Phaser.Scale.ScaleModes.FIT;
            /**
             * Prepare FileLoader
             */
            fs_2.FileLoader.Prepare();
            /**
             * Prepare Master Manager.
             */
            masterManager_2.MasterManager.Prepare(this.game);
            var master = masterManager_2.MasterManager.GetInstance();
            /**
             * Create GameManager.
             */
            master.addManager(new gameManager_1.GameManager());
            /**
             * Start Preloader Sccene.
             */
            this.scene.start('localization');
            return;
        };
        return Boot;
    }(Phaser.Scene));
    exports.Boot = Boot;
});
define("scenes/BaseScene", ["require", "exports", "utilities/managers/masterManager"], function (require, exports, masterManager_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseScene = /** @class */ (function (_super) {
        __extends(BaseScene, _super);
        function BaseScene() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BaseScene.prototype.create = function () {
            this.m_master = masterManager_3.MasterManager.GetInstance();
            return;
        };
        BaseScene.prototype.update = function (_step, _dt) {
            this.m_master.update(_dt / 1000);
            return;
        };
        BaseScene.prototype.destroy = function () {
            this.m_master = null;
            return;
        };
        return BaseScene;
    }(Phaser.Scene));
    exports.BaseScene = BaseScene;
});
define("game/ui/cloud_popup", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CloudPopup = /** @class */ (function () {
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function CloudPopup(_scene) {
            this.m_scene = _scene;
            // Get the cloud popup texture from TextureManager
            var texture = _scene.game.textures.get('main_menu');
            var cloud_frame = texture.get('msg_cloud.png');
            // sets the minimum size from the original texture
            this.m_min_width = cloud_frame.width;
            this.m_min_height = cloud_frame.height;
            // Create nineslice cloud texture
            this.m_cloud = _scene.add.nineslice(0, 0, cloud_frame.width, cloud_frame.height, { key: 'main_menu', frame: 'msg_cloud.png' }, [61, 72, 69, 59]);
            this.m_cloud.setOrigin(0.5, 0.5);
            // Create Text
            this.m_text = _scene.add.text(this.m_cloud.x, this.m_cloud.y, "", { fontFamily: '"Roboto Condensed"' });
            this.m_text.setFontSize(50);
            this.m_text.setColor('black');
            this.m_text.setOrigin(0.5, 0.5);
            // Text Padding
            this.m_top_padding = this.m_min_height * 0.25;
            this.m_bottom_padding = this.m_min_height * 0.25;
            this.m_left_padding = this.m_min_width * 0.25;
            this.m_right_padding = this.m_min_height * 0.25;
            // sets maximum size from the orinal texture
            this.setMaxWidth(this.m_min_width);
            this.m_isOpen = false;
            return;
        }
        CloudPopup.prototype.open = function () {
            if (!this.m_isOpen) {
                this.m_cloud.setScale(0, 0);
                this.m_cloud_tween = this.m_scene.tweens.add({
                    targets: this.m_cloud,
                    scale: 1,
                    duration: 400,
                    ease: 'Bounce'
                });
                this.m_text.setScale(0, 0);
                this.m_text_tween = this.m_scene.tweens.add({
                    targets: this.m_text,
                    scale: 1,
                    duration: 400,
                    ease: 'Bounce'
                });
                this.m_isOpen = !this.m_isOpen;
            }
            return;
        };
        CloudPopup.prototype.close = function () {
            if (this.m_isOpen) {
                // TODO
                if (this.m_cloud_tween.isPlaying()) {
                    this.m_cloud_tween.stop();
                }
                if (this.m_text_tween.isPlaying()) {
                    this.m_text_tween.stop();
                }
                this.m_isOpen = !this.m_isOpen;
            }
            return;
        };
        CloudPopup.prototype.setPosition = function (_x, _y) {
            this.m_text.setPosition(this.m_text.x + (_x - this.m_cloud.x), this.m_text.y + (_y - this.m_cloud.y));
            this.m_cloud.setPosition(_x, _y);
            return;
        };
        CloudPopup.prototype.setText = function (_text) {
            this.m_text.text = _text;
            this.setSize(this.m_text.width + this.m_left_padding + this.m_right_padding, this.m_text.height + this.m_top_padding + this.m_bottom_padding);
            return;
        };
        CloudPopup.prototype.setMaxWidth = function (_width) {
            this.m_max_width = this._check_minimum_value(_width, this.m_min_width);
            this.m_text.setWordWrapWidth(this.m_max_width - this.m_left_padding - this.m_right_padding);
            return;
        };
        CloudPopup.prototype.setSize = function (_width, _height) {
            this.m_width = this._check_minimum_value(_width, this.m_min_width);
            this.m_width = this._check_maximum_value(_width, this.m_max_width);
            this.m_height = this._check_minimum_value(_height, this.m_min_height);
            this.m_height = _height;
            this.m_cloud.resize(this.m_width, this.m_height);
            return;
        };
        CloudPopup.prototype.getTextObject = function () {
            return this.m_text;
        };
        CloudPopup.prototype.destroy = function () {
            return;
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        CloudPopup.prototype._check_minimum_value = function (_value, _min) {
            if (_value < _min) {
                return _min;
            }
            return _value;
        };
        CloudPopup.prototype._check_maximum_value = function (_value, _max) {
            if (_value > _max) {
                return _max;
            }
            return _value;
        };
        return CloudPopup;
    }());
    exports.CloudPopup = CloudPopup;
});
define("game/ui/buttons/button", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     *
     */
    var Button = /** @class */ (function () {
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         *
         */
        function Button() {
            return;
        }
        /**
         *
         */
        Button.prototype.open = function () {
            return;
        };
        /**
         *
         */
        Button.prototype.close = function () {
            return;
        };
        /**
         *
         */
        Button.prototype.getWidth = function () {
            return 0;
        };
        /**
         *
         */
        Button.prototype.getHeight = function () {
            return 0;
        };
        /**
        * Safely destroys the object.
        */
        Button.prototype.destroy = function () {
            return;
        };
        return Button;
    }());
    exports.Button = Button;
});
define("game/ui/buttons/nineButton", ["require", "exports", "game/ui/buttons/button"], function (require, exports, button_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NineButton = /** @class */ (function (_super) {
        __extends(NineButton, _super);
        /**
         *
         */
        function NineButton() {
            var _this = _super.call(this) || this;
            return _this;
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        NineButton.CreateDefault = function (_scene, _x, _y, _label, _fn, _context) {
            var button = new NineButton();
            button.m_texture = _scene.add.nineslice(_x, _y, 145, 145, { key: 'main_menu', frame: 'button_bg.png' }, [70, 70, 70, 70]);
            button.m_texture.resize(500, 145);
            button.m_texture.setOrigin(0.5, 0.5);
            button.m_texture.setInteractive();
            button.m_texture.on('pointerdown', _fn, _context);
            button.m_text = _scene.add.text(_x, _y, _label, { fontFamily: '"Roboto Condensed"' });
            button.m_text.setFontSize(50);
            button.m_text.setColor('black');
            button.m_text.setOrigin(0.5, 0.5);
            return button;
        };
        /**
         *
         */
        NineButton.prototype.open = function () {
            this.m_texture.setActive(true);
            this.m_texture.setVisible(true);
            this.m_text.setActive(true);
            this.m_text.setVisible(true);
            return;
        };
        /**
         *
         */
        NineButton.prototype.close = function () {
            this.m_texture.setActive(false);
            this.m_texture.setVisible(false);
            this.m_text.setActive(false);
            this.m_text.setVisible(false);
            return;
        };
        NineButton.prototype.getWidth = function () {
            return this.m_texture.width;
        };
        NineButton.prototype.getHeight = function () {
            return this.m_texture.height;
        };
        /**
        * Safely destroys the object.
        */
        NineButton.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.m_text = null;
            this.m_texture = null;
            return;
        };
        /**
         *
         * @param _text
         */
        NineButton.prototype.setText = function (_text) {
            this.m_text.text = _text;
            return;
        };
        /**
         *
         */
        NineButton.prototype.getTextObject = function () {
            return this.m_text;
        };
        return NineButton;
    }(button_1.Button));
    exports.NineButton = NineButton;
});
define("game/ui/buttons/imgButton", ["require", "exports", "game/ui/buttons/button"], function (require, exports, button_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ImgButton = /** @class */ (function (_super) {
        __extends(ImgButton, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function ImgButton(_scene, _x, _y, _laber, _atlas, _base_spr, _hover_spr, _down_spr, _fn, _context) {
            var _this = _super.call(this) || this;
            // texture
            _this.m_texture = _scene.add.sprite(_x, _y, _atlas, _base_spr);
            // interaction
            _this.m_texture.setInteractive();
            _this.m_texture.on('pointerdown', _fn, _context);
            return _this;
        }
        /**
        *
        */
        ImgButton.prototype.open = function () {
            this.m_texture.setActive(true);
            this.m_texture.setVisible(true);
            return;
        };
        /**
         *
         */
        ImgButton.prototype.close = function () {
            this.m_texture.setActive(false);
            this.m_texture.setVisible(false);
            return;
        };
        /**
         *
         */
        ImgButton.prototype.getWidth = function () {
            return this.m_texture.width;
        };
        /**
         *
         */
        ImgButton.prototype.getHeight = function () {
            return this.m_texture.height;
        };
        ImgButton.prototype.getTexture = function () {
            return this.m_texture;
        };
        /**
        * Safely destroys the object.
        */
        ImgButton.prototype.destroy = function () {
            this.m_texture = null;
            return;
        };
        return ImgButton;
    }(button_2.Button));
    exports.ImgButton = ImgButton;
});
define("game/ui/carousel/carousel", ["require", "exports", "game/ui/buttons/imgButton", "utilities/listeners/mxListenerManager", "utilities/listeners/mxListener"], function (require, exports, imgButton_1, mxListenerManager_2, mxListener_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Carousel = /** @class */ (function () {
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function Carousel(_scene, _x, _y, _buts_distance, _atlas, _name_prefix, _name_sufix, _size) {
            ///////////////////////////////////
            // Items
            this.m_a_items = new Array();
            var item;
            for (var index = 0; index < _size; ++index) {
                item = _scene.add.sprite(_x, _y, _atlas, _name_prefix + index + _name_sufix);
                this._desactive_item(item);
                this.m_a_items.push(item);
            }
            ///////////////////////////////////
            // Buttons
            this.m_next_button = new imgButton_1.ImgButton(_scene, _x + _buts_distance, _y, "", 'main_menu', 'arrow_button.png', 'arrow_button.png', 'arrow_button.png', this._next, this);
            this.m_back_button = new imgButton_1.ImgButton(_scene, _x - _buts_distance, _y, "", 'main_menu', 'arrow_button.png', 'arrow_button.png', 'arrow_button.png', this._prev, this);
            var spr = this.m_back_button.getTexture();
            spr.setFlipX(true);
            ///////////////////////////////////
            // Event Manager
            this.m_events = new mxListenerManager_2.MxListenerManager();
            this.m_events.addEvent('active_changed');
            // display first element.
            this.m_current_item = null;
            this.m_item_tween = null;
            this._setActiveItem(0);
            return;
        }
        Carousel.prototype.getCurrentIdx = function () {
            return this.m_current_idx;
        };
        /**
        * Safely destroys the object.
        */
        Carousel.prototype.destroy = function () {
            this.m_current_item = null;
            this.m_events.destroy();
            this.m_events = null;
            this.m_back_button.destroy();
            this.m_events = null;
            this.m_next_button.destroy();
            this.m_events = null;
            var item;
            while (this.m_a_items.length) {
                item = this.m_a_items.pop();
                item.destroy();
            }
            this.m_a_items = null;
            return;
        };
        /**
         *
         * I) 'active_changed' : trigger when the active item has changed in the carousel.
         *
         * @param _event
         * @param _fn
         * @param _context
         */
        Carousel.prototype.addListener = function (_event, _fn, _context) {
            this.m_events.addListener(_event, new mxListener_3.MxListener(_fn, _context));
            return;
        };
        /**
         *
         * @param _idx
         */
        Carousel.prototype.setActive = function (_idx) {
            if (_idx >= 0 && _idx < this.m_a_items.length) {
                this._setActiveItem(_idx);
            }
            return;
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        Carousel.prototype._setActiveItem = function (_idx) {
            if (this.m_current_item != null) {
                this._desactive_item(this.m_current_item);
            }
            this.m_current_item = this.m_a_items[_idx];
            this.m_current_idx = _idx;
            this._active_item(this.m_current_item);
            this.m_events.call('active_changed');
            return;
        };
        Carousel.prototype._next = function () {
            this.m_current_idx++;
            if (this.m_current_idx >= this.m_a_items.length) {
                this.m_current_idx = 0;
            }
            this._setActiveItem(this.m_current_idx);
            return;
        };
        Carousel.prototype._prev = function () {
            this.m_current_idx--;
            if (this.m_current_idx < 0) {
                this.m_current_idx = this.m_a_items.length - 1;
            }
            this._setActiveItem(this.m_current_idx);
            return;
        };
        Carousel.prototype._active_item = function (_item) {
            _item.setActive(true);
            _item.setVisible(true);
            return;
        };
        Carousel.prototype._desactive_item = function (_item) {
            _item.setActive(false);
            _item.setVisible(false);
            return;
        };
        return Carousel;
    }());
    exports.Carousel = Carousel;
});
define("scenes/menus/mainMenu", ["require", "exports", "scenes/BaseScene", "game/ui/cloud_popup", "game/gameCommons", "game/ui/buttons/nineButton", "game/ui/carousel/carousel"], function (require, exports, BaseScene_1, cloud_popup_1, gameCommons_6, nineButton_1, carousel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     *
     */
    var MainMenu = /** @class */ (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainMenu.prototype.create = function () {
            _super.prototype.create.call(this);
            // gameCommons
            var half_width = this.game.canvas.width * 0.5;
            // gets the Game Manager.
            this.m_game_manager
                = this.m_master.getManager(gameCommons_6.MANAGER_ID.kGameManager);
            // gets the DataManager from GameManager.
            this.m_data_mng = this.m_game_manager.getDataManager();
            // Create the cloud poupup.
            this.m_cloud_popup = new cloud_popup_1.CloudPopup(this);
            this.m_cloud_popup.setMaxWidth(800);
            this.m_cloud_popup.setPosition(half_width, this.game.canvas.height * 0.9);
            // display first tip.
            this.m_tip_num = 0;
            this.nextTip();
            ///////////////////////////////////
            // Buttons
            // Time Preferences Buttons
            this.m_pref_buttons = new Array();
            var but_pos = new Phaser.Geom.Point(half_width, this.game.canvas.height * 0.1);
            var button;
            var a_times = [5, 3, 1];
            var _loop_1 = function (index) {
                button = nineButton_1.NineButton.CreateDefault(this_1, but_pos.x, but_pos.y, '' + a_times[index] + ' minutes', function () {
                    this._onClick_minute_button(a_times[index] * 60);
                }, this_1);
                this_1.m_pref_buttons.push(button);
                but_pos.y += button.getHeight() + 20;
            };
            var this_1 = this;
            for (var index = 0; index < 3; ++index) {
                _loop_1(index);
            }
            this._close_prefs();
            // play
            this.m_play_button = nineButton_1.NineButton.CreateDefault(this, half_width, this.game.canvas.height * 0.1, "Play", this._onClick_play, this);
            // tip
            nineButton_1.NineButton.CreateDefault(this, half_width, this.game.canvas.height * 0.75, "Next Tip", this.nextTip, this);
            ///////////////////////////////////
            // Carousel
            this.m_carousel = new carousel_1.Carousel(this, half_width, this.game.canvas.height * 0.5, 450, 'main_menu', 'clock_idx_', '.png', gameCommons_6.CLOCK_STYLE.kCount);
            this.m_carousel.addListener('active_changed', this._onCarouselChanged, this);
            // carousel title
            var carousel_title = this.add.text(half_width, this.game.canvas.height * 0.35, this.m_data_mng.getString('choose_clock'), { fontFamily: '"Roboto Condensed"' });
            carousel_title.setFontSize(50);
            carousel_title.setColor('black');
            carousel_title.setOrigin(0.5, 0.5);
            // carousel item name.
            this.m_carousel_item_name = this.add.text(half_width, this.game.canvas.height * 0.65, "", { fontFamily: '"Roboto Condensed"' });
            this.m_carousel_item_name.setFontSize(50);
            this.m_carousel_item_name.setColor('black');
            this.m_carousel_item_name.setOrigin(0.5, 0.5);
            // display default element
            this.m_carousel.setActive(this.m_game_manager.getUserPreference().getClockStyle());
            return;
        };
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
        * Safely destroys the object.
        */
        MainMenu.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.m_carousel.destroy();
            this.m_carousel = null;
            this.m_cloud_popup.destroy();
            this.m_cloud_popup = null;
            this.m_play_button.destroy();
            while (this.m_pref_buttons.length) {
                var button = this.m_pref_buttons.pop();
                button.destroy();
            }
            this.m_pref_buttons = null;
            this.m_game_manager = null;
            this.m_data_mng = null;
            return;
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        MainMenu.prototype._onClick_minute_button = function (_time) {
            var prefs = this.m_game_manager.getUserPreference();
            prefs.chrono_value = _time;
            // TODO : descomentar,hasta tener el skin de todos los relojes.
            //prefs.setClockStyle(this.m_carousel.getCurrentIdx()); 
            prefs.setClockStyle(0);
            this.destroy();
            this.scene.start('mainGame');
            return;
        };
        MainMenu.prototype._onCarouselChanged = function () {
            this.m_carousel_item_name.text
                = this.m_data_mng.getString('clock_name_' + this.m_carousel.getCurrentIdx());
            return;
        };
        MainMenu.prototype._close_prefs = function () {
            this.m_pref_buttons.forEach(function (_button) {
                _button.close();
            }, this);
            return;
        };
        MainMenu.prototype._open_prefs = function () {
            this.m_pref_buttons.forEach(function (_button) {
                _button.open();
            }, this);
            return;
        };
        MainMenu.prototype._onClick_play = function () {
            this._open_prefs();
            this.m_play_button.close();
            return;
        };
        MainMenu.prototype.nextTip = function () {
            this.m_cloud_popup.setText(this.m_data_mng.getString('menu_tip_0' + this.m_tip_num));
            this.m_cloud_popup.close();
            this.m_cloud_popup.open();
            // iterate over tips.
            this.m_tip_num++;
            if (this.m_tip_num > 5) {
                this.m_tip_num = 0;
            }
        };
        return MainMenu;
    }(BaseScene_1.BaseScene));
    exports.MainMenu = MainMenu;
});
define("game/ui/clocks/chronoClock", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChronoClock = /** @class */ (function () {
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function ChronoClock() {
            return;
        }
        ChronoClock.prototype.setChronoManager = function (_chrono_mng) {
            this.m_chrono_mng = _chrono_mng;
            return;
        };
        ChronoClock.prototype.update = function () {
            return;
        };
        ChronoClock.prototype.reset = function () {
            return;
        };
        ChronoClock.prototype.hotClock = function () {
            return;
        };
        /**
        * Safely destroys the object.
        */
        ChronoClock.prototype.destroy = function () {
            return;
        };
        return ChronoClock;
    }());
    exports.ChronoClock = ChronoClock;
});
define("game/ui/clocks/sandClock", ["require", "exports", "game/ui/clocks/chronoClock"], function (require, exports, chronoClock_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SandClock = /** @class */ (function (_super) {
        __extends(SandClock, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function SandClock(_scene, _x, _y) {
            var _this = _super.call(this) || this;
            _this.m_text = _scene.add.text(_x, _y, '', { fontFamily: '"Roboto Condensed"' });
            _this.m_text.setFontSize(50);
            _this.m_text.setColor('black');
            _this.m_text.setOrigin(0.5, 0.5);
            return _this;
        }
        SandClock.prototype.update = function () {
            this.m_text.text = this.m_chrono_mng.getCurrentTime().toString();
            return;
        };
        SandClock.prototype.reset = function () {
            this.m_text.setColor('black');
            return;
        };
        SandClock.prototype.hotClock = function () {
            this.m_text.setColor('red');
            return;
        };
        return SandClock;
    }(chronoClock_1.ChronoClock));
    exports.SandClock = SandClock;
});
define("game/ui/clocks/digitalClock", ["require", "exports", "game/ui/clocks/chronoClock"], function (require, exports, chronoClock_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DigitalClock = /** @class */ (function (_super) {
        __extends(DigitalClock, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function DigitalClock(_scene, _x, _y) {
            var _this = _super.call(this) || this;
            return _this;
        }
        return DigitalClock;
    }(chronoClock_2.ChronoClock));
    exports.DigitalClock = DigitalClock;
});
define("game/ui/clocks/analogClock", ["require", "exports", "game/ui/clocks/chronoClock"], function (require, exports, chronoClock_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AnalogClock = /** @class */ (function (_super) {
        __extends(AnalogClock, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function AnalogClock(_scene, _x, _y) {
            var _this = _super.call(this) || this;
            return _this;
        }
        return AnalogClock;
    }(chronoClock_3.ChronoClock));
    exports.AnalogClock = AnalogClock;
});
define("game/ui/timeOutPop/timeOutPop", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TimeOutPop = /** @class */ (function () {
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function TimeOutPop(_scene, _x, _y, _data_mng) {
            this.m_data_mng = _data_mng;
            this.m_group = _scene.add.group();
            // Base texture
            this.m_texture = _scene.add.nineslice(_x, _y, 145, 145, { key: 'main_menu', frame: 'button_bg.png' }, [70, 70, 70, 70]);
            this.m_texture.resize(750, 750);
            this.m_texture.setOrigin(0.5, 0.5);
            this.m_texture.setInteractive();
            this.m_texture.on('pointerdown', this.close, this);
            // Title
            this.m_title = _scene.add.text(_x, _y - 200, this.m_data_mng.getString('time_out_0'), { fontFamily: '"Roboto Condensed"' });
            this.m_title.setFontSize(100);
            this.m_title.setColor('black');
            this.m_title.setOrigin(0.5, 0.5);
            this.m_msg = _scene.add.text(_x, _y, '', { fontFamily: '"Roboto Condensed"' });
            this.m_msg.setFontSize(50);
            this.m_msg.setColor('black');
            this.m_msg.setOrigin(0.5, 0.5);
            this.m_msg.setWordWrapWidth(this.m_texture.width * 0.85);
            // Message
            this.m_group.add(this.m_texture);
            this.m_group.add(this.m_title);
            this.m_group.add(this.m_msg);
            this.m_isOpen = true;
            close();
            return;
        }
        TimeOutPop.prototype.open = function () {
            if (!this.m_isOpen) {
                this.m_group.setVisible(true);
                var rnd = 1 + (Math.floor(Math.random() * 5));
                if (rnd > 4) {
                    rnd = 4;
                }
                this.m_msg.text = this.m_data_mng.getString('time_out_' + rnd);
                this.m_isOpen = !this.m_isOpen;
            }
            return;
        };
        TimeOutPop.prototype.close = function () {
            if (this.m_isOpen) {
                this.m_group.setVisible(false);
                this.m_isOpen = !this.m_isOpen;
            }
            return;
        };
        TimeOutPop.prototype.isOpen = function () {
            return this.m_isOpen;
        };
        /**
        * Safely destroys the object.
        */
        TimeOutPop.prototype.destroy = function () {
            return;
        };
        return TimeOutPop;
    }());
    exports.TimeOutPop = TimeOutPop;
});
define("scenes/levels/game_level", ["require", "exports", "scenes/BaseScene", "game/gameCommons", "game/ui/clocks/sandClock", "game/ui/clocks/digitalClock", "game/ui/clocks/analogClock", "game/ui/buttons/nineButton", "game/ui/timeOutPop/timeOutPop"], function (require, exports, BaseScene_2, gameCommons_7, sandClock_1, digitalClock_1, analogClock_1, nineButton_2, timeOutPop_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MainGame = /** @class */ (function (_super) {
        __extends(MainGame, _super);
        function MainGame() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        MainGame.prototype.create = function () {
            _super.prototype.create.call(this);
            var half_width = this.game.canvas.width * 0.5;
            // get GameManager. 
            this.m_game_mng
                = this.m_master.getManager(gameCommons_7.MANAGER_ID.kGameManager);
            // initalize Gameplay.
            this.m_game_mng.initGamePlay();
            // get DataManager.
            this.m_data_mng = this.m_game_mng.getDataManager();
            // get ChronoManager.
            this.m_chrono_mng = this.m_game_mng.getChronoManager();
            // get user preferences
            this.m_user_pref = this.m_game_mng.getUserPreference();
            ///////////////////////////////////
            // Chrono Display
            var clock_x = this.game.canvas.width * 0.5;
            var clocl_y = this.game.canvas.height * 0.5;
            switch (this.m_user_pref.getClockStyle()) {
                case gameCommons_7.CLOCK_STYLE.kSand:
                    this.m_chrono_clock = new sandClock_1.SandClock(this, clock_x, clocl_y);
                    break;
                case gameCommons_7.CLOCK_STYLE.kDigital:
                    this.m_chrono_clock = new digitalClock_1.DigitalClock(this, clock_x, clocl_y);
                    break;
                case gameCommons_7.CLOCK_STYLE.kAnalog:
                    this.m_chrono_clock = new analogClock_1.AnalogClock(this, clock_x, clocl_y);
                    break;
                default:
                    this.m_chrono_clock = new sandClock_1.SandClock(this, clock_x, clocl_y);
                    break;
            }
            // set manager to chrono display
            this.m_chrono_clock.setChronoManager(this.m_chrono_mng);
            ///////////////////////////////////
            // Buttons
            this.m_pause_resume = nineButton_2.NineButton.CreateDefault(this, half_width, this.game.canvas.height * 0.8, "Start", this._on_click_pause_resume, this);
            this.m_reset = nineButton_2.NineButton.CreateDefault(this, half_width, this.game.canvas.height * 0.9, "Reset", this._reset_clock, this);
            this.m_main_menu = nineButton_2.NineButton.CreateDefault(this, half_width, this.game.canvas.height * 0.1, "Main_Menu", this._on_click_main_menu, this);
            ///////////////////////////////////
            // Popup
            this.m_pop_up = new timeOutPop_1.TimeOutPop(this, half_width, this.game.canvas.height * 0.5, this.m_data_mng);
            this.m_chrono_mng.addListener('on_mark', this._on_reach_mark, this);
            this.m_chrono_mng.addListener('on_finish', this._on_chrono_finish, this);
            this._reset_clock();
            return;
        };
        MainGame.prototype.update = function (_step, _dt) {
            _super.prototype.update.call(this, _step, _dt);
            this.m_chrono_clock.update();
            return;
        };
        MainGame.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.m_pop_up.destroy();
            this.m_pop_up = null;
            this.m_pause_resume.destroy();
            this.m_pause_resume = null;
            this.m_reset.destroy();
            this.m_reset = null;
            this.m_data_mng = null;
            this.m_user_pref = null;
            // destroy clock display.
            this.m_chrono_clock.destroy();
            this.m_chrono_clock = null;
            // shutdown Gameplay.
            this.m_game_mng.shutdownGameplay();
            this.m_game_mng = null;
            return;
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        MainGame.prototype._on_click_main_menu = function () {
            this.destroy();
            this.scene.start('mainMenu');
            return;
        };
        MainGame.prototype._on_chrono_finish = function () {
            this._reset_clock();
            this.m_pop_up.open();
            return;
        };
        MainGame.prototype._on_reach_mark = function () {
            this.m_chrono_clock.hotClock();
            return;
        };
        MainGame.prototype._reset_clock = function () {
            this.m_chrono_mng.reset(this.m_user_pref.chrono_value, 
            //15,
            10);
            this._init_button_frame();
            this.m_chrono_clock.reset();
            if (this.m_pop_up.isOpen()) {
                this.m_pop_up.close();
            }
            return;
        };
        MainGame.prototype._on_click_pause_resume = function () {
            if (this.m_chrono_mng.isRunning()) {
                this.m_chrono_mng.pause();
                this.m_pause_resume.setText('Resumen');
            }
            else {
                this.m_chrono_mng.start();
                this.m_pause_resume.setText('Pause');
            }
            if (this.m_pop_up.isOpen()) {
                this.m_pop_up.close();
            }
            return;
        };
        MainGame.prototype._init_button_frame = function () {
            this.m_pause_resume.setText('Start');
            return;
        };
        return MainGame;
    }(BaseScene_2.BaseScene));
    exports.MainGame = MainGame;
});
define("scenes/localization", ["require", "exports", "utilities/managers/masterManager", "game/gameCommons"], function (require, exports, masterManager_4, gameCommons_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LocalizationScene = /** @class */ (function (_super) {
        __extends(LocalizationScene, _super);
        function LocalizationScene() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        LocalizationScene.prototype.create = function () {
            var width = this.game.canvas.width;
            var height = this.game.canvas.height;
            /**
             * North America map, without Mexico.
             */
            var english_button = this.add.sprite(width * 0.5, height * 0.25, 'preloader', 'english_map.png');
            english_button.setInteractive();
            english_button.on('pointerup', this._onClick_english, this);
            /**
             * Latin America map.
            */
            var latin_button = this.add.sprite(width * 0.5, height * 0.75, 'preloader', 'latino_map.png');
            latin_button.setInteractive();
            latin_button.on('pointerup', this._onClick_spanish, this);
            return;
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        LocalizationScene.prototype._onClick_english = function () {
            var game_mng = masterManager_4.MasterManager.GetInstance().getManager(gameCommons_8.MANAGER_ID.kGameManager);
            game_mng.setLocalization(gameCommons_8.LOCALIZATION.kEnglish);
            // TODO: start preload scene.
            this.scene.start('preloader');
            return;
        };
        LocalizationScene.prototype._onClick_spanish = function () {
            var game_mng = masterManager_4.MasterManager.GetInstance().getManager(gameCommons_8.MANAGER_ID.kGameManager);
            game_mng.setLocalization(gameCommons_8.LOCALIZATION.kSpanish);
            // TODO: start preload scene.
            this.scene.start('preloader');
            return;
        };
        return LocalizationScene;
    }(Phaser.Scene));
    exports.LocalizationScene = LocalizationScene;
});
define("game_init", ["require", "exports", "scenes/preloader", "scenes/boot", "scenes/menus/mainMenu", "scenes/levels/game_level", "phaser3-nineslice", "scenes/localization"], function (require, exports, preloader_1, boot_1, mainMenu_1, game_level_1, phaser3_nineslice_1, localization_1) {
    "use strict";
    var GameInit = /** @class */ (function () {
        function GameInit() {
        }
        GameInit.prototype.start = function () {
            var config = {
                type: Phaser.WEBGL,
                scale: {
                    parent: 'phaser-game',
                    autoCenter: Phaser.Scale.CENTER_BOTH,
                    mode: Phaser.Scale.FIT
                },
                width: 1080,
                height: 1920,
                input: {
                    gamepad: true
                },
                plugins: {
                    global: [phaser3_nineslice_1.Plugin.DefaultCfg],
                },
                backgroundColor: 0x008aff
            };
            ///////////////////////////////////
            // Init Game
            this.m_game = new Phaser.Game(config);
            ///////////////////////////////////
            // Create Scenes
            this.m_game.scene.add('boot', boot_1.Boot);
            this.m_game.scene.add('preloader', preloader_1.Preloader);
            this.m_game.scene.add('mainMenu', mainMenu_1.MainMenu);
            this.m_game.scene.add('localization', localization_1.LocalizationScene);
            this.m_game.scene.add('mainGame', game_level_1.MainGame);
            ///////////////////////////////////
            // Start BOOT        
            this.m_game.scene.start('boot');
            ////////////////////////////////////
            // 
            return;
        };
        return GameInit;
    }());
    return GameInit;
});
define("scenes/levels/testing/test_level_tiled", ["require", "exports", "scenes/BaseScene"], function (require, exports, BaseScene_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Test_Level_Tiled = /** @class */ (function (_super) {
        __extends(Test_Level_Tiled, _super);
        function Test_Level_Tiled() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Test_Level_Tiled.prototype.create = function () {
            _super.prototype.create.call(this);
            /****************************************************/
            /* Scene                                            */
            /****************************************************/
            // TileMap
            var level_map = this.make.tilemap({
                key: "level_01",
                insertNull: true
            });
            // Set TileSet
            var tile_set = level_map.addTilesetImage('terrain_256_01', "terrain_256_01");
            // Get Statick Layer: Background
            this.bckg_layer = level_map.createStaticLayer("Background", tile_set);
            // Get Statick Layer: Terrain
            this.terrain_layer = level_map.createStaticLayer("Terrain", tile_set);
            // Create Scene Props
            var props_layer = level_map.getObjectLayer('Props')['objects'];
            // Sort Objects by its y position
            props_layer.sort(function (_a, _b) {
                return _a.y - _b.y;
            });
            // Get TileSet for Ambience Object
            var tileset_ambience;
            // Get Image Collection
            level_map.imageCollections.forEach(function (_img_collection) {
                if (_img_collection.name == "ambience_01_collection") {
                    tileset_ambience = _img_collection;
                }
            }, this);
            var first_gid = tileset_ambience.firstgid;
            var tile_data;
            var image_root;
            var image_name;
            var sprite;
            var object;
            for (var index = 0; index < props_layer.length; ++index) {
                object = props_layer[index];
                tile_data = tileset_ambience.images[object.gid - first_gid];
                image_root = tile_data.image;
                image_name = image_root.split('/').pop();
                sprite = this.add.sprite(object.x, object.y, 'ambience_01', image_name);
                sprite.setOrigin(0, 1);
            }
            return;
        };
        Test_Level_Tiled.prototype.destroy = function () {
            this.bckg_layer.destroy();
            this.terrain_layer.destroy();
            return;
        };
        return Test_Level_Tiled;
    }(BaseScene_3.BaseScene));
    exports.Test_Level_Tiled = Test_Level_Tiled;
});
define("utilities/enum_commons", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Direction4;
    (function (Direction4) {
        Direction4[Direction4["kUp"] = 0] = "kUp";
        Direction4[Direction4["kDown"] = 1] = "kDown";
        Direction4[Direction4["kRigh"] = 2] = "kRigh";
        Direction4[Direction4["kLeft"] = 3] = "kLeft";
    })(Direction4 = exports.Direction4 || (exports.Direction4 = {}));
    var Axis;
    (function (Axis) {
        Axis[Axis["kHorizontal"] = 0] = "kHorizontal";
        Axis[Axis["kVertical"] = 1] = "kVertical";
    })(Axis = exports.Axis || (exports.Axis = {}));
    var PositionID;
    (function (PositionID) {
        PositionID[PositionID["kTop"] = 0] = "kTop";
        PositionID[PositionID["kBottom"] = 1] = "kBottom";
        PositionID[PositionID["kLeft"] = 2] = "kLeft";
        PositionID[PositionID["kRight"] = 3] = "kRight";
    })(PositionID = exports.PositionID || (exports.PositionID = {}));
    var Rotation;
    (function (Rotation) {
        Rotation[Rotation["kCW"] = 0] = "kCW";
        Rotation[Rotation["kCCW"] = 1] = "kCCW";
    })(Rotation = exports.Rotation || (exports.Rotation = {}));
});
define("utilities/fsm_state", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FSMState = /** @class */ (function () {
        function FSMState() {
            this.m_fsm = null;
            return;
        }
        FSMState.prototype.onEnter = function () {
            return;
        };
        FSMState.prototype.onExit = function () {
            return;
        };
        FSMState.prototype.update = function () {
            return 0;
        };
        FSMState.prototype.draw = function () {
            return 0;
        };
        FSMState.prototype.setFSM = function (_fsm) {
            this.m_fsm = _fsm;
            return;
        };
        return FSMState;
    }());
    exports.FSMState = FSMState;
});
define("utilities/fsm", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FSM = /** @class */ (function () {
        function FSM() {
            this.m_states_map = new Map();
            this.clear();
            return;
        }
        FSM.prototype.update = function () {
            return this.m_active_state.update();
        };
        FSM.prototype.draw = function () {
            return this.m_active_state.draw();
        };
        FSM.prototype.clear = function () {
            this.m_states_map.clear();
            this.m_active_state = null;
            return;
        };
        FSM.prototype.setActive = function (_idx) {
            if (this.m_states_map.has(_idx)) {
                if (this.m_active_state != null) {
                    this.m_active_state.onExit();
                }
                this.m_active_state = this.m_states_map.get(_idx);
                this.m_active_state.onEnter();
            }
            else {
                console.log("FSM doesn't has state : " + _idx);
                return -1;
            }
            return 0;
        };
        FSM.prototype.addState = function (_idx, _state) {
            if (!this.m_states_map.has(_idx)) {
                this.m_states_map.set(_idx, _state);
                _state.setFSM(this);
            }
            else {
                console.log("FSM already has state : " + _idx);
                return -1;
            }
            return 0;
        };
        FSM.prototype.removeState = function (_idx) {
            if (this.m_states_map.has(_idx)) {
                this.m_states_map.delete(_idx);
            }
            else {
                console.log("FSM doesn't has state : " + _idx);
                return -1;
            }
            return 0;
        };
        return FSM;
    }());
    exports.FSM = FSM;
});
define("utilities/mxObjectPool", ["require", "exports", "utilities/asserts"], function (require, exports, asserts_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OBJECT_POOL_TYPE;
    (function (OBJECT_POOL_TYPE) {
        OBJECT_POOL_TYPE[OBJECT_POOL_TYPE["kStatic"] = 0] = "kStatic";
        OBJECT_POOL_TYPE[OBJECT_POOL_TYPE["kDynamic"] = 1] = "kDynamic";
    })(OBJECT_POOL_TYPE = exports.OBJECT_POOL_TYPE || (exports.OBJECT_POOL_TYPE = {}));
    var ObjectPool = /** @class */ (function () {
        /**
         * Private constructor. Object Pool must be created with its Create static
         * methods.
         */
        function ObjectPool() {
            return;
        }
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
        ObjectPool.CreateDynamic = function (_max, _create_fn, _context) {
            asserts_4.AssertFunction(_create_fn);
            asserts_4.AssertNumber(_max);
            var pool = new ObjectPool();
            pool.m_a_active = new Array();
            pool.m_a_desactive = new Array();
            pool.m_type = OBJECT_POOL_TYPE.kDynamic;
            pool.m_max_size = _max;
            pool.m_size = 0;
            pool.m_create_fn = _create_fn;
            if (_context) {
                pool.m_fn_create_context = _context;
            }
            pool.m_on_active_context = undefined;
            pool.m_on_active = undefined;
            pool.m_on_desactive = undefined;
            pool.m_on_desactive_context = undefined;
            return pool;
        };
        /**
         * Creates an ObjectPool that already has the elements needed and will
         * recycle them. The user need to give an array of elements.
         *
         * @param _a_elements Array of elements that belong to thes ObjectPool.
         */
        ObjectPool.CreateStatic = function (_a_elements) {
            var pool = new ObjectPool();
            pool.m_a_active = new Array();
            pool.m_a_desactive = new Array();
            pool.m_type = OBJECT_POOL_TYPE.kStatic;
            pool.m_max_size = _a_elements.length;
            pool.m_size = _a_elements.length;
            for (var index = 0; index < pool.m_size; ++index) {
                pool.desactive(_a_elements[index]);
            }
            pool.m_create_fn = undefined;
            pool.m_fn_create_context = undefined;
            pool.m_on_active_context = undefined;
            pool.m_on_active = undefined;
            pool.m_on_desactive = undefined;
            pool.m_on_desactive_context = undefined;
            return pool;
        };
        ObjectPool.prototype.update = function (_dt) {
            for (var index = 0; index < this.m_a_active.length; ++index) {
                this.m_a_active[index].update(_dt);
            }
            return;
        };
        ObjectPool.prototype.setOnActiveFn = function (_fn, _context) {
            asserts_4.AssertFunction(_fn);
            this.m_on_active = _fn;
            if (_context != undefined) {
                this.m_on_active_context = _context;
            }
            return;
        };
        ObjectPool.prototype.setOnDesactiveFn = function (_fn, _context) {
            asserts_4.AssertFunction(_fn);
            this.m_on_desactive = _fn;
            if (_context != undefined) {
                this.m_on_desactive_context = _context;
            }
            return;
        };
        ObjectPool.prototype.get = function () {
            var element = null;
            if (this.hasDesactive()) {
                element = this.m_a_desactive[0];
                this._active(element);
                return element;
            }
            if (this.isFull()) {
                return element;
            }
            switch (this.m_type) {
                case OBJECT_POOL_TYPE.kDynamic:
                    element = this._create_element();
                    this._active(element);
                    return element;
                default:
                    return element;
            }
        };
        ObjectPool.prototype.desactive = function (_element) {
            var active_size = this.m_a_active.length;
            for (var index = 0; index < active_size; ++index) {
                if (this.m_a_active[index] == _element) {
                    this.m_a_active.splice(index, 1);
                    break;
                }
            }
            this.m_a_desactive.push(_element);
            _element.m_mx_active = false;
            _element.mxDesactive();
            if (this.m_on_desactive != undefined) {
                this.m_on_desactive.call(this.m_on_desactive_context, _element);
            }
            return;
        };
        ObjectPool.prototype.fill = function () {
            var element;
            while (!this.isFull()) {
                element = this._create_element();
                this.desactive(element);
            }
            return;
        };
        ObjectPool.prototype.hasDesactive = function () {
            return this.m_a_desactive.length > 0;
        };
        ObjectPool.prototype.isFull = function () {
            return this.m_size >= this.m_max_size;
        };
        ObjectPool.prototype.getSize = function () {
            return this.m_size;
        };
        ObjectPool.prototype.getMaxSize = function () {
            return this.m_max_size;
        };
        ObjectPool.prototype.getType = function () {
            return this.m_type;
        };
        /**
        * Safely destroys the object.
        */
        ObjectPool.prototype.destroy = function () {
            var obj;
            while (this.m_a_active.length) {
                obj = this.m_a_active.pop();
                obj.destroy();
            }
            this.m_a_active = null;
            while (this.m_a_desactive.length) {
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
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        ObjectPool.prototype._active = function (_element) {
            var desactive_size = this.m_a_desactive.length;
            for (var index = 0; index < desactive_size; ++index) {
                if (this.m_a_desactive[index] == _element) {
                    this.m_a_desactive.splice(index, 1);
                    break;
                }
            }
            this.m_a_active.push(_element);
            _element.m_mx_active = true;
            _element.mxActive();
            if (this.m_on_active != undefined) {
                this.m_on_active.call(this.m_on_active_context, _element);
            }
            return;
        };
        ObjectPool.prototype._create_element = function () {
            asserts_4.AssertFunction(this.m_create_fn);
            var element = this.m_create_fn.call(this.m_fn_create_context, this);
            this.m_size++;
            return element;
        };
        return ObjectPool;
    }());
    exports.ObjectPool = ObjectPool;
});
define("utilities/component/mxComponent", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxComponent = /** @class */ (function () {
        function MxComponent(_id) {
            this.m_id = _id;
            return;
        }
        MxComponent.setManager = function (_component, _mng) {
            _component.m_manager = _mng;
            return;
        };
        MxComponent.prototype.getID = function () {
            return this.m_id;
        };
        MxComponent.prototype.init = function () {
            return;
        };
        MxComponent.prototype.update = function (_dt) {
            return;
        };
        MxComponent.prototype.destroy = function () {
            this.m_manager = null;
            return;
        };
        return MxComponent;
    }());
    exports.MxComponent = MxComponent;
});
define("utilities/component/mxComponentMng", ["require", "exports", "utilities/component/mxComponent"], function (require, exports, mxComponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxComponentMng = /** @class */ (function () {
        function MxComponentMng() {
            this.m_component_map = new Map();
            return;
        }
        MxComponentMng.prototype.init = function () {
            this.m_component_map.forEach(function (_component) {
                _component.init();
                return;
            });
            return;
        };
        MxComponentMng.prototype.update = function (_dt) {
            this.m_component_map.forEach(function (_component) {
                _component.update(_dt);
                return;
            }, this);
            return;
        };
        MxComponentMng.prototype.addComponent = function (_component) {
            mxComponent_1.MxComponent.setManager(_component, this);
            this.m_component_map.set(_component.getID(), _component);
            return;
        };
        MxComponentMng.prototype.removeComponent = function (_id) {
            this.m_component_map.delete(_id);
            return;
        };
        MxComponentMng.prototype.hasComponent = function (_id) {
            return this.m_component_map.has(_id);
        };
        MxComponentMng.prototype.getComponent = function (_id) {
            if (this.m_component_map.has(_id)) {
                return this.m_component_map.get(_id);
            }
            else {
                return null;
            }
        };
        MxComponentMng.prototype.destroy = function () {
            this.m_component_map.forEach(function (_component) {
                _component.destroy();
            });
            this.m_component_map.clear();
            this.m_component_map = null;
            return;
        };
        return MxComponentMng;
    }());
    exports.MxComponentMng = MxComponentMng;
});
define("utilities/component/mxActor", ["require", "exports", "utilities/component/mxComponentMng"], function (require, exports, mxComponentMng_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxActor = /** @class */ (function () {
        function MxActor() {
            this.m_component_mg = new mxComponentMng_1.MxComponentMng();
            return;
        }
        MxActor.prototype.update = function (_dt) {
            this.m_component_mg.update(_dt);
            return;
        };
        MxActor.prototype.getComponentMng = function () {
            return this.m_component_mg;
        };
        MxActor.prototype.getComponent = function (_id) {
            return this.m_component_mg.getComponent(_id);
        };
        MxActor.prototype.destroy = function () {
            this.m_component_mg.destroy();
            return;
        };
        return MxActor;
    }());
    exports.MxActor = MxActor;
});
define("utilities/nodeMaps/nodeMap", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxNodeMap = /** @class */ (function () {
        function MxNodeMap(_width, _height) {
            this.m_width = _width;
            this.m_height = _height;
            return;
        }
        MxNodeMap.prototype.init = function () {
            return;
        };
        MxNodeMap.prototype.getWidth = function () {
            return this.m_width;
        };
        MxNodeMap.prototype.getHeight = function () {
            return this.m_height;
        };
        return MxNodeMap;
    }());
    exports.MxNodeMap = MxNodeMap;
});
define("utilities/nodes/mxNode", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxNode = /** @class */ (function () {
        function MxNode() {
            this.m_position = new Phaser.Math.Vector2(0, 0);
            return;
        }
        MxNode.prototype.setPosition = function (_position) {
            this.m_position = _position;
            return;
        };
        MxNode.prototype.getPosition = function () {
            return this.m_position;
        };
        return MxNode;
    }());
    exports.MxNode = MxNode;
});
define("utilities/nodes/mxCoord", ["require", "exports", "utilities/nodes/mxNode", "utilities/enum_commons"], function (require, exports, mxNode_1, enum_commons_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxCoord = /** @class */ (function (_super) {
        __extends(MxCoord, _super);
        function MxCoord() {
            var _this = _super.call(this) || this;
            _this.m_object = null;
            return _this;
        }
        MxCoord.SetObject = function (_coord, _object) {
            _coord.m_object = _object;
            return;
        };
        MxCoord.IsNull = function (_coord) {
            return _coord.m_object == null;
        };
        MxCoord.prototype.getObject = function () {
            return this.m_object;
        };
        MxCoord.prototype.attachUp = function (_node) {
            this.m_coord_up = _node;
            _node.m_coord_down = this.m_coord_up;
            return;
        };
        MxCoord.prototype.attachRight = function (_node) {
            this.m_coord_right = _node;
            _node.m_coord_left = this.m_coord_right;
            return;
        };
        MxCoord.prototype.attachLeft = function (_node) {
            this.m_coord_left = _node;
            _node.m_coord_right = this.m_coord_left;
            return;
        };
        MxCoord.prototype.attachDown = function (_node) {
            this.m_coord_down = _node;
            _node.m_coord_up = this.m_coord_down;
            return;
        };
        MxCoord.prototype.getCoord = function (_node) {
            switch (_node) {
                case enum_commons_1.Direction4.kUp:
                    return this.m_coord_up;
                case enum_commons_1.Direction4.kDown:
                    return this.m_coord_down;
                case enum_commons_1.Direction4.kLeft:
                    return this.m_coord_left;
                case enum_commons_1.Direction4.kRigh:
                    return this.m_coord_right;
                default:
                    return this.m_coord_left;
            }
        };
        return MxCoord;
    }(mxNode_1.MxNode));
    exports.MxCoord = MxCoord;
});
define("utilities/nodeMaps/coordMap", ["require", "exports", "utilities/nodeMaps/nodeMap", "utilities/nodes/mxCoord", "utilities/enum_commons"], function (require, exports, nodeMap_1, mxCoord_1, enum_commons_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxCoordMap = /** @class */ (function (_super) {
        __extends(MxCoordMap, _super);
        function MxCoordMap(_width, _heigth, _rotation) {
            var _this = _super.call(this, _width, _heigth) || this;
            ///////////////////////////////////
            // Init
            _this.m_a_objects = new Array();
            ////////////////////////////////////
            // Create an empty Grid
            var coord;
            var adyacent_coord;
            for (var row = 0; row < _heigth; ++row) {
                for (var col = 0; col < _width; ++col) {
                    coord = new mxCoord_1.MxCoord();
                    coord.setPosition(new Phaser.Math.Vector2(col, row));
                    // Up Attachment         
                    if (row > 0) {
                        adyacent_coord
                            = _this.m_a_objects[(_width * (row - 1)) + col];
                        coord.attachUp(adyacent_coord);
                    }
                    // Left Attachment
                    if (col > 0) {
                        adyacent_coord
                            = _this.m_a_objects[_this.m_a_objects.length - 1];
                        coord.attachLeft(adyacent_coord);
                    }
                    _this.m_a_objects.push(coord);
                }
            }
            if (_rotation == enum_commons_2.Rotation.kCW) {
                _this._continuityCW();
            }
            else {
                _this._continuityCCW();
            }
            return _this;
        }
        MxCoordMap.prototype.getCoord = function (_x, _y) {
            var index = (this.m_width * _y) + _x;
            if (index >= this.m_a_objects.length) {
                console.warn("MxCoordMap: Index out of Range");
                return new mxCoord_1.MxCoord();
            }
            return this.m_a_objects[index];
        };
        MxCoordMap.prototype.getObject = function (_x, _y) {
            var coord = this.getCoord(_x, _y);
            return coord.getObject();
        };
        MxCoordMap.prototype._continuityCW = function () {
            var coord;
            var ady_coord;
            ///////////////////////////////////
            // Up Attachment
            for (var index = 0; index < this.m_width; ++index) {
                coord = this.getCoord(index, 0);
                if (index == this.m_width - 1) {
                    ady_coord = this.getCoord(0, this.m_height - 1);
                }
                else {
                    ady_coord = this.getCoord(index + 1, this.m_height - 1);
                }
                coord.attachUp(ady_coord);
            }
            ///////////////////////////////////
            // Left Attachment
            for (var index = 0; index < this.m_height; ++index) {
                coord = this.getCoord(0, index);
                if (index == 0) {
                    ady_coord = this.getCoord(this.m_width - 1, this.m_height - 1);
                }
                else {
                    ady_coord = this.getCoord(this.m_width - 1, index - 1);
                }
                coord.attachLeft(ady_coord);
            }
            return;
        };
        MxCoordMap.prototype._continuityCCW = function () {
            var coord;
            var ady_coord;
            ///////////////////////////////////
            // Up Attachment
            for (var index = 0; index < this.m_width; ++index) {
                coord = this.getCoord(index, 0);
                if (index == 0) {
                    ady_coord = this.getCoord(this.m_width - 1, this.m_height - 1);
                }
                else {
                    ady_coord = this.getCoord(index - 1, this.m_height - 1);
                }
                coord.attachUp(ady_coord);
            }
            ///////////////////////////////////
            // Left Attachment
            for (var index = 0; index < this.m_height; ++index) {
                coord = this.getCoord(0, index);
                if (index == this.m_height - 1) {
                    ady_coord = this.getCoord(0, this.m_width - 1);
                }
                else {
                    ady_coord = this.getCoord(this.m_width - 1, index + 1);
                }
                coord.attachLeft(ady_coord);
            }
            return;
        };
        return MxCoordMap;
    }(nodeMap_1.MxNodeMap));
    exports.MxCoordMap = MxCoordMap;
});
define("utilities/nodeMaps/coordMapIterator", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxCoordMapIterator = /** @class */ (function () {
        function MxCoordMapIterator() {
        }
        MxCoordMapIterator.Create = function (_coord_map) {
            var coord_map_it = new MxCoordMapIterator();
            coord_map_it.m_coord_map = _coord_map;
            return coord_map_it;
        };
        MxCoordMapIterator.prototype.setPosition = function (_col, _row) {
            this.m_coord = this.m_coord_map.getCoord(_col, _row);
            return;
        };
        MxCoordMapIterator.prototype.getObject = function () {
            return this.m_coord.getObject();
        };
        MxCoordMapIterator.prototype.move = function (_direction) {
            this.m_coord = this.m_coord.getCoord(_direction);
            return;
        };
        return MxCoordMapIterator;
    }());
    exports.MxCoordMapIterator = MxCoordMapIterator;
});
define("utilities/nodes/mxBiNode", ["require", "exports", "utilities/nodes/mxNode"], function (require, exports, mxNode_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxBiNode = /** @class */ (function (_super) {
        __extends(MxBiNode, _super);
        function MxBiNode() {
            var _this = _super.call(this) || this;
            return _this;
        }
        MxBiNode.SetObject = function (_bi_node, _object) {
            _bi_node.m_object = _object;
            return;
        };
        MxBiNode.IsNull = function (_bi_node) {
            return _bi_node.m_object == null;
        };
        MxBiNode.prototype.getObject = function () {
            return this.m_object;
        };
        MxBiNode.prototype.attachNext = function (_bi_node) {
            this.m_next = _bi_node;
            _bi_node.m_previous = this;
            return;
        };
        MxBiNode.prototype.attachPrevious = function (_bi_node) {
            this.m_previous = _bi_node;
            _bi_node.m_next = this;
            return;
        };
        MxBiNode.prototype.dettachNext = function () {
            if (this.m_next != null) {
                this.m_next.m_previous = null;
            }
            this.m_next = null;
            return;
        };
        MxBiNode.prototype.dettachPrevious = function () {
            if (this.m_previous != null) {
                this.m_previous.m_next = null;
            }
            this.m_previous = null;
            return;
        };
        MxBiNode.prototype.getNext = function () {
            return this.m_next;
        };
        MxBiNode.prototype.getPrevious = function () {
            return this.m_previous;
        };
        return MxBiNode;
    }(mxNode_2.MxNode));
    exports.MxBiNode = MxBiNode;
});
define("utilities/nodes/mxListBiNode", ["require", "exports", "utilities/nodes/mxBiNode"], function (require, exports, mxBiNode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxListBiNode = /** @class */ (function () {
        function MxListBiNode() {
            this.m_begin = new mxBiNode_1.MxBiNode();
            this.m_end = new mxBiNode_1.MxBiNode();
            this.m_begin.attachNext(this.m_end);
            this.m_length = 0;
            return;
        }
        MxListBiNode.prototype.addEnd = function (_bi_node) {
            if (this._internalNode) {
                console.warn("Can't add an internal node.");
                return;
            }
            var last_element = this.m_end.getPrevious();
            this.m_end.dettachPrevious();
            this.m_end.attachPrevious(_bi_node);
            last_element.attachNext(_bi_node);
            this.m_length++;
            return;
        };
        MxListBiNode.prototype.addBeginning = function (_bi_node) {
            if (this._internalNode) {
                console.warn("Can't add an internal node.");
                return;
            }
            var first_element = this.m_begin.getNext();
            this.m_begin.dettachNext();
            this.m_begin.attachNext(_bi_node);
            first_element.attachPrevious(_bi_node);
            this.m_length++;
            return;
        };
        MxListBiNode.prototype.getNode = function (_idx) {
            return;
        };
        MxListBiNode.prototype.getFirst = function () {
            return this.m_begin.getNext();
        };
        MxListBiNode.prototype.getLast = function () {
            return this.m_end.getPrevious();
        };
        MxListBiNode.prototype.getLength = function () {
            return this.m_length;
        };
        MxListBiNode.prototype._internalNode = function (_bi_node) {
            return (this.m_begin == _bi_node || this.m_end == _bi_node);
        };
        return MxListBiNode;
    }());
    exports.MxListBiNode = MxListBiNode;
});
//# sourceMappingURL=gameBundle.js.map