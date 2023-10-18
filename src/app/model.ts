export interface ChartDataSource {
    key: string
    value: number
}

export interface IVideoDetails {
    videoId : string;
    title? : string;
    description? : string;
    tags? : string;
    categoryId? : string;
    publishedAt? : Date;
    viewCount? : number;
    likeCount? : number;
    commentCount? : number;
    favoriteCount? : number;
    channelId? : string;
    channelTitle? : string;
    liveBroadcastContent? : string;
    defaultAudioLanguage? : string;
    duration? : string;
    licensedContent? : boolean;
    video_data_status? : number;
    summary_status? : number;
}

export interface ITypeCount {
    type: string;
    count: number;
}

export interface IGetCommentsRequest {
    videoId?: string;
    pageNumber: number;
    recordsPerPage: number;
    columnFilters: IColumnFilter[];
}

export interface IColumnFilter {
    field: string;
    values: string[];
}