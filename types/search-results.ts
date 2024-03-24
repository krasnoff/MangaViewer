export interface SearchResults {
    result: string
    response: string
    data: Daum[]
    limit: number
    offset: number
    total: number
  }
  
  export interface Daum {
    id: string
    type: string
    attributes: Attributes
    relationships: Relationship[]
  }
  
  export interface Attributes {
    title: Title
    altTitles: AltTitle[]
    description: Description
    isLocked: boolean
    links: Links
    originalLanguage: string
    lastVolume?: string
    lastChapter?: string
    publicationDemographic?: string
    status: string
    year: number
    contentRating: string
    tags: Tag[]
    state: string
    chapterNumbersResetOnNewVolume: boolean
    createdAt: string
    updatedAt: string
    version: number
    availableTranslatedLanguages: string[]
    latestUploadedChapter: string
  }
  
  export interface Title {
    en: string
  }
  
  export interface AltTitle {
    en?: string
    ko?: string
    ja?: string
    zh?: string
    "zh-hk"?: string
    de?: string
    "pt-br"?: string
    el?: string
    pl?: string
    "ja-ro"?: string
    fr?: string
    uk?: string
    ru?: string
    az?: string
    tr?: string
    "zh-ro"?: string
    id?: string
    th?: string
    "ko-ro"?: string
  }
  
  export interface Description {
    de?: string
    en?: string
    pl?: string
    az?: string
    fr?: string
    id?: string
    tr?: string
    uk?: string
    "pt-br"?: string
    ru?: string
    es?: string
  }
  
  export interface Links {
    al?: string
    ap?: string
    bw?: string
    kt?: string
    mu?: string
    nu?: string
    amz?: string
    cdj?: string
    ebj?: string
    mal?: string
    raw?: string
    engtl?: string
  }
  
  export interface Tag {
    id: string
    type: string
    attributes: Attributes2
    relationships: any[]
  }
  
  export interface Attributes2 {
    name: Name
    description: Description2
    group: string
    version: number
  }
  
  export interface Name {
    en: string
  }
  
  export interface Description2 {}
  
  export interface Relationship {
    id: string
    type: string
    attributes?: Attributes3
    related?: string
  }
  
  export interface Attributes3 {
    name?: string
    imageUrl: any
    biography?: Biography
    twitter?: string
    pixiv?: string
    melonBook: any
    fanBox?: string
    booth?: string
    nicoVideo: any
    skeb?: string
    fantia?: string
    tumblr: any
    youtube: any
    weibo: any
    naver?: string
    website?: string
    createdAt: string
    updatedAt: string
    version: number
    description?: string
    volume?: string
    fileName?: string
    locale?: string
  }
  
  export interface Biography {
    en?: string
  }
  