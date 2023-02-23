const express = require('express')
const app = express()
const port = 3000

const { Client } = require("@notionhq/client")
const cors = require('cors')
let bodyParser = require('body-parser')
let jsonParser = bodyParser.json()

app.get('/', (req, res) => {
	res.send("geggge")
})

app.post('/submitKMI', jsonParser, async (req, res) => {
	const notion = new Client({ auth: "secret_EYPtGjpPPA7Nv1KnyYtrZv0IDLjsaYh7WllkocnrtYB"})
	const databaseId = "8d5e93850aa9413ba64d518fca5deeae"
	
	const email = req.body.email

	try {
		const response = await notion.pages.create({
			parent: {database_id: databaseId},
			properties: {
				title: {
					title: [
						{
							text: {
								content: email
							}
						}
					]
				}
			}
		})
	res.json({id: response.id});
	} catch (error) {
		console.log(error);
	}
})


app.patch('/submitKMI', jsonParser, async (req, res) => {
	const notion = new Client({ auth: "secret_EYPtGjpPPA7Nv1KnyYtrZv0IDLjsaYh7WllkocnrtYB"})
	const databaseId = "8d5e93850aa9413ba64d518fca5deeae"
	
	const pageId = req.body.pageId
	const email = req.body.email
	const age = req.body.age
	const metier = req.body.metier
	const quand = req.body.quand
	

	try {
		const response = await notion.pages.update({
			page_id: pageId,
			properties: {
				title: {
					title: [
						{
							text: {
								content: email
							}
						}
					]
				},
				age: {
					rich_text: [
						{
							text: {
								content: age
							}
						}
					]
				},
				metier: {
					rich_text: [
						{
							text: {
								content: metier
							}
						}
					]
				},
				temp_metier: {
					rich_text: [
						{
							text: {
								content: quand
							}
						}
					]
				}

			}
		})
		console.log("SUCCES");
	} catch (error) {
		console.log(error);
	}
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})