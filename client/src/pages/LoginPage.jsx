import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../../shared/validators/index.js';
import { api } from '../services/api.js';
import { Input } from '../components/ui/Input.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Card } from '../components/ui/Card.jsx';
import { ShieldCheck, Lock } from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@rune.luxury',
      password: 'AdminPassword123!',
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setApiError('');
    try {
      const response = await api.post('/auth/login', data);
      localStorage.setItem('rune_token', response.data.token);
      if (response.data.user.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setApiError(err.message || 'Authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-24 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8E9192] font-semibold">
          AUTHENTICATION VAULT
        </span>
        <h1 className="font-serif text-3xl font-extrabold text-white uppercase tracking-wider">
          SIGN IN TO RUNE
        </h1>
        <p className="text-xs font-sans text-[#8E9192]">
          Access your preorder reservations & VIP drop keys.
        </p>
      </div>

      <Card>
        {apiError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-none text-xs font-mono mb-6">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input label="Email Address" {...register('email')} error={errors.email?.message} />
          <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />

          <Button fullWidth size="lg" isLoading={isSubmitting} type="submit">
            AUTHENTICATE & ENTER
          </Button>

          <div className="text-center pt-2">
            <span className="text-xs text-[#8E9192] font-sans">
              Demo Admin Login: <strong className="text-white font-mono">admin@rune.luxury</strong> / <strong className="text-white font-mono">AdminPassword123!</strong>
            </span>
          </div>
        </form>
      </Card>
    </div>
  );
};
