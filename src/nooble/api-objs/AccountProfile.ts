import { BadgeDescriptor } from "./BadgeDescriptor";

export interface AccountProfile
{
    first_name: String,
    last_name: String,
    active_decoration: String | null,
    active_badges: BadgeDescriptor[],
    classes: String[],
    profile_image: String | null,
    description: String
}
