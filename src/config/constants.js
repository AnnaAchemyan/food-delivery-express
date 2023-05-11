export const statusCodes = {
  notFound: 404,
  badRequest: 400,
  forbidden: 403,
  conflict: 409,
  unauthorized: 401,
  unprocessableEntity: 422,
  notAllowed: 405,
};

export const messages = {
  videoNotFound: 'Video is not found',
  noVideosFound: 'No videos found',
  videoNotExists: 'Video does not exist in this playlist',
  videoAlreadyExists: 'This video already exists',
  homepageVideoChangeStatus: 'You can\'t change homepage video status to false. Please select a different video for the homepage',
  deleteHomepageVideo: 'You can\'t delete homepage video. Please select a different video for the homepage and try again',
  videoDeleted: 'Video successfully deleted',
  videosDeleted: 'Videos deleted successfully',
  noSelectedVideo: 'No selected videos',
  videosAdded: 'Videos added successfully',
  videosDeletedFromPlaylist: 'Videos successfully deleted from the playlist',

  userNotFound: 'User is not found',
  userAlreadyArchived: 'User already archived',
  userArchived: 'User successfully archived',
  userRestored: 'User successfully restored',
  noNeedToRestoreUser: 'There is no need to restore. User is active for actions',

  playlistTitleUsed: 'This playlist title already used',
  playlistNotFound: 'Playlist is not found',
  playlistDeleted: 'Playlist successfully deleted',
  noSelectedPlaylists: 'No selected playlists',
  noPlaylistsFound: 'No playlists found',
  playlistsAdded: 'Playlists added successfully',
  playlistsDeletedFromPath: 'Playlists successfully deleted from the path',

  monthAndYearAlreadyUsed: 'This month and year already used for this user. Try update.',
  paymentAdded: 'Payment successfully added',
  paymentSDeleted: 'Payment successfully deleted',

  pathAlreadyExists: 'Path with that title already exists',
  pathNotFound: 'Path is not found',
  pathUpdated: 'Path successfully updated',
  pathDeleted: 'Path successfully deleted',

  invalidInputFile: 'Invalid input file',
  imageNotFound: 'Image is not found',
  imageDeleted: 'Image successfully deleted',

  accountAlreadyActivated: 'Your account already activated',
  emailSentForActivate: 'Email sent. Please check your email to activate your account',
  registerActivateEmail: 'Thank you for registration. Please check your email to activate your account',
  accountActivated: 'Your account successfully activated',
  wrongAction: 'Something is wrong. You can\'t do this action',
  notVerifiedAccount: 'Your account is not verified. Please check your email to activate your account',
  emailSentForResetPass: 'Email sent. Please check your email to reset your password',
  userLoggedIn: 'User successfully logged in',
  unauthorized: 'Unauthorized',
  invalidAccessToken: 'Access token is invalid or expired',
  notHavePermission: 'You do not have permission',
  paymentIssue: 'There are some issues with your payment. You can resolve this issue by connecting to an administrator',

  incorrectPassword: 'Incorrect password',
  oldPasswordIncorrect: 'Old password is incorrect',
  newPasswordNotBeOldPassword: 'New password should not be your old password',
  newAndConfirmPassMatch: 'New password and confirm password don\'t match',
  passwordChanged: 'Password successfully changed',
  incorrectEmailOrPass: 'Incorrect email or password',

  emailAlreadyUsed: 'This email already used',
  currentEmail: 'This email is your current email',
  activatedSuccessfullyNewEmail: 'Your new email successfully activated',
  activateNewEmail: 'Please check your email to activate your new email address',
  incorrectHash: 'Incorrect hash',
  invalidId: 'Invalid id',
  tokenDeleted: 'Token successfully deleted',
  noDataToUpdate: 'No data to update',
  somethingWrong: 'Something is wrong',
  dataUpdated: 'Data successfully updated',

  firstnameContain: 'Firstname should contain minimum 2 letters',
  lastnameContain: 'Lastname should contain minimum 2 letters',
  passwordContain: 'Password should contain minimum eight characters, at least one letter and one number',
  invalidEmail: 'Invalid email address',
  invalidPhone: 'Invalid phone number',
  invalidYear: 'Invalid input for year. Should be like 2023',
  invalidMonth: 'Month name is incorrect. Should be like January, February, March...',
  invalidPayment: 'Payment should be numeric value',
  invalidLikeField: 'like field is required and should contain boolean value',
  incorrectTitle: 'Incorrect title',
  incorrectLink: 'Incorrect link',
  incorrectTopic: 'Incorrect topic',
  incorrectDescription: 'Incorrect description',
  incorrectTopField: 'Top field should contain boolean value',
  incorrectHomepageField: 'Homepage field should contain boolean value',
  incorrectTagsField: 'Tags field should be array',
  incorrectMaterialsField: 'Materials field should be array',
  incorrectPaidField: 'Paid field should contain boolean value',
  incorrectSearchInput: 'Incorrect search input',
  wrongImage: 'Wrong extension type for image',
  foodNotFound: 'Food is not found',
  categoryAlreadyUsed: 'Category with this name already used',
  categoryNotFound: 'Category is not found',
  notAvailableProduct: 'Product is not available at a specific time',
};

export const roles = {
  admin: 'ADMIN',
  user: 'USER',
};

export const tokenLife = {
  accessToken: '24h',
  refreshToken: '30d',
  forgotPass: '1h',
  activateEmail: '48h',
};

export const isActive = '1';

export const bcryptSalt = 5;
