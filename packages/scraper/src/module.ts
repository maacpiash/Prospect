/*
 * Prospect: Read the latest posts from popular coding blogs at one place
 * Copyright (C) 2020  Mohammad Abdul Ahad Chowdhury
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import {
  Controller,
  Get,
  HttpModule,
  HttpService,
  Injectable,
  Module,
  Query,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { AxiosResponse } from 'axios'
import { load } from 'cheerio'

class QueryModel {
  url?: string
  selector?: string
}

function isValid<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined
}

@Injectable()
export class ParserService {
  constructor(private httpService: HttpService) {}

  find(url: string): Observable<AxiosResponse<CheerioElement>> {
    return this.httpService.get(url)
  }
}

@Controller('rest')
class ParserController {
  constructor(private readonly parser: ParserService) {}

  @Get()
  async findAll(@Query() query: QueryModel): Promise<any[]> {
    const { selector, url } = query
    if (!isValid(selector) || !isValid(url)) return []
    const { data } = await this.parser.find(url).toPromise()
    const $ = load(data) as CheerioStatic
    const links: (string | undefined)[] = []
    $(selector).each((_, link) => links.push($(link).attr('href')))
    return links.filter(isValid)
  }
}

@Module({
  imports: [HttpModule],
  controllers: [ParserController],
  providers: [ParserService],
})
export class ParserModule {}
