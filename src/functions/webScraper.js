const {
  HTMLWebBaseLoader,
} = require("@langchain/community/document_loaders/web/html");
const {
  MozillaReadabilityTransformer,
} = require("@langchain/community/document_transformers/mozilla_readability");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");

const scrapePages = async (urls) => {
  const scrapedData = [];
  for (let url of urls) {
    try {
      const loader = new HTMLWebBaseLoader(url);
      const splitter = new RecursiveCharacterTextSplitter({
        maxCharacterCount: 2000,
        chunkOverlap: 200,
        separators: [
          "\n\n",
          "\n",
          " ",
          ".",
          ",",
          "\u200b",
          "\uff0c",
          "\u3001",
          "\uff0e",
          "\u3002",
          "",
        ],
      });
      const transformer = new MozillaReadabilityTransformer();
      const docs = await loader.load();
      const sequence = transformer.pipe(splitter);
      const documents = await sequence.invoke(docs);
      scrapedData.push(documents);
    } catch (error) {
      console.error(`Error scraping ${url}:`, error.message);
    }
  }
  return scrapedData;
};

module.exports = scrapePages;
