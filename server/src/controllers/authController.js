import { AuthService } from '../services/AuthService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { registerSchema, loginSchema } from '../../../shared/validators/index.js';

const authService = new AuthService();

export const register = asyncHandler(async (req, res) => {
  const validated = registerSchema.parse(req.body);
  const result = await authService.register(validated);
  new ApiResponse(201, result, 'Account registered successfully').send(res);
});

export const login = asyncHandler(async (req, res) => {
  const validated = loginSchema.parse(req.body);
  const result = await authService.login(validated);
  new ApiResponse(200, result, 'Authenticated successfully').send(res);
});

export const getMe = asyncHandler(async (req, res) => {
  new ApiResponse(200, { user: req.user }, 'Current user profile retrieved').send(res);
});
