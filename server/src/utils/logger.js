import winston from 'winston';

const SENSITIVE_KEYS = ['password', 'token', 'jwt', 'secret', 'authorization', 'clientSecret', 'creditCard'];

const redactSensitive = winston.format((info) => {
  const redactObject = (obj) => {
    if (!obj || typeof obj !== 'object') return obj;
    for (const key of Object.keys(obj)) {
      if (SENSITIVE_KEYS.some((k) => key.toLowerCase().includes(k))) {
        obj[key] = '[REDACTED]';
      } else if (typeof obj[key] === 'object') {
        redactObject(obj[key]);
      }
    }
    return obj;
  };

  redactObject(info);
  return info;
});

export const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    redactSensitive(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, stack }) => {
          return `[${timestamp}] ${level}: ${message}${stack ? `\n${stack}` : ''}`;
        })
      ),
    }),
  ],
});
