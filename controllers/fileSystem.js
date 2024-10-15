const {
  parseLocalDriveIntoJson,
  checkIfDirExists,
} = require("../utils/fileSystem.js");

const { prisma } = require("../db/config");
const {  driveFolderPath } = require("../utils/constants.js");

const createFileSystemToRemoteDb = async (_, res) => {
  try{
    if(checkIfDirExists(driveFolderPath)){
      let fileStructure = await parseLocalDriveIntoJson(driveFolderPath)
      const result = await prisma.Storage.create({
        data:{
          fileSystem : fileStructure
        }
      })
      res.status(200).json({
        "message": "File system pushed to remote database",
        "repository": result
      })
    }
    else{
      res.status(400).json({ "message": "drive folder does not exists" })
    }
  }
  catch(err){
    res.status(500).json({ "error": "Internal Server Error" })
  }

};

const updateFileSystemToRemoteDb = async (req, res) => {
  const {id} = req.query
  if(!id) {
    res.status(400).json({ "message": "id not provided" })
  }
  try{
    if(checkIfDirExists(driveFolderPath)){
    let fileStructure = await parseLocalDriveIntoJson(driveFolderPath)
    const result = await prisma.Storage.update({
      data:{
        fileSystem : fileStructure
      },
      where:{
        id: Number(id)
      }
    })
    console.log(result)
    res.status(200).json({
      "message": "File system pushed to remote database",
      "repository": result
    })
  }
}
  catch(err){
    console.log(err)
    res.status(500).json({ "error": "Internal Server Error" })
  }
};

module.exports = {
  createFileSystemToRemoteDb,
  updateFileSystemToRemoteDb,
};
