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
import { toJson } from 'rss-converter'
import IPost from './IPost'

export default async function getLinks() {
  return await toJson('https://devblogs.microsoft.com/landingpage')
}

getLinks().then(feed => feed.items.forEach((post: IPost) => console.log(post.title)))
