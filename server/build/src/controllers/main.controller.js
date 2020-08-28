"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.MainController = void 0;
const tsoa_1 = require("tsoa");
const mainService_1 = require("../services/mainService");
let MainController = class MainController extends tsoa_1.Controller {
    fetchEncounters() {
        return __awaiter(this, void 0, void 0, function* () {
            const encounters = yield new mainService_1.MainService().getEncounters();
            return encounters;
        });
    }
    deleteEncounter(body) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new mainService_1.MainService().deleteEncounter(body.uid);
        });
    }
    addEncounter(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let addedEncounter = yield new mainService_1.MainService().addEncounter(body);
            if (addedEncounter) {
                return true;
            }
        });
    }
    sendMessage(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
};
__decorate([
    tsoa_1.SuccessResponse("200"),
    tsoa_1.Response("400"),
    tsoa_1.Get("encounters"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MainController.prototype, "fetchEncounters", null);
__decorate([
    tsoa_1.SuccessResponse("200"),
    tsoa_1.Post("delete-encounters"),
    __param(0, tsoa_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "deleteEncounter", null);
__decorate([
    tsoa_1.SuccessResponse("200"),
    tsoa_1.Post("add-encounters"),
    __param(0, tsoa_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "addEncounter", null);
__decorate([
    tsoa_1.SuccessResponse("200"),
    tsoa_1.Post("send-message"),
    __param(0, tsoa_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "sendMessage", null);
MainController = __decorate([
    tsoa_1.Route("api")
], MainController);
exports.MainController = MainController;
//# sourceMappingURL=main.controller.js.map