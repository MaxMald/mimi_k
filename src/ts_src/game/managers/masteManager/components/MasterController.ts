import { MxComponent } from "../../../../utilities/component/mxComponent";
import { COMPONENT_ID, MimiKSounds } from "../../../gameCommons";
import { MxActor } from "../../../../utilities/component/mxActor";

export class MasterController extends MxComponent
{
    /****************************************************/
    /* Public                                           */
    /****************************************************/
    
    constructor()
    {
        super(COMPONENT_ID.kMasterController);
        return;
    }

    init(_actor : MxActor)
    : void 
    {
        this._m_introPlayed = false;
        this.m_dt = 0.0;
        return;
    }

    playIntro(_scene : Phaser.Scene)
    : void
    {
        if(this._m_introPlayed) {
            return;
        }

        this._m_introPlayed = !this._m_introPlayed;
        this._m_soundBaseManager = _scene.sound;
        this._m_snd_intro = _scene.sound.addAudioSprite(MimiKSounds.kMimiKAudioSprite);
        this._m_snd_intro.play(MimiKSounds.kBackgroundVoice);
        this._m_snd_intro.once
        (
            'complete', 
            function(sound) {
                this._m_soundBaseManager.playAudioSprite
                (
                    MimiKSounds.kMimiKAudioSprite, 
                    MimiKSounds.kBackgroundInstrumental, 
                    {loop: true}
                );
            },
            this
        );
    }

    stopIntro()
    : void
    {
        this._m_introPlayed = false;
        this._m_snd_intro = null;
        this._m_soundBaseManager.removeByKey(MimiKSounds.kMimiKAudioSprite);        
        return;
    }

    update(_actor : MxActor)
    : void
    {
        return;
    }

    m_dt : number;    

    /****************************************************/
    /* Private                                          */
    /****************************************************/
    
    _m_introPlayed : boolean;

    _m_snd_intro : Phaser.Sound.BaseSound;

    _m_soundBaseManager : Phaser.Sound.BaseSoundManager;
}