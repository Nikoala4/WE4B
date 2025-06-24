export interface Activity {
    activity_id: string,
    read: boolean,
    activity_data: {
        title: string,
        content: string,
        creator: string,
        date: Date,
        icon: string
    }
}
