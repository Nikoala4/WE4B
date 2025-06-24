import { AccountProfile } from "./AccountProfile";
import { AccountSafe } from "./AccountSafe";
import { Role } from "./Role";

export interface Account {
    id: string,
    profile: AccountProfile,
    safe: AccountSafe,
    role: Role,
    mail: string
}
