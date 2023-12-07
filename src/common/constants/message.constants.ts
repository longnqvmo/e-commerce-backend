export const CommonMessage = {
  OK: 'OK',

  SIGN_IN_SUCCEED: 'Sign in succeed!',
  SIGN_UP_SUCCEED: 'Sign up successfully!',
  UPDATE_ACCOUNT_SUCCEED: 'Account successfully updated!',
  CHANGE_PASSWORD_SUCCEED: 'Password successfully changed!',
  DELETE_ACCOUNT_SUCCEED: 'Account successfully deleted!',

  ADD_PRODUCT_SUCCEED: 'Product successfully added!',
  UPDATE_PRODUCT_SUCCEED: 'Product successfully updated!',
  DELETE_PRODUCT_SUCCEED: 'Product successfully deleted!',

  ADD_VERSION_SUCCEED: 'Version successfully added!',
  UPDATE_VERSION_SUCCEED: 'Version successfully updated!',
  DELETE_VERSION_SUCCEED: 'Version successfully deleted!',

  ADD_ATTRIBUTE_SUCCEED: 'Attribute successfully added!',
  UPDATE_ATTRIBUTE_SUCCEED: 'Attribute successfully updated!',
  DELETE_ATTRIBUTE_SUCCEED: 'Attribute successfully deleted!',

  ADD_OPTION_SUCCEED: 'Option successfully added!',
  UPDATE_OPTION_SUCCEED: 'Option successfully updated!',
  DELETE_OPTION_SUCCEED: 'Option successfully deleted!',

  ADD_COMMENT_SUCCEED: 'Comment successfully added!',
  UPDATE_COMMENT_SUCCEED: 'Comment successfully updated!',
  DELETE_COMMENT_SUCCEED: 'Comment successfully deleted!',

  ADD_CATEGORY_SUCCEED: 'Category successfully added!',

  RATE_SUCCEED: 'Successfully rated!',

  FAVORITE: 'Favorite!',
  UNFAVORITE: 'Unfavorite!',
};

export const ErrorMessage = {
  NOT_FOUND: 'Not found!',

  EMAIL_HAS_BEEN_USED: 'This email has been used!',
  USER_NOT_FOUND: 'Account does not exists!',
  WRONG_PASSWORD: 'Wrong password!',

  PRODUCT_NOT_FOUND: 'Product does not exists!',

  CATEGORY_NOT_FOUND: 'Category does not exists!',
  CATEGORY_EXIST: 'Category name exists!',

  COMMENT_NOT_FOUND: 'Comment does not exists!',
  COMMENT_CAN_NOT_DELETE: `You can't delete this comment!`,

  VERSION_NOT_FOUND: 'Version does not exists!',
  VERSION_EXISTS: 'This version already exists in this product!',

  ATTRIBUTE_NOT_FOUND: 'Attribute does not exists!',
  ATTRIBUTE_EXISTS: 'This attribute already exists!',

  OPTION_NOT_FOUND: 'Option does not exists!',
  OPTION_EXISTS: 'This option already exists in this attribute!',
};

export const WarningMessage = {
  SIGN_IN: 'You must sign in to do this action!',
  PERMISSION: 'You do not have permission to do this action!',
};
