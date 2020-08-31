import { SetMetadata } from "@nestjs/common";

export const blacklist = (...blacklist: boolean[]) => SetMetadata('blacklist', blacklist);