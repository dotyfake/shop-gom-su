const { Client } = require("@notionhq/client")
const {NOTION_KEY, NOTION_NEWS_DB} = process.env

const notion = new Client({
  auth: NOTION_KEY,
})

exports.handler = async () => {
    const db = await notion.databases.query({
        database_id: NOTION_NEWS_DB,
        filter: {
          property: 'Tags',
          select: {
            equals: 'News Live',
          },
        },
      })
      return {
        statusCode: 200,
        body: JSON.stringify(db)
      }

}