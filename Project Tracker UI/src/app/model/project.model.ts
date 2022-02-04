export interface IProject {

    pkguid:	string;
    projectID:	string;
    projectName:	string;
    status:	number;
    isTRDReceived:	boolean;
    isCRDSent:	boolean;
    poReceivedFromAirbus:	boolean;
    poReceivedFromAKKA:	boolean;
    projectValue:	number;
    ltiValue:	number;
    currencyID:number;

}
export class Project implements IProject{
    constructor(
    public pkguid = '',
    public projectID = '',
   public projectName=	'',
   public status=0,
   public isTRDReceived=false,
   public isCRDSent=false,
   public poReceivedFromAirbus=false,
   public poReceivedFromAKKA=false,
   public projectValue=0,
   public ltiValue=0,
   public currencyID=0

    ){}
}