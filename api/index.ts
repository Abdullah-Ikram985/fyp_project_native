// export const BASE_URL = 'http://127.0.0.1:8000';

export const BASE_URL = 'https://kena-uninstrumental-maryln.ngrok-free.dev';
export const API_VERSION = '/api/v1/';

export const API_ROUTES = {
  BASE_URL,
  API_VERSION,
  LOGIN: 'users/login',
  SIGNUP: 'users/signup',

  UPLOAD_PDF_FILE: 'files/uploadPDF',
  UPLOAD_PROFILE_IMAGE: 'files/uploadImage',

  RESUME_GET: 'resume/getResumeData',
  CAREER_ROADMAP_GET: 'resume/getCareerRoadmap',

  UPDATE_PROFILE: 'users/updateUser',

  FORGOTPASSWORD: 'users/forgotPassword',
  RESETPASSWORD: 'users/resetPassword/:token',
};
