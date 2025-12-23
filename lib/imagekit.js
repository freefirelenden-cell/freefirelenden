import ImageKit from "imagekit";

export const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});


export const uploadToImageKit = async (file, fileName) => {
    try {
        const base64File = Buffer.isBuffer(file) ? file.toString("base64") : file;

        const uploadResponse = await imagekit.upload({
            file: base64File,
            fileName
        });
        return uploadResponse;
    } catch (error) {
        console.error("❌ ImageKit upload error", error)
        throw new Error(error)
    }
}