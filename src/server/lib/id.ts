import { ulid } from "ulidx";

export function createId(entity: string): string {
  return entity + "_" + ulid().toLowerCase();
}
