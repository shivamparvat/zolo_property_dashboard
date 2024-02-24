interface page {
    type: string,
    data: any,
    setData: React.Dispatch<React.SetStateAction<any>>
}
interface VideoUpload {
    video: File | null,
    setVideo: React.Dispatch<React.SetStateAction<File | null>>
}