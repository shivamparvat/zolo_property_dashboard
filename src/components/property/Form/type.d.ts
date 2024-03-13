interface page {
    type: string,
    data: any,
    setData: React.Dispatch<React.SetStateAction<any>>
    errors: any
}
interface VideoUpload {
    video: File | null,
    setVideo: React.Dispatch<React.SetStateAction<File | null>>,
    url?:string
}
interface ErrorForm {

    errors: any, errorKey: string, className?: string, text?: string
}