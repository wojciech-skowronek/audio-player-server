const fs = require("fs").promises;
const path = require("path")

const model = {
    tracksFilePath: path.resolve(__dirname, "../../", "data/songs-list.json"),
    cachedTracks: null,
    lastModified: 0,

    getList: async () => {
        const stats = await fs.stat(model.tracksFilePath)

        // load the file only when it has been updated
        if (model.lastModified < stats.mtimeMs) {
            model.cachedTracks = JSON.parse(await fs.readFile(model.tracksFilePath, 'UTF-8'))
            model.lastModified = stats.mtimeMs
        }

        return model.cachedTracks;
    }
}

const tracks = {

    list: async (req, res, next) => {
        try {
            res.send(await model.getList());
            return next();
        } catch (e) {
            res.send(e);
            return next();
        }
    }

}

module.exports = tracks
