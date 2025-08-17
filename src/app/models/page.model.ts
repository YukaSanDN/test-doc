import { PictureAnalysisValue } from "./analysis-picture.model"

export interface Page{
    id: string,
    readonly number: number,
    readonly imageUrl: string,
    annotations?: Annotation[]
}

export interface Annotation{
    readonly index: number
    initialCoordinates: PictureAnalysisValue,
    comment: string | null,
    commentColor: string,
    commentBackground: string,
    isFilled: boolean
}
