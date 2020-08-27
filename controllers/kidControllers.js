const kidServices = require('../services/kidServices');
const parentServices = require('../services/parentServices');
// const gameHistoryServices = require('../services/gameHistoryServices');
// const gameStatisticServices = require('../services/gameStatisticServices');
const responseFormatter = require('../services/shared/responseFormatter');

module.exports = {
    async getByID(req, res) {
        try {
            const kidID = req.params.idx;
            const result = await kidServices.getByID(kidID);
            responseFormatter.responseOK(req, res, result);
        } catch (err) {
            responseFormatter.responseErr(req, res, err);
        }
    },
    async createOne(req, res) {
        try {
            const isPlaying = false;
            const {
                parentID,
                name,
                icon,
                maxScreenTime,
                bDay,
                age
            } = req.body;
            const newKid = await kidServices.createOne({
                parentID,
                name,
                icon,
                maxScreenTime,
                isPlaying,
                bDay,
                age
            })
            const kidID = newKid._id;
            await parentServices.addKid(parentID, {
                kidID,
            })

            responseFormatter.responseOK(req, res, 'One Kid successfully added (to both kids and parents)!');
        } catch (err) {
            responseFormatter.responseErr(req, res, err);
        }
    },
    async updateOne(req, res) {
        try {
            const kidID = req.params.idx;
            const {
                name,
                icon,
                maxScreenTime,
                isPlaying,
                bDay,
                age
            } = req.body;

            await kidServices.updateOne(kidID, {
                name,
                icon,
                maxScreenTime,
                isPlaying,
                bDay,
                age
            })
            responseFormatter.responseOK(req, res, 'One Kid successfully updated!');
        } catch (err) {
            responseFormatter.responseErr(req, res, err);
        }
    },
    async startGame(req, res) {
        try {
            const kidID = req.params.idx;
            const gameID = req.params.gidx;
            const {
                gameName,
                gameLevel,
                timeStartPlay,
            } = req.body;

            await kidServices.startGame(kidID, {
                gameID,
                gameName,
                gameLevel,
                timeStartPlay,
            })
            responseFormatter.responseOK(req, res, 'startGame successfully added!');
        } catch (err) {
            responseFormatter.responseErr(req, res, err);
        }
    },
    async stopGame(req, res) {
        try {
            const kidID = req.params.idx;
            const gameID = req.params.gidx;
            const {
                timeStopPlay,
                currentScore
            } = req.body;

            await kidServices.stopGame(kidID, {
                gameID,
                timeStopPlay,
                currentScore
            })
            responseFormatter.responseOK(req, res, 'stopGame successfully updated!');
        } catch (err) {
            responseFormatter.responseErr(req, res, err);
        }
    },
    async deleteOne(req, res) {
        try {
            const kidID = req.params.idx;
            const kidData = await kidServices.getByID(kidID);
            const parentID = kidData.parentID;
            await kidServices.deleteOne(kidID);
            await parentServices.deleteKid(parentID, kidID)
            responseFormatter.responseOK(req, res, 'deleteOne (from both kids and parents) is successful!');
        } catch (err) {
            responseFormatter.responseErr(req, res, err);
        }
    }
}