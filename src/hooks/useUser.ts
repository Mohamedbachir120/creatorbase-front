import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { type AxiosResponse, AxiosError } from 'axios';
import apiClient from '../lib/apiClient';
import { useAuth } from '../context/AuthContext';

// Define the User interface (same as in AuthContext.tsx)
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  searchHistory?: Array<{
    id: string;
    keyword: string | null;
    country: string | null;
    createdAt: string;
  }>;
}

// Define the response type for password update
interface PasswordUpdateResponse {
  message: string;
}

// --- Fetch User Profile Query ---
export const useUserProfile = () => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ['userProfile'],
    queryFn: () => apiClient.get<User>('/profile/me'),
    enabled: isAuthenticated,
    select: (data: AxiosResponse<User>) => data.data, // Return the User object
  });
};

// --- Update Password Mutation ---
interface UpdatePasswordData {
  currentPassword: string;
  newPassword: string;
}

export const useUpdatePassword = () => {
  const queryClient = useQueryClient(); // Use queryClient for cache invalidation

  return useMutation({
    mutationFn: (passwordData: UpdatePasswordData) =>
      apiClient.patch<PasswordUpdateResponse>('/profile/update-password', passwordData),
    onSuccess: () => {
      // Invalidate user profile query to refresh data
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      // Show success message
      // Replace alert with a toast notification for better UX
      alert('Password updated successfully!');
    },
    onError: (error: AxiosError) => {
      console.error('Failed to update password:', error);
      // Replace alert with a toast notification for better UX
      alert('Failed to update password. Please check your current password.');
    },
  });
};