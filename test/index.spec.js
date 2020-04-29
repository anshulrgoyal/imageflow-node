const addon = require('..');

describe('basic', () => {

  it('should get the version string', () => {
    expect(typeof addon.getLongVersionString()).toEqual('string');
  });

  it('should create a context', () => {
    let job = new addon.JobContext()

    expect(typeof job).toEqual('object');
  });

  it('should allow input bytes to be added and image width to be queried', () => {
    let job = new addon.JobContext()
    let array = new Uint8Array(
      [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52, 0x00,
       0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x08, 0x06, 0x00, 0x00, 0x00, 0x1F, 0x15, 0xC4, 0x89, 0x00,
       0x00, 0x00, 0x0A, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9C, 0x63, 0x00, 0x01, 0x00, 0x00, 0x05, 0x00, 0x01,
       0x0D, 0x0A, 0x2D, 0xB4, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82 ]);

    let slice = array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset)

    job.addInputBytesCopied(0, slice);

    let result = JSON.parse(job.message("v0.1/get_image_info", JSON.stringify({io_id: 0})));
    expect(result.success).toEqual(true);
    expect(result.code).toEqual(200);
    expect(result.data.image_info.image_width).toEqual(1);
  });

//  it('should allow image to be upscaled', () => {
//    let job = new addon.JobContext()
//    let array = new Uint8Array(
//      [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52, 0x00,
//       0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x08, 0x06, 0x00, 0x00, 0x00, 0x1F, 0x15, 0xC4, 0x89, 0x00,
//       0x00, 0x00, 0x0A, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9C, 0x63, 0x00, 0x01, 0x00, 0x00, 0x05, 0x00, 0x01,
//       0x0D, 0x0A, 0x2D, 0xB4, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82 ]);
//
//    let slice = array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset)
//    job.addInputBytesCopied(0, slice);
//    job.addOutputBuffer(1);
//
//    let result = JSON.parse(job.message("v0.1/execute", JSON.stringify({io_id: 0})));
//    expect(result.success).toEqual(true);
//    expect(result.code).toEqual(200);
//    expect(result.data.image_info.image_width).toEqual(1);
//  });



//  it('should get dir size', () => {
//    expect(typeof addon.dirSize(__dirname)).toEqual('string');
//  });
//
//  it('should fail if dir not given', () => {
//    expect(() => {
//      addon.dirSize();
//    }).toThrow();
//  });
});
