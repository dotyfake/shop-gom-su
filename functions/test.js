const { Client } = require('@notionhq/client');
const { NOTION_KEY, NOTION_ORDER_DB } = process.env;
const notion = new Client({
    auth: NOTION_KEY,
});

exports.handler = async (event) => {
    const data = JSON.parse(event.body);
    const response = await notion.databases.query({
        database_id: NOTION_ORDER_DB,
        filter: {
            property: 'ID',
            rich_text: {
                contains: `${data.id}`,
            },
        },
    });
    return {
        statusCode: 200,
        body: JSON.stringify(response),
    };
};
