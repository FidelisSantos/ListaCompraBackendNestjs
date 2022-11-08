import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
<<<<<<< HEAD
    return 'Online';
=======
    return 'Hello World!';
>>>>>>> d4a1cb7... Aplicação estável
  }
}
