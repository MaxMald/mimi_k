import { MxComponentMng } from "./mxComponentMng";

export class MxComponent
{
    protected m_manager : MxComponentMng;
    protected readonly m_id : number;

    public static setManager
    (
        _component : MxComponent, 
        _mng : MxComponentMng
    )
    : void {
        _component.m_manager = _mng;
        return;
    }

    public constructor(_id : number) {
        this.m_id = _id;
        return;
    }

    public getID()
    : number {
        return this.m_id;
    }

    public init()
    : void {
        return;
    }

    public update(_dt:number)
    : void {
        return;
    }

    public destroy()
    : void {
        this.m_manager = null;
        return;
    }
}