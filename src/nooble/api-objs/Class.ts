import { ContainerSectionData } from "./Section";

export interface Class
{
    id: string,
    content: ContainerSectionData,
    description: string,
    last_modification: Date,
    last_modifier: string,
    name: string
}