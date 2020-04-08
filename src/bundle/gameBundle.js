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
define("utilities/fs/fs", ["require", "exports"], function (require, exports) {
    "use strict";
    var fs = /** @class */ (function () {
        function fs() {
        }
        fs.loadFile = function (filePath) {
            var result = null;
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", filePath, false);
            xmlhttp.send();
            if (xmlhttp.status == 200) {
                result = xmlhttp.responseText;
            }
            return result;
        };
        return fs;
    }());
    return fs;
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
define("utilities/fs/csv_reader", ["require", "exports", "utilities/fs/fs", "utilities/fs/csv_row", "utilities/fs/csv_file"], function (require, exports, fs, CSVRow, CSVFile) {
    "use strict";
    var CSVReader = /** @class */ (function () {
        function CSVReader() {
        }
        CSVReader.LoadFromFile = function (_path, _tsv) {
            if (_tsv === void 0) { _tsv = false; }
            var file_data = fs.loadFile(_path);
            if (file_data) {
                return this.GetCSV(file_data, _tsv);
            }
            return null;
        };
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
    var MANAGER_ID;
    (function (MANAGER_ID) {
        MANAGER_ID[MANAGER_ID["kGameManager"] = 0] = "kGameManager";
        MANAGER_ID[MANAGER_ID["kDataManager"] = 1] = "kDataManager";
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
define("game/managers/gameManager/gameManager", ["require", "exports", "utilities/managers/manager", "game/gameCommons", "game/managers/dataManager/dataManager"], function (require, exports, manager_2, gameCommons_2, dataManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GameManager = /** @class */ (function (_super) {
        __extends(GameManager, _super);
        function GameManager() {
            var _this = _super.call(this, gameCommons_2.MANAGER_ID.kGameManager) || this;
            // sets the default language.
            _this.m_localization = gameCommons_2.LOCALIZATION.kSpanish;
            // create DataManager instance.
            _this.m_data_mng = new dataManager_1.DataManager();
            return _this;
        }
        /**
         * Gets a reference to the game's dataManager.
         */
        GameManager.prototype.getDataManager = function () {
            return this.m_data_mng;
        };
        /**
         * Gets this game's localization identifer.
         */
        GameManager.prototype.getLocalization = function () {
            return this.m_localization;
        };
        /**
         * Sets the game's localization identifier.
         *
         * @param _localization Localization identifier.
         */
        GameManager.prototype.setLocalization = function (_localization) {
            this.m_localization = _localization;
            return;
        };
        /**
        * Safely destroys the object.
        */
        GameManager.prototype.destroy = function () {
            this.m_data_mng.destroy();
            return;
        };
        return GameManager;
    }(manager_2.Manager));
    exports.GameManager = GameManager;
});
define("scenes/preloader", ["require", "exports", "utilities/managers/masterManager", "utilities/fs/csv_reader", "game/gameCommons"], function (require, exports, masterManager_1, CSVReader, gameCommons_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Preloader = /** @class */ (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Preloader.prototype.preload = function () {
            ///////////////////////////////////
            // CSV Data
            var game_mng = masterManager_1.MasterManager.GetInstance().getManager(gameCommons_3.MANAGER_ID.kGameManager);
            var data_mng = game_mng.getDataManager();
            var csv_file = CSVReader.LoadFromFile('src/assets/csv_files/Mimi_k_data - game_texts.tsv', true);
            var num_rows = csv_file.rows.length;
            var row;
            // Sets the column that has the text.
            // 1 : Spanish
            // 2 : English
            var text_column_index = (game_mng.getLocalization() == gameCommons_3.LOCALIZATION.kSpanish ? 1 : 2);
            for (var index = 0; index < num_rows; ++index) {
                row = csv_file.rows[index];
                data_mng.add(row.cells[0], row.cells[text_column_index]);
            }
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
            ///////////////////////////////////
            // Loading Bar
            /*
            let mid_v = this.game.canvas.height * 0.5;
            let mid_h = this.game.canvas.width * 0.5;
    
            let loading_text = this.add.sprite
            (
                mid_h,
                mid_v - 120,
                'loader_set',
                'text.png'
            );
    
            // loading background
            let bar_bckg = this.add.sprite
            (
                mid_h,
                mid_v,
                'loader_set',
                'bg.png'
            );
    
            bar_bckg.setOrigin(0,0.5);
            bar_bckg.x -= bar_bckg.width * 0.5;
            
            this.m_bck_offset = 20;
            this.m_max_size = bar_bckg.width - (this.m_bck_offset * 2);
    
             // nineslice bar
             this.m_loading_bar = this.add.nineslice
             (
                bar_bckg.x + this.m_bck_offset,
                bar_bckg.y,
                 136,
                 61,
                 {key : 'loader_set', frame: 'barg.png'},
                 [2,65,2]
             );
            this.m_loading_bar.setOrigin(0,0.5);
    */
            // Callbacks
            this.load.on('complete', this.onLoadComplete, this);
            this.load.on('progress', this.onProgress, this);
            return;
        };
        Preloader.prototype.onProgress = function (_value) {
            /*
            let new_size = this.m_max_size * _value;
            if(new_size > 136)
            {
                this.m_loading_bar.resize(this.m_max_size * _value, 61);
            }
            */
            return;
        };
        Preloader.prototype.onLoadComplete = function () {
            this.scene.start('mainMenu');
            return;
        };
        Preloader.prototype.loadCSVFile = function (_file) {
        };
        return Preloader;
    }(Phaser.Scene));
    exports.Preloader = Preloader;
});
define("scenes/boot", ["require", "exports", "utilities/managers/masterManager", "game/managers/gameManager/gameManager"], function (require, exports, masterManager_2, gameManager_1) {
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
            return;
        };
        Boot.prototype.create = function () {
            /**
             * Fit the game canvas to parent container.
             */
            this.game.scale.scaleMode = Phaser.Scale.ScaleModes.FIT;
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
                // TODO
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
define("scenes/menus/mainMenu", ["require", "exports", "scenes/BaseScene", "game/ui/cloud_popup", "game/gameCommons"], function (require, exports, BaseScene_1, cloud_popup_1, gameCommons_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MainMenu = /** @class */ (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainMenu.prototype.create = function () {
            _super.prototype.create.call(this);
            // gets the Game Manager.
            this.m_game_manager
                = this.m_master.getManager(gameCommons_4.MANAGER_ID.kGameManager);
            // gets the DataManager from GameManager.
            this.m_data_mng = this.m_game_manager.getDataManager();
            // Create the cloud poupup.
            this.m_cloud_popup = new cloud_popup_1.CloudPopup(this);
            this.m_cloud_popup.setMaxWidth(800);
            this.m_cloud_popup.setPosition(this.game.canvas.width * 0.5, this.game.canvas.height * 0.5);
            // display first tip.
            this.m_tip_num = 0;
            this.nextTip();
            // Tip Testing button.
            this.createButton(this.game.canvas.width * 0.5, this.game.canvas.height * 0.2, "Next Tip", this.nextTip, this);
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
        MainMenu.prototype.createButton = function (_x, _y, _label, _fn, _context) {
            var button = this.add.nineslice(_x, _y, 145, 145, { key: 'main_menu', frame: 'button_bg.png' }, [70, 70, 70, 70]);
            button.resize(500, 145);
            button.setOrigin(0.5, 0.5);
            button.setInteractive();
            button.on('pointerdown', _fn, _context);
            var label = this.add.text(_x, _y, _label, { fontFamily: '"Roboto Condensed"' });
            label.setFontSize(50);
            label.setColor('black');
            label.setOrigin(0.5, 0.5);
            return;
        };
        return MainMenu;
    }(BaseScene_1.BaseScene));
    exports.MainMenu = MainMenu;
});
define("scenes/localization", ["require", "exports", "utilities/managers/masterManager", "game/gameCommons"], function (require, exports, masterManager_4, gameCommons_5) {
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
            var game_mng = masterManager_4.MasterManager.GetInstance().getManager(gameCommons_5.MANAGER_ID.kGameManager);
            game_mng.setLocalization(gameCommons_5.LOCALIZATION.kEnglish);
            // TODO: start preload scene.
            this.scene.start('preloader');
            return;
        };
        LocalizationScene.prototype._onClick_spanish = function () {
            var game_mng = masterManager_4.MasterManager.GetInstance().getManager(gameCommons_5.MANAGER_ID.kGameManager);
            game_mng.setLocalization(gameCommons_5.LOCALIZATION.kSpanish);
            // TODO: start preload scene.
            this.scene.start('preloader');
            return;
        };
        return LocalizationScene;
    }(Phaser.Scene));
    exports.LocalizationScene = LocalizationScene;
});
define("game_init", ["require", "exports", "scenes/preloader", "scenes/boot", "scenes/menus/mainMenu", "phaser3-nineslice", "scenes/localization"], function (require, exports, preloader_1, boot_1, mainMenu_1, phaser3_nineslice_1, localization_1) {
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
define("scenes/levels/testing/test_level_tiled", ["require", "exports", "scenes/BaseScene"], function (require, exports, BaseScene_2) {
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
    }(BaseScene_2.BaseScene));
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
define("utilities/mxObjectPool", ["require", "exports", "utilities/asserts"], function (require, exports, asserts_2) {
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
            asserts_2.AssertFunction(_create_fn);
            asserts_2.AssertNumber(_max);
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
            asserts_2.AssertFunction(_fn);
            this.m_on_active = _fn;
            if (_context != undefined) {
                this.m_on_active_context = _context;
            }
            return;
        };
        ObjectPool.prototype.setOnDesactiveFn = function (_fn, _context) {
            asserts_2.AssertFunction(_fn);
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
            asserts_2.AssertFunction(this.m_create_fn);
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