import { BadgeDescriptor } from "../api-objs/BadgeDescriptor";

export interface ApiListBadgesResponse
{
    reached: BadgeDescriptor[],
    unreached: BadgeDescriptor[]
}