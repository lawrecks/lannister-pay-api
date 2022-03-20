/* eslint-disable consistent-return */
import { Error } from '../utils/helpers/response.helpers';

const throwErrorByIndex = (index, mainIndex) => {
  let field = '';
  switch (index) {
    case 0:
      console.log('feeeIDDDDD');
      field = 'feeId';
      break;
    case 1:
      field = 'feeCurrency';
      break;
    case 2:
      field = 'feeLocale';
      break;
    case 30:
      field = 'feeEntity.name';
      break;
    case 31:
      field = 'feeEntity.property';
      break;
    case 6:
      field = 'feeType';
      break;
    case 7:
      field = 'feeValue';
      break;
    default:
      field = 'unknown';
  }
  const message = `Field fees[${mainIndex}].${field} is missing`;
  throw Error(message, 400);
};

const constructFeeSetup = (feesArray) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  feesArray.map((fee, index) => {
    const feeItems = fee.split(' ');
    const entity = feeItems[3] ? feeItems[3].split('(') : [];
    const property = entity[1] ? entity[1].substring(0, entity[1].length - 1) : '';
    return {
      id: feeItems[0] || throwErrorByIndex(0, index),
      currency: feeItems[1] || throwErrorByIndex(1, index),
      locale: feeItems[2] || throwErrorByIndex(2, index),
      entity: {
        name: entity[0] || throwErrorByIndex(30, index),
        property: property || throwErrorByIndex(31, index),
      },
      type: feeItems[6] || throwErrorByIndex(6, index),
      value: feeItems[7] || throwErrorByIndex(7, index),
    };
  });

const destructureFeeBody = (req, res, next) => {
  try {
    const { FeeConfigurationSpec: feeConfigSpec } = req.body;
    const feesArray = feeConfigSpec.split('\n');
    const fees = constructFeeSetup(feesArray);
    req.fees = { ...fees };
    return next();
  } catch (error) {
    next(error);
  }
};

export default destructureFeeBody;
