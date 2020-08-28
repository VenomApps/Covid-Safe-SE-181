const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./src/db/db.json')
const db = low(adapter)

export interface EncounterReplClone {
    name: string;
    email: string;
    location: string;
    time: string;
    date: string;
    uid: string;
    secure: boolean;
}

export class DatabaseService {
    public static async get(jsonPath: string): Promise<any> {
        return await db.get(jsonPath)
    }

    public static async deleteEncounter(uid: string): Promise<any> {
        return await db.get('encounters').remove({ uid: uid! }).write()
    }

    public static async addEncounter(body: EncounterReplClone): Promise<any> {
        return await db.get('encounters').push(body).write()
    }
    
    
}


