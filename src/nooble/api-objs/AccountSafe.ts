import { Role } from "./Role";
import { BadgeDescriptor } from "./BadgeDescriptor";

export interface AccountSafe {
    quota: Number,
    decorations: String[],
    badges: BadgeDescriptor[],
    role: Role
}

