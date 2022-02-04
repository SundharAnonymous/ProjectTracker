// Define server response interface
// Instantiate data as the passed in type for strong type checking
export interface IServerResponse<T> {
    meta: IMeta;
    data: T;
    messages: IMessage[]
  }
  
  // Define meta data interface
  export interface IMeta {
    requestTimeStamp: Date;
    responseTimeStamp: Date;
    elapsedMilliseconds: number;
    numberOfRecords: number;
  }
  
  // Define error interface
  export interface IMessage {
    messageType: string;
    messageDescription: string;
    messageCode: string;
    messageDetails: string;
  }
  