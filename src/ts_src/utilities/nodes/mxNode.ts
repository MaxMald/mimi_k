export class MxNode
{
    protected m_position : Phaser.Math.Vector2;

    public constructor()
    {
        this.m_position = new Phaser.Math.Vector2(0,0);
        return;
    }

    public setPosition(_position : Phaser.Math.Vector2)
    : void
    {
        this.m_position = _position;
        return;
    }

    public getPosition()
    : Phaser.Math.Vector2
    {
        return this.m_position;
    }
}