import { ContainerSectionData } from "../api-objs/Section";

export interface ApiSearchClassRawResponse
{
    id: string,
    content: ContainerSectionData,
    description: string,
    last_modification: number,
    last_modifier: string,
    name: string
}