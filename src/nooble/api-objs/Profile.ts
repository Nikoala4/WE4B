import { BadgeDescriptor } from "./BadgeDescriptor";

export interface Profile 
{
    first_name: string,
    last_name: string,
    profile_image: string,
    active_decoration: string,
    active_badges: BadgeDescriptor[],
    description: string,
    classes: string
}