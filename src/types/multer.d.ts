import { Request } from 'express'

//DEFAULT_RETURN_FOR_ALMOST_ALL_FUNCTIONS
export type TCallback = (error: Error | null, destination: string) => void

//ACCEPTED_FILES_CALLBACK
export type TFilterFIleCallback = (error: Error | null, accepted?: boolean) => void

//FILE_PROPERTIES
export type TFileData = { originalname: string }

//DISK_STORAGE_PROPERTIES
export type TDestination = (req: Request, file: TFileData, callback: TCallback) => void
export type TFileName = (req: Request, file: TFileData, callback: TCallback) => void
