import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import PreferencesModal, { PreferencesData } from './PreferencesModal';
import { submitEarlyRegistration, EarlyRegistrationRequest, handleGoogleAuth } from '../services/api';

const imgLogo = "https://www.figma.com/api/mcp/asset/e933a8bd-2f14-4aba-bb4c-b0e939e67c2a";
const imgGoogle = "https://www.figma.com/api/mcp/asset/7520e2b5-9dac-467e-a840-367748ce7fdb";
const imgDivider = "https://www.figma.com/api/mcp/asset/c5580568-1abc-4c59-9c7b-7662a1448fa3";
const imgBackground = "https://www.figma.com/api/mcp/asset/d2e6b2d4-19dc-4e02-96bd-5d0e90fad0d5";

interface SignupProps {
  onComplete?: (email: string, userName: string) => void;
}

export default function Signup({ onComplete }: SignupProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string>('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isGoogleSignup, setIsGoogleSignup] = useState(false);
  const [googleAccessToken, setGoogleAccessToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }
    
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setFormErrors({});
    setShowModal(true);
  };

  const handlePreferencesSubmit = async (preferences: PreferencesData) => {
    setIsSubmitting(true);
    setApiError('');

    try {
      // If this is a Google signup, first authenticate with the backend
      if (isGoogleSignup && googleAccessToken) {
        console.log('Processing Google signup with preferences...');
        
        // Send Google token to backend for authentication
        const googleAuthResponse = await handleGoogleAuth(googleAccessToken);
        
        if (!googleAuthResponse.data?.access_token) {
          throw new Error('Google authentication with backend failed');
        }
        
        console.log('Google backend auth successful');
      }
      
      // Submit registration data with preferences
      const registrationData: EarlyRegistrationRequest = {
        first_name: formData.firstName,
        second_name: formData.lastName,
        email: formData.email,
        question_1: preferences.interests,
        question_2: preferences.learningMode,
        question_3: preferences.hoursPerWeek
      };

      console.log('Submitting registration data:', registrationData);
      const response = await submitEarlyRegistration(registrationData);
      console.log('API response:', response);
      
      // Check for success response (either code 1 or any success indication)
      if (response.code === 1 || (response.message && response.message.toLowerCase().includes('success'))) {
        console.log('Registration successful, calling onComplete with email:', formData.email);
        setShowModal(false);
        
        // Reset Google signup state
        setIsGoogleSignup(false);
        setGoogleAccessToken(null);
        
        if (onComplete) {
          onComplete(formData.email, formData.firstName);
        } else {
          console.error('onComplete callback is not provided');
        }
      } else {
        // Handle validation errors
        console.log('Registration failed with response:', response);
        if (response.errors) {
          const errorMessages = Object.values(response.errors).flat().join(', ');
          setApiError(errorMessages);
        } else {
          setApiError(response.message || 'Registration failed. Please try again.');
        }
      }
    } catch (error: any) {
      console.error('Error during registration:', error);
      setApiError(error.message || 'Network error occurred. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    // Reset Google signup state if user closes modal
    if (isGoogleSignup) {
      setIsGoogleSignup(false);
      setGoogleAccessToken(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      });
    }
  };

  const handleGoogleSignup = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setIsSubmitting(true);
        setApiError('');
        
        // Fetch user info from Google
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });
        
        if (!userInfoResponse.ok) {
          throw new Error('Failed to fetch Google user info');
        }
        
        const userInfo = await userInfoResponse.json();
        console.log('Google user info:', userInfo);
        
        // Store Google user data in form state
        setFormData({
          firstName: userInfo.given_name || userInfo.name?.split(' ')[0] || '',
          lastName: userInfo.family_name || userInfo.name?.split(' ').slice(1).join(' ') || '',
          email: userInfo.email || '',
          password: '' // No password needed for Google signup
        });
        
        // Store Google access token for later use
        setGoogleAccessToken(tokenResponse.access_token);
        setIsGoogleSignup(true);
        
        // Show the preferences modal to collect additional data
        setShowModal(true);
        
      } catch (error: any) {
        console.error('Google authentication error:', error);
        setApiError(error.message || 'Google authentication failed. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    },
    onError: () => {
      setApiError('Google sign-in was cancelled or failed. Please try again.');
    },
  });

  return (
    <div className="bg-white relative w-full min-h-screen lg:h-screen flex flex-col lg:flex-row">
      <div className="flex-1 flex items-center justify-center py-6 sm:py-8 md:py-10 lg:py-6 px-4 sm:px-6 md:px-8 lg:overflow-y-auto">
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 items-center w-full max-w-[643px]">
        <div className="h-[50px] sm:h-[55px] md:h-[60px] lg:h-[65px] w-[167px] sm:w-[183px] md:w-[200px] lg:w-[217px]">
          <img 
            alt="Delveng Logo" 
            className="w-full h-full object-contain" 
            src={imgLogo} 
          />
        </div>

        <div className="flex flex-col gap-4 sm:gap-5 items-center w-full">
          <div className="flex flex-col gap-4 sm:gap-5 items-center w-full max-w-[508px]">
            <div className="flex flex-col gap-[2px] items-center text-center w-full max-w-[424px]">
              <h1 className="font-bold text-lg sm:text-xl md:text-2xl text-brand-primary">
                Create Your Account
              </h1>
              <p className="font-medium text-xs sm:text-sm md:text-base text-text-dark">
                Everything you need to learn, all in one place
              </p>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <button 
                onClick={() => handleGoogleSignup()}
                disabled={isSubmitting}
                className="bg-white border border-[#e1e7ef] flex gap-3 sm:gap-4 md:gap-[18px] h-[44px] sm:h-[48px] md:h-[50px] items-center justify-center px-3 sm:px-4 rounded-xl w-full hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <img 
                  alt="" 
                  className="w-5 h-5" 
                  src={imgGoogle} 
                />
                <span className="font-semibold text-xs sm:text-sm md:text-base text-black">
                  {isSubmitting ? 'Signing in...' : 'Sign up with Google'}
                </span>
              </button>
              
              {apiError && !showModal && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-2">
                  <p className="text-red-600 text-sm">{apiError}</p>
                </div>
              )}
            </div>
          </div>

          <div className="w-full max-w-[503px] h-[9px] flex items-center justify-center">
            <img 
              alt="or" 
              className="w-full h-full" 
              src={imgDivider} 
            />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4 w-full">
            <div className="flex flex-col gap-3 sm:gap-4 w-full">
              <div className="flex flex-col gap-3 sm:gap-4 w-full">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
                  <div className="flex-1 flex flex-col">
                    <label className="font-medium text-xs sm:text-sm text-text-dark pb-2">
                      First Name
                    </label>
                    <div className={`bg-white border-[1.5px] border-[#b0d6ff] flex gap-2 sm:gap-3 h-[44px] sm:h-[48px] md:h-[50px] items-center px-3 sm:px-4 rounded-xl ${formErrors.firstName ? 'border-red-500' : ''}`}>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#a2acb9]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => {
                          setFormData({...formData, firstName: e.target.value});
                          if (formErrors.firstName) {
                            setFormErrors({...formErrors, firstName: ''});
                          }
                        }}
                        placeholder="Ahmed"
                        className={`flex-1 font-medium text-xs sm:text-sm text-black outline-none placeholder:text-[#a2acb9] ${formErrors.firstName ? 'text-red-500' : ''}`}
                      />
                    </div>
                    {formErrors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col">
                    <label className="font-medium text-xs sm:text-sm text-text-dark pb-2">
                      Last Name
                    </label>
                    <div className={`bg-white border-[1.5px] border-[#b0d6ff] flex gap-2 sm:gap-3 h-[44px] sm:h-[48px] md:h-[50px] items-center px-3 sm:px-4 rounded-xl ${formErrors.lastName ? 'border-red-500' : ''}`}>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#a2acb9]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => {
                          setFormData({...formData, lastName: e.target.value});
                          if (formErrors.lastName) {
                            setFormErrors({...formErrors, lastName: ''});
                          }
                        }}
                        placeholder="Ali"
                        className="flex-1 font-medium text-xs sm:text-sm text-black outline-none placeholder:text-[#a2acb9]"
                      />
                    </div>
                    {formErrors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col w-full">
                  <label className="font-medium text-xs sm:text-sm text-text-dark pb-2">
                    Email Address
                  </label>
                  <div className={`bg-white border border-[#b0d6ff] flex gap-2 sm:gap-3 h-[44px] sm:h-[48px] md:h-[50px] items-center px-3 sm:px-4 rounded-xl ${formErrors.email ? 'border-red-500' : ''}`}>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#a2acb9]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m2 7 10 7 10-7" />
                    </svg>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({...formData, email: e.target.value});
                        if (formErrors.email) {
                          setFormErrors({...formErrors, email: ''});
                        }
                      }}
                      placeholder="ahmed.ali@example.com"
                      className="flex-1 font-medium text-xs sm:text-sm text-black outline-none placeholder:text-[#a2acb9]"
                    />
                  </div>
                  {formErrors.email && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                  )}
                </div>

                <div className="flex flex-col w-full">
                  <label className="font-medium text-xs sm:text-sm text-text-dark pb-2">
                    Password
                  </label>
                  <div className={`bg-white border border-[#b0d6ff] flex h-[44px] sm:h-[48px] md:h-[50px] items-center justify-between px-3 sm:px-4 rounded-xl ${formErrors.password ? 'border-red-500' : ''}`}>
                    <div className="flex gap-2 sm:gap-3 items-center flex-1">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#a2acb9]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => {
                          setFormData({...formData, password: e.target.value});
                          if (formErrors.password) {
                            setFormErrors({...formErrors, password: ''});
                          }
                        }}
                        placeholder="Create strong password"
                        className="flex-1 font-medium text-xs sm:text-sm text-black outline-none placeholder:text-[#a2acb9]"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center flex-shrink-0"
                    >
                      {showPassword ? (
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#a2acb9]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#a2acb9]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {formErrors.password && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
                  )}
                </div>
              </div>

              <p className="font-medium text-[10px] sm:text-xs text-text-dark w-full max-w-[492px]">
                By creating an account, you agree to our{' '}
                <a href="#" className="text-brand-primary hover:underline">
                  Terms of Service
                </a>
                {' '}and{' '}
                <a href="#" className="text-brand-primary hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 items-center w-full">
              <button
                type="submit"
                className="bg-brand-primary hover:bg-brand-hover border-brand-hover border-b-[6px] border-l-4 border-r-4 border-solid border-t-[0.5px] flex h-[44px] sm:h-[48px] md:h-[50px] items-center justify-center px-[10px] rounded-xl w-full transition-colors"
              >
                <span className="font-semibold text-base sm:text-lg text-white">
                  Create your Account
                </span>
              </button>

              <p className="font-medium text-xs sm:text-sm text-text-secondary text-center">
                Need help?{' '}
                <span className="font-bold text-brand-primary hover:underline cursor-pointer">
                  Contact Support
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
      </div>

      <div className="w-full lg:w-[500px] xl:w-[600px] 2xl:w-[710px] h-[250px] sm:h-[300px] lg:h-screen order-first lg:order-last">
        <img 
          alt="Engineering workspace with blueprints and tools" 
          className="w-full h-full object-cover" 
          src={imgBackground} 
        />
      </div>

      <PreferencesModal
        isOpen={showModal}
        onClose={handleModalClose}
        onSubmit={handlePreferencesSubmit}
        isSubmitting={isSubmitting}
        apiError={apiError}
      />
    </div>
  );
}
