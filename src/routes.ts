import { Routes } from '@nestjs/core';
export const routes: Routes = [
  {
    path: '/api',
    children: [
      // { path: '/users', module: UsersModule },
    ],
  },
];
