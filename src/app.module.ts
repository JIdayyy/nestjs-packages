import { Module } from '@nestjs/common';
import { MinioModule } from './libs';

@Module({
  imports: [MinioModule],
})
export class AppModule {}
