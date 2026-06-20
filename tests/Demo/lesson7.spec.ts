import {expect, test} from '@playwright/test';
import path from 'path';
import fs from 'fs';

test.describe('Drag and Drop File Upload', () => {

  test('Upload file', async ({page}) => {
    // Test implementation here
    await page.goto('https://the-internet.herokuapp.com/upload');

    //Tạo nội dung file bằng buffer
    const csvContent = [
      'Name,Email,Phone',
      'John Doe,john.doe@example.com,123-456-7890',
      'Jane Smith,jane@example.com,987-654-3210',
    ].join('\n');

    // Tạo buffer từ nội dung CSV
    const fileBuffer = Buffer.from(csvContent, 'utf-8');

    //Tải file lên bằng setInputfiles
    await page.locator('#file-upload').setInputFiles({
      name: 'contacts.csv',
      mimeType: 'text/csv',
      buffer: fileBuffer,
    });

    // click vào nút submit
    await page.click('#file-submit');

    //Kiểm tra kết quả sau khi upload
    await expect(page.locator('.example')).toContainText('File Uploaded!');
    await expect(page.locator('#uploaded-files')).toContainText('contacts.csv');

  }),

  test('Download → Verify → Re-Upload', async ({page}) => {
    await page.goto('https://demoqa.com/upload-download');

    //promise download file
    const downloadPromise = page.waitForEvent('download');
    await page.locator('#downloadButton').click();
    const download = await downloadPromise;
     
    //Lưu file vào thư mục tạm thời
    const savedFilePath = path.resolve('./downloads', download.suggestedFilename());
    await download.saveAs(savedFilePath);

    // Verify file thực sự tồn tại trên disk
    expect(fs.existsSync(savedFilePath)).toBeTruthy();

    //upload lại file vừa tải
    await page.locator('#uploadFile').setInputFiles(savedFilePath);

    // Kiểm tra tên file sau khi upload
    const uploadedFilePath = await page.locator('#uploadedFilePath').textContent();
    expect(uploadedFilePath).toContain(download.suggestedFilename());

    // Cleanup
    fs.unlinkSync(savedFilePath);

  });

  test('Drag & Drop Reorder List ', async ({page}) => {
    await page.goto('https://demoqa.com/sortable');

      const listTab = page.locator('#demo-tabpane-list');
      // Lấy item cần kéo và item đích
      const source = listTab.locator('.list-group-item.list-group-item-action', { hasText: 'One' });
      const target = listTab.locator('.list-group-item.list-group-item-action', { hasText: 'Six' });

      // Lấy text trước khi kéo để verify
      const itemsBefore = await listTab.locator('.list-group-item.list-group-item-action').allTextContents();
      console.log('Trước khi kéo:', itemsBefore);

      // Lấy tọa độ 2 element
      const sourceBox = await source.boundingBox();
      const targetBox = await target.boundingBox();
      if (!sourceBox || !targetBox) throw new Error('Không tìm thấy element');

      // Di chuyển chuột đến vị trí source
      await page.mouse.move(
        sourceBox.x + sourceBox.width / 2,
        sourceBox.y + sourceBox.height / 2
      );
      // Án giữ chuôt
      await page.mouse.down();

      // Di chuyển nhiều bước nhỏ để trigger Sortable.js
      await page.mouse.move(
        sourceBox.x + sourceBox.width / 2,
        sourceBox.y + sourceBox.height / 2 + 5,
        { steps: 5 }
      );
      await page.mouse.move(
        targetBox.x + targetBox.width / 2,
        targetBox.y + targetBox.height / 2,
        { steps: 20 } // càng nhiều steps càng mượt
      );

      //Đến đích, thả chuột
      await page.mouse.up();

      // Chờ animation sortable xong
      await page.waitForTimeout(500);

      // Verify
      const itemsAfter = await listTab.locator('.list-group-item.list-group-item-action').allTextContents();
      console.log('Sau khi kéo:', itemsAfter);

      // Item "One" phải ở vị trí cuối (index 5)
      expect(itemsAfter[5].trim()).toBe('One');


  })

});
  

