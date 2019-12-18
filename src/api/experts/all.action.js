import ExpertDao from "api/experts/experts.dao";

const getAllExperts = async (req, res) => {
  const { limit } = req.query;
  try {
    const experts = await ExpertDao.allExperts({ limit });
    return res.status(200).json(experts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default getAllExperts;
