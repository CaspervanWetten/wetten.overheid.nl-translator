{
    "translatorID": "[ID]",
    "label": "wetten.overheid.nl",
    "creator": "Casper van Wetten",
    "target": "^https?://www\\.wetten\\.overheid\\.nl",
    "minVersion": "3.0",
    "maxVersion": "",
    "priority": 100,
    "inRepository": true,
    "translatorType": 4,
    "browserSupport": "gcsibv",
    "lastUpdated": "2016-10-31 21:35:41"
    }

    /*
	***** BEGIN LICENSE BLOCK *****

	InView Essentials Translator, Copyright © 2023 Casper van Wetten
	This file is part of Zotero.

	Zotero is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	Zotero is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with Zotero. If not, see <http://www.gnu.org/licenses/>.

	***** END LICENSE BLOCK *****
*/

function detectWeb(doc, url) {
	if (url.includes("wetten.overheid.nl/BWBR")) {
		return "statute";
	}
	return false;
}

function scrape(url) {

}

function doWeb(doc, url) {
	var newItem = new Zotero.Item("statute");

	item.title = 	


	item.complete();
}