const { Client } = require('@notionhq/client');
const { NOTION_KEY, NOTION_ORDER_DB } = process.env;
const express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var app = express();

const notion = new Client({
    auth: NOTION_KEY,
});

exports.handler = async (event) => {
    app.post('http://localhost:8888/.netlify/functions/OrderAPI', jsonParser, async (req, res) => {
        const name = req.body.name;
        const text = req.body.text;
        try {
            const response = await notion.pages.create({
                parent: {
                    database_id: NOTION_ORDER_DB,
                },
                properties: {
                    Name: {
                        title: [
                            {
                                text: {
                                    content: name,
                                },
                            },
                        ],
                    },
                    Text: {
                        rich_text: [
                            {
                                text: {
                                    content: text,
                                },
                            },
                        ],
                    },
                },
            });
            console.log(response);
            return {
                statusCode: 200,
            };
        } catch (error) {
            console.log(error);
        }
    });
};
