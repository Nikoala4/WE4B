export interface ApiActivityRawResponse {
    activity_id: string,
    read: boolean,
    activity_data: {
        title: string,
        content: string,
        creator: string,
        date: number,
        icon: string
    }
}
