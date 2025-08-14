import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { signIn, signUp } from '../lib/supabase';

interface FacebookLoginProps {
  platform: 'facebook' | 'instagram';
}

export default function FacebookLogin({ platform }: FacebookLoginProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  const platformConfig = {
    facebook: {
      name: 'Facebook',
      bgColor: 'white',
      primaryColor: '#1877F2',
      buttonClass: 'bg-[#1877F2] hover:bg-[#166fe5]',
      logo: '../../Facebook_Logo.webp',
      tagline: 'Connect with friends and the world around you on Facebook.'
    },
    instagram: {
      name: 'Instagram', 
      bgColor: '#fafafa',
      primaryColor: '#E4405F',
      buttonClass: 'bg-[#0095f6] hover:bg-[#1877F2]',
      logo: '../../public/instagram.png',
      tagline: 'Sign up to see photos and videos from your friends.'
    }
  };

  const config = platformConfig[platform];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
        alert('Login successful!');
      } else {
        await signUp(formData.email, formData.password, formData.firstName, formData.lastName);
        alert('Account created successfully! Please check your email for verification.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (platform === 'facebook') {
    return (
      <div className="min-h-screen" style={{ backgroundColor: config.bgColor }}>
        {/* Desktop Layout */}
        <div className="hidden lg:flex lg:items-center lg:justify-center lg:min-h-screen lg:px-8">
          <div className="flex w-full max-w-6xl">
            {/* Left Side - Branding */}
            <div className="flex-1 pr-16">
              <img 
                src={config.logo} 
                alt="Facebook" 
                className="w-18 h-28 mb-4"
              />
              <p className="text-2xl text-gray-800 font-normal leading-8 max-w-lg">
                {config.tagline}
              </p>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-96">
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  )}

                  {!isLogin && (
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                  )}

                  <input
                    type="email"
                    name="email"
                    placeholder="Email or phone number"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pr-12 text-lg border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full ${config.buttonClass} text-white font-bold text-xl py-3 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {loading ? 'Please wait...' : (isLogin ? 'Log In' : 'Sign Up')}
                  </button>

                  {isLogin && (
                    <div className="text-center pt-4">
                      <a href="#" className="text-blue-600 hover:underline text-sm">
                        Forgotten password?
                      </a>
                    </div>
                  )}
                </form>

                {isLogin && (
                  <>
                    <hr className="my-6 border-gray-300" />
                    <div className="text-center">
                      <button
                        onClick={() => {
                          setIsLogin(false);
                          setError('');
                          setFormData({ email: '', password: '', firstName: '', lastName: '' });
                        }}
                        className="bg-[#42b883] hover:bg-[#369870] text-white font-bold py-3 px-6 rounded-md transition-colors duration-200"
                      >
                        Create New Account
                      </button>
                    </div>
                  </>
                )}
              </div>

              {!isLogin && (
                <div className="text-center">
                  <button
                    onClick={() => {
                      setIsLogin(true);
                      setError('');
                      setFormData({ email: '', password: '', firstName: '', lastName: '' });
                    }}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Already have an account?
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden min-h-screen flex flex-col">
          {/* Header */}
          <div className=" px-4 py-6 text-center">
            <img 
              src={config.logo} 
              alt="Facebook" 
              className="h-12 mx-auto mb-2"
            />
          </div>

          {/* Form */}
          <div className="flex-1 px-4 py-6">
            <div className="max-w-sm mx-auto">
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                {!isLogin && (
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 text-md border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 text-md border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                )}

                <input
                  type="email || number"
                  name="email"
                  placeholder="Mobile number or email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-md border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 pr-12 text-md border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 "
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full ${config.buttonClass} text-white font-bold text-lg py-3 px-4 rounded-3xl transition-colors duration-200 disabled:opacity-50`}
                >
                  {loading ? 'Please wait...' : (isLogin ? 'Log In' : 'Sign Up')}
                </button>

                {isLogin && (
                  <div className="text-center pt-4">
                    <a href="#" className="text-black text-sm">
                      Forgotten password?
                    </a>
                  </div>
                )}
              </form>

              <div className="mt-8 text-center">
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                    setFormData({ email: '', password: '', firstName: '', lastName: '' });
                  }}
                  className={isLogin ? 
                    " text-blue-600 border  border-blue-600  font-bold py-3 px-6 rounded-3xl" :
                    "text-blue-600 text-sm"
                  }
                >
                  {isLogin ? 'Create New Account' : 'Already have an account?'}
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-white border-t border-gray-200 px-4 py-6 text-center text-gray-500 text-xs">
            <p>Meta © 2025</p>
          </div>
        </div>
      </div>
    );
  }

  // Instagram Layout
  return (
    <div className="min-h-screen" style={{ backgroundColor: config.bgColor }}>
      {/* Desktop Layout */}
      <div className="hidden md:flex md:items-center md:justify-center md:min-h-screen md:px-8">
        <div className="flex w-full max-w-4xl">
          {/* Left Side - Phone Mockup */}
          <div className="flex-1 flex justify-center items-center">
            <div className="relative">
              <img 
                src="https://www.instagram.com/static/images/homepage/phones/home-phones.png/1dc085cdb87d.png" 
                alt="Instagram phones"
                className="w-96 h-auto"
              />
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-80">
            <div className="bg-white border border-gray-300 rounded-sm p-8 mb-4">
              <div className="text-center mb-8">
                <img 
                  src={config.logo} 
                  alt="Instagram" 
                  className="h-12 mx-auto"
                />
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded text-center">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                {!isLogin && (
                  <>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-2 py-2 text-sm border border-gray-300 rounded-sm bg-gray-50 focus:bg-white focus:border-gray-400 outline-none"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-2 py-2 text-sm border border-gray-300 rounded-sm bg-gray-50 focus:bg-white focus:border-gray-400 outline-none"
                    />
                  </>
                )}

                <input
                  type="email"
                  name="email"
                  placeholder="Phone number, username, or email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-2 py-2 text-sm border border-gray-300 rounded-sm bg-gray-50 focus:bg-white focus:border-gray-400 outline-none"
                />

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-2 py-2 pr-12 text-sm border border-gray-300 rounded-sm bg-gray-50 focus:bg-white focus:border-gray-400 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-semibold"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full ${config.buttonClass} text-white font-semibold text-sm py-2 px-4 rounded-sm mt-4 transition-colors duration-200 disabled:opacity-50`}
                >
                  {loading ? 'Please wait...' : (isLogin ? 'Log In' : 'Sign Up')}
                </button>
              </form>

              {isLogin && (
                <>
                  <div className="flex items-center my-6">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="px-4 text-gray-500 text-sm font-semibold">OR</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                  </div>

                  <div className="text-center">
                    <a href="#" className="text-blue-900 text-sm font-semibold">
                      Log in with Facebook
                    </a>
                  </div>

                  <div className="text-center mt-4">
                    <a href="#" className="text-blue-900 text-xs">
                      Forgot password?
                    </a>
                  </div>
                </>
              )}
            </div>

            <div className="bg-white border border-gray-300 rounded-sm p-6 text-center">
              <p className="text-sm">
                {isLogin ? "Don't have an account? " : "Have an account? "}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                    setFormData({ email: '', password: '', firstName: '', lastName: '' });
                  }}
                  className="text-blue-500 font-bold"
                >
                  {isLogin ? 'Sign up' : 'Log in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden min-h-screen flex flex-col justify-center px-8">
        <div className="max-w-sm mx-auto w-full">
          <div className="text-center mb-8">
            <img 
              src={config.logo} 
              alt="Instagram" 
              className="h-12 mx-auto"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded text-center">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {!isLogin && (
              <>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-3 text-sm border border-gray-300 rounded-sm bg-gray-50 focus:bg-white focus:border-gray-400 outline-none"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-3 text-sm border border-gray-300 rounded-sm bg-gray-50 focus:bg-white focus:border-gray-400 outline-none"
                />
              </>
            )}

            <input
              type="email"
              name="email"
              placeholder="Phone number, username, or email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-3 text-sm border border-gray-300 rounded-sm bg-gray-50 focus:bg-white focus:border-gray-400 outline-none"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-3 pr-12 text-sm border border-gray-300 rounded-sm bg-gray-50 focus:bg-white focus:border-gray-400 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-semibold"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${config.buttonClass} text-white font-semibold text-sm py-3 px-4 rounded-sm mt-4 transition-colors duration-200 disabled:opacity-50`}
            >
              {loading ? 'Please wait...' : (isLogin ? 'Log In' : 'Sign Up')}
            </button>
          </form>

          {isLogin && (
            <>
              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-4 text-gray-500 text-sm font-semibold">OR</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              <div className="text-center">
                <a href="#" className="text-blue-900 text-sm font-semibold">
                  Log in with Facebook
                </a>
              </div>

              <div className="text-center mt-4">
                <a href="#" className="text-blue-900 text-xs">
                  Forgot password?
                </a>
              </div>
            </>
          )}

          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              {isLogin ? "Don't have an account? " : "Have an account? "}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setFormData({ email: '', password: '', firstName: '', lastName: '' });
                }}
                className="text-blue-500 font-semibold"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}