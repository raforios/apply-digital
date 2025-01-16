import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      Host: 'localhost',
      Environment: 'dev',
      Status: 'available',
      ServerDateTime: new Date(),
      AvailableDatabaseConnections: 'postgres',
    };
  }
}
