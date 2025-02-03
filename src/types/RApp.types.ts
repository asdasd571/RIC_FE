// * RAPP 데이터 (카드1개)!
export interface rAppCardType {
  name: string;
  rappSchema: {
    rAppId: string;
    ServiceType: string;
    vendor?: string;
    version?: string;
  };
  description: string;
  open: string;
  state?: string;
}
