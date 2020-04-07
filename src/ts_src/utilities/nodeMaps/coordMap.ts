import { MxNodeMap } from "./nodeMap";
import { MxCoord } from "../nodes/mxCoord";
import { Rotation } from "../enum_commons";

export class MxCoordMap<T> extends MxNodeMap
{
    public m_a_objects : Array<MxCoord<T>>;

    public constructor
    (
        _width : number, 
        _heigth : number,
        _rotation : Rotation
    )
    {
        super(_width, _heigth);

        ///////////////////////////////////
        // Init

        this.m_a_objects = new Array<MxCoord<T>>();

        ////////////////////////////////////
        // Create an empty Grid
        
        let coord : MxCoord<T>;        
        let adyacent_coord : MxCoord<T>;
        for(let row = 0; row < _heigth; ++row)
        {            
            for(let col = 0; col < _width; ++col)
            {      
                coord = new MxCoord<T>();
                coord.setPosition(new Phaser.Math.Vector2(col, row));

                // Up Attachment         
                if(row > 0)
                {
                    adyacent_coord 
                    = this.m_a_objects[(_width * (row - 1)) + col];
                    coord.attachUp(adyacent_coord);
                }

                // Left Attachment
                if(col > 0)
                {
                    adyacent_coord 
                    = this.m_a_objects[this.m_a_objects.length - 1];
                    coord.attachLeft(adyacent_coord);
                }

                this.m_a_objects.push(coord);
            }
        }

        if(_rotation == Rotation.kCW)
        {
            this._continuityCW();
        }
        else
        {
            this._continuityCCW();
        }
        
        return;
    }

    public getCoord(_x : number, _y : number)
    : MxCoord<T>
    {
        let index = (this.m_width * _y) + _x;
        if(index >= this.m_a_objects.length)
        {
            console.warn("MxCoordMap: Index out of Range");
            return new MxCoord<T>();
        }

        return this.m_a_objects[index];
    }

    public getObject(_x : number, _y : number)
    : T
    {
        let coord = this.getCoord(_x, _y);
        return coord.getObject();
    }

    protected _continuityCW()
    : void
    {
        let coord : MxCoord<T>;
        let ady_coord : MxCoord<T>;

        ///////////////////////////////////
        // Up Attachment
        
        for(let index = 0; index < this.m_width; ++index)
        {
            coord = this.getCoord(index, 0);
            if(index == this.m_width - 1)
            {
                ady_coord = this.getCoord(0, this.m_height -1);
            }
            else
            {
                ady_coord = this.getCoord(index + 1, this.m_height - 1);
            }
            coord.attachUp(ady_coord);
        }

        ///////////////////////////////////
        // Left Attachment

        for(let index = 0; index < this.m_height; ++index)
        {
            coord = this.getCoord(0, index);
            if(index == 0)
            {
                ady_coord = this.getCoord(this.m_width - 1, this.m_height -1);
            }
            else
            {
                ady_coord = this.getCoord(this.m_width - 1, index - 1);
            }
            coord.attachLeft(ady_coord);
        }
        return;
    }

    protected _continuityCCW()
    : void
    {
        let coord : MxCoord<T>;
        let ady_coord : MxCoord<T>;

        ///////////////////////////////////
        // Up Attachment
        
        for(let index = 0; index < this.m_width; ++index)
        {
            coord = this.getCoord(index, 0);
            if(index == 0)
            {
                ady_coord = this.getCoord(this.m_width-1, this.m_height -1);
            }
            else
            {
                ady_coord = this.getCoord(index - 1, this.m_height - 1);
            }
            coord.attachUp(ady_coord);
        }

        ///////////////////////////////////
        // Left Attachment

        for(let index = 0; index < this.m_height; ++index)
        {
            coord = this.getCoord(0, index);
            if(index == this.m_height - 1)
            {
                ady_coord = this.getCoord(0, this.m_width - 1);
            }
            else
            {
                ady_coord = this.getCoord(this.m_width - 1, index + 1);
            }
            coord.attachLeft(ady_coord);
        }
        return;
    }
}