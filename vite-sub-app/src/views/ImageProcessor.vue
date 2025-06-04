<template>
  <div class="image-processor">
    <a-card title="图片处理工具" :bordered="false">
      <a-card title="调整参数" :bordered="false" style="margin-bottom: 20px;">
        <template #extra>
          <a-dropdown :trigger="['click']">
            <a-button type="primary">
              选择预设尺寸
              <DownOutlined />
            </a-button>
            <template #overlay>
              <a-menu @click="handlePresetSelect">
                <a-menu-item key="iphone65">iPhone 6.5 英寸 (1242 x 2688)</a-menu-item>
                <a-menu-item key="iphone69">iPhone 6.9 英寸 (1320 x 2868)</a-menu-item>
                <a-menu-item key="iphone14promax">iPhone 6.7 英寸 (1290 x 2796)</a-menu-item>
                <a-menu-item key="iphone14plus">iPhone 6.7 英寸 (1284 x 2778)</a-menu-item>
                <a-menu-item key="iphone8plus">iPhone 5.5 英寸 (1242 x 2208)</a-menu-item>
                <a-menu-item key="ipadpro129">iPad Pro 12.9 英寸 (2048 x 2732)</a-menu-item>
                <a-menu-item key="ipadpro11">iPad Pro 11 英寸 (1668 x 2388)</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
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
          <template #extra>
            <a-checkbox v-model:checked="selectAll" @change="handleSelectAll">全选</a-checkbox>
          </template>
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
          <template #extra>
            <a-checkbox v-model:checked="selectAllProcessed" @change="handleSelectAllProcessed">全选</a-checkbox>
          </template>
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
import { ref, watch } from 'vue';
import { message } from 'ant-design-vue';
import { DeleteOutlined, DownOutlined } from '@ant-design/icons-vue';

const imageUrls = ref([]);
const processedImageUrls = ref([]);
const targetWidth = ref(800);
const targetHeight = ref(600);
const targetQuality = ref(0.9);
const previewVisible = ref(false);
const previewImage = ref('');
const selectedImages = ref([]);
const selectedProcessedImages = ref([]);
const selectAll = ref(false);
const selectAllProcessed = ref(false);

const presetSizes = {
  iphone65: { width: 1242, height: 2688 },
  iphone69: { width: 1320, height: 2868 },
  iphone14promax: { width: 1290, height: 2796 },
  iphone14plus: { width: 1284, height: 2778 },
  iphone8plus: { width: 1242, height: 2208 },
  ipadpro129: { width: 2048, height: 2732 },
  ipadpro11: { width: 1668, height: 2388 }
};

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

// 监听选中状态变化，更新全选状态
watch(selectedImages, (newVal) => {
  selectAll.value = newVal.length > 0 && newVal.every(item => item);
}, { deep: true });

watch(selectedProcessedImages, (newVal) => {
  selectAllProcessed.value = newVal.length > 0 && newVal.every(item => item);
}, { deep: true });

// 处理原图全选/取消全选
function handleSelectAll(e) {
  selectedImages.value = selectedImages.value.map(() => e.target.checked);
}

// 处理处理后图片全选/取消全选
function handleSelectAllProcessed(e) {
  selectedProcessedImages.value = selectedProcessedImages.value.map(() => e.target.checked);
}

function handlePresetSelect({ key }) {
  const size = presetSizes[key];
  if (size) {
    targetWidth.value = size.width;
    targetHeight.value = size.height;
    targetQuality.value = 1;
    message.success(`已设置尺寸为 ${size.width} x ${size.height}，质量为 1`);
  }
}
</script>

<style scoped>
.image-processor :deep(.ant-card) {
  margin-bottom: 12px;
}

.image-processor :deep(.ant-card-body) {
  padding: 12px;
}

.image-processor :deep(.ant-form-item) {
  margin-bottom: 12px;
}

.image-processor :deep(.ant-row) {
  margin-bottom: 0;
}
</style> 