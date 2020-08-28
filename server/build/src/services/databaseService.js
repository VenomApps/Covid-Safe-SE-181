"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./src/db/db.json');
const db = low(adapter);
class DatabaseService {
    static get(jsonPath) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db.get(jsonPath);
        });
    }
    static deleteEncounter(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db.get('encounters').remove({ uid: uid }).write();
        });
    }
    static addEncounter(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db.get('encounters').push(body).write();
        });
    }
}
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=databaseService.js.map