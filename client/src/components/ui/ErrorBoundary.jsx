import React from 'react';
import { Button } from './Button.jsx';
import { ShieldAlert } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary] Unhandled UI Exception:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center space-y-6 bg-rune-bg text-rune-primary">
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center rounded-none">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div className="space-y-2 max-w-md">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-red-400 font-bold block">
              APPLICATION RUNTIME EXCEPTION
            </span>
            <h1 className="font-serif text-rune-primaryxl font-bold uppercase text-rune-primary tracking-wider">
              SOMETHING WENT WRONG
            </h1>
            <p className="text-xs font-sans text-rune-secondary leading-relaxed">
              An unhandled rendering exception occurred. The error details have been logged for inspection.
            </p>
          </div>
          <Button onClick={() => window.location.reload()}>RELOAD APPLICATION</Button>
        </div>
      );
    }

    return this.props.children;
  }
}
