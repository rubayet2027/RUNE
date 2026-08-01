import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../../shared/validators/index.js';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { Input } from '../components/ui/Input.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Card } from '../components/ui/Card.jsx';
import { ShieldCheck, UserPlus } from 'lucide-react';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setApiError('');
    try {
      const response = await api.post('/auth/register', data);
      login(response.data.token, response.data.user);
      navigate('/');
    } catch (err) {
      setApiError(err.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-rune-secondary font-semibold">
          VIP MEMBERSHIP
        </span>
        <h1 className="font-serif text-rune-primaryxl font-extrabold text-rune-primary uppercase tracking-wider">
          CREATE ACCOUNT
        </h1>
        <p className="text-xs font-sans text-rune-secondary">
          Join RUNE for early preorder access & archival tracking.
        </p>
      </div>

      <Card>
        {apiError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-none text-xs font-mono mb-6">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input label="Full Name" {...register('name')} error={errors.name?.message} />
          <Input label="Email Address" {...register('email')} error={errors.email?.message} />
          <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />

          <Button fullWidth size="lg" isLoading={isSubmitting} type="submit">
            <UserPlus className="w-4 h-4 mr-2 inline" /> REGISTER VIP ACCESS
          </Button>

          <div className="text-center pt-2">
            <span className="text-xs text-rune-secondary font-sans">
              Already have an account?{' '}
              <Link to="/login" className="text-rune-primary hover:underline font-bold">
                SIGN IN
              </Link>
            </span>
          </div>
        </form>
      </Card>
    </div>
  );
};
