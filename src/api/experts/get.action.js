import ExpertsDao from "api/experts/experts.dao";

const getExpert = async (req, res) => {
  const { expertId } = req.params;
  try {
    const expert = await ExpertsDao.findById(expertId);
    if (expert) {
      return res.status(200).json(expert);
    }

    return res.status(404).json({
      message: "Expert not found"
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

export default getExpert;
