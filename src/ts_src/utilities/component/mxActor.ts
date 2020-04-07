import { MxComponentMng } from "./mxComponentMng";
import { MxComponent } from "./mxComponent";

export class MxActor
{
    protected readonly m_component_mg : MxComponentMng;

    public constructor() {
        this.m_component_mg = new MxComponentMng();
        return;
    }

    public update(_dt: number)
    : void {
        this.m_component_mg.update(_dt);
        return;
    }

    public getComponentMng()
    : MxComponentMng {
        return this.m_component_mg;
    }

    public getComponent<T extends MxComponent>(_id : number)
    : T {
        return this.m_component_mg.getComponent<T>(_id);
    }

    public destroy()
    : void {
        this.m_component_mg.destroy();
        return;
    }
}