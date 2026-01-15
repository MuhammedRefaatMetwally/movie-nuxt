<template>
    <v-dialog v-model="messageStore.showMessage">
    <v-card>
    
    <v-card-text>
    <h1>
    text
    </h1>
    <p>{{ messageStore.message }}</p>
    </v-card-text>
    
    
    </v-card>
    
    </v-dialog>
</template>


<script setup lang="ts">
import { useMessageStore } from '~/stores/message';

    const messageStore = useMessageStore();

</script>