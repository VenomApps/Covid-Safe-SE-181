import { DatabaseService } from "./databaseService";
import { EncounterRepl } from "src/controllers/main.controller";

export interface EncounterReplTwo {
    name: string;
    email: string;
    location: string;
    time: string;
    date: string;
    uid: string;
    secure: boolean;

}

export class MainService {
  public async getEncounters(): Promise<Array<EncounterReplTwo>> {
    let encounters = await DatabaseService.get('encounters')
    return encounters;
  }

  public async deleteEncounter(uid): Promise<void> {
    await DatabaseService.deleteEncounter(uid)
  }

  public async addEncounter(encounter: EncounterRepl): Promise<any> {
    let res = await DatabaseService.addEncounter(encounter)
    if(res) {
      return true
    } else {
      return false
    }
  }

}

