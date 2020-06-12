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
        kBitmapText: 11
    });
    exports.MESSAGE_ID = Object.freeze({
        kOnAgentActive: 1,
        kOnAgentDesactive: 2,
        kGameController: 3,
        kDataController: 4
    });
    exports.CAROUSEL_CHILD_ID = Object.freeze({
        kTitle: 1,
        kPreview: 2,
        kLeftButton: 3,
        kRightButton: 4,
        kClockName: 5,
        kPreviewBackground: 6
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
define("game/managers/gameManager/components/dataController", ["require", "exports", "utilities/component/mxComponent", "game/gameCommons", "utilities/fs/csv_file", "utilities/fs/csv_row"], function (require, exports, mxComponent_5, gameCommons_7, csv_file_2, csv_row_2) {
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
        DataController.prototype.init = function (_actor) {
            this._gameController = _actor.getComponent(gameCommons_7.COMPONENT_ID.kGameController);
            return;
        };
        DataController.prototype.initLanguage = function (_game) {
            var csv_file = csv_file_2.CSVFile.Create(_game.cache.text.get('game_text'), true, '\t');
            var text_column_index = (this._gameController.getLocalization() == gameCommons_7.LOCALIZATION.KSpanish ? 1 : 2);
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
    }(mxComponent_5.MxComponent));
    exports.DataController = DataController;
});
define("scenes/preloader", ["require", "exports", "game/managers/masteManager/masterManager", "game/gameCommons"], function (require, exports, masterManager_2, gameCommons_8) {
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
            ///////////////////////////////////
            // Fonts
            this.load.bitmapFont('avant_bold', 'src/assets/images/bitmapFonts/avent_bold-export.png', 'src/assets/images/bitmapFonts/avent_bold-export.xml');
            this.load.bitmapFont('avant_garde_bk', 'src/assets/images/bitmapFonts/avant_garde_bk-export.png', 'src/assets/images/bitmapFonts/avant_garde_bk-export.xml');
            this.load.bitmapFont('digital_dream', 'src/assets/images/bitmapFonts/digital_dream-export.png', 'src/assets/images/bitmapFonts/digital_dream-export.xml');
            ///////////////////////////////////
            // Text
            this.load.text('game_text', 'src/assets/csv_files/Mimi_k_data - game_texts.tsv');
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
            var master = masterManager_2.MasterManager.GetInstance();
            var gameManger = master.get_child(gameCommons_8.MANAGER_ID.kGameManager);
            var dataController = gameManger.getComponent(gameCommons_8.COMPONENT_ID.kDataController);
            dataController.initLanguage(this.game);
            this.scene.start('welcomePage');
            return;
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
define("scenes/boot", ["require", "exports", "utilities/component/mxComponent", "utilities/component/mxActor", "game/managers/masteManager/masterManager", "game/managers/gameManager/gameManager", "game/managers/masteManager/components/MasterController", "game/gameCommons"], function (require, exports, mxComponent_6, mxActor_3, masterManager_3, gameManager_1, MasterController_1, gameCommons_10) {
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
            masterManager_3.MasterManager.Prepare();
            var master = masterManager_3.MasterManager.GetInstance();
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
define("game/components/textComponent", ["require", "exports", "utilities/component/mxComponent", "game/gameCommons"], function (require, exports, mxComponent_8, gameCommons_12) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TextComponent = /** @class */ (function (_super) {
        __extends(TextComponent, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function TextComponent() {
            var _this = _super.call(this, gameCommons_12.COMPONENT_ID.kText) || this;
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
    }(mxComponent_8.MxComponent));
    exports.TextComponent = TextComponent;
});
define("game/components/bitmapTextComponent", ["require", "exports", "utilities/component/mxComponent", "game/gameCommons"], function (require, exports, mxComponent_9, gameCommons_13) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BitmapTextComponent = /** @class */ (function (_super) {
        __extends(BitmapTextComponent, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function BitmapTextComponent() {
            var _this = _super.call(this, gameCommons_13.COMPONENT_ID.kBitmapText) || this;
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
            if (_id == gameCommons_13.MESSAGE_ID.kOnAgentActive) {
                this.setVisible(true);
                this.setActive(true);
                return;
            }
            else if (_id == gameCommons_13.MESSAGE_ID.kOnAgentDesactive) {
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
    }(mxComponent_9.MxComponent));
    exports.BitmapTextComponent = BitmapTextComponent;
});
define("game/ui/cloudPopup/components/popupController", ["require", "exports", "utilities/component/mxComponent", "game/gameCommons"], function (require, exports, mxComponent_10, gameCommons_14) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PopupController = /** @class */ (function (_super) {
        __extends(PopupController, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function PopupController() {
            var _this = _super.call(this, gameCommons_14.COMPONENT_ID.kPopupController) || this;
            return _this;
        }
        PopupController.prototype.init = function (_actor) {
            // get components.
            this._m_nineSliceComponent = _actor.getComponent(gameCommons_14.COMPONENT_ID.kNineSlice);
            this._m_textComponent = _actor.getComponent(gameCommons_14.COMPONENT_ID.kBitmapText);
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
    }(mxComponent_10.MxComponent));
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
define("game/ui/cloudPopup/Popup", ["require", "exports", "utilities/component/mxActor", "game/components/nineSliceComponent", "game/ui/cloudPopup/components/popupController", "game/ui/text/uiBitmapText"], function (require, exports, mxActor_4, nineSliceComponent_1, popupController_1, uiBitmapText_1) {
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
        return Popup;
    }());
    exports.Popup = Popup;
});
define("game/components/spriteComponent", ["require", "exports", "utilities/component/mxComponent", "game/gameCommons"], function (require, exports, mxComponent_11, gameCommons_15) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SpriteComponent = /** @class */ (function (_super) {
        __extends(SpriteComponent, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function SpriteComponent() {
            var _this = _super.call(this, gameCommons_15.COMPONENT_ID.kSprite) || this;
            _this._m_local_position = new Phaser.Geom.Point(0.0, 0.0);
            return _this;
        }
        SpriteComponent.prototype.update = function (_actor) {
            this._m_sprite.x = _actor._m_position.x + this._m_local_position.x;
            this._m_sprite.y = _actor._m_position.y + this._m_local_position.y;
            return;
        };
        SpriteComponent.prototype.receive = function (_id, _data) {
            if (_id == gameCommons_15.MESSAGE_ID.kOnAgentActive) {
                this.setVisible(true);
                this.setActive(true);
                return;
            }
            else if (_id == gameCommons_15.MESSAGE_ID.kOnAgentDesactive) {
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
    }(mxComponent_11.MxComponent));
    exports.SpriteComponent = SpriteComponent;
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
define("game/ui/buttons/imgButton", ["require", "exports", "utilities/component/mxActor", "game/components/spriteComponent", "game/ui/text/uiBitmapText"], function (require, exports, mxActor_5, spriteComponent_1, uiBitmapText_2) {
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
            var spriteComponent = new spriteComponent_1.SpriteComponent();
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
            var spriteComponent = new spriteComponent_1.SpriteComponent();
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
define("game/ui/carousel/components/carousleController", ["require", "exports", "utilities/component/mxComponent", "game/gameCommons", "game/managers/masteManager/masterManager"], function (require, exports, mxComponent_12, gameCommons_16, masterManager_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CarouselController = /** @class */ (function (_super) {
        __extends(CarouselController, _super);
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function CarouselController() {
            var _this = _super.call(this, gameCommons_16.COMPONENT_ID.kCarouselController) || this;
            return _this;
        }
        CarouselController.prototype.init = function (_actor) {
            ///////////////////////////////////
            // Game Controller
            var master = masterManager_4.MasterManager.GetInstance();
            var gameManager = master.get_child(gameCommons_16.MANAGER_ID.kGameManager);
            this._gameController = gameManager.getComponent(gameCommons_16.COMPONENT_ID.kGameController);
            ///////////////////////////////////
            // DataController
            this._dataController = gameManager.getComponent(gameCommons_16.COMPONENT_ID.kDataController);
            ///////////////////////////////////
            // Left Button
            var leftButton = _actor.get_child(gameCommons_16.CAROUSEL_CHILD_ID.kLeftButton);
            var leftButton_sprite = leftButton.getComponent(gameCommons_16.COMPONENT_ID.kSprite);
            leftButton_sprite.on('pointerdown', this._onClick_leftButton, this);
            ///////////////////////////////////
            // Right Button
            var rightButton = _actor.get_child(gameCommons_16.CAROUSEL_CHILD_ID.kRightButton);
            var rightButton_sprite = rightButton.getComponent(gameCommons_16.COMPONENT_ID.kSprite);
            rightButton_sprite.on('pointerdown', this._onClick_rightButton, this);
            ///////////////////////////////////
            // ClockName Text
            var clockName = _actor.get_child(gameCommons_16.CAROUSEL_CHILD_ID.kClockName);
            this._clockName_text = clockName.getComponent(gameCommons_16.COMPONENT_ID.kBitmapText);
            ///////////////////////////////////
            // Preview SpriteComponent
            var preview = _actor.get_child(gameCommons_16.CAROUSEL_CHILD_ID.kPreview);
            this._carouselSprite = preview.getComponent(gameCommons_16.COMPONENT_ID.kSprite);
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
                this._activeIndex = gameCommons_16.CLOCK_STYLE.kCount - 1;
            }
            this._setActiveItem(this._activeIndex);
            return;
        };
        CarouselController.prototype._onClick_rightButton = function () {
            ++this._activeIndex;
            if (this._activeIndex >= gameCommons_16.CLOCK_STYLE.kCount) {
                this._activeIndex = 0;
            }
            this._setActiveItem(this._activeIndex);
            return;
        };
        CarouselController.prototype._setActiveItem = function (_idx) {
            // Set clock name.
            this._clockName_text.setText(this._dataController.getString('clock_name_' + _idx));
            // Set clock preview.
            this._carouselSprite.setFrame('clock_idx_' + _idx + '.png');
            // Set user preference.
            this._gameController._m_user_preferences.setClockStyle(_idx);
            return;
        };
        return CarouselController;
    }(mxComponent_12.MxComponent));
    exports.CarouselController = CarouselController;
});
define("game/ui/carousel/carousel", ["require", "exports", "game/ui/buttons/imgButton", "utilities/component/mxActor", "game/gameCommons", "game/components/spriteComponent", "game/ui/carousel/components/carousleController", "game/ui/text/uiBitmapText", "game/managers/masteManager/masterManager"], function (require, exports, imgButton_1, mxActor_6, gameCommons_17, spriteComponent_2, carousleController_1, uiBitmapText_3, masterManager_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Carousel = /** @class */ (function () {
        function Carousel() {
        }
        Carousel.Create = function (_scene, _id) {
            // Get Data Manager.
            var master = masterManager_5.MasterManager.GetInstance();
            var gameManager = master.get_child(gameCommons_17.MANAGER_ID.kGameManager);
            var dataController = gameManager.getComponent(gameCommons_17.COMPONENT_ID.kDataController);
            var carousel = mxActor_6.MxActor.Create(_id);
            /****************************************************/
            /* Children                                         */
            /****************************************************/
            ///////////////////////////////////
            // Title
            var label = mxActor_6.MxActor.Create(gameCommons_17.CAROUSEL_CHILD_ID.kTitle);
            var labelText = uiBitmapText_3.UIBitmapText.AddStandard(_scene, dataController.getString('choose_clock'), label);
            labelText.setOrigin(0.5, 0.5);
            labelText.setFontSize(60);
            label.init();
            label.setRelativePosition(0.0, -315.0);
            carousel.addChild(label);
            ///////////////////////////////////
            // Preview Background
            var previewBackground = mxActor_6.MxActor.Create(gameCommons_17.CAROUSEL_CHILD_ID.kPreviewBackground, carousel);
            var backgroundImg = new spriteComponent_2.SpriteComponent();
            backgroundImg.setSprite(_scene.add.sprite(0, 0, 'landpage', 'clock_background.png'));
            previewBackground.addComponent(backgroundImg);
            ///////////////////////////////////
            // Preview
            var preview = mxActor_6.MxActor.Create(gameCommons_17.CAROUSEL_CHILD_ID.kPreview);
            var preview_sprite = new spriteComponent_2.SpriteComponent();
            preview_sprite.setSprite(_scene.add.sprite(0, 0, 'landpage', 'clock_idx_0.png'));
            preview.addComponent(preview_sprite);
            preview.init();
            carousel.addChild(preview);
            ///////////////////////////////////
            // Left Button
            var leftButton = imgButton_1.Button.CreateImageButton(_scene, gameCommons_17.CAROUSEL_CHILD_ID.kLeftButton, -350, 0, 'landpage', 'arrow_button.png', function () { }, this);
            var leftButton_sprite = leftButton.getComponent(gameCommons_17.COMPONENT_ID.kSprite);
            leftButton_sprite.setScale(-1.0, 1.0);
            leftButton_sprite.setTint(0x7763ad);
            carousel.addChild(leftButton);
            ///////////////////////////////////
            // Right Button
            var rightButton = imgButton_1.Button.CreateImageButton(_scene, gameCommons_17.CAROUSEL_CHILD_ID.kRightButton, 350, 0, 'landpage', 'arrow_button.png', function () { }, this);
            var rightButton_sprite = rightButton.getComponent(gameCommons_17.COMPONENT_ID.kSprite);
            rightButton_sprite.setTint(0x7763ad);
            carousel.addChild(rightButton);
            ///////////////////////////////////
            // Clock Name
            var clock_name = mxActor_6.MxActor.Create(gameCommons_17.CAROUSEL_CHILD_ID.kClockName);
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
            return carousel;
        };
        return Carousel;
    }());
    exports.Carousel = Carousel;
});
define("scenes/menus/mainMenu", ["require", "exports", "game/managers/masteManager/masterManager", "game/gameCommons", "game/ui/cloudPopup/Popup", "game/ui/carousel/carousel", "game/ui/buttons/imgButton"], function (require, exports, masterManager_6, gameCommons_18, Popup_1, carousel_1, imgButton_2) {
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
            var master = masterManager_6.MasterManager.GetInstance();
            // GameManager.
            var gameManager = master.get_child(gameCommons_18.MANAGER_ID.kGameManager);
            // GameController
            this._m_gameController
                = gameManager.getComponent(gameCommons_18.COMPONENT_ID.kGameController);
            // DataController
            this._m_dataController
                = gameManager.getComponent(gameCommons_18.COMPONENT_ID.kDataController);
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
                button = imgButton_2.Button.CreateStandard(this_1, index, but_pos.x, but_pos.y, 'landpage', 'button.png', '' + a_times[index] + this_1._m_dataController.getString('minutes'), function () {
                    this._onClick_minute_button(a_times[index] * 60);
                }, this_1);
                this_1._m_a_preferenceButtons.push(button);
                nineSliceComponent = button.getComponent(gameCommons_18.COMPONENT_ID.kSprite);
                nineSliceComponent.setTint(a_buttonColors[index]);
                but_pos.y += nineSliceComponent.getHeight() + 20;
                prefButtonText = button.getComponent(gameCommons_18.COMPONENT_ID.kBitmapText);
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
            var playButtonText = this._m_play_button.getComponent(gameCommons_18.COMPONENT_ID.kBitmapText);
            playButtonText.setTint(0xffffff);
            playButtonText.setFontSize(65);
            var playButtonSprite = this._m_play_button.getComponent(gameCommons_18.COMPONENT_ID.kSprite);
            playButtonSprite.setTint(0x31a13b);
            /****************************************************/
            /* Next Tip Button                                  */
            /****************************************************/
            this._m_nextTipButton = imgButton_2.Button.CreateStandard(this, 0, half_width, this.game.canvas.height * 0.93, 'landpage', 'button_small_bg.png', this._m_dataController.getString('other_tip'), this._nextTip, this);
            var tipButtonText = this._m_nextTipButton.getComponent(gameCommons_18.COMPONENT_ID.kBitmapText);
            tipButtonText.setTint(0xffffff);
            var tipButtonSprite = this._m_nextTipButton.getComponent(gameCommons_18.COMPONENT_ID.kSprite);
            tipButtonSprite.setTint(0xff5709);
            /****************************************************/
            /* Carousel                                         */
            /****************************************************/
            this._m_carousel = carousel_1.Carousel.Create(this, 1);
            this._m_carousel.setRelativePosition(this.game.canvas.width * 0.5, this.game.canvas.height * 0.22);
            return;
        };
        /**
         *
         */
        MainMenu.prototype.update = function () {
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
            return;
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        MainMenu.prototype._onClick_minute_button = function (_time) {
            this._m_gameController._m_user_preferences.chrono_value = _time;
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
            this._open_prefs();
            this._m_play_button.mxDesactive();
            return;
        };
        MainMenu.prototype._nextTip = function () {
            var popupController = this._m_cloud_popup.getComponent(gameCommons_18.COMPONENT_ID.kPopupController);
            popupController.setText(this._m_dataController.getString('menu_tip_0' + this._m_tip_num));
            popupController.close();
            popupController.open();
            // iterate over tips.
            this._m_tip_num++;
            if (this._m_tip_num > 5) {
                this._m_tip_num = 0;
            }
            return;
        };
        return MainMenu;
    }(Phaser.Scene));
    exports.MainMenu = MainMenu;
});
define("scenes/levels/game_level", ["require", "exports", "game/managers/masteManager/masterManager", "game/gameCommons", "game/ui/buttons/imgButton"], function (require, exports, masterManager_7, gameCommons_19, imgButton_3) {
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
            var master = masterManager_7.MasterManager.GetInstance();
            var gameManager = master.get_child(gameCommons_19.MANAGER_ID.kGameManager);
            this._m_dataController
                = gameManager.getComponent(gameCommons_19.COMPONENT_ID.kDataController);
            this._m_gameController
                = gameManager.getComponent(gameCommons_19.COMPONENT_ID.kGameController);
            /****************************************************/
            /* Main Menu Button                                 */
            /****************************************************/
            var halfWidth = this.game.canvas.width * 0.5;
            this._m_mainMenuButton = imgButton_3.Button.CreateStandard(this, 0, halfWidth, 200, 'landpage', 'button.png', this._m_dataController.getString('back_to_menu'), this._onClick_mainMenu, this);
            var mainMenuButtonSprite = this._m_mainMenuButton.getComponent(gameCommons_19.COMPONENT_ID.kSprite);
            mainMenuButtonSprite.setTint(0xface01);
            var mainMenuButtonText = this._m_mainMenuButton.getComponent(gameCommons_19.COMPONENT_ID.kBitmapText);
            mainMenuButtonText.setTint(0x0a0136);
            /****************************************************/
            /* Pause Button                                     */
            /****************************************************/
            this._m_pauseButton = imgButton_3.Button.CreateStandard(this, 0, halfWidth, 1600, 'landpage', 'button.png', this._m_dataController.getString('pause'), this._on_click_pause_resume, this);
            var pauseButtonSprite = this._m_pauseButton.getComponent(gameCommons_19.COMPONENT_ID.kSprite);
            pauseButtonSprite.setTint(0x31a13b);
            var pauseButtonText = this._m_pauseButton.getComponent(gameCommons_19.COMPONENT_ID.kBitmapText);
            pauseButtonText.setTint(0xffffff);
            /****************************************************/
            /* Reset Button                                     */
            /****************************************************/
            this._m_resetButton = imgButton_3.Button.CreateStandard(this, 0, halfWidth, 1800, 'landpage', 'button.png', this._m_dataController.getString('reset'), this._onClick_Reset, this);
            var resetButtonSprite = this._m_pauseButton.getComponent(gameCommons_19.COMPONENT_ID.kSprite);
            resetButtonSprite.setTint(0x31a13b);
            var resetButtonText = this._m_pauseButton.getComponent(gameCommons_19.COMPONENT_ID.kBitmapText);
            resetButtonText.setTint(0xffffff);
            return;
        };
        MainGame.prototype.update = function () {
            this._m_pauseButton.update();
            this._m_mainMenuButton.update();
            this._m_resetButton.update();
            return;
        };
        MainGame.prototype.destroy = function () {
            this._m_pauseButton.destroy();
            this._m_mainMenuButton.destroy();
            this._m_resetButton.destroy();
            return;
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        /**
         * Pause or resume time.
         */
        MainGame.prototype._on_click_pause_resume = function () {
            return;
        };
        /**
         * Returns to the Mainmenu scene.
         */
        MainGame.prototype._onClick_mainMenu = function () {
            this.destroy();
            this.scene.start('mainMenu');
            return;
        };
        /**
         * Reset time.
         */
        MainGame.prototype._onClick_Reset = function () {
            return;
        };
        return MainGame;
    }(Phaser.Scene));
    exports.MainGame = MainGame;
});
define("scenes/menus/localization", ["require", "exports", "game/gameCommons", "utilities/component/mxActor", "game/managers/masteManager/masterManager", "game/components/spriteComponent", "game/ui/text/uiBitmapText"], function (require, exports, gameCommons_20, mxActor_7, masterManager_8, spriteComponent_3, uiBitmapText_4) {
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
            this._m_language_icon = mxActor_7.MxActor.Create(0);
            var language_sprite = new spriteComponent_3.SpriteComponent();
            language_sprite.setSprite(this.add.sprite(0, 0, 'landpage', 'language_button.png'));
            language_sprite.setTint(0x0c0138);
            this._m_language_icon.addComponent(language_sprite);
            this._m_language_icon.init();
            this._m_language_icon.setRelativePosition(half_width, 200);
            this._m_laguage_title = mxActor_7.MxActor.Create(0, this._m_language_icon);
            var master = masterManager_8.MasterManager.GetInstance();
            var gameManager = master.get_child(gameCommons_20.MANAGER_ID.kGameManager);
            this._m_dataController
                = gameManager.getComponent(gameCommons_20.COMPONENT_ID.kDataController);
            this._m_gameController
                = gameManager.getComponent(gameCommons_20.COMPONENT_ID.kGameController);
            var languageTitleText = uiBitmapText_4.UIBitmapText.AddStandard(this, this._m_dataController.getString('choose_language'), this._m_laguage_title);
            languageTitleText.setTint(0x0c0138);
            languageTitleText.setCenterAlign();
            languageTitleText.setOrigin(0.5, 0.5);
            this._m_laguage_title.init();
            this._m_laguage_title.setRelativePosition(0, 75);
            /****************************************************/
            /* English Button                                   */
            /****************************************************/
            this._m_english_button = mxActor_7.MxActor.Create(0);
            var enlgishButtonSprite = new spriteComponent_3.SpriteComponent();
            enlgishButtonSprite.setSprite(this.add.sprite(0, 0, 'landpage', 'english_map.png'));
            enlgishButtonSprite.setOrigin(0.5, 0.0);
            enlgishButtonSprite.setInteractive();
            enlgishButtonSprite.on('pointerdown', this._onClick_english, this);
            this._m_english_button.addComponent(enlgishButtonSprite);
            this._m_english_button.init();
            this._m_english_button.setRelativePosition(half_width, 475);
            var english_label = mxActor_7.MxActor.Create(1, this._m_english_button);
            var englishLabelText = uiBitmapText_4.UIBitmapText.AddStandard(this, this._m_dataController.getString('english'), english_label);
            englishLabelText.setOrigin(0.5, 0.5);
            englishLabelText.setFontSize(60);
            englishLabelText.setTint(0x0c0138);
            english_label.init();
            english_label.setRelativePosition(0, 480);
            /****************************************************/
            /* Latam Button                                     */
            /****************************************************/
            this._m_spanish_button = mxActor_7.MxActor.Create(0);
            var spanishButtonSprite = new spriteComponent_3.SpriteComponent();
            spanishButtonSprite.setSprite(this.add.sprite(0, 0, 'landpage', 'spanish_map.png'));
            spanishButtonSprite.setOrigin(0.5, 0.0);
            spanishButtonSprite.setInteractive();
            spanishButtonSprite.on('pointerdown', this._onClick_spanish, this);
            this._m_spanish_button.addComponent(spanishButtonSprite);
            this._m_spanish_button.init();
            this._m_spanish_button.setRelativePosition(half_width, 1200);
            var spanish_label = mxActor_7.MxActor.Create(1, this._m_spanish_button);
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
            this._m_gameController.setLocalization(gameCommons_20.LOCALIZATION.kEnglish);
            this._m_dataController.initLanguage(this.game);
            this.destroy();
            this.scene.start('welcomePage');
            return;
        };
        LocalizationScene.prototype._onClick_spanish = function () {
            this._m_gameController.setLocalization(gameCommons_20.LOCALIZATION.KSpanish);
            this._m_dataController.initLanguage(this.game);
            this.destroy();
            this.scene.start('welcomePage');
            return;
        };
        return LocalizationScene;
    }(Phaser.Scene));
    exports.LocalizationScene = LocalizationScene;
});
define("scenes/menus/welcomePage", ["require", "exports", "utilities/component/mxActor", "game/components/spriteComponent", "game/ui/buttons/imgButton", "game/gameCommons", "game/ui/text/uiBitmapText", "game/managers/masteManager/masterManager"], function (require, exports, mxActor_8, spriteComponent_4, imgButton_4, gameCommons_21, uiBitmapText_5, masterManager_9) {
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
            /* Language Button                                  */
            /****************************************************/
            this._m_language_button = imgButton_4.Button.CreateImageButton(this, 0, 60, 60, 'landpage', 'language_button.png', this._onClick_language, this);
            var _m_language_sprite = this._m_language_button.getComponent(gameCommons_21.COMPONENT_ID.kSprite);
            _m_language_sprite.setTint(0xface01);
            _m_language_sprite.setOrigin(0.0, 0.0);
            /****************************************************/
            /* Website                                          */
            /****************************************************/
            this._m_website_url = mxActor_8.MxActor.Create(0);
            var urlTextComponent = uiBitmapText_5.UIBitmapText.AddStandard(this, 'juegosmetta.com', this._m_website_url);
            urlTextComponent.setCenterAlign();
            urlTextComponent.setOrigin(0.5, 0.5);
            this._m_website_url.init();
            this._m_website_url.setRelativePosition(screenHalfWidth, 113);
            /****************************************************/
            /* Welcome Phrase                                   */
            /****************************************************/
            this._m_welcome_title = mxActor_8.MxActor.Create(0);
            var welcome_sprite = new spriteComponent_4.SpriteComponent();
            welcome_sprite.setSprite(this.add.sprite(0, 0, 'landpage', 'welcome_phrase_0.png'));
            this._m_welcome_title.addComponent(welcome_sprite);
            this._m_welcome_title.init();
            this._m_welcome_title.setRelativePosition(screenHalfWidth, screenHeight * 0.25);
            /****************************************************/
            /* Start Button                                     */
            /****************************************************/
            var master = masterManager_9.MasterManager.GetInstance();
            var gameManager = master.get_child(gameCommons_21.MANAGER_ID.kGameManager);
            var dataController = gameManager.getComponent(gameCommons_21.COMPONENT_ID.kDataController);
            this._m_start_button = imgButton_4.Button.CreateStandard(this, 0, screenHalfWidth, screenHeight * 0.4, 'landpage', 'button.png', dataController.getString('start_to_play'), this._onClick_start, this);
            /****************************************************/
            /* Cat                                              */
            /****************************************************/
            this._m_cat = mxActor_8.MxActor.Create(0);
            var cat_spriteComponent = new spriteComponent_4.SpriteComponent();
            cat_spriteComponent.setSprite(this.add.sprite(0, 0, 'landpage', 'cat.png'));
            this._m_cat.addComponent(cat_spriteComponent);
            this._m_cat.init();
            this._m_cat.setRelativePosition(screenHalfWidth, screenHeight - cat_spriteComponent.getHeight() * 0.5);
            return;
        };
        WelcomePage.prototype.update = function () {
            this._m_language_button.update();
            this._m_website_url.update();
            this._m_welcome_title.update();
            this._m_start_button.update();
            this._m_cat.update();
            return;
        };
        WelcomePage.prototype.destroy = function () {
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
define("game/ui/buttons/nineButton", ["require", "exports", "utilities/component/mxActor", "game/components/textComponent", "game/components/nineSliceComponent"], function (require, exports, mxActor_9, textComponent_2, nineSliceComponent_2) {
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
            var actor = mxActor_9.MxActor.Create(_id);
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
define("game/ui/clocks/analogClock", ["require", "exports", "game/ui/clocks/chronoClock"], function (require, exports, chronoClock_1) {
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
    }(chronoClock_1.ChronoClock));
    exports.AnalogClock = AnalogClock;
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
define("game/ui/clocks/sandClock", ["require", "exports", "game/ui/clocks/chronoClock"], function (require, exports, chronoClock_3) {
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
    }(chronoClock_3.ChronoClock));
    exports.SandClock = SandClock;
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
define("utilities/fs/data_map", ["require", "exports", "utilities/asserts"], function (require, exports, asserts_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxDataMap = /** @class */ (function () {
        function MxDataMap() {
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        MxDataMap.Create = function (_data, _separator_char, _break_line_char) {
            asserts_6.AssertString(_data);
            asserts_6.AssertString(_separator_char);
            asserts_6.AssertString(_break_line_char);
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
define("utilities/listeners/mxListener", ["require", "exports", "utilities/asserts"], function (require, exports, asserts_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxListener = /** @class */ (function () {
        function MxListener(_listener, _context) {
            asserts_7.AssertFunction(_listener);
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