const REGIONAL_DISTRICTS = {
    "HK": [
        { en: "Central and Western", zh: "中西區", cn: "中西区", jp: "中西区" },
        { en: "Wan Chai", zh: "灣仔區", cn: "湾仔区", jp: "湾仔区" },
        { en: "Eastern", zh: "東區", cn: "东区", jp: "東区" },
        { en: "Southern", zh: "南區", cn: "南区", jp: "南区" },
        { en: "Yau Tsim Mong", zh: "油尖旺區", cn: "油尖旺区", jp: "油尖旺区" },
        { en: "Sham Shui Po", zh: "深水埗區", cn: "深水埗区", jp: "深水埗区" },
        { en: "Kowloon City", zh: "九龍城區", cn: "九龙城区", jp: "九龍城区" },
        { en: "Wong Tai Sin", zh: "黃大仙區", cn: "黄大仙区", jp: "黄大仙区" },
        { en: "Kwun Tong", zh: "觀塘區", cn: "观塘区", jp: "観塘区" },
        { en: "Kwai Tsing", zh: "葵青區", cn: "葵青区", jp: "葵青区" },
        { en: "Tsuen Wan", zh: "荃灣區", cn: "荃湾区", jp: "荃湾区" },
        { en: "Tuen Mun", zh: "屯門區", cn: "屯门区", jp: "屯門区" },
        { en: "Yuen Long", zh: "元朗區", cn: "元朗区", jp: "元朗区" },
        { en: "North", zh: "北區", cn: "北区", jp: "北区" },
        { en: "Tai Po", zh: "大埔區", cn: "大埔区", jp: "大埔区" },
        { en: "Sha Tin", zh: "沙田區", cn: "沙田区", jp: "沙田区" },
        { en: "Sai Kung", zh: "西貢區", cn: "西贡区", jp: "西貢区" },
        { en: "Islands", zh: "離島區", cn: "离岛区", jp: "離島区" }
    ],
    "JP": [
        { en: "Chiyoda (Tokyo)", zh: "千代田區 (東京)", cn: "千代田区 (东京)", jp: "千代田区 (東京)" },
        { en: "Chuo (Tokyo)", zh: "中央區 (東京)", cn: "中央区 (东京)", jp: "中央区 (東京)" },
        { en: "Minato (Tokyo)", zh: "港區 (東京)", cn: "港区 (东京)", jp: "港区 (東京)" },
        { en: "Shinjuku (Tokyo)", zh: "新宿區 (東京)", cn: "新宿区 (东京)", jp: "新宿区 (東京)" },
        { en: "Bunkyo (Tokyo)", zh: "文京區 (東京)", cn: "文京区 (东京)", jp: "文京区 (東京)" },
        { en: "Taito (Tokyo)", zh: "台東區 (東京)", cn: "台东区 (东京)", jp: "台東区 (東京)" },
        { en: "Sumida (Tokyo)", zh: "墨田區 (東京)", cn: "墨田区 (东京)", jp: "墨田区 (東京)" },
        { en: "Koto (Tokyo)", zh: "江東區 (東京)", cn: "江东区 (东京)", jp: "江東区 (東京)" },
        { en: "Shinagawa (Tokyo)", zh: "品川區 (東京)", cn: "品川区 (东京)", jp: "品川区 (東京)" },
        { en: "Meguro (Tokyo)", zh: "目黑區 (東京)", cn: "目黑区 (东京)", jp: "目黒区 (東京)" },
        { en: "Ota (Tokyo)", zh: "大田區 (東京)", cn: "大田区 (东京)", jp: "大田区 (東京)" },
        { en: "Setagaya (Tokyo)", zh: "世田谷區 (東京)", cn: "世田谷区 (东京)", jp: "世田谷区 (東京)" },
        { en: "Shibuya (Tokyo)", zh: "澀谷區 (東京)", cn: "涩谷区 (东京)", jp: "渋谷区 (東京)" },
        { en: "Nakano (Tokyo)", zh: "中野區 (東京)", cn: "中野区 (东京)", jp: "中野区 (東京)" },
        { en: "Suginami (Tokyo)", zh: "杉並區 (東京)", cn: "杉并区 (东京)", jp: "杉並区 (東京)" },
        { en: "Toshima (Tokyo)", zh: "豐島區 (東京)", cn: "丰岛区 (东京)", jp: "豊島区 (東京)" },
        { en: "Kita (Tokyo)", zh: "北區 (東京)", cn: "北区 (东京)", jp: "北区 (東京)" },
        { en: "Arakawa (Tokyo)", zh: "荒川區 (東京)", cn: "荒川区 (东京)", jp: "荒川区 (東京)" },
        { en: "Itabashi (Tokyo)", zh: "板橋區 (東京)", cn: "板桥区 (东京)", jp: "板橋区 (東京)" },
        { en: "Nerima (Tokyo)", zh: "練馬區 (東京)", cn: "练马区 (东京)", jp: "練馬区 (東京)" },
        { en: "Adachi (Tokyo)", zh: "足立區 (東京)", cn: "足立区 (东京)", jp: "足立区 (東京)" },
        { en: "Katsushika (Tokyo)", zh: "葛飾區 (東京)", cn: "葛饰区 (东京)", jp: "葛飾区 (東京)" },
        { en: "Edogawa (Tokyo)", zh: "江戶川區 (東京)", cn: "江戸川区 (东京)", jp: "江戸川区 (東京)" },
        { en: "Osaka City", zh: "大阪市", cn: "大阪市", jp: "大阪市" },
        { en: "Kyoto City", zh: "京都市", cn: "京都市", jp: "京都市" },
        { en: "Yokohama", zh: "橫濱", cn: "横滨", jp: "横浜" },
        { en: "Fukuoka", zh: "福岡", cn: "福冈", jp: "福岡" }
    ],
    "USA": [
        { en: "New York, NY", zh: "紐約", cn: "纽约", jp: "ニューヨーク" },
        { en: "Los Angeles, CA", zh: "洛杉磯", cn: "洛杉矶", jp: "ロサンゼルス" },
        { en: "San Francisco, CA", zh: "三藩市", cn: "旧金山", jp: "サンフランシスコ" },
        { en: "Seattle, WA", zh: "西雅圖", cn: "西雅图", jp: "シアトル" },
        { en: "Miami, FL", zh: "邁阿密", cn: "迈阿密", jp: "マイアミ" },
        { en: "Chicago, IL", zh: "芝加哥", cn: "芝加哥", jp: "シカゴ" },
        { en: "Houston, TX", zh: "侯斯頓", cn: "休斯敦", jp: "ヒューストン" },
        { en: "Boston, MA", zh: "波士頓", cn: "波士顿", jp: "ボストン" }
    ],
    "China": [
        { en: "Beijing", zh: "北京", cn: "北京", jp: "北京" },
        { en: "Shanghai", zh: "上海", cn: "上海", jp: "上海" },
        { en: "Shenzhen", zh: "深圳", cn: "深圳", jp: "深セン" },
        { en: "Guangzhou", zh: "廣州", cn: "广州", jp: "広州" },
        { en: "Hangzhou", zh: "杭州", cn: "杭州", jp: "杭州" },
        { en: "Chengdu", zh: "成都", cn: "成都", jp: "成都" },
        { en: "Nanjing", zh: "南京", cn: "南京", jp: "南京" },
        { en: "Taiwan", zh: "台灣", cn: "台湾", jp: "台湾" }
    ]
};

if (typeof window !== 'undefined') {
    window.REGIONAL_DISTRICTS = REGIONAL_DISTRICTS;
}
