import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff,  ArrowRight, Code, Cpu, Globe } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSignUp, useLogin } from '../query/auth';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

// Validation Schemas
const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginData = z.infer<typeof loginSchema>;
type SignupData = z.infer<typeof signupSchema>;

// Shared Input Component
interface SharedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ComponentType<any>;
  registration: any;
}

export function SharedInput({
  label,
  error,
  icon: Icon,
  registration,
  type = 'text',
  ...props
}: SharedInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="space-y-1.5 w-full">
      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
        {label}
      </label>
      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-purple-400 transition-colors duration-300">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          type={inputType}
          className={`w-full bg-zinc-950/60 border ${error
            ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500'
            : 'border-zinc-800/80 focus:border-purple-500 focus:ring-1 focus:ring-purple-500'
            } rounded-xl py-3.5 ${Icon ? 'pl-12' : 'px-4'
            } pr-12 text-sm text-white placeholder-zinc-600 focus:outline-none transition-all duration-300 backdrop-blur-sm`}
          {...registration}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors duration-300"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-400 font-medium"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

// Login Form Component
interface LoginFormProps {
  prefilledEmail?: string;
}

export function LoginForm({ prefilledEmail }: LoginFormProps) {
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (prefilledEmail) {
      setValue('email', prefilledEmail);
    }
  }, [prefilledEmail, setValue]);

  const onSubmit = (data: LoginData) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Successfully signed in!');
        navigate('/dashboard');
      },
      onError: (err: any) => {
        toast.error(
          err.response?.data?.message || 'Invalid credentials. Please try again.'
        );
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <SharedInput
        label="Email Address"
        icon={Mail}
        type="email"
        placeholder="you@example.com"
        registration={register('email')}
        error={errors.email?.message}
      />
      <div className="space-y-1">
        <SharedInput
          label="Password"
          icon={Lock}
          type="password"
          placeholder="••••••••"
          registration={register('password')}
          error={errors.password?.message}
        />
        <div className="flex justify-end">
          <button
            type="button"
            className="text-xs text-purple-400 hover:text-purple-300 font-medium transition-colors duration-300"
          >
            Forgot password?
          </button>
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        disabled={loginMutation.isPending}
        type="submit"
        className="w-full py-3.5 px-4 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
      >
        {loginMutation.isPending ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            Sign In
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </motion.button>
    </form>
  );
}

// Signup Form Component
interface SignupFormProps {
  onSuccess: (email: string) => void;
}

export function SignupForm({ onSuccess }: SignupFormProps) {
  const signupMutation = useSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupData) => {
    signupMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Account created successfully! Please sign in.');
        onSuccess(data.email);
      },
      onError: (err: any) => {
        toast.error(
          err.response ||
          'Registration failed. Username or email might be taken.'
        );
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <SharedInput
        label="Username"
        icon={User}
        type="text"
        placeholder="johndoe"
        registration={register('username')}
        error={errors.username?.message}
      />
      <SharedInput
        label="Email Address"
        icon={Mail}
        type="email"
        placeholder="you@example.com"
        registration={register('email')}
        error={errors.email?.message}
      />
      <SharedInput
        label="Password"
        icon={Lock}
        type="password"
        placeholder="••••••••"
        registration={register('password')}
        error={errors.password?.message}
      />
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        disabled={signupMutation.isPending}
        type="submit"
        className="w-full py-3.5 px-4 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
      >
        {signupMutation.isPending ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            Create Account
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </motion.button>
    </form>
  );
}

// Tabs Switcher Component
interface AuthTabsProps {
  activeTab: 'login' | 'signup';
  setActiveTab: (tab: 'login' | 'signup') => void;
}

export function AuthTabs({ activeTab, setActiveTab }: AuthTabsProps) {
  return (
    <div className="flex bg-zinc-900/60 p-1 rounded-2xl border border-white/5 relative">
      <button
        type="button"
        onClick={() => setActiveTab('login')}
        className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-colors duration-300 relative z-10 ${activeTab === 'login' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
          }`}
      >
        Sign In
        {activeTab === 'login' && (
          <motion.div
            layoutId="activeTabIndicator"
            className="absolute inset-0 bg-zinc-800 rounded-xl -z-10 border border-white/10"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </button>
      <button
        type="button"
        onClick={() => setActiveTab('signup')}
        className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-colors duration-300 relative z-10 ${activeTab === 'signup' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
          }`}
      >
        Create Account
        {activeTab === 'signup' && (
          <motion.div
            layoutId="activeTabIndicator"
            className="absolute inset-0 bg-zinc-800 rounded-xl -z-10 border border-white/10"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </button>
    </div>
  );
}

// Side Branding Panel Component
function BrandingPanel() {
  return (
    <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-12 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 border-r border-white/5 relative overflow-hidden h-full">
      {/* Decorative Blur Circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-[80px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-cyan-500/10 blur-[80px]" />

      {/* Brand Logo Header */}
      <a href="/" className="flex items-center group relative z-10">
        <img src="/logo.png" alt="CreatorFlow Logo" className="h-24 w-auto object-contain" />
      </a>

      {/* Main Core Copy */}
      <div className="relative z-10 space-y-10 my-auto">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-white leading-tight">
            Build and ship at the speed of thought.
          </h1>
          <p className="text-base text-zinc-400 leading-relaxed">
            Manage your project development boards and automate deployment workflows with high-velocity collaboration.
          </p>
        </div>

        {/* Connective Pipeline Graphics */}
        <div className="space-y-5 relative">
          <div className="absolute left-[27px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-purple-500 via-cyan-400 to-pink-500 opacity-60" />

          <div className="flex items-center gap-4 relative">
            <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-purple-400 shadow-md">
              <Code className="w-6 h-6 animate-float" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Create Tasks</p>
              <p className="text-xs text-zinc-500">Organize your development goals</p>
            </div>
          </div>

          <div className="flex items-center gap-4 relative">
            <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-cyan-400 shadow-md">
              <Cpu className="w-6 h-6 animate-float-slow" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Track Progress</p>
              <p className="text-xs text-zinc-500">Synchronized drag-and-drop boards</p>
            </div>
          </div>

          <div className="flex items-center gap-4 relative">
            <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-pink-400 shadow-md">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Deploy Updates</p>
              <p className="text-xs text-zinc-500">Continuous deployment in one-click</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tiny Footer */}
      <div className="relative z-10 text-xs text-zinc-500">
        © 2026 CreatorFlow Inc. All rights reserved.
      </div>
    </div>
  );
}

// Main Auth Component
export default function Auth() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [prefilledEmail, setPrefilledEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwt-token');
    if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#030303] text-white flex items-center justify-center relative overflow-hidden select-none">
      {/* Background ambient glowing particles */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px] animate-float pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[150px] animate-float-slow pointer-events-none" />

      {/* Main Container Grid */}
      <div className="w-full max-w-7xl h-[100vh] lg:h-[85vh] lg:min-h-[680px] grid grid-cols-1 lg:grid-cols-12 bg-zinc-950/40 border-0 lg:border border-white/5 lg:rounded-3xl shadow-2xl overflow-hidden backdrop-blur-md">

        {/* Branding/Visual Panel (Hidden on mobile) */}
        <BrandingPanel />

        {/* Form Panel */}
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-center items-center p-6 sm:p-12 md:p-16 relative">

          {/* Back button/Logo for mobile */}
          <div className="lg:hidden absolute top-6 left-6 flex items-center">
            <img src="/logo.png" alt="CreatorFlow Logo" className="h-14 w-auto object-contain" />
          </div>

          {/* Auth Card Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md space-y-8 relative z-10"
          >
            {/* Header Text */}
            <div className="space-y-2 text-center lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white">
                {activeTab === 'login' ? 'Welcome back' : 'Get started with CreatorFlow'}
              </h2>
              <p className="text-sm text-zinc-400">
                {activeTab === 'login'
                  ? 'Enter your details below to sign in'
                  : 'Create your account to start building lanes'}
              </p>
            </div>

            {/* Toggle Tabs */}
            <AuthTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Switchable Forms Container */}
            <div
              className="relative w-full overflow-hidden transition-all duration-300"
              style={{ height: activeTab === 'login' ? '280px' : '360px' }}
            >
              {/* Login Form */}
              <motion.div
                animate={{ x: activeTab === 'login' ? '0%' : '-100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute inset-0 w-full"
              >
                <LoginForm prefilledEmail={prefilledEmail} />
              </motion.div>

              {/* Signup Form */}
              <motion.div
                animate={{ x: activeTab === 'signup' ? '0%' : '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute inset-0 w-full"
              >
                <SignupForm
                  onSuccess={(email) => {
                    setPrefilledEmail(email);
                    setActiveTab('login');
                  }}
                />
              </motion.div>
            </div>

            {/* Terms Footer */}
            <p className="text-center text-xs text-zinc-500 leading-relaxed px-6">
              By continuing, you agree to our{' '}
              <a href="#" className="underline hover:text-zinc-300 transition-colors">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="underline hover:text-zinc-300 transition-colors">
                Privacy Policy
              </a>
              .
            </p>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
