if (process.env.NODE_ENV === 'development') {
  console.log('本地模式，mock 接口请求');
  require('./_mock');
}

export * from './user';
export * from './app';
export * from './common';
