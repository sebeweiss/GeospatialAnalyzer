import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from './health.service';
import { GeneralModule } from '../general/general.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';

describe('HealthService', () => {
  let service: HealthService;
  let mod: TestingModule;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthService],
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env.dev', '.env'],
          load: [configuration],
          isGlobal: true,
        }),
        TypeOrmModule.forRoot({
          type: process.env.geospatial_analyzer_db_type,
          host: 'localhost',
          port: process.env.geospatial_analyzer_db_port,
          username: process.env.geospatial_analyzer_db_username,
          password: process.env.geospatial_analyzer_db_password,
          database: process.env.geospatial_analyzer_db_database,
          connectTimeoutMS: 10000,
          synchronize: false,
          logging: false,
        } as TypeOrmModule),
        GeneralModule,
      ],
    }).compile();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    service = module.get<HealthService>(HealthService);
    mod = module;
  });

  afterAll(async () => {
    await mod.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
