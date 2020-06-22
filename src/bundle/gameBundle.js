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
define("utilities/mxUUID", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxUUID = /** @class */ (function () {
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        function MxUUID() {
            this.m_id = "";
            return;
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        MxUUID.Create = function () {
            var id = new MxUUID();
            id.m_id = Phaser.Utils.String.UUID();
            return id;
        };
        MxUUID.CreateFrom = function (_mxid) {
            var id = new MxUUID();
            id.m_id = _mxid.m_id;
            return id;
        };
        MxUUID.prototype.get_uuid_string = function () {
            return this.m_id;
        };
        MxUUID.prototype.compare = function (_id) {
            return this.m_id == _id.m_id;
        };
        return MxUUID;
    }());
    exports.MxUUID = MxUUID;
});
define("utilities/gameObjects/mxUObject", ["require", "exports", "utilities/mxUUID"], function (require, exports, mxUUID_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxUObject = /** @class */ (function () {
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function MxUObject() {
            this._m_uuid = mxUUID_1.MxUUID.Create();
            return;
        }
        /**
         * Gets this object's unique identifier object.
         */
        MxUObject.prototype.getUUID = function () {
            return this._m_uuid;
        };
        MxUObject.prototype.get_uuid_string = function () {
            return this._m_uuid.get_uuid_string();
        };
        /**
        * Safely destroys the object.
        */
        MxUObject.prototype.destroy = function () {
            this._m_uuid = null;
            return;
        };
        return MxUObject;
    }());
    exports.MxUObject = MxUObject;
});
define("utilities/component/mxComponent", ["require", "exports", "utilities/gameObjects/mxUObject"], function (require, exports, mxUObject_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxComponent = /** @class */ (function (_super) {
        __extends(MxComponent, _super);
        function MxComponent(_id) {
            var _this = _super.call(this) || this;
            _this._m_id = _id;
            return _this;
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        MxComponent.Prepare = function () {
            if (MxComponent._NULL_OBJECT == null
                || MxComponent._NULL_OBJECT == undefined) {
                this._NULL_OBJECT = new MxComponent(-1);
            }
            return;
        };
        MxComponent.Shutdown = function () {
            if (typeof MxComponent._NULL_OBJECT == 'object') {
                this._NULL_OBJECT.destroy();
                this._NULL_OBJECT = null;
            }
            return;
        };
        MxComponent.IsNull = function (_object) {
            var uuid = _object.getUUID();
            return uuid.compare(MxComponent._NULL_OBJECT.getUUID());
        };
        MxComponent.GetNull = function () {
            return this._NULL_OBJECT;
        };
        MxComponent.prototype.get_id = function () {
            return this._m_id;
        };
        MxComponent.prototype.init = function (_actor) {
            return;
        };
        MxComponent.prototype.update = function (_actor) {
            return;
        };
        MxComponent.prototype.receive = function (_id, _data) {
            return;
        };
        MxComponent.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            return;
        };
        return MxComponent;
    }(mxUObject_1.MxUObject));
    exports.MxComponent = MxComponent;
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
    function AssertObject(_input) {
        if (typeof _input === 'object')
            return;
        else
            throw new Error('Input must be an object.');
    }
    exports.AssertObject = AssertObject;
    function AssertBoolean(_input) {
        if (typeof _input === 'boolean')
            return;
        else
            throw new Error('Input must be a boolean.');
    }
    exports.AssertBoolean = AssertBoolean;
    function AssertPositiveNoNZeroNumber(_number) {
        if (_number <= 0) {
            throw new Error('Number cant has a negative or zero value');
        }
        return;
    }
    exports.AssertPositiveNoNZeroNumber = AssertPositiveNoNZeroNumber;
});
define("utilities/enum_commons", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OPRESULT;
    (function (OPRESULT) {
        OPRESULT[OPRESULT["kUndefined"] = -1] = "kUndefined";
        OPRESULT[OPRESULT["kFail"] = 0] = "kFail";
        OPRESULT[OPRESULT["kOk"] = 1] = "kOk";
        OPRESULT[OPRESULT["kFile_not_found"] = 2] = "kFile_not_found";
        OPRESULT[OPRESULT["kObject_not_found"] = 3] = "kObject_not_found";
        OPRESULT[OPRESULT["kIncompatible_format"] = 4] = "kIncompatible_format";
        OPRESULT[OPRESULT["kNull_Object"] = 5] = "kNull_Object";
        OPRESULT[OPRESULT["kInvalid_parameter"] = 6] = "kInvalid_parameter";
        OPRESULT[OPRESULT["kObject_already_exists"] = 7] = "kObject_already_exists";
        OPRESULT[OPRESULT["kCount"] = 8] = "kCount";
    })(OPRESULT = exports.OPRESULT || (exports.OPRESULT = {}));
});
define("utilities/component/mxComponentMng", ["require", "exports", "utilities/component/mxComponent", "utilities/asserts", "utilities/enum_commons"], function (require, exports, mxComponent_1, asserts_1, enum_commons_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxComponentMng = /** @class */ (function () {
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * Creates a MxComponentMng with no MxComponent and a Null Object of MxActor.
         */
        function MxComponentMng() {
            this.m_component_map = new Map();
            this._m_actor = null;
            return;
        }
        /**
         * Sets the MxActor who this MxComponentMng belongs.
         *
         * @param _actor {MxActor} MxActor who this MxComponent belongs.
         */
        MxComponentMng.prototype.setActor = function (_actor) {
            this._m_actor = _actor;
            return;
        };
        /**
         * Initialize each MxComponent that this MxComponent has.
         */
        MxComponentMng.prototype.init = function () {
            this.m_component_map.forEach(function (_component) {
                _component.init(this._m_actor);
                return;
            }, this);
            return;
        };
        /**
         * Update each MxComponent that this MxComponentMng has.
         */
        MxComponentMng.prototype.update = function () {
            this.m_component_map.forEach(function (_component) {
                _component.update(this._m_actor);
                return;
            }, this);
            return;
        };
        MxComponentMng.prototype.sendMessage = function (_id, _data) {
            this.m_component_map.forEach(function (_component) {
                _component.receive(_id, _data);
                return;
            }, this);
            return;
        };
        /**
         * Adds a MxComponent to this MxComponentMng.
         *
         * @param _component
         */
        MxComponentMng.prototype.addComponent = function (_component) {
            if (this.m_component_map.has(_component.get_id())) {
                return enum_commons_1.OPRESULT.kObject_already_exists;
            }
            this.m_component_map.set(_component.get_id(), _component);
            return enum_commons_1.OPRESULT.kOk;
        };
        /**
         * Remove a MxComponent from this MxComponentMng by its identifier.
         *
         * @param _id
         */
        MxComponentMng.prototype.removeComponent = function (_id) {
            this.m_component_map.delete(_id);
            return;
        };
        MxComponentMng.prototype.getComponentsWithTag = function (_tag) {
            asserts_1.AssertNumber(_tag);
            var a_cmp = new Array();
            this.m_component_map.forEach(function (_component) {
                if (_component.m_tag == null || _component.m_tag === undefined) {
                    return;
                }
                if (_component.m_tag == _tag) {
                    a_cmp.push(_component);
                }
                return;
            }, this);
            return a_cmp;
        };
        MxComponentMng.prototype.removeComponentsWithTag = function (_tag) {
            var a_toRemove = this.getComponentsWithTag(_tag);
            while (a_toRemove.length) {
                this.removeComponent(a_toRemove.pop().get_id());
            }
            return;
        };
        /**
         * Check if this MxComponentMng has a MxComponent by its identifier.
         *
         * @param _id
         */
        MxComponentMng.prototype.hasComponent = function (_id) {
            return this.m_component_map.has(_id);
        };
        /**
         * Gets a MxComponent from this manager. The template feature allows to
         * get the component to a specific MxComponent subclass.
         *
         * @param _id MxComponent's identifier.
         */
        MxComponentMng.prototype.getComponent = function (_id) {
            if (this.m_component_map.has(_id)) {
                return this.m_component_map.get(_id);
            }
            else {
                return mxComponent_1.MxComponent.GetNull();
            }
        };
        /**
         * Removes all the components from this MxComponentManager.
         */
        MxComponentMng.prototype.clear = function () {
            this.m_component_map.clear();
            return;
        };
        /**
         * Safely destroys this object.
         */
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
define("utilities/data/mxChildrenManager", ["require", "exports", "utilities/enum_commons"], function (require, exports, enum_commons_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This class manage a group of objects, basically is a
     * Map with the object's uuid as its key value.
     */
    var MxChildrenManager = /** @class */ (function () {
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * Creates a new MxChildrenManager with no children.
         */
        function MxChildrenManager() {
            this._children_map = new Map();
            return;
        }
        /**
         *
         * @param _fn
         * @param _context
         */
        MxChildrenManager.prototype.forEach = function (_fn, _context) {
            this._children_map.forEach(_fn, _context);
            return;
        };
        /**
         * Adds a new child to this MxChildrenManager.
         *
         * @param _child {T} Child to be added.
         *
         * @returns {OPRESULT}
         */
        MxChildrenManager.prototype.add = function (_child) {
            if (this._children_map.has(_child.get_id())) {
                return enum_commons_2.OPRESULT.kObject_already_exists;
            }
            this._children_map.set(_child.get_id(), _child);
            return enum_commons_2.OPRESULT.kOk;
        };
        /**
         * Check if an object already exists in this MxChildrenManager.
         */
        MxChildrenManager.prototype.exists = function (_id) {
            return this._children_map.has(_id);
        };
        /**
         * Gets a child from this MxChildrenManager.
         *
         * @param _id
         */
        MxChildrenManager.prototype.getChild = function (_id) {
            return this._children_map.get(_id);
        };
        /**
         * Remove a children from this MxChildrenManager. This method
         * doesn't destroy the children.
         *
         * @param _child
         */
        MxChildrenManager.prototype.remove = function (_child) {
            ///////////////////////////////////
            // Remove from the ID's Map
            var id = _child.get_id();
            if (this._children_map.has(id)) {
                this._children_map.delete(id);
            }
            return;
        };
        /**
         * Removes a child by its id.
         * @param _id
         */
        MxChildrenManager.prototype.remove_by_id = function (_id) {
            var to_remove = null;
            if (this._children_map.has(_id)) {
                to_remove = this._children_map.get(_id);
                this._children_map.delete(_id);
            }
            return to_remove;
        };
        /**
         * Clear this MxChildrenManager. This method doesn't destroy the
         * children.
         */
        MxChildrenManager.prototype.clear = function () {
            this._children_map.clear();
            return;
        };
        /**
         * Destroys the MxChildrenManager's children.
         */
        MxChildrenManager.prototype.destroyChildren = function () {
            this._children_map.forEach(this._destroyChild, this);
            this.clear();
            return;
        };
        /**
        * Safely destroys the object.
        */
        MxChildrenManager.prototype.destroy = function () {
            this.destroyChildren();
            this.clear();
            return;
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        MxChildrenManager.prototype._destroyChild = function (_child) {
            _child.destroy();
            return;
        };
        return MxChildrenManager;
    }());
    exports.MxChildrenManager = MxChildrenManager;
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
        ObjectPool.CreateStatic = function (_a_elements, _init_fn, _context) {
            var pool = new ObjectPool();
            pool.m_a_active = new Array();
            pool.m_a_desactive = new Array();
            pool.m_type = OBJECT_POOL_TYPE.kStatic;
            pool.m_max_size = _a_elements.length;
            pool.m_size = _a_elements.length;
            for (var index = 0; index < pool.m_size; ++index) {
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
        };
        ObjectPool.prototype.update = function () {
            for (var index = 0; index < this.m_a_active.length; ++index) {
                this.m_a_active[index].update();
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
define("game/gameCommons", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MANAGER_ID = Object.freeze({
        kMaster: 1,
        kGameManager: 2,
        kDataManager: 3,
        kChronoManager: 4
    });
    exports.LOCALIZATION = Object.freeze({
        KSpanish: 1,
        kEnglish: 2
    });
    exports.CLOCK_STYLE = Object.freeze({
        kSand: 0,
        kDigital: 1,
        kAnalog: 2,
        kCount: 3
    });
    exports.COMPONENT_ID = Object.freeze({
        kChronoController: 1,
        kMasterController: 2,
        kGameController: 3,
        kDataController: 4,
        kSprite: 5,
        kNineSlice: 6,
        kText: 7,
        kPopupController: 8,
        kNineSliceButton: 9,
        kCarouselController: 10,
        kBitmapText: 11,
        kClockController: 12,
        kDigitalClockController: 13,
        kGraphicsComponent: 14,
        kAnalogClockController: 15,
        kSandClockController: 16,
        kShaderComponent: 17,
        kBackgroundShaderComponent: 18,
        kAlertPopupController: 19,
        kBaseSoundManager: 20,
        kCarouselSound: 21,
        kClockSound: 22
    });
    exports.MESSAGE_ID = Object.freeze({
        kOnAgentActive: 1,
        kOnAgentDesactive: 2,
        kClockPaused: 3,
        kClockResumed: 4,
        kClockReset: 5,
        kPlaySound: 6,
        kTimeOut: 7,
        kButtonDown: 8,
        kClockTimeOut: 7,
        kClockTenSecondsAlert: 8
    });
    exports.CAROUSEL_CHILD_ID = Object.freeze({
        kTitle: 1,
        kPreview: 2,
        kLeftButton: 3,
        kRightButton: 4,
        kClockName: 5,
        kPreviewBackground: 6
    });
    exports.SAND_CLOCK_PART_ID = Object.freeze({
        kUpperMask: 0,
        kUpperTexture: 1,
        kLowerMask: 2,
        kLowerTexture: 3,
        kClockTexture: 4
    });
    ///////////////////////////////////
    // Game Sounds
    var MimiKSounds = /** @class */ (function () {
        function MimiKSounds() {
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        MimiKSounds.kMimiKAudioSprite = "mimik_sounds";
        // Se escucha muy bajito.
        MimiKSounds.kTicTocSand = "tictoc_arena";
        MimiKSounds.kTicTocDigital = "tictoc_digital";
        MimiKSounds.kTicTocAnalog = "tictoc_analogo";
        MimiKSounds.kButtonTip = "tip_button";
        MimiKSounds.kButtonReset = "reset_button";
        MimiKSounds.kButtonPause = "pause_button";
        MimiKSounds.kButtonCarousel = "carrusel_button";
        MimiKSounds.kMettaIntro = "metta_intro";
        MimiKSounds.kAlertLastSecond = "last_second_alert";
        MimiKSounds.kAlertFinal = "final_alert";
        MimiKSounds.kBackgroundVoice = "landpage_snd";
        MimiKSounds.kBackgroundInstrumental = "snd_music_loop";
        return MimiKSounds;
    }());
    exports.MimiKSounds = MimiKSounds;
});
define("utilities/component/mxActor", ["require", "exports", "utilities/component/mxComponentMng", "utilities/gameObjects/mxUObject", "utilities/data/mxChildrenManager", "utilities/enum_commons", "game/gameCommons"], function (require, exports, mxComponentMng_1, mxUObject_2, mxChildrenManager_1, enum_commons_3, gameCommons_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxActor = /** @class */ (function (_super) {
        __extends(MxActor, _super);
        /****************************************************/
        /* Protected                                        */
        /****************************************************/
        function MxActor() {
            var _this = _super.call(this) || this;
            _this._m_position = new Phaser.Geom.Point(0.0, 0.0);
            _this._m_relative_position = new Phaser.Geom.Point(0.0, 0.0);
            _this.m_direction = new Phaser.Math.Vector2(1.0, 0.0);
            _this._m_component_mg = new mxComponentMng_1.MxComponentMng();
            _this._m_component_mg.setActor(_this);
            return _this;
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * Prepare the Master Manager and NullObject.
         */
        MxActor.Prepare = function () {
            if (MxActor._NULL_OBJECT === undefined
                || MxActor._NULL_OBJECT == null) {
                ///////////////////////////////////
                // Null Object
                MxActor._NULL_OBJECT = new MxActor();
                MxActor._NULL_OBJECT._m_id = -1;
                MxActor._NULL_OBJECT._m_tag = -1;
                MxActor._NULL_OBJECT._m_parent = MxActor._NULL_OBJECT;
            }
            return;
        };
        /**
         * Shutdown Null Object.
         */
        MxActor.Shutdown = function () {
            if (typeof MxActor._NULL_OBJECT == 'object') {
                this._NULL_OBJECT.destroy();
                this._NULL_OBJECT = null;
            }
            return;
        };
        /**
        * Check if the given object is the Null Object.
        */
        MxActor.IsNull = function (_obj) {
            var _obj_uuid = _obj.getUUID();
            return this._NULL_OBJECT.getUUID().compare(_obj_uuid);
        };
        /**
         * Get Object Null.
         */
        MxActor.GetNull = function () {
            return this._NULL_OBJECT;
        };
        /**
         * Creates a new MxActors.
         *
         * @param _id MxActor identifier.
         * @param _m_parent MxActor's parent.
         */
        MxActor.Create = function (_id, _m_parent) {
            var actor = new MxActor();
            actor._m_children_manager = new mxChildrenManager_1.MxChildrenManager();
            actor._m_id = _id;
            actor._m_tag = -1;
            if (typeof _m_parent == 'object') {
                if (_m_parent.addChild(actor) != enum_commons_3.OPRESULT.kOk) {
                    actor._m_parent = MxActor.GetNull();
                }
            }
            else {
                actor._m_parent = MxActor.GetNull();
            }
            actor.setRelativePosition(0, 0);
            return actor;
        };
        /**
         * Creates a child of this MxActor. This method will returns
         * a Null Object if the parent already has a MxActor with the same
         * identifier.
         *
         * @param _id {number} MxManager identifier.
         */
        MxActor.prototype.create = function (_id) {
            var actor = MxActor.Create(_id, this);
            if (this._m_children_manager.add(actor) != enum_commons_3.OPRESULT.kOk) {
                actor.destroy();
                return MxActor.GetNull();
            }
            actor._m_parent = this;
            return actor;
        };
        MxActor.prototype.addChild = function (_child) {
            if (this._m_children_manager.exists(_child.get_id())) {
                return enum_commons_3.OPRESULT.kObject_already_exists;
            }
            var result = this._m_children_manager.add(_child);
            if (result == enum_commons_3.OPRESULT.kOk) {
                _child._m_parent = this;
            }
            return result;
        };
        MxActor.prototype.init = function () {
            this._m_component_mg.init();
            this._m_children_manager.forEach(function (_actor) {
                _actor.init();
            });
            return;
        };
        /**
         * Update MxActor's components.
         */
        MxActor.prototype.update = function () {
            this.updatePosition();
            this._m_component_mg.update();
            this._m_children_manager.forEach(this._update_child);
            return;
        };
        /**
         * Get this MxActor's MxComponentManager.
         */
        MxActor.prototype.getComponentMng = function () {
            return this._m_component_mg;
        };
        MxActor.prototype.addComponent = function (_component) {
            return this._m_component_mg.addComponent(_component);
        };
        /**
         * Get this MxActor's MxComponent.
         * @param _id
         */
        MxActor.prototype.getComponent = function (_id) {
            return this._m_component_mg.getComponent(_id);
        };
        /**
         * Clears de MxComponentManager.
         */
        MxActor.prototype.clearComponentManager = function () {
            this._m_component_mg.clear();
            return;
        };
        MxActor.prototype.setRelativePosition = function (_x, _y) {
            this._m_relative_position.x = _x;
            this._m_relative_position.y = _y;
            this.updatePosition();
            return;
        };
        MxActor.prototype.updatePosition = function () {
            if (!MxActor.IsNull(this._m_parent)) {
                this._m_position.x = this._m_parent._m_position.x + this._m_relative_position.x;
                this._m_position.y = this._m_parent._m_position.y + this._m_relative_position.y;
            }
            else {
                this._m_position.x = this._m_relative_position.x;
                this._m_position.y = this._m_relative_position.y;
            }
            return;
        };
        /**
         * Sends a message to this MxActor's component.
         *
         * @param _id Message identifier.
         * @param _data Message data.
         * @param _recursive Send the message to the the MxActor's childrens.
         */
        MxActor.prototype.sendMessage = function (_id, _data, _recursive) {
            if (_recursive === void 0) { _recursive = false; }
            this._m_component_mg.sendMessage(_id, _data);
            if (_recursive) {
                this.sendMessage_to_children(_id, _data);
            }
            return;
        };
        /**
         * Sends a message to this MxActor's children.
         *
         * @param _id Message identifier.
         * @param _data Message data.
         */
        MxActor.prototype.sendMessage_to_children = function (_id, _data) {
            this._m_children_manager.forEach(function (_child) {
                _child.sendMessage(_id, _data, true);
            });
            return;
        };
        /**
         * Safely destroys this MxActor, children will be destroyed too.
         */
        MxActor.prototype.destroy = function () {
            this._m_children_manager.destroy();
            this._m_component_mg.destroy();
            _super.prototype.destroy.call(this);
            return;
        };
        /**
         * Removes a child by its identifier.
         *
         * @param _id MxManager identifier.
         */
        MxActor.prototype.remove_child_by_id = function (_id) {
            var to_remove = this._m_children_manager.remove_by_id(_id);
            if (to_remove == null) {
                to_remove = MxActor.GetNull();
            }
            return to_remove;
        };
        /**
         * Removes a child from this MxManager.
         *
         * @param _manager
         */
        MxActor.prototype.remove_child = function (_manager) {
            this._m_children_manager.remove(_manager);
            return;
        };
        /**
         * Gets a child by its identifier.
         *
         * @param _id MxManager identifier.
         */
        MxActor.prototype.get_child = function (_id) {
            if (typeof this._m_children_manager == 'object') {
                if (this._m_children_manager.exists(_id)) {
                    return this._m_children_manager.getChild(_id);
                }
            }
            return MxActor.GetNull();
        };
        /**
         * Gets this actor's identifier.
         */
        MxActor.prototype.get_id = function () {
            return this._m_id;
        };
        MxActor.prototype.mxActive = function () {
            this.sendMessage(gameCommons_1.MESSAGE_ID.kOnAgentActive, null, true);
            return;
        };
        MxActor.prototype.mxDesactive = function () {
            this.sendMessage(gameCommons_1.MESSAGE_ID.kOnAgentDesactive, null, true);
            return;
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        MxActor.prototype._update_child = function (_actor) {
            _actor.update();
            return;
        };
        return MxActor;
    }(mxUObject_2.MxUObject));
    exports.MxActor = MxActor;
});
define("game/managers/masteManager/masterManager", ["require", "exports", "utilities/component/mxActor", "game/gameCommons"], function (require, exports, mxActor_1, gameCommons_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MasterManager = /** @class */ (function () {
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        function MasterManager() {
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        MasterManager.Prepare = function () {
            if (this._INSTANCE != null) {
                return;
            }
            this._INSTANCE = mxActor_1.MxActor.Create(gameCommons_2.MANAGER_ID.kMaster);
            // TODO
            return;
        };
        MasterManager.ShutDown = function () {
            if (this._INSTANCE != null) {
                this._INSTANCE.destroy();
                this._INSTANCE = null;
            }
            return;
        };
        MasterManager.GetInstance = function () {
            return this._INSTANCE;
        };
        MasterManager._INSTANCE = null;
        return MasterManager;
    }());
    exports.MasterManager = MasterManager;
});
define("game/managers/userPreferences/userPreferences", ["require", "exports", "game/gameCommons"], function (require, exports, gameCommons_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This class is only for
     */
    var UserPreferences = /** @class */ (function () {
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function UserPreferences() {
            this.m_localization = gameCommons_3.LOCALIZATION.KSpanish;
            this.m_clock_style = gameCommons_3.CLOCK_STYLE.kSand;
            this.chrono_value = 1;
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
define("utilities/listeners/mxListener", ["require", "exports", "utilities/asserts"], function (require, exports, asserts_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxListener = /** @class */ (function () {
        function MxListener(_listener, _context) {
            asserts_3.AssertFunction(_listener);
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
define("game/managers/gameManager/components/gameController", ["require", "exports", "utilities/component/mxComponent", "game/gameCommons", "game/managers/userPreferences/userPreferences", "utilities/listeners/mxListenerManager", "utilities/listeners/mxListener"], function (require, exports, mxComponent_2, gameCommons_4, userPreferences_1, mxListenerManager_1, mxListener_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GameController = /** @class */ (function (_super) {
        __extends(GameController, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function GameController() {
            var _this = _super.call(this, gameCommons_4.COMPONENT_ID.kGameController) || this;
            return _this;
        }
        GameController.prototype.init = function (_actor) {
            this._m_user_preferences = new userPreferences_1.UserPreferences();
            this._m_events = new mxListenerManager_1.MxListenerManager();
            this._m_events.addEvent('timeout');
            return;
        };
        GameController.prototype.update = function (_actor) {
            return;
        };
        GameController.prototype.destroy = function () {
            this._m_user_preferences.destroy();
            return;
        };
        /**
         * Events: 'timeout'
         *
         * @param _event
         * @param _fn
         * @param _context
         */
        GameController.prototype.on = function (_event, _fn, _context) {
            this._m_events.addListener(_event, new mxListener_1.MxListener(_fn, _context));
            return;
        };
        /**
         * Trigger the timeout event.
         */
        GameController.prototype.timeout = function () {
            this._m_events.call('timeout');
            return;
        };
        /**
         * Gets this game's localization identifer.
         */
        GameController.prototype.getLocalization = function () {
            return this._m_user_preferences.getLocalization();
        };
        /**
         * Sets the game's localization identifier.
         *
         * @param _localization Localization identifier.
         */
        GameController.prototype.setLocalization = function (_localization) {
            this._m_user_preferences.setLocalization(_localization);
            return;
        };
        return GameController;
    }(mxComponent_2.MxComponent));
    exports.GameController = GameController;
});
define("utilities/fs/csv_row", ["require", "exports", "utilities/gameObjects/mxUObject", "utilities/fs/csv_file", "utilities/asserts"], function (require, exports, mxUObject_3, csv_file_1, asserts_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CSVRow = /** @class */ (function (_super) {
        __extends(CSVRow, _super);
        function CSVRow(_csv_file) {
            var _this = _super.call(this) || this;
            _this._m_a_cells = new Array();
            _this._m_a_csv_file = _csv_file;
            return _this;
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        CSVRow.GetNull = function () {
            if (CSVRow._NULL_OBJ == null || CSVRow === undefined) {
                CSVRow._NULL_OBJ = new CSVRow(csv_file_1.CSVFile.GetNull());
            }
            return CSVRow._NULL_OBJ;
        };
        CSVRow.IsNull = function (_row) {
            var null_id = CSVRow.GetNull().getUUID();
            var param_id = _row.getUUID();
            return param_id.compare(null_id);
        };
        /**
         * Gets the value of one of this Row's cell.
         * Returns an empty string if it doesn't has the required cell.
         *
         * @param _index {string | number} Index can be the header's name or the cell's index.
         */
        CSVRow.prototype.getCell = function (_index) {
            if (_index === undefined || _index == null) {
                console.warn("CSVRow: null or undefined parameter.");
                return "";
            }
            if (typeof _index === 'number') {
                if (this._validate_idx(_index)) {
                    return this._m_a_cells[_index];
                }
            }
            else if (typeof _index === 'string') {
                var array_index = this._m_a_csv_file.getHeaderIdx(_index);
                if (this._validate_idx(array_index)) {
                    return this._m_a_cells[array_index];
                }
            }
            return "";
        };
        /**
         * Adds a new cell to this row.
         * @param _data {string} New cell's data.
         */
        CSVRow.prototype.addCell = function (_data) {
            this._m_a_cells.push(_data);
            return;
        };
        /**
         * Adds multiple cells from raw data.
         *
         * @param _data {string} cells raw data.
         * @param _delimiter {char} Delimiter character for cells. i.e. ',' for CSV or '\t' for TSV.
         */
        CSVRow.prototype.addCellsFromRaw = function (_data, _delimiter) {
            if (_delimiter === void 0) { _delimiter = ','; }
            asserts_4.AssertString(_data);
            asserts_4.AssertString(_delimiter);
            var a_cells_data = _data.split(_delimiter);
            for (var index = 0; index < a_cells_data.length; ++index) {
                this._m_a_cells.push(a_cells_data[index]);
            }
            return;
        };
        CSVRow.prototype.getRowSize = function () {
            return this._m_a_cells.length;
        };
        /**
        * Safely destroys the object.
        */
        CSVRow.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this._m_a_cells = null;
            this._m_a_csv_file = null;
            return;
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        CSVRow.prototype._validate_idx = function (_index) {
            return (0 <= _index && _index < this._m_a_cells.length);
        };
        return CSVRow;
    }(mxUObject_3.MxUObject));
    exports.CSVRow = CSVRow;
});
define("utilities/fs/csv_file", ["require", "exports", "utilities/fs/csv_row", "utilities/gameObjects/mxUObject", "utilities/asserts"], function (require, exports, csv_row_1, mxUObject_4, asserts_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CSVFile = /** @class */ (function (_super) {
        __extends(CSVFile, _super);
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        function CSVFile() {
            var _this = _super.call(this) || this;
            _this._m_a_headers = new Array();
            _this._m_a_rows = new Array();
            return _this;
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        CSVFile.GetNull = function () {
            if (CSVFile._NULL_OBJ == null || CSVFile._NULL_OBJ === undefined) {
                CSVFile._NULL_OBJ = new CSVFile();
            }
            return CSVFile._NULL_OBJ;
        };
        CSVFile.IsNull = function (_csv_file) {
            var null_id = this.GetNull().getUUID();
            var obj_id = _csv_file.getUUID();
            return obj_id.compare(null_id);
        };
        /**
         * Creates an useful CSVFile object to handle a raw csv data.
         *
         * @param _csv_data {string} Raw CSV data.
         * @param _has_header_row {boolean} Does data has a header row? It takes the first row as headers.
         * @param _cell_delimiter {char} Delimiter character for cells. i.e. ',' for CSV or '\t' for TSV.
         * @param _row_delimiter {char} Delimiter character for rows, usually it is the line break ('\n') character.
         */
        CSVFile.Create = function (_csv_data, _has_header_row, _cell_delimiter, _row_delimiter) {
            if (_has_header_row === void 0) { _has_header_row = true; }
            if (_cell_delimiter === void 0) { _cell_delimiter = ','; }
            if (_row_delimiter === void 0) { _row_delimiter = '\n'; }
            var csv_file = new CSVFile();
            asserts_5.AssertString(_csv_data);
            asserts_5.AssertString(_cell_delimiter);
            asserts_5.AssertString(_row_delimiter);
            if (_csv_data == "") {
                return csv_file;
            }
            // Remove any Carriage Character
            _csv_data = _csv_data.replace('\r', '');
            var row;
            var a_row_raw_data = _csv_data.split(_row_delimiter);
            var rows_start_position = 0;
            // Get the headers from the csv file.
            if (_has_header_row) {
                if (a_row_raw_data.length > 0) {
                    var a_cell_data = a_row_raw_data[0].split(_cell_delimiter);
                    var value = void 0;
                    for (var index = 0; index < a_cell_data.length; ++index) {
                        csv_file._m_a_headers.push(a_cell_data[index]);
                    }
                    rows_start_position++;
                }
            }
            // Get rows data.
            for (var index = rows_start_position; index < a_row_raw_data.length; ++index) {
                row = new csv_row_1.CSVRow(csv_file);
                csv_file._m_a_rows.push(row);
                row.addCellsFromRaw(a_row_raw_data[index], _cell_delimiter);
            }
            return csv_file;
        };
        /**
         * Gets a row from the CSVFile. If the row_index is out of range, it will returns
         * a Null Object.
         *
         * @param _row_index
         */
        CSVFile.prototype.getRow = function (_row_index) {
            if (0 <= _row_index && _row_index < this._m_a_rows.length) {
                return this._m_a_rows[_row_index];
            }
            console.warn("Can't get the row from the CSVFile: Index out of range.");
            return csv_row_1.CSVRow.GetNull();
        };
        /**
         * Gets the first Row with given value in a specific header column. Return a
         * Null Object if doesn't found a row with the given specifications.
         *
         * @param _key_header {string} key header's name
         * @param _value {string} value.
         */
        CSVFile.prototype.getRowByKey = function (_key_header, _value) {
            asserts_5.AssertString(_key_header);
            asserts_5.AssertString(_value);
            var header_idx = this.getHeaderIdx(_key_header);
            if (header_idx < 0) {
                console.warn("Can't get the row from the CSVFile: Header doesn't exists: " + _key_header);
                return csv_row_1.CSVRow.GetNull();
            }
            for (var index = 0; index < this._m_a_rows.length; ++index) {
                if (this._m_a_rows[index].getCell(header_idx) == _value) {
                    return this._m_a_rows[index];
                }
            }
            return csv_row_1.CSVRow.GetNull();
        };
        /**
         * Returns the header column position (0 based). Returns -1 if the header
         * doesn't exists.
         *
         * @param _header
         */
        CSVFile.prototype.getHeaderIdx = function (_header_name) {
            var value;
            for (var index = 0; index < this._m_a_headers.length; ++index) {
                value = this._m_a_headers[index];
                if (value === _header_name) {
                    return index;
                }
            }
            console.warn("Can't get the Header Index:" + _header_name + " Header doesn't exists in the CSVFile.");
            return -1;
        };
        /**
         * Check if the header exists in the CSVFile. Returns true if it does.
         *
         * @param _header_name
         */
        CSVFile.prototype.hasHeader = function (_header_name) {
            for (var index = 0; index < this._m_a_headers.length; ++index) {
                if (this._m_a_headers[index] == _header_name) {
                    return true;
                }
            }
            return false;
        };
        CSVFile.prototype.getNumberHeaders = function () {
            return this._m_a_headers.length;
        };
        CSVFile.prototype.getNumberRows = function () {
            return this._m_a_rows.length;
        };
        /**
        * Safely destroys the object.
        */
        CSVFile.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            return;
        };
        return CSVFile;
    }(mxUObject_4.MxUObject));
    exports.CSVFile = CSVFile;
});
define("game/managers/gameManager/components/dataController", ["require", "exports", "utilities/component/mxComponent", "game/gameCommons", "utilities/fs/csv_file", "utilities/fs/csv_row"], function (require, exports, mxComponent_3, gameCommons_5, csv_file_2, csv_row_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DataController = /** @class */ (function (_super) {
        __extends(DataController, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function DataController() {
            var _this = _super.call(this, gameCommons_5.COMPONENT_ID.kDataController) || this;
            _this._string_map = new Map();
            return _this;
        }
        DataController.prototype.init = function (_actor) {
            this._gameController = _actor.getComponent(gameCommons_5.COMPONENT_ID.kGameController);
            return;
        };
        DataController.prototype.initLanguage = function (_game) {
            var csv_file = csv_file_2.CSVFile.Create(_game.cache.text.get('game_text'), true, '\t');
            var text_column_index = (this._gameController.getLocalization() == gameCommons_5.LOCALIZATION.KSpanish ? 1 : 2);
            var num_rows = csv_file.getNumberRows();
            var row = null;
            for (var index = 0; index < num_rows; ++index) {
                row = csv_file.getRow(index);
                if (csv_row_2.CSVRow.IsNull(row)) {
                    break;
                }
                this.add(row.getCell(0), row.getCell(text_column_index));
            }
            csv_file.destroy();
            return;
        };
        DataController.prototype.add = function (_key, _value) {
            this._string_map.set(_key, _value);
        };
        DataController.prototype.getString = function (_key) {
            if (this._string_map.has(_key)) {
                return this._string_map.get(_key);
            }
            return "NOT_FOUND!";
        };
        DataController.prototype.clear = function () {
            this._string_map.clear();
            return;
        };
        DataController.prototype.destroy = function () {
            this._string_map.clear();
            this._string_map = null;
            return;
        };
        return DataController;
    }(mxComponent_3.MxComponent));
    exports.DataController = DataController;
});
define("scenes/preloader", ["require", "exports", "game/managers/masteManager/masterManager", "game/gameCommons"], function (require, exports, masterManager_1, gameCommons_6) {
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
            ///////////////////////////////////
            // Atlas     
            this.load.atlas('landpage', 'src/assets/images/atlas/landpage.png', 'src/assets/images/atlas/landpage.js');
            this.load.atlas('landpage_2', 'src/assets/images/atlas/landpage_2.png', 'src/assets/images/atlas/landpage_2.js');
            ///////////////////////////////////
            // Images
            this.load.image('sand_clock_mask', 'src/assets/images/atlas/sand_clock_mask.png');
            ///////////////////////////////////
            // Audio
            this.load.audioSprite('mimik_sounds', 'src/assets/sounds/audiosprite/mimik_sounds.json', [
                'src/assets/sounds/audiosprite/mimik_sounds.ogg',
                'src/assets/sounds/audiosprite/mimik_sounds.m4a',
                'src/assets/sounds/audiosprite/mimik_sounds.mp3',
                'src/assets/sounds/audiosprite/mimik_sounds.ac3',
            ]);
            ///////////////////////////////////
            // Fonts
            this.load.bitmapFont('avant_bold', 'src/assets/images/bitmapFonts/avent_bold-export.png', 'src/assets/images/bitmapFonts/avent_bold-export.xml');
            this.load.bitmapFont('avant_garde_bk', 'src/assets/images/bitmapFonts/avant_garde_bk-export.png', 'src/assets/images/bitmapFonts/avant_garde_bk-export.xml');
            this.load.bitmapFont('digital_dream', 'src/assets/images/bitmapFonts/digital_dream-export.png', 'src/assets/images/bitmapFonts/digital_dream-export.xml');
            ///////////////////////////////////
            // Text
            this.load.text('game_text', 'src/assets/csv_files/Mimi_k_data - game_texts.tsv');
            ///////////////////////////////////
            // Shader
            this.load.glsl({
                key: 'background',
                shaderType: 'fragment',
                url: 'src/assets/shaders/background.frag'
            });
            /****************************************************/
            /* Metta Loading                                    */
            /****************************************************/
            var title_mimik = this.add.sprite(this.game.canvas.width * 0.5, this.game.canvas.height * 0.4, 'mimik_loader', 'logo.png');
            var loadingSprite = this.add.sprite(this.game.canvas.width * 0.5, this.game.canvas.height * 0.5, 'mimik_loader', 'loading.png');
            this.add.tween({
                targets: loadingSprite,
                angle: 360,
                duration: 1000,
                loop: -1,
                ease: 'Power2'
            });
            /****************************************************/
            /* Callbacks                                        */
            /****************************************************/
            this.load.on('complete', this._onLoadComplete, this);
            return;
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        Preloader.prototype._onLoadComplete = function () {
            // Sets the column that has the text.
            // 1 : Spanish
            // 2 : English    
            var master = masterManager_1.MasterManager.GetInstance();
            var gameManger = master.get_child(gameCommons_6.MANAGER_ID.kGameManager);
            var dataController = gameManger.getComponent(gameCommons_6.COMPONENT_ID.kDataController);
            dataController.initLanguage(this.game);
            ///////////////////////////////////
            // Press Start to Play
            var start_button = this.add.text(this.game.canvas.width * 0.5, this.game.canvas.height * 0.65, 'Presiona Aquí\nPress Here', { fontFamily: 'Arial', fontSize: 75, color: '#face01' });
            start_button.setAlign('center');
            start_button.setOrigin(0.5, 0.5);
            this.add.tween({
                targets: start_button,
                alpha: { from: 0, to: 1 },
                ease: 'Linear',
                duration: 1000,
                repeat: -1,
                yoyo: true
            });
            start_button.setInteractive();
            start_button.on('pointerdown', this._nextScene, this);
            return;
        };
        Preloader.prototype._nextScene = function () {
            this.scene.start('welcomePage');
            return;
        };
        return Preloader;
    }(Phaser.Scene));
    exports.Preloader = Preloader;
});
define("game/components/baseSoundManagerComponent", ["require", "exports", "utilities/component/mxComponent", "game/gameCommons"], function (require, exports, mxComponent_4, gameCommons_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseSoundManagerComponent = /** @class */ (function (_super) {
        __extends(BaseSoundManagerComponent, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function BaseSoundManagerComponent() {
            var _this = _super.call(this, gameCommons_7.COMPONENT_ID.kBaseSoundManager) || this;
            return _this;
        }
        BaseSoundManagerComponent.prototype.prepare = function (_baseSoundManager) {
            this._m_baseSoundManager = _baseSoundManager;
            if (this._m_map_audioSprite != null) {
                this._m_map_audioSprite.clear();
            }
            else {
                this._m_map_audioSprite
                    = new Map();
            }
            return;
        };
        BaseSoundManagerComponent.prototype.add = function (_sound, _config) {
            this._m_baseSoundManager.add(_sound, _config);
            return;
        };
        BaseSoundManagerComponent.prototype.addAudiosprite = function (_sound, _config) {
            var audio = this._m_baseSoundManager.addAudioSprite(_sound, _config);
            return;
        };
        BaseSoundManagerComponent.prototype.play = function (_sound, _extra) {
            this._m_baseSoundManager.play(_sound, _extra);
            return;
        };
        BaseSoundManagerComponent.prototype.playAudioSprite = function (_audioSpriteKey, _audioFrame, _config) {
            this._m_baseSoundManager.playAudioSprite(_audioSpriteKey, _audioFrame, _config);
            return;
        };
        BaseSoundManagerComponent.prototype.destroy = function () {
            return;
        };
        return BaseSoundManagerComponent;
    }(mxComponent_4.MxComponent));
    exports.BaseSoundManagerComponent = BaseSoundManagerComponent;
});
define("game/managers/gameManager/gameManager", ["require", "exports", "game/gameCommons", "utilities/component/mxActor", "game/managers/gameManager/components/gameController", "game/managers/gameManager/components/dataController", "game/components/baseSoundManagerComponent"], function (require, exports, gameCommons_8, mxActor_2, gameController_1, dataController_1, baseSoundManagerComponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Administrador del juego. Responsable de los siguientes controladores:
     *
     * - DataController
     * - ChronoController
     *
     * Éste MxManager se crea en el Boot.
     */
    var GameManager = /** @class */ (function () {
        function GameManager() {
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        GameManager.Create = function () {
            var manager = mxActor_2.MxActor.Create(gameCommons_8.MANAGER_ID.kGameManager);
            ///////////////////////////////////
            // Components
            manager.addComponent(new gameController_1.GameController());
            manager.addComponent(new dataController_1.DataController());
            manager.addComponent(new baseSoundManagerComponent_1.BaseSoundManagerComponent());
            return manager;
        };
        return GameManager;
    }());
    exports.GameManager = GameManager;
});
define("game/managers/masteManager/components/MasterController", ["require", "exports", "utilities/component/mxComponent", "game/gameCommons"], function (require, exports, mxComponent_5, gameCommons_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MasterController = /** @class */ (function (_super) {
        __extends(MasterController, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function MasterController() {
            var _this = _super.call(this, gameCommons_9.COMPONENT_ID.kMasterController) || this;
            return _this;
        }
        MasterController.prototype.init = function (_actor) {
            this._m_introPlayed = false;
            this.m_dt = 0.0;
            return;
        };
        MasterController.prototype.playIntro = function (_scene) {
            if (this._m_introPlayed) {
                return;
            }
            this._m_introPlayed = !this._m_introPlayed;
            this._m_soundBaseManager = _scene.sound;
            this._m_snd_intro = _scene.sound.addAudioSprite(gameCommons_9.MimiKSounds.kMimiKAudioSprite);
            this._m_snd_intro.play(gameCommons_9.MimiKSounds.kBackgroundVoice);
            this._m_snd_intro.once('complete', function (sound) {
                this._m_soundBaseManager.playAudioSprite(gameCommons_9.MimiKSounds.kMimiKAudioSprite, gameCommons_9.MimiKSounds.kBackgroundInstrumental, { loop: true });
            }, this);
        };
        MasterController.prototype.stopIntro = function () {
            this._m_introPlayed = false;
            this._m_snd_intro = null;
            this._m_soundBaseManager.removeByKey(gameCommons_9.MimiKSounds.kMimiKAudioSprite);
            return;
        };
        MasterController.prototype.update = function (_actor) {
            return;
        };
        return MasterController;
    }(mxComponent_5.MxComponent));
    exports.MasterController = MasterController;
});
define("scenes/boot", ["require", "exports", "utilities/component/mxComponent", "utilities/component/mxActor", "game/managers/masteManager/masterManager", "game/managers/gameManager/gameManager", "game/managers/masteManager/components/MasterController", "game/gameCommons"], function (require, exports, mxComponent_6, mxActor_3, masterManager_2, gameManager_1, MasterController_1, gameCommons_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Creates modules and load assets for the preload scene.
     */
    var Boot = /** @class */ (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        Boot.prototype.preload = function () {
            ///////////////////////////////////
            // Mimi-k Loader
            this.load.atlas('mimik_loader', 'src/assets/images/atlas/loader.png', 'src/assets/images/atlas/loader.js');
            return;
        };
        Boot.prototype.create = function () {
            // Fit the game canvas to parent container
            this.game.scale.scaleMode = Phaser.Scale.ScaleModes.FIT;
            // Prepare modules
            mxComponent_6.MxComponent.Prepare();
            mxActor_3.MxActor.Prepare();
            // Master Manager
            masterManager_2.MasterManager.Prepare();
            var master = masterManager_2.MasterManager.GetInstance();
            // Master Manager Components
            master.addComponent(new MasterController_1.MasterController());
            // Master Manager Children
            var gameManager = gameManager_1.GameManager.Create();
            master.addChild(gameManager);
            master.init();
            // default language.
            var gameController = gameManager.getComponent(gameCommons_10.COMPONENT_ID.kGameController);
            gameController.setLocalization(gameCommons_10.LOCALIZATION.KSpanish);
            // next scene
            this.scene.start('preloader');
            return;
        };
        return Boot;
    }(Phaser.Scene));
    exports.Boot = Boot;
});
define("game/components/nineSliceComponent", ["require", "exports", "utilities/component/mxComponent", "game/gameCommons"], function (require, exports, mxComponent_7, gameCommons_11) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NineSliceComponent = /** @class */ (function (_super) {
        __extends(NineSliceComponent, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function NineSliceComponent() {
            var _this = _super.call(this, gameCommons_11.COMPONENT_ID.kNineSlice) || this;
            _this._m_local_position = new Phaser.Geom.Point(0.0, 0.0);
            return _this;
        }
        NineSliceComponent.prototype.init = function (_actor) {
            return;
        };
        NineSliceComponent.prototype.prepare = function (_scene, _texture, _frame, _offsets) {
            var texture = _scene.game.textures.get(_texture);
            var frame = texture.get(_frame);
            // sets the minimum size from the original texture
            this._m_min_width = frame.width;
            this._m_min_height = frame.height;
            // Create nineslice texture
            this._m_texture = _scene.add.nineslice(this._m_local_position.x, this._m_local_position.y, this._m_min_width, this._m_min_height, { key: _texture, frame: _frame }, _offsets);
            this._m_texture.setOrigin(0.5, 0.5);
            return;
        };
        NineSliceComponent.prototype.update = function (_actor) {
            this._m_texture.x = _actor._m_position.x + this._m_local_position.x;
            this._m_texture.y = _actor._m_position.y + this._m_local_position.y;
            return;
        };
        NineSliceComponent.prototype.receive = function (_id, _data) {
            if (_id == gameCommons_11.MESSAGE_ID.kOnAgentActive) {
                this.setVisible(true);
                this.setActive(true);
                return;
            }
            else if (_id == gameCommons_11.MESSAGE_ID.kOnAgentDesactive) {
                this.setVisible(false);
                this.setActive(false);
                return;
            }
        };
        NineSliceComponent.prototype.setInteractive = function () {
            this._m_texture.setInteractive();
            return;
        };
        NineSliceComponent.prototype.on = function (_event, _fn, _context) {
            this._m_texture.on(_event, _fn, _context);
            return;
        };
        NineSliceComponent.prototype.resize = function (_width, _height) {
            this._m_texture.resize(_width, _height);
            return;
        };
        NineSliceComponent.prototype.getMinSize = function () {
            return new Phaser.Geom.Point(this._m_min_width, this._m_min_height);
        };
        NineSliceComponent.prototype.setTexture = function (_texture_key) {
            return;
        };
        NineSliceComponent.prototype.setFrame = function (_frame) {
            return;
        };
        NineSliceComponent.prototype.getTexture = function () {
            return this._m_texture;
        };
        /**
         * Move the sprite local position (relative to the MxActor position).
         *
         * @param _x {number} Steps in the x axis.
         * @param _y {number} Steps in the y axis.
         */
        NineSliceComponent.prototype.move = function (_x, _y) {
            this._m_local_position.x += _x;
            this._m_local_position.y += _y;
            return;
        };
        /**
         * Sets the local position (relative to the MxActor position) of the sprite.
         *
         * @param _x
         * @param _y
         */
        NineSliceComponent.prototype.setPosition = function (_x, _y) {
            this._m_local_position.setTo(_x, _y);
            return;
        };
        /**
         * Gets the local position (relative to the MxActor position) of the sprite.
         */
        NineSliceComponent.prototype.getPosition = function () {
            return new Phaser.Math.Vector2(this._m_local_position.x, this._m_local_position.y);
        };
        /**
         * The rotation of this Game Object, in degrees. Default 0.
         * @param _degrees {number} degrees.
         */
        NineSliceComponent.prototype.setAngle = function (_degrees) {
            this._m_texture.setAngle(_degrees);
        };
        NineSliceComponent.prototype.setOrigin = function (_x, _y) {
            this._m_texture.setOrigin(_x, _y);
            return;
        };
        NineSliceComponent.prototype.setVisible = function (_visible) {
            this._m_texture.setVisible(_visible);
            return;
        };
        NineSliceComponent.prototype.setActive = function (_active) {
            this._m_texture.setActive(_active);
            return;
        };
        NineSliceComponent.prototype.destroy = function () {
            this._m_texture.destroy();
            this._m_local_position = null;
            _super.prototype.destroy.call(this);
            return;
        };
        return NineSliceComponent;
    }(mxComponent_7.MxComponent));
    exports.NineSliceComponent = NineSliceComponent;
});
define("game/components/bitmapTextComponent", ["require", "exports", "utilities/component/mxComponent", "game/gameCommons"], function (require, exports, mxComponent_8, gameCommons_12) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BitmapTextComponent = /** @class */ (function (_super) {
        __extends(BitmapTextComponent, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function BitmapTextComponent() {
            var _this = _super.call(this, gameCommons_12.COMPONENT_ID.kBitmapText) || this;
            _this._m_local_position = new Phaser.Geom.Point(0.0, 0.0);
            return _this;
        }
        BitmapTextComponent.prototype.init = function (_actor) {
            return;
        };
        BitmapTextComponent.prototype.prepare = function (_scene, _fontkey, _text, _size) {
            this._m_bitmap_text = _scene.add.bitmapText(this._m_local_position.x, this._m_local_position.y, _fontkey, _text, _size);
            return;
        };
        BitmapTextComponent.prototype.update = function (_actor) {
            this._m_bitmap_text.x = _actor._m_position.x + this._m_local_position.x;
            this._m_bitmap_text.y = _actor._m_position.y + this._m_local_position.y;
            return;
        };
        BitmapTextComponent.prototype.receive = function (_id, _data) {
            if (_id == gameCommons_12.MESSAGE_ID.kOnAgentActive) {
                this.setVisible(true);
                this.setActive(true);
                return;
            }
            else if (_id == gameCommons_12.MESSAGE_ID.kOnAgentDesactive) {
                this.setVisible(false);
                this.setActive(false);
                return;
            }
        };
        /**
         *
         * @param _size
         */
        BitmapTextComponent.prototype.setFontSize = function (_size) {
            this._m_bitmap_text.setFontSize(_size);
            return;
        };
        /**
         *
         * @param _color
         */
        BitmapTextComponent.prototype.setTint = function (_color) {
            this._m_bitmap_text.setTint(_color);
            return;
        };
        BitmapTextComponent.prototype.setScale = function (_x, _y) {
            this._m_bitmap_text.setScale(_x, _y);
            return;
        };
        BitmapTextComponent.prototype.setAlpha = function (_alpha) {
            this._m_bitmap_text.setAlpha(_alpha);
            return;
        };
        BitmapTextComponent.prototype.setLeftAlign = function () {
            this._m_bitmap_text.setLeftAlign();
            return;
        };
        BitmapTextComponent.prototype.setRightAlign = function () {
            this._m_bitmap_text.setRightAlign();
            return;
        };
        BitmapTextComponent.prototype.setCenterAlign = function () {
            this._m_bitmap_text.setCenterAlign();
            return;
        };
        /**
         *
         * @param _text
         */
        BitmapTextComponent.prototype.setText = function (_text) {
            this._m_bitmap_text.text = _text;
            return;
        };
        BitmapTextComponent.prototype.setBitmapTextObject = function (_text) {
            this._m_bitmap_text = _text;
            return;
        };
        BitmapTextComponent.prototype.getSize = function () {
            return new Phaser.Geom.Point(this._m_bitmap_text.width, this._m_bitmap_text.height);
        };
        BitmapTextComponent.prototype.getBitmapTextObject = function () {
            return this._m_bitmap_text;
        };
        /**
        * Sets the maximum display width of this BitmapText in pixels.
        *
        * If BitmapText.text is longer than maxWidth then the lines will be automatically wrapped based on the previous whitespace character found in the line.
        *
        * If no whitespace was found then no wrapping will take place and consequently the maxWidth value will not be honored.
        *
        * Disable maxWidth by setting the value to 0.
        */
        BitmapTextComponent.prototype.setMaxWidth = function (_width) {
            this._m_bitmap_text.setMaxWidth(_width);
            return;
        };
        /**
         * Move the sprite local position (relative to the MxActor position).
         *
         * @param _x {number} Steps in the x axis.
         * @param _y {number} Steps in the y axis.
         */
        BitmapTextComponent.prototype.move = function (_x, _y) {
            this._m_local_position.x += _x;
            this._m_local_position.y += _y;
            return;
        };
        /**
         * Sets the local position (relative to the MxActor position) of the sprite.
         *
         * @param _x
         * @param _y
         */
        BitmapTextComponent.prototype.setPosition = function (_x, _y) {
            this._m_local_position.setTo(_x, _y);
            return;
        };
        /**
         * Gets the local position (relative to the MxActor position) of the sprite.
         */
        BitmapTextComponent.prototype.getPosition = function () {
            return new Phaser.Math.Vector2(this._m_local_position.x, this._m_local_position.y);
        };
        /**
         * The rotation of this Game Object, in degrees. Default 0.
         * @param _degrees {number} degrees.
         */
        BitmapTextComponent.prototype.setAngle = function (_degrees) {
            this._m_bitmap_text.setAngle(_degrees);
        };
        BitmapTextComponent.prototype.setOrigin = function (_x, _y) {
            this._m_bitmap_text.setOrigin(_x, _y);
            return;
        };
        BitmapTextComponent.prototype.setVisible = function (_visible) {
            this._m_bitmap_text.setVisible(_visible);
            return;
        };
        BitmapTextComponent.prototype.setActive = function (_active) {
            this._m_bitmap_text.setActive(_active);
            return;
        };
        BitmapTextComponent.prototype.destroy = function () {
            this._m_bitmap_text.destroy();
            this._m_local_position = null;
            _super.prototype.destroy.call(this);
            return;
        };
        return BitmapTextComponent;
    }(mxComponent_8.MxComponent));
    exports.BitmapTextComponent = BitmapTextComponent;
});
define("game/ui/cloudPopup/components/popupController", ["require", "exports", "utilities/component/mxComponent", "game/gameCommons"], function (require, exports, mxComponent_9, gameCommons_13) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PopupController = /** @class */ (function (_super) {
        __extends(PopupController, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function PopupController() {
            var _this = _super.call(this, gameCommons_13.COMPONENT_ID.kPopupController) || this;
            return _this;
        }
        PopupController.prototype.init = function (_actor) {
            // get components.
            this._m_nineSliceComponent = _actor.getComponent(gameCommons_13.COMPONENT_ID.kNineSlice);
            this._m_textComponent = _actor.getComponent(gameCommons_13.COMPONENT_ID.kBitmapText);
            return;
        };
        PopupController.prototype.prepare = function (_scene) {
            this._m_scene = _scene;
            // define nineslice min size.
            var min_size = this._m_nineSliceComponent.getMinSize();
            this._m_min_width = min_size.x;
            this._m_min_height = min_size.y;
            // define padding
            this._m_top_padding = this._m_min_height * 0.25;
            this._m_bottom_padding = this._m_min_height * 0.25;
            this._m_left_padding = this._m_min_width * 0.25;
            this._m_right_padding = this._m_min_height * 0.25;
            // sets maximum size from the orinal texture
            this.setMaxWidth(1080);
            this._m_nineSliceComponent.resize(1080, 530);
            this._m_isOpen = false;
            return;
        };
        PopupController.prototype.open = function () {
            if (!this._m_isOpen) {
                var text = this._m_textComponent.getBitmapTextObject();
                text.setAlpha(0.0);
                this._m_text_tween = this._m_scene.tweens.add({
                    targets: text,
                    alpha: 1.0,
                    duration: 400,
                    ease: 'Linear'
                });
                this._m_isOpen = !this._m_isOpen;
            }
            return;
        };
        PopupController.prototype.close = function () {
            if (this._m_isOpen) {
                if (this._m_text_tween.isPlaying()) {
                    this._m_text_tween.stop();
                }
                this._m_isOpen = !this._m_isOpen;
            }
            return;
        };
        PopupController.prototype.setMaxWidth = function (_width) {
            this._m_max_width = this._check_minimum_value(_width, this._m_min_width);
            this._m_textComponent.setMaxWidth(this._m_max_width - this._m_left_padding - this._m_right_padding);
            return;
        };
        PopupController.prototype.setText = function (_text) {
            this._m_textComponent.setText(_text);
            return;
        };
        PopupController.prototype.setSize = function (_width, _height) {
            this._m_width = this._check_minimum_value(_width, this._m_min_width);
            this._m_width = this._check_maximum_value(_width, this._m_max_width);
            this._m_height = this._check_minimum_value(_height, this._m_min_height);
            this._m_height = _height;
            this._m_nineSliceComponent.resize(this._m_width, this._m_height);
            return;
        };
        PopupController.prototype.destroy = function () {
            this._m_nineSliceComponent = null;
            this._m_textComponent = null;
            _super.prototype.destroy.call(this);
            return;
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        PopupController.prototype._check_minimum_value = function (_value, _min) {
            if (_value < _min) {
                return _min;
            }
            return _value;
        };
        PopupController.prototype._check_maximum_value = function (_value, _max) {
            if (_value > _max) {
                return _max;
            }
            return _value;
        };
        return PopupController;
    }(mxComponent_9.MxComponent));
    exports.PopupController = PopupController;
});
define("game/ui/text/uiBitmapText", ["require", "exports", "game/components/bitmapTextComponent"], function (require, exports, bitmapTextComponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIBitmapText = /** @class */ (function () {
        function UIBitmapText() {
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        UIBitmapText.AddStandard = function (_scene, _text, _actor) {
            var textComponent = new bitmapTextComponent_1.BitmapTextComponent();
            _actor.addComponent(textComponent);
            textComponent.prepare(_scene, 'avant_garde_bk', _text, 50);
            return textComponent;
        };
        return UIBitmapText;
    }());
    exports.UIBitmapText = UIBitmapText;
});
define("game/components/spriteComponent", ["require", "exports", "utilities/component/mxComponent", "game/gameCommons"], function (require, exports, mxComponent_10, gameCommons_14) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SpriteComponent = /** @class */ (function (_super) {
        __extends(SpriteComponent, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function SpriteComponent() {
            var _this = _super.call(this, gameCommons_14.COMPONENT_ID.kSprite) || this;
            _this._m_local_position = new Phaser.Geom.Point(0.0, 0.0);
            return _this;
        }
        SpriteComponent.prototype.update = function (_actor) {
            this._m_sprite.x = _actor._m_position.x + this._m_local_position.x;
            this._m_sprite.y = _actor._m_position.y + this._m_local_position.y;
            return;
        };
        SpriteComponent.prototype.receive = function (_id, _data) {
            if (_id == gameCommons_14.MESSAGE_ID.kOnAgentActive) {
                this.setVisible(true);
                this.setActive(true);
                return;
            }
            else if (_id == gameCommons_14.MESSAGE_ID.kOnAgentDesactive) {
                this.setVisible(false);
                this.setActive(false);
                return;
            }
        };
        SpriteComponent.prototype.setSprite = function (_sprite) {
            this._m_sprite = _sprite;
            return;
        };
        SpriteComponent.prototype.setTexture = function (_texture_key) {
            this._m_sprite.setTexture(_texture_key);
            return;
        };
        SpriteComponent.prototype.setFrame = function (_frame) {
            this._m_sprite.setFrame(_frame);
            return;
        };
        SpriteComponent.prototype.setMask = function (_mask) {
            this._m_sprite.setMask(_mask);
            return;
        };
        SpriteComponent.prototype.createMask = function () {
            return this._m_sprite.createBitmapMask();
        };
        SpriteComponent.prototype.setTint = function (_color) {
            this._m_sprite.setTint(_color);
        };
        SpriteComponent.prototype.getSprite = function () {
            return this._m_sprite;
        };
        SpriteComponent.prototype.getWidth = function () {
            return this._m_sprite.width;
        };
        SpriteComponent.prototype.getHeight = function () {
            return this._m_sprite.height;
        };
        /**
         * Move the sprite local position (relative to the MxActor position).
         *
         * @param _x {number} Steps in the x axis.
         * @param _y {number} Steps in the y axis.
         */
        SpriteComponent.prototype.move = function (_x, _y) {
            this._m_local_position.x += _x;
            this._m_local_position.y += _y;
            return;
        };
        /**
         * Sets the local position (relative to the MxActor position) of the sprite.
         *
         * @param _x
         * @param _y
         */
        SpriteComponent.prototype.setPosition = function (_x, _y) {
            this._m_local_position.setTo(_x, _y);
            return;
        };
        /**
         * Gets the local position (relative to the MxActor position) of the sprite.
         */
        SpriteComponent.prototype.getPosition = function () {
            return new Phaser.Math.Vector2(this._m_local_position.x, this._m_local_position.y);
        };
        /**
         *
         */
        SpriteComponent.prototype.setInteractive = function () {
            this._m_sprite.setInteractive();
            return;
        };
        /**
         *
         * @param _event
         * @param _fn
         * @param _context
         */
        SpriteComponent.prototype.on = function (_event, _fn, _context) {
            this._m_sprite.on(_event, _fn, _context);
            return;
        };
        /**
         * The rotation of this Game Object, in degrees. Default 0.
         * @param _degrees {number} degrees.
         */
        SpriteComponent.prototype.setAngle = function (_degrees) {
            this._m_sprite.setAngle(_degrees);
        };
        SpriteComponent.prototype.setOrigin = function (_x, _y) {
            this._m_sprite.setOrigin(_x, _y);
            return;
        };
        SpriteComponent.prototype.setVisible = function (_visible) {
            this._m_sprite.setVisible(_visible);
            return;
        };
        SpriteComponent.prototype.setScale = function (_x, _y) {
            this._m_sprite.setScale(_x, _y);
            return;
        };
        SpriteComponent.prototype.setActive = function (_active) {
            this._m_sprite.setActive(_active);
            return;
        };
        SpriteComponent.prototype.destroy = function () {
            this._m_sprite.destroy();
            this._m_local_position = null;
            _super.prototype.destroy.call(this);
            return;
        };
        return SpriteComponent;
    }(mxComponent_10.MxComponent));
    exports.SpriteComponent = SpriteComponent;
});
define("game/ui/cloudPopup/components/alertPopupController", ["require", "exports", "utilities/component/mxComponent", "game/gameCommons", "game/managers/masteManager/masterManager"], function (require, exports, mxComponent_11, gameCommons_15, masterManager_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AlertPopupController = /** @class */ (function (_super) {
        __extends(AlertPopupController, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function AlertPopupController() {
            var _this = _super.call(this, gameCommons_15.COMPONENT_ID.kAlertPopupController) || this;
            return _this;
        }
        AlertPopupController.prototype.init = function (_actor) {
            ///////////////////////////////////
            // Setup listeners
            var master = masterManager_3.MasterManager.GetInstance();
            var gameManager = master.get_child(gameCommons_15.MANAGER_ID.kGameManager);
            var gameController = gameManager.getComponent(gameCommons_15.COMPONENT_ID.kGameController);
            gameController.on('timeout', this.open, this);
            ///////////////////////////////////
            // Get components
            this._m_spriteComponent = _actor.getComponent(gameCommons_15.COMPONENT_ID.kSprite);
            this.m_isOpen = true;
            this.reset();
            return;
        };
        AlertPopupController.prototype.prepare = function (_scene) {
            this._m_scene = _scene;
            return;
        };
        AlertPopupController.prototype.reset = function () {
            if (this.m_isOpen) {
                this.m_isOpen = !this.m_isOpen;
                this._m_spriteComponent.setScale(0.0, 0.0);
                this._m_spriteComponent.setVisible(false);
            }
            return;
        };
        AlertPopupController.prototype.open = function () {
            if (!this.m_isOpen) {
                this.m_isOpen = !this.m_isOpen;
                this._m_spriteComponent.setVisible(true);
                var sprite = this._m_spriteComponent.getSprite();
                this._m_spriteTween = this._m_scene.tweens.add({
                    targets: sprite,
                    scale: 1.0,
                    duration: 200,
                    ease: 'Bounce'
                });
            }
            return;
        };
        AlertPopupController.prototype.destroy = function () {
            return;
        };
        return AlertPopupController;
    }(mxComponent_11.MxComponent));
    exports.AlertPopupController = AlertPopupController;
});
define("game/ui/cloudPopup/Popup", ["require", "exports", "utilities/component/mxActor", "game/components/nineSliceComponent", "game/ui/cloudPopup/components/popupController", "game/ui/text/uiBitmapText", "game/components/spriteComponent", "game/ui/cloudPopup/components/alertPopupController", "game/managers/masteManager/masterManager", "game/gameCommons"], function (require, exports, mxActor_4, nineSliceComponent_1, popupController_1, uiBitmapText_1, spriteComponent_1, alertPopupController_1, masterManager_4, gameCommons_16) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Popup Factories
     */
    var Popup = /** @class */ (function () {
        function Popup() {
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * Creates a cloudpoup.
         *
         * @param _scene Phaser.Scene
         * @param _id Actor's id.
         */
        Popup.CreateCloud = function (_scene, _id) {
            var actor = mxActor_4.MxActor.Create(_id);
            ///////////////////////////////////
            // Create Components
            var popupController = new popupController_1.PopupController();
            actor.addComponent(popupController);
            var nineSliceComponent = new nineSliceComponent_1.NineSliceComponent();
            actor.addComponent(nineSliceComponent);
            nineSliceComponent.prepare(_scene, 'landpage', 'msg_cloud.png', [140, 128, 5, 128]);
            var textComponent = uiBitmapText_1.UIBitmapText.AddStandard(_scene, '', actor);
            textComponent.setFontSize(50);
            textComponent.setOrigin(0.5, 0.5);
            textComponent.setTint(0x0a0136);
            textComponent.setCenterAlign();
            textComponent._m_local_position.setTo(0, -100);
            actor.init();
            ///////////////////////////////////
            // Prepare Components
            popupController.prepare(_scene);
            return actor;
        };
        Popup.CreateTimeAlert = function (_id, _scene) {
            var master = masterManager_4.MasterManager.GetInstance();
            var gameManager = master.get_child(gameCommons_16.MANAGER_ID.kGameManager);
            var dataController = gameManager.getComponent(gameCommons_16.COMPONENT_ID.kDataController);
            var gameController = gameManager.getComponent(gameCommons_16.COMPONENT_ID.kGameController);
            var alert_sprite = (gameController._m_user_preferences.m_localization == gameCommons_16.LOCALIZATION.KSpanish
                ? 'cat_timeout_esp.png'
                : 'cat_timeout_en.png');
            var alert = mxActor_4.MxActor.Create(_id);
            var alertBackground = new spriteComponent_1.SpriteComponent();
            alertBackground.setSprite(_scene.add.sprite(0, 0, 'landpage_2', alert_sprite));
            alert.addComponent(alertBackground);
            var alertController = new alertPopupController_1.AlertPopupController();
            alertController.prepare(_scene);
            alert.addComponent(alertController);
            alert.init();
            return alert;
        };
        return Popup;
    }());
    exports.Popup = Popup;
});
define("game/components/textComponent", ["require", "exports", "utilities/component/mxComponent", "game/gameCommons"], function (require, exports, mxComponent_12, gameCommons_17) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TextComponent = /** @class */ (function (_super) {
        __extends(TextComponent, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function TextComponent() {
            var _this = _super.call(this, gameCommons_17.COMPONENT_ID.kText) || this;
            _this._m_local_position = new Phaser.Geom.Point(0.0, 0.0);
            return _this;
        }
        TextComponent.prototype.init = function (_actor) {
            return;
        };
        TextComponent.prototype.prepare = function (_scene, _text, _style) {
            this._m_text = _scene.add.text(this._m_local_position.x, this._m_local_position.y, _text, _style);
            return;
        };
        TextComponent.prototype.update = function (_actor) {
            this._m_text.x = _actor._m_position.x + this._m_local_position.x;
            this._m_text.y = _actor._m_position.y + this._m_local_position.y;
            return;
        };
        TextComponent.prototype.receive = function (_id, _data) {
            if (_id == gameCommons_17.MESSAGE_ID.kOnAgentActive) {
                this.setVisible(true);
                this.setActive(true);
                return;
            }
            else if (_id == gameCommons_17.MESSAGE_ID.kOnAgentDesactive) {
                this.setVisible(false);
                this.setActive(false);
                return;
            }
        };
        /**
         *
         * @param _size
         */
        TextComponent.prototype.setFontSize = function (_size) {
            this._m_text.setFontSize(_size);
            return;
        };
        /**
         *
         * @param _color
         */
        TextComponent.prototype.setFontColor = function (_color) {
            this._m_text.setColor(_color);
            return;
        };
        /**
         *
         * @param _color
         */
        TextComponent.prototype.setTint = function (_color) {
            this._m_text.setTint(_color);
            return;
        };
        /**
         * Set the alignment of the text in this Text object.
        * The argument can be one of: left, right, center or justify.
        * Alignment only works if the Text object has more than one line of text.
        *
        * @param align — The text alignment for multi-line text. Default 'left'.
         */
        TextComponent.prototype.setAlign = function (_align) {
            if (_align === void 0) { _align = "left"; }
            this._m_text.setAlign(_align);
            return;
        };
        /**
         *
         * @param _text
         */
        TextComponent.prototype.setText = function (_text) {
            this._m_text.text = _text;
            return;
        };
        TextComponent.prototype.setTextObject = function (_text) {
            this._m_text = _text;
            return;
        };
        TextComponent.prototype.getSize = function () {
            return new Phaser.Geom.Point(this._m_text.width, this._m_text.height);
        };
        TextComponent.prototype.getTextObject = function () {
            return this._m_text;
        };
        /**
        * Set the width (in pixels) to use for wrapping lines. Pass in null to remove wrapping by width.
        *
        * @param _width — The maximum width of a line in pixels. Set to null to remove wrapping.
        *
        * @param _useAdvancedWrap — Whether or not to use the advanced wrapping algorithm. If true, spaces are collapsed and whitespace is trimmed from lines. If false,
        * spaces and whitespace are left as is. Default false.
        */
        TextComponent.prototype.setWordWrapWidth = function (_width, _useAdvanceWrap) {
            if (_useAdvanceWrap === void 0) { _useAdvanceWrap = false; }
            this._m_text.setWordWrapWidth(_width, _useAdvanceWrap);
            return;
        };
        /**
         * Move the sprite local position (relative to the MxActor position).
         *
         * @param _x {number} Steps in the x axis.
         * @param _y {number} Steps in the y axis.
         */
        TextComponent.prototype.move = function (_x, _y) {
            this._m_local_position.x += _x;
            this._m_local_position.y += _y;
            return;
        };
        /**
         * Sets the local position (relative to the MxActor position) of the sprite.
         *
         * @param _x
         * @param _y
         */
        TextComponent.prototype.setPosition = function (_x, _y) {
            this._m_local_position.setTo(_x, _y);
            return;
        };
        /**
         * Gets the local position (relative to the MxActor position) of the sprite.
         */
        TextComponent.prototype.getPosition = function () {
            return new Phaser.Math.Vector2(this._m_local_position.x, this._m_local_position.y);
        };
        /**
         * The rotation of this Game Object, in degrees. Default 0.
         * @param _degrees {number} degrees.
         */
        TextComponent.prototype.setAngle = function (_degrees) {
            this._m_text.setAngle(_degrees);
        };
        TextComponent.prototype.setOrigin = function (_x, _y) {
            this._m_text.setOrigin(_x, _y);
            return;
        };
        TextComponent.prototype.setVisible = function (_visible) {
            this._m_text.setVisible(_visible);
            return;
        };
        TextComponent.prototype.setActive = function (_active) {
            this._m_text.setActive(_active);
            return;
        };
        TextComponent.prototype.destroy = function () {
            this._m_text.destroy();
            this._m_local_position = null;
            _super.prototype.destroy.call(this);
            return;
        };
        return TextComponent;
    }(mxComponent_12.MxComponent));
    exports.TextComponent = TextComponent;
});
define("game/ui/text/uiText", ["require", "exports", "game/components/textComponent"], function (require, exports, textComponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIText = /** @class */ (function () {
        function UIText() {
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * Adds an standard TextComponent.
         *
         * @param _scene
         * @param _label
         * @param _actor
         */
        UIText.AddStandard = function (_scene, _label, _actor) {
            var textComponent = new textComponent_1.TextComponent();
            _actor.addComponent(textComponent);
            textComponent.prepare(_scene, _label, { fontFamily: '"Roboto Condensed"' });
            textComponent.setFontSize(30);
            textComponent.setOrigin(0.5, 0.5);
            textComponent.setFontColor('black');
            textComponent.setAlign('center');
            return textComponent;
        };
        return UIText;
    }());
    exports.UIText = UIText;
});
define("game/ui/buttons/imgButton", ["require", "exports", "utilities/component/mxActor", "game/components/spriteComponent", "game/ui/text/uiBitmapText"], function (require, exports, mxActor_5, spriteComponent_2, uiBitmapText_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     *
     */
    var Button = /** @class */ (function () {
        function Button() {
        }
        /**
         *
         * @param _scene
         * @param _id
         * @param _x
         * @param _y
         * @param _texture
         * @param _frame
         * @param _fn
         * @param _context
         */
        Button.CreateImageButton = function (_scene, _id, _x, _y, _texture, _frame, _fn, _context) {
            var actor = mxActor_5.MxActor.Create(_id);
            actor.setRelativePosition(_x, _y);
            ///////////////////////////////////
            // Create Components
            var spriteComponent = new spriteComponent_2.SpriteComponent();
            actor.addComponent(spriteComponent);
            actor.init();
            ///////////////////////////////////
            // Prepare Components
            spriteComponent.setSprite(_scene.add.sprite(0, 0, _texture, _frame));
            spriteComponent.setInteractive();
            spriteComponent.on('pointerdown', _fn, _context);
            return actor;
        };
        Button.CreateStandard = function (_scene, _id, _x, _y, _texture, _frame, _label, _fn, _context) {
            var actor = mxActor_5.MxActor.Create(_id);
            actor.setRelativePosition(_x, _y);
            ///////////////////////////////////
            // Create Components
            var spriteComponent = new spriteComponent_2.SpriteComponent();
            actor.addComponent(spriteComponent);
            actor.init();
            ///////////////////////////////////
            // Prepare Components
            spriteComponent.setSprite(_scene.add.sprite(0, 0, _texture, _frame));
            spriteComponent.setInteractive();
            spriteComponent.on('pointerdown', _fn, _context);
            var textComponent = uiBitmapText_2.UIBitmapText.AddStandard(_scene, _label, actor);
            textComponent.setCenterAlign();
            textComponent.setTint(0x000000);
            textComponent.setOrigin(0.5, 0.75);
            textComponent.init(actor);
            return actor;
        };
        return Button;
    }());
    exports.Button = Button;
});
define("game/ui/carousel/components/carousleController", ["require", "exports", "utilities/component/mxComponent", "game/gameCommons", "game/managers/masteManager/masterManager"], function (require, exports, mxComponent_13, gameCommons_18, masterManager_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CarouselController = /** @class */ (function (_super) {
        __extends(CarouselController, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function CarouselController() {
            var _this = _super.call(this, gameCommons_18.COMPONENT_ID.kCarouselController) || this;
            return _this;
        }
        CarouselController.prototype.init = function (_actor) {
            this._m_actor = _actor;
            ///////////////////////////////////
            // Game Controller
            var master = masterManager_5.MasterManager.GetInstance();
            var gameManager = master.get_child(gameCommons_18.MANAGER_ID.kGameManager);
            this._gameController = gameManager.getComponent(gameCommons_18.COMPONENT_ID.kGameController);
            ///////////////////////////////////
            // DataController
            this._dataController = gameManager.getComponent(gameCommons_18.COMPONENT_ID.kDataController);
            ///////////////////////////////////
            // Left Button
            var leftButton = _actor.get_child(gameCommons_18.CAROUSEL_CHILD_ID.kLeftButton);
            var leftButton_sprite = leftButton.getComponent(gameCommons_18.COMPONENT_ID.kSprite);
            leftButton_sprite.on('pointerdown', this._onClick_leftButton, this);
            ///////////////////////////////////
            // Right Button
            var rightButton = _actor.get_child(gameCommons_18.CAROUSEL_CHILD_ID.kRightButton);
            var rightButton_sprite = rightButton.getComponent(gameCommons_18.COMPONENT_ID.kSprite);
            rightButton_sprite.on('pointerdown', this._onClick_rightButton, this);
            ///////////////////////////////////
            // ClockName Text
            var clockName = _actor.get_child(gameCommons_18.CAROUSEL_CHILD_ID.kClockName);
            this._clockName_text = clockName.getComponent(gameCommons_18.COMPONENT_ID.kBitmapText);
            ///////////////////////////////////
            // Preview SpriteComponent
            var preview = _actor.get_child(gameCommons_18.CAROUSEL_CHILD_ID.kPreview);
            this._carouselSprite = preview.getComponent(gameCommons_18.COMPONENT_ID.kSprite);
            this._activeIndex = 0;
            this._setActiveItem(this._activeIndex);
            return;
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        CarouselController.prototype._onClick_leftButton = function () {
            --this._activeIndex;
            if (this._activeIndex < 0) {
                this._activeIndex = gameCommons_18.CLOCK_STYLE.kCount - 1;
            }
            this._setActiveItem(this._activeIndex);
            return;
        };
        CarouselController.prototype._onClick_rightButton = function () {
            ++this._activeIndex;
            if (this._activeIndex >= gameCommons_18.CLOCK_STYLE.kCount) {
                this._activeIndex = 0;
            }
            this._setActiveItem(this._activeIndex);
            return;
        };
        CarouselController.prototype._setActiveItem = function (_idx) {
            // Send Button Down Message.
            this._m_actor.sendMessage(gameCommons_18.MESSAGE_ID.kButtonDown, null);
            // Set clock name.
            this._clockName_text.setText(this._dataController.getString('clock_name_' + _idx));
            // Set clock preview.
            this._carouselSprite.setFrame('clock_idx_' + _idx + '.png');
            // Set user preference.
            this._gameController._m_user_preferences.setClockStyle(_idx);
            return;
        };
        return CarouselController;
    }(mxComponent_13.MxComponent));
    exports.CarouselController = CarouselController;
});
define("game/ui/carousel/components/carouselSound", ["require", "exports", "utilities/component/mxComponent", "game/gameCommons"], function (require, exports, mxComponent_14, gameCommons_19) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CarouselSound = /** @class */ (function (_super) {
        __extends(CarouselSound, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function CarouselSound() {
            var _this = _super.call(this, gameCommons_19.COMPONENT_ID.kCarouselSound) || this;
            return _this;
        }
        CarouselSound.prototype.prepare = function (_baseSoundManager) {
            this._m_baseSoundManager = _baseSoundManager;
            return;
        };
        CarouselSound.prototype.receive = function (_id, _data) {
            switch (_id) {
                case gameCommons_19.MESSAGE_ID.kButtonDown:
                    // Play Audio
                    this._m_baseSoundManager.playAudioSprite(gameCommons_19.MimiKSounds.kMimiKAudioSprite, gameCommons_19.MimiKSounds.kButtonCarousel);
                    return;
            }
        };
        CarouselSound.prototype.destroy = function () {
            this._m_baseSoundManager = null;
            return;
        };
        return CarouselSound;
    }(mxComponent_14.MxComponent));
    exports.CarouselSound = CarouselSound;
});
define("game/ui/carousel/carousel", ["require", "exports", "game/ui/buttons/imgButton", "utilities/component/mxActor", "game/gameCommons", "game/components/spriteComponent", "game/ui/carousel/components/carousleController", "game/ui/text/uiBitmapText", "game/managers/masteManager/masterManager", "game/ui/carousel/components/carouselSound"], function (require, exports, imgButton_1, mxActor_6, gameCommons_20, spriteComponent_3, carousleController_1, uiBitmapText_3, masterManager_6, carouselSound_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Carousel = /** @class */ (function () {
        function Carousel() {
        }
        Carousel.Create = function (_scene, _id) {
            // Get Data Manager.
            var master = masterManager_6.MasterManager.GetInstance();
            var gameManager = master.get_child(gameCommons_20.MANAGER_ID.kGameManager);
            var dataController = gameManager.getComponent(gameCommons_20.COMPONENT_ID.kDataController);
            var carousel = mxActor_6.MxActor.Create(_id);
            /****************************************************/
            /* Children                                         */
            /****************************************************/
            ///////////////////////////////////
            // Title
            var label = mxActor_6.MxActor.Create(gameCommons_20.CAROUSEL_CHILD_ID.kTitle);
            var labelText = uiBitmapText_3.UIBitmapText.AddStandard(_scene, dataController.getString('choose_clock'), label);
            labelText.setOrigin(0.5, 0.5);
            labelText.setFontSize(60);
            label.init();
            label.setRelativePosition(0.0, -315.0);
            carousel.addChild(label);
            ///////////////////////////////////
            // Preview Background
            var previewBackground = mxActor_6.MxActor.Create(gameCommons_20.CAROUSEL_CHILD_ID.kPreviewBackground, carousel);
            var backgroundImg = new spriteComponent_3.SpriteComponent();
            backgroundImg.setSprite(_scene.add.sprite(0, 0, 'landpage', 'clock_background.png'));
            previewBackground.addComponent(backgroundImg);
            ///////////////////////////////////
            // Preview
            var preview = mxActor_6.MxActor.Create(gameCommons_20.CAROUSEL_CHILD_ID.kPreview);
            var preview_sprite = new spriteComponent_3.SpriteComponent();
            preview_sprite.setSprite(_scene.add.sprite(0, 0, 'landpage', 'clock_idx_0.png'));
            preview.addComponent(preview_sprite);
            preview.init();
            carousel.addChild(preview);
            ///////////////////////////////////
            // Left Button
            var leftButton = imgButton_1.Button.CreateImageButton(_scene, gameCommons_20.CAROUSEL_CHILD_ID.kLeftButton, -350, 0, 'landpage', 'arrow_button.png', function () { }, this);
            var leftButton_sprite = leftButton.getComponent(gameCommons_20.COMPONENT_ID.kSprite);
            leftButton_sprite.setScale(-1.0, 1.0);
            leftButton_sprite.setTint(0x7763ad);
            carousel.addChild(leftButton);
            ///////////////////////////////////
            // Right Button
            var rightButton = imgButton_1.Button.CreateImageButton(_scene, gameCommons_20.CAROUSEL_CHILD_ID.kRightButton, 350, 0, 'landpage', 'arrow_button.png', function () { }, this);
            var rightButton_sprite = rightButton.getComponent(gameCommons_20.COMPONENT_ID.kSprite);
            rightButton_sprite.setTint(0x7763ad);
            carousel.addChild(rightButton);
            ///////////////////////////////////
            // Clock Name
            var clock_name = mxActor_6.MxActor.Create(gameCommons_20.CAROUSEL_CHILD_ID.kClockName);
            var clock_name_text = uiBitmapText_3.UIBitmapText.AddStandard(_scene, '', clock_name);
            clock_name_text.setOrigin(0.5, 0.5);
            clock_name.init();
            clock_name.setRelativePosition(0.0, 290.0);
            carousel.addChild(clock_name);
            /****************************************************/
            /* Components                                       */
            /****************************************************/
            var carouselController = new carousleController_1.CarouselController();
            carousel.addComponent(carouselController);
            carouselController.init(carousel);
            var carouselSound = new carouselSound_1.CarouselSound();
            carouselSound.prepare(_scene.sound);
            carouselSound.init(carousel);
            carousel.addComponent(carouselSound);
            return carousel;
        };
        return Carousel;
    }());
    exports.Carousel = Carousel;
});
define("game/components/shaderComponent", ["require", "exports", "utilities/component/mxComponent", "game/gameCommons"], function (require, exports, mxComponent_15, gameCommons_21) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ShaderComponent = /** @class */ (function (_super) {
        __extends(ShaderComponent, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function ShaderComponent() {
            var _this = _super.call(this, gameCommons_21.COMPONENT_ID.kShaderComponent) || this;
            _this._m_local_position = new Phaser.Geom.Point(0.0, 0.0);
            return _this;
        }
        ShaderComponent.prototype.update = function (_actor) {
            this._m_shader.x = _actor._m_position.x + this._m_local_position.x;
            this._m_shader.y = _actor._m_position.y + this._m_local_position.y;
            return;
        };
        ShaderComponent.prototype.receive = function (_id, _data) {
            if (_id == gameCommons_21.MESSAGE_ID.kOnAgentActive) {
                this.setVisible(true);
                this.setActive(true);
                return;
            }
            else if (_id == gameCommons_21.MESSAGE_ID.kOnAgentDesactive) {
                this.setVisible(false);
                this.setActive(false);
                return;
            }
        };
        ShaderComponent.prototype.setUniform = function (_uniform, _value) {
            this._m_shader.setUniform(_uniform, _value);
            return;
        };
        ShaderComponent.prototype.prepare = function (_shader) {
            this._m_shader = _shader;
            return;
        };
        ShaderComponent.prototype.setMask = function (_mask) {
            this._m_shader.setMask(_mask);
            return;
        };
        ShaderComponent.prototype.createMask = function () {
            return this._m_shader.createBitmapMask();
        };
        ShaderComponent.prototype.getShader = function () {
            return this._m_shader;
        };
        ShaderComponent.prototype.getWidth = function () {
            return this._m_shader.width;
        };
        ShaderComponent.prototype.getHeight = function () {
            return this._m_shader.height;
        };
        /**
         * Move the sprite local position (relative to the MxActor position).
         *
         * @param _x {number} Steps in the x axis.
         * @param _y {number} Steps in the y axis.
         */
        ShaderComponent.prototype.move = function (_x, _y) {
            this._m_local_position.x += _x;
            this._m_local_position.y += _y;
            return;
        };
        /**
         * Sets the local position (relative to the MxActor position) of the sprite.
         *
         * @param _x
         * @param _y
         */
        ShaderComponent.prototype.setPosition = function (_x, _y) {
            this._m_local_position.setTo(_x, _y);
            return;
        };
        /**
         * Gets the local position (relative to the MxActor position) of the sprite.
         */
        ShaderComponent.prototype.getPosition = function () {
            return new Phaser.Math.Vector2(this._m_local_position.x, this._m_local_position.y);
        };
        /**
         *
         */
        ShaderComponent.prototype.setInteractive = function () {
            this._m_shader.setInteractive();
            return;
        };
        /**
         *
         * @param _event
         * @param _fn
         * @param _context
         */
        ShaderComponent.prototype.on = function (_event, _fn, _context) {
            this._m_shader.on(_event, _fn, _context);
            return;
        };
        /**
         * The rotation of this Game Object, in degrees. Default 0.
         * @param _degrees {number} degrees.
         */
        ShaderComponent.prototype.setAngle = function (_degrees) {
            this._m_shader.setAngle(_degrees);
        };
        ShaderComponent.prototype.setOrigin = function (_x, _y) {
            this._m_shader.setOrigin(_x, _y);
            return;
        };
        ShaderComponent.prototype.setVisible = function (_visible) {
            this._m_shader.setVisible(_visible);
            return;
        };
        ShaderComponent.prototype.setScale = function (_x, _y) {
            this._m_shader.setScale(_x, _y);
            return;
        };
        ShaderComponent.prototype.setActive = function (_active) {
            this._m_shader.setActive(_active);
            return;
        };
        ShaderComponent.prototype.destroy = function () {
            this._m_shader.destroy();
            this._m_local_position = null;
            _super.prototype.destroy.call(this);
            return;
        };
        return ShaderComponent;
    }(mxComponent_15.MxComponent));
    exports.ShaderComponent = ShaderComponent;
});
define("utilities/shaders/mxShader", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxShader = /** @class */ (function () {
        function MxShader() {
        }
        MxShader.InitUniform = function (_key, _shader) {
            if (_key == null || _key === undefined) {
                return;
            }
            if (_shader == null || _shader === undefined) {
                return;
            }
            var gl = _shader.gl;
            var renderer = _shader.renderer;
            var map = renderer.glFuncMap;
            var program = _shader.program;
            var uniform = _shader.getUniform(_key);
            if (uniform == null) {
                return;
            }
            var type = uniform.type;
            var data = map[type];
            uniform.uniformLocation = gl.getUniformLocation(program, _key);
            if (type !== 'sampler2D') {
                uniform.glMatrix = data.matrix;
                uniform.glValueLength = data.length;
                uniform.glFunc = data.func;
            }
            return;
        };
        return MxShader;
    }());
    exports.MxShader = MxShader;
});
define("game/ui/shaders/components/backgroundController", ["require", "exports", "utilities/component/mxComponent", "game/gameCommons", "game/managers/masteManager/masterManager"], function (require, exports, mxComponent_16, gameCommons_22, masterManager_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BackgroundController = /** @class */ (function (_super) {
        __extends(BackgroundController, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function BackgroundController() {
            var _this = _super.call(this, gameCommons_22.COMPONENT_ID.kBackgroundShaderComponent) || this;
            return _this;
        }
        BackgroundController.prototype.init = function (_actor) {
            var master = masterManager_7.MasterManager.GetInstance();
            this._m_masterController = master.getComponent(gameCommons_22.COMPONENT_ID.kMasterController);
            this._m_shaderComponent = _actor.getComponent(gameCommons_22.COMPONENT_ID.kShaderComponent);
            ///////////////////////////////////
            // Color11 A
            this._m_color11_a = new Float32Array(4);
            this._m_color11_a[0] = 0.13;
            this._m_color11_a[1] = 0.41;
            this._m_color11_a[2] = 0.44;
            this._m_color11_a[3] = 1.0;
            ///////////////////////////////////
            // Color11 B
            this._m_color11_b = new Float32Array(4);
            this._m_color11_b[0] = 0.03;
            this._m_color11_b[1] = 0.0;
            this._m_color11_b[2] = 0.21;
            this._m_color11_b[3] = 1.0;
            ///////////////////////////////////
            // Color11 T
            this._m_color11_t = new Float32Array(4);
            ///////////////////////////////////
            // Color 21
            this._m_color21 = new Float32Array(4);
            this._m_color21[0] = 0.03;
            this._m_color21[1] = 0.0;
            this._m_color21[2] = 0.21;
            this._m_color21[3] = 1.0;
            ///////////////////////////////////
            // Color 12
            this._m_color12 = new Float32Array(4);
            this._m_color12[0] = 0.03;
            this._m_color12[1] = 0.0;
            this._m_color12[2] = 0.21;
            this._m_color12[3] = 1.0;
            ///////////////////////////////////
            // Color 22 A
            this._m_color22_a = new Float32Array(4);
            this._m_color22_a[0] = 0.32;
            this._m_color22_a[1] = 0.06;
            this._m_color22_a[2] = 0.38;
            this._m_color22_a[3] = 1.0;
            ///////////////////////////////////
            // Color 22 B
            this._m_color22_b = new Float32Array(4);
            this._m_color22_b[0] = 0.47;
            this._m_color22_b[1] = 0.10;
            this._m_color22_b[2] = 0.56;
            this._m_color22_b[3] = 1.0;
            ///////////////////////////////////
            // Color 22 T
            this._m_color22_t = new Float32Array(4);
            ///////////////////////////////////
            // Init Shader
            this._m_shaderComponent.setUniform('color11.value.x', this._m_color11_a[0]);
            this._m_shaderComponent.setUniform('color11.value.y', this._m_color11_a[1]);
            this._m_shaderComponent.setUniform('color11.value.z', this._m_color11_a[2]);
            this._m_shaderComponent.setUniform('color11.value.w', this._m_color11_a[3]);
            this._m_shaderComponent.setUniform('color21.value.x', this._m_color21[0]);
            this._m_shaderComponent.setUniform('color21.value.y', this._m_color21[1]);
            this._m_shaderComponent.setUniform('color21.value.z', this._m_color21[2]);
            this._m_shaderComponent.setUniform('color21.value.w', this._m_color21[3]);
            this._m_shaderComponent.setUniform('color12.value.x', this._m_color12[0]);
            this._m_shaderComponent.setUniform('color12.value.y', this._m_color12[1]);
            this._m_shaderComponent.setUniform('color12.value.z', this._m_color12[2]);
            this._m_shaderComponent.setUniform('color12.value.w', this._m_color12[3]);
            this._m_shaderComponent.setUniform('color22.value.x', this._m_color22_a[0]);
            this._m_shaderComponent.setUniform('color22.value.y', this._m_color22_a[1]);
            this._m_shaderComponent.setUniform('color22.value.z', this._m_color22_a[2]);
            this._m_shaderComponent.setUniform('color22.value.w', this._m_color22_a[3]);
            this._m_time = 0.0;
            return;
        };
        BackgroundController.prototype.update = function (_actor) {
            this._m_time += this._m_masterController.m_dt;
            var t = Math.sin(this._m_time);
            this._interpolateColor(t, this._m_color22_a, this._m_color22_b, this._m_color22_t);
            this._m_shaderComponent.setUniform('color22.value.x', this._m_color22_t[0]);
            this._m_shaderComponent.setUniform('color22.value.y', this._m_color22_t[1]);
            this._m_shaderComponent.setUniform('color22.value.z', this._m_color22_t[2]);
            this._interpolateColor(t, this._m_color11_a, this._m_color11_b, this._m_color11_t);
            this._m_shaderComponent.setUniform('color11.value.x', this._m_color11_t[0]);
            this._m_shaderComponent.setUniform('color11.value.y', this._m_color11_t[1]);
            this._m_shaderComponent.setUniform('color11.value.z', this._m_color11_t[2]);
            return;
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        BackgroundController.prototype._interpolateColor = function (_x, _color1, _color2, _output) {
            _output[0] = _color1[0] + ((_color2[0] - _color1[0]) * _x);
            _output[1] = _color1[1] + ((_color2[1] - _color1[1]) * _x);
            _output[2] = _color1[2] + ((_color2[2] - _color1[2]) * _x);
            _output[3] = _color1[3] + ((_color2[3] - _color1[3]) * _x);
            return;
        };
        return BackgroundController;
    }(mxComponent_16.MxComponent));
    exports.BackgroundController = BackgroundController;
});
define("game/ui/shaders/shadersFactory", ["require", "exports", "utilities/component/mxActor", "game/components/shaderComponent", "utilities/shaders/mxShader", "game/ui/shaders/components/backgroundController"], function (require, exports, mxActor_7, shaderComponent_1, mxShader_1, backgroundController_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ShaderFactory = /** @class */ (function () {
        function ShaderFactory() {
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        ShaderFactory.CreateBackground = function (_scene, _id) {
            var shader = mxActor_7.MxActor.Create(_id);
            var shaderComponent = new shaderComponent_1.ShaderComponent();
            var phaserShader = _scene.add.shader('background', 0, 0, _scene.game.canvas.width, _scene.game.canvas.height);
            phaserShader.setOrigin(0.0, 0.0);
            phaserShader.uniforms.color11 =
                {
                    type: "4f", value: { x: 0.5, y: 0.5, z: 0.5, w: 1.0 }
                };
            mxShader_1.MxShader.InitUniform('color11', phaserShader);
            phaserShader.uniforms.color21 =
                {
                    type: "4f", value: { x: 0.5, y: 0.5, z: 0.5, w: 1.0 }
                };
            mxShader_1.MxShader.InitUniform('color21', phaserShader);
            phaserShader.uniforms.color12 =
                {
                    type: "4f", value: { x: 0.5, y: 0.5, z: 0.5, w: 1.0 }
                };
            mxShader_1.MxShader.InitUniform('color12', phaserShader);
            phaserShader.uniforms.color22 =
                {
                    type: "4f", value: { x: 0.5, y: 0.5, z: 0.5, w: 1.0 }
                };
            mxShader_1.MxShader.InitUniform('color22', phaserShader);
            shaderComponent.prepare(phaserShader);
            shader.addComponent(shaderComponent);
            shader.addComponent(new backgroundController_1.BackgroundController());
            shader.init();
            return shader;
        };
        return ShaderFactory;
    }());
    exports.ShaderFactory = ShaderFactory;
});
define("scenes/menus/mainMenu", ["require", "exports", "game/managers/masteManager/masterManager", "game/gameCommons", "game/ui/cloudPopup/Popup", "game/ui/carousel/carousel", "game/ui/buttons/imgButton", "game/ui/shaders/shadersFactory"], function (require, exports, masterManager_8, gameCommons_23, Popup_1, carousel_1, imgButton_2, shadersFactory_1) {
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
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        MainMenu.prototype.create = function () {
            // gameCommons
            var half_width = this.game.canvas.width * 0.5;
            // MasterManager
            var master = masterManager_8.MasterManager.GetInstance();
            // MasterController
            this._m_masterController = master.getComponent(gameCommons_23.COMPONENT_ID.kMasterController);
            // GameManager.
            var gameManager = master.get_child(gameCommons_23.MANAGER_ID.kGameManager);
            // GameController
            this._m_gameController
                = gameManager.getComponent(gameCommons_23.COMPONENT_ID.kGameController);
            // DataController
            this._m_dataController
                = gameManager.getComponent(gameCommons_23.COMPONENT_ID.kDataController);
            /****************************************************/
            /* Background                                       */
            /****************************************************/
            this._m_backgroundShader = shadersFactory_1.ShaderFactory.CreateBackground(this, 0);
            ///////////////////////////////////
            // Particle Emitter
            this._createParticleEmitter();
            /****************************************************/
            /* Tip Popup                                        */
            /****************************************************/
            this._m_cloud_popup = Popup_1.Popup.CreateCloud(this, 1);
            this._m_cloud_popup.setRelativePosition(half_width, 1660);
            // display first tip.
            this._m_tip_num = 0;
            this._nextTip();
            /****************************************************/
            /* Minutes Buttons                                  */
            /****************************************************/
            // Time Preferences Buttons
            this._m_a_preferenceButtons = new Array();
            var but_pos = new Phaser.Geom.Point(half_width, this.game.canvas.height * 0.47);
            var button;
            var nineSliceComponent;
            var prefButtonText;
            var a_times = [5, 3, 1];
            var a_buttonColors = [0x31a13b, 0x205e40, 0x14293d];
            var _loop_1 = function (index) {
                button = imgButton_2.Button.CreateStandard(this_1, index, but_pos.x, but_pos.y, 'landpage', 'button.png', '' + a_times[index] + ' ' + this_1._m_dataController.getString('minutes'), function () {
                    this._onClick_minute_button(a_times[index] * 60);
                }, this_1);
                this_1._m_a_preferenceButtons.push(button);
                nineSliceComponent = button.getComponent(gameCommons_23.COMPONENT_ID.kSprite);
                nineSliceComponent.setTint(a_buttonColors[index]);
                but_pos.y += nineSliceComponent.getHeight() + 20;
                prefButtonText = button.getComponent(gameCommons_23.COMPONENT_ID.kBitmapText);
                prefButtonText.setFontSize(55);
                prefButtonText.setTint(0xffffff);
            };
            var this_1 = this;
            for (var index = 0; index < a_times.length; ++index) {
                _loop_1(index);
            }
            this._close_prefs();
            /****************************************************/
            /* Play Button                                      */
            /****************************************************/
            this._m_play_button = imgButton_2.Button.CreateStandard(this, 0, half_width, this.game.canvas.height * 0.47, 'landpage', 'button.png', this._m_dataController.getString('ready'), this._onClick_play, this);
            var playButtonText = this._m_play_button.getComponent(gameCommons_23.COMPONENT_ID.kBitmapText);
            playButtonText.setTint(0xffffff);
            playButtonText.setFontSize(65);
            var playButtonSprite = this._m_play_button.getComponent(gameCommons_23.COMPONENT_ID.kSprite);
            playButtonSprite.setTint(0x31a13b);
            /****************************************************/
            /* Next Tip Button                                  */
            /****************************************************/
            this._m_nextTipButton = imgButton_2.Button.CreateStandard(this, 0, half_width, this.game.canvas.height * 0.93, 'landpage', 'button_small_bg.png', this._m_dataController.getString('other_tip'), this._nextTip, this);
            var tipButtonText = this._m_nextTipButton.getComponent(gameCommons_23.COMPONENT_ID.kBitmapText);
            tipButtonText.setTint(0xffffff);
            var tipButtonSprite = this._m_nextTipButton.getComponent(gameCommons_23.COMPONENT_ID.kSprite);
            tipButtonSprite.setTint(0xff5709);
            /****************************************************/
            /* Carousel                                         */
            /****************************************************/
            this._m_carousel = carousel_1.Carousel.Create(this, 1);
            this._m_carousel.setRelativePosition(this.game.canvas.width * 0.5, this.game.canvas.height * 0.22);
            /****************************************************/
            /* Background Sound                                 */
            /****************************************************/
            // Play Audio
            this.sound.playAudioSprite(gameCommons_23.MimiKSounds.kMimiKAudioSprite, gameCommons_23.MimiKSounds.kBackgroundInstrumental, { loop: true });
            return;
        };
        /**
         *
         */
        MainMenu.prototype.update = function (_time, _delta) {
            this._m_masterController.m_dt = _delta / 1000.0;
            this._m_backgroundShader.update();
            this._m_nextTipButton.update();
            this._m_play_button.update();
            this._m_cloud_popup.update();
            this._m_carousel.update();
            this._m_a_preferenceButtons.forEach(function (_button) {
                _button.update();
            });
            return;
        };
        /**
        * Safely destroys the object.
        */
        MainMenu.prototype.destroy = function () {
            this._m_backgroundShader.destroy();
            this._m_backgroundShader = null;
            this._m_nextTipButton.destroy();
            this._m_nextTipButton = null;
            this._m_carousel.destroy();
            this._m_carousel = null;
            this._m_cloud_popup.destroy();
            this._m_cloud_popup = null;
            this._m_play_button.destroy();
            while (this._m_a_preferenceButtons.length) {
                var button = this._m_a_preferenceButtons.pop();
                button.destroy();
            }
            this._m_a_preferenceButtons = null;
            this._m_dataController = null;
            this._m_gameController = null;
            this.sound.removeByKey(gameCommons_23.MimiKSounds.kMimiKAudioSprite);
            return;
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        MainMenu.prototype._onClick_minute_button = function (_time) {
            this._m_gameController._m_user_preferences.chrono_value = _time;
            // Play Audio
            this.sound.playAudioSprite(gameCommons_23.MimiKSounds.kMimiKAudioSprite, gameCommons_23.MimiKSounds.kButtonPause);
            this.destroy();
            this.scene.start('mainGame');
            return;
        };
        MainMenu.prototype._close_prefs = function () {
            this._m_a_preferenceButtons.forEach(function (_button) {
                _button.mxDesactive();
            }, this);
            return;
        };
        MainMenu.prototype._open_prefs = function () {
            this._m_a_preferenceButtons.forEach(function (_button) {
                _button.mxActive();
            }, this);
            return;
        };
        MainMenu.prototype._onClick_play = function () {
            // Play Audio
            this.sound.playAudioSprite(gameCommons_23.MimiKSounds.kMimiKAudioSprite, gameCommons_23.MimiKSounds.kButtonPause);
            this._open_prefs();
            this._m_play_button.mxDesactive();
            return;
        };
        MainMenu.prototype._nextTip = function () {
            var popupController = this._m_cloud_popup.getComponent(gameCommons_23.COMPONENT_ID.kPopupController);
            popupController.setText(this._m_dataController.getString('menu_tip_0' + this._m_tip_num));
            popupController.close();
            popupController.open();
            // Play Audio
            this.sound.playAudioSprite(gameCommons_23.MimiKSounds.kMimiKAudioSprite, gameCommons_23.MimiKSounds.kButtonTip);
            // iterate over tips.
            this._m_tip_num++;
            if (this._m_tip_num > 5) {
                this._m_tip_num = 0;
            }
            return;
        };
        MainMenu.prototype._createParticleEmitter = function () {
            var emitterShape = new Phaser.Geom.Rectangle(0, 0, this.game.canvas.width, this.game.canvas.height);
            this._m_particlesEmitterManager = this.add.particles('landpage');
            this._m_particlesEmitter = this._m_particlesEmitterManager.createEmitter({
                frame: ['particle_01.png', 'particle_02.png'],
                x: 0, y: 0,
                lifespan: 500,
                scale: 0.5,
                rotate: { min: 0.0, max: 90.0 },
                frequency: 50,
                quantity: 1,
                alpha: { start: 1, end: 0 },
                blendMode: 'ADD',
                tint: [0x0d5da4, 0x501160],
                emitZone: { type: 'random', source: emitterShape }
            });
            return;
        };
        return MainMenu;
    }(Phaser.Scene));
    exports.MainMenu = MainMenu;
});
define("game/ui/clocks/components/clockController", ["require", "exports", "utilities/component/mxComponent", "game/gameCommons", "game/managers/masteManager/masterManager"], function (require, exports, mxComponent_17, gameCommons_24, masterManager_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ClockController = /** @class */ (function (_super) {
        __extends(ClockController, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function ClockController() {
            var _this = _super.call(this, gameCommons_24.COMPONENT_ID.kClockController) || this;
            _this.m_isPaused = true;
            _this._m_totalSeconds = 0.0;
            _this.m_current_time = 0.0;
            return _this;
        }
        ClockController.prototype.prepare = function (_scene) {
            return;
        };
        ClockController.prototype.init = function (_actor) {
            var master = masterManager_9.MasterManager.GetInstance();
            this._m_masterController = master.getComponent(gameCommons_24.COMPONENT_ID.kMasterController);
            var gameManager = master.get_child(gameCommons_24.MANAGER_ID.kGameManager);
            this._m_gameController = gameManager.getComponent(gameCommons_24.COMPONENT_ID.kGameController);
            this._m_totalSeconds = this._m_gameController._m_user_preferences.chrono_value;
            this.m_current_time = this._m_totalSeconds;
            this._m_actor = _actor;
            this.reset();
            return;
        };
        ClockController.prototype.update = function (_actor) {
            if (!this.m_isPaused) {
                this.m_current_time -= this._m_masterController.m_dt;
                if (this.m_current_time <= 0.0) {
                    this.m_current_time = 0.0;
                    this.timeOut();
                }
                else if (this.m_current_time < 10 && !this._m_areFinalSeconds) {
                    this._m_areFinalSeconds = !this._m_areFinalSeconds;
                    this._m_actor.sendMessage(gameCommons_24.MESSAGE_ID.kClockTenSecondsAlert, null);
                }
            }
            return;
        };
        ClockController.prototype.pause = function () {
            if (!this.m_isPaused) {
                this.m_isPaused = !this.m_isPaused;
                this._m_actor.sendMessage(gameCommons_24.MESSAGE_ID.kClockPaused, null);
            }
            return;
        };
        ClockController.prototype.resume = function () {
            if (this._m_isTimeOut) {
                return;
            }
            if (this.m_isPaused) {
                this.m_isPaused = !this.m_isPaused;
                this._m_actor.sendMessage(gameCommons_24.MESSAGE_ID.kClockResumed, null);
            }
            return;
        };
        ClockController.prototype.reset = function () {
            this.m_current_time = this._m_totalSeconds;
            this._m_isTimeOut = false;
            this._m_areFinalSeconds = false;
            this._m_actor.sendMessage(gameCommons_24.MESSAGE_ID.kClockReset, null);
            this.pause();
            return;
        };
        ClockController.prototype.timeOut = function () {
            if (!this._m_isTimeOut) {
                this._m_isTimeOut = !this._m_isTimeOut;
                this.pause();
                this._m_gameController.timeout();
                this._m_actor.sendMessage(gameCommons_24.MESSAGE_ID.kTimeOut, null);
            }
            return;
        };
        return ClockController;
    }(mxComponent_17.MxComponent));
    exports.ClockController = ClockController;
});
define("utilities/date_time", ["require", "exports", "utilities/asserts"], function (require, exports, asserts_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function GetHHMMSS(_seconds) {
        asserts_6.AssertNumber(_seconds);
        _seconds = Math.floor(_seconds);
        var hours = Math.floor(_seconds / 3600);
        var minutes = Math.floor((_seconds - (hours * 3600)) / 60);
        var seconds = _seconds - (hours * 3600) - (minutes * 60);
        var time = "";
        // Hours
        if (hours < 10) {
            time += "0" + hours;
        }
        else {
            time += hours;
        }
        time += ' : ';
        // Minutes
        if (minutes < 10) {
            time += "0" + minutes;
        }
        else {
            time += minutes;
        }
        time += ' : ';
        // Seconds
        if (seconds < 10) {
            time += "0" + seconds;
        }
        else {
            time += seconds;
        }
        return time;
    }
    exports.GetHHMMSS = GetHHMMSS;
    function GetMMSS(_seconds) {
        asserts_6.AssertNumber(_seconds);
        _seconds = Math.floor(_seconds);
        var hours = Math.floor(_seconds / 3600);
        var minutes = Math.floor((_seconds - (hours * 3600)) / 60);
        var seconds = _seconds - (hours * 3600) - (minutes * 60);
        var time = "";
        // Minutes
        if (minutes < 10) {
            time += "0" + minutes;
        }
        else {
            time += minutes;
        }
        time += ' : ';
        // Seconds
        if (seconds < 10) {
            time += "0" + seconds;
        }
        else {
            time += seconds;
        }
        return time;
    }
    exports.GetMMSS = GetMMSS;
});
define("game/ui/clocks/components/digitalController", ["require", "exports", "utilities/component/mxComponent", "game/gameCommons", "utilities/date_time"], function (require, exports, mxComponent_18, gameCommons_25, date_time_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DigitalController = /** @class */ (function (_super) {
        __extends(DigitalController, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function DigitalController() {
            var _this = _super.call(this, gameCommons_25.COMPONENT_ID.kDigitalClockController) || this;
            return _this;
        }
        DigitalController.prototype.init = function (_actor) {
            this._m_textComponent = _actor.getComponent(gameCommons_25.COMPONENT_ID.kBitmapText);
            this._m_clockController = _actor.getComponent(gameCommons_25.COMPONENT_ID.kClockController);
            return;
        };
        DigitalController.prototype.update = function (_actor) {
            this._m_textComponent.setText(date_time_1.GetMMSS(this._m_clockController.m_current_time));
            return;
        };
        DigitalController.prototype.destroy = function () {
            this._m_clockController = null;
            this._m_textComponent = null;
            return;
        };
        return DigitalController;
    }(mxComponent_18.MxComponent));
    exports.DigitalController = DigitalController;
});
define("game/components/graphicsComponent", ["require", "exports", "utilities/component/mxComponent", "game/gameCommons"], function (require, exports, mxComponent_19, gameCommons_26) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GraphicsComponent = /** @class */ (function (_super) {
        __extends(GraphicsComponent, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function GraphicsComponent() {
            var _this = _super.call(this, gameCommons_26.COMPONENT_ID.kGraphicsComponent) || this;
            _this._m_local_position = new Phaser.Geom.Point(0.0, 0.0);
            return _this;
        }
        GraphicsComponent.prototype.prepare = function (_scene) {
            this._m_graphic = _scene.add.graphics();
            return;
        };
        GraphicsComponent.prototype.update = function (_actor) {
            this._m_graphic.x = _actor._m_position.x + this._m_local_position.x;
            this._m_graphic.y = _actor._m_position.y + this._m_local_position.y;
            return;
        };
        GraphicsComponent.prototype.receive = function (_id, _data) {
            if (_id == gameCommons_26.MESSAGE_ID.kOnAgentActive) {
                this.setVisible(true);
                this.setActive(true);
                return;
            }
            else if (_id == gameCommons_26.MESSAGE_ID.kOnAgentDesactive) {
                this.setVisible(false);
                this.setActive(false);
                return;
            }
        };
        GraphicsComponent.prototype.getGraphic = function () {
            return this._m_graphic;
        };
        GraphicsComponent.prototype.setTexture = function (_texture_key) {
            this._m_graphic.setTexture(_texture_key);
            return;
        };
        /**
         * Move the sprite local position (relative to the MxActor position).
         *
         * @param _x {number} Steps in the x axis.
         * @param _y {number} Steps in the y axis.
         */
        GraphicsComponent.prototype.move = function (_x, _y) {
            this._m_local_position.x += _x;
            this._m_local_position.y += _y;
            return;
        };
        /**
         * Sets the local position (relative to the MxActor position) of the sprite.
         *
         * @param _x
         * @param _y
         */
        GraphicsComponent.prototype.setPosition = function (_x, _y) {
            this._m_local_position.setTo(_x, _y);
            return;
        };
        /**
         * Gets the local position (relative to the MxActor position) of the sprite.
         */
        GraphicsComponent.prototype.getPosition = function () {
            return new Phaser.Math.Vector2(this._m_local_position.x, this._m_local_position.y);
        };
        /**
         *
         */
        GraphicsComponent.prototype.setInteractive = function () {
            this._m_graphic.setInteractive();
            return;
        };
        /**
         *
         * @param _event
         * @param _fn
         * @param _context
         */
        GraphicsComponent.prototype.on = function (_event, _fn, _context) {
            this._m_graphic.on(_event, _fn, _context);
            return;
        };
        /**
         * The rotation of this Game Object, in degrees. Default 0.
         * @param _degrees {number} degrees.
         */
        GraphicsComponent.prototype.setAngle = function (_degrees) {
            this._m_graphic.setAngle(_degrees);
        };
        GraphicsComponent.prototype.setVisible = function (_visible) {
            this._m_graphic.setVisible(_visible);
            return;
        };
        GraphicsComponent.prototype.setScale = function (_x, _y) {
            this._m_graphic.setScale(_x, _y);
            return;
        };
        GraphicsComponent.prototype.setActive = function (_active) {
            this._m_graphic.setActive(_active);
            return;
        };
        GraphicsComponent.prototype.destroy = function () {
            this._m_graphic.destroy();
            this._m_local_position = null;
            _super.prototype.destroy.call(this);
            return;
        };
        return GraphicsComponent;
    }(mxComponent_19.MxComponent));
    exports.GraphicsComponent = GraphicsComponent;
});
define("game/ui/clocks/components/analogClockController", ["require", "exports", "utilities/component/mxComponent", "game/gameCommons"], function (require, exports, mxComponent_20, gameCommons_27) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AnalogClockController = /** @class */ (function (_super) {
        __extends(AnalogClockController, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function AnalogClockController() {
            var _this = _super.call(this, gameCommons_27.COMPONENT_ID.kAnalogClockController) || this;
            return _this;
        }
        AnalogClockController.prototype.init = function (_actor) {
            this._m_startAngle = -Math.PI * 0.5;
            this._m_maxAngle = Math.PI * 1.5;
            var graphicsComponent = _actor.getComponent(gameCommons_27.COMPONENT_ID.kGraphicsComponent);
            this._m_graphics = graphicsComponent.getGraphic();
            this._m_clockController = _actor.getComponent(gameCommons_27.COMPONENT_ID.kClockController);
            return;
        };
        AnalogClockController.prototype.update = function (_actor) {
            var percent = this._m_clockController.m_current_time
                / this._m_clockController._m_totalSeconds;
            this._m_graphics.clear();
            this._m_graphics.lineStyle(308, 0x31a13b, 1);
            this._m_graphics.beginPath();
            this._m_graphics.arc(0, 0, 173.5, this._m_startAngle, this._m_maxAngle - (Phaser.Math.PI2 * percent));
            this._m_graphics.strokePath();
            this._m_graphics.closePath();
            return;
        };
        return AnalogClockController;
    }(mxComponent_20.MxComponent));
    exports.AnalogClockController = AnalogClockController;
});
define("game/ui/clocks/components/sandClockController", ["require", "exports", "utilities/component/mxComponent", "game/gameCommons"], function (require, exports, mxComponent_21, gameCommons_28) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SandClockController = /** @class */ (function (_super) {
        __extends(SandClockController, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function SandClockController() {
            var _this = _super.call(this, gameCommons_28.COMPONENT_ID.kSandClockController) || this;
            return _this;
        }
        SandClockController.prototype.init = function (_actor) {
            ///////////////////////////////////
            // Upper Texture
            this._m_upperTexture = _actor.get_child(gameCommons_28.SAND_CLOCK_PART_ID.kLowerTexture);
            var upperTextureSprite = this._m_upperTexture.getComponent(gameCommons_28.COMPONENT_ID.kSprite);
            this._m_upperInitPoistion = new Phaser.Math.Vector2(this._m_upperTexture._m_relative_position.x, this._m_upperTexture._m_relative_position.y);
            this._m_upperTraslation = new Phaser.Math.Vector2(0, upperTextureSprite.getHeight());
            ///////////////////////////////////
            // Lower Texture
            this._m_lowerTexture = _actor.get_child(gameCommons_28.SAND_CLOCK_PART_ID.kUpperTexture);
            var lowerTextureSprite = this._m_lowerTexture.getComponent(gameCommons_28.COMPONENT_ID.kSprite);
            this._m_lowerTexture.setRelativePosition(this._m_lowerTexture._m_relative_position.x, this._m_lowerTexture._m_relative_position.y + lowerTextureSprite.getHeight());
            this._m_lowerInitPosition = new Phaser.Math.Vector2(this._m_lowerTexture._m_relative_position.x, this._m_lowerTexture._m_relative_position.y);
            this._m_lowerTraslation = new Phaser.Math.Vector2(0, -lowerTextureSprite.getHeight());
            ///////////////////////////////////
            // CLock Controller
            this._m_clockController = _actor.getComponent(gameCommons_28.COMPONENT_ID.kClockController);
            return;
        };
        SandClockController.prototype.update = function (_actor) {
            var percent = this._m_clockController.m_current_time
                / this._m_clockController._m_totalSeconds;
            this._m_upperTexture.setRelativePosition(this._m_upperInitPoistion.x + (this._m_upperTraslation.x * percent), this._m_upperInitPoistion.y + (this._m_upperTraslation.y * percent));
            this._m_lowerTexture.setRelativePosition(this._m_lowerInitPosition.x + (this._m_lowerTraslation.x * percent), this._m_lowerInitPosition.y + (this._m_lowerTraslation.y * percent));
            return;
        };
        SandClockController.prototype.destroy = function () {
            return;
        };
        return SandClockController;
    }(mxComponent_21.MxComponent));
    exports.SandClockController = SandClockController;
});
define("game/ui/clocks/components/clockSound", ["require", "exports", "utilities/component/mxComponent", "game/gameCommons", "game/managers/masteManager/masterManager"], function (require, exports, mxComponent_22, gameCommons_29, masterManager_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ClockSound = /** @class */ (function (_super) {
        __extends(ClockSound, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function ClockSound() {
            var _this = _super.call(this, gameCommons_29.COMPONENT_ID.kClockSound) || this;
            return _this;
        }
        ClockSound.prototype.prepare = function (_scene) {
            this._m_baseSoundManager = _scene.sound;
            var master = masterManager_10.MasterManager.GetInstance();
            var gameManager = master.get_child(gameCommons_29.MANAGER_ID.kGameManager);
            var gameController = gameManager.getComponent(gameCommons_29.COMPONENT_ID.kGameController);
            switch (gameController._m_user_preferences.getClockStyle()) {
                case gameCommons_29.CLOCK_STYLE.kAnalog:
                    this._m_snd_tictoc_frame = gameCommons_29.MimiKSounds.kTicTocAnalog;
                    break;
                case gameCommons_29.CLOCK_STYLE.kDigital:
                    this._m_snd_tictoc_frame = gameCommons_29.MimiKSounds.kTicTocDigital;
                    break;
                case gameCommons_29.CLOCK_STYLE.kSand:
                    this._m_snd_tictoc_frame = gameCommons_29.MimiKSounds.kTicTocSand;
                    break;
                default:
                    this._m_snd_tictoc_frame = gameCommons_29.MimiKSounds.kTicTocSand;
                    break;
            }
            this._m_snd_tictoc = this._m_baseSoundManager.addAudioSprite(gameCommons_29.MimiKSounds.kMimiKAudioSprite);
            return;
        };
        ClockSound.prototype.receive = function (_id, _data) {
            switch (_id) {
                case gameCommons_29.MESSAGE_ID.kClockPaused:
                    if (!this._m_snd_tictoc.isPaused) {
                        this._m_snd_tictoc.pause();
                    }
                    return;
                case gameCommons_29.MESSAGE_ID.kClockResumed:
                    if (this._m_snd_tictoc.isPaused) {
                        this._m_snd_tictoc.resume();
                    }
                    else if (!this._m_snd_tictoc.isPlaying) {
                        this._m_snd_tictoc.play(this._m_snd_tictoc_frame, { loop: true });
                    }
                    return;
                case gameCommons_29.MESSAGE_ID.kClockReset:
                    this._m_snd_tictoc.play(this._m_snd_tictoc_frame, { loop: true });
                    this._m_snd_tictoc.pause();
                    return;
                case gameCommons_29.MESSAGE_ID.kClockTenSecondsAlert:
                    if (this._m_snd_tictoc.isPlaying) {
                        this._m_snd_tictoc.stop();
                        this._m_snd_tictoc.play(gameCommons_29.MimiKSounds.kAlertLastSecond, { loop: true });
                    }
                    return;
                case gameCommons_29.MESSAGE_ID.kClockTimeOut:
                    this._m_snd_tictoc.play(this._m_snd_tictoc_frame, { loop: true });
                    this._m_snd_tictoc.pause();
                    this._m_baseSoundManager.playAudioSprite(gameCommons_29.MimiKSounds.kMimiKAudioSprite, gameCommons_29.MimiKSounds.kAlertFinal);
                    return;
            }
            return;
        };
        ClockSound.prototype.destroy = function () {
            this._m_baseSoundManager = null;
            if (this._m_snd_tictoc != null) {
                this._m_snd_tictoc.destroy();
            }
            return;
        };
        return ClockSound;
    }(mxComponent_22.MxComponent));
    exports.ClockSound = ClockSound;
});
define("game/ui/clocks/clock", ["require", "exports", "utilities/component/mxActor", "game/ui/clocks/components/clockController", "game/components/spriteComponent", "game/components/bitmapTextComponent", "game/ui/clocks/components/digitalController", "game/components/graphicsComponent", "game/ui/clocks/components/analogClockController", "game/gameCommons", "game/ui/clocks/components/sandClockController", "game/ui/clocks/components/clockSound"], function (require, exports, mxActor_8, clockController_1, spriteComponent_4, bitmapTextComponent_2, digitalController_1, graphicsComponent_1, analogClockController_1, gameCommons_30, sandClockController_1, clockSound_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Clock factories.
     */
    var Clock = /** @class */ (function () {
        function Clock() {
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * Creates a sand clock.
         *
         * @param _scene
         * @param _id
         */
        Clock.CreateSand = function (_scene, _id) {
            var clock = mxActor_8.MxActor.Create(_id);
            ///////////////////////////////////
            // Clock Texture
            var clockTexture = mxActor_8.MxActor.Create(gameCommons_30.SAND_CLOCK_PART_ID.kClockTexture, clock);
            var clockTextureSprite = new spriteComponent_4.SpriteComponent();
            clockTextureSprite.setSprite(_scene.add.sprite(0, 0, 'landpage_2', 'sand_clock_background.png'));
            clockTexture.addComponent(clockTextureSprite);
            ///////////////////////////////////
            // Upper Sand
            var upperMask = mxActor_8.MxActor.Create(gameCommons_30.SAND_CLOCK_PART_ID.kUpperMask, clock);
            upperMask.setRelativePosition(0, -175);
            var upperMaskSprite = new spriteComponent_4.SpriteComponent();
            upperMaskSprite.setSprite(_scene.add.sprite(0, 0, 'sand_clock_mask'));
            upperMaskSprite.setVisible(false);
            upperMask.addComponent(upperMaskSprite);
            var upperTexture = mxActor_8.MxActor.Create(gameCommons_30.SAND_CLOCK_PART_ID.kUpperTexture, clock);
            upperTexture.setRelativePosition(0, -175);
            var upperTextureSprite = new spriteComponent_4.SpriteComponent();
            upperTextureSprite.setSprite(_scene.add.sprite(0, 0, 'landpage_2', 'sand_clock_fill.png'));
            upperTexture.addComponent(upperTextureSprite);
            var upperBitmapMask = upperMaskSprite.createMask();
            upperTextureSprite.setMask(upperBitmapMask);
            ///////////////////////////////////
            // Lower Sand
            var lowerMask = mxActor_8.MxActor.Create(gameCommons_30.SAND_CLOCK_PART_ID.kLowerMask, clock);
            lowerMask.setRelativePosition(0, 175);
            var lowerMaskSprite = new spriteComponent_4.SpriteComponent();
            lowerMaskSprite.setSprite(_scene.add.sprite(0, 0, 'sand_clock_mask'));
            lowerMaskSprite.setAngle(180);
            lowerMaskSprite.setVisible(false);
            lowerMask.addComponent(lowerMaskSprite);
            var lowerTexture = mxActor_8.MxActor.Create(gameCommons_30.SAND_CLOCK_PART_ID.kLowerTexture, clock);
            lowerTexture.setRelativePosition(0, 175);
            var lowerTextureSprite = new spriteComponent_4.SpriteComponent();
            lowerTextureSprite.setSprite(_scene.add.sprite(0, 0, 'landpage_2', 'sand_clock_fill.png'));
            lowerTextureSprite.setAngle(180);
            lowerTexture.addComponent(lowerTextureSprite);
            var lowerBitmapMask = lowerMaskSprite.createMask();
            lowerTextureSprite.setMask(lowerBitmapMask);
            var clockController = new clockController_1.ClockController();
            clockController.prepare(_scene);
            clock.addComponent(clockController);
            var clockSound = new clockSound_1.ClockSound();
            clockSound.prepare(_scene);
            clock.addComponent(clockSound);
            clock.addComponent(new sandClockController_1.SandClockController());
            clock.init();
            return clock;
        };
        /**
         * Creates a digital clock.
         *
         * @param _scene
         * @param _id
         */
        Clock.CreateDigital = function (_scene, _id) {
            var clock = mxActor_8.MxActor.Create(_id);
            var spriteComponent = new spriteComponent_4.SpriteComponent();
            spriteComponent.setSprite(_scene.add.sprite(0, 0, 'landpage', 'digital_clock.png'));
            clock.addComponent(spriteComponent);
            var clockText = new bitmapTextComponent_2.BitmapTextComponent();
            clockText.prepare(_scene, 'digital_dream', '03:00', 160);
            clockText.setOrigin(0.5, 0.5);
            clockText.setCenterAlign();
            clockText.setTint(0x31a13b);
            clockText._m_local_position.y = -75;
            clock.addComponent(clockText);
            var clockController = new clockController_1.ClockController();
            clockController.prepare(_scene);
            clock.addComponent(clockController);
            var clockSound = new clockSound_1.ClockSound();
            clockSound.prepare(_scene);
            clock.addComponent(clockSound);
            clock.addComponent(new digitalController_1.DigitalController());
            clock.init();
            return clock;
        };
        /**
         * Create an analog clock.
         *
         * @param _scene
         * @param _id
         */
        Clock.CreateAnalog = function (_scene, _id) {
            var clock = mxActor_8.MxActor.Create(_id);
            ///////////////////////////////////
            // Background Object
            var backgroundObject = mxActor_8.MxActor.Create(1, clock);
            var backgroundSprite = new spriteComponent_4.SpriteComponent();
            backgroundSprite.setSprite(_scene.add.sprite(0, 0, 'landpage_2', 'analog_clock_background.png'));
            backgroundObject.addComponent(backgroundSprite);
            ///////////////////////////////////
            // Radial Fill
            var graphicsComponent = new graphicsComponent_1.GraphicsComponent();
            graphicsComponent.prepare(_scene);
            clock.addComponent(graphicsComponent);
            var clockController = new clockController_1.ClockController();
            clockController.prepare(_scene);
            clock.addComponent(clockController);
            var clockSound = new clockSound_1.ClockSound();
            clockSound.prepare(_scene);
            clock.addComponent(clockSound);
            clock.addComponent(new analogClockController_1.AnalogClockController());
            ///////////////////////////////////
            // Foreground Object
            var foregroundObject = mxActor_8.MxActor.Create(2, clock);
            var foregroundSprite = new spriteComponent_4.SpriteComponent();
            foregroundSprite.setSprite(_scene.add.sprite(0, 0, 'landpage_2', 'analog_clock_front.png'));
            foregroundObject.addComponent(foregroundSprite);
            clock.init();
            return clock;
        };
        return Clock;
    }());
    exports.Clock = Clock;
});
define("scenes/levels/game_level", ["require", "exports", "game/managers/masteManager/masterManager", "game/gameCommons", "game/ui/buttons/imgButton", "game/ui/clocks/clock", "game/ui/shaders/shadersFactory", "game/ui/cloudPopup/Popup"], function (require, exports, masterManager_11, gameCommons_31, imgButton_3, clock_1, shadersFactory_2, Popup_2) {
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
            // Get Controllers
            var master = masterManager_11.MasterManager.GetInstance();
            this._m_masterController = master.getComponent(gameCommons_31.COMPONENT_ID.kMasterController);
            var gameManager = master.get_child(gameCommons_31.MANAGER_ID.kGameManager);
            this._m_dataController
                = gameManager.getComponent(gameCommons_31.COMPONENT_ID.kDataController);
            this._m_gameController
                = gameManager.getComponent(gameCommons_31.COMPONENT_ID.kGameController);
            /****************************************************/
            /* Background                                       */
            /****************************************************/
            this._m_backgroundShader = shadersFactory_2.ShaderFactory.CreateBackground(this, 0);
            ///////////////////////////////////
            // Particle Emitters
            this._createParticleEmitter();
            /****************************************************/
            /* Main Menu Button                                 */
            /****************************************************/
            var halfWidth = this.game.canvas.width * 0.5;
            this._m_mainMenuButton = imgButton_3.Button.CreateStandard(this, 0, halfWidth, 200, 'landpage', 'button.png', this._m_dataController.getString('back_to_menu'), this._onClick_mainMenu, this);
            var mainMenuButtonSprite = this._m_mainMenuButton.getComponent(gameCommons_31.COMPONENT_ID.kSprite);
            mainMenuButtonSprite.setTint(0xface01);
            var mainMenuButtonText = this._m_mainMenuButton.getComponent(gameCommons_31.COMPONENT_ID.kBitmapText);
            mainMenuButtonText.setTint(0x0a0136);
            /****************************************************/
            /* Pause Button                                     */
            /****************************************************/
            this._m_pauseButton = imgButton_3.Button.CreateStandard(this, 0, halfWidth, 1600, 'landpage', 'button.png', this._m_dataController.getString('pause'), this._on_click_pause_resume, this);
            this._m_pauseButtonTexture
                = this._m_pauseButton.getComponent(gameCommons_31.COMPONENT_ID.kSprite);
            this._m_pauseButtonText
                = this._m_pauseButton.getComponent(gameCommons_31.COMPONENT_ID.kBitmapText);
            this._m_pauseButtonText.setTint(0xffffff);
            /****************************************************/
            /* Reset Button                                     */
            /****************************************************/
            this._m_resetButton = imgButton_3.Button.CreateStandard(this, 0, halfWidth, 1800, 'landpage', 'button.png', this._m_dataController.getString('reset'), this._onClick_Reset, this);
            var resetButtonSprite = this._m_resetButton.getComponent(gameCommons_31.COMPONENT_ID.kSprite);
            resetButtonSprite.setTint(0xff5709);
            var resetButtonText = this._m_resetButton.getComponent(gameCommons_31.COMPONENT_ID.kBitmapText);
            resetButtonText.setTint(0xffffff);
            /****************************************************/
            /* Clock                                            */
            /****************************************************/
            switch (this._m_gameController._m_user_preferences.getClockStyle()) {
                case gameCommons_31.CLOCK_STYLE.kSand:
                    this._m_clock = clock_1.Clock.CreateSand(this, 0);
                    break;
                case gameCommons_31.CLOCK_STYLE.kDigital:
                    this._m_clock = clock_1.Clock.CreateDigital(this, 0);
                    break;
                case gameCommons_31.CLOCK_STYLE.kAnalog:
                    this._m_clock = clock_1.Clock.CreateAnalog(this, 0);
                    break;
                default:
                    this._m_clock = clock_1.Clock.CreateDigital(this, 0);
                    break;
            }
            this._m_clock.setRelativePosition(halfWidth, this.game.canvas.height * 0.5);
            this._m_clockController = this._m_clock.getComponent(gameCommons_31.COMPONENT_ID.kClockController);
            /****************************************************/
            /* Alert Popup                                      */
            /****************************************************/
            this._m_alertPopup = Popup_2.Popup.CreateTimeAlert(0, this);
            this._m_alerPopupController
                = this._m_alertPopup.getComponent(gameCommons_31.COMPONENT_ID.kAlertPopupController);
            this._m_alertPopup.setRelativePosition(halfWidth, this.game.canvas.height * 0.5);
            this._onClick_Reset();
            return;
        };
        MainGame.prototype.update = function (_time, _delta) {
            this._m_masterController.m_dt = _delta / 1000.0;
            this._m_backgroundShader.update();
            this._m_clock.update();
            this._m_pauseButton.update();
            this._m_mainMenuButton.update();
            this._m_resetButton.update();
            this._m_alertPopup.update();
            return;
        };
        MainGame.prototype.destroy = function () {
            this._m_backgroundShader.destroy();
            this._m_clock.destroy();
            this._m_pauseButton.destroy();
            this._m_mainMenuButton.destroy();
            this._m_resetButton.destroy();
            this._m_alertPopup.destroy();
            return;
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        /**
         * Pause or resume time.
         */
        MainGame.prototype._on_click_pause_resume = function () {
            if (this._m_clockController.m_isPaused) {
                this._m_clockController.resume();
                this._m_pauseButtonText.setText(this._m_dataController.getString('pause'));
                this._m_pauseButtonTexture.setTint(0xff0013);
            }
            else {
                this._m_clockController.pause();
                this._m_pauseButtonText.setText(this._m_dataController.getString('resume'));
                this._m_pauseButtonTexture.setTint(0x31a13b);
            }
            // Play Audio
            this.sound.playAudioSprite(gameCommons_31.MimiKSounds.kMimiKAudioSprite, gameCommons_31.MimiKSounds.kButtonPause);
            return;
        };
        /**
         * Returns to the Mainmenu scene.
         */
        MainGame.prototype._onClick_mainMenu = function () {
            // Play Audio
            this.sound.playAudioSprite(gameCommons_31.MimiKSounds.kMimiKAudioSprite, gameCommons_31.MimiKSounds.kButtonPause);
            this.destroy();
            this.scene.start('mainMenu');
            return;
        };
        /**
         * Reset time.
         */
        MainGame.prototype._onClick_Reset = function () {
            // Play Audio
            this.sound.playAudioSprite(gameCommons_31.MimiKSounds.kMimiKAudioSprite, gameCommons_31.MimiKSounds.kButtonReset);
            this._m_clockController.reset();
            this._m_pauseButtonText.setText(this._m_dataController.getString('start'));
            this._m_pauseButtonTexture.setTint(0x31a13b);
            this._m_alerPopupController.reset();
            return;
        };
        MainGame.prototype._createParticleEmitter = function () {
            var emitterShape = new Phaser.Geom.Rectangle(0, 0, this.game.canvas.width, this.game.canvas.height);
            this._m_particlesEmitterManager = this.add.particles('landpage');
            this._m_particlesEmitter = this._m_particlesEmitterManager.createEmitter({
                frame: ['particle_01.png', 'particle_02.png'],
                x: 0, y: 0,
                lifespan: 500,
                scale: 0.5,
                rotate: { min: 0.0, max: 90.0 },
                frequency: 50,
                quantity: 1,
                alpha: { start: 1, end: 0 },
                blendMode: 'ADD',
                tint: [0x0d5da4, 0x501160],
                emitZone: { type: 'random', source: emitterShape }
            });
            return;
        };
        return MainGame;
    }(Phaser.Scene));
    exports.MainGame = MainGame;
});
define("scenes/menus/localization", ["require", "exports", "game/gameCommons", "utilities/component/mxActor", "game/managers/masteManager/masterManager", "game/components/spriteComponent", "game/ui/text/uiBitmapText"], function (require, exports, gameCommons_32, mxActor_9, masterManager_12, spriteComponent_5, uiBitmapText_4) {
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
            var half_width = width * 0.5;
            var height = this.game.canvas.height;
            var half_height = height * 0.5;
            this.cameras.main.setBackgroundColor(0xfad201);
            /****************************************************/
            /* Title                                            */
            /****************************************************/
            this._m_language_icon = mxActor_9.MxActor.Create(0);
            var language_sprite = new spriteComponent_5.SpriteComponent();
            language_sprite.setSprite(this.add.sprite(0, 0, 'landpage', 'language_button.png'));
            language_sprite.setTint(0x0c0138);
            this._m_language_icon.addComponent(language_sprite);
            this._m_language_icon.init();
            this._m_language_icon.setRelativePosition(half_width, 200);
            this._m_laguage_title = mxActor_9.MxActor.Create(0, this._m_language_icon);
            var master = masterManager_12.MasterManager.GetInstance();
            var gameManager = master.get_child(gameCommons_32.MANAGER_ID.kGameManager);
            this._m_dataController
                = gameManager.getComponent(gameCommons_32.COMPONENT_ID.kDataController);
            this._m_gameController
                = gameManager.getComponent(gameCommons_32.COMPONENT_ID.kGameController);
            var languageTitleText = uiBitmapText_4.UIBitmapText.AddStandard(this, this._m_dataController.getString('choose_language'), this._m_laguage_title);
            languageTitleText.setTint(0x0c0138);
            languageTitleText.setCenterAlign();
            languageTitleText.setOrigin(0.5, 0.5);
            this._m_laguage_title.init();
            this._m_laguage_title.setRelativePosition(0, 75);
            /****************************************************/
            /* English Button                                   */
            /****************************************************/
            this._m_english_button = mxActor_9.MxActor.Create(0);
            var enlgishButtonSprite = new spriteComponent_5.SpriteComponent();
            enlgishButtonSprite.setSprite(this.add.sprite(0, 0, 'landpage', 'english_map.png'));
            enlgishButtonSprite.setOrigin(0.5, 0.0);
            enlgishButtonSprite.setInteractive();
            enlgishButtonSprite.on('pointerdown', this._onClick_english, this);
            this._m_english_button.addComponent(enlgishButtonSprite);
            this._m_english_button.init();
            this._m_english_button.setRelativePosition(half_width, 475);
            var english_label = mxActor_9.MxActor.Create(1, this._m_english_button);
            var englishLabelText = uiBitmapText_4.UIBitmapText.AddStandard(this, this._m_dataController.getString('english'), english_label);
            englishLabelText.setOrigin(0.5, 0.5);
            englishLabelText.setFontSize(60);
            englishLabelText.setTint(0x0c0138);
            english_label.init();
            english_label.setRelativePosition(0, 480);
            /****************************************************/
            /* Latam Button                                     */
            /****************************************************/
            this._m_spanish_button = mxActor_9.MxActor.Create(0);
            var spanishButtonSprite = new spriteComponent_5.SpriteComponent();
            spanishButtonSprite.setSprite(this.add.sprite(0, 0, 'landpage', 'spanish_map.png'));
            spanishButtonSprite.setOrigin(0.5, 0.0);
            spanishButtonSprite.setInteractive();
            spanishButtonSprite.on('pointerdown', this._onClick_spanish, this);
            this._m_spanish_button.addComponent(spanishButtonSprite);
            this._m_spanish_button.init();
            this._m_spanish_button.setRelativePosition(half_width, 1200);
            var spanish_label = mxActor_9.MxActor.Create(1, this._m_spanish_button);
            var spanishLabelText = uiBitmapText_4.UIBitmapText.AddStandard(this, this._m_dataController.getString('spanish'), spanish_label);
            spanishLabelText.setOrigin(0.5, 0.5);
            spanishLabelText.setFontSize(60);
            spanishLabelText.setTint(0x0c0138);
            spanish_label.init();
            spanish_label.setRelativePosition(0, 480);
            return;
        };
        /**
         *
         */
        LocalizationScene.prototype.update = function () {
            this._m_english_button.update();
            this._m_spanish_button.update();
            this._m_language_icon.update();
            return;
        };
        LocalizationScene.prototype.destroy = function () {
            this._m_english_button.destroy();
            this._m_spanish_button.destroy();
            this._m_language_icon.destroy();
            return;
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        LocalizationScene.prototype._onClick_english = function () {
            this._m_gameController.setLocalization(gameCommons_32.LOCALIZATION.kEnglish);
            this._m_dataController.initLanguage(this.game);
            this.destroy();
            this.scene.start('welcomePage');
            return;
        };
        LocalizationScene.prototype._onClick_spanish = function () {
            this._m_gameController.setLocalization(gameCommons_32.LOCALIZATION.KSpanish);
            this._m_dataController.initLanguage(this.game);
            this.destroy();
            this.scene.start('welcomePage');
            return;
        };
        return LocalizationScene;
    }(Phaser.Scene));
    exports.LocalizationScene = LocalizationScene;
});
define("scenes/menus/welcomePage", ["require", "exports", "utilities/component/mxActor", "game/components/spriteComponent", "game/ui/buttons/imgButton", "game/gameCommons", "game/ui/text/uiBitmapText", "game/managers/masteManager/masterManager", "game/ui/shaders/shadersFactory"], function (require, exports, mxActor_10, spriteComponent_6, imgButton_4, gameCommons_33, uiBitmapText_5, masterManager_13, shadersFactory_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WelcomePage = /** @class */ (function (_super) {
        __extends(WelcomePage, _super);
        function WelcomePage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        WelcomePage.prototype.create = function () {
            var screenHalfWidth = this.game.canvas.width * 0.5;
            var screenHeight = this.game.canvas.height;
            /****************************************************/
            /* Background                                       */
            /****************************************************/
            this._m_backgroundShader = shadersFactory_3.ShaderFactory.CreateBackground(this, 0);
            ///////////////////////////////////
            // Particles
            this._createParticleEmitter();
            /****************************************************/
            /* Language Button                                  */
            /****************************************************/
            this._m_language_button = imgButton_4.Button.CreateImageButton(this, 0, 60, 60, 'landpage', 'language_button.png', this._onClick_language, this);
            var _m_language_sprite = this._m_language_button.getComponent(gameCommons_33.COMPONENT_ID.kSprite);
            _m_language_sprite.setTint(0xface01);
            _m_language_sprite.setOrigin(0.0, 0.0);
            /****************************************************/
            /* Website                                          */
            /****************************************************/
            this._m_website_url = mxActor_10.MxActor.Create(0);
            var urlTextComponent = uiBitmapText_5.UIBitmapText.AddStandard(this, 'juegosmetta.com', this._m_website_url);
            urlTextComponent.setCenterAlign();
            urlTextComponent.setOrigin(0.5, 0.5);
            this._m_website_url.init();
            this._m_website_url.setRelativePosition(screenHalfWidth, 113);
            /****************************************************/
            /* Welcome Phrase                                   */
            /****************************************************/
            this._m_welcome_title = mxActor_10.MxActor.Create(0);
            var welcome_sprite = new spriteComponent_6.SpriteComponent();
            welcome_sprite.setSprite(this.add.sprite(0, 0, 'landpage', 'welcome_phrase_0.png'));
            this._m_welcome_title.addComponent(welcome_sprite);
            this._m_welcome_title.init();
            this._m_welcome_title.setRelativePosition(screenHalfWidth, screenHeight * 0.25);
            /****************************************************/
            /* Start Button                                     */
            /****************************************************/
            var master = masterManager_13.MasterManager.GetInstance();
            this._m_masterController = master.getComponent(gameCommons_33.COMPONENT_ID.kMasterController);
            var gameManager = master.get_child(gameCommons_33.MANAGER_ID.kGameManager);
            var dataController = gameManager.getComponent(gameCommons_33.COMPONENT_ID.kDataController);
            this._m_start_button = imgButton_4.Button.CreateStandard(this, 0, screenHalfWidth, screenHeight * 0.4, 'landpage', 'button.png', dataController.getString('start_to_play'), this._onClick_start, this);
            /****************************************************/
            /* Cat                                              */
            /****************************************************/
            this._m_cat = mxActor_10.MxActor.Create(0);
            var cat_spriteComponent = new spriteComponent_6.SpriteComponent();
            cat_spriteComponent.setSprite(this.add.sprite(0, 0, 'landpage', 'cat.png'));
            this._m_cat.addComponent(cat_spriteComponent);
            this._m_cat.init();
            this._m_cat.setRelativePosition(screenHalfWidth, screenHeight - cat_spriteComponent.getHeight() * 0.5);
            this._m_masterController.playIntro(this);
            return;
        };
        WelcomePage.prototype.update = function (_time, _delta) {
            this._m_masterController.m_dt = _delta / 1000.0;
            this._m_language_button.update();
            this._m_website_url.update();
            this._m_welcome_title.update();
            this._m_start_button.update();
            this._m_cat.update();
            this._m_backgroundShader.update();
            return;
        };
        WelcomePage.prototype.destroy = function () {
            this._m_backgroundShader.destroy();
            this._m_cat.destroy();
            this._m_website_url.destroy();
            this._m_welcome_title.destroy();
            this._m_start_button.destroy();
            this._m_language_button.destroy();
            return;
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        /**
         * Start the mainmenu level.
         */
        WelcomePage.prototype._onClick_start = function () {
            this.destroy();
            this._m_masterController.stopIntro();
            this.scene.start('mainMenu');
            return;
        };
        /**
         * Go to the language selection scene.
         */
        WelcomePage.prototype._onClick_language = function () {
            this.destroy();
            this.scene.start('localization');
            return;
        };
        WelcomePage.prototype._createParticleEmitter = function () {
            var emitterShape = new Phaser.Geom.Rectangle(0, 0, this.game.canvas.width, this.game.canvas.height);
            this._m_particlesEmitterManager = this.add.particles('landpage');
            this._m_particlesEmitter = this._m_particlesEmitterManager.createEmitter({
                frame: ['particle_01.png', 'particle_02.png'],
                x: 0, y: 0,
                lifespan: 500,
                scale: 0.5,
                rotate: { min: 0.0, max: 90.0 },
                frequency: 50,
                quantity: 1,
                alpha: { start: 1, end: 0 },
                blendMode: 'ADD',
                tint: [0x0d5da4, 0x501160],
                emitZone: { type: 'random', source: emitterShape }
            });
            return;
        };
        return WelcomePage;
    }(Phaser.Scene));
    exports.WelcomePage = WelcomePage;
});
define("game_init", ["require", "exports", "scenes/preloader", "scenes/boot", "scenes/menus/mainMenu", "scenes/levels/game_level", "phaser3-nineslice", "scenes/menus/localization", "scenes/menus/welcomePage"], function (require, exports, preloader_1, boot_1, mainMenu_1, game_level_1, phaser3_nineslice_1, localization_1, welcomePage_1) {
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
                backgroundColor: 0x0a0136
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
            this.m_game.scene.add('welcomePage', welcomePage_1.WelcomePage);
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
define("game/ui/buttons/nineButton", ["require", "exports", "utilities/component/mxActor", "game/components/textComponent", "game/components/nineSliceComponent"], function (require, exports, mxActor_11, textComponent_2, nineSliceComponent_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     *
     */
    var NineButton = /** @class */ (function () {
        function NineButton() {
        }
        /**
         *
         * @param _scene
         * @param _id
         * @param _x
         * @param _y
         * @param _label
         * @param _fn
         * @param _context
         */
        NineButton.CreateStandard = function (_scene, _id, _x, _y, _label, _fn, _context) {
            var actor = mxActor_11.MxActor.Create(_id);
            actor.setRelativePosition(_x, _y);
            ///////////////////////////////////
            // Create Components
            var nineSliceComponent = new nineSliceComponent_2.NineSliceComponent();
            actor.addComponent(nineSliceComponent);
            var textComponent = new textComponent_2.TextComponent();
            actor.addComponent(textComponent);
            actor.init();
            ///////////////////////////////////
            // Prepare Components
            nineSliceComponent.prepare(_scene, 'landpage', 'button.png', [67, 70, 67, 70]);
            nineSliceComponent.setInteractive();
            nineSliceComponent.on('pointerdown', _fn, _context);
            textComponent.prepare(_scene, _label, { fontFamily: '"Roboto Condensed"' });
            textComponent.setFontSize(30);
            textComponent.setOrigin(0.5, 0.5);
            textComponent.setFontColor('black');
            textComponent.setAlign('center');
            return actor;
        };
        return NineButton;
    }());
    exports.NineButton = NineButton;
});
define("utilities/fsm_state", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FSMState = /** @class */ (function () {
        /****************************************************/
        /* Public                                           */
        /****************************************************/
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
        /****************************************************/
        /* Public                                           */
        /****************************************************/
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
/// <reference path="../../libs/tsDefinitions/phaser.d.ts">
define("utilities/trigger", ["require", "exports"], function (require, exports) {
    "use strict";
    var Trigger = /** @class */ (function () {
        function Trigger() {
            this.m_trigger_time = 0;
            this.m_time = 0;
            return;
        }
        Trigger.prototype.update = function (_dt) {
            this.m_time += _dt;
            if (this.m_time >= this.m_trigger_time) {
                this.m_time = 0;
                return true;
            }
            return false;
        };
        Trigger.prototype.setTriggerTime = function (_trigger_time) {
            this.m_trigger_time = _trigger_time;
            return;
        };
        Trigger.prototype.setTime = function (_time) {
            this.m_time = _time;
            return;
        };
        Trigger.prototype.reset = function () {
            this.m_time = 0;
            return;
        };
        return Trigger;
    }());
    return Trigger;
});
define("utilities/validations", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function MinimumValue(_value, _min) {
        if (_value < _min) {
            return _min;
        }
        return _value;
    }
    exports.MinimumValue = MinimumValue;
    function MaximumValue(_value, _max) {
        if (_value > _max) {
            return _max;
        }
        return _value;
    }
    exports.MaximumValue = MaximumValue;
    function NumberRange(_value, _min, _max) {
        if (_value < _min) {
            _value = _min;
        }
        else if (_value > _max) {
            _value = _max;
        }
        return _value;
    }
    exports.NumberRange = NumberRange;
});
define("utilities/fs/data_map", ["require", "exports", "utilities/asserts"], function (require, exports, asserts_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxDataMap = /** @class */ (function () {
        function MxDataMap() {
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        MxDataMap.Create = function (_data, _separator_char, _break_line_char) {
            asserts_7.AssertString(_data);
            asserts_7.AssertString(_separator_char);
            asserts_7.AssertString(_break_line_char);
            var map = new Map();
            var a_pair = _data.split(_break_line_char);
            for (var index = 0; index < a_pair.length; ++index) {
                var a_values = a_pair[index].split(_separator_char);
                if (a_values.length == 2) {
                    map.set(a_values[0], a_values[1]);
                }
                else if (a_values.length == 1) {
                    map.set(a_values[0], '');
                }
                else {
                    continue;
                }
            }
            return map;
        };
        return MxDataMap;
    }());
    exports.MxDataMap = MxDataMap;
});
define("utilities/interpolation/interpolation", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Interpolation = /** @class */ (function () {
        function Interpolation() {
        }
        Interpolation.Linear = function (x1, y1, x2, y2, x) {
            return ((x - x1) * (y2 - y1) / (x2 - x1)) + y1;
        };
        Interpolation.Bilinear = function (x1, y1, x2, y2, v1, v2, v3, v4, tx, ty) {
            //P1:{x1,y1,v1} - P2:{x2,y1,v2} - P3:{x1,y2,v3} - P4:{x2,y2,v4}
            //Target:{tx,ty}
            var area_v1 = Math.abs((tx - x1) * (ty - y1)) * v4;
            var area_v2 = Math.abs((tx - x2) * (ty - y1)) * v3;
            var area_v3 = Math.abs((tx - x1) * (ty - y2)) * v2;
            var area_v4 = Math.abs((tx - x2) * (ty - y2)) * v1;
            var area_total = (x2 - x1) * (y2 - y1);
            return (area_v1 + area_v2 + area_v3 + area_v4) / area_total;
        };
        return Interpolation;
    }());
    exports.Interpolation = Interpolation;
});
define("utilities/noise/perlinNoise", ["require", "exports", "utilities/interpolation/interpolation"], function (require, exports, interpolation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PerlinNoise = /** @class */ (function () {
        function PerlinNoise() {
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         *
         * @param _length
         * @param _n_octaves
         */
        PerlinNoise.Noise1D = function (_length, _frecuency_power, _amplitude_power, _n_octaves, _normalized) {
            if (_frecuency_power === void 0) { _frecuency_power = 2; }
            if (_amplitude_power === void 0) { _amplitude_power = 2; }
            if (_n_octaves === void 0) { _n_octaves = 6; }
            if (_normalized === void 0) { _normalized = false; }
            /**
             * Wave values.
             */
            var wave = new Float32Array(_length);
            var frecuency = 0;
            var amplitude = 0;
            for (var oct_idx = 1; oct_idx <= _n_octaves; ++oct_idx) {
                /**
                 * Octave Frecuency
                 */
                frecuency = Math.pow(_frecuency_power, oct_idx);
                /**
                 * Octave Amplitude
                 */
                amplitude = _length / Math.pow(_amplitude_power, oct_idx);
                if (frecuency > _length) {
                    break;
                }
                /**
                 * Apply Octave
                 */
                PerlinNoise.Octave(frecuency, amplitude, wave, _length);
            }
            if (_normalized) {
                /**
                * Normalize values
                */
                for (var index = 0; index < _length; ++index) {
                    wave[index] /= _length;
                }
            }
            return wave;
        };
        PerlinNoise.Noise2D = function (_length, _frecuency_power, _amplitude_power, _n_octaves, _normalized) {
            if (_frecuency_power === void 0) { _frecuency_power = 2; }
            if (_amplitude_power === void 0) { _amplitude_power = 2; }
            if (_n_octaves === void 0) { _n_octaves = 6; }
            if (_normalized === void 0) { _normalized = false; }
            var grid = new Array(_length);
            for (var index = 0; index < _length; ++index) {
                grid[index] = new Float32Array(_length);
            }
            var frecuency = 0;
            var amplitude = 0;
            var high_value = 0;
            for (var oct_idx = 1; oct_idx <= _n_octaves; ++oct_idx) {
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
                if (frecuency > _length) {
                    break;
                }
                /**
                 * Applay Octave
                 */
                PerlinNoise.Octave2D(frecuency, amplitude, grid, _length);
            }
            /**
            * Normalize values
            */
            if (_normalized) {
                for (var row = 0; row < _length; ++row) {
                    for (var col = 0; col < _length; ++col) {
                        grid[row][col] /= high_value;
                    }
                }
            }
            return grid;
        };
        /**
         *
         * @param _frecuency
         * @param _amplitude
         * @param _length
         */
        PerlinNoise.Octave = function (_frecuency, _amplitude, _wave, _length) {
            /**
             * Calculate the steps.
             */
            var step = Math.floor(_length / _frecuency);
            /**
             *
             */
            var y1 = undefined;
            var y2 = undefined;
            var x1 = undefined;
            var x2 = undefined;
            for (var index = 0; index <= _length; index += step) {
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
                if (y1 != undefined) {
                    x1 = index - (step - 1);
                    x2 = index;
                    for (var node = index - (step - 1); node < index; ++node) {
                        /**
                         * Get the linear interpolation at "node" position.
                         */
                        _wave[node] += interpolation_1.Interpolation.Linear(x1, y1, x2, y2, node);
                    }
                }
                /**
                 * X1 es igual a x2
                 */
                y1 = y2;
            }
            return;
        };
        PerlinNoise.Octave2D = function (_frecuency, _amplitude, _wave, _length) {
            var grid = new Array(_frecuency);
            for (var index = 0; index <= _frecuency; ++index) {
                grid[index] = new Float32Array(_frecuency + 1);
            }
            var x1;
            var y1;
            var x2;
            var y2;
            var local_x1;
            var local_y1;
            var local_x2;
            var local_y2;
            var temp;
            // Interator over the grid.
            for (var row = 0; row <= _frecuency; ++row) {
                for (var col = 0; col <= _frecuency; ++col) {
                    grid[row][col] = _amplitude - (Math.random() * _amplitude);
                    // Check if node is not in first row or first column.
                    if (row > 0 && col > 0) {
                        x2 = col;
                        y2 = row;
                        x1 = x2 - 1;
                        y1 = y2 - 1;
                        local_x1 = (Math.floor((x1 / _frecuency) * _length));
                        local_x2 = (Math.floor((x2 / _frecuency) * _length));
                        local_y1 = (Math.floor((y1 / _frecuency) * _length));
                        local_y2 = (Math.floor((y2 / _frecuency) * _length));
                        for (var y = local_y1; y < local_y2; ++y) {
                            for (var x = local_x1; x < local_x2; ++x) {
                                temp =
                                    interpolation_1.Interpolation.Bilinear(local_x1, local_y1, local_x2, local_y2, grid[y1][x1], grid[y1][x2], grid[y2][x1], grid[y2][x2], x, y);
                                _wave[y][x] += temp;
                            }
                        }
                    }
                }
            }
            return;
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        PerlinNoise.MAX_LENGHT = 256;
        return PerlinNoise;
    }());
    exports.PerlinNoise = PerlinNoise;
});
define("utilities/ui/mxUI", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxUI = /** @class */ (function () {
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function MxUI() {
            this._m_size = new Phaser.Geom.Point(0, 0);
            return;
        }
        MxUI.prototype.update = function (_dt) {
            return;
        };
        MxUI.prototype.setPosition = function (_x, _y) {
            return;
        };
        MxUI.prototype.move = function (_x, _y) {
            return;
        };
        /**
        * Safely destroys the object.
        */
        MxUI.prototype.destroy = function () {
            this._m_size = null;
            return;
        };
        /****************************************************/
        /* Protected                                        */
        /****************************************************/
        MxUI.prototype._getSprite_box = function (_scene) {
            var sprite;
            if (!_scene.textures.exists('_mx_ui_box')) {
                var texture = void 0;
                texture = _scene.add.graphics();
                texture.fillStyle(0xffffff);
                texture.fillRect(0, 0, 16, 16);
                texture.generateTexture('_mx_ui_box', 16, 16);
                texture.destroy();
            }
            sprite = _scene.add.sprite(0, 0, '_mx_ui_box');
            return sprite;
        };
        MxUI.prototype._getSprite_circle16 = function (_scene) {
            var sprite;
            if (!_scene.textures.exists('_mx_ui_circle_16')) {
                var texture = void 0;
                texture = _scene.add.graphics();
                texture.fillStyle(0xffffff);
                texture.fillCircle(0, 0, 16);
                texture.generateTexture('_mx_ui_circle_16');
                texture.destroy();
            }
            sprite = _scene.add.sprite(0, 0, '_mx_ui_circle_16');
            return sprite;
        };
        MxUI.prototype._get_text = function (_scene) {
            var text;
            text = _scene.add.text(0, 0, "text", { fontFamily: '"Roboto Condensed"' });
            text.setFontSize(24);
            text.setColor('white');
            return text;
        };
        return MxUI;
    }());
    exports.MxUI = MxUI;
});
define("utilities/ui/mxSlider", ["require", "exports", "utilities/ui/mxUI"], function (require, exports, mxUI_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxSlider = /** @class */ (function (_super) {
        __extends(MxSlider, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function MxSlider(_scene, _x, _y, _title) {
            if (_title === void 0) { _title = "Slider"; }
            var _this = _super.call(this) || this;
            _this._m_group = _scene.add.group();
            // Slider Background
            _this._m_bck = _this._getSprite_box(_scene);
            _this._m_bck.setScale(20, 2);
            _this._m_bck.setTint(0x000000);
            _this._m_bck.setAlpha(0.5);
            _this._m_bck.setInteractive();
            _this._m_bck.on('pointerdown', _this._onDown_slider, _this);
            _this._m_bck.setOrigin(0, 0);
            // Slider Size
            _this._m_size.x = _this._m_bck.width * _this._m_bck.scaleX;
            _this._m_size.y = _this._m_bck.height * _this._m_bck.scaleY;
            // Slider Fill
            _this._m_fill = _this._getSprite_box(_scene);
            _this._m_fill.setScale(0, 2);
            _this._m_fill.setTint(0xffa100);
            _this._m_fill.setOrigin(0, 0);
            // Slider Text
            _this._m_text = _this._get_text(_scene);
            _this._m_text.text = "100";
            _this._m_text.setOrigin(0.5, 0.5);
            _this._m_text.setPosition(_this._m_bck.x + _this._m_size.x * 0.5, _this._m_bck.y + _this._m_size.y * 0.5);
            // Slider Title
            _this._m_title = _this._get_text(_scene);
            _this._m_title.text = _title;
            _this._m_title.setOrigin(0, 1);
            _this._m_title.setPosition(_this._m_bck.x, _this._m_bck.y - 10);
            // Add group members
            _this._m_group.add(_this._m_title);
            _this._m_group.add(_this._m_text);
            _this._m_group.add(_this._m_bck);
            _this._m_group.add(_this._m_fill);
            _this.setValues(-1, 1);
            _this._resize_fill(0.5);
            _this.setPosition(_x, _y);
            _this._m_dragging = false;
            return _this;
        }
        MxSlider.prototype.setValues = function (_min, _max) {
            if (_max > _min) {
                this._m_min_value = _min;
                this._m_max_value = _max;
                this._m_delta_value = _max - _min;
            }
            return;
        };
        MxSlider.prototype.update = function (_dt) {
            if (this._m_dragging) {
                if (!this._m_pointer.isDown) {
                    this._m_dragging = !this._m_dragging;
                }
                this._onDrag(this._m_pointer);
            }
            return;
        };
        MxSlider.prototype.setPosition = function (_x, _y) {
            this.move(_x - this._m_bck.x, _y - this._m_bck.y);
            return;
        };
        MxSlider.prototype.move = function (_x, _y) {
            this._m_group.incXY(_x, _y);
            return;
        };
        MxSlider.prototype.getValue = function () {
            return this._m_value;
        };
        MxSlider.prototype.getFracValue = function () {
            return this._m_norm_value;
        };
        MxSlider.prototype.setValue = function (_value) {
            if (this._m_min_value <= _value && _value <= this._m_max_value) {
                var dt_value = (_value - this._m_min_value) / this._m_delta_value;
                this._resize_fill(dt_value);
            }
            return;
        };
        MxSlider.prototype.setFracValue = function (_value) {
            if (0 <= _value && _value <= 1) {
                this._resize_fill(_value);
            }
            return;
        };
        MxSlider.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this._m_bck = null;
            this._m_fill = null;
            return;
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        MxSlider.prototype._resize_fill = function (_value) {
            this._m_fill.scaleX = _value * this._m_bck.scaleX;
            this._m_norm_value = _value;
            this._m_value
                = this._m_min_value + (this._m_norm_value * this._m_delta_value);
            this._m_text.text = this._m_value.toString();
            return;
        };
        MxSlider.prototype._onDown_slider = function (_pointer) {
            this._m_pointer = _pointer;
            this._m_dragging = true;
            this._onDrag(_pointer);
            return;
        };
        MxSlider.prototype._onDrag = function (_pointer) {
            var x = this._truncate(_pointer.x, this._m_bck.x, this._m_bck.x + this._m_size.x);
            x -= this._m_bck.x;
            x /= this._m_size.x;
            this._resize_fill(x);
            return;
        };
        MxSlider.prototype._truncate = function (_value, _min, _max) {
            if (_value > _max) {
                _value = _max;
            }
            else if (_value < _min) {
                _value = _min;
            }
            return _value;
        };
        return MxSlider;
    }(mxUI_1.MxUI));
    exports.MxSlider = MxSlider;
});
//# sourceMappingURL=gameBundle.js.map