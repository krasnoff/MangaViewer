export interface ChapterObj {
    result: string
    baseUrl: string
    chapter: Chapter
}
  
  export interface Chapter {
    hash: string
    data: string[]
    dataSaver: string[]
}