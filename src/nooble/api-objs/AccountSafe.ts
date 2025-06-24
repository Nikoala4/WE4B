import { Role } from "./Role";
import { BadgeDescriptor } from "./BadgeDescriptor";

export interface AccountSafe {
    quota: Number,
    decorations: string[],
    badges: BadgeDescriptor[],
    role: Role
}

