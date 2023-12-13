export enum AuthSummary {
  SIGN_UP = 'Sign up',
  SIGN_IN = 'Sign in',
  CHANGE_PASSWORD = 'Change password',
}

export enum ProductSummary {
  GET_PRODUCT = 'Get product info',
  GET_ALL_PRODUCTS = 'Get all product',
  ADD_PRODUCT = 'Add product',
  UPDATE_PRODUCT = 'Update product',
  DELETE_PRODUCT = 'Delete product',

  GET_VERSION = 'Get version info',
  ADD_VERSION = 'Add product version',
  UPDATE_VERSION = 'Update product version',
  DELETE_VERSION = 'Delete product version',
}

export enum AttributeSummary {
  ADD_ATTRIBUTE = 'Add attribute',
  UPDATE_ATTRIBUTE = 'Update attribute',
  DELETE_ATTRIBUTE = 'Delete attribute',

  ADD_OPTION = 'Add attribute option version',
  UPDATE_OPTION = 'Update attribute option version',
  DELETE_OPTION = 'Delete attribute option version',
}

export enum RateSummary {
  GET_RATE = 'Get product rate',
  RATE = 'Rate a product',
}

export enum CategoriesSummary {
  GET_ALL_CATEGORIES = 'Get all categories',
  CREATE_CATEGORY = 'Create category',
  DELETE_CATEGORY = 'Delete category',
}

export enum CommentsSummary {
  GET_ALL_COMMENTS = 'Get all comments',
  ADD_COMMENT = 'Add comment',
  DELETE_COMMENT = 'Delete comment',
}

export enum FavoritesSummary {
  GET_ALL_FAVORITES = 'Get all favorites',
  FAVORITE = 'Add to favorites or remove from favorites',
}

export enum ProductToCategorySummary {
  GET_ALL_PRODUCTS = 'Get all products by category',
  ADD_PRODUCT_TO_CATEGORY = 'Add product to category',
}

export enum TokenSummary {
  GENERATE_TOKEN = 'Generate token',
}

export enum UploadSummary {
  UPLOAD_IMAGE = 'Upload image',
  UPLOAD_IMAGES = 'Upload multiple images',
  DELETE_IMAGE = 'Delete image',
  DELETE_IMAGES = 'Delete multiple images',
}

export enum ImageSummary {
  UPLOAD_PRODUCT_IMAGE = 'Upload product image',
  UPLOAD_VERSION_IMAGE = 'Upload version image',
}
