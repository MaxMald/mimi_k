type EnumLiteralsOf<T extends object> = T[keyof T];

///////////////////////////////////
// Manager ID

export type MANAGER_ID = EnumLiteralsOf<typeof MANAGER_ID>;

export const MANAGER_ID = Object.freeze
({
    kMaster : 1 as 1,
    kGameManager : 2 as 2,
    kDataManager : 3 as 3,
    kChronoManager : 4 as 4
});

///////////////////////////////////
// Localization

export type LOCALIZATION = EnumLiteralsOf<typeof LOCALIZATION>;

export const LOCALIZATION = Object.freeze
({
    KSpanish : 1 as 1,
    kEnglish : 2 as 2
});

///////////////////////////////////
// Clock Style

export type CLOCK_STYLE = EnumLiteralsOf<typeof CLOCK_STYLE>;

export const CLOCK_STYLE = Object.freeze
({
    kSand : 0 as 0,
    kDigital : 1 as 1,
    kAnalog : 2 as 2,
    kCount : 3 as 3
});

///////////////////////////////////
// Components

export type COMPONENT_ID = EnumLiteralsOf<typeof COMPONENT_ID>;

export const COMPONENT_ID = Object.freeze
({
    kChronoController : 1 as 1,
    kMasterController : 2 as 2,
    kGameController : 3 as 3,
    kDataController : 4 as 4,
    kSprite : 5 as 5,
    kNineSlice : 6 as 6,
    kText : 7 as 7,
    kPopupController : 8 as 8,
    kNineSliceButton : 9 as 9,
    kCarouselController : 10 as 10,
    kBitmapText : 11 as 11,
    kClockController : 12 as 12,
    kDigitalClockController : 13 as 13,
    kGraphicsComponent : 14 as 14,
    kAnalogClockController : 15 as 15,
    kSandClockController : 16 as 16,
    kShaderComponent : 17 as 17,
    kBackgroundShaderComponent : 18 as 18
});

///////////////////////////////////
// Messages

export type MESSAGE_ID = EnumLiteralsOf<typeof MESSAGE_ID>;

export const MESSAGE_ID = Object.freeze
({
    kOnAgentActive : 1 as 1,
    kOnAgentDesactive : 2 as 2,
    kClockPaused : 3 as 3,
    kClockResumed : 4 as 4,
    kClockReset : 5 as 5,
    kPlaySound : 6 as 6,
    kTimeOut : 7 as 7
});

///////////////////////////////////
// Clock Carousel Children

export type CAROUSEL_CHILD_ID = EnumLiteralsOf<typeof CAROUSEL_CHILD_ID>;

export const CAROUSEL_CHILD_ID = Object.freeze
({
    kTitle : 1 as 1,
    kPreview : 2 as 2,
    kLeftButton : 3 as 3,
    kRightButton : 4 as 4,
    kClockName : 5 as 5,
    kPreviewBackground : 6 as 6
});

///////////////////////////////////
// Sand Clock Children

export type SAND_CLOCK_PART_ID = EnumLiteralsOf<typeof SAND_CLOCK_PART_ID>;

export const SAND_CLOCK_PART_ID = Object.freeze
({
    kUpperMask : 0 as 0,
    kUpperTexture : 1 as 1,
    kLowerMask : 2 as 2,
    kLowerTexture : 3 as 3,
    kClockTexture : 4 as 4
});