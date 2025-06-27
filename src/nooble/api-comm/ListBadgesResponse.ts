import { BadgeDescriptor } from "../api-objs/BadgeDescriptor";

export interface ApiListBadgesResponse
{
    reached: {
        description: string,
        name: string,
        level: number,
        price: number,
        title: string
    }[],
    unreached: {
        description: string,
        name: string,
        level: number,
        price: number,
        title: string
    }[]
}