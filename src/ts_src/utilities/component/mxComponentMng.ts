import { MxComponent } from "./mxComponent";

export class MxComponentMng
{
    private m_component_map : Map<number,MxComponent>;

    public constructor()
    {
        this.m_component_map = new Map<number,MxComponent>();
        return;
    }

    public init()
    : void {
        this.m_component_map.forEach
        (
            function(_component : MxComponent) {
                _component.init();
                return;
            }
        );
        return;
    }

    public update(_dt?:number)
    : void {
        this.m_component_map.forEach
        (
            function(_component : MxComponent)
            {
                _component.update(_dt);
                return;
            },
            this
        );
        return;
    }

    public addComponent(_component : MxComponent)
    : void {
        MxComponent.setManager(_component, this);
        this.m_component_map.set(_component.getID(), _component);
        return;
    }

    public removeComponent(_id : number)
    : void {
        this.m_component_map.delete(_id);
        return;
    }

    public hasComponent(_id : number)
    : boolean {
        return this.m_component_map.has(_id);
    }

    public getComponent<T extends MxComponent>(_id : number)
    : T {
        if(this.m_component_map.has(_id))
        {
            return (this.m_component_map.get(_id) as unknown) as T;
        }
        else
        {
            return null;
        }
    }

    public destroy(){
        this.m_component_map.forEach
        (
            function(_component : MxComponent){
                _component.destroy();
            }
        );
        this.m_component_map.clear();
        this.m_component_map = null;
        return;
    }
}