import { MxComponent } from "./mxComponent";
import { MxActor } from "./mxActor";
import { MxComponentMng } from "./mxComponentMng";

export class MxActorAssembler
{
    /****************************************************/
    /* Protected                                        */
    /****************************************************/
    
    protected _m_common_components : Map<number, MxComponent>;

    /****************************************************/
    /* Public                                           */
    /****************************************************/
    
    public constructor() 
    {
        this._m_common_components = new Map<number, MxComponent>();
        return;
    }

    public assemble(_actor : MxActor)
    : void {
        let component_mng : MxComponentMng
            = _actor.getComponentMng();

        this._m_common_components.forEach
        (
            function(_component : MxComponent)
            {
                component_mng.addComponent(_component);
                return;
            },
            this
        );
        return;
    }

    public update() {
        return;
    }

    /**
    * Safely destroys the object.
    */
   public destroy()
   : void {
       this._m_common_components.forEach
       (
           function(_component : MxComponent)
           {
               _component.destroy();
               return;
           },
           this
       );
       this._m_common_components.clear();
       this._m_common_components = null;
       return;
   }
}