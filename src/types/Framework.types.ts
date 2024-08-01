// * Framework 데이터 (카드1개)!
export interface FrameworkCardType {
    name: string
    description : string // 설정\
    rappSchema : {
        ServiceType : string
        rAppId : string
        vendor: string
        version: string
    }
    state : string //on/off
}

