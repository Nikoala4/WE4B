import { BadgeDescriptor } from "./BadgeDescriptor";

export interface AccountProfile
{
    first_name: string,
    last_name: string,
    active_decoration: string | null,
    active_badges: BadgeDescriptor[],
    classes: string[],
    profile_image: string | null,
    description: string
}
