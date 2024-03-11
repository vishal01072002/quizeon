const cloudinary = require("cloudinary").v2;

exports.cloudinaryFileUpload = async(file,folder,height,quality) => {
    try {
        const options = {folder};
        if(height) options.height = height;
        if(quality) options.height = height;
        options.resource_type = "auto";

        return await cloudinary.uploader.upload(file.tempFilePath, options);
    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: "something went wrong while Uploading Thumbnail",
            error,
        });
    }
}