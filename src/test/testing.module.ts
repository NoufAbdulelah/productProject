import * as fs from "fs"
import * as Path from "path"

import { DatabaseService } from "../database/database.service"
import { Injectable } from "@nestjs/common"

@Injectable()
export class TestUtils {
  databaseService: DatabaseService


  constructor(databaseService: DatabaseService) {
    if (process.env.NODE_ENV !== "test") {
      throw new Error("ERROR-TEST-UTILS-ONLY-FOR-TESTS")
    }
    this.databaseService = databaseService
  }
  async shutdownServer(server) {
    await server.httpServer.close()
    await this.closeDbConnection()
  }


  async closeDbConnection() {
    const connection = await this.databaseService.connection
    if (connection.isConnected) {
      await (await this.databaseService.connection).close()
    }
  }


  
}