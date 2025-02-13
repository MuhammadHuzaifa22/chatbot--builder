// import modules
import axios from "axios";
import xml2js from "xml2js";

//? This function will fetch the complete sitemap of the given domain and return only the top 20 urls in the sitemap
const fetchSitemap = async (url) => {
  try {
    let sitemapURl;
    if (url.slice(-1) === "/") {
      sitemapURl = url + "sitemap.xml";
    } else {
      sitemapURl = url + "/sitemap.xml";
    }
    console.log("sitemapURl ===>>>", sitemapURl);

    const { data } = await axios.get(sitemapURl);
    const parser = new xml2js.Parser({ explicitArray: false });

    const result = await parser.parseStringPromise(data);

    let urls = [];

    if (result.urlset && result.urlset.url) {
      //* Case 1: Normal URL sitemap
      urls = result.urlset.url.map((entry) => entry.loc);
    } else if (result.sitemapindex && result.sitemapindex.sitemap) {
      //* Case 2: Index sitemap (fetch additional sitemaps)
      urls = result.sitemapindex.sitemap.map((entry) => entry.loc);
    } else {
      throw new Error("Unsupported sitemap format.");
    }

    const MAX_URLS = 20; // Set max limit
    const limitedUrls = urls.slice(0, MAX_URLS);

    return limitedUrls;
  } catch (error) {
    console.error("Error fetching sitemap:", error.message);
    return null;
  }
};


// export function
export default fetchSitemap;