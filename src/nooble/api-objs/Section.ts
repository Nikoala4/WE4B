export interface SectionData<DataType>
{
    type: string,
    data: DataType
}

export interface ContainerDataType
{
    is_horizontal: boolean,
    is_wrapping: boolean,
    children: SectionData<any>[]
}

export type ContainerSectionData = SectionData<ContainerDataType>
