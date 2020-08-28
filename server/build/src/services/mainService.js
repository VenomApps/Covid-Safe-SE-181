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
exports.MainService = void 0;
const databaseService_1 = require("./databaseService");
class MainService {
    getEncounters() {
        return __awaiter(this, void 0, void 0, function* () {
            let encounters = yield databaseService_1.DatabaseService.get('encounters');
            return encounters;
        });
    }
    deleteEncounter(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            yield databaseService_1.DatabaseService.deleteEncounter(uid);
        });
    }
    addEncounter(encounter) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield databaseService_1.DatabaseService.addEncounter(encounter);
            if (res) {
                return true;
            }
            else {
                return false;
            }
        });
    }
}
exports.MainService = MainService;
//# sourceMappingURL=mainService.js.map