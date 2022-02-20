import convertImage from '../utilites/imageProcessing';

describe('should convert input images', () => {
  it('should fail if one mandatory params not sent', async () => {
    const missingParam = await convertImage(200, 200, '');
    expect(missingParam).toBeFalsy();
  });
  it('should fail if image not found', async () => {
    const noImageDirectory = await convertImage(200, 200, 'testa');
    expect(noImageDirectory).toBeFalsy();
  });
  it('should pass if image is found and converted', async () => {
    const fullParam = await convertImage(200, 200, 'test');
    expect(fullParam).toBeTruthy();
  });
});
