export type TrackerData = {
    datetime: string
    tracker_id: string[]
    location: Record<string, Location[]>
}

export type Location = {
    lat: string
    lng: string
    datetime: string
}
