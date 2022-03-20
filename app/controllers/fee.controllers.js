/* eslint-disable no-undef */
/* eslint-disable consistent-return */
import { successResponse } from '../utils/helpers/response.helpers';

const saveFeeSetup = async (req, res, next) => {
  try {
    client.set('fees', JSON.stringify(req.fees));
    return successResponse(res, 'Fees setup saved successfully', 200);
  } catch (error) {
    next(error);
  }
};

export default saveFeeSetup;
