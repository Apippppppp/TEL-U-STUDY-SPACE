<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-white border-t border-line mt-auto">
    <div class="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <img
            src="https://b856188.assetcdn.net/2.0/856188/wp-content/uploads/2022/02/logo3-e1511767184374.png"
            alt="Telkom University"
            class="h-6 w-auto"
          />
          <span class="text-sm text-ink-500">© {{ currentYear }} TEL-U StudySpace</span>
        </div>

        <nav class="flex items-center gap-6 text-sm">
          <a
            href="https://jakarta.telkomuniversity.ac.id"
            target="_blank"
            rel="noopener"
            class="text-ink-500 hover:text-red-600 transition-colors"
          >
            jakarta.telkomuniversity.ac.id
          </a>
          <a href="#" class="text-ink-500 hover:text-red-600 transition-colors">
            Bantuan
          </a>
        </nav>
      </div>
    </div>
  </footer>
</template>