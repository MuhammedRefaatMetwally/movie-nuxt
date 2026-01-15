<template>
     <div class="circle">
              <p class="text-black font-weight-bold text-subtitle-2">{{score }}</p>
          </div>    
</template>

<script setup lang="ts">

 defineProps({
  score:{
    type:Number,
  },
 });
</script>


<style scoped>
.circle {
  width: 48px;
  height: 48px;
  clip-path: polygon(50% 0,79% 90%,2% 35%,98% 35%,21% 90%); 
  background-color: orange;
  position: absolute;
  top: 10px;
  right: 8px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
