import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import * as path from 'path';
import { GrantsModule } from './modules/grants/grants.module';

@Module({
  imports: [
    GrantsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
  ],
})
export class AppModule {}
