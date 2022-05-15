const { Client } = require('@notionhq/client');
const { dblClick } = require('@testing-library/user-event/dist/click');
const { NOTION_KEY, NOTION_DB } = process.env;

const notion = new Client({
    auth: NOTION_KEY,
});

exports.handler = async () => {
    const myPage = await notion.databases.query({
        database_id: NOTION_DB,
        filter: {
            property: 'Tags',
            select: {
                equals: 'Live',
            },
        },
    });
    return {
        statusCode: 200,
        body: JSON.stringify(myPage),
    };
};
