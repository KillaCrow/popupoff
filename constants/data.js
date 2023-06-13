// list of websites where prevent content feature enabled by default
const defPreventContArr = [
	"www.economist.com",
	"www.reviewjournal.com",
	"www.bostonglobe.com",
	"www.theguardian.com",
	"www.theladders.com",
];

// other default settings
const defWebsites = {
	"a.goodtime.io": "whitelist",
	"about.google": "whitelist",
	"app.hubspot.com": "whitelist",
	"cal.mixmax.com": "whitelist",
	"calendar.google.com": "whitelist",
	"catalog.onliner.by": "whitelist",
	"cloud.google.com": "whitelist",
	"docs.google.com": "whitelist",
	"drive.google.com": "whitelist",
	"e-dostavka.by": "whitelist",
	"hangouts.google.com": "whitelist",
	"mail.google.com": "whitelist",
	"music.yandex.com": "whitelist",
	"music.yandex.ru": "whitelist",
	"music.youtube.com": "whitelist",
	"open.spotify.com": "whitelist",
	"romanisthere.github.io": "whitelist",
	"support.google.com": "whitelist",
	"trello.com": "whitelist",
	"twitter.com": "whitelist",
	"vk.com": "whitelist",
	"vk.ru": "whitelist",
	"web.telegram.org": "whitelist",
	"www.amazon.co.uk": "whitelist",
	"www.amazon.com": "whitelist",
	"www.baidu.com": "whitelist",
	"www.bing.com": "whitelist",
	"www.facebook.com": "whitelist",
	"www.google.com": "whitelist",
	"www.inspera.com": "whitelist",
	"www.instagram.com": "whitelist",
	"www.linkedin.com": "whitelist",
	"www.netflix.com": "whitelist",
	"www.onliner.by": "whitelist",
	"www.pinterest.com": "whitelist",
	"www.reddit.com": "whitelist",
	"www.spotify.com": "whitelist",
	"www.walmart.com": "whitelist",
	"www.youtube.com": "whitelist",
	"zoom.us": "whitelist",
	"store.steampowered.com": "whitelist",
	"www.hackerrank.com": "whitelist",
	"www.coursera.org": "whitelist",
	"azure.microsoft.com": "whitelist",
	"store.google.com": "whitelist",
	"www.oneplus.com": "whitelist",
	"smallpdf.com": "whitelist",
	"www.upwork.com": "whitelist",
	"www.docusign.com": "whitelist",
	"account.docusign.com": "whitelist",
	"go.docusign.com": "whitelist",
	"app.docusign.com": "whitelist",
	"app.hellosign.com": "whitelist",
	"www.oysho.com": "whitelist",
	"www.zara.com": "whitelist",
	"www.nike.com": "whitelist",
	"www.adidas.com": "whitelist",
	"www.adidas.co.uk": "whitelist",
	"www.reebok.co.uk": "whitelist",
	"www.reebok.com": "whitelist",
	"www.newbalance.com": "whitelist",
	"www.newbalance.co.uk": "whitelist",
	"eu.puma.com": "whitelist",
	"us.puma.com": "whitelist",
	"www.lacoste.com": "whitelist",
	"www.armani.com": "whitelist",
	"www.hugoboss.com": "whitelist",
	"www.calvinklein.co.uk": "whitelist",
	"www.calvinklein.de": "whitelist",
	"www.victoriassecret.com": "whitelist",
	"l.macys.com": "whitelist",
	"www.jcpenney.com": "whitelist",
	"www.dillards.com": "whitelist",
	"oldnavy.gap.com": "whitelist",
	"www.gap.co.uk": "whitelist",
	"www.gap.com": "whitelist",
	"www2.hm.com": "whitelist",
	"www.hm.com": "whitelist",
	"www.childrensplace.com": "whitelist",
	"www.carters.com": "whitelist",
	"www.zarahome.com": "whitelist",
	"www.walmart.com": "whitelist",
	"www.ebay.co.uk": "whitelist",
	"www.ebay.com": "whitelist",
	"www.target.com": "whitelist",
	"www.bestbuy.com": "whitelist",
	"www.costco.com": "whitelist",
	"www.lowes.com": "whitelist",
	"www.homedepot.com": "whitelist",
	"www.walgreens.com": "whitelist",
	"www.samsclub.com": "whitelist",
	"www.kohls.com": "whitelist",
	"www.ae.com": "whitelist",
	"www.forever21.com": "whitelist",
	"www.lasenza.com": "whitelist",
	"www.bathandbodyworks.com": "whitelist",
	"www.levi.com": "whitelist",
	"eu.wrangler.com": "whitelist",
	"www.wrangler.com": "whitelist",
	"www.massimodutti.com": "whitelist",
	"uk.tommy.com": "whitelist",
	"www.pullandbear.com": "whitelist",
	"shop.mango.com": "whitelist",
	"www.c-and-a.com": "whitelist",
	"www.bershka.com": "whitelist",
	"www.stradivarius.com": "whitelist",
	"www.guess.eu": "whitelist",
	"www.guess.com": "whitelist",
	"www.dolcegabbana.com": "whitelist",
	"www.gucci.com": "whitelist",
	"www.prada.com": "whitelist",
	"www.louisvuitton.com": "whitelist",
	"www.armaniexchange.com": "whitelist",
	"www.dior.com": "whitelist",
	"www.ralphlauren.co.uk": "whitelist",
	"www.ralphlauren.com": "whitelist",
	"www.samsung.com": "whitelist",
	"www.huawei.com": "whitelist",
	"consumer.huawei.com": "whitelist",
	"www.motorola.com": "whitelist",
	"www.motorola.co.uk": "whitelist",
	"www.sony.net": "whitelist",
	"www.panasonic.com": "whitelist",
	"www.lenovo.com": "whitelist",
	"www.siemens.com": "whitelist",
	"www.bosch.com": "whitelist",
	"www.sony.co.uk": "whitelist",
	"www.sony.com": "whitelist",
	"www.asus.com": "whitelist",
	"www.mi.com": "whitelist",
	"www.apple.com": "whitelist",
	"www.lg.com": "whitelist",
	"www.realme.com": "whitelist",
	"www.vivo.com": "whitelist",
	"lolesports.com": "whitelist",
	"aliexpress.ru": "whitelist",
	"www.aliexpress.com": "whitelist",
	"localhost:4200": "whitelist",
	"localhost:3000": "whitelist",
	"localhost:8000": "whitelist",
	"localhost:5000": "whitelist",
	"localhost:8080": "whitelist",
	// moderate by default
	"www.economist.com": "easyModeActive",
	"www.reviewjournal.com": "easyModeActive",
	"www.bostonglobe.com": "easyModeActive",
	"www.theguardian.com": "easyModeActive",
	"www.theladders.com": "easyModeActive",
};

export { defWebsites, defPreventContArr };
