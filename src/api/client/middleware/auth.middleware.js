import { validateToken } from "../../utils/tokens";

export let verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      status: "error",
      data: "authentication required"
    });
  }

  const token = authorization.split(" ")[1];

  if (token && token.trim()) {
    try {
      const isValid = await validateToken(token);
      if (isValid) {
        next();
      } else {
        res.status(401).json({
          status: "error",
          data: "authentication required"
        });
      }
    } catch (ex) {
      res.status(401).json({
        status: "error",
        data: "authentication required"
      });
    }
  }
};
