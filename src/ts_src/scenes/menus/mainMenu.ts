import { BaseScene } from "../BaseScene";

export class MainMenu extends BaseScene
{
    public create ()
    : void
    {
        super.create();

        this.createButton
        (
            this.game.canvas.width * 0.25,
            this.game.canvas.height * 0.5,
            "Tiled Test",
            function(){
                this.m_master.startScene
                (
                    this.game,
                    'test_level_tiled',
                    this
                );
                return;
            },
            this
        )

        this.createButton
        (
            this.game.canvas.width * 0.25,
            this.game.canvas.height * 0.6,
            "Volcano Test",
            function(){
                this.m_master.startScene
                (
                    this.game,
                    'test_level_volcano',
                    this
                );
                return;
            },
            this
        )

        this.createButton
        (
            this.game.canvas.width * 0.75,
            this.game.canvas.height * 0.5,
            "Towers Test",
            function(){
                this.m_master.startScene
                (
                    this.game,
                    'test_level_towers',
                    this
                );
                return;
            },
            this
        );
        return;
    }

    public createButton
    (
        _x : number,
        _y : number,
        _label : string, 
        _fn : ()=>void, 
        _context : any
    )
    : void {        

        let button = this.add.nineslice
        (
           _x,
           _y,            
            145,
            145,
            {key : 'main_menu', frame: 'button_bg.png'},
            [70, 70, 70, 70]
        );
        button.resize(500, 145);
        button.setOrigin(0.5, 0.5);

        button.setInteractive();
        button.on('pointerdown', _fn, _context);
        
        let label : Phaser.GameObjects.Text = this.add.text
        (
            _x,
            _y, 
            _label, 
            { fontFamily: '"Roboto Condensed"' }
        );
        
        label.setFontSize(50);
        label.setColor('black');
        label.setOrigin(0.5,0.5);
        return;
    }
}