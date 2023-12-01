{
	"translatorID": "6f5cd8d6-0de9-4d61-9e62-50c078c6dfd3",
	"label": "wetten.overheid.nl",
	"creator": "Casper van Wetten",
	"target": "^https?://wetten\\.overheid\\.nl/",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2023-12-01 17:21:25"
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

function doWeb(doc, url) {
	var metaUrl = url.match(/https?:\/\/wetten.overheid.nl\/BWBR[0-9]*\/[0-9]{4}-[0-9]{2}-[0-9]{2}/)[0] + "/0/informatie"; 
	ZU.doGet(metaUrl, scrape)
}

function scrape(respString, respObject, url) {
	var newItem = new Zotero.Item("statute");
	var parsed = stringToHtml(respString)
	
	var title = parsed.getElementsByTagName("h1")[0].textContent
	if (title.match(/W?w?et?![boek]/)) {title = "de " + title}
	if (title.match(/B?b?oek/)) {title = "het " + title}
	Z.debug(title)
	if (title.match(/Burgerlijk/)) { title = title.replace(/(.*)(\sBoek \d+)/, "$2 van $1");}
	newItem.title = title
	newItem.dateEnacted = url.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)[0];
	newItem.url = url.replace(/.{13}$/, '')
	//If there is a short title, go and get it
	var afkorting = parsed.querySelector("td[data-before='Afkortingen'], td[data-before='Afkorting']").textContent
	if (afkorting != "Geen") { newItem.shortTitle = afkorting}

	//Get the creator
	// newItem.authority = respString.match(/Eerstverantwoordelijke\s*.*">([a-zA-Z\s]*)/)[1]

	//Get law-family
	var li = parsed.getElementById("Wetsfamilie").nextElementSibling.getElementsByTagName("li")
	var tags = []
	for (var i = 0; i < li.length; i++) {
		if (li[i].textContent != parsed.getElementsByTagName("h1")[0].textContent) {
			tags.push(li[i].textContent);
		}
	}
	newItem.tags = tags
	newItem.complete()
}


function stringToHtml(str) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(str, 'text/html');
	return doc;
};
/** BEGIN TEST CASES **/
var testCases = [
	{
		"type": "web",
		"url": "https://wetten.overheid.nl/BWBR0044773/2022-07-15",
		"items": [
			{
				"itemType": "statute",
				"nameOfAct": "Besluit kansspelen op afstand",
				"creators": [],
				"dateEnacted": "2022-07-15",
				"url": "https://wetten.overheid.nl/BWBR0044773/2022-07-15",
				"attachments": [],
				"tags": [
					{
						"tag": "Wet justitiële en strafvorderlijke gegevens"
					},
					{
						"tag": "Wet op de kansspelen"
					},
					{
						"tag": "Wet politiegegevens"
					},
					{
						"tag": "Wet ter voorkoming van witwassen en financieren van terrorisme"
					}
				],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://wetten.overheid.nl/BWBR0001886/2022-10-01",
		"items": [
			{
				"itemType": "statute",
				"nameOfAct": "Auteurswet",
				"creators": [],
				"dateEnacted": "2022-10-01",
				"shortTitle": "Aw",
				"url": "https://wetten.overheid.nl/BWBR0001886/2022-10-01",
				"attachments": [],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://wetten.overheid.nl/BWBR0002656/2023-07-01",
		"items": [
			{
				"itemType": "statute",
				"nameOfAct": "Burgerlijk Wetboek Boek 1",
				"creators": [],
				"dateEnacted": "2023-07-01",
				"shortTitle": "BW",
				"url": "https://wetten.overheid.nl/BWBR0002656/2023-07-01",
				"attachments": [],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://wetten.overheid.nl/BWBR0001840/2023-02-22",
		"items": [
			{
				"itemType": "statute",
				"nameOfAct": "Grondwet",
				"creators": [],
				"dateEnacted": "2023-02-22",
				"shortTitle": "GW",
				"url": "https://wetten.overheid.nl/BWBR0001840/2023-02-22",
				"attachments": [],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://wetten.overheid.nl/BWBR0005537/2023-08-01/0#Hoofdstuk8_Titeldeel8.1_Afdeling8.1.3_Artikel8:13a",
		"items": [
			{
				"itemType": "statute",
				"nameOfAct": "Algemene wet bestuursrecht",
				"creators": [],
				"dateEnacted": "2023-08-01",
				"shortTitle": "Awb",
				"url": "https://wetten.overheid.nl/BWBR0005537/2023-08-01",
				"attachments": [],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://wetten.overheid.nl/BWBR0001903/2023-10-01/0#BoekEerste_TiteldeelI_AfdelingVierde_Artikel12l",
		"items": [
			{
				"itemType": "statute",
				"nameOfAct": "het Wetboek van Strafvordering",
				"creators": [],
				"dateEnacted": "2023-10-01",
				"shortTitle": "Sv",
				"url": "https://wetten.overheid.nl/BWBR0001903/2023-10-01",
				"attachments": [],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://wetten.overheid.nl/BWBR0005288/2023-05-01/0#Boek5_Titeldeel6_Artikel83",
		"items": [
			{
				"itemType": "statute",
				"nameOfAct": "Boek 5 van het Burgerlijk Wetboek",
				"creators": [],
				"dateEnacted": "2023-05-01",
				"shortTitle": "BW",
				"url": "https://wetten.overheid.nl/BWBR0005288/2023-05-01",
				"attachments": [],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	}
]
/** END TEST CASES **/
