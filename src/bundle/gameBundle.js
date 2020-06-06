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
define("utilities/fs/csv_row", ["require", "exports", "utilities/gameObjects/mxUObject", "utilities/fs/csv_file", "utilities/asserts"], function (require, exports, mxUObject_1, csv_file_1, asserts_1) {
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
            asserts_1.AssertString(_data);
            asserts_1.AssertString(_delimiter);
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
    }(mxUObject_1.MxUObject));
    exports.CSVRow = CSVRow;
});
define("utilities/fs/csv_file", ["require", "exports", "utilities/fs/csv_row", "utilities/gameObjects/mxUObject", "utilities/asserts"], function (require, exports, csv_row_1, mxUObject_2, asserts_2) {
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
            asserts_2.AssertString(_csv_data);
            asserts_2.AssertString(_cell_delimiter);
            asserts_2.AssertString(_row_delimiter);
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
            asserts_2.AssertString(_key_header);
            asserts_2.AssertString(_value);
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
    }(mxUObject_2.MxUObject));
    exports.CSVFile = CSVFile;
});
define("utilities/component/mxComponent", ["require", "exports", "utilities/gameObjects/mxUObject"], function (require, exports, mxUObject_3) {
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
    }(mxUObject_3.MxUObject));
    exports.MxComponent = MxComponent;
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
define("utilities/component/mxComponentMng", ["require", "exports", "utilities/component/mxComponent", "utilities/asserts", "utilities/enum_commons"], function (require, exports, mxComponent_1, asserts_3, enum_commons_1) {
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
            asserts_3.AssertNumber(_tag);
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
        kSand: 1,
        kDigital: 2,
        kAnalog: 3,
        kCount: 4
    });
    exports.COMPONENT_ID = Object.freeze({
        kChronoController: 1,
        kMasterController: 2,
        kGameController: 3,
        kDataController: 4
    });
    exports.MESSAGE_ID = Object.freeze({
        kOnAgentActive: 1,
        kOnAgentDesactive: 2,
        kGameController: 3,
        kDataController: 4
    });
});
define("utilities/component/mxActor", ["require", "exports", "utilities/component/mxComponentMng", "utilities/gameObjects/mxUObject", "utilities/data/mxChildrenManager", "utilities/enum_commons", "game/gameCommons"], function (require, exports, mxComponentMng_1, mxUObject_4, mxChildrenManager_1, enum_commons_3, gameCommons_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxActor = /** @class */ (function (_super) {
        __extends(MxActor, _super);
        /****************************************************/
        /* Protected                                        */
        /****************************************************/
        function MxActor() {
            var _this = _super.call(this) || this;
            _this.m_position = new Phaser.Geom.Point(0.0, 0.0);
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
            actor._m_parent
                = (typeof _m_parent == 'object' ? _m_parent : MxActor.GetNull());
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
            return actor;
        };
        MxActor.prototype.addChild = function (_child) {
            if (this._m_children_manager.exists(_child.get_id())) {
                return enum_commons_3.OPRESULT.kObject_already_exists;
            }
            return this._m_children_manager.add(_child);
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
    }(mxUObject_4.MxUObject));
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
define("game/managers/masteManager/components/MasterController", ["require", "exports", "utilities/component/mxComponent", "game/gameCommons"], function (require, exports, mxComponent_2, gameCommons_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MasterController = /** @class */ (function (_super) {
        __extends(MasterController, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function MasterController() {
            var _this = _super.call(this, gameCommons_3.COMPONENT_ID.kMasterController) || this;
            return _this;
        }
        MasterController.prototype.init = function (_actor) {
            this.m_dt = 0.0;
            return;
        };
        MasterController.prototype.update = function (_actor) {
            return;
        };
        return MasterController;
    }(mxComponent_2.MxComponent));
    exports.MasterController = MasterController;
});
define("game/managers/gameManager/components/chronoController", ["require", "exports", "utilities/component/mxComponent", "game/gameCommons", "game/managers/masteManager/masterManager", "utilities/asserts"], function (require, exports, mxComponent_3, gameCommons_4, masterManager_1, asserts_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChronoController = /** @class */ (function (_super) {
        __extends(ChronoController, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function ChronoController() {
            var _this = _super.call(this, gameCommons_4.COMPONENT_ID.kChronoController) || this;
            return _this;
        }
        ChronoController.prototype.init = function (_actor) {
            var master = masterManager_1.MasterManager.GetInstance();
            this._m_master_controller
                = master.getComponent(gameCommons_4.COMPONENT_ID.kMasterController);
            if (mxComponent_3.MxComponent.IsNull(this._m_master_controller)) {
                throw new Error('MasterController not founded!.');
            }
            this._m_isRunning = false;
            this.reset(5, 1);
            return;
        };
        ChronoController.prototype.update = function (_actor) {
            if (this._m_isRunning) {
                this._m_chrono_current -= this._m_master_controller.m_dt;
                // check if the chrono reach the mark
                if (!this._m_reach_mark) {
                    if (this._m_chrono_current <= this._m_chrono_mark) {
                        // TODO
                        this._m_reach_mark = !this._m_reach_mark;
                    }
                }
                // check if chrono reach zero.
                if (this._m_chrono_current <= 0) {
                    this._m_chrono_current = 0;
                    this.pause();
                }
            }
            return;
        };
        ChronoController.prototype.destroy = function () {
            this._m_master_controller = null;
            _super.prototype.destroy.call(this);
            return;
        };
        ChronoController.prototype.reset = function (_chrono_value, _chrono_mark) {
            asserts_5.AssertNumber(_chrono_value);
            this._m_chrono = _chrono_value;
            this._m_chrono_current = this._m_chrono;
            asserts_5.AssertNumber(_chrono_mark);
            this._m_chrono_mark = _chrono_mark;
            this._m_reach_mark = false;
            this.pause();
            return;
        };
        ChronoController.prototype.start = function () {
            if (!this._m_isRunning) {
                this._m_isRunning = !this._m_isRunning;
            }
            return;
        };
        ChronoController.prototype.pause = function () {
            if (this._m_isRunning) {
                this._m_isRunning = !this._m_isRunning;
            }
            return;
        };
        ChronoController.prototype.getCurrentTime = function () {
            return this._m_chrono_current;
        };
        ChronoController.prototype.getCurrentTimeNorm = function () {
            return this._m_chrono_current / this._m_chrono;
        };
        ChronoController.prototype.isRunning = function () {
            return this._m_isRunning;
        };
        return ChronoController;
    }(mxComponent_3.MxComponent));
    exports.ChronoController = ChronoController;
});
define("game/managers/userPreferences/userPreferences", ["require", "exports", "game/gameCommons"], function (require, exports, gameCommons_5) {
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
            this.m_localization = gameCommons_5.LOCALIZATION.KSpanish;
            this.m_clock_style = gameCommons_5.CLOCK_STYLE.kSand;
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
define("game/managers/gameManager/components/gameController", ["require", "exports", "utilities/component/mxComponent", "game/gameCommons", "game/managers/userPreferences/userPreferences"], function (require, exports, mxComponent_4, gameCommons_6, userPreferences_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GameController = /** @class */ (function (_super) {
        __extends(GameController, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function GameController() {
            var _this = _super.call(this, gameCommons_6.COMPONENT_ID.kGameController) || this;
            return _this;
        }
        GameController.prototype.init = function (_actor) {
            this._m_chronoController = _actor.getComponent(gameCommons_6.COMPONENT_ID.kChronoController);
            if (mxComponent_4.MxComponent.IsNull(this._m_chronoController)) {
                throw new Error('ChronoController not founded!.');
            }
            this._m_user_preferences = new userPreferences_1.UserPreferences();
            return;
        };
        GameController.prototype.update = function (_actor) {
            return;
        };
        GameController.prototype.destroy = function () {
            this._m_user_preferences.destroy();
            return;
        };
        GameController.prototype.initGamePlay = function () {
            if (!this._m_inGameplay) {
            }
            return;
        };
        /**
        * Reset the Gameplay
        */
        GameController.prototype.resetGameplay = function () {
            if (this._m_inGameplay) {
                this._m_chronoController.reset(this._m_user_preferences.chrono_value, this._m_user_preferences.chrono_value * 0.1);
            }
            return;
        };
        /**
         * Shutdown Gameplay
         */
        GameController.prototype.shutdownGameplay = function () {
            if (this._m_inGameplay) {
                this._m_inGameplay = !this._m_inGameplay;
            }
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
    }(mxComponent_4.MxComponent));
    exports.GameController = GameController;
});
define("game/managers/gameManager/components/dataController", ["require", "exports", "utilities/component/mxComponent", "game/gameCommons"], function (require, exports, mxComponent_5, gameCommons_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DataController = /** @class */ (function (_super) {
        __extends(DataController, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function DataController() {
            var _this = _super.call(this, gameCommons_7.COMPONENT_ID.kDataController) || this;
            _this._string_map = new Map();
            return _this;
        }
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
    }(mxComponent_5.MxComponent));
    exports.DataController = DataController;
});
define("scenes/preloader", ["require", "exports", "utilities/fs/csv_file", "game/managers/masteManager/masterManager", "game/gameCommons", "utilities/fs/csv_row"], function (require, exports, csv_file_2, masterManager_2, gameCommons_8, csv_row_2) {
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
            this.load.atlas('main_menu', 'src/assets/images/atlas/main_menu.png', 'src/assets/images/atlas/main_menu.js');
            ///////////////////////////////////
            // Text
            this.load.text('game_text', 'src/assets/csv_files/Mimi_k_data - game_texts.tsv');
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
            this._m_a_puzzle_pieces = new Array();
            this._m_a_pieces_position = new Array();
            obj_layer = this._get_object_layer(puzzle_map, 'puzzle_pieces');
            this._m_a_puzzle_pieces = this._create_sprites_from(this, obj_layer, 'metta_puzzle_loader', img_names, first_gid);
            obj_layer = this._get_object_layer(puzzle_map, 'puzzle_pieces_start_point');
            var pieces_size = this._m_a_puzzle_pieces.length;
            var object;
            var piece;
            for (var index = 0; index < pieces_size; ++index) {
                object = obj_layer[index];
                piece = this._m_a_puzzle_pieces[index];
                this._m_a_pieces_position.push(new Phaser.Geom.Point(piece.x, piece.y));
                piece.setPosition(object.x, object.y);
            }
            // Index
            this._m_indexes = new Int8Array(pieces_size);
            for (var index = 0; index < pieces_size; ++index) {
                this._m_indexes[index] = index;
            }
            this._m_active_idx = 0;
            this._shuffle(this._m_indexes);
            // Callbacks
            this.load.on('progress', this._onProgress, this);
            this.load.on('complete', this._onLoadComplete, this);
            return;
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        Preloader.prototype._onProgress = function (_value) {
            var target_idx = Math.floor(this._m_indexes.length * _value);
            while (this._m_active_idx < target_idx) {
                var piece = void 0;
                var position = void 0;
                piece = this._m_a_puzzle_pieces[this._m_indexes[this._m_active_idx]];
                position = this._m_a_pieces_position[this._m_indexes[this._m_active_idx]];
                piece.setPosition(position.x, position.y);
                ++this._m_active_idx;
            }
            return;
        };
        Preloader.prototype._onLoadComplete = function () {
            var csv_file = csv_file_2.CSVFile.Create(this.game.cache.text.get('game_text'), true, '\t');
            // Sets the column that has the text.
            // 1 : Spanish
            // 2 : English    
            var master = masterManager_2.MasterManager.GetInstance();
            var gameManger = master.get_child(gameCommons_8.MANAGER_ID.kGameManager);
            var gameController = gameManger.getComponent(gameCommons_8.COMPONENT_ID.kGameController);
            var dataController = gameManger.getComponent(gameCommons_8.COMPONENT_ID.kDataController);
            var text_column_index = (gameController.getLocalization() == gameCommons_8.LOCALIZATION.KSpanish ? 1 : 2);
            var num_rows = csv_file.getNumberRows();
            var row = null;
            for (var index = 0; index < num_rows; ++index) {
                row = csv_file.getRow(index);
                if (csv_row_2.CSVRow.IsNull(row)) {
                    break;
                }
                dataController.add(row.getCell(0), row.getCell(text_column_index));
            }
            csv_file.destroy();
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
        Preloader.prototype._shuffle = function (_a) {
            var j;
            var x;
            var i;
            for (i = _a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = _a[i];
                _a[i] = _a[j];
                _a[j] = x;
            }
            return _a;
        };
        return Preloader;
    }(Phaser.Scene));
    exports.Preloader = Preloader;
});
define("game/managers/gameManager/gameManager", ["require", "exports", "game/gameCommons", "utilities/component/mxActor", "game/managers/gameManager/components/gameController", "game/managers/gameManager/components/chronoController", "game/managers/gameManager/components/dataController"], function (require, exports, gameCommons_9, mxActor_2, gameController_1, chronoController_1, dataController_1) {
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
            var manager = mxActor_2.MxActor.Create(gameCommons_9.MANAGER_ID.kGameManager);
            ///////////////////////////////////
            // Components
            manager.addComponent(new gameController_1.GameController());
            manager.addComponent(new chronoController_1.ChronoController());
            manager.addComponent(new dataController_1.DataController());
            return manager;
        };
        return GameManager;
    }());
    exports.GameManager = GameManager;
});
define("scenes/boot", ["require", "exports", "utilities/component/mxComponent", "utilities/component/mxActor", "game/managers/masteManager/masterManager", "game/managers/gameManager/gameManager", "game/managers/masteManager/components/MasterController"], function (require, exports, mxComponent_6, mxActor_3, masterManager_3, gameManager_1, MasterController_1) {
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
            // Fit the game canvas to parent container
            this.game.scale.scaleMode = Phaser.Scale.ScaleModes.FIT;
            // prepare modules
            mxComponent_6.MxComponent.Prepare();
            mxActor_3.MxActor.Prepare();
            // Master Manager
            masterManager_3.MasterManager.Prepare();
            var master = masterManager_3.MasterManager.GetInstance();
            // Master Manager Components
            master.addComponent(new MasterController_1.MasterController());
            // Master Manager Children
            master.addChild(gameManager_1.GameManager.Create());
            master.init();
            // next scene
            this.scene.start('localization');
            return;
        };
        return Boot;
    }(Phaser.Scene));
    exports.Boot = Boot;
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
define("utilities/listeners/mxListener", ["require", "exports", "utilities/asserts"], function (require, exports, asserts_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxListener = /** @class */ (function () {
        function MxListener(_listener, _context) {
            asserts_6.AssertFunction(_listener);
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
define("game/ui/carousel/carousel", ["require", "exports", "game/ui/buttons/imgButton", "utilities/listeners/mxListenerManager", "utilities/listeners/mxListener"], function (require, exports, imgButton_1, mxListenerManager_1, mxListener_1) {
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
            this.m_events = new mxListenerManager_1.MxListenerManager();
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
            this.m_events.addListener(_event, new mxListener_1.MxListener(_fn, _context));
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
define("scenes/menus/mainMenu", ["require", "exports"], function (require, exports) {
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
            /*
            // gameCommons
            let half_width : number = this.game.canvas.width * 0.5;
    
            // gets the Game Manager.
            this.m_game_manager
                = this.m_master.getManager<GameManager>(MANAGER_ID.kGameManager);
            
            // gets the DataManager from GameManager.
            this.m_data_mng = this.m_game_manager.getDataManager();
    
            // Create the cloud poupup.
            this.m_cloud_popup = new  CloudPopup(this);
            this.m_cloud_popup.setMaxWidth(800);
            this.m_cloud_popup.setPosition
            (
                half_width,
                this.game.canvas.height * 0.9
            );
    
            // display first tip.
            this.m_tip_num = 0;
            this.nextTip();
            
            ///////////////////////////////////
            // Buttons
    
            // Time Preferences Buttons
            this.m_pref_buttons = new Array<NineButton>();
            
            let but_pos = new  Phaser.Geom.Point
            (
                half_width,
                this.game.canvas.height * 0.1
            );
    
            let button : NineButton;
            let a_times = [ 5, 3, 1 ];
            
            for(let index = 0; index < 3; ++index) {
                button = NineButton.CreateDefault
                (
                    this,
                    but_pos.x,
                    but_pos.y,
                    '' + a_times[index] + ' minutes',
                    function() {
                        this._onClick_minute_button(a_times[index] * 60);
                    },
                    this
                );
    
                this.m_pref_buttons.push(button);
                but_pos.y += button.getHeight() + 20;
            }
            this._close_prefs();
    
            // play
            this.m_play_button = NineButton.CreateDefault
            (
                this,
                half_width,
                this.game.canvas.height * 0.1,
                "Play",
                this._onClick_play,
                this
            );
    
            // tip
            NineButton.CreateDefault
            (
                this,
                half_width,
                this.game.canvas.height * 0.75,
                "Next Tip",
                this.nextTip,
                this
            );
    
            ///////////////////////////////////
            // Carousel
            
            this.m_carousel = new Carousel
            (
                this,
                half_width,
                this.game.canvas.height * 0.5,
                450,
                'main_menu',
                'clock_idx_',
                '.png',
                CLOCK_STYLE.kCount
            );
            this.m_carousel.addListener('active_changed', this._onCarouselChanged, this);
            
            // carousel title
            let carousel_title = this.add.text
            (
                half_width,
                this.game.canvas.height * 0.35,
                this.m_data_mng.getString('choose_clock'),
                { fontFamily: '"Roboto Condensed"' }
            );
    
            carousel_title.setFontSize(50);
            carousel_title.setColor('black');
            carousel_title.setOrigin(0.5,0.5);
    
            // carousel item name.
            this.m_carousel_item_name = this.add.text
            (
                half_width,
                this.game.canvas.height * 0.65,
                "",
                { fontFamily: '"Roboto Condensed"' }
            );
    
            this.m_carousel_item_name.setFontSize(50);
            this.m_carousel_item_name.setColor('black');
            this.m_carousel_item_name.setOrigin(0.5,0.5);
    
            // display default element
            this.m_carousel.setActive
            (
                this.m_game_manager.getUserPreference().getClockStyle()
            );
                */
            return;
        };
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
        * Safely destroys the object.
        */
        MainMenu.prototype.destroy = function () {
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
            //this.m_data_mng = null;        
            return;
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        MainMenu.prototype._onClick_minute_button = function (_time) {
            /*
            let prefs : UserPreferences
                = this.m_game_manager.getUserPreference();
            prefs.chrono_value = _time;
    
            // TODO : descomentar,hasta tener el skin de todos los relojes.
            //prefs.setClockStyle(this.m_carousel.getCurrentIdx());
            prefs.setClockStyle(0);
    
            this.destroy();
            this.scene.start('mainGame');
            return;*/
        };
        MainMenu.prototype._onCarouselChanged = function () {
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
        };
        return MainMenu;
    }(Phaser.Scene));
    exports.MainMenu = MainMenu;
});
define("game/ui/clocks/chronoClock", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChronoClock = /** @class */ (function () {
        function ChronoClock() {
        }
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
            //this.m_text.text = this.m_chrono_mng.getCurrentTime().toString();
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
        function TimeOutPop(_scene, _x, _y) {
        }
        TimeOutPop.prototype.open = function () {
            if (!this.m_isOpen) {
                this.m_group.setVisible(true);
                var rnd = 1 + (Math.floor(Math.random() * 5));
                if (rnd > 4) {
                    rnd = 4;
                }
                //this.m_msg.text = this.m_data_mng.getString('time_out_' + rnd);
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
define("scenes/levels/game_level", ["require", "exports"], function (require, exports) {
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
            /****************************************************/
            /* Private                                          */
            /****************************************************/
            /*
              private _on_click_main_menu()
              : void {
                  this.destroy();
                  this.scene.start('mainMenu');
                  return;
              }
          
              private _on_chrono_finish()
              : void {
                  this._reset_clock();
                  this.m_pop_up.open();
                  return;
              }
          
              private _on_reach_mark()
              : void {
                  this.m_chrono_clock.hotClock();
                  return;
              }
          
              private _reset_clock()
              : void { /*
                  this.m_chrono_mng.reset
                  (
                      this.m_user_pref.chrono_value,
                      //15,
                      10
                  )
          
                  this._init_button_frame();
                  this.m_chrono_clock.reset();
                  
                  if(this.m_pop_up.isOpen()){
                      this.m_pop_up.close();
                  }
                  return;*/
        };
        MainGame.prototype._on_click_pause_resume = function () {
        };
        MainGame.prototype._init_button_frame = function () {
            this.m_pause_resume.setText('Start');
            return;
        };
        return MainGame;
    }(Phaser.Scene));
    exports.MainGame = MainGame;
});
define("scenes/localization", ["require", "exports", "game/gameCommons", "game/managers/masteManager/masterManager"], function (require, exports, gameCommons_10, masterManager_4) {
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
            // English icon
            var english_button = this.add.sprite(width * 0.5, height * 0.25, 'preloader', 'english_map.png');
            english_button.setInteractive();
            english_button.on('pointerup', this._onClick_english, this);
            // Latam icon
            var latin_button = this.add.sprite(width * 0.5, height * 0.75, 'preloader', 'latino_map.png');
            latin_button.setInteractive();
            latin_button.on('pointerup', this._onClick_spanish, this);
            return;
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        LocalizationScene.prototype._onClick_english = function () {
            var master = masterManager_4.MasterManager.GetInstance();
            var gameManager = master.get_child(gameCommons_10.MANAGER_ID.kGameManager);
            var gameController = gameManager.getComponent(gameCommons_10.COMPONENT_ID.kGameController);
            gameController.setLocalization(gameCommons_10.LOCALIZATION.kEnglish);
            // TODO: start preload scene.
            this.scene.start('preloader');
            return;
        };
        LocalizationScene.prototype._onClick_spanish = function () {
            var master = masterManager_4.MasterManager.GetInstance();
            var gameManager = master.get_child(gameCommons_10.MANAGER_ID.kGameManager);
            var gameController = gameManager.getComponent(gameCommons_10.COMPONENT_ID.kGameController);
            gameController.setLocalization(gameCommons_10.LOCALIZATION.KSpanish);
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
define("scenes/levels/testing/test_level_tiled", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Test_Level_Tiled = /** @class */ (function (_super) {
        __extends(Test_Level_Tiled, _super);
        function Test_Level_Tiled() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Test_Level_Tiled.prototype.create = function () {
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
    }(Phaser.Scene));
    exports.Test_Level_Tiled = Test_Level_Tiled;
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
define("utilities/component/mxActorAssembler", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxActorAssembler = /** @class */ (function () {
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function MxActorAssembler() {
            this._m_common_components = new Map();
            return;
        }
        MxActorAssembler.prototype.assemble = function (_actor) {
            var component_mng = _actor.getComponentMng();
            this._m_common_components.forEach(function (_component) {
                component_mng.addComponent(_component);
                return;
            }, this);
            return;
        };
        MxActorAssembler.prototype.update = function () {
            return;
        };
        /**
        * Safely destroys the object.
        */
        MxActorAssembler.prototype.destroy = function () {
            this._m_common_components.forEach(function (_component) {
                _component.destroy();
                return;
            }, this);
            this._m_common_components.clear();
            this._m_common_components = null;
            return;
        };
        return MxActorAssembler;
    }());
    exports.MxActorAssembler = MxActorAssembler;
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