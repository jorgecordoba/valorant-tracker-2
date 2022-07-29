const icon_32 = "t_32_icon/"
const none = ""

function cloudinary(transformation) {
    return `https://res.cloudinary.com/chaoscs/image/upload/${transformation}valorant`
}

module.exports = {
    cloudinary: cloudinary,
    transformations: {
        icon_32: icon_32,
        none: none
    }
}