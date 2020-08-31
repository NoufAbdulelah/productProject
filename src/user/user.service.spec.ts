

import { Connection } from "typeorm"

import { TestUtils } from "../test/test.utils"
import { Test } from "@nestjs/testing"

import * as Fs from "fs"
import * as Path from "path"
import { TypeOrmModule } from "@nestjs/typeorm"
import { DatabaseService } from "../database/database.service"
import { DatabaseModule } from "../database/database.module"
import { UserService } from "./user.service"

describe("UserService", () => {
  let userService: UserService
  let testUtils: TestUtils
  beforeEach(async done => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [DatabaseService, TestUtils]
    }).compile()
    testUtils = module.get<TestUtils>(TestUtils)
    await testUtils.reloadFixtures()
    userService = testUtils.databaseService.connection.getCustomRepository(UserService)

    done()
  })

  afterEach(async done => {
    await testUtils.closeDbConnection()
    done()
  })

  describe("findAll", () => {
    it("should return all users", async done => {
      const user = await userService.findAll()
      expect(user[0].name).toBe("Nouf")
      done()
    })
  })
})