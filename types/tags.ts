export interface TagsList {
    result: string
    response: string
    data: Daum2[]
    limit: number
    offset: number
    total: number
  }
  
  export interface Daum2 {
    id: string
    type: string
    attributes: Attributes
    relationships: any[]
  }
  
  export interface Attributes {
    name: Name
    description: Description
    group: string
    version: number
  }
  
  export interface Name {
    en: string
  }
  
  export interface Description {}