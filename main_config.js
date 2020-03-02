const languages = ["en"];

const adminComponents = [
    {
        name: 'new',
        items: [
            {name: "name", type: "text", lang: true},
            {name: "caption", type: "text", lang: true},
            {name: "cover", type: "file"},
        ],
        params: {
            name: 'new',
            gotFileList: false,
            gotImagesList: false,
            adminPath: true,
            gotTypes: false,
            freeAccess: true,
            buyable: false,
            unique: true,
            types: false,
            multi_lang: true,
            langs: languages,
            filePath: "img/"
        }
    },
    {
        name: 'project',
        items: [
            {name: "name", type: "text", lang: true},
            {name: "caption", type: "text", lang: true},
            {name: "description", type: "text", lang: true},
            {name: "date", type: "text", lang: false},
        ],
        params: {
            name: 'project',
            gotFileList: false,
            gotImagesList: true,
            adminPath: true,
            gotTypes: false,
            freeAccess: true,
            buyable: false,
            unique: false,
            types: false,
            multi_lang: true,
            langs: languages,
            filePath: "img/"
        }
    },
    {
        name: 'exhibition',
        items: [
            {name: "name", type: "text", lang: true},
            {name: "caption", type: "text", lang: true},
            {name: "date", type: "text", lang: false},
            {name: "cover", type: "file"},
        ],
        params: {
            name: 'exhibition',
            gotFileList: false,
            gotImagesList: false,
            adminPath: true,
            gotTypes: false,
            freeAccess: true,
            buyable: false,
            unique: false,
            types: false,
            multi_lang: true,
            langs: languages,
            filePath: "img/"
        },
    },
    {
        name: 'collections_typologie',
        items: [
            {name: "caption", type: "text", lang: true},
            {name: "description", type: "text", lang: true},
        ],
        params: {
            name: 'collections_typologie',
            gotFileList: false,
            gotImagesList: true,
            adminPath: true,
            gotTypes: false,
            freeAccess: true,
            buyable: false,
            unique: true,
            types: false,
            multi_lang: true,
            langs: languages,
            filePath: "img/"
        }
    },
    {
        name: 'about',
        items: [
            {name: "caption", type: "text", lang: true},
        ],
        params: {
            name: 'about',
            gotFileList: false,
            gotImagesList: true,
            adminPath: true,
            gotTypes: false,
            freeAccess: true,
            buyable: false,
            unique: true,
            types: false,
            multi_lang: true,
            langs: languages,
            filePath: "img/"
        }
    },
    {
        name: 'legal_notice',
        items: [
            {name: "title", type: "text", lang: true},
            {name: "text", type: "text", lang: true},
        ],
        params: {
            name: 'legal_notice',
            gotFileList: false,
            gotImagesList: false,
            adminPath: true,
            gotTypes: false,
            freeAccess: true,
            buyable: false,
            unique: false,
            types: false,
            multi_lang: true,
            langs: languages,
            filePath: "img/"
        }
    },
    {
        name: 'color',
        items: [
            {name: "value", type: "color", lang: false},
        ],
        params: {
            name: 'color',
            gotFileList: false,
            gotImagesList: false,
            adminPath: true,
            gotTypes: false,
            freeAccess: true,
            buyable: false,
            unique: false,
            types: false,
            multi_lang: false,
            langs: languages,
            filePath: "img/"
        }
    },
];

const Onces = [
    {
        name: "title",
        entries: [
            {name: "name", lang: false},
            {name: "occupation", lang: true},
        ]
    },
    {
        name: "navbar",
        entries: [
            {name: "projects", lang: true},
            {name: "collections_typologie", lang: true},
            {name: "exhibitions", lang: true},
            {name: "about", lang: true},
        ]
    },
    {
        name: 'footer',
        entries: [
            {name: "mail_label", type: "text", lang: true},
            {name: "mail_address", type: "text", lang: false},
            {name: "instagram_label", type: "text", lang: true},
            {name: "instagram_link", type: "text", lang: false},
            {name: "newsletter_label", type: "text", lang: true},
        ],
    },
    {
        name: 'cookie',
        entries: [
            {name: "caption", type: "text", lang: true},
        ],
    },
];