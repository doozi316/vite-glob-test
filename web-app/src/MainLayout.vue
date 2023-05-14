<template>
    <div v-html="renderedMarkdown" @click="onClick">
        
    </div>
</template>

<script setup lang="ts">
import { marked } from 'marked';
import { watchEffect, ref, onMounted , Ref} from 'vue';
const renderedMarkdown = ref('');
const fileName = ref('./markdowns/Home.md');
// const markdowns = ref({}) as Ref<Record<string, () => Promise<{[key: string]: unknown;}>>> ;
const markdowns = import.meta.glob('./markdowns/*.md', { as: 'raw' });

watchEffect(() => {
    // markdowns.value = import.meta.glob('./markdowns/*.md', { as: 'raw' });
    console.log('watchEffect markdowns', markdowns.value)
    renderedMarkdown.value = marked.parse(markdowns[fileName.value]);
    console.log(renderedMarkdown.value);
});


function onClick(event: MouseEvent) {
    const elem = event.target as HTMLElement;
    if (!elem || elem.tagName.toLowerCase() !== 'a') return;
    event.preventDefault();
    const linkUrl = (elem as HTMLAnchorElement).href;
    console.log(linkUrl);
    fileName.value = `./markdowns/${getFileNameWithoutExtension(linkUrl)}.md`;
}

function getFileNameWithoutExtension(url: string): string {
  const regex = /\/([^/]+)\.[^.]+$/; // 정규 표현식을 사용하여 파일 이름 추출
  const matches = regex.exec(url);
  if (matches && matches.length > 1) {
    return matches[1]; // 첫 번째 캡처 그룹의 값 반환 (확장자 제외)
  }
  return '';
}

</script>

<style scoped>

</style>