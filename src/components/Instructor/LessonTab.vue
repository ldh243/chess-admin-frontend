<template>
    <v-card :elevation="8">
        <v-tabs centered fixed-tabs v-model="lessonTab" dark background-color="orange darken-1" >
            <v-tab class="font-weight-bold">Thêm ván cờ</v-tab>
            <v-tab class="font-weight-bold">Thêm bài đọc</v-tab>
            <v-tab class="font-weight-bold">Thêm bài thực hành</v-tab>
        </v-tabs>
        <v-tabs-items v-model="lessonTab">
            <v-tab-item>
                <InteractiveLesson/>
            </v-tab-item>
            <v-tab-item>
                <UninteractiveLesson :courseId="courseId"/>
            </v-tab-item>
            <v-tab-item>
                <Exercise/>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>

<script>
import InteractiveLesson from '@/components/Lessons/InteractiveLesson'
import Exercise from '@/components/Lessons/Exercise'
import UninteractiveLesson from '@/components/Lessons/UninteractiveLessonForm'
export default {
    props: {
        courseId: {
            type: Number,
            default: 0
        }
    },
    components: {
        InteractiveLesson,
        Exercise,
        UninteractiveLesson
    },
    data() {
        return {
            lessonTab: null
        }
    }
}
</script>

<style>

</style>
