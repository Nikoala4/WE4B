import { FileType } from "../api-objs/FileType";

export interface File {
    id: string,
    name: string,
    filename: string,
    size: number,
    sent_date: Date,
    filetype: FileType,
}
