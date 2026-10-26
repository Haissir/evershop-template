import bodyParser from 'body-parser';

// EverShop 2.x: each API route declares its own JSON body parser
export default (request, response, next) => {
  bodyParser.json({ inflate: false })(request, response, next);
};
