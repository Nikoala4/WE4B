import { BadgeDescriptor } from "./BadgeDescriptor";
import { Role } from "./Role";

export interface Profile 
{
    first_name: string,
    last_name: string,
    profile_image: string,
    active_decoration: string,
    active_badges: BadgeDescriptor[],
    description: string,
    role: Role,
    classes?: string
}