import { Body, Controller, Get, Query, Route, SuccessResponse, Response, Post } from "tsoa";
import { MainService } from "../services/mainService";

export interface EncounterRepl {
    name: string;
    email: string;
    location: string;
    time: string;
    date: string;
    uid: string;
    secure: boolean;

}

@Route("api")
export class MainController extends Controller {
  @SuccessResponse("200")
  @Response<void>("400")
  @Get("encounters")
  public async fetchEncounters(): Promise<Array<EncounterRepl>> {
    const encounters = await new MainService().getEncounters()
    return encounters
  }

  @SuccessResponse("200")
  @Post("delete-encounters")
  public async deleteEncounter(@Body() body): Promise<any> {
    await new MainService().deleteEncounter(body.uid)
  }

  @SuccessResponse("200")
  @Post("add-encounters")
  public async addEncounter(@Body() body): Promise<any> {
    let addedEncounter = await new MainService().addEncounter(body)
    if(addedEncounter) {
      return true
    }
  }

  @SuccessResponse("200")
  @Post("send-message")
  public async sendMessage(@Body() body): Promise<any> {
    return true
  }
}

