import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiResponse,
  ApiTags,
  getSchemaPath,
  ApiOperation,
} from '@nestjs/swagger';
import { EsriJsonDto } from '../general/dto/esri-json.dto';
import { GeoJSONFeatureDto } from '../general/dto/geo-json.dto';
import {
  IntersectParameterDto,
  SCHEMA_VALID_OUT_SRS,
} from '../general/dto/parameter.dto';
import { TopicDefinitonOutsideDto } from '../general/dto/topic-definiton-outside.dto';
import { HTTP_STATUS_SQL_TIMEOUT } from '../general/general.constants';
import { topicDefinitionOutside } from '../general/general.interface';
import { IntersectService } from './intersect.service';

@ApiTags('Intersect')
@Controller({
  version: '1',
})
@Controller('intersect')
@ApiExtraModels(IntersectParameterDto, EsriJsonDto, GeoJSONFeatureDto)
export class IntersectController {
  constructor(private readonly intersectService: IntersectService) {}

  @ApiResponse({
    status: 200,
    description: 'Shows all attributes and parameters available ',
    type: TopicDefinitonOutsideDto,
    isArray: true,
  })
  @ApiOperation({ summary: 'Output all the possible intersect topics' })
  @Get('intersect/topics')
  topic(): topicDefinitionOutside[] {
    return this.intersectService.getTopics();
  }

  @ApiBody({
    schema: {
      allOf: [
        { $ref: getSchemaPath(IntersectParameterDto) },
        SCHEMA_VALID_OUT_SRS,
      ],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Calculates the intersections',
    content: {
      'application/json': {
        schema: {
          anyOf: [
            { type: 'array', items: { $ref: getSchemaPath(EsriJsonDto) } },
            {
              type: 'array',
              items: { $ref: getSchemaPath(GeoJSONFeatureDto) },
            },
          ],
        },
      },
    },
  })
  @ApiResponse({
    status: HTTP_STATUS_SQL_TIMEOUT,
    description:
      'The request is too complex to be processed in a timely manner (currently).',
  })
  @HttpCode(200)
  @ApiOperation({
    summary:
      'Return all features that are intersected by the transferred geometries',
  })
  @Post('intersect')
  async intersect(
    @Body() args: IntersectParameterDto,
  ): Promise<GeoJSONFeatureDto[] | EsriJsonDto[]> {
    return await this.intersectService.handleRequest(args);
  }
}
