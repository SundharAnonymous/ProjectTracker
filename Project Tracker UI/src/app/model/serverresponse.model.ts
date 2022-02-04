
export interface IServerResponse<T> {
Meta: IMeta;
Data: T;
Message: IMessage[]
}// Define meta data interface
export interface IMeta {
REQUESTTIMESTAMP: Date;
RESPONSETIMESTAMP: Date;
TOTALRESULTS: number;
}// Define error interface
export interface IMessage {
Type: string;
Message: string;
}

