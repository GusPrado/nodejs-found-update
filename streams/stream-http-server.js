import http from 'http';
import { Transform } from 'node:stream';

class NegativeNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    console.log(transformed);

    callback(null, Buffer.from(String(transformed)));
  }
}

// req => Readable Stream
// res => Writeable Stream

const server = http.createServer(async (req, res) => {
  const buffers = [];

  // WAIT ALL STREAM TRANSFER END TO CONSUME SYNTAX
  // USED WHEN YOU CAN`T CONSUME PARTIALLY: JSON FILES.
  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const fullStreamContent = Buffer.concat(buffers).toString();

  console.log(fullStreamContent);

  // return res.end(fullStreamContent);
  return res.end('finalizou');

  // CONSUME STREAM WHILE TRANSFERING SYNTAX
  // USED WHEN YOU CAN CONSUME PARTIALLY: VIDEOS, MUSIC, ETC.
  // return req.pipe(new NegativeNumberStream()).pipe(res);
});

server.listen(3334);
