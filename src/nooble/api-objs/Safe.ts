import { BadgeDescriptor } from "./BadgeDescriptor";

export interface Safe {
    quota: number,
    badges: BadgeDescriptor[],
    decorations: string[]
}
