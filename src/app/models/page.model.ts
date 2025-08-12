import { PictureAnalysisValue } from "./analysis-picture.model"

export interface Page{
    readonly number: number,
    readonly imageUrl: string,
    annotations?: Annotation[]
}

export interface Annotation{
    readonly index: number
    initialCoordinates: PictureAnalysisValue,
    comment: string | null,
    image: string | null,
    isFilled: boolean
}
