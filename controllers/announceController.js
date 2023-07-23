const announcedb = require("../model/announcement");
const { authenticateToken } = require("./loginController");

const createAnnounce = async (req, res) => {
  authenticateToken(req,res,async()=>{
    try {
      const { title, description } = req.body;
  
      if (!title || !description) {
        res.status(200).json({ error: "title and description should not empty" });
      }
      const annoucement = await announcedb.create({
        title,
        description,
      });
      res.status(200).json({
        message: "Announcement Created Successfully",
        data: annoucement,
      });
    } catch (error) {
      console.log(error)
      if (error.name === "MongoError" && error.code === 11000) {
        res.status(404).json({ error: "title already exists" });
      }
      res.status(404).json({ error: "Internal server error" });
    }
  })
 
};

const getAnnounment = async (req, res) => {
  try {
    const getannounce = await announcedb.find({});
      return res.status(200).json({ data: getannounce });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Internal server error" });
  }
};
const deleteAnnounce = async (req, res) => {
  try {
    authenticateToken(req, res, async () => {
      const { id: announceID } = req.params;
      const deleteannounce = await announcedb.findOneAndDelete({
        _id: announceID,
      });
      if (!deleteannounce) {
        return res.status(404).json({
          message: `no announcement present with the id ${announceID}`,
        });
      } else {
        return res.status(200).json({
          message: "announcement deleteted successfully",
          data: deleteannounce,
        });
      }
    });
  } catch (error) {
    console.log(error)

    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateAnnounce = async (req, res) => {
  try {
    authenticateToken(req, res, async () => {
      const { id: announceID } = req.params;
      const { title, description } = req.body;
      if (!title || !description) {
        res
          .status(200)
          .json({ error: "title and description should not empty" });
      }

      const updateannounce = await announcedb.findOneAndUpdate(
        {
          _id: announceID,
        },
        { title, description },
        {
          new: true,
          runValidatots: true,
        }
      );
      if (!updateannounce) {
        return res.status(404).json({
          message: `no announcement present with the id ${announceID}`,
        });
      } else {
        return res.status(200).json({
          message: "announcement updated successfully",
          data: updateannounce,
        });
      }
    });
  } catch (error) {
    console.log(error)

    if (error.name === "MongoError" && error.code === 11000) {
      res.status(404).json({ error: "title already exists" });
    }
    res.status(404).json({ error: "Internal server error" });
  }
};
const updateStatus = async (req, res) => {
  try {
    authenticateToken(req, res, async () => {
      const { id: announceID } = req.params;
      const updatestatus = await announcedb.findById({ _id: announceID });
      if (!updatestatus) {
        return res.status(404).json({
          message: `no announcement present with the id ${announceID}`,
        });
      } else {
        updatestatus.status = !updatestatus.status;
        await updatestatus.save();
        res.json({ message: "User status updated successfully", updatestatus });
      }
    });
  } catch (error) {
    console.log(error)

    if (error.name === "MongoError" && error.code === 11000) {
      res.status(404).json({ error: "title already exists" });
    }
    res.status(404).json({ error: "Internal server error" });
  }
};

const getspecificannounce = async (req, res) => {
  const { id: announceID } = req.params;
  try {
    authenticateToken(req, res, async () => {
      const getannouncespecific = await announcedb.findById({
        _id: announceID,
      });
      if (!getannouncespecific) {
        return res.status(404).json({
          message: `no announcement present with the id ${announceID}`,
        });
      } else {
        return res.status(200).json({
          message: "View Users",
          data: getannouncespecific,
        });
      }
    });
  } catch (error) {
    console.log(error)

    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createAnnounce,
  getAnnounment,
  deleteAnnounce,
  updateAnnounce,
  updateStatus,
  getspecificannounce,
};
