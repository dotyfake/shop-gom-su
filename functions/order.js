const { Client } = require('@notionhq/client');
const { NOTION_KEY, NOTION_ORDER_DB } = process.env;
const notion = new Client({
    auth: NOTION_KEY,
});

exports.handler = async (event) => {
    const form = JSON.parse(event.body);

    const { name, phone, address, note, cart } = form;
    const cartProducts = cart.map((item) => {
        return { counter: item.counter, price: item.price, id: item.newProduct };
    });
    const firstChildren = [
        {
            type: 'table_row',
            table_row: {
                cells: [
                    [
                        {
                            type: 'text',
                            text: {
                                content: 'Số thứ tự',
                                link: null,
                            },
                            annotations: {
                                bold: false,
                                italic: false,
                                strikethrough: false,
                                underline: false,
                                code: false,
                                color: 'default',
                            },
                            plain_text: 'header stt',
                            href: null,
                        },
                    ],
                    [
                        {
                            type: 'text',
                            text: {
                                content: 'Tên sản phẩm',
                                link: null,
                            },
                            annotations: {
                                bold: false,
                                italic: false,
                                strikethrough: false,
                                underline: false,
                                code: false,
                                color: 'default',
                            },
                            plain_text: 'name',
                            href: null,
                        },
                    ],
                    [
                        {
                            type: 'text',
                            text: {
                                content: 'Số lượng',
                                link: null,
                            },
                            annotations: {
                                bold: false,
                                italic: false,
                                strikethrough: false,
                                underline: false,
                                code: false,
                                color: 'default',
                            },
                            plain_text: 'counter',
                            href: null,
                        },
                    ],
                    [
                        {
                            type: 'text',
                            text: {
                                content: 'Đơn giá',
                                link: null,
                            },
                            annotations: {
                                bold: false,
                                italic: false,
                                strikethrough: false,
                                underline: false,
                                code: false,
                                color: 'default',
                            },
                            plain_text: 'price',
                            href: null,
                        },
                    ],
                    [
                        {
                            type: 'text',
                            text: {
                                content: 'Tổng tiền',
                                link: null,
                            },
                            annotations: {
                                bold: false,
                                italic: false,
                                strikethrough: false,
                                underline: false,
                                code: false,
                                color: 'default',
                            },
                            plain_text: 'sum price',
                            href: null,
                        },
                    ],
                ],
            },
        },
    ];

    let sumPrice = 0;

    const result = cartProducts.reduce((childrens, curr, i) => {
        sumPrice += curr.counter * curr.price;
        return [
            ...childrens,
            {
                type: 'table_row',
                table_row: {
                    cells: [
                        [
                            {
                                type: 'text',
                                text: {
                                    content: `${i + 1}`,
                                    link: null,
                                },
                                annotations: {
                                    bold: false,
                                    italic: false,
                                    strikethrough: false,
                                    underline: false,
                                    code: false,
                                    color: 'default',
                                },
                                plain_text: 'stt',
                                href: null,
                            },
                        ],
                        [
                            {
                                type: 'mention',
                                mention: {
                                    type: 'page',
                                    page: {
                                        id: `${curr.id}`,
                                    },
                                },
                                annotations: {
                                    bold: false,
                                    italic: false,
                                    strikethrough: false,
                                    underline: false,
                                    code: false,
                                    color: 'default',
                                },
                                plain_text: 'name',
                                href: null,
                            },
                        ],
                        [
                            {
                                type: 'text',
                                text: {
                                    content: `${curr.counter}`,
                                    link: null,
                                },
                                annotations: {
                                    bold: false,
                                    italic: false,
                                    strikethrough: false,
                                    underline: false,
                                    code: false,
                                    color: 'default',
                                },
                                plain_text: 'counter',
                                href: null,
                            },
                        ],
                        [
                            {
                                type: 'text',
                                text: {
                                    content: `${curr.price.toLocaleString()} vnđ`,
                                    link: null,
                                },
                                annotations: {
                                    bold: false,
                                    italic: false,
                                    strikethrough: false,
                                    underline: false,
                                    code: false,
                                    color: 'default',
                                },
                                plain_text: 'price',
                                href: null,
                            },
                        ],
                        [
                            {
                                type: 'text',
                                text: {
                                    content: `${(curr.counter * curr.price).toLocaleString()} vnđ`,
                                    link: null,
                                },
                                annotations: {
                                    bold: false,
                                    italic: false,
                                    strikethrough: false,
                                    underline: false,
                                    code: false,
                                    color: 'default',
                                },
                                plain_text: 'sum price',
                                href: null,
                            },
                        ],
                    ],
                },
            },
        ];
    }, firstChildren);

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
                                content: `Đơn hàng: ${name}`,
                            },
                        },
                    ],
                },
                FullName: {
                    rich_text: [
                        {
                            text: {
                                content: name,
                            },
                        },
                    ],
                },
                Address: {
                    rich_text: [
                        {
                            text: {
                                content: address,
                            },
                        },
                    ],
                },
                Note: {
                    rich_text: [
                        {
                            text: {
                                content: note,
                            },
                        },
                    ],
                },
                Phone: {
                    number: phone,
                },
                SumPrice: {
                    number: sumPrice,
                },
                Status: {
                    select: {
                        name: `Pending`,
                    },
                },
            },
            children: [
                {
                    object: 'block',
                    type: 'heading_1',
                    heading_1: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: `Thông tin khách hàng`,
                                },
                            },
                        ],
                    },
                },
                {
                    object: 'block',
                    type: 'paragraph',
                    paragraph: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: `Họ và tên: ${name}`,
                                },
                            },
                        ],
                    },
                },
                {
                    object: 'block',
                    type: 'paragraph',
                    paragraph: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: `Số điện thoại: ${phone}`,
                                },
                            },
                        ],
                    },
                },
                {
                    object: 'block',
                    type: 'paragraph',
                    paragraph: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: `Địa chỉ: ${address}`,
                                },
                            },
                        ],
                    },
                },
                {
                    object: 'block',
                    type: 'paragraph',
                    paragraph: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: `Ghi chú: ${note}`,
                                },
                            },
                        ],
                    },
                },

                // {
                //     type: 'link_to_page',
                //     link_to_page: {
                //         type: 'page_id',
                //         page_id: 'e6e3d0b0-1d00-439e-b899-c61f777ba9f4',
                //     },
                // },
                {
                    type: 'table',
                    table: {
                        table_width: 5,
                        has_column_header: true,
                        has_row_header: false,
                        children: result,
                    },
                },
                {
                    object: 'block',
                    type: 'heading_2',
                    heading_2: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: `Tổng giá trị đơn hàng: ${sumPrice.toLocaleString()} vnđ`,
                                },
                            },
                        ],
                    },
                },
            ],
        });
        return {
            statusCode: 200,
        };
    } catch (error) {
        console.log(error);
    }
};
