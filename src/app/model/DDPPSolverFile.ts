import { WmComponent } from '../wm/wm.component';

export interface DDPPSFile {
  appVersion: string,
  modelType: string,
  statement: string,
  problemModel: object
}

export class DDPPS implements DDPPSFile {
  
  private static readonly MODEL_TYPES: string[] = [
    WmComponent.MODEL_TYPE
  ]
  public readonly appVersion: string;
  public readonly modelType: string;
  public readonly statement: string;
  public readonly problemModel: object;
  
  constructor(appVersion: string, modelType: string, statement: string, problemModel: object) {
    this.appVersion = appVersion;
    this.modelType = modelType;
    this.statement = statement;
    this.problemModel = problemModel;
  }
  
  public static validate(data: object): boolean {
    // Shallow check
    const member = 'appVersion' in data
                && 'modelType' in data
                && 'statement' in data
                && 'problemModel' in data;
                
    if(!member) {
      return false;
    }
    const ddpps = data as DDPPS;
    
    // Check model type (investment, workforce, etc)
    if(DDPPS.MODEL_TYPES.findIndex(v => v == ddpps.modelType) == -1) {
      return false;
    }
    return true;
  }
}