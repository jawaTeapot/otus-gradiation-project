<template>
  <client-only>
    <div class="flex items-center justify-center fixed w-full h-full bg-[#121212] z-[999999]" :class="$colorMode.value === 'dark' ? 'bg-[#121212]' : 'bg-white'">
      <svg
        width="100"
        height="100"
        viewBox="0 0 340 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="animate-loader absolute t-50% l-50%"
      >
        <path fill-rule="evenodd" clip-rule="evenodd" d="M159.229 0L159.198 55.0564C78.802 64.0169 33.3623 143.943 65.7459 219.999L17.8845 245.728C-8.24832 191.286 -6.30726 125.777 27.4415 75.6396C56.4957 32.4774 104.119 3.15397 159.229 0Z" fill="#24BBE5" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M181.102 0.00976562L181.089 55.0993C262.516 64.3031 306.684 147.354 273.864 220.051L321.87 247.004C348.003 192.562 346.143 125.857 312.396 75.7179C283.342 32.5557 236.211 3.16394 181.102 0.00976562Z" fill="#7CA644" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M311.711 263.667L265.079 235.827C215.799 301.867 121.806 300.78 74.2124 234.727L27.6038 262.573C61.8978 313.913 117.22 340.98 168.852 339.571C221.963 342.688 281.781 311.701 311.711 263.667Z" fill="#ED6D22" />
      </svg>
      <svg
        width="100"
        height="100"
        viewBox="0 0 340 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill-rule="evenodd" clip-rule="evenodd" d="M240.601 169.585L183.082 203.041L125.563 236.5L125.593 169.533L125.622 102.566L183.111 136.075L240.601 169.585Z" :fill="$colorMode.value === 'dark' ? 'white' : 'black'" />
      </svg>
    </div>
  </client-only>
</template>
