<template>
    <div>
        <v-toolbar dark color="amber">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-tabs centered fixed-tabs v-model="lessonTab" dark background-color="orange darken-1" >
            <v-tab class="font-weight-bold">Thêm bài thực hành</v-tab>
            <v-tab class="font-weight-bold">Thêm ván cờ</v-tab>
            <v-tab class="font-weight-bold">Thêm bài đọc</v-tab>
        </v-tabs>
        <v-tabs-items v-model="lessonTab">
            <v-tab-item>
                <Exercise/>
            </v-tab-item>
            <v-tab-item>
                <InteractiveLesson/>
            </v-tab-item>
            <v-tab-item>
                <UninteractiveLesson @onAddUninteractiveLesson="getAddUnteractiveResult"/>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import InteractiveLesson from '@/components/Lessons/InteractiveLesson'
import Exercise from '@/components/Lessons/Exercise'
import UninteractiveLesson from '@/components/Lessons/uninteractiveLessonForm'
export default {
    props: {
        courseId: {
            type: Number,
            default: 0
        },
        tab: {
            type: Number,
            default: -1
        },
        editingLessonId: {
            type: Number,
            default: -1
        }
    },
    components: {
        InteractiveLesson,
        Exercise,
        UninteractiveLesson
    },
    data() {
        return {
            lessonTab: 0
        }
    },
    methods: {
        getAddUnteractiveResult(lesson) {
            this.$emit('onAddUninteractiveLesson', lesson)
        }
    },
    created() {
        this.lessonTab = this.tab
    }
}
</script>

<style>

</style>
