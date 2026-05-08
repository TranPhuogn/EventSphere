<template>
  <footer class="bg-surface border-t border-border-main pt-12 pb-6 px-4 md:px-10">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
        <!-- Brand Column -->
        <div class="col-span-1 lg:col-span-1">
          <router-link to="/" class="flex items-center gap-2 text-primary font-heading text-xl font-bold mb-4">
            <div class="w-8 h-8 bg-primary text-black rounded-lg flex items-center justify-center font-bold">◉</div>
            EventSphere
          </router-link>
          <p class="text-sm text-muted leading-relaxed">
            Nền tảng phân phối vé sự kiện hàng đầu Việt Nam. Khám phá, đặt vé và trải nghiệm những sự kiện tuyệt vời nhất.
          </p>
        </div>

        <!-- Links Columns -->
        <div v-for="[title, links] in footerLinks" :key="title">
          <h4 class="font-heading font-bold text-main mb-4">{{ title }}</h4>
          <ul class="space-y-2">
            <li v-for="link in links" :key="link">
              <a href="#" class="text-sm text-muted hover:text-primary transition-colors duration-200">
                {{ link }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-border-main pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted">
        <span>© 2025 EventSphere. All rights reserved.</span>
        <span>Made with <span class="text-primary">💚</span> in Vietnam</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
const footerLinks = [
  ['Sự Kiện', ['Âm nhạc & Concert', 'Nghệ thuật & Sân khấu', 'Thể thao', 'Trải nghiệm', 'Hội thảo & Khóa học']],
  ['Hỗ Trợ', ['Trung tâm trợ giúp', 'Liên hệ', 'Chính sách hoàn tiền', 'Câu hỏi thường gặp']],
  ['Công Ty', ['Về EventSphere', 'Báo chí', 'Tuyển dụng', 'Trở thành đối tác']],
]
</script>
