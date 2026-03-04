const id3 = require("node-id3")
const { uplodeFIle } = require("../services/imgekit.service")
const songModel = require("../model/song.model")
async function songUpload(req, res) {
    try {
        const songBuffer = req.file.buffer
        const fileDetails = id3.read(songBuffer)
        const mood = 'happy'


        // const song = await uplodeFIle({ buffer: songBuffer, filename: songDetails.title, folder: '/testing/imgkit' })
        const songFilePromise = uplodeFIle({ buffer: songBuffer, filename: fileDetails.title, folder: '/testing/imgkit' })
        const imgeFilePromise = uplodeFIle({ buffer: fileDetails.image.imageBuffer, filename: fileDetails.title, folder: "/testing/imgekit" })
        const [songFile, imgeFile] = await Promise.all([
            songFilePromise, imgeFilePromise
        ])
        const song = await songModel.create({
            url: songFile.url, imgUrl: imgeFile.url, mood
        })
        return res.status(200).json({
            message: 'sucess', song
        })
    } catch (err) {
        console.log(err.message);
        console.log(err);
        return res.status(400).json({
            message: err
        })

    }
}

module.exports = { songUpload }