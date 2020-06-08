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
    kPopupController : 8 as 8
});

///////////////////////////////////
// Messages

export type MESSAGE_ID = EnumLiteralsOf<typeof MESSAGE_ID>;

export const MESSAGE_ID = Object.freeze
({
    kOnAgentActive : 1 as 1,
    kOnAgentDesactive : 2 as 2,
    kGameController : 3 as 3,
    kDataController : 4 as 4
});