<template>
  <div>
    <a-card title="图片处理工具" :bordered="false">
      <a-card title="调整参数" :bordered="false" style="margin-bottom: 20px;">
        <a-form layout="vertical">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="宽度">
                <a-input-number v-model:value="targetWidth" :min="1" style="width: 100%;" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="高度">
                <a-input-number v-model:value="targetHeight" :min="1" style="width: 100%;" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item label="质量">
            <a-slider v-model:value="targetQuality" :min="0" :max="1" :step="0.01" />
          </a-form-item>
        </a-form>
      </a-card>

      <a-upload
        accept="image/*"
        :show-upload-list="false"
        :before-upload="handleFileUpload"
        multiple
      >
        <a-button type="primary">上传图片</a-button>
      </a-upload>

      <div v-if="imageUrls.length > 0" style="margin-top: 20px;">
        <a-card title="原图预览" :bordered="false">
          <a-row :gutter="16">
            <a-col :span="8" v-for="(url, index) in imageUrls" :key="index" style="margin-bottom: 16px;">
              <div style="position: relative;">
                <img :src="url" :alt="'上传的图片 ' + (index + 1)" style="width: 100%; cursor: pointer;" @click="showPreview(url)">
                <a-checkbox v-model:checked="selectedImages[index]" style="position: absolute; top: 5px; left: 5px;"></a-checkbox>
                <DeleteOutlined
                  style="position: absolute; top: 5px; right: 5px; color: red; cursor: pointer;"
                  @click="deleteImage(index)"
                />
              </div>
            </a-col>
          </a-row>
        </a-card>

        <a-button type="primary" @click="resizeImages" style="margin-top: 10px;">批量调整图片</a-button>
      </div>

      <div v-if="processedImageUrls.length > 0" style="margin-top: 20px;">
        <a-card title="处理后图片预览" :bordered="false">
          <a-row :gutter="16">
            <a-col :span="8" v-for="(url, index) in processedImageUrls" :key="index" style="margin-bottom: 16px;">
              <div style="position: relative;">
                <img :src="url" :alt="'处理后的图片 ' + (index + 1)" style="width: 100%; cursor: pointer;" @click="showPreview(url)">
                <a-checkbox v-model:checked="selectedProcessedImages[index]" style="position: absolute; top: 5px; left: 5px;"></a-checkbox>
                <DeleteOutlined
                  style="position: absolute; top: 5px; right: 5px; color: red; cursor: pointer;"
                  @click="deleteProcessedImage(index)"
                />
              </div>
            </a-col>
          </a-row>
          <a-button type="primary" @click="downloadImages" style="margin-top: 10px;">批量下载图片</a-button>
        </a-card>
      </div>
    </a-card>

    <a-modal v-model:open="previewVisible" :footer="null" @cancel="handlePreviewCancel">
      <img :src="previewImage" style="width: 100%;" />
    </a-modal>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { DeleteOutlined } from '@ant-design/icons-vue';

const imageUrls = ref([]);
const processedImageUrls = ref([]);
const targetWidth = ref(800);
const targetHeight = ref(600);
const targetQuality = ref(0.9);
const previewVisible = ref(false);
const previewImage = ref('');
const selectedImages = ref([]);
const selectedProcessedImages = ref([]);

function handleFileUpload(file) {
  const isImage = file.type.startsWith('image/');
  if (!isImage) {
    message.error('只能上传图片文件！');
    return false;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    imageUrls.value.push(e.target.result);
    selectedImages.value.push(false);
  };
  reader.readAsDataURL(file);
  return false; // Prevent upload
}

function deleteImage(index) {
  imageUrls.value.splice(index, 1);
  selectedImages.value.splice(index, 1);
}

function deleteProcessedImage(index) {
  processedImageUrls.value.splice(index, 1);
  selectedProcessedImages.value.splice(index, 1);
}

function resizeImages() {
  if (imageUrls.value.length === 0) {
    message.warning('请先上传图片！');
    return;
  }

  const hasSelectedImages = selectedImages.value.some(selected => selected);
  if (!hasSelectedImages) {
    message.warning('请选择要处理的图片！');
    return;
  }

  processedImageUrls.value = []; // Clear previous processed images
  selectedProcessedImages.value = []; // Clear previous selected processed images

  imageUrls.value.forEach((imageUrl, index) => {
    if (selectedImages.value[index]) {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const originalWidth = img.width;
        const originalHeight = img.height;

        let newWidth = targetWidth.value || originalWidth;
        let newHeight = targetHeight.value || originalHeight;

        // Maintain aspect ratio if only one dimension is provided
        if (targetWidth.value && !targetHeight.value) {
          newHeight = (originalHeight / originalWidth) * newWidth;
        } else if (!targetWidth.value && targetHeight.value) {
          newWidth = (originalWidth / originalHeight) * newHeight;
        }

        canvas.width = newWidth;
        canvas.height = newHeight;

        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        // Convert canvas to data URL with specified quality
        processedImageUrls.value.push(canvas.toDataURL('image/jpeg', targetQuality.value));
        selectedProcessedImages.value.push(false);
      };
      img.src = imageUrl;
    }
  });
}

function downloadImages() {
  if (processedImageUrls.value.length === 0) {
    message.warning('没有可下载的图片！');
    return;
  }

  const hasSelectedProcessedImages = selectedProcessedImages.value.some(selected => selected);
  if (!hasSelectedProcessedImages) {
    message.warning('请选择要下载的图片！');
    return;
  }

  processedImageUrls.value.forEach((url, index) => {
    if (selectedProcessedImages.value[index]) {
      const link = document.createElement('a');
      link.href = url;
      link.download = `processed_image_${index + 1}.jpg`;
      link.click();
    }
  });
}

function showPreview(url) {
  previewImage.value = url;
  previewVisible.value = true;
}

function handlePreviewCancel() {
  previewVisible.value = false;
}
</script>

<style scoped>
/* Add your styles here */
</style> 