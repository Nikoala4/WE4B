import { FileType } from "../api-objs/FileType";

export interface FileRawResponse {
    id: string,
    name: string,
    filename: string,
    size: number,
    sent_date: number,
    filetype: FileType,
}
