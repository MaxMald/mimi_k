export class Interpolation
{
    public static Linear
    (
        x1 : number,
        y1 : number,
        x2 : number,
        y2 : number,
        x : number
    ) : number 
    {
        return ((x-x1)*(y2-y1)/(x2-x1))+y1;
    }

    public static Bilinear
    (
        x1 : number,
        y1 : number,
        x2 : number,
        y2 : number,
        v1 : number,
        v2 : number,
        v3 : number,
        v4 : number,
        tx : number,
        ty : number
    ) : number
    {
    //P1:{x1,y1,v1} - P2:{x2,y1,v2} - P3:{x1,y2,v3} - P4:{x2,y2,v4}
    //Target:{tx,ty}
    
    let area_v1 : number =Math.abs((tx-x1)*(ty-y1))*v4;
    let area_v2 : number =Math.abs((tx-x2)*(ty-y1))*v3;
    let area_v3 : number =Math.abs((tx-x1)*(ty-y2))*v2;
    let area_v4 : number =Math.abs((tx-x2)*(ty-y2))*v1;
    let area_total : number =(x2-x1)*(y2-y1);

    return (area_v1+area_v2+area_v3+area_v4)/area_total; 
    }
}